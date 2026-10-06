import Papa from "papaparse";
import type { Editor } from "@tiptap/react";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

export const MAX_TABLE_ROWS = 200;
export const MAX_TABLE_COLS = 30;

export interface TableGrid {
  rows: string[][];
  cols: number;
}

/**
 * True when a blob of text looks like a spreadsheet range rather than prose.
 * Requires at least one tab on the first line and two or more lines, which is
 * what Excel / Google Sheets / Numbers put on the clipboard.
 */
export function looksLikeTabularText(text: string): boolean {
  const lines = text.split(/\r\n|\n|\r/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return false;
  return lines[0].includes("\t");
}

/** Parse CSV / TSV / spreadsheet-clipboard text into a rectangular grid. */
export function parseTableText(text: string): TableGrid {
  const trimmed = text.trim();
  if (!trimmed) return { rows: [], cols: 0 };

  // Excel/Sheets clipboard data is TSV; Papa handles it, but short-circuiting
  // keeps quoted TSV cells containing commas from being re-split.
  if (trimmed.includes("\t")) {
    const lines = trimmed.split(/\r\n|\n|\r/);
    const last = lines[lines.length - 1];
    if (last.trim() === "") lines.pop();
    const rows = lines.map((line) => line.split("\t").map((c) => c.trim()));
    return normalizeGrid(rows);
  }

  const parsed = Papa.parse<string[]>(trimmed, {
    skipEmptyLines: "greedy",
  });

  const rows = (parsed.data as string[][])
    .filter((row) => Array.isArray(row))
    .map((row) => row.map((cell) => (cell ?? "").toString().trim()));

  return normalizeGrid(rows);
}

/**
 * Flatten one table cell to plain text.
 *
 * Block boundaries become spaces so that "a<br>b" doesn't collapse into "ab",
 * and any table nested inside the cell is dropped rather than leaking its
 * contents into this cell's text.
 */
function cellText(cell: Element): string {
  const clone = cell.cloneNode(true) as Element;
  clone.querySelectorAll("table").forEach((nested) => nested.remove());
  // <br> has no content, so it becomes a space outright. Block elements DO hold
  // their text, so a space goes after them instead of replacing them.
  clone.querySelectorAll("br").forEach((n) => n.replaceWith(" "));
  clone
    .querySelectorAll("p,div,li,h1,h2,h3,h4,h5,h6")
    .forEach((n) => n.insertAdjacentText("afterend", " "));
  return (clone.textContent || "").replace(/\s+/g, " ").trim();
}

/**
 * Extract the first table out of an HTML clipboard payload.
 *
 * Copying a table from Word, Google Docs or a web page puts three things on
 * the clipboard: text/html with the real table, text/plain, and an image/png
 * snapshot of the rendering. Only the HTML carries the actual table, so this
 * has to be preferred over the image or the paste silently becomes a picture.
 */
export function parseHtmlTable(html: string): TableGrid | null {
  if (!html || !/<table[\s>]/i.test(html)) return null;

  let doc: Document;
  try {
    doc = new DOMParser().parseFromString(html, "text/html");
  } catch {
    return null;
  }

  const table = doc.querySelector("table");
  if (!table) return null;

  const rows: string[][] = [];

  table.querySelectorAll("tr").forEach((tr) => {
    const cells: string[] = [];

    tr.querySelectorAll("th,td").forEach((cell) => {
      // Ignore cells belonging to a table nested inside this one.
      if (cell.closest("table") !== table) return;

      const span = Math.max(1, Number(cell.getAttribute("colspan")) || 1);
      const text = cellText(cell);
      cells.push(text);
      // A spanning cell covers the following columns; keep the grid rectangular.
      for (let i = 1; i < span; i++) cells.push("");
    });

    if (cells.length) rows.push(cells);
  });

  const grid = normalizeGrid(rows);
  return grid.rows.length > 0 && grid.cols > 0 ? grid : null;
}

/** Pad or trim ragged rows so every row has the same number of columns. */
export function normalizeGrid(rows: string[][]): TableGrid {
  const filtered = rows.filter((row) => row.length > 0);
  if (filtered.length === 0) return { rows: [], cols: 0 };

  const cols = Math.min(
    filtered.reduce((max, row) => Math.max(max, row.length), 0),
    MAX_TABLE_COLS,
  );

  return {
    rows: filtered
      .slice(0, MAX_TABLE_ROWS)
      .map((row) =>
        Array.from({ length: cols }, (_, i) => (row[i] ?? "").toString().trim()),
      ),
    cols,
  };
}

/**
 * Build a real ProseMirror table node from a grid.
 *
 * Going through the schema (rather than injecting an HTML string) means cell
 * text is created as text nodes, so anything in the CSV is treated as literal
 * text and can never be parsed as markup.
 */
export function buildTableNode(
  editor: Editor,
  grid: TableGrid,
  { withHeaderRow = true }: { withHeaderRow?: boolean } = {},
): ProseMirrorNode | null {
  const { schema } = editor.state;
  const tableType = schema.nodes.table;
  const rowType = schema.nodes.tableRow;
  const paragraphType = schema.nodes.paragraph;
  const bodyCellType = schema.nodes.tableCell;
  const headerCellType = schema.nodes.tableHeader;

  if (
    !tableType ||
    !rowType ||
    !paragraphType ||
    !bodyCellType ||
    !headerCellType
  ) {
    return null;
  }

  const makeCell = (text: string, isHeader: boolean) => {
    const type = isHeader ? headerCellType : bodyCellType;
    return type.create(
      null,
      paragraphType.create(null, text ? schema.text(text) : null),
    );
  };

  const content = grid.rows.map((row, rowIndex) =>
    rowType.create(
      null,
      row.map((cell) => makeCell(cell, withHeaderRow && rowIndex === 0)),
    ),
  );

  return tableType.create({ cols: grid.cols }, content);
}

/** Insert a grid as a table at the cursor, replacing the current empty block. */
export function insertGridAsTable(
  editor: Editor,
  grid: TableGrid,
  options: { withHeaderRow?: boolean; emptyRows?: number; emptyCols?: number } = {},
): boolean {
  const { withHeaderRow = true, emptyRows = 3, emptyCols = 3 } = options;

  let target = grid;
  if (grid.rows.length === 0 || grid.cols === 0) {
    target = {
      rows: Array.from({ length: emptyRows }, () =>
        Array.from({ length: emptyCols }, () => ""),
      ),
      cols: emptyCols,
    };
  }

  const tableNode = buildTableNode(editor, target, { withHeaderRow });
  if (!tableNode) return false;

  // TipTap's insertContent runs ProseMirror's range-fitting, so an empty
  // paragraph under the cursor is absorbed rather than stranded above the table.
  editor.chain().focus().insertContent(tableNode).run();
  editor.view.focus();
  return true;
}

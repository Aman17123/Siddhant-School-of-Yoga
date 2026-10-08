"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  useEditor,
  EditorContent,
  Editor,
  Mark,
  mergeAttributes,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ResizableImage } from "./ResizableImageExtension";
import LinkExtension from "@tiptap/extension-link";
import UnderlineExtension from "@tiptap/extension-underline";
import PlaceholderExtension from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import {
  looksLikeTabularText,
  parseTableText,
  parseHtmlTable,
  insertGridAsTable,
  MAX_TABLE_COLS,
  MAX_TABLE_ROWS,
} from "@/blog_core/lib/tableImport";
import { Category, Author, CurrentUser, PostFormState, slugify, getInitials } from "./types";
import {
  formatScheduledAt,
  localInputToIso,
} from "../../lib/datetime";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textColor: {
      setColor: (color: string) => ReturnType;
      unsetColor: () => ReturnType;
    };
  }
}

// Custom Text Color Mark for TipTap (inline text styling)
const TextColorMark = Mark.create({
  name: "textColor",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) =>
          element.style.color || element.getAttribute("data-color"),
        renderHTML: (attributes) => {
          if (!attributes.color) return {};
          return {
            style: `color: ${attributes.color}`,
            "data-color": attributes.color,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[style*=color]",
      },
      {
        tag: "span[data-color]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setColor:
        (color: string) =>
        ({ chain }) => {
          return chain().setMark(this.name, { color }).run();
        },
      unsetColor:
        () =>
        ({ chain }) => {
          return chain().unsetMark(this.name).run();
        },
    };
  },
});

const TEXT_COLORS = [
  { label: "Default Dark", color: "#2A1621" },
  { label: "Forest Green", color: "#1c3b2b" },
  { label: "Deep Green", color: "#14291e" },
  { label: "Marigold Gold", color: "#C9862A" },
  { label: "Teal Green", color: "#00897b" },
  { label: "Sage Green", color: "#5C6E4E" },
  { label: "Royal Blue", color: "#2563eb" },
  { label: "Sunset Amber", color: "#ea580c" },
  { label: "Muted Soft", color: "#6B5862" },
  { label: "Pure Black", color: "#000000" },
];

// TipTap's table cells only carry colspan/rowspan/colwidth, so cell fill colour
// and text alignment are added as extra attributes. Header cells are a separate
// node type, so both need the same attributes or styling is dropped on them.
const cellStyleAttributes = {
  backgroundColor: {
    default: null as string | null,
    parseHTML: (element: HTMLElement) =>
      element.getAttribute("data-background-color") ||
      element.style.backgroundColor ||
      null,
    renderHTML: (attributes: Record<string, unknown>) => {
      const color = attributes.backgroundColor as string | null;
      if (!color) return {};
      return {
        "data-background-color": color,
        style: `background-color: ${color}`,
      };
    },
  },
  textAlign: {
    default: null as string | null,
    parseHTML: (element: HTMLElement) =>
      element.getAttribute("data-text-align"),
    renderHTML: (attributes: Record<string, unknown>) => {
      const align = attributes.textAlign as string | null;
      if (!align) return {};
      return {
        "data-text-align": align,
        style: `text-align: ${align}`,
      };
    },
  },
};

const TableCellWithStyle = TableCell.extend({
  addAttributes() {
    return { ...this.parent?.(), ...cellStyleAttributes };
  },
});

const TableHeaderWithStyle = TableHeader.extend({
  addAttributes() {
    return { ...this.parent?.(), ...cellStyleAttributes };
  },
});

const TITLE_MAX_LENGTH = 70;

const CELL_FILL_COLORS = [
  { label: "No fill", value: null },
  { label: "White", value: "#ffffff" },
  { label: "Blush", value: "#FDF9FB" },
  { label: "Sand", value: "#FAF6F0" },
  { label: "Rose light", value: "#fff3f8" },
  { label: "Sage light", value: "#eef2e8" },
  { label: "Marigold light", value: "#fdf3e3" },
  { label: "Forest Green", value: "#1c3b2b" },
  { label: "Deep Green", value: "#14291e" },
  { label: "Charcoal", value: "#2A1621" },
];

/**
 * Checks whether the clipboard HTML contains exclusively a standalone table,
 * without surrounding prose, paragraphs, or headings.
 */
function isStandaloneTableHtml(html: string): boolean {
  if (!html || !/<table[\s>]/i.test(html)) return false;
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const table = doc.querySelector("table");
    if (!table) return false;

    // Check if there are headings or paragraphs outside the table
    const clone = doc.body.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("table").forEach((t) => t.remove());

    if (clone.querySelector("h1, h2, h3, h4, h5, h6")) return false;

    // Check remaining text content outside the table
    const remainingText = (clone.textContent || "").trim();
    return remainingText.length < 30;
  } catch {
    return false;
  }
}

/**
 * Cleans HTML copied from Google Docs, Word, or web pages:
 * 1. Unwraps Google Docs root `<b id="docs-internal-guid-...">` wrapper so text isn't globally bold.
 * 2. Normalizes all `<h1...>` tags to `<h2>` (H1 is strictly reserved for the blog post title).
 * 3. Preserves headings H2-H6, paragraphs `<p>`, lists `<ul>`/`<ol>`, and tables.
 * 4. Normalizes styled spans (bold, italic, underline, strikethrough) into clean semantic tags.
 * 5. Strips intrusive inline fonts (Arial, 11pt, line-heights, fixed margins).
 * 6. Promotes first row of headerless tables to `<th>` for clean formatting.
 */
function cleanGoogleDocsHtml(html: string): string {
  if (!html || typeof html !== "string") return html;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 1. Unwrap Google Docs wrapper <b id="docs-internal-guid-...">
    const docGuids = doc.querySelectorAll('b[id^="docs-internal-guid-"]');
    docGuids.forEach((b) => {
      const parent = b.parentNode;
      if (parent) {
        while (b.firstChild) {
          parent.insertBefore(b.firstChild, b);
        }
        parent.removeChild(b);
      }
    });

    // 2. Parse <style> tags to extract class-level font sizes and weights (Google Docs and Word CSS definitions)
    const classStyleMap = new Map<string, { fontSizePt?: number; isBold?: boolean }>();
    doc.querySelectorAll("style").forEach((styleTag) => {
      const css = styleTag.textContent || "";
      const ruleRegex = /\.([a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g;
      let match;
      while ((match = ruleRegex.exec(css)) !== null) {
        const cls = match[1];
        const decl = match[2];
        let fontSizePt: number | undefined;
        let isBold = false;
        const sizeMatch = /font-size:\s*([\d.]+)(pt|px)/i.exec(decl);
        if (sizeMatch) {
          const val = parseFloat(sizeMatch[1]);
          const unit = sizeMatch[2].toLowerCase();
          fontSizePt = unit === "pt" ? val : val * 0.75;
        }
        if (/font-weight:\s*(bold|[6-9]00)/i.test(decl)) {
          isBold = true;
        }
        classStyleMap.set(cls, { fontSizePt, isBold });
      }
    });

    // 3. Convert any existing H1 to H2 (H1 is strictly reserved for the blog post title)
    const h1Elements = Array.from(doc.querySelectorAll("h1"));
    h1Elements.forEach((h1) => {
      const h2 = doc.createElement("h2");
      while (h1.firstChild) {
        h2.appendChild(h1.firstChild);
      }
      h1.parentNode?.replaceChild(h2, h1);
    });

    // 4. Detect Word & Google Docs headings formatted as <p> or <div> and convert to semantic <h2...h6>
    const candidates = Array.from(doc.querySelectorAll("p, div"));
    candidates.forEach((el) => {
      if (!el.parentNode) return;

      const styleAttr = el.getAttribute("style") || "";
      const className = el.getAttribute("class") || "";
      const role = el.getAttribute("role");
      const ariaLevel = el.getAttribute("aria-level");

      let headingLevel: number | null = null;

      // 4a. Word outline level (e.g. style="mso-outline-level:1" or "mso-outline-level:2")
      const msoOutline = /mso-outline-level:\s*([1-6])/i.exec(styleAttr);
      if (msoOutline) {
        const lvl = parseInt(msoOutline[1], 10);
        headingLevel = lvl === 1 ? 2 : lvl; // Map H1 to H2
      }

      // 4b. ARIA role heading (e.g. Google Docs role="heading" aria-level="2")
      if (!headingLevel && (role === "heading" || ariaLevel)) {
        const lvl = parseInt(ariaLevel || "2", 10);
        headingLevel = lvl === 1 ? 2 : Math.min(6, Math.max(2, lvl));
      }

      // 4c. Word / Document classes (MsoHeading1, Heading1, MsoTitle, etc.)
      if (!headingLevel) {
        if (/MsoHeading1|Heading1|heading_1/i.test(className)) {
          headingLevel = 2; // H1 -> H2
        } else if (/MsoHeading2|Heading2|heading_2/i.test(className)) {
          headingLevel = 2;
        } else if (/MsoHeading3|Heading3|heading_3/i.test(className)) {
          headingLevel = 3;
        } else if (/MsoHeading4|Heading4|heading_4/i.test(className)) {
          headingLevel = 4;
        } else if (/MsoHeading5|Heading5|heading_5/i.test(className)) {
          headingLevel = 5;
        } else if (/MsoHeading6|Heading6|heading_6/i.test(className)) {
          headingLevel = 6;
        } else if (/\b(MsoTitle|title)\b/i.test(className)) {
          headingLevel = 2;
        } else if (/\b(MsoSubtitle|subtitle)\b/i.test(className)) {
          headingLevel = 3;
        }
      }

      // 4d. Font-size and bold heuristic for Docs / pasted rich text without classes
      if (!headingLevel) {
        const text = el.textContent?.trim() || "";
        // Headings are relatively concise (typically under 180 chars)
        if (text.length > 0 && text.length < 180) {
          let maxFontSizePt = 0;
          let isBold = false;

          // Check inline style on el
          const elInlineSize = /font-size:\s*([\d.]+)(pt|px)/i.exec(styleAttr);
          if (elInlineSize) {
            const val = parseFloat(elInlineSize[1]);
            const unit = elInlineSize[2].toLowerCase();
            maxFontSizePt = Math.max(maxFontSizePt, unit === "pt" ? val : val * 0.75);
          }
          if (/font-weight:\s*(bold|[6-9]00)/i.test(styleAttr)) {
            isBold = true;
          }

          // Check el classes
          for (const c of className.split(/\s+/)) {
            const info = classStyleMap.get(c);
            if (info) {
              if (info.fontSizePt) maxFontSizePt = Math.max(maxFontSizePt, info.fontSizePt);
              if (info.isBold) isBold = true;
            }
          }

          // Check child spans
          const spans = el.querySelectorAll("span");
          spans.forEach((sp) => {
            const spStyle = sp.getAttribute("style") || "";
            const spSize = /font-size:\s*([\d.]+)(pt|px)/i.exec(spStyle);
            if (spSize) {
              const val = parseFloat(spSize[1]);
              const unit = spSize[2].toLowerCase();
              maxFontSizePt = Math.max(maxFontSizePt, unit === "pt" ? val : val * 0.75);
            }
            if (/font-weight:\s*(bold|[6-9]00)/i.test(spStyle)) {
              isBold = true;
            }
            for (const c of sp.className.split(/\s+/)) {
              const info = classStyleMap.get(c);
              if (info) {
                if (info.fontSizePt) maxFontSizePt = Math.max(maxFontSizePt, info.fontSizePt);
                if (info.isBold) isBold = true;
              }
            }
          });

          if (el.querySelector("b, strong")) {
            isBold = true;
          }

          // Typical body text is 10-11pt (13-15px). Heading 2 is >= 17pt, Heading 3 is >= 13.5pt
          if (isBold && maxFontSizePt >= 17) {
            headingLevel = 2;
          } else if (isBold && maxFontSizePt >= 13.5) {
            headingLevel = 3;
          } else if (isBold && maxFontSizePt >= 12.0 && text.length < 80) {
            headingLevel = 4;
          }
        }
      }

      // If recognized as a heading, convert to <hX>
      if (headingLevel) {
        const hTag = doc.createElement(`h${headingLevel}`);
        while (el.firstChild) {
          hTag.appendChild(el.firstChild);
        }
        el.parentNode?.replaceChild(hTag, el);
      }
    });

    // 5. Clean inside headings (strip inner redundant styles or nested block elements)
    doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
      const htmlEl = heading as HTMLElement;
      htmlEl.style.fontFamily = "";
      htmlEl.style.fontSize = "";
      htmlEl.style.lineHeight = "";
      htmlEl.style.marginTop = "";
      htmlEl.style.marginBottom = "";
      htmlEl.style.color = "";
      htmlEl.removeAttribute("class");

      // Recursively strip foreign colors and fonts from ALL child elements inside headings
      heading.querySelectorAll("*").forEach((child) => {
        const childEl = child as HTMLElement;
        if (childEl.style) {
          childEl.style.color = "";
          childEl.style.fontFamily = "";
          childEl.style.fontSize = "";
          childEl.style.lineHeight = "";
        }
      });

      // Unwrap any nested p / div inside heading
      heading.querySelectorAll("p, div").forEach((nested) => {
        while (nested.firstChild) {
          nested.parentNode?.insertBefore(nested.firstChild, nested);
        }
        nested.parentNode?.removeChild(nested);
      });
    });

    // 6. Process styled spans (convert inline font styles from Google Docs / Word to semantic tags)
    const spans = Array.from(doc.querySelectorAll("span"));
    spans.forEach((span) => {
      const style = span.getAttribute("style") || "";
      const fontWeight = span.style.fontWeight;
      const fontStyle = span.style.fontStyle;
      const textDecoration = span.style.textDecoration;
      const color = span.style.color;

      const isBold =
        fontWeight === "bold" ||
        Number(fontWeight) >= 600 ||
        /font-weight:\s*(bold|[6-9]00)/i.test(style);
      const isItalic =
        fontStyle === "italic" || /font-style:\s*italic/i.test(style);
      const isUnderline =
        textDecoration.includes("underline") ||
        /text-decoration(-line)?:\s*[^;]*underline/i.test(style);
      const isStrike =
        textDecoration.includes("line-through") ||
        /text-decoration(-line)?:\s*[^;]*line-through/i.test(style);

      // Wrap span content with semantic tags if needed
      let target: HTMLElement = span;
      if (isBold && !span.closest("strong, b, h1, h2, h3, h4, h5, h6")) {
        const strong = doc.createElement("strong");
        target.parentNode?.insertBefore(strong, target);
        strong.appendChild(target);
        target = strong;
      }
      if (isItalic && !span.closest("em, i")) {
        const em = doc.createElement("em");
        target.parentNode?.insertBefore(em, target);
        em.appendChild(target);
        target = em;
      }
      if (isUnderline && !span.closest("u")) {
        const u = doc.createElement("u");
        target.parentNode?.insertBefore(u, target);
        u.appendChild(target);
        target = u;
      }
      if (isStrike && !span.closest("s, del, strike")) {
        const s = doc.createElement("s");
        target.parentNode?.insertBefore(s, target);
        s.appendChild(target);
        target = s;
      }

      // Strip intrusive inline font/layout styles from span
      span.style.fontFamily = "";
      span.style.fontSize = "";
      span.style.lineHeight = "";
      span.style.backgroundColor = "";
      span.style.verticalAlign = "";

      // Strip default dark/black and Google Docs / Word blues so it inherits template style
      const normalizedColor = (color || "").toLowerCase().replace(/\s+/g, "");
      if (
        normalizedColor === "rgb(0,0,0)" ||
        normalizedColor === "#000000" ||
        normalizedColor === "#000" ||
        normalizedColor === "rgb(32,33,36)" ||
        normalizedColor === "rgb(17,17,17)" ||
        normalizedColor === "rgb(47,84,150)" ||
        normalizedColor === "#2f5496" ||
        normalizedColor === "rgb(17,85,204)" ||
        normalizedColor === "#1155cc" ||
        normalizedColor === "rgb(66,133,244)" ||
        normalizedColor === "#4285f4" ||
        normalizedColor === "rgb(26,115,232)" ||
        normalizedColor === "#1a73e8" ||
        normalizedColor === "rgb(54,95,145)" ||
        normalizedColor === "#365f91" ||
        normalizedColor === "rgb(79,129,189)" ||
        normalizedColor === "#4f81bd"
      ) {
        span.style.color = "";
      }

      if (!span.getAttribute("style")?.trim()) {
        span.removeAttribute("style");
      }
    });

    // 7. Strip intrusive font/margin styles from block elements
    const blockElements = doc.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, li, ul, ol, blockquote"
    );
    blockElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.fontFamily = "";
      htmlEl.style.fontSize = "";
      htmlEl.style.lineHeight = "";
      htmlEl.style.marginTop = "";
      htmlEl.style.marginBottom = "";
      htmlEl.style.marginLeft = "";
      htmlEl.style.marginRight = "";
      htmlEl.style.margin = "";
      htmlEl.style.padding = "";

      const color = htmlEl.style.color;
      if (
        color === "rgb(0, 0, 0)" ||
        color === "#000000" ||
        color === "#000" ||
        color === "rgb(32, 33, 36)" ||
        color === "rgb(17, 17, 17)"
      ) {
        htmlEl.style.color = "";
      }

      if (!htmlEl.getAttribute("style")?.trim()) {
        htmlEl.removeAttribute("style");
      }
    });

    // 8. Clean tables and promote bold header row to <th> if no <th> exists
    const tables = doc.querySelectorAll("table");
    tables.forEach((table) => {
      table.style.fontFamily = "";
      table.style.fontSize = "";
      table.style.lineHeight = "";
      table.style.width = "";
      table.style.margin = "";
      table.removeAttribute("width");

      const ths = table.querySelectorAll("th");
      const rows = table.querySelectorAll("tr");

      // Promote first row to <th> if no <th> exists and table has multiple rows
      if (ths.length === 0 && rows.length >= 2) {
        const firstRow = rows[0];
        const firstCells = Array.from(firstRow.querySelectorAll("td"));
        const hasBold = firstCells.some(
          (c) => c.querySelector("strong, b") || c.style.fontWeight === "bold",
        );
        if (hasBold || rows.length > 1) {
          firstCells.forEach((td) => {
            const th = doc.createElement("th");
            while (td.firstChild) {
              th.appendChild(td.firstChild);
            }
            if (td.style.backgroundColor)
              th.style.backgroundColor = td.style.backgroundColor;
            if (td.style.textAlign) th.style.textAlign = td.style.textAlign;
            td.parentNode?.replaceChild(th, td);
          });
        }
      }

      table.querySelectorAll("th, td").forEach((cell) => {
        const cellEl = cell as HTMLElement;
        cellEl.style.fontFamily = "";
        cellEl.style.fontSize = "";
        cellEl.style.lineHeight = "";
        cellEl.style.width = "";
        cellEl.style.height = "";
        cellEl.removeAttribute("width");
        cellEl.removeAttribute("height");
      });
    });

    // 9. Remove foreign classes, unwrap <font> tags, and strip ALL inline font-family
    doc.querySelectorAll("font").forEach((font) => {
      while (font.firstChild) {
        font.parentNode?.insertBefore(font.firstChild, font);
      }
      font.parentNode?.removeChild(font);
    });

    doc.querySelectorAll("*").forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.style && htmlEl.style.fontFamily) {
        htmlEl.style.fontFamily = "";
      }
      if (htmlEl.tagName === "P" || htmlEl.tagName === "SPAN" || htmlEl.tagName === "DIV") {
        htmlEl.removeAttribute("class");
      }
    });

    // 10. Remove residual Word/Office garbage tags (<o:p>, <xml>, <meta>, <style>, <link>) from body
    doc.body.querySelectorAll("style, meta, link, xml").forEach((el) => el.remove());
    doc.body.querySelectorAll("o\\:p, op").forEach((op) => {
      while (op.firstChild) {
        op.parentNode?.insertBefore(op.firstChild, op);
      }
      op.parentNode?.removeChild(op);
    });

    return doc.body.innerHTML;
  } catch (err) {
    console.error("cleanGoogleDocsHtml error:", err);
    return html;
  }
}

interface PostEditorProps {
  postForm: PostFormState;
  setPostForm: React.Dispatch<React.SetStateAction<PostFormState>>;
  saveState: string;
  setSaveState:
    | React.Dispatch<
        React.SetStateAction<
          "Saved" | "Unsaved changes" | "Saving..." | "All changes saved"
        >
      >
    | ((
        state: "Saved" | "Unsaved changes" | "Saving..." | "All changes saved",
      ) => void);
  setView: (
    view: "dashboard" | "editor" | "categories",
  ) => void;
  currentUser?: CurrentUser;
  activeEditorTab: "seo" | "social" | "faqs" | "ai" | "schema" | "adv";
  setActiveEditorTab: (
    tab: "seo" | "social" | "faqs" | "ai" | "schema" | "adv",
  ) => void;
  wordCount: { words: number; mins: number };
  rteRef: React.RefObject<HTMLDivElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  authors?: (Author | string)[];
  categories: Category[];
  handleRteCommand: (command: string, value?: string) => void;
  handleSavePost: (
    statusOverride?: "draft" | "published",
  ) => void | Promise<void>;
  handleFaqChange: (index: number, field: "q" | "a", value: string) => void;
  handleMoveFaq: (index: number, direction: -1 | 1) => void;
  handleRemoveFaq: (index: number) => void;
  handleAddFaq: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingImage: boolean;
  handleAddTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRemoveTag: (index: number) => void;
  quickCatOpen: boolean;
  setQuickCatOpen: (open: boolean) => void;
  quickCatName: string;
  setQuickCatName: (name: string) => void;
  handleQuickAddCat: () => void;
}

// Subscribing is pointless here — this is a static client/server split, not a
// changing store — but useSyncExternalStore needs a stable function identity.
const subscribeNever = () => () => {};

export default function PostEditor({
  postForm,
  setPostForm,
  saveState,
  setSaveState,
  setView,
  activeEditorTab,
  setActiveEditorTab,
  wordCount,
  rteRef,
  fileInputRef,
  authors,
  categories,
  handleRteCommand,
  handleSavePost,
  handleFaqChange,
  handleMoveFaq,
  handleRemoveFaq,
  handleAddFaq,
  handleImageUpload,
  uploadingImage,
  handleAddTag,
  handleRemoveTag,
  quickCatOpen,
  setQuickCatOpen,
  quickCatName,
  setQuickCatName,
  currentUser,
  handleQuickAddCat,
}: PostEditorProps) {
  const isAdmin = true;

  // Selected Author Object for Post Editor
  const currentAuthor =
    authors?.find(
      (a) => typeof a !== "string" && (a.name === postForm.author || a.username === postForm.author),
    ) || (authors && typeof authors[0] !== "string" ? authors[0] : undefined);

  // Author combobox state & remembered suggestions
  const [authorDropdownOpen, setAuthorDropdownOpen] = useState(false);
  const authorDropdownRef = useRef<HTMLDivElement>(null);

  const authorOptions: string[] = useMemo(() => {
    const set = new Set<string>();
    set.add("Siddhant School of Yoga");
    if (Array.isArray(authors)) {
      for (const a of authors) {
        const name = typeof a === "string" ? a : (a?.name || a?.username);
        if (name && typeof name === "string" && name.trim()) {
          set.add(name.trim());
        }
      }
    }
    return Array.from(set);
  }, [authors]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        authorDropdownRef.current &&
        !authorDropdownRef.current.contains(event.target as Node)
      ) {
        setAuthorDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentAuthorInput = postForm.author || "";
  const filteredAuthors = useMemo(() => {
    const q = currentAuthorInput.trim().toLowerCase();
    if (!q) return authorOptions;
    return authorOptions.filter((a) => a.toLowerCase().includes(q));
  }, [authorOptions, currentAuthorInput]);

  // Safe normalized values to prevent null/undefined runtime crashes
  const title = postForm.title || "";
  const slug = postForm.slug || "";
  const content = postForm.content || "";
  const shortDesc = postForm.short_description || "";
  const metaTitle = postForm.meta_title || "";
  const metaDesc = postForm.meta_description || "";
  const focusKw = postForm.focus_keyword || "";
  const faqs = Array.isArray(postForm.faqs) ? postForm.faqs : [];
  const tldr = postForm.tldr || "";
  const keyTakeaways = postForm.key_takeaways || "";
  const canonicalUrl = postForm.canonical_url || "";
  const ogTitle = postForm.og_title || "";
  const ogDesc = postForm.og_desc || "";

  // Preview of what saving will do. The server still has the final say (it uses
  // its own clock), this only explains the outcome before the click.
  //
  // The clock and timezone below are client-only values: the server's differ
  // from the browser's, so rendering them directly would break hydration.
  // useSyncExternalStore gives the server a neutral snapshot and lets React swap
  // in the real one after hydration, with no setState-in-effect cascade.
  const clientEnvRef = React.useRef<{ primed: boolean; now: number; zone: string }>({
    primed: false,
    now: 0,
    zone: "",
  });
  const primeClientEnv = () => {
    if (clientEnvRef.current.primed) return clientEnvRef.current;
    let zone = "your local time";
    try {
      zone = Intl.DateTimeFormat().resolvedOptions().timeZone || zone;
    } catch {
      /* Intl unavailable — keep the fallback label */
    }
    clientEnvRef.current = { primed: true, now: Date.now(), zone };
    return clientEnvRef.current;
  };
  const noopSubscribe = subscribeNever;
  const nowMs = React.useSyncExternalStore(
    noopSubscribe,
    () => primeClientEnv().now,
    () => 0,
  );
  const localTimeZone = React.useSyncExternalStore(
    noopSubscribe,
    () => primeClientEnv().zone,
    () => "your local time",
  );

  const pendingSchedule = React.useMemo(() => {
    const iso = localInputToIso(postForm.published_at);
    if (!iso) return { isFuture: false, iso: null as string | null };
    if (nowMs === 0) return { isFuture: false, iso };
    return { isFuture: new Date(iso).getTime() > nowMs, iso };
  }, [postForm.published_at, nowMs]);

  // Title textarea ref for dynamic auto-height so long titles never get cut off
  const titleTextareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    if (titleTextareaRef.current) {
      titleTextareaRef.current.style.height = "auto";
      titleTextareaRef.current.style.height = `${titleTextareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  // Dedicated file input & state for manual image upload in editor
  const contentImageInputRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadingContentImage, setUploadingContentImage] =
    React.useState(false);
  const [imageMenuOpen, setImageMenuOpen] = React.useState(false);

  // Table UI state
  const tableFileInputRef = React.useRef<HTMLInputElement | null>(null);
  const editorRef = React.useRef<Editor | null>(null);
  const [selectionTick, setSelectionTick] = React.useState(0);

  // Link modal dialog state
  const [linkModalOpen, setLinkModalOpen] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState("");
  const [linkText, setLinkText] = React.useState("");
  const [linkOpenInNewTab, setLinkOpenInNewTab] = React.useState(false);
  const [isEditingExistingLink, setIsEditingExistingLink] = React.useState(false);
  const linkSelectionRangeRef = React.useRef<{ from: number; to: number } | null>(null);
  const linkUrlInputRef = React.useRef<HTMLInputElement | null>(null);
  const openLinkModalRef = React.useRef<() => void>(() => {});

  const [tableMenuOpen, setTableMenuOpen] = React.useState(false);
  const [tablePicker, setTablePicker] = React.useState<{
    rows: number;
    cols: number;
  } | null>(null);
  const [tableHeaderOption, setTableHeaderOption] = React.useState(true);
  const [importingTable, setImportingTable] = React.useState(false);
  const [cellFillMenuOpen, setCellFillMenuOpen] = React.useState(false);

  // Manual image upload function supporting multiple images at once & auto-collage layout
  const uploadAndInsertImages = async (files: File[]) => {
    if (!editor || files.length === 0) return;

    const validFiles = files.filter(
      (f) => f.type.startsWith("image/") && f.size <= 10 * 1024 * 1024
    );

    if (validFiles.length === 0) {
      alert("Please upload valid image files under 10MB (JPG, PNG, WebP, GIF, SVG).");
      return;
    }

    setUploadingContentImage(true);
    setSaveState("Saving...");
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("blog_admin_token")
          : null;
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        headers["x-auth-token"] = token;
      }

      // Upload all selected files concurrently
      const uploadPromises = validFiles.map(async (file) => {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/blog/upload", {
          method: "POST",
          body: fd,
          headers,
        });
        const data = await res.json();
        return {
          file,
          success: res.ok && data.success && data.url,
          url: data.url,
          name: file.name,
        };
      });

      const results = await Promise.all(uploadPromises);
      const successful = results.filter((r) => r.success && r.url);

      if (successful.length > 0) {
        // If multiple images are uploaded together:
        // Automatically arrange them side-by-side as a clean collage!
        const isMultiple = successful.length > 1;
        const defaultWidth =
          successful.length === 2
            ? "48%"
            : successful.length === 3
            ? "31%"
            : "48%"; // 4 images = 2x2 grid (48% each)
        const defaultAlignment = isMultiple ? "inline" : "center";

        successful.forEach((img) => {
          const altText = img.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]+/g, " ");
          editor
            .chain()
            .focus()
            .setImage({
              src: img.url,
              alt: altText,
              alignment: defaultAlignment,
              width: isMultiple ? defaultWidth : "100%",
              rounded: true,
            } as any)
            .run();
        });

        setSaveState("Unsaved changes");
      } else {
        alert("Failed to upload images. Please check your connection and try again.");
      }
    } catch (err) {
      console.error("Editor image upload error:", err);
      alert(
        "Failed to upload image. Check your internet connection or try again.",
      );
    } finally {
      setUploadingContentImage(false);
      if (contentImageInputRef.current) {
        contentImageInputRef.current.value = "";
      }
    }
  };

  const handleContentImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      uploadAndInsertImages(files);
    }
  };

  const handleInsertImageUrl = () => {
    if (!editor) return;
    setImageMenuOpen(false);
    const url = window.prompt("Enter image URL (https://...):");
    if (url && url.trim()) {
      editor
        .chain()
        .focus()
        .setImage({ src: url.trim(), alignment: "center", rounded: true } as any)
        .run();
      setSaveState("Unsaved changes");
    }
  };

  const insertEmptyTable = (rows: number, cols: number) => {
    if (!editor) return;
    insertGridAsTable(
      editor,
      { rows: [], cols: 0 },
      {
        withHeaderRow: tableHeaderOption,
        emptyRows: rows,
        emptyCols: cols,
      },
    );
    setTablePicker(null);
    setTableMenuOpen(false);
    setSaveState("Unsaved changes");
  };

  const importTableFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Table file must be smaller than 5MB.");
        if (tableFileInputRef.current) tableFileInputRef.current.value = "";
        return;
      }
      setImportingTable(true);
      try {
        const text = await file.text();
        const grid = parseTableText(text);
        if (!grid.rows.length || !grid.cols) {
          alert("No rows found in that file. Expected a CSV or TSV file.");
        } else {
          if (!editor) return;
          insertGridAsTable(editor, grid, { withHeaderRow: true });
          setTableMenuOpen(false);
          setSaveState("Unsaved changes");
          const trimmed =
            grid.rows.length > MAX_TABLE_ROWS || grid.cols > MAX_TABLE_COLS
              ? ` (trimmed to ${MAX_TABLE_ROWS}×${MAX_TABLE_COLS})`
              : "";
          alert(
            `Imported ${grid.rows.length} rows × ${grid.cols} columns${trimmed}.`,
          );
        }
      } catch (err) {
        console.error("Table import error:", err);
        alert("Could not read that file.");
      } finally {
        setImportingTable(false);
        if (tableFileInputRef.current) tableFileInputRef.current.value = "";
      }
    }
  };

  // Header cells and body cells are different node types, so the active
  // cell's attributes have to be read from whichever type the cursor is in.
  const activeCellAttributes = () => {
    if (!editor) return {} as Record<string, unknown>;
    return editor.getAttributes(
      editor.isActive("tableHeader") ? "tableHeader" : "tableCell",
    ) as Record<string, unknown>;
  };

  const setCellFill = (color: string | null) => {
    if (!editor) return;
    editor.chain().focus().setCellAttribute("backgroundColor", color).run();
    setCellFillMenuOpen(false);
  };

  const setCellAlign = (align: string) => {
    if (!editor) return;
    editor.chain().focus().setCellAttribute("textAlign", align).run();
  };

  // TipTap Editor instance
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      UnderlineExtension,
      TextColorMark,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#1c3b2b] underline font-medium",
        },
      }),
      ResizableImage,
      Table.configure({
        resizable: true,
        lastColumnResizable: false,
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableHeaderWithStyle,
      TableCellWithStyle,
      PlaceholderExtension.configure({
        placeholder: "Write your content here...",
      }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[380px] p-5 font-figtree text-base sm:text-[17px] leading-[1.8] focus:outline-none text-[#1e2422] max-w-none [&_strong]:text-inherit [&_strong]:font-bold [&_b]:text-inherit [&_b]:font-bold [&_h1]:font-belleza [&_h1]:text-3xl sm:[&_h1]:text-4xl [&_h1]:font-normal [&_h1]:text-[#1e2422] [&_h1_*]:!text-[#1e2422] [&_h1]:my-5 [&_h2]:font-belleza [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-normal [&_h2]:text-[#1e2422] [&_h2_*]:!text-[#1e2422] [&_h2]:my-4 [&_h3]:font-belleza [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-normal [&_h3]:text-[#1c3b2b] [&_h3_*]:!text-[#1c3b2b] [&_h3]:my-3 [&_h4]:font-belleza [&_h4]:text-lg [&_h4]:font-normal [&_h4]:text-[#1e2422] [&_h4_*]:!text-[#1e2422] [&_h4]:my-2 [&_h5]:font-figtree [&_h5]:text-base [&_h5]:font-semibold [&_h5]:text-[#1e2422] [&_h5]:my-2 [&_h6]:font-figtree [&_h6]:text-sm [&_h6]:font-semibold [&_h6]:text-[#1e2422] [&_h6]:my-2 [&_p]:font-figtree [&_p]:text-stone-700 [&_p]:mb-4 [&_p]:leading-[1.8] [&_blockquote]:border-l-4 [&_blockquote]:border-[#1c3b2b] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-[#f4efe6]/70 [&_blockquote]:py-2.5 [&_blockquote]:text-stone-800 [&_blockquote]:rounded-r-xl [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_img]:rounded-lg [&_img]:max-w-full [&_img]:my-3 [&_a]:text-[#1c3b2b] [&_a]:underline [&_a]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_table]:table-fixed [&_table]:my-5 [&_table]:text-sm [&_table]:overflow-x-auto [&_td]:border [&_td]:border-[#e3dac9] [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:min-w-[80px] [&_td]:font-figtree [&_td]:text-stone-700 [&_th]:border [&_th]:border-[#e3dac9] [&_th]:bg-[#f4efe6] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-belleza [&_th]:font-normal [&_th]:text-[#1e2422] [&_th]:align-top [&_.selectedCell]:outline [&_.selectedCell]:outline-2 [&_.selectedCell]:outline-[#1c3b2b] [&_.column-resize-handle]:bg-[#1c3b2b] [&_.column-resize-handle]:relative [&_.column-resize-handle]:after:absolute [&_.column-resize-handle]:after:right-[-2px] [&_.column-resize-handle]:after:top-0 [&_.column-resize-handle]:after:bottom-0 [&_.column-resize-handle]:after:w-[4px] [&_.column-resize-handle]:after:bg-black/20 [&_.column-resize-handle]:after:content-[''] [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)] [&_p.is-editor-empty:first-child]:before:float-left [&_p.is-editor-empty:first-child]:before:text-stone-400 [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:h-0",
      },
      handlePaste: (view, event) => {
        const clipboard = event.clipboardData;
        if (!clipboard) return false;

        const html = clipboard.getData("text/html") || "";

        // 1. Standalone table: only a <table> on the clipboard (e.g. copied from Sheets or standalone table in Docs)
        if (html && isStandaloneTableHtml(html)) {
          const htmlGrid = parseHtmlTable(html);
          if (htmlGrid && editorRef.current) {
            event.preventDefault();
            insertGridAsTable(editorRef.current, htmlGrid, {
              withHeaderRow: true,
            });
            return true;
          }
        }

        // 2. Tab-separated text from Excel / Google Sheets / Word.
        const text = clipboard.getData("text/plain") || "";
        if (looksLikeTabularText(text) && editorRef.current) {
          event.preventDefault();
          const grid = parseTableText(text);
          if (grid.rows.length && grid.cols) {
            insertGridAsTable(editorRef.current, grid, { withHeaderRow: true });
            return true;
          }
        }

        // 3. Rich HTML payload (Google Docs, Word, web pages with headings H2-H6, paragraphs, lists, and tables).
        // Clean Google Docs wrappers (b#docs-internal-guid), normalize H1 -> H2, detect Word/Docs headings,
        // clean typography, and insert via TipTap content parser.
        if (html && html.trim() && editorRef.current) {
          event.preventDefault();
          const cleaned = cleanGoogleDocsHtml(html);
          if (editorRef.current.isEmpty) {
            editorRef.current.commands.setContent(cleaned);
          } else {
            editorRef.current.commands.insertContent(cleaned);
          }
          return true;
        }

        // 4. Image on clipboard (screenshots, copied files)
        const pastedFiles: File[] = [];
        for (const item of Array.from(clipboard.items || [])) {
          if (item.type.indexOf("image") === 0) {
            const file = item.getAsFile();
            if (file) pastedFiles.push(file);
          }
        }
        if (pastedFiles.length > 0) {
          event.preventDefault();
          uploadAndInsertImages(pastedFiles);
          return true;
        }

        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        if (
          !moved &&
          event.dataTransfer?.files &&
          event.dataTransfer.files.length > 0
        ) {
          const droppedFiles = Array.from(event.dataTransfer.files).filter((f) =>
            f.type.startsWith("image/")
          );
          if (droppedFiles.length > 0) {
            event.preventDefault();
            uploadAndInsertImages(droppedFiles);
            return true;
          }
        }
        return false;
      },
      handleKeyDown: (view, event) => {
        if (
          (event.metaKey || event.ctrlKey) &&
          event.key.toLowerCase() === "k"
        ) {
          event.preventDefault();
          openLinkModalRef.current();
          return true;
        }
        return false;
      },
    },
    onCreate: ({ editor: ed }) => {
      editorRef.current = ed;
    },
    onSelectionUpdate: () => {
      setSelectionTick((t) => (t + 1) & 0xffff);
    },
    onTransaction: () => {
      setSelectionTick((t) => (t + 1) & 0xffff);
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      const cleanHtml = html === "<p></p>" ? "" : html;
      setPostForm((prev) => ({
        ...prev,
        content: cleanHtml,
      }));
      setSaveState("Unsaved changes");
    },
  });

  // Sync TipTap content when switching posts
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [postForm.id, editor]);

  // Color picker state & click-outside listener
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setColorMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeTextColor = editor?.getAttributes("textColor")?.color || "";

  const applyTextColor = (color: string) => {
    if (!editor) return;
    editor.chain().focus().setColor(color).run();
    setSaveState("Unsaved changes");
  };

  const resetTextColor = () => {
    if (!editor) return;
    editor.chain().focus().unsetColor().run();
    setSaveState("Unsaved changes");
  };

  // Apply a block format (paragraph / heading / quote / list) to ONLY the selected text.
  // Surrounding text in the same block is split off and left untouched.
  const applyBlockFormatToSelection = (val: string) => {
    if (!editor) return;

    const { state } = editor;
    const { from, to, empty } = state.selection;

    const isHeading = /^h[1-6]$/.test(val);
    const rawLevel = isHeading
      ? (Number(val.slice(1)) as 1 | 2 | 3 | 4 | 5 | 6)
      : null;
    // H1 is strictly reserved for the blog post title, so map any H1 to H2
    const level = rawLevel === 1 ? 2 : rawLevel;
    const listName = val === "bulletList" || val === "orderedList" ? val : null;

    const toggleWholeBlock = () => {
      if (listName === "bulletList")
        editor.chain().focus().toggleBulletList().run();
      else if (listName === "orderedList")
        editor.chain().focus().toggleOrderedList().run();
      else if (val === "quote") editor.chain().focus().toggleBlockquote().run();
      else if (level !== null)
        editor.chain().focus().setHeading({ level }).run();
      else editor.chain().focus().setParagraph().run();
    };

    // Cursor only (no selection): toggle the whole block under the cursor
    if (empty) {
      toggleWholeBlock();
      return;
    }

    const $from = state.doc.resolve(from);
    const $to = state.doc.resolve(to);
    const wholeBlockSelected =
      $from.parentOffset === 0 &&
      $to.parentOffset === $from.parent.content.size;

    // Whole block selected: normal toggle so re-applying the same style reverts it
    if (wholeBlockSelected) {
      toggleWholeBlock();
      return;
    }

    const targetNode = listName
      ? state.schema.nodes[listName]
      : val === "quote"
        ? state.schema.nodes.blockquote
        : level !== null
          ? state.schema.nodes.heading
          : state.schema.nodes.paragraph;
    if (!targetNode) return;

    const attrs = level !== null ? { level } : {};
    // blockquote and lists hold block children, so they cannot reuse inline content directly
    const needsParagraphWrapper = listName !== null || val === "quote";

    editor
      .chain()
      .focus()
      .command(({ tr, dispatch }) => {
        if (!dispatch) return true;

        const $from0 = tr.doc.resolve(from);
        const splitAtFrom = $from0.parentOffset > 0;
        const originalBlockStart = $from0.before();

        // Split at `to` first so `from` stays valid, then at `from`.
        // This isolates the selected text into its own block.
        const $to0 = tr.doc.resolve(to);
        if ($to0.parentOffset < $to0.parent.content.size) tr.split(to);
        if (splitAtFrom) tr.split(from);

        // After split(from) the isolated block is the one inserted right after `from`
        const blockStart = splitAtFrom ? from + 1 : originalBlockStart;
        const blockNode = tr.doc.nodeAt(blockStart);
        if (!blockNode) return true;

        if (needsParagraphWrapper) {
          const { listItem, paragraph } = state.schema.nodes;
          if (!paragraph) return true;
          const paragraphNode = paragraph.create(null, blockNode.content);
          const content = listName
            ? listItem?.create(null, paragraphNode)
            : paragraphNode;
          if (!content) return true;
          tr.replaceWith(
            blockStart,
            blockStart + blockNode.nodeSize,
            targetNode.create(null, content),
          );
        } else {
          // Retype only the isolated block
          tr.setNodeMarkup(blockStart, targetNode, attrs);
        }

        return true;
      })
      .run();

    setSaveState("Unsaved changes");
  };

  // Open custom link dialog modal
  const handleOpenLinkModal = () => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    linkSelectionRangeRef.current = { from, to };
    const selectedText = editor.state.doc.textBetween(from, to, " ");
    const linkAttrs = editor.getAttributes("link");
    setLinkUrl(linkAttrs.href || "");
    setLinkText(selectedText || "");
    setLinkOpenInNewTab(linkAttrs.target === "_blank");
    setIsEditingExistingLink(Boolean(linkAttrs.href));
    setLinkModalOpen(true);
  };

  openLinkModalRef.current = handleOpenLinkModal;

  const handleCloseLinkModal = () => {
    setLinkModalOpen(false);
    if (editor) {
      editor.commands.focus();
    }
  };

  const handleSaveLink = () => {
    if (!editor) return;

    const url = linkUrl.trim();
    const text = linkText.trim();
    const range = linkSelectionRangeRef.current;

    editor.commands.focus();
    if (range) {
      editor.commands.setTextSelection({ from: range.from, to: range.to });
    }

    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setLinkModalOpen(false);
      setSaveState("Unsaved changes");
      return;
    }

    let formattedUrl = url;
    if (
      !/^(https?:\/\/|mailto:|tel:|#|\/)/i.test(formattedUrl) &&
      formattedUrl.includes(".")
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const linkAttrs = {
      href: formattedUrl,
      target: linkOpenInNewTab ? "_blank" : null,
      rel: linkOpenInNewTab ? "noopener noreferrer" : null,
    };

    const hasSelection = range && range.from !== range.to;

    if (hasSelection && text) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: text,
          marks: [{ type: "link", attrs: linkAttrs }],
        })
        .run();
    } else if (!hasSelection && text) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: text,
          marks: [{ type: "link", attrs: linkAttrs }],
        })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink(linkAttrs)
        .run();
    }

    setLinkModalOpen(false);
    setSaveState("Unsaved changes");
  };

  const handleRemoveLink = () => {
    if (!editor) return;
    const range = linkSelectionRangeRef.current;
    editor.commands.focus();
    if (range) {
      editor.commands.setTextSelection({ from: range.from, to: range.to });
    }
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkModalOpen(false);
    setSaveState("Unsaved changes");
  };

  React.useEffect(() => {
    if (linkModalOpen) {
      const timer = setTimeout(() => {
        linkUrlInputRef.current?.focus();
        linkUrlInputRef.current?.select();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [linkModalOpen]);

  // Current active block format (p, h2, h3, h4, h5, h6).
  // Automatically re-evaluates on selection movements thanks to selectionTick.
  const activeBlockFormat = React.useMemo(() => {
    if (!editor) return "p";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    if (editor.isActive("heading", { level: 5 })) return "h5";
    if (editor.isActive("heading", { level: 6 })) return "h6";
    if (editor.isActive("heading", { level: 1 })) return "h2";
    return "p";
  }, [editor, selectionTick]);

  return (
    <div className="max-w-[1320px] mx-auto w-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("dashboard")}
            className="text-body-sm text-[#6B5862] hover:text-[#2A1621] flex items-center gap-1 font-semibold cursor-pointer transition-colors"
          >
            ‹ All posts
          </button>
          <h1 className="font-display text-subsection font-bold text-[#2A1621]">
            {postForm.id === 0 ? "Write a post" : "Edit post"}
          </h1>
          <span className="text-label text-[#6B5862]/80 bg-[#FAF6F0] px-2.5 py-0.5 rounded-full border border-[#e6ded2]">
            {saveState}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
        {/* ============ MAIN COLUMN ============ */}
        <div>
          <label htmlFor="post-title" className="sr-only">
            Title
          </label>
          <textarea
            ref={titleTextareaRef}
            id="post-title"
            className="w-full border-0 bg-transparent font-serif text-subsection font-bold leading-snug resize-none p-0 mb-2 text-[#2A1621] focus:outline-none placeholder:text-[#6B5862]/40 min-h-[38px] overflow-hidden"
            rows={1}
            placeholder="Add title"
            value={title}
            // Only enforce while the title is within the cap. A post saved before
            // the limit existed can load with a longer title, and Chrome would
            // silently truncate it to 70 on the first keystroke and lose the
            // author's text. Leave the cap off in that case so it can be
            // shortened by hand; it comes back as soon as it fits.
            maxLength={title.length > TITLE_MAX_LENGTH ? undefined : TITLE_MAX_LENGTH}
            aria-describedby="title-char-count"
            aria-invalid={title.length > TITLE_MAX_LENGTH || undefined}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                editor?.commands.focus("start");
              }
            }}
            onChange={(e) => {
              // maxLength already blocks typing/pasting past the cap; this clamp
              // also covers programmatic updates. Titles that are already over
              // the cap are left alone so nothing gets silently truncated.
              const incoming = e.target.value;
              const val = incoming.slice(0, TITLE_MAX_LENGTH);
              setPostForm((prev) => ({
                ...prev,
                title: prev.title.length > TITLE_MAX_LENGTH ? incoming : val,
                slug: prev.slugTouched ? prev.slug : slugify(prev.title.length > TITLE_MAX_LENGTH ? incoming : val),
              }));
              setSaveState("Unsaved changes");
            }}
          />

          <div className="text-body-sm text-[#6B5862] flex items-center gap-1 mb-4 flex-wrap font-mono">
            <span>https://www.siddhantschoolofyoga.com/blog/</span>
            <input
              id="slug"
              aria-label="URL slug"
              className="border border-[#e6ded2] bg-white px-2 py-0.5 rounded text-body-sm text-[#2A1621] focus:outline-none focus:ring-1 focus:ring-[#1c3b2b]"
              value={slug}
              onChange={(e) => {
                setPostForm((prev) => ({
                  ...prev,
                  slug: e.target.value,
                  slugTouched: true,
                }));
                setSaveState("Unsaved changes");
              }}
            />
            <span
              id="title-char-count"
              aria-live="polite"
              className={`ml-auto font-sans text-label tabular-nums ${
                title.length >= TITLE_MAX_LENGTH
                  ? "text-red-600 font-semibold"
                  : "text-[#6B5862]/70"
              }`}
            >
              {title.length} / {TITLE_MAX_LENGTH}
            </span>
          </div>

          <div className="bg-white border border-[#e6ded2] rounded-xl shadow-xs">
            {/* Toolbar + contextual table controls stick together so table options
                never scroll out of reach while editing a long post. */}
            <div className="sticky top-0 z-20 bg-white rounded-t-xl shadow-[0_1px_0_0_rgba(230,222,210,0.9)]">
              <div
                className="flex flex-wrap gap-1 p-2 border-b border-[#e6ded2] bg-white items-center"
                role="toolbar"
                aria-label="Formatting"
                onMouseDown={(e) => {
                  // Keep the caret/selection (and the page position) when clicking
                  // toolbar buttons. Native <select>/color inputs are left alone.
                  if ((e.target as HTMLElement).closest("button"))
                    e.preventDefault();
                }}
              >
                <select
                  aria-label="Text style"
                  className="h-8 px-2 text-label font-semibold bg-white border border-[#e6ded2] rounded focus:outline-none focus:ring-1 focus:ring-[#1c3b2b] text-[#2A1621] cursor-pointer"
                  value={activeBlockFormat}
                  onChange={(e) => applyBlockFormatToSelection(e.target.value)}
                >
                  <option value="p">Paragraph</option>
                  <option value="h2">Heading 2 (H2)</option>
                  <option value="h3">Heading 3 (H3)</option>
                  <option value="h4">Heading 4 (H4)</option>
                  <option value="h5">Heading 5 (H5)</option>
                  <option value="h6">Heading 6 (H6)</option>
                </select>
                <span className="w-px h-5 bg-[#e6ded2] my-1 mx-1" />
                <button
                  type="button"
                  className={`h-8 min-w-[32px] px-2 rounded font-bold text-label cursor-pointer inline-flex items-center justify-center transition-colors ${
                    editor?.isActive("bold")
                      ? "bg-[#1c3b2b] text-white"
                      : "hover:bg-[#FAF6F0] text-[#2A1621]"
                  }`}
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  title="Bold"
                >
                  <b>B</b>
                </button>
                <button
                  type="button"
                  className={`h-8 min-w-[32px] px-2 rounded font-bold text-label cursor-pointer inline-flex items-center justify-center transition-colors ${
                    editor?.isActive("italic")
                      ? "bg-[#1c3b2b] text-white"
                      : "hover:bg-[#FAF6F0] text-[#2A1621]"
                  }`}
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  title="Italic"
                >
                  <i>I</i>
                </button>
                <button
                  type="button"
                  className={`h-8 min-w-[32px] px-2 rounded font-bold text-label cursor-pointer inline-flex items-center justify-center transition-colors ${
                    editor?.isActive("underline")
                      ? "bg-[#1c3b2b] text-white"
                      : "hover:bg-[#FAF6F0] text-[#2A1621]"
                  }`}
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                  title="Underline"
                >
                  <u>U</u>
                </button>

                {/* Text Color — separate from Bold/Italic/Underline */}
                <div
                  className="relative inline-flex items-center"
                  ref={colorPickerRef}
                >
                  <button
                    type="button"
                    className={`h-8 min-w-[32px] px-2 rounded font-bold text-label cursor-pointer inline-flex items-center justify-center gap-1 transition-colors ${
                      activeTextColor
                        ? "bg-[#FAF6F0] text-[#2A1621]"
                        : "hover:bg-[#FAF6F0] text-[#2A1621]"
                    }`}
                    onClick={() => setColorMenuOpen((open) => !open)}
                    title="Text color"
                    aria-label="Text color"
                    aria-expanded={colorMenuOpen}
                  >
                    <span>A</span>
                    <span
                      className="w-3.5 h-[3px] rounded-full border border-[#e6ded2]"
                      style={{ backgroundColor: activeTextColor || "#2A1621" }}
                    />
                  </button>
                  {colorMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setColorMenuOpen(false)}
                      />
                      <div className="absolute left-0 top-full mt-1 w-44 bg-white border border-[#e6ded2] rounded-lg shadow-lg z-30 p-2">
                        <p className="text-label font-bold uppercase tracking-wider text-[#6B5862] px-1 mb-1.5">
                          Text Color
                        </p>
                        <div className="grid grid-cols-5 gap-1.5">
                          {TEXT_COLORS.map((swatch) => (
                            <button
                              key={swatch.color}
                              type="button"
                              title={swatch.label}
                              aria-label={swatch.label}
                              onClick={() => {
                                applyTextColor(swatch.color);
                                setColorMenuOpen(false);
                              }}
                              className={`h-6 w-6 rounded-md border transition-transform hover:scale-110 cursor-pointer ${
                                activeTextColor?.toLowerCase() ===
                                swatch.color.toLowerCase()
                                  ? "border-[#1c3b2b] ring-1 ring-[#1c3b2b]"
                                  : "border-[#e6ded2]"
                              }`}
                              style={{ backgroundColor: swatch.color }}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            resetTextColor();
                            setColorMenuOpen(false);
                          }}
                          className="w-full mt-2 text-left px-2 py-1.5 rounded-md text-label font-bold text-[#6B5862] hover:bg-[#FAF6F0] hover:text-[#1c3b2b] transition-colors cursor-pointer"
                        >
                          Reset to default
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <span className="w-px h-5 bg-[#e6ded2] my-1 mx-1" />
                <button
                  type="button"
                  className={`h-8 px-2 rounded font-bold text-label cursor-pointer inline-flex items-center justify-center transition-colors ${
                    editor?.isActive("bulletList")
                      ? "bg-[#1c3b2b] text-white"
                      : "hover:bg-[#FAF6F0] text-[#2A1621]"
                  }`}
                  onClick={() => applyBlockFormatToSelection("bulletList")}
                  title="Bulleted list"
                >
                  • List
                </button>
                <button
                  type="button"
                  className={`h-8 px-2 rounded font-bold text-label cursor-pointer inline-flex items-center justify-center transition-colors ${
                    editor?.isActive("orderedList")
                      ? "bg-[#1c3b2b] text-white"
                      : "hover:bg-[#FAF6F0] text-[#2A1621]"
                  }`}
                  onClick={() => applyBlockFormatToSelection("orderedList")}
                  title="Numbered list"
                >
                  1. List
                </button>
                <button
                  type="button"
                  className={`h-8 px-2 rounded font-bold text-label cursor-pointer inline-flex items-center justify-center transition-colors ${
                    editor?.isActive("blockquote")
                      ? "bg-[#1c3b2b] text-white"
                      : "hover:bg-[#FAF6F0] text-[#2A1621]"
                  }`}
                  onClick={() => applyBlockFormatToSelection("quote")}
                  title="Quote"
                >
                  “ ”
                </button>
                <span className="w-px h-5 bg-[#e6ded2] my-1 mx-1" />
                <button
                  type="button"
                  className={`h-8 px-2 rounded font-bold text-label cursor-pointer inline-flex items-center justify-center transition-colors ${
                    editor?.isActive("link")
                      ? "bg-[#1c3b2b] text-white"
                      : "hover:bg-[#FAF6F0] text-[#2A1621]"
                  }`}
                  onClick={handleOpenLinkModal}
                  title="Insert or edit link (Ctrl+K / ⌘K)"
                >
                  Link
                </button>

                {/* Image Upload Button with Dropdown (Upload from PC or enter URL) */}
                <div className="relative inline-flex items-center">
                  <input
                    type="file"
                    ref={contentImageInputRef}
                    onChange={handleContentImageFileChange}
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingContentImage}
                    className="h-8 px-2.5 rounded-l font-bold text-label cursor-pointer inline-flex items-center gap-1.5 bg-[#FAF6F0] hover:bg-[#fff3f8] text-[#2A1621] hover:text-[#1c3b2b] border border-[#e6ded2] transition-colors disabled:opacity-50"
                    onClick={() => contentImageInputRef.current?.click()}
                    title="Upload single or multiple images (creates instant side-by-side collage)"
                  >
                    {uploadingContentImage ? (
                      <>
                        <svg
                          className="animate-spin h-3.5 w-3.5 text-[#1c3b2b]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3.5 h-3.5 text-[#1c3b2b]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Upload Image</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="h-8 px-1.5 rounded-r font-bold text-label cursor-pointer inline-flex items-center justify-center bg-[#FAF6F0] hover:bg-[#fff3f8] text-[#6B5862] hover:text-[#1c3b2b] border-y border-r border-[#e6ded2] transition-colors"
                    onClick={() => setImageMenuOpen(!imageMenuOpen)}
                    title="More image options"
                  >
                    ▾
                  </button>
                  {imageMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setImageMenuOpen(false)}
                      />
                      <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-[#e6ded2] rounded-lg shadow-lg z-30 py-1 text-label">
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 hover:bg-[#FAF6F0] flex items-center gap-2 text-[#2A1621]"
                          onClick={() => {
                            setImageMenuOpen(false);
                            contentImageInputRef.current?.click();
                          }}
                        >
                          <span>📁</span>
                          <span>Upload from Computer</span>
                        </button>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 hover:bg-[#FAF6F0] flex items-center gap-2 text-[#2A1621]"
                          onClick={handleInsertImageUrl}
                        >
                          <span>🔗</span>
                          <span>Insert from URL...</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <span className="w-px h-5 bg-[#e6ded2] my-1 mx-1" />

                {/* Table: insert via grid picker, or import a CSV/TSV file */}
                <div className="relative inline-flex items-center">
                  <input
                    type="file"
                    ref={tableFileInputRef}
                    onChange={importTableFile}
                    accept=".csv,.tsv,.tab,.txt,text/csv,text/tab-separated-values,text/plain"
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={importingTable}
                    className={`h-8 px-2 rounded-l font-bold text-label cursor-pointer inline-flex items-center gap-1.5 border border-[#e6ded2] transition-colors disabled:opacity-50 ${
                      editor?.isActive("table")
                        ? "bg-[#1c3b2b] text-white border-[#1c3b2b]"
                        : "bg-[#FAF6F0] hover:bg-[#fff3f8] text-[#2A1621] hover:text-[#1c3b2b]"
                    }`}
                    onClick={() => {
                      setTablePicker(null);
                      setTableMenuOpen(!tableMenuOpen);
                    }}
                    title="Insert a table"
                  >
                    {importingTable ? (
                      <span>Importing...</span>
                    ) : (
                      <>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 10h18M3 14h18M3 6h18M9 3v18M15 3v18"
                          />
                        </svg>
                        <span>Table</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="h-8 px-1.5 rounded-r font-bold text-label cursor-pointer inline-flex items-center justify-center bg-[#FAF6F0] hover:bg-[#fff3f8] text-[#6B5862] hover:text-[#1c3b2b] border-y border-r border-[#e6ded2] transition-colors"
                    onClick={() => {
                      setTablePicker(null);
                      setTableMenuOpen(!tableMenuOpen);
                    }}
                    title="More table options"
                  >
                    ▾
                  </button>

                  {tableMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setTableMenuOpen(false)}
                      />
                      <div className="absolute left-0 top-full mt-1 w-[268px] bg-white border border-[#e6ded2] rounded-lg shadow-lg z-30 p-3 text-label">
                        <p className="font-bold uppercase tracking-wider text-[#6B5862] mb-1.5">
                          Insert table
                        </p>
                        <p className="text-[#6B5862] mb-2 h-4">
                          {tablePicker
                            ? `${tablePicker.cols} columns × ${tablePicker.rows} rows`
                            : "Hover to choose a size"}
                        </p>
                        <div className="inline-grid grid-cols-10 gap-[3px]">
                          {Array.from({ length: 8 }).map((_, r) =>
                            Array.from({ length: 10 }).map((__, c) => {
                              const rows = r + 1;
                              const cols = c + 1;
                              const on =
                                !!tablePicker &&
                                tablePicker.rows >= rows &&
                                tablePicker.cols >= cols;
                              return (
                                <button
                                  key={`${rows}-${cols}`}
                                  type="button"
                                  aria-label={`${cols} columns by ${rows} rows`}
                                  onMouseEnter={() =>
                                    setTablePicker({ rows, cols })
                                  }
                                  onClick={() => insertEmptyTable(rows, cols)}
                                  className={`w-[20px] h-[20px] rounded-[3px] border transition-colors ${
                                    on
                                      ? "bg-[#1c3b2b] border-[#1c3b2b]"
                                      : "bg-[#FAF6F0] border-[#e6ded2] hover:border-[#1c3b2b]"
                                  }`}
                                />
                              );
                            }),
                          )}
                        </div>

                        <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={tableHeaderOption}
                            onChange={(e) =>
                              setTableHeaderOption(e.target.checked)
                            }
                            className="accent-[#1c3b2b] w-3.5 h-3.5"
                          />
                          <span className="text-[#2A1621] font-medium">
                            First row is a header
                          </span>
                        </label>

                        <div className="h-px bg-[#e6ded2] my-3" />

                        <button
                          type="button"
                          onClick={() => {
                            setTableMenuOpen(false);
                            tableFileInputRef.current?.click();
                          }}
                          className="w-full text-left px-2 py-2 rounded-md hover:bg-[#FAF6F0] flex items-center gap-2 text-[#2A1621] font-medium cursor-pointer"
                        >
                          <span>📄</span>
                          <span>Import from CSV / TSV file...</span>
                        </button>
                        <p className="text-[#6B5862] mt-1.5 leading-relaxed">
                          Tip: you can also copy a range in Excel or Google
                          Sheets and paste it straight into the editor.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <span className="w-px h-5 bg-[#e6ded2] my-1 mx-1" />
                <button
                  type="button"
                  className="h-8 min-w-[32px] px-2 rounded font-bold text-label cursor-pointer inline-flex items-center justify-center hover:bg-[#FAF6F0] text-[#2A1621] transition-colors disabled:opacity-30"
                  onClick={() => editor?.chain().focus().undo().run()}
                  disabled={!editor?.can().undo()}
                  title="Undo"
                >
                  ↶
                </button>
                <button
                  type="button"
                  className="h-8 min-w-[32px] px-2 rounded font-bold text-label cursor-pointer inline-flex items-center justify-center hover:bg-[#FAF6F0] text-[#2A1621] transition-colors disabled:opacity-30"
                  onClick={() => editor?.chain().focus().redo().run()}
                  disabled={!editor?.can().redo()}
                  title="Redo"
                >
                  ↷
                </button>
              </div>

              {/* Contextual table controls — only while the cursor is in a table */}
              {editor?.isActive("table") && (
                <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 bg-[#FAF6F0] border-b border-[#e6ded2] text-label">
                  <span className="font-bold uppercase tracking-wider text-[#6B5862] pr-1.5 mr-1 border-r border-[#e6ded2]">
                    Table
                  </span>

                  <button
                    type="button"
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#1c3b2b] transition-colors cursor-pointer"
                    title="Add a row below"
                  >
                    Row +
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#1c3b2b] transition-colors cursor-pointer"
                    title="Add a row above"
                  >
                    Row ↑
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().addColumnAfter().run()
                    }
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#1c3b2b] transition-colors cursor-pointer"
                    title="Add a column to the right"
                  >
                    Col +
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().addColumnBefore().run()
                    }
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#1c3b2b] transition-colors cursor-pointer"
                    title="Add a column to the left"
                  >
                    Col ←
                  </button>

                  <span className="w-px h-5 bg-[#e6ded2] mx-1" />

                  <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#1c3b2b] transition-colors cursor-pointer"
                    title="Delete the current row"
                  >
                    Row ×
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#1c3b2b] transition-colors cursor-pointer"
                    title="Delete the current column"
                  >
                    Col ×
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().mergeCells().run()}
                    disabled={!editor.can().mergeCells()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#1c3b2b] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Merge selected cells"
                  >
                    Merge
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().splitCell().run()}
                    disabled={!editor.can().splitCell()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#1c3b2b] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Split the current cell"
                  >
                    Split
                  </button>

                  <span className="w-px h-5 bg-[#e6ded2] mx-1" />

                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleHeaderRow().run()
                    }
                    className={`px-2 py-1 rounded font-medium transition-colors cursor-pointer ${
                      editor.isActive("tableHeader")
                        ? "bg-[#1c3b2b] text-white"
                        : "text-[#2A1621] hover:bg-white hover:text-[#1c3b2b]"
                    }`}
                    title="Toggle the first row as a header"
                  >
                    Header
                  </button>

                  <span className="w-px h-5 bg-[#e6ded2] mx-1" />

                  {(["left", "center", "right"] as const).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => setCellAlign(align)}
                      className={`px-2 py-1 rounded font-medium transition-colors cursor-pointer ${
                        activeCellAttributes().textAlign === align
                          ? "bg-[#1c3b2b] text-white"
                          : "text-[#2A1621] hover:bg-white hover:text-[#1c3b2b]"
                      }`}
                      title={`Align ${align}`}
                    >
                      {align === "left" ? "⇤" : align === "center" ? "↔" : "⇥"}
                    </button>
                  ))}

                  {/* Cell fill colour */}
                  <div className="relative inline-flex">
                    <button
                      type="button"
                      onClick={() => setCellFillMenuOpen(!cellFillMenuOpen)}
                      className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#1c3b2b] transition-colors cursor-pointer inline-flex items-center gap-1"
                      title="Cell background colour"
                    >
                      <span
                        aria-hidden="true"
                        className="w-3 h-3 rounded-[3px] border border-[#c9b8a8] inline-block"
                        style={{
                          backgroundColor:
                            (activeCellAttributes()
                              .backgroundColor as string) || "#ffffff",
                        }}
                      />
                      Fill
                    </button>
                    {cellFillMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setCellFillMenuOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#e6ded2] rounded-lg shadow-lg z-30 p-2">
                          <p className="text-label font-bold uppercase tracking-wider text-[#6B5862] px-1 mb-1.5">
                            Cell fill
                          </p>
                          <div className="grid grid-cols-5 gap-1.5">
                            {CELL_FILL_COLORS.map((swatch) => {
                              const active =
                                (activeCellAttributes().backgroundColor ||
                                  null) === swatch.value;
                              return (
                                <button
                                  key={swatch.label}
                                  type="button"
                                  title={swatch.label}
                                  aria-label={swatch.label}
                                  onClick={() => setCellFill(swatch.value)}
                                  className={`h-6 w-6 rounded-md border transition-transform hover:scale-110 cursor-pointer ${
                                    active
                                      ? "border-[#1c3b2b] ring-1 ring-[#1c3b2b]"
                                      : "border-[#e6ded2]"
                                  }`}
                                  style={{
                                    backgroundColor: swatch.value || "#ffffff",
                                  }}
                                />
                              );
                            })}
                          </div>
                          <button
                            type="button"
                            onClick={() => setCellFill(null)}
                            className="w-full mt-2 text-left px-2 py-1.5 rounded-md text-label font-bold text-[#6B5862] hover:bg-[#FAF6F0] hover:text-[#1c3b2b] transition-colors cursor-pointer"
                          >
                            Clear fill
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <span className="flex-1" />

                  <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    className="px-2 py-1 rounded font-bold text-red-600 hover:bg-white transition-colors cursor-pointer"
                    title="Delete the whole table"
                  >
                    Delete table
                  </button>
                </div>
              )}
            </div>

            <div className="relative [&_.tiptap]:focus:outline-none overflow-hidden rounded-b-xl">
              <EditorContent editor={editor} />
            </div>
          </div>

          <p className="text-right text-label text-[#6B5862]/80 mt-1.5 mb-4">
            {wordCount.words} words
          </p>

          <div className="bg-white border border-[#e6ded2] rounded-xl p-5 mb-5 shadow-xs">
            <label
              className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
              htmlFor="excerpt"
            >
              Card Description
            </label>
            <textarea
              id="excerpt"
              className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all"
              rows={2}
              value={shortDesc}
              onChange={(e) => {
                setPostForm((prev) => ({
                  ...prev,
                  short_description: e.target.value,
                }));
                setSaveState("Unsaved changes");
              }}
              placeholder="Write a short summary for blog cards..."
            />
            <p className="text-label text-[#6B5862]/80 mt-1.5 leading-normal">
              Shown on blog cards. Also used as the meta description if you
              leave that empty.
            </p>
          </div>

          {/* SEO / AIO tabs */}
          <section
            className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden"
            id="seoPanel"
          >
            <div
              className="flex overflow-x-auto border-b border-[#e6ded2]"
              role="tablist"
            >
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "seo"
                    ? "text-[#1c3b2b] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#1c3b2b]"
                    : "text-[#6B5862] hover:text-[#1c3b2b]"
                }`}
                onClick={() => setActiveEditorTab("seo")}
              >
                SEO
              </button>
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "social"
                    ? "text-[#1c3b2b] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#1c3b2b]"
                    : "text-[#6B5862] hover:text-[#1c3b2b]"
                }`}
                onClick={() => setActiveEditorTab("social")}
              >
                Social
              </button>
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "faqs"
                    ? "text-[#1c3b2b] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#1c3b2b]"
                    : "text-[#6B5862] hover:text-[#1c3b2b]"
                }`}
                onClick={() => setActiveEditorTab("faqs")}
              >
                FAQs{" "}
                <span className="text-label text-[#6B5862]">({faqs.length})</span>
              </button>
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "ai"
                    ? "text-[#1c3b2b] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#1c3b2b]"
                    : "text-[#6B5862] hover:text-[#1c3b2b]"
                }`}
                onClick={() => setActiveEditorTab("ai")}
              >
                AI answers
              </button>
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "schema"
                    ? "text-[#1c3b2b] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#1c3b2b]"
                    : "text-[#6B5862] hover:text-[#1c3b2b]"
                }`}
                onClick={() => setActiveEditorTab("schema")}
              >
                Schema
              </button>
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "adv"
                    ? "text-[#1c3b2b] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#1c3b2b]"
                    : "text-[#6B5862] hover:text-[#1c3b2b]"
                }`}
                onClick={() => setActiveEditorTab("adv")}
              >
                Advanced
              </button>
            </div>

            {/* TAB: SEO */}
            {activeEditorTab === "seo" && (
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                      htmlFor="kw"
                    >
                      Focus keyword
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all"
                      id="kw"
                      value={focusKw}
                      onChange={(e) => {
                        setPostForm((prev) => ({
                          ...prev,
                          focus_keyword: e.target.value,
                        }));
                        setSaveState("Unsaved changes");
                      }}
                      placeholder="e.g. surya namaskar for beginners"
                    />
                    <p className="text-label text-[#6B5862]/80 mt-1.5">
                      The main phrase students type into Google.
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                    htmlFor="metaTitle"
                  >
                    Meta title
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all"
                    id="metaTitle"
                    maxLength={70}
                    value={metaTitle}
                    onChange={(e) => {
                      const trimmed = e.target.value.slice(0, 70);
                      setPostForm((prev) => ({ ...prev, meta_title: trimmed }));
                      setSaveState("Unsaved changes");
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasteText = e.clipboardData.getData("text");
                      const input = e.currentTarget;
                      const start = input.selectionStart ?? 0;
                      const end = input.selectionEnd ?? 0;
                      const currentVal = input.value;
                      const newVal = (
                        currentVal.slice(0, start) +
                        pasteText +
                        currentVal.slice(end)
                      ).slice(0, 70);
                      setPostForm((prev) => ({ ...prev, meta_title: newVal }));
                      setSaveState("Unsaved changes");
                    }}
                    placeholder={
                      title ||
                      "Enter SEO title (e.g. 10 Health Benefits of Daily Yoga)"
                    }
                  />
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex-1 h-1.5 bg-[#FAF6F0] rounded-full overflow-hidden">
                      <i
                        className="block h-full transition-all duration-200"
                        style={{
                          width: `${Math.min(100, (metaTitle.length / 70) * 100)}%`,
                          background:
                            metaTitle.length === 0
                              ? "#DFCBA6"
                              : metaTitle.length < 30
                                ? "#C9862A"
                                : metaTitle.length <= 60
                                  ? "#1c3b2b"
                                  : "#b8455a",
                        }}
                      />
                    </div>
                    <span className="text-label font-semibold text-[#6B5862] tabular-nums">
                      {metaTitle.length} / 70 max
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                    htmlFor="metaDesc"
                  >
                    Meta description
                  </label>
                  <textarea
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all"
                    id="metaDesc"
                    rows={3}
                    value={metaDesc}
                    onChange={(e) => {
                      setPostForm((prev) => ({
                        ...prev,
                        meta_description: e.target.value,
                      }));
                      setSaveState("Unsaved changes");
                    }}
                    placeholder={
                      shortDesc ||
                      "Enter a compelling summary for search engine results..."
                    }
                  />
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex-1 h-1.5 bg-[#FAF6F0] rounded-full overflow-hidden">
                      <i
                        className="block h-full transition-all duration-200"
                        style={{
                          width: `${Math.min(100, (metaDesc.length / 160) * 100)}%`,
                          background:
                            metaDesc.length === 0
                              ? "#DFCBA6"
                              : metaDesc.length < 120
                                ? "#C9862A"
                                : metaDesc.length <= 160
                                  ? "#1c3b2b"
                                  : "#b8455a",
                        }}
                      />
                    </div>
                    <span className="text-label font-semibold text-[#6B5862] tabular-nums">
                      {metaDesc.length} / 120–160
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SOCIAL */}
            {activeEditorTab === "social" && (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5">
                      Facebook, WhatsApp, LinkedIn
                    </p>
                    <div className="mb-3">
                      <input
                        className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
                        placeholder="Open Graph title (defaults to SEO title)"
                        value={ogTitle}
                        onChange={(e) =>
                          setPostForm((prev) => ({
                            ...prev,
                            og_title: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
                        rows={2}
                        placeholder="Open Graph description"
                        value={ogDesc}
                        onChange={(e) =>
                          setPostForm((prev) => ({
                            ...prev,
                            og_desc: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <p className="text-label text-[#6B5862]/80 flex items-center gap-1.5 mt-2">
                      <span>🖼️</span>
                      <span>
                        Share image (
                        <code className="text-[#1c3b2b] font-mono font-semibold">
                          og:image
                        </code>
                        ) automatically uses your <b>Featured Image</b>.
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5">
                      X (Twitter)
                    </p>
                    <div className="mb-3">
                      <input
                        className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
                        placeholder="Twitter title"
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
                        rows={2}
                        placeholder="Twitter description"
                      />
                    </div>
                    <p className="text-label text-[#6B5862]/80">
                      Leave empty to reuse the Open Graph values.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FAQS */}
            {activeEditorTab === "faqs" && (
              <div className="p-5 space-y-4">
                <p className="text-body-sm text-[#6B5862] mb-4">
                  FAQs appear at the end of the post and create FAQPage schema.
                  Answer in 2–4 plain sentences, the way you’d answer a student
                  after class.
                </p>

                <div id="faqList" className="space-y-2.5">
                  {faqs.map((f, i) => (
                    <div
                      key={i}
                      className="flex gap-3 bg-[#f8f9f8] border border-[#e6ded2] rounded-lg p-3.5 items-start"
                    >
                      <span className="font-extrabold text-[#6B5862] w-5 text-right pt-2 text-body-sm">
                        {i + 1}
                      </span>
                      <div className="flex-1 grid gap-2">
                        <input
                          className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] font-bold focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
                          placeholder="Question"
                          value={f?.q || ""}
                          onChange={(e) =>
                            handleFaqChange(i, "q", e.target.value)
                          }
                          aria-label={`Question ${i + 1}`}
                        />
                        <textarea
                          className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
                          rows={2}
                          placeholder="Answer"
                          value={f?.a || ""}
                          onChange={(e) =>
                            handleFaqChange(i, "a", e.target.value)
                          }
                          aria-label={`Answer ${i + 1}`}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          className="p-1 rounded text-label font-bold hover:bg-white text-[#6B5862] cursor-pointer disabled:opacity-30"
                          disabled={i === 0}
                          onClick={() => handleMoveFaq(i, -1)}
                          aria-label="Move up"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded text-label font-bold hover:bg-white text-[#6B5862] cursor-pointer disabled:opacity-30"
                          disabled={i === faqs.length - 1}
                          onClick={() => handleMoveFaq(i, 1)}
                          aria-label="Move down"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded text-label font-bold hover:bg-white text-red-600 cursor-pointer"
                          onClick={() => handleRemoveFaq(i)}
                          aria-label="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] transition-colors cursor-pointer mt-3"
                  onClick={handleAddFaq}
                >
                  + Add question
                </button>
              </div>
            )}

            {/* TAB: AI ANSWERS */}
            {activeEditorTab === "ai" && (
              <div className="p-5 space-y-4">
                <div>
                  <label
                    className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                    htmlFor="tldr"
                  >
                    Quick answer (TL;DR)
                  </label>
                  <textarea
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all"
                    id="tldr"
                    rows={3}
                    value={tldr}
                    onChange={(e) => {
                      setPostForm((prev) => ({
                        ...prev,
                        tldr: e.target.value,
                      }));
                      setSaveState("Unsaved changes");
                    }}
                    placeholder="Answer the title’s question directly in 40–60 words."
                  />
                  <p className="text-label text-[#6B5862]/80 mt-1.5">
                    {tldr.trim() ? tldr.trim().split(/\s+/).length : 0} words
                    (40–60 is ideal). Shown in a highlighted box at the top of
                    the post.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: SCHEMA */}
            {activeEditorTab === "schema" && (
              <div className="p-5 space-y-4">
                <p className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5">
                  Content type
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`border rounded-lg p-3 cursor-pointer relative transition-colors ${
                      postForm.schema_type === "post"
                        ? "border-[#1c3b2b] bg-[#1c3b2b]/5"
                        : "border-[#e6ded2] bg-white hover:border-[#1c3b2b]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="schema"
                      className="sr-only"
                      checked={postForm.schema_type === "post"}
                      onChange={() =>
                        setPostForm((prev) => ({
                          ...prev,
                          schema_type: "post",
                        }))
                      }
                    />
                    <b className="block text-body-sm text-[#2A1621]">Blog post</b>
                    <small className="text-label text-[#6B5862]">
                      Tips, stories, retreat news.
                    </small>
                  </label>
                  <label
                    className={`border rounded-lg p-3 cursor-pointer relative transition-colors ${
                      postForm.schema_type === "article"
                        ? "border-[#1c3b2b] bg-[#1c3b2b]/5"
                        : "border-[#e6ded2] bg-white hover:border-[#1c3b2b]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="schema"
                      className="sr-only"
                      checked={postForm.schema_type === "article"}
                      onChange={() =>
                        setPostForm((prev) => ({
                          ...prev,
                          schema_type: "article",
                        }))
                      }
                    />
                    <b className="block text-body-sm text-[#2A1621]">Article</b>
                    <small className="text-label text-[#6B5862]">
                      In-depth guides on philosophy or anatomy.
                    </small>
                  </label>
                  <label
                    className={`border rounded-lg p-3 cursor-pointer relative transition-colors ${
                      postForm.schema_type === "guide"
                        ? "border-[#1c3b2b] bg-[#1c3b2b]/5"
                        : "border-[#e6ded2] bg-white hover:border-[#1c3b2b]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="schema"
                      className="sr-only"
                      checked={postForm.schema_type === "guide"}
                      onChange={() =>
                        setPostForm((prev) => ({
                          ...prev,
                          schema_type: "guide",
                        }))
                      }
                    />
                    <b className="block text-body-sm text-[#2A1621]">
                      Step-by-step guide
                    </b>
                    <small className="text-label text-[#6B5862]">
                      Pose tutorials and breathing techniques.
                    </small>
                  </label>
                </div>
                <p className="text-label text-[#6B5862]/80 mt-3 leading-normal">
                  Every post also outputs BreadcrumbList, Organization, Person
                  (author) and FAQPage when FAQs exist.
                </p>
              </div>
            )}

            {/* TAB: ADVANCED */}
            {activeEditorTab === "adv" && (
              <div className="p-5 space-y-4">
                <div>
                  <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5">
                    Canonical URL
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all font-mono"
                    value={canonicalUrl}
                    onChange={(e) =>
                      setPostForm((prev) => ({
                        ...prev,
                        canonical_url: e.target.value,
                      }))
                    }
                    placeholder={`https://www.siddhantschoolofyoga.com/blog/${slug || "post"}`}
                  />
                  <p className="text-label text-[#6B5862]/80 mt-1.5">
                    Only change this if the same article lives at another URL.
                  </p>
                </div>
                <div>
                  <label
                    className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                    htmlFor="conclusion"
                  >
                    Conclusion
                  </label>
                  <textarea
                    id="conclusion"
                    rows={4}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all"
                    value={postForm.conclusion || ""}
                    onChange={(e) => {
                      setPostForm((prev) => ({
                        ...prev,
                        conclusion: e.target.value,
                      }));
                      setSaveState("Unsaved changes");
                    }}
                    placeholder="Wrap up the post in 2–4 sentences: the takeaway you want the reader to leave with."
                  />
                  <p className="text-label text-[#6B5862]/80 mt-1.5">
                    Optional. Shown as a “Conclusion” section after the article
                    body, before the FAQs.
                  </p>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-body-sm text-[#2A1621] cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-[#e6ded2] text-[#1c3b2b] focus:ring-[#1c3b2b]"
                    />{" "}
                    Show this post in search results (index)
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-body-sm text-[#2A1621] cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-[#e6ded2] text-[#1c3b2b] focus:ring-[#1c3b2b]"
                    />{" "}
                    Let search engines follow links (follow)
                  </label>
                </div>
              </div>
            )}

            {/* add conclusion option here  */}
            
          </section>
        </div>

        {/* ============ SIDEBAR ============ */}
        <aside className="sticky top-6 space-y-5">
          <section className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden">
            <h2 className="px-4 py-3 border-b border-[#e6ded2] font-bold text-body-sm text-[#2A1621] bg-[#FAF6F0]/60">
              Publish
            </h2>
            <div className="p-4 space-y-4">
              <p className="text-body-sm text-[#6B5862]">
                Status:{" "}
                <b className="capitalize text-[#2A1621] font-bold">
                  {postForm.status}
                </b>
              </p>
              <div>
                <label
                  className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                  htmlFor="pubDate"
                >
                  Publish on
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
                  id="pubDate"
                  value={postForm.published_at || ""}
                  onChange={(e) => {
                    setPostForm((prev) => ({
                      ...prev,
                      published_at: e.target.value,
                    }));
                    setSaveState("Unsaved changes");
                  }}
                />
                <p className="text-label text-[#6B5862]/80 mt-1">
                  Empty = publish now. Future date = scheduled. Times are in
                  your local timezone ({localTimeZone}).
                </p>
                {pendingSchedule.isFuture && (
                  <p className="text-label font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2 mt-2">
                    Will go live on{" "}
                    {formatScheduledAt(localInputToIso(postForm.published_at))}
                    {postForm.status === "draft"
                      ? " once you save it as scheduled."
                      : " when you save."}
                  </p>
                )}
                {postForm.status === "scheduled" && !pendingSchedule.isFuture && (
                  <p className="text-label font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-2 mt-2">
                    This post is scheduled but its date has passed. It goes live
                    automatically, or save it now to publish immediately.
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center p-3.5 border-t border-[#e6ded2] bg-[#FAF6F0]/60 rounded-b-xl">
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                onClick={() => handleSavePost("draft")}
              >
                Save draft
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-gradient-to-r from-[#1c3b2b] to-[#14291e] text-white hover:from-[#234b37] hover:to-[#1c3b2b] shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleSavePost("published")}
              >
                {pendingSchedule.isFuture && postForm.status !== "draft"
                  ? "Schedule"
                  : postForm.id === 0
                    ? "Publish"
                    : "Update"}
              </button>
            </div>
          </section>

          <section className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-visible">
            <h2 className="px-4 py-3 border-b border-[#e6ded2] font-bold text-body-sm text-[#2A1621] flex justify-between items-center bg-[#FAF6F0]/60">
              <span>Author</span>
            </h2>
            <div className="p-4" ref={authorDropdownRef}>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 pr-9 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/60 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
                  value={postForm.author || ""}
                  placeholder="Author name (default: Siddhant School of Yoga)"
                  onFocus={() => setAuthorDropdownOpen(true)}
                  onChange={(e) => {
                    setPostForm((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }));
                    setSaveState("Unsaved changes");
                    setAuthorDropdownOpen(true);
                  }}
                  aria-label="Author byline"
                />
                <button
                  type="button"
                  onClick={() => setAuthorDropdownOpen((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B5862]/60 hover:text-[#2A1621] p-1 transition-colors"
                  title="Toggle author suggestions"
                  tabIndex={-1}
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${authorDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {authorDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white border border-[#e6ded2] rounded-lg shadow-lg max-h-56 overflow-y-auto divide-y divide-[#FAF6F0] py-1">
                    {filteredAuthors.length > 0 ? (
                      filteredAuthors.map((name) => {
                        const isSelected = postForm.author === name;
                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() => {
                              setPostForm((prev) => ({ ...prev, author: name }));
                              setSaveState("Unsaved changes");
                              setAuthorDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-body-sm flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-[#1c3b2b]/10 text-[#1c3b2b] font-medium"
                                : "text-[#2A1621] hover:bg-[#FAF6F0]"
                            }`}
                          >
                            <span>{name}</span>
                            {isSelected && (
                              <svg className="w-4 h-4 text-[#1c3b2b]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-3.5 py-2.5 text-xs text-[#6B5862]/80">
                        New author: &ldquo;<span className="font-semibold text-[#2A1621]">{postForm.author}</span>&rdquo; will be remembered automatically on save.
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-xs text-[#6B5862]/70 mt-2">
                Select a previously used byline or type a new one (automatically remembered after saving). Default: Siddhant School of Yoga.
              </p>
            </div>
          </section>

          <section className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden">
            <h2 className="px-4 py-3 border-b border-[#e6ded2] font-bold text-body-sm text-[#2A1621] flex justify-between items-center bg-[#FAF6F0]/60">
              <span>Category</span>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setView("categories")}
                  className="text-label font-semibold text-[#1c3b2b] hover:underline cursor-pointer"
                >
                  Manage
                </button>
              )}
            </h2>
            <div className="p-4">
              <select
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
                value={postForm.category_id || ""}
                onChange={(e) => {
                  const catObj = categories.find(
                    (c) => String(c.id) === e.target.value,
                  );
                  setPostForm((prev) => ({
                    ...prev,
                    category_id: e.target.value,
                    category_name: catObj?.name || "",
                  }));
                  setSaveState("Unsaved changes");
                }}
                aria-label="Category"
              >
                <option value="">Uncategorised</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {isAdmin && (
                <button
                  type="button"
                  className="text-label font-bold text-[#1c3b2b] hover:underline cursor-pointer mt-2 block"
                  onClick={() => setQuickCatOpen(!quickCatOpen)}
                >
                  + Add new category
                </button>
              )}

              {quickCatOpen && (
                <div className="mt-2 flex gap-2">
                  <input
                    className="flex-1 px-3 py-1.5 bg-white border border-[#e6ded2] rounded-lg text-label text-[#2A1621] focus:outline-none focus:ring-1 focus:ring-[#1c3b2b]"
                    placeholder="Category name"
                    value={quickCatName}
                    onChange={(e) => setQuickCatName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleQuickAddCat();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-lg text-label font-semibold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] cursor-pointer"
                    onClick={handleQuickAddCat}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden">
            <h2 className="px-4 py-3 border-b border-[#e6ded2] font-bold text-body-sm text-[#2A1621] bg-[#FAF6F0]/60 flex items-center justify-between">
              <span>Featured image</span>
              {postForm.featured_image && (
                <span className="text-label font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Image uploaded
                </span>
              )}
            </h2>
            <div className="p-4">
              <input
                ref={fileInputRef}
                type="file"
                id="featFile"
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                className="hidden"
                onChange={handleImageUpload}
              />

              {uploadingImage ? (
                <div className="flex flex-col items-center justify-center aspect-[1.91/1] border-2 border-dashed border-[#1c3b2b]/40 rounded-lg bg-[#fff3f8] text-[#1c3b2b] text-label mb-2.5 p-4 text-center">
                  <svg
                    className="animate-spin h-6 w-6 mb-2 text-[#1c3b2b]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  <span className="font-semibold text-body-sm">
                    Uploading featured image...
                  </span>
                  <small className="text-[#6B5862]/70 mt-1">
                    Please wait a moment
                  </small>
                </div>
              ) : postForm.featured_image ? (
                <div className="relative group mb-3 rounded-lg overflow-hidden border border-[#e6ded2] shadow-xs">
                  <div className="aspect-[1.91/1] w-full bg-[#FAF6F0] overflow-hidden">
                    <img
                      src={postForm.featured_image}
                      alt={
                        postForm.featured_image_alt || "Featured image preview"
                      }
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Hover Overlay with Action Buttons */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white text-[#2A1621] hover:text-[#1c3b2b] text-label font-bold rounded-md shadow-md flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-[#1c3b2b]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Replace Image
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPostForm((prev) => ({
                          ...prev,
                          featured_image: "",
                        }));
                        setSaveState("Unsaved changes");
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-label font-bold rounded-md shadow-md flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
                      title="Remove image"
                    >
                      ✕ Remove
                    </button>
                  </div>

                  {/* Always-visible Action Bar below image */}
                  <div className="flex items-center justify-between p-2.5 bg-[#FAF6F0] border-t border-[#e6ded2] text-label">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="font-bold text-[#1c3b2b] hover:text-[#b85c00] flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>🔄</span>
                      <span>Replace Image</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPostForm((prev) => ({
                          ...prev,
                          featured_image: "",
                        }));
                        setSaveState("Unsaved changes");
                      }}
                      className="font-semibold text-[#6B5862] hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>🗑️ Remove</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center aspect-[1.91/1] border-2 border-dashed border-[#e6ded2] rounded-lg bg-[#FAF6F0]/50 text-[#6B5862] text-label cursor-pointer mb-2.5 relative overflow-hidden transition-all hover:border-[#1c3b2b] hover:text-[#1c3b2b] hover:bg-[#fff3f8]/50"
                >
                  <svg
                    className="w-8 h-8 text-[#6B5862]/50 mb-1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-bold text-body-sm text-[#2A1621]">
                    Upload Featured Image
                  </span>
                  <small className="text-[#6B5862]/70 mt-0.5">
                    Click to choose image (1200 × 630 px)
                  </small>
                </button>
              )}

              <div className="mt-2">
                <label
                  className="block text-label font-bold uppercase tracking-wider text-[#6B5862] mb-1"
                  htmlFor="featuredAlt"
                >
                  Image Alt Text
                </label>
                <input
                  id="featuredAlt"
                  className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
                  placeholder="Alt text, e.g. Student in Lotus Pose"
                  value={postForm.featured_image_alt || ""}
                  onChange={(e) => {
                    setPostForm((prev) => ({
                      ...prev,
                      featured_image_alt: e.target.value,
                    }));
                    setSaveState("Unsaved changes");
                  }}
                  aria-label="Alt text"
                />
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* ===================== LINK DIALOG MODAL ===================== */}
      {linkModalOpen && (
        <div
          className="fixed inset-0 bg-[#16271e]/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-figtree animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="link-dialog-title"
          onClick={handleCloseLinkModal}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleCloseLinkModal();
          }}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-[#e3dac9] animate-fade-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-[#f0eae1]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#e6ded2] flex items-center justify-center text-[#1c3b2b]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <div>
                  <h2
                    id="link-dialog-title"
                    className="font-belleza text-xl text-[#1e2422]"
                  >
                    {isEditingExistingLink ? "Edit Link" : "Insert Link"}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseLinkModal}
                className="text-[#6B5862] hover:text-[#2A1621] p-1.5 rounded-lg hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveLink();
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5862] mb-1.5">
                  Link URL <span className="text-red-500">*</span>
                </label>
                <input
                  ref={linkUrlInputRef}
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com or /courses/..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e3dac9] rounded-xl text-sm text-[#2A1621] placeholder:text-[#6B5862]/40 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/30 focus:border-[#1c3b2b] transition-all"
                />
                <p className="text-[11px] text-[#6B5862]/80 mt-1">
                  Enter full web URL or internal page link like <code className="bg-[#FAF6F0] px-1 py-0.5 rounded text-[#1c3b2b]">/contact</code>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5862] mb-1.5">
                  Text to Display
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link anchor text..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e3dac9] rounded-xl text-sm text-[#2A1621] placeholder:text-[#6B5862]/40 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/30 focus:border-[#1c3b2b] transition-all"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={linkOpenInNewTab}
                  onChange={(e) => setLinkOpenInNewTab(e.target.checked)}
                  className="w-4 h-4 rounded border-[#e3dac9] text-[#1c3b2b] focus:ring-[#1c3b2b] accent-[#1c3b2b] cursor-pointer"
                />
                <span className="text-sm font-medium text-[#2A1621]">
                  Open link in a new tab (<code className="text-xs text-[#6B5862]">target=&quot;_blank&quot;</code>)
                </span>
              </label>

              <div className="flex items-center justify-between pt-4 border-t border-[#f0eae1] mt-5">
                {isEditingExistingLink ? (
                  <button
                    type="button"
                    onClick={handleRemoveLink}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remove link
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseLinkModal}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#e3dac9] text-[#1e2422] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1c3b2b] hover:bg-[#14291e] text-white transition-colors shadow-sm cursor-pointer"
                  >
                    {isEditingExistingLink ? "Update Link" : "Add Link"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


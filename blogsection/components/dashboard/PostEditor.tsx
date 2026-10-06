"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  useEditor,
  EditorContent,
  Editor,
  Mark,
  mergeAttributes,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
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
} from "@/blogsection/lib/tableImport";
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
  { label: "Sanskriti Pink", color: "#BF296A" },
  { label: "Deep Wine", color: "#951248" },
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
  { label: "Sanskriti Pink", value: "#BF296A" },
  { label: "Deep Wine", value: "#951248" },
  { label: "Charcoal", value: "#2A1621" },
];

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
    view: "dashboard" | "editor" | "categories" | "authors" | "logs",
  ) => void;
  currentUser?: CurrentUser;
  activeEditorTab: "seo" | "social" | "faqs" | "ai" | "schema" | "adv";
  setActiveEditorTab: (
    tab: "seo" | "social" | "faqs" | "ai" | "schema" | "adv",
  ) => void;
  wordCount: { words: number; mins: number };
  rteRef: React.RefObject<HTMLDivElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  authors: Author[];
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
  const isAdmin = currentUser?.role === "admin";
  const isAuthor = currentUser?.role === "author";

  // Selected Author Object for Post Editor
  const currentAuthor =
    authors.find(
      (a) => a.name === postForm.author || a.username === postForm.author,
    ) || authors[0];

  // Safe normalized values to prevent null/undefined runtime crashes
  const title = postForm.title || "";
  const slug = postForm.slug || "";
  const content = postForm.content || "";
  const shortDesc = postForm.short_description || "";
  const metaTitle = postForm.meta_title || "";
  const metaDesc = postForm.meta_description || "";
  const focusKw = postForm.focus_keyword || "";
  const relatedKw = postForm.related_keywords || "";
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
  const [tableMenuOpen, setTableMenuOpen] = React.useState(false);
  const [tablePicker, setTablePicker] = React.useState<{
    rows: number;
    cols: number;
  } | null>(null);
  const [tableHeaderOption, setTableHeaderOption] = React.useState(true);
  const [importingTable, setImportingTable] = React.useState(false);
  const [cellFillMenuOpen, setCellFillMenuOpen] = React.useState(false);

  // Manual image upload function (WordPress-like)
  const uploadAndInsertImage = async (file: File) => {
    if (!editor) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP, GIF, SVG).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB.");
      return;
    }

    setUploadingContentImage(true);
    setSaveState("Saving...");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/blog/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        const altText = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]+/g, " ");
        editor.chain().focus().setImage({ src: data.url, alt: altText }).run();
        setSaveState("Unsaved changes");
      } else {
        alert(data.message || "Failed to upload image. Please try again.");
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
    const file = e.target.files?.[0];
    if (file) {
      uploadAndInsertImage(file);
    }
  };

  const handleInsertImageUrl = () => {
    if (!editor) return;
    setImageMenuOpen(false);
    const url = window.prompt("Enter image URL (https://...):");
    if (url && url.trim()) {
      editor.chain().focus().setImage({ src: url.trim() }).run();
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
          class: "text-[#BF296A] underline font-medium",
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full my-3",
        },
      }),
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
          "min-h-[380px] p-5 font-serif text-lg leading-relaxed focus:outline-none text-[#2A1621] prose max-w-none [&_strong]:text-inherit [&_strong]:font-bold [&_b]:text-inherit [&_b]:font-bold [&_h1]:text-3xl sm:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:my-5 [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:my-4 [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:my-3 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:my-2 [&_h5]:text-base [&_h5]:font-bold [&_h5]:my-2 [&_h6]:text-sm [&_h6]:font-bold [&_h6]:my-2 [&_p]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-[#BF296A] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-[#FAF6F0] [&_blockquote]:py-2 [&_blockquote]:rounded-r [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_img]:rounded-lg [&_img]:max-w-full [&_img]:my-3 [&_table]:w-full [&_table]:border-collapse [&_table]:table-fixed [&_table]:my-5 [&_table]:text-sm [&_table]:overflow-x-auto [&_td]:border [&_td]:border-[#e6ded2] [&_td]:px-2 [&_td]:py-1.5 [&_td]:align-top [&_td]:min-w-[80px] [&_th]:border [&_th]:border-[#e6ded2] [&_th]:bg-[#FAF6F0] [&_th]:px-2 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold [&_th]:align-top [&_.selectedCell]:outline [&_.selectedCell]:outline-2 [&_.selectedCell]:outline-[#BF296A] [&_.column-resize-handle]:bg-[#BF296A] [&_.column-resize-handle]:relative [&_.column-resize-handle]:after:absolute [&_.column-resize-handle]:after:right-[-2px] [&_.column-resize-handle]:after:top-0 [&_.column-resize-handle]:after:bottom-0 [&_.column-resize-handle]:after:w-[4px] [&_.column-resize-handle]:after:bg-black/20 [&_.column-resize-handle]:after:content-[''] [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)] [&_p.is-editor-empty:first-child]:before:float-left [&_p.is-editor-empty:first-child]:before:text-[#6B5862]/40 [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:h-0",
      },
      handlePaste: (view, event) => {
        const clipboard = event.clipboardData;
        if (!clipboard) return false;

        // Copying a table from Word / Google Docs / a web page puts an
        // image/png snapshot of the table on the clipboard alongside the real
        // text/html. Prefer the markup, otherwise the paste lands as a picture.

        // 1. A real <table> in the HTML payload.
        const html = clipboard.getData("text/html") || "";
        const htmlGrid = parseHtmlTable(html);
        if (htmlGrid && editorRef.current) {
          event.preventDefault();
          insertGridAsTable(editorRef.current, htmlGrid, {
            withHeaderRow: true,
          });
          return true;
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

        // 3. Only now treat the clipboard as an image.
        for (const item of Array.from(clipboard.items || [])) {
          if (item.type.indexOf("image") === 0) {
            const file = item.getAsFile();
            if (file) {
              event.preventDefault();
              uploadAndInsertImage(file);
              return true;
            }
          }
        }

        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        if (
          !moved &&
          event.dataTransfer?.files &&
          event.dataTransfer.files.length > 0
        ) {
          const file = event.dataTransfer.files[0];
          if (file && file.type.startsWith("image/")) {
            event.preventDefault();
            uploadAndInsertImage(file);
            return true;
          }
        }
        return false;
      },
    },
    onCreate: ({ editor: ed }) => {
      editorRef.current = ed;
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
    const level = isHeading
      ? (Number(val.slice(1)) as 1 | 2 | 3 | 4 | 5 | 6)
      : null;
    const listName = val === "bulletList" || val === "orderedList" ? val : null;

    const toggleWholeBlock = () => {
      if (listName === "bulletList")
        editor.chain().focus().toggleBulletList().run();
      else if (listName === "orderedList")
        editor.chain().focus().toggleOrderedList().run();
      else if (val === "quote") editor.chain().focus().toggleBlockquote().run();
      else if (level !== null)
        editor.chain().focus().toggleHeading({ level }).run();
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

  const handleLink = () => {
    if (!editor) return;
    const prevUrl = editor.getAttributes("link").href;
    const url = window.prompt(
      "Enter link URL (e.g. https://...):",
      prevUrl || "",
    );
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  };

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
            <span>https://sanskritiyogpeeth.org/blog/</span>
            <input
              id="slug"
              aria-label="URL slug"
              className="border border-[#e6ded2] bg-white px-2 py-0.5 rounded text-body-sm text-[#2A1621] focus:outline-none focus:ring-1 focus:ring-[#BF296A]"
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
                  className="h-8 px-2 text-label font-semibold bg-white border border-[#e6ded2] rounded focus:outline-none focus:ring-1 focus:ring-[#BF296A] text-[#2A1621]"
                  value={
                    editor?.isActive("heading", { level: 1 })
                      ? "h1"
                      : editor?.isActive("heading", { level: 2 })
                        ? "h2"
                        : editor?.isActive("heading", { level: 3 })
                          ? "h3"
                          : editor?.isActive("heading", { level: 4 })
                            ? "h4"
                            : editor?.isActive("heading", { level: 5 })
                              ? "h5"
                              : editor?.isActive("heading", { level: 6 })
                                ? "h6"
                                : "p"
                  }
                  onChange={(e) => applyBlockFormatToSelection(e.target.value)}
                >
                  <option value="p">Paragraph</option>
                  <option value="h1">Heading 1 (H1)</option>
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
                      ? "bg-[#BF296A] text-white"
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
                      ? "bg-[#BF296A] text-white"
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
                      ? "bg-[#BF296A] text-white"
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
                                  ? "border-[#BF296A] ring-1 ring-[#BF296A]"
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
                          className="w-full mt-2 text-left px-2 py-1.5 rounded-md text-label font-bold text-[#6B5862] hover:bg-[#FAF6F0] hover:text-[#BF296A] transition-colors cursor-pointer"
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
                      ? "bg-[#BF296A] text-white"
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
                      ? "bg-[#BF296A] text-white"
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
                      ? "bg-[#BF296A] text-white"
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
                      ? "bg-[#BF296A] text-white"
                      : "hover:bg-[#FAF6F0] text-[#2A1621]"
                  }`}
                  onClick={handleLink}
                  title="Link"
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
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingContentImage}
                    className="h-8 px-2.5 rounded-l font-bold text-label cursor-pointer inline-flex items-center gap-1.5 bg-[#FAF6F0] hover:bg-[#fff3f8] text-[#2A1621] hover:text-[#BF296A] border border-[#e6ded2] transition-colors disabled:opacity-50"
                    onClick={() => contentImageInputRef.current?.click()}
                    title="Upload image from computer (WordPress-style)"
                  >
                    {uploadingContentImage ? (
                      <>
                        <svg
                          className="animate-spin h-3.5 w-3.5 text-[#BF296A]"
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
                          className="w-3.5 h-3.5 text-[#BF296A]"
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
                    className="h-8 px-1.5 rounded-r font-bold text-label cursor-pointer inline-flex items-center justify-center bg-[#FAF6F0] hover:bg-[#fff3f8] text-[#6B5862] hover:text-[#BF296A] border-y border-r border-[#e6ded2] transition-colors"
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
                        ? "bg-[#BF296A] text-white border-[#BF296A]"
                        : "bg-[#FAF6F0] hover:bg-[#fff3f8] text-[#2A1621] hover:text-[#BF296A]"
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
                    className="h-8 px-1.5 rounded-r font-bold text-label cursor-pointer inline-flex items-center justify-center bg-[#FAF6F0] hover:bg-[#fff3f8] text-[#6B5862] hover:text-[#BF296A] border-y border-r border-[#e6ded2] transition-colors"
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
                                      ? "bg-[#BF296A] border-[#BF296A]"
                                      : "bg-[#FAF6F0] border-[#e6ded2] hover:border-[#BF296A]"
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
                            className="accent-[#BF296A] w-3.5 h-3.5"
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
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#BF296A] transition-colors cursor-pointer"
                    title="Add a row below"
                  >
                    Row +
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#BF296A] transition-colors cursor-pointer"
                    title="Add a row above"
                  >
                    Row ↑
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().addColumnAfter().run()
                    }
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#BF296A] transition-colors cursor-pointer"
                    title="Add a column to the right"
                  >
                    Col +
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().addColumnBefore().run()
                    }
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#BF296A] transition-colors cursor-pointer"
                    title="Add a column to the left"
                  >
                    Col ←
                  </button>

                  <span className="w-px h-5 bg-[#e6ded2] mx-1" />

                  <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#BF296A] transition-colors cursor-pointer"
                    title="Delete the current row"
                  >
                    Row ×
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#BF296A] transition-colors cursor-pointer"
                    title="Delete the current column"
                  >
                    Col ×
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().mergeCells().run()}
                    disabled={!editor.can().mergeCells()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#BF296A] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Merge selected cells"
                  >
                    Merge
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().splitCell().run()}
                    disabled={!editor.can().splitCell()}
                    className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#BF296A] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
                        ? "bg-[#BF296A] text-white"
                        : "text-[#2A1621] hover:bg-white hover:text-[#BF296A]"
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
                          ? "bg-[#BF296A] text-white"
                          : "text-[#2A1621] hover:bg-white hover:text-[#BF296A]"
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
                      className="px-2 py-1 rounded font-medium text-[#2A1621] hover:bg-white hover:text-[#BF296A] transition-colors cursor-pointer inline-flex items-center gap-1"
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
                                      ? "border-[#BF296A] ring-1 ring-[#BF296A]"
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
                            className="w-full mt-2 text-left px-2 py-1.5 rounded-md text-label font-bold text-[#6B5862] hover:bg-[#FAF6F0] hover:text-[#BF296A] transition-colors cursor-pointer"
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
                    className="px-2 py-1 rounded font-bold text-[#951248] hover:bg-white transition-colors cursor-pointer"
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
            {wordCount.words} words, {wordCount.mins} min read
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
              className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
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
                    ? "text-[#BF296A] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#BF296A]"
                    : "text-[#6B5862] hover:text-[#BF296A]"
                }`}
                onClick={() => setActiveEditorTab("seo")}
              >
                SEO
              </button>
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "social"
                    ? "text-[#BF296A] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#BF296A]"
                    : "text-[#6B5862] hover:text-[#BF296A]"
                }`}
                onClick={() => setActiveEditorTab("social")}
              >
                Social
              </button>
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "faqs"
                    ? "text-[#BF296A] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#BF296A]"
                    : "text-[#6B5862] hover:text-[#BF296A]"
                }`}
                onClick={() => setActiveEditorTab("faqs")}
              >
                FAQs{" "}
                <span className="text-label text-[#6B5862]">({faqs.length})</span>
              </button>
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "ai"
                    ? "text-[#BF296A] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#BF296A]"
                    : "text-[#6B5862] hover:text-[#BF296A]"
                }`}
                onClick={() => setActiveEditorTab("ai")}
              >
                AI answers
              </button>
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "schema"
                    ? "text-[#BF296A] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#BF296A]"
                    : "text-[#6B5862] hover:text-[#BF296A]"
                }`}
                onClick={() => setActiveEditorTab("schema")}
              >
                Schema
              </button>
              <button
                className={`px-4 py-3 font-bold text-label uppercase tracking-wider cursor-pointer relative whitespace-nowrap transition-colors ${
                  activeEditorTab === "adv"
                    ? "text-[#BF296A] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-[#BF296A]"
                    : "text-[#6B5862] hover:text-[#BF296A]"
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
                      className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
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
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
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
                                  ? "#BF296A"
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
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
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
                                  ? "#BF296A"
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
                        className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
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
                        className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
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
                        <code className="text-[#BF296A] font-mono font-semibold">
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
                        className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
                        placeholder="Twitter title"
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
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
                          className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] font-bold focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
                          placeholder="Question"
                          value={f?.q || ""}
                          onChange={(e) =>
                            handleFaqChange(i, "q", e.target.value)
                          }
                          aria-label={`Question ${i + 1}`}
                        />
                        <textarea
                          className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
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
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
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
                        ? "border-[#BF296A] bg-[#BF296A]/5"
                        : "border-[#e6ded2] bg-white hover:border-[#BF296A]/50"
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
                        ? "border-[#BF296A] bg-[#BF296A]/5"
                        : "border-[#e6ded2] bg-white hover:border-[#BF296A]/50"
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
                        ? "border-[#BF296A] bg-[#BF296A]/5"
                        : "border-[#e6ded2] bg-white hover:border-[#BF296A]/50"
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
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all font-mono"
                    value={canonicalUrl}
                    onChange={(e) =>
                      setPostForm((prev) => ({
                        ...prev,
                        canonical_url: e.target.value,
                      }))
                    }
                    placeholder={`https://sanskritiyogpeeth.org/blog/${slug || "post"}`}
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
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
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
                      className="rounded border-[#e6ded2] text-[#BF296A] focus:ring-[#BF296A]"
                    />{" "}
                    Show this post in search results (index)
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-body-sm text-[#2A1621] cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-[#e6ded2] text-[#BF296A] focus:ring-[#BF296A]"
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
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
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
                className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-gradient-to-r from-[#BF296A] to-[#951248] text-white hover:from-[#a71d58] hover:to-[#800e3d] shadow-sm hover:shadow-md transition-all cursor-pointer"
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

          <section className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden">
            <h2 className="px-4 py-3 border-b border-[#e6ded2] font-bold text-body-sm text-[#2A1621] flex justify-between items-center bg-[#FAF6F0]/60">
              <span>Author</span>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setView("authors")}
                  className="text-label font-semibold text-[#BF296A] hover:underline cursor-pointer"
                >
                  Manage
                </button>
              )}
            </h2>
            <div className="p-4">
              {isAuthor ? (
                <div className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#e6ded2] rounded-lg text-body-sm font-semibold text-[#2A1621] flex items-center justify-between">
                  <span>{currentUser?.name || postForm.author}</span>
                  <span className="text-label uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                    My Profile
                  </span>
                </div>
              ) : (
                <select
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
                  value={postForm.author || ""}
                  onChange={(e) => {
                    setPostForm((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }));
                    setSaveState("Unsaved changes");
                  }}
                  aria-label="Author"
                >
                  {authors.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              )}

              {currentAuthor && (
                <div className="flex items-center gap-3 mt-3">
                  <span className="w-10 h-10 rounded-full object-cover bg-gradient-to-br from-[#BF296A] to-[#951248] text-white flex items-center justify-center font-bold text-body-sm overflow-hidden shrink-0 shadow-xs">
                    {currentAuthor.photo ? (
                      <img
                        src={currentAuthor.photo}
                        alt={currentAuthor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(currentAuthor.name)
                    )}
                  </span>
                  <span className="text-label leading-snug">
                    <b className="font-bold text-[#2A1621] text-body-sm">
                      {currentAuthor.name}
                    </b>
                    <br />
                    <span className="text-[#6B5862]/80">
                      {currentAuthor.title || "No credentials added"}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden">
            <h2 className="px-4 py-3 border-b border-[#e6ded2] font-bold text-body-sm text-[#2A1621] flex justify-between items-center bg-[#FAF6F0]/60">
              <span>Category</span>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setView("categories")}
                  className="text-label font-semibold text-[#BF296A] hover:underline cursor-pointer"
                >
                  Manage
                </button>
              )}
            </h2>
            <div className="p-4">
              <select
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
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
                  className="text-label font-bold text-[#BF296A] hover:underline cursor-pointer mt-2 block"
                  onClick={() => setQuickCatOpen(!quickCatOpen)}
                >
                  + Add new category
                </button>
              )}

              {quickCatOpen && (
                <div className="mt-2 flex gap-2">
                  <input
                    className="flex-1 px-3 py-1.5 bg-white border border-[#e6ded2] rounded-lg text-label text-[#2A1621] focus:outline-none focus:ring-1 focus:ring-[#BF296A]"
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
                <div className="flex flex-col items-center justify-center aspect-[1.91/1] border-2 border-dashed border-[#BF296A]/40 rounded-lg bg-[#fff3f8] text-[#BF296A] text-label mb-2.5 p-4 text-center">
                  <svg
                    className="animate-spin h-6 w-6 mb-2 text-[#BF296A]"
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
                      className="px-3 py-1.5 bg-white text-[#2A1621] hover:text-[#BF296A] text-label font-bold rounded-md shadow-md flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-[#BF296A]"
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
                      className="font-bold text-[#BF296A] hover:text-[#951248] flex items-center gap-1.5 cursor-pointer transition-colors"
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
                  className="w-full flex flex-col items-center justify-center aspect-[1.91/1] border-2 border-dashed border-[#e6ded2] rounded-lg bg-[#FAF6F0]/50 text-[#6B5862] text-label cursor-pointer mb-2.5 relative overflow-hidden transition-all hover:border-[#BF296A] hover:text-[#BF296A] hover:bg-[#fff3f8]/50"
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
                  className="w-full px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
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
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import Image from "@tiptap/extension-image";
import { NodeViewWrapper, ReactNodeViewRenderer, NodeViewProps } from "@tiptap/react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Columns,
  Trash2,
  Sparkles,
  Type,
  GripVertical,
  Scaling,
} from "lucide-react";

declare module "@tiptap/extension-image" {
  interface SetImageOptions {
    alignment?: "left" | "center" | "right" | "inline";
    rounded?: boolean;
  }
}

/**
 * ResizableImageComponent
 *
 * Interactive image node view that provides Google Docs / MS Word style
 * image manipulation:
 * 1. Drag & drop to MOVE the image anywhere in the document (data-drag-handle + Grip handle)
 * 2. Corner drag-to-resize handles (both Width & Height in perfect aspect ratio)
 * 3. Custom Width & Height popover (set exact px or % for custom H & W)
 * 4. MS Word style text wrapping: Float Right (text on left), Float Left (text on right), Center (break text), Inline (side-by-side collage)
 * 5. Automatic smart width assignment (Side-by-side sets 48%, Float sets 45% so text wraps)
 * 6. Quick size presets (25%, 33%, 50%, 75%, 100%)
 * 7. Rounded corner styling (20px with soft shadow, matching brand designs)
 * 8. Alt text editor & delete button
 */
export function ResizableImageComponent({
  node,
  updateAttributes,
  selected,
  deleteNode,
}: NodeViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingWidth, setResizingWidth] = useState<number | null>(null);
  const [resizingHeight, setResizingHeight] = useState<number | null>(null);
  const [showAltInput, setShowAltInput] = useState(false);
  const [altText, setAltText] = useState(node.attrs.alt || "");
  const [showDimensionInput, setShowDimensionInput] = useState(false);
  const [customW, setCustomW] = useState(node.attrs.width || "350px");
  const [customH, setCustomH] = useState(node.attrs.height || "auto");

  const alignment = node.attrs.alignment || "center";
  const currentWidth = node.attrs.width || "100%";
  const currentHeight = node.attrs.height || "auto";
  const isRounded = node.attrs.rounded !== false;

  // Smart Alignment & Width handler for Side-by-Side and Text Wrap
  const handleSetAlignment = (newAlign: "left" | "center" | "right" | "inline") => {
    if (newAlign === "right" || newAlign === "left") {
      // If width is 100% or unset, adjust to 45% so text on the side has space to flow
      if (!currentWidth || currentWidth === "100%") {
        updateAttributes({ alignment: newAlign, width: "45%" });
        return;
      }
    } else if (newAlign === "inline") {
      // If width is 100% or unset, adjust to 48% so multiple images fit on the same line
      if (!currentWidth || currentWidth === "100%") {
        updateAttributes({ alignment: newAlign, width: "48%" });
        return;
      }
    } else if (newAlign === "center") {
      // Center resets to 100% if it was shrunk for side-by-side
      if (currentWidth === "48%" || currentWidth === "45%") {
        updateAttributes({ alignment: newAlign, width: "100%" });
        return;
      }
    }
    updateAttributes({ alignment: newAlign });
  };

  // Handle Drag to Resize (Corner Handles - resizes both Width & Height)
  const handleMouseDown = (e: React.MouseEvent, corner: "left" | "right") => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const initialWidth = containerRef.current?.offsetWidth || 300;
    const initialHeight = containerRef.current?.offsetHeight || 200;
    const aspectRatio = initialWidth / (initialHeight || 1);
    const parentWidth =
      containerRef.current?.parentElement?.offsetWidth || window.innerWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const diffX = moveEvent.clientX - startX;
      let newWidth = corner === "right" ? initialWidth + diffX : initialWidth - diffX;

      // Restrict between min 140px and max parent width
      newWidth = Math.max(140, Math.min(newWidth, parentWidth));
      const newHeight = Math.round(newWidth / aspectRatio);

      setResizingWidth(newWidth);
      setResizingHeight(newHeight);
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      upEvent.preventDefault();
      setIsResizing(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      const finalDiffX = upEvent.clientX - startX;
      let finalWidth = corner === "right" ? initialWidth + finalDiffX : initialWidth - finalDiffX;
      finalWidth = Math.max(140, Math.min(finalWidth, parentWidth));
      const finalHeight = Math.round(finalWidth / aspectRatio);

      const pct = Math.round((finalWidth / parentWidth) * 100);
      if (pct >= 95) {
        updateAttributes({ width: "100%", height: "auto" });
      } else {
        updateAttributes({ width: `${finalWidth}px`, height: `${finalHeight}px` });
      }
      setResizingWidth(null);
      setResizingHeight(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Determine wrapper layout styles based on alignment
  let wrapperStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    maxWidth: "100%",
  };

  if (resizingWidth) {
    wrapperStyle.width = `${resizingWidth}px`;
  } else if (currentWidth) {
    wrapperStyle.width = currentWidth;
  }

  if (alignment === "left") {
    wrapperStyle.float = "left";
    wrapperStyle.margin = "8px 24px 16px 0";
    wrapperStyle.display = "inline-block";
  } else if (alignment === "right") {
    wrapperStyle.float = "right";
    wrapperStyle.margin = "8px 0 16px 24px";
    wrapperStyle.display = "inline-block";
  } else if (alignment === "inline") {
    wrapperStyle.display = "inline-block";
    wrapperStyle.verticalAlign = "top";
    wrapperStyle.margin = "8px 12px 16px 0";
  } else {
    // center / break text
    wrapperStyle.display = "block";
    wrapperStyle.margin = "20px auto";
    wrapperStyle.clear = "both";
  }

  const effectiveHeight =
    resizingHeight != null
      ? `${resizingHeight}px`
      : currentHeight && currentHeight !== "auto"
      ? currentHeight
      : undefined;

  return (
    <NodeViewWrapper
      as="div"
      ref={containerRef}
      style={wrapperStyle}
      data-drag-handle
      draggable="true"
      className={`group transition-all duration-150 ${
        selected ? "z-20" : "z-10"
      }`}
    >
      <div
        data-drag-handle
        className={`relative rounded-2xl transition-all duration-200 cursor-grab active:cursor-grabbing ${
          selected
            ? "ring-2 ring-[#1c3b2b] ring-offset-3 shadow-lg"
            : "hover:ring-1 hover:ring-[#1c3b2b]/40"
        }`}
      >
        {/* The Actual Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          className={`w-full h-auto object-cover block transition-all pointer-events-none select-none ${
            isRounded ? "rounded-2xl shadow-sm border border-[#e3dac9]/60" : "rounded-sm"
          }`}
          style={{
            height: effectiveHeight,
            maxHeight: effectiveHeight,
            objectFit: "cover",
          }}
        />

        {/* Live Resizing Dimension Badge */}
        {isResizing && resizingWidth && (
          <div className="absolute top-2 left-2 bg-black/80 text-white text-[11px] font-mono px-2 py-0.5 rounded shadow pointer-events-none">
            {Math.round(resizingWidth)}px × {resizingHeight ? Math.round(resizingHeight) : "?"}px
          </div>
        )}

        {/* Corner Drag Handles (Shown when selected or resizing) */}
        {(selected || isResizing) && (
          <>
            {/* Top-Left */}
            <div
              onMouseDown={(e) => handleMouseDown(e, "left")}
              className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-[#1c3b2b] rounded-full shadow cursor-nwse-resize hover:scale-125 transition-transform z-30"
              title="Drag corner to resize Width & Height"
            />
            {/* Top-Right */}
            <div
              onMouseDown={(e) => handleMouseDown(e, "right")}
              className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-[#1c3b2b] rounded-full shadow cursor-nesw-resize hover:scale-125 transition-transform z-30"
              title="Drag corner to resize Width & Height"
            />
            {/* Bottom-Left */}
            <div
              onMouseDown={(e) => handleMouseDown(e, "left")}
              className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-[#1c3b2b] rounded-full shadow cursor-nesw-resize hover:scale-125 transition-transform z-30"
              title="Drag corner to resize Width & Height"
            />
            {/* Bottom-Right */}
            <div
              onMouseDown={(e) => handleMouseDown(e, "right")}
              className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-[#1c3b2b] rounded-full shadow cursor-nwse-resize hover:scale-125 transition-transform z-30"
              title="Drag corner to resize Width & Height"
            />
          </>
        )}

        {/* MS Word Style Floating Toolbar (Visible when Image is Clicked/Selected) */}
        {selected && (
          <div
            className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#1e2422] text-white shadow-2xl rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 z-40 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dedicated Drag Handle to Move Image to Another Paragraph/Position */}
            <div
              data-drag-handle
              className="px-2 py-1.5 rounded-md text-xs text-white/90 hover:text-white hover:bg-white/20 cursor-grab active:cursor-grabbing flex items-center gap-1 bg-white/10 border border-white/15"
              title="Click & Drag to move this photo anywhere in the text"
            >
              <GripVertical className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold hidden sm:inline">Drag to move</span>
            </div>

            <div className="w-[1px] h-4 bg-white/20" />

            {/* Alignment / Wrap Text Buttons */}
            <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => handleSetAlignment("left")}
                className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${
                  alignment === "left"
                    ? "bg-[#1c3b2b] text-white font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                title="Float Left (Text flows on Right)"
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Float Left</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetAlignment("center")}
                className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${
                  alignment === "center"
                    ? "bg-[#1c3b2b] text-white font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                title="Center (Break Text)"
              >
                <AlignCenter className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Center</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetAlignment("right")}
                className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${
                  alignment === "right"
                    ? "bg-[#1c3b2b] text-white font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                title="Float Right (Text flows on Left - MS Word style)"
              >
                <AlignRight className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Float Right</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetAlignment("inline")}
                className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${
                  alignment === "inline"
                    ? "bg-[#1c3b2b] text-white font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                title="Side-by-Side (Place 2 or 3 photos side-by-side as a collage)"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Side-by-Side</span>
              </button>
            </div>

            <div className="w-[1px] h-4 bg-white/20" />

            {/* Quick Size Presets */}
            <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
              {[
                { label: "25%", val: "25%" },
                { label: "33%", val: "33%" },
                { label: "48%", val: "48%" },
                { label: "75%", val: "75%" },
                { label: "100%", val: "100%" },
              ].map((size) => (
                <button
                  key={size.val}
                  type="button"
                  onClick={() => updateAttributes({ width: size.val })}
                  className={`px-1.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    currentWidth === size.val
                      ? "bg-[#1c3b2b] text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>

            {/* Custom W x H Input Toggle */}
            <button
              type="button"
              onClick={() => {
                setShowDimensionInput(!showDimensionInput);
                setShowAltInput(false);
              }}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${
                showDimensionInput
                  ? "bg-[#1c3b2b] text-white font-semibold"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              title="Set Custom Width and Height (e.g. 350px × 250px)"
            >
              <Scaling className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">W×H</span>
            </button>

            <div className="w-[1px] h-4 bg-white/20" />

            {/* Rounded Toggle */}
            <button
              type="button"
              onClick={() => updateAttributes({ rounded: !isRounded })}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                isRounded
                  ? "bg-[#1c3b2b] text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              title={isRounded ? "Disable rounded corners" : "Enable rounded corners (20px)"}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            {/* Alt Text Button */}
            <button
              type="button"
              onClick={() => {
                setShowAltInput(!showAltInput);
                setShowDimensionInput(false);
              }}
              className="p-1.5 rounded-md text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title="Edit SEO Alt description"
            >
              <Type className="w-3.5 h-3.5" />
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => deleteNode()}
              className="p-1.5 rounded-md text-xs text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors ml-0.5"
              title="Delete Image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Custom Width & Height Popover */}
        {selected && showDimensionInput && (
          <div
            className="absolute -top-36 left-1/2 -translate-x-1/2 bg-[#1e2422] text-white rounded-xl p-3 shadow-2xl z-50 flex flex-col gap-2.5 border border-white/15 min-w-[270px] animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-xs font-semibold text-white/90 border-b border-white/10 pb-1.5">
              <span>Set Custom Dimensions</span>
              <button
                type="button"
                onClick={() => setShowDimensionInput(false)}
                className="text-white/60 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-white/60 block mb-1">
                  Width
                </label>
                <input
                  type="text"
                  value={customW}
                  onChange={(e) => setCustomW(e.target.value)}
                  placeholder="e.g. 350px or 48%"
                  className="w-full px-2 py-1 text-xs bg-black/40 border border-white/20 rounded text-white focus:outline-none focus:border-[#4c7c65]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-white/60 block mb-1">
                  Height
                </label>
                <input
                  type="text"
                  value={customH}
                  onChange={(e) => setCustomH(e.target.value)}
                  placeholder="e.g. 240px or auto"
                  className="w-full px-2 py-1 text-xs bg-black/40 border border-white/20 rounded text-white focus:outline-none focus:border-[#4c7c65]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  updateAttributes({ width: "100%", height: "auto" });
                  setCustomW("100%");
                  setCustomH("auto");
                  setShowDimensionInput(false);
                }}
                className="text-[11px] text-white/60 hover:text-white underline"
              >
                Reset (Auto)
              </button>
              <button
                type="button"
                onClick={() => {
                  const finalW = customW.trim()
                    ? customW.includes("%") || customW.includes("px")
                      ? customW.trim()
                      : `${customW.trim()}px`
                    : "100%";
                  const finalH =
                    customH.trim() && customH.trim() !== "auto"
                      ? customH.includes("px")
                        ? customH.trim()
                        : `${customH.trim()}px`
                      : "auto";
                  updateAttributes({ width: finalW, height: finalH });
                  setShowDimensionInput(false);
                }}
                className="px-3 py-1 bg-[#1c3b2b] hover:bg-[#142b1e] text-white text-xs font-semibold rounded transition-colors"
              >
                Apply Size
              </button>
            </div>
          </div>
        )}

        {/* Popover for Alt Text input */}
        {selected && showAltInput && (
          <div
            className="absolute -top-26 left-1/2 -translate-x-1/2 bg-[#1e2422] text-white rounded-xl p-2 shadow-2xl z-50 flex items-center gap-2 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Enter image alt text for SEO..."
              className="px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-[#4c7c65] w-56"
            />
            <button
              type="button"
              onClick={() => {
                updateAttributes({ alt: altText.trim() });
                setShowAltInput(false);
              }}
              className="px-2.5 py-1 bg-[#1c3b2b] hover:bg-[#142b1e] text-white text-xs font-semibold rounded-md transition-colors"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}

/**
 * Custom TipTap Image Node Extension
 * Supports draggable placement, inline resizing, alignment (float-left, float-right, center, inline),
 * and styled rounded borders.
 */
export const ResizableImage = Image.extend({
  name: "image",
  draggable: true,

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute("width") ||
          element.style.width ||
          element.getAttribute("data-width") ||
          null,
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            width: attributes.width,
            "data-width": attributes.width,
          };
        },
      },
      height: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute("height") ||
          element.style.height ||
          element.getAttribute("data-height") ||
          null,
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return {
            height: attributes.height,
            "data-height": attributes.height,
          };
        },
      },
      alignment: {
        default: "center",
        parseHTML: (element) => {
          const style = element.getAttribute("style") || "";
          if (/float:\s*left/i.test(style)) return "left";
          if (/float:\s*right/i.test(style)) return "right";
          if (/display:\s*inline-block/i.test(style)) return "inline";
          return element.getAttribute("data-align") || "center";
        },
        renderHTML: (attributes) => {
          return { "data-align": attributes.alignment || "center" };
        },
      },
      rounded: {
        default: true,
        parseHTML: (element) => element.getAttribute("data-rounded") !== "false",
        renderHTML: (attributes) => {
          return { "data-rounded": attributes.rounded !== false ? "true" : "false" };
        },
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const { alignment, width, height, rounded } = node.attrs;
    let styleStr = "";

    if (width) {
      styleStr += `width: ${width}; max-width: 100%; `;
    }
    if (height && height !== "auto") {
      styleStr += `height: ${height}; object-fit: cover; `;
    }

    if (alignment === "left") {
      styleStr += "float: left; margin: 8px 24px 16px 0; display: inline-block; ";
    } else if (alignment === "right") {
      styleStr += "float: right; margin: 8px 0 16px 24px; display: inline-block; ";
    } else if (alignment === "inline") {
      styleStr += "display: inline-block; vertical-align: top; margin: 8px 12px 16px 0; ";
    } else {
      // center
      styleStr += "display: block; margin: 20px auto; clear: both; ";
    }

    if (rounded !== false) {
      styleStr += "border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); ";
    }

    const merged = {
      ...HTMLAttributes,
      style: `${styleStr}${HTMLAttributes.style || ""}`.trim(),
      class: `${HTMLAttributes.class || ""} ${rounded !== false ? "rounded-2xl" : ""}`.trim(),
    };

    return ["img", merged];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});

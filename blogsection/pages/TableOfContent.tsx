"use client";

import React, { useState, useEffect, useCallback } from "react";

export interface TocHeading {
  id: string;
  title: string;
  level: number; // 2 for h2, 3 for h3
}

const DEFAULT_SELECTOR = "#prose h2, #prose h3";
const HEADER_FALLBACK = 80;

function slugify(text: string, taken: Set<string>): string {
  const base =
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "heading";

  let id = base;
  let n = 2;
  while (taken.has(id)) {
    id = `${base}-${n++}`;
  }
  return id;
}

function getHeaderOffset(): number {
  const header = document.querySelector<HTMLElement>(".site-header");
  return header ? header.getBoundingClientRect().height : HEADER_FALLBACK;
}

export default function TableOfContent({
  contentSelector = DEFAULT_SELECTOR,
}: {
  contentSelector?: string;
}) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 1. Extract h2/h3 from the blog content only (never the sidebar/footer),
  //    assigning a unique id to any heading that doesn't already have one.
  useEffect(() => {
    const injected: { el: HTMLElement; original: string | null }[] = [];

    const scan = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(contentSelector),
      );

      const taken = new Set<string>();
      for (const el of elements) {
        if (el.id) taken.add(el.id);
      }

      const extracted: TocHeading[] = [];
      for (const el of elements) {
        const title = (el.textContent || "").trim();
        if (!title) continue;

        if (!el.id) {
          injected.push({ el, original: null });
          el.id = slugify(title, taken);
        }
        taken.add(el.id);

        // Keep the heading clear of the sticky header when scrolled to.
        el.style.scrollMarginTop = `${getHeaderOffset() + 16}px`;

        extracted.push({
          id: el.id,
          title,
          level: Number(el.tagName.charAt(1)), // 'H2' -> 2, 'H3' -> 3
        });
      }

      setHeadings(extracted);
      setActiveId((prev) =>
        prev && extracted.some((h) => h.id === prev)
          ? prev
          : (extracted[0]?.id ?? null),
      );
    };

    // Content is server-rendered, so a mount scan is normally enough.
    // Retry once on the next frame in case it lands mid-hydration.
    const raf = requestAnimationFrame(() => {
      if (document.querySelectorAll(contentSelector).length === 0) {
        requestAnimationFrame(scan);
      } else {
        scan();
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      for (const { el, original } of injected) {
        if (original === null) el.removeAttribute("id");
      }
    };
  }, [contentSelector]);

  // 2. Scroll spy. Track every visible heading, then activate the topmost one
  //    so the highlight never jumps backwards when entries fire out of order.
  useEffect(() => {
    if (headings.length === 0) return;

    const visible = new Set<string>();
    const indexOf = (id: string) => headings.findIndex((h) => h.id === id);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        const candidates = [...visible]
          .map(indexOf)
          .filter((i) => i !== -1)
          .sort((a, b) => a - b);

        if (candidates.length > 0) setActiveId(headings[candidates[0]].id);
      },
      { rootMargin: `-${getHeaderOffset() + 8}px 0px -60% 0px`, threshold: 0 },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    // At the very bottom nothing may be intersecting — keep the last item lit.
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActiveId(headings[headings.length - 1].id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  // 3. Smooth scroll, respecting the heading's scroll-margin-top.
  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (headings.length === 0) return null;

  const activeIndex = headings.findIndex((item) => item.id === activeId);

  return (
    <section className="px-5 py-6 bg-[#fdfbf7] rounded-3xl border border-[#e3dac9]">
      <h2 className="font-belleza text-xl font-normal text-[#1e2422] mb-5 tracking-wide">
        In this article
      </h2>

      <div className="relative ml-1 font-figtree">
        <ul className="flex flex-col">
          {headings.map((item, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            const isSub = item.level >= 3;

            // Heading level drives the base colour/weight so an h2 always reads
            // darker than an h3; scroll state only adds emphasis on top of that.
            const tone = isActive
              ? "font-semibold text-[#1c3b2b]"
              : isSub
                ? isPast
                  ? "font-medium text-stone-600 hover:text-[#1e2422]"
                  : "font-normal text-stone-500 hover:text-stone-700"
                : "font-medium text-[#1e2422] hover:text-[#1c3b2b]";

            return (
              <li
                key={item.id}
                className="relative flex items-start pb-4 last:pb-0 group"
              >
                {/* Connecting Line */}
                {index !== headings.length - 1 && (
                  <div
                    className={`absolute left-[5px] top-[11px] w-[2px] h-full transition-colors duration-300 ${
                      isPast ? "bg-[#1c3b2b]" : "bg-[#e3dac9]/60"
                    }`}
                  />
                )}

                <button
                  type="button"
                  onClick={() => handleClick(item.id)}
                  className="flex items-start text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1c3b2b]/40 rounded-lg cursor-pointer"
                  aria-current={isActive ? "location" : undefined}
                >
                  {/* Dot */}
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex items-center justify-center w-3 h-3 mt-[4.5px] shrink-0"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${isSub ? "w-2 h-2" : "w-2.5 h-2.5"} ${
                        isActive
                          ? "bg-[#b85c00] ring-[4px] ring-[#b85c00]/25 scale-110"
                          : isPast
                            ? "bg-[#1c3b2b]"
                            : "bg-[#e3dac9] group-hover:bg-[#1c3b2b]/50"
                      }`}
                    />
                  </span>

                  {/* Text — h3 sits smaller and indented under its h2 */}
                  <span
                    className={`leading-[22px] ml-4 transition-colors duration-200 text-sm ${
                      isSub ? "pl-3 text-xs sm:text-sm" : ""
                    } ${tone}`}
                  >
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";

export interface TocHeading {
  id: string;
  title: string;
  level: number;
}

const DEFAULT_SELECTOR = "#prose h2, #conclusion h2, section#conclusion h2, #faqs h2, section#faqs h2";
const HEADER_OFFSET = 100;

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

export default function TableOfContent({
  contentSelector = DEFAULT_SELECTOR,
}: {
  contentSelector?: string;
}) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 1. Scan headings from content, conclusion, and FAQs
  useEffect(() => {
    const injected: { el: HTMLElement; original: string | null }[] = [];

    const scan = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(contentSelector),
      ).filter((el) => {
        const tag = el.tagName.toUpperCase();
        return tag === "H2" || tag === "H3";
      });

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

        el.style.scrollMarginTop = `${HEADER_OFFSET + 16}px`;

        extracted.push({
          id: el.id,
          title,
          level: Number(el.tagName.charAt(1)) || 2,
        });
      }

      setHeadings(extracted);
      if (extracted.length > 0) {
        setActiveId((prev) => (prev && extracted.some((h) => h.id === prev) ? prev : extracted[0].id));
      }
    };

    const timer = setTimeout(scan, 100);
    const raf = requestAnimationFrame(scan);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      for (const { el, original } of injected) {
        if (original === null) el.removeAttribute("id");
      }
    };
  }, [contentSelector]);

  // 2. Active heading scrollspy with real-time scroll tracking
  useEffect(() => {
    if (headings.length === 0) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight;
          const winHeight = window.innerHeight;

          // If at the very bottom, highlight the last heading
          if (scrollY + winHeight >= docHeight - 80) {
            setActiveId(headings[headings.length - 1].id);
            ticking = false;
            return;
          }

          let currentId = headings[0].id;
          for (let i = 0; i < headings.length; i++) {
            const el = document.getElementById(headings[i].id);
            if (el) {
              const top = el.getBoundingClientRect().top + scrollY - HEADER_OFFSET - 20;
              if (scrollY >= top) {
                currentId = headings[i].id;
              } else {
                break;
              }
            }
          }

          setActiveId(currentId);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  // 3. Smooth scroll on click
  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    const targetPos = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: targetPos, behavior: "smooth" });
  }, []);

  if (headings.length === 0) return null;

  const activeIndex = headings.findIndex((item) => item.id === activeId);

  return (
    <section id="toc-section" className="px-5 py-6 bg-[#fdfbf7] rounded-3xl border border-[#e3dac9] transition-all">
      <h2 className="font-belleza text-xl font-normal text-[#1e2422] mb-5 tracking-wide">
        In this article
      </h2>

      <div className="relative ml-1 font-figtree">
        <ul className="flex flex-col">
          {headings.map((item, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;

            const tone = isActive
              ? "font-semibold text-[#1c3b2b]"
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
                  className="flex items-start text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1c3b2b]/40 rounded-lg cursor-pointer transition-colors"
                  aria-current={isActive ? "location" : undefined}
                >
                  {/* Dot */}
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex items-center justify-center w-3 h-3 mt-[4.5px] shrink-0"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 w-2.5 h-2.5 ${
                        isActive
                          ? "bg-[#b85c00] ring-[4px] ring-[#b85c00]/25 scale-110 shadow-xs"
                          : isPast
                            ? "bg-[#1c3b2b]"
                            : "bg-[#e3dac9] group-hover:bg-[#1c3b2b]/50"
                      }`}
                    />
                  </span>

                  {/* Text */}
                  <span
                    className={`leading-[22px] ml-4 transition-colors duration-200 text-sm ${tone}`}
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

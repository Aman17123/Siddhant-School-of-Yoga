"use client";

import React, { useState } from "react";

export interface FaqItem {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
}

function normalize(faq: FaqItem): { question: string; answer: string } {
  return {
    question: (faq.q || faq.question || "").trim(),
    answer: (faq.a || faq.answer || "").trim(),
  };
}

/**
 * FAQ block for a blog post.
 *
 * - Heading is an <h2>, every question is an <h3>, every answer is a <p>.
 * - Questions are numbered (Q1, Q2, ...) in their stored order.
 * - All items start collapsed and each one opens/closes on its own.
 */
export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIdxs, setOpenIdxs] = useState<Record<number, boolean>>({});

  const items = (faqs || []).map(normalize).filter((f) => f.question);
  if (items.length === 0) return null;

  const toggle = (i: number) =>
    setOpenIdxs((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <h2 className="font-display font-semibold text-section leading-[1.2] tracking-[-0.01em] text-[#2A1621] mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = Boolean(openIdxs[i]);
          const headingId = `faq-q-${i}`;
          const panelId = `faq-a-${i}`;

          return (
            <div
              key={i}
              className={`bg-[#FDF9FB] rounded-2xl border transition-colors duration-300 ${
                isOpen
                  ? "border-[#BF296A]/40"
                  : "border-gray-100 hover:border-[#BF296A]/40"
              }`}
            >
              <h3 className="m-0">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={headingId}
                  className="w-full flex items-start gap-3 text-left cursor-pointer px-5 sm:px-6 py-4 sm:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BF296A]/40 rounded-2xl"
                >
                  <span className="font-mono font-bold text-[#BF296A] text-body leading-[1.35] shrink-0 mt-[1px]">
                    Q{i + 1}.
                  </span>
                  <span className="flex-1 font-display font-semibold text-card leading-[1.35] text-[#2A1621]">
                    {item.question}
                  </span>
                  {/* Chevron */}
                  <span
                    aria-hidden="true"
                    className={`shrink-0 mt-[3px] text-[#BF296A] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
              </h3>

              {/* Height animation via grid rows; content is hidden from
                  assistive tech while collapsed. */}
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    aria-hidden={!isOpen}
                    className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.1rem] sm:pl-[4.6rem]"
                  >
                    <p className="text-body text-[#6B5862] whitespace-pre-line m-0">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

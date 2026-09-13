"use client";

import { useState } from "react";
import { Container, SectionHeading } from "./ui";
import { faqs } from "@/data/siteData";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-14 sm:py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#EBE5D8]/80 relative overflow-hidden"
    >
      {/* Background Decorative Yoga Art & Sacred Motifs */}
      <div
        className="absolute -left-12 sm:left-0 top-10 sm:top-16 w-64 sm:w-80 lg:w-[380px] h-64 sm:h-80 lg:h-[300px] opacity-40 sm:opacity-55 pointer-events-none bg-no-repeat bg-contain bg-left-top transition-opacity"
        style={{
          backgroundImage: "url('/images/icons/siddhant-mandala-left.svg')",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute -right-12 sm:right-0 bottom-6 sm:bottom-12 w-72 sm:w-88 lg:w-[420px] h-72 sm:h-88 lg:h-[300px] opacity-40 sm:opacity-55 pointer-events-none bg-no-repeat bg-contain bg-right-bottom transition-opacity"
        style={{
          backgroundImage: "url('/images/icons/siddhant-himalaya-right.svg')",
        }}
        aria-hidden="true"
      />

      {/* Sacred Central Lotus Mandala Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] sm:w-[560px] h-[440px] sm:h-[560px] pointer-events-none opacity-[0.045] text-[#175f52] flex items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full animate-[spin_240s_linear_infinite]"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <circle cx="100" cy="100" r="95" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="82" />
          <circle cx="100" cy="100" r="68" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="32" />
          <circle cx="100" cy="100" r="14" />
          <circle cx="100" cy="100" r="3" fill="currentColor" />
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, i) => (
            <path
              key={i}
              d="M 100 50 C 90 25, 110 25, 100 5 C 90 25, 110 25, 100 50 Z"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
          {[11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75].map((angle, i) => (
            <path
              key={`inner-${i}`}
              d="M 100 68 C 94 48, 106 48, 100 32 C 94 48, 106 48, 100 68 Z"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
        </svg>
      </div>

      {/* Gentle Spiritual Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#F5B860]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#175f52]/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <SectionHeading
          eyebrow="Before you book"
          title="Yoga Teacher Training in Rishikesh — FAQs"
          center
        />

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-3.5 mb-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-xs ${
                  isOpen
                    ? "border-[#f22924] bg-white shadow-md"
                    : "border-[#EBE5D8] bg-white/95 hover:bg-white hover:border-[#F5B860] shadow-2xs"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base sm:text-lg font-belleza font-bold tracking-wide transition-colors ${
                      isOpen ? "text-[#f22924]" : "text-[#1F1E1D]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 font-bold text-sm sm:text-base ${
                      isOpen
                        ? "bg-[#f22924] text-white rotate-180"
                        : "bg-[#FAF6EE] text-[#77786e] hover:bg-[#F5B860]/20"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-[15px] text-[#55564c] font-figtree leading-relaxed border-t border-[#f22924]/10">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

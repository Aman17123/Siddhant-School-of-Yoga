"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Container, SectionHeading } from "../ui";
import { teachers, whatsappLink } from "@/data/siteData";
import { Award, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

function MandalaFrame() {
  return (
    <svg
      viewBox="0 0 140 140"
      className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 ease-out group-hover:rotate-45 text-[#f22924]"
      aria-hidden="true"
    >
      <defs>
        {/* Subtle miniature lotus crest (minor accent) */}
        <g id="mini-scallop">
          <path
            d="M 66 10 Q 70 4 74 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <circle cx="70" cy="3" r="1" fill="#f5b860" />
        </g>
      </defs>

      {/* 16 delicate radial petal crests */}
      {[
        0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270,
        292.5, 315, 337.5,
      ].map((deg) => (
        <use
          key={deg}
          href="#mini-scallop"
          transform={`rotate(${deg} 70 70)`}
        />
      ))}

      {/* Outer delicate beaded ring */}
      <circle
        cx="70"
        cy="70"
        r="66"
        fill="none"
        stroke="#f5b860"
        strokeWidth="0.6"
        strokeDasharray="2 2.5"
        opacity="0.8"
      />

      {/* Concentric tight framing rings */}
      <circle
        cx="70"
        cy="70"
        r="61"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle
        cx="70"
        cy="70"
        r="58"
        fill="none"
        stroke="#f5b860"
        strokeWidth="0.75"
        strokeDasharray="1.5 2"
      />
      <circle
        cx="70"
        cy="70"
        r="55"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
    </svg>
  );
}

export default function Teachers() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const firstCard = scrollRef.current.firstElementChild;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24; // 24 is gap-6
      const idx = Math.min(
        teachers.length - 1,
        Math.max(0, Math.round(scrollLeft / cardWidth)),
      );
      setActiveIndex(idx);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  return (
    <section
      id="teachers"
      className="py-14 sm:py-16 lg:py-20 bg-[#FAF6EE] border-b border-[#EBE5D8]/80 relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B860]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f22924]/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
        <SectionHeading
          title="Learn Directly from Dedicated Yogis"
          description="Our faculty combines decades of traditional monastic training in the Himalayas with deep scientific knowledge in biomechanics, alignment, and subtle energetic anatomy."
          center
        />

        {/* Carousel Container with Navigation Arrows */}
        <div className="relative group/carousel px-1 sm:px-2">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous teachers"
            className={`absolute -left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-[#EBE5D8] shadow-md flex items-center justify-center text-[#1e2422] hover:bg-[#f22924] hover:text-white hover:border-[#f22924] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none cursor-pointer`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next teachers"
            className={`absolute -right-2 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-[#EBE5D8] shadow-md flex items-center justify-center text-[#1e2422] hover:bg-[#f22924] hover:text-white hover:border-[#f22924] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none cursor-pointer`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Responsive Carousel Track: 1 on Mobile, 2 on Tablet, 4 on Desktop */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {teachers.map((teacher, idx) => (
              <div
                key={idx}
                className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start bg-white rounded-3xl p-5 sm:p-6 border border-[#EBE5D8] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group flex flex-col items-center text-center"
              >
                {/* Minor Subtle Ornate Framed Circular Avatar */}
                <div className="relative w-32 h-32 sm:w-34 sm:h-34 mb-3 flex items-center justify-center">
                  <MandalaFrame />

                  {/* Circular Teacher Photo */}
                  <div className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full overflow-hidden z-10 border-2 border-white shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 104px, 104px"
                    />
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-figtree font-semibold bg-[#FAF6EE] text-[#f22924] border border-[#f5b860]/40 shadow-2xs mb-2.5">
                  <Award className="w-3 h-3 text-[#f5b860]" />
                  <span>{teacher.exp}</span>
                </div>

                {/* Teacher Name */}
                <h3 className="text-xl sm:text-[22px] font-belleza font-normal tracking-wide text-[#1e2422] mb-1">
                  {teacher.name}
                </h3>

                {/* Role */}
                <p className="text-xs sm:text-[13px] font-figtree font-semibold text-[#f22924] mb-2">
                  {teacher.role}
                </p>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {/* Mobile Dots (1 to 8) */}
            <div className="flex sm:hidden items-center gap-1.5">
              {teachers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i
                      ? "w-6 bg-[#f22924]"
                      : "w-2 bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Go to teacher ${i + 1}`}
                />
              ))}
            </div>

            {/* Tablet Dots (4 Pairs of 2) */}
            <div className="hidden sm:flex lg:hidden items-center gap-2">
              {[0, 2, 4, 6].map((targetIdx, pageIdx) => {
                const isPageActive =
                  activeIndex >= targetIdx && activeIndex < targetIdx + 2;
                return (
                  <button
                    key={pageIdx}
                    onClick={() => scrollToCard(targetIdx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isPageActive
                        ? "w-7 bg-[#f22924]"
                        : "w-2.5 bg-stone-300 hover:bg-stone-400"
                    }`}
                    aria-label={`Go to slide ${pageIdx + 1}`}
                  />
                );
              })}
            </div>

            {/* Desktop Dots (2 Pages of 4) */}
            <div className="hidden lg:flex items-center gap-2">
              {[0, 4].map((targetIdx, pageIdx) => {
                const isPageActive =
                  (pageIdx === 0 && activeIndex < 4) ||
                  (pageIdx === 1 && activeIndex >= 4);
                return (
                  <button
                    key={pageIdx}
                    onClick={() => scrollToCard(targetIdx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isPageActive
                        ? "w-8 bg-[#f22924]"
                        : "w-2.5 bg-stone-300 hover:bg-stone-400"
                    }`}
                    aria-label={`Go to batch ${pageIdx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* View All Teachers Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <a
            href={whatsappLink(
              "Namaste! I would like to learn more about the faculty and master teachers at Siddhant School of Yoga in Rishikesh.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-figtree font-semibold bg-[#f22924] hover:bg-[#d45d44] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>View All Teachers</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { Container, Kicker, HeadingDivider } from "../ui";

const shorts = [
  { id: "4vKnlce9jrE" },
  { id: "XSaBeyo0jkk" },
  { id: "Gpusg12wRBE" },
  { id: "9ObXPhFNoXc" },
  { id: "CE06ZNjPdTM" },
  { id: "mGbsPE67V7Y" },
];

export default function ShortsSection() {
  const [activeId, setActiveId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveId(null);
    };
    if (activeId) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeId]);

  const scrollByCard = (dir) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("[data-short-card]");
    const amount = card ? card.offsetWidth + 16 : 240;
    scrollRef.current.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section
      id="shorts"
      className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/70 relative overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 lg:mb-10 text-center sm:text-left">
          <div>
            <Kicker>Watch &amp; Learn</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
              Quick Yoga Wisdom From Acharya Siddhant
            </h2>
            <HeadingDivider />
          </div>

          {/* Desktop scroll arrows */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0 pb-1">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll shorts left"
              className="w-10 h-10 rounded-full bg-white border border-[#c8ece2] shadow-xs hover:shadow-md hover:border-[#158b72] hover:text-[#158b72] flex items-center justify-center text-[#55564c] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Scroll shorts right"
              className="w-10 h-10 rounded-full bg-white border border-[#c8ece2] shadow-xs hover:shadow-md hover:border-[#158b72] hover:text-[#158b72] flex items-center justify-center text-[#55564c] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Shorts Rail */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-thin pb-3 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {shorts.map((short) => (
              <button
                key={short.id}
                type="button"
                data-short-card
                onClick={() => setActiveId(short.id)}
                className="group relative shrink-0 w-[62%] sm:w-[46%] md:w-[31%] lg:w-[calc((100%-3rem)/4)] max-w-[280px] aspect-[9/12] sm:aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-[#c8ece2] transition-all duration-300 hover:-translate-y-1 snap-start cursor-pointer"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`}
                  alt="Acharya Siddhant yoga wisdom short video"
                  fill
                  unoptimized
                  sizes="220px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 text-[#158b72] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#158b72] group-hover:text-white transition-all duration-300 pl-0.5">
                    <Play className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current" />
                  </div>
                </div>

                {/* Shorts badge */}
                <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold uppercase tracking-wider text-[#1e2422] shadow-2xs">
                  <FaYoutube className="w-2.5 h-2.5 text-red-600" />
                  Shorts
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Watch More CTA */}
        <div className="mt-8 lg:mt-10 text-center">
          <a
            href="https://www.youtube.com/@AcharyaSiddhant/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-[#158b72] text-[#1e2422] hover:text-white border border-[#c8ece2] hover:border-[#158b72] text-sm font-semibold transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 group"
          >
            <FaYoutube className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" />
            <span>Watch More Videos</span>
          </a>
        </div>
      </Container>

      {/* Vertical Shorts Modal Player */}
      {activeId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative w-full max-w-[380px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveId(null)}
              aria-label="Close video player"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#158b72] text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <X className="w-4.5 h-4.5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0`}
              title="Acharya Siddhant Yoga Wisdom Short"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </section>
  );
}

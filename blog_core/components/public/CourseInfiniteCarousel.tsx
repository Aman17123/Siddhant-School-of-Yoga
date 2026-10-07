"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { teacherTrainings } from "@/data/coursesData";

// Repeat 3 times for a seamless infinite loop track in both directions
const ALL_COURSES = [...teacherTrainings, ...teacherTrainings, ...teacherTrainings];

const courseSummary = (course: (typeof teacherTrainings)[number], max = 130) => {
  const text = (course.description || "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim()}…`;
};

export default function CourseInfiniteCarousel() {
  const [slideWidth, setSlideWidth] = useState(328);
  const [cardGap, setCardGap] = useState(20);
  const [outerGap, setOuterGap] = useState(24);
  const [trackWidth, setTrackWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const cycleWidthRef = useRef(0);
  const slideWidthRef = useRef(328);

  const isAnimatingStep = useRef(false);

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const containerW = containerRef.current.offsetWidth;
      const windowW = window.innerWidth;

      let gap = 20;
      let outGap = 24;

      if (windowW < 640) {
        gap = 14;
        outGap = 16;
      } else if (windowW < 1024) {
        gap = 18;
        outGap = 20;
      }

      setCardGap(gap);
      setOuterGap(outGap);

      let visibleCards = 3;
      if (windowW < 640) {
        visibleCards = 1.15;
      } else if (windowW < 768) {
        visibleCards = 1.6;
      } else if (windowW < 1024) {
        visibleCards = 2.2;
      } else if (windowW < 1280) {
        visibleCards = 3;
      } else {
        visibleCards = 3.5;
      }

      const availableW = containerW;
      const computedSlideW = Math.floor(
        (availableW - (Math.floor(visibleCards) - 1) * gap) / visibleCards
      );
      const finalSlideW = Math.max(computedSlideW, 280);

      setSlideWidth(finalSlideW);
      slideWidthRef.current = finalSlideW;

      const singleCycle = teacherTrainings.length * (finalSlideW + gap);
      cycleWidthRef.current = singleCycle;

      const totalTrack = ALL_COURSES.length * (finalSlideW + gap);
      setTrackWidth(totalTrack);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const applyOffset = (offset: number) => {
    offsetRef.current = offset;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-offset}px, 0px, 0px)`;
    }
  };

  const animateStep = (direction: 1 | -1) => {
    if (isAnimatingStep.current) return;
    isAnimatingStep.current = true;

    const step = (slideWidthRef.current + cardGap) * direction;
    const targetOffset = offsetRef.current + step;

    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.4s ease-out";
      applyOffset(targetOffset);

      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
        }
        const cycle = cycleWidthRef.current;
        if (cycle > 0) {
          let normalized = offsetRef.current % cycle;
          if (normalized < 0) normalized += cycle;
          applyOffset(normalized);
        }
        isAnimatingStep.current = false;
      }, 420);
    } else {
      isAnimatingStep.current = false;
    }
  };

  const totalTrackWidth = trackWidth || ALL_COURSES.length * (slideWidth + cardGap);

  return (
    <section className="bg-[#f4efe6]/40 py-16 sm:py-20 border-t border-[#e3dac9]/60 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="block text-xs font-semibold tracking-[0.08em] uppercase text-[#b85c00] mb-2 font-figtree">
              Yoga TTC Courses
            </span>
            <h2 className="font-belleza font-normal tracking-wide text-2xl sm:text-3xl lg:text-[38px] leading-[1.2] text-[#1e2422]">
              Yoga Teacher Training (TTC) in Rishikesh
            </h2>
          </div>

        </div>

        <div className="relative">
          {/* Nav buttons */}
          <button
            type="button"
            aria-label="Previous Course"
            onClick={() => animateStep(1)}
            className="absolute -left-3 sm:-left-5 lg:-left-14 top-1/2 -translate-y-1/2 flex-none h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#e3dac9] bg-white text-[#1e2422] shadow-md transition-all duration-200 hover:border-[#1c3b2b] hover:bg-[#1c3b2b] hover:scale-105 active:scale-95 hover:text-white hidden md:flex cursor-pointer z-20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next Course"
            onClick={() => animateStep(-1)}
            className="absolute -right-3 sm:-right-5 lg:-right-14 top-1/2 -translate-y-1/2 flex-none h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#e3dac9] bg-white text-[#1e2422] shadow-md transition-all duration-200 hover:border-[#1c3b2b] hover:bg-[#1c3b2b] hover:scale-105 active:scale-95 hover:text-white hidden md:flex cursor-pointer z-20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div
            ref={containerRef}
            className="w-full overflow-hidden select-none"
            onDragStart={(e) => e.preventDefault()}
            role="region"
            aria-label="Yoga TTC courses"
            tabIndex={0}
          >
            <div
              ref={trackRef}
              className="flex py-3 will-change-transform"
              style={{
                width: `${totalTrackWidth}px`,
                transform: "translate3d(0px, 0px, 0px)",
              }}
            >
              {ALL_COURSES.map((course, idx) => {
                const isFeatured = course.featured || course.badge === "Most Popular";
                return (
                  <div
                    key={`${course.slug}-${idx}`}
                    className="flex box-border h-auto shrink-0 font-figtree"
                    style={{ width: `${slideWidth}px`, paddingRight: `${cardGap}px` }}
                  >
                    <article
                      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-[#fdfbf7] transition-all duration-300 hover:-translate-y-1 hover:border-[#1c3b2b] hover:shadow-xl ${
                        isFeatured
                          ? "border-[#1c3b2b] shadow-md ring-1 ring-[#1c3b2b]/20"
                          : "border-[#e3dac9] shadow-2xs"
                      }`}
                    >
                      <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-stone-100">
                        {course.image && (
                          <Image
                            src={course.image}
                            alt={`${course.title} in Rishikesh`}
                            fill
                            draggable={false}
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 75vw, 350px"
                          />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

                        {course.badge && (
                          <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-[#1c3b2b] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                            {course.badge}
                          </span>
                        )}

                        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#1e2422] shadow-xs backdrop-blur-xs border border-[#e3dac9]">
                          {course.duration}
                        </span>

                        <span className="absolute bottom-2 left-2.5 z-10 rounded-full bg-black/65 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                          {course.level}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <h3 className="font-belleza text-xl font-normal leading-snug text-[#1e2422] transition-colors group-hover:text-[#1c3b2b]">
                          {course.title}
                        </h3>

                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-stone-500">
                          {course.certification}
                        </p>

                        <div className="my-2.5 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#1c3b2b] via-[#e3dac9] to-transparent transition-all duration-300 group-hover:w-36" />

                        <p className="mb-4 text-sm leading-relaxed text-stone-600">
                          {courseSummary(course)}
                        </p>

                        <div className="mt-auto flex items-center justify-between border-t border-[#e3dac9]/60 pb-3 pt-2.5">
                          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Starting Fee
                          </span>
                          <span className="text-base font-bold tracking-tight text-[#1c3b2b]">
                            {course.price}
                          </span>
                        </div>

                        <div className="mt-2">
                          <Link
                            href={`/${course.slug}`}
                            className="w-full flex h-10 items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#b85c00] hover:bg-[#96490a] text-white shadow-xs transition-colors whitespace-nowrap overflow-hidden"
                          >
                            Explore Course
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

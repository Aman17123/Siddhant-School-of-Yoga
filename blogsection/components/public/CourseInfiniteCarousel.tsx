"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import ThemeButton from "@/components/shared/ThemeButton";
import { COURSES } from "@/content/courses";

// Repeat 3 times for a seamless infinite loop track in both directions
const ALL_COURSES = [...COURSES, ...COURSES, ...COURSES];

// metaDescription is a 200+ char SEO string; a card needs a short line, so trim
// it at a word boundary rather than hard-slicing mid-word.
const courseSummary = (course: (typeof COURSES)[number], max = 130) => {
  const text = course.metaDescription.replace(/\s+/g, " ").trim();
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

  const viewportRef = useRef<HTMLDivElement>(null);
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

      let slides = 4;
      if (windowW < 640) slides = 1.1;
      else if (windowW < 1024) slides = 2.5;
      else if (windowW < 1280) slides = 3;
      else slides = 4;

      const nextCardGap = windowW < 640 ? 12 : windowW < 1024 ? 16 : 20;
      const sWidthAndGap = (containerW + nextCardGap) / slides;

      setCardGap(nextCardGap);
      setSlideWidth(sWidthAndGap);
      slideWidthRef.current = sWidthAndGap;
      cycleWidthRef.current = COURSES.length * sWidthAndGap;

      if (offsetRef.current === 0 && cycleWidthRef.current > 0) {
        offsetRef.current = -cycleWidthRef.current;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    const handleResize = () => {
      updateDimensions();
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateDimensions]);

  const animateToOffset = (targetOffset: number, duration = 350) => {
    if (cycleWidthRef.current <= 0) return;
    isAnimatingStep.current = true;

    const initialOffset = offsetRef.current;
    const distance = targetOffset - initialOffset;
    const startTime = performance.now();

    const stepLoop = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      let nextOffset = initialOffset + distance * ease;

      while (nextOffset <= -cycleWidthRef.current * 2) {
        nextOffset += cycleWidthRef.current;
      }
      while (nextOffset > 0) {
        nextOffset -= cycleWidthRef.current;
      }

      offsetRef.current = nextOffset;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
      }

      if (progress < 1) {
        requestAnimationFrame(stepLoop);
      } else {
        isAnimatingStep.current = false;
      }
    };

    requestAnimationFrame(stepLoop);
  };

  const animateStep = (direction: 1 | -1) => {
    if (isAnimatingStep.current || cycleWidthRef.current <= 0) return;
    const currentNearest = Math.round(offsetRef.current / slideWidthRef.current);
    const targetOffset = (currentNearest + direction) * slideWidthRef.current;
    animateToOffset(targetOffset, 400);
  };

  const totalTrackWidth = ALL_COURSES.length * slideWidth;

  return (
    <section className="relative w-full bg-[#fffbfd] py-9 sm:py-12 overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:mb-8">
          <span className="mb-3 inline-flex items-center justify-center gap-2 text-body-sm font-semibold uppercase tracking-wide text-[#BF296A]">
            <span>All Yoga TTC Courses · Sanskriti Yogpeeth</span>
          </span>
          <h2 className="font-display text-section font-semibold leading-[1.15] tracking-[-0.01em] text-[#2A1621]">
            Find Your Yoga Teacher Training Course
          </h2>
          <p className="mx-auto mt-3 text-body leading-relaxed text-[#6B5862] text-pretty">
            Browse every certification we offer in Rishikesh — from a 100-hour
            beginner immersion to the full 500-hour master journey.
          </p>
        </div>

        <div className="relative w-full">
          <button
            type="button"
            aria-label="Previous Course"
            onClick={() => animateStep(1)}
            className="absolute -left-3 sm:-left-5 lg:-left-14 top-1/2 -translate-y-1/2 flex-none h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#EFE3E9] bg-white text-[#2A1621] shadow-md transition-all duration-200 hover:border-[#BF296A] hover:bg-[#BF296A] hover:scale-105 active:scale-95 hover:text-white hidden md:flex cursor-pointer z-20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next Course"
            onClick={() => animateStep(-1)}
            className="absolute -right-3 sm:-right-5 lg:-right-14 top-1/2 -translate-y-1/2 flex-none h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#EFE3E9] bg-white text-[#2A1621] shadow-md transition-all duration-200 hover:border-[#BF296A] hover:bg-[#BF296A] hover:scale-105 active:scale-95 hover:text-white hidden md:flex cursor-pointer z-20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div
            ref={containerRef}
            className="w-full overflow-hidden select-none"
            onDragStart={(e) => e.preventDefault()}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                animateStep(1);
              } else if (e.key === "ArrowRight") {
                e.preventDefault();
                animateStep(-1);
              }
            }}
            role="region"
            aria-roledescription="carousel"
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
                const isFeatured = course.slug === "200-hour-yoga-teacher-training-in-rishikesh";
                return (
                <div
                  key={`${course.slug}-${idx}`}
                  className="flex box-border h-auto shrink-0"
                  style={{ width: `${slideWidth}px`, paddingRight: `${cardGap}px` }}
                >
                  <article
                    className={`group relative pointer-events-none flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#BF296A] hover:shadow-xl ${
                      isFeatured
                        ? "border-[#BF296A] shadow-md ring-1 ring-[#BF296A]/20"
                        : "border-[#EFE3E9] shadow-2xs"
                    }`}
                  >
                    <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-pink-50">
                      <Image
                        src={course.image}
                        alt={`${course.shortName} in Rishikesh`}
                        fill
                        draggable={false}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 75vw, 350px"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

                      {isFeatured && (
                        <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-[#BF296A] px-2 py-0.5 text-label font-bold uppercase tracking-wider text-white shadow-md">
                          Most Popular
                        </span>
                      )}

                      <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white/95 px-2 py-0.5 text-label font-bold uppercase tracking-wider text-[#2A1621] shadow-xs backdrop-blur-xs">
                        {course.durationLabel}
                      </span>

                      <span className="absolute bottom-2 left-2.5 z-10 rounded-full bg-black/65 px-2 py-0.5 text-label font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                        {course.level}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-4 sm:p-4.5">
                      <h3 className="font-display text-card font-bold leading-snug text-[#2A1621] transition-colors group-hover:text-[#BF296A]">
                        {course.shortName}
                      </h3>

                      <p className="mt-1 text-label font-semibold uppercase tracking-wider text-[#7A6B5F]">
                        {course.certification}
                      </p>

                      <div className="my-2.5 h-[2px] w-28 rounded-full bg-gradient-to-r from-[#BF296A] via-[#EFE3E9] to-transparent transition-all duration-300 group-hover:w-40" />

                      <p className="mb-4.5 text-body leading-relaxed text-[#6B5862]">
                        {courseSummary(course)}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-[#EFE3E9]/60 pb-3 pt-2.5">
                        <span className="text-label font-semibold uppercase tracking-wider text-[#7A6B5F]">
                          Starting Fee
                        </span>
                        <span className="text-body font-bold tracking-tight text-[#BF296A]">
                          {course.price}
                        </span>
                      </div>

                      <div className="pointer-events-auto">
                        <ThemeButton
                          href={`/${course.slug}`}
                          className="w-full !flex !h-10.5 items-center justify-center !rounded-xl !px-3 !py-0 !text-label font-bold uppercase tracking-wider shadow-2xs hover:shadow-xs xl:!text-label whitespace-nowrap overflow-hidden"
                        >
                          Explore Course
                        </ThemeButton>
                      </div>
                    </div>
                  </article>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

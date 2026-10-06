"use client";

import React, { useRef, useState, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { toCleanBlogImageUrl } from "@/blogsection/lib/imageUtils";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export interface HeroSlide {
  id: number;
  title: string;
  slug: string;
  featured_image?: string | null;
  short_description?: string | null;
  category_name?: string | null;
  author?: string | null;
  published_at?: string | null;
  views?: number | null;
}

function formatDate(value?: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function BlogCard({ s }: { s: HeroSlide }) {
  const cleanImage = toCleanBlogImageUrl(s.featured_image, s.slug);
  const [imgSrc, setImgSrc] = useState(cleanImage);

  return (
    <Link
      href={`/blog/${s.slug}`}
      className="group relative block w-full h-[350px] sm:h-[350px] lg:h-[380px] rounded-xl mt-[16px] overflow-hidden border border-black/5 bg-[#2A1621] shadow-md hover:shadow-2xl transition-all duration-500 transform-gpu"
    >
      {/* Background Image with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imgSrc}
          alt={s.title}
          onError={() => setImgSrc("/images/banners/retreat-banner.webp")}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Subtle dark gradient toward bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 25%, rgba(20, 12, 15, 0.85) 100%)",
          }}
        />
      </div>

      {/* Inner Editorial Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6 text-left">
        {/* Title */}
        <h3 className="font-display font-bold text-white text-card leading-[1.3] line-clamp-2 drop-shadow-sm group-hover:text-[#FFD9EA] transition-colors">
          {s.title}
        </h3>

        {/* Hover Description: smoothly revealed on cursor hover */}
        {s.short_description && (
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
            <div className="overflow-hidden">
              <p className="pt-2 text-body-sm text-white/85 leading-relaxed line-clamp-3">
                {s.short_description}
              </p>
            </div>
          </div>
        )}

        {/* Hover Interaction: READ ARTICLE ↗ */}
        <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between text-white/90 group-hover:text-white transition-colors">
          <span className="inline-flex items-center gap-1.5 text-label font-bold tracking-wider uppercase text-white group-hover:text-[#FFD9EA] transition-colors">
            Read Article
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1 text-[#FFD9EA]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </span>

          {s.views ? (
            <span className="text-label text-white/70 font-medium flex items-center gap-1">
              <span>👁️</span>
              <span>{s.views} reads</span>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

/** Stable no-op subscribe: this flag only tracks "am I past hydration?". */
const noopSubscribe = () => () => {};

export default function BlogHeroSlider({ slides }: { slides: HeroSlide[] }) {
  const swiperRef = useRef<SwiperType | null>(null);
  // Swiper cannot render on the server, so gate it behind hydration. Using
  // useSyncExternalStore avoids the setState-in-effect cascade.
  const isMounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  const [activeRealIndex, setActiveRealIndex] = useState(0);

  // Every hook must run before any early return below. If a hook sat after
  // `if (!slides.length) return null`, the hook count would change when
  // `slides` went from empty to populated and React would throw.
  // To guarantee an infinite continuous loop (1234 -> 2341 -> 3412 -> 4123 -> ...)
  // Swiper requires sufficient slides in the pool (minimum 8-9) to avoid blank clone gaps.
  const loopedSlides = useMemo(() => {
    if (!slides || slides.length <= 1) return slides ?? [];
    let list = [...slides];
    while (list.length < 9) {
      list = [...list, ...slides];
    }
    return list;
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  // Single card case
  if (slides.length === 1) {
    return (
      <div className="max-w-md mx-auto px-4 pt-1 pb-4">
        <BlogCard s={slides[0]} />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[1320px] mx-auto px-2 sm:px-4 lg:px-6">
      {/* ─── Floating Desktop Navigation Arrows ─── */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
        className="hidden sm:flex absolute -left-3 lg:-left-6 top-[48%] -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-[#EFE3E9] bg-white text-[#2A1621] shadow-md hover:border-[#BF296A] hover:bg-[#BF296A] hover:text-white transition-all duration-300 items-center justify-center cursor-pointer group active:scale-95"
      >
        <svg
          className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
        className="hidden sm:flex absolute -right-3 lg:-right-6 top-[48%] -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-[#EFE3E9] bg-white text-[#2A1621] shadow-md hover:border-[#BF296A] hover:bg-[#BF296A] hover:text-white transition-all duration-300 items-center justify-center cursor-pointer group active:scale-95"
      >
        <svg
          className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* ─── Infinite Swiper Carousel ─── */}
      <div className="popular-blogs-swiper-container">
        {isMounted ? (
          <Swiper
            key={`swiper-infinite-${slides.length}`}
            modules={[Navigation, Autoplay]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveRealIndex(swiper.realIndex % slides.length);
            }}
            loop={true}
            loopAdditionalSlides={3}
            autoplay={{
              delay: 3800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="popular-blogs-swiper !pt-1 !pb-3"
          >
            {loopedSlides.map((s, index) => (
              <SwiperSlide key={`slide-${s.id}-${index}`} className="h-auto">
                <BlogCard s={s} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-1 pb-3">
            {slides.slice(0, 3).map((s) => (
              <BlogCard key={`ssr-${s.id}`} s={s} />
            ))}
          </div>
        )}
      </div>

      {/* ─── Bottom Navigation: Mobile Arrows + Bullets ─── */}
      <div className="flex items-center justify-center gap-3.5 mt-3">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          className="sm:hidden w-9 h-9 rounded-full border border-[#EFE3E9] bg-white text-[#2A1621] shadow-xs hover:border-[#BF296A] hover:bg-[#BF296A] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Dynamic Dots matching exact number of unique popular blogs */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => swiperRef.current?.slideToLoop(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeRealIndex === i
                  ? "w-7 bg-[#BF296A]"
                  : "w-2 bg-[#BF296A]/25 hover:bg-[#BF296A]/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          className="sm:hidden w-9 h-9 rounded-full border border-[#EFE3E9] bg-white text-[#2A1621] shadow-xs hover:border-[#BF296A] hover:bg-[#BF296A] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/data/siteData";

export default function Hero() {
  const scrollToExplore = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full  flex items-center justify-center overflow-hidden bg-[#0f110d]">
      {/* 1. Cinematic Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner-home-img.png"
          alt="Yoga teacher training meditation and spiritual practice overlooking the Ganges in Rishikesh, India"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 brightness-[0.68]"
        />
        {/* Atmospheric Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/68 via-black/45 to-black/85 z-1" />
        {/* Centered radial vignette for extra text contrast */}
        <div
          className="absolute inset-0 z-1"
          style={{
            background:
              "radial-gradient(ellipse 70% 65% at 50% 45%, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0) 80%)",
          }}
        />
      </div>

      {/* 2. Hero Content (Centered, 1060px max-width) */}
      <div className="relative z-10 max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:py-20 lg:py-24 text-center text-white flex flex-col items-center">
        {/* Eyebrow with Sacred Flourishes */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-[#1c3b2b]/40 mb-4 sm:mb-5 shadow-lg max-w-[95%]">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1c3b2b] animate-pulse shrink-0" />
          <span className="font-figtree text-[9px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.24em] text-[#f4efe6] truncate">
            Traditional Yoga Teacher Training • Rishikesh, India
          </span>
        </div>

        {/* Hero Title (SEO h1) */}
        <h1 className="font-belleza text-[28px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-normal tracking-wide text-white leading-[1.15] mb-3 drop-shadow-2xl">
          <span className="text-[#b85c00] font-normal">Siddhant</span> School of
          Yoga
        </h1>

        {/* Ornamental Lotus / Sacred Divider */}
        <div className="my-2 sm:my-3 flex items-center justify-center gap-3 text-[#1c3b2b]/80">
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#FFFFFF]" />
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffffff] fill-current drop-shadow-sm"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C12 2 14.5 7 14.5 10C14.5 11.38 13.38 12.5 12 12.5C10.62 12.5 9.5 11.38 9.5 10C9.5 7 12 2 12 2ZM12 14.5C14.4 14.5 18 16.5 18 19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19C6 16.5 9.6 14.5 12 14.5ZM18.5 11C19.88 11 21 12.12 21 13.5C21 15.5 17 18 17 18C17 18 16.5 15.5 16.5 13.5C16.5 12.12 17.12 11 18.5 11ZM5.5 11C6.88 11 7.5 12.12 7.5 13.5C7.5 15.5 7 18 7 18C7 18 3 15.5 3 13.5C3 12.12 4.12 11 5.5 11Z" />
          </svg>
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#ffffff]" />
        </div>

        {/* Hero Description */}
        <p className="font-figtree text-[13px] sm:text-[15px] md:text-base text-white/90 max-w-2xl mx-auto mb-3 sm:mb-4 font-normal leading-[1.8] tracking-normal drop-shadow-sm">
          Learn directly from Acharya Siddhant in an authentic Himalayan ashram.
        </p>

        {/* Trust Badge Line */}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 mb-6 sm:mb-8 font-figtree text-[11px] sm:text-[13px] font-semibold text-white/85 uppercase tracking-[0.06em]">
          <span>Yoga Alliance RYS 200, 300 &amp; 500</span>
          <span className="text-[#b85c00]">|</span>
          <span>Residential</span>
          <span className="text-[#b85c00]">|</span>
          <span>International Students</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
          <Link
            href="#courses"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#b85c00] hover:bg-[#96490a] text-white font-figtree font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            View Upcoming Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white font-figtree font-semibold text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
            Chat on WhatsApp
          </a>
        </div>

        {/* 3. Hero Trust Bar (Clean 2x2 on mobile, 4-col on desktop) */}
        <div className="w-full max-w-3xl mx-auto bg-black/60 backdrop-blur-xl rounded-2xl sm:rounded-[22px] border border-white/20 p-3 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-2 py-2.5 border-r border-b md:border-b-0 border-white/15">
              <span className="font-belleza text-2xl sm:text-3xl font-medium text-white tracking-tight leading-none">
                5,000<span className="text-[#b85c00] font-light">+</span>
              </span>
              <span className="font-figtree text-[9px] sm:text-[11px] text-white/85 font-medium uppercase tracking-[0.06em] sm:tracking-[0.16em] mt-1.5 text-center">
                Students Trained
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-2 py-2.5 border-b md:border-b-0 md:border-r border-white/15">
              <span className="font-belleza text-2xl sm:text-3xl font-medium text-white tracking-tight leading-none">
                15<span className="text-[#b85c00] font-light">+</span>
              </span>
              <span className="font-figtree text-[9px] sm:text-[11px] text-white/85 font-medium uppercase tracking-[0.06em] sm:tracking-[0.16em] mt-1.5 text-center">
                Years of Lineage
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-2 py-2.5 pt-3 md:pt-2.5 border-r border-white/15">
              <span className="font-belleza text-2xl sm:text-3xl font-medium text-white tracking-tight leading-none">
                60<span className="text-[#b85c00] font-light">+</span>
              </span>
              <span className="font-figtree text-[9px] sm:text-[11px] text-white/85 font-medium uppercase tracking-[0.06em] sm:tracking-[0.16em] mt-1.5 text-center">
                Countries Worldwide
              </span>
            </div>

            {/* Stat 4 */}
            <a
              href="https://www.google.com/search?q=siddhant+school+of+yoga"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center px-1 sm:px-2 py-2.5 pt-3 md:pt-2.5 group/stat transition-opacity cursor-pointer"
              title="View Siddhant School of Yoga 4.9 rating on Google (48 reviews)"
            >
              <span className="font-belleza text-2xl sm:text-3xl font-medium text-white tracking-tight leading-none flex items-center gap-1 group-hover/stat:text-[#1c3b2b] transition-colors">
                4.9<span className="text-[#1c3b2b] text-xl">★</span>
              </span>
              <span className="font-figtree text-[9px] sm:text-[11px] text-white/85 font-medium uppercase tracking-[0.06em] sm:tracking-[0.16em] mt-1.5 group-hover/stat:text-white transition-colors text-center">
                48 Google Reviews
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Scroll Down Indicator */}
      <button
        onClick={scrollToExplore}
        className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors flex flex-col items-center focus:outline-none animate-bounce"
        aria-label="Scroll down to explore"
      >
        <span className="text-[10px] uppercase tracking-widest text-white font-semibold mb-1">
          Explore
        </span>
        <ChevronDown className="w-5 h-5 text-white" />
      </button>
    </section>
  );
}

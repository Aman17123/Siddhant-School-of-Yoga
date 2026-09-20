"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Container } from "../ui";

export default function TrustStrip({ bgClassName = "bg-[#def4ee4d]" }) {
  const trustItems = [
    {
      id: "yoga-alliance",
      badge: "/logo/yoga-alliance.webp",
      alt: "Yoga Alliance USA Official RYS 200, 300, 500 Certified School",
      title: "Yoga Alliance USA",
      highlight: "RYS 200, 300, 500",
      description: "Internationally Accredited",
      hasStars: false,
    },
    {
      id: "google-reviews",
      badge: "/logo/google.svg",
      alt: "Google 4.9 Stars Rating Siddhant School of Yoga",
      title: "4.9 Google Rating",
      highlight: "48+ Verified Reviews",
      description: "100% Student Satisfaction",
      hasStars: true,
      url: "https://www.google.com/search?q=siddhant+school+of+yoga",
    },
    {
      id: "tripadvisor",
      badge: "/logo/tripadvisor.svg",
      alt: "TripAdvisor Recommended School in Rishikesh",
      title: "TripAdvisor Excellence",
      highlight: "Top Rated in Rishikesh",
      description: "Authentic Ashram Living",
      hasStars: false,
      url: "https://www.google.com/search?q=siddhant+school+of+yoga+tripadvisor",
    },
    {
      id: "support",
      badge: "/logo/certificate-rys-200.webp",
      alt: "100-Day Daily Sadhana Support Post-Graduation",
      title: "100-Day Support",
      highlight: "Daily Practice Schedule",
      description: "Lifelong Master Mentorship",
      hasStars: false,
    },
  ];

  // Mobile Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trustItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trustItems.length) % trustItems.length);
  };

  // Auto-slide on mobile every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trustItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [trustItems.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className={`${bgClassName} py-4 sm:py-6 lg:py-8 border-b border-[#c8ece2] relative z-20 font-figtree`}>
      <Container>
        {/* ========================================================= */}
        {/* 1. PC & TABLET VIEW: Perfectly Aligned 4-Pillar Grid (md & lg) */}
        {/* ========================================================= */}
        <div className="hidden md:block bg-white rounded-2xl lg:rounded-3xl border border-[#c8ece2] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 lg:p-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#c8ece2]">
            {trustItems.map((item) => {
              const Content = (
                <div className="flex items-center gap-3.5 px-4 lg:px-5 py-2 group cursor-pointer transition-all duration-200">
                  {/* Badge Frame: Fixed 48x48 on md, 52x52 on lg */}
                  <div className="w-12 h-12 lg:w-13 lg:h-13 rounded-2xl bg-[#def4ee4d] border border-[#c8ece2] group-hover:border-[#158b72] group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0 p-2 shadow-2xs">
                    <Image
                      src={item.badge}
                      alt={item.alt}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Text Column: Exactly calibrated heights for pixel-perfect baseline alignment */}
                  <div className="flex flex-col justify-center min-w-0 flex-grow">
                    {/* Line 1: Title */}
                    <div className="h-5 flex items-center gap-1.5 overflow-hidden">
                      <span className="font-belleza text-[15px] lg:text-base text-[#1e2422] group-hover:text-[#158b72] transition-colors truncate leading-none">
                        {item.title}
                      </span>
                      {item.url && (
                        <ExternalLink className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      )}
                    </div>

                    {/* Line 2: Highlight (Stars or Text) */}
                    <div className="h-5 flex items-center gap-1 overflow-hidden my-0.5">
                      {item.hasStars ? (
                        <>
                          <div className="flex items-center gap-0.5 text-[#158b72] shrink-0">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-[#158b72] text-[#158b72]"
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-[#1e2422] leading-none truncate">
                            {item.highlight}
                          </span>
                        </>
                      ) : (
                        <span className="text-[11px] font-bold text-[#158b72] tracking-wide leading-none truncate">
                          {item.highlight}
                        </span>
                      )}
                    </div>

                    {/* Line 3: Short Description */}
                    <div className="h-4 flex items-center overflow-hidden">
                      <span className="text-[11px] text-stone-500 font-normal leading-none truncate">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </div>
              );

              if (item.url) {
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none"
                    title={`View ${item.title}`}
                  >
                    {Content}
                  </a>
                );
              }

              return <div key={item.id}>{Content}</div>;
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MOBILE VIEW: 1-at-a-time Carousel (< md screen)        */}
        {/* ========================================================= */}
        <div className="block md:hidden">
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative bg-white rounded-2xl border border-[#c8ece2] shadow-xs p-4 overflow-hidden"
          >
            {/* Active Trust Card (Centered) */}
            {(() => {
              const active = trustItems[currentIndex];
              const cardContent = (
                <div className="flex items-center justify-center gap-3.5 text-left px-6 py-1">
                  {/* Badge */}
                  <div className="w-13 h-13 rounded-2xl bg-[#def4ee4d] border border-[#158b72]/40 flex items-center justify-center shrink-0 p-2 shadow-2xs">
                    <Image
                      src={active.badge}
                      alt={active.alt}
                      width={42}
                      height={42}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-belleza text-base text-[#1e2422] font-medium leading-tight">
                        {active.title}
                      </span>
                      {active.url && (
                        <ExternalLink className="w-3 h-3 text-[#158b72]" />
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 my-1">
                      {active.hasStars ? (
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-0.5 text-[#158b72]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-[#158b72] text-[#158b72]"
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-[#1e2422]">
                            {active.highlight}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-[#158b72] tracking-wide">
                          {active.highlight}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-stone-500 font-normal leading-tight">
                      {active.description}
                    </span>
                  </div>
                </div>
              );

              if (active.url) {
                return (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none"
                    title={`View ${active.title}`}
                  >
                    {cardContent}
                  </a>
                );
              }
              return cardContent;
            })()}

            {/* Carousel Navigation Arrows */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous credential"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-[#c8ece2] flex items-center justify-center text-stone-600 shadow-xs hover:text-[#158b72] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next credential"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-[#c8ece2] flex items-center justify-center text-stone-600 shadow-xs hover:text-[#158b72] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-3 pt-2 border-t border-[#c8ece2]/50">
              {trustItems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to credential ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === i
                      ? "w-5 h-1.5 bg-[#158b72]"
                      : "w-1.5 h-1.5 bg-stone-300 hover:bg-[#158b72]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

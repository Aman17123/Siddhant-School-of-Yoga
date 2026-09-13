'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Container } from './ui';
import { testimonials as defaultTestimonials } from '@/data/siteData';

// Extended reviews array with authentic student feedback matching Reference Image 1
export const reviewsData = [
  {
    id: 1,
    name: "Louise Jorgensen",
    initial: "L",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    source: "Google Reviews",
    text: "I came here with no expectations and not much experience, now I'm leaving, in this month I've really improved my own postures. Learned much more about yoga, the lifestyle and how to be a teacher. Great academy, need to recommend to anyone looking for genuine yoga.",
  },
  {
    id: 2,
    name: "Himani Lingwal",
    initial: "H",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    source: "Google Reviews",
    text: "Amazing experience with teacher. I love the style and the teaching of all the teachers very much. The food was delicious #satvik. The location of the school is amidst the peaceful hills. I would recommend to all of you that you come and experience this sacred journey.",
  },
  {
    id: 3,
    name: "Ansiya Ibrahim",
    initial: "A",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    source: "Google Reviews",
    text: "My experience at Siddhant School of Yoga was truly transformative. The teachers were incredibly supportive, knowledgeable, and genuine in the way they guided us through both the physical and spiritual aspects of authentic yoga teacher training.",
  },
  {
    id: 4,
    name: "Marcus Aurelius Lindqvist",
    initial: "M",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    source: "Google Reviews",
    text: "It is impossible to overrate the experience I had in the Yoga Teacher Training with Acharya Siddhant and his crew of competent teachers. I didn't know there is a place on earth where all my spiritual questions could be answered so clearly and practically.",
  },
  {
    id: 5,
    name: "Camille Dupont",
    initial: "C",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    source: "Google Reviews",
    text: "The ashram vibe is peaceful and authentic, the sattvic food is cooked with pure love, and the signature Pranayama and Kundalini practices awakened something profound in me. Forever grateful for the personalized 100-day schedule.",
  },
  {
    id: 6,
    name: "David Chen",
    initial: "D",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    source: "Google Reviews",
    text: "Waking up to morning chants by the holy Ganges, practicing authentic Pranayama, and learning directly from Acharya Siddhant restored my vitality. The measurable parameters and warm ashram community made this an unforgettable life milestone.",
  },
];

export default function Testimonials({ reviews = reviewsData }) {
  // Carousel index tracking (window of 3 cards on desktop)
  const [startIndex, setStartIndex] = useState(0);
  const totalReviews = reviews.length;
  // Maximum index so 3 cards are always displayed if possible
  const maxIndex = Math.max(0, totalReviews - 3);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // 3 currently visible reviews
  const visibleReviews = reviews.slice(startIndex, startIndex + 3);

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white border-b border-[#EBE5D8]/60 overflow-hidden relative">
      <Container>
        
        {/* Top Row: Section Heading on Left | Google Rating Badge on Right (Exact Match to Reference 1) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          
          {/* Left: Eyebrow + 2-Line Serif Heading */}
          <div className="max-w-2xl">
            <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-terracotta block mb-2 font-jakarta">
              Reviews &amp; Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1F1E1D] leading-tight tracking-tight">
              Student Feedback About<br className="hidden sm:inline" /> Siddhant School of Yoga
            </h2>
          </div>

          {/* Right: Google Rating Card with Overlapping Avatars + 200+ Pill */}
          <div className="shrink-0">
            <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl sm:rounded-full bg-white border border-[#EBE5D8] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              
              {/* Google G Official Vector Logo */}
              <div className="shrink-0 flex items-center justify-center w-8 h-8">
                <Image
                  src="/logo/google.svg"
                  alt="Google"
                  width={30}
                  height={30}
                  className="w-7 h-7 object-contain"
                />
              </div>

              {/* Rating Numbers & Stars */}
              <div className="flex flex-col">
                <span className="text-[10.5px] uppercase tracking-wider text-[#77786e] font-semibold leading-none mb-1">
                  google rating
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-[#1F1E1D] leading-none font-jakarta">
                    4.8
                  </span>
                  <div className="flex text-marigold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-marigold text-marigold" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Vertical Divider Line */}
              <div className="h-8 w-[1px] bg-[#EBE5D8]" aria-hidden="true" />

              {/* Stack of Overlapping Reviewer Avatars with 200+ Pill */}
              <div className="flex items-center pl-1">
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-xs -ml-0 z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Student review avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-xs -ml-2.5 z-20">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                    alt="Student review avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-xs -ml-2.5 z-30">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Student review avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-8 px-2.5 rounded-full bg-[#FAF6EE] border border-[#EBE5D8] flex items-center justify-center text-[11px] font-bold text-terracotta shadow-xs -ml-2.5 z-40">
                  200+
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Testimonial Cards Carousel Row with Centered Outer Arrows (Exact Match to Reference 1) */}
        <div className="relative px-0 sm:px-6">
          
          {/* Circular Navigation Arrow: Left */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-10 h-10 rounded-full bg-white border border-[#EBE5D8] shadow-md hover:shadow-lg flex items-center justify-center text-[#55564c] hover:text-terracotta hover:border-terracotta transition-all z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Grid: 3 visible at a time on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EBE5D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Avatar + Reviewer Name (in accent color) + Small Google G on right */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {card.avatar ? (
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#EBE5D8] shrink-0 bg-[#faf6ee]">
                          <Image
                            src={card.avatar}
                            alt={card.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-base shrink-0">
                          {card.initial}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-terracotta leading-snug font-jakarta">
                          {card.name}
                        </h4>
                      </div>
                    </div>

                    {/* Small Google G Icon */}
                    <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                      <Image
                        src="/logo/google.svg"
                        alt="Google"
                        width={18}
                        height={18}
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                  </div>

                  {/* 5 Filled Gold/Marigold Stars */}
                  <div className="flex text-marigold mb-3">
                    {[...Array(card.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-marigold text-marigold" />
                    ))}
                  </div>

                  {/* Testimonial Text with Quote Mark */}
                  <div className="relative">
                    <span className="text-marigold/70 font-serif text-2xl sm:text-3xl leading-none inline-block align-top mr-1">
                      &ldquo;
                    </span>
                    <p className="text-xs sm:text-sm text-[#44453c] leading-relaxed italic line-clamp-4 inline">
                      {card.text} ...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Circular Navigation Arrow: Right */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-10 h-10 rounded-full bg-white border border-[#EBE5D8] shadow-md hover:shadow-lg flex items-center justify-center text-[#55564c] hover:text-terracotta hover:border-terracotta transition-all z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Carousel Dot Indicators (Active dot elongated/pill-shaped, inactive dots circles) */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {[...Array(maxIndex + 1)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStartIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 ${
                startIndex === i
                  ? 'w-7 h-2 rounded-full bg-terracotta'
                  : 'w-2 h-2 rounded-full bg-[#dce8e5] hover:bg-marigold'
              }`}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}

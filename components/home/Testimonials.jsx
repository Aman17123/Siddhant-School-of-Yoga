"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, ArrowUpRight } from "lucide-react";
import { Container, Kicker, HeadingDivider } from "../ui";

// Authentic student reviews from Google Business Profile & TripAdvisor for Siddhant School of Yoga, Rishikesh
export const reviewsData = [
  {
    id: 1,
    name: "Felix",
    country: "Germany",
    course: "200-Hour Yoga Teacher Training",
    rating: 5,
    source: "Google Reviews",
    isGoogle: true,
    highlight: "Impossible to overrate this training",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    text: "It is impossible to overrate the experience I had in the 200 hrs Yoga Teacher Training with Siddhant and his crew of competent teachers. I didn't know there is a place on earth where all my questions could be answered understandably without any doubt. Siddhant is using 100% of his energy to make everything as clear as possible. After 24 days, I felt a lot stronger and capable of things I didn't think I could do in this lifetime. The food, accommodation, and excursions were excellent.",
  },
  {
    id: 2,
    name: "Lili",
    country: "France",
    course: "Yoga & Meditation Immersion",
    rating: 5,
    source: "Google Reviews",
    isGoogle: true,
    highlight: "Learning to live in a different way",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    text: "I came here not because of a choice of departure, but rather because of some impression that I had to do it! Thanks to this school, I feel energized every morning and so grateful. It's learning to live in a different way, your way, depending on your decision! Everyone is so nice that it feels like home, everyone taking care of you. The general atmosphere is full of wonderful gratitude. Thank you very much Siddhant School! I miss you!",
  },
  {
    id: 3,
    name: "Camille Dupont",
    country: "France",
    course: "200-Hour Yoga TTC",
    rating: 5,
    source: "Google Reviews",
    isGoogle: true,
    highlight: "I have an Indian family in Rishikesh",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    text: "I stumbled across Siddhant School of Yoga while I was one second from booking another yoga school in Rishikesh, and I have zero regrets about it! This yoga school exceeded all my expectations. I felt at home since the first day, the staff was very welcoming and helpful during all my stay. They all are truly passionate about teaching yoga and you sense it immediately!",
  },
  {
    id: 4,
    name: "Roberto",
    country: "Italy",
    course: "Multi-Style Yoga TTC",
    rating: 5,
    source: "TripAdvisor",
    isTripAdvisor: true,
    highlight: "The Universe gave me the greatest gift",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    text: "Even if this school is not much advertised, in between hundreds of schools something called me here. And I definitely can say that the Universe made me one of the greatest gifts! Here you can find so much love, passion, knowledge, comprehension, and smiles. Classes are small, not over a dozen people. A full immersion from Pranayama to Asana, philosophy, mantra chanting, anatomy, and meditation. Gratitude is now one of the most popular words in my daily life.",
  },
  {
    id: 5,
    name: "Sarah M.",
    country: "Canada",
    course: "Yoga Teacher Training & Retreat",
    rating: 5,
    source: "Google Reviews",
    isGoogle: true,
    highlight: "Gratitude is the Attitude — Hari Om",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    text: "Absolutely Incredible! Siddhant and his team managed to exceed my expectations. They did everything to make sure I had what I needed and more. The entire team at this school are very intelligent and experienced. Siddhant is a great teacher who has a big heart and is always willing to help you. I have truly cherished my time here, from all the excursions to the wonderful yogic food. It was a lifetime experience.",
  },
  {
    id: 6,
    name: "Himani Lingwal",
    country: "India",
    course: "Yoga Teacher Training",
    rating: 5,
    source: "Google Reviews",
    isGoogle: true,
    highlight: "Peaceful foothills & delicious sattvic food",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
    text: "Amazing experience with teachers. I love the style and the teaching of all the masters very much. The sattvic food was delicious and nourishing. The location of the school is amidst the peaceful foothills near Veerbhadra temple in Rishikesh. Highly recommended to anyone seeking authentic knowledge.",
  },
  {
    id: 7,
    name: "Paul",
    country: "United Kingdom",
    course: "200-Hour Yoga TTC",
    rating: 5,
    source: "Google Reviews",
    isGoogle: true,
    highlight: "Much more than just a certificate",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80",
    text: "Siddhant School of Yoga is not just a place of learning where you walk away with a certificate and knowledge of how to teach. It is so soo much more. Siddhant and everyone involved with the school instills in you the importance of gratitude, practice and experience and leads by their example. My life is changing every day to match the intentions I set during the course!",
  },
  {
    id: 8,
    name: "Anna",
    country: "Austria",
    course: "Yoga & Pranayama Immersion",
    rating: 5,
    source: "TripAdvisor",
    isTripAdvisor: true,
    highlight: "A true School of Life",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    text: "I had an amazing time at Siddhant School of Yoga. The teachers were of the highest level, the way the program is built is very professional, the location was just amazing. Every small detail was thought of with love. It is not just a Yoga teacher's training, it is a School of Life, and how to create a better future.",
  },
];

const GOOGLE_SEARCH_URL =
  "https://www.google.com/search?q=siddhant+school+of+yoga";

export default function Testimonials({ reviews = reviewsData }) {
  const [filter, setFilter] = useState("all");
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredReviews = reviews.filter((r) => {
    if (filter === "google") return r.isGoogle;
    if (filter === "tripadvisor") return r.isTripAdvisor;
    return true;
  });

  const totalReviews = filteredReviews.length;
  const maxIndex = Math.max(0, totalReviews - itemsPerPage);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) handleNext();
    else if (distance < -40) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const visibleReviews = filteredReviews.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <section
      id="testimonials"
      className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/60 overflow-hidden relative font-figtree"
    >
      <Container>
        {/* Top Row: Section Heading & Google / TripAdvisor Verification Badges */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-5 mb-8 lg:mb-10 text-center lg:text-left">
          {/* Left: Heading */}
          <div className="max-w-2xl mx-auto lg:mx-0">
            <Kicker>Testimonials</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
              Words from Our Global Graduates
            </h2>
            <HeadingDivider center={false} />
          </div>

          {/* Right: Live Google & TripAdvisor Rating Cards (Both visible and centered on phone) */}
          <div className="shrink-0 flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
            <a
              href={GOOGLE_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white border border-[#c8ece2] hover:border-[#158b72]/40 shadow-xs hover:shadow-md transition-all duration-300"
              title="View all 48 reviews on Google for Siddhant School of Yoga"
            >
              {/* Google Official Vector Logo */}
              <div className="shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#def4ee4d] p-1 border border-stone-200">
                <Image
                  src="/logo/google.svg"
                  alt="Google"
                  width={22}
                  height={22}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Rating Numbers & Stars */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-base sm:text-lg font-extrabold text-[#1F1E1D] leading-none font-figtree">
                    4.9
                  </span>
                  <div className="flex text-[#158b72]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-[#158b72] text-[#158b72]"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] text-stone-600 font-semibold font-figtree mt-0.5">
                  <span>48 Google reviews</span>
                  <ArrowUpRight className="w-3 h-3 text-[#158b72] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>

            {/* TripAdvisor Badge (Visible on both phone and desktop) */}
            <a
              href="https://www.google.com/search?q=siddhant+school+of+yoga+tripadvisor"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white border border-[#c8ece2] hover:border-[#158b72]/40 shadow-xs hover:shadow-md transition-all duration-300"
              title="View TripAdvisor ratings for Siddhant School of Yoga"
            >
              <div className="shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#def4ee4d] p-1 border border-[#158b72]/30">
                <Image
                  src="/logo/tripadvisor.svg"
                  alt="TripAdvisor"
                  width={22}
                  height={22}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9.5px] sm:text-[10px] uppercase tracking-wider text-[#0f6b57] font-bold leading-none mb-0.5 font-figtree">
                  TripAdvisor
                </span>
                <span className="text-[10.5px] sm:text-[11px] font-semibold text-stone-700 font-figtree">
                  5.0★ Recommended
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Source Filter Tabs (Centered on mobile) */}
        <div className="flex items-center justify-center lg:justify-start gap-2 mb-5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setStartIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-figtree transition-all ${
              filter === "all"
                ? "bg-[#158b72] text-white shadow-xs"
                : "bg-stone-100 hover:bg-stone-200 text-stone-700"
            }`}
          >
            All Student Reviews ({reviews.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter("google");
              setStartIndex(0);
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-figtree transition-all ${
              filter === "google"
                ? "bg-[#158b72] text-white shadow-xs"
                : "bg-stone-100 hover:bg-stone-200 text-stone-700"
            }`}
          >
            <Image
              src="/logo/google.svg"
              alt="Google"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain"
            />
            <span>Google Reviews (4.9★)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter("tripadvisor");
              setStartIndex(0);
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-figtree transition-all ${
              filter === "tripadvisor"
                ? "bg-[#158b72] text-white shadow-xs"
                : "bg-stone-100 hover:bg-stone-200 text-stone-700"
            }`}
          >
            <Image
              src="/logo/tripadvisor.svg"
              alt="TripAdvisor"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain"
            />
            <span>TripAdvisor Experiences</span>
          </button>
        </div>

        {/* Testimonial Cards Carousel Row */}
        <div className="relative px-0 sm:px-5">
          {/* Circular Navigation Arrow: Left */}
          {totalReviews > itemsPerPage && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonials"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-4 w-9 h-9 rounded-full bg-white border border-[#c8ece2] shadow-md hover:shadow-lg flex items-center justify-center text-[#55564c] hover:text-[#158b72] hover:border-[#158b72] transition-all z-20 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Cards Grid: 1 visible on mobile, 2 on tablet, 3 on desktop */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 select-none"
          >
            {visibleReviews.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#c8ece2] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between max-w-lg mx-auto w-full"
              >
                <div>
                  {/* Top Row: Avatar + Reviewer Name + Course + Source Icon */}
                  <div className="flex items-center justify-between gap-2.5 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#158b72]/30 shrink-0 bg-[#def4ee4d]">
                        <Image
                          src={card.avatar}
                          alt={card.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-[#1F1E1D] leading-tight font-belleza">
                          {card.name}
                        </h4>
                        <span className="text-[11px] text-[#158b72] font-medium block font-figtree">
                          {card.course} • {card.country}
                        </span>
                      </div>
                    </div>

                    {/* Source Icon badge */}
                    <div className="shrink-0 flex items-center justify-center bg-[#def4ee4d] rounded-full p-1 border border-[#c8ece2]">
                      {card.isTripAdvisor ? (
                        <Image
                          src="/logo/tripadvisor.svg"
                          alt="TripAdvisor"
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                        />
                      ) : (
                        <Image
                          src="/logo/google.svg"
                          alt="Google"
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                        />
                      )}
                    </div>
                  </div>

                  {/* 5 Filled Gold Stars */}
                  <div className="flex items-center gap-1 text-[#158b72] mb-2">
                    {[...Array(card.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 fill-[#158b72] text-[#158b72]"
                      />
                    ))}
                    <span className="text-[11px] font-semibold text-stone-500 ml-1 font-figtree">
                      5.0
                    </span>
                  </div>

                  {/* Testimonial Text */}
                  <div className="relative">
                    <Quote className="w-4 h-4 text-[#158b72]/20 mb-1" />
                    <p className="text-sm sm:text-[15px] text-[#44453c] font-figtree leading-relaxed italic h-[122px] overflow-y-auto pr-1.5 scrollbar-thin">
                      &ldquo;{card.text}&rdquo;
                    </p>
                    <div className="pointer-events-none absolute bottom-0 left-0 right-1.5 h-6 bg-gradient-to-t from-white to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Circular Navigation Arrow: Right */}
          {totalReviews > itemsPerPage && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonials"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-4 w-9 h-9 rounded-full bg-white border border-[#c8ece2] shadow-md hover:shadow-lg flex items-center justify-center text-[#55564c] hover:text-[#158b72] hover:border-[#158b72] transition-all z-20 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Carousel Dot Indicators */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStartIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 ${
                  startIndex === i
                    ? "w-6 h-2 rounded-full bg-[#158b72]"
                    : "w-2 h-2 rounded-full bg-[#c8ece2] hover:bg-[#158b72]"
                }`}
              />
            ))}
          </div>
        )}

        {/* Bottom Verification Banner & Link to Google Reviews */}
        <div className="mt-6 pt-4 border-t border-[#c8ece2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-600 font-figtree text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#158b72] animate-pulse" />
            <span>
              All reviews verified from official Google Business Profile &amp; TripAdvisor students of Siddhant School of Yoga, Rishikesh.
            </span>
          </div>

          <a
            href={GOOGLE_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#def4ee4d] hover:bg-[#158b72] text-stone-800 hover:text-white border border-[#c8ece2] hover:border-[#158b72] text-xs font-bold font-figtree transition-all duration-200 shadow-2xs shrink-0"
          >
            <Image
              src="/logo/google.svg"
              alt="Google"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain"
            />
            <span>View All 48 Google Reviews</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </Container>
    </section>
  );
}

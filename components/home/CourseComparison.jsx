"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Container, SectionHeading } from "../ui";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowRight,
  Sparkles,
  Flame,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { whatsappLink } from "@/data/siteData";

export default function CourseComparison() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const courses = [
    // Multi-Style Yoga Teacher Training Courses
    {
      id: "100-ttc",
      name: "100-Hour Yoga TTC",
      category: "multi-style",
      categoryLabel: "Multi-Style YTTC",
      badge: "Foundational",
      duration: "14 Days",
      hours: "100 Hours",
      cert: "Yoga Alliance YACEP / Part 1",
      suitability: "Beginners & Short-stay seekers",
      price: "$300 – $600",
      pricing: { triple: "$300", shared: "$500", private: "$600" },
      features: [
        "Classical Hatha & Ashtanga asana alignment",
        "World-first Pranayama & breathwork science",
        "Shatkarma cleansing & yogic anatomy",
        "Ashram living & 3 sattvic meals daily",
      ],
      slug: "/100-hour-yoga-ttc-rishikesh",
      cta: "Enquire 100h",
      popular: false,
    },
    {
      id: "200-ttc",
      name: "200-Hour Yoga TTC",
      category: "multi-style",
      categoryLabel: "Multi-Style YTTC",
      badge: "Flagship / Most Popular",
      duration: "24–28 Days",
      hours: "200 Hours",
      cert: "Yoga Alliance USA RYT 200",
      suitability: "Beginners to Aspiring Teachers",
      price: "$799 – $999",
      pricing: { triple: "$799", shared: "$899", private: "$999" },
      features: [
        "Complete Hatha & Ashtanga Primary Series",
        "Acharya Siddhant's signature Pranayama curriculum",
        "Yoga anatomy, biomechanics & hands-on adjustments",
        "Patanjali Sutras, Gita philosophy & sequencing",
        "Lifelong 100-day post-course daily sadhana plan",
      ],
      slug: "/200-hour-yoga-ttc-rishikesh",
      cta: "Join Flagship 200h",
      popular: true,
    },
    {
      id: "300-ttc",
      name: "300-Hour Advanced TTC",
      category: "multi-style",
      categoryLabel: "Multi-Style YTTC",
      badge: "Advanced Mastery",
      duration: "28 Days",
      hours: "300 Hours",
      cert: "Yoga Alliance USA RYT 300 / 500",
      suitability: "Graduates of 200-Hour TTC",
      price: "$1,599 – $1,999",
      pricing: { triple: "$1,599", shared: "$1,799", private: "$1,999" },
      features: [
        "Advanced posture breakdowns, variations & bandhas",
        "Advanced Kumbhaka retention & Nadi Shodhana",
        "Ayurveda integration & therapeutic yoga practices",
        "Sound healing, Kundalini kriyas & higher adjustments",
      ],
      slug: "/300-hour-yoga-ttc-rishikesh",
      cta: "Apply for 300h",
      popular: false,
    },
    {
      id: "500-ttc",
      name: "500-Hour Master TTC",
      category: "multi-style",
      categoryLabel: "Multi-Style YTTC",
      badge: "Master Immersion",
      duration: "56 Days",
      hours: "500 Hours",
      cert: "Yoga Alliance USA RYT 500",
      suitability: "Total Transformation & Masters",
      price: "$1,699 – $2,299",
      pricing: { triple: "$1,699", shared: "$1,999", private: "$2,299" },
      features: [
        "Dual master curriculum: Combined 200h + 300h immersion",
        "Deep personal mentorship under Acharya Siddhant",
        "Mastery of Classical Hatha, Ashtanga & Kundalini",
        "Highest tier international certification worldwide",
      ],
      slug: "/500-hour-yoga-ttc-rishikesh",
      cta: "Join 500h Master",
      popular: false,
    },

    // Kundalini Yoga Teacher Training Courses
    {
      id: "100-kundalini",
      name: "100-Hour Kundalini TTC",
      category: "kundalini",
      categoryLabel: "Kundalini Yoga",
      badge: "Chakra Foundation",
      duration: "14 Days",
      hours: "100 Hours",
      cert: "Yoga Alliance YACEP / Part 1",
      suitability: "Beginner Energy & Chakra Seekers",
      price: "$499 – $699",
      pricing: { triple: "$499", shared: "$599", private: "$699" },
      features: [
        "Awakening of Mooladhara to Sahasrara chakras",
        "Traditional Kundalini kriyas & pranayama locks",
        "Daily meditation & subtle energy body science",
        "Ashram stay with 3 sattvic Ayurvedic meals daily",
      ],
      slug: "/100-hour-kundalini-yoga-ttc",
      cta: "Enquire Kundalini 100h",
      popular: false,
    },
    {
      id: "200-kundalini",
      name: "200-Hour Kundalini TTC",
      category: "kundalini",
      categoryLabel: "Kundalini Yoga",
      badge: "Kundalini Flagship",
      duration: "24–28 Days",
      hours: "200 Hours",
      cert: "Yoga Alliance USA RYT 200",
      suitability: "All Levels to Aspiring Kundalini Masters",
      price: "$899 – $1,199",
      pricing: { triple: "$899", shared: "$999", private: "$1,199" },
      features: [
        "Globally recognized Yoga Alliance RYT 200 credential",
        "In-depth Nadi Shodhana, Bandhas, Mudras & Kriyas",
        "Tantric meditation & sacred fire havan sadhana",
        "100-day post-course Kundalini sadhana roadmap",
      ],
      slug: "/200-hour-kundalini-yoga-ttc",
      cta: "Join Kundalini 200h",
      popular: true,
    },
    {
      id: "300-kundalini",
      name: "300-Hour Kundalini TTC",
      category: "kundalini",
      categoryLabel: "Kundalini Yoga",
      badge: "Advanced Tantra",
      duration: "28 Days",
      hours: "300 Hours",
      cert: "Yoga Alliance USA RYT 300 / 500",
      suitability: "Kundalini RYT 200 Certified Teachers",
      price: "$1,699 – $2,099",
      pricing: { triple: "$1,699", shared: "$1,899", private: "$2,099" },
      features: [
        "Advanced Kundalini kriyas & chakra resonance",
        "Nada yoga, sound healing & mantra frequency",
        "Therapeutic energetic healing & subtle alignments",
        "Esoteric Tantra philosophy & higher sadhana",
      ],
      slug: "/300-hour-kundalini-yoga-ttc",
      cta: "Apply Kundalini 300h",
      popular: false,
    },
    {
      id: "500-kundalini",
      name: "500-Hour Kundalini TTC",
      category: "kundalini",
      categoryLabel: "Kundalini Yoga",
      badge: "Tantra Master Track",
      duration: "56 Days",
      hours: "500 Hours",
      cert: "Yoga Alliance USA RYT 500",
      suitability: "Comprehensive Tantra & Master Aspirants",
      price: "$1,899 – $2,499",
      pricing: { triple: "$1,899", shared: "$2,199", private: "$2,499" },
      features: [
        "Mastery of Classical Kundalini, Tantra & Laya Yoga",
        "Direct personal mentorship under Acharya Siddhant",
        "Comprehensive Vedic philosophy & esoteric anatomy",
        "Highest tier Yoga Alliance RYT 500 credential",
      ],
      slug: "/500-hour-kundalini-yoga-ttc",
      cta: "Join Kundalini 500h",
      popular: false,
    },
  ];

  const filteredCourses =
    activeCategory === "all"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  const checkScrollState = useCallback(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);

    const cards = container.children;
    if (cards && cards.length > 1) {
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      if (step > 0) {
        const index = Math.round(scrollLeft / step);
        setActiveIndex(Math.min(Math.max(index, 0), filteredCourses.length - 1));
      }
    } else {
      setActiveIndex(0);
    }
  }, [filteredCourses.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);
    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Scroll smoothly by exactly 1 card at a time
  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.children;
    if (!cards || cards.length === 0) return;

    let singleCardStep = 320;
    if (cards.length > 1) {
      singleCardStep = cards[1].offsetLeft - cards[0].offsetLeft;
    } else if (cards.length === 1) {
      singleCardStep = cards[0].getBoundingClientRect().width + 16;
    }

    container.scrollBy({
      left: direction === "left" ? -singleCardStep : singleCardStep,
      behavior: "smooth",
    });
  };

  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.children;
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
      id="comparison"
      className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#EBE5D8]/60 overflow-hidden relative font-figtree"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 lg:mb-10 items-center lg:items-end text-center lg:text-left">
          <SectionHeading
            title="Compare All TTC & Kundalini Yoga Programs"
            text="Explore our complete roster of residential Yoga Alliance certified teacher training courses in Rishikesh. Compare curriculum hours, certifications, accommodation fees, and syllabus details side by side."
            className="mb-0"
          />

          {/* Carousel Controls (Prev / Next Arrows + Count Badge) */}
          <div className="flex items-center justify-center lg:justify-end gap-3 shrink-0 self-center lg:self-end">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6EE] border border-[#EBE5D8] text-xs font-semibold text-stone-700">
              <span className="w-2 h-2 rounded-full bg-[#f22924] animate-pulse" />
              <span>
                {filteredCourses.length} Courses in Carousel
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous courses"
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  canScrollLeft
                    ? "bg-white border-[#EBE5D8] text-[#1e2422] hover:bg-[#f22924] hover:text-white hover:border-[#f22924] shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                    : "bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next courses"
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  canScrollRight
                    ? "bg-white border-[#EBE5D8] text-[#1e2422] hover:bg-[#f22924] hover:text-white hover:border-[#f22924] shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                    : "bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className={`cursor-pointer px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
              activeCategory === "all"
                ? "bg-[#f22924] text-white shadow-xs scale-100"
                : "bg-[#FAF6EE] text-stone-700 hover:bg-[#FAF6EE]/80 border border-[#EBE5D8]"
            }`}
          >
            <span>All Programs</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeCategory === "all"
                  ? "bg-white/20 text-white"
                  : "bg-stone-200/80 text-stone-600"
              }`}
            >
              8
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleCategoryChange("multi-style")}
            className={`cursor-pointer px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
              activeCategory === "multi-style"
                ? "bg-[#f22924] text-white shadow-xs"
                : "bg-[#FAF6EE] text-stone-700 hover:bg-[#FAF6EE]/80 border border-[#EBE5D8]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f5b860]" />
            <span>Multi-Style YTTC</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeCategory === "multi-style"
                  ? "bg-white/20 text-white"
                  : "bg-stone-200/80 text-stone-600"
              }`}
            >
              4
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleCategoryChange("kundalini")}
            className={`cursor-pointer px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
              activeCategory === "kundalini"
                ? "bg-[#f22924] text-white shadow-xs"
                : "bg-[#FAF6EE] text-stone-700 hover:bg-[#FAF6EE]/80 border border-[#EBE5D8]"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#f22924]" />
            <span>Kundalini Yoga TTC</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeCategory === "kundalini"
                  ? "bg-white/20 text-white"
                  : "bg-stone-200/80 text-stone-600"
              }`}
            >
              4
            </span>
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-4 sm:gap-5 lg:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-5 pt-2 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredCourses.map((c) => (
              <div
                key={c.id}
                className={`w-[86vw] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-48px)/4)] shrink-0 snap-start rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between border transition-all duration-300 hover:shadow-xl bg-white ${
                  c.popular
                    ? "border-[#f22924] ring-2 ring-[#f22924]/20 bg-[#FAF6EE]/40 shadow-md -translate-y-1"
                    : "border-[#EBE5D8] hover:-translate-y-0.5"
                }`}
              >
                <div>
                  {/* Top Badges (Category & Popularity) */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[10.5px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full bg-[#FAF6EE] text-stone-700 border border-[#f5b860]/40">
                      {c.category === "kundalini" ? (
                        <Flame className="w-3 h-3 text-[#f22924]" />
                      ) : (
                        <Sparkles className="w-3 h-3 text-[#f5b860]" />
                      )}
                      <span>{c.categoryLabel}</span>
                    </span>

                    <span
                      className={`text-[9.5px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        c.popular
                          ? "bg-[#f22924] text-white shadow-xs"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {c.badge}
                    </span>
                  </div>

                  {/* Course Title & Target */}
                  <h3 className="text-lg lg:text-xl font-belleza font-normal text-[#1e2422] mb-0.5 tracking-wide leading-tight">
                    {c.name}
                  </h3>
                  <span className="text-[11px] text-[#d45d44] font-medium block mb-3 line-clamp-1">
                    {c.suitability}
                  </span>

                  {/* Specs Box */}
                  <div className="space-y-1.5 py-2 border-y border-[#EBE5D8] text-[11px] sm:text-xs text-stone-700 mb-3 bg-stone-50/50 rounded-lg px-2 sm:px-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-normal">Duration:</span>
                      <span className="font-semibold text-[#1e2422]">
                        {c.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-normal">Total Hours:</span>
                      <span className="font-semibold text-[#1e2422]">
                        {c.hours}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-normal">Certification:</span>
                      <span className="font-semibold text-right text-[10.5px] sm:text-[11px] max-w-[130px] truncate text-[#175f52]">
                        {c.cert}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-3">
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1 text-[11px] sm:text-xs text-stone-600 font-light">
                      {c.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#f22924] shrink-0 mt-0.5" />
                          <span className="line-clamp-1 leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Action Area */}
                <div className="pt-3.5 border-t border-[#EBE5D8]">
                  <div className="mb-3.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-stone-500 block font-semibold">
                        Tuition &amp; Stay (USD)
                      </span>
                      <span className="text-[9.5px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70 font-medium">
                        Food &amp; Stay Included
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[#f22924] font-figtree block mb-2">
                      {c.price}
                    </span>

                    {/* Room Tier Grid */}
                    {c.pricing && (
                      <div className="grid grid-cols-3 gap-1 p-1.5 rounded-xl bg-[#FAF6EE] border border-[#EBE5D8] text-center text-[9.5px]">
                        <div>
                          <span className="text-stone-500 block leading-tight">
                            Triple
                          </span>
                          <span className="font-bold text-stone-900 block mt-0.5">
                            {c.pricing.triple}
                          </span>
                        </div>
                        <div className="border-x border-[#EBE5D8]">
                          <span className="text-stone-500 block leading-tight">
                            Shared
                          </span>
                          <span className="font-bold text-[#f22924] block mt-0.5">
                            {c.pricing.shared}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-500 block leading-tight">
                            Private
                          </span>
                          <span className="font-bold text-stone-900 block mt-0.5">
                            {c.pricing.private}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Buttons: WhatsApp Enroll + Course Details Page */}
                  <div className="flex flex-col gap-2">
                    <a
                      href={whatsappLink(
                        `Namaste! I would like to check available batch dates and enroll in the ${c.name} at Siddhant School of Yoga.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs font-semibold transition-all ${
                        c.popular
                          ? "bg-[#f22924] hover:bg-[#d45d44] text-white shadow-xs hover:shadow-md"
                          : "bg-[#FAF6EE] hover:bg-[#f22924] hover:text-white text-[#f22924] border border-[#f22924]"
                      }`}
                    >
                      <span>{c.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <Link
                      href={c.slug}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-[11.5px] font-semibold text-stone-600 hover:text-[#f22924] transition-colors"
                    >
                      <span>View Course Details &amp; Syllabus</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots & Swipe Hint */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            {filteredCourses.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "w-6 bg-[#f22924]"
                    : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11.5px] text-stone-500">
            <span className="hidden sm:inline">
              Tip: Drag or use arrow keys to browse all courses
            </span>
            <span className="sm:hidden">
              Swipe horizontally to view all courses
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

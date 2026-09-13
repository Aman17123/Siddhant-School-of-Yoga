import { Container, SectionHeading, ButtonLink } from "./ui";
import {
  Clock,
  TrendingUp,
  Award,
  DollarSign,
  Check,
  ArrowRight,
} from "lucide-react";
import { whatsappLink } from "@/data/siteData";

export default function CourseComparison() {
  const comparison = [
    {
      name: "100-Hour TTC",
      badge: "Foundational",
      duration: "14 Days",
      hours: "100 Hours",
      cert: "Yoga Alliance YACEP / Part 1",
      suitability: "Beginners & Short-stay seekers",
      price: "$300 – $600",
      pricing: { triple: "$300", shared: "$500", private: "$600" },
      features: [
        "Basic Hatha & Ashtanga asanas",
        "Introduction to Pranayama & Bandhas",
        "Shatkarma cleansing techniques",
        "Ashram living & 3 sattvic meals",
      ],
      cta: "Enquire 100h",
      popular: false,
    },
    {
      name: "200-Hour TTC",
      badge: "Flagship / Most Popular",
      duration: "24–28 Days",
      hours: "200 Hours",
      cert: "Yoga Alliance USA RYT 200",
      suitability: "Beginners to Aspiring Teachers",
      price: "$799 – $999",
      pricing: { triple: "$799", shared: "$899", private: "$999" },
      features: [
        "Complete Hatha & Ashtanga Primary Series",
        "World-first signature Pranayama science",
        "Yoga Anatomy, Biomechanics & Adjustments",
        "Patanjali Sutras & Bhagavad Gita philosophy",
        "Lifelong 100-day daily practice schedule",
        "Teach anywhere in the world legally",
      ],
      cta: "Join Flagship 200h",
      popular: true,
    },
    {
      name: "300-Hour TTC",
      badge: "Advanced Mastery",
      duration: "28 Days",
      hours: "300 Hours",
      cert: "Yoga Alliance USA RYT 300 / 500",
      suitability: "Graduates of 200-Hour TTC",
      price: "$1,599 – $1,999",
      pricing: { triple: "$1,599", shared: "$1,799", private: "$1,999" },
      features: [
        "Advanced posture variations & adjustments",
        "Advanced Kumbhaka & Nadi Shodhana",
        "Ayurveda integration & therapeutic yoga",
        "Kundalini kriyas & sound healing",
        "Higher teaching methodology & adjustments",
      ],
      cta: "Apply for 300h",
      popular: false,
    },
    {
      name: "500-Hour TTC",
      badge: "Master Immersion",
      duration: "56 Days",
      hours: "500 Hours",
      cert: "Yoga Alliance USA RYT 500",
      suitability: "Total Transformation & Masters",
      price: "$1,699 – $2,299",
      pricing: { triple: "$1,699", shared: "$1,999", private: "$2,299" },
      features: [
        "Combined 200h + 300h dual master curriculum",
        "Deep personal mentorship under Acharya Siddhant",
        "Complete mastery of Hatha, Ashtanga & Kundalini",
        "Highest tier international certification",
      ],
      cta: "Join 500h Master",
      popular: false,
    },
  ];

  return (
    <section
      id="comparison"
      className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#EBE5D8]/60"
    >
      <Container>
        {/* Header (Compact) */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <SectionHeading
            eyebrow="Side-by-Side Comparison"
            title="Compare Our Yoga Teacher Training Courses"
            subtitle="Choose your pathway to international certification"
            text="Find the exact training program in Rishikesh that matches your current experience level, available schedule, and professional teaching goals."
            center
            className="mb-0"
          />
        </div>

        {/* 4 Columns Comparison Cards (Compact & Uniform Height) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 font-figtree">
          {comparison.map((c, i) => (
            <div
              key={i}
              className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between border transition-all duration-300 hover:shadow-2xl ${
                c.popular
                  ? "border-[#f22924] ring-2 ring-[#f22924]/20 bg-[#FAF6EE]/50 shadow-lg -translate-y-1"
                  : "border-[#EBE5D8] bg-white hover:-translate-y-0.5"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      c.popular
                        ? "bg-[#f22924] text-white shadow-xs"
                        : "bg-[#FAF6EE] text-[#f22924] border border-[#f5b860]/40"
                    }`}
                  >
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-belleza font-normal text-[#1e2422] mb-0.5 tracking-wide">
                  {c.name}
                </h3>
                <span className="text-[11px] sm:text-xs text-[#d45d44] font-medium block mb-3 line-clamp-1">
                  {c.suitability}
                </span>

                {/* Specs Box (Compact) */}
                <div className="space-y-1.5 py-2.5 border-y border-[#EBE5D8] text-xs text-stone-700 mb-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Duration:</span>
                    <span className="font-semibold text-[#1e2422]">
                      {c.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Total Hours:</span>
                    <span className="font-semibold text-[#1e2422]">
                      {c.hours}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Certification:</span>
                    <span className="font-semibold text-right text-[11px] max-w-[130px] truncate text-[#175f52]">
                      {c.cert}
                    </span>
                  </div>
                </div>

                {/* Features (Top 3 with guaranteed 1-line alignment) */}
                <ul className="space-y-1.5 mb-4 text-xs text-stone-600 font-light">
                  {c.features.slice(0, 3).map((f, fi) => (
                    <li key={fi} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#f22924] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Button (Compact) */}
              <div className="pt-3 border-t border-[#EBE5D8]">
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 block font-semibold">
                      Tuition &amp; Stay (USD)
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Food &amp; Stay
                    </span>
                  </div>
                  <span className="text-lg font-bold text-[#f22924] font-figtree block mb-1.5">
                    {c.price}
                  </span>

                  {c.pricing && (
                    <div className="grid grid-cols-3 gap-1 p-1.5 rounded-xl bg-[#FAF6EE] border border-[#EBE5D8] text-center text-[9px] sm:text-[10px]">
                      <div>
                        <span className="text-stone-500 block leading-tight">Triple</span>
                        <span className="font-bold text-stone-900 block mt-0.5">{c.pricing.triple}</span>
                      </div>
                      <div className="border-x border-[#EBE5D8]">
                        <span className="text-stone-500 block leading-tight">Shared</span>
                        <span className="font-bold text-[#f22924] block mt-0.5">{c.pricing.shared}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block leading-tight">Private</span>
                        <span className="font-bold text-stone-900 block mt-0.5">{c.pricing.private}</span>
                      </div>
                    </div>
                  )}
                </div>
                <a
                  href={whatsappLink(
                    `Namaste! I'd like to check dates and enroll in the ${c.name} at Siddhant School of Yoga.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs font-semibold transition-all ${
                    c.popular
                      ? "bg-[#f22924] hover:bg-[#d45d44] text-white shadow-xs hover:shadow-md"
                      : "bg-[#FAF6EE] hover:bg-[#f22924] hover:text-white text-[#f22924] border-2 border-[#f22924]"
                  }`}
                >
                  <span>{c.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

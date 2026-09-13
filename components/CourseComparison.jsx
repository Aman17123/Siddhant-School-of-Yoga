import { Container, SectionHeading, ButtonLink } from './ui';
import { Clock, TrendingUp, Award, DollarSign, Check, ArrowRight } from 'lucide-react';
import { whatsappLink } from '@/data/siteData';

export default function CourseComparison() {
  const comparison = [
    {
      name: "100-Hour TTC",
      badge: "Foundational",
      duration: "14 Days",
      hours: "100 Hours",
      cert: "Yoga Alliance YACEP / Part 1",
      suitability: "Beginners & Short-stay seekers",
      price: "$599 – $749",
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
      price: "$899 – $1,199",
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
      price: "$1,199 – $1,499",
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
      price: "$1,999 – $2,499",
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
    <section id="comparison" className="py-20 lg:py-28 bg-white border-b border-[#EBE5D8]/60">
      <Container>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionHeading
            eyebrow="Side-by-Side Comparison"
            title="Compare Our Yoga Teacher Training Courses"
            text="Find the exact training program in Rishikesh that matches your experience level, available time, and teaching ambitions."
            center
          />
        </div>

        {/* 4 Columns Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {comparison.map((c, i) => (
            <div
              key={i}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 hover:shadow-xl ${
                c.popular
                  ? 'border-[#E8735A] ring-2 ring-[#E8735A]/20 bg-[#FAF6EE]/50 shadow-md -translate-y-1'
                  : 'border-[#EBE5D8] bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    c.popular ? 'bg-[#E8735A] text-white' : 'bg-[#EBE5D8] text-[#55564c]'
                  }`}>
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-[#1F1E1D] mb-1">
                  {c.name}
                </h3>
                <span className="text-xs text-[#E8735A] font-semibold block mb-4">
                  {c.suitability}
                </span>

                {/* Specs Box */}
                <div className="space-y-2.5 py-4 border-y border-[#EBE5D8] text-xs text-[#33342e] mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#66675c]">Duration:</span>
                    <span className="font-bold">{c.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#66675c]">Total Hours:</span>
                    <span className="font-bold">{c.hours}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#66675c]">Certification:</span>
                    <span className="font-bold text-right text-[11px] max-w-[140px] truncate">{c.cert}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 text-xs text-[#55564c]">
                  {c.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#E8735A] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Button */}
              <div className="pt-4 border-t border-[#EBE5D8]">
                <div className="mb-4">
                  <span className="text-[10px] uppercase text-[#77786e] block">Tuition &amp; Stay</span>
                  <span className="text-xl font-bold font-serif text-[#E8735A]">{c.price}</span>
                </div>
                <a
                  href={whatsappLink(`Hi, I'd like to check dates and enroll in the ${c.name} at Siddhant School of Yoga.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-bold transition-all ${
                    c.popular
                      ? 'bg-[#E8735A] hover:bg-[#F08C5C] text-white shadow-md'
                      : 'bg-white hover:bg-[#FAF6EE] text-[#E8735A] border border-[#E8735A]'
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

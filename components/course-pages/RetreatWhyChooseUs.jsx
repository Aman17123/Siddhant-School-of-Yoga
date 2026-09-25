import { Kicker, HeadingDivider } from "@/components/ui";

// Shared, site-wide 7-point "Why Choose Us" grid used identically across
// the Yoga for Beginners, Yoga & Meditation Retreat and 07-Day Retreat
// pages — same numbered-card pattern as TwoHundredHourContent.jsx.
const whyChooseUsPoints = [
  {
    title: "A Leading Pranayama Centre in Rishikesh",
    text: "Pranayama is the foundation of every yogic practice. We teach it in depth so it supports your asana, meditation and healing work.",
  },
  {
    title: "Yoga & Gratitude",
    text: "Gratitude brings peace, happiness and satisfaction. It's taught as a daily practice alongside the course.",
  },
  {
    title: "Small Groups of 10–15 Students",
    text: "Every student gets personal attention.",
  },
  {
    title: "Measure Your Growth",
    text: "Clear signs and parameters to track your physical, mental and intellectual progress.",
  },
  {
    title: "Hatha + Ashtanga Vinyasa",
    text: "Hatha gives stability. Ashtanga Vinyasa builds stamina and strength.",
  },
  {
    title: "Daily Classes",
    text: "Pranayama, Hatha Yoga, Meditation, Yoga Philosophy and Ashtanga Vinyasa every day.",
  },
  {
    title: "Family Environment",
    text: "Teachers and staff are practitioners themselves, and students feel at home.",
  },
];

export default function RetreatWhyChooseUs({ title, bgClassName = "bg-[#f4efe6]" }) {
  return (
    <section className={`py-14 sm:py-16 lg:py-20 ${bgClassName} border-b border-[#e3dac9]/70 font-figtree`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Why Choose Us</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            {title}
          </h2>
          <HeadingDivider />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {whyChooseUsPoints.map((point, i) => (
            <div
              key={point.title}
              className="flex gap-3.5 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-4 sm:p-5 shadow-2xs"
            >
              <span className="shrink-0 w-8 h-8 rounded-lg bg-[#142b1e] text-white flex items-center justify-center text-xs font-bold font-figtree">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] leading-snug mb-1">
                  {point.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">{point.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-6 rounded-2xl border border-[#1c3b2b]/30 bg-white/70 px-5 sm:px-8 py-5 text-center">
          <p className="text-sm sm:text-base text-stone-700 italic leading-relaxed">
            Siddhant School of Yoga is a Registered Yoga School with Yoga Alliance USA (RYS 200, RYS 300, RYS 500) — and this same experienced teaching team guides every retreat we run.
          </p>
        </div>
      </div>
    </section>
  );
}

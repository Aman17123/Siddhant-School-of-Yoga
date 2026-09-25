import Image from "next/image";

/**
 * Generic version of the 4-card "syllabusCards" grid from the 200-Hour
 * Kundalini TTC's Course Syllabus section — a photo, title, subtitle and
 * short paragraph per card, summarizing the main pillars of the curriculum.
 * Designed to sit inside an existing Curriculum section, above the detailed
 * syllabus accordion (no own <section> wrapper, so it always inherits the
 * parent section's background — no alternation math required).
 */
export default function RetreatPillarCards({ cards = [], className = "mb-8 lg:mb-10" }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ${className}`}>
      {cards.map((card) => (
        <div
          key={card.title}
          className="group bg-[#fdfbf7] rounded-2xl overflow-hidden border border-[#e3dac9] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={card.image}
              alt={card.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
          </div>
          <div className="p-4 sm:p-5">
            <h3 className="font-belleza text-lg sm:text-xl text-[#1e2422] leading-snug mb-1.5">
              {card.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#1c3b2b] mb-2.5">
              {card.subtitle}
            </p>
            <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed">
              {card.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

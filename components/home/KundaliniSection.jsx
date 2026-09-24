import { Container, ProgramCard, ChakraDot } from "../ui";
import { kundaliniTrainings } from "@/data/coursesData";

export default function KundaliniSection() {
  return (
    <section
      id="kundalini"
      className="py-14 sm:py-16 lg:py-20 bg-[#1c3b2b] overflow-hidden relative font-figtree"
    >
      <Container className="relative z-10">
        {/* Header (Full Width & Aligned cleanly) */}
        <div className="w-full mb-8 lg:mb-10 text-center lg:text-left">
          <span className="block text-[1rem] font-figtree font-semibold tracking-[0.08em] text-[#f4efe6] mb-1.5">
            Kundalini Yoga
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-white leading-[1.2] mb-1 lg:mb-3 drop-shadow-xs">
            Kundalini Yoga Teacher Training in Rishikesh
          </h2>
          <span className="inline-flex lg:hidden items-center gap-2 mt-2.5 mb-3">
            <span className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-white/60" />
            <ChakraDot color="#ffffff" />
            <span className="h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-white/60" />
          </span>

          <p className="font-figtree text-sm sm:text-base text-stone-800 leading-relaxed font-normal w-full block bg-white/95 backdrop-blur-xs p-3 sm:p-3.5 rounded-xl border border-white/80 shadow-2xs text-center lg:text-left">
            Kundalini is a sacred reservoir of supreme knowledge and motherly
            wisdom. Siddhant School of Yoga presents authentic Kundalini kriyas,
            chakra activation, and tantric meditation to awaken your latent
            power safely and systematically.
          </p>
        </div>

        {/* 4 Kundalini Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {kundaliniTrainings.map((k) => (
            <ProgramCard key={k.id} program={k} />
          ))}
        </div>
      </Container>
    </section>
  );
}

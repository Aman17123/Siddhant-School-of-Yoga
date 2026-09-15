import Image from "next/image";
import { Flame } from "lucide-react";
import { Container, ProgramCard } from "../ui";
import { kundaliniTrainings } from "@/data/coursesData";

export default function KundaliniSection() {
  return (
    <section
      id="kundalini"
      className="py-14 sm:py-16 lg:py-20 bg-[#FAF6EE] border-b border-[#EBE5D8] overflow-hidden relative font-figtree"
    >
      {/* Prominently visible online yoga background image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <Image
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=2000&q=80"
          alt="Yoga Asana and Meditation Sunrise Background"
          fill
          className="object-cover object-center opacity-75 sm:opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EE]/35 via-[#FAF6EE]/15 to-[#FAF6EE]/45" />
      </div>

      <Container className="relative z-10">
        {/* Header (Full Width & Aligned cleanly) */}
        <div className="w-full mb-8 lg:mb-10 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-3 drop-shadow-xs">
            Kundalini Yoga Teacher Training in Rishikesh
          </h2>

          <p className="font-figtree text-sm sm:text-base text-stone-800 leading-relaxed font-normal w-full block bg-white/80 backdrop-blur-xs p-3 sm:p-3.5 rounded-xl border border-white/80 shadow-2xs text-center lg:text-left">
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

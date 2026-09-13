import Image from "next/image";
import { Container, SectionHeading } from "./ui";
import { Sparkles, Waves, Mountain, Flame, Compass } from "lucide-react";

export default function WhyRishikesh() {
  const highlights = [
    {
      icon: Waves,
      title: "Vibrations of Sacred Mother Ganga",
      desc: "Practicing asana and pranayama along the pure glacial waters of the holy Ganges infuses every breath with pure spiritual prana.",
    },
    {
      icon: Mountain,
      title: "Foothills of the Majestic Himalayas",
      desc: "Rishikesh is cradled by verdant mountains where sages and rishis have meditated for thousands of years, creating an unparalleled yogic vortex.",
    },
    {
      icon: Flame,
      title: "World Capital of Yoga",
      desc: "Home to the sacred Ganga Aarti, traditional ashrams, and timeless Guru-Shishya paramparas that preserve authentic Vedic culture.",
    },
    {
      icon: Compass,
      title: "The Ideal Sanctuary for Self-Discovery",
      desc: "Far from commercial distractions, Rishikesh allows you to completely disconnect, turn inwards, and experience true spiritual rebirth.",
    },
  ];

  return (
    <section
      id="rishikesh"
      className="py-14 sm:py-16 lg:py-20 bg-[#FFFFFF] border-b border-[#EBE5D8]/60 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Text & 4 Highlights (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-figtree font-semibold tracking-wider uppercase bg-[#f22924]/10 text-[#f22924] border border-[#f22924]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#f5b860]" />
              <span>THE BIRTHPLACE OF YOGA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] mb-2 leading-[1.2]">
              Why Learn Yoga in Rishikesh, India?
            </h2>

            <p className="font-fortune text-xl sm:text-2xl text-[#d45d44] mb-3 tracking-wide">
              Where the sacred Himalayas embrace holy Mother Ganga
            </p>

            <p className="font-figtree text-sm sm:text-base text-stone-600 leading-relaxed mb-8 font-light">
              Yoga and a yogic lifestyle are the right solutions to life&apos;s
              challenges, but to truly absorb its depths you need the right
              energetic vortex. Rishikesh is nestled under the foothills of the
              Himalayas along the emerald waters of Mother Ganga. For thousands
              of years, realized masters have practiced sadhana here. Siddhant
              School of Yoga is blessed to be located in this sacred sanctuary.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-figtree">
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#EBE5D8] shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f22924]/10 text-[#f22924] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#f22924]" />
                    </div>
                    <h4 className="font-belleza text-base font-normal text-[#1e2422] tracking-wide mb-1.5">
                      {h.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      {h.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Photo Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <Image
                    src="/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp"
                    alt="Warrior pose yoga practice overlooking sacred Ganges in Rishikesh"
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <Image
                    src="/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp"
                    alt="Yoga students spiritual temple excursion in Rishikesh"
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <Image
                    src="/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp"
                    alt="Sacred Vedic fire havan ceremony in Rishikesh"
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <Image
                    src="/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp"
                    alt="Students practicing yoga asanas on Ganga banks in Rishikesh"
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

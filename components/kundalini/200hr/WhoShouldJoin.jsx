"use client";

import { useState } from "react";
import Image from "next/image";
import { Sprout, Award, Flame, GraduationCap } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";

const whoShouldJoin = [
  {
    icon: Sprout,
    title: "Complete Beginners Through Advanced Students",
    text: "This 200-hour course is self-contained — it covers everything the 100-hour course does and more, so you can start here even with zero prior yoga experience and finish with a full RYT-200 credential.",
    image: "/images/yoga-and-meditation-retreat-riverside.jpg",
    alt: "Beginner to advanced student receiving hands-on guidance during a riverside yoga and meditation retreat in Rishikesh",
  },
  {
    icon: Award,
    title: "Anyone Wanting Full RYT-200 Certification",
    text: "Students who want an internationally recognised Yoga Alliance USA RYS-200 credential, earned through the Kundalini path rather than a generic Hatha or Vinyasa curriculum.",
    image: "/images/trayambakeshwar-temple-rishikesh-view.jpg",
    alt: "View of Trayambakeshwar Temple near the site of the Yoga Alliance RYT-200 certification ceremony in Rishikesh",
  },
  {
    icon: Flame,
    title: "Energy Workers & Healers",
    text: "Reiki practitioners, energy healers and home yogis who already sense subtle energy and want a structured, traditional framework of chakra science and kundalini kriya to deepen their work.",
    image: "/images/pranayama-theory-class-siddhant-school-of-yoga.png",
    alt: "Energy healer deepening kundalini practice in a pranayama theory class at Siddhant School of Yoga",
  },
  {
    icon: GraduationCap,
    title: "100-Hour Graduates Continuing to Part 2",
    text: "Students who completed our 100-hour Kundalini TTC and are ready to build further, deepening the discovery and awakening of every chakra before advancing to the 300-hour program.",
    image: "/images/meditation-by-rishikesh-temple.jpg",
    alt: "100-hour Kundalini graduate meditating by a Rishikesh temple before continuing to the 200-hour teacher training",
  },
];

export default function Kundalini200HourWhoShouldJoin() {
  const [active, setActive] = useState(0);

  return (
    <section id="who-should-join" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Is This for You?</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Who Should Join a 200-Hour Kundalini Yoga Teacher Training in Rishikesh
          </h2>
          <HeadingDivider />
        </div>

        {/* Desktop: expanding hover panels */}
        <div
          className="hidden lg:flex gap-3 h-[520px]"
          onMouseLeave={() => setActive(0)}
        >
          {whoShouldJoin.map((item, i) => {
            const isActive = active === i;
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ flexGrow: isActive ? 3 : 1 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer transition-[flex-grow] duration-500 ease-in-out shadow-2xs"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                <span className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-xs font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Collapsed vertical label */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-end gap-4 pb-8 transition-opacity duration-300 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </span>
                  <span className="text-white text-xs font-bold uppercase tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap drop-shadow-md">
                    {item.title}
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 pt-24 p-6 sm:p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 ${
                    isActive ? "opacity-100 delay-150" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <span className="inline-flex w-11 h-11 rounded-full bg-[#1c3b2b] items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </span>
                  <h3 className="text-white text-xl sm:text-2xl font-belleza font-normal mb-2 drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed max-w-sm">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / tablet: simple stacked cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {whoShouldJoin.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xs"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <span className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-[11px] font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-flex w-10 h-10 rounded-full bg-[#1c3b2b] items-center justify-center mb-3">
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </span>
                  <h3 className="text-white text-lg font-belleza font-normal mb-1.5 drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-xs leading-relaxed">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Eligibility note */}
        <div className="mt-8 max-w-4xl mx-auto rounded-2xl border border-[#e3dac9] bg-[#fdfbf7] p-5 sm:p-6">
          <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] mb-2">
            Basic Eligibility
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Open to students aged 18–60 in good general health, with no surgery in the past year. The course asks for 9–10 hours of daily practice with 100% attendance, a vegetarian diet during your stay, no alcohol, drugs or smoking, basic conversational English, and is not suitable for children.
          </p>
        </div>
      </div>
    </section>
  );
}

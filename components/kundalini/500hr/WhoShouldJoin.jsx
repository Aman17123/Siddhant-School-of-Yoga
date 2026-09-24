"use client";

import { useState } from "react";
import Image from "next/image";
import { Sprout, Flame, Award, Compass } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";

const whoShouldJoin = [
  {
    icon: Sprout,
    title: "Dedicated Beginners",
    text: "Complete beginners ready to commit to about eight weeks in Rishikesh, who would rather build their entire chakra and Kundalini foundation in one uninterrupted journey than return in stages. You'll need good physical health and 100% attendance across roughly 9–10 hours of daily practice.",
    image: "/images/head-to-knee-forward-bend-group-class-rishikesh.jpg",
    alt: "Dedicated beginners receiving hands-on guidance in a group kundalini class in Rishikesh",
  },
  {
    icon: Flame,
    title: "Intermediate & Advanced Practitioners",
    text: "Energy workers, home yogis and 100-hour or 200-hour graduates who want the full 200+300-hour Kundalini path without a gap in between — moving straight from chakra awakening into advanced kriya, Tantric integration and the ascent of Shakti.",
    image: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
    alt: "Advanced practitioner deepening kundalini practice with mudra meditation on a hilltop retreat in Rishikesh",
  },
  {
    icon: Award,
    title: "Aspiring RYT-500 Teachers",
    text: "Anyone seeking Yoga Alliance USA RYT-500 registration through one continuous immersion, rather than splitting the 200-hour and 300-hour Kundalini courses across two separate trips to India.",
    image: "/images/meditation-class-indoor.jpg",
    alt: "Future kundalini master teacher in an indoor meditation class during the 500-hour certification course in Rishikesh",
  },
  {
    icon: Compass,
    title: "Seekers of One Uninterrupted Journey",
    text: "Those who sense that Kundalini mastery deserves one sustained arc of practice rather than two separate visits — using roughly eight weeks in Rishikesh to move all the way from dormant energy to a living, awakened practice.",
    image: "/images/yogi-prayer-pose-himalaya-sunrise-rishikesh.jpg",
    alt: "Person in prayer pose finding clarity and release at Himalayan sunrise near Rishikesh",
  },
];

export default function KundaliniFiveHundredHourWhoShouldJoin() {
  const [active, setActive] = useState(0);

  return (
    <section id="who-should-join" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Is This for You?</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Who Should Join the 500-Hour Master Kundalini Yoga Teacher Training
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            This course welcomes students aged 18–60, in good physical health with no surgery in the past year. Expect a vegetarian diet, no alcohol, drugs or smoking, and basic English throughout the course.
          </p>
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
      </div>
    </section>
  );
}

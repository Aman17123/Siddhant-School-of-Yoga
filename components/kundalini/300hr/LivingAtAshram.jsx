import Image from "next/image";
import { Sunrise, Ban, Eye, Flame, User, Sparkles } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";

const asks = [
  {
    icon: Sunrise,
    title: "Early Mornings, No Exceptions",
    desc: "Sadhana begins at 5:30 AM, and full attendance is expected every day across all 28 days.",
  },
  {
    icon: Ban,
    title: "Letting Habits Go",
    desc: "A willingness to set aside caffeine, distractions and old routines for the full four weeks.",
  },
  {
    icon: Eye,
    title: "Turning Inward, Deeply",
    desc: "Ready to sit with advanced meditation and Kundalini practice, rather than reach for a distraction.",
  },
];

const gives = [
  {
    icon: Flame,
    title: "A Genuine Kundalini Awakening",
    desc: "Balanced chakras and refined energy flow that create a shift you can actually feel.",
  },
  {
    icon: User,
    title: "Meeting a More Advanced Self",
    desc: "The depth of practice most 200-hour graduates never make time for.",
  },
  {
    icon: Sparkles,
    title: "Readiness to Teach & Lead",
    desc: "Real advanced tools and confidence you carry home and into your teaching.",
  },
];

export default function LivingAtAshram() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 font-figtree overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-kundalini.png"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#fdfbf7]/80" />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <Kicker>More Than a Certificate</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
            Living at Siddhant School of Yoga in Rishikesh
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
            There is something worth saying plainly, right at the start: these twenty-eight days will ask something of you. This is an advanced course built for 200-hour graduates, not a gentle refresher, and we would rather you knew that before you booked than felt misled once you arrived. It is a fair trade, though. Here is both sides of it.
          </p>
        </div>

        {/* 3-Column: Asks | Image | Gives */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-14 items-center">
          {/* Left: What This Training Asks */}
          <div>
            <span className="block text-center lg:text-left text-[11px] font-figtree font-bold uppercase tracking-[0.2em] text-[#b85c00] mb-5">
              What This Training Asks of You
            </span>
            <div className="divide-y divide-dashed divide-[#1c3b2b]/20">
              {asks.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.title} className="flex flex-col lg:flex-row items-center lg:items-start gap-4 py-4 text-center lg:text-left">
                    <div className="order-2 lg:order-1">
                      <h3 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] mb-1">
                        {a.title}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed font-medium">
                        {a.desc}
                      </p>
                    </div>
                    <span className="order-1 lg:order-2 shrink-0 w-11 h-11 rounded-full bg-[#fdfbf7] border border-[#e3dac9] shadow-xs text-[#1c3b2b] flex items-center justify-center lg:ml-auto">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center: Arched Image */}
          <div className="relative mx-auto">
            <div className="relative w-[280px] sm:w-[340px] aspect-[3/4] rounded-t-[160px] rounded-b-2xl overflow-hidden border-4 border-[#fdfbf7] shadow-2xl">
              <Image
                src="/images/group-meditation-hilltop-temple-rishikesh.jpg"
                alt="Advanced Kundalini sadhana and group meditation at a hilltop temple near Siddhant School of Yoga"
                fill
                className="object-cover"
                sizes="340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c3b2b]/50 via-transparent to-transparent" />
            </div>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#fdfbf7] border border-[#e3dac9] shadow-md flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#b85c00]" />
            </span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-full bg-[#1c3b2b] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-lg">
              An Ashram, Not a Resort
            </span>
          </div>

          {/* Right: What It Quietly Gives Back */}
          <div>
            <span className="block text-center lg:text-left text-[11px] font-figtree font-bold uppercase tracking-[0.2em] text-[#b85c00] mb-5">
              What It Quietly Gives Back
            </span>
            <div className="divide-y divide-dashed divide-[#1c3b2b]/20">
              {gives.map((g) => {
                const Icon = g.icon;
                return (
                  <div key={g.title} className="flex flex-col lg:flex-row items-center lg:items-start gap-4 py-4 text-center lg:text-left">
                    <span className="shrink-0 w-11 h-11 rounded-full bg-[#b85c00] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <h3 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] mb-1">
                        {g.title}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed font-medium">
                        {g.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Closing Quote */}
        <div className="text-center max-w-xl mx-auto mt-16 lg:mt-20">
          <span className="block w-10 h-0.5 bg-[#b85c00] mx-auto mb-4" />
          <p className="text-base sm:text-lg font-belleza italic text-[#b85c00] leading-relaxed">
            This training was never about becoming someone new. It is about fully balancing the energy that Part 1 and Part 2 already began to awaken within you.
          </p>
        </div>
      </div>
    </section>
  );
}

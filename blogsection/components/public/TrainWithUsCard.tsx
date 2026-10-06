"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Flower2,
  Sparkles,
  Leaf,
  Heart,
  Wind,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { COURSES } from "@/content/courses";
import { RETREATS } from "@/content/retreats";

type CardItem = {
  title: string;
  subtitle: string;
  href: string;
  /** Hours for TTC, days for retreats. Omitted for themed entries. */
  count?: number;
  unit?: "hrs" | "days";
  icon?: LucideIcon;
  popular?: boolean;
};

/**
 * Themed entries (Kundalini, meditation, Ayurveda, wellness) get an icon
 * instead of a number badge. Everything else shows its real hour/day count.
 * Remove a slug here to give it a numeric badge instead.
 */
const TTC_THEMED = new Set([
  "100-hour-kundalini-yoga-teacher-training-in-rishikesh",
  "200-hour-kundalini-yoga-teacher-training-in-rishikesh",
]);

const RETREAT_THEMED: Record<string, LucideIcon | undefined> = {
  "yoga-and-meditation-wellness-retreat-rishikesh": Waves,
  "ayurveda-panchakarma-detox-retreat-rishikesh": Leaf,
  "himalayan-meditation-retreat-rishikesh": Flower2,
  "stress-anxiety-relief-yoga-retreat-rishikesh": Wind,
  "yoga-and-wellness-retreat-rishikesh": Heart,
};

const POPULAR_TTC = new Set(["200-hour-yoga-teacher-training-in-rishikesh"]);

const strip = (s: string) =>
  s
    .replace(/^\d+\s*Days?\s*[—–-]\s*/i, "")
    .replace(/\s*(in|,)\s*Rishikesh(,\s*India)?$/i, "")
    .trim();

const leadingDays = (duration: string) => {
  const m = duration?.match(/^(\d+)/);
  return m ? Number(m[1]) : undefined;
};

const TTC_ITEMS: CardItem[] = COURSES.map((c) => {
  const themed = TTC_THEMED.has(c.slug);
  return {
    title: c.shortName,
    subtitle: `${c.certification} · ${c.durationLabel}`,
    href: `/${c.slug}`,
    count: themed ? undefined : c.hours,
    unit: themed ? undefined : "hrs",
    icon: themed ? Sparkles : undefined,
    popular: POPULAR_TTC.has(c.slug),
  };
});

const RETREAT_ITEMS: CardItem[] = RETREATS.map((r) => {
  const themed = RETREAT_THEMED[r.slug];
  const days = leadingDays(r.duration);
  return {
    title: `${strip(r.shortName === "Retreat" ? r.title : r.shortName)} in Rishikesh`,
    subtitle: r.duration,
    href: `/${r.slug}`,
    count: themed ? undefined : days,
    unit: themed ? undefined : "days",
    icon: themed,
  };
});

const TABS = [
  { key: "ttc", label: "Yoga TTC", items: TTC_ITEMS },
  { key: "retreats", label: "Retreats", items: RETREAT_ITEMS },
] as const;

function Badge({ item }: { item: CardItem }) {
  const { count, unit, icon: Icon } = item;

  return (
    <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl border border-[#BF296A]/15 bg-[#BF296A]/10">
      {count ? (
        <div className="text-center leading-none">
          <div
            className="font-display font-bold text-card text-[#BF296A]"
          >
            {count}
          </div>
          <div className="mt-1 text-body-sm font-semibold text-[#6B5862]/80">
            {unit}
          </div>
        </div>
      ) : (
        Icon && <Icon className="h-8 w-8 text-[#BF296A]" strokeWidth={1.5} />
      )}
    </div>
  );
}

export default function TrainWithUsCard() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("ttc");
  const current = TABS.find((t) => t.key === active)!;

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#BF296A]/20 bg-[#FFFBFD] p-4 font-sans shadow-sm sm:p-5">
      {/* Heading */}
      <div className="relative">
        <h2 className="font-display text-card font-semibold leading-[1.15] tracking-[-0.01em] text-[#2A1621]">
          Pick your course or retreat
        </h2>
        <p className="mt-2 text-body-sm leading-relaxed text-[#6B5862]">
          Yoga, Ayurveda and authentic yogic lifestyle experiences. Meals and
          stay included.
        </p>
      </div>

      {/* Tab switcher */}
      <div
        role="tablist"
        aria-label="Courses and retreats"
        className="relative mt-3 grid grid-cols-2 rounded-full border border-gray-100 bg-[#FDF9FB] p-1.5"
      >
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.key)}
              className={`rounded-full py-3 text-body-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BF296A] ${
                isActive
                  ? "bg-gradient-to-r from-[#BF296A] to-[#951248] text-white shadow-sm"
                  : "text-[#6B5862] hover:text-[#BF296A]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* List — scrolls if there are many items */}
      <div
        role="tabpanel"
        className="relative mt-4 max-h-[420px] space-y-3 overflow-y-auto"
      >
        {current.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-2 transition-colors duration-200 hover:border-[#BF296A]/50 hover:bg-[#FDF9FB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BF296A]"
          >
            <Badge item={item} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center">
                {/* title */}
                <h3 className="font-display text-body font-bold leading-snug tracking-tight text-[#2A1621]">
                  {item.title}
                </h3>
                
              </div>
              <p className="mt-1 text-body-sm leading-snug text-[#6B5862]">
                {item.subtitle}
              </p>
            </div>

          
          </Link>
        ))}
      </div>
    </div>
  );
}

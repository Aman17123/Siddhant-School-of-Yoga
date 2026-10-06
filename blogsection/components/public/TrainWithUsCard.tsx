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
import { teacherTrainings, retreats } from "@/data/coursesData";

type CardItem = {
  title: string;
  subtitle: string;
  href: string;
  count?: number;
  unit?: "hrs" | "days";
  icon?: LucideIcon;
  popular?: boolean;
};

const TTC_ITEMS: CardItem[] = teacherTrainings.map((c: any) => {
  const matchHours = c.title.match(/(\d+)[-\s]*Hour/i);
  const hours = matchHours ? Number(matchHours[1]) : undefined;
  return {
    title: c.title,
    subtitle: `${c.certification} · ${c.duration}`,
    href: `/${c.slug}`,
    count: hours,
    unit: hours ? "hrs" : undefined,
    icon: hours ? undefined : Sparkles,
    popular: c.featured || c.badge === "Most Popular",
  };
});

const RETREAT_ITEMS: CardItem[] = retreats.map((r: any) => {
  return {
    title: r.title,
    subtitle: r.duration || "Immersion Retreat",
    href: `/${r.slug}`,
    count: r.days || undefined,
    unit: r.days ? "days" : undefined,
    icon: r.days ? undefined : Waves,
    popular: r.badge === "Most Popular",
  };
});

const TABS = [
  { key: "ttc", label: "Yoga TTC", items: TTC_ITEMS },
  { key: "retreats", label: "Retreats", items: RETREAT_ITEMS },
] as const;

function Badge({ item }: { item: CardItem }) {
  const { count, unit, icon: Icon } = item;

  return (
    <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-2xl border border-[#e3dac9] bg-[#f4efe6]">
      {count ? (
        <div className="text-center leading-none">
          <div className="font-belleza font-normal text-xl text-[#1c3b2b]">
            {count}
          </div>
          <div className="mt-1 text-[11px] font-figtree font-semibold text-stone-600">
            {unit}
          </div>
        </div>
      ) : (
        Icon && <Icon className="h-6 w-6 text-[#1c3b2b]" strokeWidth={1.5} />
      )}
    </div>
  );
}

export default function TrainWithUsCard() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("ttc");
  const current = TABS.find((t) => t.key === active)!;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e3dac9] bg-[#fdfbf7] p-5 font-figtree shadow-xs">
      {/* Heading */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-belleza text-xl font-normal text-[#1e2422]">
          Train With Us
        </h3>
        <span className="font-figtree text-xs font-semibold uppercase tracking-wider text-[#b85c00]">
          Rishikesh
        </span>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex rounded-xl bg-[#f4efe6] p-1 font-figtree">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`flex-1 rounded-lg py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              active === tab.key
                ? "bg-white text-[#1c3b2b] shadow-xs"
                : "text-stone-600 hover:text-[#1e2422]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="space-y-2.5 font-figtree">
        {current.items.slice(0, 5).map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="group flex items-center gap-3.5 rounded-2xl border border-[#e3dac9]/60 bg-white p-2.5 transition-all hover:border-[#1c3b2b]/50 hover:shadow-xs"
          >
            <Badge item={item} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="truncate font-belleza text-base font-normal text-[#1e2422] group-hover:text-[#1c3b2b] transition-colors">
                  {item.title}
                </h4>
                {item.popular && (
                  <span className="rounded-full bg-[#f4efe6] px-2 py-0.5 text-[10px] font-semibold text-[#b85c00] border border-[#b85c00]/30 shrink-0">
                    Popular
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-stone-500 mt-0.5 font-figtree">
                {item.subtitle}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-stone-400 group-hover:text-[#1c3b2b] group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}

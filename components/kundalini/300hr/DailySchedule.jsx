import { Sunrise, Sun, Sunset, Moon, ChevronRight } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";

const periods = [
  {
    icon: Sunrise,
    label: "Morning",
    time: "5:30 – 8:00 AM",
    theme: "light",
    items: [
      { time: "5:30 AM", text: "Wake Up" },
      { time: "6:00 – 6:15 AM", text: "Herbal tea at the dining hall" },
      { time: "6:15 – 6:30 AM", text: "Daily yogic purification" },
      { time: "6:30 – 7:00 AM", text: "Tratak / Om, Ganesh & Gayatri mantra chanting / prayer at the yoga hall" },
      { time: "7:00 – 8:00 AM", text: "Pranayama / yogic purification / bandha / mudra" },
    ],
  },
  {
    icon: Sun,
    label: "Mid-Day",
    time: "8:15 AM – 12:30 PM",
    theme: "mist",
    items: [
      { time: "8:15 – 9:45 AM", text: "Hatha Yoga / alignment and adjustment" },
      { time: "9:45 – 10:30 AM", text: "Breakfast and Karma Yoga" },
      { time: "10:30 – 11:30 AM", text: "Special course of gratitude for peace, happiness and all positive results" },
      { time: "11:30 AM – 12:30 PM", text: "Mantra chanting / Ayurveda" },
    ],
  },
  {
    icon: Sunset,
    label: "Afternoon",
    time: "1:00 – 4:45 PM",
    theme: "tan",
    items: [
      { time: "1:00 – 2:30 PM", text: "Lunch and rest" },
      { time: "2:30 – 3:30 PM", text: "Anatomy & physiology / Yoga Nidra / relaxation" },
      { time: "3:30 – 4:30 PM", text: "Philosophy with Siddhant — Patanjali / chakra / Kundalini / Samadhi" },
      { time: "4:30 – 4:45 PM", text: "Tea time and snacks" },
    ],
  },
  {
    icon: Moon,
    label: "Evening",
    time: "4:45 – 10:00 PM",
    theme: "dark",
    items: [
      { time: "4:45 – 5:45 PM", text: "Meditation / chakra and Kundalini yoga" },
      { time: "5:45 – 7:15 PM", text: "Ashtanga Vinyasa / alignment and adjustment" },
      { time: "7:15 – 8:00 PM", text: "Dinner" },
      { time: "10:00 PM", text: "Lights off" },
    ],
  },
];

const themeClasses = {
  light: {
    card: "bg-[#fdfbf7] border-[#e3dac9]",
    badge: "bg-[#f4efe6] text-[#1c3b2b]",
    label: "text-[#1e2422]",
    time: "text-[#b85c00]",
    text: "text-stone-700",
    divider: "border-[#e3dac9]",
  },
  mist: {
    card: "bg-[#f4efe6] border-[#e3dac9]",
    badge: "bg-[#fdfbf7] text-[#1c3b2b]",
    label: "text-[#1e2422]",
    time: "text-[#b85c00]",
    text: "text-stone-700",
    divider: "border-[#e3dac9]",
  },
  tan: {
    card: "bg-[#e3dac9] border-[#c9bda3]",
    badge: "bg-[#fdfbf7] text-[#1c3b2b]",
    label: "text-[#1e2422]",
    time: "text-[#96490a]",
    text: "text-stone-800",
    divider: "border-[#c9bda3]",
  },
  dark: {
    card: "bg-[#1c3b2b] border-[#1c3b2b]",
    badge: "bg-white/10 text-white",
    label: "text-white",
    time: "text-[#e08a3e]",
    text: "text-white/85",
    divider: "border-white/15",
  },
};

export default function KundaliniDailySchedule() {
  return (
    <section id="schedule" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>How Your Day Looks Like</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Daily Schedule of the 300-Hour Advanced Kundalini Yoga TTC
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            People always want to know what the days really feel like, so here is the shape of one — the same disciplined rhythm as our earlier courses, now sustained across 28 days of advanced practice.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
          {periods.map((period, i) => {
            const Icon = period.icon;
            const t = themeClasses[period.theme];
            return (
              <div key={period.label} className="flex items-stretch flex-1">
                <div className={`flex-1 rounded-2xl border p-5 sm:p-6 ${t.card}`}>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dashed border-current/20">
                    <span className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${t.badge}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className={`font-belleza text-lg font-normal tracking-wide ${t.label}`}>
                        {period.label}
                      </h3>
                      <span className={`text-[11px] font-bold ${t.time}`}>{period.time}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {period.items.map((item, idx) => (
                      <div
                        key={item.time}
                        className={idx !== 0 ? `pt-3 border-t border-dashed ${t.divider}` : ""}
                      >
                        <span className={`block text-xs font-bold mb-0.5 ${t.time}`}>
                          {item.time}
                        </span>
                        <p className={`text-sm leading-relaxed ${t.text}`}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {i !== periods.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center px-2 text-[#1c3b2b]/40">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center max-w-2xl mx-auto mt-10 lg:mt-12">
          <p className="text-base sm:text-lg font-belleza italic text-[#1e2422] leading-relaxed">
            By the end of the first week, the rhythm carries you rather than the other way round.
          </p>
          <p className="mt-4 text-sm text-stone-500">
            <span className="font-bold text-[#1c3b2b]">Note: </span>
            This is an overview sample of the daily schedule. The schedule provided may vary according to the practice of the practitioner.
          </p>
        </div>
      </div>
    </section>
  );
}

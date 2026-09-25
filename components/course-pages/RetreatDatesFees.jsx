"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";
import { generateRetreatDates } from "@/lib/generateRetreatDates";

// Shared Dates & Fees section for the retreat pages — dark gradient card
// with struck-through "was" pricing, split-pill "How the Payment Works"
// rows and a batches table below, matching the pattern used across
// TwoHundredHourContent.jsx and the Kundalini Dates & Fees sections.
//
// roomTiers: [{ room, was, price, reserve }]
// Dates are generated client-side from the real current date (via
// generateRetreatDates) to avoid any SSR/client hydration mismatch on this
// statically-generated site — same safe useState([]) + useEffect pattern
// used by getMonthOptions() in data/enquiryOptions.js.
export default function RetreatDatesFees({
  title,
  description,
  startDay,
  durationDays,
  count = 10,
  roomTiers,
  depositAmount,
  note,
  secondaryNote,
}) {
  const [batchDates, setBatchDates] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the system clock, an external source not available at build/SSR time
    setBatchDates(generateRetreatDates(startDay, durationDays, count));
  }, [startDay, durationDays, count]);

  return (
    <section id="dates-fees" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Batch Dates &amp; Fees</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            {title}
          </h2>
          <HeadingDivider />
          {description && (
            <p className="text-sm sm:text-base font-figtree font-medium text-stone-700 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Pricing card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#1c3b2b] via-[#142b1e] to-[#142b1e] shadow-xl p-6 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {roomTiers.map((tier) => (
              <div key={tier.room} className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
                <p className="text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-2">
                  {tier.room}
                </p>
                <div className="flex items-center justify-center gap-2 mb-1">
                  {tier.was && (
                    <span className="text-sm text-white/40 line-through">{tier.was}</span>
                  )}
                  <span className="text-2xl sm:text-3xl font-belleza font-normal text-white">
                    {tier.price}
                  </span>
                </div>
                <p className="text-[11px] text-white/50">per person</p>
              </div>
            ))}
          </div>

          {/* How the Payment Works split pills */}
          <div className="mt-8 pt-6 border-t border-dashed border-white/15">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2 text-center">
              How the Payment Works
            </span>
            <div className="flex rounded-full overflow-hidden border border-white/15 max-w-md mx-auto">
              <span className="shrink-0 px-4 py-2.5 bg-[#b85c00] text-white text-xs sm:text-[13px] font-bold whitespace-nowrap">
                {depositAmount} To Reserve
              </span>
              <span className="flex-1 px-4 py-2.5 bg-white/10 text-[#f4efe6] text-xs sm:text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-center">
                Balance On Arrival
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/book-my-yoga-in-rishikesh-india"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#b85c00] hover:bg-[#96490a] text-white text-xs sm:text-sm font-bold uppercase tracking-wide transition-all"
            >
              Enroll Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {note && (
          <p className="max-w-4xl mx-auto text-center text-stone-500 text-xs sm:text-sm mt-6">
            {note}
          </p>
        )}
        {secondaryNote && (
          <p className="max-w-4xl mx-auto text-center text-stone-500 text-xs sm:text-sm mt-2 italic">
            {secondaryNote}
          </p>
        )}

        {/* Upcoming batches table */}
        <div className="mt-10 lg:mt-14 rounded-3xl border border-[#e3dac9] bg-white p-5 sm:p-8 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <h3 className="font-belleza text-lg sm:text-xl text-[#1e2422] tracking-wide">
              Upcoming Batches
            </h3>
            <span className="text-xs text-stone-500">
              Starts the {startDay === 3 ? "3rd" : startDay} of every month
            </span>
          </div>

          {batchDates.length === 0 ? (
            <p className="text-sm text-stone-500 py-6 text-center">Loading upcoming batch dates…</p>
          ) : (
            <table className="w-full min-w-[520px] text-left border-collapse">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-[#1c3b2b] border-b border-[#e3dac9]">
                  <th className="py-2.5 pr-4 font-bold">Batch Dates</th>
                  {roomTiers.map((tier) => (
                    <th key={tier.room} className="py-2.5 pr-4 font-bold">{tier.room}</th>
                  ))}
                  <th className="py-2.5 font-bold text-right">Enroll</th>
                </tr>
              </thead>
              <tbody>
                {batchDates.map((dates) => (
                  <tr key={dates} className="border-b border-[#e3dac9]/70 last:border-b-0">
                    <td className="py-3 pr-4 text-sm font-semibold text-[#1e2422] whitespace-nowrap">
                      {dates}
                    </td>
                    {roomTiers.map((tier) => (
                      <td key={tier.room} className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">
                        {tier.price}
                      </td>
                    ))}
                    <td className="py-3 text-right whitespace-nowrap">
                      <Link
                        href="/book-my-yoga-in-rishikesh-india"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#b85c00] hover:text-[#96490a] transition-colors"
                      >
                        Enroll Now
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}

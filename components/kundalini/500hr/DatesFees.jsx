import Image from "next/image";
import Link from "next/link";
import { Clock, BarChart2, Flame, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";
import { whatsappLink } from "@/data/siteData";

const quickFacts = [
  { icon: Clock, label: "Duration", value: "About 8 Weeks · Residential" },
  { icon: BarChart2, label: "Level", value: "Beginner to Advanced" },
  { icon: Flame, label: "Focus", value: "The Complete 4-Step Kundalini Path" },
  { icon: Calendar, label: "Schedule", value: "Arrive One Day Early · Starts 3rd of Every Month" },
];

const roomTiers = [
  { room: "Triple Sharing", price: "USD 1,699", was: "USD 2,199", reserve: "USD 400", onArrival: "USD 1,299" },
  { room: "Shared Room", price: "USD 1,999", was: "USD 2,699", reserve: "USD 400", onArrival: "USD 1,599", badge: "Most Popular" },
  { room: "Private Room", price: "USD 2,299", was: "USD 2,999", reserve: "USD 400", onArrival: "USD 1,899" },
];

const batches = [
  { batch: "July–August 2026", dates: "3rd Jul - 28th Aug 2026", status: "filling" },
  { batch: "August–September 2026", dates: "3rd Aug - 28th Sep 2026", status: "filling" },
  { batch: "September–October 2026", dates: "3rd Sep - 28th Oct 2026", status: "open" },
  { batch: "October–November 2026", dates: "3rd Oct - 28th Nov 2026", status: "open" },
  { batch: "November–December 2026", dates: "3rd Nov - 28th Dec 2026", status: "open" },
  { batch: "December 2026–January 2027", dates: "3rd Dec 2026 - 28th Jan 2027", status: "open" },
  { batch: "January–February 2027", dates: "3rd Jan - 28th Feb 2027", status: "open" },
  { batch: "February–March 2027", dates: "3rd Feb - 28th Mar 2027", status: "open" },
  { batch: "March–April 2027", dates: "3rd Mar - 28th Apr 2027", status: "open" },
  { batch: "April–May 2027", dates: "3rd Apr - 28th May 2027", status: "open" },
  { batch: "May–June 2027", dates: "3rd May - 28th Jun 2027", status: "open" },
];

export default function KundaliniFiveHundredHourDatesFees() {
  return (
    <section id="dates" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <Kicker>The Course at a Glance</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            500-Hour Master Kundalini Yoga TTC in Rishikesh: Dates &amp; Fees
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            The complete Kundalini path, combined into one immersion. Everything you genuinely need for roughly eight weeks is already inside these numbers — from your room to your meals to your RYT-500 certification.
          </p>
        </div>

        {/* Image banner with floating card */}
        <div className="relative">
          <div className="relative h-56 sm:h-72 lg:h-80 w-full rounded-3xl overflow-hidden">
            <Image
              src="/images/group-tree-pose-sunrise-hilltop-rishikesh.jpg"
              alt="Group hilltop sunrise practice near the Master Kundalini Yoga TTC ashram in Rishikesh"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative w-full lg:w-[92%] max-w-5xl mx-auto -mt-10 lg:-mt-20 rounded-3xl overflow-hidden shadow-2xl border border-[#e3dac9] bg-[#fdfbf7]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_0.8fr]">
              {/* Left: Pricing */}
              <div className="bg-[#1c3b2b] p-6 sm:p-7 flex flex-col justify-center gap-5">
                {roomTiers.map((tier) => (
                  <div key={tier.room}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#e3dac9]">
                        {tier.room}
                      </span>
                      {tier.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#b85c00] text-white">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-belleza font-normal text-white">
                        {tier.price}
                      </span>
                      <span className="text-xs font-figtree font-normal text-white/40 line-through">{tier.was}</span>
                      <span className="text-xs font-figtree font-normal text-white/60">All-Inclusive</span>
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-white/50 leading-relaxed pt-2 border-t border-white/10">
                  Fees include accommodation, three sattvic meals daily and study material. A USD 400 advance reserves your seat on any room type — the balance is paid on arrival.
                </p>
              </div>

              {/* Middle: Quick facts + Payment breakdown */}
              <div className="p-6 sm:p-7 border-t lg:border-t-0 lg:border-x border-[#e3dac9]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {quickFacts.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.label}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className="w-3.5 h-3.5 text-[#b85c00]" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#b85c00]">
                            {f.label}
                          </span>
                        </div>
                        <p className="text-sm text-[#1e2422] font-semibold leading-snug">{f.value}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-5 border-t border-dashed border-[#e3dac9] space-y-4">
                  {roomTiers.map((tier) => (
                    <div key={tier.room}>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                        How the Payment Works · {tier.room}
                      </span>
                      <div className="flex rounded-full overflow-hidden border border-[#e3dac9]">
                        <span className="shrink-0 px-4 py-2.5 bg-[#b85c00] text-white text-xs sm:text-[13px] font-bold whitespace-nowrap">
                          {tier.reserve} To Reserve
                        </span>
                        <span className="flex-1 px-4 py-2.5 bg-[#f4efe6] text-[#1c3b2b] text-xs sm:text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                          {tier.onArrival} On Arrival, Nothing Else To Pay
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Photo + CTAs */}
              <div className="p-6 sm:p-7 flex flex-col items-center text-center gap-3">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#e3dac9] shadow-xs">
                  <Image
                    src="/images/rishikesh/yoga_asana.png"
                    alt="Kundalini yoga students at Siddhant School of Yoga"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <a
                  href={whatsappLink(
                    "Namaste! I have a question about the 500-Hour Master Kundalini Yoga TTC dates and fees at Siddhant School of Yoga in Rishikesh.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border-2 border-[#1c3b2b] text-[#1c3b2b] text-xs font-bold uppercase tracking-wide hover:bg-[#1c3b2b] hover:text-white transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Have a Query?
                </a>
                <Link
                  href="/book-my-yoga-in-rishikesh-india"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#b85c00] hover:bg-[#96490a] text-white text-xs font-bold uppercase tracking-wide transition-all"
                >
                  Enroll Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Begins on the 3rd of every month. There is almost always a batch coming up soon.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Batches Table */}
        <div className="mt-10 lg:mt-14 rounded-3xl border border-[#e3dac9] bg-white p-5 sm:p-8 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <h3 className="font-belleza text-lg sm:text-xl text-[#1e2422] tracking-wide">
              Upcoming Batches, July 2026 Through May 2027
            </h3>
            <span className="text-xs text-stone-500">
              Course runs the 3rd to the 28th of the following month · arrive one day early
            </span>
          </div>

          <table className="w-full min-w-[640px] text-left border-collapse">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-[#1c3b2b] border-b border-[#e3dac9]">
                <th className="py-2.5 pr-4 font-bold">Course Dates</th>
                <th className="py-2.5 pr-4 font-bold">Triple Sharing</th>
                <th className="py-2.5 pr-4 font-bold">Shared Room</th>
                <th className="py-2.5 pr-4 font-bold">Private Room</th>
                <th className="py-2.5 pr-4 font-bold">Seats</th>
                <th className="py-2.5 font-bold text-right">Enroll Now</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.batch} className="border-b border-[#e3dac9]/70 last:border-b-0">
                  <td className="py-3 pr-4 text-sm font-semibold text-[#1e2422] whitespace-nowrap">{b.dates}</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 1,699</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 1,999</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 2,299</td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        b.status === "filling"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-[#1c3b2b]/10 text-[#1c3b2b]"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${b.status === "filling" ? "bg-amber-500" : "bg-[#1c3b2b]"}`} />
                      {b.status === "filling" ? "Filling Fast" : "Seats Available"}
                    </span>
                  </td>
                  <td className="py-3 text-right whitespace-nowrap">
                    <a
                      href={whatsappLink(
                        `Namaste! I would like to register for the ${b.batch} batch (${b.dates}) of the 500-Hour Master Kundalini Yoga TTC at Siddhant School of Yoga in Rishikesh.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#b85c00] hover:text-[#96490a] transition-colors"
                    >
                      Enroll Now
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

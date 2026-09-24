import Image from "next/image";
import Link from "next/link";
import { Clock, BarChart2, Flame, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";
import { whatsappLink } from "@/data/siteData";

const quickFacts = [
  { icon: Clock, label: "Duration", value: "28 Days · Residential" },
  { icon: BarChart2, label: "Level", value: "Intermediate to Advanced (200h Graduates)" },
  { icon: Flame, label: "Focus", value: "Balancing the Chakras & Awakening Kundalini" },
  { icon: Calendar, label: "Schedule", value: "Arrive 2nd · Depart 29th · Starts 3rd of Every Month" },
];

const roomTiers = [
  { room: "Triple Sharing", price: "USD 999", was: "USD 1,599", reserve: "USD 300", onArrival: "USD 699" },
  { room: "Double / Shared Room", price: "USD 1,199", was: "USD 1,799", reserve: "USD 300", onArrival: "USD 899", badge: "Most Popular" },
  { room: "Private Room", price: "USD 1,399", was: "USD 1,999", reserve: "USD 300", onArrival: "USD 1,099" },
];

const batches = [
  { batch: "July 2026", dates: "3rd Jul - 28th Jul 2026", status: "filling" },
  { batch: "August 2026", dates: "3rd Aug - 28th Aug 2026", status: "filling" },
  { batch: "September 2026", dates: "3rd Sep - 28th Sep 2026", status: "open" },
  { batch: "October 2026", dates: "3rd Oct - 28th Oct 2026", status: "open" },
  { batch: "November 2026", dates: "3rd Nov - 28th Nov 2026", status: "open" },
  { batch: "December 2026", dates: "3rd Dec - 28th Dec 2026", status: "open" },
  { batch: "January 2027", dates: "3rd Jan - 28th Jan 2027", status: "open" },
  { batch: "February 2027", dates: "3rd Feb - 28th Feb 2027", status: "open" },
  { batch: "March 2027", dates: "3rd Mar - 28th Mar 2027", status: "open" },
  { batch: "April 2027", dates: "3rd Apr - 28th Apr 2027", status: "open" },
  { batch: "May 2027", dates: "3rd May - 28th May 2027", status: "open" },
];

export default function KundaliniDatesFees() {
  return (
    <section id="dates" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <Kicker>The Course at a Glance</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            300-Hour Advanced Kundalini Yoga TTC in Rishikesh: Dates &amp; Fees
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            The advanced step on the Kundalini path, for graduates of our 200-hour program. Everything you genuinely need for the twenty-eight days is already inside these numbers — from your room to your meals to your RYS-300 certificate.
          </p>
        </div>

        {/* Image banner with floating card */}
        <div className="relative">
          <div className="relative h-56 sm:h-72 lg:h-80 w-full rounded-3xl overflow-hidden">
            <Image
              src="/images/group-tree-pose-kunjapuri-sunrise-rishikesh.jpg"
              alt="Group sunrise practice at Kunjapuri near the Advanced Kundalini Yoga TTC ashram in Rishikesh"
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
                      <span className="text-xs text-white/40 line-through">{tier.was}</span>
                      <span className="text-xs font-figtree font-normal text-white/60">All-Inclusive</span>
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-white/50 leading-relaxed pt-2 border-t border-white/10">
                  Fees include accommodation, three sattvic meals daily and study material. A USD 300 deposit reserves your seat on any room type — the balance is paid on arrival.
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
                    alt="Advanced Kundalini yoga students at Siddhant School of Yoga"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <a
                  href={whatsappLink(
                    "Namaste! I have a question about the 300-Hour Advanced Kundalini Yoga TTC dates and fees at Siddhant School of Yoga in Rishikesh.",
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
                  Begins on the 3rd of every month. A 200-hour certificate is required to register.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Batches Table */}
        <div className="mt-10 lg:mt-14 rounded-3xl border border-[#e3dac9] bg-white p-5 sm:p-8 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <h3 className="font-belleza text-lg sm:text-xl text-[#1e2422] tracking-wide">
              Upcoming Batches, July 2026 – May 2027
            </h3>
            <span className="text-xs text-stone-500">
              Course runs the 3rd to the 28th · arrive on the 2nd
            </span>
          </div>

          <table className="w-full min-w-[680px] text-left border-collapse">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-[#1c3b2b] border-b border-[#e3dac9]">
                <th className="py-2.5 pr-4 font-bold">Course Dates</th>
                <th className="py-2.5 pr-4 font-bold">Triple Sharing</th>
                <th className="py-2.5 pr-4 font-bold">Double / Shared</th>
                <th className="py-2.5 pr-4 font-bold">Private Room</th>
                <th className="py-2.5 pr-4 font-bold">Seats</th>
                <th className="py-2.5 font-bold text-right">Enroll Now</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.batch} className="border-b border-[#e3dac9]/70 last:border-b-0">
                  <td className="py-3 pr-4 text-sm font-semibold text-[#1e2422] whitespace-nowrap">{b.dates}</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 999</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 1,199</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 1,399</td>
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
                        `Namaste! I would like to register for the ${b.batch} batch (${b.dates}) of the 300-Hour Advanced Kundalini Yoga TTC at Siddhant School of Yoga in Rishikesh.`,
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

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Minus,
  Check,
  MessageCircle,
  Quote,
  ArrowRight,
  Clock,
  BarChart2,
  Flame,
  Calendar,
  Info,
  Salad,
  Sunrise,
  Eye,
  Sparkles,
  Smile,
} from "lucide-react";
import { Kicker, HeadingDivider, ButtonLink } from "@/components/ui";
import { whatsappLink, founder } from "@/data/siteData";
import { generateRetreatDates } from "@/lib/generateRetreatDates";
import Teachers from "@/components/home/Teachers";
import ResidentialExperience from "@/components/home/ResidentialExperience";
import CourseGallerySection from "@/components/CourseGallerySection";
import RetreatDeepDive from "@/components/course-pages/RetreatDeepDive";
import RetreatLivingAtSchool from "@/components/course-pages/RetreatLivingAtSchool";
import RetreatPillarCards from "@/components/course-pages/RetreatPillarCards";

/* ---------------------------------------------------------------- */
/* Shared small building blocks                                     */
/* ---------------------------------------------------------------- */

function SectionHead({ kicker, title, description }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
      <Kicker>{kicker}</Kicker>
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
  );
}

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-[#1c3b2b] bg-[#fdfbf7] shadow-md"
          : "border-[#e3dac9] bg-white/95 hover:border-[#1c3b2b] shadow-2xs"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`text-base sm:text-lg font-belleza font-bold tracking-wide transition-colors ${
            isOpen ? "text-[#1c3b2b]" : "text-[#1F1E1D]"
          }`}
        >
          {item.q}
        </span>
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? "bg-[#1c3b2b] text-white" : "bg-[#f4efe6] text-[#77786e] hover:bg-[#1c3b2b]/20"
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-[15px] text-[#55564c] font-figtree leading-relaxed border-t border-[#1c3b2b]/10">
            {typeof item.a === "string" ? <p>{item.a}</p> : item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

function Accordion({ items, defaultOpen = 0, className = "max-w-4xl mx-auto", initialCount, columns = 1 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);
  const hasMore = initialCount && items.length > initialCount;
  const visibleItems = hasMore ? items.slice(0, initialCount) : items;
  const restItems = hasMore ? items.slice(initialCount) : [];
  const gridCols = columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1";

  return (
    <div className={className}>
      <div className={`grid ${gridCols} gap-4`}>
        {visibleItems.map((item, idx) => (
          <AccordionItem
            key={idx}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>

      {hasMore && (
        <>
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              showAll ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className={`grid ${gridCols} gap-4`}>
                {restItems.map((item, idx) => {
                  const realIdx = initialCount + idx;
                  return (
                    <AccordionItem
                      key={realIdx}
                      item={item}
                      isOpen={openIndex === realIdx}
                      onToggle={() => setOpenIndex(openIndex === realIdx ? null : realIdx)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#1c3b2b] text-[#1c3b2b] hover:bg-[#1c3b2b] hover:text-white text-sm font-semibold font-figtree transition-all duration-300 cursor-pointer"
            >
              <span>{showAll ? "Read Less" : `Read More (${restItems.length} more)`}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Data                                                              */
/* ---------------------------------------------------------------- */

const whyChooseUsPoints = [
  {
    title: "A Leading Pranayama Centre in Rishikesh",
    text: "Pranayama is the foundation of every yogic practice. We teach it in depth so it supports your asana, meditation and healing work.",
  },
  {
    title: "Yoga & Gratitude",
    text: "Gratitude brings peace, happiness and satisfaction. It's taught as a daily practice alongside the course.",
  },
  {
    title: "Small Groups of 10–15 Students",
    text: "Every student gets personal attention.",
  },
  {
    title: "Measure Your Growth",
    text: "Clear signs and parameters to track your physical, mental and intellectual progress.",
  },
  {
    title: "Hatha + Ashtanga Vinyasa",
    text: "Hatha gives stability. Ashtanga Vinyasa builds stamina and strength.",
  },
  {
    title: "Daily Classes",
    text: "Pranayama, Hatha Yoga, Meditation, Yoga Philosophy and Ashtanga Vinyasa every day.",
  },
  {
    title: "Family Environment",
    text: "Teachers and staff are practitioners themselves, and students feel at home.",
  },
];

const syllabusItems = [
  {
    q: "Day 1 — Arrival & Foundation",
    a: "Arrival and settling in, an introduction to Shatkarma (yogic purification techniques) and a gentle Hatha yoga session to ease you into the rhythm of the retreat.",
  },
  {
    q: "Day 2 — Deeper Cleansing",
    a: "A deeper pranayama and cleansing session, an Ayurvedic diet session covering the doshas and sattvic eating, and a guided meditation practice for mental clarity.",
  },
  {
    q: "Day 3 — Integration",
    a: "Integration of what you've practiced, deep relaxation and Yoga Nidra, and a personal detox plan to take home so the reset continues after you leave.",
  },
];

const whatsIncludeTabs = [
  {
    label: "What's Included",
    items: [
      "Residential stay for the full retreat",
      "Course completion certificate",
      "Shared or private accommodation",
      "Attached bathroom with 24-hour hot water",
      "3 healthy vegetarian meals daily",
      "Herbal tea 2–3 times daily",
      "Filtered water",
      "Free Wi-Fi",
      "Yoga mat",
      "Neti pot and rubber neti",
      "Rudraksha mala",
      "Yoga bag",
      "Study materials, notebook and pen",
      "A short excursion trip",
      "Pickup from Dehradun airport",
      "One Ayurvedic massage",
    ],
  },
  {
    label: "What's Excluded",
    items: ["Flights", "Visa fees", "Personal expenses", "Travel insurance"],
  },
  {
    label: "What To Bring",
    items: [
      "Comfortable yoga clothing",
      "Reusable water bottle",
      "Personal toiletries",
      "Light jacket",
      "Travel documents",
      "An open mind",
    ],
  },
];

const dailySchedule = [
  { icon: "⏰", time: "5:30 AM", activity: "Wake Up" },
  { icon: "☕", time: "6:00 – 6:15 AM", activity: "Herbal Tea at Dining Hall" },
  { icon: "💧", time: "6:15 – 6:30 AM", activity: "Daily Yogic Purification" },
  { icon: "🕉️", time: "6:30 – 7:00 AM", activity: "Tratak / OM Chanting / Ganesh & Gayatri Mantras / Prayer" },
  { icon: "🌬️", time: "7:00 – 8:00 AM", activity: "Pranayama / Bandha / Mudra" },
  { icon: "🧘", time: "8:15 – 9:45 AM", activity: "Hatha Yoga with Alignment" },
  { icon: "🥣", time: "9:45 – 10:30 AM", activity: "Breakfast and Karma Yoga" },
  { icon: "🙏", time: "10:30 – 11:30 AM", activity: "Gratitude Course" },
  { icon: "🌿", time: "11:30 AM – 12:30 PM", activity: "Mantra Chanting / Ayurveda" },
  { icon: "🥗", time: "1:00 – 2:30 PM", activity: "Lunch and Rest" },
  { icon: "😴", time: "2:30 – 3:30 PM", activity: "Yoga Nidra / Relaxation" },
  { icon: "📜", time: "3:30 – 4:30 PM", activity: "Philosophy with Siddhant Ji" },
  { icon: "🫖", time: "4:30 – 4:45 PM", activity: "Tea Time" },
  { icon: "🧘‍♀️", time: "4:45 – 5:45 PM", activity: "Meditation" },
  { icon: "🔥", time: "5:45 – 7:15 PM", activity: "Ashtanga Vinyasa" },
  { icon: "🍛", time: "7:15 – 8:00 PM", activity: "Dinner" },
  { icon: "🌙", time: "10:00 PM", activity: "Lights Off" },
];

const quickFacts = [
  { icon: Clock, label: "Duration", value: "3 Days · Residential" },
  { icon: BarChart2, label: "Level", value: "All Levels Welcome" },
  { icon: Flame, label: "Focus", value: "Shatkarma, Pranayama & Ayurveda" },
  { icon: Calendar, label: "Schedule", value: "Starts 3rd of Every Month" },
];

// Note to school owner: these are reasonable placeholder rates scaled down
// from the 7-day retreat for a 3-day stay — please confirm final pricing.
const roomTiers = [
  { room: "Triple Sharing", price: "USD 129", reserve: "USD 100", onArrival: "USD 29" },
  { room: "Double / Shared Room", price: "USD 179", reserve: "USD 100", onArrival: "USD 79", badge: "Most Popular" },
  { room: "Private Room", price: "USD 229", reserve: "USD 100", onArrival: "USD 129" },
];

const pageFaqs = [
  {
    q: "Is the school certified?",
    a: "Yes, Siddhant School of Yoga is a Registered Yoga School with Yoga Alliance USA (RYS-200, RYS-300, RYS-500). This short retreat is not a teacher training, so it awards a course completion certificate rather than a Yoga Alliance teaching certificate.",
  },
  {
    q: "Is 3 days enough to feel a real difference?",
    a: "Yes. In three focused days of Shatkarma, cleansing pranayama, gentle asana and a sattvic detox diet, most guests leave feeling noticeably lighter and calmer. For a deeper cleanse, our 7-Day Detox Retreat lets you go further.",
  },
  {
    q: "Who can join?",
    a: "Anyone with the right attitude toward learning — good physical health, an open mind, full attendance, a vegetarian diet during the course, no alcohol, drugs or smoking, basic English, an age between 18–60, no surgery in the last year, and no children accompanying you.",
  },
  {
    q: "What documents do I need?",
    a: "Two colour photocopies of your passport plus the original, two passport photos, and details of your visa expiry.",
  },
  {
    q: "Do I need a visa?",
    a: "Yes, an Indian tourist e-visa is required. We recommend arranging travel insurance as well.",
  },
  {
    q: "What happens on arrival?",
    a: "Arrive and settle in, complete your registration and pay the balance, then take a short tour of the yoga hall and dining area before your first session.",
  },
  {
    q: "What should I bring?",
    a: "Passport photos, your phone and charger, a debit card, seasonal and yoga clothing, comfortable shoes, a travel towel, and a first-aid kit with any personal medication. Leave valuables at home.",
  },
  {
    q: "What is the refund policy?",
    a: "The advance/registration deposit is non-refundable. In a genuine emergency you can postpone to another scheduled batch within the same year by emailing us the reason. Cancellations are accepted by email at no extra charge, but the deposit is not refunded.",
  },
];

/* ---------------------------------------------------------------- */
/* Dates & Fees section                                              */
/* ---------------------------------------------------------------- */

function DatesFeesSection() {
  const [batchLabels, setBatchLabels] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the system clock, an external source not available at build/SSR time
    setBatchLabels(generateRetreatDates(3, 3, 10));
  }, []);

  return (
    <section id="dates-fees" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <Kicker>The Retreat at a Glance</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            3-Day Detox Retreat in Rishikesh: Dates &amp; Fees
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            Everything you need for a short, powerful reset is already inside these numbers — from your room to your meals to your certificate.
          </p>
        </div>

        <div className="relative">
          <div className="relative h-56 sm:h-72 lg:h-80 w-full rounded-3xl overflow-hidden">
            <Image
              src="/images/warrior-pose-riverside-rocks.jpg"
              alt="Warrior pose practice on the riverside rocks in Rishikesh"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative w-full lg:w-[92%] max-w-5xl mx-auto -mt-10 lg:-mt-20 rounded-3xl overflow-hidden shadow-2xl border border-[#e3dac9] bg-[#fdfbf7]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_0.8fr]">
              <div className="bg-[#1c3b2b] p-6 sm:p-7 flex flex-col justify-center gap-5">
                {roomTiers.map((tier) => (
                  <div key={tier.room}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#e3dac9]">{tier.room}</span>
                      {tier.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#b85c00] text-white">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-2xl sm:text-3xl font-belleza font-normal text-white">
                      {tier.price}
                      <span className="text-xs font-figtree font-normal text-white/60 ml-1.5">All-Inclusive</span>
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-white/50 leading-relaxed pt-2 border-t border-white/10">
                  Fees include accommodation, three sattvic meals daily and study material. A USD 100 registration fee reserves your seat — the balance is paid on arrival.
                </p>
              </div>

              <div className="p-6 sm:p-7 border-t lg:border-t-0 lg:border-x border-[#e3dac9]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {quickFacts.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.label}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className="w-3.5 h-3.5 text-[#b85c00]" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#b85c00]">{f.label}</span>
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

              <div className="p-6 sm:p-7 flex flex-col items-center text-center gap-3">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#e3dac9] shadow-xs">
                  <Image
                    src="/images/rishikesh/yoga_asana.png"
                    alt="3-Day Detox Retreat students at Siddhant School of Yoga"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <a
                  href={whatsappLink("Namaste! I have a question about the 3-Day Detox Retreat dates and fees at Siddhant School of Yoga in Rishikesh.")}
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

        {/* Comparison note pointing to the full 7-day retreat */}
        <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-[#1c3b2b]/25 bg-[#fdfbf7] px-5 sm:px-6 py-4">
          <span className="w-10 h-10 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </span>
          <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed">
            Want to go deeper? Our{" "}
            <Link href="/detox-retreat-rishikesh-india" className="font-semibold text-[#1c3b2b] underline decoration-[#1c3b2b]/30 hover:decoration-[#1c3b2b]">
              7-Day Detox Retreat
            </Link>{" "}
            covers the same practices at a slower, fuller pace — a better fit if you have more time and want a deeper cleanse.
          </p>
        </div>

        <div className="mt-10 lg:mt-14 rounded-3xl border border-[#e3dac9] bg-white p-5 sm:p-8 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <h3 className="font-belleza text-lg sm:text-xl text-[#1e2422] tracking-wide">Upcoming Batches</h3>
            <span className="text-xs text-stone-500">3-day retreat · starts the 3rd of every month</span>
          </div>

          <table className="w-full min-w-[640px] text-left border-collapse">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-[#1c3b2b] border-b border-[#e3dac9]">
                <th className="py-2.5 pr-4 font-bold">Retreat Dates</th>
                <th className="py-2.5 pr-4 font-bold">Triple Sharing</th>
                <th className="py-2.5 pr-4 font-bold">Shared Room</th>
                <th className="py-2.5 pr-4 font-bold">Private Room</th>
                <th className="py-2.5 pr-4 font-bold">Seats</th>
                <th className="py-2.5 font-bold text-right">Enroll Now</th>
              </tr>
            </thead>
            <tbody>
              {batchLabels.map((dates, i) => (
                <tr key={dates} className="border-b border-[#e3dac9]/70 last:border-b-0">
                  <td className="py-3 pr-4 text-sm font-semibold text-[#1e2422] whitespace-nowrap">{dates}</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 129</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 179</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 229</td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        i < 2 ? "bg-amber-100 text-amber-700" : "bg-[#1c3b2b]/10 text-[#1c3b2b]"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${i < 2 ? "bg-amber-500" : "bg-[#1c3b2b]"}`} />
                      {i < 2 ? "Filling Fast" : "Seats Available"}
                    </span>
                  </td>
                  <td className="py-3 text-right whitespace-nowrap">
                    <a
                      href={whatsappLink(`Namaste! I would like to enroll for the ${dates} batch of the 3-Day Detox Retreat at Siddhant School of Yoga in Rishikesh.`)}
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

/* ---------------------------------------------------------------- */
/* Main component                                                    */
/* ---------------------------------------------------------------- */

export default function ThreeDayDetoxRetreatContent() {
  return (
    <>
      {/* Overview */}
      <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-2/5 shrink-0">
              <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="w-full lg:w-3/5 text-center lg:text-left">
              <Kicker>A Quick Reset by the Ganga</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                A 3-Day Detox Retreat in Rishikesh
              </h2>
              <HeadingDivider center={false} />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Three days is all it takes to cleanse, unwind and feel like yourself again.
              </p>
              <div className="relative mt-4">
                <Quote className="w-8 h-8 text-[#1c3b2b]/20 absolute -top-3 -left-1 lg:-left-2" />
                <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium italic pl-6">
                  &ldquo;A short, powerful reset for people who can&rsquo;t take a full week.&rdquo;
                </p>
              </div>
              <p className="mt-5 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                In three days you experience the core of our Detox Retreat: yogic purification (shatkarma), cleansing pranayama, gentle asana, a sattvic detox diet and guided relaxation — designed for people who can&rsquo;t take a full week away.
              </p>
              <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                It&rsquo;s ideal as a weekend break or as a taster before the full{" "}
                <Link href="/detox-retreat-rishikesh-india" className="font-semibold text-[#1c3b2b] underline decoration-[#1c3b2b]/30 hover:decoration-[#1c3b2b]">
                  7-Day Detox Retreat
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Quick Facts Table Box */}
          <div className="w-full mt-8 lg:mt-10 rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
            <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
              3-Day Detox Retreat in Rishikesh — Quick Facts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Duration</span>
                <span className="text-stone-800 font-normal sm:text-right">3 Days &middot; Residential</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Level</span>
                <span className="text-stone-800 font-normal sm:text-right">All Levels Welcome</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Certification</span>
                <span className="text-stone-800 font-normal sm:text-right">Siddhant School of Yoga Certificate of Completion</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Lead teacher</span>
                <span className="text-stone-800 font-normal sm:text-right">Acharya Siddhant</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b md:border-b-0 border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">What&apos;s included</span>
                <span className="text-stone-800 font-normal sm:text-right">Accommodation, sattvic meals, study material</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Ideal for</span>
                <span className="text-stone-800 font-normal sm:text-right">Short breaks &amp; first-time detox seekers</span>
              </div>
            </div>
          </div>

          {/* Gallery + Video Showcase */}
          <CourseGallerySection
            className="mt-10 lg:mt-12"
            mainImage="/images/gallery_images/food-gallery3.webp"
            mainImageAlt="Sattvic detox meal served during the 3-day detox retreat in Rishikesh"
            caption="A quick reset for body and mind by the Ganga"
            videoId="6tPxEV9skT8"
            images={[
              {
                src: "/images/jala-neti-detox-retreat.jpg",
                alt: "Jala neti yogic cleansing practice during the 3-day detox retreat",
              },
              {
                src: "/images/gallery_images/food-gallery4.webp",
                alt: "Light, cleansing vegetarian food served during the retreat",
              },
              {
                src: "/images/natarajasana-dancer-pose-riverbank-rishikesh.jpg",
                alt: "Natarajasana dancer pose on the riverbank in Rishikesh",
              },
              {
                src: "/images/dancer-pose-natarajasana-riverside.jpg",
                alt: "Dancer pose practice beside the river during the detox retreat",
              },
              {
                src: "/images/prayer-salutation-riverbank-yoga-retreat-rishikesh.jpg",
                alt: "Prayer salutation pose on the riverbank at sunrise",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                alt: "Twin sharing room provided during the 3-day detox retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                alt: "Private room option for the 3-day detox retreat stay",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                alt: "Triple sharing accommodation for the short detox retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                alt: "Cozy retreat room with bed and wardrobe",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                alt: "Sattvic thali of rice, dal and raita served during the cleanse",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                alt: "Traditional banana-leaf thali for detox retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                alt: "Cleansing vegetarian lunch of pulao and sabzi",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                alt: "Fresh juice served alongside the detox lunch tray",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                alt: "Kitchen and dining hall preparing meals for the 3-day retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                alt: "Siddhant School of Yoga building where the retreat is hosted",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                alt: "Hot water shower washroom for retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                alt: "Attached bathroom in the guest accommodation",
              },
              {
                src: "/images/garudasana-eagle-pose-student-rishikesh.jpg",
                alt: "Student practicing garudasana eagle pose during the retreat",
              },
              {
                src: "/images/gomukhasana-cow-face-pose-students-rishikesh.jpg",
                alt: "Students practicing gomukhasana cow face pose",
              },
              {
                src: "/images/group-meditation-hilltop-temple-rishikesh.jpg",
                alt: "Group meditation at a hilltop temple during the retreat",
              },
              {
                src: "/images/head-to-knee-forward-bend-group-class-rishikesh.jpg",
                alt: "Group head-to-knee forward bend during detox practice",
              },
              {
                src: "/images/namaste-meditation-ganga-riverbank-yoga-retreat-rishikesh.jpg",
                alt: "Namaste meditation on the Ganga riverbank",
              },
              {
                src: "/images/seated-asana-group-practice-garden-rishikesh.jpg",
                alt: "Seated asana group practice in the garden",
              },
              {
                src: "/images/seated-spinal-twist-group-class.png",
                alt: "Group seated spinal twist during the 3-day detox retreat",
              },
              {
                src: "/images/sphinx-pose-outdoor-yoga-class-rishikesh.jpg",
                alt: "Sphinx pose practiced outdoors during the detox retreat",
              },
              {
                src: "/images/triangle-pose-group-lawn-class.jpg",
                alt: "Triangle pose group class on the lawn",
              },
              {
                src: "/images/yoga-students-ringing-bell-kunjapuri-temple-rishikesh.jpg",
                alt: "Students ringing the bell at Kunjapuri temple",
              },
              {
                src: "/images/yoga-students-sacred-tree-temple-visit-rishikesh.jpg",
                alt: "Students visiting a sacred tree temple near the ashram",
              },
              {
                src: "/images/yogi-prayer-pose-himalaya-sunrise-rishikesh.jpg",
                alt: "Yogi in prayer pose at sunrise with Himalayan views",
              },
            ]}
          />
        </div>
      </section>

      {/* Deep Dive: A Short, Real Reset */}
      <RetreatDeepDive
        kicker="A Short, Real Reset"
        title="Three Days Is Enough to Feel the Shift"
        paragraphs={[
          "You don't always have a week to spare — but three focused days of yogic purification, a clean diet and the right breathwork is enough to genuinely interrupt a sluggish routine.",
          "Think of it as a taster of the full 7-Day Detox Retreat, condensed into a weekend that still delivers a real result.",
        ]}
        image="/images/natarajasana-dancer-pose-riverbank-rishikesh.jpg"
        imageAlt="Dancer pose (Natarajasana) practice on the riverbank during the 3-day detox retreat"
        listIntro="What three focused days covers:"
        listItems={[
          { title: "Day 1 — Foundation", desc: "Arrival, an introduction to Shatkarma and a gentle Hatha session." },
          { title: "Day 2 — Deeper Cleansing", desc: "Deeper pranayama, an Ayurvedic diet session and guided meditation." },
          { title: "Day 3 — Integration", desc: "Deep relaxation, Yoga Nidra and a personal detox plan to take home." },
        ]}
        summary="Three days is a condensed version of the full detox — the same core practices, sequenced tightly, still delivering a genuine reset."
        quote="A short reset, done properly, beats a long one done half-heartedly."
        bgClassName="bg-[#f4efe6]"
      />

      {/* Living at Siddhant School of Yoga */}
      <RetreatLivingAtSchool
        asksLabel="What This Weekend Asks of You"
        asks={[
          { icon: Salad, title: "A Simpler Diet for 3 Days", desc: "Light, fresh meals for the full duration of the retreat." },
          { icon: Sunrise, title: "An Early Start Each Day", desc: "Mornings begin early to make the most of a short retreat." },
          { icon: Eye, title: "An Open Mind", desc: "Three days move quickly — full presence gets you the real benefit." },
        ]}
        givesLabel="What It Quietly Gives Back"
        gives={[
          { icon: Sparkles, title: "A Genuinely Lighter Body", desc: "A real, physical shift, even in just three days." },
          { icon: Smile, title: "A Calmer Starting Point", desc: "A reset for the week ahead." },
          { icon: ArrowRight, title: "A Reason to Come Back", desc: "For the full week when you're ready for a deeper reset." },
        ]}
        centerImage="/images/prayer-salutation-riverbank-yoga-retreat-rishikesh.jpg"
        centerImageAlt="Prayer salutation pose on the riverbank at sunrise during the detox retreat"
        centerBadge="Small Commitment, Real Result"
        closingQuote="Three days won't change your life. They'll show you it's possible to change it."
      />

      {/* Why Choose Us */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
            <Kicker>Why Choose Us</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Why Siddhant School of Yoga Is the Right Choice for Your 3-Day Reset
            </h2>
            <HeadingDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {whyChooseUsPoints.map((point, i) => (
              <div key={point.title} className="flex gap-3.5 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-4 sm:p-5 shadow-2xs">
                <span className="shrink-0 w-8 h-8 rounded-lg bg-[#142b1e] text-white flex items-center justify-center text-xs font-bold font-figtree">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] leading-snug mb-1">{point.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{point.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <Image src="/logo/yoga-alliance.webp" alt="Yoga Alliance USA" width={64} height={64} className="h-14 sm:h-16 w-auto object-contain opacity-90" />
            <Image src="/logo/rys-200.webp" alt="RYS 200 Registered Yoga School" width={64} height={64} className="h-14 sm:h-16 w-auto object-contain opacity-90" />
            <Image src="/logo/rys-300.webp" alt="RYS 300 Registered Yoga School" width={64} height={64} className="h-14 sm:h-16 w-auto object-contain opacity-90" />
            <Image src="/logo/rys-500.webp" alt="RYS 500 Registered Yoga School" width={64} height={64} className="h-14 sm:h-16 w-auto object-contain opacity-90" />
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Retreat Curriculum" title="What the 3-Day Detox Retreat Covers" />
          <RetreatPillarCards
            cards={[
              { title: "Shatkarma (Purification)", subtitle: "Jala Neti · Gentle Cleansing", image: "/images/jala-neti-detox-retreat.jpg", alt: "Jala Neti yogic purification practice", text: "An introduction to yogic cleansing, scaled for a short retreat." },
              { title: "Ayurvedic Diet", subtitle: "Light Meals · Sattvic Eating", image: "/images/gallery_images/food-gallery4.webp", alt: "Sattvic vegetarian meal during the 3-day detox retreat", text: "A simple, clean diet session covering the doshas and sattvic eating." },
              { title: "Pranayama", subtitle: "Breathwork · Energy", image: "/images/pranayama-practice-by-ganga-river.jpg", alt: "Pranayama practice by the Ganga river", text: "Focused breathing sessions to support the body's natural detox process." },
              { title: "Relaxation & Integration", subtitle: "Yoga Nidra · Take-Home Plan", image: "/images/prayer-salutation-riverbank-yoga-retreat-rishikesh.jpg", alt: "Prayer salutation pose on the riverbank at sunrise", text: "Deep relaxation and a personal detox plan to continue the reset at home." },
            ]}
          />
          <Accordion items={syllabusItems} className="max-w-3xl mx-auto" />
        </div>
      </section>

      <DatesFeesSection />

      {/* Daily Schedule */}
      <section id="schedule" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center mb-8 lg:mb-10">
            <Kicker>How Your Day Looks Like</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Daily Schedule of the 3-Day Detox Retreat
            </h2>
            <HeadingDivider />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <div>
              <div className="relative rounded-2xl border border-[#e3dac9] bg-[#f4efe6] overflow-hidden shadow-2xs">
                <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#1c3b2b]">
                  <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10" />
                  <p className="w-[128px] sm:w-[160px] shrink-0 text-xs sm:text-sm font-bold uppercase tracking-wide text-white">Time</p>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white">Class</p>
                </div>
                <div className="lg:max-h-[410px] lg:overflow-y-auto scrollbar-thin">
                  {dailySchedule.map((row, i) => {
                    const isLast = i === dailySchedule.length - 1;
                    return (
                      <div
                        key={row.time + row.activity}
                        className={`flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3.5 sm:py-4 ${
                          i !== 0 ? "border-t border-[#e3dac9]/60" : ""
                        } ${isLast ? "bg-[#fdf6ec]" : i % 2 === 0 ? "bg-[#fdfbf7]" : "bg-[#f4efe6]"}`}
                      >
                        <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1c3b2b]/10 flex items-center justify-center text-base sm:text-lg">
                          {row.icon}
                        </span>
                        <p className={`w-[128px] sm:w-[160px] shrink-0 text-xs sm:text-sm font-bold ${isLast ? "text-amber-700" : "text-[#1c3b2b]"}`}>
                          {row.time}
                        </p>
                        <p className={`text-xs sm:text-[13px] font-semibold leading-snug ${isLast ? "text-amber-700" : "text-stone-700"}`}>
                          {row.activity}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="hidden lg:block pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="mt-6 rounded-2xl border border-[#e3dac9] bg-[#fdfbf7] px-5 sm:px-6 py-4 text-center">
                <p className="text-sm text-stone-700 italic">
                  <span className="font-bold not-italic text-[#1c3b2b]">Note: </span>
                  This is a sample schedule and may vary according to the practitioners&rsquo; needs.
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden shadow-xl border-4 border-white sticky top-24">
                <Image
                  src="/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg"
                  alt="Meditation practice during the 3-day detox retreat in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-lg font-belleza font-normal drop-shadow-md">A short, focused reset — nothing rushed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Inclusions */}
      <WhatsIncludedTabsSection />

      {/* Our Ashram */}
      <ResidentialExperience showSchedule={false} bgClassName="bg-[#fdfbf7]" />

      <Teachers />

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="FAQs" title="3-Day Detox Retreat — Frequently Asked Questions" />
          <Accordion items={pageFaqs} defaultOpen={null} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="max-w-5xl mx-auto text-center rounded-3xl bg-gradient-to-br from-[#1c3b2b] via-[#142b1e] to-[#142b1e] px-6 sm:px-12 py-10 sm:py-14 shadow-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-[#f4efe6] text-[11px] sm:text-xs font-semibold uppercase tracking-wide mb-4">
              Seats Fill Fast Every Month
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-white leading-[1.2] mb-3">
              Ready to Begin Your 3-Day Detox Retreat Journey?
            </h2>
            <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
              A short trip to Rishikesh, guided by Acharya Siddhant and our senior teachers, is often all it takes to feel like yourself again.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink
                href={whatsappLink("Namaste! I would like to know more about the 3-Day Detox Retreat at Siddhant School of Yoga in Rishikesh.")}
                target="_blank"
                rel="noopener noreferrer"
                variant="white"
              >
                <MessageCircle className="w-4 h-4" />
                Ask on WhatsApp
              </ButtonLink>
              <ButtonLink href="/book-my-yoga-in-rishikesh-india" variant="primary">
                <ArrowRight className="w-4 h-4" />
                Enroll Now
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WhatsIncludedTabsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = whatsIncludeTabs[activeTab];

  return (
    <section id="whats-include" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <Kicker>What&apos;s Include</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            What&apos;s Included, What&apos;s Not, and What To Bring
          </h2>
          <HeadingDivider />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {whatsIncludeTabs.map((t, i) => {
            const isActive = activeTab === i;
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-figtree font-semibold transition-all duration-300 cursor-pointer ${
                  isActive ? "bg-[#1c3b2b] text-white shadow-sm" : "bg-[#fdfbf7] border border-[#1c3b2b]/30 text-[#1c3b2b] hover:border-[#1c3b2b]"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-[#e3dac9] bg-white/70 p-5 sm:p-8 max-w-4xl mx-auto">
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-0">
            {tab.items.map((item, i) => (
              <li key={item} className={`flex items-start gap-3 py-3 ${i !== 0 ? "border-t border-dashed border-[#e3dac9]" : ""}`}>
                <Check className="w-3.5 h-3.5 text-[#1c3b2b] mt-1 shrink-0" />
                <span className="text-sm sm:text-base text-stone-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

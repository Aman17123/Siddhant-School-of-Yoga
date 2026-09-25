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
} from "lucide-react";
import { Kicker, HeadingDivider, ButtonLink } from "@/components/ui";
import { whatsappLink, founder } from "@/data/siteData";
import { generateRetreatDates } from "@/lib/generateRetreatDates";
import Teachers from "@/components/home/Teachers";
import ResidentialExperience from "@/components/home/ResidentialExperience";

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
    q: "1. The Meaning & Power of Mantra",
    a: "The meaning, use and power of mantra in daily life — understanding mantra not as mere repetition, but as a living tool for transformation.",
  },
  {
    q: "2. Traditional Mantras Taught",
    a: "Ganesh Mantra, Guru Mantra, Gayatri Mantra, Mahamrityunjaya Mantra, Universal Prayer Mantra and the Shanti (Peace) Mantra — each taught with correct pronunciation and meaning.",
  },
  {
    q: "3. The Science of Sound & Vibration",
    a: "How sound and vibration affect the body, breath and mind, and why precise pronunciation matters in traditional chanting.",
  },
  {
    q: "4. Mantra Meditation Technique",
    a: "A structured mantra meditation technique to steady the mind and deepen concentration, building on each mantra you learn.",
  },
  {
    q: "5. Chanting Practice Sessions",
    a: "Guided group chanting sessions to build confidence, correct pronunciation and a felt sense of each mantra's vibration.",
  },
  {
    q: "6. Mantra in Daily Life",
    a: "How to integrate mantra into a daily spiritual routine, so the practice continues long after you leave Rishikesh.",
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
  { icon: Clock, label: "Duration", value: "7 Days · Residential" },
  { icon: BarChart2, label: "Level", value: "All Levels Welcome" },
  { icon: Flame, label: "Focus", value: "Mantra Chanting & Meditation" },
  { icon: Calendar, label: "Schedule", value: "Starts 3rd of Every Month" },
];

const roomTiers = [
  { room: "Triple Sharing", price: "USD 199", was: "USD 299", reserve: "USD 140", onArrival: "USD 59" },
  { room: "Double / Shared Room", price: "USD 299", was: "USD 399", reserve: "USD 140", onArrival: "USD 159", badge: "Most Popular" },
  { room: "Private Room", price: "USD 399", was: "USD 499", reserve: "USD 140", onArrival: "USD 259" },
];

const pageFaqs = [
  {
    q: "Is the school certified?",
    a: "Yes, Siddhant School of Yoga is a Registered Yoga School with Yoga Alliance USA (RYS-200, RYS-300, RYS-500). This retreat is not a teacher training, so it awards a course completion certificate rather than a Yoga Alliance teaching certificate.",
  },
  {
    q: "Do I need to know Sanskrit or have a singing voice to join?",
    a: "No. Every mantra is taught step by step with correct pronunciation and meaning, and the practice is about presence and vibration, not performance. Complete beginners are very welcome.",
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
    a: "Arrive one day early, rest, complete your registration and pay the balance, then take a short tour of the yoga hall and dining area.",
  },
  {
    q: "What happens on day one?",
    a: "A morning Hatha class from 8–9 AM, breakfast, a fire ceremony at 10:30 AM, a group photo and your study materials, followed by an orientation at 3 PM.",
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
    setBatchLabels(generateRetreatDates(3, 7, 10));
  }, []);

  return (
    <section id="dates-fees" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <Kicker>The Retreat at a Glance</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Mantra Yoga &amp; Meditation Retreat in Rishikesh: Dates &amp; Fees
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            Everything you need for seven days of mantra, meditation and yoga is already inside these numbers — from your room to your meals to your certificate. Total course fee: USD 499.
          </p>
        </div>

        <div className="relative">
          <div className="relative h-56 sm:h-72 lg:h-80 w-full rounded-3xl overflow-hidden">
            <Image
              src="/images/namaste-meditation-ganga-riverbank-yoga-retreat-rishikesh.jpg"
              alt="Namaste meditation on the Ganga riverbank during the Mantra Yoga Retreat in Rishikesh"
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
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-belleza font-normal text-white">{tier.price}</span>
                      <span className="text-xs text-white/40 line-through">{tier.was}</span>
                      <span className="text-xs font-figtree font-normal text-white/60">All-Inclusive</span>
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-white/50 leading-relaxed pt-2 border-t border-white/10">
                  Fees include accommodation, three sattvic meals daily and study material. A USD 140 registration fee reserves your seat — the balance is paid on arrival.
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
                    alt="Mantra Yoga Retreat students at Siddhant School of Yoga"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <a
                  href={whatsappLink("Namaste! I have a question about the Mantra Yoga & Meditation Retreat dates and fees at Siddhant School of Yoga in Rishikesh.")}
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

        <div className="mt-10 lg:mt-14 rounded-3xl border border-[#e3dac9] bg-white p-5 sm:p-8 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <h3 className="font-belleza text-lg sm:text-xl text-[#1e2422] tracking-wide">Upcoming Batches</h3>
            <span className="text-xs text-stone-500">7-day retreat · starts the 3rd of every month</span>
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
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 199</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 299</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 399</td>
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
                      href={whatsappLink(`Namaste! I would like to enroll for the ${dates} batch of the Mantra Yoga & Meditation Retreat at Siddhant School of Yoga in Rishikesh.`)}
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

export default function MantraYogaRetreatContent() {
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
              <Kicker>About the Retreat</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                Mantra Yoga &amp; Meditation Retreat in Rishikesh
              </h2>
              <HeadingDivider center={false} />
              <div className="relative mt-4">
                <Quote className="w-8 h-8 text-[#1c3b2b]/20 absolute -top-3 -left-1 lg:-left-2" />
                <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium italic pl-6">
                  &ldquo;In the silence of the Himalayas, with the Ganga flowing beside you, every mantra brings you closer to your true self.&rdquo;
                </p>
              </div>
              <p className="mt-5 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Discover the ancient Vedic wisdom and modern healing of mantra yoga. Rishikesh, with its spiritual significance and the quiet flow of the Ganga beneath the Himalayas, is a natural place to learn mantra chanting, meditation and traditional yogic practices.
              </p>
              <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Rooted in the Vedic scriptures and supported by modern research, this retreat is a journey of spiritual growth, holistic healing and self-discovery — suited to beginners and advanced practitioners alike. The seven days follow a planned sequence toward deep inner peace, spiritual experience and a musical connection with your true self.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
            <Kicker>Why Choose Us</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Why Siddhant School of Yoga Is the Right Choice for Your Mantra Retreat
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
          <SectionHead kicker="Retreat Curriculum" title="What the Mantra Yoga & Meditation Retreat Covers" />
          <Accordion items={syllabusItems} columns={2} className="w-full" />
        </div>
      </section>

      <DatesFeesSection />

      {/* Daily Schedule */}
      <section id="schedule" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center mb-8 lg:mb-10">
            <Kicker>How Your Day Looks Like</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Daily Schedule of the Mantra Yoga &amp; Meditation Retreat
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
                  src="/images/meditation-by-ganga-river.png"
                  alt="Meditation by the Ganga river during the Mantra Yoga Retreat in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-lg font-belleza font-normal drop-shadow-md">A day rooted in sound, silence and devotion</p>
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
          <SectionHead kicker="FAQs" title="Mantra Yoga & Meditation Retreat — Frequently Asked Questions" />
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
              Ready to Begin Your Mantra Yoga Journey?
            </h2>
            <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Seven days of sacred sound and stillness by the Ganga, guided by Acharya Siddhant and our senior teachers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink
                href={whatsappLink("Namaste! I would like to know more about the Mantra Yoga & Meditation Retreat at Siddhant School of Yoga in Rishikesh.")}
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

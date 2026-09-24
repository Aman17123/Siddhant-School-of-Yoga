"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Minus,
  ChevronDown,
  Check,
  MessageCircle,
  ArrowRight,
  Wifi,
  Laptop,
  Layers,
  Home,
  Package,
  NotebookPen,
  Compass,
  Sprout,
  Award,
  ShieldCheck,
  Users,
  Calendar,
  BookOpen,
  Globe,
} from "lucide-react";
import { Kicker, HeadingDivider, ButtonLink } from "@/components/ui";
import { site, whatsappLink, founder } from "@/data/siteData";
import SectionNav from "./SectionNav";
import Teachers from "@/components/home/Teachers";
import ShortsSection from "@/components/home/ShortsSection";
import VideoSection from "@/components/home/VideoSection";

const sectionNavItems = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "schedule", label: "Schedule" },
  { id: "dates-fees", label: "Dates & Fees" },
  { id: "whats-include", label: "What's Include" },
  { id: "teachers", label: "Teachers" },
  { id: "faq", label: "FAQ" },
];

/* ---------------------------------------------------------------- */
/* Shared small building blocks (same visual language as the         */
/* residential 200-hour page)                                        */
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
            isOpen
              ? "bg-[#1c3b2b] text-white"
              : "bg-[#f4efe6] text-[#77786e] hover:bg-[#1c3b2b]/20"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <Plus className="w-4 h-4 stroke-[2.5]" />
          )}
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
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
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

const trustStats = [
  { icon: Calendar, value: "24", label: "Days of Live Online Classes" },
  { icon: BookOpen, value: "9+", label: "Subjects Covered" },
  { icon: Users, value: "10–15", label: "Small Batch Size" },
  { icon: ShieldCheck, value: "100", label: "Days Post-Course Support" },
];

const whyChooseUsPoints = [
  {
    title: "Yoga Alliance USA Registered Yoga School",
    text: "We hold an active Yoga Alliance USA registration, so your online certificate carries the same worldwide recognition as our residential one.",
  },
  {
    title: "Live, Interactive Classes — Not Pre-Recorded Videos",
    text: "Every class is streamed live with your teacher watching, correcting and answering questions in real time — not a library of videos to watch alone.",
  },
  {
    title: "Teachers Experienced in Online Teaching",
    text: "Our faculty is trained specifically in teaching yoga on camera, so instruction, cueing and corrections translate clearly through the screen.",
  },
  {
    title: "Small Groups So Teachers Can See and Correct You",
    text: "We keep online batches to 10–15 students, so your teacher can actually see your alignment and give you personal feedback, not just talk at a group.",
  },
  {
    title: "Same 200-Hour Syllabus as the Residential Course",
    text: "Nothing is shortened — you study the same asana, pranayama, philosophy, anatomy and teaching methodology curriculum taught in Rishikesh.",
  },
  {
    title: "Recordings Provided if a Class Is Missed",
    text: "Life happens — if you miss a live session, you'll receive the recording so you can catch up and stay on track with the group.",
  },
  {
    title: "100-Day Support After the Course",
    text: "Your training doesn't end on the last day — you get 100 days of continued guidance from our teaching team as you build your own practice and teaching.",
  },
];

const curriculumItems = [
  {
    q: "1. Hatha Yoga",
    a: "Slow, precise asana practice with a strong focus on alignment — the foundation you'll build every other style of teaching on, taught live with real-time correction.",
  },
  {
    q: "2. Ashtanga Vinyasa",
    a: "A dynamic, breath-synchronized flow of postures that builds strength and stamina. You'll learn the primary series sequencing and how to cue it safely online.",
  },
  {
    q: "3. Pranayama",
    a: "Classical breathing techniques — including Kapalbhati, Nadi Shodhana, Bhastrika and Bhramari — taught with attention to the subtle body, sequencing and safety.",
  },
  {
    q: "4. Meditation",
    a: "Guided practice in OM meditation, breath-awareness and chakra meditation, along with Yoga Nidra and relaxation techniques you can teach to future students.",
  },
  {
    q: "5. Anatomy & Physiology",
    a: "How bones, muscles, breath and the nervous system work together during asana practice, so you can teach safely and explain the 'why' behind every posture.",
  },
  {
    q: "6. Yoga Philosophy",
    a: "The Eight Limbs of Yoga, the Panch Kosha theory and Patanjali's Yoga Sutras, taught live by Acharya Siddhant to give your practice real depth and context.",
  },
  {
    q: "7. Teaching Skills",
    a: "Class sequencing, cueing, voice modulation and how to hold a class's energy — with supervised online teaching practice and direct feedback from your teachers.",
  },
  {
    q: "8. Mantra Chanting",
    a: "The science of sound and proper pronunciation of classical mantras — Ganesh, Guru, Gayatri, Mahamrityunjaya and Shanti mantras among them.",
  },
  {
    q: "9. Basic Ayurveda",
    a: "An introduction to the three Doshas, body constitution and how Ayurvedic principles complement a daily yoga practice.",
  },
];

const whoShouldJoin = [
  {
    icon: Globe,
    title: "Can't Travel to India Right Now",
    text: "You want the full 200-hour certification but travel isn't possible at the moment — the online course brings the same training to you.",
  },
  {
    icon: Compass,
    title: "In a Different Time Zone",
    text: "You're willing to attend live classes where your schedule allows, or catch up through recordings when the timing doesn't line up.",
  },
  {
    icon: Sprout,
    title: "Beginners Learning From Home",
    text: "You want to build a real foundation from home first, before ever deciding whether to commit to a residential training in Rishikesh.",
  },
];

const liveClassSchedule = [
  { time: "06:00 – 06:30 AM", activity: "Shatkarma and mantra chanting (live)" },
  { time: "06:30 – 07:30 AM", activity: "Pranayama, bandha and mudra (live)" },
  { time: "07:30 – 09:00 AM", activity: "Hatha yoga with alignment (live)" },
  { time: "09:00 – 10:00 AM", activity: "Break" },
  { time: "10:00 – 11:00 AM", activity: "Gratitude course / Ayurveda (live)" },
  { time: "11:00 AM – 12:00 PM", activity: "Anatomy and physiology (recorded + Q&A)" },
  { time: "12:00 – 04:00 PM", activity: "Break and self-study" },
  { time: "04:00 – 05:00 PM", activity: "Philosophy with Siddhant (live)" },
  { time: "05:00 – 06:00 PM", activity: "Meditation / Yoga Nidra (live)" },
  { time: "06:00 – 07:30 PM", activity: "Ashtanga Vinyasa (live)" },
];

const requirementsItems = [
  { icon: Wifi, title: "Stable Internet Connection", text: "A reliable connection is essential for uninterrupted live classes." },
  { icon: Laptop, title: "Laptop or Tablet With a Camera", text: "So your teacher can see and correct your practice in real time." },
  { icon: Layers, title: "A Yoga Mat", text: "Your own mat for daily asana, pranayama and meditation practice." },
  { icon: Home, title: "A Quiet Space With Room to Move", text: "Enough clear floor space to move freely through postures safely." },
  { icon: Package, title: "A Cushion or Block", text: "Useful for seated practice, pranayama and meditation sessions." },
  { icon: NotebookPen, title: "A Notebook", text: "For notes on philosophy, anatomy and teaching methodology." },
];

const guidelinesPoints = [
  { title: "Join Every Class on Time", text: "Punctual attendance keeps you in step with your batch and your teacher's sequencing." },
  { title: "Keep Your Camera On", text: "Camera on during practical classes so your teacher can see and correct your alignment." },
  { title: "Wear Comfortable, Modest Clothing", text: "Something you can move freely in, appropriate for a shared video class." },
  { title: "Practise in a Safe, Clear Space", text: "Make sure your practice area is free of obstacles before each class begins." },
  { title: "Tell Your Teacher About Any Injury", text: "Share any injury or health condition beforehand so classes can be modified safely for you." },
  { title: "Recordings Are for Personal Use Only", text: "Class recordings must not be shared or redistributed outside your own study." },
];

const whatsIncludedItems = [
  "24 days of live online classes on Zoom",
  "200-Hour Yoga Alliance USA certificate after assessment",
  "Digital course manual (PDF) and extra video material",
  "Class recordings for every live session",
  "A free bonus Online Meditation for Beginners course (worth USD 199)",
  "A private WhatsApp group with teachers and classmates",
  "Online teaching practice with direct feedback",
  "100-day post-course support",
  "Help with Yoga Alliance RYT-200 registration",
];

const batchDates = [
  { dates: "03 Oct – 26 Oct 2026", status: "filling" },
  { dates: "03 Nov – 26 Nov 2026", status: "filling" },
  { dates: "03 Dec – 26 Dec 2026", status: "available" },
  { dates: "03 Jan – 26 Jan 2027", status: "available" },
  { dates: "03 Feb – 26 Feb 2027", status: "available" },
  { dates: "03 Mar – 26 Mar 2027", status: "available" },
  { dates: "03 Apr – 26 Apr 2027", status: "available" },
  { dates: "03 May – 26 May 2027", status: "available" },
];

const afterCoursePoints = [
  {
    icon: Calendar,
    title: "100-Day Practice Schedule Support",
    text: "A personalized 100-day practice schedule to build lifelong discipline, so your training keeps deepening long after the course ends.",
  },
  {
    icon: MessageCircle,
    title: "Ongoing WhatsApp & Email Guidance",
    text: "Direct, ongoing guidance from the teaching team on asana, teaching queries and yoga philosophy, well beyond graduation day.",
  },
  {
    icon: Users,
    title: "Global Alumni Community",
    text: "An invitation to our global alumni community of fellow online and residential graduates teaching around the world.",
  },
  {
    icon: Award,
    title: "Yoga Alliance RYT-200 Registration Help",
    text: "Step-by-step assistance registering with Yoga Alliance as an RYT-200 once your certificate is issued.",
  },
];

const pageFaqs = [
  {
    q: "Is an online certificate valid?",
    a: "Yes. Students receive the same 200-Hour certificate as residential students and can register as an RYT-200 with Yoga Alliance.",
  },
  {
    q: "What if I miss a live class?",
    a: "Watch the recording and send your questions to the teacher. Live attendance is still needed for most classes to complete the course.",
  },
  {
    q: "I live in a different time zone. Can I join?",
    a: "Yes. Many classes are recorded, and our team helps plan your day around the live schedule — talk to us before booking.",
  },
  {
    q: "Is it suitable for beginners?",
    a: "Yes, you're guided step by step from the basics, with no prior experience required.",
  },
  {
    q: "Can I later come to Rishikesh?",
    a: "Yes. Online graduates are welcome to join the 300-Hour TTC or a retreat in Rishikesh.",
  },
];

/* ---------------------------------------------------------------- */
/* Main component                                                    */
/* ---------------------------------------------------------------- */

export default function Online200HourContent() {
  return (
    <>
      <SectionNav items={sectionNavItems} />

      {/* Trust Strip */}
      <section className="py-8 sm:py-10 bg-[#1c3b2b] font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 text-center">
            {trustStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 flex items-center justify-center mb-2">
                  <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </span>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-belleza font-normal text-white">
                  {s.value}
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wide font-semibold text-white/80 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-2/5 shrink-0">
              <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/founder/acharya-siddhant-founder-meditation-rishikesh.webp"
                  alt={founder.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="w-full lg:w-3/5 text-center lg:text-left">
              <Kicker>A Word Before You Begin</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                A Message From Acharya Siddhant
              </h2>
              <HeadingDivider center={false} />
              <p className="mt-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Distance should never stop you from becoming a real yoga teacher. I personally oversee every online batch at Siddhant School of Yoga, and our teachers are trained to teach on camera the same way we teach in the yoga hall — with attention, correction and care for every student.
              </p>
              <p className="mt-3 font-belleza text-lg text-[#1c3b2b]">
                — {founder.name}, {founder.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Course Curriculum"
            title="What the Online 200-Hour Curriculum Covers"
          />
          <Accordion items={curriculumItems} defaultOpen={null} className="w-full" columns={2} />
        </div>
      </section>

      {/* Who Should Join */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Is This for You?"
            title="Who Should Join the Online 200-Hour Yoga TTC"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {whoShouldJoin.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center gap-3 bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-5 sm:p-6"
              >
                <span className="w-11 h-11 rounded-full bg-[#1c3b2b] text-white flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5" />
                </span>
                <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
            <Kicker>Why Choose Us</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Why Siddhant School of Yoga Is the Right Choice for Your Online 200-Hour YTTC
            </h2>
            <HeadingDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {whyChooseUsPoints.map((point, i) => (
              <div
                key={point.title}
                className="flex gap-3.5 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-4 sm:p-5 shadow-2xs"
              >
                <span className="shrink-0 w-8 h-8 rounded-lg bg-[#142b1e] text-white flex items-center justify-center text-xs font-bold font-figtree">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] leading-snug mb-1">
                    {point.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{point.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <Image
              src="/logo/yoga-alliance.webp"
              alt="Yoga Alliance USA"
              width={64}
              height={64}
              className="h-14 sm:h-16 w-auto object-contain opacity-90"
            />
            <Image
              src="/logo/rys-200.webp"
              alt="RYS 200 Registered Yoga School"
              width={64}
              height={64}
              className="h-14 sm:h-16 w-auto object-contain opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Live Class Schedule */}
      <section id="schedule" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center mb-8 lg:mb-10">
            <Kicker>How Your Day Looks Like</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Live Class Schedule (Indian Standard Time)
            </h2>
            <HeadingDivider />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
            <div>
              <div className="relative rounded-2xl border border-[#e3dac9] bg-[#fdfbf7] overflow-hidden shadow-2xs">
                <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#1c3b2b]">
                  <p className="w-[128px] sm:w-[160px] shrink-0 text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                    Time (IST)
                  </p>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                    Class
                  </p>
                </div>
                <div>
                  {liveClassSchedule.map((row, i) => (
                    <div
                      key={row.time}
                      className={`flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3.5 sm:py-4 ${
                        i !== 0 ? "border-t border-[#e3dac9]/60" : ""
                      } ${i % 2 === 0 ? "bg-[#f4efe6]/40" : "bg-[#fdfbf7]"}`}
                    >
                      <p className="w-[128px] sm:w-[160px] shrink-0 text-xs sm:text-sm font-bold text-[#1c3b2b]">
                        {row.time}
                      </p>
                      <p className="text-xs sm:text-[13px] font-semibold leading-snug text-stone-700">
                        {row.activity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#e3dac9] bg-[#f4efe6] px-5 sm:px-6 py-4 text-center">
                <p className="text-sm text-stone-700 italic">
                  <span className="font-bold not-italic text-[#1c3b2b]">Note: </span>
                  Recordings are shared for students in other time zones who cannot attend every session live.
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden shadow-xl border-4 border-white sticky top-24">
                <Image
                  src="/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp"
                  alt="Live online yoga class schedule with Siddhant School of Yoga"
                  fill
                  className="object-cover"
                  sizes="420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-lg font-belleza font-normal drop-shadow-md">
                    A day rooted in discipline, practice and stillness — wherever you are
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Need */}
      <section id="requirements" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Before You Join"
            title="What You Need for the Online Course"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {requirementsItems.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5"
              >
                <span className="shrink-0 w-9 h-9 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center">
                  <item.icon className="w-4.5 h-4.5" />
                </span>
                <div>
                  <h3 className="font-belleza text-base text-[#1e2422] mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-700 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="max-w-3xl mx-auto text-center text-stone-500 text-xs sm:text-sm mt-6">
            Note: please keep your camera on during practical classes, so your teacher can see and correct you.
          </p>
        </div>
      </section>

      {/* Online Class Guidelines */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Code of Conduct"
            title="Online Class Guidelines"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {guidelinesPoints.map((point, i) => (
              <div
                key={point.title}
                className="flex gap-3.5 bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-4 sm:p-5 shadow-2xs"
              >
                <span className="shrink-0 w-8 h-8 rounded-lg bg-[#142b1e] text-white flex items-center justify-center text-xs font-bold font-figtree">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] leading-snug mb-1">
                    {point.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dates & Fees */}
      <section id="dates-fees" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
            <Kicker>Batch Dates &amp; Fees</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Upcoming Online 200-Hour Batches
            </h2>
            <HeadingDivider />
          </div>

          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="inline-flex flex-col items-center rounded-3xl border border-[#1c3b2b]/30 bg-[#fdfbf7] px-8 sm:px-12 py-6 sm:py-8 shadow-2xs">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[#b85c00] mb-1">
                Full Course Fee
              </span>
              <span className="text-4xl sm:text-5xl font-belleza text-[#1c3b2b]">USD 499</span>
              <span className="text-xs sm:text-sm text-stone-600 mt-1">One flat fee &mdash; no accommodation, no room tiers</span>
            </div>
          </div>

          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#1c3b2b] via-[#142b1e] to-[#142b1e] shadow-xl">
            {/* Desktop table */}
            <div className="hidden md:block rounded-2xl border border-white/15 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="py-4 sm:py-5 px-5 sm:px-6 text-white/80 font-figtree font-bold text-sm uppercase tracking-wide">Batch Dates</th>
                    <th className="py-4 sm:py-5 px-5 sm:px-6 text-white/80 font-figtree font-bold text-sm uppercase tracking-wide">Fee</th>
                    <th className="py-4 sm:py-5 px-5 sm:px-6 text-white/80 font-figtree font-bold text-sm uppercase tracking-wide">Status</th>
                    <th className="py-4 sm:py-5 px-5 sm:px-6" />
                  </tr>
                </thead>
                <tbody>
                  {batchDates.map((b, i) => (
                    <tr key={b.dates} className={`border-t border-white/10 ${i % 2 === 0 ? "bg-white/5" : ""}`}>
                      <td className="py-4 sm:py-5 px-5 sm:px-6 text-white font-belleza text-base">{b.dates}</td>
                      <td className="py-4 sm:py-5 px-5 sm:px-6 text-[#f4efe6] text-sm font-bold">USD 499</td>
                      <td className="py-4 sm:py-5 px-5 sm:px-6">
                        {b.status === "filling" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-[11px] font-semibold whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            Filling Fast
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4efe6]/15 text-[#f4efe6] text-[11px] font-semibold whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f4efe6]" />
                            Seats Available
                          </span>
                        )}
                      </td>
                      <td className="py-4 sm:py-5 px-5 sm:px-6">
                        <Link
                          href="/book-my-yoga-in-rishikesh-india"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#f4efe6] transition-colors whitespace-nowrap"
                        >
                          Enroll Now
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3 p-3">
              {batchDates.map((b) => (
                <div key={b.dates} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-belleza text-base text-white">{b.dates}</h3>
                    {b.status === "filling" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-semibold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Filling Fast
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4efe6]/15 text-[#f4efe6] text-[10px] font-semibold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f4efe6]" />
                        Seats Available
                      </span>
                    )}
                  </div>
                  <p className="text-[#f4efe6] text-lg font-bold mb-3">USD 499</p>
                  <Link
                    href="/book-my-yoga-in-rishikesh-india"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-[#b85c00] text-white text-xs font-semibold"
                  >
                    Enroll Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <p className="max-w-4xl mx-auto text-center text-stone-500 text-xs sm:text-sm mt-6">
            Pay in full, or pay a USD 100 deposit to reserve your seat with the balance due before the course starts. Payment can be made by card, PayPal or bank transfer. The fee is non-refundable, but can be moved to a future online batch within 12 months, or transferred to a friend.
          </p>
        </div>
      </section>

      {/* Early Bird CTA */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="max-w-5xl mx-auto text-center rounded-3xl bg-gradient-to-br from-[#1c3b2b] via-[#142b1e] to-[#142b1e] px-6 sm:px-12 py-10 sm:py-14 shadow-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-[#f4efe6] text-[11px] sm:text-xs font-semibold uppercase tracking-wide mb-4">
              Early Bird Discount Available
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-white leading-[1.2] mb-3">
              Ready to Begin Your Online Yoga Teacher Journey?
            </h2>
            <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Seats are limited to keep our live batches small and personal. Book early to lock in the early bird discount and secure your place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink
                href={whatsappLink(
                  "Namaste! I would like to ask about the early bird discount for the Online 200-Hour Yoga TTC at Siddhant School of Yoga.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="white"
              >
                <MessageCircle className="w-4 h-4" />
                Ask Discount on WhatsApp
              </ButtonLink>
              <ButtonLink href="/book-my-yoga-in-rishikesh-india" variant="primary">
                <ArrowRight className="w-4 h-4" />
                Enroll Now
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section id="whats-include" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
            <Kicker>What's Include</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Everything Included in the Online 200-Hour Course
            </h2>
            <HeadingDivider />
          </div>

          <div className="max-w-3xl mx-auto rounded-3xl border border-[#e3dac9] bg-white/70 p-5 sm:p-8">
            <ul className="space-y-0">
              {whatsIncludedItems.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 py-3 ${
                    i !== 0 ? "border-t border-dashed border-[#e3dac9]" : ""
                  }`}
                >
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span className="text-sm sm:text-base text-stone-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* After The Course */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Beyond Graduation"
            title="What Happens After the Course"
            description="Your journey doesn't end on the last live class — we stay with you for 100 days and beyond, and welcome you back to Rishikesh whenever you're ready."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {afterCoursePoints.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-3 bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-5"
              >
                <span className="shrink-0 w-9 h-9 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5" />
                </span>
                <div>
                  <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] mb-1">{title}</h3>
                  <p className="text-sm text-stone-700 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="max-w-3xl mx-auto text-center text-stone-500 text-xs sm:text-sm mt-6">
            Online graduates are always welcome to later join our residential 300-Hour TTC or a retreat in Rishikesh.
          </p>
        </div>
      </section>

      <div id="teachers" className="scroll-mt-28">
        <Teachers />
      </div>

      <ShortsSection />

      <VideoSection />

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="FAQs"
            title="Online 200-Hour Yoga TTC — Frequently Asked Questions"
          />
          <Accordion items={pageFaqs} defaultOpen={null} />
        </div>
      </section>

      {/* Final CTA / Contact */}
      <section id="contact" className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="max-w-4xl mx-auto text-center rounded-3xl border border-[#1c3b2b]/30 bg-[#fdfbf7] px-6 sm:px-12 py-10 sm:py-14 shadow-2xs">
            <Kicker>Start Today</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-[#1e2422] leading-[1.2] mb-3">
              Start Your Yoga Teacher Journey From Home Today
            </h2>
            <p className="text-stone-700 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Join the next live batch and learn authentic yoga with Siddhant School of Yoga, wherever you are in the world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink
                href={whatsappLink(
                  "Namaste! I'd like to know more about the Online 200-Hour Yoga TTC.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </ButtonLink>
              <ButtonLink href="/book-my-yoga-in-rishikesh-india" variant="primary">
                <ArrowRight className="w-4 h-4" />
                Enroll Now
              </ButtonLink>
            </div>
            <p className="mt-6 text-xs text-stone-500">
              Prefer email? Write to us at{" "}
              <a href={`mailto:${site.email}`} className="text-[#1c3b2b] font-semibold hover:underline">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

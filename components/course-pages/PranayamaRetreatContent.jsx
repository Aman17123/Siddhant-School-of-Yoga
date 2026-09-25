"use client";

import { Sprout, Wind, Award, Compass } from "lucide-react";
import { SectionHead, Accordion, SylList } from "@/components/course-pages/RetreatUI";
import ExpandingPanels from "@/components/course-pages/ExpandingPanels";
import RetreatWhyChooseUs from "@/components/course-pages/RetreatWhyChooseUs";
import RetreatDatesFees from "@/components/course-pages/RetreatDatesFees";
import RetreatDailySchedule from "@/components/course-pages/RetreatDailySchedule";
import RetreatWhatsInclude from "@/components/course-pages/RetreatWhatsInclude";
import RetreatEnquirySteps from "@/components/course-pages/RetreatEnquirySteps";
import RetreatFaq from "@/components/course-pages/RetreatFaq";
import RetreatFinalCta from "@/components/course-pages/RetreatFinalCta";
import ResidentialExperience from "@/components/home/ResidentialExperience";
import Teachers from "@/components/home/Teachers";

function SylGroup({ label, text }) {
  return (
    <p className="mb-2 last:mb-0">
      <span className="font-semibold text-[#1c3b2b]">{label}: </span>
      {text}
    </p>
  );
}

const whoShouldJoin = [
  {
    icon: Sprout,
    title: "Complete Beginners",
    text: "New to breathwork and want a safe, structured introduction to pranayama, bandha and mudra under close guidance.",
    image: "/images/seated-pranayama-yoga-class-garden-rishikesh.jpg",
    alt: "Beginner pranayama class in a garden setting in Rishikesh",
  },
  {
    icon: Wind,
    title: "Home Practitioners",
    text: "Yogis who already do a few breathing exercises on their own and want to learn the traditional forms properly, with precautions in place.",
    image: "/images/pranayama-practice-by-ganga-river.jpg",
    alt: "Home practitioner deepening pranayama technique by the Ganges in Rishikesh",
  },
  {
    icon: Award,
    title: "Future Yoga Teachers",
    text: "Anyone planning a yoga teacher training who wants pranayama to be a real strength rather than an afterthought.",
    image: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
    alt: "Future yoga teacher practicing Gyan Mudra meditation on a hilltop in Rishikesh",
  },
  {
    icon: Compass,
    title: "People Seeking Balance",
    text: "Those feeling low on energy, anxious or scattered — using seven days in Rishikesh to correct their breathing pattern and steady the mind.",
    image: "/images/meditation-by-ganga-river.png",
    alt: "Person finding balance through meditation by the Ganges river in Rishikesh",
  },
];

const syllabusItems = [
  {
    q: "1. Pranayama — Foundational Concepts",
    a: (
      <SylGroup
        label="The five Koshas, seven chakras and Nadis"
        text="Understanding the five Koshas (sheaths), the seven chakras and the Nadis (energy channels) that pranayama practice works with, before moving into technique."
      />
    ),
  },
  {
    q: "2. Types of Pranayama",
    a: (
      <SylList
        items={[
          "Kapalbhati",
          "Surya Bhedi Pranayama",
          "Chandra Bhedi Pranayama",
          "Nadi Shodhana (alternate nostril breathing)",
          "Bhastrika",
          "Bhramari Pranayama",
          "Ujjayi Pranayama",
          "Sheetali Pranayama",
          "Sheetkari Pranayama",
        ]}
      />
    ),
  },
  {
    q: "3. Precautions & Teaching Methodology",
    a: (
      <SylList
        items={[
          "Rules, regulations & precautions for safe practice",
          "Who should avoid or modify each technique",
          "Sequencing pranayama within a class",
          "Teaching methodology for pranayama",
        ]}
      />
    ),
  },
  {
    q: "4. Bandha (Yogic Locks)",
    a: <SylList items={["Mula Bandha (root lock)", "Uddiyana Bandha (abdominal lock)", "Jalandhara Bandha (throat lock)", "Maha Bandha (great lock)"]} />,
  },
  {
    q: "5. Mudra (Yogic Gestures)",
    a: <SylList items={["Jnana Mudra", "Chin Mudra", "Bhairav Mudra", "Bhairavi Mudra", "Nasikagra Mudra", "Ashwani Mudra"]} />,
  },
];

const roomTiers = [
  { room: "Triple Sharing", was: "USD 299", price: "USD 199" },
  { room: "Double Room", was: "USD 399", price: "USD 299" },
  { room: "Private Room", was: "USD 499", price: "USD 399" },
];

const pageFaqs = [
  {
    q: "Is breathing exercise the same as pranayama?",
    a: "No. Breathing exercises alone aren't pranayama. On this retreat you learn pranayama the traditional way — different breathing forms, the bandhas (locks) and mudras (gestures), each with the precautions needed for safe practice.",
  },
  {
    q: "What is the goal of this retreat?",
    a: "To correct your breathing pattern and raise your energy level, using yoga as the base and pranayama as the spine of the whole practice.",
  },
];

export default function PranayamaRetreatContent() {
  return (
    <>
      {/* Overview */}
      <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="About This Retreat" title="Yoga Is the Base. Pranayama Is the Spine." />
          <div className="max-w-3xl mx-auto space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium text-center">
            <p>
              Yoga and pranayama together are a complete path to health. This Yoga &amp; Pranayama Retreat gives good physical health, a balanced mind and real spiritual growth. Yoga is the base of all yogic practices, and pranayama is the spine of every yogic subject — this retreat puts pranayama first, supported by yoga.
            </p>
            <p>
              Breathing exercises alone aren&apos;t pranayama. On this retreat you learn pranayama the traditional way, step by step: different breathing forms, the bandhas (locks) and mudras (gestures) for different purposes, with all the precautions needed for safe practice. The goal is to correct your breathing pattern and raise your energy level.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Syllabus" title="What the Pranayama Retreat Covers" />
          <Accordion items={syllabusItems} defaultOpen={null} className="w-full" columns={2} />
        </div>
      </section>

      <ExpandingPanels
        id="who-should-join"
        kicker="Is This for You?"
        title="Who Should Join the Pranayama Retreat"
        items={whoShouldJoin}
        bgClassName="bg-[#fdfbf7]"
      />

      <RetreatWhyChooseUs title="Why Siddhant School of Yoga Is the Right Choice" />

      <RetreatDatesFees
        title="Upcoming Pranayama Retreat Batches"
        description="Seven days, starting on the 3rd of every month. Everything you need is already included."
        startDay={3}
        durationDays={7}
        count={10}
        roomTiers={roomTiers}
        depositAmount="USD 140"
        note="Fees include accommodation, three vegetarian meals daily, study material and your completion certificate. A USD 140 registration deposit secures your seat; the balance is payable on arrival. Airfare not included."
      />

      <RetreatDailySchedule title="Daily Schedule of the Pranayama Retreat" bgClassName="bg-[#f4efe6]" />

      <RetreatWhatsInclude bgClassName="bg-[#fdfbf7]" />

      <ResidentialExperience showSchedule={false} />

      <RetreatEnquirySteps bgClassName="bg-[#fdfbf7]" />

      <Teachers />

      <RetreatFaq
        title="Pranayama Retreat — Frequently Asked Questions"
        pageFaqs={pageFaqs}
        bgClassName="bg-[#fdfbf7]"
      />

      <RetreatFinalCta retreatName="Pranayama Retreat" bgClassName="bg-[#f4efe6]" />
    </>
  );
}

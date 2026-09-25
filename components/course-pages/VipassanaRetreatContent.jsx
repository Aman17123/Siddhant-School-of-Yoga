"use client";

import { VolumeX, PhoneOff, Eye, Wind } from "lucide-react";
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

const silenceGuidelines = [
  {
    icon: VolumeX,
    title: "No Speaking",
    text: "Maintain silence throughout the retreat except in specific instructional sessions, so the mind can settle without the noise of conversation.",
    image: "/images/vipassana-meditation-cave-retreat.jpg",
    alt: "Silent Vipassana meditation retreat setting in Rishikesh",
  },
  {
    icon: PhoneOff,
    title: "No Phones",
    text: "Devices are set aside to remove distraction, so your attention can stay with the breath and body rather than the outside world.",
    image: "/images/meditation-class-indoor.jpg",
    alt: "Indoor meditation class free of phones and distractions in Rishikesh",
  },
  {
    icon: Eye,
    title: "Eyes Lowered",
    text: "A soft, inward gaze supports the practice, keeping the senses turned toward the self rather than the surroundings.",
    image: "/images/lotus-pose-meditation-rocky-riverbank-rishikesh.jpg",
    alt: "Lotus pose meditation with lowered gaze on the riverbank in Rishikesh",
  },
  {
    icon: Wind,
    title: "Observe, Don't React",
    text: "Notice sensations and thoughts without judgment or response — the central skill of Vipassana, practiced moment to moment.",
    image: "/images/sunrise-meditation-pose-rishikesh.png",
    alt: "Sunrise meditation practicing equanimity in Rishikesh",
  },
];

const syllabusItems = [
  {
    q: "1. Two Daily Yoga Sessions",
    a: (
      <SylGroup
        label="Hatha + Ashtanga elements"
        text="Two yoga sessions a day, blending steady Hatha alignment with dynamic Ashtanga elements, to prepare the body for long periods of stillness in meditation."
      />
    ),
  },
  {
    q: "2. Two Daily Vipassana Sessions",
    a: (
      <SylGroup
        label="Anapana to full Vipassana technique"
        text="Beginning with Anapana (breath awareness) and building toward the full Vipassana technique of scanning bodily sensations with equanimity, in two guided sessions each day."
      />
    ),
  },
  {
    q: "3. Four Hours of Daily Silence",
    a: (
      <SylGroup
        label="Noble Silence (Mouna)"
        text="Four hours of daily silence practice woven through the schedule, giving the mind real space to settle between active sessions."
      />
    ),
  },
  {
    q: "4. Supporting Pranayama & Meditation",
    a: <SylList items={["Yogic breathing and pranayama", "Chakra and Kundalini meditation", "Mantra chanting", "Yoga Nidra / relaxation"]} />,
  },
  {
    q: "5. Philosophy & Reflection",
    a: (
      <SylGroup
        label="Daily philosophy with Siddhant Ji"
        text="Sessions on Patanjali, chakra science, Kundalini and Samadhi, connecting the silent inner work to the wider yogic tradition."
      />
    ),
  },
];

const roomTiers = [
  { room: "Triple Sharing", was: "USD 299", price: "USD 199" },
  { room: "Double Room", was: "USD 399", price: "USD 299" },
  { room: "Private Room", was: "USD 499", price: "USD 399" },
];

const pageFaqs = [
  {
    q: "What is Vipassana?",
    a: "Vipassana is a way to watch and witness the mind through the body's sensations. Rooted in ancient Buddhist practice, it is a chance to step away from distractions, calm the mind and awaken deeper awareness.",
  },
  {
    q: "Do I need meditation experience to join?",
    a: "No. The school prepares you for deep Vipassana with supporting yoga practice — each day includes two yoga sessions, two Vipassana sessions and four hours of silence practice, so beginners are guided step by step.",
  },
];

export default function VipassanaRetreatContent() {
  return (
    <>
      {/* Overview */}
      <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="About This Retreat" title="Experience Inner Silence" />
          <div className="max-w-3xl mx-auto space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium text-center">
            <p>
              Vipassana is a way to watch and witness the mind through the body&apos;s sensations. Rooted in ancient Buddhist practice, this silent retreat is a chance to step away from distractions, calm the mind and awaken deeper awareness.
            </p>
            <p>
              The school prepares you for deep Vipassana with supporting yoga practice — each day includes two yoga sessions, two Vipassana sessions and four hours of silence practice, so you practice yoga and experience meditation in its purest form.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Syllabus" title="What the Vipassana Retreat Covers" />
          <Accordion items={syllabusItems} defaultOpen={null} className="w-full" columns={2} />
        </div>
      </section>

      <ExpandingPanels
        id="silence-guidelines"
        kicker="Noble Silence"
        title="Noble Silence Guidelines"
        items={silenceGuidelines}
        bgClassName="bg-[#fdfbf7]"
      />

      <RetreatWhyChooseUs title="Why Siddhant School of Yoga Is the Right Choice" />

      <RetreatDatesFees
        title="Upcoming Vipassana Retreat Batches"
        description="Seven days, starting on the 9th of every month. Everything you need is already included."
        startDay={9}
        durationDays={7}
        count={10}
        roomTiers={roomTiers}
        depositAmount="USD 140"
        note="Fees include accommodation, three vegetarian meals daily, study material and your completion certificate. A USD 140 registration deposit secures your seat; the balance is payable on arrival. Airfare not included."
      />

      <RetreatDailySchedule title="Daily Schedule of the Vipassana Retreat" bgClassName="bg-[#f4efe6]" />

      <RetreatWhatsInclude bgClassName="bg-[#fdfbf7]" />

      <ResidentialExperience showSchedule={false} />

      <RetreatEnquirySteps bgClassName="bg-[#fdfbf7]" />

      <Teachers />

      <RetreatFaq
        title="Vipassana Retreat — Frequently Asked Questions"
        pageFaqs={pageFaqs}
        bgClassName="bg-[#fdfbf7]"
      />

      <RetreatFinalCta retreatName="Vipassana Retreat" bgClassName="bg-[#f4efe6]" />
    </>
  );
}

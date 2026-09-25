"use client";

import { Quote, Check } from "lucide-react";
import { SectionHead, Accordion, SylList } from "@/components/course-pages/RetreatUI";
import RetreatWhyChooseUs from "@/components/course-pages/RetreatWhyChooseUs";
import RetreatDatesFees from "@/components/course-pages/RetreatDatesFees";
import RetreatDailySchedule from "@/components/course-pages/RetreatDailySchedule";
import RetreatWhatsInclude from "@/components/course-pages/RetreatWhatsInclude";
import RetreatEnquirySteps from "@/components/course-pages/RetreatEnquirySteps";
import RetreatFaq from "@/components/course-pages/RetreatFaq";
import RetreatFinalCta from "@/components/course-pages/RetreatFinalCta";
import ResidentialExperience from "@/components/home/ResidentialExperience";
import Teachers from "@/components/home/Teachers";
import { founder } from "@/data/siteData";

const benefits = [
  "A strong, flexible body with better breathing, circulation and heart health",
  "Better posture and less pain",
  "A calm, relaxed, energetic mind",
  "Experience of Indian culture and rituals",
  "Breathing techniques for peace and happiness",
  "Basic asanas designed for beginners",
  "Beginner meditation practice",
  "Correct mantra chanting",
  "Gratitude as a way of life",
  "A personal practice schedule to take home",
];

const syllabusItems = [
  {
    q: "1. Yogic Purification",
    a: <SylList items={["Introduction to yogic purification", "Types of purification practices", "Why purification matters", "Benefits of purification", "Jala Neti"]} />,
  },
  {
    q: "2. Pranayama",
    a: (
      <SylList
        items={[
          "Introduction and importance of Pranayama",
          "Benefits of Pranayama",
          "Thoracic, shoulder and yogic breathing",
          "Kapalbhati",
          "Alternate nostril breathing",
          "Bhramari Pranayama",
          "Ujjayi Pranayama",
        ]}
      />
    ),
  },
  {
    q: "3. Bandha",
    a: <SylList items={["Introduction and importance of Bandha", "Mula Bandha", "Jalandhara Bandha"]} />,
  },
  {
    q: "4. Mudra",
    a: (
      <SylList
        items={[
          "Uses of Mudra",
          "Jnana Mudra",
          "Chin Mudra",
          "Bhairava Mudra",
          "Bhairavi Mudra",
          "Hridaya Mudra",
          "Nasikagra Mudra",
        ]}
      />
    ),
  },
  {
    q: "5. Meditation",
    a: (
      <SylList
        items={[
          "Definition of meditation",
          "Anapana meditation",
          "Vipassana meditation, level 1",
          "Mantra meditation",
          "Silent meditation, level 1",
        ]}
      />
    ),
  },
  {
    q: "6. Relaxation",
    a: <SylList items={["Yoga Nidra", "Yogic definition of relaxation", "Scientific definition of relaxation"]} />,
  },
  {
    q: "7. Mantra",
    a: <SylList items={["Meaning of mantra", "Use of mantra", "The power of mantra", "Mantra in daily life"]} />,
  },
  {
    q: "8. Philosophy",
    a: (
      <SylList
        items={[
          "Definition of yoga philosophy",
          "Yoga and balance",
          "The Pancha Kosha",
          "Indian culture and philosophy",
        ]}
      />
    ),
  },
  {
    q: "9. Anatomy",
    a: <SylList items={["Introduction to anatomy", "Anatomy in daily life", "The cell"]} />,
  },
  {
    q: "10. Hatha Yoga",
    a: (
      <SylList
        items={[
          "Joint-movement series",
          "Eye exercises",
          "Surya Namaskar",
          "Shavasana",
          "Tadasana",
          "Trikonasana",
          "Kati Chakrasana",
          "Janu Sirshasana",
          "Bhujangasana",
        ]}
      />
    ),
  },
  {
    q: "11. Ashtanga Vinyasa",
    a: (
      <SylList
        items={[
          "Surya Namaskar A",
          "Padangusthasana",
          "Trikonasana",
          "Virabhadrasana I & II",
          "Prasarita Padottanasana",
          "Utkatasana",
          "Dandasana",
          "Janu Sirsasana",
        ]}
      />
    ),
  },
];

const roomTiers = [
  { room: "Triple Sharing", was: "USD 299", price: "USD 199" },
  { room: "Double / Shared", was: "USD 399", price: "USD 299" },
  { room: "Private Room", was: "USD 499", price: "USD 399" },
];

const pageFaqs = [
  {
    q: "Is prior yoga experience required for the beginners course?",
    a: "No — this course is designed specifically for people who have never practiced yoga before. Every technique is taught step by step, from the ground up, with close guidance from our teachers.",
  },
  {
    q: "What is the biggest challenge for beginners, and how do you help?",
    a: "For most beginners, the real challenge isn't learning the postures — it's staying consistent once you go home. Our teachers spend time helping you build a simple, realistic practice schedule you can actually keep up with after the course ends.",
  },
  {
    q: "Is this a Yoga Alliance teacher training?",
    a: "No. This is a 7-day residential course focused on understanding and foundational practice, and it ends with a Siddhant School of Yoga course completion certificate — not a Yoga Alliance teaching certification. If you want to teach professionally, our 200-hour YTTC is the right next step.",
  },
];

export default function YogaBeginnersContent() {
  return (
    <>
      {/* Overview */}
      <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Overview" title="A Real Start to Your Yoga Journey" />
          <div className="max-w-3xl mx-auto text-sm sm:text-base text-stone-700 leading-relaxed font-medium space-y-4">
            <p>
              New to yoga? Start with the truth: yoga isn&apos;t only asana. Poses are one limb of yoga, not the whole
              of it — yoga is the inner science of discovering your true self. Patanjali&apos;s Yoga Sutras describe
              eight limbs — Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana and Samadhi — and asana is
              only the third. In this one-week residential course in Rishikesh, the yoga capital of the world,
              you&apos;ll discover what yoga really is and how it can change your whole life.
            </p>
            <p>
              The course focuses on understanding before intensity: Hatha Yoga, Ashtanga Vinyasa, Pranayama, yogic
              purification, meditation, mantra chanting, yoga philosophy and relaxation. It helps with physical
              issues like joint pain, stiffness, weakness and low energy, and mental ones like stress, tension and
              anxiety — while improving your breathing, energy and metabolism.
            </p>
            <p>
              The biggest challenge for beginners is consistency, so our teachers guide you every step of the way on
              how to keep practicing long after the course ends.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-8 relative rounded-2xl border border-[#e3dac9] bg-[#f4efe6]/60 px-6 sm:px-8 py-6">
            <Quote className="w-8 h-8 text-[#1c3b2b]/20 absolute -top-3 -left-1 sm:-left-2" />
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium italic pl-4">
              &ldquo;A yogic lifestyle, real understanding, and basic yoga practice done with consistency are the
              heart of our beginners course.&rdquo;
            </p>
            <p className="mt-3 pl-4 font-belleza text-lg text-[#1c3b2b]">— {founder.name}</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="What You'll Gain" title="Benefits of the Yoga for Beginners Retreat" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 bg-[#fdfbf7] rounded-xl border border-[#e3dac9] p-4">
                <Check className="w-4 h-4 text-[#1c3b2b] mt-0.5 shrink-0" />
                <span className="text-sm text-stone-700 leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Syllabus" title="What the Beginners Course Covers" />
          <Accordion items={syllabusItems} defaultOpen={null} className="w-full" columns={2} />
        </div>
      </section>

      <RetreatWhyChooseUs title="Why Siddhant School of Yoga Is the Right Choice for Beginners?" />

      <RetreatDatesFees
        title="Upcoming Yoga for Beginners Batches"
        description="A focused 7-day residential retreat starting on the 3rd of every month."
        startDay={3}
        durationDays={7}
        count={10}
        roomTiers={roomTiers}
        depositAmount="USD 140"
        note="Fees include accommodation, three vegetarian meals daily, study material and your completion certificate. A USD 140 registration deposit secures your seat; the balance is payable on arrival. Airfare not included."
      />

      <RetreatDailySchedule
        title="Daily Schedule of the Yoga for Beginners Retreat"
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatWhatsInclude bgClassName="bg-[#fdfbf7]" />

      <ResidentialExperience showSchedule={false} />

      <RetreatEnquirySteps bgClassName="bg-[#fdfbf7]" />

      <Teachers />

      <RetreatFaq
        title="Yoga for Beginners — Frequently Asked Questions"
        pageFaqs={pageFaqs}
        bgClassName="bg-[#fdfbf7]"
      />

      <RetreatFinalCta retreatName="Yoga for Beginners" bgClassName="bg-[#f4efe6]" />
    </>
  );
}

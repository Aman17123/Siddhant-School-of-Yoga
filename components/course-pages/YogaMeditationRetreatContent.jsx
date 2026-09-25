"use client";

import { Quote, Sprout, Compass, Target, HeartCrack } from "lucide-react";
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
import { founder } from "@/data/siteData";

const whoShouldJoin = [
  {
    icon: Sprout,
    title: "A Positive Change",
    text: "You want a positive change in your life and are ready to give yourself the time and space to make it happen.",
    image: "/images/meditation-class-garden-ganga-view-rishikesh.jpg",
    alt: "Student meditating in the garden with a Ganga view in Rishikesh",
  },
  {
    icon: Compass,
    title: "A Sense of Direction",
    text: "Life doesn't feel like it's going the way you want it to, and you're looking for real clarity, not another quick fix.",
    image: "/images/sunrise-meditation-pose-rishikesh.png",
    alt: "Student finding clarity in a sunrise meditation pose in Rishikesh",
  },
  {
    icon: Target,
    title: "Staying Focused",
    text: "You struggle to stay focused on your goals, and want practical tools — not just theory — to help you follow through.",
    image: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
    alt: "Student practicing Gyan Mudra meditation on a hilltop retreat in Rishikesh",
  },
  {
    icon: HeartCrack,
    title: "Building Consistency",
    text: "You keep missing your daily practice and find it hard to feel or express gratitude — this retreat helps make both a habit.",
    image: "/images/namaste-meditation-ganga-riverbank-yoga-retreat-rishikesh.jpg",
    alt: "Student in a namaste meditation pose on the Ganga riverbank in Rishikesh",
  },
];

const syllabusItems = [
  {
    q: "1. Hatha Yoga",
    a: <SylList items={["Joint-movement series", "Surya Namaskar", "Tadasana & Trikonasana", "Janu Sirshasana", "Bhujangasana", "Shavasana"]} />,
  },
  {
    q: "2. Ashtanga Vinyasa",
    a: <SylList items={["Surya Namaskar A", "Padangusthasana", "Virabhadrasana I & II", "Prasarita Padottanasana", "Utkatasana", "Janu Sirsasana"]} />,
  },
  {
    q: "3. Pranayama",
    a: <SylList items={["Yogic breathing", "Kapalbhati", "Alternate nostril breathing", "Bhramari Pranayama", "Ujjayi Pranayama"]} />,
  },
  {
    q: "4. Yogic Purification",
    a: <SylList items={["Introduction and necessity", "Types of purification", "Jala Neti", "Benefits of purification"]} />,
  },
  {
    q: "5. Meditation",
    a: (
      <SylList
        items={[
          "Anapana meditation",
          "Vipassana meditation, level 1",
          "Mantra meditation",
          "Silent meditation",
          "Chakra & Kundalini awareness",
        ]}
      />
    ),
  },
  {
    q: "6. Mantra Chanting",
    a: <SylList items={["Meaning and power of mantra", "Ganesh & Gayatri mantra", "Mantra in daily life"]} />,
  },
  {
    q: "7. Yoga Philosophy",
    a: <SylList items={["The Pancha Kosha", "Patanjali's Yoga Sutras", "Chakra & Kundalini", "The path to Samadhi"]} />,
  },
  {
    q: "8. Relaxation",
    a: <SylList items={["Yoga Nidra", "Full-body relaxation", "Mental relaxation practices"]} />,
  },
];

const roomTiers7Day = [
  { room: "Triple Sharing", was: "USD 299", price: "USD 199" },
  { room: "Double / Shared", was: "USD 399", price: "USD 299" },
  { room: "Private Room", was: "USD 499", price: "USD 399" },
];

const roomTiers14Day = [
  { room: "Shared Room", price: "USD 600" },
  { room: "Private Room", price: "USD 700" },
];

const pageFaqs = [
  {
    q: "Should I join the 7-day or 14-day option?",
    a: "The 7-day retreat is a focused introduction, ideal if your time is limited. The 14-day retreat gives meditation practice more time to deepen and settle, which most students find genuinely changes how the retreat feels by the second week. Message us on WhatsApp and we'll help you choose.",
  },
  {
    q: "Are the 14-day fees fixed?",
    a: "The 14-day fees shown are approximate and subject to confirmation at the time of booking — message us on WhatsApp for the exact, current rate for your dates and room type.",
  },
  {
    q: "Is this retreat only about meditation?",
    a: "No — it combines asana to care for the body, meditation techniques to calm and steady the mind, pranayama for energy, and yogic purification to detox, alongside a daily philosophy class with Siddhant Ji.",
  },
];

export default function YogaMeditationRetreatContent() {
  return (
    <>
      {/* Overview */}
      <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Overview" title="Reconnect With Yourself" />
          <div className="max-w-3xl mx-auto text-sm sm:text-base text-stone-700 leading-relaxed font-medium space-y-4">
            <p>
              A yoga retreat can change how you live and how you think. Siddhant School of Yoga offers one- and
              two-week residential retreats for anyone who wants a positive change in their life, feels life
              isn&apos;t going the way they want, struggles to stay focused on their goals, keeps missing their
              daily practice, or finds it hard to feel or express gratitude.
            </p>
            <p>
              Most human problems come from an unbalanced personality. This retreat combines asana to care for the
              body, meditation techniques to calm and steady the mind, pranayama for energy, and yogic purification
              to detox. It also covers meditation philosophy, taught by Siddhant Ji in his daily philosophy class on
              Yoga, Patanjali, Chakra, Kundalini and Samadhi.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-8 relative rounded-2xl border border-[#e3dac9] bg-[#f4efe6]/60 px-6 sm:px-8 py-6">
            <Quote className="w-8 h-8 text-[#1c3b2b]/20 absolute -top-3 -left-1 sm:-left-2" />
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium italic pl-4">
              &ldquo;Reconnect with yourself through glimpses of meditation and Samadhi.&rdquo;
            </p>
            <p className="mt-3 pl-4 font-belleza text-lg text-[#1c3b2b]">— {founder.name}</p>
          </div>
        </div>
      </section>

      <ExpandingPanels
        id="who-should-join"
        kicker="Is This for You?"
        title="This Retreat Is for You If..."
        items={whoShouldJoin}
        bgClassName="bg-[#f4efe6]"
      />

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Syllabus" title="What the Retreat Curriculum Covers" />
          <Accordion items={syllabusItems} defaultOpen={null} className="w-full" columns={2} />
        </div>
      </section>

      <RetreatWhyChooseUs title="Why Siddhant School of Yoga Is the Right Choice for This Retreat?" />

      <RetreatDatesFees
        title="Upcoming Yoga & Meditation Retreat Batches"
        description="Choose a 7-day or 14-day residential retreat, both starting on the 3rd of every month. The table below shows our primary 14-day batches."
        startDay={3}
        durationDays={14}
        count={10}
        roomTiers={roomTiers14Day}
        depositAmount="USD 140"
        note="14-day fees are approximate and subject to confirmation. Fees include accommodation, three vegetarian meals daily, study material and your completion certificate. A USD 140 registration deposit secures your seat; the balance is payable on arrival."
        secondaryNote="A 7-day option is also available — Triple USD 199, Double/Shared USD 299, Private USD 399. Message us on WhatsApp for current 7-day batch dates."
      />

      <RetreatDailySchedule
        title="Daily Schedule of the Yoga & Meditation Retreat"
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatWhatsInclude bgClassName="bg-[#fdfbf7]" />

      <ResidentialExperience showSchedule={false} />

      <RetreatEnquirySteps bgClassName="bg-[#fdfbf7]" />

      <Teachers />

      <RetreatFaq
        title="Yoga & Meditation Retreat — Frequently Asked Questions"
        pageFaqs={pageFaqs}
        bgClassName="bg-[#fdfbf7]"
      />

      <RetreatFinalCta retreatName="Yoga & Meditation Retreat" bgClassName="bg-[#f4efe6]" />
    </>
  );
}

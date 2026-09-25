"use client";

import { Quote, Clock, Briefcase, Sparkles, Sprout } from "lucide-react";
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
    icon: Clock,
    title: "Limited Time Away",
    text: "You can't take two full weeks away from work and life, but you still want a genuine, complete retreat experience.",
    image: "/images/meditation-class-garden-ganga-view-rishikesh.jpg",
    alt: "Student meditating during a short retreat in Rishikesh",
  },
  {
    icon: Briefcase,
    title: "Busy Professionals",
    text: "You're juggling a demanding schedule and need a focused reset — one week structured enough to actually change something.",
    image: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
    alt: "Busy professional practicing Gyan Mudra meditation on a Rishikesh hilltop",
  },
  {
    icon: Sprout,
    title: "Your First Retreat",
    text: "You've never done a yoga or meditation retreat before, and want a well-paced first experience without feeling rushed.",
    image: "/images/sunrise-meditation-pose-rishikesh.png",
    alt: "First-time retreat guest in a sunrise meditation pose in Rishikesh",
  },
  {
    icon: Sparkles,
    title: "A Quick, Real Reset",
    text: "You want real change in a short window — body, breath and mind, built step by step across seven focused days.",
    image: "/images/namaste-meditation-ganga-riverbank-yoga-retreat-rishikesh.jpg",
    alt: "Student in a namaste meditation pose by the Ganga during a 7-day retreat in Rishikesh",
  },
];

const syllabusItems = [
  {
    q: "1. Hatha Yoga",
    a: <SylList items={["Joint-movement series", "Surya Namaskar", "Tadasana & Trikonasana", "Bhujangasana", "Shavasana"]} />,
  },
  {
    q: "2. Pranayama",
    a: <SylList items={["Yogic breathing", "Kapalbhati", "Alternate nostril breathing", "Bhramari Pranayama"]} />,
  },
  {
    q: "3. Guided Meditation",
    a: <SylList items={["Anapana meditation", "Mantra meditation", "Silent meditation, level 1"]} />,
  },
  {
    q: "4. Mantra Chanting",
    a: <SylList items={["Meaning and power of mantra", "Ganesh & Gayatri mantra"]} />,
  },
  {
    q: "5. Yoga Philosophy",
    a: <SylList items={["The Pancha Kosha", "Patanjali's Yoga Sutras", "Chakra & Kundalini"]} />,
  },
  {
    q: "6. Relaxation",
    a: <SylList items={["Yoga Nidra", "Full-body and mental relaxation"]} />,
  },
];

const roomTiers = [
  { room: "Triple Sharing", was: "USD 299", price: "USD 199" },
  { room: "Double / Shared", was: "USD 399", price: "USD 299" },
  { room: "Private Room", was: "USD 499", price: "USD 399" },
];

const pageFaqs = [
  {
    q: "How is this different from the 14-day Yoga & Meditation Retreat?",
    a: "This is a focused, condensed one-week version, designed for people with limited time. Each day still blends Hatha Yoga, pranayama, guided meditation, mantra chanting and a philosophy class with Siddhant Ji — building step by step from body to breath to mind — just over 7 days instead of 14.",
  },
  {
    q: "Is 7 days enough for a first retreat?",
    a: "Yes. Many students choose this as their first retreat precisely because it's a complete, well-rounded experience without a two-week commitment. It's also a great way to feel the structure of our longer retreats before returning for more.",
  },
  {
    q: "Can I extend my stay after the 7 days?",
    a: "Yes, message us on WhatsApp before you arrive and we'll help you extend into the 14-day Yoga & Meditation Retreat or another program, subject to availability.",
  },
];

export default function SevenDayRetreatContent() {
  return (
    <>
      {/* Overview */}
      <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Overview" title="A Focused Week, A Real Reset" />
          <div className="max-w-3xl mx-auto text-sm sm:text-base text-stone-700 leading-relaxed font-medium space-y-4">
            <p>
              A focused one-week version of our Yoga &amp; Meditation Retreat, designed for people with limited
              time. Each day blends Hatha Yoga, pranayama, guided meditation, mantra chanting and a philosophy class
              with Siddhant Ji, building step by step from body to breath to mind.
            </p>
            <p>
              It&apos;s ideal as a first retreat, or for anyone who can&apos;t take two full weeks away from work and life but
              still wants a genuine, complete experience — residential, structured, and guided by the same teaching
              team behind every program at Siddhant School of Yoga.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-8 relative rounded-2xl border border-[#e3dac9] bg-[#f4efe6]/60 px-6 sm:px-8 py-6">
            <Quote className="w-8 h-8 text-[#1c3b2b]/20 absolute -top-3 -left-1 sm:-left-2" />
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium italic pl-4">
              &ldquo;Reconnect with yourself through glimpses of meditation and Samadhi — even in just seven
              days.&rdquo;
            </p>
            <p className="mt-3 pl-4 font-belleza text-lg text-[#1c3b2b]">— {founder.name}</p>
          </div>
        </div>
      </section>

      <ExpandingPanels
        id="who-should-join"
        kicker="Is This for You?"
        title="This 7-Day Retreat Is for You If..."
        items={whoShouldJoin}
        bgClassName="bg-[#f4efe6]"
      />

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Syllabus" title="What the 7-Day Curriculum Covers" />
          <Accordion items={syllabusItems} defaultOpen={null} className="w-full" columns={2} />
        </div>
      </section>

      <RetreatWhyChooseUs title="Why Siddhant School of Yoga Is the Right Choice for This Retreat?" />

      <RetreatDatesFees
        title="Upcoming 07-Day Retreat Batches"
        description="A 7-day, 6-night residential retreat starting on the 3rd of every month."
        startDay={3}
        durationDays={7}
        count={10}
        roomTiers={roomTiers}
        depositAmount="USD 140"
        note="Fees include accommodation, three vegetarian meals daily, study material and your completion certificate. A USD 140 registration deposit secures your seat; the balance is payable on arrival. Airfare not included."
      />

      <RetreatDailySchedule
        title="Daily Schedule of the 07-Day Yoga & Meditation Retreat"
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatWhatsInclude bgClassName="bg-[#fdfbf7]" />

      <ResidentialExperience showSchedule={false} />

      <RetreatEnquirySteps bgClassName="bg-[#fdfbf7]" />

      <Teachers />

      <RetreatFaq
        title="07-Day Yoga & Meditation Retreat — Frequently Asked Questions"
        pageFaqs={pageFaqs}
        bgClassName="bg-[#fdfbf7]"
      />

      <RetreatFinalCta retreatName="07-Day Yoga & Meditation Retreat" bgClassName="bg-[#f4efe6]" />
    </>
  );
}

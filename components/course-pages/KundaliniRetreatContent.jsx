"use client";

import Link from "next/link";
import { ArrowRight, Sprout, Flame, Award, Compass } from "lucide-react";
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
    text: "Curious about chakras and energy work but never practiced before — this retreat builds your foundation in Kundalini asana, pranayama and meditation from the ground up.",
    image: "/images/outdoor-yoga-class-ganga-ghat.png",
    alt: "Complete beginner receiving hands-on guidance during an outdoor yoga class on the Ganga ghat in Rishikesh",
  },
  {
    icon: Flame,
    title: "Energy Workers & Healers",
    text: "Reiki practitioners, energy healers and home yogis who already sense subtle energy and want a structured, traditional framework of chakra science.",
    image: "/images/alternate-nostril-breathing-pranayama.png",
    alt: "Energy healer deepening Kundalini practice through alternate nostril breathing pranayama",
  },
  {
    icon: Award,
    title: "Aspiring Kundalini Teachers",
    text: "Anyone considering the 100-, 200-, 300- or 500-hour Kundalini Yoga TTC — this retreat is a gentle, no-pressure way to experience the practice first.",
    image: "/images/lord-shiva-statue-rishikesh.jpg",
    alt: "Aspiring Kundalini teacher near the Lord Shiva statue in Rishikesh",
  },
  {
    icon: Compass,
    title: "People at a Crossroads",
    text: "Those going through a life transition, carrying stuck emotions or seeking real clarity — using seven days in Rishikesh to release old patterns and awaken dormant energy.",
    image: "/images/sunrise-meditation-pose-rishikesh.png",
    alt: "Person finding clarity and release in a sunrise meditation pose in Rishikesh",
  },
];

const syllabusItems = [
  {
    q: "1. The Seven Main Chakras",
    a: (
      <SylGroup
        label="Muladhara, Swadhisthana, Manipura, Anahata, Vishuddha, Ajna & Sahasrara"
        text="An introduction to each of the seven main chakras — their location, their qualities and what it means when they are balanced or blocked, forming the roadmap for the whole retreat."
      />
    ),
  },
  {
    q: "2. Kundalini Asana Mapped to Chakras",
    a: (
      <SylGroup
        label="Chakra-linked postures"
        text="Postures selected and sequenced to gently open and activate each chakra in turn, moving from the base of the spine upward."
      />
    ),
  },
  {
    q: "3. Kundalini Pranayama",
    a: (
      <SylList
        items={["Yogic and abdominal breathing", "Nadi Shodhana (alternate nostril breathing)", "Kapalbhati", "Bhastrika", "Bhramari Pranayama"]}
      />
    ),
  },
  {
    q: "4. Bandhas & Mudras for Kundalini",
    a: (
      <SylList
        items={["Mula Bandha (root lock)", "Uddiyana Bandha (abdominal lock)", "Jalandhara Bandha (throat lock)", "Jnana & Chin Mudra", "Shambhavi & Bhairav Mudra"]}
      />
    ),
  },
  {
    q: "5. Kundalini & Chakra Meditation",
    a: (
      <SylGroup
        label="Guided energy meditation"
        text="Meditations that bring focused awareness to each chakra in turn, building the stillness needed before energy can safely rise along the spine."
      />
    ),
  },
  {
    q: "6. Mantra Chanting Per Chakra",
    a: (
      <SylGroup
        label="Seed (Bija) mantras"
        text="A dedicated Bija mantra for each of the seven chakras, chanted daily alongside Om, Ganesh and Gayatri mantras."
      />
    ),
  },
  {
    q: "7. Kundalini Philosophy",
    a: (
      <SylGroup
        label="Nadis, chakra colors, elements & glands"
        text="The classical understanding of the Nadis (energy channels), the color, element and endocrine gland associated with each chakra, and how they connect to your overall wellbeing."
      />
    ),
  },
];

const roomTiers = [
  { room: "Triple Sharing", was: "USD 500", price: "USD 300" },
  { room: "Double / Shared", was: "USD 600", price: "USD 400" },
  { room: "Private Room", was: "USD 700", price: "USD 500" },
];

const continueJourney = [
  { title: "100-Hour Kundalini Yoga TTC", href: "/100-hours-kundalini-yoga-teacher-training-in-rishikesh-india" },
  { title: "200-Hour Kundalini Yoga TTC", href: "/200-hours-kundalini-yoga-teacher-training-in-rishikesh-india" },
  { title: "300-Hour Kundalini Yoga TTC", href: "/300-hours-kundalini-yoga-teacher-training-in-rishikesh-india" },
  { title: "500-Hour Kundalini Yoga TTC", href: "/500-hours-kundalini-yoga-teacher-training-in-rishikesh-india" },
];

const pageFaqs = [
  {
    q: "How long should a Kundalini retreat be?",
    a: "Kundalini retreats here run for 5, 7, 10 or 15 days. Understanding and practicing Kundalini takes time, so staying longer gives a deeper experience — this retreat is 7 days, a solid introduction for most students.",
  },
  {
    q: "What is Kundalini energy?",
    a: "Kundalini is a Sanskrit word whose practical meaning is simply energy — the dormant potential said to rest at the base of the spine. Kundalini yoga works to discover, awaken and balance your chakras as the path toward awakening this energy.",
  },
];

export default function KundaliniRetreatContent() {
  return (
    <>
      {/* Overview */}
      <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="About This Retreat" title="Awaken Your Kundalini Energy in Rishikesh" />
          <div className="max-w-3xl mx-auto space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium text-center">
            <p>
              The Kundalini Retreat is designed to awaken your hidden energy step by step through different aspects of yoga. This one-week immersive retreat is a sacred blend of asanas, pranayama, mantras and energy-activating meditations, guided by experienced teachers in the Himalayas.
            </p>
            <p>
              Siddhant School of Yoga teaches Kundalini with classical meditation techniques that work with the chakras systematically. Kundalini retreats can last 5, 7, 10 or 15 days — understanding and practicing Kundalini takes time, so staying longer gives a deeper experience.
            </p>
            <p>
              Students who want to go further can continue with our 100-, 200-, 300- or 500-hour Kundalini Yoga Teacher Training Courses.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Syllabus" title="What the Kundalini Retreat Covers" />
          <Accordion items={syllabusItems} defaultOpen={null} className="w-full" columns={2} />
        </div>
      </section>

      <ExpandingPanels
        id="who-should-join"
        kicker="Is This for You?"
        title="Who Should Join the Kundalini Retreat"
        items={whoShouldJoin}
        bgClassName="bg-[#fdfbf7]"
      />

      <RetreatWhyChooseUs title="Why Siddhant School of Yoga Is the Right Choice" />

      <RetreatDatesFees
        title="Upcoming Kundalini Retreat Batches"
        description="Seven days, starting on the 15th of every month. Everything you need is already included."
        startDay={15}
        durationDays={7}
        count={10}
        roomTiers={roomTiers}
        depositAmount="USD 200"
        note="Fees include accommodation, three vegetarian meals daily, study material and your completion certificate. A USD 200 registration deposit secures your seat; the balance is payable on arrival. Airfare not included."
      />

      <RetreatDailySchedule title="Daily Schedule of the Kundalini Retreat" bgClassName="bg-[#f4efe6]" />

      <RetreatWhatsInclude bgClassName="bg-[#fdfbf7]" />

      <ResidentialExperience showSchedule={false} />

      <RetreatEnquirySteps bgClassName="bg-[#fdfbf7]" />

      <Teachers />

      {/* Continue Your Journey */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Go Deeper" title="Continue Your Journey" description="Loved the retreat? Take the next step with a full Kundalini Yoga Teacher Training." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {continueJourney.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group flex items-center justify-between gap-3 bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-5 shadow-2xs hover:shadow-md hover:border-[#1c3b2b] transition-all"
              >
                <span className="font-belleza text-[#1e2422] text-base leading-snug">{c.title}</span>
                <ArrowRight className="w-4 h-4 text-[#1c3b2b] shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RetreatFaq
        title="Kundalini Retreat — Frequently Asked Questions"
        pageFaqs={pageFaqs}
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatFinalCta retreatName="Kundalini Retreat" bgClassName="bg-[#fdfbf7]" />
    </>
  );
}

"use client";

import { Sprout, Wind, Award, Compass, Clock, Feather, Ban, HeartPulse, Zap } from "lucide-react";
import { SectionHead, Accordion, SylList } from "@/components/course-pages/RetreatUI";
import CourseGallerySection from "@/components/CourseGallerySection";
import ExpandingPanels from "@/components/course-pages/ExpandingPanels";
import RetreatDeepDive from "@/components/course-pages/RetreatDeepDive";
import RetreatPillarCards from "@/components/course-pages/RetreatPillarCards";
import RetreatLivingAtSchool from "@/components/course-pages/RetreatLivingAtSchool";
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
          <SectionHead kicker="Master the Art of the Breath" title="A Pranayama Retreat in Rishikesh" description="Seven days to steady your breath and, through it, steady your mind." />
          <div className="text-center w-full space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-8">
            <p>
              Yoga and pranayama together are a complete path to health. This Yoga &amp; Pranayama Retreat gives good physical health, a balanced mind and real spiritual growth. Yoga is the base of all yogic practices, and pranayama is the spine of every yogic subject — this retreat puts pranayama first, supported by yoga.
            </p>
            <p>
              Breathing exercises alone aren&apos;t pranayama. On this retreat you learn pranayama the traditional way, step by step: different breathing forms, the bandhas (locks) and mudras (gestures) for different purposes, with all the precautions needed for safe practice. The goal is to correct your breathing pattern and raise your energy level.
            </p>
          </div>

          {/* Quick Facts Table Box */}
          <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
            <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
              Pranayama Retreat — Quick Facts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Duration</span>
                <span className="text-stone-800 font-normal sm:text-right">7 days &middot; starts 3rd of every month</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Level</span>
                <span className="text-stone-800 font-normal sm:text-right">All Levels — Beginners to Future Teachers</span>
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
                <span className="text-stone-800 font-normal sm:text-right">Accommodation, meals, classes, study material</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Ideal for</span>
                <span className="text-stone-800 font-normal sm:text-right">Home practitioners &amp; those seeking balance</span>
              </div>
            </div>
          </div>

          {/* Gallery + Video Showcase */}
          <CourseGallerySection
            className="mt-10 lg:mt-12"
            mainImage="/images/pranayama-theory-class-siddhant-school-of-yoga.png"
            mainImageAlt="Pranayama theory class at Siddhant School of Yoga"
            caption="Learning the science of breath, one inhale at a time"
            videoId="6tPxEV9skT8"
            images={[
              {
                src: "/images/seated-pranayama-yoga-class-garden-rishikesh.jpg",
                alt: "Seated pranayama breathing practice in the garden, Rishikesh",
              },
              {
                src: "/images/alternate-nostril-breathing-pranayama.png",
                alt: "Alternate nostril breathing pranayama technique demonstration",
              },
              {
                src: "/images/pranayama-practice-by-ganga-river.jpg",
                alt: "Pranayama breathwork practice by the Ganga river",
              },
              {
                src: "/images/group-triangle-pose-garden-yoga-retreat-rishikesh.jpg",
                alt: "Group triangle pose during the yoga and pranayama retreat",
              },
              {
                src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp",
                alt: "Warrior pose yoga practice by the Ganges river",
              },
              {
                src: "/images/seated-stretching-yoga-class-garden-rishikesh.jpg",
                alt: "Seated stretching warm-up before pranayama class in the garden",
              },
              {
                src: "/images/meditation-class-garden-ganga-view-rishikesh.jpg",
                alt: "Meditation class in the garden with Ganga views",
              },
              {
                src: "/images/outdoor-yoga-class-ganga-ghat.png",
                alt: "Outdoor yoga class held at the Ganga ghat",
              },
              {
                src: "/images/warrior-1-pose-ganga-riverside-rishikesh.jpg",
                alt: "Warrior 1 pose practiced riverside along the Ganga",
              },
              {
                src: "/images/warrior-3-pose-rocks-ganga-river-rishikesh.jpg",
                alt: "Warrior 3 pose balanced on rocks by the Ganga river",
              },
              {
                src: "/images/warrior-pose-riverside-rocks.jpg",
                alt: "Warrior pose practice on riverside rocks",
              },
              {
                src: "/images/tree-pose-rooftop-mountain-view-yoga-retreat-rishikesh.jpg",
                alt: "Tree pose on the rooftop with mountain views",
              },
              {
                src: "/images/yoga-philosophy-satsang-class.png",
                alt: "Yoga philosophy satsang class discussion",
              },
              {
                src: "/images/sunrise-meditation-pose-rishikesh.png",
                alt: "Sunrise meditation pose to prepare for pranayama practice",
              },
              {
                src: "/images/student-namaste-himalayan-mountains-rishikesh.jpg",
                alt: "Student namaste pose framed by Himalayan peaks",
              },
              {
                src: "/images/lord-shiva-statue-rishikesh.jpg",
                alt: "Lord Shiva statue near the retreat center in Rishikesh",
              },
              {
                src: "/images/havan-fire-ceremony-group.jpg",
                alt: "Group havan fire ceremony breathwork ritual",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                alt: "Shared twin room for pranayama retreat participants",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                alt: "Private accommodation room for retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                alt: "Triple occupancy room with comfortable bedding",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                alt: "Retreat bedroom furnished with bed and wardrobe",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                alt: "Wholesome sattvic thali meal with dal and raita",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                alt: "Banana leaf thali with puri and traditional sides",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                alt: "Vegetarian pulao and sabzi lunch spread",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                alt: "Nutritious lunch tray paired with fresh juice",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                alt: "Communal dining hall and kitchen area",
              },
              {
                src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                alt: "Front exterior of Siddhant School of Yoga campus",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                alt: "En-suite washroom with hot water shower",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                alt: "Clean attached bathroom for retreat rooms",
              },
            ]}
          />
        </div>
      </section>

      <RetreatDeepDive
        kicker="The Science of Breath"
        title="Your Breath Is Your Most Powerful Tool"
        paragraphs={[
          "Pranayama means controlling your life-force through breath — and unlike most yoga techniques, its effects are immediate: a single round of alternate-nostril breathing can measurably calm your nervous system in minutes.",
          "Over seven days you move from basic breath awareness to advanced techniques, taught safely and one step at a time.",
        ]}
        image="/images/pranayama-theory-class-siddhant-school-of-yoga.png"
        imageAlt="Pranayama theory class at Siddhant School of Yoga"
        listIntro="Core techniques you'll practice, safely and step by step:"
        listItems={[
          { title: "Kapalbhati", desc: "The skull-shining breath — energizing and cleansing." },
          { title: "Nadi Shodhana", desc: "Alternate nostril breathing, for immediate calm." },
          { title: "Bhastrika", desc: "The bellows breath, for building internal heat and energy." },
          { title: "Ujjayi", desc: "The ocean breath, used to steady focus during asana." },
          { title: "Bhramari", desc: "The humming bee breath, for calming the mind quickly." },
          { title: "Bandhas & Mudras", desc: "Energy locks and seals that direct and contain your practice." },
        ]}
        summary="Each technique serves a different purpose — some calm, some energize, some build heat — so by the end of the retreat you have a genuine toolkit, not just one trick."
        quote="Change your breath and you change your state — every single time."
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatLivingAtSchool
        asksLabel="What This Retreat Asks of You"
        asks={[
          { icon: Clock, title: "Daily Practice, Twice a Day", desc: "Pranayama compounds — consistency matters more than intensity." },
          { icon: Feather, title: "Patience With Subtlety", desc: "The effects are real, but they build quietly, breath by breath." },
          { icon: Ban, title: "An Empty Stomach for Class", desc: "Pranayama is practiced on an empty stomach, as tradition requires." },
        ]}
        givesLabel="What It Quietly Gives Back"
        gives={[
          { icon: HeartPulse, title: "A Calmer Nervous System", desc: "A genuine, physiological shift, not just a mental one." },
          { icon: Zap, title: "Real Energy Without Caffeine", desc: "Techniques that wake you up without the crash." },
          { icon: Wind, title: "Breathing Tools for Stress, Forever", desc: "Simple techniques you can use anywhere, for life." },
        ]}
        centerImage="/images/seated-pranayama-yoga-class-garden-rishikesh.jpg"
        centerImageAlt="Seated pranayama yoga class in the garden at Siddhant School of Yoga"
        centerBadge="Breath First, Everything Else Follows"
        closingQuote="You've been breathing your whole life. This week, you'll finally learn how."
      />

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Syllabus" title="What the Pranayama Retreat Covers" />
          <RetreatPillarCards
            cards={[
              { title: "Foundational Breathwork", subtitle: "Abdominal · Thoracic · Yogic Breathing", image: "/images/seated-pranayama-yoga-class-garden-rishikesh.jpg", alt: "Seated pranayama class in the garden", text: "The building blocks every advanced technique is layered onto." },
              { title: "Cleansing & Energizing Breath", subtitle: "Kapalbhati · Bhastrika", image: "/images/alternate-nostril-breathing-pranayama.png", alt: "Alternate nostril breathing pranayama practice", text: "Techniques that clear the airways and build internal heat and energy." },
              { title: "Balancing Breath", subtitle: "Nadi Shodhana · Ujjayi · Bhramari", image: "/images/pranayama-practice-by-ganga-river.jpg", alt: "Pranayama practice by the Ganga river", text: "Techniques for calming the nervous system and steadying focus." },
              { title: "Bandha, Mudra & Meditation", subtitle: "Energy Locks · Seals · Stillness", image: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp", alt: "Warrior pose yoga practice by the Ganges river", text: "Locks and seals that direct your breathwork inward, closing with guided meditation." },
            ]}
          />
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

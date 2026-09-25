"use client";

import { VolumeX, PhoneOff, Eye, Wind, Scale, ShieldCheck, Waves } from "lucide-react";
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
          <SectionHead kicker="Silence That Speaks Volumes" title="A Vipassana Retreat in Rishikesh" description="Seven days of noble silence to observe the mind exactly as it is." />
          <div className="text-center w-full space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-8">
            <p>
              Vipassana is a way to watch and witness the mind through the body&apos;s sensations. Rooted in ancient Buddhist practice, this silent retreat is a chance to step away from distractions, calm the mind and awaken deeper awareness.
            </p>
            <p>
              The school prepares you for deep Vipassana with supporting yoga practice — each day includes two yoga sessions, two Vipassana sessions and four hours of silence practice, so you practice yoga and experience meditation in its purest form.
            </p>
          </div>

          {/* Quick Facts Table Box */}
          <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
            <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
              Vipassana Retreat — Quick Facts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Duration</span>
                <span className="text-stone-800 font-normal sm:text-right">7 days &middot; starts 9th of every month</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Level</span>
                <span className="text-stone-800 font-normal sm:text-right">All Levels — No Meditation Experience Needed</span>
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
                <span className="text-stone-800 font-normal sm:text-right">Meditators seeking silence &amp; inner stillness</span>
              </div>
            </div>
          </div>

          {/* Gallery + Video Showcase */}
          <CourseGallerySection
            className="mt-10 lg:mt-12"
            mainImage="/images/vipassana-meditation-cave-retreat.jpg"
            mainImageAlt="Silent Vipassana meditation retreat in a cave setting"
            caption="In stillness and silence, the mind reveals itself"
            videoId="6tPxEV9skT8"
            images={[
              {
                src: "/images/meditation-by-rishikesh-temple.jpg",
                alt: "Silent meditation practice by a Rishikesh temple",
              },
              {
                src: "/images/lotus-pose-meditation-rocky-riverbank-rishikesh.jpg",
                alt: "Lotus pose meditation on a rocky riverbank in Rishikesh",
              },
              {
                src: "/images/sunrise-meditation-pose-rishikesh.png",
                alt: "Sunrise Vipassana meditation pose in Rishikesh",
              },
              {
                src: "/images/meditation-by-ganga-river.png",
                alt: "Silent awareness meditation by the Ganga river",
              },
              {
                src: "/images/meditation-class-indoor.jpg",
                alt: "Indoor Vipassana meditation session in silence",
              },
              {
                src: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
                alt: "Gyan mudra silent meditation practice on the hilltop",
              },
              {
                src: "/images/meditation-class-garden-ganga-view-rishikesh.jpg",
                alt: "Silent meditation class in the garden overlooking the Ganga",
              },
              {
                src: "/images/morning-meditation-namaste-outdoor-class-rishikesh.jpg",
                alt: "Morning namaste meditation held in silence outdoors",
              },
              {
                src: "/images/shiva-puja-ceremony.png",
                alt: "Shiva puja ceremony observed during the silent retreat",
              },
              {
                src: "/images/yoga-philosophy-satsang-class.png",
                alt: "Silent satsang and yoga philosophy discussion",
              },
              {
                src: "/images/student-namaste-himalayan-mountains-rishikesh.jpg",
                alt: "Student in silent namaste pose facing the Himalayas",
              },
              {
                src: "/images/yogi-prayer-pose-himalaya-sunrise-rishikesh.jpg",
                alt: "Yogi in silent prayer pose at Himalayan sunrise",
              },
              {
                src: "/images/trayambakeshwar-temple-rishikesh-view.jpg",
                alt: "Trayambakeshwar temple visited during a silent walk",
              },
              {
                src: "/images/lord-shiva-statue-rishikesh.jpg",
                alt: "Lord Shiva statue offering quiet contemplation",
              },
              {
                src: "/images/seated-stretching-yoga-class-garden-rishikesh.jpg",
                alt: "Seated stretching practice before silent meditation",
              },
              {
                src: "/images/group-tree-pose-sunrise-hilltop-rishikesh.jpg",
                alt: "Group tree pose practiced in silence at sunrise",
              },
              {
                src: "/images/rooftop-yoga-poses-ganga-view-rishikesh.jpg",
                alt: "Rooftop yoga poses practiced in silence overlooking the Ganga",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                alt: "Quiet twin sharing room for silent retreat stay",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                alt: "Private room for solitary meditation retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                alt: "Triple sharing accommodation for retreat participants",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                alt: "Simple retreat room with bed and wardrobe storage",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                alt: "Sattvic thali meal supporting silent retreat practice",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                alt: "Traditional banana leaf thali served during the retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                alt: "Mindful vegetarian lunch of pulao and sabzi",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                alt: "Silent meal tray with fresh juice",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                alt: "Dining hall and kitchen used during silent meals",
              },
              {
                src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                alt: "Exterior of the retreat center building",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                alt: "Washroom with hot water shower for guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                alt: "Attached private bathroom at the retreat",
              },
            ]}
          />
        </div>
      </section>

      <RetreatDeepDive
        kicker="The Science of Noble Silence"
        title="Watching the Mind Without Reacting"
        paragraphs={[
          "Vipassana means \"to see things as they really are\" — not a technique that quiets the mind, but one that teaches you to observe it without being pulled around by every passing sensation.",
          "This isn't meditation as relaxation. It's meditation as training — and it changes how you respond to stress long after the silence ends.",
        ]}
        image="/images/meditation-by-rishikesh-temple.jpg"
        imageAlt="Meditation practice by a temple in Rishikesh during the Vipassana retreat"
        listIntro="What the technique actually trains you to do:"
        listItems={[
          { title: "Anapana", desc: "Breath awareness — the entry point into the technique." },
          { title: "Body Scanning", desc: "Observing sensation without reacting to it." },
          { title: "Equanimity", desc: "The central skill — noticing without judging." },
          { title: "Noble Silence", desc: "Four hours daily, protecting the depth of your practice." },
          { title: "Integration", desc: "Carrying the skill into daily life after the retreat ends." },
        ]}
        summary="Two yoga sessions prepare the body to sit; two Vipassana sessions train the mind to observe — together with four hours of daily silence, they build real, sustainable stillness."
        quote="Nothing is permanent — not the good moments, not the hard ones. Vipassana teaches you to hold both lightly."
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatLivingAtSchool
        asksLabel="What Noble Silence Asks of You"
        asks={[
          { icon: VolumeX, title: "No Speaking", desc: "Silence throughout the retreat except in instructional sessions." },
          { icon: PhoneOff, title: "No Phones", desc: "Devices set aside, so attention can stay with the breath and body." },
          { icon: Eye, title: "Sitting With Discomfort", desc: "Learning to observe difficult sensations rather than escape them." },
        ]}
        givesLabel="What It Quietly Gives Back"
        gives={[
          { icon: Scale, title: "Real Equanimity", desc: "A steadiness that holds up under real-life pressure, not just in the meditation hall." },
          { icon: ShieldCheck, title: "Freedom From Reactivity", desc: "Space between what happens and how you respond to it." },
          { icon: Waves, title: "A Quieter Relationship With Your Own Mind", desc: "Less noise, more clarity, long after the retreat ends." },
        ]}
        centerImage="/images/lotus-pose-meditation-rocky-riverbank-rishikesh.jpg"
        centerImageAlt="Lotus pose meditation on the rocky riverbank during the Vipassana retreat"
        centerBadge="Silence, By Design"
        closingQuote="What you resist in silence, you carry. What you observe in silence, you release."
      />

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Syllabus" title="What the Vipassana Retreat Covers" />
          <RetreatPillarCards
            cards={[
              { title: "Supporting Yoga Practice", subtitle: "Hatha · Ashtanga Elements", image: "/images/lotus-pose-meditation-rocky-riverbank-rishikesh.jpg", alt: "Lotus pose meditation on the rocky riverbank", text: "Two yoga sessions a day, preparing the body for long periods of stillness." },
              { title: "Anapana to Vipassana", subtitle: "Breath Awareness · Body Scanning", image: "/images/meditation-by-rishikesh-temple.jpg", alt: "Meditation practice by a temple in Rishikesh", text: "Progressing from breath awareness to the full technique of scanning sensation with equanimity." },
              { title: "Noble Silence", subtitle: "Four Hours Daily · Mouna", image: "/images/meditation-class-indoor.jpg", alt: "Indoor meditation class in silence", text: "Structured silence woven through the schedule, giving the mind real space to settle." },
              { title: "Philosophy & Reflection", subtitle: "Patanjali · Chakra · Samadhi", image: "/images/sunrise-meditation-pose-rishikesh.png", alt: "Sunrise meditation pose", text: "Daily philosophy sessions connecting the silent inner work to the wider yogic tradition." },
            ]}
          />
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

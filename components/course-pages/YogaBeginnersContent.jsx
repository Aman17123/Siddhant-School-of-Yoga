"use client";

import { Quote, Check, Sunrise, Compass, CheckCircle2, Activity, Smile, Repeat } from "lucide-react";
import { SectionHead, Accordion, SylList } from "@/components/course-pages/RetreatUI";
import CourseGallerySection from "@/components/CourseGallerySection";
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
          <SectionHead kicker="Your Yoga Journey Starts Here" title="A Gentle Beginning to Yoga in Rishikesh" description="No experience needed — just an open mind and a willingness to begin." />
          <div className="text-center w-full text-sm sm:text-base text-stone-700 leading-relaxed font-medium space-y-4">
            <p>
              New to yoga? Start with the truth: yoga isn&apos;t only asana. Poses are one limb of yoga, not the whole
              of it — yoga is the inner science of discovering your true self. In this one-week residential course
              in Rishikesh, the yoga capital of the world, you&apos;ll discover what yoga really is and how it can
              change your whole life.
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

          {/* Quick Facts Table Box */}
          <div className="mt-8 w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
            <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
              Yoga for Beginners Retreat — Quick Facts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Duration</span>
                <span className="text-stone-800 font-normal sm:text-right">7 days</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Level</span>
                <span className="text-stone-800 font-normal sm:text-right">All Levels Welcome</span>
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
                <span className="text-stone-800 font-normal sm:text-right">Accommodation, vegetarian meals, study material</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Ideal for</span>
                <span className="text-stone-800 font-normal sm:text-right">Beginners with no prior yoga experience</span>
              </div>
            </div>
          </div>

          {/* Gallery + Video Showcase */}
          <CourseGallerySection
            className="mt-10 lg:mt-12"
            mainImage="/images/group-yoga-class-sandy-riverbank.jpg"
            mainImageAlt="Beginners practicing yoga together on a sandy Ganges riverbank in Rishikesh"
            caption="Your very first steps onto the mat, guided from day one"
            videoId="6tPxEV9skT8"
            images={[
              {
                src: "/images/low-lunge-outdoor-yoga-session-retreat-rishikesh.jpg",
                alt: "Beginner practicing a low lunge pose during an outdoor yoga session in Rishikesh",
              },
              {
                src: "/images/instructor-guiding-class-riverside.jpg",
                alt: "Instructor guiding a beginners class riverside in Rishikesh",
              },
              {
                src: "/images/side-angle-pose-riverside-class.jpg",
                alt: "Student practicing side angle pose in a riverside beginners class",
              },
              {
                src: "/images/standing-balance-pose-riverside-terrace.jpg",
                alt: "Beginner holding a standing balance pose on a riverside terrace",
              },
              {
                src: "/images/tree-pose-vrikshasana-ganga-riverbank-rishikesh.jpg",
                alt: "Beginner practicing tree pose (Vrikshasana) on the Ganga riverbank in Rishikesh",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                alt: "Twin sharing room for beginner students at Siddhant School of Yoga",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                alt: "Private room accommodation available for the beginners yoga course",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                alt: "Triple sharing room option for beginner course students",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                alt: "Comfortable student room with bed and wardrobe at the ashram",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                alt: "Sattvic thali with rice, dal and raita served to beginner students",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                alt: "Traditional thali with puri served on a banana leaf",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                alt: "Vegetarian lunch of pulao and sabzi for beginner students",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                alt: "Lunch tray with fresh juice served during the beginners retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                alt: "Dining hall and kitchen where beginner students take their meals",
              },
              {
                src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                alt: "Exterior view of the Siddhant School of Yoga building",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                alt: "Washroom with hot water shower provided to beginner students",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                alt: "Attached bathroom in the beginner student accommodation",
              },
              {
                src: "/images/100-hour-yoga-teacher-training-group-pose.jpg",
                alt: "Beginner students holding a group yoga pose during training",
              },
              {
                src: "/images/downward-dog-group-class.png",
                alt: "Beginners practicing downward dog pose in a group class",
              },
              {
                src: "/images/child-pose-balasana-group-class-rishikesh.jpg",
                alt: "Beginners resting in child pose during a group class in Rishikesh",
              },
              {
                src: "/images/outdoor-garden-yoga-class-stretching-rishikesh.jpg",
                alt: "Beginner students stretching in an outdoor garden yoga class",
              },
              {
                src: "/images/standing-forward-fold-group-class.png",
                alt: "Beginner group practicing standing forward fold pose",
              },
              {
                src: "/images/seated-stretching-yoga-class-garden-rishikesh.jpg",
                alt: "Beginners doing a seated stretch in a garden yoga class",
              },
              {
                src: "/images/triangle-pose-group-lawn-class.jpg",
                alt: "Beginner students practicing triangle pose on the lawn",
              },
              {
                src: "/images/yoga-students-temple-excursion-rishikesh.jpg",
                alt: "Beginner students on a temple excursion in Rishikesh",
              },
              {
                src: "/images/yoga-retreat-students-at-waterfall-rishikesh.jpg",
                alt: "Beginner students visiting a waterfall during the retreat excursion",
              },
              {
                src: "/images/yoga-students-group-photo-temple-trip-rishikesh.jpg",
                alt: "Group photo of beginner students on a temple trip",
              },
              {
                src: "/images/plank-pose-group-yoga-session-rishikesh.jpg",
                alt: "Beginners holding plank pose during a group yoga session",
              },
            ]}
          />

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

      <RetreatDeepDive
        kicker="Why It Actually Works"
        title="Yoga Is More Than Poses"
        paragraphs={[
          "Asana is only one of yoga's eight limbs — real yoga is a complete inner science. In your first week, you'll see why people who understand this stick with their practice for life, while people who only chase poses quit within a month.",
          "Every technique you learn here is chosen because beginners genuinely need it: breath control before backbends, stillness before deep stretching, understanding before intensity.",
        ]}
        image="/images/low-lunge-outdoor-yoga-session-retreat-rishikesh.jpg"
        imageAlt="Beginner practicing a low lunge pose during an outdoor yoga session in Rishikesh"
        listIntro="Seven foundations every beginner needs before going deeper:"
        listItems={[
          { title: "Correct Breathing", desc: "Learn to breathe fully before you ever attempt a challenging pose." },
          { title: "Joint Mobility", desc: "A gentle joint-movement series that protects you from injury for life." },
          { title: "Basic Pranayama", desc: "Simple breathing techniques that calm anxiety in minutes, not months." },
          { title: "Meditation Basics", desc: "Just five focused minutes a day, built up slowly and sustainably." },
          { title: "Mantra Chanting", desc: "Correct pronunciation and meaning, not just repetition." },
          { title: "Yoga Philosophy", desc: "Understanding why you practice, so you never lose motivation." },
          { title: "A Home Practice Plan", desc: "Leave with a realistic routine you'll actually keep." },
        ]}
        summary="Together, these seven foundations are what separate a beginner who quits after two weeks from one who builds a lifelong practice — you don't need all of them perfected, just introduced, in the right order."
        quote="You don't need to be flexible to start yoga. You need to start yoga to become flexible."
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatLivingAtSchool
        intro="This isn't a resort with yoga on the side — it's a genuine beginner's introduction to ashram life, kept gentle enough for someone who has never done this before."
        asksLabel="What Your First Week Asks of You"
        asks={[
          { icon: Sunrise, title: "Early Mornings", desc: "6 AM wake-ups, still totally manageable for beginners." },
          { icon: Compass, title: "An Open Mind", desc: "Leaving assumptions about what yoga \"should\" look like at the door." },
          { icon: CheckCircle2, title: "Basic Consistency", desc: "Showing up to every class, even the ones that feel unfamiliar." },
        ]}
        givesLabel="What It Quietly Gives Back"
        gives={[
          { icon: Activity, title: "A Body That Moves Easier", desc: "Real, noticeable change by the end of the week." },
          { icon: Smile, title: "A Mind That's Actually Calmer", desc: "Not just relaxed for an hour — genuinely steadier." },
          { icon: Repeat, title: "A Practice You Can Keep", desc: "A simple routine that survives your flight home." },
        ]}
        centerImage="/images/instructor-guiding-class-riverside.jpg"
        centerImageAlt="Instructor guiding a beginners class riverside in Rishikesh"
        centerBadge="Built for First-Timers"
        closingQuote="Every advanced yogi was once a beginner who simply didn't quit."
      />

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
          <RetreatPillarCards
            cards={[
              { title: "Yogic Purification & Breath", subtitle: "Shatkarma · Pranayama · Bandha", image: "/images/alternate-nostril-breathing-pranayama.png", alt: "Alternate nostril breathing pranayama practice for beginners", text: "Gentle purification techniques and foundational breathing practices that prepare the body and mind for deeper work." },
              { title: "Hatha & Gentle Asana", subtitle: "Joint Series · Surya Namaskar · Basic Postures", image: "/images/low-lunge-outdoor-yoga-session-retreat-rishikesh.jpg", alt: "Beginner practicing a low lunge pose during an outdoor yoga session", text: "A beginner-paced sequence of postures built around correct alignment, not intensity." },
              { title: "Meditation & Mantra", subtitle: "Anapana · Chanting · Relaxation", image: "/images/meditation-class-indoor.jpg", alt: "Indoor meditation class for beginners", text: "Short, structured meditation sessions and correctly-pronounced mantra chanting to calm and center the mind." },
              { title: "Philosophy & Anatomy", subtitle: "Yoga Philosophy · Basic Anatomy · Home Practice", image: "/images/yoga-philosophy-satsang-class.png", alt: "Yoga philosophy satsang class", text: "Understanding why you practice, plus enough anatomy to keep you safe — and a realistic plan for home." },
            ]}
          />
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

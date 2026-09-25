"use client";

import Link from "next/link";
import { ArrowRight, Sprout, Flame, Award, Compass, Sunrise, Ban, Eye, User, Sparkles } from "lucide-react";
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
          <SectionHead kicker="Awaken Your Hidden Energy" title="A Kundalini Retreat in Rishikesh" description="Seven days of chakra work, mantra and breath to unlock the energy already within you." />
          <div className="text-center w-full space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-8">
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

          {/* Quick Facts Table Box */}
          <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
            <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
              Kundalini Retreat — Quick Facts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Duration</span>
                <span className="text-stone-800 font-normal sm:text-right">7 days &middot; starts 15th of every month</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Level</span>
                <span className="text-stone-800 font-normal sm:text-right">All Levels — Beginners to Aspiring Teachers</span>
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
                <span className="text-stone-800 font-normal sm:text-right">Energy workers, healers &amp; aspiring Kundalini teachers</span>
              </div>
            </div>
          </div>

          {/* Gallery + Video Showcase */}
          <CourseGallerySection
            className="mt-10 lg:mt-12"
            mainImage="/images/gyan-mudra-meditation-kunjapuri-hilltop-rishikesh.jpg"
            mainImageAlt="Gyan mudra chakra meditation on Kunjapuri hilltop, Rishikesh"
            caption="Rising with the sun, awakening energy on the hilltop"
            videoId="6tPxEV9skT8"
            images={[
              {
                src: "/images/sunrise-prayer-himalayan-view-kunjapuri-rishikesh.jpg",
                alt: "Sunrise prayer with Himalayan views during kundalini retreat",
              },
              {
                src: "/images/namaste-pose-kunjapuri-temple-sunrise-rishikesh.jpg",
                alt: "Namaste pose at Kunjapuri temple at sunrise",
              },
              {
                src: "/images/group-tree-pose-kunjapuri-sunrise-rishikesh.jpg",
                alt: "Group tree pose practice at sunrise on Kunjapuri hilltop",
              },
              {
                src: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp",
                alt: "Sacred fire havan ceremony for energy activation in Rishikesh",
              },
              {
                src: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp",
                alt: "Chakra and kundalini philosophy class at Siddhant School of Yoga",
              },
              {
                src: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
                alt: "Gyan mudra chakra meditation practice on the hilltop",
              },
              {
                src: "/images/group-tree-pose-sunrise-hilltop-rishikesh.jpg",
                alt: "Group tree pose practice at sunrise on the hilltop",
              },
              {
                src: "/images/havan-fire-ceremony-group.jpg",
                alt: "Group havan fire ceremony for energy activation",
              },
              {
                src: "/images/havan-fire-ceremony-yoga-ttc-rishikesh.jpg",
                alt: "Sacred havan fire ceremony during the kundalini TTC",
              },
              {
                src: "/images/morning-meditation-namaste-outdoor-class-rishikesh.jpg",
                alt: "Morning namaste meditation in an outdoor class",
              },
              {
                src: "/images/rooftop-yoga-poses-ganga-view-rishikesh.jpg",
                alt: "Rooftop yoga poses overlooking the Ganga",
              },
              {
                src: "/images/shiva-puja-ceremony.png",
                alt: "Shiva puja ceremony performed at the ashram",
              },
              {
                src: "/images/student-namaste-himalayan-mountains-rishikesh.jpg",
                alt: "Student in namaste pose against the Himalayan mountains",
              },
              {
                src: "/images/sunrise-meditation-pose-rishikesh.png",
                alt: "Sunrise meditation pose overlooking Rishikesh",
              },
              {
                src: "/images/yoga-group-hilltop-temple-viewpoint-rishikesh.jpg",
                alt: "Yoga group practicing at a hilltop temple viewpoint",
              },
              {
                src: "/images/yogi-prayer-pose-himalaya-sunrise-rishikesh.jpg",
                alt: "Yogi in prayer pose at sunrise facing the Himalayas",
              },
              {
                src: "/images/trayambakeshwar-temple-rishikesh-view.jpg",
                alt: "View of Trayambakeshwar temple during a retreat excursion",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                alt: "Twin sharing room accommodation for Kundalini retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                alt: "Private room accommodation option at the retreat center",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                alt: "Triple sharing room for group retreat stays",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                alt: "Cozy retreat room with bed and wardrobe",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                alt: "Sattvic thali with rice, dal and raita served to guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                alt: "Traditional thali with puri served on a banana leaf",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                alt: "Vegetarian lunch with pulao and sabzi",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                alt: "Lunch tray with a glass of fresh juice",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                alt: "Dining hall and kitchen at the retreat center",
              },
              {
                src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                alt: "Exterior view of the Siddhant School of Yoga building",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                alt: "Washroom with hot water shower facility",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                alt: "Attached bathroom in the retreat accommodation",
              },
            ]}
          />
        </div>
      </section>

      <RetreatDeepDive
        kicker="The Science of Kundalini"
        title="Kundalini Is Your Hidden Energy"
        paragraphs={[
          "Kundalini simply means energy — the most potent, practical system in the yogic path. Taught traditionally in four steps (discover, awaken, balance, then awaken Kundalini itself), this seven-day retreat focuses on step one: discovering and locating your chakras, the foundation every deeper Kundalini practice is built on.",
          "It's a gentle, no-pressure way to experience real chakra work, without committing to a full teacher training — many students continue afterward with our 100-, 200-, 300- or 500-hour Kundalini TTC.",
        ]}
        image="/images/gyan-mudra-meditation-kunjapuri-hilltop-rishikesh.jpg"
        imageAlt="Gyan Mudra meditation on the Kunjapuri hilltop during the Kundalini retreat"
        listIntro="To awaken your Kundalini energy, you must awaken your chakras. There are said to be 114 chakras in the body — out of them, these 7 are the most important:"
        listItems={[
          { title: "Muladhara Chakra", desc: "Balance your food, sex, sleep and fear." },
          { title: "Swadhisthana Chakra", desc: "Enhance your professional and creative qualities." },
          { title: "Manipura Chakra", desc: "Strengthen your willpower and committed attitude." },
          { title: "Anahata Chakra", desc: "Balance your feelings and emotions." },
          { title: "Vishuddha Chakra", desc: "Sharpen your clarity, understanding and communication skills." },
          { title: "Ajna Chakra", desc: "Develop your self-commanding power." },
          { title: "Sahasrara Chakra", desc: "Connect with pure consciousness and experience deep inner peace." },
        ]}
        summary="Together, these practices move you gently through the first stage of the Kundalini path — from simply locating your chakras to actually feeling their effect."
        quote="Kundalini is a secret and sacred word — in practice, it simply means energy: the hidden power already within you, waiting to rise."
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatLivingAtSchool
        asksLabel="What This Retreat Asks of You"
        asks={[
          { icon: Sunrise, title: "Early Mornings", desc: "Sadhana begins early, and your full attention stays with it through the day." },
          { icon: Ban, title: "Letting Habits Go", desc: "A willingness to set aside caffeine, distractions and old routines, just for the week." },
          { icon: Eye, title: "Turning Inward", desc: "Ready to sit with yourself in meditation, rather than reach for a distraction." },
        ]}
        givesLabel="What It Quietly Gives Back"
        gives={[
          { icon: Flame, title: "A Real Energetic Shift", desc: "Chakra work and kundalini kriya that create change you can actually feel." },
          { icon: User, title: "Meeting Yourself Again", desc: "The stillness and self-awareness most people never make time for." },
          { icon: Sparkles, title: "A Steady, Grounded Mind", desc: "Real tools for calm, clarity and emotional balance you carry home." },
        ]}
        centerImage="/images/sunrise-prayer-himalayan-view-kunjapuri-rishikesh.jpg"
        centerImageAlt="Sunrise prayer with a Himalayan view at Kunjapuri during the Kundalini retreat"
        centerBadge="A Taste of the Full Path"
        closingQuote="This retreat was never about becoming someone new. It's about awakening the energy that was quietly already within you."
      />

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead kicker="Course Syllabus" title="What the Kundalini Retreat Covers" />
          <RetreatPillarCards
            cards={[
              { title: "Kundalini Asana & Kriya", subtitle: "Chakra-Mapped Postures · Kriya", image: "/images/gyan-mudra-meditation-kunjapuri-hilltop-rishikesh.jpg", alt: "Gyan Mudra meditation on the Kunjapuri hilltop", text: "Postures and kriyas linked directly to each of the seven main chakras." },
              { title: "Pranayama & Bandha", subtitle: "Breathwork · Energy Locks", image: "/images/pranayama-theory-class-siddhant-school-of-yoga.png", alt: "Pranayama theory class at Siddhant School of Yoga", text: "Kundalini-specific breathing and the classical bandhas that direct energy flow." },
              { title: "Chakra Meditation & Mantra", subtitle: "Chakra Meditation · Seed Mantras", image: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp", alt: "Havan fire ritual yoga ceremony", text: "Guided meditation and mantra chanting, one seed sound for each chakra." },
              { title: "Philosophy & Relaxation", subtitle: "Kundalini Philosophy · Yoga Nidra", image: "/images/sunrise-prayer-himalayan-view-kunjapuri-rishikesh.jpg", alt: "Sunrise prayer with a Himalayan view at Kunjapuri", text: "Understanding the Nadis and chakras, closing each day with deep relaxation." },
            ]}
          />
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

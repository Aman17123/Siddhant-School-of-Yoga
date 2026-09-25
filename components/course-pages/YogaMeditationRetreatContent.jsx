"use client";

import { Quote, Sprout, Compass, Target, HeartCrack, VolumeX, Clock, CheckCircle2, Waves, HeartHandshake, Repeat } from "lucide-react";
import { SectionHead, Accordion, SylList } from "@/components/course-pages/RetreatUI";
import CourseGallerySection from "@/components/CourseGallerySection";
import RetreatDeepDive from "@/components/course-pages/RetreatDeepDive";
import RetreatPillarCards from "@/components/course-pages/RetreatPillarCards";
import RetreatLivingAtSchool from "@/components/course-pages/RetreatLivingAtSchool";
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
          <SectionHead kicker="Stillness Meets the Himalayas" title="A Yoga & Meditation Retreat in Rishikesh" description="One or two weeks to quiet the mind, steady the breath and come home to yourself." />
          <div className="text-center w-full text-sm sm:text-base text-stone-700 leading-relaxed font-medium space-y-4">
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

          {/* Quick Facts Table Box */}
          <div className="mt-8 w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
            <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
              Yoga &amp; Meditation Retreat — Quick Facts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Duration</span>
                <span className="text-stone-800 font-normal sm:text-right">14 days (7-day option also available)</span>
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
                <span className="text-stone-800 font-normal sm:text-right">Anyone seeking a meditation-focused reset</span>
              </div>
            </div>
          </div>

          {/* Gallery + Video Showcase */}
          <CourseGallerySection
            className="mt-10 lg:mt-12"
            mainImage="/images/rooftop-yoga-poses-ganga-view-rishikesh.jpg"
            mainImageAlt="Rooftop yoga and meditation session with a Ganga view in Rishikesh"
            caption="Stillness of mind, found one breath at a time"
            videoId="6tPxEV9skT8"
            images={[
              {
                src: "/images/group-meditation-namaste-yoga-class-rishikesh.jpg",
                alt: "Group meditation in namaste pose during a yoga class in Rishikesh",
              },
              {
                src: "/images/namaste-prayer-by-ganga-river.jpg",
                alt: "Student in namaste prayer pose by the Ganga river",
              },
              {
                src: "/images/seated-spinal-twist-riverbank-yoga-rishikesh.jpg",
                alt: "Student practicing a seated spinal twist on the riverbank in Rishikesh",
              },
              {
                src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp",
                alt: "Yoga retreat practice with a view of the Himalayan mountains in Rishikesh",
              },
              {
                src: "/images/crescent-lunge-yoga-riverbank-rishikesh.jpg",
                alt: "Student holding a crescent lunge pose on the yoga riverbank in Rishikesh",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                alt: "Twin sharing room offered to meditation retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                alt: "Private room accommodation for meditation retreat participants",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                alt: "Triple sharing room for meditation retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                alt: "Peaceful room with bed and wardrobe for retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                alt: "Sattvic thali of rice, dal and raita served during the retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                alt: "Traditional puri thali served on a banana leaf to retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                alt: "Vegetarian pulao and sabzi lunch served at the retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                alt: "Lunch tray with fresh juice for meditation retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                alt: "Dining hall and kitchen serving retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                alt: "Exterior of the Siddhant School of Yoga where the retreat is held",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                alt: "Washroom with hot water shower for retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                alt: "Attached bathroom in the meditation retreat accommodation",
              },
              {
                src: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
                alt: "Student practicing Gyan Mudra meditation on a hilltop retreat",
              },
              {
                src: "/images/sunrise-meditation-pose-rishikesh.png",
                alt: "Student in a sunrise meditation pose in Rishikesh",
              },
              {
                src: "/images/meditation-class-garden-ganga-view-rishikesh.jpg",
                alt: "Meditation class in the garden with a Ganga view",
              },
              {
                src: "/images/namaste-meditation-ganga-riverbank-yoga-retreat-rishikesh.jpg",
                alt: "Namaste meditation pose on the Ganga riverbank during the retreat",
              },
              {
                src: "/images/seated-side-stretch-indoor-class.jpg",
                alt: "Retreat guest practicing a seated side stretch indoors",
              },
              {
                src: "/images/child-pose-balasana-group-class-rishikesh.jpg",
                alt: "Group resting in child pose during a meditation retreat class",
              },
              {
                src: "/images/yoga-group-hilltop-temple-viewpoint-rishikesh.jpg",
                alt: "Meditation retreat group at a hilltop temple viewpoint in Rishikesh",
              },
              {
                src: "/images/yoga-students-sacred-tree-temple-visit-rishikesh.jpg",
                alt: "Retreat guests visiting a sacred tree during a temple excursion",
              },
              {
                src: "/images/yoga-students-ringing-bell-kunjapuri-temple-rishikesh.jpg",
                alt: "Retreat guests ringing the bell at Kunjapuri temple",
              },
              {
                src: "/images/seated-spinal-twist-group-class.png",
                alt: "Group seated spinal twist during a meditation retreat session",
              },
            ]}
          />

          <div className="max-w-3xl mx-auto mt-8 relative rounded-2xl border border-[#e3dac9] bg-[#f4efe6]/60 px-6 sm:px-8 py-6">
            <Quote className="w-8 h-8 text-[#1c3b2b]/20 absolute -top-3 -left-1 sm:-left-2" />
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium italic pl-4">
              &ldquo;Reconnect with yourself through glimpses of meditation and Samadhi.&rdquo;
            </p>
            <p className="mt-3 pl-4 font-belleza text-lg text-[#1c3b2b]">— {founder.name}</p>
          </div>
        </div>
      </section>

      <RetreatDeepDive
        kicker="The Science of Stillness"
        title="Meditation Is a Skill, Not a Mood"
        paragraphs={[
          "Most people think meditation means an empty mind. It doesn't — it means noticing your mind without getting pulled around by it, and that's a skill you build session by session, not something you either 'have' or don't.",
          "Over one or two weeks, this retreat moves you through several real techniques, so you leave knowing which one actually works for you.",
        ]}
        image="/images/rooftop-yoga-poses-ganga-view-rishikesh.jpg"
        imageAlt="Rooftop yoga and meditation session with a Ganga view in Rishikesh"
        listIntro="Five meditation techniques you'll genuinely practice, not just hear about:"
        listItems={[
          { title: "Anapana", desc: "Breath awareness — the entry point into every deeper technique." },
          { title: "Vipassana, Level 1", desc: "Observing bodily sensation without reacting to it." },
          { title: "Mantra Meditation", desc: "Using sound as a steady anchor for a wandering mind." },
          { title: "Chakra & Kundalini Awareness", desc: "An introduction to subtle energy work." },
          { title: "Yoga Nidra", desc: "Guided deep relaxation that rests the nervous system." },
        ]}
        summary="Each technique targets a different layer — body, breath, mind and spirit — so by the end of the retreat you're not just relaxed, you're equipped with a genuinely rounded practice."
        quote="Stillness isn't something you find. It's something you practice until it finds you."
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatLivingAtSchool
        intro="A meditation retreat only works if the rest of your day supports it — so daily life here is built specifically to protect your practice, not compete with it."
        asksLabel="What This Retreat Asks of You"
        asks={[
          { icon: VolumeX, title: "Real Silence at Times", desc: "Quiet hours built into the schedule, not just suggested." },
          { icon: Clock, title: "Patience With Yourself", desc: "Progress in meditation is rarely visible day to day." },
          { icon: CheckCircle2, title: "Full Attendance", desc: "Every session builds on the one before it." },
        ]}
        givesLabel="What It Quietly Gives Back"
        gives={[
          { icon: Waves, title: "A Genuinely Quieter Mind", desc: "Not silence from distraction — silence from within." },
          { icon: HeartHandshake, title: "Emotional Steadiness", desc: "Less reactivity to the small things that used to derail your day." },
          { icon: Repeat, title: "A Daily Practice for Life", desc: "A technique you actually know how to keep using." },
        ]}
        centerImage="/images/meditation-class-garden-ganga-view-rishikesh.jpg"
        centerImageAlt="Student meditating in the garden with a Ganga view in Rishikesh"
        centerBadge="A Retreat, Not a Retreat-Themed Vacation"
        closingQuote="You came here to add a daily habit of quiet. You'll leave wondering how you lived without it."
      />

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
          <RetreatPillarCards
            cards={[
              { title: "Hatha & Ashtanga Vinyasa", subtitle: "Asana · Alignment · Strength", image: "/images/rooftop-yoga-poses-ganga-view-rishikesh.jpg", alt: "Rooftop yoga session with a Ganga view", text: "A balanced blend of steady Hatha alignment and dynamic Ashtanga Vinyasa." },
              { title: "Pranayama & Purification", subtitle: "Breathwork · Shatkarma", image: "/images/pranayama-practice-by-ganga-river.jpg", alt: "Pranayama practice by the Ganga river", text: "Breathing techniques and yogic cleansing practices that support the meditation work ahead." },
              { title: "Meditation & Mantra", subtitle: "Anapana · Vipassana · Chanting", image: "/images/group-meditation-namaste-yoga-class-rishikesh.jpg", alt: "Group meditation in namaste pose", text: "Several real meditation techniques, plus mantra chanting mapped to daily practice." },
              { title: "Philosophy & Relaxation", subtitle: "Patanjali · Chakra · Yoga Nidra", image: "/images/yoga-philosophy-satsang-class.png", alt: "Yoga philosophy satsang class", text: "Daily philosophy class with Siddhant Ji, closing each day with deep relaxation." },
            ]}
          />
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

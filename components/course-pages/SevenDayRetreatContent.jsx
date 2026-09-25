"use client";

import { Quote, Clock, Briefcase, Sparkles, Sprout, PhoneOff, CalendarCheck, RefreshCw, Zap, ClipboardList } from "lucide-react";
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
          <SectionHead kicker="Seven Days, A Lasting Reset" title="A Week to Transform in Rishikesh" description="A focused week of yoga and meditation for busy lives that need a real pause." />
          <div className="text-center w-full text-sm sm:text-base text-stone-700 leading-relaxed font-medium space-y-4">
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

          {/* Quick Facts Table Box */}
          <div className="mt-8 w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
            <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
              07-Day Yoga &amp; Meditation Retreat — Quick Facts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">Duration</span>
                <span className="text-stone-800 font-normal sm:text-right">7 days, 6 nights</span>
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
                <span className="text-stone-800 font-normal sm:text-right">Busy professionals &amp; first-time retreat guests</span>
              </div>
            </div>
          </div>

          {/* Gallery + Video Showcase */}
          <CourseGallerySection
            className="mt-10 lg:mt-12"
            mainImage="/images/warrior-1-pose-ganga-riverside-rishikesh.jpg"
            mainImageAlt="Student holding warrior 1 pose by the Ganga riverside in Rishikesh"
            caption="Seven focused days, a real reset from body to mind"
            videoId="6tPxEV9skT8"
            images={[
              {
                src: "/images/high-lunge-warrior-pose-riverbank-rishikesh.jpg",
                alt: "Student holding a high lunge warrior pose on the riverbank in Rishikesh",
              },
              {
                src: "/images/ardha-matsyendrasana-twist-riverbank-rishikesh.jpg",
                alt: "Student practicing Ardha Matsyendrasana spinal twist on the riverbank",
              },
              {
                src: "/images/crow-pose-bakasana-ganga-river-rishikesh.jpg",
                alt: "Student balancing in crow pose (Bakasana) by the Ganga river",
              },
              {
                src: "/images/backbend-pose-riverside-terrace.jpg",
                alt: "Student practicing a backbend pose on a riverside terrace",
              },
              {
                src: "/images/standing-forward-fold-riverside.png",
                alt: "Student in a standing forward fold pose by the riverside",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                alt: "Twin sharing room for guests of the seven-day retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                alt: "Private room accommodation for the seven-day retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                alt: "Triple sharing room available during the seven-day retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                alt: "Comfortable retreat room with bed and wardrobe",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                alt: "Sattvic thali with rice, dal and raita served during the retreat week",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                alt: "Traditional thali with puri on a banana leaf for retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                alt: "Vegetarian pulao and sabzi lunch served during the seven-day retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                alt: "Lunch tray with fresh juice served to retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                alt: "Dining hall and kitchen serving the seven-day retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                alt: "Exterior of the Siddhant School of Yoga hosting the retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                alt: "Washroom with hot water shower for retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                alt: "Attached bathroom in the seven-day retreat accommodation",
              },
              {
                src: "/images/triangle-pose-garden-yoga-class-rishikesh.jpg",
                alt: "Retreat guest practicing triangle pose in a garden yoga class",
              },
              {
                src: "/images/eagle-pose-garudasana-group-class-rishikesh.jpg",
                alt: "Group practicing eagle pose (Garudasana) during the retreat",
              },
              {
                src: "/images/cow-face-pose-arm-stretch-yoga-class-rishikesh.jpg",
                alt: "Retreat guest stretching in cow face pose during class",
              },
              {
                src: "/images/head-to-knee-forward-bend-group-class-rishikesh.jpg",
                alt: "Group practicing a head-to-knee forward bend during the retreat",
              },
              {
                src: "/images/balancing-pose-outdoor-garden-yoga-class-rishikesh.jpg",
                alt: "Retreat guest holding a balancing pose in an outdoor garden class",
              },
              {
                src: "/images/sphinx-pose-outdoor-yoga-class-rishikesh.jpg",
                alt: "Retreat guest practicing sphinx pose outdoors",
              },
              {
                src: "/images/yoga-retreat-waterfall-pool-excursion-rishikesh.jpg",
                alt: "Seven-day retreat guests on a waterfall pool excursion",
              },
              {
                src: "/images/yoga-student-rocky-riverbed-walk-rishikesh.jpg",
                alt: "Retreat guest walking along a rocky riverbed during an excursion",
              },
              {
                src: "/images/yoga-students-temple-excursion-rishikesh.jpg",
                alt: "Seven-day retreat guests on a temple excursion in Rishikesh",
              },
            ]}
          />

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

      <RetreatDeepDive
        kicker="What Seven Days Can Change"
        title="A Week Is Longer Than It Sounds"
        paragraphs={[
          "Seven days isn't enough to master yoga — but it's genuinely enough to interrupt a stressed-out routine, reset your habits, and prove to yourself that a calmer, healthier version of you is possible.",
          "Each day builds on the last, so what feels unfamiliar on day one feels natural by day seven.",
        ]}
        image="/images/warrior-1-pose-ganga-riverside-rishikesh.jpg"
        imageAlt="Student holding warrior 1 pose by the Ganga riverside in Rishikesh"
        listIntro="What a focused week actually delivers:"
        listItems={[
          { title: "Better Sleep", desc: "Often within the first few days of the retreat." },
          { title: "A Body That Moves Without Pain", desc: "Real relief from stiffness and tension." },
          { title: "A Calmer Starting Point", desc: "Every morning, not just by the end of the week." },
          { title: "Real Tools for Stress", desc: "Not just a break from it, but techniques you keep." },
          { title: "A Practice You Can Repeat", desc: "Simple enough to continue once you're home." },
        ]}
        summary="Seven days is short enough to fit around your schedule, but structured deliberately enough to deliver a real, lasting shift — not just a relaxing week away."
        quote="You don't need a month away. You need one focused week, done properly."
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatLivingAtSchool
        asksLabel="What This Week Asks of You"
        asks={[
          { icon: PhoneOff, title: "Unplugging From Routine", desc: "Stepping fully away from your normal schedule for seven days." },
          { icon: CalendarCheck, title: "Showing Up Daily", desc: "Consistency matters more than intensity in a short retreat." },
          { icon: Sparkles, title: "An Honest Effort", desc: "You'll get out of it roughly what you put in." },
        ]}
        givesLabel="What It Quietly Gives Back"
        gives={[
          { icon: RefreshCw, title: "A Genuine Reset", desc: "Not just relaxation — an actual shift in how you feel." },
          { icon: Zap, title: "Renewed Energy", desc: "Without relying on caffeine to get there." },
          { icon: ClipboardList, title: "A Simple Plan to Take Home", desc: "So the reset doesn't end the moment you land." },
        ]}
        centerImage="/images/high-lunge-warrior-pose-riverbank-rishikesh.jpg"
        centerImageAlt="Student holding a high lunge warrior pose on the riverbank in Rishikesh"
        centerBadge="Short, Focused, Real"
        closingQuote="A week well spent can outweigh a year of good intentions."
      />

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
          <RetreatPillarCards
            cards={[
              { title: "Asana & Movement", subtitle: "Hatha · Alignment · Strength", image: "/images/warrior-1-pose-ganga-riverside-rishikesh.jpg", alt: "Warrior 1 pose by the Ganga riverside", text: "Daily postures focused on correcting alignment and building real strength." },
              { title: "Breath & Purification", subtitle: "Pranayama · Shatkarma", image: "/images/seated-pranayama-yoga-class-garden-rishikesh.jpg", alt: "Seated pranayama class in the garden", text: "Breathing techniques and cleansing practices woven into every day." },
              { title: "Meditation & Stillness", subtitle: "Guided Meditation · Yoga Nidra", image: "/images/sunrise-meditation-pose-rishikesh.png", alt: "Sunrise meditation pose", text: "Short daily sessions that build a real, repeatable meditation habit." },
              { title: "Philosophy & Reflection", subtitle: "Yoga Philosophy · Journaling", image: "/images/group-meditation-hilltop-temple-rishikesh.jpg", alt: "Group meditation at a hilltop temple", text: "Time to reflect and understand the 'why' behind each practice." },
            ]}
          />
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

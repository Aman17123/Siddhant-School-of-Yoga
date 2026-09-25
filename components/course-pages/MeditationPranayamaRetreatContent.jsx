"use client";

import {
  Wind,
  Eye,
  Music,
  MoonStar,
  Moon,
  MessageCircle,
  ArrowRight,
  Mail,
  Clock,
  HourglassIcon,
  VolumeX,
  Waves,
  ListChecks,
} from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { site, whatsappLink } from "@/data/siteData";
import CourseGallerySection from "@/components/CourseGallerySection";
import { SectionHead, Accordion } from "./RetreatUI";
import RetreatWhyChooseUs from "./RetreatWhyChooseUs";
import RetreatDatesFees from "./RetreatDatesFees";
import RetreatDailySchedule from "./RetreatDailySchedule";
import RetreatWhatsInclude from "./RetreatWhatsInclude";
import ResidentialExperience from "@/components/home/ResidentialExperience";
import Teachers from "@/components/home/Teachers";
import RetreatDeepDive from "@/components/course-pages/RetreatDeepDive";
import RetreatLivingAtSchool from "@/components/course-pages/RetreatLivingAtSchool";
import RetreatPillarCards from "@/components/course-pages/RetreatPillarCards";

export const sectionNavItems = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "dates-fees", label: "Dates & Fees" },
  { id: "schedule", label: "Daily Schedule" },
  { id: "whats-include", label: "What's Include" },
  { id: "teachers", label: "Teachers" },
  { id: "faq", label: "FAQ" },
];

/* ---------------------------------------------------------------- */
/* Data                                                              */
/* ---------------------------------------------------------------- */

const syllabusItems = [
  {
    q: "Day 1 — Foundations of Pranayama",
    a: "Breath awareness, abdominal breathing, thoracic breathing and full yogic breathing — the groundwork every pranayama technique that follows is built on.",
  },
  {
    q: "Day 2 — Nadi Shodhana & Kapalbhati",
    a: "Alternate nostril breathing (Nadi Shodhana) to balance the nervous system, and Kapalbhati, the cleansing breath that energizes and clears the mind.",
  },
  {
    q: "Day 3 — Anapana Meditation",
    a: "Anapana, the foundational breath-based meditation — simply observing the natural breath as it is, building the concentration needed for deeper meditation.",
  },
  {
    q: "Day 4 — Mantra Meditation",
    a: "Using sound and chanting as a meditative anchor, exploring how mantra repetition steadies and focuses a wandering mind.",
  },
  {
    q: "Day 5 — Silent Meditation & Integration",
    a: "Sustained silent sitting, and building a simple, realistic daily practice plan you can keep going once you're home.",
  },
];

const meditationTechniques = [
  {
    icon: Wind,
    title: "Anapana",
    text: "Breath-awareness meditation and the foundation for everything that follows.",
  },
  {
    icon: Eye,
    title: "Vipassana Level 1",
    text: "An introduction to insight meditation — observing sensation without reaction.",
  },
  {
    icon: Music,
    title: "Mantra Meditation",
    text: "Sound and chanting used as a steady anchor for a wandering mind.",
  },
  {
    icon: MoonStar,
    title: "Silent Meditation",
    text: "Sustained, unguided silent sitting to deepen your own practice.",
  },
  {
    icon: Moon,
    title: "Yoga Nidra",
    text: "Guided yogic sleep for deep, conscious relaxation of body and mind.",
  },
];

const roomTiers = [
  { room: "Triple Sharing", price: "USD 169" },
  { room: "Double / Shared Room", price: "USD 249" },
  { room: "Private Room", price: "USD 329" },
];

const pageFaqs = [
  {
    q: "Is the 5-Day Meditation & Pranayama Retreat certified by Yoga Alliance?",
    a: "Siddhant School of Yoga is a Registered Yoga School with Yoga Alliance USA (RYS 200, RYS 300, RYS 500). This retreat itself awards a Siddhant School of Yoga completion certificate — it is not a Yoga Alliance teaching certificate, since it is not a teacher training course.",
  },
  {
    q: "Do I need meditation experience to join?",
    a: "No. The retreat starts from breath awareness on day one and builds gradually, so complete beginners and experienced meditators both progress at a comfortable pace.",
  },
  {
    q: "Will I really have a daily practice by the end of 5 days?",
    a: "Yes. Each day layers on a new technique, and by day five you leave with a short, realistic sitting practice — built from the pranayama and meditation methods you've actually experienced — that you can keep going at home.",
  },
  {
    q: "Who can join this retreat?",
    a: "The main requirement is having the right attitude toward learning. Beyond that, we ask that you keep an open mind, follow a vegetarian diet during the retreat, avoid alcohol, drugs and smoking, have basic English proficiency, and be between 18–60 years old, with no surgery in the past year.",
  },
  {
    q: "What documents do I need to bring?",
    a: "Two clear color photocopies of your passport (plus the original for verification), two passport-size color photographs, and details of your visa expiry date.",
  },
  {
    q: "Do I need a visa to join the retreat in India?",
    a: "Yes, an Indian tourist e-visa is required for foreign nationals. It's also a good idea to arrange travel insurance before you leave home.",
  },
  {
    q: "What happens on arrival?",
    a: "We recommend arriving one day early. You'll check in, rest, then complete your registration and pay the balance of your fee, followed by a short tour of the yoga hall and dining area.",
  },
  {
    q: "What happens on day one?",
    a: "The first morning includes a Hatha Yoga class (8–9 AM), breakfast, a traditional fire ceremony (10:30 AM) and a group photo, along with your study materials. A 3 PM orientation covers the schedule, teachers and house rules.",
  },
  {
    q: "What should I pack?",
    a: "Passport photos, your phone and charger, a debit card, seasonal and yoga-appropriate clothing, comfortable shoes, a travel towel and a small first-aid kit with any personal medication. Leave valuables at home.",
  },
  {
    q: "What is the refund policy?",
    a: "The registration deposit is non-refundable. In a genuine emergency you can postpone to another scheduled batch within the same year by emailing us your reason. Cancellations are accepted by email at no extra charge, but the deposit is not refunded.",
  },
];

/* ---------------------------------------------------------------- */
/* Main component                                                    */
/* ---------------------------------------------------------------- */

export default function MeditationPranayamaRetreatContent() {
  return (
    <>
      {/* Overview */}
      <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Breathe Deep, Sit Still"
            title="A 5-Day Meditation & Pranayama Retreat"
            description="Five days to move from correct breathing into deep, lasting stillness."
          />
          <div className="text-center w-full space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed mb-6">
            <p>
              Breath is the bridge to the mind. In five days at Siddhant School of Yoga in Rishikesh, you move from correct breathing to deep meditation. Each day adds a new pranayama technique and a new meditation method — from Anapana and breath awareness to mantra and silent meditation.
            </p>
            <p>
              You leave with a daily practice you can keep going at home, taught in small groups with close, personal guidance from Acharya Siddhant and our teaching team.
            </p>
            <p>
              Graduates receive a Siddhant School of Yoga Certificate of Completion.
            </p>
          </div>

          {/* Quick Facts Table Box */}
          <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
            <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
              5-Day Meditation & Pranayama Retreat — Quick Facts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">
                  Duration
                </span>
                <span className="text-stone-800 font-normal sm:text-right">
                  5 days
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">
                  Level
                </span>
                <span className="text-stone-800 font-normal sm:text-right">
                  All Levels
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">
                  Certification
                </span>
                <span className="text-stone-800 font-normal sm:text-right">
                  Siddhant School of Yoga Certificate of Completion
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">
                  Lead teacher
                </span>
                <span className="text-stone-800 font-normal sm:text-right">
                  Acharya Siddhant
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b md:border-b-0 border-[#e3dac9]/70 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">
                  What&apos;s included
                </span>
                <span className="text-stone-800 font-normal sm:text-right">
                  Accommodation, sattvic meals, study material
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 text-center sm:text-left">
                <span className="text-[#1c3b2b] font-medium shrink-0">
                  Ideal for
                </span>
                <span className="text-stone-800 font-normal sm:text-right">
                  Beginners &amp; experienced meditators
                </span>
              </div>
            </div>
          </div>

          {/* Gallery + Video Showcase */}
          <CourseGallerySection
            className="mt-10 lg:mt-12"
            mainImage="/images/sunrise-meditation-pose-rishikesh.png"
            mainImageAlt="Sunrise meditation pose overlooking Rishikesh"
            caption="Stilling the breath, quieting the mind, sunrise after sunrise"
            videoId="6tPxEV9skT8"
            images={[
              {
                src: "/images/meditation-class-garden-ganga-view-rishikesh.jpg",
                alt: "Guided meditation class in a garden with views of the Ganga",
              },
              {
                src: "/images/instructor-guiding-class-riverside.jpg",
                alt: "Instructor guiding a pranayama and meditation class riverside",
              },
              {
                src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp",
                alt: "Meditation retreat setting with the Himalayan mountains in the background",
              },
              {
                src: "/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp",
                alt: "Breath-focused asana practice by the riverside in Rishikesh",
              },
              {
                src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp",
                alt: "Students on a mindful temple visit during the meditation retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                alt: "Twin sharing room accommodation for meditation retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                alt: "Private room accommodation offered during the pranayama retreat",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                alt: "Triple sharing room available to retreat participants",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                alt: "Guest room bed and wardrobe at the meditation retreat accommodation",
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
                alt: "Vegetarian pulao and sabzi lunch served between pranayama sessions",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                alt: "Nourishing lunch tray with fresh juice for retreat guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                alt: "Dining hall and kitchen serving sattvic meals to guests",
              },
              {
                src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                alt: "Exterior of the Siddhant School of Yoga campus building",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                alt: "Washroom with hot water shower for retreat accommodation",
              },
              {
                src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                alt: "Attached bathroom in the meditation retreat guest rooms",
              },
              {
                src: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
                alt: "Gyan mudra meditation practiced on a hilltop during the retreat",
              },
              {
                src: "/images/100-hour-yoga-teacher-training-group-pose.jpg",
                alt: "Group pose practice shared with trainee yogis during the retreat",
              },
              {
                src: "/images/cow-face-pose-arm-stretch-yoga-class-rishikesh.jpg",
                alt: "Cow face pose arm stretch practiced during a breathwork class",
              },
              {
                src: "/images/outdoor-garden-yoga-class-stretching-rishikesh.jpg",
                alt: "Outdoor garden yoga class stretching before pranayama practice",
              },
              {
                src: "/images/seated-side-stretch-indoor-class.jpg",
                alt: "Seated side stretch practiced in an indoor meditation class",
              },
              {
                src: "/images/seated-spinal-twist-group-class.png",
                alt: "Group class practicing a seated spinal twist",
              },
              {
                src: "/images/standing-balance-pose-group-terrace.jpg",
                alt: "Standing balance pose practiced on the terrace",
              },
              {
                src: "/images/standing-forward-fold-group-class.png",
                alt: "Standing forward fold practiced during a group breathwork class",
              },
              {
                src: "/images/triangle-pose-garden-yoga-class-rishikesh.jpg",
                alt: "Triangle pose practiced during a garden yoga class",
              },
              {
                src: "/images/yoga-for-beginners-seated-stretch-class.jpg",
                alt: "Seated stretch class suited for beginners at the retreat",
              },
            ]}
          />
        </div>
      </section>

      <RetreatDeepDive
        kicker="The Science of Breath & Stillness"
        title="Breath Is the Bridge to the Mind"
        paragraphs={[
          "You can't force the mind to be still, but you can guide it there — and breath is the most direct, reliable bridge between the two. Each of the five days adds one new layer, moving you from correct breathing into genuine stillness.",
          "By day five, what felt like a technique on day one feels like a natural state you can return to any time.",
        ]}
        image="/images/sunrise-meditation-pose-rishikesh.png"
        imageAlt="Sunrise meditation pose during the 5-day meditation and pranayama retreat"
        listIntro="Five days, five building layers:"
        listItems={[
          { title: "Day 1 — Foundations of Pranayama", desc: "Breath awareness and full yogic breathing." },
          { title: "Day 2 — Nadi Shodhana & Kapalbhati", desc: "Alternate nostril breathing and cleansing breath." },
          { title: "Day 3 — Anapana Meditation", desc: "Breath-based meditation foundations." },
          { title: "Day 4 — Mantra Meditation", desc: "Sound and chanting as a meditative anchor." },
          { title: "Day 5 — Silent Meditation & Integration", desc: "Sustained silent sitting and a plan for home practice." },
        ]}
        summary="Each day adds exactly one new layer, so by day five the techniques from day one feel less like effort and more like a state you can return to naturally."
        quote="Breathe correctly, and stillness stops being something you chase — it becomes something you arrive at."
      />

      <RetreatLivingAtSchool
        asksLabel="What These Five Days Ask of You"
        asks={[
          { icon: Clock, title: "Daily Practice, Twice a Day", desc: "Short, focused sessions that build on each other." },
          { icon: HourglassIcon, title: "Patience With Slow Progress", desc: "Real change in five days, but it builds gradually, not instantly." },
          { icon: VolumeX, title: "Real Quiet Time", desc: "Space in the schedule to actually sit with the practice." },
        ]}
        givesLabel="What It Quietly Gives Back"
        gives={[
          { icon: Wind, title: "A Breath You Can Rely On", desc: "A steady tool for stress, anywhere, anytime." },
          { icon: Waves, title: "A Genuinely Calmer Baseline", desc: "Not just calm during the retreat — calmer as your new normal." },
          { icon: ListChecks, title: "A 5-Step Practice for Life", desc: "A clear, repeatable sequence you already know how to do." },
        ]}
        centerImage="/images/meditation-class-garden-ganga-view-rishikesh.jpg"
        centerImageAlt="Meditation class in the garden with a Ganga view during the 5-day retreat"
        centerBadge="Five Days, Built to Compound"
        closingQuote="Five days won't make you a master. It will give you a practice that keeps working long after you leave."
      />

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Retreat Curriculum"
            title="Five Days, Five Progressive Modules"
            description="Each day builds directly on the one before it — from correct breathing to deep, sustained meditation."
          />
          <RetreatPillarCards
            cards={[
              { title: "Foundational Pranayama", subtitle: "Breath Awareness · Full Yogic Breath", image: "/images/sunrise-meditation-pose-rishikesh.png", alt: "Sunrise meditation pose", text: "The breathing foundations every deeper technique builds on." },
              { title: "Nadi Shodhana & Kapalbhati", subtitle: "Alternate Nostril · Cleansing Breath", image: "/images/pranayama-practice-by-ganga-river.jpg", alt: "Pranayama practice by the Ganga river", text: "Balancing and energizing breath techniques introduced early in the retreat." },
              { title: "Anapana & Mantra Meditation", subtitle: "Breath-Based Meditation · Chanting", image: "/images/meditation-class-garden-ganga-view-rishikesh.jpg", alt: "Meditation class in the garden with a Ganga view", text: "Moving from breath awareness into sound-anchored meditation." },
              { title: "Silent Meditation & Integration", subtitle: "Sustained Sitting · Home Practice", image: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp", alt: "Students on a mindful temple visit", text: "Building toward sustained silent sitting and a plan to continue at home." },
            ]}
          />
          <Accordion items={syllabusItems} defaultOpen={0} className="max-w-3xl mx-auto" />
        </div>
      </section>

      {/* Meditation Techniques */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="What You'll Practice"
            title="Meditation Techniques You'll Learn"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {meditationTechniques.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center gap-3 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5"
              >
                <span className="shrink-0 w-11 h-11 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] mb-1">{title}</h3>
                  <p className="text-sm text-stone-700 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetreatWhyChooseUs
        title="Why Choose Siddhant School of Yoga for Your Meditation Retreat?"
        bgClassName="bg-[#fdfbf7]"
      />

      <ResidentialExperience showSchedule={false} bgClassName="bg-[#f4efe6]" />

      <RetreatDatesFees
        title="5-Day Meditation & Pranayama Retreat: Dates & Fees"
        description="Five days is enough to build a real, lasting practice — everything you need is already included below."
        startDay={3}
        durationDays={5}
        count={10}
        roomTiers={roomTiers}
        depositAmount="USD 120"
        note="Fees include accommodation, three sattvic meals daily and study material. A USD 120 registration fee reserves your seat — the balance is paid on arrival."
        secondaryNote="Pricing shown is an introductory estimate for this 5-day format — please confirm final fees with our team before booking."
      />

      <RetreatDailySchedule
        title="Daily Schedule of the Meditation & Pranayama Retreat"
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatWhatsInclude bgClassName="bg-[#fdfbf7]" />

      <Teachers />

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="FAQs"
            title="Meditation & Pranayama Retreat — Frequently Asked Questions"
          />
          <Accordion items={pageFaqs} defaultOpen={null} initialCount={6} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="max-w-5xl mx-auto text-center rounded-3xl bg-gradient-to-br from-[#1c3b2b] via-[#142b1e] to-[#142b1e] px-6 sm:px-12 py-10 sm:py-14 shadow-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-[#f4efe6] text-[11px] sm:text-xs font-semibold uppercase tracking-wide mb-4">
              Small Batches, Personal Attention
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-white leading-[1.2] mb-3">
              Ready to Begin Your Meditation &amp; Pranayama Journey?
            </h2>
            <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Five days to move from correct breathing to deep meditation, with a daily practice you can keep for life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink
                href={whatsappLink(
                  "Namaste! I would like to enquire about the 5-Day Meditation & Pranayama Retreat at Siddhant School of Yoga in Rishikesh.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="white"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </ButtonLink>
              <ButtonLink href="/book-my-yoga-in-rishikesh-india" variant="primary">
                <ArrowRight className="w-4 h-4" />
                Enroll Now
              </ButtonLink>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-white/70 text-xs sm:text-sm">
              <Mail className="w-3.5 h-3.5" />
              <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

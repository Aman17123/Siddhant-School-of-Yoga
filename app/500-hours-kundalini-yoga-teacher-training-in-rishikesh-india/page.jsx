import Image from "next/image";
import { Flame, Wind, Moon, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import TrustStrip from "@/components/home/TrustStrip";
import ResidentialExperience from "@/components/home/ResidentialExperience";
import Kundalini500HourFounderSection from "@/components/kundalini/500hr/FounderSection";
import Kundalini500HourBeyondGraduation from "@/components/kundalini/500hr/BeyondGraduation";
import Teachers from "@/components/home/Teachers";
import CtaBanner from "@/components/home/CtaBanner";
import Kundalini500HourHero from "@/components/kundalini/500hr/Hero";
import Kundalini500HourLivingAtAshram from "@/components/kundalini/500hr/LivingAtAshram";
import CourseGallerySection from "@/components/CourseGallerySection";
import Kundalini500HourWhoShouldJoin from "@/components/kundalini/500hr/WhoShouldJoin";
import Kundalini500HourSyllabusSection from "@/components/kundalini/500hr/SyllabusSection";
import Kundalini500HourDatesFees from "@/components/kundalini/500hr/DatesFees";
import Kundalini500HourDailySchedule from "@/components/kundalini/500hr/DailySchedule";
import Kundalini500HourWhatsInclude from "@/components/kundalini/500hr/WhatsInclude";
import Kundalini500HourEarlyBirdCta from "@/components/kundalini/500hr/EarlyBirdCta";
import Kundalini500HourExcursionsSection from "@/components/kundalini/500hr/ExcursionsSection";
import Kundalini500HourFaqSection from "@/components/kundalini/500hr/FaqSection";
import SectionNav from "@/components/course-pages/SectionNav";
import { Kicker, HeadingDivider } from "@/components/ui";
import { kundaliniTrainings } from "@/data/coursesData";

const course = kundaliniTrainings[3];

const sectionNavItems = [
  { id: "explained", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "dates", label: "Dates & Fees" },
  { id: "schedule", label: "Daily Schedule" },
  { id: "whats-include", label: "What's Include" },
  { id: "teachers", label: "Teachers" },
  { id: "faq", label: "FAQ" },
];

export const metadata = {
  title: "500-Hour Master Kundalini Yoga Teacher Training in Rishikesh | Siddhant School of Yoga",
  description:
    "The complete 4-step Kundalini journey — discover, awaken and balance your chakras, then awaken Kundalini itself. Yoga Alliance USA RYT-500 registered, about 8 weeks, combining our 200-hour and 300-hour Kundalini courses in one immersion.",
};

const highlightIcons = [Flame, Wind, Moon, Sparkles];

const whyChooseUsPoints = [
  {
    title: "Awakening Your Highest Potential",
    text: "This is the complete arc of our Kundalini method — all four steps in one uninterrupted journey, taking you from discovering your chakras all the way to Kundalini awakening itself.",
  },
  {
    title: "Mastery of Subtle Energy",
    text: "Learn to sense, work with and dissolve energetic knots along the Nadis, building a genuinely felt understanding of the subtle body, not just a theoretical one.",
  },
  {
    title: "Advanced Kriyas & Sequences",
    text: "The full advanced kriya and asana sequences from our 300-hour curriculum, layered on top of the complete chakra-discovery work from the 200-hour course.",
  },
  {
    title: "Activation of the Higher Chakras",
    text: "Dedicated practice time on Vishuddha, Ajna and Sahasrara — the higher chakras that most shorter courses never have time to properly address.",
  },
  {
    title: "Entering the Realm of Samadhi",
    text: "Meditation and philosophy classes that build steadily toward Samadhi — the highest level of Kundalini energy, as Acharya Siddhant describes it.",
  },
  {
    title: "Kundalini & Tantric Integration",
    text: "Classical Shiva–Shakti philosophy woven through the practical work, connecting your asana and pranayama practice to its deeper Tantric roots.",
  },
  {
    title: "Safe, Supervised Ascent of Shakti",
    text: "Every stage of this journey is personally guided by Acharya Siddhant and senior faculty — Kundalini energy is powerful, and this course treats that power with real care.",
  },
  {
    title: "A Living Embodiment of Yoga",
    text: "Roughly eight weeks of daily immersion is long enough to genuinely change how you carry yourself — students consistently leave changed, not just certified.",
  },
];

const chakras = [
  { title: "Muladhara Chakra", desc: "Balance your food, sex, sleep and fear." },
  { title: "Swadhisthana Chakra", desc: "Enhance your professional qualities." },
  { title: "Manipura Chakra", desc: "Strengthen your willpower and committed attitude." },
  { title: "Anahata Chakra", desc: "Balance your feelings and emotions." },
  { title: "Vishuddha Chakra", desc: "Sharpen your clarity, understanding and communication skills." },
  { title: "Ajna Chakra", desc: "Develop your self-commanding power." },
  { title: "Sahasrara Chakra", desc: "Connect with pure consciousness and experience deep inner peace." },
];

export default function KundaliniFiveHundredHourPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#0f6b57]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <Kundalini500HourHero />

        {/* What Is the 500-Hour Kundalini Yoga TTC */}
        <section id="explained" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="w-[90%] max-w-[1320px] mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center w-full mb-8 lg:mb-10">
              <Kicker>500-Hour Kundalini YTTC Explained</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What Is the 500-Hour Master Kundalini Yoga TTC?
              </h2>
              <HeadingDivider />
            </div>

            {/* Explanatory Paragraphs */}
            <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
              <p>
                The 500-Hour Master Kundalini Yoga Teacher Training Course (YTTC) in Rishikesh is our complete, Yoga Alliance USA RYS-500 registered Kundalini immersion, combining our 200-hour and 300-hour Kundalini courses into one uninterrupted journey. The highest level of Kundalini energy is called Samadhi — and this course walks all four steps of our Kundalini method to get there: discover, awaken, balance and finally awaken Kundalini itself.
              </p>

              <p>
                At Siddhant School of Yoga, the 500-hour Kundalini yoga TTC runs over about eight immersive weeks and is taught personally by Acharya Siddhant. The course covers the full Kundalini asana, pranayama, meditation, mantra, philosophy and teaching methodology curriculum from both the 200-hour and 300-hour courses, combined with residential ashram living and three vegetarian meals a day. It is designed to take students from beginner to advanced, building a lasting practice habit through the longer, unbroken immersion.
              </p>

              <p>
                Graduates of this course receive a Yoga Alliance USA RYT-500 certificate — the highest teaching credential Yoga Alliance offers — and leave with a complete personal Kundalini practice as well as the skills to teach it to others anywhere in the world.
              </p>
            </div>

            {/* Quick Facts Table Box */}
            <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                500-Hour Kundalini Yoga TTC in Rishikesh — Quick Facts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Course length
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    500 hours &middot; about 8 weeks
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Level
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    {course.level}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Certification
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Yoga Alliance USA Registered RYT 500
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
                    Accommodation, vegetarian meals, study material
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Ideal for
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Beginners through advanced, dual immersion
                  </span>
                </div>
              </div>
            </div>

            {/* Gallery + Video Showcase */}
            <CourseGallerySection
              className="mt-10 lg:mt-12"
              mainImage="/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp"
              mainImageAlt="Sacred fire ceremony and energy work at Siddhant School of Yoga"
              caption="Awakening kundalini energy in Rishikesh's sacred foothills"
              videoId="6tPxEV9skT8"
              images={[
                {
                  src: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp",
                  alt: "Chakra and yoga philosophy class at Siddhant School of Yoga",
                },
                {
                  src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp",
                  alt: "Kundalini yoga practice by the Ganges river in Rishikesh",
                },
                {
                  src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp",
                  alt: "Students on a temple visit in Rishikesh",
                },
                {
                  src: "/images/rishikesh/lord_shiva_rishikesh.png",
                  alt: "Majestic Lord Shiva statue in sacred Rishikesh",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                  alt: "Sattvic vegetarian meals at Siddhant School of Yoga",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                  alt: "Twin sharing room for 500-hour master Kundalini trainees",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                  alt: "Private room accommodation option for long-term residents",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                  alt: "Triple sharing dormitory room at the ashram",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                  alt: "Student room with bed and wardrobe storage",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                  alt: "Sattvic thali with rice, dal and raita served daily",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                  alt: "Vegetarian pulao and sabzi lunch for eight-week residents",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                  alt: "Lunch tray served with fresh seasonal juice",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                  alt: "Communal dining hall and kitchen at the school",
                },
                {
                  src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                  alt: "Exterior building of Siddhant School of Yoga in Rishikesh",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                  alt: "Hot water shower washroom facility for students",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                  alt: "Private attached bathroom in student accommodation",
                },
                {
                  src: "/images/bg-kundalini.png",
                  alt: "Kundalini energy artwork representing the awakening journey",
                },
                {
                  src: "/images/group-tree-pose-kunjapuri-sunrise-rishikesh.jpg",
                  alt: "Group tree pose practice at Kunjapuri during sunrise",
                },
                {
                  src: "/images/group-tree-pose-sunrise-hilltop-rishikesh.jpg",
                  alt: "Students holding tree pose on a hilltop at sunrise",
                },
                {
                  src: "/images/havan-fire-ceremony-group.jpg",
                  alt: "Group participating in a havan fire ceremony",
                },
                {
                  src: "/images/lord-shiva-statue-rishikesh.jpg",
                  alt: "Statue of Lord Shiva overlooking Rishikesh",
                },
                {
                  src: "/images/trayambakeshwar-temple-rishikesh-view.jpg",
                  alt: "View of Trayambakeshwar temple in Rishikesh",
                },
                {
                  src: "/images/teacher-adjusting-warrior-pose-outdoor-class-rishikesh.jpg",
                  alt: "Teacher guiding alignment in an outdoor warrior pose class",
                },
                {
                  src: "/images/yoga-alignment-adjustment-with-straps-ttc-rishikesh.jpg",
                  alt: "Strap-assisted alignment adjustment during advanced practice",
                },
                {
                  src: "/images/yoga-ttc-graduation-group-shiva-altar-rishikesh.jpg",
                  alt: "Graduation group photo beside the Shiva altar",
                },
                {
                  src: "/images/christmas-celebration-siddhant-school-of-yoga.jpg",
                  alt: "Christmas celebration with students during the long course",
                },
              ]}
            />
          </div>
        </section>

        <TrustStrip />

        {/* Kundalini Is Your Hidden Energy */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left: Intro */}
              <div className="text-center lg:text-left lg:sticky lg:top-20 lg:self-start">
                <Kicker>The Science of Kundalini</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  Kundalini Is Your Hidden Energy
                </h2>
                <HeadingDivider center={false} />

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  The highest level of Kundalini energy is called Samadhi. Taught traditionally in four steps (discover, awaken, balance, then awaken Kundalini itself), this 500-hour course covers all four in one uninterrupted journey — combining our 200-hour and 300-hour Kundalini courses into a single, complete immersion.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  It is our master-level, Yoga Alliance USA RYT-500 Kundalini TTC at Siddhant School of Yoga in Rishikesh, taking you from beginner to advanced across about eight weeks of real, felt transformation.
                </p>

                <div className="relative mt-6 rounded-2xl overflow-hidden border-2 border-white shadow-lg aspect-[16/10] max-w-lg mx-auto lg:mx-0">
                  <Image
                    src="/images/rishikesh/yoga_asana.png"
                    alt="Kundalini yoga and chakra meditation practice in Rishikesh"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Right: Chakras List */}
              <div>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mb-2 text-center lg:text-left">
                  To awaken your Kundalini energy fully, you must discover, awaken and balance your chakras. There are said to be 114 chakras in the body — out of them, these 7 are the most important:
                </p>
                <div className="divide-y divide-[#e3dac9]">
                  {chakras.map((c, i) => (
                    <div key={c.title} className="flex items-start gap-5 py-5">
                      <span className="font-belleza text-2xl sm:text-3xl text-[#b85c00] shrink-0 w-10">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] tracking-wide mb-1">
                          {c.title}
                        </h3>
                        <p className="text-sm text-stone-600 leading-relaxed font-medium">
                          By mastering your {c.title.split(" ")[0]} Chakra, you can {c.desc.charAt(0).toLowerCase() + c.desc.slice(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-[#f4efe6] border-l-4 border-[#b85c00] rounded-r-2xl px-5 py-4">
                  <p className="text-sm sm:text-base text-[#1e2422] italic leading-relaxed font-medium">
                    &ldquo;The highest level of Kundalini energy is called Samadhi.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Kundalini500HourLivingAtAshram />

        <Kundalini500HourSyllabusSection />

        {/* Overview */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <Kicker>{course.subtitle}</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                A Specialisation in Kundalini Awakening
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                {course.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {course.highlights.map((h, i) => {
                const Icon = highlightIcons[i % highlightIcons.length];
                return (
                  <div
                    key={h}
                    className="flex items-start gap-3 bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-5"
                  >
                    <span className="shrink-0 w-10 h-10 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </span>
                    <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium">
                      {h}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Kundalini500HourWhoShouldJoin />

        {/* Why Choose Us */}
        <section id="kundalini-why-choose-us" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Why Choose Us</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Why Siddhant School of Yoga Is the Right Choice for Your 500-Hour Kundalini YTTC?
              </h2>
              <HeadingDivider />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {whyChooseUsPoints.map((point, i) => (
                <div
                  key={point.title}
                  className="flex gap-3.5 bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-4 sm:p-5 shadow-2xs"
                >
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-[#142b1e] text-white flex items-center justify-center text-xs font-bold font-figtree">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] leading-snug mb-1">
                      {point.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Kundalini500HourDatesFees />

        <Kundalini500HourDailySchedule />
        <Kundalini500HourWhatsInclude />

        <Kundalini500HourEarlyBirdCta />
        <Kundalini500HourExcursionsSection />

        <Kundalini500HourFounderSection />

        <ResidentialExperience showSchedule={false} />

        <Kundalini500HourBeyondGraduation />

        <Teachers />

        <Kundalini500HourFaqSection />

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

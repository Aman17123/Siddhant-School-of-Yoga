import Image from "next/image";
import { Flame, Wind, Moon, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import TrustStrip from "@/components/home/TrustStrip";
import ResidentialExperience from "@/components/home/ResidentialExperience";
import Kundalini200HourFounderSection from "@/components/kundalini/200hr/FounderSection";
import Kundalini200HourBeyondGraduation from "@/components/kundalini/200hr/BeyondGraduation";
import Teachers from "@/components/home/Teachers";
import CtaBanner from "@/components/home/CtaBanner";
import Kundalini200HourHero from "@/components/kundalini/200hr/Hero";
import Kundalini200HourLivingAtAshram from "@/components/kundalini/200hr/LivingAtAshram";
import CourseGallerySection from "@/components/CourseGallerySection";
import Kundalini200HourWhoShouldJoin from "@/components/kundalini/200hr/WhoShouldJoin";
import Kundalini200HourSyllabusSection from "@/components/kundalini/200hr/SyllabusSection";
import Kundalini200HourDatesFees from "@/components/kundalini/200hr/DatesFees";
import Kundalini200HourDailySchedule from "@/components/kundalini/200hr/DailySchedule";
import Kundalini200HourWhatsInclude from "@/components/kundalini/200hr/WhatsInclude";
import Kundalini200HourEarlyBirdCta from "@/components/kundalini/200hr/EarlyBirdCta";
import Kundalini200HourExcursionsSection from "@/components/kundalini/200hr/ExcursionsSection";
import Kundalini200HourFaqSection from "@/components/kundalini/200hr/FaqSection";
import SectionNav from "@/components/course-pages/SectionNav";
import { Kicker, HeadingDivider } from "@/components/ui";
import { kundaliniTrainings } from "@/data/coursesData";

const course = kundaliniTrainings[1];

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
  title: "200-Hour Kundalini Yoga Teacher Training in Rishikesh, India | Siddhant School of Yoga",
  description:
    "Discover and awaken your 7 main chakras through a Yoga Alliance USA RYS-200 registered, 24-day Kundalini Yoga Teacher Training in Rishikesh — Steps 1 & 2 of our Kundalini method, taught personally by Acharya Siddhant.",
};

const highlightIcons = [Flame, Wind, Moon, Sparkles];

const whyChooseUsPoints = [
  {
    title: "Full Yoga Alliance USA RYS-200 Certification",
    text: "This 200-hour course is our complete, Yoga Alliance USA-registered Kundalini curriculum, taking you all the way to an internationally recognised RYT-200 credential.",
  },
  {
    title: "A Scientific Approach to Chakra Science",
    text: "Chakra science, Kundalini kriya, pranayama and meditation are taught with visual aids and a genuinely experiential, structured approach — not just theory.",
  },
  {
    title: "Taught by Acharya Siddhant & Senior Faculty",
    text: "Every subject is taught by a dedicated, experienced teacher, giving you real depth in every class across the full 24 days.",
  },
  {
    title: "Focus on Spinal Asanas & Energy Flow",
    text: "About 70 postures mapped to the seven chakras, built around spinal movement and alignment to support real energetic flow, not just flexibility.",
  },
  {
    title: "A Safe, Supportive Environment",
    text: "Small batch sizes and close supervision mean every student gets hands-on correction and a genuinely safe space to explore energy work.",
  },
  {
    title: "A Holistic, Kundalini-Specific Curriculum",
    text: "This is not a generic Hatha or Vinyasa 200-hour course with a chakra class bolted on — Kundalini is the curriculum, from the first day to the last.",
  },
  {
    title: "Small Groups of 10–15 for Personal Attention",
    text: "We keep our batches to just 10–15 students, so every student gets hands-on correction and direct, personal feedback from Acharya Siddhant.",
  },
  {
    title: "Deep Inner Transformation Across 24 Days",
    text: "Twenty-four immersive days give real time for the discovery and awakening of every chakra to settle in, rather than rushing through the material.",
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

export default function KundaliniTwoHundredHourPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#0f6b57]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <Kundalini200HourHero />

        {/* What Is the 200-Hour Kundalini Yoga TTC */}
        <section id="explained" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="w-[90%] max-w-[1320px] mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center w-full mb-8 lg:mb-10">
              <Kicker>200-Hour Kundalini YTTC Explained</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What Is the 200-Hour Kundalini Yoga TTC?
              </h2>
              <HeadingDivider />
            </div>

            {/* Explanatory Paragraphs */}
            <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
              <p>
                The 200-Hour Kundalini Yoga Teacher Training Course (YTTC) in Rishikesh is our complete, Yoga Alliance USA RYS-200 registered certification, built around chakra activation, classical Kundalini kriya and rhythmic breathwork. Kundalini, Prana and Energy are, at heart, the same idea seen through three lenses — Tantra, Raja and Hatha yoga, and the practical world — and this course covers Steps 1 and 2 of our Kundalini method: discovering and awakening your chakras.
              </p>

              <p>
                At Siddhant School of Yoga, the 200-hour Kundalini yoga TTC runs over 24 immersive days and is taught personally by Acharya Siddhant. The course covers chakra science, Kundalini kriya, pranayama, Ashtanga Vinyasa, meditation, mantra chanting, yogic anatomy, basic Ayurveda and teaching methodology, combined with residential ashram living and three vegetarian meals a day. Batches stay small, with 10 to 15 students, and the course is suitable for complete beginners through advanced students.
              </p>

              <p>
                Graduates of this course receive a Yoga Alliance USA RYS-200 certificate and leave with a strong, confident personal practice and the skills to teach. Many students choose to continue on to our 300-Hour Advanced Kundalini TTC, going on to balance their chakras and approach Kundalini itself.
              </p>
            </div>

            {/* Quick Facts Table Box */}
            <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                200-Hour Kundalini Yoga TTC in Rishikesh — Quick Facts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Course length
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    200 hours &middot; 24 days
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
                    Yoga Alliance USA Registered RYT 200
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
                    Beginners through advanced students
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
                  src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                  alt: "Sattvic vegetarian meals at Siddhant School of Yoga",
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
                  Kundalini simply means energy — the most potent, practical system in the yogic path, often called the mother of all yoga. Taught traditionally in four steps (discover, awaken, balance, then awaken Kundalini itself), this 200-hour course covers steps one and two in full: discovering and awakening every one of your chakras.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  It is our complete Yoga Alliance USA RYS-200 Kundalini TTC at Siddhant School of Yoga in Rishikesh, building real understanding of chakra and Kundalini practice to help you handle life&apos;s challenges more wisely — and to teach others to do the same.
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
                  To awaken your Kundalini energy, you must awaken your chakras. There are said to be 114 chakras in the body — out of them, these 7 are the most important:
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
                          By awakening your {c.title.split(" ")[0]} Chakra, you can {c.desc.charAt(0).toLowerCase() + c.desc.slice(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-[#f4efe6] border-l-4 border-[#b85c00] rounded-r-2xl px-5 py-4">
                  <p className="text-sm sm:text-base text-[#1e2422] italic leading-relaxed font-medium">
                    &ldquo;Kundalini is a secret and sacred word — in practice, it simply means energy: the hidden power already within you, waiting to rise.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Kundalini200HourLivingAtAshram />

        <Kundalini200HourSyllabusSection />

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

        <Kundalini200HourWhoShouldJoin />

        {/* Why Choose Us */}
        <section id="kundalini-why-choose-us" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Why Choose Us</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Why Siddhant School of Yoga Is the Right Choice for Your 200-Hour Kundalini YTTC?
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

        <Kundalini200HourDatesFees />

        <Kundalini200HourDailySchedule />
        <Kundalini200HourWhatsInclude />

        <Kundalini200HourEarlyBirdCta />
        <Kundalini200HourExcursionsSection />

        <Kundalini200HourFounderSection />

        <ResidentialExperience showSchedule={false} />

        <Kundalini200HourBeyondGraduation />

        <Teachers />

        <Kundalini200HourFaqSection />

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

import Image from "next/image";
import { Flame, Wind, Moon, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import TrustStrip from "@/components/home/TrustStrip";
import ResidentialExperience from "@/components/home/ResidentialExperience";
import Kundalini300HourFounderSection from "@/components/kundalini/300hr/FounderSection";
import Kundalini300HourBeyondGraduation from "@/components/kundalini/300hr/BeyondGraduation";
import Teachers from "@/components/home/Teachers";
import CtaBanner from "@/components/home/CtaBanner";
import Kundalini300HourHero from "@/components/kundalini/300hr/Hero";
import Kundalini300HourLivingAtAshram from "@/components/kundalini/300hr/LivingAtAshram";
import CourseGallerySection from "@/components/CourseGallerySection";
import Kundalini300HourWhoShouldJoin from "@/components/kundalini/300hr/WhoShouldJoin";
import Kundalini300HourSyllabusSection from "@/components/kundalini/300hr/SyllabusSection";
import Kundalini300HourDatesFees from "@/components/kundalini/300hr/DatesFees";
import Kundalini300HourDailySchedule from "@/components/kundalini/300hr/DailySchedule";
import Kundalini300HourWhatsInclude from "@/components/kundalini/300hr/WhatsInclude";
import Kundalini300HourEarlyBirdCta from "@/components/kundalini/300hr/EarlyBirdCta";
import Kundalini300HourExcursionsSection from "@/components/kundalini/300hr/ExcursionsSection";
import Kundalini300HourFaqSection from "@/components/kundalini/300hr/FaqSection";
import SectionNav from "@/components/course-pages/SectionNav";
import { Kicker, HeadingDivider } from "@/components/ui";
import { kundaliniTrainings } from "@/data/coursesData";

const course = kundaliniTrainings[2];

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
  title: "300-Hour Advanced Kundalini Yoga Teacher Training in Rishikesh | Siddhant School of Yoga",
  description:
    "Balance your chakras and awaken Kundalini itself on our Yoga Alliance USA RYS-300 registered, 28-day Advanced Kundalini Yoga Teacher Training in Rishikesh — Steps 3 & 4 of our Kundalini method, for 200-hour graduates.",
};

const highlightIcons = [Flame, Wind, Moon, Sparkles];

const whyChooseUsPoints = [
  {
    title: "A Deeper Personal Kundalini Experience",
    text: "This advanced course moves past technique into direct, personal experience — balancing your chakras and approaching Kundalini itself, not just studying the theory.",
  },
  {
    title: "Refined Energy Flow Through Nadi Purification",
    text: "Advanced Nadi Shodhana and Sushumna breathing work clear and refine your subtle energy channels for a genuinely different quality of practice.",
  },
  {
    title: "Mastery of Advanced Asanas & Kriyas",
    text: "Postures like Kapotasana, Gandha Bherundasana and Astavakrasana, taught with the same hands-on correction as every course at Siddhant School of Yoga.",
  },
  {
    title: "Sushumna Breathing & Nadi Shodhana",
    text: "Dedicated practice time for the breathing techniques that traditionally prepare the body and mind for the safe rise of Kundalini energy.",
  },
  {
    title: "Mantra Sadhana for Every Chakra",
    text: "New, advanced chakra mantras and a dedicated mantra sadhana practice, building on the foundation from your 200-hour training.",
  },
  {
    title: "Experienced, One-on-One Guidance",
    text: "Acharya Siddhant and senior faculty guide advanced energy work personally — this is not a practice to explore without close, experienced supervision.",
  },
  {
    title: "Transformation Across Every Area of Life",
    text: "Students consistently describe changes in clarity, confidence and emotional balance that extend well beyond the yoga hall.",
  },
  {
    title: "Preparation for Teaching & Leadership",
    text: "Advanced teaching methodology and practicum prepare you to lead Kundalini classes and guide others through this same transformation.",
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

export default function KundaliniThreeHundredHourPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#0f6b57]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <Kundalini300HourHero />

        {/* What Is the 300-Hour Kundalini Yoga TTC */}
        <section id="explained" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="w-[90%] max-w-[1320px] mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center w-full mb-8 lg:mb-10">
              <Kicker>300-Hour Kundalini YTTC Explained</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What Is the 300-Hour Advanced Kundalini Yoga TTC?
              </h2>
              <HeadingDivider />
            </div>

            {/* Explanatory Paragraphs */}
            <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
              <p>
                The 300-Hour Advanced Kundalini Yoga Teacher Training Course (YTTC) in Rishikesh is our Yoga Alliance USA RYS-300 registered advanced certification, built for graduates of a 200-hour course who are ready to go deeper. Kundalini Yoga is the yogic method to transform your potential energy into kinetic energy, and this course covers Steps 3 and 4 of our Kundalini method: balancing your chakras and awakening Kundalini itself.
              </p>

              <p>
                At Siddhant School of Yoga, the 300-hour Kundalini yoga TTC runs over 28 immersive days and is taught personally by Acharya Siddhant. The course covers advanced Kundalini asana and kriyas, Sushumna breathing, advanced Nadi Shodhana, mantra sadhana, Tantra and Kundalini philosophy, combined with residential ashram living and three vegetarian meals a day. A 200-hour certification is the prerequisite to join.
              </p>

              <p>
                Graduates of this course receive a Yoga Alliance USA RYS-300 certificate and, combined with a 200-hour certificate, become eligible to register as an RYT-500 — recognised by studios and employers worldwide. Many students choose to continue on to our full 500-Hour Kundalini TTC, combining all four steps of the Kundalini method in one uninterrupted journey.
              </p>
            </div>

            {/* Quick Facts Table Box */}
            <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                300-Hour Kundalini Yoga TTC in Rishikesh — Quick Facts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Course length
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    300 hours &middot; 28 days
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
                    Yoga Alliance USA Registered RYS-300
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
                    200-hour certified students going deeper
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
                  src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
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
                  Kundalini Yoga is the yogic method to transform your potential energy into kinetic energy. Taught traditionally in four steps (discover, awaken, balance, then awaken Kundalini itself), this 300-hour course focuses on steps three and four: balancing every chakra you have already discovered and awakened, then approaching Kundalini itself.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  It is our advanced, Yoga Alliance USA RYS-300 Kundalini TTC at Siddhant School of Yoga in Rishikesh, requiring a 200-hour certification as a prerequisite and building real mastery of chakra and Kundalini practice.
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
                  To balance your Kundalini energy, you must balance your chakras. There are said to be 114 chakras in the body — out of them, these 7 are the most important:
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
                          By balancing your {c.title.split(" ")[0]} Chakra, you can {c.desc.charAt(0).toLowerCase() + c.desc.slice(1)}
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

        <Kundalini300HourLivingAtAshram />

        <Kundalini300HourSyllabusSection />

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

        <Kundalini300HourWhoShouldJoin />

        {/* Why Choose Us */}
        <section id="kundalini-why-choose-us" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Why Choose Us</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Why Siddhant School of Yoga Is the Right Choice for Your 300-Hour Kundalini YTTC?
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

        <Kundalini300HourDatesFees />

        <Kundalini300HourDailySchedule />
        <Kundalini300HourWhatsInclude />

        <Kundalini300HourEarlyBirdCta />
        <Kundalini300HourExcursionsSection />

        <Kundalini300HourFounderSection />

        <ResidentialExperience showSchedule={false} />

        <Kundalini300HourBeyondGraduation />

        <Teachers />

        <Kundalini300HourFaqSection />

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

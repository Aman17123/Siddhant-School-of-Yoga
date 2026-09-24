import Image from "next/image";
import { Flame, Wind, Moon, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import TrustStrip from "@/components/home/TrustStrip";
import ResidentialExperience from "@/components/home/ResidentialExperience";
import KundaliniFounderSection from "@/components/kundalini/FounderSection";
import KundaliniBeyondGraduation from "@/components/kundalini/BeyondGraduation";
import Teachers from "@/components/home/Teachers";
import CtaBanner from "@/components/home/CtaBanner";
import KundaliniHero from "@/components/kundalini/KundaliniHero";
import LivingAtAshram from "@/components/kundalini/LivingAtAshram";
import CourseGallerySection from "@/components/CourseGallerySection";
import WhoShouldJoinKundalini from "@/components/kundalini/WhoShouldJoin";
import KundaliniSyllabusSection from "@/components/kundalini/SyllabusSection";
import KundaliniDatesFees from "@/components/kundalini/DatesFees";
import KundaliniDailySchedule from "@/components/kundalini/DailySchedule";
import KundaliniWhatsInclude from "@/components/kundalini/WhatsInclude";
import KundaliniEarlyBirdCta from "@/components/kundalini/EarlyBirdCta";
import KundaliniExcursionsSection from "@/components/kundalini/ExcursionsSection";
import KundaliniFaqSection from "@/components/kundalini/FaqSection";
import SectionNav from "@/components/course-pages/SectionNav";
import { Kicker, HeadingDivider } from "@/components/ui";
import { kundaliniTrainings } from "@/data/coursesData";

const course = kundaliniTrainings[0];

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
  title: "100-Hour Kundalini Yoga Teacher Training in Rishikesh, India | Siddhant School of Yoga",
  description:
    "Discover and awaken your 7 main chakras through classical Kundalini asana, pranayama and meditation on our 13-day, 100-Hour Kundalini Yoga Teacher Training in Rishikesh — Part 1 of our 200-hour Kundalini TTC.",
};

const highlightIcons = [Flame, Wind, Moon, Sparkles];

const whyChooseUsPoints = [
  {
    title: "Part 1 of Our Yoga Alliance 200-Hour Kundalini Pathway",
    text: "This 100-hour course is the first part of our Yoga Alliance USA-approved 200-hour Kundalini curriculum, giving you a genuine head start toward full certification.",
  },
  {
    title: "Taught by Acharya Siddhant & Senior Faculty",
    text: "Every subject — chakra science, kundalini kriya, pranayama and meditation — is taught by a dedicated, experienced teacher, giving you real depth in every class.",
  },
  {
    title: "Small Batch Sizes for Personal Attention",
    text: "We keep our batches to just 10–15 students, so every student gets hands-on correction and direct, personal feedback.",
  },
  {
    title: "Trusted by Students From Around the World",
    text: "Over 15+ years, students from dozens of countries have trained with us, with an average Google rating of 4.9 out of 5.",
  },
  {
    title: "Transparent, All-Inclusive Pricing",
    text: "Our course fee covers accommodation, meals, classes and study material, so there are no hidden costs to worry about.",
  },
  {
    title: "Authentic Kundalini Kriya & Pranayama",
    text: "Acharya Siddhant's signature chakra and kundalini curriculum goes deeper than most schools, building real energetic awareness — not just theory.",
  },
  {
    title: "Nutritious Meals & Comfortable Stay",
    text: "Enjoy clean, comfortable shared or private rooms and three healthy vegetarian meals a day, with herbal tea served daily.",
  },
  {
    title: "Short Excursions & Cultural Immersion",
    text: "A short excursion trip and free airport pickup from Dehradun add ease and a taste of local culture to your 13-day stay.",
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

export default function KundaliniHundredHourPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#0f6b57]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <KundaliniHero />

        {/* What Is the 100-Hour Kundalini Yoga TTC */}
        <section id="explained" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="w-[90%] max-w-[1320px] mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center w-full mb-8 lg:mb-10">
              <Kicker>100-Hour Kundalini YTTC Explained</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What Is the 100-Hour Kundalini Yoga TTC?
              </h2>
              <HeadingDivider />
            </div>

            {/* Explanatory Paragraphs */}
            <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
              <p>
                The 100-Hour Kundalini Yoga Teacher Training Course (YTTC) in Rishikesh is a foundational, beginner-friendly program built around chakra activation, classical kundalini kriya and rhythmic breathwork. It is the first part of our full 200-hour Kundalini Yoga TTC, and is ideal for beginners, energy workers and anyone exploring kundalini practice in Rishikesh before advancing to a longer program.
              </p>

              <p>
                At Siddhant School of Yoga, the 100-hour kundalini yoga TTC runs over 13 immersive days and is taught personally by Acharya Siddhant. The course covers chakra science and kundalini kriya, pranayama, meditation, mantra chanting and yogic anatomy, combined with residential ashram living and three sattvic meals a day.
              </p>

              <p>
                Graduates of this beginner kundalini teacher training in Rishikesh receive a Siddhant School of Yoga Certificate of Completion and leave with a strong, confident personal practice. Many students choose to continue with Part 2 of our 200-hour kundalini yoga teacher training course, building toward a full kundalini teaching career anywhere in the world.
              </p>
            </div>

            {/* Quick Facts Table Box */}
            <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                100-Hour Kundalini Yoga TTC in Rishikesh — Quick Facts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Course length
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    100 hours &middot; 13 days
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
                    School Certificate — Part 1 of 200-Hour TTC
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
                    Beginners &amp; energy-work seekers
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
                  Kundalini simply means energy — the most potent, practical system in the yogic path. Taught traditionally in four steps (discover, awaken, balance, then awaken Kundalini itself), this 100-hour course focuses on step one: discovering and locating your chakras.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  It's Part 1 of our 200-Hour Kundalini TTC at Siddhant School of Yoga, a Yoga Alliance USA approved school in Rishikesh, building real understanding of chakra and kundalini practice to help you handle life's challenges more wisely.
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

        <LivingAtAshram />

        <KundaliniSyllabusSection />

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

        <WhoShouldJoinKundalini />

        {/* Why Choose Us */}
        <section id="kundalini-why-choose-us" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Why Choose Us</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Why Siddhant School of Yoga Is the Right Choice for Your 100-Hour Kundalini YTTC?
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

        <KundaliniDatesFees />

        <KundaliniDailySchedule />
        <KundaliniWhatsInclude />

        <KundaliniEarlyBirdCta />
        <KundaliniExcursionsSection />

        <KundaliniFounderSection />

        <ResidentialExperience showSchedule={false} />

        <KundaliniBeyondGraduation />

        <Teachers />

        <KundaliniFaqSection />

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

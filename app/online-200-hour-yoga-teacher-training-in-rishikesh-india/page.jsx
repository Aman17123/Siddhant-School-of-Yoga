import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseGallerySection from "@/components/CourseGallerySection";
import CourseHero from "@/components/course-pages/CourseHero";
import Online200HourContent from "@/components/course-pages/Online200HourContent";
import { Kicker, HeadingDivider } from "@/components/ui";

const heroBadges = [
  { icon: "Clock", label: "24 Days Live Online" },
  { icon: "Award", label: "Yoga Alliance USA RYT 200" },
  { icon: "Users", label: "Small Batches of 10–15" },
];

export const metadata = {
  title: "Online 200 Hour Yoga Teacher Training | Siddhant School of Yoga",
  description:
    "Become a certified yoga teacher from home. 24-day live Online 200 Hour Yoga TTC with Siddhant School of Yoga, Rishikesh. Yoga Alliance USA. $499.",
};

export default function Online200HourYogaTTCPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="MonitorPlay"
          kickerText="Live Online · Yoga Alliance USA Certified"
          title="Online 200-Hour Yoga Teacher Training"
          subtitle="Learn authentic Rishikesh yoga from your home — 24 days of live, interactive classes with Acharya Siddhant's team, the same Yoga Alliance USA RYS-200 curriculum as our residential course, and a globally recognized certificate."
          badges={heroBadges}
          bgImage="/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp"
          bgImageAlt="Live online yoga philosophy class with Siddhant School of Yoga"
          whatsappIntro="Namaste! I'd like to know more about the Online 200-Hour Yoga TTC."
        />

        {/* What Is the Online 200-Hour Yoga TTC */}
        <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="w-[90%] max-w-[1320px] mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center w-full mb-8 lg:mb-10">
              <Kicker>Course Overview</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What Is the Online 200-Hour Yoga Teacher Training Course?
              </h2>
              <HeadingDivider />
            </div>

            {/* Explanatory Paragraphs */}
            <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
              <p>
                Yoga is the right way to live life, but it is not always possible to travel to India. This 200-Hour Online Yoga Teacher Training brings Siddhant School of Yoga — a Yoga Alliance USA Registered Yoga School in Rishikesh — to your home. Over 24 days of live classes, you receive the same traditional yoga practice for personal and professional growth: Ashtanga Vinyasa, Hatha yoga, pranayama, bandha, mudra, mantra chanting, philosophy, Yoga Nidra, relaxation, anatomy, physiology and basic Ayurveda.
              </p>

              <p>
                Our teachers are trained in online teaching, so classes stay interactive and personal rather than a one-way video call. Alongside your live sessions, you receive a digital study manual and extra video material to support your learning between classes. Batches are kept small so teachers can still see, hear and correct you, just as they would in the yoga hall.
              </p>

              <p>
                The online certificate carries the same value as our residential certificate. On successful completion, you receive a 200-hour Yoga Alliance USA Registered RYT 200 certificate, along with a personalized 100-day post-graduation practice schedule and ongoing support from our teaching team.
              </p>
            </div>

            {/* Pull Quote */}
            <div className="max-w-3xl mx-auto mb-8 rounded-2xl border border-[#1c3b2b]/30 bg-[#f4efe6] px-5 sm:px-8 py-5 text-center">
              <p className="text-sm sm:text-base text-stone-700 italic leading-relaxed">
                &ldquo;The 200 Hour Online Yoga TTC gives you traditional yoga practices for your practical, personal and professional growth.&rdquo;
              </p>
              <p className="mt-2 font-belleza text-sm text-[#1c3b2b]">— Acharya Siddhant</p>
            </div>

            {/* Quick Facts Table Box */}
            <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                Online 200-Hour Yoga TTC — Quick Facts
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
                    All Levels &mdash; beginner friendly
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
                    Acharya Siddhant &amp; team
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b md:border-b-0 border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    What&apos;s included
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Live classes, recordings, digital manual, bonus meditation course
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Ideal for
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Anyone who can&apos;t travel to India right now
                  </span>
                </div>
              </div>
            </div>

            {/* Gallery + Video Showcase */}
            <CourseGallerySection
              className="mt-10 lg:mt-12"
              mainImage="/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp"
              mainImageAlt="Live online yoga philosophy class with Siddhant School of Yoga"
              caption="What a live online class looks like"
              videoId="w4_12OUppgM"
              images={[
                {
                  src: "/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp",
                  alt: "Teacher demonstrating asana practice for the live online class",
                },
                {
                  src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp",
                  alt: "Alignment demonstration streamed to online students",
                },
                {
                  src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp",
                  alt: "Acharya Siddhant mentoring a student",
                },
                {
                  src: "/images/gallery_images/yoga-teacher-training-certificate-ceremony-siddhant-school-rishikesh.webp",
                  alt: "200-hour certification ceremony at Siddhant School of Yoga",
                },
              ]}
            />
          </div>
        </section>

        <Online200HourContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

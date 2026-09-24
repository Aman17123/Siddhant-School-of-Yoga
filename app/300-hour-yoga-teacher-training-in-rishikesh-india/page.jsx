import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseGallerySection from "@/components/CourseGallerySection";
import CourseHero from "@/components/course-pages/CourseHero";
import ThreeHundredHourContent from "@/components/course-pages/ThreeHundredHourContent";
import { Kicker, HeadingDivider } from "@/components/ui";

const heroBadges = [
  { icon: "Clock", label: "28 Days Residential" },
  { icon: "Award", label: "Yoga Alliance USA RYS-300" },
  { icon: "Users", label: "Path to RYT-500" },
];

export const metadata = {
  title: "300 Hour Advanced Yoga Teacher Training in Rishikesh | Siddhant School of Yoga",
  description:
    "Advance your teaching with our 28-day 300 Hour Yoga TTC in Rishikesh. Advanced asana, pranayama, kundalini, scriptures. Yoga Alliance RYS-300. From $1,799.",
};

export default function ThreeHundredHourYogaTTCPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Award"
          kickerText="Advanced Certification · 200-Hour Graduates"
          title="300-Hour Advanced Yoga Teacher Training in Rishikesh"
          subtitle="Master advanced Hatha and Ashtanga Vinyasa, and deepen your pranayama, kundalini, anatomy and philosophy in the Yoga Capital of the World — the next step after your 200-Hour certification."
          badges={heroBadges}
          bgImage="/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp"
          bgImageAlt="Advanced yoga philosophy and practice session at Siddhant School of Yoga, Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the 300-Hour Yoga TTC in Rishikesh."
        />

        {/* What Is the 300-Hour Yoga TTC */}
        <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="w-[90%] max-w-[1320px] mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center w-full mb-8 lg:mb-10">
              <Kicker>Course Overview</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What Is the 300-Hour Yoga Teacher Training Course?
              </h2>
              <HeadingDivider />
            </div>

            {/* Explanatory Paragraphs */}
            <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
              <p>
                Have you completed a 200-Hour Yoga Teacher Training from a Yoga Alliance Registered Yoga School? This advanced 300-Hour Yoga Teacher Training in Rishikesh is the natural next step — more intense practice, new advanced techniques and a deeper immersion into the traditional yogic lifestyle. Built on the foundation of your 200-hour training, this 28-day residential course takes you from intermediate to advanced level.
              </p>

              <p>
                Students explore daily detox, mantra chanting, secret breathing techniques, traditional Hatha yoga, classical Ashtanga Vinyasa, meditation, relaxation, and Kundalini and Chakra yoga — discovering hidden qualities within and becoming a complete, confident teacher. Alongside advanced practice, you&apos;ll learn how to arrange and sequence classes, answer students&apos; questions, and run your own yoga retreats and yoga centre.
              </p>

              <p>
                On successful completion, graduates receive a 300-hour Yoga Alliance USA Registered RYS-300 certificate — and, combined with a prior 200-hour certification, become eligible to register as an RYT-500, the highest teaching credential Yoga Alliance offers. As Acharya Siddhant puts it: &ldquo;Reward yourself with the highest experience of practice and teaching, with yoga and spirituality together.&rdquo;
              </p>
            </div>

            {/* Quick Facts Table Box */}
            <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                300-Hour Yoga TTC in Rishikesh — Quick Facts
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
                    Intermediate to Advanced (200-Hour graduates)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Certification
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Yoga Alliance USA Registered RYS-300 &mdash; path to RYT-500
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
                    Certified 200-Hour teachers ready to go deeper
                  </span>
                </div>
              </div>
            </div>

            {/* Gallery + Video Showcase */}
            <CourseGallerySection
              className="mt-10 lg:mt-12"
              mainImage="/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp"
              mainImageAlt="Advanced yoga philosophy class during the 300-Hour Yoga Teacher Training in Rishikesh"
              caption="Advancing from teacher to master practitioner"
              videoId="w4_12OUppgM"
              images={[
                {
                  src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp",
                  alt: "Acharya Siddhant presenting a certificate to an advanced graduate",
                },
                {
                  src: "/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp",
                  alt: "200-hour and 500-hour yoga teacher training certification batch in Rishikesh",
                },
                {
                  src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp",
                  alt: "Advanced yoga teacher training students practicing in the Himalayan mountains",
                },
                {
                  src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp",
                  alt: "Advanced asana practice by the Ganges river in Rishikesh",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                  alt: "Sattvic vegetarian meals at Siddhant School of Yoga",
                },
              ]}
            />
          </div>
        </section>

        <ThreeHundredHourContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseGallerySection from "@/components/CourseGallerySection";
import CourseHero from "@/components/course-pages/CourseHero";
import FiveHundredAyurvedaContent from "@/components/course-pages/FiveHundredAyurvedaContent";
import { Kicker, HeadingDivider } from "@/components/ui";

const heroBadges = [
  { icon: "Clock", label: "About 8 Weeks Residential" },
  { icon: "Award", label: "Yoga Alliance USA RYT 500" },
  { icon: "Users", label: "Includes Ayurveda Module" },
];

export const metadata = {
  title: "500 Hour Yoga & Ayurveda Teacher Training Rishikesh | Siddhant School of Yoga",
  description:
    "Master yoga and Ayurveda together in our 8-week 500 Hour Yoga & Ayurveda TTC in Rishikesh. Yoga Alliance USA certified. Small batches. From $2,199.",
};

export default function FiveHundredHourAyurvedaTTCPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sparkles"
          kickerText="Yoga & Ayurveda Combined · 500-Hour Certification"
          title="500-Hour Yoga & Ayurveda Teacher Training in Rishikesh"
          subtitle="Where Ayurveda meets yoga — an advanced 8-week residential training combining the full 200 + 300 hour yoga curriculum with a dedicated Ayurveda module, for true holistic wellness teaching."
          badges={heroBadges}
          bgImage="/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg"
          bgImageAlt="Ayurvedic meals and holistic wellness at Siddhant School of Yoga, Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the 500-Hour Yoga & Ayurveda TTC in Rishikesh."
        />

        {/* What Is the 500-Hour Yoga & Ayurveda TTC */}
        <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="w-[90%] max-w-[1320px] mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center w-full mb-8 lg:mb-10">
              <Kicker>Course Overview</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What Is the 500-Hour Yoga &amp; Ayurveda Teacher Training Course?
              </h2>
              <HeadingDivider />
            </div>

            {/* Explanatory Paragraphs */}
            <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
              <p>
                Siddhant School of Yoga presents a 500-Hour Yoga &amp; Ayurveda Teacher Training in Rishikesh, approved by Yoga Alliance USA. It combines the full 200-Hour and 300-Hour yoga curriculum with a dedicated Ayurveda module, for serious practitioners and aspiring teachers who want complete transformation of body, mind and consciousness.
              </p>

              <p>
                Across roughly eight residential weeks, students deepen their practice of Hatha and Ashtanga yoga, philosophy, meditation, mantra, anatomy and physiology, and learn the holistic wisdom of Ayurveda — doshas, digestion, daily routines, diet and herbs — to guide students toward true balance. This course is a milestone in personal and professional growth: students leave not only with a certificate, but with a deeper sense of self, a balanced lifestyle, and the confidence to guide others toward holistic wellness.
              </p>

              <p className="italic text-[#1c3b2b]">
                &ldquo;Ayurveda meets yoga: advanced 500 Hour teacher training in Rishikesh for true wellness.&rdquo; — Acharya Siddhant
              </p>
            </div>

            {/* Quick Facts Table Box */}
            <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                500-Hour Yoga &amp; Ayurveda TTC in Rishikesh — Quick Facts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Course length
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    500 hours &middot; about 8 weeks (56 days)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Level
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Beginner to Advanced
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Certification
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Yoga Alliance USA Registered RYT 500 + Ayurveda module certificate
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
                    Accommodation, Ayurvedic meals, study material, dosha assessment
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Ideal for
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Practitioners who want yoga and Ayurveda together
                  </span>
                </div>
              </div>
            </div>

            {/* Gallery + Video Showcase */}
            <CourseGallerySection
              className="mt-10 lg:mt-12"
              mainImage="/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp"
              mainImageAlt="500-Hour Yoga and Ayurveda Teacher Training certification batch in Rishikesh"
              caption="Becoming a 500-Hour Yoga & Ayurveda certified teacher in Rishikesh"
              videoId="w4_12OUppgM"
              images={[
                {
                  src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp",
                  alt: "Acharya Siddhant presenting a certificate to a graduate",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                  alt: "Ayurvedic meals served at Siddhant School of Yoga",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                  alt: "Sattvic and Ayurvedic vegetarian meals at Siddhant School of Yoga",
                },
                {
                  src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp",
                  alt: "Yoga and Ayurveda students practicing in the Himalayan mountains",
                },
                {
                  src: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp",
                  alt: "Yoga philosophy and Ayurveda class at Siddhant School of Yoga",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                  alt: "Twin sharing room for 500-hour Yoga & Ayurveda TTC students",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                  alt: "Private room accommodation for residential students",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                  alt: "Triple sharing room at Siddhant School of Yoga",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                  alt: "Comfortable student room with bed and wardrobe",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                  alt: "Ayurvedic sattvic thali with rice, dal and raita",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                  alt: "Traditional Ayurvedic thali served on a banana leaf",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                  alt: "Dining hall and kitchen preparing Ayurvedic meals",
                },
                {
                  src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                  alt: "Exterior of the Siddhant School of Yoga campus",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                  alt: "Washroom with hot water shower for students",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                  alt: "Attached bathroom in a residential student room",
                },
                {
                  src: "/images/vegetarian-meal-spread.jpg",
                  alt: "Vegetarian meal spread reflecting Ayurvedic principles",
                },
                {
                  src: "/images/yoga-philosophy-satsang-class.png",
                  alt: "Satsang class covering yoga and Ayurveda philosophy",
                },
                {
                  src: "/images/gomukhasana-cow-face-pose-students-rishikesh.jpg",
                  alt: "Students practicing Gomukhasana (cow face pose)",
                },
                {
                  src: "/images/low-lunge-pose-group-lawn-class.jpg",
                  alt: "Low lunge pose during outdoor lawn yoga class",
                },
                {
                  src: "/images/seated-spinal-twist-group-class.png",
                  alt: "Seated spinal twist group class for holistic wellness",
                },
                {
                  src: "/images/standing-forward-fold-group-class.png",
                  alt: "Standing forward fold group practice",
                },
                {
                  src: "/images/outdoor-garden-yoga-class-stretching-rishikesh.jpg",
                  alt: "Outdoor garden yoga stretching class",
                },
                {
                  src: "/images/yoga-alignment-adjustment-with-straps-ttc-rishikesh.jpg",
                  alt: "Teacher assisting alignment with straps during TTC",
                },
                {
                  src: "/images/havan-fire-ceremony-yoga-ttc-rishikesh.jpg",
                  alt: "Havan fire ceremony marking course completion",
                },
                {
                  src: "/images/graduation-flower-garland-photo.jpg",
                  alt: "Graduate wearing a flower garland at the ceremony",
                },
                {
                  src: "/images/yoga-ttc-graduates-fire-ceremony-siddhant-school-of-yoga.jpg",
                  alt: "500-hour Yoga & Ayurveda graduates at the fire ceremony",
                },
              ]}
            />
          </div>
        </section>

        <FiveHundredAyurvedaContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

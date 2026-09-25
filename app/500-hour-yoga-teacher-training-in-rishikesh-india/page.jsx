import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseGallerySection from "@/components/CourseGallerySection";
import CourseHero from "@/components/course-pages/CourseHero";
import FiveHundredHourContent from "@/components/course-pages/FiveHundredHourContent";
import { Kicker, HeadingDivider } from "@/components/ui";

const heroBadges = [
  { icon: "Clock", label: "About 8 Weeks Residential" },
  { icon: "Award", label: "Yoga Alliance USA RYT 500" },
  { icon: "Users", label: "Beginner to Advanced" },
];

export const metadata = {
  title: "500 Hour Yoga Teacher Training in Rishikesh, India | Siddhant School of Yoga",
  description:
    "Go from practitioner to master with our 8-week 500 Hour Yoga TTC in Rishikesh. Full 200 + 300 hour curriculum. Yoga Alliance USA. From $1,699.",
};

export default function FiveHundredHourYogaTTCPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Award"
          kickerText="Comprehensive 200 + 300 Hour Master Journey"
          title="500-Hour Yoga Teacher Training in Rishikesh"
          subtitle="Eight weeks of deep, regular practice combining our 200-Hour and 300-Hour courses into one uninterrupted Himalayan journey — become a complete, internationally certified Yoga Master under Acharya Siddhant."
          badges={heroBadges}
          bgImage="/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp"
          bgImageAlt="500-Hour Yoga Teacher Training certification batch in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the 500-Hour Yoga TTC in Rishikesh."
        />

        {/* What Is the 500-Hour Yoga TTC */}
        <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="w-[90%] max-w-[1320px] mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center w-full mb-8 lg:mb-10">
              <Kicker>Course Overview</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What Is the 500-Hour Yoga Teacher Training Course?
              </h2>
              <HeadingDivider />
            </div>

            {/* Explanatory Paragraphs */}
            <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
              <p>
                Siddhant School of Yoga presents a 500-Hour Yoga Teacher Training in Rishikesh, approved by Yoga Alliance USA. It combines our 200-Hour and 300-Hour courses into one long, uninterrupted program — because regular practice over a longer period creates a real daily yoga habit, and that habit brings growth in practical, professional and spiritual life alike.
              </p>

              <p>
                Students can also complete the 200-Hour and 300-Hour courses separately, but the 500-Hour path is recommended: long, continuous practice builds good habits and prepares you to present yourself as a confident, capable teacher. Over about eight weeks, you move through Hatha yoga, Ashtanga Vinyasa, pranayama, bandha, mudra, shatkarma, yoga philosophy, anatomy and physiology, meditation, mantra chanting, Yoga Nidra, basic Ayurveda and basic naturopathy — the complete foundation-to-mastery curriculum in one sitting.
              </p>

              <p>
                Yoga, at its heart, is about redesigning the subconscious mind, which controls roughly 95% of our daily life — a well-trained subconscious mind becomes a faithful friend for the rest of your journey. On successful completion, graduates receive a Yoga Alliance USA Registered RYT 500 certificate, the highest widely recognized yoga teacher credential, along with a personalized 100-day post-graduation practice schedule and ongoing mentorship from Acharya Siddhant.
              </p>
            </div>

            {/* Pull Quote */}
            <div className="max-w-3xl mx-auto mb-8 rounded-2xl border border-[#1c3b2b]/20 bg-[#f4efe6] px-5 sm:px-8 py-5 sm:py-6 text-center">
              <p className="text-sm sm:text-base text-[#1c3b2b] italic leading-relaxed font-medium">
                &ldquo;The 500 Hour Yoga TTC helps you rearrange and redesign your subconscious mind to achieve anything and everything in your life.&rdquo;
              </p>
              <p className="mt-2 text-xs sm:text-sm font-belleza text-[#1c3b2b]/80">— Siddhant Ji</p>
            </div>

            {/* Quick Facts Table Box */}
            <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                500-Hour Yoga TTC in Rishikesh — Quick Facts
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
                    Beginner to Advanced (dual immersion)
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
                    Accommodation, sattvic meals, study material
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Ideal for
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Students committed to yoga as a profession
                  </span>
                </div>
              </div>
            </div>

            {/* Gallery + Video Showcase */}
            <CourseGallerySection
              className="mt-10 lg:mt-12"
              mainImage="/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp"
              mainImageAlt="200-hour and 500-hour yoga teacher training certification batch in Rishikesh"
              caption="Becoming a Yoga Master in Rishikesh"
              videoId="w4_12OUppgM"
              images={[
                {
                  src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp",
                  alt: "Acharya Siddhant presenting a certificate to a graduate",
                },
                {
                  src: "/images/gallery_images/yoga-teacher-training-certificate-ceremony-siddhant-school-rishikesh.webp",
                  alt: "500-hour graduation certificate ceremony at Siddhant School of Yoga",
                },
                {
                  src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp",
                  alt: "Yoga teacher training students practicing in the Himalayan mountains",
                },
                {
                  src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp",
                  alt: "Students on a temple visit in Rishikesh",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                  alt: "Sattvic vegetarian meals at Siddhant School of Yoga",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                  alt: "Twin sharing room accommodation for 500-hour TTC students",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                  alt: "Private room accommodation at Siddhant School of Yoga",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                  alt: "Triple sharing room for residential 500-hour students",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                  alt: "Student room with bed and wardrobe at the ashram",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                  alt: "Sattvic thali with rice, dal and raita served daily",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                  alt: "Traditional thali served on a banana leaf",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                  alt: "Lunch tray with fresh juice for students",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
                  alt: "Dining hall and kitchen at Siddhant School of Yoga",
                },
                {
                  src: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
                  alt: "Exterior view of the Siddhant School of Yoga building",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg",
                  alt: "Washroom with hot water shower for residential students",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                  alt: "Attached bathroom in a student room",
                },
                {
                  src: "/images/500-hour-yoga-ttc-rishikesh.png",
                  alt: "500-hour Yoga TTC students in class at Siddhant School of Yoga",
                },
                {
                  src: "/images/plank-pose-group-yoga-session-rishikesh.jpg",
                  alt: "Group plank pose session during advanced asana practice",
                },
                {
                  src: "/images/triangle-pose-garden-yoga-class-rishikesh.jpg",
                  alt: "Triangle pose practiced in the garden yoga class",
                },
                {
                  src: "/images/eagle-pose-garudasana-group-class-rishikesh.jpg",
                  alt: "Eagle pose (Garudasana) group class in Rishikesh",
                },
                {
                  src: "/images/head-to-knee-forward-bend-group-class-rishikesh.jpg",
                  alt: "Head-to-knee forward bend group class",
                },
                {
                  src: "/images/side-angle-pose-garden-yoga-class-rishikesh.jpg",
                  alt: "Side angle pose during outdoor garden yoga class",
                },
                {
                  src: "/images/sphinx-pose-outdoor-yoga-class-rishikesh.jpg",
                  alt: "Sphinx pose practiced during outdoor yoga class",
                },
                {
                  src: "/images/teacher-adjusting-warrior-pose-outdoor-class-rishikesh.jpg",
                  alt: "Teacher adjusting a student's warrior pose outdoors",
                },
                {
                  src: "/images/havan-fire-ceremony-yoga-ttc-rishikesh.jpg",
                  alt: "Havan fire ceremony during 500-hour TTC graduation",
                },
                {
                  src: "/images/tilak-blessing-ceremony-yoga-ttc-graduation-rishikesh.jpg",
                  alt: "Tilak blessing ceremony at graduation",
                },
                {
                  src: "/images/ttc-graduation-ceremony-group-photo.png",
                  alt: "500-hour TTC graduation ceremony group photo",
                },
                {
                  src: "/images/yoga-ttc-graduates-marigold-garlands-rishikesh.jpg",
                  alt: "500-hour graduates wearing marigold garlands",
                },
                {
                  src: "/images/student-receiving-yoga-certificate-siddhant-school-rishikesh.jpg",
                  alt: "Student receiving their 500-hour yoga certificate",
                },
              ]}
            />
          </div>
        </section>

        <FiveHundredHourContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

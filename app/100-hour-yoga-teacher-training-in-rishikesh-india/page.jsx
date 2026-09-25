import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseGallerySection from "@/components/CourseGallerySection";
import CourseHero from "@/components/course-pages/CourseHero";
import OneHundredHourContent from "@/components/course-pages/OneHundredHourContent";
import { Kicker, HeadingDivider } from "@/components/ui";

const heroBadges = [
  { icon: "Clock", label: "13 Days Residential" },
  { icon: "Award", label: "School Certificate — Part 1 of 200h" },
  { icon: "Users", label: "Beginner Friendly · No Experience Needed" },
];

export const metadata = {
  title: "100 Hour Yoga Teacher Training in Rishikesh, India | Siddhant School of Yoga",
  description:
    "Join the 100-hour beginner Yoga Teacher Training in Rishikesh, India at Siddhant School of Yoga — a foundational immersion in Hatha & Ashtanga, pranayama, and philosophy, taught personally by Acharya Siddhant.",
};

export default function HundredHourYogaTTCPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sunrise"
          kickerText="A Foundational Immersion · Hatha & Ashtanga"
          title="100-Hour Yoga Teacher Training in Rishikesh"
          subtitle="A beginner-friendly foundational TTC in Rishikesh — real fundamentals in Hatha & Ashtanga asana, pranayama, meditation and yogic anatomy, taught personally by Acharya Siddhant."
          badges={heroBadges}
          bgImage="/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp"
          bgImageAlt="100-Hour Yoga Teacher Training in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the 100-Hour Yoga TTC in Rishikesh."
        />

        {/* What Is the 100-Hour Yoga TTC */}
        <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="w-[90%] max-w-[1320px] mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center w-full mb-8 lg:mb-10">
              <Kicker>100-Hour YTTC Explained</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What Is the 100-Hour Yoga TTC?
              </h2>
              <HeadingDivider />
            </div>

            {/* Explanatory Paragraphs */}
            <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
              <p>
                The 100-Hour Yoga Teacher Training Course (YTTC) in Rishikesh is a foundational, beginner-friendly program that gives you the right knowledge and a deep understanding of yoga, along with proper training in yogic tips and techniques to revitalize the body and mind. It is the first part of our full 200-hour Yoga Teacher Training, approved by Yoga Alliance USA, and is ideal for beginners, wellness enthusiasts, and anyone exploring yoga in Rishikesh before advancing to a longer program.
              </p>

              <p>
                At Siddhant School of Yoga, the 100-hour yoga TTC in Rishikesh runs over 13 immersive days and is taught personally by Acharya Siddhant. This course covers the first two parts of the full 200-hour path — understanding yoga and right yoga practice — including Classical Hatha and Ashtanga asana, pranayama, meditation, mantra chanting, and yogic anatomy, combined with residential ashram living and three meals a day.
              </p>

              <p>
                Graduates of this beginner yoga teacher training in Rishikesh receive a Siddhant School of Yoga Certificate of Completion and leave with a strong, confident personal practice. Many students choose to continue with Part 2 of our 200-hour yoga teacher training course, building toward full Yoga Alliance USA RYT 200 certification and a lifelong career teaching yoga anywhere in the world.
              </p>
            </div>

            {/* Quick Facts Table Box */}
            <div className="w-full rounded-2xl border border-[#e3dac9] p-4 sm:p-5 bg-[#fdfbf7] shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                100-Hour Yoga TTC in Rishikesh — Quick Facts
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
                    Beginner to Intermediate
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#e3dac9]/70 text-center sm:text-left">
                  <span className="text-[#1c3b2b] font-medium shrink-0">
                    Certification
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    School Certificate — Part 1 of 200-Hour YTTC
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
                    Beginners &amp; personal practice seekers
                  </span>
                </div>
              </div>
            </div>

            {/* Gallery + Video Showcase */}
            <CourseGallerySection
              className="mt-10 lg:mt-12"
              mainImage="/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp"
              mainImageAlt="Yoga asana practice by the Ganges riverside in Rishikesh"
              caption="Yoga journey at Rishikesh's sacred foothills"
              videoId="6tPxEV9skT8"
              images={[
                {
                  src: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp",
                  alt: "Sacred havan fire ceremony at Siddhant School of Yoga",
                },
                {
                  src: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp",
                  alt: "Yoga philosophy class at Siddhant School of Yoga",
                },
                {
                  src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp",
                  alt: "Warrior pose yoga practice by the Ganges river in Rishikesh",
                },
                {
                  src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp",
                  alt: "Students on a temple visit in Rishikesh",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
                  alt: "Sattvic vegetarian meals at Siddhant School of Yoga",
                },
                {
                  src: "/images/100-hour-yoga-teacher-training-group-pose.jpg",
                  alt: "100-hour trainees practicing a group asana pose",
                },
                {
                  src: "/images/downward-dog-group-class.png",
                  alt: "Beginner students holding downward dog in a group class",
                },
                {
                  src: "/images/child-pose-balasana-group-class-rishikesh.jpg",
                  alt: "Students resting in child's pose during morning practice",
                },
                {
                  src: "/images/outdoor-garden-yoga-class-stretching-rishikesh.jpg",
                  alt: "Outdoor garden yoga class stretching session",
                },
                {
                  src: "/images/seated-asana-group-practice-garden-rishikesh.jpg",
                  alt: "Seated asana group practice in the garden",
                },
                {
                  src: "/images/yoga-for-beginners-seated-stretch-class.jpg",
                  alt: "Beginner-friendly seated stretch class",
                },
                {
                  src: "/images/plank-pose-with-yoga-blocks.jpg",
                  alt: "Students practicing plank pose using yoga blocks",
                },
                {
                  src: "/images/head-to-knee-forward-bend-group-class-rishikesh.jpg",
                  alt: "Group class practicing head-to-knee forward bend",
                },
                {
                  src: "/images/havan-fire-ceremony-yoga-ttc-rishikesh.jpg",
                  alt: "Havan fire ceremony during the 100-hour TTC",
                },
                {
                  src: "/images/yoga-ttc-students-with-certificates-siddhant-school-rishikesh.jpg",
                  alt: "100-hour TTC students holding their completion certificates",
                },
                {
                  src: "/images/student-receiving-yoga-certificate-siddhant-school-rishikesh.jpg",
                  alt: "A student receiving their yoga certificate at graduation",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg",
                  alt: "Twin sharing room accommodation at Siddhant School of Yoga",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-private-room-accommodation.jpg",
                  alt: "Private room accommodation for TTC students",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg",
                  alt: "Triple sharing room for students at the school",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png",
                  alt: "Student room with bed and wardrobe at the ashram",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
                  alt: "Traditional thali served on a banana leaf with puri",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg",
                  alt: "Vegetarian lunch of pulao and sabzi served to students",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg",
                  alt: "Lunch tray with fresh juice at the school dining hall",
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
                  alt: "Washroom with hot water shower facility",
                },
                {
                  src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg",
                  alt: "Attached bathroom in a student room",
                },
              ]}
            />
          </div>
        </section>

        <OneHundredHourContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

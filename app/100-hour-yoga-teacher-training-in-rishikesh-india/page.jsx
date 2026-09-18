import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseGallerySection from "@/components/CourseGallerySection";
import OneHundredHourContent from "@/components/course-pages/OneHundredHourContent";
import { Kicker, HeadingDivider } from "@/components/ui";

export const metadata = {
  title: "100 Hour Yoga Teacher Training in Rishikesh, India | Siddhant School of Yoga",
  description:
    "Join the 100-hour beginner Yoga Teacher Training in Rishikesh, India at Siddhant School of Yoga — a foundational immersion in Hatha & Ashtanga, pranayama, and philosophy, taught personally by Acharya Siddhant.",
};

export default function HundredHourYogaTTCPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#158b72]/30 selection:text-[#0f6b57]">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Hero Banner */}
        <section className="relative min-h-fit sm:min-h-[500px] lg:h-[70vh] lg:max-h-[740px] w-full flex items-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 pt-8 sm:pt-14 lg:pt-16 pb-20 sm:pb-28 lg:pb-36">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              {/* Left: Breadcrumb + Heading */}
              <div className="w-full lg:w-1/2 max-w-xl text-left">
                {/* Breadcrumb */}
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#0f6b57]/80"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-[#158b72] transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0f6b57]/50 shrink-0" />
                  <span className="text-[#0f6b57] font-semibold">100-Hour Yoga TTC</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                  <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                    100-Hour
                  </span>
                  <span className="block text-2xl sm:text-3xl font-normal">
                    Yoga Teacher Training in Rishikesh
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#0f6b57]/90 leading-relaxed max-w-md">
                  A beginner-friendly foundational TTC in Rishikesh — real fundamentals in Hatha &amp; Ashtanga asana, pranayama, meditation and yogic anatomy, taught personally by Acharya Siddhant.
                </p>
              </div>

              {/* Right: Image */}
              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/gallery_images/yoga-certification-ceremony-shiva-statue-rishikesh.webp"
                    alt="100-Hour Yoga Teacher Training in Rishikesh"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Is the 100-Hour Yoga TTC */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/70 font-figtree">
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
            <div className="w-full rounded-2xl border border-[#c8ece2] p-4 sm:p-5 bg-white shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                100-Hour Yoga TTC in Rishikesh — Quick Facts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
                  <span className="text-[#158b72] font-medium shrink-0">
                    Course length
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    100 hours &middot; 13 days
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
                  <span className="text-[#158b72] font-medium shrink-0">
                    Level
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Beginner to Intermediate
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
                  <span className="text-[#158b72] font-medium shrink-0">
                    Certification
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    School Certificate — Part 1 of 200-Hour YTTC
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
                  <span className="text-[#158b72] font-medium shrink-0">
                    Lead teacher
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Acharya Siddhant
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b md:border-b-0 border-[#c8ece2]/70 text-center sm:text-left">
                  <span className="text-[#158b72] font-medium shrink-0">
                    What&apos;s included
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Accommodation, sattvic meals, study material
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 text-center sm:text-left">
                  <span className="text-[#158b72] font-medium shrink-0">
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
                  src: "/images/gallery_images/food-gallery3.webp",
                  alt: "Sattvic vegetarian meals at Siddhant School of Yoga",
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

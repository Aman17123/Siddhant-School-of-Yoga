import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseGallerySection from "@/components/CourseGallerySection";
import TwoHundredHourContent from "@/components/course-pages/TwoHundredHourContent";
import { Kicker, HeadingDivider } from "@/components/ui";

export const metadata = {
  title: "200 Hour Yoga Teacher Training in Rishikesh, India | Siddhant School of Yoga",
  description:
    "Join the 200-hour Yoga Alliance USA RYT 200 registered Yoga Teacher Training in Rishikesh, India at Siddhant School of Yoga — become an internationally certified yoga teacher, taught personally by Acharya Siddhant.",
};

export default function TwoHundredHourYogaTTCPage() {
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
                  <span className="text-[#0f6b57] font-semibold">200-Hour Yoga TTC in Rishikesh</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                  <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                    200-Hour
                  </span>
                  <span className="block text-2xl sm:text-3xl font-normal">
                    Yoga Teacher Training in Rishikesh
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#0f6b57]/90 leading-relaxed max-w-md">
                  Our most popular, Yoga Alliance USA RYT 200 registered TTC in Rishikesh — complete professional certification in Hatha &amp; Ashtanga, pranayama, anatomy and teaching methodology, taught personally by Acharya Siddhant.
                </p>
              </div>

              {/* Right: Image */}
              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/gallery_images/200-hour-yoga-teacher-training-graduates-rishikesh.webp"
                    alt="200-Hour Yoga Teacher Training graduates in Rishikesh"
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

        {/* What Is the 200-Hour Yoga TTC */}
        <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/70 font-figtree">
          <div className="w-[90%] max-w-[1320px] mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center w-full mb-8 lg:mb-10">
              <Kicker>Course Overview</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What Is the 200-Hour Yoga Teacher Training Course?
              </h2>
              <HeadingDivider />
            </div>

            {/* Explanatory Paragraphs */}
            <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
              <p>
                The 200-Hour Yoga Teacher Training Course (YTTC) is a 24-day residential program that trains and certifies you to teach yoga professionally. Held in Rishikesh, India — the world's yoga capital — this Yoga Alliance USA RYS 200 registered course is the internationally recognized entry point into professional yoga teaching, combining Hatha and Ashtanga asana, Pranayama, meditation, anatomy, yoga philosophy and hands-on teaching methodology into one complete curriculum.
              </p>

              <p>
                At Siddhant School of Yoga, the course is taught personally by Acharya Siddhant in small batches of 10&ndash;15 students, ensuring direct, individual correction rather than group-only instruction. Each day moves through Shatkarma cleansing, Pranayama, Hatha and Ashtanga asana practice, yoga philosophy, anatomy workshops and teaching practicum — all within a residential ashram setting that includes three sattvic vegetarian meals a day and weekend excursions to temples and the Himalayan foothills.
              </p>

              <p>
                On successful completion, graduates receive a 200-hour Yoga Alliance USA Registered RYT 200 certificate — the most widely recognized yoga teacher certification worldwide — qualifying them to teach at studios, gyms and retreat centers internationally. Every student also receives a personalized 100-day post-graduation practice schedule and ongoing mentorship to carry their training forward for life.
              </p>
            </div>

            {/* Quick Facts Table Box */}
            <div className="w-full rounded-2xl border border-[#c8ece2] p-4 sm:p-5 bg-white shadow-2xs">
              <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
                200-Hour Yoga TTC in Rishikesh — Quick Facts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
                  <span className="text-[#158b72] font-medium shrink-0">
                    Course length
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    200 hours &middot; 24 days
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
                  <span className="text-[#158b72] font-medium shrink-0">
                    Level
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    All Levels (Beginner to Advanced)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
                  <span className="text-[#158b72] font-medium shrink-0">
                    Certification
                  </span>
                  <span className="text-stone-800 font-normal sm:text-right">
                    Yoga Alliance USA Registered RYT 200
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
                    Aspiring &amp; practicing yoga teachers
                  </span>
                </div>
              </div>
            </div>

            {/* Gallery + Video Showcase */}
            <CourseGallerySection
              className="mt-10 lg:mt-12"
              mainImage="/images/gallery_images/yoga-teacher-training-certificate-ceremony-siddhant-school-rishikesh.webp"
              mainImageAlt="200-Hour Yoga Teacher Training certificate ceremony at Siddhant School of Yoga"
              caption="Becoming a certified yoga teacher in Rishikesh"
              videoId="w4_12OUppgM"
              images={[
                {
                  src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp",
                  alt: "Acharya Siddhant presenting a certificate to a 200-hour graduate",
                },
                {
                  src: "/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp",
                  alt: "200-hour and 500-hour yoga teacher training certification batch in Rishikesh",
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
                  src: "/images/gallery_images/food-gallery4.webp",
                  alt: "Sattvic vegetarian meals at Siddhant School of Yoga",
                },
              ]}
            />
          </div>
        </section>

        <TwoHundredHourContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

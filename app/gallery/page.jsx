import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home as HomeIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CtaBanner from "@/components/home/CtaBanner";
import VideoSection from "@/components/home/VideoSection";
import ShortsSection from "@/components/home/ShortsSection";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Kicker, HeadingDivider } from "@/components/ui";

export const metadata = {
  title: "Gallery | Siddhant School of Yoga, Rishikesh",
  description:
    "Photos and videos from Siddhant School of Yoga in Rishikesh — asana practice, classes, teacher training sessions, sacred ceremonies, food and accommodation.",
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#158b72]/30 selection:text-[#0f6b57]">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Hero Banner */}
        <section className="relative min-h-fit sm:min-h-[420px] lg:h-[46vh] lg:max-h-[440px] w-full flex items-center overflow-hidden">
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

          <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-24">
            <div className="max-w-xl text-left mx-auto text-center sm:mx-0 sm:text-left">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center justify-center sm:justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#0f6b57]/80"
              >
                <Link
                  href="/"
                  className="flex items-center gap-1 hover:text-[#158b72] transition-colors"
                >
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#0f6b57]/50 shrink-0" />
                <span className="text-[#0f6b57] font-semibold">Gallery</span>
              </nav>

              <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                  Our Gallery
                </span>
                <span className="block text-2xl sm:text-3xl font-normal">
                  Photos &amp; Videos That Speak Louder
                </span>
              </h1>

              <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#0f6b57]/90 leading-relaxed max-w-md mx-auto sm:mx-0">
                Asana practice, classes, teacher training sessions, sacred ceremonies and ashram life — captured in pictures, long videos and Shorts.
              </p>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Photo Gallery</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Moments From Siddhant School of Yoga
              </h2>
              <HeadingDivider />
            </div>

            <GalleryGrid />
          </div>
        </section>

        <VideoSection />
        <ShortsSection />

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

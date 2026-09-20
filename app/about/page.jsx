import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, ArrowRight, Eye, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import TrustStrip from "@/components/home/TrustStrip";
import Founder from "@/components/home/Founder";
import WhyRishikesh from "@/components/home/WhyRishikesh";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Teachers from "@/components/home/Teachers";
import CtaBanner from "@/components/home/CtaBanner";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import ProgramsExploreSection from "@/components/about/ProgramsExploreSection";
import { Kicker, HeadingDivider, ButtonLink } from "@/components/ui";

export const metadata = {
  title: "About Siddhant School of Yoga | Rishikesh, India",
  description:
    "Learn about Siddhant School of Yoga in Rishikesh, India — an authentic, Yoga Alliance USA registered school founded by Acharya Siddhant, offering 100, 200, 300 & 500-hour Yoga Teacher Training rooted in traditional Vedic teaching.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#158b72]/30 selection:text-[#0f6b57]">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Hero Banner */}
        <section className="relative min-h-fit sm:min-h-[500px] lg:h-[70vh] lg:max-h-[740px] w-full flex items-center overflow-hidden">
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
              <div className="w-full lg:w-1/2 max-w-xl text-left">
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
                  <span className="text-[#0f6b57] font-semibold">About Us</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                  <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                    About
                  </span>
                  <span className="block text-2xl sm:text-3xl font-normal">
                    Siddhant School of Yoga
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#0f6b57]/90 leading-relaxed max-w-md">
                  An authentic, Yoga Alliance USA registered yoga school in Rishikesh — founded and taught personally by Acharya Siddhant, rooted in traditional Vedic teaching.
                </p>
              </div>

              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/founder/acharya-siddhant-founder-with-students-rishikesh.webp"
                    alt="Acharya Siddhant teaching students at Siddhant School of Yoga in Rishikesh"
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

        {/* About Intro */}
        <section id="about" className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <Kicker>Who We Are</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  A Professional Yoga Center Working for the Growth of Society
                </h2>
                <HeadingDivider center={false} />

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Siddhant School of Yoga is a registered yoga school for residential yoga courses. We conduct Teacher Training Courses and Yoga Retreats for students coming from every part of the world. Our head office is situated near the holy river Ganga at Rishikesh, India, where we run yoga camps, retreats and teacher training courses — both online and offline — to help you understand the path of yoga for a better lifestyle.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Thank you so much for choosing Siddhant School of Yoga — it is our pleasure to serve you for your complete growth. Here we offer unique yogic practices, awakening methods, life-changing courses, and practical solutions to your questions.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Siddhant School of Yoga helps you discover your hidden potential by developing a different kind of intelligence in you, through the right understanding and the right practice of yoga. It is the right place for your spiritual growth — here you can discover your true self, your real identity.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6">
                  <ButtonLink href="/200-hour-yoga-teacher-training-in-rishikesh-india" variant="primary">
                    <span>Explore Our Programs</span>
                    <ArrowRight className="w-4 h-4" />
                  </ButtonLink>
                  <ButtonLink href="#founder" variant="outline">
                    <span>Meet Acharya Siddhant</span>
                  </ButtonLink>
                </div>
              </div>

              <div className="relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <Image
                      src="/images/about-siddhant-school-of-yoga-ashram-rishikesh.png"
                      alt="Yoga teacher training students practicing alignment in Rishikesh"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  <div className="absolute -bottom-8 -left-6 sm:-left-10 w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                    <Image
                      src="/images/about-siddhant-yoga-school.jpeg"
                      alt="Evening meditation and sound healing at Siddhant School of Yoga"
                      fill
                      className="object-cover"
                      sizes="240px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustStrip />
        <Founder />

        {/* Our Vision & Mission */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>What Drives Us</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Our Vision &amp; Mission
              </h2>
              <HeadingDivider />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {/* Vision */}
              <div className="bg-white rounded-2xl border border-[#c8ece2] p-6 sm:p-8 shadow-xs">
                <span className="w-12 h-12 rounded-full bg-[#158b72]/10 text-[#158b72] flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" />
                </span>
                <h3 className="font-belleza text-xl text-[#1e2422] mb-2">Our Vision</h3>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-4">
                  To share the true path of yoga with people all over the world, so more lives become healthy, peaceful, balanced and truly connected to themselves.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Authentic Yoga", "Global Reach", "Inner Peace"].map((kw) => (
                    <span
                      key={kw}
                      className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#158b72]/10 text-[#158b72] border border-[#158b72]/20"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-2xl border border-[#c8ece2] p-6 sm:p-8 shadow-xs">
                <span className="w-12 h-12 rounded-full bg-[#158b72]/10 text-[#158b72] flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </span>
                <h3 className="font-belleza text-xl text-[#1e2422] mb-2">Our Mission</h3>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-4">
                  To teach yoga in a simple, honest way — the right knowledge, the right practice — so every student grows in body and mind, and carries this forward.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Right Knowledge", "Personal Growth", "Teach & Share"].map((kw) => (
                    <span
                      key={kw}
                      className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#158b72]/10 text-[#158b72] border border-[#158b72]/20"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhyRishikesh />
        <WhyChooseUs />
        <CoreValuesSection />
        <Teachers />
        <ProgramsExploreSection />
        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

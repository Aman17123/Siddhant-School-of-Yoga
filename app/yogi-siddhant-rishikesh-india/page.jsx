import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, Quote, Wind, Calendar, BarChart2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Founder from "@/components/home/Founder";
import VideoSection from "@/components/home/VideoSection";
import ShortsSection from "@/components/home/ShortsSection";
import CtaBanner from "@/components/home/CtaBanner";
import { Kicker, HeadingDivider } from "@/components/ui";
import { founder } from "@/data/siteData";

export const metadata = {
  title: "About Acharya Siddhant Ji | Founder, Siddhant School of Yoga",
  description:
    "Meet Acharya Siddhant Ji — founder and spiritual director of Siddhant School of Yoga in Rishikesh, India. His journey, teachings and philosophy behind an authentic, Yoga Alliance USA registered yoga school.",
};

const teachingIcons = [Wind, Calendar, BarChart2, Sparkles];

const siddhantVideos = [
  {
    id: "-YOkl0GYkPg",
    title: "Acharya Siddhant at a Glance - The Spiritual Journey",
    description:
      "A glimpse into Acharya Siddhant's spiritual journey — from seeker to teacher, and the path that shaped Siddhant School of Yoga.",
    category: "His Journey",
    duration: "19:59",
    thumbnail: "https://i.ytimg.com/vi/-YOkl0GYkPg/hqdefault.jpg",
  },
  {
    id: "vpVQmmqZMHs",
    title: "A Trick to Boost Your Decision and Control Your Mind",
    description:
      "Acharya Siddhant shares a simple yet powerful technique to sharpen decision-making and gain real control over the mind.",
    category: "Mind & Philosophy",
    duration: "9:40",
    thumbnail: "https://i.ytimg.com/vi/vpVQmmqZMHs/hqdefault.jpg",
  },
  {
    id: "qBAksBX8xjg",
    title: "What is Yoga Nidra?",
    description:
      "Acharya Siddhant explains Yoga Nidra — the ancient yogic sleep practice for deep rest, healing and inner awareness.",
    category: "Yoga Philosophy",
    duration: "7:27",
    thumbnail: "https://i.ytimg.com/vi/qBAksBX8xjg/hqdefault.jpg",
  },
  {
    id: "m-tn4kGYeaA",
    title: "The Fundamental Principle of the Law of Attraction",
    description:
      "Acharya Siddhant breaks down the fundamental principle behind the law of attraction from a yogic perspective.",
    category: "Mind & Philosophy",
    duration: "15:22",
    thumbnail: "https://i.ytimg.com/vi/m-tn4kGYeaA/hqdefault.jpg",
  },
];

export default function AcharyaSiddhantPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
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
                  className="flex items-center justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#142b1e]/80"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-[#1c3b2b] transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#142b1e]/50 shrink-0" />
                  <Link href="/about" className="hover:text-[#1c3b2b] transition-colors">
                    About Us
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#142b1e]/50 shrink-0" />
                  <span className="text-[#142b1e] font-semibold">Acharya Siddhant</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                  <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                    About
                  </span>
                  <span className="block text-2xl sm:text-3xl font-normal">
                    Acharya Siddhant Ji
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#142b1e]/90 leading-relaxed max-w-md">
                  Founder &amp; Spiritual Director of Siddhant School of Yoga — a lifelong sadhak, teacher and guide for students from every part of the world.
                </p>
              </div>

              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/founder/acharya-siddhant-founder-siddhant-school-of-yoga-rishikesh.webp"
                    alt="Acharya Siddhant, Founder of Siddhant School of Yoga in Rishikesh"
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

        <Founder />

        {/* His Journey */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>His Journey</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                From Seeker to Teacher
              </h2>
              <HeadingDivider />
            </div>

            <div className="max-w-3xl mx-auto space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              <p>
                Siddhant's roots are deep in the spiritual, and his flowering reaches outward to the world. After completing his Bachelor of Science degree, he left home in search of true knowledge, visiting many places for spiritual awakening before finally arriving in Rishikesh. There, near the holy River Ganga and the Himalayas, he began his intense spiritual practice, frequently seeking out great Sadhus and Yogis to learn the secrets of life and discover authentic spiritual techniques.
              </p>
              <p>
                Under their guidance, he learned and practiced many forms of yoga with real, proper understanding — Hatha Yoga, Raj Yoga, Kundalini Yoga, Laya Yoga, Tantra Yoga, Kriya Yoga, Dhyan Yoga, Mantra Yoga, Karma Yoga and Jnana Yoga — alongside Pranayama, Bandhas, Mudras, unique yogic kriyas, Yoga Nidra, mantra chanting, meditation, modern and ancient yoga philosophy, Ayurveda, yoga anatomy and cleansing practices gathered from different parts of the world.
              </p>
              <p>
                After years of learning and practicing, Siddhant chose the path of yoga to serve humanity, guiding students in the many aspects of yoga along with unique tips for growth and success. He focuses especially on yoga philosophy, meditation and pranayama, since these build the right understanding and the attitude of gratitude that true growth needs. Today, he lives in Rishikesh and runs Siddhant School of Yoga, sharing his knowledge with seekers who come to learn from every part of the world.
              </p>
            </div>
          </div>
        </section>

        {/* Signature Teachings */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>His Philosophy</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Signature Teachings
              </h2>
              <HeadingDivider />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {founder.teachings.map((teaching, i) => {
                const Icon = teachingIcons[i % teachingIcons.length];
                return (
                  <div
                    key={teaching}
                    className="flex items-start gap-3 bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-5"
                  >
                    <span className="shrink-0 w-10 h-10 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </span>
                    <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium">
                      {teaching}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <VideoSection
          videos={siddhantVideos}
          eyebrow="Video Gallery"
          title="Watch Acharya Siddhant"
          text="Talks and teachings from Acharya Siddhant — his spiritual journey, mind mastery, Yoga Nidra and yogic wisdom for everyday life."
        />

        <ShortsSection />

        {/* Words From Siddhant */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] font-figtree">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <Quote className="w-9 h-9 text-[#1c3b2b]/25 mx-auto mb-3" />
            <p className="text-lg sm:text-xl font-belleza font-normal text-[#1e2422] leading-relaxed">
              &ldquo;{founder.quote}&rdquo;
            </p>
            <p className="mt-4 text-[#1c3b2b] font-figtree font-semibold text-sm">
              — {founder.name}
            </p>
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

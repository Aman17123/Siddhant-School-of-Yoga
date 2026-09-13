import Image from "next/image";
import Link from "next/link";
import { Sparkles, Quote, Award } from "lucide-react";
import { Container } from "./ui";
import { founder, whatsappLink } from "@/data/siteData";

export default function Founder() {
  return (
    <section
      id="founder"
      className="py-14 sm:py-16 lg:py-20 bg-white border-b border-stone-200/70 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Asymmetric 2x2 Masonry Photo Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 max-w-lg mx-auto lg:max-w-none">
              {/* Column 1: Tall photo top, Square photo bottom */}
              <div className="space-y-2 sm:space-y-2.5">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white group">
                  <Image
                    src="/images/acharya-siddhant.jpg"
                    alt="Acharya Siddhant meditating on the banks of Ganga, Rishikesh"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Himalayan Sadhana
                  </span>
                </div>

                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white group">
                  <Image
                    src="/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp"
                    alt="Sacred Vedic havan opening ceremony conducted by Acharya Siddhant in Rishikesh"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Sacred Havan Fire
                  </span>
                </div>
              </div>

              {/* Column 2: Staggered with pt-3: Square photo top, Tall photo bottom */}
              <div className="space-y-2 sm:space-y-2.5 pt-3 sm:pt-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white group">
                  <Image
                    src="/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp"
                    alt="Acharya Siddhant teaching traditional yoga philosophy and meditation"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Satsang &amp; Philosophy
                  </span>
                </div>

                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white group">
                  <Image
                    src="/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp"
                    alt="Acharya Siddhant with graduating yoga students in Rishikesh"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Ashram Tradition
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle floating badge */}
            <div className="hidden sm:flex absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#FBDD8E] items-center gap-2 z-20">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
              <span className="text-xs font-bold text-[#1F1E1D] tracking-wide">
                18+ Years Himalayan Sadhana &amp; Lineage
              </span>
            </div>
          </div>

          {/* Right: Founder Content */}
          <div className="lg:col-span-6">
            {/* Eyebrow */}
            <span className="font-figtree text-xs font-semibold tracking-[0.2em] uppercase text-[#f22924] block mb-3">
              FOUNDER &amp; SPIRITUAL DIRECTOR
            </span>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-[#1e2422] tracking-wide leading-[1.2] mb-2">
              Acharya Siddhant{" "}
              <span className="text-base sm:text-xl font-figtree font-normal text-[#d45d44] block sm:inline sm:ml-2">
                (Living Himalayan Tradition)
              </span>
            </h2>

            {/* Pull-Quote Block */}
            <div className="relative pl-5 py-4 border-l-4 border-[#f5b860] bg-[#FAF6EE] rounded-r-2xl mb-6 pr-4 shadow-2xs">
              <Quote className="w-5 h-5 text-[#f5b860]/80 mb-1" />
              <p className="font-figtree italic text-sm sm:text-base text-[#1e2422] leading-relaxed">
                &ldquo;Yoga is a journey from darkness to light, from suffering
                to bliss, from attachment to non-attachment, and from thoughts
                to thoughtlessness. Yoga is all about a path and a process of
                growth.&rdquo;
              </p>
              <div className="mt-2 text-right">
                <span className="font-figtree text-xs font-semibold text-[#f22924] tracking-wider uppercase">
                  &mdash; Acharya Siddhant
                </span>
              </div>
            </div>

            {/* Two Bio Paragraphs */}
            <p className="font-figtree text-sm sm:text-base text-stone-600 leading-relaxed mb-4 font-light">
              Born and deeply steeped in the spiritual traditions of the
              Himalayas, Acharya Siddhant has dedicated over fifteen years to
              intensive sadhana, classical Hatha Yoga, Vedic philosophy, and
              traditional Vedanta. Having studied under revered ascetics across
              Uttarakhand, he bridges ancient yogic scriptures with practical,
              result-oriented teaching.
            </p>

            <p className="font-figtree text-sm sm:text-base text-stone-600 leading-relaxed mb-8 font-light">
              He pioneered the world&apos;s first breathwork-centered Yoga
              Teacher Training curriculum and the signature 100-Day Daily
              Practice Schedule. At Siddhant School of Yoga, he personally
              oversees the progression of every student, ensuring you discover
              your true identity beyond body and mind.
            </p>

            {/* Two CTA Buttons Side by Side */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#courses"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs sm:text-sm font-figtree font-semibold bg-[#f22924] hover:bg-[#d45d44] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Enroll Now
              </a>

              <a
                href={whatsappLink(
                  "Namaste Acharya Siddhant! I would like to inquire about your personal teachings and upcoming TTC courses in Rishikesh.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs sm:text-sm font-figtree font-semibold bg-[#FAF6EE] border-2 border-[#f22924] text-[#f22924] hover:bg-[#f22924] hover:text-white transition-all duration-300"
              >
                Chat With Master
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

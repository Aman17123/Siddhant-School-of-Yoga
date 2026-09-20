import Image from "next/image";
import Link from "next/link";
import { Container, ChakraDot } from "../ui";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/data/siteData";

export default function CtaBanner() {
  const perks = [
    "Yoga Alliance USA Recognized (RYS 200, 300, 500)",
    "Small intimate cohorts (Max 16 students)",
    "Private & shared rooms with mountain views & Wi-Fi",
    "Signature 100-day daily post-course practice schedule",
  ];

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 text-white relative overflow-hidden"
    >
      {/* Cinematic background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp"
          alt="Yoga teacher training students practicing together in the Himalayan mountains near Rishikesh"
          fill
          className="object-cover object-center brightness-[0.55]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
      </div>

      <Container className="relative z-10 text-center">
        <span className="block text-[1rem] font-figtree font-semibold tracking-[0.08em] text-[#def4ee] mb-1.5">
          Enroll Now
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-white max-w-4xl mx-auto leading-[1.2]">
          Step Onto The Mat Where Ancient Masters Walked
        </h2>
        <span className="inline-flex items-center gap-2 mt-2.5 mb-2">
          <span className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-white/60" />
          <ChakraDot color="#ffffff" />
          <span className="h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-white/60" />
        </span>

        <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto mb-8 font-figtree font-light leading-relaxed">
          Upcoming residential cohorts at our Rishikesh campus are filling
          quickly. Connect directly with our admissions team to secure your
          dates and room preference.
        </p>

        {/* Perks row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-10 text-xs sm:text-sm text-white/95 font-figtree">
          {perks.map((perk, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-black/20 backdrop-blur-xs px-4 py-1.5 rounded-full border border-white/15 shadow-xs"
            >
              <Check className="w-3.5 h-3.5 text-[#158b72] shrink-0" />
              <span>{perk}</span>
            </div>
          ))}
        </div>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href={whatsappLink(
              "Hi Siddhant School of Yoga, I would like to ask about the early bird discount for upcoming batches.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0f6b57] hover:bg-[#158b72] text-white border border-white text-sm sm:text-base font-bold font-figtree px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Ask About Early Bird Discount</span>
          </a>

          <Link
            href="/book-my-yoga-in-rishikesh-india"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#158b72] text-sm sm:text-base font-bold font-figtree px-8 py-3.5 rounded-full backdrop-blur-xs transition-all duration-300 hover:scale-105"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Enroll Now</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

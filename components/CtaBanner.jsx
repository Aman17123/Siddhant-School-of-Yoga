import { Container } from "./ui";
import { Sparkles, ArrowRight, Check, PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink, site } from "@/data/siteData";

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
      className="py-14 sm:py-16 lg:py-20 bg-gradient-to-br from-[#f22924] via-[#d6654e] to-[#C85F47] text-white relative overflow-hidden"
    >
      {/* Decorative background flourishes */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F5B860]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-black/20 blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-white/15 text-[#FAF6EE] border border-white/20 mb-3 font-figtree">
          <Sparkles className="w-3.5 h-3.5 text-[#F5B860]" />
          <span>Begin Your Transformation in Rishikesh</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-white mb-2 max-w-4xl mx-auto leading-[1.2]">
          Step Onto The Mat Where Ancient Masters Walked
        </h2>

        <p className="font-fortune text-2xl sm:text-3xl lg:text-4xl text-[#F5B860] mb-4">
          Find Peace, Rediscover Your True Self &amp; Teach Worldwide
        </p>

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
              <Check className="w-3.5 h-3.5 text-[#F5B860] shrink-0" />
              <span>{perk}</span>
            </div>
          ))}
        </div>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href={whatsappLink(
              "Hi Siddhant School of Yoga, I would like to check course batch availability and register.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm sm:text-base font-bold font-figtree px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Chat on WhatsApp (+91 8449785755)</span>
          </a>

          <a
            href={`tel:${site.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#f22924] text-sm sm:text-base font-bold font-figtree px-8 py-3.5 rounded-full backdrop-blur-xs transition-all duration-300 hover:scale-105"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {site.phone}</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

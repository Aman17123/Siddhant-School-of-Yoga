import { Container, ButtonLink } from './ui';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappLink, site } from '@/data/siteData';

export default function CtaBanner() {
  const perks = [
    "Yoga Alliance USA Recognized (RYS 200, 300, 500)",
    "Small intimate batches (Max 16 students)",
    "Private & shared rooms with hot water & Wi-Fi",
    "Signature 100-day daily post-course practice schedule",
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#E8735A] text-white relative overflow-hidden">
      {/* Decorative background flourishes */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F5B860]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-black/20 blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/10 text-[#F5B860] border border-white/20 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Begin Your Transformation in Rishikesh</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          Step Onto The Mat Where Ancient Masters Walked
        </h2>

        <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Upcoming batches in Rishikesh are filling fast. Secure your seat today and immerse yourself in authentic Hatha, Ashtanga, Kundalini, and Pranayama sadhana.
        </p>

        {/* Perks row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 text-xs sm:text-sm text-white/90">
          {perks.map((perk, i) => (
            <div key={i} className="flex items-center gap-2 bg-black/20 px-3.5 py-1.5 rounded-full border border-white/10">
              <Check className="w-3.5 h-3.5 text-[#F5B860] shrink-0" />
              <span>{perk}</span>
            </div>
          ))}
        </div>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href={whatsappLink("Hi Siddhant School of Yoga, I would like to check course batch availability and register.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm sm:text-base font-bold px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Chat on WhatsApp &amp; Reserve Spot</span>
          </a>

          <a
            href={`mailto:${site.email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#E8735A] text-sm sm:text-base font-bold px-8 py-3.5 rounded-full backdrop-blur-xs transition-all duration-300 hover:scale-105"
          >
            <span>Email Admissions Team</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </Container>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Flame, Shield, CheckCircle2 } from 'lucide-react';
import { Container, SectionHeading, ButtonLink } from './ui';
import { kundaliniTrainings } from '@/data/coursesData';
import { whatsappLink } from '@/data/siteData';

export default function KundaliniSection() {
  return (
    <section id="kundalini" className="py-20 lg:py-28 bg-[#161a15] text-white overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#e8735a]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#E8735A]/20 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#e8735a]/20 text-[#e8735a] border border-[#e8735a]/30 mb-3">
            <Flame className="w-3.5 h-3.5 text-[#e8735a]" />
            <span>Sacred Energy Awakening</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-white mb-4">
            Kundalini Yoga Teacher Training in Rishikesh
          </h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Kundalini is not just energy—it is a reservoir of supreme knowledge and motherly wisdom. Siddhant School of Yoga presents authentic Kundalini kriyas, chakra activation, and tantric meditation to awaken your latent power safely and systematically.
          </p>
        </div>

        {/* Kundalini Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {kundaliniTrainings.map((k, i) => (
            <div 
              key={k.id}
              className="rounded-3xl bg-[#222720] border border-white/10 p-6 flex flex-col justify-between hover:border-[#e8735a]/60 transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 bg-black/40">
                  <Image
                    src={k.image}
                    alt={k.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#e8735a] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {k.duration}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs text-[#F5B860] font-semibold block">{k.certification}</span>
                    <h3 className="text-lg font-bold font-serif text-white">{k.title}</h3>
                  </div>
                </div>

                <p className="text-xs text-white/75 leading-relaxed mb-6">
                  {k.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-white/50 block">Investment</span>
                  <span className="text-xl font-bold text-[#F5B860] font-serif">{k.price}</span>
                </div>
                <a
                  href={whatsappLink(`Hi, I would like more information on the ${k.title} in Rishikesh.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#e8735a] hover:bg-[#E8735A] px-4 py-2 rounded-full transition-all"
                >
                  <span>Book Seat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Quote banner */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-white/80 font-serif italic">
            &ldquo;In India, we never say just Kundalini; we always say &lsquo;Mother Kundalini&rsquo; because when awakened properly, it guides your entire life like a mother.&rdquo;
          </p>
          <span className="text-xs font-bold text-[#F5B860] whitespace-nowrap">
            — Acharya Siddhant
          </span>
        </div>

      </Container>
    </section>
  );
}

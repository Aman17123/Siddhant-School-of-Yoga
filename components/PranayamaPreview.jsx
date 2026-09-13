import Image from 'next/image';
import Link from 'next/link';
import { Wind, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Container, SectionHeading, ButtonLink } from './ui';
import { whatsappLink } from '@/data/siteData';

export default function PranayamaPreview() {
  const breathPillars = [
    {
      title: "Rhythmic Ratio & Kumbhaka",
      desc: "Moving beyond casual breathing into classical bandhas, internal/external retention, and nervous system control.",
    },
    {
      title: "Nadi Shodhana & Energy Purification",
      desc: "Purifying the 72,000 energetic pathways (nadis) to awaken Ida, Pingala, and allow flow through Sushumna.",
    },
    {
      title: "Pranayama as the Bridge to Dhyana",
      desc: "Steady breath creates a steady mind. We teach students how rhythmic breath naturally dissolves wandering thoughts.",
    },
    {
      title: "Diagnosis of Individual Breathing Patterns",
      desc: "Personalized corrections for shallow diaphragmatic chest breathing, restoring optimal oxygenation and mental peace.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#FAF6EE] to-[#eef6f4] border-b border-[#EBE5D8]/70 relative overflow-hidden">
      {/* Subtle wind wave accents */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 7 cols */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8735A]/10 text-[#E8735A] border border-[#E8735A]/20 mb-3">
              <Wind className="w-3.5 h-3.5 text-[#E8735A]" />
              <span>World&apos;s First Breath-Focused School</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#1F1E1D] mb-6 leading-tight">
              The Science of Prana — Beyond Simple Breathing Exercises
            </h2>

            <p className="text-sm sm:text-base text-[#55564c] leading-relaxed mb-6">
              Prana is the very base of human existence. At Siddhant School of Yoga, we emphasize that mere physical exercise without rhythmic breath regulation leaves you exhausted, whereas authentic Pranayama awakens vital energy, heals chronic stress, and opens the door to meditative bliss.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {breathPillars.map((p, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-[#EBE5D8] shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E8735A] shrink-0" />
                    <h4 className="text-xs font-bold text-[#1F1E1D]">{p.title}</h4>
                  </div>
                  <p className="text-[12px] text-[#66675c] leading-relaxed pl-6">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="#courses" variant="primary">
                <span>View Breathwork TTC Modules</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
              <a
                href={whatsappLink("Hi, I want to learn more about the Pranayama curriculum at Siddhant School of Yoga.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#E8735A] hover:text-[#e8735a] px-4 py-3 transition-colors"
              >
                <span>Consult Master on WhatsApp &rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: 5 cols */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/gallery/hatha-yogashala-pernem-goa-sunrise-beach-yoga-session-querim-01.webp"
                  alt="Students practicing early morning classical Pranayama along the sacred river"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#F5B860] font-bold block mb-1">
                    Daily Morning Sadhana
                  </span>
                  <p className="text-sm font-serif italic">
                    &ldquo;Pranayama is the foundation of meditation, asana, and every true healing method.&rdquo;
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

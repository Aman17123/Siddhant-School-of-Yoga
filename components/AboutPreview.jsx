import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Check, ArrowRight, Heart, Compass, Shield } from 'lucide-react';
import { Container, SectionHeading, ButtonLink } from './ui';
import { site, whatsappLink } from '@/data/siteData';

export default function AboutPreview() {
  const points = [
    {
      title: "Authentic Vedic & Hatha Lineage",
      desc: "Courses rooted in ancient yogic scriptures, living realized masters, and pure Guru-Shishya tradition.",
    },
    {
      title: "World's First Pranayama-Focused Curriculum",
      desc: "We understand that Prana is the base of life. Authentic breath regulation transforms your asana and opens deep meditation.",
    },
    {
      title: "100-Day Post-Course Practice Schedule",
      desc: "We don't leave you upon graduation. Every student receives a structured 100-day daily schedule for permanent self-discipline.",
    },
    {
      title: "Measurable Growth Parameters",
      desc: "The first school to provide clear physical, mental, and intellectual parameters to evaluate your true yogic progress.",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF6EE] border-b border-[#EBE5D8]/60 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text & Features */}
          <div>
            <SectionHeading
              eyebrow="Ancient Wisdom, Modern Clarity"
              title="A Sacred Sanctuary for True Yogic Transformation"
              text="Siddhant School of Yoga is an officially registered Yoga Alliance school (RYS 200, 300, 500) located in Rishikesh along the foothills of the sacred Himalayas."
              className="mb-8"
            />

            <p className="text-sm sm:text-base text-[#55564c] leading-relaxed mb-6">
              Yoga is not merely physical exercise or body therapy—it is a journey from darkness to light, from suffering to bliss, from attachment to non-attachment, and from chaotic thoughts to inner silence. Founded by Acharya Siddhant, our mission is to reconnect genuine yoga with this generation.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {points.map((pt, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-[#EBE5D8] shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#E8735A]/10 text-[#E8735A] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <h4 className="text-xs font-bold text-[#1F1E1D] tracking-tight">{pt.title}</h4>
                  </div>
                  <p className="text-[12px] text-[#66675c] leading-relaxed pl-7">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="#courses" variant="primary">
                <span>Explore All Programs</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
              <ButtonLink href="#founder" variant="outline">
                <span>Meet Acharya Siddhant</span>
              </ButtonLink>
            </div>
          </div>

          {/* Right: Rich Image Composition */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/gallery/hatha-yogashala-pernem-goa-hatha-yoga-asana-practice-shala-01.webp"
                  alt="Yoga teacher training students practicing alignment in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Sub-Photo */}
              <div className="absolute -bottom-8 -left-6 sm:-left-10 w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <Image
                  src="/images/gallery/hatha-yogashala-pernem-goa-candlelit-meditation-session-shala-01.webp"
                  alt="Evening meditation and sound healing at Siddhant School of Yoga"
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>

              {/* Floating Quote Badge */}
              <div className="absolute -top-6 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#EBE5D8] max-w-[240px]">
                <div className="flex items-center gap-2 mb-1 text-[#e8735a]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Vedic Discipline</span>
                </div>
                <p className="text-xs text-[#1F1E1D] font-serif italic">
                  &ldquo;Yoga is an art to live a life without complaint, in a grateful way.&rdquo;
                </p>
                <span className="text-[10px] text-[#77786e] font-semibold block mt-1">
                  — Acharya Siddhant
                </span>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Quote, Award } from 'lucide-react';
import { Container } from './ui';
import { founder, whatsappLink } from '@/data/siteData';

export default function Founder() {
  return (
    <section id="founder" className="py-20 lg:py-28 bg-white border-b border-stone-200/70 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Asymmetric 2x2 Masonry Photo Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 max-w-lg mx-auto lg:max-w-none">
              
              {/* Column 1: Tall photo top, Square photo bottom */}
              <div className="space-y-4 sm:space-y-5">
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
                    src="/images/gallery/hatha-yogashala-pernem-goa-havan-fire-puja-opening-ceremony-01.webp"
                    alt="Sacred Vedic havan opening ceremony conducted by Acharya Siddhant"
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

              {/* Column 2: Staggered with pt-8: Square photo top, Tall photo bottom */}
              <div className="space-y-4 sm:space-y-5 pt-6 sm:pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white group">
                  <Image
                    src="/images/gallery/hatha-yogashala-pernem-goa-teacher-led-meditation-philosophy-talk-02.webp"
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
                    src="/images/tha_hatha/The_Hatha_Yogashala-founder-Goa.webp"
                    alt="Acharya Siddhant in ashram shala"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
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
            <span className="text-xs font-bold tracking-widest uppercase text-terracotta block mb-3">
              FOUNDER OF SIDDHANT SCHOOL OF YOGA
            </span>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1F1E1D] tracking-tight leading-[1.2] mb-5">
              Acharya Siddhant <span className="text-xl sm:text-2xl font-normal font-sans text-stone-500 block sm:inline sm:ml-1">(Founder &amp; Spiritual Director)</span>
            </h2>

            {/* Pull-Quote Block */}
            <div className="relative pl-5 py-4 border-l-4 border-marigold bg-[#FAF6EE] rounded-r-2xl mb-6 pr-4">
              <Quote className="w-6 h-6 text-marigold/60 mb-1" />
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;Yoga is not an accomplishment of physical gymnastics, but the sacred dissolution of personal conflict. When the breath becomes still and steady, the consciousness discovers its unshakeable home.&rdquo;
              </p>
              <div className="mt-3 text-right">
                <span className="text-xs sm:text-sm font-bold text-[#1F1E1D] font-sans tracking-wide">
                  &mdash; Acharya Siddhant.
                </span>
              </div>
            </div>

            {/* Two Bio Paragraphs */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-4">
              Born and deeply steeped in the spiritual traditions of the Himalayas, Acharya Siddhant has dedicated over eighteen years to rigorous sadhana, classical Hatha Yoga, and traditional Vedanta. Having studied under revered ascetics across Uttarakhand and southern monastic lineages, he bridges deep scriptural antiquity with lucid, anatomically sound modern pedagogy.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-8">
              At Siddhant School of Yoga, he personally oversees the spiritual progression of every seeker. His teaching transcends mechanical asana practice, integrating sacred breathwork (pranayama), internal purification kriyas, and Patanjali&apos;s Raja Yoga philosophy into a transformative way of living that students carry back into the modern world.
            </p>

            {/* Two CTA Buttons Side by Side */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#courses"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-terracotta hover:bg-coral text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                Apply Course Now
              </a>

              <a
                href={whatsappLink("Hello Acharya Siddhant, I would like to know more about your journey and teachings at Siddhant School of Yoga.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold border-2 border-terracotta text-terracotta hover:bg-[#FAF6EE] transition-all duration-200"
              >
                Know More About Him
              </a>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}


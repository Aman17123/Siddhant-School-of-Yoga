import Image from 'next/image';
import { Container, SectionHeading } from './ui';
import { Sparkles, Waves, Mountain, Flame, Compass } from 'lucide-react';

export default function WhyRishikesh() {
  const highlights = [
    {
      icon: Waves,
      title: "Vibrations of Sacred Mother Ganga",
      desc: "Practicing asana and pranayama along the pure glacial waters of the holy Ganges infuses every breath with pure spiritual prana.",
    },
    {
      icon: Mountain,
      title: "Foothills of the Majestic Himalayas",
      desc: "Rishikesh is cradled by verdant mountains where sages and rishis have meditated for thousands of years, creating an unparalleled yogic vortex.",
    },
    {
      icon: Flame,
      title: "World Capital of Yoga",
      desc: "Home to the sacred Ganga Aarti, traditional ashrams, and timeless Guru-Shishya paramparas that preserve authentic Vedic culture.",
    },
    {
      icon: Compass,
      title: "The Ideal Sanctuary for Self-Discovery",
      desc: "Far from commercial distractions, Rishikesh allows you to completely disconnect, turn inwards, and experience true spiritual rebirth.",
    },
  ];

  return (
    <section id="rishikesh" className="py-20 lg:py-28 bg-[#FAF6EE] border-b border-[#EBE5D8]/60 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text & 4 Highlights (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8735A]/10 text-[#E8735A] border border-[#E8735A]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#e8735a]" />
              <span>The Birthplace of Yoga</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#1F1E1D] mb-6 leading-tight">
              Why Study Yoga in Rishikesh, India?
            </h2>

            <p className="text-sm sm:text-base text-[#55564c] leading-relaxed mb-8">
              Yoga cannot be learned from a textbook alone. To truly absorb its spiritual depth, you need the right environment. Surrounded by the forested Himalayas and Mother Ganga, Rishikesh provides the sacred energetic field necessary to awaken your consciousness.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#EBE5D8] shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#E8735A]/10 text-[#E8735A] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#E8735A]" />
                    </div>
                    <h4 className="text-sm font-bold text-[#1F1E1D] mb-1.5">{h.title}</h4>
                    <p className="text-xs text-[#55564c] leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Photo Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              
              <div className="space-y-3 sm:space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <Image
                    src="/images/gallery/hatha-yogashala-pernem-goa-sunrise-beach-yoga-session-querim-01.webp"
                    alt="Sunrise meditation by the sacred river in Rishikesh"
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <Image
                    src="/images/gallery/hatha-yogashala-pernem-goa-graduation-ceremony-flower-rangoli-06.webp"
                    alt="Sacred Vedic flower mandala rangoli"
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <Image
                    src="/images/gallery/hatha-yogashala-pernem-goa-havan-fire-puja-opening-ceremony-14.webp"
                    alt="Sacred fire havan ceremony in Rishikesh"
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <Image
                    src="/images/gallery/hatha-yogashala-pernem-goa-hatha-yoga-asana-practice-shala-01.webp"
                    alt="Students practicing teacher training asanas in ashram"
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

import Image from 'next/image';
import { Container, SectionHeading } from './ui';
import { Utensils, Home, Wifi, Sun, Sparkles, Check } from 'lucide-react';

export default function ResidentialExperience() {
  const stayFeatures = [
    {
      icon: Utensils,
      title: "Three Sattvic Yogic Meals Daily",
      desc: "Freshly prepared organic Ayurvedic vegetarian cuisine designed to purify digestion and support vigorous daily practice.",
    },
    {
      icon: Home,
      title: "Peaceful Private & Shared Rooms",
      desc: "Immaculately clean rooms with attached modern bathrooms, 24/7 hot water, comfortable mattresses, and mountain/ashram views.",
    },
    {
      icon: Sun,
      title: "Sunlit Rooftop & Yoga Shala",
      desc: "Dedicated wooden yoga hall equipped with mats, blocks, belts, and bolsters for quiet self-practice and group sadhana.",
    },
    {
      icon: Wifi,
      title: "High-Speed Wi-Fi & Care Services",
      desc: "Reliable internet throughout the ashram, on-site laundry services, filtered drinking water, and round-the-clock student assistance.",
    },
  ];

  return (
    <section id="residential" className="py-20 lg:py-28 bg-[#FAF6EE] border-b border-[#EBE5D8]/60">
      <Container>
        
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8735A]/10 text-[#E8735A] border border-[#E8735A]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#e8735a]" />
            <span>Ashram Living &amp; Sattvic Food</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#1F1E1D] mb-4">
            A Peaceful Sanctuary to Rest, Nourish &amp; Grow
          </h2>
          <p className="text-base sm:text-lg text-[#55564c] leading-relaxed">
            Your living environment is crucial to your yogic transformation. At Siddhant School of Yoga, we provide clean, quiet accommodation and lovingly prepared Ayurvedic nourishment.
          </p>
        </div>

        {/* 2-Column: Features + Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: 4 Features (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {stayFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-white border border-[#EBE5D8] shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8735A]/10 text-[#E8735A] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[#E8735A]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1F1E1D] mb-1">{feat.title}</h4>
                    <p className="text-xs text-[#55564c] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Ashram Photos (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="/images/ashram/the-hatha-yogashala-arambol-goa-wooden-cottage-exterior-01.webp"
                alt="Ashram exterior and serene garden surroundings"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-2 border-white mt-6 sm:mt-10">
              <Image
                src="/images/ashram/the-hatha-yogashala-arambol-goa-cottage-double-bed-interior-01.webp"
                alt="Clean and comfortable ashram bedroom with modern amenities"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}

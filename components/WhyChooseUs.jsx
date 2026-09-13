'use client';

import { 
  Sun, 
  Users, 
  Bed, 
  Leaf, 
  Waves, 
  Sparkles, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { Container } from './ui';

export default function WhyChooseUs() {
  const reasons = [
    {
      id: "traditional",
      isOm: true,
      title: "Traditional, Not Commercial",
      description: "Grounded in authentic lineage, classical texts, and true ashram discipline — not diluted for modern tourism.",
    },
    {
      id: "certified",
      icon: Award,
      title: "Yoga Alliance Certified",
      description: "Internationally recognized certifications (RYT 200, RYT 300, RYT 500) valid worldwide across 130+ countries.",
    },
    {
      id: "teachers",
      icon: Users,
      title: "Experienced Indian Teachers",
      description: "Learn directly from master Himalayan yogis with decades of traditional practice, sadhana, and deep spiritual wisdom.",
    },
    {
      id: "ashram",
      icon: Bed,
      title: "Residential Ashram Stay",
      description: "Peaceful, clean, and spiritually charged environment for deep immersion, contemplation, and self-transformation.",
    },
    {
      id: "food",
      icon: Leaf,
      title: "Sattvic Vegetarian Food",
      description: "Freshly prepared Ayurvedic meals daily to nourish the body, balance the doshas, and calm the mind during training.",
    },
    {
      id: "ganga",
      icon: Waves,
      title: "On the Banks of the Ganga",
      description: "Located in Rishikesh, the world capital of yoga, surrounded by the sacred Himalayas and holy Mother Ganga.",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-[#FAF6EE] border-y border-[#FBDD8E]/40 relative overflow-hidden">
      {/* Subtle decorative background blur shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FBDD8E]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#E8735A]/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Eyebrow & Main Heading */}
        <div className="text-center max-w-4xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-terracotta/10 text-terracotta border border-terracotta/25 mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Why Siddhant School of Yoga</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#1F1E1D] leading-[1.2] mb-5">
            Why Choose Siddhant School of Yoga for Yoga Teacher Training in Rishikesh
          </h2>
          
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Rooted in authentic Himalayan lineage, our residential ashram offers a transformative sanctuary where ancient yogic disciplines meet individualized mentorship.
          </p>
        </div>

        {/* 3x2 Grid of 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((item, idx) => {
            const isTerracotta = idx % 2 === 0;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`group relative bg-white rounded-2xl p-7 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EBE5D8] hover:-translate-y-1.5 flex flex-col justify-between ${
                  isTerracotta 
                    ? 'border-l-4 border-l-terracotta' 
                    : 'border-l-4 border-l-marigold'
                }`}
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-xs ${
                        isTerracotta
                          ? 'bg-[#E8735A]/10 text-terracotta group-hover:bg-terracotta group-hover:text-white group-hover:scale-105'
                          : 'bg-[#F5B860]/15 text-[#E68A2E] group-hover:bg-marigold group-hover:text-white group-hover:scale-105'
                      }`}
                    >
                      {item.isOm ? (
                        <span className="text-2xl font-serif font-bold leading-none select-none">
                          ॐ
                        </span>
                      ) : (
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      )}
                    </div>

                    <span className="text-xs font-semibold tracking-wider text-stone-400 uppercase">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold font-serif text-[#20201D] mb-3 group-hover:text-terracotta transition-colors duration-200">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm text-stone-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-medium text-stone-400 group-hover:text-terracotta transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>Siddhant Ashram Rishikesh</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


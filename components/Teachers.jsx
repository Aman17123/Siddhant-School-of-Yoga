import Image from 'next/image';
import { Container, SectionHeading } from './ui';
import { teachers } from '@/data/siteData';
import { Award, Sparkles } from 'lucide-react';

export default function Teachers() {
  return (
    <section id="teachers" className="py-20 lg:py-28 bg-[#FAF6EE] border-b border-[#EBE5D8]/60">
      <Container>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8735A]/10 text-[#E8735A] border border-[#E8735A]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#e8735a]" />
            <span>Dedicated Himalayan Yogis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#1F1E1D] mb-4">
            Learn Under Living Masters
          </h2>
          <p className="text-base sm:text-lg text-[#55564c] leading-relaxed">
            Our faculty combines decades of traditional monastic training with deep scientific knowledge in biomechanics, alignment, and subtle energetic anatomy.
          </p>
        </div>

        {/* 4 Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teachers.map((teacher, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-[#EBE5D8] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col"
            >
              {/* Photo */}
              <div className="relative h-64 w-full overflow-hidden bg-[#EBE5D8]/30">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute top-3 left-3 bg-[#E8735A] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {teacher.exp}
                </span>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold font-serif leading-snug">{teacher.name}</h3>
                  <span className="text-xs text-[#F5B860] font-medium block">{teacher.role}</span>
                </div>
              </div>

              {/* Bio & Specialty */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#77786e] font-bold block mb-1">
                    Specialty
                  </span>
                  <p className="text-xs font-semibold text-[#E8735A] leading-tight">
                    {teacher.specialty}
                  </p>
                </div>

                <p className="text-xs text-[#55564c] leading-relaxed mt-auto pt-3 border-t border-[#EBE5D8]">
                  {teacher.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

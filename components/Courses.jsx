import { Container, SectionHeading, ProgramCard, ButtonLink } from './ui';
import { teacherTrainings } from '@/data/coursesData';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Courses() {
  return (
    <section id="courses" className="py-20 lg:py-28 bg-[#FAF6EE]/50 border-b border-[#EBE5D8] relative">
      <Container>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <SectionHeading
            eyebrow="Yoga Alliance Accredited"
            title="Yoga Teacher Training in Rishikesh"
            text="Internationally certified 100, 200, 300, and 500-hour residential programs designed to take you from foundational understanding to master-level instruction."
          />
          <div className="shrink-0">
            <ButtonLink href="#comparison" variant="outline" className="text-xs sm:text-sm">
              <span>Compare All 4 Programs</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>

        {/* 4 Cards Grid - 4 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mb-12">
          {teacherTrainings.map((prog) => (
            <ProgramCard key={prog.id} program={prog} />
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EBE5D8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 border border-terracotta/20">
              <Sparkles className="w-6 h-6 text-terracotta" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1F1E1D]">
                Every Course Includes The Signature 100-Day Practice Schedule
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                We ensure your daily sadhana and spiritual discipline continue effortlessly once you return home.
              </p>
            </div>
          </div>
          <ButtonLink href="#contact" variant="primary" className="shrink-0 text-xs sm:text-sm whitespace-nowrap">
            Check Upcoming Dates
          </ButtonLink>
        </div>

      </Container>
    </section>
  );
}


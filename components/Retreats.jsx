import { Container, SectionHeading, RetreatCard, ButtonLink } from './ui';
import { retreats } from '@/data/coursesData';
import { Sparkles, Calendar } from 'lucide-react';
import { whatsappLink } from '@/data/siteData';

export default function Retreats() {
  return (
    <section id="retreats" className="py-20 lg:py-28 bg-[#FAF6EE] border-b border-[#EBE5D8]/60">
      <Container>
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <SectionHeading
            eyebrow="Rest, Heal & Restore"
            title="Yoga & Meditation Retreats in Rishikesh"
            text="Step away from the noise of modern life. Experience authentic ashram tranquility, daily Ganga meditation, deep Pranayama, and nourishing sattvic meals."
          />
          <div className="shrink-0">
            <a
              href={whatsappLink("Hi, I want to check retreat dates and room availability in Rishikesh.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E8735A] hover:bg-[#F08C5C] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <Calendar className="w-4 h-4 text-[#F5B860]" />
              <span>Check Retreat Dates</span>
            </a>
          </div>
        </div>

        {/* 6 Retreat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {retreats.map((ret) => (
            <RetreatCard key={ret.id} retreat={ret} />
          ))}
        </div>

        {/* Custom Retreat Consultation Note */}
        <div className="text-center max-w-2xl mx-auto p-6 rounded-3xl bg-white border border-[#EBE5D8] shadow-xs">
          <h4 className="text-sm font-bold text-[#1F1E1D] mb-1">
            Need Help Choosing the Right Retreat?
          </h4>
          <p className="text-xs text-[#55564c] mb-4">
            Whether you seek profound silent meditation, gentle beginner rest, or deep physical detox, our spiritual guides can tailor your dates and room preferences.
          </p>
          <a
            href={whatsappLink("Hi, could you please guide me on which retreat is best suited for my goals?")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#e8735a] hover:text-[#E8735A] underline underline-offset-4 transition-colors"
          >
            Request Free Retreat Advisory on WhatsApp &rarr;
          </a>
        </div>

      </Container>
    </section>
  );
}

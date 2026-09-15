import { Container, SectionHeading, RetreatCard, ButtonLink } from "../ui";
import { retreats } from "@/data/coursesData";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import { whatsappLink } from "@/data/siteData";

export default function Retreats() {
  return (
    <section
      id="retreats"
      className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/60 font-figtree"
    >
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10 items-center md:items-end text-center md:text-left">
          <SectionHeading
            eyebrow="Yoga Retreats"
            title="Yoga Retreats in Rishikesh, India"
            text="Step away from the hectic schedule of modern life. Experience authentic ashram tranquility, daily Ganga meditation, deep Pranayama, and nourishing sattvic meals across flexible 5, 7, 10, and 14-day formats."
            className="mb-0"
          />
          <div className="shrink-0 flex justify-center md:justify-end w-full md:w-auto">
            <a
              href={whatsappLink(
                "Namaste! I want to check retreat dates and room availability in Rishikesh.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#158b72] hover:bg-[#0f6b57] text-white text-xs sm:text-sm font-figtree font-semibold px-6 py-3 rounded-full shadow-xs hover:shadow-md transition-all"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Ask Retreat Dates</span>
            </a>
          </div>
        </div>

        {/* 6 Retreat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {retreats.map((ret) => (
            <RetreatCard key={ret.id} retreat={ret} />
          ))}
        </div>

        {/* Explore All Wellness Retreats Button */}
        <div className="text-center mt-8">
          <a
            href={whatsappLink(
              "Namaste! I would like to explore all wellness retreats and dates offered at Siddhant School of Yoga in Rishikesh.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-figtree font-semibold bg-[#158b72] hover:bg-[#0f6b57] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Explore All Wellness Retreats</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </Container>
    </section>
  );
}

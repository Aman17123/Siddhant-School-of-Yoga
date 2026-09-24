import { Container, SectionHeading, RetreatCard, ButtonLink } from "../ui";
import { retreats } from "@/data/coursesData";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/data/siteData";

export default function Retreats() {
  return (
    <section
      id="retreats"
      className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/60 font-figtree"
    >
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-6 mb-8 lg:mb-10">
          <SectionHeading
            eyebrow="Yoga Retreats"
            title="Yoga Retreats in Rishikesh, India"
            text="Step away from the hectic schedule of modern life. Experience authentic ashram tranquility, daily Ganga meditation, deep Pranayama, and nourishing sattvic meals across flexible 5, 7, 10, and 14-day formats."
            center
            className="mb-0"
          />
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-figtree font-semibold bg-[#1c3b2b] hover:bg-[#142b1e] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Explore All Wellness Retreats</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </Container>
    </section>
  );
}

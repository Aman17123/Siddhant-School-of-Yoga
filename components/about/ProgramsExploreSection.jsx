import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Kicker, HeadingDivider } from "@/components/ui";

const programs = [
  {
    label: "Yoga TTC",
    title: "Yoga Teacher Training",
    text: "From 100 to 500 hours, find the Yoga Alliance-registered course that matches your journey — foundational, intermediate or advanced.",
    cta: "Explore All Courses",
    href: "/#courses",
    image: "/images/gallery_images/yoga-teacher-training-certificate-ceremony-siddhant-school-rishikesh.webp",
    alt: "Yoga Teacher Training course at Siddhant School of Yoga in Rishikesh",
  },
  {
    label: "Yoga Retreat",
    title: "Yoga Retreats",
    text: "Step away and reconnect through our short retreats in Rishikesh — meditation, detox, pranayama and more, no teaching commitment required.",
    cta: "Explore All Retreats",
    href: "/#retreats",
    image: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp",
    alt: "Yoga retreat in the Himalayan foothills near Rishikesh",
  },
];

export default function ProgramsExploreSection() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Find Your Path</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Explore Our Yoga Programs
          </h2>
          <HeadingDivider />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {programs.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group relative rounded-3xl overflow-hidden h-[340px] sm:h-[420px] lg:h-[460px] shadow-xl border-4 border-white"
            >
              <Image
                src={p.image}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />

              <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-[11px] font-bold uppercase tracking-wide">
                {p.label}
              </span>

              <span className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#1c3b2b] group-hover:border-[#1c3b2b] group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5" />
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="font-belleza text-2xl sm:text-3xl text-white leading-snug mb-2 drop-shadow-md">
                  {p.title}
                </h3>
                <p className="text-white/85 text-sm sm:text-[15px] leading-relaxed max-w-sm mb-4">
                  {p.text}
                </p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-white/40 pb-1 group-hover:border-white transition-colors">
                  {p.cta}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

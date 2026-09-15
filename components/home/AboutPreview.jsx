import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Check,
  ArrowRight,
  Heart,
  Compass,
  Shield,
} from "lucide-react";
import { Container, SectionHeading, ButtonLink } from "../ui";
import { site, whatsappLink } from "@/data/siteData";

export default function AboutPreview() {
  const points = [
    {
      title: "Authentic Vedic & Hatha Lineage",
      desc: "Courses rooted in ancient yogic scriptures, living realized masters, and pure Guru-Shishya tradition.",
    },
    {
      title: "World's First Pranayama-Focused Curriculum",
      desc: "We understand that Prana is the base of life. Authentic breath regulation transforms your asana and opens deep meditation.",
    },
    {
      title: "100-Day Post-Course Practice Schedule",
      desc: "We don't leave you upon graduation. Every student receives a structured 100-day daily schedule for permanent self-discipline.",
    },
    {
      title: "Measurable Growth Parameters",
      desc: "The first school to provide clear physical, mental, and intellectual parameters to evaluate your true yogic progress.",
    },
  ];

  return (
    <section
      id="about"
      className="py-14 sm:py-16 lg:py-20 bg-[#FAF6EE] border-b border-[#EBE5D8]/60 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text & Features */}
          <div className="text-center lg:text-left">
            <SectionHeading
              title="Traditional Yoga Teacher Training in Rishikesh, India"
              className="mb-8"
            />
            <p className="font-figtree text-sm sm:text-base text-stone-700 leading-relaxed mb-6 font-normal">
              Siddhant School of Yoga is an officially registered Yoga Teacher
              Training school in Rishikesh — taught personally, start to finish,
              by founder Acharya Siddhant rather than handed off to a rotating
              roster of instructors.
            </p>
            <p className="font-figtree text-sm sm:text-base text-stone-700 leading-relaxed mb-6 font-normal">
              Yoga is not merely physical exercise or posture therapy—it is a
              journey from darkness to light, from suffering to bliss, from
              attachment to non-attachment, and from chaotic thoughts to inner
              silence.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <ButtonLink href="#courses" variant="primary">
                <span>Explore All Programs</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
              <ButtonLink href="#founder" variant="outline">
                <span>Meet Acharya Siddhant</span>
              </ButtonLink>
            </div>
          </div>

          {/* Right: Rich Image Composition */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo */}
              <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/about-siddhant-yoga-school-in-rishikesh.png"
                  alt="Yoga teacher training students practicing alignment in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Sub-Photo */}
              <div className="absolute -bottom-8 -left-6 sm:-left-10 w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <Image
                  src="/images/about-siddhant-yoga-school.jpeg"
                  alt="Evening meditation and sound healing at Siddhant School of Yoga"
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import { CheckCircle2, Award } from "lucide-react";
import { Container, Kicker, HeadingDivider, ButtonLink } from "../ui";

const points = [
  "Registered Yoga School (RYS 200, 300 & 500) with Yoga Alliance USA",
  "Globally accepted yoga teacher certificate, valid in every country",
  "Authentic Rishikesh curriculum built on traditional yogic science",
  "Eligible to register as RYT (Registered Yoga Teacher) after graduation",
];

const badges = [
  { src: "/logo/yoga-alliance.webp", alt: "Yoga Alliance USA Official Logo" },
  { src: "/logo/rys-200.webp", alt: "Registered Yoga School RYS 200 Badge" },
  { src: "/logo/rys-300.webp", alt: "Registered Yoga School RYS 300 Badge" },
  { src: "/logo/rys-500.webp", alt: "Registered Yoga School RYS 500 Badge" },
];

export default function YogaAllianceCertification() {
  return (
    <section
      id="certification"
      className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: SEO Content (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <Kicker>Accredited Worldwide</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] mb-1 lg:mb-3 leading-[1.2]">
              Internationally Recognized Yoga Alliance USA Certified Yoga
              School
            </h2>
            <HeadingDivider center={false} className="mb-3" />

            <p className="font-figtree text-sm sm:text-base text-stone-600 leading-relaxed mb-6 font-medium max-w-2xl mx-auto lg:mx-0">
              Siddhant School of Yoga is an officially registered Yoga
              Teacher Training school with Yoga Alliance USA. Our 200-hour,
              300-hour, and 500-hour courses in Rishikesh are Yoga Alliance
              RYS-registered programs that follow international teaching
              standards, so you graduate with a certificate trusted and
              accepted by yoga studios worldwide. Our 100-hour course is a
              foundational school program — a great first step before you
              begin RYS-200 training.
            </p>

            <ul className="space-y-3 mb-8 max-w-2xl mx-auto lg:mx-0 text-left">
              {points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#1c3b2b] shrink-0 mt-0.5" />
                  <span className="text-[15px] text-stone-700 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <ButtonLink href="#courses" variant="primary">
              Explore Certified Courses
            </ButtonLink>
          </div>

          {/* Right: 2 Certification Photos (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp"
                alt="Acharya Siddhant presenting a Yoga Alliance certified teacher training certificate to a graduate in Rishikesh"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-2 border-white mt-6 sm:mt-10">
              <Image
                src="/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp"
                alt="Graduating batch of Yoga Alliance certified 200-hour and 500-hour yoga teacher training students in Rishikesh"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Accreditation Badges Strip */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-[#e3dac9]/70">
          <div className="flex items-center justify-center gap-2 mb-5 text-stone-500">
            <Award className="w-4 h-4 text-[#1c3b2b]" />
            <span className="text-[11px] sm:text-xs font-figtree font-semibold uppercase tracking-[0.16em]">
              Official Accreditations
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import Image from "next/image";
import { Container, SectionHeading } from "../ui";
import { Camera } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export default function GalleryMarquee() {
  const row1 = [
    {
      src: "/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp",
      alt: "Morning asana and alignment practice on the banks of Ganga, Rishikesh",
      caption: "Ganga Riverside Asana",
    },
    {
      src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp",
      alt: "Warrior pose yoga practice overlooking sacred Ganges in Rishikesh",
      caption: "Ganges Warrior Sadhana",
    },
    {
      src: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp",
      alt: "Sacred Vedic havan fire puja ritual in Rishikesh",
      caption: "Sacred Fire Havan Ritual",
    },
    {
      src: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp",
      alt: "Traditional yoga philosophy satsang at Siddhant School of Yoga",
      caption: "Yogic Philosophy Satsang",
    },
    {
      src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp",
      alt: "Yoga and meditation retreat in the Himalayan foothills of Rishikesh",
      caption: "Himalayan Retreat Practice",
    },
    {
      src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp",
      alt: "International yoga students spiritual temple visit in Rishikesh",
      caption: "Sacred Temple Excursion",
    },
  ];

  const row2 = [
    {
      src: "/images/gallery_images/200-hour-yoga-teacher-training-graduates-rishikesh.webp",
      alt: "200-Hour Yoga Teacher Training graduates in Rishikesh",
      caption: "200h TTC Graduation",
    },
    {
      src: "/images/gallery_images/yoga-certification-ceremony-shiva-statue-rishikesh.webp",
      alt: "Yoga Alliance certification ceremony beside holy Shiva statue",
      caption: "Shiva Statue Certification",
    },
    {
      src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp",
      alt: "Acharya Siddhant presenting Yoga Alliance teacher certificate to graduate",
      caption: "Guru-Shishya Initiation",
    },
    {
      src: "/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp",
      alt: "200 & 500 Hour Yoga Alliance certified yoga teachers Rishikesh",
      caption: "International Certification",
    },
    {
      src: "/images/gallery_images/yoga-teacher-training-certificate-ceremony-siddhant-school-rishikesh.webp",
      alt: "Yoga teacher training certificate ceremony at Siddhant School of Yoga",
      caption: "Graduation Day Blessings",
    },
  ];

  return (
    <section
      id="gallery"
      className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/80 overflow-hidden relative font-figtree"
    >
      <Container className="mb-8 lg:mb-10">
        <SectionHeading
          eyebrow="Gallery"
          title="Life at Siddhant School of Yoga"
          description="A glimpse into our daily practice, sacred fire ceremonies, pranayama by the Ganga, and lifelong friendships forged in the spiritual heart of Rishikesh."
          center
          className="mb-0"
        />
      </Container>

      {/* Row 1 - Marquee Forward */}
      <div className="relative w-full overflow-hidden mb-3 sm:mb-3.5">
        <div className="animate-marquee flex gap-3 sm:gap-3.5">
          {[...row1, ...row1].map((img, i) => (
            <div
              key={i}
              className="relative w-72 sm:w-84 md:w-96 h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-white/90 group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 288px, (max-width: 768px) 336px, 384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-3 left-3.5 text-white text-xs sm:text-[13px] font-figtree font-medium tracking-wide">
                {img.caption}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Marquee Reverse */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee-reverse flex gap-3 sm:gap-3.5">
          {[...row2, ...row2].map((img, i) => (
            <div
              key={i}
              className="relative w-72 sm:w-84 md:w-96 h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-white/90 group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 288px, (max-width: 768px) 336px, 384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-3 left-3.5 text-white text-xs sm:text-[13px] font-figtree font-medium tracking-wide">
                {img.caption}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 sm:mt-6 text-center">
        <a
          href="https://www.instagram.com/siddhant.yoga/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#c8ece2] hover:border-[#158b72] text-[#1F1E1D] hover:text-[#158b72] text-xs font-semibold font-figtree shadow-xs hover:shadow-md transition-all"
        >
          <FaInstagram className="w-3.5 h-3.5 text-[#158b72]" />
          <span>Follow @siddhant.yoga for Daily Ashram Updates</span>
        </a>
      </div>
    </section>
  );
}

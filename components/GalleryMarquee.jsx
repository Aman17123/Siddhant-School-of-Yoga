'use client';

import Image from 'next/image';
import { Container, SectionHeading } from './ui';
import { Sparkles, Camera } from 'lucide-react';

export default function GalleryMarquee() {
  const row1 = [
    {
      src: "/images/gallery/hatha-yogashala-pernem-goa-hatha-yoga-asana-practice-shala-01.webp",
      alt: "Morning asana and alignment practice in the ashram shala",
    },
    {
      src: "/images/gallery/hatha-yogashala-pernem-goa-sunrise-beach-yoga-session-querim-01.webp",
      alt: "Sunrise meditation session with international students",
    },
    {
      src: "/images/gallery/hatha-yogashala-pernem-goa-candlelit-meditation-session-shala-01.webp",
      alt: "Evening candlelit meditation and sound healing",
    },
    {
      src: "/images/gallery/hatha-yogashala-pernem-goa-havan-fire-puja-opening-ceremony-14.webp",
      alt: "Sacred fire havan ceremony in Rishikesh",
    },
    {
      src: "/images/gallery/hatha-yogashala-pernem-goa-hatha-yoga-asana-practice-shala-06.webp",
      alt: "Teacher adjusting students during Hatha yoga practice",
    },
  ];

  const row2 = [
    {
      src: "/images/gallery/hatha-yogashala-pernem-goa-graduation-ceremony-flower-rangoli-03.webp",
      alt: "Graduation ceremony and floral celebration",
    },
    {
      src: "/images/gallery/hatha-yogashala-pernem-goa-graduation-ceremony-flower-rangoli-06.webp",
      alt: "Vedic flower mandala rangoli on graduation day",
    },
    {
      src: "/images/gallery/hatha-yogashala-pernem-goa-hatha-yoga-asana-practice-shala-08.webp",
      alt: "Partner stretching and alignment adjustment practice",
    },
    {
      src: "/images/gallery/hatha-yogashala-pernem-goa-candlelit-meditation-session-shala-04.webp",
      alt: "Deep relaxation and guided Yoga Nidra session",
    },
    {
      src: "/images/gallery/hatha-yogashala-pernem-goa-havan-fire-puja-opening-ceremony-09.webp",
      alt: "Opening puja chanting with holy Vedic mantras",
    },
  ];

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAF6EE] border-b border-[#EBE5D8]/60 overflow-hidden">
      <Container className="mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8735A]/10 text-[#E8735A] border border-[#E8735A]/20 mb-3">
            <Camera className="w-3.5 h-3.5 text-[#e8735a]" />
            <span>Moments of Sadhana &amp; Joy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#1F1E1D] mb-4">
            Life at Siddhant School of Yoga
          </h2>
          <p className="text-base sm:text-lg text-[#55564c] leading-relaxed">
            A glimpse into our daily practice, sacred fire ceremonies, meditation by the Ganga, and lifelong friendships forged in Rishikesh.
          </p>
        </div>
      </Container>

      {/* Row 1 - Marquee Forward */}
      <div className="relative w-full overflow-hidden mb-4">
        <div className="animate-marquee flex gap-4">
          {[...row1, ...row1].map((img, i) => (
            <div
              key={i}
              className="relative w-64 sm:w-80 h-44 sm:h-52 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="320px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Marquee Reverse */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee-reverse flex gap-4">
          {[...row2, ...row2].map((img, i) => (
            <div
              key={i}
              className="relative w-64 sm:w-80 h-44 sm:h-52 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="320px"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

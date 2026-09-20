"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  // Asana Class
  { src: "/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp", alt: "Yoga asana practice on the Ganges riverbank in Rishikesh", category: "asana-class", ratio: "landscape" },
  { src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp", alt: "Warrior pose yoga practice by the Ganges river", category: "asana-class", ratio: "portrait" },
  { src: "/images/founder/acharya-siddhant-founder-meditation-rishikesh.webp", alt: "Acharya Siddhant in meditation sadhana in Rishikesh", category: "asana-class", ratio: "square" },
  { src: "/images/rishikesh/yoga_asana.png", alt: "Authentic yoga asana practice in Rishikesh", category: "asana-class", ratio: "portrait" },
  { src: "/images/founder/acharya-siddhant-founder-siddhant-school-of-yoga-rishikesh.webp", alt: "Acharya Siddhant, Founder of Siddhant School of Yoga", category: "asana-class", ratio: "portrait" },
  { src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp", alt: "Yoga retreat practice in the Himalayan mountains", category: "asana-class", ratio: "landscape" },
  { src: "/images/teachers/siddhant-ji-yoga-teacher-rishikesh.webp", alt: "Siddhant Ji guiding an asana practice session", category: "asana-class", ratio: "portrait" },
  { src: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp", alt: "Yoga philosophy class at Siddhant School of Yoga", category: "asana-class", ratio: "landscape" },
  { src: "/images/founder/acharya-siddhant-founder-with-students-rishikesh.webp", alt: "Acharya Siddhant teaching students in a yoga class", category: "asana-class", ratio: "square" },
  { src: "/images/teachers/manpreet-yoga-teacher-rishikesh.webp", alt: "Teacher Manpreet leading a yoga class", category: "asana-class", ratio: "portrait" },
  { src: "/images/teachers/sandeep-yoga-teacher-rishikesh.webp", alt: "Teacher Sandeep leading a yoga class", category: "asana-class", ratio: "portrait" },
  { src: "/images/teachers/hemlata-yoga-anatomy-teacher-rishikesh.webp", alt: "Teacher Hemlata teaching yoga anatomy", category: "asana-class", ratio: "portrait" },
  { src: "/images/about-siddhant-school-of-yoga-ashram-rishikesh.png", alt: "Yoga class session at the ashram", category: "asana-class", ratio: "landscape" },

  // TTC Session
  { src: "/images/gallery_images/200-hour-yoga-teacher-training-graduates-rishikesh.webp", alt: "200-Hour Yoga Teacher Training graduates in Rishikesh", category: "ttc", ratio: "landscape" },
  { src: "/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp", alt: "200 & 500 Hour Yoga Alliance certified teachers", category: "ttc", ratio: "square" },
  { src: "/images/gallery_images/yoga-teacher-training-certificate-ceremony-siddhant-school-rishikesh.webp", alt: "Yoga teacher training certificate ceremony", category: "ttc", ratio: "landscape" },
  { src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp", alt: "Acharya Siddhant presenting a teacher certificate", category: "ttc", ratio: "portrait" },
  { src: "/images/100-hour-yoga-ttc-rishikesh.png", alt: "100-Hour Yoga Teacher Training session", category: "ttc", ratio: "portrait" },
  { src: "/images/200-hour-yoga-ttc-rishikesh.png", alt: "200-Hour Yoga Teacher Training session", category: "ttc", ratio: "portrait" },
  { src: "/images/500-hour-yoga-ttc-rishikesh.png", alt: "500-Hour Yoga Teacher Training session", category: "ttc", ratio: "portrait" },

  // Ceremony
  { src: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp", alt: "Sacred Vedic havan fire ritual ceremony in Rishikesh", category: "ceremony", ratio: "landscape" },
  { src: "/images/gallery_images/yoga-certification-ceremony-shiva-statue-rishikesh.webp", alt: "Certification ceremony beside the Shiva statue", category: "ceremony", ratio: "portrait" },
  { src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp", alt: "Yoga students on a sacred temple visit", category: "ceremony", ratio: "portrait" },
  { src: "/images/founder/acharya-siddhant-founder-certificate-ceremony-rishikesh.webp", alt: "Acharya Siddhant conducting a certificate ceremony", category: "ceremony", ratio: "square" },
  { src: "/images/rishikesh/lord_shiva_rishikesh.png", alt: "Majestic Lord Shiva statue in Rishikesh", category: "ceremony", ratio: "portrait" },
  { src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp", alt: "Guru-shishya certificate initiation ceremony", category: "ceremony", ratio: "portrait" },

  // Food & Accommodation
  { src: "/images/gallery_images/food-gallery3.webp", alt: "Freshly prepared sattvic meal at the ashram", category: "food", ratio: "landscape" },
  { src: "/images/gallery_images/food-gallery4.webp", alt: "Ashram dining and sattvic food", category: "food", ratio: "portrait" },
  { src: "/images/rishikesh/rishikesh-asahram.png", alt: "Peaceful ashram accommodation in Rishikesh", category: "food", ratio: "landscape" },
  { src: "/images/rishikesh/ganga.png", alt: "Ashram surroundings along the sacred Ganges", category: "food", ratio: "portrait" },
  { src: "/images/about-siddhant-yoga-school-in-rishikesh.png", alt: "Siddhant School of Yoga ashram accommodation", category: "food", ratio: "square" },
  { src: "/images/about-siddhant-yoga-school.jpeg", alt: "Ashram building and accommodation at Siddhant School of Yoga", category: "food", ratio: "portrait" },

  // Excursion & Retreat
  { src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp", alt: "Yoga and meditation retreat in the Himalayan mountains", category: "excursion", ratio: "landscape" },
  { src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp", alt: "Excursion and yoga practice by the Ganges river", category: "excursion", ratio: "portrait" },
  { src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp", alt: "Students on a temple excursion near Rishikesh", category: "excursion", ratio: "portrait" },
  { src: "/images/rishikesh/rishikesh-asahram.png", alt: "Scenic retreat landscape near Rishikesh", category: "excursion", ratio: "landscape" },
  { src: "/images/rishikesh/lord_shiva_rishikesh.png", alt: "Excursion to the Shiva statue landmark in Rishikesh", category: "excursion", ratio: "portrait" },
  { src: "/images/rishikesh/ganga.png", alt: "Retreat by the sacred Ganges in Rishikesh", category: "excursion", ratio: "portrait" },
];

const tabs = [
  { key: "all", label: "All" },
  { key: "asana-class", label: "Asana Class" },
  { key: "ttc", label: "TTC Session" },
  { key: "ceremony", label: "Ceremony" },
  { key: "food", label: "Food & Accommodation" },
  { key: "excursion", label: "Excursion & Retreat" },
];

const ratioClass = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export default function GalleryGrid() {
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? galleryImages
        : galleryImages.filter((img) => img.category === activeTab),
    [activeTab],
  );

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    if (lightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filtered.length]);

  return (
    <>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 lg:mb-10">
        {tabs.map((t) => {
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-figtree font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#158b72] text-white shadow-sm"
                  : "bg-[#def4ee4d] border border-[#158b72]/30 text-[#158b72] hover:border-[#158b72]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Masonry Gallery */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4">
        {filtered.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className={`group relative block w-full mb-3 sm:mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-[#c8ece2] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer ${ratioClass[img.ratio]}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close gallery"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-[#158b72] text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#158b72] text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#158b72] text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div
            className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-[16/10] transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={filtered[lightboxIndex].src}
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-xs sm:text-sm font-figtree font-medium">
            {lightboxIndex + 1} / {filtered.length}
          </span>
        </div>
      )}
    </>
  );
}

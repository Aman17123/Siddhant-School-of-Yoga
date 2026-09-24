"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  // Asana Class
  { src: "/images/prayer-salutation-riverbank-yoga-retreat-rishikesh.jpg", alt: "Prayer salutation yoga practice on the Ganges riverbank in Rishikesh", category: "asana-class", ratio: "landscape" },
  { src: "/images/warrior-1-pose-ganga-riverside-rishikesh.jpg", alt: "Warrior 1 pose yoga practice by the Ganges river", category: "asana-class", ratio: "portrait" },
  { src: "/images/lotus-pose-meditation-rocky-riverbank-rishikesh.jpg", alt: "Lotus pose meditation on a rocky riverbank in Rishikesh", category: "asana-class", ratio: "square" },
  { src: "/images/tree-pose-vrikshasana-ganga-riverbank-rishikesh.jpg", alt: "Tree pose (Vrikshasana) practice on the Ganga riverbank", category: "asana-class", ratio: "portrait" },
  { src: "/images/crescent-lunge-yoga-riverbank-rishikesh.jpg", alt: "Crescent lunge yoga pose on the riverbank in Rishikesh", category: "asana-class", ratio: "portrait" },
  { src: "/images/rooftop-yoga-poses-ganga-view-rishikesh.jpg", alt: "Rooftop yoga poses with a view of the Ganga", category: "asana-class", ratio: "landscape" },
  { src: "/images/teacher-adjusting-warrior-pose-outdoor-class-rishikesh.jpg", alt: "Teacher adjusting a student's warrior pose in an outdoor class", category: "asana-class", ratio: "portrait" },
  { src: "/images/seated-pranayama-yoga-class-garden-rishikesh.jpg", alt: "Seated pranayama yoga class in the garden", category: "asana-class", ratio: "landscape" },
  { src: "/images/group-triangle-pose-garden-yoga-retreat-rishikesh.jpg", alt: "Group practicing triangle pose in the garden yoga retreat", category: "asana-class", ratio: "square" },
  { src: "/images/eagle-pose-garudasana-group-class-rishikesh.jpg", alt: "Eagle pose (Garudasana) group class practice", category: "asana-class", ratio: "portrait" },
  { src: "/images/side-angle-pose-garden-yoga-class-rishikesh.jpg", alt: "Side angle pose in a garden yoga class", category: "asana-class", ratio: "portrait" },
  { src: "/images/yoga-alignment-adjustment-with-straps-ttc-rishikesh.jpg", alt: "Yoga alignment adjustment with straps during TTC anatomy practice", category: "asana-class", ratio: "portrait" },
  { src: "/images/outdoor-garden-yoga-class-stretching-rishikesh.jpg", alt: "Outdoor garden yoga class stretching session", category: "asana-class", ratio: "landscape" },

  // TTC Session
  { src: "/images/yoga-teacher-training-graduation-celebration-rishikesh.jpg", alt: "Yoga Teacher Training graduation celebration in Rishikesh", category: "ttc", ratio: "landscape" },
  { src: "/images/yoga-ttc-students-with-certificates-siddhant-school-rishikesh.jpg", alt: "Yoga Alliance certified teachers with their certificates", category: "ttc", ratio: "square" },
  { src: "/images/student-receiving-yoga-certificate-siddhant-school-rishikesh.jpg", alt: "Student receiving a yoga teacher training certificate", category: "ttc", ratio: "landscape" },
  { src: "/images/tilak-blessing-ceremony-yoga-ttc-graduation-rishikesh.jpg", alt: "Acharya Siddhant presenting a tilak blessing at graduation", category: "ttc", ratio: "portrait" },
  { src: "/images/triangle-pose-garden-yoga-class-rishikesh.jpg", alt: "100-Hour Yoga Teacher Training asana session", category: "ttc", ratio: "portrait" },
  { src: "/images/high-lunge-warrior-pose-riverbank-rishikesh.jpg", alt: "200-Hour Yoga Teacher Training asana session", category: "ttc", ratio: "portrait" },
  { src: "/images/natarajasana-dancer-pose-riverbank-rishikesh.jpg", alt: "500-Hour Yoga Teacher Training asana session", category: "ttc", ratio: "portrait" },

  // Ceremony
  { src: "/images/havan-fire-ceremony-yoga-ttc-rishikesh.jpg", alt: "Sacred Vedic havan fire ceremony in Rishikesh", category: "ceremony", ratio: "landscape" },
  { src: "/images/yoga-ttc-graduation-group-shiva-altar-rishikesh.jpg", alt: "Graduation ceremony group beside the Shiva altar", category: "ceremony", ratio: "portrait" },
  { src: "/images/yoga-ttc-graduates-marigold-garlands-rishikesh.jpg", alt: "Yoga TTC graduates wearing marigold garlands", category: "ceremony", ratio: "portrait" },
  { src: "/images/yoga-ttc-graduate-namaste-garland-rishikesh.jpg", alt: "Yoga TTC graduate in namaste with a garland", category: "ceremony", ratio: "square" },
  { src: "/images/yoga-ttc-graduates-siddhant-school-of-yoga-rishikesh.jpg", alt: "Yoga TTC graduates of Siddhant School of Yoga", category: "ceremony", ratio: "portrait" },
  { src: "/images/yoga-ttc-graduates-fire-ceremony-siddhant-school-of-yoga.jpg", alt: "Guru-shishya fire ceremony at graduation", category: "ceremony", ratio: "portrait" },

  // Food & Accommodation
  { src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg", alt: "Freshly prepared sattvic meal at the ashram", category: "food", ratio: "landscape" },
  { src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg", alt: "Ashram dining and sattvic food", category: "food", ratio: "portrait" },
  { src: "/images/rishikesh/rishikesh-asahram.png", alt: "Peaceful ashram accommodation in Rishikesh", category: "food", ratio: "landscape" },
  { src: "/images/rishikesh/ganga.png", alt: "Ashram surroundings along the sacred Ganges", category: "food", ratio: "portrait" },
  { src: "/images/about-siddhant-yoga-school-in-rishikesh.png", alt: "Siddhant School of Yoga ashram accommodation", category: "food", ratio: "square" },
  { src: "/images/about-siddhant-yoga-school.jpeg", alt: "Ashram building and accommodation at Siddhant School of Yoga", category: "food", ratio: "portrait" },

  // Excursion & Retreat
  { src: "/images/yoga-retreat-students-at-waterfall-rishikesh.jpg", alt: "Yoga retreat students at a waterfall near Rishikesh", category: "excursion", ratio: "landscape" },
  { src: "/images/yoga-student-rocky-riverbed-walk-rishikesh.jpg", alt: "Student walking along a rocky riverbed excursion", category: "excursion", ratio: "portrait" },
  { src: "/images/yoga-students-temple-excursion-rishikesh.jpg", alt: "Students on a temple excursion near Rishikesh", category: "excursion", ratio: "portrait" },
  { src: "/images/yoga-retreat-group-temple-visit-rishikesh.jpg", alt: "Yoga retreat group on a temple visit near Rishikesh", category: "excursion", ratio: "landscape" },
  { src: "/images/yoga-students-ringing-bell-kunjapuri-temple-rishikesh.jpg", alt: "Students ringing the bell at Kunjapuri temple excursion", category: "excursion", ratio: "portrait" },
  { src: "/images/yoga-retreat-waterfall-pool-excursion-rishikesh.jpg", alt: "Retreat group at a waterfall pool excursion near Rishikesh", category: "excursion", ratio: "portrait" },
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
                  ? "bg-[#1c3b2b] text-white shadow-sm"
                  : "bg-[#f4efe6] border border-[#1c3b2b]/30 text-[#1c3b2b] hover:border-[#1c3b2b]"
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
            className={`group relative block w-full mb-3 sm:mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-[#e3dac9] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer ${ratioClass[img.ratio]}`}
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
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-[#1c3b2b] text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#1c3b2b] text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#1c3b2b] text-white flex items-center justify-center transition-colors border border-white/20"
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

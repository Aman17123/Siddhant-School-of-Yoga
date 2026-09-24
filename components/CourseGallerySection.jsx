"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, Images } from "lucide-react";
import { Kicker, HeadingDivider } from "./ui";

export default function CourseGallerySection({
  showHeading = false,
  eyebrow = "Life At The Ashram",
  title = "A Glimpse Into Your Yoga Journey",
  description = "From sunrise asana by the Ganges to sacred fire ceremonies and certificate day, here's a look at what daily life feels like during your 100-hour training in Rishikesh.",
  mainImage,
  mainImageAlt,
  caption,
  videoId,
  images = [],
  className = "",
}) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const allImages = [
    { src: mainImage, alt: mainImageAlt || caption },
    ...images,
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setVideoOpen(false);
        setLightboxOpen(false);
      }
    };
    if (videoOpen || lightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [videoOpen, lightboxOpen]);

  return (
    <div className={className}>
      {showHeading && (
        <div className="max-w-2xl mx-auto text-center mb-8 lg:mb-10">
          <Kicker>{eyebrow}</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
            {title}
          </h2>
          <HeadingDivider />
          {description && (
            <p className="text-sm sm:text-[15px] font-figtree font-medium text-stone-600 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[400px]">
          {/* Left: Large feature image */}
          <div className="relative w-full h-64 sm:h-80 lg:h-full rounded-2xl overflow-hidden group">
            <Image
              src={mainImage}
              alt={mainImageAlt || caption || "Yoga at Siddhant School of Yoga, Rishikesh"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {caption && (
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                <p className="text-white text-base sm:text-lg font-belleza font-normal drop-shadow-md">
                  &ldquo;{caption}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Right: Responsive photo grid + 1 video tile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 gap-3 sm:gap-4 lg:h-full">
            {/* Video tile */}
            {videoId && (
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="group relative w-full h-24 sm:h-auto aspect-square sm:aspect-auto rounded-xl sm:rounded-2xl overflow-hidden bg-black cursor-pointer"
                aria-label="Play video"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                  alt="Watch our yoga school video"
                  fill
                  unoptimized
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/95 text-[#1c3b2b] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#1c3b2b] group-hover:text-white transition-all duration-300 pl-0.5">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </div>
                </div>
              </button>
            )}

            {/* Photo tiles */}
            {images.slice(0, 5).map((img, i) => {
              const isLast = i === images.slice(0, 5).length - 1;
              return (
                <div
                  key={i}
                  className="relative w-full h-24 sm:h-auto aspect-square sm:aspect-auto rounded-xl sm:rounded-2xl overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt || "Yoga at Siddhant School of Yoga, Rishikesh"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                  />
                  {isLast && (
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="absolute inset-0 bg-black/50 hover:bg-black/60 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-full bg-[#fdfbf7] text-[#1e2422] text-[11px] sm:text-sm font-semibold shadow-lg">
                        <Images className="w-3 h-3 sm:w-4 sm:h-4" />
                        View All
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      {/* Video Modal */}
      {videoOpen && videoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              aria-label="Close video player"
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#1c3b2b] text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Siddhant School of Yoga Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Lightbox: scrollable image gallery */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#1c3b2b] text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-[92vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto scrollbar-thin flex flex-col gap-3 p-3">
              {allImages.map((img, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shrink-0"
                >
                  <Image
                    src={img.src}
                    alt={img.alt || "Siddhant School of Yoga gallery image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

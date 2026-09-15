"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, ExternalLink, Clock } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { Container, SectionHeading } from "../ui";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/c/SiddhantSchoolofYoga";

const videos = [
  {
    id: "w4_12OUppgM",
    title: "Siddhant School of Yoga Review: My Amazing 200 Hour Yoga Teacher Training in Rishikesh",
    description:
      "A genuine testimonial from our international graduate sharing her personal transformation, daily sadhana, and teaching journey in Rishikesh.",
    category: "Student Experience",
    duration: "2:24",
    thumbnail: "https://i.ytimg.com/vi/w4_12OUppgM/hqdefault.jpg",
  },
  {
    id: "lZSFXRF0PBA",
    title: "Ganesh Mantra Chanting during 200 hours Yoga Teacher Training Course in Rishikesh, India",
    description:
      "Experience the sacred vibrations of morning Vedic chanting and prayer ceremony led by our monastic masters at the Rishikesh ashram.",
    category: "Mantra Sadhana",
    duration: "1:02",
    thumbnail: "https://i.ytimg.com/vi/lZSFXRF0PBA/hqdefault.jpg",
  },
  {
    id: "6tPxEV9skT8",
    title: "Why to discover Chakra for Kundalini Yoga?",
    description:
      "Acharya Siddhant explains the authentic yogic science of discovering and activating your dormant energy centers (Chakras).",
    category: "Kundalini Philosophy",
    duration: "8:22",
    thumbnail: "https://i.ytimg.com/vi/6tPxEV9skT8/hqdefault.jpg",
  },
  {
    id: "mBW3j_mM-Fk",
    title: "Why Discover your Chakra — The Subtle Energy Body",
    description:
      "A deep insight into understanding the spiritual physiology beyond physical postures and moving towards self-realization.",
    category: "Spiritual Science",
    duration: "1:49",
    thumbnail: "https://i.ytimg.com/vi/mBW3j_mM-Fk/hqdefault.jpg",
  },
];

export default function VideoSection() {
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveVideoId(null);
      }
    };
    if (activeVideoId) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeVideoId]);

  return (
    <section
      id="videos"
      className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/80 relative overflow-hidden font-figtree"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#158b72]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#158b72]/5 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10 items-center md:items-end text-center md:text-left">
          <SectionHeading
            eyebrow="Video Gallery"
            title="Experience Life at Siddhant School of Yoga"
            text="Watch authentic moments from our Rishikesh ashram — student transformations, sacred Vedic mantra chanting, Kundalini energy awakening, and daily sadhana."
            className="mb-0"
          />

          {/* YouTube Channel Subscribe Link */}
          <div className="shrink-0 flex justify-center md:justify-end w-full md:w-auto">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white hover:bg-[#158b72] text-[#1e2422] hover:text-white border border-[#c8ece2] hover:border-[#158b72] text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 group"
            >
              <FaYoutube className="w-4 h-4 text-[#158b72] group-hover:text-white transition-colors" />
              <span>Visit YouTube Channel</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Video Grid (4 Cards: 1 col on mobile, 2 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideoId(video.id)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#c8ece2] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div>
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#158b72] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#0f6b57] transition-all duration-300 pl-0.5">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-medium flex items-center gap-1 backdrop-blur-xs">
                    <Clock className="w-3 h-3 text-stone-300" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-[#158b72] text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                    {video.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] group-hover:text-[#158b72] transition-colors line-clamp-2 leading-snug mb-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-medium">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between text-xs font-semibold text-[#158b72] border-t border-[#c8ece2]/50">
                <span className="group-hover:underline">Watch Video</span>
                <Play className="w-3 h-3 fill-current" />
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Video Modal Player */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideoId(null)}
              aria-label="Close video player"
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#158b72] text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 16:9 Responsive Embed */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="Siddhant School of Yoga Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

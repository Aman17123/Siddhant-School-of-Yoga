import Image from "next/image";
import { Container, Kicker, HeadingDivider } from "../ui";
import { Sparkles, Waves, Mountain, Flame, Compass } from "lucide-react";

export default function WhyRishikesh() {
  const highlights = [
    {
      icon: Waves,
      title: "Sacred River Ganga Energy",
      desc: "Practicing asana and pranayama along the pure glacial waters of the holy Ganges infuses every breath with pure spiritual prana.",
    },
    {
      icon: Mountain,
      title: "Home Of Great Himalayas",
      desc: "Rishikesh is cradled by verdant mountains where sages and rishis have meditated for thousands of years, creating an unparalleled yogic vortex.",
    },
    {
      icon: Flame,
      title: "World Capital Of Yoga",
      desc: "Home to the sacred Ganga Aarti, traditional ashrams, and timeless Guru-Shishya paramparas that preserve authentic Vedic culture.",
    },
    {
      icon: Compass,
      title: "Peaceful Place To Reflect",
      desc: "Far from commercial distractions, Rishikesh allows you to completely disconnect, turn inwards, and experience true spiritual rebirth.",
    },
  ];

  return (
    <section
      id="rishikesh"
      className="pt-14 sm:pt-16 lg:pt-20 pb-20 sm:pb-24 lg:pb-28 bg-[#FFFFFF] border-b border-[#c8ece2]/60 relative overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Text & 4 Highlights (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <Kicker>Rishikesh, India</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] mb-1 lg:mb-3 leading-[1.2]">
              Why Learn Yoga in Rishikesh, India?
            </h2>
            <HeadingDivider center={false} className="mb-3" />

            <p className="font-figtree text-sm sm:text-base text-stone-600 leading-relaxed mb-8 font-medium max-w-2xl mx-auto lg:mx-0">
              Yoga and a yogic lifestyle are the right solutions to life&apos;s
              challenges, but to truly absorb its depths you need the right
              energetic vortex. Rishikesh is nestled under the foothills of the
              Himalayas along the emerald waters of Mother Ganga. For thousands
              of years, realized masters have practiced sadhana here. Siddhant
              School of Yoga is blessed to be located in this sacred sanctuary.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-figtree">
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#c8ece2] shadow-xs hover:shadow-md transition-shadow flex flex-col items-center sm:items-start text-center sm:text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#158b72]/10 text-[#158b72] flex items-center justify-center mb-3 mx-auto sm:mx-0">
                      <Icon className="w-5 h-5 text-[#158b72]" />
                    </div>
                    <h4 className="font-belleza text-lg font-normal text-[#158b72] tracking-wide mb-1.5">
                      {h.title}
                    </h4>
                    <p className="text-[15px] text-stone-600 leading-relaxed font-medium">
                      {h.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Photo Collage (5 cols) with sleek rounded edges & Sacred Yoga Artwork */}
          <div className="lg:col-span-5 relative">
            {/* Soft ambient spiritual aura */}
            <div
              className="absolute -inset-6 bg-gradient-to-tr from-[#158b72]/10 via-[#158b72]/12 to-transparent rounded-[40px] blur-2xl pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Artistic Sacred Yoga & Siddhant Logo Emblem Artwork behind the Photos - Subtle & Tasteful */}
            <div className="absolute -inset-4 sm:-inset-6 pointer-events-none -z-10 flex items-center justify-center overflow-visible">
              <svg
                viewBox="0 0 500 500"
                className="w-[110%] h-[110%] max-w-none text-[#158b72] opacity-20 sm:opacity-28 transition-opacity"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Concentric Sacred Geometry Rings */}
                <circle
                  cx="250"
                  cy="250"
                  r="235"
                  stroke="#158b72"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="210"
                  stroke="#158b72"
                  strokeWidth="1.4"
                  opacity="0.75"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="185"
                  stroke="#0f6b57"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.6"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="155"
                  stroke="#158b72"
                  strokeWidth="1.2"
                  opacity="0.65"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="115"
                  stroke="#158b72"
                  strokeWidth="1"
                  opacity="0.5"
                />

                {/* 16 Radiating Lotus Blossoms & Prana Rays */}
                {[
                  0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225,
                  247.5, 270, 292.5, 315, 337.5,
                ].map((angle, i) => (
                  <g key={i} transform={`rotate(${angle} 250 250)`}>
                    {/* Sacred Outer Lotus Petal */}
                    <path
                      d="M 250 145 C 236 75, 264 75, 250 20 C 236 75, 264 75, 250 145 Z"
                      stroke="#158b72"
                      strokeWidth="1.2"
                      opacity="0.7"
                    />
                    {/* Ray Line */}
                    <line
                      x1="250"
                      y1="210"
                      x2="250"
                      y2="230"
                      stroke="#158b72"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle cx="250" cy="16" r="2.5" fill="#158b72" opacity="0.8" />
                  </g>
                ))}

                {/* Flowing Ganges Prana Waves extending outward */}
                <path
                  d="M 30 380 C 110 350, 190 410, 290 370 C 390 330, 460 390, 510 365"
                  stroke="#0f6b57"
                  strokeWidth="1.8"
                  strokeDasharray="6 4"
                  opacity="0.7"
                />
                <path
                  d="M 10 405 C 100 375, 180 435, 280 395 C 380 355, 450 415, 525 390"
                  stroke="#158b72"
                  strokeWidth="1.5"
                  opacity="0.75"
                />
                <path
                  d="M 50 430 C 130 400, 210 455, 310 420 C 400 385, 470 435, 520 415"
                  stroke="#158b72"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />

                {/* School Logo Emblem — Graceful Yogi in Natarajasana & Sacred Mudra */}
                <g transform="translate(180, 180) scale(2)" opacity="0.8">
                  <circle
                    cx="35"
                    cy="35"
                    r="33"
                    stroke="#158b72"
                    strokeWidth="1"
                    strokeDasharray="3 2"
                  />
                  <circle
                    cx="35"
                    cy="35"
                    r="29"
                    stroke="#158b72"
                    strokeWidth="0.8"
                  />
                  {/* Yogi Head */}
                  <circle cx="35" cy="18" r="4.2" fill="#0f6b57" />
                  {/* Torso */}
                  <path
                    d="M35 22.5 C35 28 32 35 34 42 C35 45 36 50 36 54"
                    stroke="#0f6b57"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  {/* Standing Leg */}
                  <path
                    d="M36 54 L36 62"
                    stroke="#0f6b57"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  {/* Lifted Leg */}
                  <path
                    d="M34 42 C30 40 22 36 21 28 C20.5 24 23 20 26 19 C28 18 31 20 33 24"
                    stroke="#0f6b57"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Front Extended Arm in Mudra */}
                  <path
                    d="M34 26 C38 27 46 29 52 30"
                    stroke="#0f6b57"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="53" cy="30" r="1.6" fill="#158b72" />
                  {/* Back Arm */}
                  <path
                    d="M34 26 C31 22 28 20 30 22"
                    stroke="#0f6b57"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Lotus Pedestal Base */}
                  <path
                    d="M26 62 C31 60 39 60 44 62"
                    stroke="#158b72"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>

            <div className="relative grid grid-cols-2 gap-3.5 sm:gap-4.5">
              {/* Left Column (Staggered) */}
              <div className="space-y-3.5 sm:space-y-4.5">
                <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.08)] border-[3px] border-white ring-1 ring-black/5 bg-stone-100">
                  <Image
                    src="/images/rishikesh/lord_shiva_rishikesh.png"
                    alt="Majestic Lord Shiva statue in sacred Rishikesh along the Ganges"
                    fill
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, 260px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="group relative aspect-square rounded-3xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.08)] border-[3px] border-white ring-1 ring-black/5 bg-stone-100">
                  <Image
                    src="/images/rishikesh/yoga_asana.png"
                    alt="Authentic yoga asana and spiritual sadhana practice in Rishikesh"
                    fill
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, 260px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Right Column (Staggered offset) */}
              <div className="space-y-3.5 sm:space-y-4.5 pt-7 sm:pt-9">
                <div className="group relative aspect-square rounded-3xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.08)] border-[3px] border-white ring-1 ring-black/5 bg-stone-100">
                  <Image
                    src="/images/rishikesh/ganga.png"
                    alt="Sacred emerald waters of Mother Ganga in Rishikesh"
                    fill
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, 260px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.08)] border-[3px] border-white ring-1 ring-black/5 bg-stone-100">
                  <Image
                    src="/images/rishikesh/rishikesh-asahram.png"
                    alt="Scenic spiritual landscape and Himalayan ashram sanctuary in Rishikesh"
                    fill
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, 260px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Floating Sleek Center Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#c8ece2] shadow-md flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#158b72] animate-pulse" />
                <span className="font-figtree text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#1e2422] uppercase">
                  Rishikesh, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

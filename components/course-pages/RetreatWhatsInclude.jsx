"use client";

import { useState } from "react";
import Image from "next/image";
import { Kicker, HeadingDivider } from "@/components/ui";

// Shared site-wide facilities & inclusions list, reused across the retreat
// pages with the same 3-tab Included/Excluded/To-Bring pattern used in
// TwoHundredHourContent.jsx's WhatsIncludedTabsSection.
const whatsIncludeTabs = [
  {
    label: "What's Included",
    items: [
      "Residential stay for the full retreat",
      "Course completion certificate",
      "Shared or private accommodation",
      "Attached bathroom with 24-hour hot water",
      "3 healthy vegetarian meals daily",
      "Herbal tea 2–3 times daily",
      "Filtered drinking water",
      "Free Wi-Fi",
      "Yoga mat",
      "Neti pot and rubber neti",
      "Rudraksha mala",
      "Yoga bag",
      "Study materials, notebook and pen",
      "A short excursion trip",
      "Pickup from Dehradun Airport",
      "One Ayurvedic massage",
    ],
    images: [
      { src: "/images/yoga-school-food-and-stay/yoga-school-twin-sharing-room.jpg", alt: "Comfortable shared room accommodation at Siddhant School of Yoga", caption: "Comfortable Stay" },
      { src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg", alt: "Sattvic vegetarian meals served at Siddhant School of Yoga", caption: "Sattvic Meals" },
      { src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp", alt: "Excursion trip included in the retreat", caption: "Excursion" },
      { src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg", alt: "Attached bathroom with hot water at Siddhant School of Yoga", caption: "Attached Bathroom" },
    ],
  },
  {
    label: "What's Excluded",
    items: [
      "International and domestic flights",
      "Indian visa fees",
      "Personal expenses",
      "Travel insurance",
    ],
    images: [
      { src: "/images/standing-forward-fold-riverside.png", alt: "Standing forward fold practice by the riverside in Rishikesh", caption: "Riverside Practice" },
      { src: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp", alt: "Havan fire ceremony at the ashram", caption: "Ashram Life" },
      { src: "/images/warrior-pose-riverside-rocks.jpg", alt: "Warrior pose practice on the riverside rocks in Rishikesh", caption: "Personal Practice" },
      { src: "/images/seated-spinal-twist-group-class.png", alt: "Group seated spinal twist during the philosophy class break", caption: "Philosophy Class" },
    ],
  },
  {
    label: "What To Bring",
    items: [
      "Comfortable yoga clothing",
      "A reusable water bottle",
      "Personal toiletries",
      "A light jacket for cool mornings",
      "Travel documents",
      "An open mind",
    ],
    images: [
      { src: "/images/yoga-for-beginners-seated-stretch-class.jpg", alt: "Beginner-friendly seated stretch class at Siddhant School of Yoga", caption: "Community" },
      { src: "/images/seated-stretch-pose-lawn-class.jpg", alt: "Students practicing a seated stretch pose on the lawn", caption: "Practice" },
      { src: "/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp", alt: "Riverside yoga asana practice in Rishikesh", caption: "By the Ganga" },
      { src: "/images/graduation-flower-garland-photo.jpg", alt: "Retreat graduates with flower garlands at Siddhant School of Yoga", caption: "Your Journey" },
    ],
  },
];

export default function RetreatWhatsInclude({ bgClassName = "bg-[#fdfbf7]" }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = whatsIncludeTabs[activeTab];

  return (
    <section id="whats-include" className={`scroll-mt-28 py-14 sm:py-16 lg:py-20 ${bgClassName} border-b border-[#e3dac9]/70 font-figtree`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <Kicker>What&apos;s Include</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            What&apos;s Included, What&apos;s Not, and What To Bring
          </h2>
          <HeadingDivider />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {whatsIncludeTabs.map((t, i) => {
            const isActive = activeTab === i;
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-figtree font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#1c3b2b] text-white shadow-sm"
                    : "bg-[#fdfbf7] border border-[#1c3b2b]/30 text-[#1c3b2b] hover:border-[#1c3b2b]"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-[#e3dac9] bg-white/70 p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <ul className="space-y-0">
              {tab.items.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 py-3 ${
                    i !== 0 ? "border-t border-dashed border-[#e3dac9]" : ""
                  }`}
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1c3b2b] shrink-0" />
                  <span className="text-sm sm:text-base text-stone-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-3">
              {tab.images.map((img) => (
                <div key={img.caption} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-white text-xs sm:text-[13px] font-semibold drop-shadow-md">
                    {img.caption}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

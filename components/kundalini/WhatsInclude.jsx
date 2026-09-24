"use client";

import { useState } from "react";
import Image from "next/image";
import { Kicker, HeadingDivider } from "@/components/ui";

const whatsIncludeTabs = [
  {
    label: "What's Included",
    items: [
      "13 days residential Kundalini yoga course",
      "School Certificate of Completion (Part 1 of the 200-Hour Kundalini TTC)",
      "Both shared and private accommodation options",
      "Attached bathroom with hot water",
      "Healthy and nutritious vegetarian meals",
      "Herbal tea served daily",
      "Filtered water & free Wi-Fi",
      "One yoga mat, one Neti pot & one Rubber Neti",
      "One Rudraksha Mala & one yoga bag",
      "Course study materials, notebooks and pens",
      "A short excursion trip",
      "Free pick-up from Dehradun Airport",
      "One free Ayurvedic massage",
    ],
    images: [
      { src: "/images/yoga-school-food-and-stay/yoga-school-washroom-with-hot-water-shower.jpg", alt: "Washroom with hot water shower at Siddhant School of Yoga", caption: "Comfortable Stay" },
      { src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg", alt: "Sattvic meals served at Siddhant School of Yoga", caption: "Sattvic Meals" },
      { src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp", alt: "Short excursion trip in Rishikesh", caption: "Excursions" },
      { src: "/images/gallery_images/yoga-teacher-training-certificate-ceremony-siddhant-school-rishikesh.webp", alt: "100-hour Kundalini certification ceremony", caption: "Certification" },
    ],
  },
  {
    label: "What's Excluded",
    items: [
      "International and domestic airfare",
      "Indian visa fees",
      "Personal expenses and shopping",
      "Travel & health insurance",
      "Excursions beyond the included short trip",
      "Additional spa or massage treatments",
      "Laundry service (available on campus at extra cost)",
    ],
    images: [
      { src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp", alt: "Himalayan foothills near Rishikesh", caption: "Himalayan Views" },
      { src: "/images/vipassana-meditation-cave-retreat.jpg", alt: "Vipassana meditation cave retreat, part of ashram life in Rishikesh", caption: "Ashram Life" },
      { src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp", alt: "Yoga practice by the Ganges river", caption: "Personal Practice" },
      { src: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp", alt: "Kundalini philosophy class", caption: "Philosophy" },
    ],
  },
  {
    label: "What To Bring",
    items: [
      "Two passport-size photos",
      "Your phone and charger",
      "Electronics you use (laptop, camera, tablet)",
      "An ATM / debit card",
      "Comfortable, season-appropriate yoga clothing and shoes",
      "A travel towel",
      "A first-aid kit with basic medications",
      "Personal essentials (avoid expensive jewelry & valuables)",
    ],
    images: [
      { src: "/images/gallery_images/yoga-certification-ceremony-shiva-statue-rishikesh.webp", alt: "Students at the Shiva statue in Rishikesh", caption: "Community" },
      { src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp", alt: "Acharya Siddhant mentoring a student", caption: "Mentorship" },
      { src: "/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp", alt: "Yoga teacher training certification batch", caption: "Graduation" },
      { src: "/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp", alt: "Kundalini asana practice in Rishikesh", caption: "Your Journey" },
    ],
  },
];

export default function KundaliniWhatsInclude() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = whatsIncludeTabs[activeTab];

  return (
    <section id="whats-include" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <Kicker>What's Include</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            What's Included, What's Not, and What To Bring
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

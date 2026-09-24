"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Plus, Minus } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";

function SylList({ items }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 list-none">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2 py-0.5">
          <Check className="w-3.5 h-3.5 text-[#1c3b2b] mt-1 shrink-0" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function SylGroup({ label, text }) {
  return (
    <p className="mb-2 last:mb-0">
      <span className="font-semibold text-[#1c3b2b]">{label}: </span>
      {text}
    </p>
  );
}

const syllabusCards = [
  {
    title: "Advanced Kundalini Asana",
    subtitle: "Advanced Asana · Ashtanga Vinyasa · Alignment",
    image: "/images/ardha-matsyendrasana-twist-riverbank-rishikesh.jpg",
    alt: "Advanced seated spinal twist alignment practice by the riverbank in Rishikesh",
    text: "Kapotasana, Gandha Bherundasana, Astavakrasana and the full Ashtanga Vinyasa primary series, each mapped to chakra and energy work with refined alignment and adjustment.",
  },
  {
    title: "Advanced Pranayama & Purification",
    subtitle: "Sushumna Breathing · Bandha · Mudra · Shatkarma",
    image: "/images/sphinx-pose-outdoor-yoga-class-rishikesh.jpg",
    alt: "Advanced Kundalini pranayama and purification practice outdoors in Rishikesh",
    text: "Advanced Nadi Shodhana and Sushumna breathing, refined bandha and mudra work, and advanced Shatkarma to move Kundalini energy through a fully cleared system.",
  },
  {
    title: "Kundalini Meditation & Balancing",
    subtitle: "Meditation · Yoga Nidra · Advanced Mantra Sadhana",
    image: "/images/group-meditation-hilltop-temple-rishikesh.jpg",
    alt: "Advanced Kundalini meditation and mantra sadhana practice at a hilltop temple in Rishikesh",
    text: "Kundalini meditation to balance the chakras, deep Yoga Nidra and advanced mantra sadhana, building the stability needed for Kundalini itself to safely awaken.",
  },
  {
    title: "Advanced Anatomy, Ethics & Teaching",
    subtitle: "Biomechanics · Philosophy · Practicum · Certification",
    image: "/images/seated-stretching-yoga-class-garden-rishikesh.jpg",
    alt: "Advanced Kundalini philosophy and teaching practicum in the garden classroom in Rishikesh",
    text: "Advanced biomechanics, physiology, Kundalini philosophy, ethics, professional development, Ayurveda, teaching methodology and a full teaching practicum toward RYS-300 certification.",
  },
];

const syllabusItems = [
  {
    q: "1. Advanced Kundalini Asana",
    a: (
      <SylGroup
        label="Advanced postures mapped to chakra and energy work"
        text="Kapotasana, Gandha Bherundasana, Astavakrasana and other advanced postures, practiced with precision and linked directly to the chakra and energy pathway each one activates."
      />
    ),
  },
  {
    q: "2. Full Ashtanga Vinyasa Primary Series",
    a: (
      <SylGroup
        label="The complete primary series"
        text="A structured, breath-synchronised practice of the full Ashtanga Vinyasa primary series, building strength, heat and steadiness for advanced Kundalini work."
      />
    ),
  },
  {
    q: "3. Advanced Alignment & Adjustment",
    a: (
      <SylList
        items={[
          "Refined principles of alignment for advanced postures",
          "Safe, precise hands-on adjustment",
          "Correcting common compensations in advanced asana",
          "Teaching alignment to future students",
        ]}
      />
    ),
  },
  {
    q: "4. Advanced Nadi Shodhana & Sushumna Breathing",
    a: (
      <SylGroup
        label="Refined breathwork for energy ascent"
        text="Advanced alternate-nostril technique and Sushumna breathing practice, purifying the central energy channel so Kundalini can rise freely."
      />
    ),
  },
  {
    q: "5. Advanced Bandha — Mula, Uddiyana, Jalandhara, Maha",
    a: (
      <SylGroup
        label="Refined application of the energy locks"
        text="A deeper, more precise application of Mula, Uddiyana, Jalandhara and Maha Bandha, used together to direct and contain rising Kundalini energy safely."
      />
    ),
  },
  {
    q: "6. Advanced Mudra — Shambhavi, Prana, Apana & Bhoochari",
    a: (
      <SylList
        items={[
          "Shambhavi Mudra",
          "Prana Mudra",
          "Apana Mudra",
          "Bhoochari Mudra",
        ]}
      />
    ),
  },
  {
    q: "7. Advanced Shatkarma",
    a: (
      <SylGroup
        label="Deeper yogic purification"
        text="Advanced cleansing practices that build on the foundational Shatkarma from earlier trainings, keeping the body and energy channels fully clear."
      />
    ),
  },
  {
    q: "8. Deep Relaxation Techniques",
    a: (
      <SylGroup
        label="Advanced relaxation practice"
        text="Structured deep relaxation woven between intense sessions, helping the nervous system safely integrate advanced energy work."
      />
    ),
  },
  {
    q: "9. Kundalini Meditation — Balancing the Chakras",
    a: (
      <SylGroup
        label="Step 3 of our Kundalini method"
        text="Guided meditation practice focused specifically on balancing all seven main chakras, the essential step before Kundalini itself can safely awaken."
      />
    ),
  },
  {
    q: "10. Yoga Nidra",
    a: (
      <SylGroup
        label="Yogic sleep, advanced application"
        text="A deeply restorative lying-down meditation used at an advanced level to support chakra balancing and Kundalini awakening."
      />
    ),
  },
  {
    q: "11. Gratitude Practice",
    a: (
      <SylGroup
        label="Daily affirmation practice"
        text="A continued daily gratitude and affirmation session for peace, happiness and positive results, sustaining steady inner transformation."
      />
    ),
  },
  {
    q: "12. Advanced Mantra Sadhana",
    a: (
      <SylList
        items={[
          "Om Prithivyai",
          "Om Varunaya",
          "Om Suryaya",
          "Hare Krishna Mahamantra",
          "Om Aim Saraswatyai",
          "Om Gurave",
        ]}
      />
    ),
  },
  {
    q: "13. Biomechanics & Anatomy (Advanced)",
    a: (
      <SylGroup
        label="Advanced movement science"
        text="A deeper working knowledge of joints, bones and muscles in advanced postures, so every adjustment you give as a teacher is safe and informed."
      />
    ),
  },
  {
    q: "14. Physiology (Advanced)",
    a: (
      <SylGroup
        label="Advanced body systems"
        text="How the nervous, endocrine, digestive and respiratory systems respond to advanced asana, pranayama and Kundalini practice."
      />
    ),
  },
  {
    q: "15. Kundalini Philosophy",
    a: (
      <SylGroup
        label="Chakra balancing, Kundalini awakening & Tantra"
        text="Chakra balancing, the awakening of Kundalini itself, the types of prana, Tantra, the role of the guru, the dangers of uncontrolled Kundalini, and Samadhi."
      />
    ),
  },
  {
    q: "16. Ethics",
    a: (
      <SylGroup
        label="Teaching ethics"
        text="The ethical responsibilities of a Kundalini teacher, especially when guiding students through powerful energy experiences."
      />
    ),
  },
  {
    q: "17. Professional Development",
    a: (
      <SylGroup
        label="Building a teaching career"
        text="Practical guidance on building a career teaching Kundalini yoga, from finding students to running your own classes and workshops."
      />
    ),
  },
  {
    q: "18. Ayurveda (Advanced)",
    a: (
      <SylGroup
        label="Advanced Ayurvedic principles"
        text="A deeper look at Ayurveda's role in supporting chakra balance, digestion and energy work throughout an advanced Kundalini practice."
      />
    ),
  },
  {
    q: "19. Advanced Teaching Methodology",
    a: (
      <SylGroup
        label="How to teach at an advanced level"
        text="Sequencing, cueing and holding space for advanced Kundalini classes, including how to guide students safely through chakra balancing work."
      />
    ),
  },
  {
    q: "20. Practicum (Teaching Practice)",
    a: (
      <SylGroup
        label="Hands-on teaching experience"
        text="Supervised teaching practice in front of your peers, with direct feedback from Acharya Siddhant and senior faculty before you graduate."
      />
    ),
  },
  {
    q: "21. Certification & Registration",
    a: (
      <SylGroup
        label="RYS-300 certificate & path to RYT-500"
        text="On successful completion you receive a Yoga Alliance USA RYS-300 certificate, and combined with a 200-hour certificate you become eligible to register as RYT-500."
      />
    ),
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-[#1c3b2b] bg-[#fdfbf7] shadow-md"
          : "border-[#e3dac9] bg-[#fdfbf7]/95 hover:border-[#1c3b2b] shadow-2xs"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`text-base sm:text-lg font-belleza font-bold tracking-wide transition-colors ${
            isOpen ? "text-[#1c3b2b]" : "text-[#1F1E1D]"
          }`}
        >
          {item.q}
        </span>
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-[#1c3b2b] text-white"
              : "bg-[#f4efe6] text-[#77786e] hover:bg-[#1c3b2b]/20"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <Plus className="w-4 h-4 stroke-[2.5]" />
          )}
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-[15px] text-stone-600 leading-relaxed">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KundaliniSyllabusSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Course Syllabus</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            What the 300-Hour Advanced Kundalini Curriculum Covers
          </h2>
          <HeadingDivider />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {syllabusCards.map((card) => (
            <div
              key={card.title}
              className="group bg-[#fdfbf7] rounded-2xl overflow-hidden border border-[#e3dac9] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-belleza text-lg sm:text-xl text-[#1e2422] leading-snug mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#1c3b2b] mb-2.5">
                  {card.subtitle}
                </p>
                <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {syllabusItems.map((item, idx) => (
            <AccordionItem
              key={idx}
              item={item}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

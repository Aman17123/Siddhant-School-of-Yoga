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
    title: "Kundalini Asana & Alignment",
    subtitle: "Asana · Alignment · Adjustment",
    image: "/images/pranayama-practice-by-ganga-river.jpg",
    alt: "Kundalini asana and pranayama practice by the Ganges in Rishikesh",
    text: "About 30 postures, each mapped to a chakra and practice level, with daily alignment and adjustment guidance to prepare the body for energy work.",
  },
  {
    title: "Pranayama & Purification",
    subtitle: "Pranayama · Shat Karma · Mudra",
    image: "/images/alternate-nostril-breathing-pranayama.png",
    alt: "Alternate nostril breathing pranayama and purification practice in Rishikesh",
    text: "Kundalini-specific breathwork, traditional Shat Karma cleansing and hand mudras to open and clear the subtle energy channels.",
  },
  {
    title: "Meditation & Inner Practice",
    subtitle: "Meditation · Yoga Nidra · Mantra · Gratitude",
    image: "/images/yoga-philosophy-satsang-class.png",
    alt: "Kundalini meditation and mantra chanting in a philosophy satsang class at Siddhant School of Yoga",
    text: "Chakra meditation, Yoga Nidra, sacred mantra chanting and a daily gratitude practice to calm the mind and awaken inner awareness.",
  },
  {
    title: "Anatomy, Physiology & Philosophy",
    subtitle: "Biomechanics · Body Systems · Kundalini Philosophy",
    image: "/images/lord-shiva-statue-rishikesh.jpg",
    alt: "Lord Shiva statue setting for the Kundalini philosophy class at Siddhant School of Yoga",
    text: "Understand the body's biomechanics and systems alongside the classical philosophy of chakras and Kundalini energy.",
  },
];

const syllabusItems = [
  {
    q: "1. Kundalini Asana",
    a: (
      <SylGroup
        label="About 30 postures, mapped to chakra and level"
        text="Surya Namaskar, Tadasana, Trikonasana, Bhujangasana, Ushtrasana, Sarvangasana, Halasana, Matsyasana, Garudasana, Natarajasana and more — practiced from beginner through advanced level, each linked to the chakra it activates."
      />
    ),
  },
  {
    q: "2. Alignment & Adjustment for Kundalini",
    a: (
      <SylList
        items={[
          "The importance of alignment and adjustment",
          "What is alignment?",
          "What is adjustment?",
          "Safe hands-on correction during chakra-focused postures",
        ]}
      />
    ),
  },
  {
    q: "3. Kundalini Pranayama",
    a: (
      <SylList
        items={[
          "Introduction to yogic breathing",
          "Abdominal, thoracic & yogic inhalation",
          "Nadi Shodhana (alternate nostril breathing)",
          "Kapalbhati",
          "Bhastrika",
          "Ujjayi Pranayama",
          "Bhramari Pranayama",
          "Surya Bhedi & Chandra Bhedi Pranayama",
        ]}
      />
    ),
  },
  {
    q: "4. Shat Karma (Yogic Purification)",
    a: (
      <SylList
        items={[
          "Introduction to yogic purification (Shatkarma)",
          "Importance of yogic purification",
          "Jalaneti",
          "Kapalbhati",
          "Trataka",
          "Kunjal Kriya",
        ]}
      />
    ),
  },
  {
    q: "5. Mudra for Kundalini",
    a: (
      <SylList
        items={[
          "What is Mudra & its implementation",
          "Jnana Mudra",
          "Chin Mudra",
          "Shambhavi Mudra",
          "Bhairav & Bhairavi Mudra",
          "Nashikagra Mudra",
        ]}
      />
    ),
  },
  {
    q: "6. Relaxation",
    a: (
      <SylGroup
        label="Deep relaxation techniques"
        text="Structured relaxation practices woven between sessions to help the nervous system integrate the energetic work of each day."
      />
    ),
  },
  {
    q: "7. Kundalini Meditation",
    a: (
      <SylGroup
        label="Chakra-focused meditation"
        text="Guided meditations that bring attention to each of the seven main chakras, building the awareness needed before energy can safely rise."
      />
    ),
  },
  {
    q: "8. Yoga Nidra",
    a: (
      <SylGroup
        label="Yogic sleep"
        text="A deeply restorative lying-down meditation that relaxes body and mind while keeping awareness alert — used here to support chakra and energy work."
      />
    ),
  },
  {
    q: "9. Gratitude Practice (Kundalini Affirmation)",
    a: (
      <SylGroup
        label="Daily affirmation practice"
        text="A dedicated gratitude and affirmation session for peace, happiness and positive results, supporting steady inner transformation."
      />
    ),
  },
  {
    q: "10. Mantra Chanting",
    a: (
      <SylList
        items={[
          "Om chanting",
          "Ganesh Mantra",
          "Gayatri Mantra",
          "Seed (Bija) mantras for the seven chakras",
        ]}
      />
    ),
  },
  {
    q: "11. Biomechanics",
    a: (
      <SylGroup
        label="Movement science"
        text="How joints, bones and muscles work together, so every posture is practiced and adjusted safely."
      />
    ),
  },
  {
    q: "12. Anatomy",
    a: (
      <SylGroup
        label="Structural anatomy"
        text="A working knowledge of the body's structure to support safe, informed teaching of Kundalini asana."
      />
    ),
  },
  {
    q: "13. Physiology",
    a: (
      <SylGroup
        label="Body systems"
        text="How the digestive, respiratory, nervous and endocrine systems respond to asana, pranayama and energy practice."
      />
    ),
  },
  {
    q: "14. Kundalini Yoga Philosophy",
    a: (
      <SylGroup
        label="Chakra science & the four-step method"
        text="The classical understanding of the 114 chakras, the seven main chakras and their qualities, and the traditional four-step path — discover, awaken, balance, and finally awaken Kundalini itself."
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
            What the 100-Hour Kundalini Curriculum Covers
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

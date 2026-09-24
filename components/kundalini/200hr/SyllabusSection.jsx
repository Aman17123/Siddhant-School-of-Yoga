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
    title: "Kundalini Asana & Vinyasa",
    subtitle: "Asana · Ashtanga Vinyasa · Alignment · Adjustment",
    image: "/images/yoga-and-meditation-retreat-riverside.jpg",
    alt: "Kundalini asana practice during a riverside yoga and meditation retreat in Rishikesh",
    text: "Around 70 postures mapped to the seven chakras, plus the Ashtanga Vinyasa primary series, with daily alignment and adjustment guidance to prepare the body for energy work.",
  },
  {
    title: "Pranayama & Purification",
    subtitle: "Pranayama · Shat Karma · Bandha · Mudra",
    image: "/images/pranayama-theory-class-siddhant-school-of-yoga.png",
    alt: "Kundalini pranayama theory and purification practice at Siddhant School of Yoga",
    text: "Kundalini-specific breathwork, the four classical bandhas, traditional Shat Karma cleansing and hand mudras to open and clear the subtle energy channels.",
  },
  {
    title: "Meditation & Inner Practice",
    subtitle: "Meditation · Yoga Nidra · Mantra · Gratitude",
    image: "/images/meditation-class-indoor.jpg",
    alt: "Kundalini meditation and mantra chanting practice in an indoor meditation class",
    text: "Chakra meditation, Yoga Nidra, mantra chanting mapped to each chakra and a daily gratitude practice to calm the mind and deepen inner awareness.",
  },
  {
    title: "Ayurveda & Teaching Skills",
    subtitle: "Anatomy · Philosophy · Ayurveda · Teaching Methodology",
    image: "/images/trayambakeshwar-temple-rishikesh-view.jpg",
    alt: "Trayambakeshwar Temple view near the Kundalini teaching methodology class at Siddhant School of Yoga",
    text: "Anatomy, physiology and Kundalini philosophy alongside basic Ayurveda, teaching methodology and supervised practicum — everything you need to teach with confidence.",
  },
];

const syllabusItems = [
  {
    q: "1. Kundalini Asana",
    a: (
      <SylGroup
        label="Joint-movement series, Surya Namaskar and chakra-mapped postures"
        text="A structured joint-and-movement warm-up, Surya Namaskar, and roughly 70 postures practiced from beginner through advanced level, each linked to the chakra it activates."
      />
    ),
  },
  {
    q: "2. Ashtanga Vinyasa (Primary Series)",
    a: (
      <SylGroup
        label="A dynamic, breath-linked practice"
        text="The Ashtanga Vinyasa primary series, practiced daily to build strength, stamina and a steady breath-to-movement rhythm alongside your chakra work."
      />
    ),
  },
  {
    q: "3. Alignment & Adjustment",
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
    q: "4. Kundalini Pranayama",
    a: (
      <SylList
        items={[
          "Introduction to yogic breathing",
          "Abdominal, thoracic & yogic inhalation",
          "Ujjayi Pranayama",
          "Sheetali Pranayama",
          "Nadi Shodhana (alternate nostril breathing)",
          "Kapalbhati",
          "Bhastrika",
          "Bhramari Pranayama",
          "Surya Bhedi & Chandra Bhedi Pranayama",
        ]}
      />
    ),
  },
  {
    q: "5. Bandha (Yogic Locks)",
    a: (
      <SylList
        items={[
          "Mula Bandha",
          "Uddiyana Bandha",
          "Jalandhara Bandha",
          "Maha Bandha",
        ]}
      />
    ),
  },
  {
    q: "6. Mudra (Yogic Gestures)",
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
    q: "7. Shatkarma (Yogic Purification)",
    a: (
      <SylList
        items={[
          "Introduction to yogic purification (Shatkarma)",
          "Importance of yogic purification",
          "Sutra Neti",
          "Jalaneti",
          "Agnisar Kriya",
          "Kapalbhati",
          "Trataka",
          "Kunjal Kriya",
        ]}
      />
    ),
  },
  {
    q: "8. Relaxation Techniques",
    a: (
      <SylGroup
        label="Deep relaxation techniques"
        text="Structured relaxation practices woven between sessions to help the nervous system integrate the energetic work of each day."
      />
    ),
  },
  {
    q: "9. Kundalini Meditation",
    a: (
      <SylGroup
        label="Discover, awaken and balance the chakras"
        text="Guided meditations that walk you through discovering, then awakening each of the seven main chakras — the two steps of the Kundalini method this course is built around."
      />
    ),
  },
  {
    q: "10. Yoga Nidra",
    a: (
      <SylGroup
        label="Yogic sleep"
        text="A deeply restorative lying-down meditation that relaxes body and mind while keeping awareness alert — used here to support chakra and energy work."
      />
    ),
  },
  {
    q: "11. Gratitude Practice",
    a: (
      <SylGroup
        label="Daily affirmation practice"
        text="A dedicated gratitude and affirmation session for peace, happiness and positive results, supporting steady inner transformation."
      />
    ),
  },
  {
    q: "12. Mantra Chanting",
    a: (
      <SylList
        items={[
          "Ganesha Mantra",
          "Vishnu Mantra",
          "Rama Mantra",
          "Narayana Mantra",
          "Shiva Mantra",
          "Gayatri Mantra",
          "One seed mantra for each of the seven chakras",
        ]}
      />
    ),
  },
  {
    q: "13. Biomechanics & Anatomy",
    a: (
      <SylGroup
        label="Movement science and structure"
        text="How joints, bones and muscles work together, giving you a working knowledge of the body's structure to support safe, informed teaching of Kundalini asana."
      />
    ),
  },
  {
    q: "14. Physiology",
    a: (
      <SylGroup
        label="Body systems"
        text="How the digestive, respiratory, nervous and endocrine systems respond to asana, pranayama and energy practice."
      />
    ),
  },
  {
    q: "15. Kundalini Philosophy",
    a: (
      <SylGroup
        label="The Nadis, the seven chakras, and their qualities"
        text="The classical understanding of the Nadis and the seven main chakras — their colors, elements, glands and gemstones — building the theoretical depth behind every practice on the mat."
      />
    ),
  },
  {
    q: "16. Ethics",
    a: (
      <SylGroup
        label="A teacher's code of conduct"
        text="The ethical foundations of teaching yoga responsibly — honesty, boundaries and respect for every student who comes to you for guidance."
      />
    ),
  },
  {
    q: "17. Professional Development",
    a: (
      <SylGroup
        label="Building a teaching career"
        text="Practical guidance on presenting yourself as a teacher, structuring classes and growing a sustainable Kundalini teaching practice."
      />
    ),
  },
  {
    q: "18. Basic Ayurveda",
    a: (
      <SylGroup
        label="An introduction to Ayurvedic principles"
        text="The foundations of Ayurveda — doshas, diet and daily rhythm — and how they support a Kundalini practitioner's health and energy."
      />
    ),
  },
  {
    q: "19. Teaching Methodology",
    a: (
      <SylGroup
        label="How to teach, not just practice"
        text="Class sequencing, cueing, demonstration and voice — the practical skills that turn a strong personal practice into confident teaching."
      />
    ),
  },
  {
    q: "20. Practicum (Teaching Practice)",
    a: (
      <SylGroup
        label="Supervised teaching practice"
        text="Hands-on teaching practice in front of your batch, with direct feedback from Acharya Siddhant and senior faculty."
      />
    ),
  },
  {
    q: "21. Certification & Registration",
    a: (
      <SylGroup
        label="Yoga Alliance USA RYS-200 registration"
        text="On successful completion, receive your Yoga Alliance USA RYS-200 certificate and guidance on registering as a Registered Yoga Teacher (RYT)."
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

export default function Kundalini200HourSyllabusSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Course Syllabus</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            What the 200-Hour Kundalini Curriculum Covers
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

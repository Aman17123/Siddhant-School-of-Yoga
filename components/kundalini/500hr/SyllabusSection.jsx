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
    title: "Foundation to Advanced Asana",
    subtitle: "Kundalini Asana · Ashtanga Vinyasa · Alignment",
    image: "/images/plank-pose-group-yoga-session-rishikesh.jpg",
    alt: "Foundation to advanced Kundalini asana practice in a group session in Rishikesh",
    text: "From chakra-mapped foundational postures through advanced Ashtanga sequences, alignment and hands-on adjustment across the full 500-hour journey.",
  },
  {
    title: "Pranayama & Purification",
    subtitle: "Pranayama · Bandha · Mudra · Shatkarma",
    image: "/images/gyan-mudra-meditation-kunjapuri-hilltop-rishikesh.jpg",
    alt: "Kundalini pranayama, bandha and mudra practice at Kunjapuri hilltop near Rishikesh",
    text: "Classical breathwork progressing into advanced Sushumna breathing, refined bandha and mudra, and traditional Shatkarma cleansing practices.",
  },
  {
    title: "Meditation & Inner Practice",
    subtitle: "Chakra & Kundalini Meditation · Yoga Nidra · Mantra",
    image: "/images/meditation-class-garden-ganga-view-rishikesh.jpg",
    alt: "Kundalini meditation and mantra chanting practice with a garden Ganga view in Rishikesh",
    text: "The complete four-step meditation path — discover, awaken, balance and finally awaken Kundalini — supported by Yoga Nidra and advanced mantra sadhana.",
  },
  {
    title: "Philosophy, Anatomy & Teaching",
    subtitle: "Kundalini Philosophy · Anatomy · Practicum · RYT-500",
    image: "/images/gomukhasana-cow-face-pose-students-rishikesh.jpg",
    alt: "Kundalini philosophy and anatomy class with students at Siddhant School of Yoga",
    text: "From chakra science through Tantra, Samadhi and the dangers of uncontrolled Kundalini, paired with anatomy, teaching methodology and your RYT-500 practicum.",
  },
];

const syllabusPartOne = [
  {
    q: "1. Kundalini Asana",
    a: (
      <SylGroup
        label="Joint-movement series, Surya Namaskar, chakra-mapped postures"
        text="A structured joint-movement series and Surya Namaskar lead into around 30 postures, each linked to one of the 7 chakras and practiced from beginner through advanced level to prepare the body for energy work."
      />
    ),
  },
  {
    q: "2. Ashtanga Vinyasa (Primary Series)",
    a: (
      <SylGroup
        label="Building strength and breath-linked flow"
        text="An introduction to the Ashtanga Vinyasa Primary Series, building the strength, stamina and breath-to-movement coordination that support deeper chakra and Kundalini work later in the course."
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
          "Kapalbhati & Bhastrika",
        ]}
      />
    ),
  },
  {
    q: "5. Bandha (Mula, Uddiyana, Jalandhara, Maha)",
    a: (
      <SylList
        items={[
          "Mula Bandha (root lock)",
          "Uddiyana Bandha (abdominal lock)",
          "Jalandhara Bandha (throat lock)",
          "Maha Bandha (the great lock, combining all three)",
        ]}
      />
    ),
  },
  {
    q: "6. Mudra (Yogic Gestures)",
    a: (
      <SylList
        items={[
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
    q: "7. Shatkarma (Including Sutra Neti & Agnisar)",
    a: (
      <SylList
        items={[
          "Introduction to yogic purification (Shatkarma)",
          "Importance of yogic purification",
          "Jalaneti & Sutra Neti",
          "Kapalbhati",
          "Agnisar Kriya",
          "Trataka & Kunjal Kriya",
        ]}
      />
    ),
  },
  {
    q: "8. Relaxation Techniques",
    a: (
      <SylGroup
        label="Structured integration"
        text="Guided relaxation practices woven between sessions to help the nervous system integrate the energetic work of each day."
      />
    ),
  },
  {
    q: "9. Kundalini Meditation (Discover, Awaken, Balance)",
    a: (
      <SylGroup
        label="Steps 1 & 2 of the four-step method"
        text="Guided meditations that build awareness of each of the seven main chakras, then begin the work of awakening them — the foundation the second half of this course builds on."
      />
    ),
  },
  {
    q: "10. Yoga Nidra",
    a: (
      <SylGroup
        label="Yogic sleep"
        text="A deeply restorative lying-down meditation that relaxes body and mind while keeping awareness alert, used here to support chakra and energy work."
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
          "Gayatri Mantra, one seed mantra per chakra",
        ]}
      />
    ),
  },
  {
    q: "13. Biomechanics & Anatomy",
    a: (
      <SylGroup
        label="Movement science and structure"
        text="How joints, bones and muscles work together, giving a working knowledge of the body's structure to support safe, informed teaching of Kundalini asana."
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
        label="Nadis & the seven chakras"
        text="The classical understanding of the Nadis and the seven main chakras, including their colors, elements, glands and gemstones — the theoretical foundation for everything practiced on the mat."
      />
    ),
  },
  {
    q: "16. Ethics",
    a: (
      <SylGroup
        label="Yogic ethical foundations"
        text="The Yamas and Niyamas and a teacher's ethical responsibility toward students, especially when working with sensitive energetic practices."
      />
    ),
  },
  {
    q: "17. Professional Development",
    a: (
      <SylGroup
        label="Building a teaching career"
        text="Practical guidance on presenting yourself as a Kundalini teacher, from class planning to building genuine trust with students."
      />
    ),
  },
  {
    q: "18. Basic Ayurveda",
    a: (
      <SylGroup
        label="The three doshas"
        text="An introduction to Vata, Pitta and Kapha, and how basic Ayurvedic understanding supports a well-rounded yogic lifestyle."
      />
    ),
  },
  {
    q: "19. Teaching Methodology",
    a: (
      <SylGroup
        label="How to teach Kundalini safely"
        text="Sequencing, cueing, class structure and safe pacing for guiding students through chakra-focused asana, pranayama and meditation."
      />
    ),
  },
  {
    q: "20. Practicum (Teaching Practice)",
    a: (
      <SylGroup
        label="Supervised teaching practice"
        text="Structured opportunities to teach fellow trainees under supervision, with direct feedback from senior faculty."
      />
    ),
  },
  {
    q: "21. Certification & Registration",
    a: (
      <SylGroup
        label="Completing Part 1"
        text="Requirements for completing this portion of the course and how it feeds directly into the advanced training and final RYT-500 registration."
      />
    ),
  },
];

const syllabusPartTwo = [
  {
    q: "1. Advanced Kundalini Asana",
    a: (
      <SylGroup
        label="Kapotasana, Gandha Bherundasana, Astavakrasana and more"
        text="Advanced postures mapped to deeper chakra and energy work, practiced with careful attention to alignment as the nervous system's capacity grows."
      />
    ),
  },
  {
    q: "2. Full Ashtanga Vinyasa Primary Series",
    a: (
      <SylGroup
        label="Complete sequence practice"
        text="The complete Ashtanga Vinyasa Primary Series, practiced with refined breath-to-movement coordination built over Part 1."
      />
    ),
  },
  {
    q: "3. Advanced Alignment & Adjustment",
    a: (
      <SylList
        items={[
          "Refining alignment in advanced postures",
          "Hands-on adjustment for deeper backbends and binds",
          "Reading the body's readiness for advanced work",
          "Safe modification for individual limitations",
        ]}
      />
    ),
  },
  {
    q: "4. Advanced Nadi Shodhana & Sushumna Breathing",
    a: (
      <SylGroup
        label="Refined channel-clearing breathwork"
        text="Advanced alternate-nostril techniques and breathing practices aimed at opening the central Sushumna Nadi, in preparation for the ascent of Kundalini energy."
      />
    ),
  },
  {
    q: "5. Advanced Bandha — Refined Application",
    a: (
      <SylGroup
        label="Precision and timing"
        text="Deeper, more precise application of Mula, Uddiyana, Jalandhara and Maha Bandha, timed with breath and asana to support the safe rise of Shakti energy."
      />
    ),
  },
  {
    q: "6. Advanced Mudra (Shambhavi, Prana, Apana, Bhoochari)",
    a: (
      <SylList
        items={[
          "Shambhavi Mudra (advanced application)",
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
        label="Deeper purification practices"
        text="Building on the Shatkarma introduced in Part 1, with a deeper, more disciplined application supporting the advanced pranayama and meditation work."
      />
    ),
  },
  {
    q: "8. Deep Relaxation Techniques",
    a: (
      <SylGroup
        label="Nervous system integration"
        text="Extended relaxation practices to help the body and mind absorb the intensity of advanced energy work between sessions."
      />
    ),
  },
  {
    q: "9. Kundalini Meditation — Balancing the Chakras",
    a: (
      <SylGroup
        label="Step 3 of the four-step method"
        text="Daily supervised meditation focused on balancing the seven chakras, the essential bridge between awakening the chakras and awakening Kundalini itself."
      />
    ),
  },
  {
    q: "10. Yoga Nidra",
    a: (
      <SylGroup
        label="Yogic sleep, advanced application"
        text="Continued Yoga Nidra practice, now woven more closely with chakra balancing and preparation for deeper meditative states."
      />
    ),
  },
  {
    q: "11. Gratitude Practice",
    a: (
      <SylGroup
        label="Sustaining the daily affirmation practice"
        text="The gratitude and affirmation practice continues through the advanced training, keeping the mind steady as the energetic work intensifies."
      />
    ),
  },
  {
    q: "12. Advanced Mantra Sadhana",
    a: (
      <SylList
        items={[
          "Om Prithivyai Mantra",
          "Om Varunaya Mantra",
          "Om Suryaya Mantra",
          "Hare Krishna Mahamantra",
          "Om Aim Saraswatyai Mantra",
          "Om Gurave Mantra",
        ]}
      />
    ),
  },
  {
    q: "13. Biomechanics & Anatomy (Advanced)",
    a: (
      <SylGroup
        label="Deeper structural study"
        text="A more advanced study of biomechanics and anatomy, focused on the demands of advanced asana and long-term teaching safety."
      />
    ),
  },
  {
    q: "14. Physiology (Advanced)",
    a: (
      <SylGroup
        label="The nervous and endocrine systems in depth"
        text="A closer look at how the nervous and endocrine systems respond to sustained pranayama, bandha and meditation practice."
      />
    ),
  },
  {
    q: "15. Kundalini Philosophy (Advanced)",
    a: (
      <SylGroup
        label="Chakra balancing, Kundalini awakening & Samadhi"
        text="Chakra balancing, the awakening of Kundalini, the types of prana, Tantra, the role of the guru, the dangers of uncontrolled Kundalini, and the classical understanding of Samadhi."
      />
    ),
  },
  {
    q: "16. Ethics",
    a: (
      <SylGroup
        label="Ethics for advanced energy work"
        text="A deeper look at a teacher's ethical responsibility when guiding students through Kundalini awakening, where care and discernment matter most."
      />
    ),
  },
  {
    q: "17. Professional Development",
    a: (
      <SylGroup
        label="Teaching at an advanced level"
        text="Guidance on presenting yourself as a Kundalini teacher qualified to guide students through the complete four-step path, not only its foundation."
      />
    ),
  },
  {
    q: "18. Ayurveda (Advanced)",
    a: (
      <SylGroup
        label="Applying the doshas to energy work"
        text="A deeper application of Ayurvedic understanding to lifestyle, diet and the pace of practice during intensive energy work."
      />
    ),
  },
  {
    q: "19. Advanced Teaching Methodology",
    a: (
      <SylGroup
        label="Sequencing the full four-step path"
        text="How to safely sequence and pace a class or course that guides students through discovering, awakening, balancing and finally awakening Kundalini."
      />
    ),
  },
  {
    q: "20. Practicum (Teaching Practice)",
    a: (
      <SylGroup
        label="Supervised advanced teaching practice"
        text="Extended, closely supervised teaching practice covering both foundational and advanced material, with detailed feedback from senior faculty."
      />
    ),
  },
  {
    q: "21. Certification & Registration (Path to RYT-500)",
    a: (
      <SylGroup
        label="Completing your Yoga Alliance RYT-500"
        text="Final requirements for graduation and the process of registering as a Yoga Alliance USA RYT-500 upon successful completion of both parts of the course."
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

function SyllabusPart({ number, label, items, openIndex, setOpenIndex }) {
  return (
    <div className="max-w-4xl mx-auto mb-8 last:mb-0">
      <div className="flex items-center gap-3 mb-4">
        <span className="shrink-0 w-9 h-9 rounded-full bg-[#1c3b2b] text-white flex items-center justify-center font-belleza text-sm">
          {number}
        </span>
        <h3 className="font-belleza text-xl sm:text-2xl text-[#1e2422] tracking-wide">
          {label}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <AccordionItem
            key={idx}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default function KundaliniFiveHundredHourSyllabusSection() {
  const [openPartOne, setOpenPartOne] = useState(null);
  const [openPartTwo, setOpenPartTwo] = useState(null);

  return (
    <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Course Syllabus</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            What the 500-Hour Master Kundalini Curriculum Covers
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            One continuous curriculum, in two parts — the complete 200-hour Kundalini foundation (Steps 1&ndash;2) followed directly by the complete 300-hour advanced Kundalini training (Steps 3&ndash;4).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 lg:mb-12">
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

        <SyllabusPart
          number="1"
          label="Part 1 — 200-Hour Kundalini (Steps 1–2)"
          items={syllabusPartOne}
          openIndex={openPartOne}
          setOpenIndex={setOpenPartOne}
        />

        <SyllabusPart
          number="2"
          label="Part 2 — 300-Hour Kundalini (Steps 3–4)"
          items={syllabusPartTwo}
          openIndex={openPartTwo}
          setOpenIndex={setOpenPartTwo}
        />
      </div>
    </section>
  );
}

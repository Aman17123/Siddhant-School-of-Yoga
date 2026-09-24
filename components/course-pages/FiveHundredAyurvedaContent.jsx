"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Minus,
  ChevronDown,
  Check,
  Play,
  Mail,
  MessageCircle,
  Quote,
  ArrowRight,
  BookOpen,
  Users,
  ShieldCheck,
  Award,
  Calendar,
  Sprout,
  Home,
  Compass,
} from "lucide-react";
import { Kicker, HeadingDivider, ButtonLink } from "@/components/ui";
import { whatsappLink, founder, site } from "@/data/siteData";
import SectionNav from "./SectionNav";
import Teachers from "@/components/home/Teachers";
import ResidentialExperience from "@/components/home/ResidentialExperience";
import ShortsSection from "@/components/home/ShortsSection";
import VideoSection from "@/components/home/VideoSection";

const sectionNavItems = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "dates-fees", label: "Dates & Fees" },
  { id: "schedule", label: "Daily Schedule" },
  { id: "whats-include", label: "What's Include" },
  { id: "teachers", label: "Teachers" },
  { id: "faq", label: "FAQ" },
];

/* ---------------------------------------------------------------- */
/* Shared small building blocks                                     */
/* ---------------------------------------------------------------- */

function SectionHead({ kicker, title, description }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
      <Kicker>{kicker}</Kicker>
      <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
        {title}
      </h2>
      <HeadingDivider />
      {description && (
        <p className="text-sm sm:text-base font-figtree font-medium text-stone-700 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-[#1c3b2b] bg-[#fdfbf7] shadow-md"
          : "border-[#e3dac9] bg-white/95 hover:border-[#1c3b2b] shadow-2xs"
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
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-[15px] text-[#55564c] font-figtree leading-relaxed border-t border-[#1c3b2b]/10">
            {typeof item.a === "string" ? <p>{item.a}</p> : item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

function Accordion({ items, defaultOpen = 0, className = "max-w-4xl mx-auto", initialCount, columns = 1 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);
  const hasMore = initialCount && items.length > initialCount;
  const visibleItems = hasMore ? items.slice(0, initialCount) : items;
  const restItems = hasMore ? items.slice(initialCount) : [];
  const gridCols = columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1";

  return (
    <div className={className}>
      <div className={`grid ${gridCols} gap-4`}>
        {visibleItems.map((item, idx) => (
          <AccordionItem
            key={idx}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>

      {hasMore && (
        <>
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              showAll ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className={`grid ${gridCols} gap-4`}>
                {restItems.map((item, idx) => {
                  const realIdx = initialCount + idx;
                  return (
                    <AccordionItem
                      key={realIdx}
                      item={item}
                      isOpen={openIndex === realIdx}
                      onToggle={() => setOpenIndex(openIndex === realIdx ? null : realIdx)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#1c3b2b] text-[#1c3b2b] hover:bg-[#1c3b2b] hover:text-white text-sm font-semibold font-figtree transition-all duration-300 cursor-pointer"
            >
              <span>{showAll ? "Read Less" : `Read More (${restItems.length} more)`}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

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

/* ---------------------------------------------------------------- */
/* Data                                                              */
/* ---------------------------------------------------------------- */

const trustStats = [
  { icon: Calendar, value: "56", label: "Days Residential Program" },
  { icon: BookOpen, value: "20+", label: "Subjects Covered" },
  { icon: Users, value: "10–15", label: "Small Batch Size" },
  { icon: ShieldCheck, value: "100", label: "Days Post-Course Support" },
];

const whyChooseUsPoints = [
  {
    title: "Master-Level Certification",
    text: "Combines the 200-Hour foundation and 300-Hour advanced training, preparing you to register as RYT-500 with Yoga Alliance USA and teach worldwide.",
  },
  {
    title: "In-Depth Yoga and Ayurveda",
    text: "A complete curriculum from foundation to advanced level — Hatha, Ashtanga Vinyasa, pranayama, bandha, mudra, mantra, meditation, anatomy, Yoga Nidra, Ayurveda and philosophy — ending with real teaching practice.",
  },
  {
    title: "A Genuinely Holistic Approach",
    text: "Ayurvedic diet, daily lifestyle routines and cleansing practices are woven into the training, so you leave with a full mind-body understanding of wellness.",
  },
  {
    title: "Learn in the Yoga Capital",
    text: "Study by the Ganga in Rishikesh, the birthplace of yoga, deepening your learning and spiritual connection in the environment these sciences come from.",
  },
  {
    title: "Personal Attention, Gurukul Style",
    text: "Experienced gurus and therapists guide you personally, in the traditional teacher-to-student style rather than group-only instruction.",
  },
  {
    title: "Unique Practices",
    text: "Mantra science and Kundalini / chakra meditation raise energy and clear the nadis, giving you tools most 500-hour courses never touch.",
  },
  {
    title: "Measurable Growth",
    text: "Clear signs and parameters help you track your physical health, mental balance and understanding as the course progresses.",
  },
  {
    title: "Small Batches",
    text: "We keep every batch to just 10–15 students, so you get hands-on correction and direct, personal feedback throughout.",
  },
  {
    title: "Hatha and Ashtanga, Together",
    text: "Stability and strength from Hatha, stamina and rhythm from Ashtanga Vinyasa — a complete asana foundation for teaching any style.",
  },
  {
    title: "The Science of Sound",
    text: "Correct pronunciation and meaning of traditional mantras. From an Ayurvedic view, chanting calms the nervous system and helps balance the doshas.",
  },
  {
    title: "A Family Environment",
    text: "A small, caring community of students and teachers, with nutritious Ayurvedic food that supports your practice rather than working against it.",
  },
  {
    title: "More Than a Certificate",
    text: "This course helps redesign the subconscious mind, find purpose, and develop commitment, compassion and true knowledge — not just a diploma to frame.",
  },
];

const whoShouldJoin = [
  {
    icon: Award,
    title: "Aspiring RYT-500 Teachers",
    text: "Practitioners who want to become yoga teachers with an added Ayurvedic specialization, earning the complete master-level Yoga Alliance credential in one program.",
    image: "/images/plank-pose-with-yoga-blocks.jpg",
    alt: "Aspiring yoga teacher practicing plank pose with blocks in Rishikesh",
  },
  {
    icon: Sprout,
    title: "Wellness Professionals",
    text: "Therapists, nutritionists and wellness practitioners who want to combine yoga and Ayurveda into one coherent, holistic practice they can teach and share.",
    image: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg",
    alt: "Ayurvedic meal preparation for wellness training in Rishikesh",
  },
  {
    icon: Compass,
    title: "Holistic Seekers",
    text: "Anyone drawn to a fully holistic 8-week transformation of body, mind and lifestyle — not asana alone, but the complete yogic and Ayurvedic way of living.",
    image: "/images/side-angle-pose-riverside-class.jpg",
    alt: "Holistic seeker practicing side angle pose by the riverside in Rishikesh",
  },
  {
    icon: Home,
    title: "200-Hour Graduates Going Deeper",
    text: "Certified teachers who already hold a 200-hour credential and want to advance to RYT-500 while adding genuine Ayurvedic knowledge to their teaching.",
    image: "/images/low-lunge-outdoor-yoga-session-retreat-rishikesh.jpg",
    alt: "Experienced yoga teacher deepening practice by the Ganges in Rishikesh",
  },
];

const dailySchedule = [
  { icon: "⏰", time: "5:30 AM", activity: "Wake Up" },
  { icon: "☕", time: "6:00 – 6:15 AM", activity: "Herbal Tea at Dining Hall" },
  { icon: "💧", time: "6:15 – 6:30 AM", activity: "Daily Yogic Purification" },
  { icon: "🕉️", time: "6:30 – 7:00 AM", activity: "Daily Tratak / Daily OM Chanting / Daily Ganesh and Gayatri Mantra Chanting / Prayer at Yoga Hall" },
  { icon: "🌬️", time: "7:00 – 8:00 AM", activity: "Pranayama / Yogic Purification / Bandha / Mudra" },
  { icon: "🧘", time: "8:15 – 9:45 AM", activity: "Hatha Yoga / Alignment and Adjustment" },
  { icon: "🥣", time: "9:45 – 10:30 AM", activity: "Breakfast and Karma Yoga" },
  { icon: "🙏", time: "10:30 – 11:30 AM", activity: "Special Course of Gratitude for Peace, Happiness and All Positive Results" },
  { icon: "🌿", time: "11:30 AM – 12:30 PM", activity: "Ayurveda Class — Doshas, Diet & Daily Routine (Dinacharya)" },
  { icon: "🥗", time: "1:00 – 2:30 PM", activity: "Lunch and Rest" },
  { icon: "😴", time: "2:30 – 3:30 PM", activity: "Anatomy and Physiology / Yoga Nidra / Relaxation" },
  { icon: "📜", time: "3:30 – 4:30 PM", activity: "Philosophy with Siddhant to Discover Yoga / Patanjali / Chakra / Kundalini / Samadhi" },
  { icon: "🫖", time: "4:30 – 4:45 PM", activity: "Tea Time and Snacks" },
  { icon: "🧘‍♀️", time: "4:45 – 5:45 PM", activity: "Meditation / Chakra and Kundalini Yoga" },
  { icon: "🔥", time: "5:45 – 7:15 PM", activity: "Ashtanga Vinyasa / Alignment and Adjustment" },
  { icon: "🍛", time: "7:15 – 8:00 PM", activity: "Dinner" },
  { icon: "🌙", time: "10:00 PM", activity: "Lights Off" },
];

const syllabusPartOne = [
  {
    q: "1. Hatha Yoga",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Beginner postures"
          text="Prarambhik Sthiti, Padanguli Naman, Goolf Naman, Goolf Chakra, Goolf Ghooran, Janu Naman, Janu Chakra, Mustika Bandhana, Manibandha Naman, Manibandha Chakra, Kehuni Naman, Kehuni Chakra, Skandha Chakra, Greeva Sanchalana, Rajju Karshan Asana, Chakki Chalanasana, Nauka Sanchalanasana, Kauva Chalasana, Marjari Asana, Ardha Titali Asana, Poorna Titali Asana, Shroni Chakra, Butterfly Pose, Namaskarasana, Vayu Nishkasana, Supta Vajrasana."
        />
        <SylGroup
          label="Intermediate postures"
          text="Kashtha Takshan Asana, Gatyatmak Meru Vakrasana, Vyaghrasana, Surya Namaskara, Moon Salutation, Sun Salutation variations, Paschimottanasana, Janu Sirsasana, Ushtrasana, Sarpasana, Dhanurasana, Setu Bandhasana, Supta Udarkarshanasana, Shava Udarkarshanasana, Tiryak Bhujangasana, Udarkarshanasana, Trikonasana, Naukasana, Navasana, Salabhasana."
        />
        <SylGroup
          label="Advanced postures"
          text="Hanumanasana, Kurmasana, Chakrasana, Garudasana, Bakasana, Sirsasana, Vrischikasana, Mayurasana, Padotthanasana, Padachakrasana, Pada Sanchalanasana."
        />
        <SylGroup
          label="Meditative & seated postures"
          text="Vajrasana, Sukhasana, Ardha Padmasana, Padmasana, Siddhasana."
        />
      </div>
    ),
  },
  {
    q: "2. Ashtanga Vinyasa (Primary Series)",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Foundation"
          text="Surya Namaskar A & B, understanding vinyasa (the movement-breathing system), joint mechanics and modifications."
        />
        <SylGroup
          label="Standing postures"
          text="Padangusthasana, Padahastasana, Trikonasana, Parivrittatrikonasana, Parsvottonasana, Virabhadrasana I & II, Utthitaparsvakonasana, Parivrittaparsvakonasana, Prasaritapadottanasana, Utthita Hasta Padangusthasana, Ardhabaddha Padma Uttanasana, Utkatasana."
        />
        <SylGroup
          label="Seated series"
          text="Dandasana, Janu Sirsasana, Ardhabaddha Padma Paschimottanasana, Triangamukaikapada Paschimottanasana, Paschimottanasana, Purvottasana, Marichyasana, Paripurnanavasana, Bhujapidasana, Adhomukhavrksasana, Kurmasana, Kukkutasana, Garbhapindasana, Baddhakonasana, Upavistakonasana, Suptakonasana, Suptapadangustasana, Ubhayapadangustasana, Urdvhamukhapaschimottanasana, Setubandhasana, Urdvhadhanurasana, Suptakurmasana."
        />
        <SylGroup
          label="Finishing postures"
          text="Salamba Sarvangasana, Halasana, Karnapidasana, Urdvhapadmasana, Pindasana in Sarvangasana, Matsyasana, Uttanapadasana, Padmasana, Tolasana, Savasana."
        />
      </div>
    ),
  },
  {
    q: "3. Alignment & Adjustment",
    a: (
      <SylList
        items={[
          "Importance of proper alignment and adjustment",
          "Definition and principles of alignment",
          "Hands-on adjustment techniques",
          "Safety and modification protocols",
        ]}
      />
    ),
  },
  {
    q: "4. Pranayama (Breathing Techniques)",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Foundational concepts"
          text="The five Koshas (sheaths), the seven Chakras, Nadis (energy channels), definition and aspects of Pranayama, its importance and sequencing, and preparation techniques."
        />
        <div className="mt-2">
          <SylList
            items={[
              "Yogic inhalation (Abdominal, Thoracic)",
              "Inner and outer retention",
              "Udgeeth Pranayama",
              "Kapalbhati",
              "Surya Bhedi Pranayama",
              "Chandra Bhedi Pranayama",
              "Alternate breathing (Nadi-Shodhana)",
              "Bhastrika",
              "Bhramari Pranayama",
              "Ujjayi Pranayama",
              "Sheetali Pranayama",
              "Sheetkari Pranayama",
              "Rules, regulations & precautions",
              "Teaching methodology for Pranayama",
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    q: "5. Bandha (Yogic Locks)",
    a: (
      <SylList
        items={[
          "Definition and importance of Bandha",
          "Mula Bandha (root lock)",
          "Uddiyana Bandha (abdominal lock)",
          "Jalandhara Bandha (throat lock)",
          "Maha Bandha (great lock)",
        ]}
      />
    ),
  },
  {
    q: "6. Mudra (Yogic Gestures)",
    a: (
      <SylList
        items={[
          "Definition and implementation",
          "Jnana Mudra",
          "Chin Mudra",
          "Bhairav Mudra",
          "Bhairavi Mudra",
          "Nashikagra Mudra",
          "Ashwani Mudra",
        ]}
      />
    ),
  },
  {
    q: "7. Shatkarma (Yogic Purification)",
    a: (
      <SylList
        items={[
          "Introduction to yogic purification practices",
          "Importance and benefits",
          "Jal Neti (nasal cleansing)",
          "Kapalbhati (skull shining)",
          "Trataka (concentrated gazing)",
          "Kunjal Kriya (stomach cleansing)",
          "Sutra Neti / Rubber Neti (thread cleansing)",
        ]}
      />
    ),
  },
  {
    q: "8. Relaxation Techniques",
    a: (
      <SylList
        items={[
          "Understanding relaxation",
          "Muscular relaxation methods",
          "Deep breathing relaxation",
          "Tense-relax progression",
          "Partial body relaxation",
          "Full-body relaxation",
          "Mental relaxation practices",
        ]}
      />
    ),
  },
  {
    q: "9. Meditation (Dhyana)",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Theory"
          text="Definition of meditation, understanding meditation as a path, preparation and practice methods, and practical meditation aspects."
        />
        <div className="mt-2">
          <SylList
            items={[
              "OM meditation",
              "Active meditation",
              "Candle Tratak meditation",
              "Mirror Tratak meditation",
              "Anapana meditation (breath awareness)",
              "Vipassana meditation (insight)",
              "Inactive meditation",
              "Dance meditation",
              "Five senses meditation",
              "Spine awareness meditation",
              "Spinal breathing meditation",
              "Chakra meditation",
              "Chakra balancing meditation",
              "Mudra meditation",
              "Teaching methodology for meditation",
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    q: "10. Yoga Nidra (Yogic Sleep)",
    a: (
      <SylList
        items={[
          "Definition and importance",
          "Body awareness practices",
          "Finding sensation",
          "Identifying blind spots",
          "Yoga Nidra practice techniques",
        ]}
      />
    ),
  },
  {
    q: "11. Gratitude Practice",
    a: (
      <SylList
        items={[
          "Importance of gratitude",
          "Definition and philosophy",
          "Practical gratitude cultivation methods",
        ]}
      />
    ),
  },
  {
    q: "12. Mantra Chanting (Science of Sound)",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Concepts"
          text="Definition of Mantra, definition of Mantra chanting, its importance and benefits, types of mantras, and proper pronunciation."
        />
        <SylGroup
          label="Mantras taught"
          text="Ganesh Mantra, Guru Mantra, Gayatri Mantra, Mahamrityunjaya Mantra, Universal Prayer Mantra, Shanti (Peace) Mantra."
        />
      </div>
    ),
  },
  {
    q: "13. Biomechanics & Anatomy",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Skeletal system"
          text="Joint movements (flexion, extension, abduction, adduction), joint stabilization and mechanics in yoga practice, bone system and types, types of joints, effect of asana on the skeletal system."
        />
        <SylGroup
          label="Muscular system"
          text="Major muscle groups, muscle function and movement, and muscle strengthening through asana."
        />
      </div>
    ),
  },
  {
    q: "14. Physiology",
    a: (
      <SylList
        items={[
          "Digestive system and yoga",
          "Respiratory system mechanics",
          "Nervous system and its connection to pranayama & meditation",
        ]}
      />
    ),
  },
  {
    q: "15. Yoga Philosophy",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Fundamentals"
          text="Definition of philosophy, understanding problems and growth, the Panch Kosha (five sheaths) theory, kosha balancing, the nature of mind, and an introduction to Indian philosophy."
        />
        <p className="mt-2 mb-1">
          <span className="font-semibold text-[#1c3b2b]">Ashtanga Yoga — the Eight Limbs:</span>
        </p>
        <SylList
          items={[
            "Yama (ethical restraints)",
            "Niyama (observances)",
            "Asana (postures)",
            "Pranayama (breath control)",
            "Pratyahara (sense withdrawal)",
            "Dharana (concentration)",
            "Dhyana (meditation)",
            "Samadhi (liberation)",
          ]}
        />
        <p className="mt-2 text-stone-600">
          Includes the history of yoga traditions, different types of yoga, Raja Yoga, and Patanjali&apos;s Yoga Sutras.
        </p>
      </div>
    ),
  },
  {
    q: "16. Ethics",
    a: (
      <SylList
        items={[
          "Yoga and ethical teaching principles",
          "Yoga Alliance relationship and standards",
          "Personal, professional & spiritual growth connection",
          "Ethics of practice",
          "Ethics of teaching",
        ]}
      />
    ),
  },
  {
    q: "17. Professional Development",
    a: (
      <SylList
        items={[
          "Professional development definition",
          "Yoga and career advancement",
          "The RYT (Registered Yoga Teacher) pathway",
          "Yoga business and commercialization",
          "Continuing education options",
          "Marketing & promotion strategies",
        ]}
      />
    ),
  },
  {
    q: "18. Basic Ayurveda",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Fundamentals"
          text="Ayurveda's definition and principles, the yoga–Ayurveda relationship, and Ayurveda in practical life."
        />
        <SylGroup
          label="The three Doshas"
          text="Vata, Pitta and Kapha characteristics, body types & constitution, definitions of disease and health, and an introduction to basic herbs."
        />
      </div>
    ),
  },
  {
    q: "19. Teaching Methodology",
    a: (
      <SylList
        items={[
          "Class sequencing & pacing",
          "Environment creation",
          "Cueing & instruction",
          "Class management & preparation",
          "Positive, conscious communication",
          "Voice tone and modulation",
          "Demonstration techniques (passive & active)",
          "Offering and using props",
          "Individual student observation",
          "Hands-on adjustments",
        ]}
      />
    ),
  },
  {
    q: "20. Practicum (Teaching Practice)",
    a: (
      <SylList
        items={[
          "Practicum definition and importance",
          "Teaching practice protocols",
          "Supervised student-teaching sessions",
          "Feedback from master teachers",
          "Development of teaching confidence",
        ]}
      />
    ),
  },
  {
    q: "21. Certification & Registration",
    a: (
      <SylList
        items={[
          "Yoga Alliance registration process",
          "RYT (Registered Yoga Teacher) pathway",
          "E-RYT advanced registration",
          "RYS (Registered Yoga School) standards",
          "Certificate requirements and procedures",
        ]}
      />
    ),
  },
];

const syllabusPartTwo = [
  {
    q: "22. Advanced Alignment & Adjustment",
    a: (
      <SylList
        items={[
          "Arm balances (Bakasana, Astavakrasana and beyond)",
          "Deep backbends and safe backbend progressions",
          "Inversions (Sirsasana, Sarvangasana, Vrischikasana)",
          "Safe, confident hands-on adjustment techniques",
          "Modification and injury-prevention protocols",
        ]}
      />
    ),
  },
  {
    q: "23. Kundalini & Pranayama",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Advanced breathwork"
          text="Kumbhaka (breath retention), advanced Bandhas and Mudras, and traditional techniques used to awaken and channel Kundalini energy safely."
        />
        <SylGroup
          label="Practice"
          text="Daily supervised Kundalini and chakra-focused sessions building on the pranayama foundation from Part 1."
        />
      </div>
    ),
  },
  {
    q: "24. Scriptures & Philosophy",
    a: (
      <SylList
        items={[
          "Yoga Sutras of Patanjali — deeper study",
          "Bhagavad Gita — yogic teachings",
          "Hatha Yoga Pradipika",
          "Gheranda Samhita",
        ]}
      />
    ),
  },
  {
    q: "25. Advanced Anatomy & Biomechanics",
    a: (
      <SylList
        items={[
          "Injury prevention in advanced postures",
          "Joint mechanics under load",
          "Subtle and energetic anatomy (Nadis, Chakras)",
          "Applied biomechanics for teaching advanced students",
        ]}
      />
    ),
  },
  {
    q: "26. Teaching & Yoga Business",
    a: (
      <SylList
        items={[
          "Advanced class sequencing",
          "Running workshops and retreats",
          "Setting up and managing a yoga business or centre",
          "Marketing and student communication",
        ]}
      />
    ),
  },
];

const syllabusPartThree = [
  {
    q: "27. Introduction to Ayurveda & the Tridosha Theory",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Foundations"
          text="What Ayurveda is, its relationship to yoga as a sister science, and the Panchamahabhuta (five elements) that underlie all creation."
        />
        <SylGroup
          label="The three Doshas"
          text="Vata, Pitta and Kapha — their qualities, functions in the body and mind, and how imbalance leads to disease."
        />
      </div>
    ),
  },
  {
    q: "28. Ayurvedic Anatomy & Physiology",
    a: (
      <SylList
        items={[
          "Agni (digestive fire) and its role in health",
          "The seven Dhatus (bodily tissues)",
          "Mala (waste products) and healthy elimination",
          "Srotas (bodily channels) and how they relate to disease",
        ]}
      />
    ),
  },
  {
    q: "29. Personal Dosha Assessment (Prakriti & Vikriti)",
    a: (
      <SylList
        items={[
          "Determining your birth constitution (Prakriti)",
          "Identifying your current imbalance (Vikriti)",
          "One-on-one consultation with an Ayurveda teacher",
          "A practical starting point for your own dosha-balancing routine",
        ]}
      />
    ),
  },
  {
    q: "30. Ayurvedic Nutrition & Daily Routine (Dinacharya)",
    a: (
      <SylList
        items={[
          "Six tastes (Rasas) and dosha-balancing food choices",
          "Building a personalized, dosha-appropriate daily diet",
          "Dinacharya — the ideal daily routine from waking to sleep",
          "Mindful eating and proper food combinations",
        ]}
      />
    ),
  },
  {
    q: "31. Ritucharya — Seasonal Living",
    a: (
      <SylList
        items={[
          "How the doshas shift with the seasons",
          "Adjusting diet and lifestyle through the year",
          "Preventing seasonal imbalance before it starts",
        ]}
      />
    ),
  },
  {
    q: "32. Basic Herbs & Natural Remedies",
    a: (
      <SylList
        items={[
          "Common Ayurvedic herbs and their everyday uses",
          "Simple home remedies for digestion, sleep and stress",
          "Safe use of herbs alongside a yoga lifestyle",
        ]}
      />
    ),
  },
  {
    q: "33. Ayurvedic Self-Massage (Abhyanga)",
    a: (
      <SylList
        items={[
          "The purpose and benefits of daily oil self-massage",
          "Dosha-appropriate oil selection",
          "Hands-on Abhyanga practice and technique",
          "Using Abhyanga for grounding and nervous-system care",
        ]}
      />
    ),
  },
  {
    q: "34. Ayurveda & Yoga Together",
    a: (
      <SylList
        items={[
          "Choosing asana and pranayama for your dosha type",
          "Sequencing a class with Ayurvedic principles in mind",
          "Guiding students toward a balanced, sattvic lifestyle",
        ]}
      />
    ),
  },
];

const syllabusCards = [
  {
    title: "Techniques, Training & Practice",
    subtitle: "Asana · Pranayama · Meditation · Mantra",
    image: "/images/yoga-for-beginners-seated-stretch-class.jpg",
    alt: "Beginner-friendly seated stretch asana practice in Rishikesh",
    text: "You will practice Hatha and Ashtanga yoga poses, breathing exercises, hand gestures, body locks, cleansing techniques, meditation and chanting every day, with close guidance.",
  },
  {
    title: "Anatomy & Physiology",
    subtitle: "Body · Breath · Subtle Energy",
    image: "/images/low-lunge-pose-group-lawn-class.jpg",
    alt: "Anatomy and physiology study during a low lunge pose class in Rishikesh",
    text: "Learn how your bones, muscles, breath and nerves work together, plus the body's energy channels and chakras, so you can teach safely and with confidence.",
  },
  {
    title: "Yoga Humanities",
    subtitle: "History · Philosophy · Ethics",
    image: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp",
    alt: "Yoga philosophy class at Siddhant School of Yoga",
    text: "Understand the old yoga texts, the Eight Limbs of Yoga, where this tradition comes from, and how a good yoga teacher should behave.",
  },
  {
    title: "Ayurveda & Holistic Wellness",
    subtitle: "Doshas · Diet · Daily Routine",
    image: "/images/yoga-school-food-and-stay/yoga-school-traditional-thali-puri-banana-leaf.jpg",
    alt: "Ayurvedic wellness and nutrition class at Siddhant School of Yoga",
    text: "Learn your own dosha, how to eat and live in balance with it, and the basic herbs and self-massage techniques that support daily Ayurvedic living.",
  },
];

const whatsIncludeTabs = [
  {
    label: "What's Included",
    items: [
      "About 56 days residential accommodation (triple, shared or private)",
      "Yoga Alliance USA RYT-500 completion certificate",
      "Separate Ayurveda module completion certificate",
      "Attached bathroom with hot water in every room type",
      "Three Ayurvedic meals daily, adjustable to your dosha",
      "Herbal tea three times a day and filtered drinking water",
      "Free Wi-Fi across the campus",
      "Yoga mat, Jal Neti pot, rubber neti and Rudraksha mala",
      "Yoga bag and a complete course study manual",
      "A personal dosha assessment and a small herbal kit",
      "Notebooks and pens for daily classes",
      "Weekend excursions and free Dehradun Airport pickup",
      "One complimentary Ayurvedic massage",
      "Access to the yoga hall, props and study library",
      "100-day post-course support after graduation",
    ],
    images: [
      { src: "/images/yoga-school-food-and-stay/yoga-school-attached-bathroom.jpg", alt: "Attached bathroom at Siddhant School of Yoga", caption: "Comfortable Stay" },
      { src: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg", alt: "Ayurvedic meals served at Siddhant School of Yoga", caption: "Ayurvedic Meals" },
      { src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp", alt: "Weekend temple excursion in Rishikesh", caption: "Excursions" },
      { src: "/images/gallery_images/yoga-teacher-training-certificate-ceremony-siddhant-school-rishikesh.webp", alt: "500-hour certification ceremony", caption: "Certification" },
    ],
  },
  {
    label: "What's Excluded",
    items: [
      "International and domestic airfare",
      "Indian visa fees",
      "Personal expenses and shopping",
      "Travel and health insurance",
      "Additional spa or massage treatments beyond the one included",
      "Excursions beyond the included weekend itinerary",
    ],
    images: [
      { src: "/images/dancer-pose-natarajasana-riverside.jpg", alt: "Dancer pose practice by the riverside in Rishikesh", caption: "Riverside Practice" },
      { src: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp", alt: "Havan fire ceremony at the ashram", caption: "Ashram Life" },
      { src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp", alt: "Yoga practice by the Ganges river", caption: "Personal Practice" },
      { src: "/images/triangle-pose-group-lawn-class.jpg", alt: "Group triangle pose during the philosophy class break", caption: "Philosophy" },
    ],
  },
  {
    label: "To Bring",
    items: [
      "Comfortable yoga clothing",
      "A reusable water bottle",
      "Personal toiletries",
      "Layers for cool Himalayan mornings",
      "A notebook and pen",
      "An open, curious attitude toward Ayurvedic living",
    ],
    images: [
      { src: "/images/gallery_images/yoga-certification-ceremony-shiva-statue-rishikesh.webp", alt: "Students at the Shiva statue in Rishikesh", caption: "Community" },
      { src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp", alt: "Acharya Siddhant mentoring a student", caption: "Mentorship" },
      { src: "/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp", alt: "500-hour yoga and Ayurveda certification batch", caption: "Graduation" },
      { src: "/images/yoga-school-food-and-stay/yoga-school-lunch-tray-with-fresh-juice.jpg", alt: "Fresh Ayurvedic juice and meal tray at Siddhant School of Yoga", caption: "Fresh Juice & Meals" },
    ],
  },
];

const afterCoursePoints = [
  {
    icon: Award,
    title: "RYT-500 Registration",
    text: "Graduates become eligible to register as RYT-500 with Yoga Alliance, alongside a separate Ayurveda module completion certificate.",
  },
  {
    icon: MessageCircle,
    title: "100-Day Mentorship",
    text: "Ongoing 100-day mentorship and direct support from our teachers as you settle into practicing and teaching what you've learned.",
  },
  {
    icon: Users,
    title: "Global Alumni Community",
    text: "An invitation to our global alumni community of yoga and Ayurveda teachers, for collaboration and continued learning.",
  },
  {
    icon: ShieldCheck,
    title: "Fair Postponement & Refund Policy",
    text: "Postpone to any future batch within the year, or cancel — only the deposit is forfeited. Just notify us by email.",
  },
];

const pricingPlans = [
  { room: "Triple Sharing", price: "USD 2,199", reserve: "USD 500", onArrival: "Balance on Arrival" },
  { room: "Shared Room", price: "USD 2,699", reserve: "USD 500", onArrival: "Balance on Arrival" },
  { room: "Private Room", price: "USD 2,999", reserve: "USD 500", onArrival: "Balance on Arrival" },
];

const batchDates = [
  { dates: "03 Oct – 28 Nov 2026", status: "filling" },
  { dates: "03 Nov – 28 Dec 2026", status: "filling" },
  { dates: "03 Dec 2026 – 28 Jan 2027", status: "available" },
  { dates: "03 Jan – 28 Feb 2027", status: "available" },
  { dates: "03 Feb – 28 Mar 2027", status: "available" },
  { dates: "03 Mar – 28 Apr 2027", status: "available" },
  { dates: "03 Apr – 28 May 2027", status: "available" },
  { dates: "03 May – 28 Jun 2027", status: "available" },
];

const pageFaqs = [
  {
    q: "Do I become an Ayurvedic doctor after this course?",
    a: "No. Students learn Ayurveda to support their own health and guide yoga students with lifestyle and diet — it is not a medical qualification.",
  },
  {
    q: "How is this different from the regular 500-Hour TTC?",
    a: "It includes a dedicated Ayurveda module, Ayurvedic meals based on your dosha, a personal dosha assessment and a daily Ayurveda class.",
  },
  {
    q: "Do I need prior knowledge of Ayurveda to join?",
    a: "No, the course starts from the basics — no prior Ayurvedic or advanced yoga knowledge is required, though a 200-hour foundation helps.",
  },
  {
    q: "Is the certificate internationally recognized?",
    a: "Yes. You graduate with a Yoga Alliance USA Registered RYT-500 certificate, plus a separate Ayurveda module completion certificate from Siddhant School of Yoga.",
  },
  {
    q: "How do I reach Siddhant School of Yoga?",
    a: "The nearest airport is Jolly Grant Airport in Dehradun, about 35–45 minutes away, with free pickup included. You can also arrive by train to Haridwar or Rishikesh station and take a short taxi ride to the ashram.",
  },
  {
    q: "Do I need a visa to attend the course in India?",
    a: "Yes. Foreign nationals need a valid Indian e-Tourist Visa, arranged in advance of travel, before joining any residential training in Rishikesh.",
  },
  {
    q: "What should I bring for an 8-week residential course?",
    a: "Comfortable yoga clothing, a reusable water bottle, personal toiletries, layers for cool mornings, a notebook and pen, and an open mind toward Ayurvedic living. See the full 'What's Included, Excluded & To Bring' section above for details.",
  },
];

const enquirySteps = [
  { step: "1", title: "Send an Enquiry", text: "Reach out via WhatsApp, call or the contact form below." },
  { step: "2", title: "Speak With Our Team", text: "We'll help you pick the right batch dates and room type." },
  { step: "3", title: "Confirm Your Seat", text: "Secure your spot with a USD 500 deposit." },
  { step: "4", title: "Prepare for Rishikesh", text: "Receive a pre-arrival guide with packing and travel tips." },
  { step: "5", title: "Begin Your Training", text: "Arrive in Rishikesh and start your 500-hour journey." },
];

/* ---------------------------------------------------------------- */
/* Main component                                                    */
/* ---------------------------------------------------------------- */

export default function FiveHundredAyurvedaContent() {
  return (
    <>
      <SectionNav items={sectionNavItems} />

      {/* Trust Strip */}
      <section className="py-8 sm:py-10 bg-[#1c3b2b] font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 text-center">
            {trustStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 flex items-center justify-center mb-2">
                  <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </span>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-belleza font-normal text-white">
                  {s.value}
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wide font-semibold text-white/80 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-2/5 shrink-0">
              <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/founder/acharya-siddhant-founder-meditation-rishikesh.webp"
                  alt={founder.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="w-full lg:w-3/5 text-center lg:text-left">
              <Kicker>A Word Before You Begin</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                A Message From Acharya Siddhant
              </h2>
              <HeadingDivider center={false} />
              <div className="relative mt-4">
                <Quote className="w-8 h-8 text-[#1c3b2b]/20 absolute -top-3 -left-1 lg:-left-2" />
                <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium italic pl-6">
                  &ldquo;Ayurveda meets yoga: advanced 500 Hour teacher training in Rishikesh for true wellness.&rdquo;
                </p>
              </div>
              <p className="mt-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                I personally oversee every 500-Hour Yoga &amp; Ayurveda batch at Siddhant School of Yoga, because I believe complete transformation needs both sciences together — yoga to steady the mind and body, and Ayurveda to understand and nourish them. This course is not just about a certificate; it is about becoming a teacher who understands the whole person in front of them.
              </p>
              <p className="mt-3 font-belleza text-lg text-[#1c3b2b]">
                — {founder.name}, {founder.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SyllabusSection />

      <WhoShouldJoinSection />

      {/* Why Choose Us */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
            <Kicker>Why Choose Us</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Why Siddhant School of Yoga Is the Right Choice for Your 500-Hour Yoga &amp; Ayurveda TTC?
            </h2>
            <HeadingDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {whyChooseUsPoints.map((point, i) => (
              <div
                key={point.title}
                className="flex gap-3.5 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-4 sm:p-5 shadow-2xs"
              >
                <span className="shrink-0 w-8 h-8 rounded-lg bg-[#142b1e] text-white flex items-center justify-center text-xs font-bold font-figtree">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] leading-snug mb-1">
                    {point.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{point.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-6 rounded-2xl border border-[#1c3b2b]/30 bg-white/70 px-5 sm:px-8 py-5 text-center">
            <p className="text-sm sm:text-base text-stone-700 italic leading-relaxed">
              By the end of your training, you don&apos;t just receive a certificate — you leave with the confidence to teach, a deeper personal practice, and a genuinely holistic understanding of yoga and Ayurveda as one way of life.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <Image
              src="/logo/yoga-alliance.webp"
              alt="Yoga Alliance USA"
              width={64}
              height={64}
              className="h-14 sm:h-16 w-auto object-contain opacity-90"
            />
            <Image
              src="/logo/rys-200.webp"
              alt="RYS 200 Registered Yoga School"
              width={64}
              height={64}
              className="h-14 sm:h-16 w-auto object-contain opacity-90"
            />
            <Image
              src="/logo/rys-300.webp"
              alt="RYS 300 Registered Yoga School"
              width={64}
              height={64}
              className="h-14 sm:h-16 w-auto object-contain opacity-90"
            />
            <Image
              src="/logo/rys-500.webp"
              alt="RYS 500 Registered Yoga School"
              width={64}
              height={64}
              className="h-14 sm:h-16 w-auto object-contain opacity-90"
            />
          </div>
        </div>
      </section>

      <DatesFeesSection />

      {/* Daily Schedule */}
      <section id="schedule" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center mb-8 lg:mb-10">
            <Kicker>How Your Day Looks Like</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Daily Schedule of the 500-Hour Yoga &amp; Ayurveda TTC
            </h2>
            <HeadingDivider />
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              The daily rhythm follows the same residential structure as our other courses, with one key difference — the 11:30 AM to 12:30 PM slot is a dedicated Ayurveda class, not generic mantra chanting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <div>
              <div className="relative rounded-2xl border border-[#e3dac9] bg-[#fdfbf7] overflow-hidden shadow-2xs">
                <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#1c3b2b]">
                  <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10" />
                  <p className="w-[128px] sm:w-[160px] shrink-0 text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                    Time
                  </p>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                    Class
                  </p>
                </div>
                <div className="lg:max-h-[410px] lg:overflow-y-auto scrollbar-thin">
                  {dailySchedule.map((row, i) => {
                    const isLast = i === dailySchedule.length - 1;
                    const isAyurveda = row.activity.startsWith("Ayurveda Class");
                    return (
                      <div
                        key={row.time + row.activity}
                        className={`flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3.5 sm:py-4 ${
                          i !== 0 ? "border-t border-[#e3dac9]/60" : ""
                        } ${
                          isLast
                            ? "bg-[#fdf6ec]"
                            : isAyurveda
                            ? "bg-[#1c3b2b]/5"
                            : i % 2 === 0
                            ? "bg-[#f4efe6]/40"
                            : "bg-[#fdfbf7]"
                        }`}
                      >
                        <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1c3b2b]/10 flex items-center justify-center text-base sm:text-lg">
                          {row.icon}
                        </span>
                        <p
                          className={`w-[128px] sm:w-[160px] shrink-0 text-xs sm:text-sm font-bold ${
                            isLast ? "text-amber-700" : "text-[#1c3b2b]"
                          }`}
                        >
                          {row.time}
                        </p>
                        <p
                          className={`text-xs sm:text-[13px] font-semibold leading-snug ${
                            isLast ? "text-amber-700" : "text-stone-700"
                          }`}
                        >
                          {row.activity}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="hidden lg:block pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="mt-6 rounded-2xl border border-[#e3dac9] bg-[#fdfbf7] px-5 sm:px-6 py-4 text-center">
                <p className="text-sm text-stone-700 italic">
                  <span className="font-bold not-italic text-[#1c3b2b]">Note: </span>
                  This is an overview sample of the daily schedule. The daily schedule provided may vary according to the practice of the practitioner.
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden shadow-xl border-4 border-white sticky top-24">
                <Image
                  src="/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg"
                  alt="Ayurvedic meals and daily practice schedule during the 500-hour teacher training in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-lg font-belleza font-normal drop-shadow-md">
                    A day rooted in yoga practice and Ayurvedic living
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsIncludedTabsSection />

      {/* Early Bird CTA */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="max-w-5xl mx-auto text-center rounded-3xl bg-gradient-to-br from-[#1c3b2b] via-[#142b1e] to-[#142b1e] px-6 sm:px-12 py-10 sm:py-14 shadow-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-[#f4efe6] text-[11px] sm:text-xs font-semibold uppercase tracking-wide mb-4">
              Early Bird Discount Available
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-white leading-[1.2] mb-3">
              Ready to Master Yoga &amp; Ayurveda Together in Rishikesh?
            </h2>
            <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Seats are limited to keep our batches small and personal. Book early to lock in the early bird discount and secure your place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink
                href={whatsappLink(
                  "Namaste! I would like to ask about the early bird discount for the 500-Hour Yoga & Ayurveda TTC at Siddhant School of Yoga in Rishikesh.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="white"
              >
                <MessageCircle className="w-4 h-4" />
                Ask Discount on WhatsApp
              </ButtonLink>
              <ButtonLink href="/book-my-yoga-in-rishikesh-india" variant="primary">
                <ArrowRight className="w-4 h-4" />
                Enroll Now
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <ExcursionsSection />

      <ResidentialExperience showSchedule={false} />

      {/* Beyond Graduation */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Beyond Graduation"
            title="What Happens After the Course"
            description="Your journey doesn't end on the last day — we stay with you for 100 days and beyond."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {afterCoursePoints.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-3 bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-5"
              >
                <span className="shrink-0 w-9 h-9 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5" />
                </span>
                <div>
                  <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] mb-1">{title}</h3>
                  <p className="text-sm text-stone-700 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Teachers />

      <ShortsSection />

      <VideoSection />

      {/* What Happens After You Enquire */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Simple & Transparent"
            title="What Happens After You Enquire"
          />
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {enquirySteps.map((s) => (
              <div key={s.step} className="text-center flex flex-col items-center">
                <span className="w-11 h-11 rounded-full bg-[#1c3b2b] text-white flex items-center justify-center font-belleza text-lg mb-2.5 shrink-0">
                  {s.step}
                </span>
                <h3 className="font-belleza text-base text-[#1e2422] mb-1">{s.title}</h3>
                <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="FAQs"
            title="500-Hour Yoga & Ayurveda TTC — Frequently Asked Questions"
          />
          <Accordion items={pageFaqs} defaultOpen={null} />
        </div>
      </section>

      {/* Enquiry / Contact */}
      <section id="contact" className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Get In Touch"
            title="Ready to Master Yoga and Ayurveda?"
            description="Train under authentic Himalayan masters and become a truly transformative teacher. Our team typically responds within a few hours."
          />
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <a
              href={whatsappLink(
                "Namaste! I have a question about the 500-Hour Yoga & Ayurveda TTC at Siddhant School of Yoga in Rishikesh.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5 shadow-2xs hover:shadow-md hover:border-[#1c3b2b] transition-all"
            >
              <span className="w-12 h-12 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </span>
              <div>
                <p className="font-belleza text-[#1e2422] text-base">WhatsApp Us</p>
                <p className="text-xs text-stone-600">Fastest way to reach our team</p>
              </div>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-4 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5 shadow-2xs hover:shadow-md hover:border-[#1c3b2b] transition-all"
            >
              <span className="w-12 h-12 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </span>
              <div>
                <p className="font-belleza text-[#1e2422] text-base">Mail Us</p>
                <p className="text-xs text-stone-600">{site.email}</p>
              </div>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <ButtonLink
              href={whatsappLink(
                "Namaste! I'd like to know more about the 500-Hour Yoga & Ayurveda TTC in Rishikesh.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </ButtonLink>
            <ButtonLink href="/book-my-yoga-in-rishikesh-india" variant="primary">
              <ArrowRight className="w-4 h-4" />
              Enroll Now
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function ExcursionCard({ num, tag, title, text, image, alt, heightClass }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${heightClass}`}>
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
      <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wide">
        {num} &middot; {tag}
      </span>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <h3 className="font-belleza text-lg sm:text-xl text-white leading-snug mb-1.5 drop-shadow-md">
          {title}
        </h3>
        <p className="text-white/90 text-xs sm:text-[13px] leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function ExcursionsSection() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Beyond the Yoga Hall</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Excursions &amp; Holistic Life
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            A real education never stops at the edge of the yoga hall. Woven through the eight weeks are weekend excursions and a handful of small rituals that connect your yoga and Ayurveda studies to the living culture all around you — for many students, these turn out to be the memories they hold onto longest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <ExcursionCard
              num="01"
              tag="At Dusk"
              title="The Evening Ganga Aarti"
              text="As dusk falls, walk down to the Ganges for the aarti — priests circle great brass lamps and the whole bank glows amber against the dark. A grounding, Ayurvedic close to the day."
              image="/images/excusrion-activity/evening-ganga-aarti.jpg"
              alt="Evening riverside group gathering during the Ganga Aarti in Rishikesh"
              heightClass="h-[280px] sm:h-[420px]"
            />
            <ExcursionCard
              num="02"
              tag="On Rest Days"
              title="Waterfall Treks"
              text="On rest days, a short trek climbs to the waterfalls hidden in the hills above Rishikesh — cold water, green shade and the best kind of tired."
              image="/images/excusrion-activity/waterfall-trek.jpg"
              alt="Waterfall trek in the hills above Rishikesh"
              heightClass="h-[220px] sm:h-[240px]"
            />
          </div>

          <div className="flex flex-col gap-4">
            <ExcursionCard
              num="03"
              tag="Some Mornings"
              title="Yoga on the Ganges Ghat"
              text="Some sessions leave the yoga hall entirely — asana and meditation right on the riverbank, with the Ganges moving past as your soundtrack."
              image="/images/excusrion-activity/yoga-on-ganga-ghat.jpg"
              alt="Yoga practice on the Ganges riverbank in Rishikesh"
              heightClass="h-[220px] sm:h-[240px]"
            />
            <ExcursionCard
              num="04"
              tag="In Silence"
              title="Himalayan Cave Meditation"
              text="A short trip takes you to sacred caves in the foothills, where sages once sat in silence for centuries. Meditating inside, in the cool and the dark, is a quiet that stays with you long after you've left."
              image="/images/excusrion-activity/cave-meditation.jpg"
              alt="Meditation in a Himalayan cave near Rishikesh"
              heightClass="h-[280px] sm:h-[420px]"
            />
          </div>

          <div className="flex flex-col gap-4">
            <ExcursionCard
              num="05"
              tag="Living History"
              title="Historic Temples"
              text="Guided visits to the old temples of Rishikesh — riverside shrines and sacred sites where the traditions you study in class have been practiced without pause for centuries."
              image="/images/excusrion-activity/historic-temples.jpg"
              alt="Guided temple visit in Rishikesh"
              heightClass="h-[280px] sm:h-[420px]"
            />
            <ExcursionCard
              num="06"
              tag="Between Practice Days"
              title="Nature Walks & Sacred Sites"
              text="Gentle walks into the hills and slow time by the sacred river — a living reminder of the Ayurvedic principle that nature itself is medicine."
              image="/images/excusrion-activity/nature-walk.jpg"
              alt="Nature walk by the Ganges river in Rishikesh"
              heightClass="h-[220px] sm:h-[240px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsIncludedTabsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = whatsIncludeTabs[activeTab];

  return (
    <section id="whats-include" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
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

function WhoShouldJoinSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center mb-8 lg:mb-10">
          <Kicker>Is This for You?</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Who Should Join the 500-Hour Yoga &amp; Ayurveda TTC in Rishikesh
          </h2>
          <HeadingDivider />
        </div>

        {/* Desktop: expanding hover panels */}
        <div
          className="hidden lg:flex gap-3 h-[520px]"
          onMouseLeave={() => setActive(0)}
        >
          {whoShouldJoin.map((item, i) => {
            const isActive = active === i;
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ flexGrow: isActive ? 3 : 1 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer transition-[flex-grow] duration-500 ease-in-out shadow-2xs"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                <span className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-xs font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Collapsed vertical label */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-end gap-4 pb-8 transition-opacity duration-300 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </span>
                  <span className="text-white text-xs font-bold uppercase tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap drop-shadow-md">
                    {item.title}
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 pt-24 p-6 sm:p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 ${
                    isActive ? "opacity-100 delay-150" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <span className="inline-flex w-11 h-11 rounded-full bg-[#1c3b2b] items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </span>
                  <h3 className="text-white text-xl sm:text-2xl font-belleza font-normal mb-2 drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed max-w-sm">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / tablet: simple stacked cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {whoShouldJoin.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xs"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <span className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-[11px] font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-flex w-10 h-10 rounded-full bg-[#1c3b2b] items-center justify-center mb-3">
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </span>
                  <h3 className="text-white text-lg font-belleza font-normal mb-1.5 drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-xs leading-relaxed">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SyllabusSection() {
  return (
    <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <SectionHead
          kicker="Course Curriculum"
          title="What the 500-Hour Yoga & Ayurveda Curriculum Covers"
        />

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

        <div className="mt-10">
          <h3 className="font-belleza text-xl sm:text-2xl text-[#1c3b2b] mb-4 text-center sm:text-left">
            Part 1 — 200-Hour Foundation
          </h3>
          <Accordion
            items={syllabusPartOne}
            defaultOpen={null}
            className="w-full"
            columns={2}
          />
        </div>

        <div className="mt-10">
          <h3 className="font-belleza text-xl sm:text-2xl text-[#1c3b2b] mb-4 text-center sm:text-left">
            Part 2 — 300-Hour Advanced
          </h3>
          <Accordion
            items={syllabusPartTwo}
            defaultOpen={null}
            className="w-full"
            columns={2}
          />
        </div>

        <div className="mt-10">
          <h3 className="font-belleza text-xl sm:text-2xl text-[#1c3b2b] mb-4 text-center sm:text-left">
            Part 3 — Ayurveda Module
          </h3>
          <Accordion
            items={syllabusPartThree}
            defaultOpen={null}
            className="w-full"
            columns={2}
          />
        </div>
      </div>
    </section>
  );
}

function DatesFeesSection() {
  return (
    <section id="dates-fees" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <Kicker>Batch Dates &amp; Fees</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Upcoming 500-Hour Yoga &amp; Ayurveda Batches
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            Everything you need for the roughly 56 residential days is already inside these numbers — from your room to your Ayurvedic meals to both certificates.
          </p>
        </div>

        {/* Image banner with floating pricing card */}
        <div className="relative">
          <div className="relative h-56 sm:h-72 lg:h-80 w-full rounded-3xl overflow-hidden">
            <Image
              src="/images/yogi-prayer-pose-himalaya-sunrise-rishikesh.jpg"
              alt="Himalayan foothills near the 500-Hour Yoga & Ayurveda TTC ashram in Rishikesh"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative w-full lg:w-[92%] max-w-5xl mx-auto -mt-10 lg:-mt-20 rounded-3xl overflow-hidden shadow-2xl border border-[#e3dac9] bg-[#fdfbf7]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_0.8fr]">
              {/* Left: Pricing */}
              <div className="bg-[#1c3b2b] p-6 sm:p-7 flex flex-col justify-center gap-5">
                {pricingPlans.map((tier) => (
                  <div key={tier.room}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#e3dac9]">
                      {tier.room}
                    </span>
                    <div className="text-2xl sm:text-3xl font-belleza font-normal text-white">
                      {tier.price}
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-white/50 leading-relaxed pt-2 border-t border-white/10">
                  Fees include accommodation, three Ayurvedic meals daily, study material and both certificates. A USD 500 non-refundable deposit reserves your seat — the balance is paid on arrival.
                </p>
              </div>

              {/* Middle: Payment breakdown */}
              <div className="p-6 sm:p-7 border-t lg:border-t-0 lg:border-x border-[#e3dac9]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  How the Payment Works
                </span>
                <div className="space-y-4 mt-3">
                  {pricingPlans.map((tier) => (
                    <div key={tier.room}>
                      <span className="block text-[11px] font-semibold text-[#1c3b2b] mb-1.5">
                        {tier.room}
                      </span>
                      <div className="flex rounded-full overflow-hidden border border-[#e3dac9]">
                        <span className="shrink-0 px-4 py-2.5 bg-[#b85c00] text-white text-xs sm:text-[13px] font-bold whitespace-nowrap">
                          {tier.reserve} To Reserve
                        </span>
                        <span className="flex-1 px-4 py-2.5 bg-[#f4efe6] text-[#1c3b2b] text-xs sm:text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                          {tier.onArrival}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Photo + CTAs */}
              <div className="p-6 sm:p-7 flex flex-col items-center text-center gap-3">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#e3dac9] shadow-xs">
                  <Image
                    src="/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg"
                    alt="Ayurvedic meals at Siddhant School of Yoga"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <a
                  href={whatsappLink(
                    "Namaste! I have a question about the 500-Hour Yoga & Ayurveda TTC dates and fees at Siddhant School of Yoga in Rishikesh.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border-2 border-[#1c3b2b] text-[#1c3b2b] text-xs font-bold uppercase tracking-wide hover:bg-[#1c3b2b] hover:text-white transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Have a Query?
                </a>
                <Link
                  href="/book-my-yoga-in-rishikesh-india"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#b85c00] hover:bg-[#96490a] text-white text-xs font-bold uppercase tracking-wide transition-all"
                >
                  Enroll Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Each batch runs for about 8 weeks (56 days). Deposit is non-refundable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Batches Table */}
        <div className="mt-10 lg:mt-14 rounded-3xl border border-[#e3dac9] bg-white p-5 sm:p-8 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <h3 className="font-belleza text-lg sm:text-xl text-[#1e2422] tracking-wide">
              Upcoming Batches, Next 12 Months
            </h3>
            <span className="text-xs text-stone-500">
              Each batch runs about 56 days &middot; USD 500 deposit reserves your seat
            </span>
          </div>

          <table className="w-full min-w-[640px] text-left border-collapse">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-[#1c3b2b] border-b border-[#e3dac9]">
                <th className="py-2.5 pr-4 font-bold">Course Dates</th>
                <th className="py-2.5 pr-4 font-bold">Triple Sharing</th>
                <th className="py-2.5 pr-4 font-bold">Shared Room</th>
                <th className="py-2.5 pr-4 font-bold">Private Room</th>
                <th className="py-2.5 pr-4 font-bold">Seats</th>
                <th className="py-2.5 font-bold text-right">Enroll Now</th>
              </tr>
            </thead>
            <tbody>
              {batchDates.map((b) => (
                <tr key={b.dates} className="border-b border-[#e3dac9]/70 last:border-b-0">
                  <td className="py-3 pr-4 text-sm font-semibold text-[#1e2422] whitespace-nowrap">{b.dates}</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 2,199</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 2,699</td>
                  <td className="py-3 pr-4 text-sm text-stone-700 whitespace-nowrap">USD 2,999</td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        b.status === "filling"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-[#1c3b2b]/10 text-[#1c3b2b]"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${b.status === "filling" ? "bg-amber-500" : "bg-[#1c3b2b]"}`} />
                      {b.status === "filling" ? "Filling Fast" : "Seats Available"}
                    </span>
                  </td>
                  <td className="py-3 text-right whitespace-nowrap">
                    <a
                      href={whatsappLink(
                        `Namaste! I would like to enroll for the ${b.dates} batch of the 500-Hour Yoga & Ayurveda TTC at Siddhant School of Yoga in Rishikesh.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#b85c00] hover:text-[#96490a] transition-colors"
                    >
                      Enroll Now
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ videoId, title }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative rounded-2xl overflow-hidden aspect-video bg-black cursor-pointer"
        aria-label={`Play ${title}`}
      >
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          fill
          unoptimized
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 text-[#1c3b2b] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#1c3b2b] group-hover:text-white transition-all duration-300 pl-0.5">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          </div>
        </div>
        <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-belleza drop-shadow-md text-left">
          {title}
        </p>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

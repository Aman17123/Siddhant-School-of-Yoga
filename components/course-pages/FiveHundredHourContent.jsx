"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Minus,
  ChevronDown,
  Check,
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
  TrendingUp,
  Compass,
  RefreshCw,
} from "lucide-react";
import { Kicker, HeadingDivider, ButtonLink } from "@/components/ui";
import { site, whatsappLink, founder } from "@/data/siteData";
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
  const initialOpen = Array.isArray(defaultOpen)
    ? defaultOpen
    : defaultOpen === null
      ? []
      : [defaultOpen];
  const [openIndexes, setOpenIndexes] = useState(initialOpen);
  const [showAll, setShowAll] = useState(false);
  const hasMore = initialCount && items.length > initialCount;
  const visibleItems = hasMore ? items.slice(0, initialCount) : items;
  const restItems = hasMore ? items.slice(initialCount) : [];
  const gridCols = columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1";

  const toggle = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <div className={className}>
      <div className={`grid ${gridCols} gap-4`}>
        {visibleItems.map((item, idx) => (
          <AccordionItem
            key={idx}
            item={item}
            isOpen={openIndexes.includes(idx)}
            onToggle={() => toggle(idx)}
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
                      isOpen={openIndexes.includes(realIdx)}
                      onToggle={() => toggle(realIdx)}
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
    <p className="mb-2">
      <span className="font-semibold text-[#1c3b2b]">{label}: </span>
      <span className="text-stone-600">{text}</span>
    </p>
  );
}

/* ---------------------------------------------------------------- */
/* Data                                                              */
/* ---------------------------------------------------------------- */

const trustStats = [
  { icon: Calendar, value: "56", label: "Days Residential Program" },
  { icon: BookOpen, value: "25+", label: "Subjects Covered" },
  { icon: Users, value: "10–15", label: "Small Batch Size" },
  { icon: ShieldCheck, value: "100", label: "Days Post-Course Support" },
];

const whyChooseUsPoints = [
  {
    title: "Best Platform for Basic-to-Advanced Practitioners",
    text: "Whether you're starting from zero or already teaching, the 500-hour path takes you from foundational asana all the way to advanced technique in one continuous journey.",
  },
  {
    title: "Known for Intense, Result-Oriented Practice",
    text: "Our schedule is built for real transformation, not a leisurely retreat — every day moves you measurably closer to mastery.",
  },
  {
    title: "Yoga as the Art of Redesigning the Subconscious Mind",
    text: "Acharya Siddhant teaches every technique through the lens of reshaping the subconscious — the part of the mind that quietly runs most of your life.",
  },
  {
    title: "Unique Energy & Mind-Balancing Techniques",
    text: "Our signature pranayama, bandha and meditation sequences raise energy and steady the mind in ways most standard trainings never touch.",
  },
  {
    title: "A Practice Schedule & Support After the Course",
    text: "Every graduate leaves with a personalized post-course practice schedule and 100 days of direct mentorship to keep growing.",
  },
  {
    title: "Small Batches & Personal Attention",
    text: "With just 10–15 students per batch, Acharya Siddhant and senior faculty can correct and guide you individually, every single day.",
  },
];

const courseBenefits = [
  "Using Hatha yoga to work directly with mind, energy and the chakras",
  "More Nadi Shodhana and pranayama practice for kundalini awakening",
  "A personal pranayama sequence designed for your own self-practice",
  "Deeper knowledge of mudras and bandhas with individual, personal attention",
  "Designing your own meditation technique rather than following one blindly",
  "Understanding meditation as a happening, not something you force",
  "The art of relaxation and instant relaxation techniques",
  "Designing short Yoga Nidra practices to reshape the subconscious mind",
  "Mantra chanting for protection from negativity",
];

const whoShouldJoin = [
  {
    icon: Sprout,
    title: "Dedicated Beginners",
    text: "Ready to commit two months to daily practice. You need no prior experience — the first four weeks build the complete 200-hour foundation before advanced work begins.",
  },
  {
    icon: TrendingUp,
    title: "Intermediate & Advanced Practitioners",
    text: "Who want the full 200 + 300 hour path without a gap between them, moving straight from foundation into advanced alignment, kundalini pranayama and scripture study.",
  },
  {
    icon: Compass,
    title: "Anyone Seeking One Uninterrupted Journey",
    text: "Rather than splitting your training across two separate trips to India, complete it in a single, continuous eight-week immersion — and save on travel in the process.",
  },
];

const dailySchedule = [
  { icon: "⏰", time: "5:30 AM", activity: "Wake Up" },
  { icon: "☕", time: "6:00 – 6:15 AM", activity: "Herbal Tea at Dining Hall" },
  { icon: "💧", time: "6:15 – 6:30 AM", activity: "Daily Yogic Purification (Shatkarma)" },
  { icon: "🕉️", time: "6:30 – 7:00 AM", activity: "Daily Tratak / Daily OM Chanting / Daily Ganesh and Gayatri Mantra Chanting / Prayer at Yoga Hall" },
  { icon: "🌬️", time: "7:00 – 8:00 AM", activity: "Pranayama / Yogic Purification / Bandha / Mudra" },
  { icon: "🧘", time: "8:15 – 9:45 AM", activity: "Hatha Yoga / Alignment and Adjustment" },
  { icon: "🥣", time: "9:45 – 10:30 AM", activity: "Breakfast and Karma Yoga" },
  { icon: "🙏", time: "10:30 – 11:30 AM", activity: "Special Course of Gratitude for Peace, Happiness and All Positive Results" },
  { icon: "🌿", time: "11:30 AM – 12:30 PM", activity: "Mantra Chanting" },
  { icon: "🥗", time: "1:00 – 2:30 PM", activity: "Lunch and Rest" },
  { icon: "😴", time: "2:30 – 3:30 PM", activity: "Anatomy and Physiology / Yoga Nidra" },
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
    q: "1. Advanced Alignment & Adjustment",
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
    q: "2. Kundalini & Pranayama",
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
    q: "3. Scriptures & Philosophy",
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
    q: "4. Advanced Anatomy & Biomechanics",
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
    q: "5. Teaching & Yoga Business",
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
  {
    q: "6. Ayurveda & Naturopathy",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Fundamentals"
          text="The three Doshas (Vata, Pitta, Kapha), the seven bodily tissues (Dhatus), and an introduction to nature-cure principles."
        />
        <SylGroup
          label="Applied"
          text="Sattvic diet planning and everyday Ayurvedic practices to support a teacher's own health and long-term practice."
        />
      </div>
    ),
  },
  {
    q: "7. Weekly Himalayan Excursions",
    a: (
      <SylList
        items={[
          "Evening Ganga Aarti at Triveni Ghat",
          "Waterfall treks in the hills above Rishikesh",
          "Guided visits to historic temples",
        ]}
      />
    ),
  },
];

const roomTiers = [
  { room: "Triple Sharing", price: "USD 1,699", was: "USD 2,199", reserve: "USD 400", onArrival: "USD 1,299" },
  { room: "Shared Room", price: "USD 1,999", was: "USD 2,699", reserve: "USD 400", onArrival: "USD 1,599", badge: "Most Popular" },
  { room: "Private Room", price: "USD 2,299", was: "USD 2,999", reserve: "USD 400", onArrival: "USD 1,899" },
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

const whatsIncludeTabs = [
  {
    label: "What's Included",
    items: [
      "About 56 days residential program",
      "Yoga Alliance USA RYT-500 completion certificate",
      "Triple sharing, shared or private accommodation",
      "Attached bathroom with hot water",
      "Three freshly prepared sattvic meals daily",
      "Herbal tea three times a day",
      "Filtered drinking water and free Wi-Fi",
      "Personal yoga mat, Jal Neti pot & Rubber Neti kit",
      "Rudraksha mala and yoga bag",
      "Printed study manual, notebooks and pens",
      "Weekend excursions",
      "Free Dehradun Airport pickup",
      "One complimentary Ayurvedic massage",
      "Full access to the yoga hall, props and library",
      "100-day post-course support",
    ],
    images: [
      { src: "/images/yoga-school-food-and-stay/yoga-school-room-bed-with-wardrobe.png", alt: "Comfortable room with bed and wardrobe at Siddhant School of Yoga", caption: "Comfortable Stay" },
      { src: "/images/yoga-school-food-and-stay/yoga-school-vegetarian-lunch-pulao-sabzi.jpg", alt: "Sattvic meals served at Siddhant School of Yoga", caption: "Sattvic Meals" },
      { src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp", alt: "Weekly temple excursion in Rishikesh", caption: "Excursions" },
      { src: "/images/gallery_images/yoga-teacher-training-certificate-ceremony-siddhant-school-rishikesh.webp", alt: "RYT-500 certification ceremony", caption: "Certification" },
    ],
  },
  {
    label: "What's Excluded",
    items: [
      "International and domestic airfare",
      "Indian visa fees",
      "Personal expenses and shopping",
      "Additional spa or massage treatments",
      "Travel and health insurance",
    ],
    images: [
      { src: "/images/seated-spinal-twist-group-class.png", alt: "Group seated spinal twist practice with mountain views in Rishikesh", caption: "Riverside Practice" },
      { src: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp", alt: "Havan fire ceremony at the ashram", caption: "Ashram Life" },
      { src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp", alt: "Yoga practice by the Ganges river", caption: "Personal Practice" },
      { src: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp", alt: "Yoga philosophy class", caption: "Philosophy" },
    ],
  },
  {
    label: "What To Bring",
    items: [
      "Comfortable yoga clothing",
      "A reusable water bottle",
      "Personal toiletries",
      "Layers for cool mornings and evenings",
      "An open mind and steady commitment for 8 weeks",
    ],
    images: [
      { src: "/images/gallery_images/yoga-certification-ceremony-shiva-statue-rishikesh.webp", alt: "Students at the Shiva statue in Rishikesh", caption: "Community" },
      { src: "/images/gallery_images/yoga-guru-student-certificate-rishikesh-india.webp", alt: "Acharya Siddhant mentoring a student", caption: "Mentorship" },
      { src: "/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp", alt: "200-hour and 500-hour certification batch", caption: "Graduation" },
      { src: "/images/gallery_images/200-hour-yoga-teacher-training-graduates-rishikesh.webp", alt: "Yoga teacher training graduates", caption: "Your Journey" },
    ],
  },
];

const beyondGraduationPoints = [
  {
    icon: Award,
    title: "RYT-500 Registration Guidance",
    text: "Step-by-step assistance registering with Yoga Alliance as an RYT-500, the highest widely recognized yoga teacher credential.",
  },
  {
    icon: MessageCircle,
    title: "Ongoing 100-Day Mentorship",
    text: "Direct WhatsApp and email support for feedback and motivation for a full 100 days, plus lifetime academic guidance from Acharya Siddhant.",
  },
  {
    icon: Users,
    title: "Global Alumni Community",
    text: "An invitation to our worldwide alumni network of fellow yoga teachers, with collaboration and teaching-opportunity connections.",
  },
  {
    icon: RefreshCw,
    title: "Fair Postponement & Refund Policy",
    text: "Postpone your seat to any future batch within the year, or cancel — only the deposit is forfeited. Just notify us by email.",
  },
];

const pageFaqs = [
  {
    q: "Can a beginner join the 500 Hour course?",
    a: "Yes. It starts from the foundation (200-Hour) and moves to advanced practice (300-Hour), so dedicated beginners can join alongside more experienced practitioners.",
  },
  {
    q: "Is it better to do the 500 Hour at once or in two parts?",
    a: "Both give you the same certification. Doing it at once builds a stronger daily habit and saves on travel costs, since you complete the full journey in a single trip to Rishikesh.",
  },
  {
    q: "Is there a break between the two parts?",
    a: "The course runs continuously from the 200-hour foundation straight into the 300-hour advanced curriculum, with a weekly free day for rest and excursions.",
  },
  {
    q: "How do I reach Siddhant School of Yoga?",
    a: "Fly into Jolly Grant Airport, Dehradun — about 35–45 minutes from our school, with free pickup included. You can also arrive by train to Haridwar or Rishikesh, both well connected to Rishikesh by road.",
  },
  {
    q: "Do I need a visa to attend the training in India?",
    a: "Yes. Foreign nationals should arrange an Indian e-Tourist Visa in advance, either online or through the nearest Indian embassy, before departure.",
  },
  {
    q: "What should I pack for an 8-week residential course?",
    a: "Comfortable yoga clothing, a reusable water bottle, personal toiletries, layers for cool mornings and evenings, copies of your passport and visa, and an open mind ready for eight weeks of steady practice.",
  },
  {
    q: "Is the certificate internationally recognized?",
    a: "Yes. The 500-Hour course is Yoga Alliance USA registered, and graduates receive an RYT-500 completion certificate — the highest widely recognized yoga teacher credential worldwide.",
  },
];

const enquirySteps = [
  { step: "1", title: "Send an Enquiry", text: "Reach out via WhatsApp, call or the contact form below." },
  { step: "2", title: "Speak With Our Team", text: "We'll help you pick the right batch dates and room type." },
  { step: "3", title: "Confirm Your Seat", text: "Secure your spot with a simple booking confirmation." },
  { step: "4", title: "Prepare for Rishikesh", text: "Receive a pre-arrival guide with packing & travel tips." },
  { step: "5", title: "Begin Your Training", text: "Arrive in Rishikesh and start your 500-hour journey." },
];

/* ---------------------------------------------------------------- */
/* Main component                                                    */
/* ---------------------------------------------------------------- */

export default function FiveHundredHourContent() {
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
                  &ldquo;The 500 Hour Yoga TTC helps you rearrange and redesign your subconscious mind to achieve anything and everything in your life.&rdquo;
                </p>
              </div>
              <p className="mt-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                I personally teach the 500-hour journey at Siddhant School of Yoga, because eight uninterrupted weeks give us the time to go far beyond technique — to actually redesign the subconscious patterns that shape how you live, practice and teach.
              </p>
              <p className="mt-3 font-belleza text-lg text-[#1c3b2b]">
                — {founder.name}, {founder.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SyllabusSection />

      {/* Who Should Join */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Is This for You?"
            title="Who Should Join the 500-Hour Yoga TTC in Rishikesh"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {whoShouldJoin.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-6 text-center"
              >
                <span className="inline-flex w-12 h-12 rounded-full bg-[#1c3b2b] items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </span>
                <h3 className="font-belleza text-lg sm:text-xl text-[#1e2422] mb-2">{title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us + Course Benefits */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
            <Kicker>Why Choose Us</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Why Siddhant School of Yoga Is the Right Choice for Your 500-Hour YTTC?
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

          {/* Course Benefits checklist */}
          <div className="max-w-4xl mx-auto mt-8 rounded-2xl border border-[#e3dac9] bg-[#fdfbf7] p-5 sm:p-8">
            <h3 className="text-center font-belleza text-lg sm:text-xl text-[#1e2422] mb-4">
              What You&apos;ll Specifically Gain From This Training
            </h3>
            <SylList items={courseBenefits} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <Image
              src="/logo/yoga-alliance.webp"
              alt="Yoga Alliance USA"
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

      {/* Dates & Fees */}
      <DatesFeesSection />

      {/* Daily Schedule */}
      <section id="schedule" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center mb-8 lg:mb-10">
            <Kicker>How Your Day Looks Like</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Daily Schedule of the 500-Hour Yoga Teacher Training Course
            </h2>
            <HeadingDivider />
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
                    return (
                      <div
                        key={row.time + row.activity}
                        className={`flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3.5 sm:py-4 ${
                          i !== 0 ? "border-t border-[#e3dac9]/60" : ""
                        } ${isLast ? "bg-[#fdf6ec]" : i % 2 === 0 ? "bg-[#f4efe6]/40" : "bg-[#fdfbf7]"}`}
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

              <div className="mt-6 rounded-2xl border border-[#e3dac9] bg-[#f4efe6] px-5 sm:px-6 py-4 text-center">
                <p className="text-sm text-stone-700 italic">
                  <span className="font-bold not-italic text-[#1c3b2b]">Note: </span>
                  This is an overview sample of the daily schedule, and one day each week is kept free for rest and excursions. The schedule provided may vary according to the practice of the practitioner.
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden shadow-xl border-4 border-white sticky top-24">
                <Image
                  src="/images/crow-pose-bakasana-riverside-rock.jpg"
                  alt="Daily yoga practice schedule during the 500-hour teacher training in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-lg font-belleza font-normal drop-shadow-md">
                    Eight weeks rooted in discipline, practice and stillness
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Bird CTA */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="max-w-5xl mx-auto text-center rounded-3xl bg-gradient-to-br from-[#1c3b2b] via-[#142b1e] to-[#142b1e] px-6 sm:px-12 py-10 sm:py-14 shadow-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-[#f4efe6] text-[11px] sm:text-xs font-semibold uppercase tracking-wide mb-4">
              Early Bird Discount Available
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-white leading-[1.2] mb-3">
              Ready to Begin Your 500-Hour Master Journey in Rishikesh?
            </h2>
            <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Seats are limited to keep our batches small and personal. Book early to lock in the early bird discount and secure your place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink
                href={whatsappLink(
                  "Namaste! I would like to ask about the early bird discount for the 500-Hour Yoga TTC at Siddhant School of Yoga in Rishikesh.",
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

      <WhatsIncludedTabsSection />

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
            {beyondGraduationPoints.map(({ icon: Icon, title, text }) => (
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
            title="500-Hour Yoga TTC — Frequently Asked Questions"
          />
          <Accordion items={pageFaqs} defaultOpen={null} />
        </div>
      </section>

      {/* Final CTA / Contact */}
      <section id="contact" className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="max-w-3xl mx-auto text-center rounded-3xl border border-[#e3dac9] bg-[#f4efe6] px-6 sm:px-12 py-10 sm:py-14">
            <Kicker>Ready When You Are</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-3">
              Ready to Master Your Yoga Teaching?
            </h2>
            <p className="text-sm sm:text-base text-stone-700 max-w-xl mx-auto mb-7 leading-relaxed">
              Take your yogic journey to the highest level and train under authentic Himalayan masters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink
                href={whatsappLink(
                  "Namaste! I have a question about the 500-Hour Yoga TTC at Siddhant School of Yoga in Rishikesh.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </ButtonLink>
              <ButtonLink href="/book-my-yoga-in-rishikesh-india" variant="primary">
                <ArrowRight className="w-4 h-4" />
                Enroll Now
              </ButtonLink>
            </div>
          </div>

          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <a
              href={whatsappLink(
                "Namaste! I have a question about the 500-Hour Yoga TTC at Siddhant School of Yoga in Rishikesh.",
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
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Section components                                                */
/* ---------------------------------------------------------------- */

function SyllabusSection() {
  return (
    <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <SectionHead
          kicker="Course Syllabus"
          title="What the 500-Hour Curriculum Covers"
          description="One continuous curriculum, in two parts — the complete 200-hour foundation followed directly by the 300-hour advanced training."
        />

        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="shrink-0 w-9 h-9 rounded-full bg-[#1c3b2b] text-white flex items-center justify-center font-belleza text-sm">
              1
            </span>
            <h3 className="font-belleza text-xl sm:text-2xl text-[#1e2422]">
              Part 1 — 200-Hour Foundation
            </h3>
          </div>
          <Accordion items={syllabusPartOne} defaultOpen={null} className="w-full" columns={2} />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="shrink-0 w-9 h-9 rounded-full bg-[#1c3b2b] text-white flex items-center justify-center font-belleza text-sm">
              2
            </span>
            <h3 className="font-belleza text-xl sm:text-2xl text-[#1e2422]">
              Part 2 — 300-Hour Advanced
            </h3>
          </div>
          <Accordion items={syllabusPartTwo} defaultOpen={null} className="w-full" columns={2} />
        </div>
      </div>
    </section>
  );
}

function DatesFeesSection() {
  return (
    <section id="dates-fees" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Batch Dates &amp; Fees</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Upcoming 500-Hour Batches
          </h2>
          <HeadingDivider />
        </div>

        {/* Room tier cards with payment breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10 lg:mb-14">
          {roomTiers.map((tier) => (
            <div
              key={tier.room}
              className={`rounded-2xl border p-5 sm:p-6 bg-white/70 ${
                tier.badge ? "border-[#1c3b2b] ring-2 ring-[#1c3b2b]/20 shadow-md" : "border-[#e3dac9]"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1c3b2b]">
                  {tier.room}
                </span>
                {tier.badge && (
                  <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#b85c00] text-white">
                    {tier.badge}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl sm:text-3xl font-belleza font-normal text-[#1e2422]">
                  {tier.price}
                </span>
                <span className="text-sm text-stone-400 line-through">{tier.was}</span>
              </div>

              <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                How the Payment Works
              </span>
              <div className="flex rounded-full overflow-hidden border border-[#e3dac9]">
                <span className="shrink-0 px-3 py-2 bg-[#b85c00] text-white text-[11px] sm:text-xs font-bold whitespace-nowrap">
                  {tier.reserve} To Reserve
                </span>
                <span className="flex-1 px-3 py-2 bg-[#f4efe6] text-[#1c3b2b] text-[11px] sm:text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                  {tier.onArrival} On Arrival
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="max-w-4xl mx-auto text-center text-stone-500 text-xs sm:text-sm mb-10">
          The USD 400 deposit is non-refundable and reserves your seat; the balance is payable on arrival. Fees include accommodation, three sattvic meals daily, study material and certification. Airfare not included.
        </p>

        {/* Upcoming Batches Table */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#1c3b2b] via-[#142b1e] to-[#142b1e] shadow-xl">
          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl border border-white/15 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10">
                  <th className="py-4 sm:py-5 px-5 sm:px-6 text-white/80 font-figtree font-bold text-sm uppercase tracking-wide">Upcoming Dates</th>
                  <th className="py-4 sm:py-5 px-5 sm:px-6 text-white/80 font-figtree font-bold text-sm uppercase tracking-wide">Triple Sharing</th>
                  <th className="py-4 sm:py-5 px-5 sm:px-6 text-white/80 font-figtree font-bold text-sm uppercase tracking-wide">Shared</th>
                  <th className="py-4 sm:py-5 px-5 sm:px-6 text-white/80 font-figtree font-bold text-sm uppercase tracking-wide">Private</th>
                  <th className="py-4 sm:py-5 px-5 sm:px-6 text-white/80 font-figtree font-bold text-sm uppercase tracking-wide">Status</th>
                  <th className="py-4 sm:py-5 px-5 sm:px-6" />
                </tr>
              </thead>
              <tbody>
                {batchDates.map((b, i) => (
                  <tr key={b.dates} className={`border-t border-white/10 ${i % 2 === 0 ? "bg-white/5" : ""}`}>
                    <td className="py-4 sm:py-5 px-5 sm:px-6 text-white font-belleza text-base">{b.dates}</td>
                    <td className="py-4 sm:py-5 px-5 sm:px-6 text-[#f4efe6] text-sm font-bold">{roomTiers[0].price}</td>
                    <td className="py-4 sm:py-5 px-5 sm:px-6 text-[#f4efe6] text-sm font-bold">{roomTiers[1].price}</td>
                    <td className="py-4 sm:py-5 px-5 sm:px-6 text-[#f4efe6] text-sm font-bold">{roomTiers[2].price}</td>
                    <td className="py-4 sm:py-5 px-5 sm:px-6">
                      {b.status === "filling" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-[11px] font-semibold whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          Filling Fast
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4efe6]/15 text-[#f4efe6] text-[11px] font-semibold whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f4efe6]" />
                          Seats Available
                        </span>
                      )}
                    </td>
                    <td className="py-4 sm:py-5 px-5 sm:px-6">
                      <Link
                        href="/book-my-yoga-in-rishikesh-india"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#f4efe6] transition-colors whitespace-nowrap"
                      >
                        Enroll Now
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3 p-3">
            {batchDates.map((b) => (
              <div key={b.dates} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <div className="flex items-center justify-between mb-2.5 gap-2">
                  <h3 className="font-belleza text-base text-white leading-snug">{b.dates}</h3>
                  {b.status === "filling" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-semibold whitespace-nowrap shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Filling Fast
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4efe6]/15 text-[#f4efe6] text-[10px] font-semibold whitespace-nowrap shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f4efe6]" />
                      Seats Available
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {roomTiers.map((plan) => (
                    <div key={plan.room} className="rounded-xl bg-white/5 border border-white/10 px-2 py-2 text-center">
                      <p className="text-[9px] uppercase tracking-wide text-white/50 mb-0.5 leading-tight">
                        {plan.room.split(" ")[0]}
                      </p>
                      <p className="text-[#f4efe6] text-sm font-bold">{plan.price}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/book-my-yoga-in-rishikesh-india"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-[#b85c00] text-white text-xs font-semibold"
                >
                  Enroll Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
    <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Beyond the Yoga Hall</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Excursions &amp; Cultural Life
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            A real education never stops at the edge of the yoga hall. Across eight weeks in Rishikesh, weekend excursions and a handful of small rituals tie your training to the living culture all around you — for many students, these turn out to be the memories they hold onto longest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <ExcursionCard
              num="01"
              tag="At Dusk"
              title="The Evening Ganga Aarti"
              text="As dusk falls, walk down to the Ganges for the aarti — priests circle great brass lamps and the whole bank glows amber against the dark. Over eight weeks, this becomes a regular, grounding ritual."
              image="/images/excusrion-activity/evening-ganga-aarti.jpg"
              alt="Evening riverside group gathering during the Ganga Aarti in Rishikesh"
              heightClass="h-[280px] sm:h-[420px]"
            />
            <ExcursionCard
              num="02"
              tag="On Rest Days"
              title="Waterfall Treks"
              text="On free days, a short trek climbs to the waterfalls hidden in the hills above Rishikesh — cold water, green shade and the best kind of tired."
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
              text="A trip takes you to sacred caves in the foothills, where sages once sat in silence for centuries. Across an eight-week immersion, meditating there becomes a quiet touchstone you return to."
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
              text="Guided visits to the old temples of Rishikesh — riverside shrines and sacred sites where the tradition you study in class has been practiced without pause for centuries."
              image="/images/excusrion-activity/historic-temples.jpg"
              alt="Instructor guiding students during the temple excursion in Rishikesh"
              heightClass="h-[280px] sm:h-[420px]"
            />
            <ExcursionCard
              num="06"
              tag="Between Practice Days"
              title="Nature Walks & Sacred Sites"
              text="Gentle walks into the hills and slow time by the sacred river — none of it compulsory, none of it rushed, plenty of it across eight full weeks."
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

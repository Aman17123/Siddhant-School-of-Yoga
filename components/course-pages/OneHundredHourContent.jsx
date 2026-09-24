"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Minus,
  ChevronDown,
  Check,
  CheckCircle2,
  Play,
  Star,
  Mail,
  MessageCircle,
  Quote,
  ArrowRight,
  Sunrise,
  BookOpen,
  Wind,
  Heart,
  Users,
  Utensils,
  Wifi,
  Waves,
  Trees,
  ShieldCheck,
  MapPin,
  Award,
  Calendar,
  Sprout,
  Home,
  Compass,
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

function ReadMore({ children, label = "Read More", lessLabel = "Show Less" }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {open && <div className="mb-4">{children}</div>}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-[#1c3b2b] hover:text-[#142b1e] font-figtree font-semibold text-sm cursor-pointer transition-colors"
      >
        <span>{open ? lessLabel : label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
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
  { icon: Calendar, value: "13", label: "Days Residential Program" },
  { icon: BookOpen, value: "14", label: "Syllabus Modules" },
  { icon: Users, value: "10–15", label: "Small Batch Size" },
  { icon: ShieldCheck, value: "$600", label: "All-Inclusive Starting Price" },
];

const whyChooseUsPoints = [
  {
    title: "Part 1 of Our Yoga Alliance 200-Hour Pathway",
    text: "This 100-hour course is the first part of our Yoga Alliance USA-approved 200-hour curriculum, giving you a genuine head start toward full RYT 200 certification.",
  },
  {
    title: "Taught by Acharya Siddhant & Senior Faculty",
    text: "Every subject — asana, pranayama, philosophy and anatomy — is taught by a dedicated, experienced teacher, giving you real depth in every class.",
  },
  {
    title: "Small Batch Sizes for Personal Attention",
    text: "We keep our batches to just 10–15 students, so every student gets hands-on correction and direct, personal feedback.",
  },
  {
    title: "Trusted by Students From Around the World",
    text: "Over 15+ years, students from dozens of countries have trained with us, with an average Google rating of 4.9 out of 5.",
  },
  {
    title: "Transparent, All-Inclusive Pricing",
    text: "Our course fee covers accommodation, meals, classes and study material, so there are no hidden costs to worry about.",
  },
  {
    title: "Result-Oriented Pranayama & Meditation",
    text: "Acharya Siddhant's signature breathwork curriculum goes deeper than most schools, building a real, lasting practice — not just theory.",
  },
  {
    title: "Nutritious Meals & Comfortable Stay",
    text: "Enjoy clean, comfortable shared or private rooms and three healthy vegetarian meals a day, with herbal tea served three times daily.",
  },
  {
    title: "Short Excursions & Cultural Immersion",
    text: "A short excursion trip and free airport pickup from Dehradun add ease and a taste of local culture to your 13-day stay.",
  },
];

const knowledgeFaqs = [
  {
    q: "What is Yoga, really?",
    a: "Yoga is a complete Vedic science for uniting body, breath, mind and consciousness — far beyond a physical exercise routine. At Siddhant School of Yoga, the 100-hour course roots every asana and breathing technique in this deeper philosophy, so you graduate understanding not just the 'how' but the 'why' behind every practice.",
  },
  {
    q: "Hatha Yoga vs. Ashtanga Yoga — what's the difference?",
    a: "Hatha Yoga emphasizes slow, precise alignment and holding postures to build a strong foundation, while Ashtanga Yoga links postures into a dynamic, breath-synchronized flow for strength and stamina. The 100-hour YTTC trains you in both styles, so you can teach a wide range of students confidently.",
  },
  {
    q: "Why does Pranayama matter so much in this training?",
    a: "Prana (life-force) is considered the bridge between body and mind in yogic science. This 100-hour course gives Pranayama real depth from day one, training you in classical breathing techniques that calm the nervous system and deepen meditation.",
  },
  {
    q: "Why is Rishikesh the right place to do a 100-hour YTTC?",
    a: "Known as the 'Yoga Capital of the World,' Rishikesh sits at the foothills of the Himalayas on the banks of the Ganges. Training here means learning in the same environment where these practices originated, surrounded by ashrams, temples and a living yogic culture that no classroom elsewhere can replicate.",
  },
  {
    q: "What are the real benefits of a consistent yoga practice?",
    a: "Beyond flexibility and strength, a disciplined practice built during this course improves breath capacity, mental clarity, stress resilience and sleep quality — a foundation you can keep building on long after the 13 days are over.",
  },
  {
    q: "100-hour vs. 200-hour — which should I choose?",
    a: "The 100-hour YTTC is Part 1 of our 200-hour curriculum — it covers understanding yoga and right practice, and is ideal if you want a shorter, foundational immersion first. The full 200-hour course adds intense practice and teaching methodology, and is what's required for full Yoga Alliance RYT 200 certification. Many students complete this 100-hour course first, then return for Part 2.",
  },
];

const whoShouldJoin = [
  {
    icon: Sprout,
    title: "Complete Beginners",
    text: "Who want a strong, real foundation before anything else. This course assumes no prior experience — you build everything from the ground up, guided every step of the way by Acharya Siddhant and our senior teachers.",
    image: "/images/balancing-pose-outdoor-garden-yoga-class-rishikesh.jpg",
    alt: "Complete beginner receiving hands-on guidance during yoga practice in Rishikesh",
  },
  {
    icon: Home,
    title: "Home Practitioners",
    text: "Yogis who already practice on their own and want to deepen their technique, alignment and understanding under expert eyes, rather than continuing to figure it out alone.",
    image: "/images/warrior-3-pose-rocks-ganga-river-rishikesh.jpg",
    alt: "Home yoga practitioner deepening technique by the Ganges in Rishikesh",
  },
  {
    icon: Award,
    title: "Future Teachers",
    text: "Anyone hoping to teach one day, who wants to build a real, right-knowledge foundation first — this course is Part 1 of our Yoga Alliance-approved 200-hour pathway toward full RYT 200 certification.",
    image: "/images/ttc-graduation-ceremony-group-photo.png",
    alt: "Future yoga teachers celebrating their graduation ceremony in Rishikesh",
  },
  {
    icon: Compass,
    title: "People at a Crossroads",
    text: "Those going through a life transition, seeking clarity, stillness and a genuine reset — using 13 days in Rishikesh to reconnect with who you really are.",
    image: "/images/sunrise-prayer-himalayan-view-kunjapuri-rishikesh.jpg",
    alt: "Person finding stillness and clarity in the Himalayan foothills of Rishikesh",
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
  { icon: "🌿", time: "11:30 AM – 12:30 PM", activity: "Mantra Chanting / Ayurveda" },
  { icon: "🥗", time: "1:00 – 2:30 PM", activity: "Lunch and Rest" },
  { icon: "😴", time: "2:30 – 3:30 PM", activity: "Anatomy and Physiology / Yoga Nidra / Relaxation" },
  { icon: "📜", time: "3:30 – 4:30 PM", activity: "Philosophy with Siddhant to Discover Yoga / Patanjali / Chakra / Kundalini / Samadhi" },
  { icon: "🫖", time: "4:30 – 4:45 PM", activity: "Tea Time and Snacks" },
  { icon: "🧘‍♀️", time: "4:45 – 5:45 PM", activity: "Meditation / Chakra and Kundalini Yoga" },
  { icon: "🔥", time: "5:45 – 7:15 PM", activity: "Ashtanga Vinyasa / Alignment and Adjustment" },
  { icon: "🍛", time: "7:15 – 8:00 PM", activity: "Dinner" },
  { icon: "🌙", time: "10:00 PM", activity: "Lights Off" },
];

const syllabusItems = [
  {
    q: "1. Hatha Yoga",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Beginner postures"
          text="Joint movement series & eye exercises, Surya Namaskara, Shavasana, Makarasana, Tadasana, Utthanasana, Tiryak Tadasana, Trikonasana, Kati Chakrasana, Tiryaka Kati Chakrasana, Meru Wakrasana, Shashankasana, Ardha Ushtrasana, Bhujangasana, Kandharasana, Setu Asana, Ardha Shalabhasana, Vipareetakarani Asana."
        />
        <SylGroup
          label="Intermediate postures"
          text="Ardha Matsyendrasana, Tiryaka Bhujangasana, Janu Sirshasana, Paschimottanasana, Ushtrasana, Sarvangasana, Matsyasana, Garudasana."
        />
        <SylGroup
          label="Advanced postures"
          text="Halasana, Natarajasana."
        />
      </div>
    ),
  },
  {
    q: "2. Ashtanga Vinyasa Series",
    a: (
      <SylGroup
        label="Unique asana series"
        text="Surya Namaskar A, Padangusthasana, Padahastasana, Trikonasana, Parivrittatrikonasana, Parsvottonasana, Virabhadrasana I & II, Utthitaparsvakonasana, Parivrittaparsvakonasana, Prasaritapadottanasana, Utthita Hasta Padangusthasana, Ardhabaddha Padma Uttanasana, Utkatasana, Dandasana, Janu Sirsasana, Ardhabaddha Padma Paschimottanasana, Triangamukaikapada Paschimottanasana, Paschimottanasana, Purvottasana, Marichyasana, Paripurnanavasana."
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
        ]}
      />
    ),
  },
  {
    q: "4. Pranayama",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Foundational concepts"
          text="The five Koshas, seven Chakras, Nadis, what Pranayama is, its aspects, importance and sequence, and preparation for practice."
        />
        <div className="mt-2">
          <SylList
            items={[
              "Introduction of Yogic breathing",
              "Abdominal, thoracic & yogic inhalation",
              "Inner retention & outer retention",
              "Udgeeth Pranayama",
              "Kapalbhati",
              "Surya Bhedi Pranayama",
              "Chandra Bhedi Pranayama",
              "Alternate breathing (Nadi-Shodhana)",
              "Bhastrika",
              "Bhramari Pranayama",
              "Different types of Pranayama and their precautions",
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    q: "5. Mudra",
    a: (
      <SylList
        items={[
          "What is Mudra & its implementation",
          "Jnana Mudra",
          "Chin Mudra",
          "Bhairav Mudra",
          "Bhairavi Mudra",
          "Nashikagra Mudra",
        ]}
      />
    ),
  },
  {
    q: "6. Shat Karma (Yogic Purification)",
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
    q: "7. Relaxation",
    a: (
      <SylList
        items={[
          "What is relaxation & its importance",
          "Muscular relaxation",
          "Deep breathing relaxation",
          "Tense-relax method",
          "Partial body relaxation",
          "Full-body relaxation",
          "Mind relaxation",
        ]}
      />
    ),
  },
  {
    q: "8. Meditation",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Theory"
          text="What meditation is, understanding meditation (path of yoga & path of knowledge), preparation, practice and the practical aspects of meditation."
        />
        <div className="mt-2">
          <SylList
            items={[
              "OM meditation",
              "Active meditation",
              "Dance meditation",
              "Hu meditation",
              "Candle Tratak meditation",
              "Mirror Tratak meditation",
              "Anapana meditation",
              "Vipassana meditation",
              "In-active meditation",
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    q: "9. Yoga Nidra",
    a: (
      <SylList
        items={[
          "What is Yoga Nidra & its importance",
          "Body awareness",
          "Finding sensation",
          "Finding a blind spot",
          "Yoga Nidra practice",
        ]}
      />
    ),
  },
  {
    q: "10. Gratitude Practice",
    a: (
      <SylList
        items={[
          "The importance of gratitude",
          "What is gratitude",
          "The right practice of gratitude",
        ]}
      />
    ),
  },
  {
    q: "11. Mantra Chanting",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Concepts"
          text="What Mantra is, what Mantra chanting is, its importance, and the different kinds of mantra."
        />
        <SylGroup
          label="Mantras taught"
          text="Ganesh Mantra, Guru Mantra, Gayatri Mantra, Mahamrityunjaya Mantra, Universal Prayer Mantra, Shanti Mantra."
        />
      </div>
    ),
  },
  {
    q: "12. Biomechanics & Anatomy",
    a: (
      <SylGroup
        label="Skeletal & muscular systems"
        text="Joint movements (flexion, extension, abduction, adduction), joint stabilization and stability, the skeleton system and bones, types of joints, major muscles, the effect of asana on the skeletal system, and types of concentration on the skeleton system."
      />
    ),
  },
  {
    q: "13. Physiology",
    a: (
      <SylList
        items={[
          "Digestive system",
          "Respiratory system",
          "Nervous system",
        ]}
      />
    ),
  },
  {
    q: "14. Yoga Philosophy",
    a: (
      <div className="leading-relaxed">
        <SylGroup
          label="Fundamentals"
          text="What philosophy is, what the problem is, what growth is, the Panch Kosha and its balance, what the mind is, the balanced mind, and an introduction to Indian philosophy."
        />
        <SylGroup
          label="Yoga philosophy"
          text="The history of yoga, different types of yoga, Raj Yoga (Patanjali Yoga), Patanjali's Yoga Sutra, discipline and its importance in yoga, and — ultimately — what yoga really is."
        />
      </div>
    ),
  },
];

const syllabusCards = [
  {
    title: "Techniques, Training & Practice",
    subtitle: "Asana · Pranayama · Mudra · Shatkarma",
    image: "/images/100-hour-yoga-teacher-training-group-pose.jpg",
    alt: "100-hour teacher trainees practicing a group asana pose in Rishikesh",
    text: "You will practice Hatha Yoga and the Ashtanga asana series, breathing techniques, hand gestures and yogic cleansing methods, with alignment and adjustment guidance every day.",
  },
  {
    title: "Meditation & Inner Practice",
    subtitle: "Meditation · Yoga Nidra · Mantra · Gratitude",
    image: "/images/group-meditation-namaste-yoga-class-rishikesh.jpg",
    alt: "Meditation and mantra chanting practice at Siddhant School of Yoga",
    text: "Learn multiple meditation techniques, Yoga Nidra, sacred mantra chanting and daily gratitude practice to calm and steady the mind.",
  },
  {
    title: "Anatomy & Physiology",
    subtitle: "Biomechanics · Body Systems",
    image: "/images/cow-face-pose-arm-stretch-yoga-class-rishikesh.jpg",
    alt: "Anatomy and physiology study for yoga teachers in Rishikesh",
    text: "Understand your joints, bones, muscles, and how your digestive, respiratory and nervous systems respond to yoga practice.",
  },
  {
    title: "Yoga Philosophy",
    subtitle: "History · Patanjali · Discipline",
    image: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
    alt: "Yoga philosophy discussion at Siddhant School of Yoga",
    text: "Explore the history of yoga, Patanjali's Yoga Sutras and Raj Yoga, and discover what discipline, growth and yoga really mean.",
  },
];

const whatsIncludeTabs = [
  {
    label: "What's Included",
    items: [
      "13 days residential yoga course",
      "100-hour Yoga Alliance-recognized certificate (Part 1 of the 200-Hour YTTC)",
      "Both shared and private accommodation options",
      "Attached bathroom with hot water",
      "Healthy and nutritious vegetarian meals",
      "Herbal tea served three times daily",
      "Filtered water & free Wi-Fi",
      "One yoga mat, one Neti pot & one Rubber Neti",
      "One Rudraksha Mala & one yoga bag",
      "Course study materials, notebooks and pens",
      "A short excursion trip",
      "Free pick-up from Dehradun Airport",
      "One free Ayurvedic massage",
    ],
    images: [
      { src: "/images/yoga-school-food-and-stay/yoga-school-triple-sharing-room.jpg", alt: "Comfortable triple sharing room at Siddhant School of Yoga", caption: "Comfortable Stay" },
      { src: "/images/yoga-school-food-and-stay/yoga-school-dining-hall-and-kitchen.jpg", alt: "Sattvic meals served at Siddhant School of Yoga", caption: "Sattvic Meals" },
      { src: "/images/group-yoga-class-sandy-riverbank.jpg", alt: "Group yoga class on the sandy riverbank during the excursion in Rishikesh", caption: "Excursions" },
      { src: "/images/ttc-graduation-ceremony-group-photo.png", alt: "100-hour certification ceremony", caption: "Certification" },
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
      { src: "/images/standing-balance-pose-riverside-terrace.jpg", alt: "Standing balance pose practice on a riverside terrace in Rishikesh", caption: "Riverside Practice" },
      { src: "/images/havan-fire-ceremony-group.jpg", alt: "Havan fire ceremony at the ashram", caption: "Ashram Life" },
      { src: "/images/warrior-pose-riverside-rocks.jpg", alt: "Warrior pose practice on the riverside rocks in Rishikesh", caption: "Personal Practice" },
      { src: "/images/seated-side-stretch-indoor-class.jpg", alt: "Indoor seated stretch during the yoga philosophy class", caption: "Philosophy" },
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
      { src: "/images/100-hour-yoga-teacher-training-group-pose.jpg", alt: "Yoga community group pose during the 100-hour training in Rishikesh", caption: "Community" },
      { src: "/images/low-lunge-pose-group-lawn-class.jpg", alt: "Instructor mentoring a student during a low lunge pose class", caption: "Mentorship" },
      { src: "/images/graduation-flower-garland-photo.jpg", alt: "Yoga teacher training graduation with flower garlands", caption: "Graduation" },
      { src: "/images/gallery_images/200-hour-yoga-teacher-training-graduates-rishikesh.webp", alt: "Yoga teacher training graduates in Rishikesh", caption: "Your Journey" },
    ],
  },
];

const afterCoursePoints = [
  {
    icon: Calendar,
    title: "Continue to the 200-Hour Program",
    text: "This 100-hour course is Part 1 of our Yoga Alliance USA-approved 200-hour curriculum — return for Part 2 (intense practice & teaching methodology) to earn your full RYT 200 certification.",
  },
  {
    icon: MessageCircle,
    title: "Simple Registration Process",
    text: "Send your inquiry, receive a course presentation, submit the registration form with your fee, and get a confirmation email — booking your seat is quick and straightforward.",
  },
  {
    icon: Users,
    title: "Continued Guidance",
    text: "Ongoing support from Acharya Siddhant and our teaching team as you deepen your personal practice and decide on your next steps after the course.",
  },
  {
    icon: Award,
    title: "Fair Refund & Postponement Policy",
    text: "If plans change, you can postpone to any other scheduled batch within the year, or cancel with no extra charges beyond the non-refundable advance — just inform us by email.",
  },
];

const pricingPlans = [
  { room: "Triple Sharing", price: "$300", note: "was $400 — 3 persons per room, attached bathroom" },
  { room: "Shared Room", price: "$500", note: "was $600 — 2 persons per room, attached bathroom" },
  { room: "Private Room", price: "$600", note: "was $700 — single occupancy, attached bathroom" },
];

const batchDates = [
  { month: "October 2026", dates: "3rd – 15th Oct 2026", status: "available" },
  { month: "November 2026", dates: "3rd – 15th Nov 2026", status: "available" },
  { month: "December 2026", dates: "3rd – 15th Dec 2026", status: "available" },
  { month: "January 2027", dates: "3rd – 15th Jan 2027", status: "available" },
  { month: "February 2027", dates: "3rd – 15th Feb 2027", status: "available" },
  { month: "March 2027", dates: "3rd – 15th Mar 2027", status: "available" },
  { month: "April 2027", dates: "3rd – 15th Apr 2027", status: "available" },
  { month: "May 2027", dates: "3rd – 15th May 2027", status: "available" },
];

const enquirySteps = [
  { step: "1", title: "Send an Enquiry", text: "Reach out via WhatsApp, call or the contact form below." },
  { step: "2", title: "Speak With Our Team", text: "We'll help you pick the right batch dates and room type." },
  { step: "3", title: "Confirm Your Seat", text: "Secure your spot with a simple booking confirmation." },
  { step: "4", title: "Prepare for Rishikesh", text: "Receive a pre-arrival guide with packing & travel tips." },
  { step: "5", title: "Begin Your Training", text: "Arrive in Rishikesh and start your 100-hour journey." },
];

const testimonials = [
  {
    name: "Carme Fontanet Mor",
    country: "Spain",
    text: "I stumbled across Siddhant School of Yoga while one second from booking another school — zero regrets! Exceeded every expectation. I felt at home from day one, and the staff were welcoming and helpful throughout. I have an Indian family in Rishikesh now.",
  },
  {
    name: "Michael Levit",
    country: "Germany",
    text: "Impossible to overrate this 100-hour training. The physical aspects (Hatha & Ashtanga) were insightful and challenging — after 13 days, I felt stronger and capable of things I hadn't foreseen. Accommodation, food and excursions were excellent throughout.",
  },
  {
    name: "Romina",
    country: "Italy",
    text: "A unique teaching method with small classes and full immersion — Pranayama to Asana, philosophy, mantra chanting, anatomy and meditation. I learned so much that gratitude is now part of my daily life. Thank you all!",
  },
];

const pageFaqs = [
  {
    q: "Is the 100-hour Yoga TTC certified by Yoga Alliance?",
    a: "This 100-hour course is the first part of our 200-hour Yoga Teacher Training, approved by Yoga Alliance USA. On its own, it awards a Siddhant School of Yoga Certificate of Completion — to become an officially Registered Yoga Teacher (RYT 200), you'll continue with Part 2 of the 200-hour program and then register separately with Yoga Alliance for a fee of around $115.",
  },
  {
    q: "What is the eligibility criteria to join this yoga course?",
    a: (
      <div>
        <p className="mb-2">
          The main requirement is having the "right attitude" toward learning yoga. Beyond that, applicants should meet these conditions:
        </p>
        <SylList
          items={[
            "Be in good physical condition",
            "Be open-minded and eager to learn/practice yoga",
            "Commit to 9–10 hours of daily practice with 100% attendance",
            "Follow a vegetarian diet during the course",
            "Avoid alcohol, drugs, and smoking",
            "Have basic English proficiency",
            "Be between 18–60 years old",
            "Not have had surgery in the past year",
            "Not bring children along",
          ]}
        />
      </div>
    ),
  },
  {
    q: "What documents do I need to bring for the course?",
    a: "You'll need two clear color photocopies of your passport (plus the original for verification), two passport-size color photographs, and details of your visa expiry date. A valid Indian Tourist Visa is mandatory before traveling to India.",
  },
  {
    q: "Do I need a visa to attend yoga training in India?",
    a: "Yes. Foreign nationals must arrange an Indian Tourist Visa in advance, either through the Indian embassy or a visa service, before departure. It's also recommended to sort out health/travel insurance and banking arrangements before you leave home.",
  },
  {
    q: "What happens on arrival and on the first day of the course?",
    a: "You may arrive a day early to settle in. On arrival, you'll check into your room, rest, then complete your application form and pay any remaining fees before receiving your schedule and a facility tour. On day one: a Hatha Yoga class (8–9 am), breakfast, a traditional fire ceremony (10:30 am), a group photo, study materials, lunch, and rest — followed by a 3 pm orientation covering teachers, syllabus, rules, food, and accommodation. The course then begins officially with an evening Ashtanga Yoga class.",
  },
  {
    q: "What should I pack for the yoga TTC?",
    a: "The school provides yoga education, meals, and accommodation, but you should bring: two passport-size photos, your phone and charger, any electronics you use (laptop, camera, tablet), an ATM/debit card, comfortable season-appropriate yoga clothing and shoes, a travel towel, a first-aid kit with basic medications, and any personal essentials. Avoid bringing expensive jewelry or valuables, as the school isn't responsible for theft.",
  },
];

const blogPosts = [
  {
    title: "What Is a Yoga Teacher Training Course (YTTC)?",
    image: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp",
    excerpt: "A complete beginner's guide to what happens during a YTTC and how to choose the right one.",
  },
  {
    title: "Hatha vs. Ashtanga Yoga: Which Style Is Right for You?",
    image: "/images/instructor-guiding-class-riverside.jpg",
    excerpt: "Understanding the difference between these two foundational yoga styles before you enroll.",
  },
  {
    title: "Why Rishikesh Is Called the Yoga Capital of the World",
    image: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp",
    excerpt: "The history, culture and Himalayan setting that make Rishikesh the ultimate place to train.",
  },
];

/* ---------------------------------------------------------------- */
/* Main component                                                    */
/* ---------------------------------------------------------------- */

export default function OneHundredHourContent() {
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
                  &ldquo;100 hour Yoga Teacher Training Course in Rishikesh India principally focuses on right knowledge and deep understanding of yoga, proper training with yogic tips and techniques to revitalize body and mind, to practice yoga for a healthy and balanced lifestyle.&rdquo;
                </p>
              </div>
              <p className="mt-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                I personally teach every 100-hour batch at Siddhant School of Yoga, because I believe this training is not just about earning a certificate — it is about transforming into a teacher who can guide others from a place of real, lived understanding.
              </p>
              <p className="mt-3 font-belleza text-lg text-[#1c3b2b]">
                — Siddhant Ji, {founder.role}
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
              Why Siddhant School of Yoga Is the Right Choice for Your 100-Hour YTTC?
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
              By the end of your training, you don't just receive a certificate — you leave with the confidence to teach, a deeper personal practice, and a clearer understanding of yoga as a way of life.
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

      {/* Dates & Fees */}
      <section id="dates-fees" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
            <Kicker>Batch Dates &amp; Fees</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Upcoming 100-Hour Batches
            </h2>
            <HeadingDivider />
          </div>

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
                    <tr key={b.month} className={`border-t border-white/10 ${i % 2 === 0 ? "bg-white/5" : ""}`}>
                      <td className="py-4 sm:py-5 px-5 sm:px-6 text-white font-belleza text-base">{b.dates}</td>
                      <td className="py-4 sm:py-5 px-5 sm:px-6 text-[#f4efe6] text-sm font-bold">{pricingPlans[0].price}</td>
                      <td className="py-4 sm:py-5 px-5 sm:px-6 text-[#f4efe6] text-sm font-bold">{pricingPlans[1].price}</td>
                      <td className="py-4 sm:py-5 px-5 sm:px-6 text-[#f4efe6] text-sm font-bold">{pricingPlans[2].price}</td>
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
            <div className="md:hidden space-y-3">
              {batchDates.map((b) => (
                <div key={b.month} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-belleza text-lg text-white">{b.month}</h3>
                    {b.status === "filling" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-semibold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Filling Fast
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4efe6]/15 text-[#f4efe6] text-[10px] font-semibold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f4efe6]" />
                        Seats Available
                      </span>
                    )}
                  </div>
                  <p className="text-white/70 text-xs mb-3">{b.dates}</p>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {pricingPlans.map((plan) => (
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

          <p className="max-w-4xl mx-auto text-center text-stone-500 text-xs sm:text-sm mt-6">
            Fees include accommodation, three meals daily, study material and certification. A $140 USD registration fee (non-refundable) secures your seat; the balance is payable on arrival. Airfare not included.
          </p>

        </div>
      </section>

      {/* Daily Schedule */}
      <section id="schedule" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="text-center mb-8 lg:mb-10">
            <Kicker>How Your Day Looks Like</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
              Daily Schedule of the 100-Hour Yoga Teacher Training Course
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
                  This is an overview sample of the daily schedule. The daily schedule provided may vary according to the practice of the practitioner.
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden shadow-xl border-4 border-white sticky top-24">
                <Image
                  src="/images/student-namaste-himalayan-mountains-rishikesh.jpg"
                  alt="Daily yoga practice schedule during the 100-hour teacher training in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-lg font-belleza font-normal drop-shadow-md">
                    A day rooted in discipline, practice and stillness
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yoga Knowledge Hub */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Yoga Knowledge Hub"
            title="Understanding Yoga Before You Train"
          />
          <Accordion items={knowledgeFaqs} />
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="max-w-5xl mx-auto text-center rounded-3xl bg-gradient-to-br from-[#1c3b2b] via-[#142b1e] to-[#142b1e] px-6 sm:px-12 py-10 sm:py-14 shadow-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-[#f4efe6] text-[11px] sm:text-xs font-semibold uppercase tracking-wide mb-4">
              Early Bird Discount Available
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-white leading-[1.2] mb-3">
              Ready to Begin Your 100-Hour Journey in Rishikesh?
            </h2>
            <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Seats are limited to keep our batches small and personal. Book early to lock in the early bird discount and secure your place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink
                href={whatsappLink(
                  "Namaste! I would like to ask about the early bird discount for the 100-Hour Yoga TTC at Siddhant School of Yoga in Rishikesh.",
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

      {/* After The Course */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Beyond Graduation"
            title="What Happens After the Course"
            description="Your journey doesn't end on the last day — here's how to continue, register, or plan ahead."
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
            title="100-Hour Yoga TTC — Frequently Asked Questions"
          />
          <Accordion items={pageFaqs} defaultOpen={null} initialCount={5} />
        </div>
      </section>

      {/* Enquiry / Contact */}
      <section id="contact" className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Get In Touch"
            title="Have Questions? Let's Talk"
            description="Our team typically responds within a few hours. Reach us directly and we'll help you plan your training."
          />
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={whatsappLink(
                "Namaste! I have a question about the 100-Hour Yoga TTC at Siddhant School of Yoga in Rishikesh.",
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
            A real education never stops at the edge of the yoga hall. Woven through the 13 days is a short excursion trip and a handful of small rituals that tie you to the living culture all around you — for many students, these turn out to be the memories they hold onto longest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <ExcursionCard
              num="01"
              tag="At Dusk"
              title="The Evening Ganga Aarti"
              text="As dusk falls, walk down to the Ganges for the aarti — priests circle great brass lamps and the whole bank glows amber against the dark. Many students describe it as the first time in years they felt completely still."
              image="/images/excusrion-activity/evening-ganga-aarti.jpg"
              alt="Evening Ganga Aarti fire ceremony in Rishikesh"
              heightClass="h-[280px] sm:h-[420px]"
            />
            <ExcursionCard
              num="02"
              tag="On the Excursion"
              title="Waterfall Treks"
              text="A short trek climbs to the waterfalls hidden in the hills above Rishikesh — cold water, green shade and the best kind of tired."
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
              text="A guided visit to the old temples of Rishikesh — riverside shrines and sacred sites where the tradition you study in class has been practiced without pause for centuries."
              image="/images/excusrion-activity/historic-temples.jpg"
              alt="Guided temple visit in Rishikesh"
              heightClass="h-[280px] sm:h-[420px]"
            />
            <ExcursionCard
              num="06"
              tag="Between Practice Days"
              title="Nature Walks & Sacred Sites"
              text="Gentle walks into the hills and slow time by the sacred river — none of it compulsory, none of it rushed."
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

function WhoShouldJoinSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center mb-8 lg:mb-10">
          <Kicker>Is This for You?</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Who Should Join a 100-Hour Yoga Teacher Training in Rishikesh
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
          kicker="Course Syllabus"
          title="What the 100-Hour Curriculum Covers"
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

        <div className="mt-8">
          <Accordion
            items={syllabusItems}
            defaultOpen={null}
            className="w-full"
            columns={2}
          />
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

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Home as HomeIcon,
  Check,
  Landmark,
  HeartHandshake,
  Users,
  CalendarClock,
  Activity,
  Flame,
  Wind,
  Moon,
  Music,
  BookOpen,
  Library,
  Layers,
  UserCheck,
  TrendingUp,
  Sprout,
  Heart,
  Presentation,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CtaBanner from "@/components/home/CtaBanner";
import { Kicker, HeadingDivider, ButtonLink } from "@/components/ui";
import { site, founder, whatsappLink } from "@/data/siteData";

const PAGE_PATH = "/why-choose-siddhant-school-of-yoga";
const TTC_200 = "/200-hour-yoga-teacher-training-in-rishikesh-india";
const TTC_200_DATES = `${TTC_200}#dates-fees`;

export const metadata = {
  title: "Why Choose Siddhant School of Yoga | Yoga TTC in Rishikesh",
  description:
    "Small residential batches, dedicated Prāṇāyāma, three daily āsana classes, 15 core subjects and traditional ashram life in Rishikesh. Discover the Siddhant School approach.",
  keywords: [
    "why choose siddhant school of yoga",
    "traditional yoga school rishikesh",
    "yoga teacher training rishikesh",
    "residential yoga ttc india",
    "small group yoga ttc rishikesh",
    "classical yoga school rishikesh",
  ],
  alternates: { canonical: PAGE_PATH },
};

const heroStats = [
  "24-Day Residential",
  "10–15 Students per Batch",
  "Yoga Alliance Registered Yoga School",
];

const groups = [
  {
    kicker: "01",
    title: "Life at the Ashram",
    cards: [
      {
        icon: Landmark,
        title: "Traditional Ashram Living",
        summary:
          "Live, practice and study at Yoga Abhyas Ashram in a quiet residential area of Veerbhadra, near the Ganga.",
        points: [
          "Morning and evening Āratī, sattvic vegetarian meals",
          "Private and twin-sharing rooms",
          "Night-time Mouna from 10 PM to 5 AM",
        ],
        link: "Explore Ashram Life",
        href: "/traditional-ashram-living-in-rishikesh",
      },
      {
        icon: HeartHandshake,
        title: "Community & Family Environment",
        summary:
          "A gurukula-inspired community where international students share meals, practice and daily life, which helps a lot if you are travelling alone.",
        points: [
          "Teachers present across the day, not only in class",
          "Shared meals and group practice",
          "A welcoming international cohort",
        ],
        link: "Discover Our Community",
        href: "/family-environment-ashram-rishikesh",
      },
      {
        icon: Users,
        title: "Small Group Size",
        summary:
          "Every batch is limited to 10–15 students, so teachers can observe, answer questions and give feedback.",
        points: [
          "More individual observation",
          "More time for questions and discussion",
          "More turns to teach and receive feedback",
        ],
        link: "Why Small Groups Matter",
        href: "/small-group-yoga-teacher-training-rishikesh",
      },
    ],
  },
  {
    kicker: "02",
    title: "A Structured Daily Practice",
    cards: [
      {
        icon: CalendarClock,
        title: "Daily 8-Class Schedule",
        summary:
          "A residential rhythm of practice, study, rest and silence, from 05:15 AM meditation to 10 PM lights-out.",
        points: [
          "Eight core classes every day",
          "Meals and afternoon rest built in",
          "Weekly day off",
        ],
        link: "See the Daily Schedule",
        href: "/daily-8-ashram-classes-schedule-rishikesh",
      },
      {
        icon: Activity,
        title: "Three Daily Āsana Classes",
        summary:
          "Three distinct approaches to āsana every day, each developing a different skill.",
        points: [
          "Morning Classical Haṭha Yoga: steadiness and awareness",
          "Midday Alignment & Adjustment: observation and precision",
          "Evening Aṣṭāṅga Vinyāsa: breath, movement and discipline",
        ],
        link: "Explore the Āsana Classes",
        href: "/three-daily-asana-classes-hatha-ashtanga-alignment",
      },
      {
        icon: Flame,
        title: "Intensive Daily Practice",
        summary:
          "Practice is the centre of the day, but it is structured intensity, not strain. Practices are introduced progressively and balanced with rest.",
        points: [
          "Tapas: consistent, sincere effort",
          "Dynamic and restorative practices alternate",
          "100-day practice schedule after the course",
        ],
        link: "About Intensive Practice",
        href: "/intensive-yoga-practice-rishikesh",
      },
      {
        icon: Wind,
        title: "Prāṇāyāma Center",
        summary:
          "Prāṇāyāma is a dedicated daily subject, not a short breathing exercise at the end of class.",
        points: [
          "Nāḍī Śodhana, Ujjāyī, Bhrāmarī, Bhastrikā and more",
          "Kumbhaka introduced progressively",
          "Bandhas and Mudrās integrated with breath",
        ],
        link: "Visit the Prāṇāyāma Center",
        href: "/pranayama-center-rishikesh",
      },
      {
        icon: Moon,
        title: "Classical Yoga Nidra",
        summary:
          "A guided session of systematic relaxation every afternoon, balancing the active practices of the day.",
        points: [
          "Body awareness and sensation awareness",
          "Relaxation methods from the syllabus",
          "Learn to guide Yoga Nidra as a teacher",
        ],
        link: "Explore Yoga Nidra",
        href: "/daily-classical-yoga-nidra-rishikesh",
      },
      {
        icon: Music,
        title: "Traditional Sanskrit Mantras",
        summary:
          "Daily OM chanting and Āratī, and mantra classes with attention to pronunciation, meaning and context.",
        points: [
          "Gāyatrī, Mahāmṛtyuñjaya, Asato Mā and Guru Mantra",
          "Sanskrit pronunciation, step by step",
          "Learn to lead group chanting",
        ],
        link: "Learn About Mantra Chanting",
        href: "/sanskrit-mantra-chanting-rishikesh",
      },
    ],
  },
  {
    kicker: "03",
    title: "Knowledge & Curriculum",
    cards: [
      {
        icon: BookOpen,
        title: "15-Subject Curriculum",
        summary:
          "One integrated curriculum connecting practice, understanding and teaching, not 15 separate classes.",
        points: [
          "Haṭha, Aṣṭāṅga, Alignment, Prāṇāyāma, Bandha, Mudrā, Ṣaṭkarma",
          "Meditation, Yoga Nidra, Mantra, Philosophy, Anatomy, Āyurveda",
          "Teaching Methodology and Teaching Practicum",
        ],
        link: "View the 15 Subjects",
        href: "/15-yogic-subjects-curriculum-rishikesh",
      },
      {
        icon: Library,
        title: "In-Depth Yogic Knowledge",
        summary:
          "Study yoga beyond postures: classical texts, philosophy and anatomy, connected with what you experience in practice.",
        points: [
          "Patañjali's Yoga Sūtras and the Pañca Kośa teaching",
          "Functional anatomy behind every cue",
          "Know → Understand → Experience → Apply → Reflect",
        ],
        link: "Go Deeper",
        href: "/in-depth-yogic-knowledge-and-understanding",
      },
      {
        icon: Layers,
        title: "The Five Kośas",
        summary:
          "The Taittirīya Upaniṣad's classical map of human experience, studied as a framework for inquiry rather than as five anatomical bodies.",
        points: [
          "Annamaya, Prāṇamaya, Manomaya, Vijñānamaya, Ānandamaya",
          "Connected with āsana, breath, meditation and study",
          "Traditional language kept distinct from scientific claims",
        ],
        link: "Explore the Five Kośas",
        href: "/five-koshas-panca-kosa-science-yoga",
      },
    ],
  },
  {
    kicker: "04",
    title: "Guidance & Growth",
    cards: [
      {
        icon: UserCheck,
        title: "Personal Attention & Mentorship",
        summary:
          "Observation, feedback and direct access to teachers throughout the day, with Acharya Siddhant overseeing each student's progress.",
        points: [
          "Individual guidance in āsana and Prāṇāyāma",
          "Personal feedback on your teaching",
          "Questions answered beyond class time",
        ],
        link: "How Personal Attention Works",
        href: "/personal-attention-in-yoga-training",
      },
      {
        icon: TrendingUp,
        title: "Measure Your Growth",
        summary:
          "A 3-tier framework to observe your development, because progress in yoga is more than flexibility.",
        points: [
          "Physical: stability, alignment, ease",
          "Energetic: breath awareness and rhythm",
          "Mental & Intellectual: concentration, understanding, teaching presence",
        ],
        link: "See the Growth Framework",
        href: "/measure-your-growth-in-yoga",
      },
      {
        icon: Sprout,
        title: "Professional Training & Personal Growth",
        summary:
          "Two journeys at once: developing as a practitioner and learning to guide others.",
        points: [
          "Consistent personal practice",
          "Clear, calm communication",
          "A respectful teacher presence (Maitrī)",
        ],
        link: "Explore Professional Growth",
        href: "/professional-yoga-teacher-and-personal-growth",
      },
      {
        icon: Heart,
        title: "24-Day Gratitude Practice",
        summary:
          "A daily reflection on family, teachers, challenges and service that invites humility and awareness throughout the training.",
        points: [
          "Four stages across 24 days",
          "Reflection, not forced positivity",
          "Connects gratitude with the role of a teacher",
        ],
        link: "About the Gratitude Practice",
        href: "/24-day-gratitude-practice-ego-dissolution",
      },
    ],
  },
  {
    kicker: "05",
    title: "Teaching & Certification",
    cards: [
      {
        icon: Presentation,
        title: "Teaching Methodology",
        summary:
          "Learn how to teach, not only what to teach: class preparation, cueing, voice, demonstration and observation.",
        points: [
          "Clear, concise instruction",
          "Class structure and sequencing",
          "Props, demonstration and teaching ethics",
        ],
        link: "Explore Teaching Methodology",
        href: "/yoga-teaching-methodology-course",
      },
      {
        icon: GraduationCap,
        title: "Practical Teaching Practicum",
        summary:
          "Every student plans and leads classes for their peers and receives feedback from teachers and classmates.",
        points: [
          "Prepare → Teach → Feedback → Reflect → Teach again",
          "A supportive place to make mistakes",
          "Builds confidence through repetition",
        ],
        link: "See the Practicum",
        href: "/practical-teaching-practicum-yoga-ttc",
      },
      {
        icon: BadgeCheck,
        title: "Certificate & Yoga Alliance Registration",
        summary:
          "A clear, honest pathway from our Registered Yoga School training to your RYT-200 application with Yoga Alliance.",
        points: [
          "RYS 200 = the school; RYT-200 = your teacher credential",
          "School certificate issued on successful completion",
          "You apply to Yoga Alliance yourself",
        ],
        link: "Understand the Certification Pathway",
        href: "/yoga-alliance-usa-certification-ryt200",
      },
    ],
  },
];

const glance = [
  { label: "Location", value: "Yoga Abhyas Ashram, Veerbhadra, Rishikesh" },
  { label: "200-Hour TTC", value: "24 days, residential" },
  { label: "Batch size", value: "10–15 students" },
  { label: "Daily classes", value: "8 core classes" },
  { label: "Curriculum", value: "15 core yogic subjects + daily Gratitude Practice" },
  { label: "Food", value: "Fresh vegetarian sattvic meals" },
  { label: "Accommodation", value: "Private and twin-sharing rooms" },
  { label: "Certification", value: "School certificate from a Yoga Alliance Registered Yoga School" },
  { label: "After the course", value: "100-day daily practice schedule" },
];

const suitsYou = [
  "You want to study yoga as a complete discipline",
  "You prefer a small group and close teacher contact",
  "You enjoy a structured daily routine",
  "You are ready for early mornings, simple living and sincere practice",
];

const notForYou = [
  "You are looking for a resort-style holiday",
  "You want a flexible schedule with lots of free time",
  "You want the fastest route to a certificate",
];

// Visible FAQ and FAQPage schema are built from this one list so they always match word for word.
const faqs = [
  {
    q: "What makes Siddhant School of Yoga different?",
    a: "Small batches of 10–15, a dedicated daily Prāṇāyāma session, three different āsana classes each day, a 15-subject curriculum and residential ashram life under the guidance of Acharya Siddhant.",
  },
  {
    q: "Is the school registered with Yoga Alliance?",
    a: "Yes. Siddhant School of Yoga is a Yoga Alliance Registered Yoga School (RYS 200, RYS 300 and RYS 500).",
  },
  {
    q: "Is the 200-Hour TTC suitable for beginners?",
    a: "Yes. It is open to all levels, and practices are introduced progressively.",
  },
  {
    q: "How long is the 200-Hour TTC?",
    a: "24 days, residential.",
  },
  {
    q: "What is included?",
    a: "Tuition, accommodation, sattvic meals and course material.",
  },
  {
    q: "Where is the school located?",
    a: "Plot No. 281, near Shiv Chowk, Nirmal Block-B, Visthapit Colony, Veerbhadra, Rishikesh, Uttarakhand 249202, India.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site.url}${PAGE_PATH}`,
      url: `${site.url}${PAGE_PATH}`,
      name: "Why Choose Siddhant School of Yoga",
      inLanguage: "en-US",
      author: { "@type": "Person", name: "Acharya Siddhant" },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Why Choose Siddhant School of Yoga",
          item: `${site.url}${PAGE_PATH}`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

function WhyCard({ card }) {
  const Icon = card.icon;
  return (
    <div className="group flex flex-col bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow">
      <span className="w-11 h-11 rounded-xl bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center mb-4">
        <Icon className="w-5 h-5" />
      </span>
      <h3 className="font-belleza text-xl sm:text-2xl font-normal text-[#1e2422] tracking-wide mb-2">
        {card.title}
      </h3>
      <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium mb-4">
        {card.summary}
      </p>
      <ul className="space-y-2 mb-5">
        {card.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-stone-700 leading-relaxed">
            <Check className="w-4 h-4 text-[#1c3b2b] shrink-0 mt-0.5" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <Link
        href={card.href}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#b85c00] hover:text-[#96490a] transition-colors"
      >
        {card.link}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

export default function WhyChooseUsPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        {/* Hero Banner */}
        <section className="relative min-h-fit sm:min-h-[500px] lg:h-[70vh] lg:max-h-[740px] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 pt-8 sm:pt-14 lg:pt-16 pb-20 sm:pb-28 lg:pb-36">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 max-w-xl text-left">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#142b1e]/80"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-[#1c3b2b] transition-colors"
                  >
                    <HomeIcon className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#142b1e]/50 shrink-0" />
                  <span className="text-[#142b1e] font-semibold">Why Us</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2] text-3xl sm:text-4xl lg:text-[48px] font-normal">
                  Why Choose Siddhant School of Yoga?
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#142b1e]/90 leading-relaxed max-w-md">
                  Yoga taught as a complete discipline — practice, breath, philosophy, anatomy and teaching — in a small residential community under Acharya Siddhant&apos;s guidance.
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {heroStats.map((s) => (
                    <li
                      key={s}
                      className="text-[11px] sm:text-xs font-figtree font-semibold px-3 py-1.5 rounded-full bg-white/90 text-[#1c3b2b] border border-[#1c3b2b]/20 shadow-2xs"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={TTC_200}>Explore the 200-Hour Yoga TTC</ButtonLink>
                  <ButtonLink href={TTC_200_DATES} variant="secondary">
                    Check Upcoming Dates
                  </ButtonLink>
                </div>
              </div>

              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/rooftop-yoga-poses-ganga-view-rishikesh.jpg"
                    alt="Small group of students practicing yoga on the rooftop shala at Siddhant School of Yoga, Rishikesh"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Answer box */}
        <section className="py-14 sm:py-16 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-[#f4efe6] rounded-3xl border border-[#e3dac9] p-6 sm:p-10 text-center">
              <Kicker>In Short</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
                What Makes Siddhant School of Yoga Different?
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Siddhant School of Yoga treats yoga teacher training as a complete education rather than an āsana course. Students live at Yoga Abhyas Ashram, follow a structured daily schedule of eight core classes, study 15 yogic subjects, practice Prāṇāyāma as a dedicated daily subject, and learn to teach through methodology and practicum, all in batches of 10–15 students.
              </p>
              <p className="mt-5 inline-block px-4 py-2 rounded-full bg-[#fdfbf7] border border-[#e3dac9] text-sm sm:text-base font-semibold text-[#1c3b2b] tracking-wide">
                Learn → Practice → Teach → Reflect
              </p>
            </div>
          </div>
        </section>

        {/* 19 Why Us sections, in five groups */}
        {groups.map((group, gi) => (
          <section
            key={group.title}
            className={`py-14 sm:py-16 lg:py-20 border-b border-[#e3dac9]/70 font-figtree ${
              gi % 2 === 0 ? "bg-[#f4efe6]" : "bg-[#fdfbf7]"
            }`}
          >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
              <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
                <Kicker>{group.kicker}</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                  {group.title}
                </h2>
                <HeadingDivider />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {group.cards.map((card) => (
                  <WhyCard key={card.title} card={card} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Acharya Siddhant */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-5">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-center">
              <div className="md:col-span-2 relative aspect-[4/5] max-w-sm mx-auto w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src={founder.image}
                  alt="Acharya Siddhant, founder and teacher of Siddhant School of Yoga in Rishikesh"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="md:col-span-3 text-center md:text-left">
                <Kicker>Founder &amp; Teacher</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  Learn Under the Guidance of Acharya Siddhant
                </h2>
                <HeadingDivider center={false} />
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4 mb-6">
                  Acharya Siddhant is the founder and teacher of Siddhant School of Yoga. His teaching emphasizes dedicated practice, scriptural study, practical understanding and personal guidance, and he teaches in the program himself.
                </p>
                <ButtonLink href="/yogi-siddhant-rishikesh-india" variant="secondary">
                  Meet Acharya Siddhant <ArrowRight className="w-4 h-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        {/* At a Glance */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8 lg:mb-10">
              <Kicker>Key Facts</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Siddhant School at a Glance
              </h2>
              <HeadingDivider />
            </div>

            <dl className="bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] overflow-hidden divide-y divide-[#e3dac9]">
              {glance.map((row) => (
                <div key={row.label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-5 sm:px-6 py-4">
                  <dt className="text-sm font-bold text-[#1c3b2b] tracking-wide">{row.label}</dt>
                  <dd className="sm:col-span-2 text-sm sm:text-[15px] text-stone-700 font-medium leading-relaxed">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Right for you? */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8 lg:mb-10">
              <Kicker>An Honest Fit</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Is Siddhant School Right for You?
              </h2>
              <HeadingDivider />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-6 sm:p-7">
                <h3 className="font-belleza text-xl sm:text-2xl font-normal text-[#1e2422] tracking-wide mb-4">
                  It may suit you if…
                </h3>
                <ul className="space-y-2.5">
                  {suitsYou.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-stone-700 leading-relaxed">
                      <Check className="w-4 h-4 text-[#1c3b2b] shrink-0 mt-1" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-6 sm:p-7">
                <h3 className="font-belleza text-xl sm:text-2xl font-normal text-[#1e2422] tracking-wide mb-4">
                  It may not suit you if…
                </h3>
                <ul className="space-y-2.5">
                  {notForYou.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-stone-700 leading-relaxed">
                      <span className="w-4 h-4 shrink-0 mt-1 text-[#b85c00] font-bold leading-4 text-center">–</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8 lg:mb-10">
              <Kicker>Questions</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Frequently Asked Questions
              </h2>
              <HeadingDivider />
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5 sm:p-6"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <h3 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] tracking-wide">
                      {faq.q}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-[#1c3b2b] shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-14 sm:py-16 bg-[#fdfbf7] font-figtree">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium">
              Study yoga as a complete discipline in a small residential community in Rishikesh.
            </p>
            <p className="mt-3 font-belleza text-xl sm:text-2xl text-[#1c3b2b] tracking-wide">
              Learn. Practice. Teach. Reflect. For Real Understanding.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href={TTC_200}>Explore the 200-Hour Yoga TTC</ButtonLink>
              <ButtonLink href={TTC_200_DATES} variant="secondary">
                Check Upcoming Dates
              </ButtonLink>
              <ButtonLink
                href={whatsappLink()}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

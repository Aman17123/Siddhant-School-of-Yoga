import { L, ttcButtons } from "./links";

const page = {
  slug: "15-yogic-subjects-curriculum-rishikesh",
  breadcrumb: "15-Subject Curriculum",
  seo: {
    title: "15 Comprehensive Yogic Subjects in 200-Hour TTC | Siddhant School of Yoga",
    description:
      "Explore the 15 core subjects covered in our 200-Hour Yoga TTC in Rishikesh, including Hatha, Ashtanga, Alignment, Pranayama, Anatomy, Ayurveda, Philosophy, Meditation and Teaching Methodology.",
    keywords: [
      "15 yogic subjects yoga ttc rishikesh",
      "yoga teacher training curriculum rishikesh",
      "comprehensive yoga TTC subjects",
      "200-hour yoga TTC syllabus Rishikesh",
      "yoga anatomy and philosophy Rishikesh",
      "yoga teacher training subjects",
    ],
  },
  hero: {
    title: "15 Comprehensive Yogic Subjects",
    intro: [
      "One integrated 200-Hour curriculum connecting practice, philosophy, anatomy, Prāṇāyāma, meditation and teaching methodology, supported by daily practice and reflection.",
    ],
    chips: ["24-Day Residential", "Rishikesh", "Integrated Yoga Curriculum"],
    buttons: ttcButtons({ label: "View Course Dates", href: L.ttc200Dates }),
    image: "/images/yoga-philosophy-satsang-class.png",
    imageAlt: "Yoga philosophy class during the 200-Hour TTC at Siddhant School of Yoga",
  },
  sections: [
    {
      kicker: "What Will You Study?",
      title: "The 15 Core Subjects",
      body: ["Additional daily practice (not one of the 15): the 24-Day Gratitude Practice."],
      cards: [
        {
          title: "01. Classical Haṭha Yoga",
          desc: "Posture practice, steady holds, breath awareness, foundational alignment and stability. Includes joint-movement series, Sūrya and Chandra Namaskāra and classical āsana groups (standing, seated, back bends, forward bends, twists, inversions, balances).",
          href: L.asana,
        },
        {
          title: "02. Aṣṭāṅga Vinyāsa",
          desc: "Dynamic movement coordinated with breath and structured sequencing, based on the Primary Series: Sūrya Namaskāra A and B, standing, seated and finishing postures.",
        },
        {
          title: "03. Alignment & Adjustments",
          desc: "How postures can be adapted and guided through alignment principles, props, verbal cues, appropriate adjustments and modifications.",
        },
        {
          title: "04. Classical Prāṇāyāma",
          desc: "Breath awareness, yogic breathing, Nāḍī Śodhana (levels 1–4), Ujjāyī, Bhrāmarī, Bhastrikā, Śītalī, Śītkārī, Kapālabhāti, inner and outer retention and an introduction to ratio breathing.",
          href: L.pranayama,
          linkLabel: "Prāṇāyāma Center",
        },
        {
          title: "05. Bandhas",
          desc: "Mūla, Uḍḍīyāna, Jālandhara and Mahā Bandha, and their relationship with Prāṇāyāma.",
        },
        {
          title: "06. Yogic Mudrās",
          desc: "Jñāna, Chin, Yoni, Bhairava, Bhairavī, Hṛdaya, Śāmbhavī, Nāsikāgra, Kākī, Yoga and Aśvinī Mudrā within Prāṇāyāma, meditation and Haṭha practice.",
        },
        {
          title: "07. Ṣaṭkarma",
          desc: "Introduction to traditional yogic cleansing: Jala Neti, Sūtra/catheter Neti, Kuñjal Kriyā, Agnisāra Kriyā and Kapālabhāti. Taught progressively under guidance.",
        },
        {
          title: "08. Classical Meditation",
          desc: "Ānāpāna, Vipassanā, Trāṭaka, chakra, mantra, silent and saguṇa meditation, developing concentration and witnessing awareness.",
        },
        {
          title: "09. Yoga Nidra & Relaxation",
          desc: "Body awareness, sensation awareness, Yoga Nidra level 1, and relaxation methods such as tense-and-relax, partial and full body relaxation.",
          href: L.nidra,
          linkLabel: "Classical Yoga Nidra",
        },
        {
          title: "10. Sanskrit Mantra Chanting",
          desc: "Pronunciation, OM chanting, Śānti Pāṭha and traditional mantras including Guru Mantra, Asato Mā, Gāyatrī and Mahāmṛtyuñjaya.",
          href: L.mantras,
          linkLabel: "Traditional Sanskrit Mantras",
        },
        {
          title: "11. Patañjali Yoga Philosophy",
          desc: "What yoga is, Abhyāsa and Vairāgya, the obstacles, the five Kleśas, Kriyā Yoga, Īśvara, the eight limbs, and the Pañca Kośa framework.",
          href: L.koshas,
          linkLabel: "The Five Kośas",
        },
        {
          title: "12. Functional Anatomy",
          desc: "Respiratory, digestive and circulatory systems, the heart, the spine (cervical, thoracic, lumbar, sacrum), joints and movement principles relevant to practice and teaching.",
        },
        {
          title: "13. Principles of Āyurveda",
          desc: "Fundamentals of Āyurveda, its relationship with yoga and daily life, and the three doshas (Vāta, Pitta, Kapha), Dinacaryā and sattvic lifestyle.",
        },
        {
          title: "14. Teaching Methodology",
          desc: "Class preparation and organization, conscious communication, clear and concise instruction, voice, props, demonstration and observation of individual students.",
          href: L.methodology,
          linkLabel: "Yoga Teaching Methodology",
        },
        {
          title: "15. Teaching Practicum",
          desc: "Students progressively practise teaching peers and receive feedback from teachers and classmates.",
          href: L.practicum,
          linkLabel: "Practical Teaching Practicum",
        },
      ],
    },
    {
      kicker: "Signature Daily Practice",
      title: "24-Day Gratitude Practice",
      body: [
        "Students participate in a daily gratitude and reflection practice during the residential training, creating a space for reflection, humility and awareness throughout the 24-day journey.",
      ],
      button: { label: "About the 24-Day Gratitude Practice →", href: L.gratitude, variant: "secondary" },
    },
    {
      kicker: "How It Fits Together",
      title: "One Integrated Curriculum — Not 15 Separate Classes",
      body: [
        "The subjects are designed to complement one another. Students do not simply study separate topics; they progressively connect practice, understanding and teaching.",
      ],
      highlight:
        "Āsana → Prāṇāyāma → Bandha & Mudrā → Meditation → Philosophy → Anatomy & Āyurveda → Teaching Methodology → Teaching Practicum",
      image: "/images/yoga-alignment-adjustment-with-straps-ttc-rishikesh.jpg",
      imageAlt: "Alignment and adjustment class with straps during the yoga TTC",
    },
    {
      kicker: "Three Dimensions",
      title: "Practice, Understanding and Teaching",
      cards: [
        { title: "Practice", desc: "Experience the techniques through personal practice." },
        { title: "Understanding", desc: "Study philosophy, anatomy, Prāṇāyāma, Āyurveda and related yogic knowledge." },
        { title: "Teaching", desc: "Learn to communicate, demonstrate and guide through methodology and practicum." },
      ],
    },
  ],
  faqs: [
    {
      q: "How many subjects are included in the 200-Hour TTC?",
      a: "15 core yogic subjects, supported by daily practices including the 24-Day Gratitude Practice.",
    },
    {
      q: "Is the curriculum only focused on physical yoga?",
      a: "No. It combines āsana with Prāṇāyāma, meditation, philosophy, anatomy, Āyurveda, mantra, teaching methodology and practicum.",
    },
    { q: "Will I practise teaching during the course?", a: "Yes. Teaching Practicum is a core subject; every student teaches their peers." },
    { q: "Is the curriculum suitable for beginners?", a: "Yes. The 200-Hour TTC is open to all levels, and subjects are introduced progressively." },
    { q: "How long is the 200-Hour TTC?", a: "24 days, residential." },
    { q: "Will I study yoga philosophy?", a: "Yes. Patañjali Yoga Philosophy is one of the core subjects." },
  ],
  cta: {
    text: "Study yoga as a complete discipline — through practice, philosophy, breath, anatomy, meditation, lifestyle and teaching.",
    buttons: [
      { label: "Explore the 200-Hour Yoga Teacher Training", href: L.ttc200 },
      { label: "View Course Dates", href: L.ttc200Dates },
      { label: "Ask About the Curriculum", href: L.contact },
    ],
  },
  related: [
    { label: "In-Depth Yogic Knowledge", href: L.knowledge },
    { label: "Daily 8-Class Schedule", href: L.schedule },
    { label: "Why Choose Siddhant School of Yoga", href: L.hub },
  ],
};

export default page;

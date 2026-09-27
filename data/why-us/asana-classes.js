import { L } from "./links";

const page = {
  slug: "three-daily-asana-classes-hatha-ashtanga-alignment",
  breadcrumb: "Three Daily Āsana Classes",
  seo: {
    title: "Three Daily Asana Classes | Siddhant School of Yoga Rishikesh",
    description:
      "Experience three distinct daily asana sessions at Siddhant School of Yoga: classical Haṭha, alignment and adjustment, and dynamic Aṣṭāṅga Vinyāsa.",
    keywords: [
      "three daily asana classes",
      "Hatha Yoga classes in Rishikesh",
      "Ashtanga Vinyasa training in Rishikesh",
      "yoga alignment and adjustment",
      "daily asana practice yoga teacher training",
    ],
  },
  hero: {
    title: "Three Daily Āsana Classes",
    intro: [
      "Classical Haṭha, Alignment & Adjustment and Aṣṭāṅga Vinyāsa every day, each developing steadiness, precision or breath–movement coordination.",
    ],
    buttons: [
      { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "Explore the 15 Yogic Subjects", href: L.curriculum },
    ],
    image: "/images/triangle-pose-garden-yoga-class-rishikesh.jpg",
    imageAlt: "Students in triangle pose during a Haṭha Yoga class in Rishikesh",
  },
  sections: [
    {
      kicker: "The Reason",
      title: "Why Three Daily Asana Classes?",
      body: [
        "Morning Haṭha Yoga develops sustained practice, steadiness and awareness. Alignment & Adjustment develops observation, props, modifications and appropriate adjustments. Aṣṭāṅga Vinyāsa develops breath–movement coordination, sequencing and focus. Together they give a broader framework for understanding and teaching āsana.",
      ],
    },
    {
      kicker: "Daily Structure",
      title: "The Three-Part Asana Structure",
      table: {
        head: ["Session", "Time", "Primary focus", "Learning dimension"],
        rows: [
          ["Classical Haṭha Yoga", "06:30 AM", "Sustained postures & awareness", "Steadiness, alignment and mindful practice"],
          ["Alignment & Adjustment", "12:00 PM", "Observation, props & adjustments", "Precision and individual guidance"],
          ["Aṣṭāṅga Vinyāsa", "06:15 PM", "Breath-linked movement & sequencing", "Coordination, discipline and dynamic practice"],
        ],
      },
    },
    {
      kicker: "06:30 AM",
      title: "Morning Classical Haṭha Yoga",
      body: [
        "The morning session provides space for sustained exploration of āsana: posture, breathing, body awareness, stability and ease, sustained attention and mindful transitions.",
      ],
      highlight: "Sthira Sukham Āsanam — “Posture should be steady and comfortable.” (Yoga Sūtra 2.46)",
      image: "/images/tree-pose-rooftop-mountain-view-yoga-retreat-rishikesh.jpg",
      imageAlt: "Tree pose on the rooftop during the morning Haṭha class",
    },
    {
      kicker: "12:00 PM",
      title: "Alignment & Adjustment: Learning to Observe",
      body: [
        "The midday session shifts the student from performing postures to observing them: basic alignment principles, blocks and belts, modifications, verbal instruction, appropriate hands-on adjustment and understanding differences between students.",
        "The objective is not to make every posture look identical, but to develop the ability to observe, understand and communicate.",
      ],
      image: "/images/yoga-alignment-adjustment-with-straps-ttc-rishikesh.jpg",
      imageAlt: "Alignment and adjustment class with straps",
      imageRight: true,
    },
    {
      kicker: "06:15 PM",
      title: "Aṣṭāṅga Vinyāsa: Breath, Movement and Discipline",
      body: [
        "The evening session introduces a dynamic relationship between breath and movement, based on the Primary Series: vinyāsa sequencing, Ujjāyī breathing, dṛṣṭi (gaze), transitions, concentration and consistent practice.",
      ],
      image: "/images/plank-pose-group-yoga-session-rishikesh.jpg",
      imageAlt: "Group Aṣṭāṅga Vinyāsa session in Rishikesh",
    },
    {
      kicker: "Practice → Observe → Understand → Teach",
      title: "Three Sessions, Three Learning Dimensions",
      cards: [
        { title: "Haṭha", desc: "Stay. Observe. Become steady." },
        { title: "Alignment", desc: "Observe. Understand. Refine." },
        { title: "Aṣṭāṅga", desc: "Breathe. Move. Coordinate." },
      ],
    },
    {
      kicker: "Becoming a Teacher",
      title: "From Personal Practice to Teaching",
      body: [
        "Teaching requires the ability to demonstrate clearly, observe students, give useful instructions, understand sequencing, coordinate breath and movement, and create a safe, focused environment. The three sessions give different contexts in which these skills develop.",
      ],
      button: { label: "Yoga Teaching Methodology →", href: L.methodology, variant: "secondary" },
    },
    {
      kicker: "The Bigger Picture",
      title: "Āsana as Part of a Larger Yoga Education",
      body: [
        "The three āsana sessions are one part of a broader curriculum that also includes Prāṇāyāma, meditation, Bandha, Mudrā, Ṣaṭkarma, philosophy, anatomy, Āyurveda, mantra, teaching methodology and practicum.",
      ],
      button: { label: "Explore all 15 Core Yogic Subjects →", href: L.curriculum, variant: "secondary" },
    },
  ],
  faqs: [
    { q: "Do I need to be flexible to join?", a: "No. The sessions are taught progressively, with props and modifications where appropriate." },
    {
      q: "Is Aṣṭāṅga too dynamic for beginners?",
      a: "Aṣṭāṅga is introduced step by step, starting with Sūrya Namaskāra A and B and the standing sequence.",
    },
    {
      q: "Are hands-on adjustments given?",
      a: "Appropriate adjustments may be offered. Tell teachers if you prefer verbal cues only or have an injury.",
    },
  ],
  cta: {
    text: "A posture can be demonstrated in seconds. Understanding it takes longer.",
    highlight: "For Real Understanding. Practice deeply. Study sincerely. Understand yoga.",
    buttons: [
      { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "See the Daily Schedule", href: L.schedule },
    ],
  },
  related: [
    { label: "Daily 8-Class Schedule", href: L.schedule },
    { label: "Intensive Daily Practice", href: L.intensive },
    { label: "Why Choose Siddhant School of Yoga", href: L.hub },
  ],
};

export default page;

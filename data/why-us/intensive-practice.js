import { L, ttcButtons } from "./links";

const page = {
  slug: "intensive-yoga-practice-rishikesh",
  breadcrumb: "Intensive Practice",
  seo: {
    title: "Intensive Daily Yoga Practice in Rishikesh | Siddhant School of Yoga",
    description:
      "Experience an intensive, structured daily sādhana in Rishikesh: morning meditation, three āsana classes, Prāṇāyāma, Yoga Nidra and evening practice — with progressive guidance, not strain.",
    keywords: [
      "intensive yoga practice rishikesh",
      "intensive yoga teacher training rishikesh",
      "daily sadhana rishikesh",
      "immersive yoga course india",
      "residential yoga practice rishikesh",
      "tapas yoga practice",
    ],
  },
  hero: {
    title: "Intensive Daily Yoga Practice",
    intro: [
      "Practice is the centre of every day: structured intensity, not strain, introduced progressively, balanced with rest and guided closely by teachers.",
    ],
    buttons: ttcButtons({ label: "View the Daily Schedule", href: L.schedule }),
    image: "/images/crow-pose-bakasana-ganga-river-rishikesh.jpg",
    imageAlt: "Student practicing crow pose by the Ganga in Rishikesh",
  },
  sections: [
    {
      kicker: "Definition",
      title: "What Does “Intensive Practice” Mean Here?",
      body: [
        "It means that practice is the centre of the day rather than one hour within it. Students typically take part in meditation, two ashram rituals, three āsana classes, a dedicated Prāṇāyāma session, Yoga Nidra and evening meditation, alongside study. Across the 24-day 200-Hour TTC, this daily repetition is what turns information into experience.",
      ],
    },
    {
      kicker: "At a Glance",
      title: "A Day of Practice",
      table: {
        head: ["Practice", "When", "Role in the day"],
        rows: [
          ["Silent meditation & OM chanting", "05:15–06:30 AM", "Morning foundation"],
          ["Classical Haṭha Yoga", "06:30 AM", "Āsana 1"],
          ["Prāṇāyāma, Bandha & Mudrā", "08:15 AM", "Breath & subtle practice"],
          ["Alignment & Adjustment", "12:00 PM", "Āsana 2"],
          ["Yoga Nidra", "03:00 PM", "Deep relaxation"],
          ["Meditation", "05:00 PM", "Concentration"],
          ["Aṣṭāṅga Vinyāsa", "06:15 PM", "Āsana 3"],
          ["Personal meditation", "09:00 PM", "Evening reflection"],
        ],
      },
    },
    {
      kicker: "Yogic Tradition",
      title: "Tapas: Disciplined Effort in the Yogic Tradition",
      body: [
        "In Patañjali's Yoga Sūtras, Tapas is one of the Niyamas — the willingness to engage sincerely and consistently with practice. At the ashram, Tapas is not about pushing through pain. It is about showing up each morning, practicing with attention, and continuing when the novelty has worn off.",
      ],
      highlight: "Discomfort is not automatically progress. Students learn to tell healthy challenge from unnecessary strain.",
      image: "/images/sunrise-meditation-pose-rishikesh.png",
      imageAlt: "Early morning sādhana at sunrise in Rishikesh",
    },
    {
      kicker: "Balance",
      title: "Intensity Balanced With Rest",
      body: [
        "Every intensive day includes counterbalances: an afternoon rest period, Yoga Nidra, sattvic meals at regular hours, night-time silence and a weekly day off. Dynamic and restorative practices alternate through the day so the body and mind can absorb the work.",
      ],
    },
    {
      kicker: "Step by Step",
      title: "Progressive, Not Forced",
      cards: [
        { title: "Āsana", desc: "Foundational versions first; advanced variations only when ready." },
        { title: "Prāṇāyāma", desc: "Breath awareness and regulation before longer retention." },
        { title: "Ṣaṭkarma", desc: "Introduced under guidance, never practiced unsupervised on day one." },
        { title: "Meditation", desc: "Short, guided sittings that lengthen through the course." },
      ],
    },
    {
      kicker: "Repeat → Observe → Refine → Understand",
      title: "Why Daily Repetition Matters",
      body: [
        "A technique understood once in a lecture is not yet learned. Practicing the same foundations every day — while observing what changes — is how students build the steadiness, familiarity and confidence they will later need as teachers.",
      ],
      image: "/images/seated-asana-group-practice-garden-rishikesh.jpg",
      imageAlt: "Group practicing seated āsana together in the garden",
      imageRight: true,
    },
    {
      kicker: "An Honest Fit",
      title: "Is an Intensive Practice Right for Me?",
      body: [
        "It may suit you if you want to make yoga the focus of your days, are ready for early mornings, and want the structure of a routine.",
        "If you have an injury or medical condition, speak with us before booking so we can discuss modifications. Teachers can suggest adaptations within their scope, but yoga instruction is not a substitute for medical advice.",
      ],
      button: { label: "Speak With Us", href: L.contact, variant: "secondary" },
    },
    {
      kicker: "After the Course",
      title: "The 100-Day Practice Schedule",
      body: [
        "Practicing in a group is easier than practicing alone. Graduates receive a structured 100-day daily practice schedule to carry the rhythm of the ashram into home life.",
      ],
    },
  ],
  faqs: [
    {
      q: "How many hours a day do students practice?",
      a: "Practice and study together fill most of the day, from about 05:15 AM to 07:30 PM, with meals and an afternoon rest in between.",
    },
    {
      q: "Do I need to be very fit?",
      a: "No. You need willingness and reasonable health. Practices are progressive and teachers offer modifications.",
    },
    {
      q: "What if I feel exhausted?",
      a: "Tell your teachers. Rest, modifications and the afternoon break are part of the design; sustainable practice matters more than pushing through.",
    },
    { q: "Is there a day off?", a: "Yes, usually one day per week." },
  ],
  cta: {
    text: "Make practice the centre of your day — and learn to sustain it.",
    buttons: ttcButtons(),
  },
  related: [
    { label: "Daily 8-Class Ashram Schedule", href: L.schedule },
    { label: "Three Daily Asana Classes", href: L.asana },
    { label: "Measuring Your Growth in Yoga", href: L.growth },
  ],
};

export default page;

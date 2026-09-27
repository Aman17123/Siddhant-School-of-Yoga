import { L } from "./links";

const page = {
  slug: "daily-classical-yoga-nidra-rishikesh",
  breadcrumb: "Yoga Nidra",
  seo: {
    title: "Daily Classical Yoga Nidra in Rishikesh | Siddhant School of Yoga",
    description:
      "Practice guided Yoga Nidra every afternoon during your yoga teacher training in Rishikesh. Learn body awareness, systematic relaxation and how to guide Yoga Nidra as a teacher.",
    keywords: [
      "yoga nidra rishikesh",
      "yoga nidra teacher training",
      "guided yoga nidra class",
      "yogic sleep rishikesh",
      "relaxation techniques yoga ttc",
      "yoga nidra 200 hour ttc",
    ],
  },
  hero: {
    title: "Daily Classical Yoga Nidra",
    intro: [
      "A guided session of systematic relaxation every afternoon at 03:00 PM, balancing the day's active practice while you learn to guide it.",
    ],
    buttons: [
      { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "View the Daily Schedule", href: L.schedule },
    ],
    image: "/images/child-pose-balasana-group-class-rishikesh.jpg",
    imageAlt: "Students resting in a quiet relaxation practice at the ashram",
  },
  sections: [
    {
      kicker: "Yogic Sleep",
      title: "What Is Yoga Nidra?",
      body: [
        "Often translated as “yogic sleep”, Yoga Nidra is a state between waking and sleeping in which the body rests deeply while awareness is maintained. A teacher's voice guides the practitioner through a sequence: settling, an intention (saṅkalpa), rotation of awareness through the body, breath awareness, sensations and visualization, then a gradual return.",
      ],
    },
    {
      kicker: "03:00 PM Every Day",
      title: "Why Daily Yoga Nidra in an Intensive Training?",
      body: [
        "Residential training days are full. A daily session of systematic relaxation in the middle of the afternoon gives the body and mind a structured period of rest between morning and evening practice. It also gives students repeated first-hand experience of a practice they may later teach.",
      ],
      image: "/images/meditation-class-indoor.jpg",
      imageAlt: "Indoor guided practice session at Siddhant School of Yoga",
    },
    {
      kicker: "Stages",
      title: "What You Practice and Learn",
      table: {
        head: ["Stage", "What it involves"],
        rows: [
          ["Body awareness", "Rotating attention through the body part by part"],
          ["Finding sensation", "Observing physical sensations without reacting"],
          ["Finding tension spots", "Noticing where the body holds tension"],
          ["Yoga Nidra level 1", "A complete guided practice from start to finish"],
        ],
      },
    },
    {
      kicker: "Syllabus",
      title: "Relaxation Techniques in the Syllabus",
      cards: [
        { title: "Muscular relaxation", desc: "Releasing tension group by group through the body." },
        { title: "Deep breathing", desc: "Slow, conscious breathing to settle the system." },
        { title: "Tense-and-relax method", desc: "Contracting and releasing muscles to feel the difference." },
        { title: "Partial body relaxation", desc: "Focused relaxation of one region at a time." },
        { title: "Full body relaxation", desc: "A complete, systematic relaxation of the whole body." },
        { title: "Mind relaxation", desc: "Letting attention rest while staying gently aware." },
      ],
      after: "In the 300-Hour TTC, Yoga Nidra continues through levels 1–4, alongside mindfulness, spine and prāṇa relaxation.",
    },
    {
      kicker: "For Future Teachers",
      title: "Learning to Guide Yoga Nidra",
      body: [
        "As future teachers, students learn how to structure a Yoga Nidra session, pace instructions, use the voice calmly and clearly, and prepare the room and students. This connects directly with Teaching Methodology and the Teaching Practicum.",
      ],
      button: { label: "Yoga Teaching Methodology →", href: L.methodology, variant: "secondary" },
    },
    {
      kicker: "Honest Boundaries",
      title: "What Yoga Nidra Is Not",
      body: [
        "Yoga Nidra is a relaxation and awareness practice. It is not a medical treatment or therapy, and we do not promise specific psychological or neurological effects. Students with a history of trauma or mental-health conditions are welcome to speak with teachers about how to approach the practice comfortably.",
      ],
    },
  ],
  faqs: [
    { q: "What if I fall asleep?", a: "It happens, especially at first. With repetition, most people find it easier to stay aware." },
    { q: "Do I need any experience?", a: "No. Yoga Nidra is fully guided and suitable for beginners." },
    { q: "Will I learn to teach it?", a: "Yes. Guiding Yoga Nidra and relaxation is part of the training." },
    { q: "When does Yoga Nidra take place?", a: "Every afternoon at 03:00 PM during the residential training." },
  ],
  cta: {
    text: "Rest deeply, stay aware, and learn to guide others into the same stillness.",
    buttons: [
      { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "Check Upcoming Dates", href: L.ttc200Dates },
    ],
  },
  related: [
    { label: "Daily 8-Class Ashram Schedule", href: L.schedule },
    { label: "The Five Kośas in Yoga", href: L.koshas },
    { label: "Yoga Teaching Methodology", href: L.methodology },
  ],
};

export default page;

import { L } from "./links";

const page = {
  slug: "yoga-teaching-methodology-course",
  breadcrumb: "Teaching Methodology",
  seo: {
    title: "Yoga Teaching Methodology | Siddhant School of Yoga Rishikesh",
    description:
      "Learn how to plan, sequence, cue, demonstrate and observe in a yoga class. Explore the teaching methodology taught in the 200-Hour and 300-Hour Yoga TTC in Rishikesh.",
    keywords: [
      "yoga teaching methodology",
      "how to teach yoga",
      "yoga class sequencing",
      "yoga cueing techniques",
      "yoga teacher training methodology rishikesh",
      "yoga demonstration and observation",
    ],
  },
  hero: {
    title: "Yoga Teaching Methodology",
    intro: [
      "Learn how to teach, not only what to teach: class preparation, sequencing, cueing, voice, demonstration and observing your students.",
    ],
    buttons: [
      { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "See the Teaching Practicum", href: L.practicum },
    ],
    image: "/images/instructor-guiding-class-riverside.jpg",
    imageAlt: "Yoga instructor demonstrating and guiding a class",
  },
  sections: [
    {
      kicker: "Definition",
      title: "What Is Teaching Methodology?",
      body: [
        "Teaching methodology covers the principles and techniques of guiding others through yoga: how a class is organized, how instructions are given, how practices are demonstrated, and how a teacher responds to different students. It is one of the 15 core subjects of the 200-Hour TTC.",
      ],
    },
    {
      kicker: "200-Hour Syllabus",
      title: "What You Learn in the 200-Hour TTC",
      table: {
        head: ["Topic", "What it covers"],
        rows: [
          ["Classroom preparation", "Preparing the space, props and yourself before class"],
          ["Classroom organization", "Arranging students so you can see and be seen"],
          ["Positive and conscious communication", "Respectful, encouraging language"],
          ["Clear instruction", "Giving cues that students can follow the first time"],
          ["Tone of voice", "Volume, pace and warmth"],
          ["How much to say", "Knowing when to speak and when to allow silence"],
          ["Being concise", "Short, precise cues"],
          ["Offering props", "When and how to suggest blocks, belts and bolsters"],
          ["Passive and active demonstration", "Demonstrating while observing, or demonstrating fully"],
          ["Observing individual students", "Seeing what each student needs"],
        ],
      },
    },
    {
      kicker: "300-Hour Syllabus",
      title: "Deeper Methodology in the 300-Hour TTC",
      body: [
        "Sequence fundamentals, posture modification, creating a supportive environment, the qualifications and role of a yoga teacher, principles of demonstration and assisting, the nature of adjustment and alignment, step-by-step class planning, schedule design, and support after the course.",
      ],
      button: { label: "Explore the 300-Hour TTC →", href: L.ttc300, variant: "secondary" },
    },
    {
      kicker: "Cueing",
      title: "The Anatomy of a Clear Cue",
      body: [
        "A useful instruction tells the student what to do in a sequence they can follow. Students practise turning long explanations into short, clear cues.",
      ],
      highlight: "Where to move → How to move → What to feel or notice → When to breathe",
      image: "/images/teacher-adjusting-warrior-pose-outdoor-class-rishikesh.jpg",
      imageAlt: "Teacher cueing a student in warrior pose",
    },
    {
      kicker: "Sequencing",
      title: "Structuring a Class",
      body: [
        "Students learn a basic class arc and how to adapt it to the time available and the level of the group.",
      ],
      steps: [
        { title: "Opening and centering", desc: "Arrive, settle the breath and set the tone for the class." },
        { title: "Warm-up", desc: "Joint movements and gentle flows to prepare the body." },
        { title: "Main practice", desc: "The core āsana sequence for the class." },
        { title: "Counter-poses", desc: "Neutralize and balance the body after the main work." },
        { title: "Prāṇāyāma or relaxation", desc: "Breath work or guided rest to integrate the practice." },
        { title: "Closing", desc: "A quiet close, chant or moment of reflection." },
      ],
    },
    {
      kicker: "Responsibility",
      title: "Teaching Ethics and Responsibility",
      body: [
        "A teacher respects students' boundaries, asks before hands-on adjustments, stays within their scope of practice, and recognizes when a student should seek medical advice.",
      ],
    },
    {
      kicker: "Next Step",
      title: "From Methodology to Practicum",
      highlight: "Study Methodology → Prepare a Class → Teach → Receive Feedback → Reflect → Improve",
      button: { label: "Practical Teaching Practicum →", href: L.practicum, variant: "secondary" },
    },
  ],
  faqs: [
    { q: "I've never taught before. Is that a problem?", a: "No. Methodology starts from the basics and builds progressively toward the practicum." },
    { q: "Will I learn to sequence my own classes?", a: "Yes. Class structure and sequencing are part of the methodology syllabus." },
    {
      q: "Is hands-on adjustment taught?",
      a: "Principles of alignment and appropriate adjustment are taught, with emphasis on consent and verbal cues.",
    },
  ],
  cta: {
    text: "Learn to teach with clarity, care and confidence.",
    buttons: [
      { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "See the Teaching Practicum", href: L.practicum },
    ],
  },
  related: [
    { label: "Professional Yoga Teaching & Personal Growth", href: L.professional },
    { label: "Three Daily Asana Classes", href: L.asana },
    { label: "15 Comprehensive Yogic Subjects", href: L.curriculum },
  ],
};

export default page;

import { L, ttcButtons } from "./links";

const page = {
  slug: "practical-teaching-practicum-yoga-ttc",
  breadcrumb: "Practical Teaching",
  seo: {
    title: "Practical Teaching Practicum in Yoga TTC | Siddhant School of Yoga",
    description:
      "Gain real teaching experience during your Yoga TTC in Rishikesh. Plan and lead classes for your peers, receive feedback from teachers and classmates, and refine your teaching.",
    keywords: [
      "practical teaching practicum yoga ttc",
      "yoga teaching practice rishikesh",
      "peer teaching yoga ttc",
      "yoga teacher training practicum",
      "teaching experience yoga course",
      "yoga ttc teaching feedback",
    ],
  },
  hero: {
    title: "Practical Teaching Practicum",
    intro: [
      "Every student plans and leads classes for fellow trainees, receives feedback from teachers and peers, and reflects on how to improve.",
    ],
    buttons: ttcButtons(),
    image: "/images/outdoor-garden-yoga-class-stretching-rishikesh.jpg",
    imageAlt: "A trainee teacher leading fellow students in an outdoor class",
  },
  sections: [
    {
      kicker: "Definition",
      title: "What Is the Teaching Practicum?",
      body: [
        "The practicum is the practical teaching component of the Yoga TTC and one of its 15 core subjects. Toward the later part of the residential course, students present themselves as teachers in front of the group, guiding practices from the curriculum and receiving structured feedback.",
      ],
    },
    {
      kicker: "Five Steps",
      title: "How the Practicum Works",
      steps: [
        { title: "Prepare", desc: "Plan a class or segment: sequence, timing, cues and any props needed." },
        { title: "Teach", desc: "Lead your fellow students through the practice you prepared." },
        { title: "Receive Feedback", desc: "Teachers and classmates share what worked and what could be clearer." },
        { title: "Reflect", desc: "Review your own teaching and identify one or two areas to focus on." },
        { title: "Teach Again", desc: "Apply the feedback in your next opportunity to teach." },
      ],
    },
    {
      kicker: "Content",
      title: "What You May Teach",
      body: [
        "Depending on the course stage and the practicum plan, students may lead segments of Haṭha Yoga, Aṣṭāṅga Vinyāsa sequences, Prāṇāyāma, relaxation or Yoga Nidra, and meditation.",
      ],
      image: "/images/seated-stretching-yoga-class-garden-rishikesh.jpg",
      imageAlt: "Students following a peer-led class in the garden",
    },
    {
      kicker: "Feedback",
      title: "What Feedback Covers",
      table: {
        head: ["Area", "Questions teachers look at"],
        rows: [
          ["Clarity", "Were instructions easy to follow?"],
          ["Voice", "Could everyone hear? Was the pace calm?"],
          ["Sequencing", "Did the class flow logically and safely?"],
          ["Timing", "Did the class fit the time available?"],
          ["Demonstration", "Did the demonstration support the cue?"],
          ["Observation", "Did the teacher watch students and respond?"],
          ["Presence", "Was the teacher steady and respectful?"],
        ],
      },
    },
    {
      kicker: "A Safe Space",
      title: "Why Peer Teaching Works",
      body: [
        "Teaching peers in a small group is a safe environment to make mistakes, try new cues and build confidence before teaching in the wider world. Being taught by classmates also sharpens students' own observation skills.",
      ],
    },
    {
      kicker: "It's Normal",
      title: "Nervous About Teaching?",
      body: [
        "Most students are at first. The practicum is designed for learning, not performance. Confidence develops through repetition and supportive feedback.",
      ],
      image: "/images/yoga-ttc-students-with-certificates-siddhant-school-rishikesh.jpg",
      imageAlt: "Yoga TTC graduates with their certificates at Siddhant School of Yoga",
      imageRight: true,
    },
    {
      kicker: "What Comes Next",
      title: "After the Practicum",
      body: [
        "The 200-Hour certificate is the start of a teaching journey. Graduates are encouraged to keep teaching, keep practicing (supported by the 100-day practice schedule) and keep learning, for example through the 300-Hour TTC.",
      ],
      button: { label: "Understand the Certification Pathway →", href: L.certification, variant: "secondary" },
    },
  ],
  faqs: [
    { q: "Will I get to teach during the course?", a: "Yes. Every student plans and leads classes for their peers during the Teaching Practicum." },
    { q: "Who gives feedback?", a: "Your teachers and classmates." },
    { q: "What if I make mistakes?", a: "That's expected. The practicum is where mistakes become learning." },
  ],
  cta: {
    text: "The best way to learn to teach is to teach — with support, feedback and room to grow.",
    buttons: ttcButtons(),
  },
  related: [
    { label: "Yoga Teaching Methodology", href: L.methodology },
    { label: "Professional Yoga Teaching & Personal Growth", href: L.professional },
    { label: "Yoga Alliance RYT-200 Certification Guide", href: L.certification },
  ],
};

export default page;

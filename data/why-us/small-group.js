import { L, ttcButtons } from "./links";
import { whatsappLink } from "@/data/siteData";

const page = {
  slug: "small-group-yoga-teacher-training-rishikesh",
  breadcrumb: "Small Group Size",
  seo: {
    title: "Small Group Yoga Teacher Training in Rishikesh | Siddhant School of Yoga",
    description:
      "Experience small-group Yoga Teacher Training in Rishikesh with 10–15 students per batch, personal guidance, practical teaching and residential learning at Siddhant School of Yoga.",
    keywords: [
      "small group yoga teacher training rishikesh",
      "small group yoga TTC Rishikesh",
      "small batch yoga teacher training Rishikesh",
      "intimate yoga TTC Rishikesh",
      "individual attention yoga TTC",
      "gurukula yoga teacher training",
    ],
  },
  hero: {
    title: "Small Group Yoga Teacher Training",
    intro: [
      "Batches of 10–15 students, so teachers can observe you closely, answer your questions and give individual feedback throughout the training.",
    ],
    chips: ["24-Day Residential", "Rishikesh", "10–15 Students per Batch"],
    buttons: ttcButtons(),
    image: "/images/group-meditation-namaste-yoga-class-rishikesh.jpg",
    imageAlt: "A small group of yoga teacher training students in Rishikesh",
  },
  sections: [
    {
      kicker: "Why It Matters",
      title: "Why Does Small Group Size Matter in Yoga Teacher Training?",
      body: [
        "A yoga teacher training is not only about attending classes. Students need opportunities to practice, ask questions, receive corrections, teach their peers and understand how to adapt yoga to different practitioners. With a 10–15 student cohort, teachers have more opportunity to observe individual students and provide direct feedback throughout the training.",
      ],
      highlight: "Fewer students create more opportunities for observation, interaction and individual guidance.",
      image: "/images/teacher-adjusting-warrior-pose-outdoor-class-rishikesh.jpg",
      imageAlt: "Teacher adjusting a student's warrior pose during an outdoor class",
    },
    {
      kicker: "The Difference",
      title: "What Changes When Your Yoga TTC Has 10–15 Students?",
      table: {
        head: ["Learning experience", "10–15 student cohort", "Large group environment"],
        rows: [
          ["Teacher observation", "More opportunity for individual observation", "Less individual observation time"],
          ["Questions", "More opportunity for dialogue", "Questions may be limited by time"],
          ["Alignment", "Individual feedback can be provided", "Individual feedback may be more limited"],
          ["Teaching practice", "More opportunities to teach and receive feedback", "Practice time shared among more students"],
          ["Community", "Students interact closely with their cohort", "Larger social environment"],
        ],
      },
    },
    {
      kicker: "In Every Class",
      title: "What a Small Cohort Makes Possible",
      cards: [
        { title: "During Āsana Practice", desc: "Teachers can observe individual alignment and provide appropriate verbal or physical guidance." },
        { title: "During Prāṇāyāma", desc: "Students can ask questions about technique, breathing patterns and practice." },
        { title: "During Teaching Practice", desc: "Every student gets turns to teach and receive feedback as they learn to guide others." },
        { title: "During Philosophy & Anatomy", desc: "Smaller discussions allow students to ask questions and explore concepts in greater depth." },
        { title: "During Residential Life", desc: "Students interact more closely with teachers and classmates beyond formal classes." },
        { title: "During Meditation", desc: "Teachers can notice how each student is settling into practice and offer guidance where needed." },
      ],
    },
    {
      kicker: "Tradition",
      title: "Learning Through the Gurukula Spirit",
      body: [
        "Traditional Indian education emphasized close teacher–student interaction, observation, practice and living close to the learning environment. A modern school cannot reproduce an ancient gurukula, but a small residential cohort keeps the essential principle: learning happens through relationship, not only through lectures.",
      ],
    },
    {
      kicker: "A Personal Journey",
      title: "More Than a Small Class",
      bullets: [
        "You are seen — teachers have more opportunity to observe your practice.",
        "You are heard — you have more opportunity to ask questions and discuss what you are learning.",
        "You practise teaching — you don't only watch demonstrations; you teach and receive feedback.",
        "You receive feedback — constructive feedback helps you understand where to improve.",
        "You become part of a community — a smaller cohort makes it easier to build meaningful relationships.",
      ],
    },
    {
      kicker: "Together",
      title: "An International Learning Community",
      body: [
        "Students from different countries and backgrounds come together to study yoga in Rishikesh, sharing classes, meals and daily life at Yoga Abhyas Ashram.",
      ],
      image: "/images/yoga-ttc-graduates-siddhant-school-of-yoga-rishikesh.jpg",
      imageAlt: "An international batch of yoga teacher training graduates at Siddhant School of Yoga",
      imageRight: true,
    },
    {
      kicker: "Practice → Observation → Understanding → Teaching",
      title: "Small Groups Are One Part of the Siddhant Approach",
      cards: [
        { title: "Classical Yoga", desc: "Haṭha Yoga, Aṣṭāṅga Vinyāsa, Prāṇāyāma and meditation." },
        { title: "Practical Learning", desc: "Alignment, adjustment and teaching methodology." },
        { title: "Personal Guidance", desc: "Teachers can observe individual students and provide feedback." },
        { title: "Residential Experience", desc: "Students live and learn together at Yoga Abhyas Ashram." },
      ],
    },
    {
      kicker: "An Honest Fit",
      title: "Is a Small-Group Yoga TTC Right for You?",
      compare: {
        left: {
          title: "It may suit you if you…",
          items: [
            "Want personal guidance",
            "Prefer interactive classes",
            "Want detailed feedback on your teaching",
            "Are nervous about teaching for the first time",
            "Prefer a close residential community",
            "Want to understand yoga rather than memorize sequences",
          ],
        },
        right: {
          title: "It may not be your priority if you…",
          items: [
            "Prefer very large social groups",
            "Prefer independent learning",
            "Are primarily looking for the lowest-cost certification",
            "Want a highly flexible, non-residential experience",
          ],
        },
      },
    },
  ],
  faqs: [
    { q: "How many students are in each batch?", a: "10–15 students per batch." },
    {
      q: "Why does Siddhant School keep batches small?",
      a: "To create more opportunity for individual observation, questions, feedback and teacher–student interaction.",
    },
    { q: "Will teachers correct my yoga postures?", a: "Teachers provide appropriate alignment guidance and corrections as part of the training." },
    { q: "Will I get teaching practice?", a: "Yes. Every student teaches during the Teaching Practicum." },
    { q: "Is the course suitable for beginners?", a: "Yes. The 200-Hour TTC is open to all levels; practices are introduced progressively." },
    { q: "How early should I book?", a: "Seats are limited because each batch is capped at 10–15 students." },
  ],
  cta: {
    text: "Learn yoga in a small, focused community. 10–15 students. 24 days. One immersive residential experience.",
    buttons: [
      { label: "Explore 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "View Course Dates", href: L.ttc200Dates },
      { label: "Ask a Question on WhatsApp", href: whatsappLink(), variant: "secondary" },
    ],
  },
  related: [
    { label: "Traditional Ashram Living in Rishikesh", href: L.ashram },
    { label: "Prāṇāyāma Center in Rishikesh", href: L.pranayama },
    { label: "Personal Attention & Mentorship", href: L.attention },
    { label: "Why Choose Siddhant School of Yoga", href: L.hub },
  ],
};

export default page;

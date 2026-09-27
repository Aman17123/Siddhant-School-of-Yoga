import { L } from "./links";
import { whatsappLink } from "@/data/siteData";

const page = {
  slug: "personal-attention-in-yoga-training",
  breadcrumb: "Personal Attention",
  seo: {
    title: "Personal Attention & Mentorship in Yoga TTC | Siddhant School Rishikesh",
    description:
      "Experience personal guidance, teacher feedback and direct mentorship in an intimate 10–15 student Yoga Teacher Training environment in Rishikesh.",
    keywords: [
      "personal attention in yoga training",
      "individualized yoga mentorship rishikesh",
      "personal posture guidance yoga ttc",
      "Acharya Siddhant mentorship",
      "one on one yoga teacher training guidance",
    ],
  },
  hero: {
    title: "Personal Attention & Mentorship",
    intro: [
      "In a 10–15 student cohort, teachers observe your practice, answer your questions and give feedback, with Acharya Siddhant overseeing your progress.",
    ],
    buttons: [
      { label: "Explore 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "Why Choose Siddhant School?", href: L.hub },
    ],
    image: "/images/teacher-adjusting-warrior-pose-outdoor-class-rishikesh.jpg",
    imageAlt: "A teacher giving an alignment cue to a student at Siddhant School of Yoga",
  },
  sections: [
    {
      kicker: "Definition",
      title: "What Does Personal Attention Mean in Yoga Teacher Training?",
      body: [
        "Personal attention means having meaningful opportunities to interact with teachers about your individual practice, questions and learning progress. In a 10–15 student cohort, teachers can spend more time observing, answering questions, offering feedback and discussing areas that need further practice.",
      ],
      highlight: "Observe → Guide → Practice → Improve",
    },
    {
      kicker: "How We Use It",
      title: "Why Does a Smaller Cohort Matter?",
      body: [
        "A smaller group does not automatically create a better educational experience. What matters is how the school uses it. At Siddhant School, we use the small-group format to encourage closer interaction between students and teachers.",
      ],
      button: { label: "Why Small Groups Matter →", href: L.groupSize, variant: "secondary" },
    },
    {
      kicker: "Every Student Is Different",
      title: "You Are More Than a Name on a Roster",
      body: [
        "Some students have practiced for years; some are new to structured practice. Some are comfortable with āsana but not philosophy; others are confident with theory but uncertain about teaching. Personal attention lets these differences become part of the learning conversation.",
      ],
      image: "/images/yoga-alignment-adjustment-with-straps-ttc-rishikesh.jpg",
      imageAlt: "Individual alignment guidance with straps during a yoga TTC class",
    },
    {
      kicker: "In Practice",
      title: "What Does Personal Guidance Look Like?",
      steps: [
        { title: "During Āsana Practice", desc: "Teachers observe and give appropriate guidance on alignment, movement, stability, breathing, awareness and transitions." },
        { title: "During Prāṇāyāma", desc: "Teachers clarify technique, sequencing, breathing awareness and appropriate pace." },
        { title: "During Philosophy Classes", desc: "Students can ask questions, discuss concepts and connect ideas with practice." },
        { title: "During Teaching Practicum", desc: "Feedback on clarity of instructions, voice, sequencing, timing, demonstration, observation, confidence and class structure." },
      ],
    },
    {
      kicker: "The Loop",
      title: "The Personal Feedback Loop",
      highlight: "Learn → Practice → Receive Feedback → Practice Again → Improve",
    },
    {
      kicker: "Individual Bodies",
      title: "Your Body Is Different From the Person Next to You",
      body: [
        "Students differ in mobility, strength, experience, coordination and learning pace. A useful teacher does not ask “Can everyone make the same shape?” but “How can this student understand and practice the principle appropriately?”",
      ],
    },
    {
      kicker: "Support",
      title: "Props Are Learning Tools, Not Signs of Failure",
      body: [
        "Blocks, belts and bolsters can support stability, awareness, alignment and accessibility. Teachers introduce props when they are relevant to the student's needs.",
      ],
      image: "/images/plank-pose-with-yoga-blocks.jpg",
      imageAlt: "Student using yoga blocks for support in plank pose",
      imageRight: true,
    },
    {
      kicker: "Beyond Class Time",
      title: "Direct Access to Teachers",
      body: [
        "Learning does not always happen during the scheduled class. Students can ask teachers about āsana, Prāṇāyāma, meditation, philosophy, teaching methodology, personal practice and life in the ashram. Because teachers and students share the residential environment, there are regular opportunities to seek clarification outside class time.",
      ],
      highlight: "Important questions should not go unanswered simply because the class has ended.",
    },
    {
      kicker: "Founder & Teacher",
      title: "Mentorship From Acharya Siddhant",
      body: [
        "Acharya Siddhant teaches in the program personally and oversees each student's progress through the course. Students can bring questions about their practice and development directly to him during the training.",
      ],
      button: { label: "Meet Acharya Siddhant →", href: L.acharya, variant: "secondary" },
      image: "/images/teachers/siddhant-ji-yoga-teacher-rishikesh.webp",
      imageAlt: "Acharya Siddhant, founder of Siddhant School of Yoga",
    },
    {
      kicker: "After Graduation",
      title: "Support Continues After the Course",
      body: [
        "Graduates receive a structured 100-day daily practice schedule to support home practice after returning from Rishikesh, and can stay in touch with the school with questions about their practice.",
      ],
    },
    {
      kicker: "Clear Expectations",
      title: "What Personal Attention Is — and Is Not",
      compare: {
        left: {
          title: "Personal attention is",
          items: [
            "Observation and feedback within classes",
            "Space to ask questions and discuss difficulties",
            "Guidance adapted to your level",
            "Feedback on your teaching practice",
          ],
        },
        right: {
          title: "Personal attention is not",
          items: [
            "Private one-to-one coaching for every session",
            "Medical, therapeutic or psychological treatment",
            "Making everyone's posture look identical",
            "A guarantee of any particular outcome",
          ],
        },
      },
    },
  ],
  faqs: [
    {
      q: "Will I get individual attention in a group class?",
      a: "Yes. Classes are taught to the group, but the 10–15 student size allows teachers to observe individuals and offer personal guidance.",
    },
    { q: "Can I talk to teachers outside class?", a: "Yes. Students can approach teachers during designated times in the residential environment." },
    { q: "Does Acharya Siddhant teach personally?", a: "Yes. Acharya Siddhant teaches in the program and oversees student progress." },
    {
      q: "I have an injury. Will teachers help me modify?",
      a: "Please inform the teachers before practice. They can suggest modifications within their scope, but yoga instruction is not a substitute for medical advice.",
    },
    { q: "Is there support after graduation?", a: "Graduates receive a 100-day daily practice schedule to continue practice at home." },
  ],
  cta: {
    text: "Learn where your teacher has time to see you, guide you and give you feedback.",
    buttons: [
      { label: "Explore 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "Check Upcoming Dates", href: L.ttc200Dates },
      { label: "Ask on WhatsApp", href: whatsappLink(), variant: "secondary" },
    ],
  },
  related: [
    { label: "Small Group Yoga Teacher Training", href: L.groupSize },
    { label: "Practical Teaching Practicum", href: L.practicum },
    { label: "Why Choose Siddhant School of Yoga", href: L.hub },
  ],
};

export default page;

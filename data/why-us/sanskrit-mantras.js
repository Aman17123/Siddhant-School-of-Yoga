import { L } from "./links";

const page = {
  slug: "sanskrit-mantra-chanting-rishikesh",
  breadcrumb: "Traditional Mantras",
  seo: {
    title: "Sanskrit Mantra Chanting in Rishikesh | Siddhant School of Yoga",
    description:
      "Learn traditional Sanskrit mantra chanting in Rishikesh: pronunciation, OM chanting, Śānti Pāṭha, Gāyatrī and Mahāmṛtyuñjaya, taught as part of daily ashram practice and the 200-Hour TTC.",
    keywords: [
      "sanskrit mantra chanting rishikesh",
      "mantra chanting yoga teacher training",
      "vedic mantra rishikesh",
      "gayatri mantra class",
      "om chanting ashram",
      "mantra yoga rishikesh",
      "sanskrit pronunciation yoga",
    ],
  },
  hero: {
    title: "Traditional Sanskrit Mantra Chanting",
    intro: [
      "Chant together every morning and study traditional Sanskrit mantras with attention to pronunciation, rhythm, meaning and context.",
    ],
    buttons: [
      { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "Explore the Mantra Yoga Retreat", href: L.mantraRetreat },
    ],
    image: "/images/havan-fire-ceremony-group.jpg",
    imageAlt: "Students chanting mantras during a havan ceremony at the ashram",
  },
  sections: [
    {
      kicker: "Definition",
      title: "What Is a Mantra?",
      body: [
        "In the yogic tradition, a mantra is a sacred sound, word or verse repeated with attention. The word is often explained as “that which protects (trā) the mind (man)”. Mantras are chanted aloud, softly, or silently, and are used for prayer, concentration and meditation.",
      ],
    },
    {
      kicker: "Every Day",
      title: "Mantra in Daily Ashram Life",
      table: {
        head: ["Time", "Practice"],
        rows: [
          ["06:00 AM", "Morning Āratī"],
          ["06:15 AM", "OM chanting"],
          ["11:00 AM", "Mantra class (rotating slot)"],
          ["06:00 PM", "Evening Āratī"],
        ],
      },
      after: "Classes also often open or close with a Śānti Pāṭha (peace invocation).",
    },
    {
      kicker: "200-Hour TTC",
      title: "Mantras Studied in the 200-Hour TTC",
      cards: [
        { title: "OM", desc: "The primordial sound, chanted daily as a foundation for all other mantra practice." },
        { title: "Guru Mantra (Gurur Brahmā…)", desc: "An invocation honoring the teacher as a source of knowledge." },
        {
          title: "Asato Mā Sad Gamaya",
          desc: "From the Bṛhadāraṇyaka Upaniṣad: “Lead me from the unreal to the real, from darkness to light, from death to immortality.”",
        },
        { title: "Gāyatrī Mantra", desc: "A Ṛg Vedic prayer for the illumination of the intellect, among the most widely chanted Sanskrit mantras." },
        { title: "Mahāmṛtyuñjaya Mantra", desc: "A Ṛg Vedic prayer addressed to Śiva, traditionally chanted for protection and freedom from fear." },
        { title: "Śānti Pāṭha", desc: "Peace invocations that open and close classes and study sessions." },
      ],
    },
    {
      kicker: "300-Hour TTC",
      title: "Further Mantras in the 300-Hour TTC",
      body: [
        "Sarve Bhavantu Sukhinaḥ, Oṁ Vakratuṇḍa Mahākāya, Yogena Cittasya (invocation to Patañjali), Oṁ Saha Nāvavatu, Oṁ Pūrṇamadaḥ and Svasti Prajābhyaḥ.",
      ],
      button: { label: "Explore the 300-Hour TTC →", href: L.ttc300, variant: "secondary" },
    },
    {
      kicker: "In Class",
      title: "What You Learn in Mantra Class",
      cards: [
        { title: "Sanskrit pronunciation", desc: "Vowels, consonants and their correct place of articulation." },
        { title: "Rhythm and meter", desc: "How verses are structured and chanted." },
        { title: "Meaning", desc: "Word-by-word understanding of each mantra." },
        { title: "Context", desc: "The text a mantra comes from and how it is traditionally used." },
        { title: "Vocal awareness", desc: "Using the breath and voice without strain." },
        { title: "Teaching", desc: "How to lead a group chant as a yoga teacher." },
      ],
    },
    {
      kicker: "Connections",
      title: "Mantra, Breath and Meditation",
      body: [
        "Chanting naturally lengthens the exhalation and gathers attention on sound. This is why mantra connects easily with Prāṇāyāma and meditation, and why mantra meditation is part of the meditation syllabus.",
      ],
      image: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
      imageAlt: "Students in meditation with Gyan Mudrā on a hilltop near Rishikesh",
    },
    {
      kicker: "No Experience Needed",
      title: "Do I Need to Know Sanskrit?",
      body: [
        "No. Mantras are taught step by step with transliteration and meaning. You do not need any previous experience of chanting or singing.",
      ],
    },
    {
      kicker: "Respect",
      title: "Respecting the Tradition",
      body: [
        "Mantras are presented within their traditional and devotional context. Students of every background are welcome; participation in devotional chanting is offered with respect for each student's own beliefs.",
      ],
    },
  ],
  faqs: [
    { q: "Is mantra chanting part of the 200-Hour TTC?", a: "Yes. Sanskrit Mantra Chanting is one of the 15 core subjects." },
    {
      q: "Do I have to chant if I am not religious?",
      a: "Mantra is taught as part of the yogic tradition. You can participate at the level you are comfortable with.",
    },
    { q: "Will I learn to lead chanting as a teacher?", a: "Yes. Pronunciation and leading a group chant are included." },
    { q: "Do you offer a dedicated mantra retreat?", a: "Yes, see the Mantra Yoga Retreat page." },
  ],
  cta: {
    text: "Chant with understanding: sound, meaning and tradition, practiced every day.",
    buttons: [
      { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "Mantra Yoga Retreat", href: L.mantraRetreat },
    ],
  },
  related: [
    { label: "15 Comprehensive Yogic Subjects", href: L.curriculum },
    { label: "Daily 8-Class Ashram Schedule", href: L.schedule },
    { label: "Mantra Yoga Retreat", href: L.mantraRetreat },
  ],
};

export default page;

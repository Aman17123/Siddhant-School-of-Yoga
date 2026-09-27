import { L, ADDRESS, MASTER_SCHEDULE } from "./links";
import { site } from "@/data/siteData";

const page = {
  slug: "traditional-ashram-living-in-rishikesh",
  breadcrumb: "Ashram Life",
  seo: {
    title: "Traditional Ashram Living in Rishikesh | Siddhant School of Yoga",
    description:
      "Experience traditional ashram life in Rishikesh at Yoga Abhyas Ashram. Discover daily yoga, meditation, Āratī, sattvic food, simple living and residential study near the Ganga.",
    keywords: [
      "traditional ashram living in rishikesh",
      "ashram life in rishikesh",
      "ashram stay in rishikesh",
      "yoga ashram in rishikesh",
      "ashram daily routine rishikesh",
      "yoga abhyas ashram rishikesh",
      "sattvic lifestyle rishikesh",
      "veerbhadra rishikesh yoga ashram",
    ],
  },
  hero: {
    title: "Traditional Ashram Living in Rishikesh",
    intro: [
      "Live, practice and study at Yoga Abhyas Ashram near the Ganga, where yoga, meditation, Āratī, sattvic food and self-study shape everyday life.",
    ],
    buttons: [
      { label: "Explore Our Programs", href: L.ttc200 },
      { label: "View the Daily Schedule", href: L.schedule },
    ],
    image: "/images/yoga-school-food-and-stay/siddhant-school-of-yoga-building-exterior.jpg",
    imageAlt: "Traditional ashram living at Yoga Abhyas Ashram in Rishikesh",
  },
  sections: [
    {
      kicker: "Beyond the Yoga Mat",
      title: "What Is Ashram Life at Siddhant School of Yoga?",
      body: [
        "Traditional ashram living is an opportunity to step away from the distractions of everyday life and experience yoga beyond the yoga mat. At Yoga Abhyas Ashram, students live, practice, study and share daily life in a structured residential environment.",
        "The day combines traditional practices with study and reflection, including meditation, morning and evening Āratī, classical Haṭha Yoga, Prāṇāyāma, Aṣṭāṅga Vinyāsa, philosophical study, gratitude practice and sattvic vegetarian meals.",
      ],
      highlight: "“Yoga is not only something we practice for an hour. It is a way of approaching the whole day.”",
      image: "/images/rooftop-yoga-poses-ganga-view-rishikesh.jpg",
      imageAlt: "Students practicing on the rooftop shala of Yoga Abhyas Ashram with a view of the Ganga",
    },
    {
      kicker: "Quick Facts",
      title: "Life at Yoga Abhyas Ashram",
      cards: [
        { title: "Location", desc: "Veerbhadra, Rishikesh, Uttarakhand" },
        { title: "Environment", desc: "Quiet residential surroundings near the Ganga" },
        { title: "Daily Practice", desc: "Haṭha Yoga, Prāṇāyāma, meditation, Āratī & Aṣṭāṅga Vinyāsa" },
        { title: "Food", desc: "Fresh vegetarian sattvic meals" },
        { title: "Accommodation", desc: "Private and twin-sharing rooms" },
        { title: "Community", desc: "Small residential groups" },
        { title: "Study", desc: "Yoga philosophy, anatomy, alignment & practical learning" },
        { title: "Silence", desc: "Night-time Mouna from 10 PM to 5 AM" },
        { title: "Guidance", desc: "Direct interaction with Acharya Siddhant and the teaching team" },
      ],
    },
    {
      kicker: "Location",
      title: "A Peaceful Residential Setting in Veerbhadra, Rishikesh",
      body: [
        "Yoga Abhyas Ashram is located in Visthapit Colony, Veerbhadra, Rishikesh, in a quieter residential area away from the busiest tourist areas. The location provides a peaceful setting for yoga practice, study, meditation and residential living, with rooftop views toward the Ganga and the surrounding Himalayan landscape.",
      ],
      bullets: [
        "Peaceful residential surroundings",
        "Close to the Ganga",
        "Away from busy tourist areas",
        "Rooftop yoga practice",
        "Natural surroundings suitable for residential study",
      ],
      button: { label: "View Location on Google Maps", href: site.mapUrl },
      image: "/images/meditation-by-ganga-river.png",
      imageAlt: "Meditation by the Ganga river near Veerbhadra, Rishikesh",
      imageRight: true,
    },
    {
      kicker: "Sample Daily Routine",
      title: "A Day at Yoga Abhyas Ashram",
      body: [
        "A typical day follows a simple rhythm of practice, study, meals, reflection and rest. Timings may vary according to the season, course curriculum and ashram activities.",
      ],
      table: { head: ["Time", "Activity"], rows: MASTER_SCHEDULE },
    },
    {
      kicker: "The Rhythm of the Day",
      title: "From Morning Sādhana to Evening Reflection",
      cards: [
        {
          title: "Morning",
          desc: "The morning begins in quiet surroundings with personal meditation, Āratī, mantra chanting, Haṭha Yoga and Prāṇāyāma.",
        },
        {
          title: "Learning",
          desc: "The day continues with philosophy, anatomy, Āyurveda, gratitude practice, alignment and practical study.",
        },
        {
          title: "Evening",
          desc: "Students return to meditation, evening Āratī and Aṣṭāṅga Vinyāsa before dinner and night-time silence.",
        },
      ],
    },
    {
      kicker: "Tradition",
      title: "The Traditional Foundations of Ashram Living",
      body: [
        "Traditional ashram living provides an environment for disciplined practice, study, reflection and a simpler way of living. It draws on the Niyamas of Patañjali's Yoga Sūtras: Śauca (cleanliness), Santoṣa (contentment), Tapas (disciplined effort), Svādhyāya (self-study) and Īśvara Praṇidhāna (surrender), supported by teacher guidance, a peaceful environment and dedicated practice.",
      ],
    },
    {
      kicker: "Lineage",
      title: "Ādinātha — The Traditional Roots of Haṭha Yoga",
      body: [
        "Within the traditional Haṭha Yoga lineage, Ādinātha, traditionally identified with Shiva, is revered as the primordial teacher of Haṭha Yoga. At Yoga Abhyas Ashram, the presence of Ādi Mahāyogi Shiva serves as a reminder of the traditional roots of the practice.",
      ],
      image: "/images/shiva-puja-ceremony.png",
      imageAlt: "Shiva puja ceremony at Yoga Abhyas Ashram, Rishikesh",
    },
    {
      kicker: "Fresh · Vegetarian · Sattvic · Nourishing",
      title: "Sattvic Food for Practice",
      body: [
        "Meals are vegetarian and freshly prepared using seasonal ingredients, grains, pulses and traditional spices. The purpose is not a luxury dining experience, but simple nourishment that supports daily practice and residential living.",
      ],
      image: "/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg",
      imageAlt: "Sattvic vegetarian thali with rice, dal and raita served at the ashram",
      imageRight: true,
    },
    {
      kicker: "Accommodation",
      title: "Simple, Clean & Comfortable Accommodation",
      cards: [
        { title: "Private Rooms", desc: "Clean, comfortable residential rooms for students seeking more privacy." },
        { title: "Twin-Sharing Rooms", desc: "A practical residential option for students who prefer to share." },
      ],
      after:
        "Facilities: attached bathroom, hot water, Wi-Fi, storage, natural light, clean bedding and regular housekeeping.",
    },
    {
      kicker: "Community Guidelines",
      title: "Living Together With Awareness",
      body: ["Living in an ashram means sharing space and respecting the rhythm of the community."],
      bullets: [
        "Mouna — night-time silence from 10 PM to 5 AM.",
        "Punctuality — students are encouraged to arrive on time and participate fully.",
        "Simple living — the environment is designed around practice rather than nightlife or luxury resort living.",
        "Substance-free — alcohol, tobacco, recreational drugs and outside non-vegetarian food are not permitted on the premises.",
      ],
    },
    {
      kicker: "Founder & Teacher",
      title: "Learn Under the Guidance of Acharya Siddhant",
      body: [
        "Acharya Siddhant is the founder and teacher of Siddhant School of Yoga. His teaching approach emphasizes dedicated practice, scriptural study, practical understanding and personal guidance. Because residential groups are intentionally kept small, students can receive direct interaction and guidance during their practice and study.",
      ],
      button: { label: "Meet Acharya Siddhant →", href: L.acharya, variant: "secondary" },
      image: "/images/teachers/siddhant-ji-yoga-teacher-rishikesh.webp",
      imageAlt: "Acharya Siddhant, founder of Siddhant School of Yoga",
    },
    {
      kicker: "Choosing Your Experience",
      title: "Ashram Living or Yoga Retreat?",
      compare: {
        left: {
          title: "Ashram Living",
          items: [
            "Structured daily routine",
            "Residential community",
            "Traditional practices",
            "Study and self-discipline",
            "Simple lifestyle",
          ],
        },
        right: {
          title: "Yoga Retreat",
          items: [
            "Shorter experience",
            "More flexible schedule",
            "Greater leisure time",
            "Wellness and relaxation focus",
            "Varies by retreat",
          ],
        },
      },
      after: "Different experiences serve different intentions. Choose the environment that matches what you are looking for.",
    },
    {
      kicker: "An Honest Fit",
      title: "Is Ashram Life Right for You?",
      compare: {
        left: {
          title: "You may enjoy ashram life if you…",
          items: [
            "Want a structured daily routine",
            "Want to study yoga seriously",
            "Prefer peaceful surroundings",
            "Enjoy simple vegetarian food",
            "Are interested in meditation and traditional practices",
            "Want direct interaction with teachers",
          ],
        },
        right: {
          title: "It may not suit you if you…",
          items: [
            "Want nightlife and parties",
            "Prefer a completely flexible schedule",
            "Expect a luxury resort",
            "Want unrestricted outside food",
            "Dislike early mornings and periods of silence",
          ],
        },
      },
    },
    {
      kicker: "Continue Your Yoga Journey",
      title: "Programs at Yoga Abhyas Ashram",
      links: [
        { label: "200-Hour Yoga Teacher Training", desc: "Build a strong foundation in classical yoga and teaching methodology.", href: L.ttc200 },
        { label: "300-Hour Yoga Teacher Training", desc: "Deepen your practice, knowledge and teaching skills.", href: L.ttc300 },
        { label: "Residential Yoga Retreats", desc: "Experience yoga, meditation and simple living through a shorter residential program.", href: L.retreats },
      ],
    },
  ],
  faqs: [
    {
      q: "Is the daily schedule compulsory?",
      a: "Core classes and lectures associated with your enrolled course are required. Personal meditation may be optional depending on the activity.",
    },
    {
      q: "Can beginners experience ashram life?",
      a: "Yes. Beginners are welcome in the programs that are open to them, including the 200-Hour Yoga TTC and residential retreats. The routine is structured, but practices are introduced progressively.",
    },
    {
      q: "What should I bring for an ashram stay?",
      a: "Modest, comfortable yoga clothing, toiletries, a water bottle, notebook and pen, a shawl or sweater, and comfortable walking footwear.",
    },
    { q: "Are private rooms available?", a: "Yes. Private and twin-sharing options are available, subject to availability." },
    { q: "Is vegetarian food provided?", a: "Yes. Vegetarian sattvic meals are provided as part of residential programs." },
    {
      q: "Can I leave the ashram during my stay?",
      a: "Students may leave during designated free or rest periods while respecting the schedule and returning for required sessions.",
    },
    { q: "Where is Yoga Abhyas Ashram?", a: ADDRESS },
  ],
  cta: {
    text: "Come with an open mind and an open heart. Spend time practicing, studying, reflecting and living simply in a peaceful residential environment near the Ganga.",
    buttons: [
      { label: "Explore Our Programs", href: L.ttc200 },
      { label: "Contact Siddhant School of Yoga", href: L.contact },
    ],
  },
  related: [
    { label: "Community & Family Environment", href: L.community },
    { label: "Daily 8-Class Schedule", href: L.schedule },
    { label: "Why Choose Siddhant School of Yoga", href: L.hub },
  ],
};

export default page;

import { L, MASTER_SCHEDULE } from "./links";

const page = {
  slug: "daily-8-ashram-classes-schedule-rishikesh",
  breadcrumb: "Daily 8-Class Schedule",
  seo: {
    title: "Daily 8-Class Ashram Schedule | Siddhant School of Yoga",
    description:
      "Explore the daily ashram routine at Siddhant School of Yoga in Rishikesh, including morning yoga, Prāṇāyāma, study, alignment, Yoga Nidra, meditation and evening practice.",
    keywords: [
      "daily 8 ashram classes schedule",
      "ashram daily routine Rishikesh",
      "yoga teacher training timetable Rishikesh",
      "daily yoga ashram schedule India",
      "residential yoga teacher training schedule",
      "Dinacaryā yoga ashram",
    ],
  },
  hero: {
    title: "Daily 8-Class Ashram Schedule",
    intro: [
      "A structured rhythm of meditation, āsana, Prāṇāyāma, study, Yoga Nidra and evening practice, from 05:15 AM to lights-out at 10 PM.",
    ],
    buttons: [
      { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "Explore Ashram Life", href: L.ashram },
    ],
    image: "/images/morning-meditation-namaste-outdoor-class-rishikesh.jpg",
    imageAlt: "Morning meditation class at the start of the ashram day",
  },
  sections: [
    {
      kicker: "In Short",
      title: "What Is the Daily Ashram Schedule at Siddhant School of Yoga?",
      body: [
        "The daily schedule combines yoga practice, Prāṇāyāma, meditation, mantra, study, alignment training, Yoga Nidra, meals, rest and evening practice. A typical day begins around 05:15 AM and ends with lights-out and silence at 10:00 PM, Monday to Saturday.",
      ],
    },
    {
      kicker: "Every Day",
      title: "The 8 Core Classes",
      table: {
        head: ["Class", "Time", "Focus"],
        rows: [
          ["1. Classical Haṭha Yoga", "06:30 AM", "Steadiness, posture, breath awareness"],
          ["2. Prāṇāyāma, Bandha & Mudrā", "08:15 AM", "Classical breathing and subtle practices"],
          ["3. Gratitude Practice", "10:00 AM", "Reflection, humility, awareness"],
          ["4. Mantra / Āyurveda / Anatomy (rotating)", "11:00 AM", "Sanskrit chanting and theory"],
          ["5. Alignment & Adjustment", "12:00 PM", "Observation, props, modifications"],
          ["6. Yoga Nidra", "03:00 PM", "Systematic relaxation and awareness"],
          ["7. Meditation / Philosophy", "05:00 PM", "Concentration and scriptural study"],
          ["8. Aṣṭāṅga Vinyāsa", "06:15 PM", "Breath-linked movement and sequencing"],
        ],
      },
      after:
        "Around these classes are the ashram practices: silent meditation (05:15 AM), morning Āratī (06:00 AM), OM chanting (06:15 AM), evening Āratī (06:00 PM) and personal meditation (09:00 PM).",
    },
    {
      kicker: "Sample Timetable",
      title: "Full Sample Day",
      body: ["This is a sample. Timings may vary by season, course and ashram activities."],
      table: { head: ["Time", "Activity"], rows: MASTER_SCHEDULE },
    },
    {
      kicker: "Practice → Study → Reflection → Rest → Practice",
      title: "The Rhythm Behind the Timetable",
      body: [
        "Morning hours are for the practices that benefit most from a quiet, fresh mind: meditation, āsana and Prāṇāyāma. Late morning and midday are for study and observation. The afternoon brings rest and Yoga Nidra. The evening returns to meditation, Āratī and dynamic practice before silence.",
      ],
      image: "/images/sunrise-prayer-himalayan-view-kunjapuri-rishikesh.jpg",
      imageAlt: "Sunrise prayer with a Himalayan view near Rishikesh",
    },
    {
      kicker: "Yogic Tradition",
      title: "Dinacaryā — Daily Routine in the Yogic Tradition",
      body: [
        "In Āyurveda and yoga, Dinacaryā is the practice of a consistent daily routine: rising early, practicing at regular times, eating at regular hours and resting well. The ashram schedule is a practical experience of this principle.",
      ],
    },
    {
      kicker: "Balance",
      title: "Rest Is Part of the Schedule",
      body: [
        "The schedule includes meals and an afternoon rest period between classes. One day each week is usually a day off for rest, laundry, local excursions or personal study.",
      ],
      image: "/images/yoga-retreat-students-at-waterfall-rishikesh.jpg",
      imageAlt: "Students on a weekly day-off excursion to a waterfall near Rishikesh",
      imageRight: true,
    },
    {
      kicker: "10 PM – 5 AM",
      title: "Evening Silence (Mouna)",
      body: [
        "From 10:00 PM to 5:00 AM the ashram observes silence. This supports rest and lets students begin the next morning in quiet.",
      ],
    },
  ],
  faqs: [
    {
      q: "Are all classes compulsory?",
      a: "Core classes of your enrolled course are required. Some personal practices, such as the 05:15 AM and 09:00 PM meditations, may be optional.",
    },
    { q: "Is there a day off?", a: "Yes, usually one day per week." },
    { q: "Is the schedule the same every day?", a: "The structure stays consistent; the 11:00 AM slot rotates between mantra, anatomy and Āyurveda." },
    {
      q: "Is the schedule too intense for beginners?",
      a: "It is full but progressive. Practices are introduced according to level, and rest periods are built into the day.",
    },
  ],
  cta: {
    text: "Experience yoga as the rhythm of the whole day, not just one hour of it.",
    buttons: [
      { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
      { label: "Explore Ashram Life", href: L.ashram },
    ],
  },
  related: [
    { label: "Three Daily Asana Classes", href: L.asana },
    { label: "Prāṇāyāma Center in Rishikesh", href: L.pranayama },
    { label: "Classical Yoga Nidra", href: L.nidra },
    { label: "Traditional Ashram Living", href: L.ashram },
  ],
};

export default page;

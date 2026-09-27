// Shared URLs for the "Why Us" pages, so every page links to the same slugs.
export const L = {
  hub: "/why-choose-siddhant-school-of-yoga",
  ttc200: "/200-hour-yoga-teacher-training-in-rishikesh-india",
  ttc200Dates: "/200-hour-yoga-teacher-training-in-rishikesh-india#dates-fees",
  ttc300: "/300-hour-yoga-teacher-training-in-rishikesh-india",
  retreats: "/yoga-meditation-retreat-in-rishikesh-india",
  pranayamaRetreat: "/pranayama-retreat-rishikesh-india",
  mantraRetreat: "/mantra-yoga-meditation-retreat-rishikesh",
  acharya: "/yogi-siddhant-rishikesh-india",
  contact: "/contact",

  ashram: "/traditional-ashram-living-in-rishikesh",
  pranayama: "/pranayama-center-rishikesh",
  groupSize: "/small-group-yoga-teacher-training-rishikesh",
  curriculum: "/15-yogic-subjects-curriculum-rishikesh",
  growth: "/measure-your-growth-in-yoga",
  professional: "/professional-yoga-teacher-and-personal-growth",
  attention: "/personal-attention-in-yoga-training",
  knowledge: "/in-depth-yogic-knowledge-and-understanding",
  asana: "/three-daily-asana-classes-hatha-ashtanga-alignment",
  schedule: "/daily-8-ashram-classes-schedule-rishikesh",
  community: "/family-environment-ashram-rishikesh",
  intensive: "/intensive-yoga-practice-rishikesh",
  mantras: "/sanskrit-mantra-chanting-rishikesh",
  nidra: "/daily-classical-yoga-nidra-rishikesh",
  methodology: "/yoga-teaching-methodology-course",
  practicum: "/practical-teaching-practicum-yoga-ttc",
  certification: "/yoga-alliance-usa-certification-ryt200",
  koshas: "/five-koshas-panca-kosa-science-yoga",
  gratitude: "/24-day-gratitude-practice-ego-dissolution",
};

export const ADDRESS =
  "Plot No. 281, near Shiv Chowk, Nirmal Block-B, Visthapit Colony, Veerbhadra, Rishikesh, Uttarakhand 249202, India.";

// The master daily schedule used across all Why Us pages.
export const MASTER_SCHEDULE = [
  ["05:15 AM", "Personal silent meditation"],
  ["06:00 AM", "Morning Āratī"],
  ["06:15 AM", "OM chanting"],
  ["06:30 AM", "Classical Haṭha Yoga"],
  ["08:15 AM", "Prāṇāyāma, Bandha & Mudrā"],
  ["09:30 AM", "Sattvic breakfast"],
  ["10:00 AM", "Gratitude practice"],
  ["11:00 AM", "Mantra / Āyurveda / Anatomy"],
  ["12:00 PM", "Alignment & Adjustment"],
  ["01:30 PM", "Sattvic lunch"],
  ["03:00 PM", "Yoga Nidra"],
  ["05:00 PM", "Meditation / Philosophy"],
  ["06:00 PM", "Evening Āratī"],
  ["06:15 PM", "Aṣṭāṅga Vinyāsa"],
  ["07:30 PM", "Dinner"],
  ["09:00 PM", "Personal meditation"],
  ["10:00 PM", "Lights out · Mouna until 5:00 AM"],
];

export const ttcButtons = (second = { label: "Check Upcoming Dates", href: L.ttc200Dates }) => [
  { label: "Explore the 200-Hour Yoga TTC", href: L.ttc200 },
  second,
];

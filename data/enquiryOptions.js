export const courseOptions = [
  // Yoga TTC
  "Online 200 Hour Yoga TTC from Rishikesh",
  "100 Hour Yoga TTC in Rishikesh",
  "200 Hour Yoga TTC in Rishikesh",
  "300 Hour Yoga TTC in Rishikesh",
  "500 Hour Yoga TTC in Rishikesh",
  "500hrs Yoga & Ayurveda TTC in Rishikesh",
  // Kundalini Yoga
  "100 Hour Kundalini Yoga TTC in Rishikesh",
  "200 Hour Kundalini Yoga TTC in Rishikesh",
  "300 Hour Kundalini Yoga TTC in Rishikesh",
  "500 Hour Kundalini Yoga TTC in Rishikesh",
  // Yoga Retreat
  "Yoga for Beginners in Rishikesh",
  "Yoga & Meditation Retreat in Rishikesh",
  "07 Days Yoga & Meditation Retreat in Rishikesh",
  "Kundalini Retreat in Rishikesh",
  "Pranayama Retreat in Rishikesh",
  "Vipassana Retreat in Rishikesh",
  "Detox Retreat in Rishikesh",
  "3 Days Detox Retreat in Rishikesh",
  "Mantra Yoga Retreat in Rishikesh",
  "Yoga & Ayurveda Retreat in Rishikesh",
  "Meditation & Pranayama Retreat in Rishikesh",
  "Not sure yet — please advise",
];

export const hearAboutOptions = [
  "Online Search (Google / Internet)",
  "AI Recommendation (ChatGPT, Claude, etc.)",
  "Social Media (Instagram / Facebook)",
  "Siddhant School of Yoga Ex-Student",
  "Recommended by Friends / Family",
];

export const accommodationOptions = [
  "Triple Sharing Room",
  "Shared / Twin Room",
  "Private Room",
  "Not Sure Yet",
];

export const experienceOptions = [
  "Complete Beginner",
  "Some Experience (Less Than 1 Year)",
  "Intermediate (1–3 Years)",
  "Advanced (3+ Years)",
  "Certified Yoga Teacher",
];

// Returns the current month plus the next 11 months (rolling 12-month window),
// each labeled with its year (e.g. "October 2026"). Since it's computed fresh
// from the real date every time it's called, the window automatically shifts
// forward by one month as soon as the calendar rolls over — no manual updates.
export function getMonthOptions() {
  const now = new Date();
  const months = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(d.toLocaleString("en-US", { month: "long", year: "numeric" }));
  }
  return months;
}

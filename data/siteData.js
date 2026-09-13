export const site = {
  name: "Siddhant School of Yoga",
  shortName: "SSY Rishikesh",
  tagline: "Discover yourself by yoga and live a peaceful life.",
  description:
    "Officially registered Yoga School in Rishikesh, India approved by Yoga Alliance USA (RYS 200, 300, 500). Offering authentic 100, 200, 300, 500-hour Yoga Teacher Training, Kundalini TTC & Transformational Retreats.",
  url: "https://siddhantschoolofyoga.com",
  phone: "+91 8449785755",
  phoneFormatted: "+91-8449785755",
  whatsappNumber: "+918449785755",
  email: "siddhantschoolofyoga@gmail.com",
  address: "Plot No. 281, Near Shiva Temple, Nirmal Block-B, Vistapit, Veerbhadra, Rishikesh, Uttarakhand, India 249202",
  city: "Rishikesh",
  state: "Uttarakhand",
  country: "India",
  postalCode: "249202",
  mapUrl: "https://maps.google.com/?q=Siddhant+School+of+Yoga+Rishikesh",
  socials: {
    facebook: "https://www.facebook.com/siddhantyog/",
    instagram: "https://www.instagram.com/siddhant.yoga/",
    youtube: "https://www.youtube.com/c/SiddhantSchoolofYoga",
    twitter: "https://twitter.com/siddhantyoga?lang=en",
  },
  stats: [
    { value: "5,000+", label: "Graduated Yogis", sub: "from 60+ countries" },
    { value: "15+", label: "Years Legacy", sub: "Himalayan tradition" },
    { value: "RYS 500", label: "Yoga Alliance USA", sub: "globally accredited" },
    { value: "4.9★", label: "Google Rating", sub: "based on 380+ reviews" },
  ],
};

export function whatsappLink(message) {
  const text = encodeURIComponent(
    message || "Hi Siddhant School of Yoga, I would like to inquire about your upcoming Yoga Teacher Training courses and Retreats in Rishikesh."
  );
  return `https://wa.me/918449785755?text=${text}`;
}

export const founder = {
  name: "Acharya Siddhant",
  role: "Founder & Spiritual Director",
  image: "/images/acharya-siddhant.jpg",
  subtitle: "Master of Hatha, Ashtanga & Classical Pranayama",
  bio: `Acharya Siddhant was born and raised in the sacred land of the Himalayas. Guided by living realized masters and ancient yogic scriptures, he founded Siddhant School of Yoga with a revolutionary vision: to restore authentic Vedic yoga as a path for complete inner and outer growth rather than superficial exercise.

He pioneered the world's first Pranayama-focused Teacher Training curriculum, recognizing that 'Prana' is the essence of life and the bridge to deep meditation. Under his personal guidance, thousands of international seekers have transformed their practice, mastered rhythmic breathing, and integrated a lifelong 100-day yogic practice schedule.`,
  quote: "Yoga is not an option, yoga is a lifestyle to discover your true self before you end life. It is a journey from darkness to light, from suffering to bliss, and from thoughts to thoughtlessness.",
  teachings: [
    "World's first Pranayama-centered curriculum teaching the subtle science of breath and nadis.",
    "The revolutionary 100-day daily post-course practice schedule ensuring lifelong self-discipline.",
    "Scientific parameters to objectively measure physical, mental, and intellectual growth.",
    "Living immersion into gratitude, mantra resonance, and classical Himalayan wisdom.",
  ],
};

export const teachers = [
  {
    name: "Acharya Siddhant",
    role: "Spiritual Master & Philosophy",
    exp: "18+ Years Experience",
    specialty: "Yoga Philosophy, Pranayama & Kundalini Awakening",
    image: "/images/acharya-siddhant.jpg",
    bio: "Deeply versed in ancient yogic scriptures, Patanjali Yoga Sutras, and classical Hatha texts.",
  },
  {
    name: "Yogi Pradeep Singh",
    role: "Lead Hatha & Ashtanga Instructor",
    exp: "10+ Years Experience",
    specialty: "Asana Alignment, Anatomy & Adjustments",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
    bio: "Expert in biomechanics, therapeutic alignment, and traditional Vinyasa sequencing.",
  },
  {
    name: "Yogini Sunita Sharma",
    role: "Meditation & Mantra Guru",
    exp: "12+ Years Experience",
    specialty: "Vedic Chanting, Yoga Nidra & Sound Healing",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    bio: "Dedicated practitioner of Nada Yoga, guiding students into deep meditative resonance.",
  },
  {
    name: "Dr. Arvind Bhatt",
    role: "Yoga Anatomy & Ayurveda Doctor",
    exp: "14+ Years Experience",
    specialty: "Yogic Physiology, Dosha Balancing & Nutrition",
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=600&q=80",
    bio: "Bridging modern human anatomy and biochemistry with timeless Ayurvedic science.",
  },
];

export const testimonials = [
  {
    name: "Elena Rostova",
    country: "Germany",
    course: "200-Hour Yoga TTC",
    rating: 5,
    text: "My experience at Siddhant Yoga completing my 200h YTT was one of the best experiences of my life. Upon deciding to go to India, I wasn't sure which school to choose. A friend recommended Acharya Siddhant and it exceeded all my expectations. The depth of Pranayama and philosophy transformed my understanding completely. I felt like family from day one!",
    date: "November 2024",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Marcus Aurelius Lindqvist",
    country: "Sweden",
    course: "300-Hour Advanced TTC",
    rating: 5,
    text: "It is impossible to overrate the experience I had in the Yoga Teacher Training with Siddhant and his crew of competent teachers. I didn't know there is a place on earth where all my spiritual questions could be answered so clearly and practically. Siddhant pours 100% of his energy into every student.",
    date: "January 2025",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Camille Dupont",
    country: "France",
    course: "100-Hour Kundalini TTC",
    rating: 5,
    text: "I stumbled across Siddhant School of Yoga while I was one second from booking another school in Rishikesh, and I have zero regrets! The ashram vibe is peaceful and authentic, the sattvic food is cooked with love, and the Kundalini practices awakened something profound in me. Forever grateful.",
    date: "February 2025",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "David Chen",
    country: "Canada",
    course: "7-Day Meditation & Detox Retreat",
    rating: 5,
    text: "The retreat gave me the mental reset I desperately needed. Waking up to morning chants by the Ganges, practicing authentic Pranayama, and learning directly from Acharya Siddhant restored my vitality. The 100-day schedule I received continues to guide my daily mornings back home.",
    date: "October 2024",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  },
];

export const faqs = [
  {
    q: "Is Siddhant School of Yoga certified with Yoga Alliance USA?",
    a: "Yes! Siddhant School of Yoga (SSY) is an officially recognized Registered Yoga School (RYS 200, RYS 300, and RYS 500) with Yoga Alliance USA. Upon graduation, you are eligible to register as a Registered Yoga Teacher (RYT) and teach worldwide.",
  },
  {
    q: "Can a beginner join the Yoga Teacher Training courses?",
    a: "Absolutely. Our 100-hour and 200-hour TTC programs are designed specifically to take students from foundational principles up to advanced understanding and teaching methodology. We meet every student at their current physical and spiritual level.",
  },
  {
    q: "What is included in the course fee?",
    a: "The fee includes complete course tuition, Yoga Alliance certification, clean private or shared accommodation with mountain/ashram views, 3 nutritious sattvic vegetarian meals daily, herbal teas, course manuals, yogic cleansing kits (kriyas), and sacred weekend excursions in Rishikesh.",
  },
  {
    q: "What makes Siddhant School of Yoga different from other Rishikesh schools?",
    a: "We are the first school to center training on authentic Pranayama & Rhythmic Breath as the root of meditation and physical health. Furthermore, we provide every graduate with a personalized 100-day daily practice schedule and measurable growth parameters, ensuring your transformation lasts a lifetime.",
  },
  {
    q: "What kind of visa do I need to attend yoga training in India?",
    a: "Most international students travel on an Indian Tourist e-Visa (available online for 30 days, 1 year, or 5 years). It is simple and fast to apply online and covers all course and retreat durations.",
  },
  {
    q: "What accommodation and food arrangements are provided?",
    a: "Our ashram campus in Rishikesh provides serene, clean rooms with private bathrooms, hot water, and Wi-Fi. We serve 3 wholesome, freshly prepared vegetarian sattvic meals daily, designed specifically to nourish your body and support intensive yoga practice.",
  },
];

export const facilities = [
  {
    title: "Sacred Yoga Shala",
    desc: "Spacious, sunlit wooden yoga hall equipped with mats, blocks, bolsters, belts, and meditation cushions.",
    icon: "Sparkles",
  },
  {
    title: "Sattvic Yogic Kitchen",
    desc: "Fresh, organic Ayurvedic vegetarian meals prepared three times daily to balance doshas and fuel your practice.",
    icon: "Utensils",
  },
  {
    title: "Peaceful Himalayan Stay",
    desc: "Comfortable private and shared rooms with attached modern bathrooms, 24/7 hot water, and tranquil mountain vistas.",
    icon: "Home",
  },
  {
    title: "Mother Ganga & Excursions",
    desc: "Steps away from the sacred Ganges river with weekly sunrise beach yoga, Ganga Aarti, and Himalayan temple visits.",
    icon: "Waves",
  },
];

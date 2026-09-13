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
  googleSearchUrl: "https://www.google.com/search?q=siddhant+school+of+yoga",
  googleReviewsCount: "48",
  googleRating: "4.9",
  stats: [
    { value: "5,000+", label: "Graduated Yogis", sub: "from 60+ countries" },
    { value: "15+", label: "Years Legacy", sub: "Himalayan tradition" },
    { value: "RYS 500", label: "Yoga Alliance USA", sub: "globally accredited" },
    { value: "4.9★", label: "Google Rating", sub: "48 Google reviews" },
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
    name: "Siddhant Ji",
    role: "Spiritual Master & Founder",
    exp: "18+ Years Sadhana",
    specialty: "Yoga Philosophy, Meditation & Pranayama",
    image: "/images/teachers/siddhant-ji-yoga-teacher-rishikesh.webp",
    bio: "Deeply steeped in Himalayan sadhana, bridging classical scriptures, Patanjali Sutras, and authentic Kumbhaka breath science.",
  },
  {
    name: "Manpreet",
    role: "Meditation & Mantra Guru",
    exp: "15+ Years Practice",
    specialty: "Meditation, Mantra Chanting & Ayurveda",
    image: "/images/teachers/manpreet-yoga-teacher-rishikesh.webp",
    bio: "Devoted yoga and spiritual practitioner for over 15 years, specializing in Ayurveda, Naturopathy, and Mantra Chanting.",
  },
  {
    name: "Sandeep",
    role: "Mantra Science & Alignment",
    exp: "5+ Years Experience",
    specialty: "Mantra Science, Fire Ceremonies & Hatha",
    image: "/images/teachers/sandeep-yoga-teacher-rishikesh.webp",
    bio: "Specialized in Sanskrit, Vedas, Gita, Upanishads & conducting sacred fire ceremonies (Yajnas) with body alignment.",
  },
  {
    name: "Hemlata",
    role: "Yoga Anatomy & Physiology",
    exp: "Lead Physiotherapist",
    specialty: "Yoga Anatomy, Biomechanics & Therapy",
    image: "/images/teachers/hemlata-yoga-anatomy-teacher-rishikesh.webp",
    bio: "Professional physiotherapist in Rishikesh with command over human anatomy, physiology, and therapeutic yogic biomechanics.",
  },
  {
    name: "Vishal",
    role: "Hatha & Ashtanga Master",
    exp: "Master in Yogic Science",
    specialty: "Hatha Yoga, Ashtanga & Iyengar Yoga",
    image: "/images/teachers/vishal-yoga-teacher-rishikesh.webp",
    bio: "Born in Rishikesh with a Master's Degree in Yogic Science from Uttarakhand Sanskrit University, expert in traditional alignment.",
  },
  {
    name: "Varun",
    role: "Ashtanga & Hatha Instructor",
    exp: "Certified RYT Instructor",
    specialty: "Ashtanga Vinyasa, Pranayama & Asana Flow",
    image: "/images/teachers/varun-yoga-teacher-rishikesh.webp",
    bio: "Born in Rishikesh Himalayas, dedicated to living a traditional yogic lifestyle with dynamic Ashtanga flow and Pranayama.",
  },
  {
    name: "Kokil Nath",
    role: "Asana & Philosophy Teacher",
    exp: "Dedicated Yogi & Seeker",
    specialty: "Asana, Pranayama & Spiritual Inward Growth",
    image: "/images/teachers/kokil-nath-yoga-teacher-rishikesh.webp",
    bio: "From Assam, Kokil brings an honest, authentic seeker's attitude to Asana, Pranayama, Meditation, and yogic philosophy.",
  },
  {
    name: "Chittaranjan",
    role: "Pranayama & Kriyas Master",
    exp: "Senior Pranayama Master",
    specialty: "Pranayama, Bandhas, Mudras & Shatkarmas",
    image: "/images/teachers/chittaranjan-yoga-teacher-rishikesh.webp",
    bio: "Expert in authentic Kumbhaka, yogic locks, mudras, shatkarma purification methods, Ashtanga, and classical Hatha Yoga.",
  },
];

export const testimonials = [
  {
    name: "Felix",
    country: "Germany",
    course: "200-Hour Yoga Teacher Training",
    rating: 5,
    source: "Google Reviews",
    text: "It is impossible to overrate the experience I had in the 200 hrs Yoga Teacher Training with Siddhant and his crew of competent teachers. I didn't know there is a place on earth where all my questions could be answered understandably without any doubt. Siddhant is using 100% of his energy to make everything as clear as possible. After 24 days, I felt a lot stronger and capable of things I didn't think I could do in this lifetime. The food, accommodation, and excursions were excellent.",
    date: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Lili",
    country: "France",
    course: "Yoga & Meditation Immersion",
    rating: 5,
    source: "Google Reviews",
    text: "I came here not because of a choice of departure, but rather because of some impression that I had to do it! Thanks to this school, I feel energized every morning and so grateful. It's learning to live in a different way, your way, depending on your decision! Everyone is so nice that it feels like home, everyone taking care of you. The general atmosphere is full of wonderful gratitude.",
    date: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Camille Dupont",
    country: "France",
    course: "200-Hour Yoga TTC",
    rating: 5,
    source: "Google Reviews",
    text: "I stumbled across Siddhant School of Yoga while I was one second from booking another yoga school in Rishikesh, and I have zero regrets about it! This yoga school exceeded all my expectations. I felt at home since the first day, the staff was very welcoming and helpful during all my stay. They all are truly passionate about teaching yoga and you sense it immediately! Now I can tell you I have an Indian family in Rishikesh!",
    date: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Roberto",
    country: "Italy",
    course: "Multi-Style Yoga TTC",
    rating: 5,
    source: "TripAdvisor",
    text: "Even if this school is not much advertised, in between hundreds of schools something called me here. And I definitely can say that the Universe made me one of the greatest gifts! Here you can find so much love, passion, knowledge, comprehension, and smiles. Classes are small, not over a dozen people. A full immersion from Pranayama to Asana, philosophy, mantra chanting, anatomy, and meditation. Gratitude is now one of the most popular words in my daily life.",
    date: "Verified TripAdvisor Review",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Sarah M.",
    country: "Canada",
    course: "Yoga Teacher Training & Retreat",
    rating: 5,
    source: "Google Reviews",
    text: "Absolutely Incredible! Siddhant and his team managed to exceed my expectations. They did everything to make sure I had what I needed and more. The entire team at this school are very intelligent and experienced. Siddhant is a great teacher who has a big heart and is always willing to help you. I have truly cherished my time here, from all the excursions to the wonderful yogic food. Remember: Gratitude is the Attitude. Hari Om.",
    date: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Himani Lingwal",
    country: "India",
    course: "Yoga Teacher Training",
    rating: 5,
    source: "Google Reviews",
    text: "Amazing experience with teachers. I love the style and the teaching of all the masters very much. The sattvic food was delicious and nourishing. The location of the school is amidst the peaceful foothills near Veerbhadra temple in Rishikesh. Highly recommended to anyone seeking authentic knowledge.",
    date: "Verified Google Review",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
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

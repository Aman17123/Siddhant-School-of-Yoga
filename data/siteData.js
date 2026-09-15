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
  image: "/images/founder/acharya-siddhant-founder-siddhant-school-of-yoga-rishikesh.webp",
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
    q: "Is Siddhant School of Yoga registered with Yoga Alliance?",
    a: "Yes, Siddhant School of Yoga is officially registered with Yoga Alliance USA as a Registered Yoga School (RYS 200, RYS 300, and RYS 500). This means every course follows Yoga Alliance's global curriculum standards for hours, subjects, and teacher qualifications. Graduates automatically become eligible to register as a Registered Yoga Teacher (RYT) with Yoga Alliance and teach internationally.",
  },
  {
    q: "Why is Rishikesh considered the best place for yoga teacher training in India?",
    a: "Rishikesh sits at the point where the sacred Ganga river meets the Himalayan foothills, and it has been a living center of yoga, meditation, and Vedic study for centuries. Training here means daily practice by the river, access to ashrams and temples, and a natural, distraction-free environment. Combined with the largest concentration of Yoga Alliance-registered schools in the world, this is why Rishikesh is widely called the Yoga Capital of the World.",
  },
  {
    q: "Where exactly is the school located?",
    a: "Siddhant School of Yoga is located in Veerbhadra, Rishikesh, Uttarakhand, India — a quiet residential area close to the Ganga river and the Himalayan foothills, a short distance from Laxman Jhula and Tapovan.",
  },
  {
    q: "Do I need previous yoga experience to join?",
    a: "No prior experience is required for the 100-hour course or our beginner-friendly retreats — both are designed to welcome complete newcomers step by step. From the 200-hour course onward, basic familiarity with asana (postures) and breathing practice is helpful, though our teachers still guide every student at their own individual level.",
  },
  {
    q: "What is included in a residential course?",
    a: "A residential course includes private or shared accommodation, three sattvic vegetarian meals a day, a printed course manual, daily supervised practice, and use of the yoga shala and ashram facilities. Exact inclusions and room options are confirmed in writing with Acharya Siddhant before you book, so there is full clarity on what is covered.",
  },
  {
    q: "What happens after the course ends?",
    a: "Every graduate receives a structured 100-day home practice schedule to maintain discipline and deepen their skills after leaving Rishikesh. You also stay connected with Acharya Siddhant directly, so you can ask questions about your practice or teaching career at any point during that period.",
  },
  {
    q: "Which visa should I apply for?",
    a: "Most international students travel to India on a Tourist e-Visa for short-term courses and retreats, which is usually sufficient for a 100 to 500-hour program. Visa rules vary by nationality and course length, so we recommend confirming the correct visa type with your local Indian embassy or consulate before booking flights.",
  },
  {
    q: "What is the best time of year to train in Rishikesh?",
    a: "Yoga teacher training batches run year-round at Siddhant School of Yoga, so you can join whenever suits your schedule. October to March offers the coolest, most comfortable climate for long daily practice sessions, while the quieter monsoon months (July to September) attract students who enjoy a lush, green, and peaceful Rishikesh.",
  },
  {
    q: "How do I secure my seat?",
    a: "To secure your seat, message the school directly by WhatsApp or email with your preferred course and batch dates. Acharya Siddhant will confirm availability, course level, and fees with you personally, and your seat is locked in once dates and payment terms are agreed in writing.",
  },
  {
    q: "What exactly is a Yoga Teacher Training Course (YTTC)?",
    a: "A Yoga Teacher Training Course, or YTTC, is a structured program — typically 100, 200, 300, or 500 hours — that trains you in both personal yoga practice and how to safely teach it to others. Each course level follows curriculum standards set by Yoga Alliance, covering asana, pranayama, meditation, anatomy, philosophy, and teaching methodology.",
  },
  {
    q: "What is the difference between 100-hour and 200-hour yoga TTC?",
    a: "The 100-hour yoga TTC builds a strong personal practice foundation and ends with a course completion certificate, making it ideal for beginners or those deepening their own practice. The 200-hour yoga TTC is the internationally recognised entry point for teaching professionally, ending in RYS 200 certification that qualifies you to register as a Yoga Alliance RYT-200 teacher.",
  },
  {
    q: "What is the difference between 200-hour and 300-hour yoga TTC?",
    a: "The 200-hour course is the foundational teaching certificate required before advancing further. The 300-hour course is an advanced-level program open only to already-certified 200-hour teachers, and completing both levels (500 hours total) makes you eligible for RYT 500 — the highest teaching credential recognised by Yoga Alliance worldwide.",
  },
  {
    q: "Which is the best yoga teacher training in Rishikesh?",
    a: '"Best" depends on what a student actually needs, but genuine Yoga Alliance registration, small batch sizes, one consistent lead teacher throughout the course, and clear support after graduation matter far more than marketing claims. Siddhant School of Yoga is built around exactly those four points, which is why it consistently earns 4.9-star reviews from graduates in over 60 countries.',
  },
  {
    q: "What is the best time for a 200-hour yoga TTC in Rishikesh?",
    a: "Batches for the 200-hour yoga TTC run all year at Siddhant School of Yoga. October to March has the coolest, most comfortable weather for long practice days, while many students also enjoy the quieter, greener monsoon months for a more introspective training experience.",
  },
  {
    q: "How much does yoga teacher training cost in Rishikesh?",
    a: "Course fees in Rishikesh vary depending on the course length (100 to 500 hours), room type (shared, triple, or private), and season. At Siddhant School of Yoga, exact fees for each program — including accommodation and meals — are confirmed directly with Acharya Siddhant before you book, so there are no hidden charges or surprise costs later.",
  },
  {
    q: "Do I need to be flexible or very fit to start a yoga TTC?",
    a: "No, you do not need to be flexible or highly fit to start a yoga teacher training course. Our courses are built to meet every student at their current level and build up gradually — flexibility, strength, and stamina are outcomes the training develops over time, not requirements you need to arrive with.",
  },
  {
    q: "Can I complete yoga teacher training online instead of travelling to Rishikesh?",
    a: "Yes, an online 200-hour yoga TTC option is available for students who cannot travel to India yet, covering the same Yoga Alliance curriculum through live sessions. That said, most of our graduates say practising in person in Rishikesh — near the Ganga and the Himalayas, with hands-on adjustments from Acharya Siddhant — adds a depth of experience an online course cannot fully replace.",
  },
  {
    q: "Do you offer airport pickup from Dehradun?",
    a: "Yes, once your seat is confirmed we arrange a pickup from Dehradun (Jolly Grant) Airport, or from Haridwar or Rishikesh Railway Station, so you can travel directly to the ashram without navigating local transport on your own.",
  },
  {
    q: "What should I pack for a yoga teacher training course?",
    a: "Pack comfortable yoga wear, a light jacket for cool mornings and evenings, a refillable water bottle, sun protection, and a notebook for lectures. Yoga mats, props, and all study material are provided at the school, so you don't need to bring your own equipment.",
  },
  {
    q: "Is there a minimum or maximum age to join?",
    a: "Students who join our courses generally range from 18 to 65 years old, and there is no strict upper age limit — the training is adapted to each student's body, health, and prior experience rather than a fixed age requirement.",
  },
  {
    q: "Can I get a refund if I need to cancel my course?",
    a: "A partial refund is available if you cancel with sufficient advance notice before your batch start date. Full cancellation and refund terms, including deadlines and any non-refundable portion, are shared with you in writing at the time of booking so expectations are clear from the start.",
  },
  {
    q: "Do you offer discounts for early booking or group registration?",
    a: "Yes, Siddhant School of Yoga offers early bird discounts for students who book their course or retreat well in advance, along with group rates for friends, couples, or small groups registering together. Message us on WhatsApp for current offers, seasonal discounts, and upcoming batch dates.",
  },
  {
    q: "What is the weather like in Rishikesh during retreats and courses?",
    a: "Rishikesh enjoys a pleasant climate for most of the year, which is one reason batches run year-round. October to March is cool and comfortable, ideal for long practice sessions; April to June is warmer; and the monsoon season (July to September) brings lush green surroundings with occasional rainfall, offering a quieter, more introspective atmosphere for practice.",
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

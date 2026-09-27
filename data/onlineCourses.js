// Online courses: drives the "Online Courses" header dropdown and the course pages.
// The 200-hour course has its own full page; the rest use the shared OnlineCoursePage
// (header, hero banner, footer) until their content is written.
export const onlineCourses = [
  {
    key: "online-200",
    menuTitle: "200 Hours Online Yoga TTC",
    href: "/online-200-hour-yoga-teacher-training-in-rishikesh-india",
  },
  {
    key: "online-300",
    type: "ttc",
    kicker: "Online · Advanced Yoga Teacher Training",
    menuTitle: "300 Hours Online Yoga TTC",
    href: "/online-300-hour-yoga-teacher-training-in-rishikesh-india",
    title: "Online 300 Hour Yoga TTC",
    intro:
      "Deepen your practice and teaching skills with an advanced online yoga teacher training, guided live by the teachers of Siddhant School of Yoga.",
    seoTitle: "Online 300 Hour Yoga Teacher Training | Siddhant School of Yoga",
    seoDescription:
      "Advanced online 300-hour yoga teacher training from Rishikesh with Siddhant School of Yoga. Deepen your practice, knowledge and teaching skills from home.",
    image: "/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp",
    imageAlt: "Advanced yoga practice at Siddhant School of Yoga, Rishikesh",
  },
  {
    key: "online-500",
    type: "ttc",
    kicker: "Online · Complete Yoga Teacher Training",
    menuTitle: "500 Hours Online Yoga TTC",
    href: "/online-500-hour-yoga-teacher-training-in-rishikesh-india",
    title: "Online 500 Hour Yoga TTC",
    intro:
      "A complete online yoga teacher training journey from Rishikesh, combining foundational and advanced study with the teachers of Siddhant School of Yoga.",
    seoTitle: "Online 500 Hour Yoga Teacher Training | Siddhant School of Yoga",
    seoDescription:
      "Complete online 500-hour yoga teacher training from Rishikesh with Siddhant School of Yoga, combining foundational and advanced study from home.",
    image: "/images/gallery_images/200-500-hour-yoga-teacher-training-certification-rishikesh.webp",
    imageAlt: "Yoga teacher training graduates at Siddhant School of Yoga, Rishikesh",
  },
  {
    key: "meditation-beginners",
    type: "complete",
    menuTitle: "Meditation For Beginners Complete Course",
    href: "/online-meditation-for-beginners-course",
    title: "Meditation for Beginners Course",
    intro:
      "Learn to meditate step by step, from sitting posture and breath awareness to a steady daily practice, guided online by Siddhant School of Yoga.",
    seoTitle: "Meditation for Beginners Online Course | Siddhant School of Yoga",
    seoDescription:
      "A complete online meditation course for beginners from Siddhant School of Yoga, Rishikesh. Learn posture, breath awareness and a steady daily practice.",
    image: "/images/morning-meditation-namaste-outdoor-class-rishikesh.jpg",
    imageAlt: "Beginners practicing meditation at Siddhant School of Yoga",
  },
  {
    key: "discover-chakra",
    type: "short",
    menuTitle: "Discover Your Chakra Short Course",
    href: "/online-discover-your-chakra-course",
    title: "Discover Your Chakra",
    intro:
      "A short online course introducing the chakras as described in the yogic tradition, with simple practices to explore each one.",
    seoTitle: "Discover Your Chakra Online Short Course | Siddhant School of Yoga",
    seoDescription:
      "A short online course from Siddhant School of Yoga introducing the chakras of the yogic tradition, with simple practices to explore each one.",
    image: "/images/gyan-mudra-meditation-hilltop-yoga-retreat-rishikesh.jpg",
    imageAlt: "Seated meditation with Gyan Mudrā near Rishikesh",
  },
  {
    key: "fail-meditation",
    type: "short",
    menuTitle: "Why Do You Fail To Do Meditation Short Course",
    href: "/online-why-do-you-fail-to-do-meditation-course",
    title: "Why You Fail at Meditation",
    intro:
      "A short online course on the common obstacles that make meditation difficult, and practical ways to work with them in your practice.",
    seoTitle: "Why Do You Fail to Do Meditation? Online Short Course | Siddhant School of Yoga",
    seoDescription:
      "A short online course from Siddhant School of Yoga on the common obstacles in meditation and practical ways to work with them.",
    image: "/images/meditation-class-indoor.jpg",
    imageAlt: "Students in an indoor meditation class",
  },
  {
    key: "silent-sitting",
    type: "short",
    menuTitle: "21 Min. Sitting Silent Short Course",
    href: "/online-21-minute-sitting-silent-course",
    title: "21-Minute Silent Sitting Course",
    intro:
      "A short online course guiding you into a daily 21-minute practice of silent sitting, building steadiness and attention one session at a time.",
    seoTitle: "21 Minute Silent Sitting Online Short Course | Siddhant School of Yoga",
    seoDescription:
      "A short online course from Siddhant School of Yoga guiding you into a daily 21-minute practice of silent sitting.",
    image: "/images/lotus-pose-meditation-rocky-riverbank-rishikesh.jpg",
    imageAlt: "Silent seated meditation by the river in Rishikesh",
  },
  {
    key: "personality-development",
    type: "complete",
    menuTitle: "Personality Development Complete Course",
    href: "/online-personality-development-course",
    title: "Personality Development Course",
    intro:
      "A complete online course drawing on yogic principles to build self-awareness, discipline, clear communication and a balanced way of living.",
    seoTitle: "Personality Development Online Course | Siddhant School of Yoga",
    seoDescription:
      "A complete online personality development course from Siddhant School of Yoga, drawing on yogic principles of self-awareness, discipline and balanced living.",
    image: "/images/student-namaste-himalayan-mountains-rishikesh.jpg",
    imageAlt: "Student in namaste with a Himalayan view near Rishikesh",
  },
  {
    key: "anulom-vilom",
    type: "short",
    menuTitle: "Anulom Vilom Short Course",
    href: "/online-anulom-vilom-course",
    title: "Anulom Vilom Short Course",
    intro:
      "Learn Anulom Vilom, the alternate-nostril breathing practice, step by step online with the Prāṇāyāma teachers of Siddhant School of Yoga.",
    seoTitle: "Anulom Vilom Online Short Course | Siddhant School of Yoga",
    seoDescription:
      "Learn Anulom Vilom (alternate-nostril breathing) step by step in this short online course from Siddhant School of Yoga, Rishikesh.",
    image: "/images/alternate-nostril-breathing-pranayama.png",
    imageAlt: "Alternate-nostril breathing practice",
  },
];

// Hero kicker line and badges for each course type (shown in the CourseHero banner).
const HERO_BY_TYPE = {
  ttc: {
    kicker: "Online · Yoga Teacher Training",
    badges: [
      { icon: "MonitorPlay", label: "Online Yoga TTC" },
      { icon: "Users", label: "Siddhant School Teachers" },
      { icon: "Award", label: "From Rishikesh, India" },
    ],
  },
  complete: {
    kicker: "Online · Complete Course",
    badges: [
      { icon: "MonitorPlay", label: "Online Complete Course" },
      { icon: "Clock", label: "Learn From Home" },
      { icon: "Users", label: "Guided by Our Teachers" },
    ],
  },
  short: {
    kicker: "Online · Short Course",
    badges: [
      { icon: "MonitorPlay", label: "Online Short Course" },
      { icon: "Clock", label: "Learn From Home" },
      { icon: "Users", label: "Guided by Our Teachers" },
    ],
  },
};

export function getCourseHero(course) {
  const base = HERO_BY_TYPE[course.type];
  return { kicker: course.kicker || base.kicker, badges: course.badges || base.badges };
}

export function getOnlineCourse(key) {
  return onlineCourses.find((c) => c.key === key);
}

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Home as HomeIcon,
  Users,
  BedDouble,
  Wifi,
  Sun,
  Sunrise,
  Sunset,
  Shirt,
  Droplets,
  Coffee,
  Soup,
  Moon,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CtaBanner from "@/components/home/CtaBanner";
import { Kicker, HeadingDivider } from "@/components/ui";

export const metadata = {
  title: "Food & Accommodation | Siddhant School of Yoga, Rishikesh",
  description:
    "Clean private & shared rooms and three freshly prepared sattvic vegetarian meals a day at Siddhant School of Yoga's ashram in Rishikesh, India — everything you need to rest, nourish and grow.",
};

const roomTypes = [
  {
    title: "Triple Share Room",
    tag: "Most Economical",
    image: "/images/gallery_images/food-gallery3.webp",
    alt: "Triple share room accommodation at Siddhant School of Yoga in Rishikesh",
    desc: "Three single beds in one comfortable room — a great way to meet fellow students and build lasting friendships during your course.",
    features: [
      "Three single beds with clean linens & mosquito nets",
      "Shared attached bathroom with 24/7 hot water",
      "Same peaceful, immaculately clean ashram setting",
      "Our most budget-friendly accommodation option",
    ],
  },
  {
    title: "Double Share Room",
    tag: "Budget Friendly",
    image: "/images/gallery_images/food-gallery4.webp",
    alt: "Double share room accommodation at Siddhant School of Yoga in Rishikesh",
    desc: "A comfortable twin-sharing room, ideal if you're traveling with a friend or would like a roommate during your training.",
    features: [
      "Two single beds with clean linens & mosquito nets",
      "Shared attached bathroom with 24/7 hot water",
      "Same peaceful, immaculately clean ashram setting",
      "A balanced choice of comfort and value",
    ],
  },
  {
    title: "Private Room",
    tag: "Most Popular",
    image: "/images/gallery_images/food-gallery3.webp",
    alt: "Private room accommodation at Siddhant School of Yoga in Rishikesh",
    desc: "Your own quiet space to rest and reflect after each day of practice — ideal for students who prefer privacy during their training.",
    features: [
      "Attached modern bathroom with 24/7 hot water",
      "Comfortable mattress, clean linens & mosquito nets",
      "Study table, chair and ample storage space",
      "Mountain or garden views",
    ],
  },
];

const threeFoodTypes = [
  {
    title: "Sattvic Food",
    desc: "Sattvic food is the kind that keeps you light, energetic and enthusiastic through the day. It is simple, fresh and mostly plant-based — fruits, vegetables, whole grains, nuts, milk and herbal teas — prepared with care and eaten in the right quantity. In yogic understanding, sattvic food does more than fill the stomach; it calms the mind, sharpens awareness and supports meditation and pranayama. This is exactly the kind of food we serve every day at Siddhant School of Yoga, keeping your body light and mind clear.",
  },
  {
    title: "Rajasic Food",
    desc: "Rajasic food is the kind that brings about activity, restlessness and constant craving. It includes food that is very spicy, very sour, very salty, fried, or heavily processed — the kind that excites the senses rather than nourishing the body. In yogic understanding, too much rajasic food agitates the mind, disturbs sleep and makes it harder to sit still in meditation or pranayama. A little occasionally does no harm, but relying on it daily works against the calm, steady awareness your practice is trying to build.",
  },
  {
    title: "Tamasic Food",
    desc: "Tamasic food is the kind of food that makes you feel heavy, dull, lethargic and sluggish. It includes food that is stale, overcooked, reheated, or has been sitting for too long — food that has lost its natural life force and freshness. In yogic understanding, tamasic food clouds the mind, weighs down the body and makes both physical practice and clear thinking noticeably harder. This is why, at Siddhant School of Yoga, we avoid tamasic ingredients and keep every meal fresh, light and genuinely alive.",
  },
];

const mealTimes = [
  { icon: Coffee, title: "Morning Herbal Tea", desc: "A warm herbal tea to gently wake the body before the first class." },
  { icon: Sunrise, title: "Breakfast", desc: "Fresh fruits, porridge, oats, muesli, sprouts and herbal tonics." },
  { icon: Sun, title: "Lunch", desc: "Rice, dal, seasonal vegetables, salad, chapati and buttermilk." },
  { icon: Sunset, title: "Evening Tea", desc: "Herbal tea and a light snack between the afternoon sessions." },
  { icon: Soup, title: "Soup Before Dinner", desc: "A light, warming soup to ease digestion before the evening meal." },
  { icon: Moon, title: "Dinner", desc: "A light sattvic curry, rice or khichdi with seasonal vegetables." },
];

const mealDetails = [
  {
    icon: Coffee,
    title: "Morning Herbal Tea",
    time: "6:00 AM",
    image: "/images/gallery_images/food-gallery3.webp",
    alt: "Morning herbal tea served at Siddhant School of Yoga in Rishikesh",
    desc: "Just after waking up, your muscles and mind are not yet in action mode — they need something gentle to boost themselves, and that's where hot water or herbal tea helps. At Siddhant School of Yoga, morning tea is served at 6 AM: herbal tea, green tea without caffeine, or lemon-ginger tea with honey. We do not serve black coffee, black tea, or caffeinated green tea, keeping your first sip in line with a true sattvic, yogic morning.",
  },
  {
    icon: Sunrise,
    title: "Breakfast",
    time: "8:30 – 9:00 AM",
    image: "/images/gallery_images/food-gallery4.webp",
    alt: "Wholesome breakfast served at Siddhant School of Yoga in Rishikesh",
    desc: "A proper breakfast matters for every yoga practitioner, and since we serve a light dinner, breakfast here is generous. Expect sprouts and fresh seasonal fruit salad, brown bread with mango, guava or pineapple jam, and butter or peanut butter. Our daily-changing Indian spread includes paratha, poha, pancakes, upma, aloo puri, dalia, oats, cornflakes, stuffed bread and halwa chana, alongside mango, banana or papaya shakes. We stay genuinely conscious about your food — nourishing, varied and true to authentic yoga education.",
  },
  {
    icon: Sun,
    title: "Lunch",
    time: "1:00 – 2:00 PM",
    image: "/images/gallery_images/food-gallery3.webp",
    alt: "Vegetarian lunch thali served at Siddhant School of Yoga in Rishikesh",
    desc: "Lunch is served between 1 PM and 2 PM, with rice, a variety of dal, green mixed boiled vegetables, curry and green mix curry, yogurt, papad, Indian pickle and green salad, chapati, matar mushroom, matar paneer and more — depending on weather and seasonal availability. Once a week, we also serve a traditional Indian sweet as a treat. Every dish is prepared fresh, balancing taste and nutrition so you leave the table satisfied but never heavy for your afternoon practice.",
  },
  {
    icon: Sunset,
    title: "Evening Tea",
    time: "3:30 – 4:30 PM",
    image: "/images/gallery_images/food-gallery4.webp",
    alt: "Evening herbal tea served at Siddhant School of Yoga in Rishikesh",
    desc: "Evening tea is served between 3:30 and 4:30 PM — herbal tea, lemon-ginger tea or honey tea, and occasionally milk tea when available, though it isn't compulsory since it can sometimes upset digestion. Black coffee isn't part of our official offering either, as it isn't the healthiest habit for a yoga practitioner; if you truly want it, you're welcome to arrange your own. This light pause between afternoon sessions keeps you gently refreshed without disturbing your evening practice or digestion before dinner.",
  },
  {
    icon: Moon,
    title: "Dinner",
    time: "7:30 PM",
    image: "/images/gallery_images/food-gallery3.webp",
    alt: "Simple sattvic dinner served at Siddhant School of Yoga in Rishikesh",
    desc: "Dinner here is kept simple and easy to digest. A fresh soup — corn, beetroot, pumpkin-tomato, mushroom, mixed vegetable, or hot and sour — is always served just before the meal, followed by rice, dal, chapati and curry. We skip pickle, papad, curd and salad at dinner, since Indian weather, yoga and Ayurveda all agree they don't suit an evening meal. The result is food that's genuinely healthy, tasty and nutritious, letting your body rest and digest well through the night.",
  },
];

const foodGalleryImages = [
  { src: "/images/gallery_images/food-gallery3.webp", alt: "Freshly prepared sattvic meal at Siddhant School of Yoga", caption: "Sattvic Meals" },
  { src: "/images/gallery_images/food-gallery4.webp", alt: "Ashram dining and sattvic food at Siddhant School of Yoga", caption: "Ashram Dining" },
  { src: "/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp", alt: "Yoga practice on the Ganges riverbank in Rishikesh", caption: "Riverside Practice" },
  { src: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp", alt: "Sacred Vedic havan fire ritual in Rishikesh", caption: "Sacred Fire Ritual" },
  { src: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp", alt: "Yoga philosophy class at Siddhant School of Yoga", caption: "Philosophy Satsang" },
  { src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp", alt: "Ashram in the Himalayan foothills of Rishikesh", caption: "Himalayan Ashram" },
  { src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp", alt: "Yoga students on a temple excursion in Rishikesh", caption: "Temple Excursion" },
  { src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp", alt: "Warrior pose yoga practice by the Ganges river in Rishikesh", caption: "Ganges Sadhana" },
];

const accommodationGalleryImages = [
  { src: "/images/gallery_images/food-gallery3.webp", alt: "Comfortable ashram room at Siddhant School of Yoga", caption: "Ashram Rooms" },
  { src: "/images/gallery_images/food-gallery4.webp", alt: "Peaceful ashram surroundings at Siddhant School of Yoga", caption: "Peaceful Surroundings" },
  { src: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp", alt: "Himalayan mountain views from the ashram in Rishikesh", caption: "Mountain Views" },
  { src: "/images/gallery_images/yoga-philosophy-class-siddhant-school-of-yoga-rishikesh.webp", alt: "Rooftop yoga shala at Siddhant School of Yoga", caption: "Rooftop Yoga Shala" },
  { src: "/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp", alt: "Garden courtyard at the ashram in Rishikesh", caption: "Garden Courtyard" },
  { src: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp", alt: "Ashram life at Siddhant School of Yoga in Rishikesh", caption: "Ashram Life" },
  { src: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp", alt: "Quiet evening corners of the ashram in Rishikesh", caption: "Quiet Corners" },
  { src: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp", alt: "Evening calm by the Ganges near the ashram in Rishikesh", caption: "Evening Calm" },
];

const facilities = [
  { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Reliable internet throughout the ashram premises." },
  { icon: Shirt, title: "Laundry Service", desc: "On-site laundry service so you can focus on your practice." },
  { icon: Sun, title: "Sunlit Rooftop & Yoga Shala", desc: "Dedicated wooden yoga hall with mats, blocks and bolsters." },
  { icon: Droplets, title: "Filtered Drinking Water", desc: "Clean, filtered drinking water available round the clock." },
  { icon: Users, title: "Friendly Ashram Staff", desc: "Caring, attentive staff available around the clock for assistance." },
  { icon: BedDouble, title: "Housekeeping Included", desc: "Regular housekeeping keeps your room immaculately clean." },
];

const faqs = [
  {
    q: "Is accommodation and food included in the course fee?",
    a: "Yes. Every teacher training and retreat fee at Siddhant School of Yoga includes your accommodation and three sattvic vegetarian meals a day, so there are no hidden costs to worry about.",
  },
  {
    q: "Can I choose between a private and a shared room?",
    a: "Yes, both private and shared (twin-sharing) rooms are available. Private rooms are limited and allotted on a first-come, first-served basis, so we recommend booking your seat early.",
  },
  {
    q: "What if I have dietary restrictions or allergies?",
    a: "Our kitchen is happy to accommodate vegan, gluten-free and other dietary needs. Simply inform our admissions team when you book so the kitchen can plan accordingly.",
  },
  {
    q: "Is the drinking water safe at the ashram?",
    a: "Yes. Filtered drinking water is available throughout the ashram at all times, so you never need to worry about water safety during your stay.",
  },
];

export default function FoodAccommodationPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#158b72]/30 selection:text-[#0f6b57]">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Hero Banner */}
        <section className="relative min-h-fit sm:min-h-[500px] lg:h-[70vh] lg:max-h-[740px] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 pt-8 sm:pt-14 lg:pt-16 pb-20 sm:pb-28 lg:pb-36">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 max-w-xl text-left">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#0f6b57]/80"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-[#158b72] transition-colors"
                  >
                    <HomeIcon className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0f6b57]/50 shrink-0" />
                  <span className="text-[#0f6b57] font-semibold">Food &amp; Accommodation</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                  <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                    Food &amp;
                  </span>
                  <span className="block text-2xl sm:text-3xl font-normal">
                    Accommodation
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#0f6b57]/90 leading-relaxed max-w-md">
                  Clean, peaceful rooms and freshly prepared sattvic vegetarian meals — everything you need to rest, nourish and grow during your stay in Rishikesh.
                </p>
              </div>

              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/gallery_images/food-gallery3.webp"
                    alt="Sattvic meals and comfortable ashram accommodation at Siddhant School of Yoga"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Food */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12">
              {/* Left: Photo */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-lg border-2 border-white order-2 lg:order-1">
                <Image
                  src="/images/gallery_images/food-gallery3.webp"
                  alt="Sattvic vegetarian food served at Siddhant School of Yoga in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Right: Text */}
              <div className="text-center lg:text-left order-1 lg:order-2">
                <Kicker>Sattvic, Wholesome, Healthy</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  Yogic Food at Siddhant School of Yoga
                </h2>
                <HeadingDivider center={false} />

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Food is very essential for your body, and you need a healthy body for your yoga practice. Your body is the outer part of your mind, and your mind is affected by your body, directly or indirectly.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  By understanding this principle of body, mind and food, Siddhant School of Yoga prepares wholesome, healthy meals to nourish your physical body throughout your training. We serve genuinely tasty food in our dining hall — so tasty that a few practitioners tend to overeat and end up with stomach aches and indigestion.
                </p>
              </div>
            </div>

            {/* Meal Times Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
              {mealTimes.map((meal) => {
                const Icon = meal.icon;
                return (
                  <div
                    key={meal.title}
                    className="bg-[#def4ee4d] rounded-2xl border border-[#c8ece2] p-4 sm:p-5 text-center hover:shadow-md transition-shadow"
                  >
                    <span className="inline-flex w-11 h-11 rounded-xl bg-white text-[#158b72] items-center justify-center mb-3 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h4 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] tracking-wide mb-1">
                      {meal.title}
                    </h4>
                    <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed font-medium">
                      {meal.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Photo carousel — auto-scrolling marquee */}
            <div className="relative w-full overflow-hidden">
              <div className="animate-marquee flex gap-4">
                {[...foodGalleryImages, ...foodGalleryImages].map((img, i) => (
                  <div
                    key={i}
                    className="relative w-64 sm:w-72 h-48 sm:h-52 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 group"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 256px, 288px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-3 left-3.5 text-white text-xs sm:text-[13px] font-figtree font-medium tracking-wide">
                      {img.caption}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Three Kinds of Food */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <Kicker>The Yogic View of Food</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Sattvic, Rajasic &amp; Tamasic Food
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Yoga does not classify food by protein, carbs or fat — it looks at the effect food has on the body and mind, dividing it into three kinds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {threeFoodTypes.map((food) => (
                <div
                  key={food.title}
                  className="bg-white rounded-2xl border border-[#c8ece2] p-6 sm:p-7 shadow-xs"
                >
                  <h3 className="font-belleza text-xl sm:text-2xl font-normal text-[#1e2422] tracking-wide mb-3">
                    {food.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium">
                    {food.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Meal Details */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <Kicker>Your Day, One Meal at a Time</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                What You'll Eat, and When
              </h2>
              <HeadingDivider />
            </div>

            <div className="flex flex-col gap-5 max-w-5xl mx-auto">
              {mealDetails.map((meal, i) => {
                const Icon = meal.icon;
                const reversed = i % 2 === 1;
                return (
                  <div
                    key={meal.title}
                    className={`group bg-white rounded-2xl overflow-hidden border border-[#c8ece2] shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col ${
                      reversed ? "sm:flex-row-reverse" : "sm:flex-row"
                    }`}
                  >
                    <div className="p-6 sm:p-8 sm:w-2/3 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-10 h-10 rounded-full bg-[#158b72]/10 text-[#158b72] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-belleza font-normal tracking-wide text-[#1e2422]">
                            {meal.title}
                          </h3>
                          <span className="text-xs font-bold text-[#158b72] tracking-wide">
                            {meal.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed">
                        {meal.desc}
                      </p>
                    </div>

                    <div className="relative w-full sm:w-1/3 aspect-[4/3] sm:aspect-auto min-h-[280px]">
                      <Image
                        src={meal.image}
                        alt={meal.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Accommodation — Room Types */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Accommodation</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Choose Your Room
              </h2>
              <HeadingDivider />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {roomTypes.map((room) => (
                <div
                  key={room.title}
                  className="bg-white rounded-3xl overflow-hidden border border-[#c8ece2] shadow-xs hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-52 sm:h-56 w-full">
                    <Image
                      src={room.image}
                      alt={room.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-[#158b72] shadow-2xs">
                      {room.tag}
                    </span>
                    <h3 className="absolute bottom-3 left-4 right-4 font-belleza text-xl sm:text-2xl font-normal text-white drop-shadow-md">
                      {room.title}
                    </h3>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-sm text-stone-600 leading-relaxed font-medium mb-4">
                      {room.desc}
                    </p>
                    <ul className="space-y-2.5">
                      {room.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-stone-700 leading-relaxed">
                          <Check className="w-4 h-4 text-[#158b72] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ashram Lifestyle */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12">
              {/* Left: Photo */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-lg border-2 border-white order-2 lg:order-1">
                <Image
                  src="/images/gallery_images/food-gallery4.webp"
                  alt="Clean and comfortable ashram accommodation at Siddhant School of Yoga in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Right: Text */}
              <div className="text-center lg:text-left order-1 lg:order-2">
                <Kicker>Ashram Lifestyle, Clean, Comfy</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  Accommodation at Siddhant School of Yoga
                </h2>
                <HeadingDivider center={false} />

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Where you rest is just as important as how you practice. Your room, your bed and your surroundings all play a quiet role in how well you recover, sleep and show up fully for each class.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  At Siddhant School of Yoga, every room — triple share, double share or private — is kept immaculately clean, with comfortable bedding, attached bathrooms and hot water available around the clock. It is a simple, peaceful space built for real rest between your daily sadhana.
                </p>
              </div>
            </div>

            {/* Photo carousel — auto-scrolling marquee */}
            <div className="relative w-full overflow-hidden">
              <div className="animate-marquee flex gap-4">
                {[...accommodationGalleryImages, ...accommodationGalleryImages].map((img, i) => (
                  <div
                    key={i}
                    className="relative w-64 sm:w-72 h-48 sm:h-52 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 group"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 256px, 288px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-3 left-3.5 text-white text-xs sm:text-[13px] font-figtree font-medium tracking-wide">
                      {img.caption}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ashram Facilities */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Around the Ashram</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Everything You Need, On Campus
              </h2>
              <HeadingDivider />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {facilities.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="flex items-start gap-3.5 bg-white rounded-2xl border border-[#c8ece2] p-5 hover:shadow-md transition-shadow"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-[#158b72]/10 text-[#158b72] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="font-belleza text-base font-normal text-[#1e2422] tracking-wide mb-1">
                        {f.title}
                      </h4>
                      <p className="text-sm text-stone-600 leading-relaxed font-medium">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white font-figtree">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8 lg:mb-10">
              <Kicker>Questions</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Food &amp; Accommodation FAQs
              </h2>
              <HeadingDivider />
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="bg-[#def4ee4d] rounded-2xl border border-[#c8ece2] p-5 sm:p-6"
                >
                  <h4 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] tracking-wide mb-2">
                    {faq.q}
                  </h4>
                  <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

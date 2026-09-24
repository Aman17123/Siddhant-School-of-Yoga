import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Home as HomeIcon,
  Mountain,
  Waves,
  Zap,
  Anchor,
  Tent,
  TrendingUp,
  MapPin,
  Landmark,
  ThermometerSun,
  CloudRain,
  Snowflake,
  Flower2,
  UtensilsCrossed,
  Ban,
  Sparkles,
  Sprout,
  Clock,
  Plane,
  TrainFront,
  Car,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CtaBanner from "@/components/home/CtaBanner";
import PlacesCarousel from "@/components/rishikesh/PlacesCarousel";
import { Kicker, HeadingDivider } from "@/components/ui";

export const metadata = {
  title: "About Rishikesh, India | Siddhant School of Yoga",
  description:
    "Discover Rishikesh, Uttarakhand — the Yoga Capital of the World. Geography, history, adventure, climate, culture and why this sacred Himalayan town by the Ganges is the ideal home for your yoga journey.",
};

const adventureActivities = [
  { icon: Waves, title: "River Rafting", desc: "Rishikesh is the River Rafting Capital of India — rapids for every skill level." },
  { icon: Zap, title: "Bungee Jumping", desc: "Home to India's only fixed bungee jumping platform, for a real adrenaline rush." },
  { icon: Anchor, title: "Kayaking", desc: "Paddle the emerald waters of the Ganges at your own pace and rhythm." },
  { icon: Mountain, title: "Mountain Trekking", desc: "Trails into the Himalayan foothills, through forests and mist-covered ridges." },
  { icon: Tent, title: "Camping", desc: "Riverside and forest camps under open Himalayan skies." },
  { icon: TrendingUp, title: "Rock Climbing", desc: "Natural rock faces around the valley for climbers of every level." },
];

const climateSeasons = [
  {
    title: "Spring",
    icon: Flower2,
    tag: "Best Time to Visit",
    desc: "From mid-February to late May, Rishikesh enjoys mild, pleasant weather — ideal for practice, trekking and settling into ashram life.",
  },
  {
    title: "Monsoon",
    icon: CloudRain,
    tag: "Late Jul – Mid Sep",
    desc: "The region sees heavy rainfall during this period. The Ganges runs full and the hills turn a deep, lush green.",
  },
  {
    title: "Fall",
    icon: ThermometerSun,
    tag: "Best Time to Visit",
    desc: "From mid-September to November, skies clear and temperatures stay comfortable — another excellent window to visit.",
  },
  {
    title: "Winter",
    icon: Snowflake,
    tag: "Nov – Feb, Carry Warm Clothing",
    desc: "Temperatures drop noticeably after November. Rishikesh stays practice-friendly, but pack heavier layers for mornings and evenings.",
  },
];

const charDham = ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"];

const whyYogaHighlights = [
  {
    icon: Mountain,
    title: "Himalayan Surroundings",
    desc: "Practice every day amid the quiet, peaceful foothills of the Himalayas.",
  },
  {
    icon: Waves,
    title: "Sacred Ganga River",
    desc: "Meditate and find real stillness on the banks of the holy Ganges.",
  },
  {
    icon: Sprout,
    title: "Authentic Yoga Heritage",
    desc: "Learn traditional yoga from experienced teachers, right in its birthplace.",
  },
  {
    icon: Sparkles,
    title: "Spiritual Transformation",
    desc: "Reconnect with yourself through daily yoga, meditation and mindfulness.",
  },
];

const howToReach = [
  {
    icon: Plane,
    title: "By Flight",
    lines: [
      "The nearest airport is Jolly Grant Airport (Dehradun), about 20 km from Rishikesh.",
      "Regular domestic flights operate from Delhi and other major Indian cities.",
    ],
    badge: "30–40 mins taxi ride",
    badgeIcon: Clock,
  },
  {
    icon: TrainFront,
    title: "By Train",
    lines: [
      "Yog Nagri Rishikesh Railway Station is the nearest station in the city.",
      "Haridwar Railway Station, close by, connects to all major Indian cities.",
    ],
    badge: "Connected to major cities",
    badgeIcon: MapPin,
  },
  {
    icon: Car,
    title: "By Road",
    lines: [
      "Rishikesh is well connected by road from Delhi, roughly a 5–6 hour drive.",
      "Volvo buses, taxis and shared cabs run daily from nearby cities.",
    ],
    badge: "Scenic Himalayan journey",
    badgeIcon: Mountain,
  },
];

export default function RishikeshPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
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
                  className="flex items-center justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#142b1e]/80"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-[#1c3b2b] transition-colors"
                  >
                    <HomeIcon className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#142b1e]/50 shrink-0" />
                  <Link href="/about" className="hover:text-[#1c3b2b] transition-colors">
                    About Us
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#142b1e]/50 shrink-0" />
                  <span className="text-[#142b1e] font-semibold">Rishikesh, India</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                  <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                    Rishikesh,
                  </span>
                  <span className="block text-2xl sm:text-3xl font-normal">
                    Uttarakhand, India
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#142b1e]/90 leading-relaxed max-w-md">
                  The Yoga Capital of the World — where the Himalayas meet the holy Ganges, and where Siddhant School of Yoga calls home.
                </p>
              </div>

              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/rishikesh/ganga.png"
                    alt="Siddhant School of Yoga student training session in Rishikesh, India"
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

        {/* Intro — Why Visit */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-lg border-2 border-white order-2 lg:order-1">
                <Image
                  src="/images/rishikesh/rishikesh-asahram.png"
                  alt="Scenic spiritual landscape and Himalayan ashram sanctuary in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <Kicker>Gateway to the Himalayas</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  Countless Reasons to Visit Rishikesh
                </h2>
                <HeadingDivider center={false} />

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  It is better not to count the reasons to visit Rishikesh, because they are numerous. Its ancient ties with Hindu culture make it one of India's most famous pilgrimage centers, and its omnipresent spiritual essence makes it an ideal place for yoga and meditation. Serene at times and full of choppy tides at others, the holy River Ganges beckons thousands of spiritual seekers and adventure lovers from around the world.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Rishikesh also serves as the gateway for pilgrims visiting several holy shrines, flower-strewn meadows, countless mountain treks, rivers, valleys and mist-covered trails of the Himalayan region — all within easy reach of the town.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Adventure */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <Kicker>Beyond the Mat</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Adventure Capital of India
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Whether you're a pro-adventurer or on your first-ever trip, Rishikesh has a full reserve of activities to thrill you.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {adventureActivities.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.title}
                    className="bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5 text-center hover:shadow-md transition-shadow"
                  >
                    <span className="inline-flex w-11 h-11 rounded-xl bg-[#1c3b2b]/10 text-[#1c3b2b] items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h4 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] tracking-wide mb-1">
                      {a.title}
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed font-medium">
                      {a.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Geography */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-lg border-2 border-white order-2 lg:order-1">
                <Image
                  src="/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp"
                  alt="Rishikesh at the foothills of the Himalayas along the Ganges"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <Kicker>Where It Sits</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  Geography of Rishikesh
                </h2>
                <HeadingDivider center={false} />

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Situated at the foothills of the Himalaya Mountains, across the banks of the holy river Ganges, Rishikesh is surrounded by three districts of Uttarakhand — Dehradun, Tehri Garhwal and Pauri Garhwal. The town sits at an average elevation of 372 meters above sea level.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Rishikesh and the nearby town of Haridwar are both holy cities of India, well-connected by road and rail with major north Indian cities including Delhi, Jaipur, Varanasi and Amritsar.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-5">
                  {["372m Elevation", "3 Bordering Districts", "Road & Rail Connected"].map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#f4efe6] text-[#1c3b2b] border border-[#1c3b2b]/20"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <Kicker>Ancient Roots</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  History of Rishikesh
                </h2>
                <HeadingDivider center={false} />

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  The town takes its name from Hrishikesh, one of the names of the Hindu God Lord Vishnu. Several legends are tied to the place — according to one, Lakshman, brother of Lord Rama, crossed the river Ganges on jute ropes at the very spot where the Lakshman Jhula bridge stands today.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Many of the temples across the area were built in the 8th century by the renowned Indian saint Adi Shankaracharya, whose teachings still shape the spiritual character of the town.
                </p>
              </div>

              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src="/images/rishikesh/lord_shiva_rishikesh.png"
                  alt="Majestic Lord Shiva statue in sacred Rishikesh along the Ganges"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Climate */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <Kicker>Weather &amp; When to Go</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Climate of Rishikesh
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Rishikesh is never too extreme — temperatures stay between 0°C and 40°C through the year, and the town is cooler than most Indian cities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {climateSeasons.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-6"
                  >
                    <span className="inline-flex w-11 h-11 rounded-xl bg-[#fdfbf7] text-[#1c3b2b] items-center justify-center mb-3 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="font-belleza text-lg font-normal text-[#1e2422] tracking-wide mb-1">
                      {s.title}
                    </h3>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-[#1c3b2b] block mb-2">
                      {s.tag}
                    </span>
                    <p className="text-sm text-stone-600 leading-relaxed font-medium">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-lg border-2 border-white order-2 lg:order-1">
                <Image
                  src="/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp"
                  alt="Sacred Vedic havan fire ritual reflecting the living culture of Rishikesh"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <Kicker>Living Traditions</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  Culture of Rishikesh
                </h2>
                <HeadingDivider center={false} />

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Rishikesh has held a special place in Hindu culture since ancient times, and the town is associated with many Hindu legends. Because of its religious value, daily life here is full of pious activity — by law, the city serves only vegetarian food, and alcohol is prohibited within town limits.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#fdfbf7] text-[#1c3b2b] border border-[#1c3b2b]/20">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    100% Vegetarian City
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#fdfbf7] text-[#1c3b2b] border border-[#1c3b2b]/20">
                    <Ban className="w-3.5 h-3.5" />
                    Alcohol-Free Town
                  </span>
                </div>

                <div className="mt-6 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5 text-left">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Landmark className="w-4.5 h-4.5 text-[#1c3b2b]" />
                    <h4 className="font-belleza text-base font-normal text-[#1e2422] tracking-wide">
                      Gateway to the Char Dham Yatra
                    </h4>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed font-medium mb-3">
                    Rishikesh is also the traditional starting point for the sacred journey to four Himalayan shrines:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {charDham.map((d) => (
                      <span
                        key={d}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f4efe6] text-[#1c3b2b] border border-[#1c3b2b]/20"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Yoga Capital */}
        <section className="py-14 sm:py-16 lg:py-20 text-white relative overflow-hidden font-figtree">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/rishikesh/yoga_asana.png"
              alt="Authentic yoga asana and spiritual sadhana practice in Rishikesh"
              fill
              className="object-cover object-center brightness-[0.45]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-figtree font-semibold tracking-[0.2em] uppercase bg-white/10 text-white border border-white/25 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              World Capital of Yoga
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide leading-[1.2] mb-4">
              Why Is Rishikesh the Yoga Capital of the World?
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
              Rishikesh has drawn yogis, sages and seekers for thousands of years — long before yoga reached the rest of the world. Its unbroken Guru-Shishya lineage, hundreds of ashrams and yoga schools, and the sacred waters of the Ganges create a genuine energetic vortex for practice, not just a scenic backdrop for it. The town is also a recognized center for Ayurveda studies, hosts the annual International Yoga Festival, and remains the starting point of the Chhota Char Dham pilgrimage. This living, unbroken tradition — carried forward today by schools like ours — is exactly why Rishikesh, and not anywhere else, earned the title of Yoga Capital of the World.
            </p>
          </div>
        </section>

        {/* Why Choose Rishikesh for Yoga & Meditation */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <Kicker>Authentic Yoga, Meditation &amp; Spiritual Growth</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Why Choose Rishikesh for Yoga &amp; Meditation?
              </h2>
              <HeadingDivider />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left: Photo collage */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/11] rounded-3xl overflow-hidden shadow-lg border-2 border-white mb-3">
                  <Image
                    src="/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp"
                    alt="Evening Ganga Aarti fire ceremony in Rishikesh"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white">
                    <Image
                      src="/images/gallery_images/yoga-asana-practice-riverside-rishikesh.webp"
                      alt="Yoga practice on the Ganges riverbank in Rishikesh"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 33vw, 160px"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white">
                    <Image
                      src="/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp"
                      alt="Himalayan sunrise near Rishikesh"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 33vw, 160px"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white">
                    <Image
                      src="/images/gallery_images/yoga-certification-ceremony-shiva-statue-rishikesh.webp"
                      alt="Temple in the hills of Rishikesh"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 33vw, 160px"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Text + Highlights */}
              <div className="lg:col-span-6 text-center lg:text-left">
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                  Rishikesh has been a home for yoga and meditation for thousands of years, thanks to its deep yogic roots and the many experienced teachers who still teach here today. With its ancient temples, quiet ashrams and the sacred Ganges flowing through it, the town naturally puts your mind at ease and makes space for real reflection. The Himalayan foothills add to the beauty, giving you a simple, calm place to de-stress and find balance.
                </p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                  Whether you're here for a short retreat or a full, internationally recognized teacher training, Rishikesh has an option for every level. Many schools, including ours, build daily life around sattvic food, pranayama, chanting and mindfulness — and with students arriving from every corner of the globe, you'll always have a warm, supportive community around you on this journey.
                </p>

                <div className="mt-6 divide-y divide-[#e3dac9]/70">
                  {whyYogaHighlights.map((h) => {
                    const Icon = h.icon;
                    return (
                      <div
                        key={h.title}
                        className="flex items-start gap-4 py-4 text-left"
                      >
                        <span className="shrink-0 w-11 h-11 rounded-full bg-[#1c3b2b] text-white flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div>
                          <h4 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] tracking-wide mb-1">
                            {h.title}
                          </h4>
                          <p className="text-sm text-stone-600 leading-relaxed font-medium">
                            {h.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Reach Rishikesh */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <Kicker>Getting Here</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                How to Reach Rishikesh
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Easy and convenient connectivity from major cities across India.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#e3dac9] max-w-5xl mx-auto bg-[#fdfbf7] rounded-3xl border border-[#e3dac9] shadow-xs">
              {howToReach.map((r) => {
                const Icon = r.icon;
                const BadgeIcon = r.badgeIcon;
                return (
                  <div key={r.title} className="p-7 sm:p-8 text-center">
                    <span className="inline-flex w-12 h-12 rounded-xl bg-[#1c3b2b]/10 text-[#1c3b2b] items-center justify-center mb-3">
                      <Icon className="w-5.5 h-5.5" />
                    </span>
                    <h3 className="font-belleza text-xl font-normal text-[#1e2422] tracking-wide mb-3">
                      {r.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {r.lines.map((line, i) => (
                        <p key={i} className="text-sm text-stone-600 leading-relaxed font-medium">
                          {line}
                        </p>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#f4efe6] text-[#1c3b2b] border border-[#1c3b2b]/20">
                      <BadgeIcon className="w-3.5 h-3.5" />
                      {r.badge}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <PlacesCarousel />

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

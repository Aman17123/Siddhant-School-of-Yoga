import Image from "next/image";
import { Container, Kicker, HeadingDivider } from "../ui";
import { Utensils, Home, Wifi, Sun, Sparkles, Check } from "lucide-react";

export default function ResidentialExperience({ showSchedule = true }) {
  const schedule = [
    {
      time: "05:30 AM",
      title: "Wake Up & Shatkarma Cleansing",
      desc: "Herbal tea, Jal Neti, and morning purification.",
    },
    {
      time: "06:30 AM",
      title: "Classical Pranayama & Chanting",
      desc: "Rhythmic breathwork, Kumbhaka, Bandhas, and Vedic mantras.",
    },
    {
      time: "07:30 AM",
      title: "Traditional Hatha Yoga Asana",
      desc: "Dynamic alignment, modifications, and somatic awareness.",
    },
    {
      time: "09:00 AM",
      title: "Nutritious Sattvic Breakfast",
      desc: "Fresh fruits, porridge, Ayurvedic herbal tonics, and nuts.",
    },
    {
      time: "11:00 AM",
      title: "Yoga Anatomy & Physiology",
      desc: "Biomechanics, musculoskeletal alignment, and fascia science.",
    },
    {
      time: "01:00 PM",
      title: "Ayurvedic Vegetarian Lunch",
      desc: "Freshly cooked tridoshic meals supporting high energy and lightness.",
    },
    {
      time: "04:00 PM",
      title: "Ashtanga Vinyasa & Adjustments",
      desc: "Primary series flow, hands-on adjustments, and teacher cues.",
    },
    {
      time: "06:00 PM",
      title: "Meditation, Yoga Nidra & Sound",
      desc: "Kundalini meditation, Ganga Aarti, and deep restorative stillness.",
    },
    {
      time: "07:30 PM",
      title: "Sattvic Dinner & Rest",
      desc: "Wholesome evening meal followed by self-study and lights off at 10 PM.",
    },
  ];

  const stayFeatures = [
    {
      icon: Utensils,
      title: "Three Sattvic Yogic Meals Daily",
      desc: "Freshly prepared organic Ayurvedic vegetarian cuisine designed to purify digestion and support vigorous daily practice.",
    },
    {
      icon: Home,
      title: "Peaceful Private & Shared Rooms",
      desc: "Immaculately clean rooms with attached modern bathrooms, 24/7 hot water, comfortable mattresses, and mountain views.",
    },
    {
      icon: Sun,
      title: "Sunlit Rooftop & Yoga Shala",
      desc: "Dedicated wooden yoga hall equipped with mats, blocks, belts, and bolsters for quiet self-practice and group sadhana.",
    },
    {
      icon: Wifi,
      title: "High-Speed Wi-Fi & Laundry Services",
      desc: "Reliable internet throughout the ashram, on-site laundry services, filtered drinking water, and round-the-clock assistance.",
    },
  ];

  return (
    <section
      id="residential"
      className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/60"
    >
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 lg:mb-10">
          <Kicker>Our Ashram</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
            A Peaceful Sanctuary to Rest, Nourish &amp; Grow
          </h2>
          <HeadingDivider className="mb-3" />
          <p className="font-figtree text-sm sm:text-base text-stone-600 leading-relaxed font-medium max-w-2xl mx-auto">
            Your living environment is crucial to your yogic transformation. At
            Siddhant School of Yoga, we provide clean, serene accommodation,
            loving ashram staff, and freshly prepared Ayurvedic nourishment to
            keep your body vibrant and mind tranquil.
          </p>
        </div>

        {/* 2-Column: Features + Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 font-figtree">
          {/* Left: 4 Features (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {stayFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white border border-[#c8ece2] shadow-xs flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#158b72]/10 text-[#158b72] flex items-center justify-center shrink-0 mt-0.5 mx-auto sm:mx-0">
                    <Icon className="w-5 h-5 text-[#158b72]" />
                  </div>
                  <div>
                    <h4 className="font-belleza text-base font-normal text-[#1e2422] tracking-wide mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-[15px] text-stone-600 leading-relaxed font-medium">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Ashram Photos (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="/images/gallery_images/food-gallery3.webp"
                alt="Ashram exterior and serene Himalayan surroundings in Rishikesh"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-2 border-white mt-6 sm:mt-10">
              <Image
                src="/images/gallery_images/food-gallery4.webp"
                alt="Peaceful ashram sadhana environment in Rishikesh"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Daily Schedule Timeline Strip */}
        {showSchedule && (
          <div className="p-7 sm:p-10 rounded-3xl bg-white border border-[#c8ece2] shadow-sm font-figtree">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#c8ece2] text-center sm:text-left">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#158b72] font-semibold block mb-1">
                  A Day in the Ashram
                </span>
                <h3 className="font-belleza text-2xl sm:text-3xl font-normal text-[#1e2422] tracking-wide">
                  Typical Daily Sadhana Schedule
                </h3>
              </div>
              <span className="text-xs bg-[#def4ee4d] text-[#158b72] font-semibold px-4 py-2 rounded-full border border-[#158b72]/40">
                Monday – Saturday
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {schedule.map((s, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#def4ee4d] border border-[#c8ece2] flex flex-col justify-between text-center sm:text-left"
                >
                  <div>
                    <span className="text-xs font-bold text-[#158b72] tracking-wider block mb-1">
                      {s.time}
                    </span>
                    <h4 className="font-belleza text-base font-normal text-[#1e2422] tracking-wide mb-1">
                      {s.title}
                    </h4>
                    <p className="text-[15px] text-stone-600 font-medium leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

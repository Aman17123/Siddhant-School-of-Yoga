"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Container, Kicker, HeadingDivider } from "../ui";

const places = [
  {
    title: "Triveni Ghat",
    tag: "Yoga & Spiritual",
    image: "/images/gallery_images/havan-fire-ritual-yoga-ceremony-rishikesh.webp",
    alt: "Evening Ganga Aarti fire ceremony at Triveni Ghat in Rishikesh",
    desc: "The holiest bathing ghat in Rishikesh, famous for its mesmerizing evening Ganga Aarti — a beautiful excursion during any yoga course here.",
  },
  {
    title: "Parmarth Niketan Ashram",
    tag: "Yoga & Spiritual",
    image: "/images/holi-festival-celebration.png",
    alt: "Holi festival celebration during the International Yoga Festival at Parmarth Niketan Ashram, Rishikesh",
    desc: "One of the largest ashrams on the Ganges, hosting the International Yoga Festival and daily satsang, chanting and Aarti by the river.",
  },
  {
    title: "Lakshman Jhula & Ram Jhula",
    tag: "Sightseeing",
    image: "/images/rishikesh/rishikesh-asahram.png",
    alt: "Scenic view near Lakshman Jhula and Ram Jhula bridges in Rishikesh",
    desc: "Iconic suspension bridges over the Ganges, lined with temples, cafes and shops — a relaxed walk on any rest day.",
  },
  {
    title: "Neelkanth Mahadev Temple",
    tag: "Pilgrimage",
    image: "/images/gallery_images/yoga-certification-ceremony-shiva-statue-rishikesh.webp",
    alt: "Ancient Shiva temple excursion near Rishikesh",
    desc: "An ancient Shiva temple set deep in forested hills, roughly 12 km from town — reachable by a scenic drive or forest trek.",
  },
  {
    title: "Beatles Ashram (Chaurasi Kutia)",
    tag: "Meditation & History",
    image: "/images/gallery_images/yoga-students-temple-visit-rishikesh-india.webp",
    alt: "Beatles Ashram Chaurasi Kutia excursion in Rishikesh",
    desc: "The abandoned ashram where The Beatles studied meditation in 1968, now covered in art and quiet forest — a favorite offbeat excursion.",
  },
  {
    title: "Kunjapuri Devi Temple",
    tag: "Sunrise Trek",
    image: "/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp",
    alt: "Himalayan sunrise views near Kunjapuri Devi Temple",
    desc: "A hilltop temple renowned for panoramic Himalayan sunrise views — many students make the early trek up during their course.",
  },
  {
    title: "Vashistha Gufa (Cave)",
    tag: "Meditation",
    image: "/images/rishikesh/lord_shiva_rishikesh.png",
    alt: "Vashistha Gufa meditation cave near Rishikesh",
    desc: "An ancient riverside cave associated with sage Vashistha, still used today for quiet, undisturbed meditation.",
  },
  {
    title: "Shivpuri",
    tag: "Adventure & Rafting",
    image: "/images/gallery_images/warrior-pose-yoga-ganges-river-rishikesh.webp",
    alt: "River rafting and camping base at Shivpuri near Rishikesh",
    desc: "The base camp for white-water rafting on the Ganges, with riverside camping — a popular rest-day adventure for students.",
  },
  {
    title: "Neer Garh Waterfall",
    tag: "Adventure Trek",
    image: "/images/rishikesh/ganga.png",
    alt: "Neer Garh Waterfall trek near Rishikesh",
    desc: "A short, refreshing forest trek leading to a natural waterfall — an easy half-day excursion from the ashram.",
  },
  {
    title: "Rajaji National Park",
    tag: "Wildlife & Adventure",
    image: "/images/rishikesh/yoga_asana.png",
    alt: "Rajaji National Park jungle safari near Rishikesh",
    desc: "A nearby national park offering jungle safaris with elephants, tigers and diverse wildlife, for a change of pace from practice.",
  },
];

export default function PlacesCarousel() {
  const scrollRef = useRef(null);

  const scrollByCard = (dir) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("[data-place-card]");
    const amount = card ? card.offsetWidth + 20 : 300;
    scrollRef.current.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <Container className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 lg:mb-10 text-center sm:text-left">
          <div>
            <Kicker>Excursions During Your YTTC</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
              Best Places to Visit in Rishikesh
            </h2>
            <HeadingDivider />
          </div>

          <div className="hidden sm:flex items-center gap-2.5 shrink-0 pb-1">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll places left"
              className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#e3dac9] shadow-xs hover:shadow-md hover:border-[#1c3b2b] hover:text-[#1c3b2b] flex items-center justify-center text-[#55564c] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Scroll places right"
              className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#e3dac9] shadow-xs hover:shadow-md hover:border-[#1c3b2b] hover:text-[#1c3b2b] flex items-center justify-center text-[#55564c] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-thin pb-3 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {places.map((place) => (
            <div
              key={place.title}
              data-place-card
              className="group shrink-0 w-[80%] sm:w-[46%] lg:w-[calc((100%-4rem)/3)] max-w-[360px] bg-[#fdfbf7] rounded-2xl overflow-hidden border border-[#e3dac9] shadow-xs hover:shadow-lg transition-all duration-300 snap-start"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={place.image}
                  alt={place.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-[#1c3b2b] text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                  <MapPin className="w-3 h-3" />
                  {place.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-belleza text-lg font-normal text-[#1e2422] tracking-wide mb-1.5">
                  {place.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed font-medium">
                  {place.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

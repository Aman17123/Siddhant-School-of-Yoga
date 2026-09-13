import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "./ui";

export default function TrustStrip() {
  const trustItems = [
    {
      title: "Yoga Alliance USA",
      desc: "RYS 200, 300, 500 Accredited",
      badge: "/logo/yoga-alliance.webp",
      isImage: true,
    },
    {
      title: "Google Rating 4.9★",
      desc: "48 Verified Google Reviews",
      badge: "/logo/google.svg",
      isGoogle: true,
      url: "https://www.google.com/search?q=siddhant+school+of+yoga",
    },
    {
      title: "TripAdvisor Recommended",
      desc: "Top Rated School in Rishikesh",
      badge: "/logo/tripadvisor.svg",
      isTripAdvisor: true,
      url: "https://www.google.com/search?q=siddhant+school+of+yoga+tripadvisor",
    },
    {
      title: "100-Day Support",
      desc: "Post-Course Practice Schedule",
      badge: "/logo/certificate-rys-200.webp",
      isCertificate: true,
    },
  ];

  return (
    <section className="bg-white border-y border-[#EBE5D8] py-5 sm:py-6 shadow-xs relative z-20">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center">
          {trustItems.map((item, idx) => {
            const Content = (
              <div className="flex items-center gap-3 sm:gap-3.5 justify-center md:justify-start group transition-transform duration-300 hover:translate-y-[-2px]">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FAF6EE] border border-[#EBE5D8] group-hover:border-[#f5b860]/60 flex items-center justify-center shrink-0 shadow-2xs p-2 transition-colors">
                  <Image
                    src={item.badge}
                    alt={item.title}
                    width={38}
                    height={38}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="font-belleza text-sm sm:text-base text-[#1e2422] tracking-wide leading-tight group-hover:text-[#f22924] transition-colors">
                    {item.title}
                  </span>
                  <span className="font-figtree text-[10.5px] sm:text-[11.5px] text-stone-500 font-normal leading-tight mt-0.5">
                    {item.desc}
                  </span>
                </div>
              </div>
            );

            if (item.url) {
              return (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none"
                  title={`View ${item.title} details`}
                >
                  {Content}
                </a>
              );
            }

            return <div key={idx}>{Content}</div>;
          })}
        </div>
      </Container>
    </section>
  );
}

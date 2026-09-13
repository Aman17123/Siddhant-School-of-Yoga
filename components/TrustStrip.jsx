import Image from 'next/image';
import { Star } from 'lucide-react';
import { Container } from './ui';

export default function TrustStrip() {
  const trustItems = [
    {
      title: "Yoga Alliance USA RYS 200",
      desc: "Internationally Accredited School",
      badge: "/logo/rys-200.svg",
    },
    {
      title: "Yoga Alliance USA RYS 300",
      desc: "Advanced Teacher Registry",
      badge: "/logo/rys-300.svg",
    },
    {
      title: "Yoga Alliance USA RYS 500",
      desc: "Master School Certification",
      badge: "/logo/rys-500.svg",
    },
    {
      title: "Google Verified 4.8★",
      desc: "Based on 200+ Student Reviews",
      isGoogle: true,
    },
  ];

  return (
    <section className="bg-white border-y border-[#EBE5D8] py-6 sm:py-7 shadow-xs">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center">
          
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5 justify-center md:justify-start">
              {item.isGoogle ? (
                <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] border border-[#EBE5D8] flex items-center justify-center shrink-0 shadow-2xs p-2.5">
                  <Image
                    src="/logo/google.svg"
                    alt="Google Rating"
                    width={26}
                    height={26}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-12 h-12 rounded-xl bg-[#FAF6EE] border border-[#EBE5D8] p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                  <Image
                    src={item.badge}
                    alt={item.title}
                    width={44}
                    height={44}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              
              <div className="flex flex-col">
                <span className="font-bold text-xs sm:text-sm text-[#1F1E1D] tracking-tight">
                  {item.title}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}

        </div>
      </Container>
    </section>
  );
}


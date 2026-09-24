import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";
import { whatsappLink } from "@/data/siteData";

export default function Kundalini200HourFounderSection() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Photo collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto lg:max-w-none">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src="/images/founder/acharya-siddhant-founder-meditation-rishikesh.webp"
                  alt="Acharya Siddhant in deep meditation and Kundalini sadhana in Rishikesh"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white mt-6 sm:mt-8">
                <Image
                  src="/images/founder/acharya-siddhant-founder-with-students-rishikesh.webp"
                  alt="Acharya Siddhant guiding students in chakra and Kundalini practice"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>

            <div className="hidden sm:flex absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#fdfbf7]/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#1c3b2b]/30 items-center gap-2 z-20">
              <span className="w-2 h-2 rounded-full bg-[#b85c00] animate-pulse" />
              <span className="text-xs font-bold text-[#1e2422] tracking-wide">
                15+ Years of Chakra &amp; Kundalini Sadhana
              </span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <Kicker>Founder &amp; Kundalini Expert</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-[#1e2422] tracking-wide leading-[1.2] mb-1 lg:mb-2">
              Acharya Siddhant
            </h2>
            <HeadingDivider center={false} className="mb-3" />

            <div className="relative pl-5 py-4 border-l-4 border-[#1c3b2b] bg-[#f4efe6] rounded-r-2xl mb-6 pr-4 shadow-2xs text-left">
              <Quote className="w-5 h-5 text-[#1c3b2b]/80 mb-1" />
              <p className="font-figtree italic text-sm sm:text-base text-[#1e2422] leading-relaxed">
                &ldquo;Kundalini is not something you chase — it is something you finally allow yourself to feel, once every chakra is truly awake.&rdquo;
              </p>
              <div className="mt-2 text-right">
                <span className="font-figtree text-xs font-semibold text-[#1c3b2b] tracking-wider uppercase">
                  &mdash; Acharya Siddhant
                </span>
              </div>
            </div>

            <p className="font-figtree text-sm sm:text-base text-stone-600 leading-relaxed mb-4 font-medium">
              Acharya Siddhant has spent over fifteen years in intensive sadhana across the Himalayas, mastering classical Hatha Yoga alongside the deeper science of chakra and Kundalini energy under revered ascetics in Uttarakhand.
            </p>

            <p className="font-figtree text-sm sm:text-base text-stone-600 leading-relaxed mb-8 font-medium">
              He personally teaches every 200-Hour Kundalini batch at Siddhant School of Yoga, guiding each student through the full journey of discovering and awakening every chakra, Yoga Alliance RYS-200 certification and all, before they ever consider advancing further.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
              <Link
                href="/book-my-yoga-in-rishikesh-india"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs sm:text-sm font-figtree font-semibold bg-[#b85c00] hover:bg-[#96490a] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Enroll Now
              </Link>

              <a
                href={whatsappLink(
                  "Namaste Acharya Siddhant! I would like to inquire about your Kundalini Yoga teachings and the 200-Hour Kundalini TTC in Rishikesh.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs sm:text-sm font-figtree font-semibold bg-[#f4efe6] border-2 border-[#1c3b2b] text-[#1c3b2b] hover:bg-[#1c3b2b] hover:text-white transition-all duration-300"
              >
                Chat With Master
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

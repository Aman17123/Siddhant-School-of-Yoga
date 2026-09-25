import Image from "next/image";
import { Kicker, HeadingDivider } from "@/components/ui";

/**
 * Generic version of the 2-column "Kundalini Is Your Hidden Energy" deep-dive
 * section from the 100-Hour Kundalini TTC page — sticky intro + framed image
 * on the left, a numbered list with a closing pull-quote on the right.
 */
export default function RetreatDeepDive({
  kicker,
  title,
  paragraphs = [],
  image,
  imageAlt,
  listIntro,
  listItems = [],
  summary,
  quote,
  bgClassName = "bg-[#fdfbf7]",
}) {
  return (
    <section className={`py-14 sm:py-16 lg:py-20 border-b border-[#e3dac9]/70 font-figtree ${bgClassName}`}>
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Intro */}
          <div className="text-center lg:text-left lg:sticky lg:top-20 lg:self-start">
            <Kicker>{kicker}</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
              {title}
            </h2>
            <HeadingDivider center={false} />

            {paragraphs.map((p, i) => (
              <p key={i} className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mt-4">
                {p}
              </p>
            ))}

            {image && (
              <div className="relative mt-6 rounded-2xl overflow-hidden border-2 border-white shadow-lg aspect-[16/10] max-w-lg mx-auto lg:mx-0">
                <Image
                  src={image}
                  alt={imageAlt || title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

          {/* Right: Numbered list + quote */}
          <div>
            {listIntro && (
              <p className="text-xs sm:text-sm text-stone-500 font-medium mb-2 text-center lg:text-left">
                {listIntro}
              </p>
            )}
            <div className="divide-y divide-[#e3dac9]">
              {listItems.map((item, i) => (
                <div key={item.title} className="flex items-start gap-5 py-5">
                  <span className="font-belleza text-2xl sm:text-3xl text-[#b85c00] shrink-0 w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] tracking-wide mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {summary && (
              <p className="mt-5 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                {summary}
              </p>
            )}

            {quote && (
              <div className="mt-6 bg-[#f4efe6] border-l-4 border-[#b85c00] rounded-r-2xl px-5 py-4">
                <p className="text-sm sm:text-base text-[#1e2422] italic leading-relaxed font-medium">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

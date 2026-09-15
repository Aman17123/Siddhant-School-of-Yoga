import Image from "next/image";
import Link from "next/link";
import { Wind, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Container, Kicker, HeadingDivider, ButtonLink } from "../ui";
import { whatsappLink } from "@/data/siteData";

export default function PranayamaPreview() {
  const breathPillars = [
    {
      title: "Rhythmic Ratio & Kumbhaka",
      desc: "Moving beyond casual breathing into classical bandhas, internal/external retention, and nervous system control.",
    },
    {
      title: "Nadi Shodhana & Energy Purification",
      desc: "Purifying the 72,000 energetic pathways (nadis) to awaken Ida, Pingala, and allow flow through Sushumna.",
    },
    {
      title: "Pranayama as the Bridge to Dhyana",
      desc: "Steady breath creates a steady mind. We teach students how rhythmic breath naturally dissolves wandering thoughts.",
    },
    {
      title: "Diagnosis of Individual Breathing Patterns",
      desc: "Personalized corrections for shallow diaphragmatic chest breathing, restoring optimal oxygenation and mental peace.",
    },
  ];

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/70 relative overflow-hidden">
      {/* Subtle wind wave accents */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 7 cols */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <Kicker>Pranayama</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] mb-1 lg:mb-3 leading-[1.2]">
              The Science of Prana — Beyond Simple Breathing Exercises
            </h2>
            <HeadingDivider center={false} className="mb-3" />

            <p className="font-figtree text-sm sm:text-base text-stone-600 leading-relaxed mb-6 font-medium max-w-2xl mx-auto lg:mx-0">
              Please be aware that only breathing exercises are not Pranayama.
              Prana is the base of life, and authentic Pranayama practice can
              solve almost all problems of your life. At Siddhant School of
              Yoga, we teach the subtle step-by-step science of Kumbhaka
              (retention), Bandhas (locks), and Nadi purification to awaken
              vital energy and lead you into profound meditation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
              {breathPillars.map((p, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white border border-[#c8ece2] shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#158b72] shrink-0" />
                    <h4 className="font-belleza text-sm font-normal text-[#1e2422] tracking-wide">
                      {p.title}
                    </h4>
                  </div>
                  <p className="font-figtree text-[15px] text-stone-600 leading-relaxed pl-6">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <ButtonLink href="#courses" variant="primary">
                <span>View Breathwork TTC Modules</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
              <a
                href={whatsappLink(
                  "Namaste! I want to learn more about the Pranayama curriculum at Siddhant School of Yoga.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-figtree font-semibold text-[#158b72] hover:text-[#0f6b57] px-4 py-3 transition-colors"
              >
                <span>Consult Master on WhatsApp &rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: 5 cols */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/gallery_images/yoga-retreat-himalayan-mountains-rishikesh.webp"
                  alt="Students practicing early morning classical Pranayama in Himalayan Rishikesh"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="font-figtree text-[11px] uppercase tracking-widest text-[#158b72] font-semibold block mb-1">
                    Daily Morning Sadhana
                  </span>
                  <p className="font-figtree text-sm sm:text-base leading-relaxed tracking-normal text-white/90">
                    &ldquo;Pranayama is the foundation of meditation, asana, and
                    every true healing method.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

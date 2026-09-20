import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, Award, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CtaBanner from "@/components/home/CtaBanner";
import { Kicker, HeadingDivider } from "@/components/ui";
import { teachers } from "@/data/siteData";

export const metadata = {
  title: "Our Yoga Teachers | Siddhant School of Yoga, Rishikesh",
  description:
    "Meet the faculty of Siddhant School of Yoga in Rishikesh — Acharya Siddhant and our senior teachers specializing in Hatha, Ashtanga, Pranayama, meditation, anatomy and yoga philosophy.",
};

const yogaGurus = [
  {
    name: "Patanjali",
    initials: "P",
    tag: "Classical Yoga",
    desc: "Author of the Yoga Sutras — father of classical yoga.",
    image: "/images/Yoga_Gurus/1_Patanjali.jpg",
  },
  {
    name: "T. Krishnamacharya",
    initials: "TK",
    tag: "Hatha Yoga",
    desc: "Father of modern yoga — teacher to Iyengar and Jois.",
    image: "/images/Yoga_Gurus/2_T_Krishnamacharya.jpg",
  },
  {
    name: "B.K.S. Iyengar",
    initials: "BKS",
    tag: "Iyengar Yoga",
    desc: "Founder of Iyengar Yoga — precision alignment with props.",
    image: "/images/Yoga_Gurus/3_BKS_Iyengar.jpg",
  },
  {
    name: "K. Pattabhi Jois",
    initials: "KP",
    tag: "Ashtanga Vinyasa",
    desc: "Founder of Ashtanga Vinyasa — root of modern vinyasa.",
    image: "/images/Yoga_Gurus/4_K_Pattabhi_Jois.jpg",
  },
  {
    name: "Swami Sivananda",
    initials: "SS",
    tag: "Integral Yoga",
    desc: "Founder of the Divine Life Society, spreading yoga worldwide.",
    image: "/images/Yoga_Gurus/5_Swami_Sivananda.jpg",
  },
  {
    name: "Paramahansa Yogananda",
    initials: "PY",
    tag: "Kriya Yoga",
    desc: "Brought Kriya Yoga to the West via Autobiography of a Yogi.",
    image: "/images/Yoga_Gurus/6_Paramahansa_Yogananda.jpg",
  },
  {
    name: "Swami Vivekananda",
    initials: "SV",
    tag: "Yoga & Vedanta",
    desc: "First to bring yoga and Vedanta to the West.",
    image: "/images/Yoga_Gurus/7_Swami_Vivekananda.jpg",
  },
  {
    name: "Indra Devi",
    initials: "ID",
    tag: "First Lady of Yoga",
    desc: "The \"First Lady of Yoga,\" popularizing it in Hollywood.",
    image: "/images/Yoga_Gurus/8_Indra_Devi.jpg",
  },
];

export default function TeacherPage() {
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
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0f6b57]/50 shrink-0" />
                  <Link href="/about" className="hover:text-[#158b72] transition-colors">
                    About Us
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0f6b57]/50 shrink-0" />
                  <span className="text-[#0f6b57] font-semibold">Our Teachers</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                  <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                    Our
                  </span>
                  <span className="block text-2xl sm:text-3xl font-normal">
                    Yoga Teachers
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#0f6b57]/90 leading-relaxed max-w-md">
                  Meet the faculty of Siddhant School of Yoga — Acharya Siddhant and a team of dedicated Himalayan teachers, each a specialist in their own subject.
                </p>
              </div>

              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/founder/acharya-siddhant-founder-with-students-rishikesh.webp"
                    alt="Yoga teachers at Siddhant School of Yoga in Rishikesh"
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

        {/* Yoga Gurus */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Yoga Gurus</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Teachers of Siddhant School of Yoga
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Experienced yoga teachers at Siddhant School of Yoga
              </p>
            </div>

            <div className="max-w-3xl mx-auto text-center space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-10">
              <p>
                Yoga teachers are the spine of a yoga school. They have the right eligibility and skills to motivate you to start and continue your yoga practice, so that you can grow. Yoga teachers are also very important for a healthy society — they help you develop good qualities so you can live a balanced life and contribute to building a healthy community.
              </p>
              <p>
                In our society, we need good doctors, engineers, lawyers and many other professionals — but if you look deeply, yoga teachers are just as important for a better, more balanced society. Yoga is not an option; for a balanced lifestyle, it is compulsory. And if yoga is compulsory, yoga teachers are essential.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
              <div className="bg-white rounded-2xl border border-[#c8ece2] p-6 shadow-xs">
                <h3 className="font-belleza text-lg text-[#1e2422] mb-3 text-center sm:text-left">
                  Qualities for a Healthy Society
                </h3>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
                  {[
                    "Commitment attitude",
                    "Will power",
                    "Right practice",
                    "Patience",
                    "Mindfulness",
                    "Relaxation",
                    "Discipline",
                    "Focus",
                    "Right way of breathing",
                    "Right understanding",
                    "Positive attitude",
                    "Gratitude attitude",
                  ].map((q) => (
                    <li key={q} className="flex items-start gap-1.5 text-xs sm:text-[13px] text-stone-700">
                      <Check className="w-3.5 h-3.5 text-[#158b72] mt-0.5 shrink-0" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-[#c8ece2] p-6 shadow-xs">
                <h3 className="font-belleza text-lg text-[#1e2422] mb-3 text-center sm:text-left">
                  What Makes Our Teachers Different
                </h3>
                <ul className="space-y-2">
                  {[
                    "Right knowledge about the subject",
                    "Equal behavior toward every student",
                    "Good, clear character",
                    "Self-discipline",
                    "Self-confidence",
                    "Motivational ability",
                    "Responsible & accountable",
                    "Dedicated self-practitioner",
                  ].map((q) => (
                    <li key={q} className="flex items-start gap-1.5 text-xs sm:text-[13px] text-stone-700">
                      <Check className="w-3.5 h-3.5 text-[#158b72] mt-0.5 shrink-0" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              <p>
                Siddhant School of Yoga understands the importance of a yoga teacher, and we are careful in choosing who teaches at our school. Because of these qualities, our yoga teachers deserve respect and honor — a yoga teacher has real potential to help shape a great personality in you.
              </p>
              <p>
                A good cook prepares delicious food out of simple ingredients — in the same way, a good yoga teacher can transform you from an ordinary person into a dedicated yoga practitioner. Siddhant School of Yoga is proud to present teachers of this quality to society through every course we teach.
              </p>
            </div>
          </div>
        </section>

        {/* Idols of Our Lineage */}
        <section className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <Kicker>Yoga Gurus Who Inspired Us</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Idols of Our Lineage
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Great Indian masters kept the ancient yoga tradition alive, passing knowledge through generations of devoted practitioners.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {yogaGurus.map((guru) => (
                <div
                  key={guru.name}
                  className="group bg-white rounded-2xl border border-[#c8ece2]/70 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6 flex flex-col items-center text-center"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#c8ece2] shrink-0 mb-3">
                    <Image
                      src={guru.image}
                      alt={guru.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] mb-1.5 leading-snug">
                    {guru.name}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#158b72]/10 text-[#158b72] text-[10px] sm:text-[11px] font-bold uppercase tracking-wide mb-2">
                    {guru.tag}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-500 leading-snug">
                    {guru.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teachers Grid */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Meet Our Teacher</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Siddhant School of Yoga Teachers
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Our faculty combines decades of traditional monastic training in the Himalayas with deep scientific knowledge in biomechanics, alignment and subtle energetic anatomy.
              </p>
            </div>

            <div className="flex flex-col gap-5 max-w-5xl mx-auto">
              {teachers.map((teacher, i) => {
                const reversed = i % 2 === 1;
                return (
                  <div
                    key={teacher.name}
                    className={`group bg-white rounded-2xl overflow-hidden border border-[#c8ece2] shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col ${
                      reversed ? "sm:flex-row-reverse" : "sm:flex-row"
                    }`}
                  >
                    <div className="p-6 sm:p-8 sm:w-2/3 flex flex-col justify-center">
                      <h3 className="text-2xl sm:text-3xl font-belleza font-normal tracking-wide text-[#1e2422] mb-3">
                        {teacher.name}
                      </h3>
                      <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-[#158b72] text-white text-[11px] font-bold mb-4">
                        {teacher.role}
                      </span>
                      <div className="space-y-3">
                        {teacher.bio.split("\n\n").map((para, idx) => (
                          <p key={idx} className="text-sm sm:text-[15px] text-stone-700 leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="relative w-full sm:w-1/3 aspect-[4/3] sm:aspect-auto min-h-[420px]">
                      <Image
                        src={teacher.image}
                        alt={teacher.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-[#158b72] text-[11px] font-bold shadow-2xs">
                        <Award className="w-3 h-3" />
                        {teacher.exp}
                      </span>
                    </div>
                  </div>
                );
              })}
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

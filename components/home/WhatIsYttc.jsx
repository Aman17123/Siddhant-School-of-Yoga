import { Kicker, HeadingDivider } from "../ui";

export default function WhatIsYttc() {
  return (
    <section
      id="what-is-yttc"
      className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/70 font-figtree"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto">
        {/* Title & Subtitle (Centered, 90% width, matching site design system) */}
        <div className="text-center w-full mb-8 lg:mb-10">
          <Kicker>YTTC Explained</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            What Is a Yoga Teacher Training Course (YTTC)?
          </h2>
          <HeadingDivider />
        </div>

        {/* Explanatory Paragraphs (90% width, matching homepage font size) */}
        <div className="text-center w-full space-y-3 text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-6">
          <p>
            A Yoga Teacher Training Course, usually written as YTTC, is a
            structured program that teaches you two things together: how to
            practise yoga the right way, and how to teach it safely to other
            people. Courses are measured in hours — 100, 200, 300 or 500 — based
            on how many hours of class time, study and guided practice they
            include. These hour-levels follow guidelines set by Yoga Alliance,
            the main international body that sets standards for yoga education
            around the world.
          </p>

          <p>
            A well-built yoga TTC usually covers physical postures (asana),
            breathing exercises (pranayama), meditation, yoga philosophy,
            teaching methods, and basic human anatomy. Some schools, including
            Siddhant School of Yoga in Rishikesh, go further — adding mantra
            chanting, internal locks and seals known as bandhas and mudras, and
            classical cleansing techniques called shatkarma. These extra
            subjects are closer to how yoga was originally taught in India, long
            before it became a global fitness trend.
          </p>

          <p>
            Once you finish a recognised course, you receive a certificate. If
            the school holds Yoga Alliance registration, known as RYS, that
            certificate lets you register as a Registered Yoga Teacher, or RYT,
            and teach professionally in studios, gyms, and retreat centres
            almost anywhere in the world.
          </p>
        </div>

        {/* Quick Facts Table Box (90% width, slim & compact) */}
        <div className="w-full rounded-2xl border border-[#c8ece2] p-4 sm:p-5 bg-white shadow-2xs">
          <h3 className="text-center font-belleza font-bold text-base sm:text-lg text-[#1e2422] mb-3">
            Yoga Teacher Training in Rishikesh — Quick Facts
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-xs sm:text-[13px]">
            {/* Item 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
              <span className="text-[#158b72] font-medium shrink-0">
                Course lengths
              </span>
              <span className="text-stone-800 font-normal sm:text-right">
                100 · 200 · 300 · 500 hours
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
              <span className="text-[#158b72] font-medium shrink-0">
                Location
              </span>
              <span className="text-stone-800 font-normal sm:text-right">
                Veerbhadra, Rishikesh, India
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
              <span className="text-[#158b72] font-medium shrink-0">
                Certification body
              </span>
              <span className="text-stone-800 font-normal sm:text-right">
                Yoga Alliance USA (RYS 200 / 300 / 500)
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b border-[#c8ece2]/70 text-center sm:text-left">
              <span className="text-[#158b72] font-medium shrink-0">
                Lead teacher
              </span>
              <span className="text-stone-800 font-normal sm:text-right">
                Acharya Siddhant, every level
              </span>
            </div>

            {/* Item 5 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 border-b md:border-b-0 border-[#c8ece2]/70 text-center sm:text-left">
              <span className="text-[#158b72] font-medium shrink-0">
                What&apos;s included
              </span>
              <span className="text-stone-800 font-normal sm:text-right">
                Accommodation, sattvic meals, study material
              </span>
            </div>

            {/* Item 6 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5 text-center sm:text-left">
              <span className="text-[#158b72] font-medium shrink-0">
                After graduation
              </span>
              <span className="text-stone-800 font-normal sm:text-right">
                100-day home practice support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

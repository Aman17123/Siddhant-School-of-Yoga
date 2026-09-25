"use client";

import Image from "next/image";
import {
  Wind,
  Flame,
  Droplets,
  MessageCircle,
  ArrowRight,
  Mail,
} from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { site, whatsappLink } from "@/data/siteData";
import { SectionHead, SylList, Accordion } from "./RetreatUI";
import RetreatWhyChooseUs from "./RetreatWhyChooseUs";
import RetreatDatesFees from "./RetreatDatesFees";
import RetreatDailySchedule from "./RetreatDailySchedule";
import RetreatWhatsInclude from "./RetreatWhatsInclude";
import ResidentialExperience from "@/components/home/ResidentialExperience";
import Teachers from "@/components/home/Teachers";

export const sectionNavItems = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "dates-fees", label: "Dates & Fees" },
  { id: "schedule", label: "Daily Schedule" },
  { id: "whats-include", label: "What's Include" },
  { id: "teachers", label: "Teachers" },
  { id: "faq", label: "FAQ" },
];

/* ---------------------------------------------------------------- */
/* Data                                                              */
/* ---------------------------------------------------------------- */

const doshaCards = [
  {
    icon: Wind,
    title: "Vata",
    subtitle: "Air & Space",
    image: "/images/dancer-pose-natarajasana-riverside.jpg",
    alt: "Dynamic dancer pose practice representing the movement of Vata dosha in Rishikesh",
    text: "Vata governs movement, creativity and quick thinking. In balance, it brings lightness and inspiration; out of balance, it shows up as anxiety, restlessness and irregular digestion.",
  },
  {
    icon: Flame,
    title: "Pitta",
    subtitle: "Fire & Water",
    image: "/images/havan-fire-ceremony-group.jpg",
    alt: "Havan fire ceremony representing the transformative fire of Pitta dosha in Rishikesh",
    text: "Pitta governs transformation, digestion and focus. In balance, it brings clarity and drive; out of balance, it shows up as irritability, inflammation and an overheated mind.",
  },
  {
    icon: Droplets,
    title: "Kapha",
    subtitle: "Earth & Water",
    image: "/images/lotus-pose-meditation-rocky-riverbank-rishikesh.jpg",
    alt: "Grounded lotus pose meditation representing the stability of Kapha dosha in Rishikesh",
    text: "Kapha governs structure, stability and calm. In balance, it brings steadiness and endurance; out of balance, it shows up as lethargy, heaviness and resistance to change.",
  },
];

const syllabusItems = [
  {
    q: "1. Introduction to Ayurveda & the Tridosha Theory",
    a: "Ayurveda's roots as yoga's sister science, the five elements, and how Vata, Pitta and Kapha combine to form your unique constitution (Prakriti).",
  },
  {
    q: "2. Ayurvedic Daily Routine (Dinacharya)",
    a: "A traditional daily rhythm — waking time, tongue scraping, oil pulling, self-massage and mindful eating — designed to keep your dosha in balance from morning to night.",
  },
  {
    q: "3. Ayurvedic Nutrition & the Six Tastes",
    a: "The six tastes (Rasas) — sweet, sour, salty, pungent, bitter and astringent — and how balancing them on your plate supports digestion and steadies your constitution.",
  },
  {
    q: "4. Basic Herbs & Natural Remedies",
    a: "An introduction to common Ayurvedic herbs used for digestion, immunity and calming the nervous system, and how they're used safely in daily life.",
  },
  {
    q: "5. Ayurvedic Self-Massage (Abhyanga)",
    a: "The theory and hands-on practice of Abhyanga, the warm-oil self-massage that nourishes the tissues, calms Vata and is one of Ayurveda's most accessible home practices.",
  },
  {
    q: "6. Yoga & Pranayama Matched to Your Dosha",
    a: "How to choose asana pace, breathing technique and practice intensity according to your dosha — cooling and grounding for Pitta and Kapha, warming and steadying for Vata.",
  },
  {
    q: "7. Guided Meditation",
    a: "Daily guided meditation to quiet the mind and support the same balance you're building through diet, routine and movement.",
  },
];

const roomTiers = [
  { room: "Triple Sharing", price: "USD 199", was: "USD 299" },
  { room: "Double / Shared Room", price: "USD 299", was: "USD 399" },
  { room: "Private Room", price: "USD 399", was: "USD 499" },
];

const pageFaqs = [
  {
    q: "Is the Yoga & Ayurveda Retreat certified by Yoga Alliance?",
    a: "Siddhant School of Yoga is a Registered Yoga School with Yoga Alliance USA (RYS 200, RYS 300, RYS 500). This retreat itself awards a Siddhant School of Yoga completion certificate — it is not a Yoga Alliance teaching certificate, since it is not a teacher training course.",
  },
  {
    q: "Will I get a personal dosha assessment?",
    a: "Yes. Early in the retreat, our Ayurveda teaching team helps you understand your dominant dosha (Vata, Pitta or Kapha) so the diet, daily routine and practices you're taught can be tailored to your constitution.",
  },
  {
    q: "Do I need any yoga or Ayurveda experience to join?",
    a: "No. The retreat is designed for all levels, from complete beginners to experienced practitioners. Classes are adjusted so everyone can practice safely and comfortably.",
  },
  {
    q: "Who can join this retreat?",
    a: (
      <div>
        <p className="mb-2">
          The main requirement is having the right attitude toward learning. Beyond that, we ask that you:
        </p>
        <SylList
          items={[
            "Be in good physical condition",
            "Keep an open mind and full attendance",
            "Follow a vegetarian diet during the retreat",
            "Avoid alcohol, drugs and smoking",
            "Have basic English proficiency",
            "Be between 18–60 years old",
            "Not have had surgery in the past year",
            "Not bring children along",
          ]}
        />
      </div>
    ),
  },
  {
    q: "What documents do I need to bring?",
    a: "Two clear color photocopies of your passport (plus the original for verification), two passport-size color photographs, and details of your visa expiry date.",
  },
  {
    q: "Do I need a visa to join the retreat in India?",
    a: "Yes, an Indian tourist e-visa is required for foreign nationals. It's also a good idea to arrange travel insurance before you leave home.",
  },
  {
    q: "What happens on arrival?",
    a: "We recommend arriving one day early. You'll check in, rest, then complete your registration and pay the balance of your fee, followed by a short tour of the yoga hall and dining area.",
  },
  {
    q: "What happens on day one?",
    a: "The first morning includes a Hatha Yoga class (8–9 AM), breakfast, a traditional fire ceremony (10:30 AM) and a group photo, along with your study materials. A 3 PM orientation covers the schedule, teachers and house rules.",
  },
  {
    q: "What should I pack?",
    a: "Passport photos, your phone and charger, a debit card, seasonal and yoga-appropriate clothing, comfortable shoes, a travel towel and a small first-aid kit with any personal medication. Leave valuables at home.",
  },
  {
    q: "What is the refund policy?",
    a: "The registration deposit is non-refundable. In a genuine emergency you can postpone to another scheduled batch within the same year by emailing us your reason. Cancellations are accepted by email at no extra charge, but the deposit is not refunded.",
  },
];

/* ---------------------------------------------------------------- */
/* Main component                                                    */
/* ---------------------------------------------------------------- */

export default function YogaAyurvedaRetreatContent() {
  return (
    <>
      {/* About */}
      <section id="overview" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Two Sister Sciences, One Journey"
            title="About the Yoga & Ayurveda Retreat"
          />
          <div className="max-w-3xl mx-auto space-y-4 text-center">
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Ayurveda and yoga are sister sciences. On this retreat you learn your body type (Vata, Pitta, Kapha), follow an Ayurvedic daily routine and diet, and practice yoga, pranayama and meditation suited to your constitution. The result is a healthier body, a calmer mind and a practical plan to keep the balance at home.
            </p>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Small batches of just 10 students mean genuinely personal attention from Acharya Siddhant and the Ayurveda teaching team, in a peaceful riverside setting on the banks of the Ganga.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding Your Dosha */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Know Your Constitution"
            title="Understanding Your Dosha"
            description="Ayurveda holds that everyone is a unique blend of three doshas. Here's a simple introduction to each."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {doshaCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group bg-[#f4efe6] rounded-2xl overflow-hidden border border-[#e3dac9] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                    <span className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-[#1c3b2b]" />
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-belleza text-lg sm:text-xl text-[#1e2422] leading-snug mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#1c3b2b] mb-2.5">
                      {card.subtitle}
                    </p>
                    <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <RetreatWhyChooseUs
        title="Why Choose Siddhant School of Yoga for Your Ayurveda Retreat?"
        bgClassName="bg-[#f4efe6]"
      />

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="Retreat Curriculum"
            title="What the 7-Day Curriculum Covers"
          />
          <Accordion items={syllabusItems} defaultOpen={null} columns={2} className="w-full" />
        </div>
      </section>

      <ResidentialExperience showSchedule={false} bgClassName="bg-[#f4efe6]" />

      <RetreatDatesFees
        title="Yoga & Ayurveda Retreat: Dates & Fees"
        description="Seven days, small batches of just 10 students, and everything you need already included below."
        startDay={9}
        durationDays={7}
        count={10}
        roomTiers={roomTiers}
        depositAmount="USD 140"
        note="Fees include accommodation, three sattvic meals daily and study material. Full course value: USD 499. A USD 140 registration fee reserves your seat."
        secondaryNote="Only 10 spots per batch — early booking is recommended."
      />

      <RetreatDailySchedule
        title="Daily Schedule of the Yoga & Ayurveda Retreat"
        bgClassName="bg-[#f4efe6]"
      />

      <RetreatWhatsInclude bgClassName="bg-[#fdfbf7]" />

      <Teachers />

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <SectionHead
            kicker="FAQs"
            title="Yoga & Ayurveda Retreat — Frequently Asked Questions"
          />
          <Accordion items={pageFaqs} defaultOpen={null} initialCount={6} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] font-figtree">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
          <div className="max-w-5xl mx-auto text-center rounded-3xl bg-gradient-to-br from-[#1c3b2b] via-[#142b1e] to-[#142b1e] px-6 sm:px-12 py-10 sm:py-14 shadow-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-[#f4efe6] text-[11px] sm:text-xs font-semibold uppercase tracking-wide mb-4">
              Only 10 Spots Per Batch
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-white leading-[1.2] mb-3">
              Ready to Begin Your Yoga &amp; Ayurveda Journey?
            </h2>
            <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Transform in 7 days with yoga, Ayurveda and meditation in a riverside setting on the banks of the Ganga.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink
                href={whatsappLink(
                  "Namaste! I would like to enquire about the Yoga & Ayurveda Retreat at Siddhant School of Yoga in Rishikesh.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="white"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </ButtonLink>
              <ButtonLink href="/book-my-yoga-in-rishikesh-india" variant="primary">
                <ArrowRight className="w-4 h-4" />
                Enroll Now
              </ButtonLink>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-white/70 text-xs sm:text-sm">
              <Mail className="w-3.5 h-3.5" />
              <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

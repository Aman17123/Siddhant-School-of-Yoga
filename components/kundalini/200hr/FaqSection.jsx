"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";

const pageFaqs = [
  {
    q: "Is the 200-Hour Kundalini Yoga TTC Yoga Alliance certified?",
    a: "Yes. This 200-hour course is Yoga Alliance USA RYS-200 registered, and on successful completion you receive an internationally recognised certificate along with guidance on registering as a Yoga Alliance RYT.",
  },
  {
    q: "Is this course beginner friendly?",
    a: "Yes. The course is built for all levels — complete beginners through advanced students. Every posture, breath practice and meditation is taught from the ground up, with hands-on correction from Acharya Siddhant and senior faculty throughout the 24 days.",
  },
  {
    q: "What's the difference between this and the 100-hour course?",
    a: "The 100-hour course is a shorter, 13-day introduction focused mainly on discovering your chakras. This 200-hour course runs 24 days, covers Steps 1 & 2 of our Kundalini method in full depth (discovering and awakening every chakra), adds Ashtanga Vinyasa, teaching methodology, basic Ayurveda and supervised teaching practice, and carries full Yoga Alliance USA RYS-200 certification.",
  },
  {
    q: "Do I need to complete the 100-hour course first?",
    a: "No. This 200-hour course is self-contained — it covers the same ground as the 100-hour course plus significantly more, so beginners can enroll directly here without any prior Kundalini or yoga training.",
  },
  {
    q: "What is Kundalini energy?",
    a: "Kundalini is a Sanskrit word whose practical meaning is simply energy — the dormant potential said to rest at the base of the spine, often called the mother of all yoga. This course teaches you to discover and awaken your seven main chakras as the foundation of working with that energy.",
  },
  {
    q: "What documents do I need to bring for the course?",
    a: "You'll need two clear color photocopies of your passport (plus the original for verification), two passport-size color photographs, and details of your visa expiry date. A valid Indian Tourist Visa is mandatory before traveling to India.",
  },
  {
    q: "How do I register, and what is the refund policy?",
    a: "To register, send an inquiry, receive our course presentation, then submit the registration form and pay a USD 200 deposit to receive your booking confirmation. The deposit is non-refundable; in a genuine emergency, it stays valid for 12 months and can be used to postpone your course within the year, or even be transferred to a friend.",
  },
  {
    q: "What is the code of conduct at the ashram?",
    a: "Students are expected to follow the daily routine and teachers' instructions strictly, avoid phones and photography in class, dress modestly, return to the school before 10 PM, and avoid food in the hall or rooms. Alcohol, drugs and smoking are not permitted anywhere on campus.",
  },
  {
    q: "What happens on arrival day?",
    a: "Plan to arrive one day before the course begins. Day 1 includes a Hatha class, a fire ceremony, a group photo, distribution of your study materials, and a 3 PM orientation session.",
  },
  {
    q: "What is included in the course fee?",
    a: "Your fee covers residential accommodation (triple, shared or private), three vegetarian meals a day, study materials, a short excursion trip, free pickup from Dehradun Airport, one complimentary Ayurvedic massage and your Yoga Alliance RYS-200 certificate. International airfare, visa fees and personal expenses are not included.",
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-[#1c3b2b] bg-[#fdfbf7] shadow-md"
          : "border-[#e3dac9] bg-[#fdfbf7]/95 hover:border-[#1c3b2b] shadow-2xs"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`text-base sm:text-lg font-belleza font-bold tracking-wide transition-colors ${
            isOpen ? "text-[#1c3b2b]" : "text-[#1F1E1D]"
          }`}
        >
          {item.q}
        </span>
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-[#1c3b2b] text-white"
              : "bg-[#f4efe6] text-[#77786e] hover:bg-[#1c3b2b]/20"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <Plus className="w-4 h-4 stroke-[2.5]" />
          )}
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-[15px] text-stone-600 leading-relaxed">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Kundalini200HourFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>FAQs</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            200-Hour Kundalini Yoga TTC — Frequently Asked Questions
          </h2>
          <HeadingDivider />
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {pageFaqs.map((item, idx) => (
            <AccordionItem
              key={idx}
              item={item}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

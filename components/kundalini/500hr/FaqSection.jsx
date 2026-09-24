"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";

const pageFaqs = [
  {
    q: "Can a complete beginner join the 500-Hour Kundalini course?",
    a: "Yes. The course starts from the foundation — discovering and awakening your chakras — before moving into the advanced work of balancing them and awakening Kundalini itself, so dedicated beginners can join directly.",
  },
  {
    q: "Is it better to do the 500 hours at once, or as separate 200 and 300-hour courses?",
    a: "Both paths lead to the same Yoga Alliance USA RYT-500 certification. Doing it all at once, in one uninterrupted journey, builds a stronger daily habit and saves on travel costs compared to two separate trips to India.",
  },
  {
    q: "Is there a break between the two parts of the course?",
    a: "No. The course runs continuously across all four steps of our Kundalini method, with one free day each week for rest, laundry and personal time.",
  },
  {
    q: "Is this course physically demanding?",
    a: "Yes. Expect 9–10 hours of daily practice with 100% attendance required, moving from foundational asana through advanced Kundalini kriyas over the full immersion.",
  },
  {
    q: "Is the 500-Hour Kundalini TTC Yoga Alliance certified?",
    a: "Yes. This course is registered with Yoga Alliance USA and graduates are eligible to register as an RYT-500 — the highest teaching credential Yoga Alliance offers.",
  },
  {
    q: "What documents do I need to bring for the course?",
    a: "You'll need two clear color photocopies of your passport (plus the original for verification), two passport-size color photographs, and details of your visa expiry date. A valid Indian Tourist Visa is mandatory before traveling to India.",
  },
  {
    q: "How do I register, and what is the refund policy?",
    a: "To register, send an inquiry, receive our course presentation, then submit the registration form and pay a non-refundable USD 400 deposit to receive your booking confirmation. In a genuine emergency, you can postpone within the current year — your deposit stays valid for 12 months and can be transferred to a friend if you're unable to attend.",
  },
  {
    q: "What is the code of conduct at the ashram?",
    a: "Students are expected to follow the daily routine and teachers' instructions strictly, avoid phones and photography in class, dress modestly, and return to the school before 10 PM. Alcohol, drugs and smoking are not permitted, and food is not allowed in the hall or rooms.",
  },
  {
    q: "What is included in the course fee?",
    a: "Your fee covers residential accommodation (triple, shared or private), three vegetarian meals a day, study materials, a short excursion trip, free pickup from Dehradun Airport, and one complimentary Ayurvedic massage. International airfare, visa fees and personal expenses are not included.",
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

export default function KundaliniFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>FAQs</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            500-Hour Master Kundalini Yoga TTC — Frequently Asked Questions
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

"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";

const pageFaqs = [
  {
    q: "Is the 100-Hour Kundalini Yoga TTC Yoga Alliance certified?",
    a: "This 100-hour course is the first part of our 200-Hour Kundalini Yoga TTC, approved by Yoga Alliance USA. On its own, it awards a Siddhant School of Yoga Certificate of Completion — to work toward an officially Registered Yoga Teacher credential, you would continue with Part 2 of the 200-hour program.",
  },
  {
    q: "What is Kundalini energy?",
    a: "Kundalini is a Sanskrit word whose practical meaning is simply energy — the dormant potential said to rest at the base of the spine. Kundalini yoga works to discover, awaken and balance your chakras as the path toward awakening this energy.",
  },
  {
    q: "Do I need prior yoga or meditation experience to join?",
    a: "No prior experience is required. This course is designed as a beginner-friendly foundation, focused mainly on discovering and locating your chakras — step one of the traditional four-step Kundalini path.",
  },
  {
    q: "What documents do I need to bring for the course?",
    a: "You'll need two clear color photocopies of your passport (plus the original for verification), two passport-size color photographs, and details of your visa expiry date. A valid Indian Tourist Visa is mandatory before traveling to India.",
  },
  {
    q: "How do I register, and what is the refund policy?",
    a: "To register, send an inquiry, receive our course presentation, then submit the registration form and pay a non-refundable registration fee to receive your booking confirmation. The advance deposit is non-refundable; in a genuine emergency, your course can be postponed to another batch within the same year by emailing us with your reason. Cancellations are accepted with no extra charge, but the advance is not refunded — notice must be given by email.",
  },
  {
    q: "What is the code of conduct at the ashram?",
    a: "Students are expected to follow the daily routine and teachers' instructions, avoid leaving class without permission, and return to the school before 10 PM. Alcohol, drugs and smoking are not permitted, phones and photography are not allowed in class, and modest dress that respects local culture is expected throughout the course.",
  },
  {
    q: "Is the daily schedule fixed?",
    a: "The schedule shown is a representative sample of a typical day. Timings can vary slightly according to the practice and pace of each batch, but the overall structure — asana, pranayama, meditation, philosophy and rest — stays consistent throughout the course.",
  },
  {
    q: "What is included in the course fee?",
    a: "Your fee covers residential accommodation (shared or private), three vegetarian meals a day, study materials, a short excursion trip, free pickup from Dehradun Airport, and one complimentary Ayurvedic massage. International airfare, visa fees and personal expenses are not included.",
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
            100-Hour Kundalini Yoga TTC — Frequently Asked Questions
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

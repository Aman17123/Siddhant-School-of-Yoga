"use client";

import { useState } from "react";
import { Container, SectionHeading } from "./ui";
import { faqs as defaultFaqs, whatsappLink } from "@/data/siteData";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const extendedFaqs = [
  ...defaultFaqs,
  {
    q: "How do I reach Siddhant School of Yoga from Delhi or Dehradun Airport?",
    a: "The closest airport is Dehradun Jolly Grant Airport (DED), located just 35-40 minutes from our campus. We provide direct private airport pickup upon request. If arriving at New Delhi Indira Gandhi International Airport (DEL), you can take a connecting flight to Dehradun, a 4-hour express train (Vande Bharat / Shatabdi) to Haridwar/Rishikesh, or request a private car transfer.",
  },
  {
    q: "What is the 100-day daily practice schedule provided to graduates?",
    a: "Unlike conventional schools where support ends upon graduation, Acharya Siddhant equips every student with an individualized 100-Day Daily Sadhana calendar. It maps out morning kriyas, progressive Kumbhaka breath ratios, asana sequencing, and meditation metrics, ensuring your yogic discipline becomes an unbreakable lifelong habit.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#EBE5D8]/80 relative"
    >
      <Container>
        {/* Header */}
        <SectionHeading
          eyebrow="Clear Guidance & Transparency"
          title="Frequently Asked Questions"
          cursiveSubtitle="Everything You Need Before Traveling to Rishikesh"
          description="Everything you need to know about joining our yoga teacher training courses, retreats, visa requirements, airport arrival, and daily ashram life."
          center
        />

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-4 mb-14">
          {extendedFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#f22924] bg-[#FAF6EE] shadow-sm"
                    : "border-[#EBE5D8] bg-white hover:border-[#F5B860]"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base sm:text-lg font-belleza font-bold tracking-wide transition-colors ${
                      isOpen ? "text-[#f22924]" : "text-[#1F1E1D]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[#f22924] text-white"
                        : "bg-[#FAF6EE] text-[#77786e]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#55564c] font-figtree leading-relaxed border-t border-[#f22924]/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="max-w-2xl mx-auto text-center p-8 rounded-3xl bg-[#FAF6EE] border border-[#EBE5D8] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5B860]/10 rounded-full blur-2xl pointer-events-none" />
          <h4 className="text-xl font-bold font-belleza text-[#1F1E1D] mb-2">
            Have a Specific or Personal Question?
          </h4>
          <p className="text-sm text-[#55564c] font-figtree mb-6 max-w-lg mx-auto leading-relaxed">
            Our admissions counselors and lead teachers in Rishikesh are
            available on WhatsApp to answer syllabus questions, room choices,
            and travel advice.
          </p>
          <a
            href={whatsappLink(
              "Hi Siddhant School of Yoga, I have a question regarding course syllabus and room options.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold font-figtree px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-102"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Chat Directly on WhatsApp (+91 8449785755)</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

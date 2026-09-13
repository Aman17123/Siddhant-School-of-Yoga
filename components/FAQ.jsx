'use client';

import { useState } from 'react';
import { Container, SectionHeading } from './ui';
import { faqs, whatsappLink } from '@/data/siteData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-b border-[#EBE5D8]/60">
      <Container>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8735A]/10 text-[#E8735A] border border-[#E8735A]/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#e8735a]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#1F1E1D] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#55564c] leading-relaxed">
            Everything you need to know about joining our yoga teacher training courses, retreats, visa requirements, and ashram life in Rishikesh.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#E8735A] bg-[#FAF6EE] shadow-xs'
                    : 'border-[#EBE5D8] bg-white hover:border-[#F5B860]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen ? 'text-[#E8735A]' : 'text-[#1F1E1D]'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#E8735A] text-white' : 'bg-[#FAF6EE] text-[#77786e]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#55564c] leading-relaxed border-t border-[#E8735A]/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="max-w-xl mx-auto text-center p-6 rounded-3xl bg-[#FAF6EE] border border-[#EBE5D8] shadow-xs">
          <h4 className="text-sm font-bold text-[#1F1E1D] mb-1">
            Have a Specific or Personal Question?
          </h4>
          <p className="text-xs text-[#55564c] mb-4">
            Our admissions and spiritual counselors are available 24/7 on WhatsApp to answer course queries.
          </p>
          <a
            href={whatsappLink("Hi Siddhant School of Yoga, I have a question regarding the courses.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Chat With Admissions Team</span>
          </a>
        </div>

      </Container>
    </section>
  );
}

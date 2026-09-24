"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Sparkles } from "lucide-react";
import { whatsappLink } from "@/data/siteData";
import QuickEnquiryModal from "@/components/QuickEnquiryModal";

export default function FloatingActions() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      {/* 1. Floating WhatsApp Button on Left Side */}
      <div
        className="fixed bottom-3 sm:bottom-5 left-3 sm:left-5 z-40 font-figtree"
        aria-label="WhatsApp Concierge"
      >
        <a
          href={whatsappLink(
            "Hi Siddhant School of Yoga, I would like to inquire about upcoming Yoga TTC batches in Rishikesh.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#142b1e] hover:bg-[#1c3b2b] text-white border border-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Chat with us on WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 sm:w-7 sm:h-7" />

          {/* Hover Tooltip on right side of button */}
          <span className="absolute left-16 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-[#1F1E1D] text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-xl">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* 2. Floating Quick Enquiry Button on Right Side */}
      <div
        className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5 z-40 font-figtree"
        aria-label="Quick Enquiry"
      >
        <button
          type="button"
          onClick={() => setEnquiryOpen(true)}
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#142b1e] hover:bg-[#1c3b2b] text-white border border-white text-xs sm:text-sm font-semibold shadow-2xl hover:shadow-[#1c3b2b]/40 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Open Quick Enquiry form"
        >
          <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span>Quick Enquiry</span>
        </button>
      </div>

      <QuickEnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}

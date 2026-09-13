"use client";

import { FaWhatsapp } from "react-icons/fa";
import { Sparkles, Send } from "lucide-react";
import { whatsappLink } from "@/data/siteData";

export default function FloatingActions() {
  return (
    <>
      {/* 1. Floating WhatsApp Button on Left Side */}
      <div
        className="fixed bottom-5 sm:bottom-6 left-5 sm:left-6 z-50 font-figtree"
        aria-label="WhatsApp Concierge"
      >
        <a
          href={whatsappLink(
            "Hi Siddhant School of Yoga, I would like to inquire about upcoming Yoga TTC batches in Rishikesh.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Chat with us on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />

          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f22924] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
            1
          </span>

          {/* Hover Tooltip on right side of button */}
          <span className="absolute left-16 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-[#1F1E1D] text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-xl">
            Chat on WhatsApp • +91 8449785755
          </span>
        </a>
      </div>

      {/* 2. Floating Enquire Now Button on Right Side */}
      <div
        className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 font-figtree"
        aria-label="Enquire Now"
      >
        <a
          href={whatsappLink(
            "Namaste! I would like to enquire about course dates, fees, and accommodation at Siddhant School of Yoga in Rishikesh.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#f22924] hover:bg-[#d45d44] text-white text-xs sm:text-sm font-semibold shadow-2xl hover:shadow-[#f22924]/40 hover:scale-105 active:scale-95 transition-all duration-300 group"
          aria-label="Enquire Now"
        >
          <Sparkles className="w-4 h-4 text-[#F5B860] group-hover:rotate-12 transition-transform" />
          <span>Enquire Now</span>
        </a>
      </div>
    </>
  );
}

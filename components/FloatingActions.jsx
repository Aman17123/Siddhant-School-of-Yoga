'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { ClipboardList } from 'lucide-react';
import { whatsappLink } from '@/data/siteData';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" aria-label="Quick Actions">
      
      {/* Quick Apply Pill */}
      <a
        href="#courses"
        className="hidden sm:inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-[#E8735A] font-bold text-xs px-4 py-2.5 rounded-full shadow-lg border border-[#EBE5D8] hover:bg-[#E8735A] hover:text-white transition-all duration-300 hover:scale-105"
      >
        <ClipboardList className="w-4 h-4 text-[#e8735a]" />
        <span>Apply Now</span>
      </a>

      {/* Floating WhatsApp Button with badge */}
      <a
        href={whatsappLink("Hi Siddhant School of Yoga, I would like to inquire about upcoming Yoga TTC batches in Rishikesh.")}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
        
        {/* Notification Badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e8735a] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
          1
        </span>

        {/* Hover Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1F1E1D] text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-lg">
          Chat with us on WhatsApp
        </span>
      </a>

    </div>
  );
}

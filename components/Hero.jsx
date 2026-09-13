'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappLink } from '@/data/siteData';

export default function Hero() {
  const scrollToExplore = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0f110d]">
      
      {/* 1. Cinematic Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-rishikesh-ashram.jpg"
          alt="Yoga teacher training meditation and spiritual practice overlooking the Ganges in Rishikesh, India"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Atmospheric Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80 z-1" />
      </div>

      {/* 2. Hero Content (Centered, 1060px max-width) */}
      <div className="relative z-10 max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center text-white flex flex-col items-center">
        
        {/* Eyebrow with Sacred Flourishes */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#F5B860]/40 mb-5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#F5B860] animate-pulse" />
          <span className="text-xs sm:text-xs font-bold uppercase tracking-[0.22em] text-[#f2e6cb]">
            Traditional Himalayan Ashram • Rishikesh, India
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.08] mb-4 drop-shadow-xl">
          <span className="text-[#55baa8] font-semibold">Siddhant</span> School of Yoga
        </h1>

        {/* Ornamental Lotus / Sacred Divider */}
        <div className="my-3 flex items-center justify-center gap-3 text-[#F5B860]/80">
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#F5B860]" />
          <svg className="w-6 h-6 text-[#F5B860] fill-current" viewBox="0 0 24 24">
            <path d="M12 2C12 2 14.5 7 14.5 10C14.5 11.38 13.38 12.5 12 12.5C10.62 12.5 9.5 11.38 9.5 10C9.5 7 12 2 12 2ZM12 14.5C14.4 14.5 18 16.5 18 19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19C6 16.5 9.6 14.5 12 14.5ZM18.5 11C19.88 11 21 12.12 21 13.5C21 15.5 17 18 17 18C17 18 16.5 15.5 16.5 13.5C16.5 12.12 17.12 11 18.5 11ZM5.5 11C6.88 11 7.5 12.12 7.5 13.5C7.5 15.5 7 18 7 18C7 18 3 15.5 3 13.5C3 12.12 4.12 11 5.5 11Z" />
          </svg>
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#F5B860]" />
        </div>

        {/* Hero Subtitle */}
        <p className="font-serif text-lg sm:text-2xl md:text-3xl text-white/95 font-medium max-w-3xl mx-auto mb-4 tracking-wide leading-relaxed">
          Join Our Authentic Yoga, Kundalini &amp; Pranayama TTC in Rishikesh
        </p>

        {/* Hero Description */}
        <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Residential <strong>premier yoga school in Rishikesh, India</strong> — grounded in classical Hatha, Ashtanga Vinyasa, Vedic philosophy, and world-first Pranayama science. Yoga Alliance <strong className="text-[#F5B860]">RYS 200, 300, 500</strong> certified.
        </p>

        {/* Dual Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12 w-full sm:w-auto">
          <Link
            href="#courses"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#e8735a] via-[#e06247] to-[#E8735A] hover:from-[#E8735A] hover:to-[#E8735A] text-white text-sm sm:text-base font-bold px-8 py-3.5 rounded-full shadow-xl shadow-[#e8735a]/30 hover:shadow-2xl hover:shadow-[#e8735a]/45 transition-all duration-300 hover:-translate-y-0.5 border border-white/25 group"
          >
            <span>Explore All Courses</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          <a
            href={whatsappLink("Namaste Acharya Siddhant! I would like to inquire about courses at Siddhant School of Yoga.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E8735A]/80 hover:bg-[#E8735A] text-white text-sm sm:text-base font-bold px-8 py-3.5 rounded-full backdrop-blur-md border border-[#F5B860]/40 hover:border-white/50 transition-all duration-300 hover:-translate-y-0.5 shadow-lg group"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <FaWhatsapp className="w-3.5 h-3.5 text-[#25D366]" />
            </div>
            <span>Chat With Master</span>
          </a>
        </div>

        {/* 3. Hero Trust Bar (Matches Vinyasa Yoga Academy) */}
        <div className="w-full max-w-3xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl border border-white/15 p-4 sm:p-5 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-2 divide-y md:divide-y-0 md:divide-x divide-white/15">
            
            <div className="flex flex-col items-center justify-center px-2 py-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                5,000<span className="text-[#F5B860]">+</span>
              </span>
              <span className="text-[11px] sm:text-xs text-white/80 font-medium uppercase tracking-wider mt-0.5">
                Students Trained
              </span>
            </div>

            <div className="flex flex-col items-center justify-center px-2 py-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                15<span className="text-[#F5B860]">+</span>
              </span>
              <span className="text-[11px] sm:text-xs text-white/80 font-medium uppercase tracking-wider mt-0.5">
                Years of Lineage
              </span>
            </div>

            <div className="flex flex-col items-center justify-center px-2 py-1 pt-3 md:pt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                60<span className="text-[#F5B860]">+</span>
              </span>
              <span className="text-[11px] sm:text-xs text-white/80 font-medium uppercase tracking-wider mt-0.5">
                Countries Worldwide
              </span>
            </div>

            <div className="flex flex-col items-center justify-center px-2 py-1 pt-3 md:pt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white flex items-center gap-1">
                4.9<span className="text-[#F5B860] text-xl">★</span>
              </span>
              <span className="text-[11px] sm:text-xs text-white/80 font-medium uppercase tracking-wider mt-0.5">
                Google &amp; Yoga Alliance
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* 4. Scroll Down Indicator */}
      <button 
        onClick={scrollToExplore}
        className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors flex flex-col items-center focus:outline-none animate-bounce"
        aria-label="Scroll down to explore"
      >
        <span className="text-[10px] uppercase tracking-widest text-[#F5B860] font-semibold mb-1">Explore</span>
        <ChevronDown className="w-5 h-5 text-white" />
      </button>

    </section>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronDown, 
  Menu, 
  X,
  Phone,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Compass,
  Award
} from 'lucide-react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaTwitter,
  FaWhatsapp
} from 'react-icons/fa';
import { site, whatsappLink } from '@/data/siteData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header sticky top-0 z-50 w-full bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      
      {/* BACKGROUND SKETCHES (Ganga Aarti on left, Rishikesh Temples on right) */}
      <div className="header-bg-decor" aria-hidden="true" />

      {/* 1. TOPBAR (Deep emerald green #E8735A) */}
      <div className={`bg-terracotta text-white transition-all duration-300 overflow-hidden relative z-10 ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 py-2 opacity-100'}`}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-medium">
          
          {/* Left: Email & Address */}
          <div className="flex items-center gap-6">
            <a 
              href={`mailto:${site.email}`} 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              title="Email Siddhant School of Yoga"
            >
              <div className="w-5 h-5 rounded-xs bg-white/10 flex items-center justify-center shrink-0">
                <Image src="/images/icons/mail.svg" alt="Mail" width={12} height={12} className="brightness-0 invert" />
              </div>
              <span className="hidden sm:inline">{site.email}</span>
            </a>

            <a 
              href={site.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              title="Ashram Location in Rishikesh"
            >
              <div className="w-5 h-5 rounded-xs bg-white/10 flex items-center justify-center shrink-0">
                <Image src="/images/icons/location.svg" alt="Location" width={12} height={12} className="brightness-0 invert" />
              </div>
              <span className="hidden md:inline">Behind Shiva Temple, Veerbhadra, Rishikesh, Uttarakhand 249202</span>
            </a>
          </div>

          {/* Right: Social Media */}
          <div className="flex items-center gap-3">
            <span className="text-white/80 hidden lg:inline text-[11px] font-medium tracking-wide">Follow Us</span>
            <div className="flex items-center gap-1.5">
              <a 
                href={site.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 rounded-xs bg-white/10 hover:bg-[#e8735a] flex items-center justify-center transition-colors text-white"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-2.5 h-2.5" />
              </a>
              <a 
                href={site.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 rounded-xs bg-white/10 hover:bg-[#e8735a] flex items-center justify-center transition-colors text-white"
                aria-label="Instagram"
              >
                <FaInstagram className="w-2.5 h-2.5" />
              </a>
              <a 
                href={site.socials.youtube} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 rounded-xs bg-white/10 hover:bg-[#e8735a] flex items-center justify-center transition-colors text-white"
                aria-label="YouTube"
              >
                <FaYoutube className="w-2.5 h-2.5" />
              </a>
              <a 
                href={site.socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 rounded-xs bg-white/10 hover:bg-[#e8735a] flex items-center justify-center transition-colors text-white"
                aria-label="Twitter"
              >
                <FaTwitter className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MIDDLE BOX (Call/WhatsApp Concierge | Brand Logo | Enroll Now) */}
      <div className="relative z-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 grid grid-cols-2 md:grid-cols-12 items-center">
          
          {/* Left Column: Ashram Helpline / WhatsApp Concierge (Sleek Classy Pill) */}
          <div className="hidden md:flex md:col-span-3 items-center justify-start pr-6 border-r border-[#E8735A]/15">
            <a 
              href={whatsappLink("Namaste! I would like to inquire about Yoga Teacher Training and Retreat courses at Siddhant School of Yoga.")} 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white hover:bg-[#FAF6EE] border border-[#E8735A]/20 hover:border-[#E8735A]/50 shadow-[0_2px_12px_rgba(232,115,90,0.06)] hover:shadow-[0_4px_18px_rgba(232,115,90,0.14)] transition-all duration-300 transform hover:-translate-y-0.5"
              title="Connect on WhatsApp with Siddhant School of Yoga"
            >
              {/* WhatsApp Icon Disc with refined breathing pulse indicator */}
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#E8735A] via-[#E8735A] to-[#D45D44] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-70"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366] border-2 border-white"></span>
                </span>
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="font-marcellus text-[10.5px] uppercase tracking-[0.14em] text-[#E8735A] font-semibold">
                    Ashram Helpline
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#F5B860]"></span>
                  <span className="font-jakarta text-[9.5px] font-medium text-[#6e7d77]">
                    Live
                  </span>
                </div>
                <span className="font-marcellus text-[13.5px] font-bold text-[#1F1E1D] tracking-[0.03em] group-hover:text-[#E8735A] transition-colors leading-tight mt-0.5">
                  +91 84497 85755
                </span>
              </div>
            </a>
          </div>

          {/* Center Column: Professional Logo (6 cols) */}
          <div className="col-span-1 md:col-span-6 flex items-center justify-start md:justify-center md:px-6 md:border-r md:border-[#E8735A]/15">
            <Link href="/" className="inline-block py-1">
              <Image
                src="/logo/siddhant-logo.svg"
                alt="Siddhant School of Yoga - Rishikesh India"
                width={360}
                height={76}
                priority
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right Column: Distinctive Terracotta/Gold Enroll CTA Button (3 cols) */}
          <div className="col-span-1 md:col-span-3 flex items-center justify-end pl-2 sm:pl-6 gap-3">
            
            <a 
              href="#courses" 
              className="hidden sm:inline-flex group relative items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-[#cf5638] via-[#c24a2c] to-[#b03e23] hover:from-[#c24a2c] hover:to-[#9e3319] text-white shadow-[0_4px_18px_rgba(207,86,56,0.3)] hover:shadow-[0_6px_24px_rgba(207,86,56,0.42)] transition-all duration-300 transform hover:-translate-y-0.5 border border-[#fedbb0]/35 hover:border-[#fedbb0]/70 overflow-hidden"
              title="Apply for Yoga Teacher Training Rishikesh"
            >
              {/* Shimmer sweep reflection effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shimmer-sweep" />

              {/* Gold lotus/sparkle badge */}
              <div className="relative z-10 w-7 h-7 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-3.5 h-3.5 text-[#ffe7bf]" />
              </div>

              <div className="flex flex-col text-left relative z-10">
                <span className="font-jakarta text-[9px] uppercase font-bold tracking-[0.18em] text-[#ffe4b0] leading-tight">
                  Yoga Alliance RYS
                </span>
                <span className="font-marcellus text-[13.5px] font-bold text-white tracking-[0.04em] flex items-center gap-1.5 leading-tight mt-0.5">
                  <span>Enroll Now</span>
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ArrowUpRight className="w-3 h-3 text-white" />
                  </span>
                </span>
              </div>
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#1F1E1D] hover:bg-[#FAF6EE] focus:outline-none ml-2"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#E8735A]" /> : <Menu className="w-6 h-6 text-[#E8735A]" />}
            </button>

          </div>

        </div>
      </div>

      {/* 3. MAIN NAVBAR — Architectural Tabular Grid with Smooth Animated Dropdowns */}
      <nav className="hidden md:block border-t border-b border-[#EBE5D8] bg-white relative z-20" aria-label="Main Navigation">
        <div className="max-w-[1320px] mx-auto">
          <ul className="flex items-center justify-center text-[13.5px] font-semibold text-[#1F1E1D]">
            
            {/* Home (First item has border-l and border-r) */}
            <li className="border-l border-r border-[#EBE5D8] relative group">
              <Link 
                href="/" 
                className="inline-block py-2.5 px-6 text-[#E8735A] font-bold hover:text-[#F08C5C] transition-colors font-jakarta tracking-wide"
              >
                Home
              </Link>
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-terracotta rounded-full scale-x-100 transition-transform duration-300" />
            </li>

            {/* About Us (Smooth Dropdown) */}
            <li 
              className="border-r border-[#EBE5D8] relative group"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                className={`cursor-pointer py-2.5 px-6 transition-all duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                  activeDropdown === 'about' ? 'text-[#E8735A] bg-terracotta/[0.03]' : 'hover:text-[#E8735A]'
                }`}
              >
                <span>About Us</span>
                <ChevronDown 
                  strokeWidth={2.2}
                  className={`w-3.5 h-3.5 text-[#55564c] transition-transform duration-300 shrink-0 ${
                    activeDropdown === 'about' ? 'rotate-180 text-[#E8735A]' : 'group-hover:rotate-180 group-hover:text-[#E8735A]'
                  }`} 
                />
              </button>
              <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-terracotta rounded-full transition-transform duration-300 origin-center ${
                activeDropdown === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />

              {/* Dropdown Container with Hover Bridge */}
              <div 
                className={`absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeDropdown === 'about'
                    ? 'opacity-100 visible translate-y-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto'
                }`}
              >
                <div className="w-80 bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_45px_-10px_rgba(232,115,90,0.18),0_4px_16px_rgba(0,0,0,0.04)] border border-[#E8735A]/12 overflow-hidden p-2.5">
                  {/* Gold accent line */}
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F5B860] to-transparent mb-1.5" />
                  
                  <div className="flex flex-col space-y-0.5">
                    <Link 
                      href="#about" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860]/50 group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200" />
                        <span className="text-xs font-medium text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-1 transition-all duration-200">
                          About Siddhant School of Yoga
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                    </Link>

                    <Link 
                      href="#founder" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860]/50 group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200" />
                        <span className="text-xs font-medium text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-1 transition-all duration-200">
                          About Acharya Siddhant (Founder)
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                    </Link>

                    <Link 
                      href="#teachers" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860]/50 group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200" />
                        <span className="text-xs font-medium text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-1 transition-all duration-200">
                          Our Himalayan Yoga Masters
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                    </Link>

                    <Link 
                      href="#residential" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860]/50 group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200" />
                        <span className="text-xs font-medium text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-1 transition-all duration-200">
                          Food &amp; Accommodation
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                    </Link>

                    <Link 
                      href="#gallery" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860]/50 group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200" />
                        <span className="text-xs font-medium text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-1 transition-all duration-200">
                          Sacred Yoga Gallery
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                    </Link>

                    <Link 
                      href="#faq" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860]/50 group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200" />
                        <span className="text-xs font-medium text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-1 transition-all duration-200">
                          Frequently Asked Questions
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                    </Link>

                    <Link 
                      href="#contact" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860]/50 group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200" />
                        <span className="text-xs font-medium text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-1 transition-all duration-200">
                          Contact &amp; Location
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                    </Link>
                  </div>

                  {/* Dropdown footer bar */}
                  <div className="mt-2 pt-2 border-t border-[#E8735A]/10 px-2 flex items-center justify-between text-[11px] text-[#E8735A]">
                    <span className="flex items-center gap-1 font-medium text-[#556660]">
                      <Sparkles className="w-3 h-3 text-[#F5B860]" /> Gov. Uttarakhand Recognized
                    </span>
                    <a href="#about" onClick={() => setActiveDropdown(null)} className="font-bold text-[#c8533a] hover:underline">
                      Explore SSY →
                    </a>
                  </div>
                </div>
              </div>
            </li>

            {/* YTTC Rishikesh (Smooth Dropdown) */}
            <li 
              className="border-r border-[#EBE5D8] relative group"
              onMouseEnter={() => handleMouseEnter('yttc')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'yttc' ? null : 'yttc')}
                className={`cursor-pointer py-2.5 px-6 transition-all duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                  activeDropdown === 'yttc' ? 'text-[#E8735A] bg-terracotta/[0.03]' : 'hover:text-[#E8735A]'
                }`}
              >
                <span>YTTC Rishikesh</span>
                <ChevronDown 
                  strokeWidth={2.2}
                  className={`w-3.5 h-3.5 text-[#55564c] transition-transform duration-300 shrink-0 ${
                    activeDropdown === 'yttc' ? 'rotate-180 text-[#E8735A]' : 'group-hover:rotate-180 group-hover:text-[#E8735A]'
                  }`} 
                />
              </button>
              <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-terracotta rounded-full transition-transform duration-300 origin-center ${
                activeDropdown === 'yttc' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />

              <div 
                className={`absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeDropdown === 'yttc'
                    ? 'opacity-100 visible translate-y-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto'
                }`}
              >
                <div className="w-[360px] bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_45px_-10px_rgba(232,115,90,0.18),0_4px_16px_rgba(0,0,0,0.04)] border border-[#E8735A]/12 overflow-hidden p-2.5">
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F5B860] to-transparent mb-1.5" />
                  
                  <div className="flex flex-col space-y-1">
                    <Link 
                      href="#courses" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                              100 Hour Yoga TTC
                            </span>
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded-sm bg-terracotta/10 text-[#E8735A] font-semibold border border-[#E8735A]/20">
                              Beginner
                            </span>
                          </div>
                          <span className="text-[11px] text-[#6b7c76] mt-0.5">Foundational immersion &amp; self-practice in Rishikesh</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-1" />
                    </Link>

                    <Link 
                      href="#courses" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2.5 rounded-xl bg-terracotta/[0.03] hover:bg-terracotta/[0.07] border border-[#E8735A]/15 transition-all duration-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                              200 Hour Yoga TTC
                            </span>
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded-sm bg-[#F5B860]/20 text-[#84631d] font-bold border border-[#F5B860]/40">
                              Flagship RYT 200
                            </span>
                          </div>
                          <span className="text-[11px] text-[#556761] mt-0.5 font-medium">Yoga Alliance USA Registered Teacher Certification</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-1" />
                    </Link>

                    <Link 
                      href="#courses" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                              300 Hour Yoga TTC
                            </span>
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded-sm bg-terracotta/10 text-[#E8735A] font-semibold border border-[#E8735A]/20">
                              Advanced
                            </span>
                          </div>
                          <span className="text-[11px] text-[#6b7c76] mt-0.5">Advanced anatomy, sequencing &amp; multi-style mastery</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-1" />
                    </Link>

                    <Link 
                      href="#courses" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                              500 Hour Master Yoga TTC
                            </span>
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded-sm bg-terracotta/10 text-[#E8735A] font-semibold border border-[#E8735A]/20">
                              Master Level
                            </span>
                          </div>
                          <span className="text-[11px] text-[#6b7c76] mt-0.5">Complete comprehensive 2-month guru-disciple immersion</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-1" />
                    </Link>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#E8735A]/10 px-2 flex items-center justify-between text-[11px] text-[#E8735A]">
                    <span className="flex items-center gap-1 font-medium text-[#556660]">
                      <Sparkles className="w-3 h-3 text-[#F5B860]" /> Yoga Alliance RYS 200/300/500
                    </span>
                    <a href="#courses" onClick={() => setActiveDropdown(null)} className="font-bold text-[#c8533a] hover:underline">
                      Compare All Dates →
                    </a>
                  </div>
                </div>
              </div>
            </li>

            {/* Kundalini Yoga (Smooth Dropdown) */}
            <li 
              className="border-r border-[#EBE5D8] relative group"
              onMouseEnter={() => handleMouseEnter('kundalini')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'kundalini' ? null : 'kundalini')}
                className={`cursor-pointer py-2.5 px-6 transition-all duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                  activeDropdown === 'kundalini' ? 'text-[#E8735A] bg-terracotta/[0.03]' : 'hover:text-[#E8735A]'
                }`}
              >
                <span>Kundalini Yoga</span>
                <ChevronDown 
                  strokeWidth={2.2}
                  className={`w-3.5 h-3.5 text-[#55564c] transition-transform duration-300 shrink-0 ${
                    activeDropdown === 'kundalini' ? 'rotate-180 text-[#E8735A]' : 'group-hover:rotate-180 group-hover:text-[#E8735A]'
                  }`} 
                />
              </button>
              <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-terracotta rounded-full transition-transform duration-300 origin-center ${
                activeDropdown === 'kundalini' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />

              <div 
                className={`absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeDropdown === 'kundalini'
                    ? 'opacity-100 visible translate-y-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto'
                }`}
              >
                <div className="w-80 bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_45px_-10px_rgba(232,115,90,0.18),0_4px_16px_rgba(0,0,0,0.04)] border border-[#E8735A]/12 overflow-hidden p-2.5">
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F5B860] to-transparent mb-1.5" />
                  
                  <div className="flex flex-col space-y-1">
                    <Link 
                      href="#kundalini" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                              100 Hour Kundalini TTC
                            </span>
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded-sm bg-terracotta/10 text-[#E8735A] font-semibold border border-[#E8735A]/20">
                              Energy &amp; Chakras
                            </span>
                          </div>
                          <span className="text-[11px] text-[#6b7c76] mt-0.5">Foundational Tantra, Nadis &amp; Prana awakening</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-1" />
                    </Link>

                    <Link 
                      href="#kundalini" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                              200 Hour Kundalini TTC
                            </span>
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded-sm bg-[#F5B860]/20 text-[#84631d] font-bold border border-[#F5B860]/40">
                              Full Immersion
                            </span>
                          </div>
                          <span className="text-[11px] text-[#6b7c76] mt-0.5">Sacred Kriya, Tantra yoga &amp; Certified Teacher Training</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-1" />
                    </Link>

                    <Link 
                      href="#kundalini" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                              300 Hour Kundalini TTC
                            </span>
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded-sm bg-terracotta/10 text-[#E8735A] font-semibold border border-[#E8735A]/20">
                              Master Kriya
                            </span>
                          </div>
                          <span className="text-[11px] text-[#6b7c76] mt-0.5">Advanced esoteric kriyas, sacred mantra &amp; master guidance</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-1" />
                    </Link>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#E8735A]/10 px-2 flex items-center justify-between text-[11px] text-[#E8735A]">
                    <span className="flex items-center gap-1 font-medium text-[#556660]">
                      <Sparkles className="w-3 h-3 text-[#F5B860]" /> Himalayan Kriya Lineage
                    </span>
                    <a href="#kundalini" onClick={() => setActiveDropdown(null)} className="font-bold text-[#c8533a] hover:underline">
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>
            </li>

            {/* Rishikesh Retreat (Smooth Dropdown) */}
            <li 
              className="border-r border-[#EBE5D8] relative group"
              onMouseEnter={() => handleMouseEnter('retreats')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'retreats' ? null : 'retreats')}
                className={`cursor-pointer py-2.5 px-6 transition-all duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                  activeDropdown === 'retreats' ? 'text-[#E8735A] bg-terracotta/[0.03]' : 'hover:text-[#E8735A]'
                }`}
              >
                <span>Rishikesh Retreat</span>
                <ChevronDown 
                  strokeWidth={2.2}
                  className={`w-3.5 h-3.5 text-[#55564c] transition-transform duration-300 shrink-0 ${
                    activeDropdown === 'retreats' ? 'rotate-180 text-[#E8735A]' : 'group-hover:rotate-180 group-hover:text-[#E8735A]'
                  }`} 
                />
              </button>
              <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-terracotta rounded-full transition-transform duration-300 origin-center ${
                activeDropdown === 'retreats' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />

              <div 
                className={`absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeDropdown === 'retreats'
                    ? 'opacity-100 visible translate-y-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto'
                }`}
              >
                <div className="w-[370px] bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_45px_-10px_rgba(232,115,90,0.18),0_4px_16px_rgba(0,0,0,0.04)] border border-[#E8735A]/12 overflow-hidden p-2.5">
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F5B860] to-transparent mb-1.5" />
                  
                  <div className="flex flex-col space-y-1">
                    <Link 
                      href="#retreats" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                            Yoga for Beginners Retreat
                          </div>
                          <span className="text-[11px] text-[#6b7c76]">Gentle asanas, Ganga river walks &amp; ashram peace</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-0.5" />
                    </Link>

                    <Link 
                      href="#retreats" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                            Yoga &amp; Meditation Retreat
                          </div>
                          <span className="text-[11px] text-[#6b7c76]">Inner silence, evening Ganga Aarti &amp; sound healing</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-0.5" />
                    </Link>

                    <Link 
                      href="#retreats" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                            Kundalini Awakening Retreat
                          </div>
                          <span className="text-[11px] text-[#6b7c76]">Chakra balancing, sacred breathwork &amp; energy alignment</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-0.5" />
                    </Link>

                    <Link 
                      href="#retreats" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                              Pranayama &amp; Breathwork Retreat
                            </span>
                            <span className="text-[9px] px-1 rounded-xs bg-[#F5B860]/20 text-[#84631d] font-bold">World 1st</span>
                          </div>
                          <span className="text-[11px] text-[#6b7c76]">Mastery of life-force under Acharya Siddhant</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-0.5" />
                    </Link>

                    <Link 
                      href="#retreats" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                            Vipassana Silent Retreat
                          </div>
                          <span className="text-[11px] text-[#6b7c76]">Digital detox, Mauna (silence) &amp; deep self-observation</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-0.5" />
                    </Link>

                    <Link 
                      href="#retreats" 
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start justify-between p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#E8735A]/[0.06] hover:to-transparent transition-all duration-200"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B860] group-hover/item:bg-terracotta group-hover/item:scale-125 transition-all duration-200 mt-1.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#1F1E1D] group-hover/item:text-[#E8735A] group-hover/item:translate-x-0.5 transition-all duration-200">
                            Yogic Detox &amp; Ayurveda Retreat
                          </div>
                          <span className="text-[11px] text-[#6b7c76]">Panchakarma herbs, organic sattvic diet &amp; rejuvenation</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8735A] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 mt-0.5" />
                    </Link>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#E8735A]/10 px-2 flex items-center justify-between text-[11px] text-[#E8735A]">
                    <span className="flex items-center gap-1 font-medium text-[#556660]">
                      <Sparkles className="w-3 h-3 text-[#F5B860]" /> Ganga Riverfront Ashram Stay
                    </span>
                    <a href="#retreats" onClick={() => setActiveDropdown(null)} className="font-bold text-[#c8533a] hover:underline">
                      Reserve Dates →
                    </a>
                  </div>
                </div>
              </div>
            </li>

            {/* Why Rishikesh */}
            <li className="border-r border-[#EBE5D8] relative group">
              <Link 
                href="#rishikesh" 
                className="inline-block py-2.5 px-6 hover:text-[#E8735A] transition-colors font-jakarta tracking-wide"
              >
                Why Rishikesh
              </Link>
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-terracotta rounded-full transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
            </li>

            {/* Reviews */}
            <li className="border-r border-[#EBE5D8] relative group">
              <Link 
                href="#testimonials" 
                className="inline-block py-2.5 px-6 hover:text-[#E8735A] transition-colors font-jakarta tracking-wide"
              >
                Reviews
              </Link>
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-terracotta rounded-full transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
            </li>

            {/* Contact */}
            <li className="border-r border-[#EBE5D8] relative group">
              <Link 
                href="#contact" 
                className="inline-block py-2.5 px-6 hover:text-[#E8735A] transition-colors font-jakarta tracking-wide"
              >
                Contact
              </Link>
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-terracotta rounded-full transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
            </li>

          </ul>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-auto bg-white border-b border-[#EBE5D8] shadow-2xl p-6 max-h-[80vh] overflow-y-auto z-50">
          <div className="flex flex-col space-y-3.5 text-sm font-semibold">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#E8735A] border-b border-[#FAF6EE]"
            >
              Home
            </Link>
            <Link 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              About Siddhant School
            </Link>
            <Link 
              href="#courses" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Yoga Teacher Training (100h / 200h / 300h / 500h)
            </Link>
            <Link 
              href="#kundalini" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Kundalini Yoga TTC
            </Link>
            <Link 
              href="#retreats" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Rishikesh Yoga Retreats
            </Link>
            <Link 
              href="#founder" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Acharya Siddhant (Founder)
            </Link>
            <Link 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Reviews
            </Link>
            <Link 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              FAQ
            </Link>
            <Link 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2"
            >
              Contact Us
            </Link>

            {/* Mobile CTAs with classy typography and styling */}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-white border border-[#E8735A]/30 text-[#E8735A] py-3 rounded-full font-marcellus font-bold tracking-wide shadow-sm hover:bg-[#f3f9f7] transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <FaWhatsapp className="w-3.5 h-3.5 text-white" />
                </div>
                <span>Chat on WhatsApp (+91 84497 85755)</span>
              </a>
              <a
                href="#courses"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#cf5638] via-[#c24a2c] to-[#b03e23] text-white py-3 rounded-full font-marcellus font-bold tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#ffe7bf]" />
                <span>Enroll in Yoga Alliance TTC</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}

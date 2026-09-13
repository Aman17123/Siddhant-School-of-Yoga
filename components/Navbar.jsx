"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Award,
  Redo2Icon,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { site, whatsappLink } from "@/data/siteData";

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`site-header sticky top-0 z-50 w-full bg-white font-figtree transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}
    >
      {/* BACKGROUND SKETCHES (Ganga Aarti on left, Rishikesh Temples on right) */}
      <div className="header-bg-decor" aria-hidden="true" />

      {/* 1. TOPBAR (Deep emerald green #f22924) */}
      <div
        className={`bg-terracotta text-white transition-all duration-300 overflow-hidden relative z-10 ${isScrolled ? "max-h-0 py-0 opacity-0" : "max-h-12 py-2 opacity-100"}`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-medium">
          {/* Left: Email & Address */}
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              title="Email Siddhant School of Yoga"
            >
              <div className="w-5 h-5 rounded-xs bg-white/10 flex items-center justify-center shrink-0">
                <Image
                  src="/images/icons/mail.svg"
                  alt="Mail"
                  width={12}
                  height={12}
                  className="brightness-0 invert"
                />
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
                <Image
                  src="/images/icons/location.svg"
                  alt="Location"
                  width={12}
                  height={12}
                  className="brightness-0 invert"
                />
              </div>
              <span className="hidden md:inline">
                Behind Shiva Temple, Veerbhadra, Rishikesh, Uttarakhand 249202
              </span>
            </a>
          </div>

          {/* Right: Social Media */}
          <div className="flex items-center gap-3">
            <span className="text-white/80 hidden lg:inline text-[11px] font-medium tracking-wide">
              Follow Us
            </span>
            <div className="flex items-center gap-1.5">
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-xs bg-white/10 hover:bg-[#f22924] flex items-center justify-center transition-colors text-white"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-2.5 h-2.5" />
              </a>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-xs bg-white/10 hover:bg-[#f22924] flex items-center justify-center transition-colors text-white"
                aria-label="Instagram"
              >
                <FaInstagram className="w-2.5 h-2.5" />
              </a>
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-xs bg-white/10 hover:bg-[#f22924] flex items-center justify-center transition-colors text-white"
                aria-label="YouTube"
              >
                <FaYoutube className="w-2.5 h-2.5" />
              </a>
              <a
                href={site.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-xs bg-white/10 hover:bg-[#f22924] flex items-center justify-center transition-colors text-white"
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
          <div className="hidden md:flex md:col-span-3 items-center justify-start pr-6 border-r border-[#f22924]/15">
            <a
              href={whatsappLink(
                "Namaste! I would like to inquire about Yoga Teacher Training and Retreat courses at Siddhant School of Yoga.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white hover:bg-[#FAF6EE] border border-[#f22924]/20 hover:border-[#f22924]/50 shadow-[0_2px_12px_rgba(232,115,90,0.06)] hover:shadow-[0_4px_18px_rgba(232,115,90,0.14)] transition-all duration-300 transform hover:-translate-y-0.5"
              title="Connect on WhatsApp with Siddhant School of Yoga"
            >
              {/* WhatsApp Icon Disc with refined breathing pulse indicator */}
              <div className="relative w-8 h-8 rounded-full bg-[#f22924] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                <FaWhatsapp className="w-4.5 h-4.5 text-white" />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="font-marcellus text-[10.5px] uppercase tracking-[0.14em] text-[#f22924] font-semibold">
                    Call / Whatsapp
                  </span>
                </div>
                <span className="font-marcellus text-[13.5px] font-bold text-[#1F1E1D] tracking-[0.03em] group-hover:text-[#f22924] transition-colors leading-tight mt-0.5">
                  +91 84497 85755
                </span>
              </div>
            </a>
          </div>

          {/* Center Column: Professional Logo (6 cols) */}
          <div className="col-span-1 md:col-span-6 flex items-center justify-start md:justify-center md:px-6 md:border-r md:border-[#f22924]/15">
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
              className="hidden sm:inline-flex group relative items-center gap-3 px-5 py-2 rounded-full bg-[#f22924] hover:bg-[#d45d44] text-white shadow-[0_4px_16px_rgba(242,41,36,0.25)] hover:shadow-[0_6px_20px_rgba(212,93,68,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20 hover:border-white/40 overflow-hidden"
              title="Apply for Yoga Teacher Training Rishikesh"
            >
              {/* Icon badge */}
              <div className="relative z-10 w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Redo2Icon className="w-4.5 h-4.5 text-white" />
              </div>

              <div className="flex flex-col text-left relative z-10">
                <span className="font-jakarta text-[9px] uppercase font-bold tracking-[0.18em] text-white/90 leading-tight">
                  Join a Course
                </span>
                <span className="font-marcellus text-[13.5px] font-bold text-white tracking-[0.04em] flex items-center gap-1.5 leading-tight mt-0.5">
                  <span>Enroll Now</span>
                  <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ArrowUpRight className="w-3 h-3 text-white" />
                  </span>
                </span>
              </div>
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:text-[#f22924] hover:bg-[#f22924]/10 focus:outline-none ml-2 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN NAVBAR — Architectural Tabular Grid with Smooth Animated Dropdowns */}
      <nav
        className="hidden md:block border-t border-b border-[#EBE5D8] bg-white relative z-20"
        aria-label="Main Navigation"
      >
        <div className="max-w-[1320px] mx-auto">
          <ul className="flex items-center justify-center text-[13px] lg:text-[13.5px] font-semibold text-[#1F1E1D]">
            {/* Home (First item has border-l and border-r) */}
            <li className="border-l border-r border-[#EBE5D8] relative group">
              <Link
                href="/"
                className="inline-block py-2.5 px-4 lg:px-5 text-[#f22924] font-bold hover:text-[#F08C5C] transition-colors font-jakarta tracking-wide"
              >
                Home
              </Link>
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#f22924] rounded-full scale-x-100 transition-transform duration-300" />
            </li>

            {/* About Us (Smooth Dropdown) */}
            <li
              className="border-r border-[#EBE5D8] relative group"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "about" ? null : "about")
                }
                className={`cursor-pointer py-2.5 px-4 lg:px-5 transition-colors duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                  activeDropdown === "about"
                    ? "text-[#f22924] font-bold"
                    : "text-[#1F1E1D] hover:text-[#f22924]"
                }`}
              >
                <span>About Us</span>
                <ChevronDown
                  strokeWidth={1.75}
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    activeDropdown === "about"
                      ? "rotate-180 text-[#f22924]"
                      : "text-stone-400 group-hover:rotate-180 group-hover:text-[#f22924]"
                  }`}
                />
              </button>
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#f22924] rounded-full transition-transform duration-200 origin-center ${
                  activeDropdown === "about"
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />

              {/* Dropdown Container */}
              <div
                className={`absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeDropdown === "about"
                    ? "opacity-100 visible translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto"
                }`}
              >
                <div className="w-[350px] bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-stone-200/90 overflow-hidden p-2.5">
                  <div className="flex flex-col space-y-1">
                    {[
                      { title: "Siddhant School Of Yoga Rishikesh", href: "/about-us" },
                      { title: "Our Yoga Teachers in Rishikesh", href: "/yoga-teachers-rishikesh" },
                      { title: "About Siddhant (Yoga Guru Rishikesh)", href: "/siddhant-yoga-guru-rishikesh" },
                      { title: "Our Ideal / Master in Rishikesh", href: "/yoga-philosophy-rishikesh" },
                      { title: "Food & Accommodation in Rishikesh", href: "/food-accommodation-rishikesh" },
                      { title: "About Rishikesh (Yoga Capital of India)", href: "/rishikesh-yoga-capital-india" },
                      { title: "Our Yoga TTC Syllabus in Rishikesh", href: "/yoga-ttc-syllabus" },
                      { title: "Student Testimonials Rishikesh", href: "/testimonials" },
                      { title: "Yoga FAQ Rishikesh", href: "/faq" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="group/item flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f22924]/[0.06] transition-all duration-150"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover/item:bg-[#f22924] group-hover/item:scale-125 transition-all duration-150 shrink-0" />
                          <span className="text-[13.5px] font-semibold text-stone-800 group-hover/item:text-[#f22924] transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover/item:text-[#f22924] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* Yoga TTC (Smooth Dropdown) */}
            <li
              className="border-r border-[#EBE5D8] relative group"
              onMouseEnter={() => handleMouseEnter("yttc")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "yttc" ? null : "yttc")
                }
                className={`cursor-pointer py-2.5 px-4 lg:px-5 transition-colors duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                  activeDropdown === "yttc"
                    ? "text-[#f22924] font-bold"
                    : "text-[#1F1E1D] hover:text-[#f22924]"
                }`}
              >
                <span>Yoga TTC</span>
                <ChevronDown
                  strokeWidth={1.75}
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    activeDropdown === "yttc"
                      ? "rotate-180 text-[#f22924]"
                      : "text-stone-400 group-hover:rotate-180 group-hover:text-[#f22924]"
                  }`}
                />
              </button>
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#f22924] rounded-full transition-transform duration-200 origin-center ${
                  activeDropdown === "yttc"
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />

              <div
                className={`absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeDropdown === "yttc"
                    ? "opacity-100 visible translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto"
                }`}
              >
                <div className="w-[380px] bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-stone-200/90 overflow-hidden p-2.5">
                  <div className="flex flex-col space-y-1">
                    {[
                      { title: "Online 200 Hour Yoga TTC from Rishikesh", href: "/online-200-hour-yoga-ttc" },
                      { title: "100 Hour Yoga TTC in Rishikesh", href: "/100-hour-yoga-ttc-rishikesh" },
                      { title: "200 Hour Yoga TTC in Rishikesh", href: "/200-hour-yoga-ttc-rishikesh" },
                      { title: "300 Hour Yoga TTC in Rishikesh", href: "/300-hour-yoga-ttc-rishikesh" },
                      { title: "500 Hour Yoga TTC in Rishikesh", href: "/500-hour-yoga-ttc-rishikesh" },
                      { title: "500hrs Yoga & Ayurveda TTC in Rishikesh", href: "/500-hour-yoga-ayurveda-ttc" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="group/item flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f22924]/[0.06] transition-all duration-150"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover/item:bg-[#f22924] group-hover/item:scale-125 transition-all duration-150 shrink-0" />
                          <span className="text-[13.5px] font-semibold text-stone-800 group-hover/item:text-[#f22924] transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover/item:text-[#f22924] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* Kundalini Yoga (Smooth Dropdown) */}
            <li
              className="border-r border-[#EBE5D8] relative group"
              onMouseEnter={() => handleMouseEnter("kundalini")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "kundalini" ? null : "kundalini",
                  )
                }
                className={`cursor-pointer py-2.5 px-4 lg:px-5 transition-colors duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                  activeDropdown === "kundalini"
                    ? "text-[#f22924] font-bold"
                    : "text-[#1F1E1D] hover:text-[#f22924]"
                }`}
              >
                <span>Kundalini Yoga</span>
                <ChevronDown
                  strokeWidth={1.75}
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    activeDropdown === "kundalini"
                      ? "rotate-180 text-[#f22924]"
                      : "text-stone-400 group-hover:rotate-180 group-hover:text-[#f22924]"
                  }`}
                />
              </button>
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#f22924] rounded-full transition-transform duration-200 origin-center ${
                  activeDropdown === "kundalini"
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />

              <div
                className={`absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeDropdown === "kundalini"
                    ? "opacity-100 visible translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto"
                }`}
              >
                <div className="w-[390px] bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-stone-200/90 overflow-hidden p-2.5">
                  <div className="flex flex-col space-y-1">
                    {[
                      { title: "100 Hour Kundalini Yoga TTC in Rishikesh", href: "/100-hour-kundalini-yoga-ttc" },
                      { title: "200 Hour Kundalini Yoga TTC in Rishikesh", href: "/200-hour-kundalini-yoga-ttc" },
                      { title: "300 Hour Kundalini Yoga TTC in Rishikesh", href: "/300-hour-kundalini-yoga-ttc" },
                      { title: "500 Hour Kundalini Yoga TTC in Rishikesh", href: "/500-hour-kundalini-yoga-ttc" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="group/item flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f22924]/[0.06] transition-all duration-150"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover/item:bg-[#f22924] group-hover/item:scale-125 transition-all duration-150 shrink-0" />
                          <span className="text-[13.5px] font-semibold text-stone-800 group-hover/item:text-[#f22924] transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover/item:text-[#f22924] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* Yoga Retreat (Smooth Dropdown) */}
            <li
              className="border-r border-[#EBE5D8] relative group"
              onMouseEnter={() => handleMouseEnter("retreats")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "retreats" ? null : "retreats",
                  )
                }
                className={`cursor-pointer py-2.5 px-4 lg:px-5 transition-colors duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                  activeDropdown === "retreats"
                    ? "text-[#f22924] font-bold"
                    : "text-[#1F1E1D] hover:text-[#f22924]"
                }`}
              >
                <span>Yoga Retreat</span>
                <ChevronDown
                  strokeWidth={1.75}
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    activeDropdown === "retreats"
                      ? "rotate-180 text-[#f22924]"
                      : "text-stone-400 group-hover:rotate-180 group-hover:text-[#f22924]"
                  }`}
                />
              </button>
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#f22924] rounded-full transition-transform duration-200 origin-center ${
                  activeDropdown === "retreats"
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />

              <div
                className={`absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeDropdown === "retreats"
                    ? "opacity-100 visible translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto"
                }`}
              >
                <div className="w-[410px] max-h-[78vh] overflow-y-auto bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-stone-200/90 p-2.5">
                  <div className="flex flex-col space-y-1">
                    {[
                      { title: "Yoga for Beginners in Rishikesh", href: "/yoga-for-beginners-rishikesh" },
                      { title: "Yoga & Meditation Retreat in Rishikesh", href: "/yoga-meditation-retreat" },
                      { title: "07 Days Yoga & Meditation Retreat in Rishikesh", href: "/7-day-yoga-meditation-retreat" },
                      { title: "Kundalini Retreat in Rishikesh", href: "/kundalini-retreat-rishikesh" },
                      { title: "Pranayama Retreat in Rishikesh", href: "/pranayama-retreat-rishikesh" },
                      { title: "Vipassana Retreat in Rishikesh", href: "/vipassana-retreat-rishikesh" },
                      { title: "Detox Retreat in Rishikesh", href: "/detox-retreat-rishikesh" },
                      { title: "3 Days Detox Retreat in Rishikesh", href: "/3-day-detox-retreat" },
                      { title: "Mantra Yoga Retreat in Rishikesh", href: "/mantra-yoga-meditation-retreat" },
                      { title: "Yoga & Ayurveda Retreat in Rishikesh", href: "/yoga-ayurveda-retreat" },
                      { title: "Meditation & Pranayama Retreat in Rishikesh", href: "/5-day-meditation-pranayama-retreat" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="group/item flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-[#f22924]/[0.06] transition-all duration-150"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover/item:bg-[#f22924] group-hover/item:scale-125 transition-all duration-150 shrink-0" />
                          <span className="text-[13px] font-semibold text-stone-800 group-hover/item:text-[#f22924] transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/item:text-[#f22924] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* Gallery (Smooth Dropdown) */}
            <li
              className="border-r border-[#EBE5D8] relative group"
              onMouseEnter={() => handleMouseEnter("gallery")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "gallery" ? null : "gallery",
                  )
                }
                className={`cursor-pointer py-2.5 px-4 lg:px-5 transition-colors duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                  activeDropdown === "gallery"
                    ? "text-[#f22924] font-bold"
                    : "text-[#1F1E1D] hover:text-[#f22924]"
                }`}
              >
                <span>Gallery</span>
                <ChevronDown
                  strokeWidth={1.75}
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    activeDropdown === "gallery"
                      ? "rotate-180 text-[#f22924]"
                      : "text-stone-400 group-hover:rotate-180 group-hover:text-[#f22924]"
                  }`}
                />
              </button>
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#f22924] rounded-full transition-transform duration-200 origin-center ${
                  activeDropdown === "gallery"
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />

              <div
                className={`absolute top-full left-0 pt-2 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeDropdown === "gallery"
                    ? "opacity-100 visible translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto"
                }`}
              >
                <div className="w-[260px] bg-white rounded-xl shadow-[0_12px_32px_-4px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-stone-200/90 overflow-hidden p-2.5">
                  <div className="flex flex-col space-y-1">
                    {[
                      { title: "Photo Gallery Rishikesh", href: "/gallery" },
                      { title: "Video Gallery Rishikesh", href: "/video-gallery" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="group/item flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f22924]/[0.06] transition-all duration-150"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover/item:bg-[#f22924] group-hover/item:scale-125 transition-all duration-150 shrink-0" />
                          <span className="text-[13.5px] font-semibold text-stone-800 group-hover/item:text-[#f22924] transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover/item:text-[#f22924] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* Contact Us */}
            <li className="border-r border-[#EBE5D8] relative group">
              <Link
                href="/contact-us"
                className="inline-block py-2.5 px-4 lg:px-5 hover:text-[#f22924] transition-colors font-jakarta tracking-wide"
              >
                Contact Us
              </Link>
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#f22924] rounded-full transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
            </li>

            {/* Blog */}
            <li className="border-r border-[#EBE5D8] relative group">
              <a
                href="https://www.siddhantschoolofyoga.com/blog/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2.5 px-4 lg:px-5 hover:text-[#f22924] transition-colors font-jakarta tracking-wide"
              >
                Blog
              </a>
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#f22924] rounded-full transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
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
              className="py-2 text-[#f22924] border-b border-[#FAF6EE]"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              About Siddhant School of Yoga Rishikesh
            </Link>
            <Link
              href="/200-hour-yoga-ttc-rishikesh"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Yoga Teacher Training in Rishikesh (100h / 200h / 300h / 500h)
            </Link>
            <Link
              href="/200-hour-kundalini-yoga-ttc"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Kundalini Yoga TTC in Rishikesh
            </Link>
            <Link
              href="/yoga-meditation-retreat"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Yoga Retreats in Rishikesh
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Photo &amp; Video Gallery Rishikesh
            </Link>
            <Link
              href="/testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Reviews &amp; Testimonials
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Yoga FAQ Rishikesh
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#FAF6EE]"
            >
              Contact Us Rishikesh
            </Link>
            <a
              href="https://www.siddhantschoolofyoga.com/blog/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2"
            >
              Yoga Blog Rishikesh
            </a>

            {/* Mobile CTAs with classy typography and styling */}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-white border border-[#f22924]/30 text-[#f22924] py-3 rounded-full font-marcellus font-bold tracking-wide shadow-sm hover:bg-[#f3f9f7] transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <FaWhatsapp className="w-3.5 h-3.5 text-white" />
                </div>
                <span>Chat on WhatsApp (+91 84497 85755)</span>
              </a>
              <a
                href="#courses"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#f22924] hover:bg-[#f08c5c] text-white py-3 rounded-full font-marcellus font-bold tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4 text-white" />
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

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

const navMenu = [
  { type: "link", key: "home", label: "Home", href: "/" },
  {
    type: "dropdown",
    key: "about",
    label: "About Us",
    items: [
      { title: "About Siddhant School", href: "/about-us" },
      { title: "Our Yoga Teachers", href: "/yoga-teachers-rishikesh" },
      { title: "About Acharya Siddhant Ji", href: "/siddhant-yoga-guru-rishikesh" },
      { title: "Food & Accommodation", href: "/food-accommodation-rishikesh" },
      { title: "About Rishikesh", href: "/rishikesh-yoga-capital-india" },
      { title: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    type: "dropdown",
    key: "yttc",
    label: "Yoga TTC",
    items: [
      { title: "Online 200 Hour Yoga TTC from Rishikesh", href: "/online-200-hour-yoga-ttc" },
      { title: "100 Hour Yoga TTC in Rishikesh", href: "/100-hour-yoga-teacher-training-in-rishikesh-india" },
      { title: "200 Hour Yoga TTC in Rishikesh", href: "/200-hour-yoga-teacher-training-in-rishikesh-india" },
      { title: "300 Hour Yoga TTC in Rishikesh", href: "/300-hour-yoga-ttc-rishikesh" },
      { title: "500 Hour Yoga TTC in Rishikesh", href: "/500-hour-yoga-ttc-rishikesh" },
      { title: "500hrs Yoga & Ayurveda TTC in Rishikesh", href: "/500-hour-yoga-ayurveda-ttc" },
    ],
  },
  {
    type: "dropdown",
    key: "kundalini",
    label: "Kundalini Yoga",
    items: [
      { title: "100 Hour Kundalini Yoga TTC in Rishikesh", href: "/100-hour-kundalini-yoga-ttc" },
      { title: "200 Hour Kundalini Yoga TTC in Rishikesh", href: "/200-hour-kundalini-yoga-ttc" },
      { title: "300 Hour Kundalini Yoga TTC in Rishikesh", href: "/300-hour-kundalini-yoga-ttc" },
      { title: "500 Hour Kundalini Yoga TTC in Rishikesh", href: "/500-hour-kundalini-yoga-ttc" },
    ],
  },
  {
    type: "dropdown",
    key: "retreats",
    label: "Yoga Retreat",
    items: [
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
    ],
  },
  { type: "link", key: "gallery", label: "Gallery", href: "/gallery" },
  { type: "link", key: "payment", label: "Payment", href: "/payment" },
  {
    type: "external",
    key: "blog",
    label: "Blogs",
    href: "https://www.siddhantschoolofyoga.com/blog/",
  },
  { type: "link", key: "contact", label: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState(null);
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* 1. TOPBAR (Flows naturally above sticky header, scrolls off without layout shift) */}
      <div className="bg-[#158b72] text-white py-2 relative z-20 overflow-hidden border-b border-[#158b72]/20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-medium">
          {/* Left: Email & Address */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-white/95 hover:text-white transition-colors"
              title="Email Siddhant School of Yoga"
            >
              <div className="w-5 h-5 rounded-xs bg-white/15 flex items-center justify-center shrink-0">
                <Image
                  src="/images/icons/mail.svg"
                  alt="Mail"
                  width={12}
                  height={12}
                  className="brightness-0 invert"
                />
              </div>
              <span className="hidden sm:inline">{site.email}</span>
              <span className="inline sm:hidden text-[11px]">info@siddhant.com</span>
            </a>

            <a
              href={site.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-white/95 hover:text-white transition-colors"
              title="Ashram Location in Rishikesh"
            >
              <div className="w-5 h-5 rounded-xs bg-white/15 flex items-center justify-center shrink-0">
                <Image
                  src="/images/icons/location.svg"
                  alt="Location"
                  width={12}
                  height={12}
                  className="brightness-0 invert"
                />
              </div>
              <span>
                Behind Shiva Temple, Veerbhadra, Rishikesh, Uttarakhand 249202
              </span>
            </a>
          </div>

          {/* Right: Social Media */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="text-white/85 hidden lg:inline text-[11px] font-medium tracking-wide">
              Follow Us
            </span>
            <div className="flex items-center gap-1.5">
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-xs bg-white/15 hover:bg-[#158b72] flex items-center justify-center transition-colors text-white"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-2.5 h-2.5" />
              </a>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-xs bg-white/15 hover:bg-[#158b72] flex items-center justify-center transition-colors text-white"
                aria-label="Instagram"
              >
                <FaInstagram className="w-2.5 h-2.5" />
              </a>
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-xs bg-white/15 hover:bg-[#158b72] flex items-center justify-center transition-colors text-white"
                aria-label="YouTube"
              >
                <FaYoutube className="w-2.5 h-2.5" />
              </a>
              <a
                href={site.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-xs bg-white/15 hover:bg-[#158b72] flex items-center justify-center transition-colors text-white"
                aria-label="Twitter"
              >
                <FaTwitter className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <header
        className={`site-header sticky md:static top-0 z-50 w-full bg-white font-figtree transition-shadow duration-300 ${
          isScrolled ? "shadow-md md:shadow-none" : "shadow-xs"
        }`}
      >
        {/* BACKGROUND SKETCHES (Ganga Aarti on left, Rishikesh Temples on right) */}
        <div className="header-bg-decor" aria-hidden="true" />

        {/* 2. MIDDLE BOX */}
        <div className="relative z-10 bg-white">
          {/* A. MOBILE VIEW (Screen < md): Clean Simple Logo + Hamburger */}
          <div className="flex md:hidden items-center justify-between px-4 py-2.5 border-b border-[#c8ece2]/80">
            {/* Mobile Brand Logo */}
            <Link href="/" className="inline-block shrink-0">
              <Image
                src="/logo/siddhant-logo.svg"
                alt="Siddhant School of Yoga - Rishikesh"
                width={240}
                height={52}
                priority
                className="h-10 sm:h-12 w-auto max-w-[210px] sm:max-w-[250px] object-contain"
              />
            </Link>

            {/* Simple Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-[#158b72] hover:bg-stone-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* B. DESKTOP VIEW (Screen >= md): Classy 12-column grid layout */}
          <div className="hidden md:grid max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:grid-cols-12 items-center">
            {/* Left Column: Ashram Helpline / WhatsApp Concierge (3 cols) */}
            <div className="md:col-span-3 flex items-center justify-start pr-6 border-r border-[#158b72]/20">
              <a
                href={whatsappLink(
                  "Namaste! I would like to inquire about Yoga Teacher Training and Retreat courses at Siddhant School of Yoga.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white hover:bg-[#def4ee4d] border border-[#158b72]/30 hover:border-[#158b72] shadow-[0_2px_12px_rgba(16,147,71,0.08)] hover:shadow-[0_4px_18px_rgba(16,147,71,0.18)] transition-all duration-300 transform hover:-translate-y-0.5"
                title="Connect on WhatsApp with Siddhant School of Yoga"
              >
                <div className="relative w-8 h-8 rounded-full bg-[#158b72] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <FaWhatsapp className="w-4.5 h-4.5 text-white" />
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5 leading-tight">
                    <span className="font-marcellus text-[10.5px] uppercase tracking-[0.14em] text-[#158b72] font-bold">
                      Call / Whatsapp
                    </span>
                  </div>
                  <span className="font-marcellus text-[13.5px] font-bold text-[#1F1E1D] tracking-[0.03em] group-hover:text-[#158b72] transition-colors leading-tight mt-0.5">
                    +91 84497 85755
                  </span>
                </div>
              </a>
            </div>

            {/* Center Column: Professional Logo (6 cols) */}
            <div className="md:col-span-6 flex items-center justify-center px-6 border-r border-[#158b72]/20">
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

            {/* Right Column: Distinctive Siddhant Red Enroll CTA Button (3 cols) */}
            <div className="md:col-span-3 flex items-center justify-end pl-6 gap-3">
              <a
                href="#courses"
                className="inline-flex group relative items-center gap-3 px-5 py-2 rounded-full bg-[#158b72] hover:bg-[#0f6b57] text-white shadow-[0_4px_16px_rgba(226,41,36,0.25)] hover:shadow-[0_6px_20px_rgba(201,36,31,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20 hover:border-white/40 overflow-hidden"
                title="Apply for Yoga Teacher Training Rishikesh"
              >
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
            </div>
          </div>
        </div>

        {/* 3. MAIN NAVBAR — Architectural Tabular Grid with Smooth Animated Dropdowns */}
        <nav
          className={`hidden md:block md:sticky md:top-0 border-t border-b border-[#c8ece2] bg-white relative z-50 transition-shadow duration-300 ${
            isScrolled ? "shadow-md" : ""
          }`}
          aria-label="Main Navigation"
        >
          <div className="max-w-[1320px] mx-auto">
            <ul className="flex items-center justify-center text-[14px] lg:text-[14.5px] font-semibold text-[#1F1E1D]">
              {/* Home (First item has border-l and border-r) */}
              <li className="border-l border-r border-[#c8ece2] relative group">
                <Link
                  href="/"
                  className="inline-block py-2.5 px-5 lg:px-6 text-[#158b72] font-bold hover:text-[#3aab92] transition-colors font-jakarta tracking-wide"
                >
                  Home
                </Link>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#158b72] rounded-full scale-x-100 transition-transform duration-300" />
              </li>

              {/* About Us (Smooth Dropdown) */}
              <li
                className="border-r border-[#c8ece2] relative group"
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "about" ? null : "about",
                    )
                  }
                  className={`cursor-pointer py-2.5 px-5 lg:px-6 transition-colors duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                    activeDropdown === "about"
                      ? "text-[#158b72] font-bold"
                      : "text-[#1F1E1D] hover:text-[#158b72]"
                  }`}
                >
                  <span>About Us</span>
                  <ChevronDown
                    strokeWidth={1.75}
                    className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                      activeDropdown === "about"
                        ? "rotate-180 text-[#158b72]"
                        : "text-stone-400 group-hover:rotate-180 group-hover:text-[#158b72]"
                    }`}
                  />
                </button>
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#158b72] rounded-full transition-transform duration-200 origin-center ${
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
                    <div className="flex flex-col space-y-1.5">
                      {[
                        {
                          title: "About Siddhant School",
                          href: "/about-us",
                        },
                        {
                          title: "Our Yoga Teachers",
                          href: "/yoga-teachers-rishikesh",
                        },
                        {
                          title: "About Acharya Siddhant Ji",
                          href: "/siddhant-yoga-guru-rishikesh",
                        },
                        {
                          title: "Food & Accommodation",
                          href: "/food-accommodation-rishikesh",
                        },
                        {
                          title: "About Rishikesh",
                          href: "/rishikesh-yoga-capital-india",
                        },
                        {
                          title: "Privacy Policy",
                          href: "/privacy-policy",
                        },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group/item flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#158b72]/[0.06] transition-all duration-150"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover/item:bg-[#158b72] group-hover/item:scale-125 transition-all duration-150 shrink-0" />
                            <span className="text-[14.5px] font-semibold text-stone-800 group-hover/item:text-[#158b72] transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover/item:text-[#158b72] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              {/* Yoga TTC (Smooth Dropdown) */}
              <li
                className="border-r border-[#c8ece2] relative group"
                onMouseEnter={() => handleMouseEnter("yttc")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "yttc" ? null : "yttc")
                  }
                  className={`cursor-pointer py-2.5 px-5 lg:px-6 transition-colors duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                    activeDropdown === "yttc"
                      ? "text-[#158b72] font-bold"
                      : "text-[#1F1E1D] hover:text-[#158b72]"
                  }`}
                >
                  <span>Yoga TTC</span>
                  <ChevronDown
                    strokeWidth={1.75}
                    className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                      activeDropdown === "yttc"
                        ? "rotate-180 text-[#158b72]"
                        : "text-stone-400 group-hover:rotate-180 group-hover:text-[#158b72]"
                    }`}
                  />
                </button>
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#158b72] rounded-full transition-transform duration-200 origin-center ${
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
                    <div className="flex flex-col space-y-1.5">
                      {[
                        {
                          title: "Online 200 Hour Yoga TTC from Rishikesh",
                          href: "/online-200-hour-yoga-ttc",
                        },
                        {
                          title: "100 Hour Yoga TTC in Rishikesh",
                          href: "/100-hour-yoga-teacher-training-in-rishikesh-india",
                        },
                        {
                          title: "200 Hour Yoga TTC in Rishikesh",
                          href: "/200-hour-yoga-teacher-training-in-rishikesh-india",
                        },
                        {
                          title: "300 Hour Yoga TTC in Rishikesh",
                          href: "/300-hour-yoga-ttc-rishikesh",
                        },
                        {
                          title: "500 Hour Yoga TTC in Rishikesh",
                          href: "/500-hour-yoga-ttc-rishikesh",
                        },
                        {
                          title: "500hrs Yoga & Ayurveda TTC in Rishikesh",
                          href: "/500-hour-yoga-ayurveda-ttc",
                        },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group/item flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#158b72]/[0.06] transition-all duration-150"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover/item:bg-[#158b72] group-hover/item:scale-125 transition-all duration-150 shrink-0" />
                            <span className="text-[14.5px] font-semibold text-stone-800 group-hover/item:text-[#158b72] transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover/item:text-[#158b72] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              {/* Kundalini Yoga (Smooth Dropdown) */}
              <li
                className="border-r border-[#c8ece2] relative group"
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
                  className={`cursor-pointer py-2.5 px-5 lg:px-6 transition-colors duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                    activeDropdown === "kundalini"
                      ? "text-[#158b72] font-bold"
                      : "text-[#1F1E1D] hover:text-[#158b72]"
                  }`}
                >
                  <span>Kundalini Yoga</span>
                  <ChevronDown
                    strokeWidth={1.75}
                    className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                      activeDropdown === "kundalini"
                        ? "rotate-180 text-[#158b72]"
                        : "text-stone-400 group-hover:rotate-180 group-hover:text-[#158b72]"
                    }`}
                  />
                </button>
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#158b72] rounded-full transition-transform duration-200 origin-center ${
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
                    <div className="flex flex-col space-y-1.5">
                      {[
                        {
                          title: "100 Hour Kundalini Yoga TTC in Rishikesh",
                          href: "/100-hour-kundalini-yoga-ttc",
                        },
                        {
                          title: "200 Hour Kundalini Yoga TTC in Rishikesh",
                          href: "/200-hour-kundalini-yoga-ttc",
                        },
                        {
                          title: "300 Hour Kundalini Yoga TTC in Rishikesh",
                          href: "/300-hour-kundalini-yoga-ttc",
                        },
                        {
                          title: "500 Hour Kundalini Yoga TTC in Rishikesh",
                          href: "/500-hour-kundalini-yoga-ttc",
                        },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group/item flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#158b72]/[0.06] transition-all duration-150"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover/item:bg-[#158b72] group-hover/item:scale-125 transition-all duration-150 shrink-0" />
                            <span className="text-[14.5px] font-semibold text-stone-800 group-hover/item:text-[#158b72] transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover/item:text-[#158b72] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              {/* Yoga Retreat (Smooth Dropdown) */}
              <li
                className="border-r border-[#c8ece2] relative group"
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
                  className={`cursor-pointer py-2.5 px-5 lg:px-6 transition-colors duration-200 flex items-center gap-1.5 font-jakarta tracking-wide ${
                    activeDropdown === "retreats"
                      ? "text-[#158b72] font-bold"
                      : "text-[#1F1E1D] hover:text-[#158b72]"
                  }`}
                >
                  <span>Yoga Retreat</span>
                  <ChevronDown
                    strokeWidth={1.75}
                    className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                      activeDropdown === "retreats"
                        ? "rotate-180 text-[#158b72]"
                        : "text-stone-400 group-hover:rotate-180 group-hover:text-[#158b72]"
                    }`}
                  />
                </button>
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#158b72] rounded-full transition-transform duration-200 origin-center ${
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
                    <div className="flex flex-col space-y-1.5">
                      {[
                        {
                          title: "Yoga for Beginners in Rishikesh",
                          href: "/yoga-for-beginners-rishikesh",
                        },
                        {
                          title: "Yoga & Meditation Retreat in Rishikesh",
                          href: "/yoga-meditation-retreat",
                        },
                        {
                          title:
                            "07 Days Yoga & Meditation Retreat in Rishikesh",
                          href: "/7-day-yoga-meditation-retreat",
                        },
                        {
                          title: "Kundalini Retreat in Rishikesh",
                          href: "/kundalini-retreat-rishikesh",
                        },
                        {
                          title: "Pranayama Retreat in Rishikesh",
                          href: "/pranayama-retreat-rishikesh",
                        },
                        {
                          title: "Vipassana Retreat in Rishikesh",
                          href: "/vipassana-retreat-rishikesh",
                        },
                        {
                          title: "Detox Retreat in Rishikesh",
                          href: "/detox-retreat-rishikesh",
                        },
                        {
                          title: "3 Days Detox Retreat in Rishikesh",
                          href: "/3-day-detox-retreat",
                        },
                        {
                          title: "Mantra Yoga Retreat in Rishikesh",
                          href: "/mantra-yoga-meditation-retreat",
                        },
                        {
                          title: "Yoga & Ayurveda Retreat in Rishikesh",
                          href: "/yoga-ayurveda-retreat",
                        },
                        {
                          title: "Meditation & Pranayama Retreat in Rishikesh",
                          href: "/5-day-meditation-pranayama-retreat",
                        },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group/item flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#158b72]/[0.06] transition-all duration-150"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover/item:bg-[#158b72] group-hover/item:scale-125 transition-all duration-150 shrink-0" />
                            <span className="text-[14px] font-semibold text-stone-800 group-hover/item:text-[#158b72] transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/item:text-[#158b72] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              {/* Gallery */}
              <li className="border-r border-[#c8ece2] relative group">
                <Link
                  href="/gallery"
                  className="inline-block py-2.5 px-5 lg:px-6 hover:text-[#158b72] transition-colors font-jakarta tracking-wide"
                >
                  Gallery
                </Link>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#158b72] rounded-full transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
              </li>

              {/* Payment */}
              <li className="border-r border-[#c8ece2] relative group">
                <Link
                  href="/payment"
                  className="inline-block py-2.5 px-5 lg:px-6 hover:text-[#158b72] transition-colors font-jakarta tracking-wide"
                >
                  Payment
                </Link>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#158b72] rounded-full transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
              </li>

              {/* Blog */}
              <li className="border-r border-[#c8ece2] relative group">
                <a
                  href="https://www.siddhantschoolofyoga.com/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-2.5 px-5 lg:px-6 hover:text-[#158b72] transition-colors font-jakarta tracking-wide"
                >
                  Blogs
                </a>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#158b72] rounded-full transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
              </li>

              {/* Contact Us */}
              <li className="border-r border-[#c8ece2] relative group">
                <Link
                  href="/contact-us"
                  className="inline-block py-2.5 px-5 lg:px-6 hover:text-[#158b72] transition-colors font-jakarta tracking-wide"
                >
                  Contact Us
                </Link>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#158b72] rounded-full transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
              </li>
            </ul>
          </div>
        </nav>

        {/* 4. MOBILE SLIDE-IN DRAWER MENU */}
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
          className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-[60] transition-opacity duration-300 ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Drawer */}
        <div
          className={`md:hidden fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8ece2]/80 shrink-0">
            <Image
              src="/logo/siddhant-logo.svg"
              alt="Siddhant School of Yoga"
              width={160}
              height={40}
              className="h-9 w-auto object-contain"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-lg text-stone-600 hover:text-[#158b72] hover:bg-[#def4ee4d] transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links (mirrors desktop nav: same items + nested dropdowns) */}
          <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
            <div className="flex flex-col text-[15px] font-semibold text-stone-800">
              {navMenu.map((entry) => {
                if (entry.type === "link") {
                  return (
                    <Link
                      key={entry.key}
                      href={entry.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-3 px-3 rounded-xl transition-colors ${
                        entry.key === "home"
                          ? "text-[#158b72] bg-[#def4ee4d]"
                          : "hover:text-[#158b72] hover:bg-[#def4ee4d]"
                      }`}
                    >
                      {entry.label}
                    </Link>
                  );
                }

                if (entry.type === "external") {
                  return (
                    <a
                      key={entry.key}
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-3 rounded-xl hover:text-[#158b72] hover:bg-[#def4ee4d] transition-colors"
                    >
                      {entry.label}
                    </a>
                  );
                }

                // Dropdown group (accordion)
                const isOpen = mobileOpenGroup === entry.key;
                return (
                  <div key={entry.key} className="border-b border-[#def4ee4d] last:border-b-0">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileOpenGroup(isOpen ? null : entry.key)
                      }
                      className={`w-full flex items-center justify-between py-3 px-3 rounded-xl transition-colors ${
                        isOpen
                          ? "text-[#158b72] bg-[#def4ee4d]"
                          : "hover:text-[#158b72] hover:bg-[#def4ee4d]"
                      }`}
                    >
                      <span>{entry.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isOpen ? "max-h-[1200px]" : "max-h-0"
                      }`}
                    >
                      <div className="pl-4 pb-2 pt-1 flex flex-col space-y-0.5">
                        {entry.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="group/item flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-[14px] font-medium text-stone-600 hover:text-[#158b72] hover:bg-[#def4ee4d] transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover/item:bg-[#158b72] group-hover/item:scale-125 transition-all duration-150 shrink-0" />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drawer Action CTAs */}
          <div className="px-5 py-4 border-t border-[#c8ece2]/80 shrink-0 flex flex-col gap-2.5">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-white border-2 border-[#158b72] hover:bg-[#158b72] text-[#158b72] hover:text-white py-3 rounded-full font-marcellus font-bold tracking-wide transition-all text-sm group"
            >
              <div className="w-5 h-5 rounded-full bg-[#158b72]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <FaWhatsapp className="w-3.5 h-3.5 text-[#158b72] group-hover:text-white transition-colors" />
              </div>
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#158b72] hover:bg-[#0f6b57] text-white py-3 rounded-full font-marcellus font-bold tracking-wide shadow-xs transition-all text-sm"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Enroll Now</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

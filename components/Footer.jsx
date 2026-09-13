"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowUp,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { site, whatsappLink } from "@/data/siteData";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#FFFFFF] text-[#1e2422] font-figtree border-t border-[#EBE5D8] overflow-hidden">
      {/* 1. PRE-FOOTER CTA SECTION (Matches Reference Exactly) */}
      <div className="relative pt-16 sm:pt-20 pb-16 sm:pb-20 text-center border-b border-[#EBE5D8]/70 overflow-hidden bg-[#FFFFFF]">
        {/* Sacred Lotus & Yoga Watermark in Background - Subtle, Classy & Elegant */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[300px] h-[260px] sm:h-[300px] pointer-events-none opacity-[0.22] flex items-center justify-center -z-0">
          <svg
            viewBox="0 0 240 240"
            className="w-full h-full text-[#b8894d]"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric rings */}
            <circle cx="120" cy="120" r="105" strokeWidth="0.9" strokeDasharray="4 3" opacity="0.8" />
            <circle cx="120" cy="120" r="92" strokeWidth="1" opacity="0.85" />
            <circle cx="120" cy="120" r="68" stroke="#f22924" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="120" cy="120" r="44" strokeWidth="0.9" opacity="0.75" />

            {/* 12 Blooming Lotus Petals with Delicate Outlines */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <path
                key={i}
                d="M 120 72 C 110 38, 130 38, 120 16 C 110 38, 130 38, 120 72 Z"
                strokeWidth="1"
                opacity="0.9"
                transform={`rotate(${angle} 120 120)`}
              />
            ))}

            {/* Prana waves radiating across base */}
            <path
              d="M 15 180 C 65 162, 115 195, 165 175 C 195 160, 220 180, 235 170"
              strokeWidth="1"
              strokeDasharray="5 3"
              opacity="0.8"
            />
            <path
              d="M 25 192 C 75 175, 125 205, 175 186 C 205 172, 225 190, 238 182"
              stroke="#175f52"
              strokeWidth="0.9"
              opacity="0.6"
            />

            {/* Center Sacred Yogi Emblem */}
            <g transform="translate(100, 100) scale(0.57)" opacity="0.8">
              <circle cx="35" cy="35" r="32" stroke="#f22924" strokeWidth="0.8" strokeDasharray="3 2" />
              <circle cx="35" cy="18" r="4" fill="#175f52" />
              <path d="M35 22.5 C35 28 32 35 34 42 C35 45 36 50 36 54" stroke="#175f52" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M36 54 L36 62" stroke="#175f52" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M34 42 C30 40 22 36 21 28 C20.5 24 23 20 26 19 C28 18 31 20 33 24" stroke="#175f52" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M34 26 C38 27 46 29 52 30" stroke="#175f52" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="53" cy="30" r="1.5" fill="currentColor" />
              <path d="M34 26 C31 22 28 20 30 22" stroke="#175f52" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M25 62 C30 59 40 59 45 62" strokeWidth="1" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-belleza text-3xl sm:text-4xl md:text-5xl text-[#1e2422] font-normal tracking-wide mb-6 drop-shadow-2xs">
            Book Your Course or Retreat
          </h2>

          <div>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#1e2422] text-[#1e2422] hover:bg-[#1e2422] hover:text-white text-xs font-semibold tracking-[0.2em] uppercase font-figtree transition-all duration-300 shadow-2xs hover:shadow-md"
            >
              <span>EXPLORE YTTC &amp; RETREATS</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2]" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN 5-COLUMN FOOTER NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-12 sm:pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand & Socials */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-1 pr-2">
            <Link href="/" className="inline-block mb-3.5">
              <Image
                src="/logo/siddhant-logo.svg"
                alt="Siddhant School of Yoga"
                width={200}
                height={58}
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-stone-600 leading-relaxed font-normal mb-5">
              Yoga Alliance USA certified (RYS 200, 300, 500) traditional school of Classical Hatha, Ashtanga, Kundalini Yoga, and sacred Himalayan retreats in Veerbhadra, Rishikesh.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2.5 mb-5">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-2xs"
                aria-label="Instagram"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-2xs"
                aria-label="Facebook"
                title="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#EA4335] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-2xs"
                aria-label="Google Maps"
                title="Google Maps"
              >
                <SiGooglemaps className="w-4 h-4" />
              </a>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-2xs"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#EBE5D8] text-[11px] font-semibold text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Yoga Alliance RYS Certified</span>
            </div>
          </div>

          {/* Column 2: TEACHER TRAINING */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#9b7b38] mb-4 font-figtree">
              Teacher Training
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm text-stone-600">
              <li>
                <Link
                  href="#courses"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Yoga TTC Overview
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  100-Hour Yoga TTC
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  200-Hour Yoga TTC (Flagship)
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  300-Hour Advanced TTC
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  500-Hour Master TTC
                </Link>
              </li>
              <li>
                <Link
                  href="#kundalini"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  100-Hour Kundalini TTC
                </Link>
              </li>
              <li>
                <Link
                  href="#kundalini"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  200-Hour Kundalini TTC
                </Link>
              </li>
              <li>
                <Link
                  href="#kundalini"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  500-Hour Kundalini Master
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: YOGA RETREATS */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#9b7b38] mb-4 font-figtree">
              Yoga Retreats
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm text-stone-600">
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Retreats Overview
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Yoga for Beginners Retreat
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Yoga &amp; Meditation Retreat
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Kundalini Awakening Retreat
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Pranayama &amp; Breathwork
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Vipassana Silent Retreat
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Yogic Detox &amp; Ayurveda
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Himalayan Temple Excursions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: QUICK LINKS */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#9b7b38] mb-4 font-figtree">
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm text-stone-600">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  About Our Ashram
                </Link>
              </li>
              <li>
                <Link
                  href="#founder"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Acharya Siddhant (Founder)
                </Link>
              </li>
              <li>
                <Link
                  href="#teachers"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Himalayan Masters &amp; Faculty
                </Link>
              </li>
              <li>
                <Link
                  href="#comparison"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Compare All TTC Courses
                </Link>
              </li>
              <li>
                <Link
                  href="#residential"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Ashram Stay &amp; Sattvic Food
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Student Reviews (4.9★)
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="hover:text-[#f22924] hover:translate-x-1 transition-all inline-block"
                >
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: CONTACT US */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#9b7b38] mb-4 font-figtree">
              Contact &amp; Location
            </h4>
            <div className="space-y-3.5 text-sm text-stone-600">
              <div className="flex items-start gap-2.5 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#f22924] shrink-0 mt-1" />
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f22924] transition-colors"
                >
                  Behind Shiva Temple, Nirmal Block-B, Veerbhadra, Rishikesh,
                  Uttarakhand 249202, India
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f22924] shrink-0" />
                <a
                  href={`tel:${site.phone}`}
                  className="hover:text-[#f22924] font-medium transition-colors"
                >
                  {site.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f22924] shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-[#f22924] transition-colors break-all"
                >
                  {site.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappLink(
                    "Namaste Siddhant School of Yoga! I would like to make an enquiry about course dates and enrollment.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f22924] hover:bg-[#d45d44] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs hover:shadow-md"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUB-FOOTER BOTTOM STRIP (Matches Reference Exactly) */}
      <div className="border-t border-[#E8DFCF]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-figtree text-[#77786e]">
          {/* Left: Copyright */}
          <div>
            <span>SIDDHANT SCHOOL OF YOGA • &copy; 2026</span>
          </div>

          {/* Center: Legal Links */}
          <div className="flex items-center gap-6 text-[11px] font-medium tracking-wider uppercase text-[#77786e]">
            <Link href="#faq" className="hover:text-[#1e2422] transition-colors">
              Privacy
            </Link>
            <Link href="#faq" className="hover:text-[#1e2422] transition-colors">
              Terms
            </Link>
            <Link href="#faq" className="hover:text-[#1e2422] transition-colors">
              Payment
            </Link>
          </div>

          {/* Right: Back to Top */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-[#77786e] hover:text-[#1e2422] transition-colors cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

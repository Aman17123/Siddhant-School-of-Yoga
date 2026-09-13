"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  ArrowUp,
  Send,
  Calendar,
  CheckCircle2,
  FileText,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { site, whatsappLink } from "@/data/siteData";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#FAF6EE] via-[#FDFBF7] to-[#F5EFE6] text-[#1F1E1D] pt-14 lg:pt-18 pb-10 border-t border-[#E8DFCF] font-figtree overflow-hidden">
      {/* Top Hairline Gradient Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#f22924] to-transparent opacity-85"
        aria-hidden="true"
      />

      {/* Subtle Background Watermark Sketches matching Authentic Rishikesh Theme */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <div
          className="absolute -left-12 bottom-0 w-80 h-80 opacity-[0.035] bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url('/images/icons/siddhant-mandala-left.svg')`,
          }}
        />
        <div
          className="absolute -right-12 bottom-0 w-96 h-96 opacity-[0.035] bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url('/images/icons/siddhant-himalaya-right.svg')`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. MAIN 4-COLUMN OFFICIAL INSTITUTIONAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#E8DFCF]">
          {/* Column 1: Institution Identity & Accreditations (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-4 group">
                <Image
                  src="/logo/siddhant-logo.svg"
                  alt="Siddhant School of Yoga"
                  width={280}
                  height={60}
                  className="h-12 sm:h-13 w-auto object-contain transition-transform group-hover:scale-[1.01]"
                />
              </Link>

              <p className="font-belleza font-semibold text-base sm:text-lg text-[#f22924] mb-3 tracking-wide">
                Living Vedic Tradition • Authentic Pranayama • Transformative
                Sadhana
              </p>

              <p className="text-xs sm:text-[13px] text-[#55564c] leading-relaxed mb-6 font-normal">
                Officially accredited Registered Yoga School (RYS 200, 300, 500)
                by Yoga Alliance USA. Based on the sacred banks of the Ganges in
                Rishikesh, committed to genuine lineage teachings, classical
                breath science, and lifelong yogic self-discipline.
              </p>

              {/* Official Yoga Alliance Accreditation Badges */}
              <div className="mb-6">
                <span className="text-[11px] font-bold text-[#77786e] uppercase tracking-wider block mb-2.5 font-figtree">
                  Yoga Alliance USA Accreditations
                </span>
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center border border-[#E8DFCF] shadow-xs hover:border-[#f22924] hover:shadow-md transition-all duration-300"
                    title="Yoga Alliance RYS 200 Certified School"
                  >
                    <Image
                      src="/logo/rys-200.webp"
                      alt="Yoga Alliance RYS 200"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center border border-[#E8DFCF] shadow-xs hover:border-[#f22924] hover:shadow-md transition-all duration-300"
                    title="Yoga Alliance RYS 300 Certified School"
                  >
                    <Image
                      src="/logo/rys-300.webp"
                      alt="Yoga Alliance RYS 300"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center border border-[#E8DFCF] shadow-xs hover:border-[#f22924] hover:shadow-md transition-all duration-300"
                    title="Yoga Alliance RYS 500 Certified School"
                  >
                    <Image
                      src="/logo/rys-500.webp"
                      alt="Yoga Alliance RYS 500"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center border border-[#E8DFCF] shadow-xs hover:border-[#f22924] hover:shadow-md transition-all duration-300"
                    title="Official Yoga Alliance Registry"
                  >
                    <Image
                      src="/logo/yoga-alliance.webp"
                      alt="Yoga Alliance Registry"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Official Social Channels */}
            <div>
              <span className="text-[11px] font-bold text-[#77786e] uppercase tracking-wider block mb-2 font-figtree">
                Connect With Our Ashram
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-[#E8DFCF] hover:bg-[#f22924] hover:border-[#f22924] text-stone-700 hover:text-white flex items-center justify-center shadow-xs transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-3.5 h-3.5" />
                </a>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-[#E8DFCF] hover:bg-[#f22924] hover:border-[#f22924] text-stone-700 hover:text-white flex items-center justify-center shadow-xs transition-all duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href={site.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-[#E8DFCF] hover:bg-[#f22924] hover:border-[#f22924] text-stone-700 hover:text-white flex items-center justify-center shadow-xs transition-all duration-300"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-3.5 h-3.5" />
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-[#E8DFCF] hover:bg-[#25D366] hover:border-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center shadow-xs transition-all duration-300"
                  aria-label="WhatsApp Helpline"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Teacher Trainings (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-[#1e2422] mb-5 font-belleza flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f22924]" />
              Yoga Teacher Trainings
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-[#55564c] font-figtree">
              <li>
                <Link
                  href="#courses"
                  className="group flex items-center justify-between py-0.5 hover:text-[#f22924] transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    200-Hour Yoga TTC
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#f22924]/10 text-[#f22924] border border-[#f22924]/20">
                    Flagship
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="group flex items-center justify-between py-0.5 hover:text-[#f22924] transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    300-Hour Advanced TTC
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">
                    RYT 300
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="group flex items-center justify-between py-0.5 hover:text-[#f22924] transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    500-Hour Master Training
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">
                    Complete
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#courses"
                  className="group flex items-center justify-between py-0.5 hover:text-[#f22924] transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    100-Hour Foundation TTC
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">
                    Sadhana
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#kundalini"
                  className="group flex items-center justify-between py-0.5 hover:text-[#f22924] transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Kundalini Yoga TTC
                  </span>
                  <span className="text-[10px] text-[#f22924] font-medium">
                    Chakra Science
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#pranayama"
                  className="group flex items-center justify-between py-0.5 hover:text-[#f22924] transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Pranayama &amp; Breathwork
                  </span>
                  <span className="text-[10px] text-[#f22924] font-medium">
                    Exclusive
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#comparison"
                  className="group inline-flex items-center gap-1.5 py-1 text-[#1e2422] hover:text-[#f22924] font-medium transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Compare All Courses &amp; Inclusions
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f22924]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Retreats & Ashram Living (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-[#1e2422] mb-5 font-belleza flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f22924]" />
              Retreats &amp; Life
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#55564c] font-figtree">
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 inline-block transition-transform"
                >
                  Beginners Retreat
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 inline-block transition-transform"
                >
                  Kundalini Awakening
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 inline-block transition-transform"
                >
                  Pranayama Sadhana
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 inline-block transition-transform"
                >
                  Vipassana Meditation
                </Link>
              </li>
              <li>
                <Link
                  href="#retreats"
                  className="hover:text-[#f22924] hover:translate-x-1 inline-block transition-transform"
                >
                  Ayurvedic Wellness
                </Link>
              </li>
              <li>
                <Link
                  href="#residential"
                  className="hover:text-[#f22924] hover:translate-x-1 inline-block transition-transform"
                >
                  Daily Ashram Routine
                </Link>
              </li>
              <li>
                <Link
                  href="#residential"
                  className="hover:text-[#f22924] hover:translate-x-1 inline-block transition-transform"
                >
                  Sattvic Food &amp; Stay
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Ashram Concierge Office (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white/95 backdrop-blur-xs border border-[#E8DFCF] rounded-2xl p-5 shadow-[0_4px_18px_rgba(0,0,0,0.03)] hover:border-[#F5B860]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#1e2422] font-belleza">
                  Ashram Concierge
                </h4>
                {/* Live Admissions Pulsing Indicator */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  2026 Batches Open
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#55564c] font-figtree mb-5">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#f22924] shrink-0 mt-0.5" />
                  <a
                    href={site.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f22924] transition-colors leading-relaxed"
                  >
                    Plot 281, Nirmal Block-B, Veerbhadra, Rishikesh, Uttarakhand
                    249202, India
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#f22924] shrink-0" />
                  <a
                    href={`tel:${site.phone}`}
                    className="hover:text-[#f22924] font-medium text-[#1e2422] transition-colors"
                  >
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#f22924] shrink-0" />
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-[#f22924] transition-colors break-all"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#F5B860] shrink-0" />
                  <span>06:00 AM – 09:30 PM IST (Daily)</span>
                </li>
              </ul>

              {/* Instant WhatsApp Pill CTA */}
              <a
                href={whatsappLink(
                  "Namaste Siddhant School of Yoga, I would like to check course batch dates and room availability.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all duration-300 hover:shadow-md"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. SLEEK LEGAL & ACCREDITATION SUB-FOOTER */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#77786e] font-figtree">
          {/* Copyright & Official Accreditation */}
          <div className="text-center lg:text-left">
            <p>
              &copy; 2026 Siddhant School of Yoga, Rishikesh, India. All Rights
              Reserved.
            </p>
            <p className="text-[11px] text-[#77786e] mt-0.5">
              Accredited RYS 200, RYS 300, and RYS 500 by Yoga Alliance USA.
            </p>
          </div>

          {/* Institutional Values Badge */}
          <div className="text-center text-[11px] text-[#77786e] flex items-center gap-2">
            <span>Living Lineage</span>
            <span>•</span>
            <span>Ethical Yogic Practice</span>
            <span>•</span>
            <span>Non-Commercial Atmosphere</span>
          </div>

          {/* Quick Navigation & Smooth Back to Top */}
          <div className="flex items-center gap-4 text-[12px] font-medium text-[#55564c]">
            <Link
              href="#about"
              className="hover:text-[#f22924] transition-colors"
            >
              About
            </Link>
            <span className="text-stone-300">•</span>
            <Link
              href="#courses"
              className="hover:text-[#f22924] transition-colors"
            >
              Courses
            </Link>
            <span className="text-stone-300">•</span>
            <Link
              href="#teachers"
              className="hover:text-[#f22924] transition-colors"
            >
              Teachers
            </Link>
            <span className="text-stone-300">•</span>
            <Link
              href="#faq"
              className="hover:text-[#f22924] transition-colors"
            >
              FAQ
            </Link>
            <span className="text-stone-300">•</span>
            <Link
              href="#contact"
              className="hover:text-[#f22924] transition-colors"
            >
              Contact
            </Link>

            {/* Back to Top Smooth Button */}
            <button
              onClick={scrollToTop}
              className="ml-2 w-8 h-8 rounded-full bg-white border border-[#E8DFCF] hover:border-[#f22924] hover:bg-[#f22924] text-[#55564c] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs group cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

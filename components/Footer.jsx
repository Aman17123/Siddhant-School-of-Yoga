"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowUp,
  Flower2,
  ChevronRight,
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
    <footer className="relative bg-gradient-to-b from-[#1c3b2b] via-[#142b1e] to-[#0c5747] text-white font-figtree border-t border-white/10 overflow-hidden">
      {/* Subtle yoga icon watermark */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none opacity-[0.07]"
        aria-hidden="true"
      >
        <Flower2 className="absolute top-10 right-[8%] w-24 h-24 sm:w-32 sm:h-32 text-white rotate-12" />
      </div>

      {/* 2. MAIN 4-COLUMN FOOTER NAVIGATION */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-14 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Column 1: Brand & Socials */}
          <div className="sm:col-span-2 lg:col-span-1 pr-2">
            <Link href="/" className="inline-block mb-3.5">
              <Image
                src="/images/siddhant-yoga-whote-logo.png"
                alt="Siddhant School of Yoga"
                width={200}
                height={58}
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-white/75 leading-relaxed font-normal mb-5">
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

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/25 text-[11px] font-semibold text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fdfbf7] animate-pulse" />
              <span>Yoga Alliance RYS Certified</span>
            </div>
          </div>

          {/* Column 2: TEACHER TRAINING */}
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-[0.14em] text-[#f4efe6] mb-5 pb-2.5 border-b border-white/20 font-figtree">
              Teacher Training
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-sm font-medium text-white/80">
              <li>
                <Link
                  href="/online-200-hour-yoga-teacher-training-in-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Online 200-Hour Yoga TTC</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/100-hour-yoga-teacher-training-in-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>100-Hour Yoga TTC</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/200-hour-yoga-teacher-training-in-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>200-Hour Yoga TTC (Most Popular)</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/300-hour-yoga-teacher-training-in-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>300-Hour Advanced TTC</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/100-hours-kundalini-yoga-teacher-training-in-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>100-Hour Kundalini TTC</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/200-hours-kundalini-yoga-teacher-training-in-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>200-Hour Kundalini TTC</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/300-hours-kundalini-yoga-teacher-training-in-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>300-Hour Kundalini TTC</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/yoga-meditation-retreat-in-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Yoga &amp; Meditation Retreat</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/kundalini-retreat-in-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Kundalini Retreat</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/detox-retreat-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Detox Retreat</span>
                  </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: QUICK LINKS */}
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-[0.14em] text-[#f4efe6] mb-5 pb-2.5 border-b border-white/20 font-figtree">
              Quick Links
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-sm font-medium text-white/80">
              <li>
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Home</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>About Siddhant School</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/yogi-siddhant-rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>About Acharya Siddhant Ji</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/ideals-of-siddhant-school-of-yoga"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Our Ideals &amp; Masters</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/teacher"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Our Yoga Teachers</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/food-accommodation"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Food &amp; Accommodation</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/rishikesh-india"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>About Rishikesh</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Gallery</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Student Testimonials</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Contact Us</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="group inline-flex items-center gap-2 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f4efe6] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>Frequently Asked Questions</span>
                  </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: CONTACT US */}
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-[0.14em] text-[#f4efe6] mb-5 pb-2.5 border-b border-white/20 font-figtree">
              Contact &amp; Location
            </h4>
            <div className="space-y-3.5 text-sm font-medium text-white/80">
              <div className="flex items-start gap-2.5 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#f4efe6] shrink-0 mt-1" />
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Behind Shiva Temple, Nirmal Block-B, Veerbhadra, Rishikesh,
                  Uttarakhand 249202, India
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f4efe6] shrink-0" />
                <a
                  href={`tel:${site.phone}`}
                  className="hover:text-white font-medium transition-colors"
                >
                  {site.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f4efe6] shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-white transition-colors break-all"
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fdfbf7] hover:bg-[#f4efe6] text-[#1c3b2b] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs hover:shadow-md"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUB-FOOTER BOTTOM STRIP */}
      <div className="relative z-10 border-t border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-figtree text-white/60">
          {/* Left: Copyright */}
          <div>
            <span>SIDDHANT SCHOOL OF YOGA • &copy; 2026</span>
          </div>

          {/* Center: Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-medium tracking-wider uppercase text-white/60">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/payment" className="hover:text-white transition-colors">
              Payment
            </Link>
            <a
              href="/sitemap.xml"
              className="hover:text-white transition-colors"
            >
              Sitemap
            </a>
            <a
              href="/llms.txt"
              className="hover:text-white transition-colors"
            >
              LLMs.txt
            </a>
          </div>

          {/* Right: Back to Top */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. CREDIT STRIP */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 text-center text-[11px] font-figtree text-white/50">
          <span>All Rights Reserved | Designed by </span>
          <a
            href="https://www.devbhoomiinfotech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors font-medium"
          >
            Devbhoomi Infotech
          </a>
        </div>
      </div>
    </footer>
  );
}

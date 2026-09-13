import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, Sparkles, Award } from 'lucide-react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaTwitter, 
  FaWhatsapp 
} from 'react-icons/fa';
import { site, whatsappLink } from '@/data/siteData';

export default function Footer() {
  return (
    <footer className="bg-[#181716] text-white/80 pt-16 lg:pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-5 group">
              <Image
                src="/logo/siddhant-logo-white.svg"
                alt="Siddhant School of Yoga"
                width={260}
                height={55}
                className="h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </Link>

            <p className="text-xs text-stone-300 leading-relaxed mb-6">
              Officially registered Yoga School in Rishikesh approved by Yoga Alliance USA (RYS 200, 300, 500). Committed to authentic Guru-Shishya tradition, world-first Pranayama education, and holistic human growth.
            </p>

            {/* Certification Badges in Footer */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 p-1 flex items-center justify-center border border-white/20">
                <Image
                  src="/logo/rys-200.svg"
                  alt="RYS 200"
                  width={34}
                  height={34}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 p-1 flex items-center justify-center border border-white/20">
                <Image
                  src="/logo/rys-300.svg"
                  alt="RYS 300"
                  width={34}
                  height={34}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 p-1 flex items-center justify-center border border-white/20">
                <Image
                  src="/logo/rys-500.svg"
                  alt="RYS 500"
                  width={34}
                  height={34}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-terracotta text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-terracotta text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-terracotta text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-3.5 h-3.5" />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Teacher Trainings (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-marigold mb-5 font-serif">
              Teacher Training
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <Link href="#courses" className="hover:text-white transition-colors">
                  100-Hour Yoga TTC (Foundations)
                </Link>
              </li>
              <li>
                <Link href="#courses" className="hover:text-white transition-colors">
                  200-Hour Yoga TTC (Yoga Alliance RYT)
                </Link>
              </li>
              <li>
                <Link href="#courses" className="hover:text-white transition-colors">
                  300-Hour Advanced Yoga TTC
                </Link>
              </li>
              <li>
                <Link href="#courses" className="hover:text-white transition-colors">
                  500-Hour Master Yoga Teacher Training
                </Link>
              </li>
              <li>
                <Link href="#kundalini" className="hover:text-white transition-colors">
                  Kundalini Yoga Teacher Training
                </Link>
              </li>
              <li>
                <Link href="#comparison" className="hover:text-white transition-colors">
                  Course Comparison Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Retreats & School (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-marigold mb-5 font-serif">
              Yoga Retreats
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <Link href="#retreats" className="hover:text-white transition-colors">
                  Yoga for Beginners
                </Link>
              </li>
              <li>
                <Link href="#retreats" className="hover:text-white transition-colors">
                  Yoga &amp; Meditation Retreat
                </Link>
              </li>
              <li>
                <Link href="#retreats" className="hover:text-white transition-colors">
                  Kundalini Awakening Retreat
                </Link>
              </li>
              <li>
                <Link href="#retreats" className="hover:text-white transition-colors">
                  Pranayama &amp; Breathwork
                </Link>
              </li>
              <li>
                <Link href="#retreats" className="hover:text-white transition-colors">
                  Vipassana Silent Meditation
                </Link>
              </li>
              <li>
                <Link href="#retreats" className="hover:text-white transition-colors">
                  Yogic Detox &amp; Ayurveda
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-marigold mb-5 font-serif">
              Ashram Contact
            </h4>
            <ul className="space-y-3.5 text-xs text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-terracotta shrink-0" />
                <a href={`tel:${site.phone}`} className="hover:text-white transition-colors">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-marigold shrink-0" />
                <span>Mon – Sun: 05:00 AM – 09:00 PM IST</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>
            &copy; 2026 Siddhant School of Yoga. All Rights Reserved. Approved by Yoga Alliance USA.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#about" className="hover:text-white transition-colors">About Us</Link>
            <span>•</span>
            <Link href="#courses" className="hover:text-white transition-colors">Courses</Link>
            <span>•</span>
            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
            <span>•</span>
            <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}


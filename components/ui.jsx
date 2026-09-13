import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Phone, 
  Calendar,
  Activity,
  BarChart2
} from 'lucide-react';
import { whatsappLink } from '@/data/siteData';

export function Container({ children, className = '' }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-terracotta/10 text-terracotta border border-terracotta/25 mb-3 ${className}`}>
      <Sparkles className="w-3.5 h-3.5 text-terracotta" />
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, text, center = false, className = '' }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#1F1E1D] leading-tight mb-4">
          {title}
        </h2>
      )}
      {text && (
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          {text}
        </p>
      )}
    </div>
  );
}

export function ButtonLink({ href, children, variant = 'primary', className = '', target, rel }) {
  const base = "inline-flex items-center justify-center gap-2 font-medium text-sm sm:text-base px-6 py-3 rounded-full transition-all duration-300 transform active:scale-95 shadow-sm";
  
  let styles = "bg-terracotta hover:bg-coral text-white hover:shadow-md hover:-translate-y-0.5";
  if (variant === 'secondary') {
    styles = "border-2 border-terracotta text-terracotta hover:bg-[#FAF6EE] font-semibold";
  } else if (variant === 'outline') {
    styles = "border border-terracotta text-terracotta hover:bg-terracotta hover:text-white";
  } else if (variant === 'gold') {
    styles = "bg-gradient-to-r from-marigold to-coral text-white font-semibold hover:shadow-md hover:-translate-y-0.5";
  } else if (variant === 'white') {
    styles = "bg-white text-terracotta hover:bg-[#FAF6EE] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5";
  }

  return (
    <Link href={href} target={target} rel={rel} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function ProgramCard({ program }) {
  // Determine circular badge asset based on program id or hours
  let rysBadge = null;
  if (program.id.includes('200')) {
    rysBadge = '/logo/rys-200.svg';
  } else if (program.id.includes('300')) {
    rysBadge = '/logo/rys-300.svg';
  } else if (program.id.includes('500')) {
    rysBadge = '/logo/rys-500.svg';
  }
  // 100H gets no circular seal badge as per Image 4 reference

  // Format Level
  let levelText = program.level;
  if (program.id.includes('100')) levelText = "Beginner";
  else if (program.id.includes('200')) levelText = "All Levels";
  else if (program.id.includes('300')) levelText = "Intermediate";
  else if (program.id.includes('500')) levelText = "Advanced";

  return (
    <div className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${
      program.featured ? 'border-terracotta ring-2 ring-terracotta/20 shadow-md' : 'border-[#EBE5D8]'
    }`}>
      
      {/* Overlapping circular certification badge on top-right */}
      {rysBadge && (
        <div className="absolute top-3 right-3 z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full shadow-lg bg-white/95 p-1 border border-[#F5B860]/40 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={rysBadge}
            alt="Yoga Alliance Certification Seal"
            width={72}
            height={72}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Full-width photo at top with title overlaid at bottom of photo */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        
        {/* Title overlaid at bottom of photo */}
        <div className="absolute bottom-3 left-4 right-4 text-white z-10">
          <h3 className="text-lg sm:text-xl font-bold font-serif leading-tight drop-shadow-sm">
            {program.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-5 sm:p-6">
        {/* Two info pills: Level & Duration */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-semibold mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] text-stone-700 border border-[#FBDD8E]/70">
            <Activity className="w-3.5 h-3.5 text-terracotta" />
            <span>{levelText}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] text-stone-700 border border-[#FBDD8E]/70">
            <Clock className="w-3.5 h-3.5 text-[#E68A2E]" />
            <span>{program.duration}</span>
          </span>
        </div>

        {/* Colored divider line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-marigold via-coral to-transparent my-2" />

        {/* 2–3 line course description */}
        <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
          {program.description}
        </p>

        {/* YOGA STYLE row */}
        <div className="mt-auto pt-3 border-t border-stone-100 mb-4">
          <div className="flex items-start gap-2 text-xs">
            <Sparkles className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-stone-400 block mb-0.5">
                YOGA STYLE
              </span>
              <span className="text-xs font-semibold text-terracotta hover:text-coral transition-colors leading-snug block">
                Multi-Style (Hatha, Ashtanga, Vinyasa, Yin, Acro &amp; Kundalini)
              </span>
            </div>
          </div>
        </div>

        {/* Two Action Buttons: Enquire & Apply Now */}
        <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2.5">
          <a
            href={whatsappLink(`Hello, I would like to enquire about the ${program.title} at Siddhant School of Yoga in Rishikesh.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center py-2.5 px-2 rounded-full text-xs font-bold border border-terracotta text-terracotta hover:bg-[#FAF6EE] transition-colors"
          >
            Enquire
          </a>
          <a
            href="#contact"
            className="text-center py-2.5 px-2 rounded-full text-xs font-bold bg-terracotta hover:bg-coral text-white shadow-xs hover:shadow-md transition-all"
          >
            Apply Now
          </a>
        </div>

      </div>
    </div>
  );
}

export function RetreatCard({ retreat }) {
  return (
    <div className="flex flex-col bg-white rounded-3xl overflow-hidden border border-[#EBE5D8] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative h-52 w-full overflow-hidden bg-[#FAF6EE]">
        <Image
          src={retreat.image}
          alt={retreat.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-terracotta text-xs font-bold px-3 py-1 rounded-full shadow-xs border border-terracotta/20">
          {retreat.duration}
        </span>
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-lg font-bold font-serif leading-snug drop-shadow-sm">
            {retreat.title}
          </h3>
          <span className="text-xs text-[#FBDD8E] font-serif italic block mt-0.5">
            {retreat.subtitle}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs text-stone-600 mb-4 leading-relaxed">
          {retreat.tagline}
        </p>
        <ul className="space-y-1.5 mb-5 flex-grow">
          {retreat.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-stone-700">
              <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="pt-3 border-t border-[#EBE5D8] flex items-center justify-between">
          <span className="text-sm font-bold text-terracotta font-serif">{retreat.price}</span>
          <Link
            href={whatsappLink(`Hi, I'm interested in the ${retreat.title} at Siddhant School of Yoga.`)}
            target="_blank"
            className="text-xs font-semibold text-terracotta hover:text-coral flex items-center gap-1 group/btn"
          >
            <span>Book Dates</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}


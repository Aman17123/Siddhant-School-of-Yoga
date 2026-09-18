import Link from "next/link";
import Image from "next/image";
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
  BarChart2,
} from "lucide-react";
import { whatsappLink } from "@/data/siteData";

export function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className = "" }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-figtree font-semibold tracking-[0.2em] uppercase bg-[#def4ee4d] text-[#158b72] border border-[#158b72]/40 shadow-xs mb-3 ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-[#158b72]" />
      <span>{children}</span>
    </div>
  );
}

export function Kicker({ children, className = "" }) {
  return (
    <span
      className={`block text-[1rem] font-figtree font-semibold tracking-[0.08em] text-[#158b72] mb-1.5 ${className}`}
    >
      {children}
    </span>
  );
}

// Small centered "live" accent line + pulsing dot shown under a heading.
// Always visible for fully-centered headings; on headings that stay
// left/right-aligned at desktop (center=false), it only shows on mobile
// where the heading itself is centered.
export function ChakraDot({ className = "", color = "#158b72" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`w-3 h-3 shrink-0 ${className}`}
      fill="none"
    >
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1" opacity="0.9" />
      <circle cx="10" cy="10" r="2" fill={color} />
      {[0, 45, 90, 135].map((a) => (
        <line
          key={`t-${a}`}
          x1="10"
          y1="2"
          x2="10"
          y2="5"
          stroke={color}
          strokeWidth="1"
          transform={`rotate(${a} 10 10)`}
          opacity="0.85"
        />
      ))}
      {[0, 45, 90, 135].map((a) => (
        <line
          key={`b-${a}`}
          x1="10"
          y1="18"
          x2="10"
          y2="15"
          stroke={color}
          strokeWidth="1"
          transform={`rotate(${a} 10 10)`}
          opacity="0.85"
        />
      ))}
    </svg>
  );
}

export function HeadingDivider({ center = true, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 mt-2.5 mb-1 ${
        center ? "" : "lg:hidden"
      } ${className}`}
    >
      <span className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-[#158b72]/70" />
      <ChakraDot />
      <span className="h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-[#158b72]/70" />
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  description,
  center = false,
  className = "mb-8 lg:mb-10",
}) {
  const desc = text || description;
  return (
    <div
      className={`max-w-3xl ${
        center
          ? "mx-auto text-center"
          : "text-center lg:text-left mx-auto lg:mx-0"
      } ${className}`}
    >
      {eyebrow && <Kicker>{eyebrow}</Kicker>}
      {title && (
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2 drop-shadow-2xs">
          {title}
        </h2>
      )}
      <HeadingDivider center={center} />
      {desc && (
        <p
          className={`text-sm sm:text-[15px] font-figtree text-stone-600 leading-relaxed max-w-2xl ${
            center ? "mx-auto" : "mx-auto lg:mx-0"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  target,
  rel,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-figtree font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-300 transform active:scale-95 shadow-sm";

  let styles =
    "bg-[#158b72] hover:bg-[#0f6b57] text-white hover:shadow-md hover:-translate-y-0.5 border border-[#158b72]";
  if (variant === "secondary" || variant === "outline") {
    styles =
      "bg-[#def4ee4d] border-2 border-[#158b72] text-[#158b72] hover:bg-[#158b72] hover:text-white font-semibold";
  } else if (variant === "white") {
    styles =
      "bg-white text-[#158b72] hover:bg-[#def4ee4d] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5";
  } else if (variant === "gold") {
    styles =
      "bg-[#158b72] hover:bg-[#0f6b57] text-white font-semibold hover:shadow-md hover:-translate-y-0.5";
  } else if (variant === "green" || variant === "vedic") {
    styles =
      "bg-[#158b72] hover:bg-[#0f6b57] text-white font-semibold hover:shadow-md hover:-translate-y-0.5 border border-[#158b72]";
  }

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

export function ProgramCard({ program }) {
  // Determine circular badge asset based on program id or hours
  let rysBadge = null;
  if (program.id.includes("100")) {
    rysBadge = "/logo/yoga-alliance.webp";
  } else if (program.id.includes("200")) {
    rysBadge = "/logo/rys-200.webp";
  } else if (program.id.includes("300")) {
    rysBadge = "/logo/rys-300.webp";
  } else if (program.id.includes("500")) {
    rysBadge = "/logo/rys-500.webp";
  }

  // Format Level
  let levelText = program.level;
  if (program.id.includes("100")) levelText = "Beginner";
  else if (program.id.includes("200")) levelText = "All Levels";
  else if (program.id.includes("300")) levelText = "Intermediate";
  else if (program.id.includes("500")) levelText = "Advanced";

  return (
    <div
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 ${
        program.featured
          ? "border-[#158b72] ring-2 ring-[#158b72]/25 shadow-lg"
          : "border-[#c8ece2]"
      }`}
    >
      {/* Overlapping circular certification badge on top-right */}
      {rysBadge && (
        <div className="absolute top-3 right-3 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg bg-white/95 p-1 border border-[#158b72]/50 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={rysBadge}
            alt="Yoga Alliance Certification Seal"
            width={64}
            height={64}
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
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Title overlaid at bottom of photo */}
        <div className="absolute bottom-3 left-4 right-4 text-white z-10">
          <h3 className="text-xl sm:text-2xl font-belleza font-normal leading-tight tracking-wide drop-shadow-md">
            {["100-hour-yoga-ttc", "200-hour-yoga-ttc"].includes(program.id) ? (
              <Link href={`/${program.slug}`} className="hover:text-[#def4ee] transition-colors">
                {program.title}
              </Link>
            ) : (
              program.title
            )}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-5 sm:p-6 font-figtree">
        {/* Two info pills: Level & Duration */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-semibold mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#def4ee4d] text-stone-700 border border-[#3aab92]/70">
            <Activity className="w-3.5 h-3.5 text-[#158b72]" />
            <span>{levelText}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#def4ee4d] text-stone-700 border border-[#3aab92]/70">
            <Clock className="w-3.5 h-3.5 text-[#0f6b57]" />
            <span>{program.duration}</span>
          </span>
        </div>

        {/* Colored divider line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#158b72] via-[#158b72] to-transparent my-2" />

        {/* 2–3 line course description */}
        <p className="text-[15px] text-stone-600 line-clamp-4 leading-relaxed mb-4">
          {program.description}
        </p>

        {/* Two Action Buttons: Explore More & Enroll Now */}
        <div className="mt-auto pt-3 border-t border-stone-100 grid grid-cols-2 gap-2.5">
          {["100-hour-yoga-ttc", "200-hour-yoga-ttc"].includes(program.id) ? (
            <Link
              href={`/${program.slug}`}
              className="inline-flex items-center justify-center text-center py-3 px-2 rounded-full text-xs font-semibold bg-[#def4ee4d] border-2 border-[#158b72] text-[#158b72] hover:bg-[#158b72] hover:text-white transition-all"
            >
              Explore More
            </Link>
          ) : (
            <a
              href={whatsappLink(
                `Namaste! I would like to explore the ${program.title} at Siddhant School of Yoga in Rishikesh.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-center py-3 px-2 rounded-full text-xs font-semibold bg-[#def4ee4d] border-2 border-[#158b72] text-[#158b72] hover:bg-[#158b72] hover:text-white transition-all"
            >
              Explore More
            </a>
          )}
          <a
            href="#contact"
            className="inline-flex items-center justify-center text-center py-3 px-2 rounded-full text-xs font-semibold bg-[#158b72] hover:bg-[#0f6b57] text-white shadow-xs hover:shadow-md transition-all"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </div>
  );
}

export function RetreatCard({ retreat }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-[#c8ece2] shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group font-figtree h-full">
      {/* Photo with duration pill and overlaid title */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100 shrink-0">
        <Image
          src={retreat.image}
          alt={retreat.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Duration badge */}
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#158b72] text-xs font-semibold border border-[#158b72]/40 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-[#0f6b57]" />
          <span>{retreat.duration}</span>
        </div>

        {/* Title overlaid */}
        <div className="absolute bottom-3 left-4 right-4 text-white z-10">
          <h3 className="text-xl sm:text-2xl font-belleza font-normal leading-tight tracking-wide drop-shadow-md line-clamp-1">
            {retreat.title}
          </h3>
        </div>
      </div>

      {/* Body with guaranteed alignment */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow font-figtree">
        {/* 3 Features with CheckCircle2 */}
        <ul className="space-y-2 mb-3 flex-grow">
          {retreat.features.slice(0, 3).map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-[1rem] text-stone-700"
            >
              <CheckCircle2 className="w-4 h-4 text-[#158b72] shrink-0" />
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>

        {/* Price & Included info */}
        <div className="mt-auto mb-2.5 pt-2.5 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block leading-tight">
              Starting Fees
            </span>
            <span className="text-base sm:text-lg font-bold text-[#158b72] font-figtree block leading-tight mt-0.5">
              {retreat.price}
            </span>
          </div>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 font-medium">
            Food &amp; Stay Included
          </span>
        </div>

        {/* Two Standard Action Buttons */}
        <div className="pt-2.5 border-t border-stone-100 grid grid-cols-2 gap-2.5">
          <a
            href={whatsappLink(
              `Namaste! I would like to enquire about the ${retreat.title} at Siddhant School of Yoga in Rishikesh.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-center py-3 px-2 rounded-full text-xs font-semibold bg-[#def4ee4d] border-2 border-[#158b72] text-[#158b72] hover:bg-[#158b72] hover:text-white transition-all"
          >
            Explore More
          </a>
          <a
            href={whatsappLink(
              `Namaste! I would like to book dates for the ${retreat.title} at Siddhant School of Yoga in Rishikesh.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-center py-3 px-2 rounded-full text-xs font-semibold bg-[#158b72] hover:bg-[#0f6b57] text-white shadow-xs hover:shadow-md transition-all"
          >
            Book Dates
          </a>
        </div>
      </div>
    </div>
  );
}

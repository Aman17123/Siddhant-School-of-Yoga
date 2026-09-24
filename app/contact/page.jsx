import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CtaBanner from "@/components/home/CtaBanner";
import { Container, Kicker, HeadingDivider } from "@/components/ui";
import { site, whatsappLink } from "@/data/siteData";

export const metadata = {
  title: "Contact Us | Siddhant School of Yoga, Rishikesh",
  description:
    "Get in touch with Siddhant School of Yoga in Rishikesh, India. Reach us by phone, WhatsApp or email, or send a message to plan your yoga teacher training or retreat.",
};

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook", href: site.socials.facebook, color: "#1877F2" },
  { icon: FaInstagram, label: "Instagram", href: site.socials.instagram, color: "#E1306C" },
  { icon: FaYoutube, label: "YouTube", href: site.socials.youtube, color: "#FF0000" },
  { icon: FaTwitter, label: "Twitter", href: site.socials.twitter, color: "#1DA1F2" },
];

const contactCards = [
  {
    icon: MapPin,
    title: "Our Address",
    lines: [site.address],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [site.phone],
    href: `tel:${site.phone}`,
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [site.email],
    href: `mailto:${site.email}`,
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Monday – Saturday", "8:00 AM – 7:00 PM IST"],
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        {/* Hero Banner */}
        <section className="relative min-h-fit sm:min-h-[500px] lg:h-[70vh] lg:max-h-[740px] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 pt-8 sm:pt-14 lg:pt-16 pb-20 sm:pb-28 lg:pb-36">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 max-w-xl text-left">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#142b1e]/80"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-[#1c3b2b] transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#142b1e]/50 shrink-0" />
                  <span className="text-[#142b1e] font-semibold">Contact Us</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                  <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                    Get In Touch
                  </span>
                  <span className="block text-2xl sm:text-3xl font-normal">
                    With Our Team
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#142b1e]/90 leading-relaxed max-w-md">
                  Questions about a course, a batch date, or your journey to Rishikesh? Reach out and our admissions team will get back to you personally.
                </p>
              </div>

              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/founder/acharya-siddhant-founder-with-students-rishikesh.webp"
                    alt="Acharya Siddhant with students at Siddhant School of Yoga in Rishikesh"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-14 sm:py-16 lg:py-20 border-b border-[#e3dac9]/70">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-12">
              <Kicker>Contact Details</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
                How to Reach Us
              </h2>
              <HeadingDivider />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {contactCards.map((card) => {
                const Icon = card.icon;
                const Wrapper = card.href ? "a" : "div";
                return (
                  <Wrapper
                    key={card.title}
                    {...(card.href ? { href: card.href } : {})}
                    className="p-6 rounded-2xl bg-[#fdfbf7] border border-[#e3dac9] shadow-xs hover:shadow-md transition-shadow text-center"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-belleza text-lg font-normal text-[#1e2422] tracking-wide mb-1.5">
                      {card.title}
                    </h3>
                    {card.lines.map((line) => (
                      <p key={line} className="text-sm text-stone-600 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </Wrapper>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Map + WhatsApp CTA */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left: Map */}
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-[16/11] rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                  <iframe
                    title="Siddhant School of Yoga location map"
                    src="https://maps.google.com/maps?q=Siddhant%20School%20of%20Yoga%20Rishikesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Right: WhatsApp CTA */}
              <div className="lg:col-span-5">
                <Kicker>Chat With Us</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  Prefer to Chat Directly?
                </h2>
                <HeadingDivider center={false} className="mb-4" />
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium mb-6">
                  Message us on WhatsApp for the fastest response — our admissions team typically replies within a few hours.
                </p>
                <a
                  href={whatsappLink(
                    "Namaste! I'd like to get in touch with Siddhant School of Yoga.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-[#1c3b2b] hover:bg-[#142b1e] text-white text-sm sm:text-base font-bold font-figtree px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Social Media */}
        <section className="py-14 sm:py-16 lg:py-20 border-b border-[#e3dac9]/70">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-12">
              <Kicker>Stay Connected</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
                Follow Us on Social Media
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium max-w-2xl mx-auto">
                Follow our journey, see daily life at the ashram, and catch new batch announcements first.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl mx-auto">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#fdfbf7] border border-[#e3dac9] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: social.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-belleza text-base font-normal text-[#1e2422] tracking-wide">
                      {social.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </Container>
        </section>

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, MessageCircle, Mail, MapPin, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Kicker, HeadingDivider, ButtonLink, ProgramCard } from "@/components/ui";
import { site, whatsappLink } from "@/data/siteData";
import { teacherTrainings } from "@/data/coursesData";

export const metadata = {
  title: "Book My Yoga | Enroll Now at Siddhant School of Yoga, Rishikesh",
  description:
    "Enroll in your Yoga Teacher Training or Retreat at Siddhant School of Yoga in Rishikesh, India. Simple, transparent booking — send an enquiry, confirm your seat, and begin your yoga journey.",
};

const bookingSteps = [
  { step: "1", title: "Choose Your Course", text: "Pick the TTC or retreat that matches your goals and available time." },
  { step: "2", title: "Send an Enquiry", text: "Reach out via WhatsApp, phone or the contact section below." },
  { step: "3", title: "Speak With Our Team", text: "We'll help you pick the right batch dates and room type." },
  { step: "4", title: "Confirm Your Seat", text: "Secure your spot with a simple registration and advance payment." },
  { step: "5", title: "Begin Your Journey", text: "Receive a pre-arrival guide and start your training in Rishikesh." },
];

const mainCourses = teacherTrainings.slice(0, 4);

export default function BookMyYogaPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#158b72]/30 selection:text-[#0f6b57]">
      <Navbar />

      <main className="flex-grow bg-white">
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
                  className="flex items-center justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#0f6b57]/80"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-[#158b72] transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0f6b57]/50 shrink-0" />
                  <span className="text-[#0f6b57] font-semibold">Book My Yoga</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                  <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                    Book My Yoga
                  </span>
                  <span className="block text-2xl sm:text-3xl font-normal">
                    in Rishikesh, India
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#0f6b57]/90 leading-relaxed max-w-md">
                  Ready to begin? Choose your course, send an enquiry, and our team will help you confirm your seat at Siddhant School of Yoga.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
                  <ButtonLink
                    href={whatsappLink(
                      "Namaste! I would like to enroll in a yoga course at Siddhant School of Yoga in Rishikesh. Please share the available batch dates.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enroll on WhatsApp
                  </ButtonLink>
                  <ButtonLink href="#courses" variant="outline">
                    Choose a Course
                  </ButtonLink>
                </div>
              </div>

              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/gallery_images/yoga-teacher-training-certificate-ceremony-siddhant-school-rishikesh.webp"
                    alt="Yoga teacher training graduates at Siddhant School of Yoga in Rishikesh"
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

        {/* How Booking Works */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Simple &amp; Transparent</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                How Booking Works
              </h2>
              <HeadingDivider />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {bookingSteps.map((s) => (
                <div key={s.step} className="text-center flex flex-col items-center">
                  <span className="w-11 h-11 rounded-full bg-[#158b72] text-white flex items-center justify-center font-belleza text-lg mb-2.5 shrink-0">
                    {s.step}
                  </span>
                  <h3 className="font-belleza text-base text-[#1e2422] mb-1">{s.title}</h3>
                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Choose Your Course */}
        <section id="courses" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-white border-b border-[#c8ece2]/70 font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Pick Your Path</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Choose Your Course
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                From a 100-hour foundation to the complete 500-hour master program, find the Yoga Alliance-registered course that fits your goals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {mainCourses.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry / Contact */}
        <section id="contact" className="scroll-mt-28 py-14 sm:py-16 lg:py-20 bg-[#def4ee4d] font-figtree">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
              <Kicker>Ready to Enroll?</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                Reach Out &amp; Confirm Your Seat
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Our team typically responds within a few hours and will help you pick the right batch dates and room type.
              </p>
            </div>

            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <a
                href={whatsappLink(
                  "Namaste! I would like to enroll in a yoga course at Siddhant School of Yoga in Rishikesh.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl border border-[#c8ece2] p-5 shadow-2xs hover:shadow-md hover:border-[#158b72] transition-all"
              >
                <span className="w-12 h-12 rounded-full bg-[#158b72]/10 text-[#158b72] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-belleza text-[#1e2422] text-base">WhatsApp Us</p>
                  <p className="text-xs text-stone-600">Fastest way to enroll</p>
                </div>
              </a>

              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 bg-white rounded-2xl border border-[#c8ece2] p-5 shadow-2xs hover:shadow-md hover:border-[#158b72] transition-all"
              >
                <span className="w-12 h-12 rounded-full bg-[#158b72]/10 text-[#158b72] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-belleza text-[#1e2422] text-base">Mail Us</p>
                  <p className="text-xs text-stone-600">{site.email}</p>
                </div>
              </a>

              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl border border-[#c8ece2] p-5 shadow-2xs hover:shadow-md hover:border-[#158b72] transition-all"
              >
                <span className="w-12 h-12 rounded-full bg-[#158b72]/10 text-[#158b72] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-belleza text-[#1e2422] text-base">Visit Us</p>
                  <p className="text-xs text-stone-600">Rishikesh, Uttarakhand</p>
                </div>
              </a>
            </div>

            <div className="max-w-3xl mx-auto text-center rounded-3xl bg-gradient-to-br from-[#158b72] via-[#0f6b57] to-[#0f6b57] px-6 sm:px-12 py-10 sm:py-14 shadow-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-belleza font-normal text-white leading-[1.2] mb-3">
                Your Yoga Journey Starts With One Message
              </h2>
              <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
                Seats are limited to keep our batches small and personal. Send your enquiry today to lock in your dates.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <ButtonLink
                  href={whatsappLink(
                    "Namaste! I would like to enroll in a yoga course at Siddhant School of Yoga in Rishikesh.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="white"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enroll on WhatsApp
                </ButtonLink>
                <ButtonLink href={`tel:${site.phoneFormatted}`} variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-[#158b72]">
                  <CheckCircle2 className="w-4 h-4" />
                  Call {site.phone}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

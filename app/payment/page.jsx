import { ShieldCheck, Building2, Smartphone, MessageCircle, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Container, Kicker, HeadingDivider, ButtonLink } from "@/components/ui";
import { site, whatsappLink } from "@/data/siteData";

export const metadata = {
  title: "Course Payment | Siddhant School of Yoga Rishikesh",
  description:
    "Secure your seat at Siddhant School of Yoga, Rishikesh. Review payment options and confirm your Yoga Teacher Training or Retreat booking directly with our admissions team.",
};

export default function PaymentPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#158b72]/30 selection:text-[#0f6b57]">
      <Navbar />

      <main className="flex-grow bg-[#def4ee4d]">
        <section className="py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-12">
              <Kicker>Secure Payment</Kicker>
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
                Confirm Your Course or Retreat Booking
              </h1>
              <HeadingDivider />
              <p className="text-sm sm:text-[15px] font-figtree text-stone-600 leading-relaxed max-w-2xl mx-auto">
                To keep every payment secure and accurate, our admissions team
                shares the correct payment details directly with you once
                your batch, course, and room type are confirmed. Reach out
                using any of the options below to proceed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              {/* Bank Transfer */}
              <div className="p-6 rounded-2xl bg-white border border-[#c8ece2] shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-[#158b72]/10 text-[#158b72] flex items-center justify-center mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-belleza text-lg font-normal text-[#1e2422] tracking-wide mb-1.5">
                  Bank Transfer / Wire
                </h3>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                  For international students, we share verified bank account
                  and SWIFT details by WhatsApp or email after your seat is
                  reserved — so you always pay against a confirmed booking.
                </p>
              </div>

              {/* UPI / Online */}
              <div className="p-6 rounded-2xl bg-white border border-[#c8ece2] shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-[#158b72]/10 text-[#158b72] flex items-center justify-center mb-3">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="font-belleza text-lg font-normal text-[#1e2422] tracking-wide mb-1.5">
                  UPI / Online Payment
                </h3>
                <p className="text-[15px] text-stone-600 leading-relaxed">
                  Students in India can pay by UPI or a secure payment link.
                  Message us your course and batch dates to receive the
                  correct payment link instantly.
                </p>
              </div>
            </div>

            {/* Trust note */}
            <div className="max-w-3xl mx-auto flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-[#158b72]/5 border border-[#158b72]/20 mb-12">
              <ShieldCheck className="w-5 h-5 text-[#158b72] shrink-0 mt-0.5" />
              <p className="text-[13px] sm:text-sm text-stone-700 leading-relaxed">
                For your safety, Siddhant School of Yoga never asks for
                payment before your course dates, room type, and total fee
                are confirmed in writing. Always verify payment details
                directly with our official WhatsApp or email before sending
                any funds.
              </p>
            </div>

            {/* Contact CTAs */}
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-belleza text-xl sm:text-2xl font-normal text-[#1e2422] tracking-wide mb-5">
                Ready to Secure Your Seat?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <a
                  href={whatsappLink(
                    "Namaste! I would like to confirm my course/retreat booking and receive payment details.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#158b72] hover:bg-[#0f6b57] text-white text-sm sm:text-base font-bold font-figtree px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white border-2 border-[#158b72] text-[#158b72] hover:bg-[#158b72] hover:text-white text-sm sm:text-base font-bold font-figtree px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white border-2 border-[#158b72] text-[#158b72] hover:bg-[#158b72] hover:text-white text-sm sm:text-base font-bold font-figtree px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call {site.phone}</span>
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

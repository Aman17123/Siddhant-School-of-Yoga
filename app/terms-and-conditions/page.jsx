import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home as HomeIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Container } from "@/components/ui";
import { site } from "@/data/siteData";

export const metadata = {
  title: "Terms & Conditions | Siddhant School of Yoga, Rishikesh",
  description:
    "The terms and conditions that apply when you use the Siddhant School of Yoga website or register for a course or retreat in Rishikesh, India.",
};

const sections = [
  {
    title: "1. Introduction",
    body: `Welcome to ${site.url}. By accessing this website or registering for any course or retreat with Siddhant School of Yoga, you agree to be bound by the following Terms & Conditions. Please read them carefully before submitting a registration.`,
  },
  {
    title: "2. Course & Retreat Registration",
    list: [
      "A registration deposit is required to secure your seat on any Teacher Training course or Retreat.",
      "Your seat is confirmed only after the registration deposit has been received.",
      "Course dates, syllabus and daily schedules are indicative and may be adjusted by the school for operational or weather-related reasons, without affecting the overall course content or duration.",
    ],
  },
  {
    title: "3. Cancellations, Postponement & Refunds",
    list: [
      "The registration deposit is non-refundable under normal circumstances.",
      "In a genuine emergency, you may postpone your enrollment to another scheduled batch within the same year by emailing us the reason for postponement.",
      "Cancellations are accepted by email at no extra charge, but the registration deposit will not be refunded.",
    ],
  },
  {
    title: "4. Eligibility & Student Conduct",
    list: [
      "Students must come with the right attitude, be in good physical health, keep an open mind and maintain full attendance.",
      "A vegetarian diet is required during the course, and alcohol, drugs and smoking are strictly prohibited on the premises.",
      "Students should have a basic understanding of English, be between 18–60 years of age, and should not have undergone surgery in the past year.",
      "Siddhant School of Yoga reserves the right to ask a student to leave the course, without refund, if their conduct disrupts the learning environment of other students.",
    ],
  },
  {
    title: "5. Health & Safety",
    body: "Yoga, pranayama and meditation are physical and mental practices that carry inherent risks. Students are expected to inform their teacher of any medical condition, injury or pregnancy before joining a class. Siddhant School of Yoga is not liable for any injury, illness or loss arising from a student's voluntary participation in classes, excursions or activities offered during a course or retreat.",
  },
  {
    title: "6. Certification",
    body: "On successful completion of a Yoga Teacher Training course, students receive a certificate from Siddhant School of Yoga. Where applicable, our 200, 300 and 500-hour programs carry Yoga Alliance USA (RYS) registration; our shorter retreats and the 100-hour Kundalini program issue a school completion certificate only, and are not registered with Yoga Alliance.",
  },
  {
    title: "7. Payments",
    body: "All advance and balance payments are processed through our published payment page or bank transfer details shared directly by our admissions team. Course fees, once paid in full, are non-refundable except as described under Cancellations, Postponement & Refunds above.",
  },
  {
    title: "8. Intellectual Property",
    body: "All content on this website — including text, images, course material and the Siddhant School of Yoga name and logo — is the property of Siddhant School of Yoga and may not be copied, reproduced or used without our written permission.",
  },
  {
    title: "9. Governing Law",
    body: "These Terms & Conditions are governed by the laws of India, and any disputes will be subject to the jurisdiction of the courts in Uttarakhand, India.",
  },
  {
    title: "10. Changes to These Terms",
    body: "We may update these Terms & Conditions from time to time. Continued use of our website or services after any changes constitutes acceptance of the updated terms.",
  },
  {
    title: "11. Contact Us",
    body: `If you have any questions about these Terms & Conditions, please contact us at ${site.email} or ${site.phone}.`,
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        {/* Hero Banner */}
        <section className="relative min-h-fit sm:min-h-[420px] lg:h-[46vh] lg:max-h-[440px] w-full flex items-center overflow-hidden">
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

          <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-24">
            <div className="max-w-xl text-left mx-auto text-center sm:mx-0 sm:text-left">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center justify-center sm:justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#142b1e]/80"
              >
                <Link
                  href="/"
                  className="flex items-center gap-1 hover:text-[#1c3b2b] transition-colors"
                >
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#142b1e]/50 shrink-0" />
                <span className="text-[#142b1e] font-semibold">Terms & Conditions</span>
              </nav>

              <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                  Terms &amp;
                </span>
                <span className="block text-2xl sm:text-3xl font-normal">
                  Conditions
                </span>
              </h1>

              <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#142b1e]/90 leading-relaxed max-w-md mx-auto sm:mx-0">
                Please read these terms carefully before registering for a course or retreat.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] font-figtree">
          <Container className="max-w-3xl">
            <p className="text-xs sm:text-sm text-stone-500 mb-10">
              Last updated: January 2026
            </p>

            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl sm:text-2xl font-belleza font-normal tracking-wide text-[#1c3b2b] mb-3">
                    {section.title}
                  </h2>
                  {section.body && (
                    <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed">
                      {section.body}
                    </p>
                  )}
                  {section.list && (
                    <ul className="space-y-2 mt-2">
                      {section.list.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm sm:text-[15px] text-stone-600 leading-relaxed"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#b85c00] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

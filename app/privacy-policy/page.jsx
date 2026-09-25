import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home as HomeIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Container } from "@/components/ui";
import { site } from "@/data/siteData";

export const metadata = {
  title: "Privacy Policy | Siddhant School of Yoga, Rishikesh",
  description:
    "How Siddhant School of Yoga collects, uses and protects your personal information when you enquire, register or interact with our website.",
};

const sections = [
  {
    title: "1. Introduction",
    body: `Siddhant School of Yoga ("we", "our", "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have, when you visit ${site.url} or submit any enquiry, registration or contact form on our website.`,
  },
  {
    title: "2. Information We Collect",
    list: [
      "Contact details you provide in our forms — name, email address, phone number and country.",
      "Course-related details — the course or retreat you are interested in, preferred month, accommodation type, yoga experience level and any message you send us.",
      "Technical information such as browser type, device and general usage data, collected automatically to help us improve the website.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    list: [
      "To respond to your enquiry and share course or retreat information you requested.",
      "To process your registration, confirm your seat and send booking-related communication.",
      "To send you a confirmation email after you submit a form, including relevant course details and payment options.",
      "To improve our website, courses and the overall student experience.",
    ],
  },
  {
    title: "4. Sharing of Information",
    body: "We do not sell, rent or trade your personal information to third parties. Your details are used only by Siddhant School of Yoga's admissions team to communicate with you, and may be shared with trusted service providers (such as our email and payment processors) strictly to deliver the service you requested.",
  },
  {
    title: "5. Data Security",
    body: "We take reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "6. Cookies",
    body: "Our website may use cookies and similar technologies to remember your preferences and understand how visitors use our site. You can disable cookies through your browser settings, though some parts of the website may not function as intended.",
  },
  {
    title: "7. Your Rights",
    body: "You may contact us at any time to review, correct, update or request deletion of the personal information you have shared with us.",
  },
  {
    title: "8. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time to reflect changes in our practices. Any updates will be posted on this page.",
  },
  {
    title: "9. Contact Us",
    body: `If you have any questions about this Privacy Policy, please contact us at ${site.email} or ${site.phone}.`,
  },
];

export default function PrivacyPolicyPage() {
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
                <span className="text-[#142b1e] font-semibold">Privacy Policy</span>
              </nav>

              <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                  Privacy
                </span>
                <span className="block text-2xl sm:text-3xl font-normal">
                  Policy
                </span>
              </h1>

              <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#142b1e]/90 leading-relaxed max-w-md mx-auto sm:mx-0">
                How we collect, use and protect your personal information.
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

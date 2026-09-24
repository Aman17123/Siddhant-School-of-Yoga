import { ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import RegistrationForm from "@/components/RegistrationForm";
import { Container, Kicker, HeadingDivider } from "@/components/ui";

export const metadata = {
  title: "Book My Yoga | Enroll Now at Siddhant School of Yoga, Rishikesh",
  description:
    "Register for your Yoga Teacher Training or Retreat at Siddhant School of Yoga in Rishikesh, India. Fill out the short form and our admissions director will get back to you within 24 hours.",
};

export default function BookMyYogaPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        <section className="py-14 sm:py-16 lg:py-20 font-figtree">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-8 lg:mb-10">
              <Kicker>Apply Now</Kicker>
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
                Registration Form
              </h1>
              <HeadingDivider />
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Namaste! We are so delighted to welcome you to the Siddhant School of Yoga Family! Fill out this short form to start your yoga journey. Our admissions director will personally review your application and get back to you within 24 hours.
              </p>
            </div>

            <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#fdfbf7] border border-[#e3dac9] shadow-xs">
              <RegistrationForm />
            </div>

            <div className="max-w-3xl mx-auto flex items-start gap-3 p-4 sm:p-5 mt-6 rounded-2xl bg-[#1c3b2b]/5 border border-[#1c3b2b]/20">
              <ShieldCheck className="w-5 h-5 text-[#1c3b2b] shrink-0 mt-0.5" />
              <p className="text-[13px] sm:text-sm text-stone-700 leading-relaxed">
                Your privacy matters to us. All information you share here is kept strictly confidential and used only to process your enquiry and registration — we never sell, rent or share your details with third parties.
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

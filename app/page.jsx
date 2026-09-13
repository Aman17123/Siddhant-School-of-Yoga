import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import AboutPreview from "@/components/AboutPreview";
import WhatIsYttc from "@/components/WhatIsYttc";
import Courses from "@/components/Courses";
import KundaliniSection from "@/components/KundaliniSection";
import Retreats from "@/components/Retreats";
import PranayamaPreview from "@/components/PranayamaPreview";
import Founder from "@/components/Founder";
import Teachers from "@/components/Teachers";
import WhyChooseUs from "@/components/WhyChooseUs";
import CourseComparison from "@/components/CourseComparison";
import WhyRishikesh from "@/components/WhyRishikesh";
import ResidentialExperience from "@/components/ResidentialExperience";
import Testimonials from "@/components/Testimonials";
import GalleryMarquee from "@/components/GalleryMarquee";
import FAQ from "@/components/FAQ";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#c9a961]/30 selection:text-[#175f52]">
      {/* 1. Header & Navigation (Vinyasa Yoga Academy Style) */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section (Vinyasa Yoga Academy Style) */}
        <Hero />

        {/* 3. Trust Strip (Yoga Alliance RYS 200, 300, 500 Badges) */}
        <TrustStrip />

        {/* 4. About School Preview */}
        <AboutPreview />

        {/* 5. What Is a Yoga Teacher Training Course (YTTC)? */}
        <WhatIsYttc />

        {/* 6. Yoga Teacher Training Programs (100h, 200h, 300h, 500h) */}
        <Courses />

        {/* 6. Sacred Kundalini Yoga Teacher Training */}
        <KundaliniSection />

        {/* 7. Interactive Why Choose Us (100-Day Schedule, Measurable Growth) */}
        <WhyChooseUs />

        {/* 13. Why Rishikesh, India (Sacred Ganges & Himalayan Energy) */}
        <WhyRishikesh />

        {/* 8. Yoga Retreats in Rishikesh */}
        <Retreats />

        {/* 10. Founder Feature: Acharya Siddhant */}
        <Founder />

        {/* 9. Signature Pranayama & Breath Science */}
        {/* <PranayamaPreview /> */}

        {/* 11. Our Himalayan Faculty Masters */}
        <Teachers />

        {/* 12. Course Comparison Grid */}
        <CourseComparison />

        {/* 14. Residential Experience (Ashram Living & Sattvic Nutrition) */}
        <ResidentialExperience />

        {/* 15. Student Testimonials & Google 4.9★ Reviews */}
        <Testimonials />

        {/* 16. Dual-Row Photo Gallery Ribbon */}
        <GalleryMarquee />

        {/* 17. Frequently Asked Questions Accordion */}
        <FAQ />

        {/* 18. Final Call to Action Banner */}
        <CtaBanner />
      </main>

      {/* 19. Rich Multi-Column Footer */}
      <Footer />

      {/* 20. Floating WhatsApp and Quick Apply Widget */}
      <FloatingActions />
    </div>
  );
}

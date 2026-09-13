import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import AboutPreview from '@/components/AboutPreview';
import Courses from '@/components/Courses';
import KundaliniSection from '@/components/KundaliniSection';
import Retreats from '@/components/Retreats';
import PranayamaPreview from '@/components/PranayamaPreview';
import Founder from '@/components/Founder';
import Teachers from '@/components/Teachers';
import WhyChooseUs from '@/components/WhyChooseUs';
import CourseComparison from '@/components/CourseComparison';
import WhyRishikesh from '@/components/WhyRishikesh';
import ResidentialExperience from '@/components/ResidentialExperience';
import Testimonials from '@/components/Testimonials';
import GalleryMarquee from '@/components/GalleryMarquee';
import FAQ from '@/components/FAQ';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

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

        {/* 5. Yoga Teacher Training Programs (100h, 200h, 300h, 500h) */}
        <Courses />

        {/* 6. Sacred Kundalini Yoga Teacher Training */}
        <KundaliniSection />

        {/* 7. Yoga Retreats in Rishikesh */}
        <Retreats />

        {/* 8. Signature Pranayama & Breath Science */}
        <PranayamaPreview />

        {/* 9. Founder Feature: Acharya Siddhant */}
        <Founder />

        {/* 10. Our Himalayan Faculty Masters */}
        <Teachers />

        {/* 11. Interactive Why Choose Us (100-Day Schedule, Measurable Growth) */}
        <WhyChooseUs />

        {/* 12. Course Comparison Grid */}
        <CourseComparison />

        {/* 13. Why Rishikesh, India (Sacred Ganges & Himalayan Energy) */}
        <WhyRishikesh />

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

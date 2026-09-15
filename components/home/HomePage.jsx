import Hero from "./Hero";
import TrustStrip from "./TrustStrip";
import AboutPreview from "./AboutPreview";
import WhatIsYttc from "./WhatIsYttc";
import Courses from "./Courses";
import KundaliniSection from "./KundaliniSection";
import WhyChooseUs from "./WhyChooseUs";
import WhyRishikesh from "./WhyRishikesh";
import Retreats from "./Retreats";
import Founder from "./Founder";
import Teachers from "./Teachers";
import CourseComparison from "./CourseComparison";
import ResidentialExperience from "./ResidentialExperience";
import Testimonials from "./Testimonials";
import VideoSection from "./VideoSection";
import GalleryMarquee from "./GalleryMarquee";
import FAQ from "./FAQ";
import CtaBanner from "./CtaBanner";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Strip (Accreditations & Badges) */}
      <TrustStrip />

      {/* 3. About School Preview */}
      <AboutPreview />

      {/* 4. What Is a Yoga Teacher Training Course (YTTC)? */}
      <WhatIsYttc />

      {/* 5. Yoga Teacher Training Programs (100h, 200h, 300h, 500h) */}
      <Courses />

      {/* 6. Sacred Kundalini Yoga Teacher Training */}
      <KundaliniSection />

      {/* 7. Interactive Why Choose Us */}
      <WhyChooseUs />

      {/* 8. Why Rishikesh, India */}
      <WhyRishikesh />

      {/* 9. Yoga Retreats in Rishikesh */}
      <Retreats />

      {/* 10. Founder Feature: Acharya Siddhant */}
      <Founder />

      {/* 11. Himalayan Faculty Masters */}
      <Teachers />

      {/* 12. Course Comparison Grid */}
      <CourseComparison />

      {/* 13. Residential Experience (Ashram Living & Sattvic Nutrition) */}
      <ResidentialExperience />

      {/* 14. Student Testimonials & Google 4.9★ Reviews */}
      <Testimonials />

      {/* 15. Official Video Showcase (YouTube Channel Integration) */}
      <VideoSection />

      {/* 16. Photo Gallery Ribbon */}
      <GalleryMarquee />

      {/* 17. Frequently Asked Questions Accordion */}
      <FAQ />

      {/* 18. Call to Action Banner */}
      <CtaBanner />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";
import SectionNav from "@/components/course-pages/SectionNav";
import DetoxRetreatContent from "@/components/course-pages/DetoxRetreatContent";

export const metadata = {
  title: "Yogic Detox & Ayurveda Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "Cleanse your body and mind with traditional yogic detox practices and authentic Ayurvedic therapies in a peaceful Rishikesh ashram setting.",
};

const heroBadges = [
  { icon: "Clock", label: "5–7 Days Residential" },
  { icon: "Sparkles", label: "Shatkarma & Ayurveda" },
  { icon: "Users", label: "All Levels Welcome" },
];

const sectionNavItems = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "dates-fees", label: "Dates & Fees" },
  { id: "schedule", label: "Daily Schedule" },
  { id: "whats-include", label: "What's Include" },
  { id: "teachers", label: "Teachers" },
  { id: "faq", label: "FAQ" },
];

export default function DetoxRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sparkles"
          kickerText="Holistic Purification for Body & Mind"
          title="Yogic Detox & Ayurveda Retreat in Rishikesh"
          subtitle="Cleanse your body and mind with traditional yogic detox practices and authentic Ayurvedic therapies in a peaceful Rishikesh ashram setting."
          badges={heroBadges}
          bgImage="/images/jala-neti-detox-retreat.jpg"
          bgImageAlt="Yogic Detox & Ayurveda Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the Yogic Detox & Ayurveda Retreat in Rishikesh."
        />
        <DetoxRetreatContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

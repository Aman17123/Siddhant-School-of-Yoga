import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";
import SectionNav from "@/components/course-pages/SectionNav";
import PranayamaRetreatContent from "@/components/course-pages/PranayamaRetreatContent";

export const metadata = {
  title: "Pranayama & Breathwork Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "Learn authentic pranayama and breathwork techniques from expert teachers to calm your mind, boost your energy and improve your overall health.",
};

const heroBadges = [
  { icon: "Clock", label: "5–7 Days Residential" },
  { icon: "Sparkles", label: "Classical Pranayama" },
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

export default function PranayamaRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sparkles"
          kickerText="Correct Your Breathing, Expand Your Life"
          title="Pranayama & Breathwork Retreat in Rishikesh"
          subtitle="Learn authentic pranayama and breathwork techniques from expert teachers to calm your mind, boost your energy and improve your overall health."
          badges={heroBadges}
          bgImage="/images/pranayama-practice-by-ganga-river.jpg"
          bgImageAlt="Pranayama & Breathwork Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the Pranayama & Breathwork Retreat in Rishikesh."
        />
        <PranayamaRetreatContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

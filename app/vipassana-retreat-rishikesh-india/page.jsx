import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";
import SectionNav from "@/components/course-pages/SectionNav";
import VipassanaRetreatContent from "@/components/course-pages/VipassanaRetreatContent";

export const metadata = {
  title: "Vipassana Silent Meditation Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "Go inward with a silent meditation retreat in Rishikesh, using mindful practice and gentle body awareness to bring lasting mental clarity.",
};

const heroBadges = [
  { icon: "Clock", label: "7–10 Days Residential" },
  { icon: "Sparkles", label: "Noble Silence (Mouna)" },
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

export default function VipassanaRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sparkles"
          kickerText="Witness the Mind Through Body Sensations"
          title="Vipassana Silent Meditation Retreat in Rishikesh"
          subtitle="Go inward with a silent meditation retreat in Rishikesh, using mindful practice and gentle body awareness to bring lasting mental clarity."
          badges={heroBadges}
          bgImage="/images/vipassana-meditation-cave-retreat.jpg"
          bgImageAlt="Vipassana Silent Meditation Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the Vipassana Silent Meditation Retreat in Rishikesh."
        />
        <VipassanaRetreatContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

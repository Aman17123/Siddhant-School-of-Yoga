import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";
import SectionNav from "@/components/course-pages/SectionNav";
import MantraYogaRetreatContent from "@/components/course-pages/MantraYogaRetreatContent";

export const metadata = {
  title: "Mantra Yoga & Meditation Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "Discover the sacred science of sound with a Mantra Yoga & Meditation retreat in Rishikesh — traditional chanting, meditation and yoga by the Ganges.",
};

const heroBadges = [
  { icon: "Clock", label: "5–7 Days Residential" },
  { icon: "Sparkles", label: "Traditional Mantra Chanting" },
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

export default function MantraYogaMeditationRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sparkles"
          kickerText="The Sacred Science of Sound"
          title="Mantra Yoga & Meditation Retreat in Rishikesh"
          subtitle="Discover the sacred science of sound with traditional mantra chanting, guided meditation and daily yoga practice by the Ganges."
          badges={heroBadges}
          bgImage="/images/meditation-class-garden-ganga-view-rishikesh.jpg"
          bgImageAlt="Mantra Yoga & Meditation Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the Mantra Yoga & Meditation Retreat in Rishikesh."
        />
        <MantraYogaRetreatContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

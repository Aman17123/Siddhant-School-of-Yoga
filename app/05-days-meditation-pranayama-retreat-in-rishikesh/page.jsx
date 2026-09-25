import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";
import SectionNav from "@/components/course-pages/SectionNav";
import MeditationPranayamaRetreatContent, {
  sectionNavItems,
} from "@/components/course-pages/MeditationPranayamaRetreatContent";

export const metadata = {
  title: "5-Day Meditation & Pranayama Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "Calm your mind and deepen your breath with a 5-day Meditation & Pranayama retreat in Rishikesh — daily guided meditation and classical breathwork.",
};

const heroBadges = [
  { icon: "Clock", label: "5 Days Residential" },
  { icon: "Sparkles", label: "Meditation & Pranayama" },
  { icon: "Users", label: "All Levels Welcome" },
];

export default function FiveDayMeditationPranayamaRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sparkles"
          kickerText="Calm Your Mind, Deepen Your Breath"
          title="5-Day Meditation & Pranayama Retreat in Rishikesh"
          subtitle="Calm your mind and deepen your breath with daily guided meditation and classical pranayama practice in a peaceful Rishikesh ashram."
          badges={heroBadges}
          bgImage="/images/seated-pranayama-yoga-class-garden-rishikesh.jpg"
          bgImageAlt="5-Day Meditation & Pranayama Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the 5-Day Meditation & Pranayama Retreat in Rishikesh."
        />
        <MeditationPranayamaRetreatContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

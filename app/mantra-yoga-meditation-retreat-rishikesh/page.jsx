import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";

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

export default function MantraYogaMeditationRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

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
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

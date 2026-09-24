import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";

export const metadata = {
  title: "Kundalini Awakening Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "Awaken your inner energy through gentle chakra activation, sacred mantra chanting and guided Kundalini kriyas in the spiritual heart of Rishikesh.",
};

const heroBadges = [
  { icon: "Clock", label: "7 Days Residential" },
  { icon: "Flame", label: "Chakra & Kundalini Kriyas" },
  { icon: "Users", label: "All Levels Welcome" },
];

export default function KundaliniRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Flame"
          kickerText="Awaken Your Hidden Vital Energy"
          title="Kundalini Awakening Retreat in Rishikesh"
          subtitle="Awaken your inner energy through gentle chakra activation, sacred mantra chanting and guided Kundalini kriyas in the spiritual heart of Rishikesh."
          badges={heroBadges}
          bgImage="/images/lotus-pose-meditation-rocky-riverbank-rishikesh.jpg"
          bgImageAlt="Kundalini Awakening Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the Kundalini Awakening Retreat in Rishikesh."
        />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

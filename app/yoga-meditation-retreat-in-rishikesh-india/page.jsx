import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";

export const metadata = {
  title: "Yoga & Meditation Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "Balance your body and mind with daily yoga, guided meditation and calming breathwork in a peaceful Himalayan ashram overlooking the Ganges.",
};

const heroBadges = [
  { icon: "Clock", label: "5–7 Days Residential" },
  { icon: "Sparkles", label: "Yoga & Guided Meditation" },
  { icon: "Users", label: "All Levels Welcome" },
];

export default function YogaMeditationRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sparkles"
          kickerText="Revitalize Body, Mind & Prana"
          title="Yoga & Meditation Retreat in Rishikesh"
          subtitle="Balance your body and mind with daily yoga, guided meditation and calming breathwork in a peaceful Himalayan ashram overlooking the Ganges."
          badges={heroBadges}
          bgImage="/images/yoga-and-meditation-retreat-riverside.jpg"
          bgImageAlt="Yoga & Meditation Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the Yoga & Meditation Retreat in Rishikesh."
        />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

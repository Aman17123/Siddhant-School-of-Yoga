import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";
import SectionNav from "@/components/course-pages/SectionNav";
import YogaAyurvedaRetreatContent, {
  sectionNavItems,
} from "@/components/course-pages/YogaAyurvedaRetreatContent";

export const metadata = {
  title: "Yoga & Ayurveda Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "Combine daily yoga practice with authentic Ayurvedic nourishment and lifestyle wisdom on a holistic Yoga & Ayurveda retreat in Rishikesh.",
};

const heroBadges = [
  { icon: "Clock", label: "5–7 Days Residential" },
  { icon: "Sparkles", label: "Yoga & Ayurvedic Living" },
  { icon: "Users", label: "All Levels Welcome" },
];

export default function YogaAndAyurvedaRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sparkles"
          kickerText="Holistic Balance for Body & Mind"
          title="Yoga & Ayurveda Retreat in Rishikesh"
          subtitle="Combine daily yoga practice with authentic Ayurvedic nourishment and lifestyle wisdom on a holistic retreat in Rishikesh."
          badges={heroBadges}
          bgImage="/images/yoga-school-food-and-stay/yoga-school-sattvic-thali-rice-dal-raita.jpg"
          bgImageAlt="Yoga & Ayurveda Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the Yoga & Ayurveda Retreat in Rishikesh."
        />
        <YogaAyurvedaRetreatContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

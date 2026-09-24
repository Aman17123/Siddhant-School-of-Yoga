import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";

export const metadata = {
  title: "3-Day Detox Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "A short, powerful 3-day yogic detox in Rishikesh — gentle Shatkarma cleansing, Ayurvedic nourishment and restorative yoga in a peaceful ashram setting.",
};

const heroBadges = [
  { icon: "Clock", label: "3 Days Residential" },
  { icon: "Sparkles", label: "Shatkarma & Ayurveda" },
  { icon: "Users", label: "All Levels Welcome" },
];

export default function ThreeDayDetoxRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sparkles"
          kickerText="A Short, Powerful Reset"
          title="3-Day Detox Retreat in Rishikesh"
          subtitle="A short, powerful yogic detox in Rishikesh — gentle Shatkarma cleansing, Ayurvedic nourishment and restorative yoga in a peaceful ashram setting."
          badges={heroBadges}
          bgImage="/images/jala-neti-detox-retreat.jpg"
          bgImageAlt="3-Day Detox Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the 3-Day Detox Retreat in Rishikesh."
        />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

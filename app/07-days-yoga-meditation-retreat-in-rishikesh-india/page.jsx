import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";
import SectionNav from "@/components/course-pages/SectionNav";
import SevenDayRetreatContent from "@/components/course-pages/SevenDayRetreatContent";

export const metadata = {
  title: "7-Day Yoga & Meditation Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "A focused 7-day yoga and meditation retreat in Rishikesh — daily asana, guided meditation and breathwork in a peaceful Himalayan ashram beside the Ganges.",
};

const heroBadges = [
  { icon: "Clock", label: "7 Days Residential" },
  { icon: "Sparkles", label: "Yoga & Guided Meditation" },
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

export default function SevenDayYogaMeditationRetreatPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sparkles"
          kickerText="Revitalize Body, Mind & Prana"
          title="7-Day Yoga & Meditation Retreat in Rishikesh"
          subtitle="A focused week of daily yoga, guided meditation and calming breathwork in a peaceful Himalayan ashram overlooking the Ganges."
          badges={heroBadges}
          bgImage="/images/yoga-and-meditation-retreat-riverside.jpg"
          bgImageAlt="7-Day Yoga & Meditation Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the 7-Day Yoga & Meditation Retreat in Rishikesh."
        />
        <SevenDayRetreatContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

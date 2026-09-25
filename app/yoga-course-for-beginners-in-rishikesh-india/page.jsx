import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";
import SectionNav from "@/components/course-pages/SectionNav";
import YogaBeginnersContent from "@/components/course-pages/YogaBeginnersContent";

export const metadata = {
  title: "Yoga for Beginners Retreat in Rishikesh | Siddhant School of Yoga",
  description:
    "A gentle, beginner-friendly yoga retreat in Rishikesh combining simple asana, breathwork and peaceful ashram living beside the sacred Ganges river.",
};

const heroBadges = [
  { icon: "Clock", label: "3–7 Days Residential" },
  { icon: "Sunrise", label: "Gentle Hatha Yoga" },
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

export default function YogaForBeginnersPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />
      <SectionNav items={sectionNavItems} />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="Sunrise"
          kickerText="A Step Toward a Peaceful Life"
          title="Yoga for Beginners Retreat in Rishikesh"
          subtitle="A gentle, beginner-friendly yoga retreat in Rishikesh combining simple asana, breathwork and peaceful ashram living beside the sacred Ganges river."
          badges={heroBadges}
          bgImage="/images/group-triangle-pose-garden-yoga-retreat-rishikesh.jpg"
          bgImageAlt="Yoga for Beginners Retreat in Rishikesh"
          whatsappIntro="Namaste! I'd like to know more about the Yoga for Beginners Retreat in Rishikesh."
        />
        <YogaBeginnersContent />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CourseHero from "@/components/course-pages/CourseHero";
import { getCourseHero } from "@/data/onlineCourses";

export function buildOnlineCourseMetadata(course) {
  return {
    title: course.seoTitle,
    description: course.seoDescription,
    alternates: { canonical: course.href },
  };
}

// Header + the same hero banner as the Yoga TTC pages + footer.
// Page content sections go between the hero and the footer.
export default function OnlineCoursePage({ course, children }) {
  const hero = getCourseHero(course);

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        <CourseHero
          kickerIcon="MonitorPlay"
          kickerText={hero.kicker}
          title={course.title}
          subtitle={course.intro}
          badges={hero.badges}
          bgImage={course.image}
          bgImageAlt={course.imageAlt}
          datesAnchor="/contact"
          datesLabel="Enquire About This Course"
          whatsappIntro={`Namaste! I'd like to know more about the ${course.menuTitle}.`}
        />

        {children}
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

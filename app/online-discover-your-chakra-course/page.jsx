import OnlineCoursePage, { buildOnlineCourseMetadata } from "@/components/online/OnlineCoursePage";
import { getOnlineCourse } from "@/data/onlineCourses";

const course = getOnlineCourse("discover-chakra");

export const metadata = buildOnlineCourseMetadata(course);

export default function Page() {
  return <OnlineCoursePage course={course} />;
}

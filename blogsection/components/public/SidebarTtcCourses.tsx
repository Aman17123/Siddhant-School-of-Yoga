import React from "react";
import Link from "next/link";
import Image from "next/image";
import { teacherTrainings } from "@/data/coursesData";

export default function SidebarTtcCourses() {
  // Show our top certified Yoga TTC courses in Rishikesh
  const ttcList = teacherTrainings.filter((c) =>
    ["200-hour-yoga-ttc", "300-hour-yoga-ttc", "500-hour-yoga-ttc", "100-hour-yoga-ttc"].includes(c.id)
  ).concat(
    teacherTrainings.filter((c) =>
      !["200-hour-yoga-ttc", "300-hour-yoga-ttc", "500-hour-yoga-ttc", "100-hour-yoga-ttc"].includes(c.id)
    )
  ).slice(0, 4);

  return (
    <div className="bg-[#fdfbf7] border border-[#e3dac9] rounded-2xl p-5 shadow-xs font-figtree">
      {/* Header with bottom accent line */}
      <div className="mb-4 pb-2 border-b-2 border-[#b32025]">
        <h3 className="font-belleza font-bold text-sm sm:text-base tracking-wider uppercase text-[#b32025]">
          Yoga Teacher Training Courses
        </h3>
      </div>

      {/* TTC Cards List */}
      <div className="flex flex-col gap-4">
        {ttcList.map((course) => {
          const badgeText = course.title.includes("200")
            ? "200 Hour Yoga TTC"
            : course.title.includes("300")
            ? "300 Hour Yoga TTC"
            : course.title.includes("500")
            ? "500 Hour Yoga TTC"
            : course.title.includes("100")
            ? "100 Hour Yoga TTC"
            : course.badge || "Yoga TTC";

          return (
            <article key={course.id || course.slug} className="group flex flex-col">
              {/* Image Container with Badge */}
              <Link
                href={`/${course.slug}`}
                className="relative aspect-[16/9.5] w-full rounded-xl overflow-hidden bg-stone-100 block mb-2 shadow-2xs"
              >
                {course.image && (
                  <Image
                    src={course.image}
                    alt={`${course.title} in Rishikesh`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="360px"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Red Badge */}
                <span className="absolute top-2 left-2 bg-[#b32025] text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-sm shadow-xs uppercase tracking-wider">
                  {badgeText}
                </span>
              </Link>

              {/* Course Title */}
              <h4 className="font-belleza font-bold text-base leading-snug text-[#1e2422] group-hover:text-[#b32025] transition-colors line-clamp-2">
                <Link href={`/${course.slug}`}>
                  {course.title} in Rishikesh
                </Link>
              </h4>

              {/* Price & Meta info */}
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-stone-500 mt-1 font-figtree">
                <span className="font-bold text-[#b32025]">{course.price}</span>
                <span>•</span>
                <span className="text-stone-600">{course.badge || "Yoga Alliance"}</span>
                <span>•</span>
                <span className="text-amber-700 font-medium">★ 750+ Reviews</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

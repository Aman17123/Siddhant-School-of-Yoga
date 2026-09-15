"use client";

import { useState } from "react";
import { Container, SectionHeading, ProgramCard, ButtonLink } from "../ui";
import { teacherTrainings, kundaliniTrainings } from "@/data/coursesData";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Courses() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All TTC Programs" },
    { id: "200", label: "200h TTC (Flagship)" },
    { id: "300", label: "300h Advanced" },
    { id: "500", label: "500h Master" },
    { id: "100", label: "100h Foundation" },
  ];

  const filteredPrograms =
    activeTab === "all"
      ? teacherTrainings
      : teacherTrainings.filter((p) => p.id.includes(activeTab));

  return (
    <section
      id="courses"
      className="py-14 sm:py-16 lg:py-20 bg-[#FAF6EE]/50 border-b border-[#EBE5D8] relative"
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10">
          <SectionHeading
            title="Yoga Teacher Training in Rishikesh, India"
            text="Four residential programs, each building on the last. Exact batch dates and fees are confirmed directly with Acharya Siddhant before you book — no guesswork, no hidden line items."
            className="mb-0"
          />
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mb-12">
          {filteredPrograms.map((prog) => (
            <ProgramCard key={prog.id} program={prog} />
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBE5D8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f22924]/10 text-[#f22924] flex items-center justify-center shrink-0 border border-[#f22924]/20 mx-auto sm:mx-0">
              <Sparkles className="w-6 h-6 text-[#f22924]" />
            </div>
            <div>
              <h4 className="font-belleza text-lg sm:text-xl font-normal text-[#1e2422] tracking-wide">
                Early Bird Offer – Book 1-3 month in advance and get 10-20 % off
              </h4>
              <p className="font-figtree text-xs sm:text-sm text-stone-600 mt-0.5">
                The sooner you plan your journey, the more you save on your
                transformation.
              </p>
            </div>
          </div>
          <ButtonLink
            href="#contact"
            variant="primary"
            className="shrink-0 text-xs sm:text-sm whitespace-nowrap mx-auto sm:mx-0"
          >
            Check Upcoming Dates
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

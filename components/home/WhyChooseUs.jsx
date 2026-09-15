"use client";

import {
  Sun,
  Users,
  Bed,
  Leaf,
  Waves,
  Sparkles,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Container } from "../ui";

export default function WhyChooseUs() {
  const reasons = [
    {
      id: "schedule",
      icon: Sun,
      title: "100-Day Daily Practice Schedule",
      description:
        "It is easy to practice in a group, but challenging alone at home. We support you after graduation with a comprehensive 100-day daily schedule to maintain discipline and deepen results.",
    },
    {
      id: "pranayama",
      icon: Sparkles,
      title: "World-First True Pranayama Science",
      description:
        "Breathing exercises alone are not Pranayama. We teach authentic Kumbhaka (retention), Bandhas (locks), and Nadi purification to dissolve mind chatter and access deep meditation.",
    },
    {
      id: "parameters",
      icon: Award,
      title: "Measurable Growth Parameters",

      description:
        "Measuring progress in yoga is notoriously difficult. Siddhant School is the first to give you clear symptoms and parameters to evaluate your physical, mental, and intellectual growth.",
    },
    {
      id: "family",
      icon: Users,
      title: "Ashram Family Environment",
      subtitle: "Nurturing Care & Comfort",
      description:
        "We create a warm, non-commercial family environment. Experienced masters motivate you, dedicated staff care for your sattvic meals and rest, and fellow seekers become lifelong soul friends.",
    },
    {
      id: "mantra",
      icon: Leaf,
      title: "Vedic Mantra Sound Science",
      subtitle: "Exact Sanskrit Resonance",
      description:
        "Every letter and word creates a distinct energy field. We teach the precise traditional pronunciation and vibrational energy of ancient mantras for inner transformation and clarity.",
    },
    {
      id: "true-self",
      icon: Waves,
      title: "Discovering 'Who You Truly Are'",
      subtitle: "Beyond Body, Mind & Personality",
      description:
        "You are not your body—you have a body. You are not your mind—you have a mind. Our classical teachings guide you into discovering your true spiritual identity and mastership over life.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-14 sm:py-16 lg:py-20 bg-[#FAF6EE] border-y border-[#FBDD8E]/40 relative overflow-hidden"
    >
      {/* Subtle decorative background blur shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FBDD8E]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#f22924]/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-3">
            Why Choose Siddhant School of Yoga in Rishikesh
          </h2>

          <p className="font-figtree text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
            Modern society often views yoga as posture gymnastics or simple
            therapy. Siddhant School of Yoga restores yoga in its full glory as
            the ultimate solution for strength, clarity, peace, and lifelong
            success.
          </p>
        </div>

        {/* 3x2 Grid of 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((item, idx) => {
            const isTerracotta = idx % 2 === 0;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`group relative bg-white rounded-3xl p-7 lg:p-8 shadow-xs hover:shadow-2xl transition-all duration-300 border border-[#EBE5D8] hover:-translate-y-1.5 flex flex-col justify-between font-figtree ${
                  isTerracotta
                    ? "border-t-4 border-t-[#f22924]"
                    : "border-t-4 border-t-[#f5b860]"
                }`}
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs ${
                        isTerracotta
                          ? "bg-[#f22924]/10 text-[#f22924] group-hover:bg-[#f22924] group-hover:text-white group-hover:scale-105"
                          : "bg-[#F5B860]/15 text-[#d45d44] group-hover:bg-[#f5b860] group-hover:text-white group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold text-stone-400 font-figtree">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-belleza font-normal text-[#1e2422] tracking-wide mb-1 group-hover:text-[#f22924] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

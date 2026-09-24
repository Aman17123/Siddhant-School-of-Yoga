import { Calendar, MessageCircle, Users, Award } from "lucide-react";
import { Kicker, HeadingDivider } from "@/components/ui";

const afterCoursePoints = [
  {
    icon: Calendar,
    title: "Continue to the 300-Hour Kundalini TTC",
    text: "This 200-hour course covers Steps 1 & 2 of our Kundalini method — return for the 300-Hour Advanced Kundalini TTC (Part 2: balance chakras & awaken Kundalini) to complete the full path.",
  },
  {
    icon: MessageCircle,
    title: "Simple Registration Process",
    text: "Send your inquiry, receive a course presentation, submit the registration form with your fee, and get a confirmation email — booking your seat is quick and straightforward.",
  },
  {
    icon: Users,
    title: "Continued Guidance",
    text: "A 100-day practice schedule, 100 days of WhatsApp and email support, access to our global alumni community, and help registering as a Yoga Alliance RYT.",
  },
  {
    icon: Award,
    title: "Fair Refund & Postponement Policy",
    text: "The deposit is non-refundable, but in a genuine emergency you can postpone within the current year — your deposit stays valid for 12 months and can even be transferred to a friend.",
  },
];

export default function Kundalini200HourBeyondGraduation() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Beyond Graduation</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            What Happens After the Course
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            Your journey doesn&apos;t end on the last day — here&apos;s how to continue, register, or plan ahead.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {afterCoursePoints.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-start gap-3 bg-[#f4efe6] rounded-2xl border border-[#e3dac9] p-5"
            >
              <span className="shrink-0 w-9 h-9 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center">
                <Icon className="w-4.5 h-4.5" />
              </span>
              <div>
                <h3 className="font-belleza text-base sm:text-lg text-[#1e2422] mb-1">{title}</h3>
                <p className="text-sm text-stone-700 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

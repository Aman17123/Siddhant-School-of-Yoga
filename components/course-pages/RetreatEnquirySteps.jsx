import { SectionHead } from "@/components/course-pages/RetreatUI";

const enquirySteps = [
  { step: "1", title: "Send an Enquiry", text: "Reach out via WhatsApp, call or the contact form below." },
  { step: "2", title: "Speak With Our Team", text: "We'll help you pick the right batch dates and room type." },
  { step: "3", title: "Confirm Your Seat", text: "Secure your spot with a simple booking confirmation." },
  { step: "4", title: "Prepare for Rishikesh", text: "Receive a pre-arrival guide with packing & travel tips." },
  { step: "5", title: "Begin Your Retreat", text: "Arrive in Rishikesh and start your journey with us." },
];

export default function RetreatEnquirySteps({ bgClassName = "bg-[#fdfbf7]" }) {
  return (
    <section className={`py-14 sm:py-16 lg:py-20 ${bgClassName} border-b border-[#e3dac9]/70 font-figtree`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <SectionHead kicker="Simple & Transparent" title="What Happens After You Enquire" />
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {enquirySteps.map((s) => (
            <div key={s.step} className="text-center flex flex-col items-center">
              <span className="w-11 h-11 rounded-full bg-[#1c3b2b] text-white flex items-center justify-center font-belleza text-lg mb-2.5 shrink-0">
                {s.step}
              </span>
              <h3 className="font-belleza text-base text-[#1e2422] mb-1">{s.title}</h3>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

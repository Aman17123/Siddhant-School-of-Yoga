import { MessageCircle, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { whatsappLink } from "@/data/siteData";

export default function RetreatFinalCta({ retreatName, bgClassName = "bg-[#f4efe6]" }) {
  return (
    <section className={`py-14 sm:py-16 lg:py-20 ${bgClassName} font-figtree`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="max-w-5xl mx-auto text-center rounded-3xl bg-gradient-to-br from-[#1c3b2b] via-[#142b1e] to-[#142b1e] px-6 sm:px-12 py-10 sm:py-14 shadow-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-white leading-[1.2] mb-3">
            Ready to Begin Your {retreatName} Journey?
          </h2>
          <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Seats are limited to keep our batches small and personal. Reach out and our team will help you plan the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <ButtonLink
              href={whatsappLink(
                `Namaste! I would like to know more about the ${retreatName} at Siddhant School of Yoga in Rishikesh.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              variant="white"
            >
              <MessageCircle className="w-4 h-4" />
              Ask Us on WhatsApp
            </ButtonLink>
            <ButtonLink href="/book-my-yoga-in-rishikesh-india" variant="primary">
              <ArrowRight className="w-4 h-4" />
              Enroll Now
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

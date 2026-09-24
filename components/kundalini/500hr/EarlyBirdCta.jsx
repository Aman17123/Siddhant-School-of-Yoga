import { MessageCircle, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { whatsappLink } from "@/data/siteData";

export default function KundaliniEarlyBirdCta() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#fdfbf7] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="max-w-5xl mx-auto text-center rounded-3xl bg-gradient-to-br from-[#1c3b2b] via-[#142b1e] to-[#142b1e] px-6 sm:px-12 py-10 sm:py-14 shadow-xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-[#f4efe6] text-[11px] sm:text-xs font-semibold uppercase tracking-wide mb-4">
            Early Bird Discount Available
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal text-white leading-[1.2] mb-3">
            Ready to Begin Your Complete Kundalini Mastery Journey in Rishikesh?
          </h2>
          <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Seats are limited to keep our batches small and personal. Book early to lock in the early bird discount and secure your place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <ButtonLink
              href={whatsappLink(
                "Namaste! I would like to ask about the early bird discount for the 500-Hour Master Kundalini Yoga TTC at Siddhant School of Yoga in Rishikesh.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              variant="white"
            >
              <MessageCircle className="w-4 h-4" />
              Ask Discount on WhatsApp
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

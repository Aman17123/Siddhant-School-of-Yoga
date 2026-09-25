"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, X, CreditCard } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/data/siteData";

export default function SuccessModal({
  open,
  onClose,
  title = "Message Sent!",
  message = "Thank you for reaching out. Our team will get back to you within 24 hours.",
  showPaymentCta = false,
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 font-figtree">
      <div
        className="absolute inset-0 bg-[#12261b]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-[#fdfbf7] rounded-3xl shadow-2xl border border-[#e3dac9] p-6 sm:p-8 text-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f4efe6] hover:bg-[#e3dac9] text-[#1c3b2b] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 rounded-full bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h2 className="font-belleza text-2xl sm:text-3xl font-normal text-[#1e2422] tracking-wide mb-2">
          {title}
        </h2>
        <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed mb-6">
          {message}
        </p>

        <div className="flex flex-col gap-3">
          {showPaymentCta && (
            <Link
              href="/yoga-course-payment"
              className="inline-flex items-center justify-center gap-2.5 w-full px-6 py-3.5 rounded-full text-sm sm:text-base font-figtree font-bold bg-[#b85c00] hover:bg-[#96490a] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <CreditCard className="w-4.5 h-4.5" />
              Pay Advance to Secure Your Seat
            </Link>
          )}

          <a
            href={whatsappLink(
              "Namaste! I just submitted my registration and wanted to follow up directly.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2.5 w-full px-6 py-3.5 rounded-full text-sm sm:text-base font-figtree font-bold transition-all duration-300 ${
              showPaymentCta
                ? "border-2 border-[#1c3b2b] text-[#1c3b2b] hover:bg-[#1c3b2b] hover:text-white"
                : "bg-[#1c3b2b] hover:bg-[#142b1e] text-white hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            }`}
          >
            <FaWhatsapp className="w-4.5 h-4.5" />
            Chat on WhatsApp
          </a>

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-stone-500 hover:text-[#1c3b2b] font-semibold transition-colors mt-1 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

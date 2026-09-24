"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Send } from "lucide-react";
import { whatsappLink } from "@/data/siteData";
import { courseOptions, hearAboutOptions } from "@/data/enquiryOptions";

const inputClassName =
  "w-full rounded-xl border border-[#e3dac9] bg-[#fdfbf7] px-4 py-3 text-sm text-[#1e2422] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/30 focus:border-[#1c3b2b] transition-colors";

export default function QuickEnquiryModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    hearAbout: "",
    message: "",
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Namaste! I'd like to submit a quick enquiry.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone/WhatsApp: ${form.phone}\nCourse: ${form.course}\nHow they heard about us: ${form.hearAbout}\nMessage: ${form.message || "-"}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 font-figtree">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#12261b]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#fdfbf7] rounded-3xl shadow-2xl border border-[#e3dac9]">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 sm:py-5 bg-[#fdfbf7]/95 backdrop-blur-sm border-b border-[#e3dac9]">
          <Image
            src="/logo/siddhant-logo.svg"
            alt="Siddhant School of Yoga"
            width={120}
            height={40}
            className="h-8 sm:h-9 w-auto"
          />

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Image src="/logo/yoga-alliance.webp" alt="Yoga Alliance" width={36} height={36} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-contain" />
              <Image src="/logo/rys-200.webp" alt="RYS 200" width={36} height={36} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-contain" />
              <Image src="/logo/rys-300.webp" alt="RYS 300" width={36} height={36} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-contain" />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry form"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1c3b2b] hover:bg-[#142b1e] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-8 py-6 sm:py-8">
          <h2 className="font-belleza text-2xl sm:text-3xl font-normal text-[#b85c00] tracking-wide mb-1.5">
            Enquiry Now Form
          </h2>
          <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed mb-6">
            Fill in your details below and our team will connect with you shortly with complete details.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label htmlFor="qe-name" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
                  Full Name <span className="text-[#b85c00]">*</span>
                </label>
                <input
                  id="qe-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="qe-email" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
                  Email Address <span className="text-[#b85c00]">*</span>
                </label>
                <input
                  id="qe-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label htmlFor="qe-phone" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
                  Phone / WhatsApp <span className="text-[#b85c00]">*</span>
                </label>
                <input
                  id="qe-phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="qe-course" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
                  Select Course <span className="text-[#b85c00]">*</span>
                </label>
                <select
                  id="qe-course"
                  name="course"
                  required
                  value={form.course}
                  onChange={handleChange}
                  className={`${inputClassName} appearance-none`}
                >
                  <option value="" disabled>
                    Select course or retreat
                  </option>
                  {courseOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label htmlFor="qe-hear" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
                  How did you hear about us? <span className="text-[#b85c00]">*</span>
                </label>
                <select
                  id="qe-hear"
                  name="hearAbout"
                  required
                  value={form.hearAbout}
                  onChange={handleChange}
                  className={`${inputClassName} appearance-none`}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {hearAboutOptions.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="qe-message" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
                  Message <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="qe-message"
                  name="message"
                  rows={1}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter your message or query..."
                  className={`${inputClassName} resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2.5 w-full px-8 py-4 rounded-full text-sm sm:text-base font-figtree font-bold bg-[#b85c00] hover:bg-[#96490a] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <Send className="w-4.5 h-4.5" />
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

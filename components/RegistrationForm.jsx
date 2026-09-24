"use client";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { whatsappLink } from "@/data/siteData";
import { courseOptions, hearAboutOptions, experienceOptions, accommodationOptions, getMonthOptions } from "@/data/enquiryOptions";

const inputClassName =
  "w-full rounded-xl border border-[#e3dac9] bg-[#fdfbf7] px-4 py-3 text-sm text-[#1e2422] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/30 focus:border-[#1c3b2b] transition-colors";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    hearAbout: "",
    experience: "",
    course: "",
    month: "",
    accommodation: "",
    message: "",
  });

  // This page is statically generated at build time, so the current date is
  // unknowable then — start empty (matches server & client) and sync the
  // real rolling 12-month window from the visitor's actual clock after mount.
  const [monthOptions, setMonthOptions] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the system clock, an external source not available at build/SSR time
    setMonthOptions(getMonthOptions());
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Namaste! I'd like to register for a course at Siddhant School of Yoga.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone/WhatsApp: ${form.phone}\nCountry: ${form.country}\nCourse: ${form.course}\nCourse Month: ${form.month}\nAccommodation Type: ${form.accommodation}\nHow they found us: ${form.hearAbout}\nYoga Experience: ${form.experience}\nMessage: ${form.message || "-"}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="rf-name" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
            Full Name <span className="text-[#b85c00]">*</span>
          </label>
          <input
            id="rf-name"
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
          <label htmlFor="rf-email" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
            Email Address <span className="text-[#b85c00]">*</span>
          </label>
          <input
            id="rf-email"
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
          <label htmlFor="rf-phone" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
            Phone / WhatsApp <span className="text-[#b85c00]">*</span>
          </label>
          <input
            id="rf-phone"
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
          <label htmlFor="rf-country" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
            Where Do You Live? <span className="text-[#b85c00]">*</span>
          </label>
          <input
            id="rf-country"
            name="country"
            type="text"
            required
            value={form.country}
            onChange={handleChange}
            placeholder="Your country"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="rf-course" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
            Choose Course <span className="text-[#b85c00]">*</span>
          </label>
          <select
            id="rf-course"
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
        <div>
          <label htmlFor="rf-month" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
            Course Month <span className="text-[#b85c00]">*</span>
          </label>
          <select
            id="rf-month"
            name="month"
            required
            value={form.month}
            onChange={handleChange}
            className={`${inputClassName} appearance-none`}
          >
            <option value="" disabled>
              Select course month
            </option>
            {monthOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="rf-accommodation" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
            Accommodation Type <span className="text-[#b85c00]">*</span>
          </label>
          <select
            id="rf-accommodation"
            name="accommodation"
            required
            value={form.accommodation}
            onChange={handleChange}
            className={`${inputClassName} appearance-none`}
          >
            <option value="" disabled>
              Select accommodation type
            </option>
            {accommodationOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rf-hear" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
            How Did You Find Us? <span className="text-[#b85c00]">*</span>
          </label>
          <select
            id="rf-hear"
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
      </div>

      <div>
        <label htmlFor="rf-experience" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
          Yoga Experience <span className="text-[#b85c00]">*</span>
        </label>
        <select
          id="rf-experience"
          name="experience"
          required
          value={form.experience}
          onChange={handleChange}
          className={`${inputClassName} appearance-none`}
        >
          <option value="" disabled>
            Select your experience level
          </option>
          {experienceOptions.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="rf-message" className="block text-xs sm:text-sm font-bold text-[#1e2422] mb-1.5">
          Message <span className="text-stone-400 font-normal">(Optional)</span>
        </label>
        <textarea
          id="rf-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Enter your message or query..."
          className={`${inputClassName} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2.5 w-full sm:w-auto sm:self-center sm:px-16 px-8 py-4 rounded-full text-sm sm:text-base font-figtree font-bold bg-[#b85c00] hover:bg-[#96490a] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
      >
        <Send className="w-4.5 h-4.5" />
        Submit Registration
      </button>
    </form>
  );
}

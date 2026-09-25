"use client";

import { useState, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { courseOptions, hearAboutOptions, experienceOptions, accommodationOptions, getMonthOptions } from "@/data/enquiryOptions";
import { submitEnquiry } from "@/lib/submitEnquiry";
import SuccessModal from "@/components/SuccessModal";

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

  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await submitEnquiry({
        formSource: "Registration Form (Book My Yoga)",
        subject: `New course registration from ${form.name}`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        course: form.course,
        courseMonth: form.month,
        accommodationType: form.accommodation,
        howTheyFoundUs: form.hearAbout,
        yogaExperience: form.experience,
        message: form.message,
      });
      setStatus("idle");
      setSuccessOpen(true);
      setForm({
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
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <>
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

      {status === "error" && (
        <p className="text-sm text-red-600 font-medium text-center -mb-1">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex items-center justify-center gap-2.5 w-full sm:w-auto sm:self-center sm:px-16 px-8 py-4 rounded-full text-sm sm:text-base font-figtree font-bold bg-[#b85c00] hover:bg-[#96490a] disabled:opacity-60 disabled:cursor-not-allowed text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
      >
        {status === "sending" ? (
          <Loader2 className="w-4.5 h-4.5 animate-spin" />
        ) : (
          <Send className="w-4.5 h-4.5" />
        )}
        {status === "sending" ? "Submitting..." : "Submit Registration"}
      </button>
    </form>

    <SuccessModal
      open={successOpen}
      onClose={() => setSuccessOpen(false)}
      title="Application Received!"
      message="Namaste! Thank you for applying to Siddhant School of Yoga. Our admissions director will personally review your application and get back to you within 24 hours. Pay your advance now to instantly secure your seat."
      showPaymentCta
    />
    </>
  );
}

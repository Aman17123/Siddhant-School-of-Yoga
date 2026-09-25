"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Flame, Clock, Award, Users, ArrowRight, Send, Loader2 } from "lucide-react";
import { submitEnquiry } from "@/lib/submitEnquiry";
import SuccessModal from "@/components/SuccessModal";

const badges = [
  { icon: Clock, label: "13 Days Residential" },
  { icon: Award, label: "Certificate of Completion" },
  { icon: Users, label: "Beginner to Intermediate · No Experience Needed" },
];

export default function KundaliniHero() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
        formSource: `Send Us a Message — Namaste! I'd like to know more about the 100-Hour Kundalini Yoga TTC in Rishikesh.`,
        subject: `New message from ${form.name}`,
        name: form.name,
        email: form.email,
        message: form.message,
      });
      setStatus("idle");
      setForm({ name: "", email: "", message: "" });
      setSuccessOpen(true);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <section className="relative min-h-fit lg:min-h-[640px] w-full flex items-center overflow-hidden bg-[#12261b]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/founder/acharya-siddhant-founder-meditation-rishikesh.webp"
          alt="Kundalini meditation and chakra awakening sadhana in Rishikesh"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12261b]/95 via-[#12261b]/80 to-[#12261b]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12261b]/90 via-transparent to-[#12261b]/40" />
      </div>

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-6 pt-8 sm:pt-10 lg:pt-14 pb-16 sm:pb-20 lg:pb-24">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-14">
          {/* Left: Content */}
          <div className="w-full lg:w-[58%] max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 text-[#e08a3e]" />
              <span className="text-[11px] sm:text-xs font-figtree font-semibold uppercase tracking-[0.2em] text-[#e3dac9]">
                A Focused Specialisation · Kundalini Awakening
              </span>
            </div>

            <h1 className="font-belleza tracking-wide text-white leading-[1.15] text-3xl sm:text-4xl lg:text-[52px]">
              100-Hour Kundalini Yoga Teacher Training in Rishikesh
            </h1>

            <p className="mt-5 text-sm sm:text-base font-figtree text-white/80 leading-relaxed max-w-xl">
              This is a focused specialisation, not a general survey. Over thirteen days on the banks of the Ganga, you&apos;ll go deep into just two practices — awakening the dormant serpent energy through classical chakra kriya, rhythmic breathwork, and sacred Vedic mantra chanting.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              {badges.map((b) => {
                const Icon = b.icon;
                return (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xs text-xs sm:text-[13px] font-figtree font-medium text-white/90"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#e08a3e]" />
                    {b.label}
                  </span>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-8">
              <Link
                href="/book-my-yoga-in-rishikesh-india"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#b85c00] hover:bg-[#96490a] text-white text-xs sm:text-sm font-figtree font-bold uppercase tracking-wide shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Enroll Now
              </Link>
              <Link
                href="#dates"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/70 text-white hover:bg-white hover:text-[#1c3b2b] text-xs sm:text-sm font-figtree font-bold uppercase tracking-wide transition-all duration-300"
              >
                Check Upcoming Dates
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Send Us a Message Card */}
          <div className="w-full lg:w-[42%]">
            <form
              onSubmit={handleSubmit}
              className="bg-[#fdfbf7] rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 max-w-md mx-auto lg:mx-0 lg:ml-auto"
            >
              <h2 className="font-belleza text-xl sm:text-2xl font-normal text-[#1e2422] tracking-wide mb-1.5">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-figtree mb-5">
                Ask us anything about the course, we usually reply within a day.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-figtree font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full px-4 py-3 rounded-xl border border-[#e3dac9] bg-[#f4efe6] text-sm text-[#1e2422] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/30 focus:border-[#1c3b2b] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-figtree font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#e3dac9] bg-[#f4efe6] text-sm text-[#1e2422] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/30 focus:border-[#1c3b2b] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-figtree font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us a little about yourself, and what you would like to know..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e3dac9] bg-[#f4efe6] text-sm text-[#1e2422] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/30 focus:border-[#1c3b2b] transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-600 font-medium text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#b85c00] hover:bg-[#96490a] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-figtree font-bold uppercase tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  {status === "sending" ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                </button>

                <p className="text-center text-[11px] text-stone-400 font-figtree italic">
                  Your details stay with us, no lists, no spam.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Message Sent!"
        message="Namaste! Thank you for reaching out. Our team usually replies within a day."
      />
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, CreditCard, Sparkles, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Container, Kicker, HeadingDivider } from "@/components/ui";

export const metadata = {
  title: "Yoga Course Payments | Secure Deposit Online | Siddhant School of Yoga",
  description:
    "Pay your yoga teacher training course deposit or registration fees securely online using our payment gateway page.",
};

const courseOptions = [
  { value: "200 Hours Yoga TTC", label: "200 Hours Yoga TTC — $210.74 USD" },
  { value: "100 Hours Yoga TTC", label: "100 Hours Yoga TTC — $105.37 USD" },
  { value: "300 Hours Yoga TTC", label: "300 Hours Yoga TTC — $316.11 USD" },
  { value: "500 Hours Yoga TTC", label: "500 Hours Yoga TTC — $526.85 USD" },
  { value: "100 hrs Kundalini Yoga TTC", label: "100 hrs Kundalini Yoga TTC — $105.37 USD" },
  { value: "200 hrs Kundalini Yoga TTC", label: "200 hrs Kundalini Yoga TTC — $210.74 USD" },
  { value: "300 hrs Kundalini Yoga TTC", label: "300 hrs Kundalini Yoga TTC — $316.11 USD" },
  { value: "500 hrs Kundalini Yoga TTC", label: "500 hrs Kundalini Yoga TTC — $526.85 USD" },
];

const retreatOptions = [
  { value: "Yoga for Beginners", label: "Yoga for Beginners — $77.52 USD" },
  { value: "Yoga and Meditation Retreat", label: "Yoga and Meditation Retreat — $155.04 USD" },
  { value: "Kundalini Retreat", label: "Kundalini Retreat — $155.04 USD" },
  { value: "Vipassana Retreat", label: "Vipassana Retreat — $155.04 USD" },
  { value: "Detox Retreat", label: "Detox Retreat — $155.04 USD" },
  { value: "Yoga and Ayurveda Retreat", label: "Yoga and Ayurveda Retreat — $105.37 USD" },
];

const selectClassName =
  "w-full appearance-none rounded-xl border border-[#e3dac9] bg-[#fdfbf7] px-4 py-3 text-sm sm:text-[15px] text-[#1e2422] font-medium focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/30 focus:border-[#1c3b2b] transition-colors";

function PayCard({ icon: Icon, kicker, title, hostedButtonId, options }) {
  return (
    <div className="bg-[#fdfbf7] rounded-3xl border border-[#e3dac9] shadow-xs p-6 sm:p-8 flex flex-col">
      <div className="w-12 h-12 rounded-2xl bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#b85c00] font-semibold mb-1.5">
        {kicker}
      </span>
      <h3 className="font-belleza text-xl sm:text-2xl font-normal text-[#1e2422] tracking-wide leading-snug mb-5">
        {title}
      </h3>

      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
        className="flex flex-col gap-4 mt-auto"
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value={hostedButtonId} />
        <input type="hidden" name="currency_code" value="USD" />

        <div>
          <label
            htmlFor={`os0-${hostedButtonId}`}
            className="block text-xs font-semibold text-[#1c3b2b] uppercase tracking-wide mb-2"
          >
            Choose Your Course
          </label>
          <select
            id={`os0-${hostedButtonId}`}
            name="os0"
            defaultValue={options[0].value}
            className={selectClassName}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm sm:text-base font-figtree font-bold bg-[#b85c00] hover:bg-[#96490a] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <CreditCard className="w-4.5 h-4.5" />
          Pay Now With PayPal
        </button>
        <p className="text-xs text-stone-500 text-center">
          PayPal transaction fees extra.
        </p>
      </form>
    </div>
  );
}

export default function YogaCoursePaymentPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        {/* Hero Banner */}
        <section className="relative min-h-fit sm:min-h-[500px] lg:h-[70vh] lg:max-h-[740px] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 pt-8 sm:pt-14 lg:pt-16 pb-20 sm:pb-28 lg:pb-36">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 max-w-xl text-left">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#142b1e]/80"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-[#1c3b2b] transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#142b1e]/50 shrink-0" />
                  <span className="text-[#142b1e] font-semibold">Yoga Course Payment</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2]">
                  <span className="block text-3xl sm:text-4xl lg:text-[48px] font-normal">
                    Yoga Course
                  </span>
                  <span className="block text-2xl sm:text-3xl font-normal">
                    Payments
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#142b1e]/90 leading-relaxed max-w-md">
                  Pay your yoga teacher training or retreat advance fee securely online through PayPal — choose your course, and complete checkout in a few clicks.
                </p>
              </div>

              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/student-receiving-yoga-certificate-siddhant-school-rishikesh.jpg"
                    alt="Student receiving their yoga teacher training certificate at Siddhant School of Yoga"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20 border-b border-[#e3dac9]/70">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
              <Kicker>Secure Payment</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2]">
                Yoga Course &amp; Retreat Payments
              </h2>
              <HeadingDivider />
              <p className="text-sm sm:text-[15px] font-figtree text-stone-600 leading-relaxed max-w-2xl mx-auto">
                Pay your yoga teacher training or retreat advance fee securely
                online through PayPal. Choose your course below, then
                complete your payment on PayPal&apos;s secure checkout page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 max-w-4xl mx-auto mb-12">
              <PayCard
                icon={Sparkles}
                kicker="Kundalini & Yoga TTC"
                title="Kundalini & Yoga TTC Course Advance Fees"
                hostedButtonId="Z9QCYDRH3HSBJ"
                options={courseOptions}
              />
              <PayCard
                icon={CreditCard}
                kicker="Yoga Retreats"
                title="Yoga Retreat Course Advance Fees"
                hostedButtonId="57C72M4PJFZY4"
                options={retreatOptions}
              />
            </div>

            <div className="max-w-2xl mx-auto flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-[#1c3b2b]/5 border border-[#1c3b2b]/20">
              <ShieldCheck className="w-5 h-5 text-[#1c3b2b] shrink-0 mt-0.5" />
              <p className="text-[13px] sm:text-sm text-stone-700 leading-relaxed">
                Your advance fee reserves your seat for the batch dates you
                have agreed with our admissions team. The remaining balance
                is paid on arrival at Siddhant School of Yoga in Rishikesh.
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

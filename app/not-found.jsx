import { Home, Compass } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Container } from "@/components/ui";
import { whatsappLink } from "@/data/siteData";

export const metadata = {
  title: "Page Not Found | Siddhant School of Yoga Rishikesh",
  description:
    "The page you are looking for could not be found. Return to the Siddhant School of Yoga homepage or chat with us on WhatsApp.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-[#f4efe6] py-20 sm:py-28">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <span className="block text-[1rem] font-figtree font-semibold tracking-[0.08em] text-[#b85c00] mb-2">
              Error 404
            </span>

            <h1 className="font-belleza text-6xl sm:text-8xl font-normal text-[#1c3b2b] tracking-wide leading-none mb-3">
              404
            </h1>

            <h2 className="font-belleza text-xl sm:text-2xl font-normal text-[#1e2422] tracking-wide mb-3">
              Page Not Found
            </h2>

            <p className="text-sm sm:text-[15px] font-figtree font-medium text-stone-600 leading-relaxed max-w-md mx-auto mb-8">
              The page you are looking for may have been moved or no longer
              exists. Let&apos;s guide you back to your yogic path.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1c3b2b] hover:bg-[#142b1e] text-white text-sm sm:text-base font-bold font-figtree px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </a>
              <a
                href={whatsappLink(
                  "Namaste! I was looking for a page on your website and couldn't find it. Could you please help me?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#fdfbf7] border-2 border-[#1c3b2b] text-[#1c3b2b] hover:bg-[#1c3b2b] hover:text-white text-sm sm:text-base font-bold font-figtree px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Talk on WhatsApp</span>
              </a>
            </div>

            <a
              href="/#courses"
              className="inline-flex items-center gap-1.5 mt-8 text-xs sm:text-sm font-figtree font-semibold text-[#1c3b2b] hover:text-[#142b1e] transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Or explore our Yoga Teacher Training courses</span>
            </a>
          </div>
        </Container>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

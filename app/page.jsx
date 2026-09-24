import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import HomePage from "@/components/home/HomePage";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      {/* Header & Navigation */}
      <Navbar />

      {/* Main Home Content */}
      <main className="flex-grow overflow-x-hidden">
        <HomePage />
      </main>

      {/* Footer & Floating Widgets */}
      <Footer />
      <FloatingActions />
    </div>
  );
}

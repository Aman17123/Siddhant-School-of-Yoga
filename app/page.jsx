import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import HomePage from "@/components/home/HomePage";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#c9a961]/30 selection:text-[#175f52]">
      {/* Header & Navigation */}
      <Navbar />

      {/* Main Home Content */}
      <main className="flex-grow">
        <HomePage />
      </main>

      {/* Footer & Floating Widgets */}
      <Footer />
      <FloatingActions />
    </div>
  );
}

import { Philosopher, Playfair_Display, Manrope, Nunito_Sans, Marcellus, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/siteData";

const philosopher = Philosopher({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-philosopher",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const marcellus = Marcellus({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Siddhant School of Yoga | Best Yoga School in Rishikesh India",
  description:
    "Yoga Alliance certified premier yoga school in Rishikesh, India approved RYS 200, 300, 500. Join authentic 100, 200, 300, 500-hour Yoga Teacher Training, Kundalini TTC & retreats by the holy Ganges river.",
  keywords: [
    "best yoga school in Rishikesh",
    "yoga teacher training in Rishikesh",
    "yoga TTC in Rishikesh India",
    "200 hour yoga teacher training Rishikesh",
    "300 hour yoga teacher training Rishikesh",
    "500 hour yoga teacher training Rishikesh",
    "Kundalini yoga teacher training Rishikesh",
    "Pranayama training Rishikesh",
    "Acharya Siddhant",
    "Siddhant School of Yoga",
    "Yoga retreats Rishikesh",
  ],
  authors: [{ name: "Acharya Siddhant" }],
  creator: site.name,
  publisher: site.name,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    title: "Siddhant School of Yoga | Yoga Teacher Training in Rishikesh, India",
    description:
      "Yoga Alliance USA Registered School (RYS 200, 300, 500). World-first Pranayama curriculum, 100-day practice schedule, and transformational retreats in Rishikesh.",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhant School of Yoga | Rishikesh, India",
    description:
      "Yoga Alliance USA certified Yoga Teacher Training & Retreats in Rishikesh.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${philosopher.variable} ${playfair.variable} ${manrope.variable} ${nunitoSans.variable} ${marcellus.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-[#fbf8f1] text-[#202019] font-sans antialiased min-h-screen selection:bg-[#c9a961]/30 selection:text-[#175f52]">
        {children}
      </body>
    </html>
  );
}

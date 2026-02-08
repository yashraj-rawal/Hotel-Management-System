import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import "./globals.css"; // Ensure your Tailwind and DaisyUI/Shadcn styles are here

// Editorial fonts for that Luxury Hotel feel
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  style: ['italic', 'normal']
});

export const metadata: Metadata = {
  title: "Yashraj Hotel & Spa | Mumbai's Premier Luxury Sanctuary",
  description: "Experience relentless luxury and bespoke hospitality at the heart of Mumbai's Marine Drive.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans flex flex-col min-h-screen bg-white text-slate-900 antialiased`}>
        <Provider>
          {/* Persistent Navigation: Glassmorphism and Backdrop Blur are handled inside Navbar */}
          <Navbar />
          
          {/* Main Content Area: 'grow' ensures the footer stays at the bottom on short pages */}
          <main className="grow flex flex-col">
            {children}
          </main>

          {/* Persistent Footer: Brand closing and secondary navigation */}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/app-context";
import { Shell } from "@/components/shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const deva = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-deva", display: "swap" });

export const metadata: Metadata = {
  title: "Pragati — Institute Intelligence",
  description: "Team AlphaQ · Case B The Data Moat",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${deva.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">
        <AppProvider>
          <Shell>{children}</Shell>
        </AppProvider>
      </body>
    </html>
  );
}

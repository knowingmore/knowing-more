import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import NewsletterPopup from "@/components/NewsletterPopup";
import DiscountPopup from "@/components/DiscountPopup";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MicrosoftClarity from "@/components/MicrosoftClarity";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "knowing more. - Science-Backed Supplements for Longevity",
  description:
    "Good things come to those who are knowing more. Premium longevity supplements crafted with precision science. Performance, Balance, and Gut Health formulas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
        <NewsletterPopup />
        <DiscountPopup />
        <CookieBanner />
        <GoogleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}

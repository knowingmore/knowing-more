"use client";

import { motion } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const ctaData = {
  en: { label: "See products →", href: "/store" },
  pl: { label: "Produkty →",     href: "/pl/store" },
};

export default function Navbar({ locale = "en" }: { locale?: "en" | "pl" }) {
  const cta = ctaData[locale];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 h-[68px] flex items-center justify-end gap-5">

        <LanguageSwitcher locale={locale} />

        <a
          href={cta.href}
          className="px-5 py-2 rounded-full text-white text-[13px] font-semibold flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
          style={{ background: "#111111" }}
        >
          {cta.label}
        </a>

      </div>
    </motion.header>
  );
}

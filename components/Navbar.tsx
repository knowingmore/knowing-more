"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navLinksData = {
  en: [
    { label: "Store", href: "/store" },
    { label: "Our methods", href: "/methods" },
    { label: "Blog", href: "/blog" },
    { label: "Support", href: "/support" },
  ],
  pl: [
    { label: "Sklep", href: "/pl/store" },
    { label: "O nas", href: "/pl/methods" },
    { label: "Blog", href: "/pl/blog" },
    { label: "Pomoc", href: "/pl/support" },
  ],
};

const ctaData = {
  en: { label: "Shop →", href: "/store", mobile: "Discover the collection" },
  pl: { label: "Kup →", href: "/pl/store", mobile: "Odkryj kolekcję" },
};

export default function Navbar({ locale = "en" }: { locale?: "en" | "pl" }) {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = navLinksData[locale];
  const cta = ctaData[locale];
  const logoHref = locale === "pl" ? "/pl" : "/";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hero is 220vh — logo appears once hero is fully behind the user
      setPastHero(y > window.innerHeight * 1.15);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/92 backdrop-blur-xl border-b border-black/[0.06] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 h-[68px] flex items-center justify-between">
          {/* Logo — hidden on hero, fades in once user passes the hero section */}
          <motion.a
            href={logoHref}
            className="relative z-10"
            initial={false}
            animate={{
              opacity: pastHero ? 1 : 0,
              y: pastHero ? 0 : -6,
              pointerEvents: pastHero ? "auto" : "none",
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden={!pastHero}
          >
            <Image
              src="/images/logo/logo.png"
              alt="knowing more."
              width={130}
              height={42}
              className="object-contain"
              priority
            />
          </motion.a>

          {/* Desktop nav - centered absolute */}
          <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-[#111111]/45 hover:text-[#111111] transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Language switcher */}
          <div className="hidden md:flex items-center gap-5">
            <LanguageSwitcher locale={locale} />
            <a
              href={cta.href}
              className="px-5 py-2 rounded-full text-white text-[13px] font-semibold flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "#C4682A" }}
            >
              {cta.label}
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden relative z-10 p-2 -mr-2 text-[#111111]/60 hover:text-[#111111] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white/97 backdrop-blur-xl pt-[72px] flex flex-col px-6 pb-10"
          >
            <nav className="flex flex-col gap-0 mt-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.28, ease: "easeOut" }}
                  onClick={() => setMenuOpen(false)}
                  className="py-5 text-[1.35rem] font-medium text-[#111111]/65 border-b border-[#111111]/8 hover:text-[#111111] transition-colors"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-6 flex items-center justify-center">
              <LanguageSwitcher locale={locale} />
            </div>
            <motion.a
              href={cta.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.32, ease: "easeOut" }}
              onClick={() => setMenuOpen(false)}
              className="mt-6 px-6 py-4 rounded-full bg-[#111111] text-white text-center text-sm font-semibold tracking-wide hover:bg-[#333] transition-colors"
            >
              {cta.mobile}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

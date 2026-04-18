"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const STORAGE_KEY = "km_discount_dismissed";

const TR = {
  en: {
    eyebrow: "Welcome offer",
    headline: <>Get <span style={{ color: "#E8920A" }}>20 zł off</span><br />your first order.</>,
    body: "Sign up and we'll send your discount code straight to your inbox. One email — no noise.",
    placeholder: "your@email.com",
    cta: "Claim my 20 zł",
    skip: "No thanks",
    successTitle: "Check your inbox.",
    successBody: "Your 20 zł discount code is on its way. Use it on any order.",
    successClose: "Start shopping →",
    imageAlt: "knowing more. supplements",
    imageLine1: "knowing more.",
    imageLine2: <>Science-backed<br />longevity.</>,
  },
  pl: {
    eyebrow: "Oferta powitalna",
    headline: <>Odbierz <span style={{ color: "#E8920A" }}>20 zł</span><br />na pierwszy zakup.</>,
    body: "Zapisz się do newslettera — wyślemy Ci kod rabatowy prosto na maila. Jeden mail, żadnego spamu.",
    placeholder: "twój@email.com",
    cta: "Odbierz 20 zł",
    skip: "Nie, dziękuję",
    successTitle: "Sprawdź skrzynkę.",
    successBody: "Twój kod rabatowy -20 zł już jedzie do Ciebie. Możesz go użyć na dowolne zamówienie.",
    successClose: "Przejdź do sklepu →",
    imageAlt: "knowing more. suplementy",
    imageLine1: "knowing more.",
    imageLine2: <>Suplementy oparte<br />na nauce.</>,
  },
};

export default function DiscountPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  // Detect locale from path
  const locale: "en" | "pl" = pathname.startsWith("/pl") ? "pl" : "en";
  const tr = TR[locale];

  // Show on all pages except blog and support
  const excluded = ["/blog", "/support", "/contact", "/pl/blog", "/pl/support", "/pl/contact"];
  const isExcluded = excluded.some(p => pathname === p || pathname.startsWith(p + "/"));

  useEffect(() => {
    if (isExcluded) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Show after 8 seconds
    const timer = setTimeout(() => setVisible(true), 8000);

    // Or on exit intent (mouse leaves top of page)
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        clearTimeout(timer);
        if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
      }
    };

    document.addEventListener("mouseleave", onMouseOut);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseOut);
    };
  }, [isExcluded, pathname]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    localStorage.setItem(STORAGE_KEY, "1");
    setDone(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 28 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-[820px] rounded-2xl overflow-hidden bg-white shadow-2xl grid grid-cols-1 md:grid-cols-2">

              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#111111]/08 hover:bg-[#111111]/14 flex items-center justify-center text-[#111111]/45 hover:text-[#111111] transition-all duration-200"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Left: image */}
              <div className="relative hidden md:block min-h-[460px]">
                <Image
                  src="/images/website/lifestyle-mature-woman-products.jpg"
                  alt={tr.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="410px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                {/* Amber glow overlay */}
                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at 30% 70%, rgba(232,146,10,0.18) 0%, transparent 60%)" }} />
                <div className="absolute bottom-8 left-8">
                  <p className="text-white/60 text-[9px] font-mono tracking-[0.3em] uppercase mb-1">{tr.imageLine1}</p>
                  <p className="text-white text-lg font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                    {tr.imageLine2}
                  </p>
                </div>
              </div>

              {/* Right: copy + form */}
              <div className="flex flex-col justify-center px-8 py-12 md:px-10">
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center text-center gap-4 py-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                        className="w-14 h-14 rounded-full bg-[#E8920A] flex items-center justify-center text-white text-2xl"
                      >
                        ✓
                      </motion.div>
                      <p className="text-xl font-bold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                        {tr.successTitle}
                      </p>
                      <p className="text-sm text-[#111111]/45 leading-relaxed max-w-[260px]">
                        {tr.successBody}
                      </p>
                      <button
                        onClick={dismiss}
                        className="mt-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                        style={{ background: "#E8920A" }}
                      >
                        {tr.successClose}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>

                      <p className="text-[9px] font-mono tracking-[0.32em] uppercase text-[#E8920A]/80 mb-5">
                        {tr.eyebrow}
                      </p>

                      <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-3 leading-tight"
                        style={{ fontFamily: "var(--font-playfair)" }}>
                        {tr.headline}
                      </h2>

                      <p className="text-sm text-[#111111]/45 leading-relaxed mb-8">
                        {tr.body}
                      </p>

                      <form onSubmit={submit} className="space-y-3">
                        <input
                          type="email"
                          placeholder={tr.placeholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3.5 rounded-full text-sm border border-[#111111]/12 text-[#111111] placeholder-[#111111]/25 outline-none focus:border-[#E8920A]/50 transition-colors"
                        />
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
                          style={{ background: "linear-gradient(135deg, #E8920A 0%, #d4780a 100%)" }}
                        >
                          {tr.cta}
                          <span>→</span>
                        </button>
                      </form>

                      <button
                        onClick={dismiss}
                        className="mt-5 w-full text-center text-[10px] text-[#111111]/25 hover:text-[#111111]/45 transition-colors"
                      >
                        {tr.skip}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

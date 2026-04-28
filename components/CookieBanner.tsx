"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "km_cookie_choice";

const TR = {
  en: {
    text: "We use essential cookies for the site to work and optional analytics cookies to understand how visitors use the site. You can accept, reject, or read more in our",
    policyLink: "Cookie Policy",
    policyHref: "/cookies",
    accept: "Accept",
    reject: "Reject optional",
  },
  pl: {
    text: "Używamy niezbędnych plików cookies, aby strona działała poprawnie, oraz opcjonalnych cookies analitycznych. Możesz zaakceptować, odrzucić lub przeczytać więcej w naszej",
    policyLink: "Polityce cookies",
    policyHref: "/pl/cookies",
    accept: "Akceptuję",
    reject: "Odrzuć opcjonalne",
  },
};

export default function CookieBanner() {
  const pathname = usePathname();
  const locale: "en" | "pl" = pathname.startsWith("/pl") ? "pl" : "en";
  const tr = TR[locale];

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const choice = localStorage.getItem(STORAGE_KEY);
    if (!choice) {
      // Show after a small delay so it doesn't pop immediately
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (choice: "accept" | "reject") => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, choice);
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[420px] z-[60]"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="bg-[#111111] text-white rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] px-5 py-4 border border-white/[0.08]">
            <p className="text-[12px] leading-[1.6] text-white/70">
              {tr.text}{" "}
              <a
                href={tr.policyHref}
                className="text-white underline underline-offset-2 hover:text-[#C4682A] transition-colors"
              >
                {tr.policyLink}
              </a>
              .
            </p>
            <div className="mt-3 flex items-center gap-2 justify-end">
              <button
                onClick={() => decide("reject")}
                className="px-3 py-2 text-[11px] tracking-wide text-white/60 hover:text-white transition-colors"
              >
                {tr.reject}
              </button>
              <button
                onClick={() => decide("accept")}
                className="px-4 py-2 rounded-full text-[11px] font-semibold tracking-wide bg-white text-[#111111] hover:bg-white/90 transition-colors"
              >
                {tr.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

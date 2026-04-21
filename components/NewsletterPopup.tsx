"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const STORAGE_KEY = "km_newsletter_dismissed";

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  // Only show on blog pages
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog/");

  useEffect(() => {
    if (!isBlogPage) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => setVisible(true), 10000);

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        clearTimeout(timer);
        if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true);
      }
    };

    document.addEventListener("mouseleave", onMouseOut);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseOut);
    };
  }, [isBlogPage, pathname]);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
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
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
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
              <div className="relative hidden md:block aspect-auto min-h-[440px]">
                <Image
                  src="/images/website/capsules-marble.jpg"
                  alt="knowing more."
                  fill
                  className="object-cover"
                  sizes="410px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-white/60 text-[9px] font-mono tracking-[0.3em] uppercase mb-1">knowing more.</p>
                  <p className="text-white text-lg font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                    Science-backed<br />longevity.
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
                        className="w-14 h-14 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white text-2xl"
                      >
                        ✓
                      </motion.div>
                      <p className="text-xl font-bold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                        You&apos;re on the list.
                      </p>
                      <p className="text-sm text-[#111111]/45 leading-relaxed max-w-[260px]">
                        Every Tuesday - one article worth reading. See you in your inbox.
                      </p>
                      <button
                        onClick={dismiss}
                        className="mt-2 text-xs text-[#111111]/30 hover:text-[#111111]/60 transition-colors underline underline-offset-2"
                      >
                        Continue reading
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>

                      <p className="text-[9px] font-mono tracking-[0.32em] uppercase text-[#1B2A4A]/80 mb-5">
                        Longevity Intelligence
                      </p>

                      <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-3 leading-tight"
                        style={{ fontFamily: "var(--font-playfair)" }}>
                        Enjoying the read?<br />
                        <span className="text-[#111111]/30 italic font-normal">Get more like this.</span>
                      </h2>

                      <p className="text-sm text-[#111111]/45 leading-relaxed mb-8">
                        One article every Tuesday - ingredient deep-dives, longevity research, and early restock access. No noise, no filler.
                      </p>

                      <form onSubmit={submit} className="space-y-3">
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3.5 rounded-full text-sm border border-[#111111]/12 text-[#111111] placeholder-[#111111]/25 outline-none focus:border-[#1B2A4A]/50 transition-colors"
                        />
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
                          style={{ background: "linear-gradient(135deg, #1B2A4A 0%, #d4780a 100%)" }}
                        >
                          Subscribe
                          <span>→</span>
                        </button>
                      </form>

                      <button
                        onClick={dismiss}
                        className="mt-5 w-full text-center text-[10px] text-[#111111]/25 hover:text-[#111111]/45 transition-colors"
                      >
                        No thanks
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

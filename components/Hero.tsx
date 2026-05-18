"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";

/* ─── Copy ───────────────────────────────────────────────────────────────── */
const HERO_TR = {
  en: {
    badge:    "Longevity and performance supplements",
    lead:     "Good things come to those who are",
    tagline:  "Longevity and performance supplements,\nbuilt for healthspan, not just lifespan.",
    cta1:     "Explore the system",
    cta2:     "Our science",
    bottomL:  "Healthspan, not just lifespan",
    bottomR:  "Est. 2024",
  },
  pl: {
    badge:    "Suplementy longevity i performance",
    lead:     "Dla tych, którzy traktują zdrowie poważnie",
    tagline:  "Suplementy longevity i performance,\nstworzone na healthspan — nie tylko lifespan.",
    cta1:     "Odkryj system",
    cta2:     "Badania",
    bottomL:  "Healthspan, nie tylko lifespan",
    bottomR:  "Est. 2024",
  },
};

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero({ locale = "en" }: { locale?: "en" | "pl" }) {
  const tr            = HERO_TR[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playbackRate = 1.5;
    v.play().catch(() => {/* autoplay blocked — silent fallback */});
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const smoothProg = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.6, restDelta: 0.0005 });

  // Scroll transforms
  const textY       = useTransform(smoothProg, [0, 0.6], [0, -90]);
  const textOpacity = useTransform(smoothProg, [0, 0.5], [1, 0]);
  const textScale   = useTransform(smoothProg, [0, 0.6], [1, 0.95]);

  const chromeOpacity   = useTransform(smoothProg, [0, 0.22], [1, 0]);
  const backdropOpacity = useTransform(smoothProg, [0.14, 0.46], [1, 0]);
  const overlayOpacity  = useTransform(smoothProg, [0, 0.40], [1, 0]);

  const bgColor = useTransform(
    smoothProg,
    [0, 0.18, 0.52, 1],
    ["#06080F", "#06080F", "#FFFFFF", "#FFFFFF"],
  );
  const headlineColor = useTransform(
    smoothProg,
    [0, 0.16, 0.46, 1],
    ["#FAFAF7", "#FAFAF7", "#111111", "#111111"],
  );

  const col: Variants = {
    hidden: {},
    shown:  { transition: { delayChildren: 0.35, staggerChildren: 0.11 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 18, filter: "blur(12px)" },
    shown:  { opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  };
  const headLine: Variants = {
    hidden: {},
    shown:  { transition: { staggerChildren: 0.10, delayChildren: 0.06 } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: "88%", rotateX: -44, filter: "blur(24px)" },
    shown:  { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
      transition: { duration: 1.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  };

  return (
    <div ref={containerRef} className="relative" style={{ height: "220vh" }}>
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >

        {/* ── Video backdrop ─────────────────────────────────────── */}
        {/* Change the number to test: v1.mp4, v2.mp4 ... v15.mp4 */}
        <motion.div style={{ opacity: backdropOpacity }} className="absolute inset-0">
          <video
            ref={videoRef}
            src="/videos/v9-4k-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />
        </motion.div>

        {/* ── Overlays ──────────────────────────────────────────── */}
        <motion.div style={{ opacity: overlayOpacity }} aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 72% at 50% 50%, rgba(6,8,15,0.82) 0%, rgba(6,8,15,0.52) 45%, rgba(6,8,15,0.18) 72%, rgba(6,8,15,0) 100%)",
          }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, rgba(6,8,15,0.65) 0%, rgba(6,8,15,0) 20%, rgba(6,8,15,0) 78%, rgba(6,8,15,0.65) 100%)",
          }} />
          <div className="absolute inset-0 mix-blend-overlay opacity-[0.05]"
            style={{ backgroundImage: GRAIN_URL, backgroundSize: "180px 180px" }} />
        </motion.div>

        {/* ── Bottom chrome ─────────────────────────────────────── */}
        <motion.div
          style={{ opacity: chromeOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.3 }}
          className="absolute bottom-7 md:bottom-9 left-6 md:left-10 z-20 font-mono text-[9px] md:text-[10px] tracking-[0.32em] uppercase text-[#FAFAF7]/38"
        >
          {tr.bottomL}
        </motion.div>

        <motion.div
          style={{ opacity: chromeOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.3 }}
          className="absolute bottom-7 md:bottom-9 right-6 md:right-10 z-20 font-mono text-[9px] md:text-[10px] tracking-[0.32em] uppercase text-[#FAFAF7]/38"
        >
          {tr.bottomR}
        </motion.div>

        {/* ── Center content ────────────────────────────────────── */}
        <motion.div
          variants={col}
          initial="hidden"
          animate="shown"
          style={{
            y:       textY,
            opacity: textOpacity,
            scale:   textScale,
            transformPerspective: 1400,
          }}
          className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6 md:px-10 pt-[68px]"
        >

          {/* Orange pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 md:mb-12"
          >
            <span
              className="inline-flex items-center px-5 py-[9px] rounded-full font-mono font-bold text-[10px] md:text-[11px] tracking-[0.30em] uppercase"
              style={{
                background: "rgba(196, 104, 42, 0.92)",
                color: "#FAFAF7",
                letterSpacing: "0.28em",
              }}
            >
              {tr.badge}
            </span>
          </motion.div>

          {/* Lead italic */}
          <motion.p variants={item} className="mb-5 md:mb-7 text-[#FAFAF7]/62 italic leading-[1.45] tracking-wide">
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(0.95rem, 1.4vw, 1.35rem)" }}>
              {tr.lead}
            </span>
          </motion.p>

          {/* Top divider */}
          <motion.div variants={item} className="w-full max-w-[820px] flex items-center gap-4 mb-7 md:mb-9">
            <span className="flex-1 h-px bg-[#FAFAF7]/12" />
            <span className="w-1 h-1 rounded-full bg-[#C4682A]/70" />
            <span className="flex-1 h-px bg-[#FAFAF7]/12" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={headLine}
            className="leading-[0.90] tracking-[-0.038em]"
            style={{
              color:                headlineColor as unknown as string,
              fontFamily:           "var(--font-playfair)",
              fontSize:             "clamp(4rem, 14vw, 16rem)",
              transformPerspective: 1400,
            }}
          >
            <span className="block overflow-hidden" style={{ paddingBottom: "0.14em" }}>
              <motion.span variants={word} className="inline-block">
                kno<span style={{ color: "#C4682A" }}>win</span>g
              </motion.span>
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: "0.14em" }}>
              <motion.span variants={word} className="inline-block">
                more<span style={{ color: "#C4682A" }}>.</span>
              </motion.span>
            </span>
          </motion.h1>

          {/* Bottom divider */}
          <motion.div variants={item} className="w-full max-w-[820px] flex items-center gap-4 mt-7 md:mt-9">
            <span className="flex-1 h-px bg-[#FAFAF7]/12" />
            <span className="w-1 h-1 rounded-full bg-[#C4682A]/70" />
            <span className="flex-1 h-px bg-[#FAFAF7]/12" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="mt-8 md:mt-10 max-w-[620px] text-[#FAFAF7] leading-[1.6] tracking-wide"
            style={{ textAlign: "justify" }}
          >
            <span style={{ fontSize: "clamp(0.88rem, 1.08vw, 1.05rem)", whiteSpace: "pre-line" }}>
              {tr.tagline}
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-11 md:mt-13 flex items-center gap-10">
            <a
              href="#products"
              className="group relative inline-flex items-center gap-3 text-[#FAFAF7] font-medium tracking-wide"
              style={{ fontSize: "clamp(0.84rem, 0.98vw, 0.98rem)" }}
            >
              <span className="relative pb-[4px]">
                {tr.cta1}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#FAFAF7] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              </span>
            </a>

            <a
              href="#science"
              className="group relative inline-flex items-center text-[#FAFAF7] tracking-wide"
              style={{ fontSize: "clamp(0.84rem, 0.98vw, 0.98rem)" }}
            >
              <span className="relative pb-[4px]">
                {tr.cta2}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#FAFAF7] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              </span>
            </a>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
}

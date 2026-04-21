"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TR = {
  en: {
    sectionLabel: "04 \u2014 Evidence",
    headline: "Performance measured.",
    headlineItalic: "Results documented.",
    descriptor: "Real outcomes from real protocols.\nNot curated marketing imagery.",
    reviewScore: "4.9 / 5.0",
    reviewCount: "1,200+ verified reviews",
    energyStat: "87% report improved energy within 21 days",
    images: [
      { src: "/images/website/lifestyle-man-kitchen.jpg",          caption: "Performance Protocol / Day 14",          label: "Output"    },
      { src: "/images/website/lifestyle-woman-meditation.jpg",     caption: "Balance Protocol / Morning Ritual",     label: "Balance"   },
      { src: "/images/website/lifestyle-gut-health-bowl.jpg",      caption: "Gut Health Protocol / Day 21",          label: "Vitality"  },
      { src: "/images/website/lifestyle-mature-woman-products.jpg",caption: "Full Protocol / 90-Day Supply",         label: "Longevity" },
      { src: "/images/website/lifestyle-morning-ritual.jpg",       caption: "Performance Protocol / Morning Ritual", label: "Ritual"    },
      { src: "/images/website/lifestyle-products-desk.jpg",        caption: "Performance + Balance / Daily Stack",   label: "Focus"     },
    ],
  },
  pl: {
    sectionLabel: "04 \u2014 Efekty",
    headline: "Co się zmienia,",
    headlineItalic: "kiedy robisz to poważnie.",
    descriptor: "Prawdziwe wyniki z prawdziwych protokołów.\nNie kampania reklamowa.",
    reviewScore: "4.9 / 5.0",
    reviewCount: "ponad 1200 zweryfikowanych opinii",
    energyStat: "87% zauważa poprawę energii w ciągu 21 dni",
    images: [
      { src: "/images/website/lifestyle-man-kitchen.jpg",          caption: "Performance — dzień 14",              label: "Wyniki"    },
      { src: "/images/website/lifestyle-woman-meditation.jpg",     caption: "Balance — poranny rytuał",            label: "Balans"    },
      { src: "/images/website/lifestyle-gut-health-bowl.jpg",      caption: "Gut Health — dzień 21",               label: "Witalność" },
      { src: "/images/website/lifestyle-mature-woman-products.jpg",caption: "Pełny zestaw — 90-dniowy zapas",      label: "Longevity" },
      { src: "/images/website/lifestyle-morning-ritual.jpg",       caption: "Performance — poranny rytuał",        label: "Rytuał"    },
      { src: "/images/website/lifestyle-products-desk.jpg",        caption: "Performance + Balance — każdy dzień", label: "Skupienie" },
    ],
  },
};

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function LifestyleStrip({ locale = "en" }: { locale?: "en" | "pl" }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const tr = TR[locale];
  const images = tr.images;

  const [[active, dir], setActive] = useState([0, 0]);

  const go = useCallback((next: number, d: number) => {
    setActive([(next + images.length) % images.length, d]);
  }, [images.length]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => go(active + 1, 1), 5000);
    return () => clearInterval(id);
  }, [inView, active, go]);

  const img = images[active];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-white overflow-hidden"
    >
      {/* Top/bottom fades */}
      <div className="absolute top-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />
      <div className="absolute bottom-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />

      {/* Section header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 mb-12 md:mb-16">
        <div className="grid grid-cols-12 gap-4 items-end">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-8"
          >
            <p className="text-[9px] font-mono text-[#1B2A4A] tracking-[0.38em] uppercase mb-5">
              {tr.sectionLabel}
            </p>
            <h2
              className="leading-[0.94] tracking-[-0.03em] text-[#111111]"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.2rem, 4.8vw, 5rem)" }}
            >
              {tr.headline}<br />
              <span className="text-[#111111]/30 italic">{tr.headlineItalic}</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="col-span-12 md:col-span-3 md:col-start-10 text-sm text-[#111111]/35 leading-relaxed"
          >
            {tr.descriptor}
          </motion.p>
        </div>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16"
      >
        <div className="relative rounded-2xl overflow-hidden" style={{ height: "clamp(340px, 55vw, 640px)" }}>

          {/* Images */}
          <AnimatePresence custom={dir} mode="popLayout">
            <motion.div
              key={active}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.32, 0, 0.67, 0] }}
              className="absolute inset-0"
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1440px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Label */}
              <div className="absolute top-5 left-5">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                  {img.label}
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-6 left-6">
                <p className="text-[10px] font-mono text-white/50 tracking-[0.18em] uppercase">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next buttons */}
          <button
            onClick={() => go(active - 1, -1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => go(active + 1, 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200"
            aria-label="Next"
          >
            →
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-10">
            <motion.div
              key={active}
              className="h-full bg-[#1B2A4A]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? 1 : -1)}
              className="transition-all duration-300"
              aria-label={`Go to image ${i + 1}`}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-1.5 bg-[#1B2A4A]"
                    : "w-1.5 h-1.5 bg-[#111111]/20"
                }`}
              />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Bottom metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 mt-10 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-[#111111]/22 tracking-[0.28em] uppercase">
            {tr.reviewScore}
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-[#1B2A4A] text-[10px]">★</span>
            ))}
          </div>
          <span className="text-[9px] font-mono text-[#111111]/22 tracking-[0.2em] uppercase">
            {tr.reviewCount}
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#111111]/22 tracking-[0.28em] uppercase hidden md:inline">
          {tr.energyStat}
        </span>
      </motion.div>
    </section>
  );
}

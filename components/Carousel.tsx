"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Performance",
    tagline: "Energy · Recovery · Focus",
    desc: "Clinically-dosed actives for sustained output and measurable recovery.",
    img: "/images/products/studio-performance.png",
    color: "#111111",
    glow: "rgba(17,17,17,0.06)",
    index: "001",
  },
  {
    name: "Balance",
    tagline: "Cortisol · Sleep · Hormones",
    desc: "Adaptogenic support for the demands of modern high-performance life.",
    img: "/images/products/studio-balance.png",
    color: "#A0784A",
    glow: "rgba(160,120,74,0.09)",
    index: "002",
  },
  {
    name: "Gut Health",
    tagline: "Microbiome · Digestion · Immunity",
    desc: "Precision probiotic and prebiotic formula for systemic wellbeing.",
    img: "/images/products/studio-gut-health.png",
    color: "#C4682A",
    glow: "rgba(196,104,42,0.09)",
    index: "003",
  },
];

export default function Carousel() {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  const prev = () => go((active - 1 + products.length) % products.length);
  const next = () => go((active + 1) % products.length);

  // Auto-advance every 4 s
  useEffect(() => {
    timer.current = setInterval(() => {
      setDir(1);
      setActive((i) => (i + 1) % products.length);
    }, 4000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const reset = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDir(1);
      setActive((i) => (i + 1) % products.length);
    }, 4000);
  };

  const p = products[active];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40, filter: "blur(10px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit:   (d: number) => ({ opacity: 0, x: d * -40, filter: "blur(10px)" }),
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24">
      {/* Top / bottom fades */}
      <div className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, white, transparent)" }} aria-hidden />
      <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, white, transparent)" }} aria-hidden />

      {/* Ambient product glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active + "-glow"}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 60%, ${p.glow} 0%, transparent 65%)` }}
          aria-hidden
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">

        {/* ── Three-column layout ── */}
        <div className="grid items-center gap-4 md:gap-6" style={{ gridTemplateColumns: "1fr 2.2fr 1fr" }}>

          {/* Prev product - dimmed left */}
          <button
            onClick={() => { prev(); reset(); }}
            className="group flex flex-col items-center gap-3 opacity-25 hover:opacity-50 transition-opacity duration-300 cursor-pointer"
            aria-label="Previous product"
          >
            <div className="relative w-full mx-auto aspect-[3/4]">
              <Image
                src={products[(active - 1 + products.length) % products.length].img}
                alt={products[(active - 1 + products.length) % products.length].name}
                fill className="object-contain scale-90 group-hover:scale-95 transition-transform duration-500 drop-shadow-xl"
                sizes="20vw"
              />
            </div>
            <span className="text-[8px] font-mono tracking-[0.28em] uppercase text-[#111111]/50 hidden md:block">
              {products[(active - 1 + products.length) % products.length].name}
            </span>
          </button>

          {/* Active product - centre, large */}
          <div className="flex flex-col items-center gap-5 md:gap-7">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-5 md:gap-7"
              >
                {/* Product image */}
                <div className="relative w-full mx-auto aspect-[3/4]">
                  <Image src={p.img} alt={p.name} fill
                    className="object-contain drop-shadow-2xl"
                    sizes="50vw"
                    priority />
                </div>

                {/* Text */}
                <div className="text-center">
                  <p className="text-[8px] font-mono tracking-[0.35em] uppercase mb-2"
                    style={{ color: p.color, opacity: 0.6 }}>knowing more.</p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    {p.name}<span style={{ color: "#C4682A" }}>.</span>
                  </h3>
                  <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-[#111111]/30 mb-3">
                    {p.tagline}
                  </p>
                  <p className="text-sm text-[#111111]/38 leading-relaxed max-w-[240px] mx-auto hidden md:block">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <a href="#products"
              className="group inline-flex items-center gap-2 text-xs font-medium tracking-wide border-b pb-0.5 transition-colors duration-200"
              style={{ color: p.color, borderColor: `${p.color}30` }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = p.color)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${p.color}30`)}
            >
              See products
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>

          {/* Next product - dimmed right */}
          <button
            onClick={() => { next(); reset(); }}
            className="group flex flex-col items-center gap-3 opacity-25 hover:opacity-50 transition-opacity duration-300 cursor-pointer"
            aria-label="Next product"
          >
            <div className="relative w-full mx-auto aspect-[3/4]">
              <Image
                src={products[(active + 1) % products.length].img}
                alt={products[(active + 1) % products.length].name}
                fill className="object-contain scale-90 group-hover:scale-95 transition-transform duration-500 drop-shadow-xl"
                sizes="20vw"
              />
            </div>
            <span className="text-[8px] font-mono tracking-[0.28em] uppercase text-[#111111]/50 hidden md:block">
              {products[(active + 1) % products.length].name}
            </span>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => { go(i); reset(); }}
              className="rounded-full transition-all duration-400"
              style={{
                width: i === active ? "22px" : "6px",
                height: "6px",
                background: i === active ? p.color : "rgba(17,17,17,0.12)",
              }}
              aria-label={`Go to ${products[i].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

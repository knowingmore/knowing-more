"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const trustSignals = [
  "30-day money-back guarantee",
  "No subscription required",
];

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="journal"
      className="relative py-24 md:py-36 bg-white overflow-hidden"
    >
      {/* Top/bottom section fades */}
      <div className="absolute top-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />
      <div className="absolute bottom-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />

      {/* Very subtle amber ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(232,146,10,0.05) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-[#111111]/[0.08] mb-16 md:mb-20 origin-left"
        />

        <div className="grid grid-cols-12 gap-y-12 md:gap-8 items-end">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.05, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-8"
          >
            <p className="text-[9px] font-mono text-[#C4682A] tracking-[0.38em] uppercase mb-7">
              07 &mdash; Start Today
            </p>
            <h2
              className="leading-[0.90] tracking-[-0.03em] text-[#111111]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(3rem, 8vw, 9rem)",
              }}
            >
              Start knowing
              <br />
              <span className="italic text-[#111111]/30">more today.</span>
            </h2>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col gap-4"
          >
            <a
              href="#products"
              className="group flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#111111] text-white text-sm font-semibold tracking-wide hover:bg-[#333] transition-colors duration-200"
            >
              Shop the Collection
              <span className="group-hover:translate-x-1.5 transition-transform duration-200 text-base">
                →
              </span>
            </a>
            <a
              href="#science"
              className="flex items-center justify-center px-7 py-4 rounded-full border border-[#111111]/15 text-[#111111]/50 text-sm font-medium hover:bg-[#111111]/5 hover:text-[#111111]/70 transition-all duration-200"
            >
              Read the Science
            </a>
          </motion.div>
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.5 }}
          className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          {trustSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-[#C4682A]" aria-hidden />
              <span className="text-xs text-[#111111]/30 tracking-wide">{signal}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-14 md:mt-20 pt-8 border-t border-[#111111]/[0.08] flex items-center justify-between"
        >
          <span className="text-[9px] font-mono text-[#111111]/20 tracking-[0.28em] uppercase">
            Knowing More &mdash; 2024
          </span>
          <span className="text-[9px] font-mono text-[#111111]/20 tracking-[0.28em] uppercase hidden md:inline">
            Made with precision. Backed by science.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

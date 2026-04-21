"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const TR = {
  en: {
    label: "Philosophy \u2014 01",
    h1: "Longevity", h1rest: " is not a trend.",
    sub: <>It is a long-term commitment<br />to building what is{" "}<em className="text-[#111111]/45">purposeful.</em></>,
    body: "We design supplements with the precision of a laboratory and the integrity of a brand built to exist in thirty years. Healthspan over lifespan. Every decision serves the long game.",
    pillars: [
      { label: "Purposeful", desc: "Every ingredient earns its place through peer-reviewed evidence, not marketing convenience." },
      { label: "Transparent", desc: "Full ingredient disclosure, exact doses. No proprietary blends. No hiding." },
      { label: "Long-form", desc: "Built for healthspan, not just lifespan. Progress measured in decades, not days." },
    ],
    brand: "Knowing More \u2014 Brand Statement",
  },
  pl: {
    label: "Filozofia \u2014 01",
    h1: "Longevity", h1rest: " to nie trend.",
    sub: <>To zobowiązanie wobec siebie —<br />dziś i za{" "}<em className="text-[#111111]/45">trzydzieści lat.</em></>,
    body: "Każdy suplement, który tworzymy, przechodzi badania naukowe i testy niezależnych laboratoriów. Nie skracamy procesu. Budujemy markę, która ma tu być za trzydzieści lat — tak jak Ty.",
    pillars: [
      { label: "Świadome", desc: "Każdy składnik ma naukowe uzasadnienie. Nie marketingowe opakowanie." },
      { label: "Przejrzyste", desc: "Pełny skład, dokładne dawki — żadnych tajemniczych mieszanek. Wiesz dokładnie, co bierzesz i dlaczego." },
      { label: "Na lata", desc: "Zdrowie to maraton, nie sprint. Nasze formuły są zaprojektowane z myślą o efektach, które budujesz latami." },
    ],
    brand: "Knowing More \u2014 Manifest marki",
  },
};

export default function Philosophy({ locale = "en" }: { locale?: "en" | "pl" }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animated amber rule that expands from left
  const lineScaleX = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);

  const tr = TR[locale];
  const pillars = tr.pillars;

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-44 bg-white overflow-hidden"
    >
      {/* Top/bottom section fades */}
      <div className="absolute top-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />
      <div className="absolute bottom-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />
      {/* Rotated section index - far left */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[9px] font-mono text-[#1A1A1A]/15 tracking-[0.35em] uppercase"
          style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
        >
          {tr.label}
        </motion.p>
      </div>

      <div className="max-w-[1440px] mx-auto px-12 md:px-20 xl:px-28">

        {/* Animated amber rule */}
        <div className="relative h-px bg-[#1A1A1A]/8 mb-14 md:mb-20 overflow-hidden">
          <motion.div
            style={{ scaleX: lineScaleX, transformOrigin: "left" }}
            className="absolute inset-0 bg-[#C4682A]"
          />
        </div>

        {/* Main headline block */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-10 md:col-start-2">

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="leading-[1.02] tracking-[-0.03em] text-[#111111]"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.4rem, 5.5vw, 6rem)",
                }}
              >
                <span style={{ color: "#C4682A" }}>{tr.h1}</span>{tr.h1rest}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="mt-5 md:mt-7 text-[#111111]/30 leading-[1.05] tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.6rem, 3.5vw, 3.8rem)",
                }}
              >
                {tr.sub}
              </p>
            </motion.div>

          </div>

          {/* Right column - sub copy, deliberately offset */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.45 }}
            className="col-span-12 md:col-span-3 md:col-start-10 mt-10 md:mt-0 md:self-end"
          >
            <p className="text-sm text-[#111111]/40 leading-relaxed">
              {tr.body}
            </p>
          </motion.div>
        </div>

        {/* Pillar row - three editorial cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#1A1A1A]/8"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 + i * 0.1 }}
              className={`pt-8 pb-4 pr-8 ${i < 2 ? "md:border-r border-[#1A1A1A]/8" : ""}`}
            >
              <p
                className="text-[9px] font-mono tracking-[0.32em] uppercase text-[#C4682A] mb-3"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="text-lg font-semibold text-[#111111] mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {p.label}
              </h3>
              <p className="text-sm text-[#111111]/40 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom rule with metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-12 md:mt-16 flex items-center justify-between pt-6 border-t border-[#1A1A1A]/8"
        >
          <span className="text-[9px] font-mono text-[#111111]/22 tracking-[0.28em] uppercase">
            {tr.brand}
          </span>
          <span className="text-[9px] font-mono text-[#111111]/22 tracking-[0.28em] uppercase">
            Est.&nbsp;2024
          </span>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TR = {
  en: {
    sectionLabel: "05 — Who this is for",
    headline: "Built for those who want to ",
    headlineItalic: "know more.",
    testimonials: [
      {
        profile: "For active lives",
        role: "Fitness, training, recovery",
        product: "Performance.",
        productColor: "#C4682A",
        quote:
          "I've tried countless pre-workout and recovery supplements. knowing more. Performance is the first where I noticed a measurable difference in recovery time. No jitters, no crash - just sustained energy and noticeably less DOMS.",
      },
      {
        profile: "For leaders",
        role: "Founders, executives, decision-makers",
        product: "Balance.",
        productColor: "#A0784A",
        quote:
          "Running a company means constant cortisol spikes. Balance has genuinely changed how I respond to stress. Two months in, sleep quality has improved dramatically and I feel less reactive in high-pressure situations.",
      },
      {
        profile: "For practitioners",
        role: "Health professionals, dietitians, doctors",
        product: "Gut Health.",
        productColor: "#C4682A",
        quote:
          "As a nutritionist, I was skeptical of another gut health product. But the formulation is genuinely impressive - no proprietary blends, clinical doses, the right strains. I now recommend it to clients alongside dietary changes.",
      },
      {
        profile: "For the conscious",
        role: "Longevity, biohacking, prevention",
        product: "Performance.",
        productColor: "#C4682A",
        quote:
          "The transparency is what sold me. Every ingredient, every dose, backed by a citation. In an industry full of marketing fluff, knowing more. actually delivers on what it promises.",
      },
    ],
    statsLabel: "What we measure",
    stats: [
      { label: "Energy & Focus" },
      { label: "Sleep Quality" },
      { label: "Overall Wellbeing" },
    ],
    disclaimer:
      "Profile examples are illustrative and represent the customer types these formulas are designed for. Verified customer opinions will appear once our products are available.",
  },
  pl: {
    sectionLabel: "05 — Dla kogo to jest",
    headline: "Dla tych, którzy chcą ",
    headlineItalic: "wiedzieć więcej.",
    testimonials: [
      {
        profile: "Dla aktywnych",
        role: "Trening, sport, regeneracja",
        product: "Performance.",
        productColor: "#C4682A",
        quote:
          "Testowałam wiele suplementów na regenerację. Performance to pierwszy, przy którym poczułam realną różnicę — mniej zakwasów, stabilna energia przez cały dzień. Żadnej nerwowości, żadnego zjazdu.",
      },
      {
        profile: "Dla liderów",
        role: "Założyciele, kadra zarządzająca, decyzyjni",
        product: "Balance.",
        productColor: "#A0784A",
        quote:
          "Zarządzanie firmą to ciągłe skoki kortyzolu. Balance naprawdę zmieniło to, jak reaguję na stres. Po dwóch miesiącach sypiam głębiej i jestem spokojniejszy w trudnych sytuacjach.",
      },
      {
        profile: "Dla specjalistów",
        role: "Specjaliści zdrowia, dietetycy, lekarze",
        product: "Gut Health.",
        productColor: "#C4682A",
        quote:
          "Jako dietetyczka podchodzę sceptycznie do kolejnych probiotyków. Ale tutaj skład naprawdę robi wrażenie — brak zastrzeżonych mieszanek, kliniczne dawki, odpowiednie szczepy. Polecam swoim klientom.",
      },
      {
        profile: "Dla świadomych",
        role: "Longevity, biohacking, profilaktyka",
        product: "Performance.",
        productColor: "#C4682A",
        quote:
          "Przekonała mnie przejrzystość — każdy składnik, każda dawka, poparte źródłem. W branży pełnej marketingowego szumu knowing more. faktycznie dostarcza to, co obiecuje.",
      },
    ],
    statsLabel: "Co mierzymy",
    stats: [
      { label: "Energia i skupienie" },
      { label: "Jakość snu" },
      { label: "Ogólne samopoczucie" },
    ],
    disclaimer:
      "Przykłady profili są ilustracyjne i przedstawiają typy klientów, dla których projektowane są nasze formuły. Zweryfikowane opinie klientów pojawią się po udostępnieniu produktów.",
  },
};

export default function Testimonials({ locale = "en" }: { locale?: "en" | "pl" }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const tr = TR[locale];
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + tr.testimonials.length) % tr.testimonials.length);
  const next = () => setActive((i) => (i + 1) % tr.testimonials.length);

  const t = tr.testimonials[active];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-36 bg-white overflow-hidden"
    >
      {/* Top/bottom section fades */}
      <div className="absolute top-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />
      <div className="absolute bottom-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
        >
          <p className="text-[9px] font-mono text-[#C4682A] tracking-[0.38em] uppercase mb-5">
            {tr.sectionLabel}
          </p>
          <h2
            className="leading-[0.92] tracking-[-0.03em] text-[#111111]"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
            }}
          >
            {tr.headline}
            <span className="italic text-[#111111]/30">{tr.headlineItalic}</span>
          </h2>
        </motion.div>

        {/* Profile block */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative"
        >
          {/* Large quote mark */}
          <div
            className="absolute -top-4 left-0 text-[6rem] leading-none select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "rgba(232,146,10,0.1)",
            }}
            aria-hidden
          >
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="grid grid-cols-12 gap-8 items-start"
            >
              {/* Quote text */}
              <div className="col-span-12 md:col-span-8 pt-8">
                <p
                  className="text-[#111111]/65 leading-[1.65] font-medium"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.1rem, 2.2vw, 1.75rem)",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Attribution — profile label + role + product */}
                <div className="mt-8 flex items-center gap-4">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: t.productColor }}
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#111111]">{t.profile}</p>
                    <p className="text-xs text-[#111111]/30 mt-0.5">
                      {t.role}
                      <span className="mx-2 text-[#111111]/15">·</span>
                      <span style={{ color: t.productColor }}>{t.product}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* What we measure (no fake percentages) */}
              <div className="col-span-12 md:col-span-3 md:col-start-10 mt-0 md:mt-8">
                <p className="text-[9px] font-mono text-[#111111]/40 tracking-[0.22em] uppercase mb-4">
                  {tr.statsLabel}
                </p>
                {tr.stats.map((s) => (
                  <div
                    key={s.label}
                    className="py-3 border-b border-[#111111]/[0.07] last:border-0"
                  >
                    <p className="text-sm text-[#111111]/70 font-medium">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-12 md:mt-14 flex items-center gap-5 border-t border-[#111111]/[0.07] pt-8"
        >
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-[#111111]/12 flex items-center justify-center text-[#111111]/35 hover:text-[#111111] hover:border-[#111111]/30 transition-all duration-200"
          >
            <ChevronLeft size={17} strokeWidth={1.5} />
          </button>

          <div className="flex gap-1.5">
            {tr.testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "20px" : "6px",
                  height: "6px",
                  background: i === active ? "#C4682A" : "rgba(17,17,17,0.15)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-[#111111]/12 flex items-center justify-center text-[#111111]/35 hover:text-[#111111] hover:border-[#111111]/30 transition-all duration-200"
          >
            <ChevronRight size={17} strokeWidth={1.5} />
          </button>

          <span className="ml-auto text-[9px] font-mono text-[#111111]/22 tracking-[0.25em] uppercase hidden md:inline">
            {String(active + 1).padStart(2, "0")} / {String(tr.testimonials.length).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-10 max-w-[640px] text-[10px] font-mono text-[#111111]/35 tracking-[0.04em] leading-[1.7]">
          {tr.disclaimer}
        </p>
      </div>
    </section>
  );
}

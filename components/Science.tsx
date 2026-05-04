"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const TR = {
  en: {
    stats: [
      { value: "47+",  label: "Active Ingredients",  sub: "across all three formulas" },
      { value: "12",   label: "Scientific Studies",   sub: "peer-reviewed basis" },
      { value: "100%", label: "Third-Party Tested",   sub: "every batch, before shipment" },
      { value: "0",    label: "Unnecessary Fillers",  sub: "no proprietary blends" },
    ],
    points: [
      "Clinically-effective doses - no fairy dusting",
      "Full label transparency. Every ingredient disclosed.",
      "Third-party tested for purity and potency",
      "Free from fillers, artificial colours, and excipients",
    ],
    sectionLabel: "03 \u2014 Our science",
    headlineLine1: "Not just knowing",
    headlineLine2: "the ingredients -",
    headlineLine3: "knowing ",
    headlineAccent: "why.",
    body: "Every ingredient in our formulas is backed by peer-reviewed research, dosed at clinically effective levels, and manufactured in GMP-certified facilities. We don\u2019t hide behind proprietary blends - you see exactly what you\u2019re getting, and why.",
    link: "Read the full science brief",
    badgeTitle: "GMP",
    badgeSub: "Certified Facility",
  },
  pl: {
    stats: [
      { value: "47+",  label: "Aktywne sk\u0142adniki",      sub: "we wszystkich trzech formu\u0142ach" },
      { value: "12",   label: "Badania naukowe",           sub: "przebadane klinicznie" },
      { value: "100%", label: "Testowane niezale\u017cnie", sub: "ka\u017cda partia, przed wysy\u0142k\u0105" },
      { value: "0",    label: "Zb\u0119dnych wype\u0142niaczy", sub: "pe\u0142na przejrzysto\u015b\u0107 sk\u0142adu" },
    ],
    points: [
      "Dawki kliniczne \u2014 dok\u0142adnie tyle, ile wynika z bada\u0144",
      "Pe\u0142ny sk\u0142ad na etykiecie. \u017badnych tajemniczych mieszanek.",
      "Niezale\u017cnie testowane \u2014 czysto\u015b\u0107 i st\u0119\u017cenie potwierdzone",
      "Bez wype\u0142niaczy, sztucznych barwnik\u00f3w i zb\u0119dnych dodatk\u00f3w",
    ],
    sectionLabel: "03 \u2014 Nasza nauka",
    headlineLine1: "Twój poziom energii spada",
    headlineLine2: "powoli między 25 a 60.",
    headlineLine3: "Możesz z tym zrobić ",
    headlineAccent: "więcej.",
    body: "Ka\u017cdy sk\u0142adnik w naszych formu\u0142ach ma naukowe uzasadnienie i klinicznie skuteczn\u0105 dawk\u0119. Produkujemy w certyfikowanych zak\u0142adach GMP, a ka\u017cd\u0105 parti\u0119 sprawdzaj\u0105 niezale\u017cne laboratoria. \u017badnych tajemnic \u2014 wiesz dok\u0142adnie, co bierzesz.",
    link: "Poznaj nasz\u0105 metodologi\u0119",
    badgeTitle: "GMP",
    badgeSub: "Certyfikowany zak\u0142ad",
  },
};

export default function Science({ locale = "en" }: { locale?: "en" | "pl" }) {
  const tr = TR[locale];
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="science"
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
    >
      {/* Top/bottom section fades */}
      <div className="absolute top-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />
      <div className="absolute bottom-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />

      {/* ─── Stats bar ────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#111111]/[0.08] divide-x divide-[#111111]/[0.08] rounded-2xl overflow-hidden bg-white">
          {tr.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.08 }}
              className="px-6 py-8 md:px-8 md:py-10 border-b border-[#111111]/[0.07] md:border-b-0"
            >
              <p
                className="leading-none tracking-[-0.04em] text-[#111111] font-bold"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.8rem, 6vw, 6rem)",
                }}
              >
                {s.value}
              </p>
              <p className="mt-2 text-[10px] font-semibold tracking-[0.22em] uppercase text-[#C4682A]">
                {s.label}
              </p>
              <p className="mt-1 text-xs text-[#111111]/30 leading-snug">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Main split layout ───────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 pb-24 md:pb-32">
        <div className="grid grid-cols-12 gap-8 items-start">

          {/* Left - image collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-[500px]">
              <Image
                src="/images/website/model-collarbone.jpg"
                alt="knowing more. - beauty editorial"
                fill
                className="object-cover"
                sizes="500px"
              />
              {/* Fade to white at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
            </div>

            {/* Floating secondary image */}
            <motion.div
              initial={{ opacity: 0, y: 28, x: 18 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.85 }}
              className="absolute bottom-[-28px] right-[-8px] md:right-[-32px] w-[52%] rounded-2xl overflow-hidden shadow-xl aspect-square"
            >
              <Image
                src="/images/website/lab-vial.jpg"
                alt="Science - lab research"
                fill
                className="object-cover object-center"
                sizes="260px"
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="absolute top-5 right-[-8px] md:right-[-24px] bg-white border border-[#111111]/10 rounded-2xl px-5 py-4 shadow-lg"
            >
              <p
                className="text-[#C4682A] text-xl font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {tr.badgeTitle}
              </p>
              <p className="text-[#111111]/45 text-[10px] font-medium mt-0.5 tracking-[0.15em] uppercase">
                {tr.badgeSub}
              </p>
            </motion.div>
          </motion.div>

          {/* Right - editorial text */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-5 md:col-start-8 mt-12 md:mt-0"
          >
            <p className="text-[9px] font-mono text-[#C4682A] tracking-[0.38em] uppercase mb-6">
              {tr.sectionLabel}
            </p>

            <h2
              className="leading-[0.92] tracking-[-0.03em] text-[#111111]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
              }}
            >
              {tr.headlineLine1}
              <br />
              {tr.headlineLine2}
              <br />
              {tr.headlineLine3}
              <span style={{ color: "#C4682A" }}>{tr.headlineAccent}</span>
            </h2>

            <p className="mt-6 text-sm text-[#111111]/40 leading-[1.78] max-w-[420px]">
              {tr.body}
            </p>

            <ul className="mt-9 space-y-4">
              {tr.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.09, duration: 0.5 }}
                  className="flex items-start gap-3 text-sm text-[#111111]/45"
                >
                  <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0 bg-[#C4682A]" />
                  {point}
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.55 }}
              className="mt-10"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-2.5 text-sm font-medium text-[#111111]/40 border-b border-[#111111]/12 pb-0.5 hover:text-[#111111] hover:border-[#111111]/40 transition-colors duration-200"
              >
                {tr.link}
                <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

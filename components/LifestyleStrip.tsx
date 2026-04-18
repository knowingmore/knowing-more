"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
      { src: "/images/website/lifestyle-man-kitchen.jpg",          caption: "Performance — dzień 14",           label: "Wyniki"    },
      { src: "/images/website/lifestyle-woman-meditation.jpg",     caption: "Balance — poranny rytuał",         label: "Balans"    },
      { src: "/images/website/lifestyle-gut-health-bowl.jpg",      caption: "Gut Health — dzień 21",            label: "Witalność" },
      { src: "/images/website/lifestyle-mature-woman-products.jpg",caption: "Pełny zestaw — 90-dniowy zapas",   label: "Longevity" },
      { src: "/images/website/lifestyle-morning-ritual.jpg",       caption: "Performance — poranny rytuał",     label: "Rytuał"    },
      { src: "/images/website/lifestyle-products-desk.jpg",        caption: "Performance + Balance — każdy dzień", label: "Skupienie" },
    ],
  },
};

export default function LifestyleStrip({ locale = "en" }: { locale?: "en" | "pl" }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const tr = TR[locale];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle horizontal parallax on the strip
  const stripX = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-white overflow-hidden"
    >
      {/* Top/bottom section fades */}
      <div className="absolute top-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />
      <div className="absolute bottom-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.7) 65%, transparent 100%)" }} aria-hidden />
      {/* Section label */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 mb-12 md:mb-16">
        <div className="grid grid-cols-12 gap-4 items-end">

          {/* Left - large statement */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-8"
          >
            <p className="text-[9px] font-mono text-[#E8920A] tracking-[0.38em] uppercase mb-5">
              {tr.sectionLabel}
            </p>
            <h2
              className="leading-[0.94] tracking-[-0.03em] text-[#111111]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.2rem, 4.8vw, 5rem)",
              }}
            >
              {tr.headline}<br />
              <span className="text-[#111111]/30 italic">{tr.headlineItalic}</span>
            </h2>
          </motion.div>

          {/* Right - small descriptor */}
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

      {/* Image strip - parallax horizontal */}
      <div className="overflow-hidden">
        <motion.div
          ref={stripRef}
          style={{ x: stripX }}
          className="flex gap-4 pl-6 md:pl-12 xl:pl-16 pr-[18%] pb-2"
        >
          {tr.images.map((img, i) => (
            <motion.div
              key={img.src + img.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.35 } }}
              className="relative flex-shrink-0 rounded-xl overflow-hidden group cursor-pointer"
              style={{
                width: "clamp(240px, 28vw, 360px)",
                height: "clamp(300px, 36vw, 460px)",
              }}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="360px"
              />

              {/* Dark scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              {/* Label tag - top */}
              <div className="absolute top-4 left-4">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/50 bg-black/30 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/15">
                  {img.label}
                </span>
              </div>

              {/* Clinical caption - bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[10px] font-mono text-white/45 tracking-[0.15em]">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 mt-12 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-[#111111]/22 tracking-[0.28em] uppercase">
            {tr.reviewScore}
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-[#E8920A] text-[10px]">★</span>
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

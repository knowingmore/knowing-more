"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pillars = [
  {
    index: "01",
    title: "Evidence-based formulation",
    body: "Every ingredient in every formula is selected based on peer-reviewed clinical research. We don't include ingredients because they're trending - we include them because the evidence is compelling, consistent, and reproducible.",
    img: "/images/website/lab-scientists.jpg",
  },
  {
    index: "02",
    title: "Clinical dosing - no exceptions",
    body: "Proprietary blends exist to hide underdosing. We publish every ingredient and every dose, matched to the quantities used in the clinical studies we cite. Sub-effective doses are not a formula - they're marketing.",
    img: "/images/website/products-marble-2.jpg",
  },
  {
    index: "03",
    title: "GMP manufacturing",
    body: "All formulas are manufactured in GMP-certified facilities subject to independent audit. Every batch is tested for identity, purity, potency, and the absence of contaminants before it leaves the facility.",
    img: "/images/website/lab-room.jpg",
  },
  {
    index: "04",
    title: "Third-party verification",
    body: "Manufacturing claims are not enough. Each batch undergoes independent third-party laboratory testing. Results are available. We don't ask you to trust us - we give you the data.",
    img: "/images/website/lifestyle-silver-woman.jpg",
  },
];

const stats = [
  { value: "47+", label: "Active ingredients", sub: "across all three formulas" },
  { value: "12",  label: "Clinical studies",   sub: "as the evidence basis" },
  { value: "0",   label: "Proprietary blends", sub: "full label, always" },
  { value: "100%", label: "Third-party tested", sub: "every batch" },
];

function PillarBlock({ p, i }: { p: typeof pillars[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const flip = i % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-20 items-center py-20 border-b border-[#111111]/[0.07] last:border-0 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className={flip ? "md:order-2" : ""}>
        <p className="text-[9px] font-mono tracking-[0.38em] uppercase text-[#1B2A4A]/70 mb-5">{p.index}</p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-5 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}>
          {p.title}<span style={{ color: "#1B2A4A" }}>.</span>
        </h2>
        <p className="text-sm text-[#111111]/45 leading-[1.9]">{p.body}</p>
      </div>
      <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${flip ? "md:order-1" : ""}`}>
        <Image src={p.img} alt={p.title} fill className="object-cover" sizes="600px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </motion.div>
  );
}

export default function MethodsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,146,10,0.06) 0%, transparent 55%)" }}
          aria-hidden />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#1B2A4A] mb-6">
            Our Methods - How We Build
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, filter: "blur(22px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="leading-[0.88] tracking-[-0.03em] text-[#111111] mb-8"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 7vw, 7.5rem)" }}
          >
            Science-led.<br />
            <span className="text-[#111111]/25 italic">Evidence-based.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-sm text-[#111111]/40 leading-[1.85] max-w-[480px] mb-16">
            Most supplement brands start with marketing and work backwards. We start with the clinical literature and build forwards. The result is a formulation process that prioritises efficacy over elegance - though we won&apos;t compromise on either.
          </motion.p>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#111111]/[0.08] rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <div key={s.label}
                className="px-6 py-8 border-b border-r border-[#111111]/[0.07] last:border-r-0 md:border-b-0">
                <p className="text-4xl font-bold text-[#111111] tracking-[-0.03em] leading-none"
                  style={{ fontFamily: "var(--font-playfair)" }}>{s.value}</p>
                <p className="mt-2 text-[9px] font-mono tracking-[0.22em] uppercase text-[#1B2A4A]">{s.label}</p>
                <p className="mt-1 text-xs text-[#111111]/28 leading-snug">{s.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-[#111111]/[0.07]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          {pillars.map((p, i) => <PillarBlock key={p.index} p={p} i={i} />)}
        </div>
      </section>

      {/* Quote section */}
      <section className="relative h-[50vh] overflow-hidden"
        style={{ background: "linear-gradient(135deg, #F5F1EB 0%, #EDE5D8 50%, #E8DDD0 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(232,146,10,0.04) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
          aria-hidden />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#1B2A4A] mb-4">The Standard</p>
            <p className="text-2xl md:text-3xl font-bold text-[#111111] tracking-[-0.02em] max-w-[500px]"
              style={{ fontFamily: "var(--font-playfair)" }}>
              &ldquo;If it&apos;s not in the science,<br />it&apos;s not in the formula.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

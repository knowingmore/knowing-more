"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

/* ─── Purchase button ────────────────────────────────────────────── */
function PurchaseButton({ slug }: { color: string; slug: string }) {
  return (
    <Link href={`/store/${slug}`}
      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wide transition-all duration-200 hover:bg-[#333] active:scale-[0.98]"
    >
      Notify me
      <span>→</span>
    </Link>
  );
}

/* ─── Product card ───────────────────────────────────────────────── */
function ProductCard({ p, index }: { p: typeof products[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/store/${p.slug}`} className="group block">
        {/* Image container */}
        <div
          className="relative overflow-hidden rounded-2xl mb-6 cursor-pointer"
          style={{ aspectRatio: "3/4", background: "#FAFAFA" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{ background: `radial-gradient(ellipse at 50% 70%, ${p.glow} 0%, transparent 65%)`,
              opacity: hovered ? 1 : 0.4 }} aria-hidden />

          {/* Product bottle */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[58%] h-[58%]">
              <Image src={p.img} alt={p.name} fill
                className="object-contain drop-shadow-lg"
                sizes="(max-width: 768px) 50vw, 20vw" />
            </div>
          </motion.div>

          {/* Lifestyle hover */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 1.06 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image src={p.hoverImg} alt={`${p.name} lifestyle`} fill
              className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white/50 text-[9px] font-mono tracking-[0.25em] uppercase mb-1">{p.tagline}</p>
              <p className="text-white text-sm leading-snug max-w-[220px]">{p.description}</p>
            </div>
          </motion.div>


          {/* Arrow hint */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
          >
            <span className="text-white text-sm">→</span>
          </motion.div>
        </div>
      </Link>

      {/* Card footer */}
      <div className="mb-4">
        <Link href={`/store/${p.slug}`}>
          <h3 className="text-xl font-bold tracking-[-0.02em] text-[#111111] hover:text-[#E8920A] transition-colors duration-300"
            style={{ fontFamily: "var(--font-playfair)" }}>
            {p.name}<span style={{ color: "#E8920A" }}>.</span>
          </h3>
        </Link>
        <p className="mt-1 text-[9px] font-mono tracking-[0.22em] uppercase text-[#111111]/30">{p.tagline}</p>
        <p className="mt-2 text-base font-semibold text-[#111111] tracking-[-0.01em]">{p.price}</p>
      </div>

      <PurchaseButton color={p.color} slug={p.slug} />
    </motion.div>
  );
}

/* ─── Store page ─────────────────────────────────────────────────── */
export default function StorePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-36 pb-24 px-6 md:px-12 xl:px-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,146,10,0.06) 0%, transparent 60%)" }}
          aria-hidden />

        <div className="max-w-[1440px] mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#E8920A] mb-6">
            The Collection
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            <motion.h1
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="leading-[0.9] tracking-[-0.03em] text-[#111111]"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 7vw, 7rem)" }}
            >
              Three formulas.<br />
              <span className="text-[#111111]/25 italic">Built for the long game.</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-[300px]">
              <p className="text-sm text-[#111111]/38 leading-relaxed">
                Each formula addresses a distinct pillar of longevity.
                Designed to work independently, optimised to work together.
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-[#111111]/[0.08] origin-left mb-16" />

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {products.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
          </div>

          {/* Bundle */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 p-8 rounded-2xl border border-[#111111]/[0.07] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-16 flex-shrink-0">
                <Image src="/images/products/all-three.png" alt="All three" fill className="object-contain" />
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-[0.28em] uppercase text-[#E8920A] mb-1">Complete System</p>
                <h3 className="text-lg font-bold text-[#111111] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-playfair)" }}>
                  All three formulas. <span className="text-[#111111]/30 font-normal italic">Built for the long game.</span>
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#111111]/28 line-through">387,00 zł</span>
                  <span className="text-sm font-semibold text-[#111111]">329,00 zł</span>
                  <span className="text-[8px] font-mono text-[#E8920A] bg-[#E8920A]/10 px-2 py-0.5 rounded-full">Save 15%</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-2 w-full md:w-auto">
              <PurchaseButton color="#111111" slug="bundle" />
              <span className="text-[8px] font-mono text-[#111111]/25 tracking-[0.15em] uppercase">Bundle - 3 products</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

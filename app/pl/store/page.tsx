"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { productsPL } from "@/lib/productsPL";

function PurchaseButton({ slug }: { color: string; slug: string }) {
  return (
    <Link href={`/pl/store/${slug}`}
      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wide transition-all duration-200 hover:bg-[#333] active:scale-[0.98]"
    >
      Powiadom mnie
      <span>→</span>
    </Link>
  );
}

function ProductCard({ p, index }: { p: typeof productsPL[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/pl/store/${p.slug}`} className="group block">
        <div
          className="relative overflow-hidden rounded-2xl mb-6 cursor-pointer"
          style={{ aspectRatio: "3/4", background: "#FAFAFA" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{ background: `radial-gradient(ellipse at 50% 70%, ${p.glow} 0%, transparent 65%)`,
              opacity: hovered ? 1 : 0.4 }} aria-hidden />

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

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
          >
            <span className="text-white text-sm">→</span>
          </motion.div>
        </div>
      </Link>

      <div className="mb-4">
        <Link href={`/pl/store/${p.slug}`}>
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

export default function StorePL() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar locale="pl" />

      <section className="relative pt-36 pb-24 px-6 md:px-12 xl:px-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,146,10,0.06) 0%, transparent 60%)" }}
          aria-hidden />

        <div className="max-w-[1440px] mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#E8920A] mb-6">
            Kolekcja
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            <motion.h1
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="leading-[0.9] tracking-[-0.03em] text-[#111111]"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 7vw, 7rem)" }}
            >
              Trzy formuły.<br />
              <span className="text-[#111111]/25 italic">Z myślą o przyszłości.</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-[300px]">
              <p className="text-sm text-[#111111]/38 leading-relaxed">
                Każda formuła działa samodzielnie. Razem tworzą kompletny system longevity.
              </p>
            </motion.div>
          </div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-[#111111]/[0.08] origin-left mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {productsPL.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 p-8 rounded-2xl border border-[#111111]/[0.07] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-16 flex-shrink-0">
                <Image src="/images/products/all-three.png" alt="Wszystkie trzy" fill className="object-contain" />
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-[0.28em] uppercase text-[#E8920A] mb-1">Pełny system</p>
                <h3 className="text-lg font-bold text-[#111111] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-playfair)" }}>
                  Wszystkie trzy formuły. <span className="text-[#111111]/30 font-normal italic">Stworzone na długą grę.</span>
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#111111]/28 line-through">387,00 zł</span>
                  <span className="text-sm font-semibold text-[#111111]">329,00 zł</span>
                  <span className="text-[8px] font-mono text-[#E8920A] bg-[#E8920A]/10 px-2 py-0.5 rounded-full">Zaoszczędź 15%</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-2 w-full md:w-auto">
              <Link href="/pl/store/bundle"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white text-xs font-semibold tracking-wide bg-[#111111] hover:opacity-90">
                Kup zestaw →
              </Link>
              <span className="text-[8px] font-mono text-[#111111]/25 tracking-[0.15em] uppercase">Zestaw — 3 produkty</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer locale="pl" />
    </main>
  );
}

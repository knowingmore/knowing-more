"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

/* ─── Notify form ─────────────────────────────────────────────────── */
function BundleNotifyForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-8 rounded-2xl border border-[#C4682A]/20 bg-[#C4682A]/5"
      >
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          className="w-12 h-12 rounded-full bg-[#C4682A] flex items-center justify-center text-white text-xl"
        >
          ✓
        </motion.div>
        <p className="text-base font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
          You&apos;re on the list.
        </p>
        <p className="text-sm text-[#111111]/38 text-center max-w-[260px]">
          We&apos;ll notify you the moment the Complete System is back in stock.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full space-y-3">
      {/* Save block */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C4682A 0%, #d4780a 100%)" }}>
        <div className="px-6 pt-6 pb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-[10px] font-mono tracking-[0.22em] uppercase mb-1">Restock offer</p>
            <p className="text-white font-bold tracking-[-0.02em] leading-none"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem" }}>
              Save 58 zł
            </p>
            <p className="text-white/75 text-xs mt-1.5 leading-snug max-w-[220px]">
              Join the restock list and secure the bundle price when it&apos;s available again.
            </p>
          </div>
          <div className="text-white/15 font-bold flex-shrink-0 hidden sm:block"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "4rem", lineHeight: 1 }}>
            −15%
          </div>
        </div>
        <form onSubmit={submit} className="px-4 pb-4 flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 px-4 py-3 rounded-full text-sm bg-white/20 backdrop-blur-sm text-white placeholder-white/50 outline-none focus:bg-white/30 transition-colors border border-white/20"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-white text-[#111111] text-sm font-semibold flex-shrink-0 transition-all hover:bg-white/90 hover:scale-[1.02]"
          >
            Join waitlist
          </button>
        </form>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-2 pl-1">
        <div className="flex -space-x-1.5">
          {["SM", "JT", "PK", "ML"].map((i) => (
            <div key={i} className="w-5 h-5 rounded-full border border-white bg-[#555] text-[7px] flex items-center justify-center font-bold text-white"
              style={{ opacity: 0.7 }}>{i[0]}</div>
          ))}
        </div>
        <span className="text-[9px] text-[#111111]/30 tracking-wide">847 people waiting for restock</span>
      </div>
    </div>
  );
}

/* ─── Bundle page ─────────────────────────────────────────────────── */
export default function BundlePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 30%, rgba(232,146,10,0.07) 0%, transparent 60%)" }}
          aria-hidden />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">

          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-12 text-[9px] font-mono tracking-[0.22em] uppercase text-[#111111]/30">
            <Link href="/" className="hover:text-[#111111]/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/store" className="hover:text-[#111111]/60 transition-colors">Store</Link>
            <span>/</span>
            <span className="text-[#C4682A]/70">Complete System</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* ── Left: product images ── */}
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(16px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-28"
            >
              {/* All-three hero image */}
              <div className="relative rounded-2xl overflow-hidden bg-[#FAFAFA]" style={{ aspectRatio: "4/5" }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(232,146,10,0.08) 0%, transparent 60%)" }}
                  aria-hidden />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[75%] h-[60%]">
                    <Image src="/images/products/all-three.png" alt="Complete System" fill
                      className="object-contain drop-shadow-2xl" priority sizes="600px" />
                  </div>
                </div>
              </div>

              {/* Individual product cards below */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {products.map((p) => (
                  <Link key={p.slug} href={`/store/${p.slug}`}
                    className="group relative rounded-xl overflow-hidden bg-[#F5F5F5] aspect-square flex items-center justify-center hover:bg-[#F0F0F0] transition-colors duration-200">
                    <div className="relative w-[65%] h-[65%]">
                      <Image src={p.img} alt={p.name} fill className="object-contain drop-shadow-md" sizes="120px" />
                    </div>
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-[#111111]/35">
                        {p.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* ── Right: details ── */}
            <motion.div
              initial={{ opacity: 0, x: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[9px] font-mono tracking-[0.4em] uppercase mb-4 text-[#C4682A]/70">
                Complete System
              </p>

              <h1 className="leading-[0.88] tracking-[-0.03em] text-[#111111] mb-3"
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.8rem, 5vw, 5rem)" }}>
                All three formulas<span style={{ color: "#C4682A" }}>.</span>
              </h1>

              <p className="text-[9px] font-mono tracking-[0.28em] uppercase text-[#111111]/30 mb-6">
                Performance · Balance · Gut Health
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-[#C4682A] text-xs">★</span>)}
                </div>
                <span className="text-[9px] font-mono text-[#111111]/28 tracking-[0.15em]">
                  4.9 / 5.0 · 1,200+ reviews
                </span>
              </div>

              <div className="h-px bg-[#111111]/[0.07] mb-8" />

              {/* Price */}
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-3xl font-bold text-[#111111] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-playfair)" }}>329,00 zł</span>
                <span className="text-xs text-[#111111]/30 line-through">387,00 zł</span>
                <span className="text-[9px] font-mono bg-[#C4682A]/10 text-[#C4682A] px-2.5 py-1 rounded-full tracking-[0.15em] uppercase">
                  Save 15%
                </span>
              </div>
              <div className="mb-6">
                <span className="text-[9px] font-mono bg-[#111111]/06 text-[#111111]/40 px-2.5 py-1 rounded-full tracking-[0.15em] uppercase">
                  Sold out
                </span>
              </div>

              <p className="text-[9px] font-mono text-[#111111]/25 tracking-[0.15em] mb-8">
                3 × 60 capsules / 30 servings each
              </p>

              <p className="text-sm text-[#111111]/55 leading-[1.85] mb-8">
                The Complete System combines all three knowing more. formulas into a single, cohesive longevity protocol. Performance supports mitochondrial energy and recovery. Balance regulates cortisol rhythm and sleep architecture. Gut Health restores microbiome diversity and barrier integrity. Designed to work independently, optimised to work together - each formula addresses a distinct pillar of longevity that compounds over time.
              </p>

              {/* What's included */}
              <div className="mb-8 space-y-4">
                {products.map((p, i) => (
                  <motion.div key={p.slug}
                    initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-[#111111]/[0.07]">
                    <div className="relative w-10 h-12 flex-shrink-0">
                      <Image src={p.img} alt={p.name} fill className="object-contain" sizes="40px" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#111111] tracking-[-0.01em]"
                        style={{ fontFamily: "var(--font-playfair)" }}>
                        {p.name}<span style={{ color: "#C4682A" }}>.</span>
                      </h3>
                      <p className="text-[9px] font-mono tracking-[0.18em] uppercase mt-0.5 mb-1"
                        style={{ color: p.color, opacity: 0.7 }}>{p.tagline}</p>
                      <p className="text-xs text-[#111111]/40 leading-relaxed">{p.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="h-px bg-[#111111]/[0.07] mb-8" />

              <BundleNotifyForm />

              {/* Trust */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                {["Free shipping", "30-day money-back guarantee", "GMP certified"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#C4682A]" />
                    <span className="text-[10px] text-[#111111]/30 tracking-wide">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

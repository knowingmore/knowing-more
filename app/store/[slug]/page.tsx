"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProduct, products } from "@/lib/products";

/* ─── Notify Me form ─────────────────────────────────────────────── */
function NotifyForm({ color }: { color: string }) {
  const [email, setEmail]   = useState("");
  const [done, setDone]     = useState(false);

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
        className="w-full flex flex-col items-center gap-3 py-6 rounded-2xl border border-[#E8920A]/20 bg-[#E8920A]/5"
      >
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          className="w-10 h-10 rounded-full bg-[#E8920A] flex items-center justify-center text-white text-lg"
        >
          ✓
        </motion.div>
        <p className="text-sm font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
          You&apos;re on the list.
        </p>
        <p className="text-xs text-[#111111]/38 text-center max-w-[220px]">
          We&apos;ll notify you the moment this formula is back in stock.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full space-y-3">

      {/* Save 20 zł - dominant hero block */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #E8920A 0%, #d4780a 100%)" }}>
        <div className="px-5 pt-5 pb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-[10px] font-mono tracking-[0.22em] uppercase mb-1">Restock offer</p>
            <p className="text-white font-bold tracking-[-0.02em] leading-none"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem" }}>
              Save 20 zł
            </p>
            <p className="text-white/75 text-xs mt-1.5 leading-snug max-w-[200px]">
              Be first to know when it&apos;s back - and get it cheaper.
            </p>
          </div>
          <div className="text-white/20 font-bold tracking-tight flex-shrink-0 hidden sm:block"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "4rem", lineHeight: 1 }}>
            −20
          </div>
        </div>

        {/* Form inside the banner */}
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
            className="px-5 py-3 rounded-full bg-white text-sm font-semibold flex-shrink-0 transition-all hover:bg-white/90 hover:scale-[1.02]"
            style={{ color: color === "#111111" ? "#111111" : color }}
          >
            Join waitlist
          </button>
        </form>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-2 pl-1">
        <div className="flex -space-x-1.5">
          {["SM", "JT", "PK", "ML"].map((i) => (
            <div key={i} className="w-5 h-5 rounded-full border border-white text-[7px] flex items-center justify-center font-bold text-white"
              style={{ background: color === "#111111" ? "#555" : color, opacity: 0.7 }}>{i[0]}</div>
          ))}
        </div>
        <span className="text-[9px] text-[#111111]/30 tracking-wide">
          847 people waiting for restock
        </span>
      </div>
    </div>
  );
}

/* ─── Product page ───────────────────────────────────────────────── */
export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const p = getProduct(slug);
  if (!p) return null;

  const [imgHovered, setImgHovered] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const imgs = [p.img, ...p.gallery];
  const others = products.filter((x) => x.slug !== p.slug);

  const prevImg = () => setActiveImg((i) => (i - 1 + imgs.length) % imgs.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % imgs.length);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── Main ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 60% 40%, ${p.glow} 0%, transparent 60%)` }}
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
            <span style={{ color: p.color, opacity: 0.7 }}>{p.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* ── Left: Images ── */}
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(16px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-28"
            >
              <div
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: "4/5", background: "#FAFAFA" }}
                onMouseEnter={() => setImgHovered(true)}
                onMouseLeave={() => setImgHovered(false)}
              >
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 60%, ${p.glow} 0%, transparent 60%)` }}
                  aria-hidden />

                <AnimatePresence mode="wait">
                  {activeImg === 0 ? (
                    <motion.div key="product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }} className="absolute inset-0">
                      {/* Bottle */}
                      <motion.div animate={{ opacity: imgHovered ? 0 : 1, scale: imgHovered ? 1.03 : 1 }}
                        transition={{ duration: 0.5 }} className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-[62%] h-[62%]">
                          <Image src={p.img} alt={p.name} fill
                            className="object-contain drop-shadow-2xl" priority sizes="300px" />
                        </div>
                      </motion.div>
                      {/* Lifestyle hover */}
                      <motion.div animate={{ opacity: imgHovered ? 1 : 0, scale: imgHovered ? 1 : 1.04 }}
                        transition={{ duration: 0.55 }} className="absolute inset-0">
                        <Image src={p.hoverImg} alt={`${p.name} in use`} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                          <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/60">{p.tagline}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div key={`img-${activeImg}`} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                      <Image
                        src={imgs[activeImg]}
                        alt={p.name}
                        fill
                        className="object-cover"
                        style={{ objectPosition: ["authentic-3", "gut-dynamic-13", "gut-dynamic-10"].some(s => imgs[activeImg].includes(s)) ? "right center" : "center" }}
                        sizes="600px"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Gallery navigation - arrows + dots */}
              <div className="mt-4 flex items-center justify-between gap-4 px-1">
                <button
                  onClick={prevImg}
                  className="w-9 h-9 rounded-full border border-[#111111]/12 bg-white flex items-center justify-center text-[#111111]/40 hover:text-[#111111] hover:border-[#111111]/30 transition-all duration-200 flex-shrink-0"
                  aria-label="Previous image"
                >
                  ←
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-2 flex-1 justify-center">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeImg ? "20px" : "6px",
                        height: "6px",
                        background: i === activeImg
                          ? (p.color === "#111111" ? "#E8920A" : p.color)
                          : "rgba(17,17,17,0.15)",
                      }}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextImg}
                  className="w-9 h-9 rounded-full border border-[#111111]/12 bg-white flex items-center justify-center text-[#111111]/40 hover:text-[#111111] hover:border-[#111111]/30 transition-all duration-200 flex-shrink-0"
                  aria-label="Next image"
                >
                  →
                </button>
              </div>
            </motion.div>

            {/* ── Right: Details ── */}
            <motion.div
              initial={{ opacity: 0, x: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[9px] font-mono tracking-[0.4em] uppercase mb-4 text-[#E8920A]/70">
                Longevity Formula
              </p>

              <h1 className="leading-[0.88] tracking-[-0.03em] text-[#111111] mb-3"
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.8rem, 5vw, 5rem)" }}>
                {p.name}<span style={{ color: "#E8920A" }}>.</span>
              </h1>

              <p className="text-[9px] font-mono tracking-[0.28em] uppercase text-[#111111]/30 mb-6">{p.tagline}</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-[#E8920A] text-xs">★</span>)}
                </div>
                <span className="text-[9px] font-mono text-[#111111]/28 tracking-[0.15em]">
                  4.9 / 5.0 · 1,200+ reviews
                </span>
              </div>

              <div className="h-px bg-[#111111]/[0.07] mb-8" />

              {/* Price */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="text-3xl font-bold text-[#111111] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-playfair)" }}>{p.price}</span>
                <span className="text-[9px] font-mono bg-[#111111]/06 text-[#111111]/40 px-2.5 py-1 rounded-full tracking-[0.15em] uppercase">
                  Currently sold out
                </span>
              </div>

              <p className="text-[9px] font-mono text-[#111111]/25 tracking-[0.15em] mb-8">{p.servings}</p>

              <p className="text-sm text-[#111111]/55 leading-[1.85] mb-6">{p.longDescription}</p>

              {/* Benefits */}
              <ul className="mb-8 space-y-3">
                {p.benefits.map((b, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                    className="flex items-start gap-3 text-sm text-[#111111]/48">
                    <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    {b}
                  </motion.li>
                ))}
              </ul>

              <div className="h-px bg-[#111111]/[0.07] mb-8" />

              {/* Notify Me form */}
              <NotifyForm color={p.color} />

              {/* Trust */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                {["Free shipping", "30-day money-back guarantee", "GMP certified"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#E8920A]" />
                    <span className="text-[10px] text-[#111111]/30 tracking-wide">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Ingredients ── */}
      <section className="py-20 border-t border-[#111111]/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9 }}>
            <p className="text-[9px] font-mono tracking-[0.4em] uppercase mb-3"
              style={{ color: p.color, opacity: 0.65 }}>Full Label Transparency</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#111111] mb-12"
              style={{ fontFamily: "var(--font-playfair)" }}>
              What&apos;s inside<span style={{ color: "#E8920A" }}>.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border border-[#111111]/[0.07] rounded-2xl overflow-hidden">
              {p.ingredients.map((ing, i) => (
                <motion.div key={ing.name}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }}
                  className="p-7 border-b border-r border-[#111111]/[0.07] last:border-r-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-base font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-playfair)" }}>{ing.name}</h3>
                    <span className="text-[9px] font-mono tracking-[0.2em] px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ background: p.colorLight, color: p.color }}>{ing.dose}</span>
                  </div>
                  <p className="text-sm text-[#111111]/38 leading-relaxed">{ing.benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Usage ── */}
      <section className="py-16 border-t border-[#111111]/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[9px] font-mono tracking-[0.4em] uppercase mb-3 text-[#E8920A]/70">How to Use</p>
              <h2 className="text-2xl font-bold text-[#111111] mb-4 tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-playfair)" }}>
                Usage guidelines<span style={{ color: "#E8920A" }}>.</span>
              </h2>
              <p className="text-sm text-[#111111]/45 leading-[1.85]">{p.usage}</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
              <Image src={p.accentImg} alt="Usage" fill className="object-cover" sizes="600px" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── You may also like ── */}
      <section className="py-16 border-t border-[#111111]/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <p className="text-[9px] font-mono tracking-[0.4em] uppercase mb-3 text-[#111111]/30">Complete the System</p>
          <h2 className="text-2xl font-bold text-[#111111] mb-10 tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-playfair)" }}>
            You may also like<span style={{ color: "#E8920A" }}>.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {others.map((other) => (
              <Link key={other.slug} href={`/store/${other.slug}`}
                className="group flex items-center gap-6 p-5 rounded-2xl border border-[#111111]/[0.07] hover:border-[#111111]/15 transition-colors duration-200">
                <div className="relative w-20 h-24 flex-shrink-0 bg-[#FAFAFA] rounded-xl overflow-hidden">
                  <Image src={other.img} alt={other.name} fill className="object-contain" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#E8920A] transition-colors tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    {other.name}<span style={{ color: "#E8920A" }}>.</span>
                  </h3>
                  <p className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/28 mt-1">{other.tagline}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-semibold text-[#111111]">{other.price}</p>
                  <span className="text-[#111111]/25 group-hover:text-[#E8920A] inline-block transition-all duration-200 mt-2">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Locale = "en" | "pl";

interface Product {
  number: string;
  id: string;
  name: string;
  tagline: string;
  description: string;
  can: string;
  lifestyle: string;
  accent: string;
  glowColor: string;
  tags: string[];
  price: string;
  flip: boolean;
  href: string;
}

const productsData: Record<Locale, Product[]> = {
  en: [
    {
      number: "001",
      id: "performance",
      name: "Performance",
      tagline: "Designed for active days.",
      description:
        "A formula for those who place high demands on their bodies. Adaptogens, B vitamins and key minerals — composed in clinical doses, made in GMP-certified facilities.",
      can: "/images/products/performance.png",
      lifestyle: "/images/website/perf-dynamic-fashion-3.png",
      accent: "#111111",
      glowColor: "rgba(17,17,17,0.08)",
      tags: ["Energy", "Recovery", "Focus"],
      price: "109,00 zł",
      flip: false,
      href: "/store/performance",
    },
    {
      number: "002",
      id: "balance",
      name: "Balance",
      tagline: "Composure for demanding days.",
      description:
        "A formula composed of adaptogenic herbs and minerals selected from peer-reviewed literature — for those who value composure on demanding days.",
      can: "/images/products/balance.png",
      lifestyle: "/images/website/bal-editorial-lifestyle-4.jpeg",
      accent: "#A0784A",
      glowColor: "rgba(197,164,126,0.35)",
      tags: ["Calm", "Adaptogens", "Equilibrium"],
      price: "109,00 zł",
      flip: true,
      href: "/store/balance",
    },
    {
      number: "003",
      id: "gut-health",
      name: "Gut Health",
      tagline: "Your second brain, optimised.",
      description:
        "The gut is your foundation. Targeted prebiotics, digestive enzymes, and mucosal support nutrients to restore and protect the microbiome - the ecosystem your entire health depends on.",
      can: "/images/products/gut-health.png",
      lifestyle: "/images/website/lifestyle-editorial-3.jpeg",
      accent: "#C4682A",
      glowColor: "rgba(196,104,42,0.3)",
      tags: ["Digestion", "Microbiome", "Fibre"],
      price: "109,00 zł",
      flip: false,
      href: "/store/gut-health",
    },
  ],
  pl: [
    {
      number: "001",
      id: "performance",
      name: "Performance",
      tagline: "Stworzona na aktywne dni.",
      description:
        "Formuła dla tych, którzy stawiają sobie wysoką poprzeczkę. Adaptogeny, witaminy z grupy B i wybrane minerały — w klinicznych dawkach, produkowane w certyfikowanych zakładach GMP.",
      can: "/images/products/performance.png",
      lifestyle: "/images/website/perf-dynamic-fashion-3.png",
      accent: "#111111",
      glowColor: "rgba(17,17,17,0.08)",
      tags: ["Energia", "Regeneracja", "Skupienie"],
      price: "109,00 zł",
      flip: false,
      href: "/pl/store/performance",
    },
    {
      number: "002",
      id: "balance",
      name: "Balance",
      tagline: "Spokój na wymagające dni.",
      description:
        "Formuła oparta na adaptogenach i wybranych minerałach z literatury naukowej — dla tych, którzy w wymagających dniach cenią sobie wewnętrzny spokój.",
      can: "/images/products/balance.png",
      lifestyle: "/images/website/bal-editorial-lifestyle-4.jpeg",
      accent: "#A0784A",
      glowColor: "rgba(197,164,126,0.35)",
      tags: ["Spokój", "Adaptogeny", "Równowaga"],
      price: "109,00 zł",
      flip: true,
      href: "/pl/store/balance",
    },
    {
      number: "003",
      id: "gut-health",
      name: "Gut Health",
      tagline: "Twój drugi mózg, zoptymalizowany.",
      description:
        "Jelita to centrum dowodzenia Twojego ciała. Prebiotyki, enzymy trawienne i wsparcie dla mikrobioty jelitowej — żeby Twój układ pokarmowy pracował tak, jak powinien.",
      can: "/images/products/gut-health.png",
      lifestyle: "/images/website/lifestyle-editorial-3.jpeg",
      accent: "#C4682A",
      glowColor: "rgba(196,104,42,0.3)",
      tags: ["Trawienie", "Mikrobiom", "Błonnik"],
      price: "109,00 zł",
      flip: false,
      href: "/pl/store/gut-health",
    },
  ],
};

const ui = {
  en: {
    sectionLabel: "02 \u2014 The System",
    heading1: "Three formulas.",
    heading2: "Built for the long game.",
    rightText:
      "Each formula is built on peer-reviewed research, manufactured in GMP-certified facilities, and tested by independent labs.",
    viewProduct: "View product",
    freeShipping: "Free shipping from 200 zł",
    viewAll: "View all products",
  },
  pl: {
    sectionLabel: "02 \u2014 System",
    heading1: "Trzy formuły.",
    heading2: "Z myślą o przyszłości.",
    rightText:
      "Każda formuła oparta na badaniach naukowych, produkowana w certyfikowanych zakładach GMP i weryfikowana przez niezależne laboratoria.",
    viewProduct: "Zobacz produkt",
    freeShipping: "Darmowa dostawa od 200 zł",
    viewAll: "Zobacz wszystkie produkty",
  },
};

function ProductPanel({
  product,
  viewProduct,
}: {
  product: Product;
  viewProduct: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const imgMotion = product.flip
    ? { initial: { opacity: 0, x: 60 }, animate: inView ? { opacity: 1, x: 0 } : {} }
    : { initial: { opacity: 0, x: -60 }, animate: inView ? { opacity: 1, x: 0 } : {} };

  const textMotion = product.flip
    ? { initial: { opacity: 0, x: -40 }, animate: inView ? { opacity: 1, x: 0 } : {} }
    : { initial: { opacity: 0, x: 40 }, animate: inView ? { opacity: 1, x: 0 } : {} };

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden border-b border-[#111111]/[0.07]"
    >
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: product.flip
            ? `radial-gradient(ellipse at 75% 50%, ${product.glowColor}, transparent 60%)`
            : `radial-gradient(ellipse at 25% 50%, ${product.glowColor}, transparent 60%)`,
        }}
        aria-hidden
      />


      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 py-14 md:py-20">
        <div className="grid grid-cols-12 gap-8 items-center">

          {/* Product image - lifestyle photo */}
          <motion.div
            {...imgMotion}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className={`col-span-12 md:col-span-6 ${
              product.flip ? "md:order-2" : ""
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[20px] shadow-[0_18px_60px_-20px_rgba(17,17,17,0.18)]"
              style={{ height: "clamp(420px, 55vw, 660px)" }}
            >
              <Image
                src={product.lifestyle}
                alt={`knowing more. ${product.name}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Soft inner-edge gradient only — bridges photo and text column without
                  fully fading every side (which made the image feel pasted on). */}
              {product.flip ? (
                <div className="absolute left-0 inset-y-0 w-20 pointer-events-none"
                  style={{ background: "linear-gradient(to right, rgba(255,255,255,0.45) 0%, transparent 100%)" }} aria-hidden />
              ) : (
                <div className="absolute right-0 inset-y-0 w-20 pointer-events-none"
                  style={{ background: "linear-gradient(to left, rgba(255,255,255,0.45) 0%, transparent 100%)" }} aria-hidden />
              )}
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            {...textMotion}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`col-span-12 md:col-span-5 ${
              product.flip ? "md:order-1" : "md:col-start-8"
            }`}
          >
            <p className="text-[9px] font-mono text-[#111111]/25 tracking-[0.38em] uppercase mb-7">
              knowing more.
            </p>

            <h2
              className="leading-[0.88] tracking-[-0.03em] text-[#111111]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
              }}
            >
              {product.name}
              <span style={{ color: product.accent === "#111111" ? "#C4682A" : product.accent }}>.</span>
            </h2>

            <p className="mt-4 text-base font-medium text-[#111111]/40 tracking-wide">
              {product.tagline}
            </p>

            <p className="mt-5 text-sm text-[#111111]/35 leading-[1.75] max-w-[360px]">
              {product.description}
            </p>

            {/* Tags */}
            <div className="mt-7 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-semibold tracking-[0.22em] uppercase px-3.5 py-1.5 rounded-full border"
                  style={{
                    borderColor: `${product.accent}30`,
                    color: product.accent,
                    background: `${product.accent}08`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9">
              <motion.a
                href={product.href}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-2 text-sm font-medium text-[#111111]/40 border-b border-[#111111]/12 pb-0.5 hover:text-[#111111] hover:border-[#111111]/40 transition-colors duration-200"
              >
                {viewProduct} <ArrowRight size={14} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Products({ locale = "en" }: { locale?: "en" | "pl" }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const products = productsData[locale];
  const t = ui[locale];

  return (
    <section id="products" className="bg-white">

      {/* Section header */}
      <div
        ref={headerRef}
        className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 pt-20 md:pt-28 pb-16 border-b border-[#111111]/[0.07]"
      >
        <div className="flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[9px] font-mono text-[#C4682A] tracking-[0.38em] uppercase mb-5">
              {t.sectionLabel}
            </p>
            <h2
              className="leading-[0.92] tracking-[-0.03em] text-[#111111]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.4rem, 5vw, 5.2rem)",
              }}
            >
              {t.heading1}<br />
              <span className="text-[#111111]/28 italic">{t.heading2}</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="hidden md:block text-sm text-[#111111]/30 max-w-[260px] leading-relaxed text-right"
          >
            {t.rightText}
          </motion.p>
        </div>
      </div>

      {/* Product panels */}
      {products.map((product) => (
        <ProductPanel key={product.id} product={product} viewProduct={t.viewProduct} />
      ))}

      {/* Footer row */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16 py-12 flex items-center justify-between">
        <span className="text-[9px] font-mono text-[#111111]/20 tracking-[0.3em] uppercase">
          {t.freeShipping}
        </span>
        <a
          href="#"
          className="text-sm text-[#111111]/30 hover:text-[#111111] transition-colors duration-200 flex items-center gap-2"
        >
          {t.viewAll} <ArrowRight size={13} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}

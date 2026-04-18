"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const topics = [
  {
    id: "orders",
    label: "Moje zamówienie lub dostawa",
    answer: "Obejmujemy wszystkie standardowe pytania dotyczące wysyłki — śledzenie, terminy i co zrobić, jeśli paczka nie dotrze.",
    cta: "Zobacz FAQ: zamówienia i dostawa",
    href: "/pl/support",
  },
  {
    id: "products",
    label: "Pytania o produkt lub składniki",
    answer: "Dawkowanie, interakcje, wskazówki dotyczące stosowania i nauka stojąca za każdą formułą — wszystko w naszej sekcji wsparcia.",
    cta: "Zobacz FAQ: produkty",
    href: "/pl/support",
  },
  {
    id: "returns",
    label: "Zwroty lub reklamacje",
    answer: "Oferujemy 30-dniową gwarancję zwrotu pieniędzy. Wszystko, czego potrzebujesz do rozpoczęcia zwrotu, znajdziesz w sekcji wsparcia.",
    cta: "Zobacz politykę zwrotów",
    href: "/pl/support",
  },
  {
    id: "other",
    label: "Coś innego",
    answer: "Na razie nie przyjmujemy ogólnych zapytań. Sprawdź najpierw nasze FAQ — większość pytań ma tam odpowiedź.",
    cta: "Przejdź do FAQ",
    href: "/pl/support",
  },
];

export default function ContactPL() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = topics.find((t) => t.id === selected);

  return (
    <main className="min-h-screen bg-white">
      <Navbar locale="pl" />
      <section className="pt-36 pb-32 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#E8920A] mb-6"
        >
          Wsparcie
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(16px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 6vw, 6rem)" }}
        >
          Jak możemy<br />
          <span className="text-[#111111]/25 italic">pomóc?</span>
        </motion.h1>

        <div className="max-w-[640px]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm text-[#111111]/40 mb-10 leading-relaxed"
          >
            Wybierz temat, a pokierujemy Cię we właściwe miejsce.
          </motion.p>

          <div className="space-y-3">
            {topics.map((topic, i) => (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.35 + i * 0.07 }}
                onClick={() => setSelected(selected === topic.id ? null : topic.id)}
                className="w-full text-left px-6 py-5 rounded-2xl border transition-all duration-250 flex items-center justify-between gap-4 group"
                style={{
                  borderColor: selected === topic.id ? "rgba(232,146,10,0.35)" : "rgba(17,17,17,0.09)",
                  background: selected === topic.id ? "rgba(232,146,10,0.04)" : "white",
                }}
              >
                <span
                  className="text-sm font-medium tracking-[-0.01em] transition-colors duration-200"
                  style={{ color: selected === topic.id ? "#111111" : "rgba(17,17,17,0.65)", fontFamily: "var(--font-playfair)" }}
                >
                  {topic.label}
                </span>
                <span
                  className="text-sm transition-all duration-300 flex-shrink-0"
                  style={{
                    color: selected === topic.id ? "#E8920A" : "rgba(17,17,17,0.25)",
                    transform: selected === topic.id ? "rotate(90deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}
                >
                  →
                </span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 p-7 rounded-2xl border border-[#111111]/[0.07] bg-[#FAFAFA]"
              >
                <p className="text-sm text-[#111111]/55 leading-[1.85] mb-6">
                  {active.answer}
                </p>
                {active.href && active.cta && (
                  <Link
                    href={active.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8920A] hover:gap-3 transition-all duration-200"
                  >
                    {active.cta} <span>→</span>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer locale="pl" />
    </main>
  );
}

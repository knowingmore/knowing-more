"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const topics = [
  {
    id: "orders",
    label: "My order or delivery",
    answer: "We cover all standard shipping questions — tracking, timescales, and what to do if something doesn't arrive.",
    cta: "See shipping & orders FAQ",
    href: "/support",
  },
  {
    id: "products",
    label: "Product or ingredient questions",
    answer: "Dosages, interactions, usage guidelines, and the science behind each formula — all covered in our support section.",
    cta: "See product FAQ",
    href: "/support",
  },
  {
    id: "returns",
    label: "Returns or refunds",
    answer: "We offer a 30-day money-back guarantee. Everything you need to start a return is in our support section.",
    cta: "See returns policy",
    href: "/support",
  },
  {
    id: "other",
    label: "Something else",
    answer: "We&apos;re not taking general enquiries right now. For anything urgent, check our FAQ first — most questions are answered there.",
    cta: "Go to FAQ",
    href: "/support",
  },
];

export default function ContactPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = topics.find((t) => t.id === selected);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-32 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#1B2A4A] mb-6"
        >
          Support
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(16px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 6vw, 6rem)" }}
        >
          How can we<br />
          <span className="text-[#111111]/25 italic">help?</span>
        </motion.h1>

        <div className="max-w-[640px]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm text-[#111111]/40 mb-10 leading-relaxed"
          >
            Select a topic and we&apos;ll point you to the right place.
          </motion.p>

          {/* Topic buttons */}
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
                    color: selected === topic.id ? "#1B2A4A" : "rgba(17,17,17,0.25)",
                    transform: selected === topic.id ? "rotate(90deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}
                >
                  →
                </span>
              </motion.button>
            ))}
          </div>

          {/* Answer panel */}
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
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B2A4A] hover:gap-3 transition-all duration-200"
                  >
                    {active.cta} <span>→</span>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
      <Footer />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ORIGINAL CONTACT FORM — kept as backup, not rendered

export default function ContactPageOriginal() {
  const [done, setDone] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#1B2A4A] mb-6">Contact</p>
        <h1 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Get in touch<span style={{ color: "#1B2A4A" }}>.</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-[960px]">
          <div className="space-y-8">
            {[
              { label: "General enquiries", value: "hello@knowingmore.com" },
              { label: "Orders & returns", value: "support@knowingmore.com" },
              { label: "Lab & testing", value: "lab@knowingmore.com" },
              { label: "Press & media", value: "press@knowingmore.com" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#111111]/30 mb-1">{item.label}</p>
                <a href={`mailto:${item.value}`} className="text-sm text-[#111111] hover:text-[#1B2A4A] transition-colors duration-200">
                  {item.value}
                </a>
              </div>
            ))}
            <div className="pt-4">
              <p className="text-xs text-[#111111]/30 leading-relaxed">
                We aim to respond to all enquiries within 1 business day.
              </p>
            </div>
          </div>

          {done ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 rounded-2xl border border-[#1B2A4A]/20 bg-[#1B2A4A]/5 text-center">
              <div className="w-12 h-12 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white text-xl">✓</div>
              <p className="font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>Message sent.</p>
              <p className="text-sm text-[#111111]/40 max-w-[220px]">We&apos;ll get back to you within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
              {[
                { name: "name", label: "Full name", type: "text" },
                { name: "email", label: "Email address", type: "email" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-[9px] font-mono tracking-[0.22em] uppercase text-[#111111]/40 block mb-2">{f.label}</label>
                  <input type={f.type} required
                    className="w-full px-4 py-3.5 rounded-full text-sm border border-[#111111]/12 bg-white text-[#111111] outline-none focus:border-[#1B2A4A]/50 transition-colors" />
                </div>
              ))}
              <div>
                <label className="text-[9px] font-mono tracking-[0.22em] uppercase text-[#111111]/40 block mb-2">Message</label>
                <textarea required rows={5}
                  className="w-full px-4 py-3.5 rounded-2xl text-sm border border-[#111111]/12 bg-white text-[#111111] outline-none focus:border-[#1B2A4A]/50 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full py-4 rounded-full bg-[#111111] text-white text-sm font-semibold hover:bg-[#222] transition-colors duration-200">
                Send message →
              </button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
──────────────────────────────────────────────────────────────────────────── */

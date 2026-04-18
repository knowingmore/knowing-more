"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  { q: "Why are the products currently sold out?", a: "We manufacture in planned batches to maintain our quality control and third-party testing standards. Each batch sells out before the next one is ready. Join the restock list on any product page - you'll be the first notified when stock returns, with an exclusive 20 zł discount." },
  { q: "What makes knowing more. different from other supplements?", a: "Every ingredient is clinically dosed - meaning we use the exact amounts from the studies we cite. We publish the full formula with no proprietary blends. Everything is third-party tested before shipment." },
  { q: "Are the formulas suitable for vegans?", a: "Yes. All three formulas are vegan-friendly, free from artificial colours, fillers, and unnecessary excipients. Capsules are HPMC (plant-based)." },
  { q: "Can I take all three formulas together?", a: "Yes - they are designed to complement each other as a complete longevity system. The three formulas address distinct pillars (performance, stress/sleep, and gut health) with no conflicting ingredients." },
  { q: "What is your returns policy?", a: "We offer a 30-day money-back guarantee from the date of delivery, no questions asked. Simply contact us and we'll process a full refund." },
  { q: "Where are the products manufactured?", a: "All formulas are manufactured in GMP-certified facilities in the EU. Every batch is independently third-party tested for identity, purity, and potency." },
  { q: "Do you ship internationally?", a: "We currently ship within Poland and the European Union with free standard shipping on all orders. International shipping outside the EU is not yet available." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secured and encrypted." },
];

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.06, duration: 0.6 }}
      className="border-b border-[#111111]/[0.07] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="text-sm md:text-base font-medium text-[#111111] group-hover:text-[#E8920A] transition-colors duration-200">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-6 h-6 rounded-full border border-[#111111]/12 flex items-center justify-center text-[#111111]/35 text-sm"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-[#111111]/45 leading-[1.85] max-w-[640px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SupportPage() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,146,10,0.05) 0%, transparent 55%)" }}
          aria-hidden />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#E8920A] mb-6">
            Support - We&apos;re Here
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="leading-[0.88] tracking-[-0.03em] text-[#111111]"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            How can we<br />
            <span className="text-[#111111]/25 italic">help you?</span>
          </motion.h1>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#111111]/[0.07] py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#E8920A]/70 mb-3">FAQ</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}>
                Common questions<span style={{ color: "#E8920A" }}>.</span>
              </h2>
              <p className="text-sm text-[#111111]/38 leading-relaxed">
                Can&apos;t find your answer? Send us a message below.
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} i={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="border-t border-[#111111]/[0.07] py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#E8920A]/70 mb-3">Contact</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}>
                Send us a message<span style={{ color: "#E8920A" }}>.</span>
              </h2>
              <p className="text-sm text-[#111111]/38 leading-relaxed mb-8">
                We respond to all enquiries within 24 hours on business days. For order-related questions, please include your order number.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Email", value: "hello@knowingmore.com" },
                  { label: "Response time", value: "Within 24 hours" },
                  { label: "Hours", value: "Mon – Fri, 9:00 – 17:00 CET" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-[#111111]/28 w-28 flex-shrink-0">{item.label}</span>
                    <span className="text-sm text-[#111111]/55">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#E8920A] flex items-center justify-center text-white text-xl">✓</div>
                    <p className="text-lg font-bold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                      Message received.
                    </p>
                    <p className="text-sm text-[#111111]/38">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { label: "Name", value: name, set: setName, type: "text", placeholder: "Your name" },
                      { label: "Email", value: email, set: setEmail, type: "email", placeholder: "your@email.com" },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-[9px] font-mono tracking-[0.22em] uppercase text-[#111111]/35 mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={(e) => field.set(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl text-sm border border-[#111111]/12 text-[#111111] placeholder-[#111111]/25 outline-none focus:border-[#E8920A]/40 transition-colors"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-[9px] font-mono tracking-[0.22em] uppercase text-[#111111]/35 mb-2">
                        Message
                      </label>
                      <textarea
                        placeholder="How can we help?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3.5 rounded-xl text-sm border border-[#111111]/12 text-[#111111] placeholder-[#111111]/25 outline-none focus:border-[#E8920A]/40 transition-colors resize-none"
                      />
                    </div>
                    <button type="submit"
                      className="w-full flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#111111] text-white text-sm font-semibold tracking-wide hover:bg-[#333] transition-colors duration-200">
                      Send Message
                      <span>→</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

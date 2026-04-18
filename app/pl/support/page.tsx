"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  { q: "Dlaczego produkty są chwilowo niedostępne?", a: "Produkujemy w zaplanowanych partiach, aby zachować nasze standardy kontroli jakości i badań przez niezależne laboratoria. Każda partia sprzedaje się, zanim kolejna będzie gotowa. Dołącz do listy oczekujących na stronie produktu — będziesz pierwszą osobą powiadomioną o powrocie do sprzedaży, z ekskluzywnym rabatem 20 zł." },
  { q: "Co wyróżnia knowing more. spośród innych suplementów?", a: "Każdy składnik jest dawkowany klinicznie — stosujemy dokładne ilości z badań, które cytujemy. Publikujemy pełną formułę bez zastrzeżonych mieszanek. Wszystko jest testowane przez niezależne laboratoria przed wysyłką." },
  { q: "Czy formuły są odpowiednie dla wegan?", a: "Tak. Wszystkie trzy formuły są wegańskie, wolne od sztucznych barwników, wypełniaczy i zbędnych substancji pomocniczych. Kapsułki są wykonane z HPMC (na bazie roślinnej)." },
  { q: "Czy mogę przyjmować wszystkie trzy formuły razem?", a: "Tak — są zaprojektowane tak, by uzupełniać się nawzajem jako kompletny system longevity. Trzy formuły adresują odrębne filary (wydajność, stres/sen oraz zdrowie jelit) bez kolidujących składników." },
  { q: "Jaka jest Wasza polityka zwrotów?", a: "Oferujemy 30-dniową gwarancję zwrotu pieniędzy od daty dostawy, bez zadawania pytań. Wystarczy się z nami skontaktować, a przeprowadzimy pełny zwrot." },
  { q: "Gdzie są produkowane produkty?", a: "Wszystkie formuły są produkowane w certyfikowanych zakładach GMP w UE. Każda partia jest niezależnie testowana przez zewnętrzne laboratoria pod kątem tożsamości, czystości i mocy." },
  { q: "Czy wysyłacie za granicę?", a: "Wysyłamy na terenie Polski i Unii Europejskiej z darmową dostawą standardową na wszystkie zamówienia. Wysyłka poza UE nie jest jeszcze dostępna." },
  { q: "Jakie metody płatności akceptujecie?", a: "Akceptujemy wszystkie główne karty kredytowe, PayPal, Apple Pay i Google Pay. Wszystkie transakcje są zabezpieczone i zaszyfrowane." },
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
      <Navbar locale="pl" />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,146,10,0.05) 0%, transparent 55%)" }}
          aria-hidden />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#E8920A] mb-6">
            Wsparcie — Jesteśmy tu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="leading-[0.88] tracking-[-0.03em] text-[#111111]"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            Jak możemy<br />
            <span className="text-[#111111]/25 italic">Ci pomóc?</span>
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
                Najczęstsze pytania<span style={{ color: "#E8920A" }}>.</span>
              </h2>
              <p className="text-sm text-[#111111]/38 leading-relaxed">
                Nie znalazłeś odpowiedzi? Napisz do nas poniżej.
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
              <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#E8920A]/70 mb-3">Kontakt</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}>
                Napisz do nas<span style={{ color: "#E8920A" }}>.</span>
              </h2>
              <p className="text-sm text-[#111111]/38 leading-relaxed mb-8">
                Odpowiadamy na wszystkie pytania w ciągu 24 godzin w dni robocze. W sprawach dotyczących zamówień prosimy o podanie numeru zamówienia.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Email", value: "hello@knowingmore.com" },
                  { label: "Czas odpowiedzi", value: "W ciągu 24 godzin" },
                  { label: "Godziny pracy", value: "Pon – Pt, 9:00 – 17:00 CET" },
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
                      Wiadomość otrzymana.
                    </p>
                    <p className="text-sm text-[#111111]/38">Odezwiemy się w ciągu 24 godzin.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { label: "Imię i nazwisko", value: name, set: setName, type: "text", placeholder: "Twoje imię" },
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
                        Wiadomość
                      </label>
                      <textarea
                        placeholder="W czym możemy pomóc?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3.5 rounded-xl text-sm border border-[#111111]/12 text-[#111111] placeholder-[#111111]/25 outline-none focus:border-[#E8920A]/40 transition-colors resize-none"
                      />
                    </div>
                    <button type="submit"
                      className="w-full flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#111111] text-white text-sm font-semibold tracking-wide hover:bg-[#333] transition-colors duration-200">
                      Wyślij
                      <span>→</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer locale="pl" />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "Why are the products currently sold out?",
    a: "We manufacture in planned batches to maintain quality control and third-party testing standards. Each batch sells out before the next one is ready. Join the restock list on any product page - you'll be the first notified when stock returns, and restock subscribers receive an exclusive 20 zł discount.",
  },
  {
    q: "Are these products suitable for vegans?",
    a: "Yes. All capsules use HPMC (plant-derived) shells. No animal-derived ingredients are used in any knowing more. formula.",
  },
  {
    q: "Can I take all three formulas together?",
    a: "The three formulas are designed to complement each other. Performance is taken in the morning with food, Balance is taken 60–90 minutes before sleep, and Gut Health is taken on an empty stomach before breakfast. There are no known interactions between the formulas.",
  },
  {
    q: "How long before I notice results?",
    a: "Most ingredients in our formulas operate on a cumulative model. Expect measurable changes in energy and recovery after 4–6 weeks of consistent use. Sleep quality improvements from Balance are typically noted within 2–3 weeks.",
  },
  {
    q: "Are your products tested by third parties?",
    a: "Yes. Every batch is independently tested for identity, potency, heavy metals, microbial contamination, and pesticide residues before release. Certificates of Analysis are available on request.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship within Poland and the European Union. International shipping outside the EU is not yet available. See our Shipping & Returns page for full details.",
  },
  {
    q: "What is your returns policy?",
    a: "We offer a 30-day money-back guarantee on all products. If you are unsatisfied for any reason, contact us within 30 days of delivery and we will issue a full refund - no questions asked.",
  },
  {
    q: "Are the dosages backed by clinical research?",
    a: "Every ingredient is dosed at the level used in peer-reviewed human clinical trials. We do not use sub-threshold doses. Full ingredient and dose disclosure is printed on every label.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#1B2A4A] mb-6">Support</p>
        <h1 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Frequently asked<br />
          <span className="text-[#111111]/25 italic">questions.</span>
        </h1>
        <div className="max-w-[720px] space-y-0 border border-[#111111]/[0.07] rounded-2xl overflow-hidden">
          {faqs.map((item, i) => (
            <div key={i} className="p-7 border-b border-[#111111]/[0.07] last:border-b-0">
              <h3 className="text-sm font-bold text-[#111111] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                {item.q}
              </h3>
              <p className="text-sm text-[#111111]/45 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm text-[#111111]/40">
          Can&apos;t find what you&apos;re looking for?{" "}
          <a href="/contact" className="text-[#1B2A4A] hover:underline">Contact us →</a>
        </p>
      </section>
      <Footer />
    </main>
  );
}

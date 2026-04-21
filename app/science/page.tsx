import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pillars = [
  {
    title: "Clinically-effective doses",
    body: "Every ingredient in every formula is dosed at the level used in the clinical trial that established its efficacy. We do not use sub-threshold doses to reduce cost or list an ingredient as a marketing footnote.",
  },
  {
    title: "No proprietary blends",
    body: "Proprietary blends allow manufacturers to hide individual ingredient doses behind a total weight. We disclose every ingredient and its exact dose on the label - without exception.",
  },
  {
    title: "Peer-reviewed sourcing",
    body: "Before an ingredient enters consideration, we require human clinical trial data published in indexed journals. Mechanism-only or animal-model research is not sufficient for inclusion.",
  },
  {
    title: "GMP manufacturing",
    body: "All formulas are manufactured in facilities certified to Good Manufacturing Practice (GMP) standards, with documented lot-to-lot testing and full traceability.",
  },
  {
    title: "Third-party testing",
    body: "Every batch is tested by an independent laboratory for identity, purity, potency, and the absence of heavy metals, pesticides, and microbial contaminants before release.",
  },
  {
    title: "Bioavailability-optimised forms",
    body: "We select ingredient forms with the highest documented bioavailability - Magnesium Glycinate over oxide, KSM-66 Ashwagandha over generic root powder, Alpha-GPC over choline bitartrate.",
  },
];

export default function SciencePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#C4682A] mb-6">Our Science</p>
        <h1 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}>
          The standard we hold<br />
          <span className="text-[#111111]/25 italic">ourselves to.</span>
        </h1>
        <p className="text-sm text-[#111111]/45 leading-relaxed max-w-[520px] mb-20">
          Our formulation process is governed by a strict set of scientific standards. This is not marketing language - it is the operational criteria that determines what does and does not make it into a knowing more. formula.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border border-[#111111]/[0.07] rounded-2xl overflow-hidden">
          {pillars.map((p, i) => (
            <div key={i} className="p-8 border-b border-r border-[#111111]/[0.07]">
              <div className="w-8 h-px bg-[#C4682A] mb-6" />
              <h3 className="text-base font-bold text-[#111111] mb-3 tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-playfair)" }}>{p.title}</h3>
              <p className="text-sm text-[#111111]/40 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

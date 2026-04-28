import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tests = [
  { name: "Identity testing", desc: "Confirms that the ingredient is what the label states, using HPLC, FTIR, or mass spectrometry as appropriate." },
  { name: "Potency verification", desc: "Confirms that the active compound is present at the labelled dose, within a ±5% tolerance." },
  { name: "Heavy metals", desc: "Screens for lead, arsenic, cadmium, and mercury against USP <232> limits." },
  { name: "Microbial testing", desc: "Tests for total aerobic count, yeast, mould, E. coli, Salmonella, and Staphylococcus aureus." },
  { name: "Pesticide residues", desc: "Multi-residue screening against EU MRL (Maximum Residue Level) standards for all botanical ingredients." },
  { name: "Dissolution / disintegration", desc: "Capsule shell dissolution is verified to ensure active release within the appropriate GI window." },
];

export default function LabTestingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#C4682A] mb-6">Lab Testing</p>
        <h1 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Every batch. Every time.<br />
          <span className="text-[#111111]/25 italic">No exceptions.</span>
        </h1>
        <p className="text-sm text-[#111111]/45 leading-relaxed max-w-[520px] mb-20">
          Third-party testing is not optional at knowing more. Every production batch is independently tested before it is released. The results are retained on file and available on request.
        </p>
        <div className="max-w-[720px] space-y-0 border border-[#111111]/[0.07] rounded-2xl overflow-hidden">
          {tests.map((t, i) => (
            <div key={i} className="flex gap-6 p-7 border-b border-[#111111]/[0.07] last:border-b-0">
              <div className="w-1 h-1 rounded-full bg-[#C4682A] mt-2.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-[#111111] mb-1.5" style={{ fontFamily: "var(--font-playfair)" }}>
                  {t.name}
                </h3>
                <p className="text-sm text-[#111111]/40 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-[#111111]/30 leading-relaxed max-w-[520px]">
          Certificate of Analysis (CoA) documents for any knowing more. product are available upon request. Contact us at lab@knowingmore.com with your order number and the batch code printed on your product.
        </p>
      </section>
      <Footer />
    </main>
  );
}

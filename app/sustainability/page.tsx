import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#1B2A4A] mb-6">Sustainability</p>
        <h1 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Built for the long game.<br />
          <span className="text-[#111111]/25 italic">In every sense.</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-[960px] mt-16">
          <div className="space-y-8">
            <div>
              <div className="w-8 h-px bg-[#1B2A4A] mb-4" />
              <h3 className="text-base font-bold text-[#111111] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Packaging</h3>
              <p className="text-sm text-[#111111]/45 leading-relaxed">Our bottles are made from 100% recycled HDPE. The outer carton is FSC-certified and printed with water-based inks. We use the minimum viable packaging - nothing exists for aesthetics alone.</p>
            </div>
            <div>
              <div className="w-8 h-px bg-[#1B2A4A] mb-4" />
              <h3 className="text-base font-bold text-[#111111] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Supply chain</h3>
              <p className="text-sm text-[#111111]/45 leading-relaxed">We source ingredients from suppliers who operate under ISO 14001 environmental management standards. We prioritise European-sourced raw materials where clinical equivalence allows.</p>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <div className="w-8 h-px bg-[#1B2A4A] mb-4" />
              <h3 className="text-base font-bold text-[#111111] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Carbon</h3>
              <p className="text-sm text-[#111111]/45 leading-relaxed">We are working towards full supply chain carbon measurement for 2026. Until that baseline is established, we do not make net-zero claims. We believe in measurement before commitment.</p>
            </div>
            <div>
              <div className="w-8 h-px bg-[#1B2A4A] mb-4" />
              <h3 className="text-base font-bold text-[#111111] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Capsules</h3>
              <p className="text-sm text-[#111111]/45 leading-relaxed">All capsules are HPMC (hydroxypropyl methylcellulose) - plant-derived, vegan, and free from animal gelatine.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

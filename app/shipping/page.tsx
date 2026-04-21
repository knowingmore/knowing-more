import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#C4682A] mb-6">Support</p>
        <h1 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Shipping &amp; Returns<span style={{ color: "#C4682A" }}>.</span>
        </h1>
        <div className="max-w-[720px] space-y-12">
          <div>
            <div className="w-8 h-px bg-[#C4682A] mb-5" />
            <h2 className="text-lg font-bold text-[#111111] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Shipping</h2>
            <div className="space-y-4 text-sm text-[#111111]/50 leading-relaxed">
              <p>We ship within Poland and the European Union. Orders are dispatched within 1–2 business days of placement.</p>
              <div className="border border-[#111111]/[0.07] rounded-2xl overflow-hidden">
                {[
                  { zone: "Poland", time: "1–2 business days", cost: "Free over 200 zł / 14,99 zł below" },
                  { zone: "European Union", time: "3–5 business days", cost: "Free over 350 zł / 24,99 zł below" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 p-5 border-b border-[#111111]/[0.07] last:border-b-0 text-xs">
                    <span className="font-semibold text-[#111111]">{row.zone}</span>
                    <span className="text-[#111111]/45">{row.time}</span>
                    <span className="text-[#111111]/45">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="w-8 h-px bg-[#C4682A] mb-5" />
            <h2 className="text-lg font-bold text-[#111111] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Returns</h2>
            <div className="space-y-4 text-sm text-[#111111]/50 leading-relaxed">
              <p>We offer a <strong className="text-[#111111]/70">30-day money-back guarantee</strong> on all products. If you are unsatisfied for any reason, contact us within 30 days of delivery.</p>
              <p>To initiate a return, email us at returns@knowingmore.com with your order number. We will arrange collection and issue a full refund within 5 business days of receiving the returned product.</p>
              <p>Products must be returned in their original packaging. We do not accept returns of products that have been more than 50% consumed, unless the return is due to a product defect or error on our part.</p>
            </div>
          </div>

          <div>
            <div className="w-8 h-px bg-[#C4682A] mb-5" />
            <h2 className="text-lg font-bold text-[#111111] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Damaged or incorrect orders</h2>
            <p className="text-sm text-[#111111]/50 leading-relaxed">If your order arrives damaged or incorrect, contact us within 48 hours of delivery at support@knowingmore.com with a photo of the item. We will dispatch a replacement at no cost.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

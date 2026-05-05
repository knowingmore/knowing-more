import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#C4682A] mb-6">Legal</p>
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Terms of Service<span style={{ color: "#C4682A" }}>.</span>
        </h1>
        <div className="max-w-[720px] space-y-10 text-sm text-[#111111]/50 leading-relaxed">
          <p className="text-xs text-[#111111]/30">Last updated: January 2026</p>
          {[
            { title: "1. Status of the brand", body: "knowing more. is currently in pre-market validation phase. Products presented on this website are in development and are not yet available for purchase. By submitting your email through any \"Notify me\" or discount-reservation form, you acknowledge that you understand products are not yet on sale and that you wish to be informed when they become available. No payment is processed at this stage. No order is created. Prices and product details shown on the site are indicative and may change before official availability." },
            { title: "2. Acceptance", body: "By accessing or using knowingmore.life, you agree to these Terms of Service. If you do not agree, please do not use the site." },
            { title: "3. Products", body: "Our products are dietary supplements. They are not medicines and are not intended to diagnose, treat, cure, or prevent any disease. Dietary supplements cannot replace a balanced diet. Consult a healthcare professional before use if you are pregnant, nursing, or taking medication." },
            { title: "4. Future orders and payment", body: "Once products become available, all prices will be in Polish Złoty (PLN) and include VAT where applicable. We reserve the right to refuse or cancel any order at our discretion. Payment is processed only at the time of order, after products become available." },
            { title: "5. Notification list", body: "Joining any notification or discount-reservation list does not constitute a purchase or reservation. It registers your email to receive notification when the product becomes available. Discount offers communicated via the list are subject to availability and may be withdrawn or modified before launch." },
            { title: "6. Intellectual property", body: "All content on this website - including text, images, formulations, and brand assets - is the property of knowing more. and may not be reproduced without written permission." },
            { title: "7. Limitation of liability", body: "To the maximum extent permitted by law, knowing more. is not liable for indirect, incidental, or consequential damages arising from use of our products or website." },
            { title: "8. Governing law", body: "These terms are governed by the laws of Poland. Any disputes are subject to the exclusive jurisdiction of the courts of Warsaw." },
            { title: "9. Changes", body: "We may update these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms." },
          ].map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold text-[#111111] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#1B2A4A] mb-6">Legal</p>
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Privacy Policy<span style={{ color: "#1B2A4A" }}>.</span>
        </h1>
        <div className="max-w-[720px] space-y-10 text-sm text-[#111111]/50 leading-relaxed">
          <p className="text-xs text-[#111111]/30">Last updated: January 2026</p>
          {[
            { title: "1. Who we are", body: "knowing more. (\"we\", \"us\", \"our\") operates the website knowingmore.com. We are committed to protecting your personal data and your right to privacy." },
            { title: "2. What data we collect", body: "We collect data you provide directly (name, email address, shipping address, order details) and data collected automatically (IP address, browser type, pages visited, time on site) via cookies and analytics tools." },
            { title: "3. How we use your data", body: "We use your data to process and fulfil orders, send transactional emails, send marketing communications where you have opted in, improve our website and products, and comply with legal obligations." },
            { title: "4. Legal basis for processing", body: "We process your data on the basis of contract performance (order fulfilment), legitimate interests (website analytics), and consent (marketing emails). You may withdraw consent at any time." },
            { title: "5. Data sharing", body: "We do not sell your personal data. We share data only with service providers necessary to operate our business (payment processors, shipping carriers, email platforms), all under data processing agreements." },
            { title: "6. Your rights", body: "Under GDPR you have the right to access, correct, delete, and export your personal data, and to object to or restrict processing. To exercise any of these rights, contact us at privacy@knowingmore.com." },
            { title: "7. Data retention", body: "We retain order data for 7 years to comply with Polish accounting law. Marketing data is retained until you unsubscribe. Analytics data is retained for 26 months." },
            { title: "8. Contact", body: "For any privacy-related queries, contact our Data Controller at privacy@knowingmore.com." },
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

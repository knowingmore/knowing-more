import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#C4682A] mb-6">Legal</p>
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Privacy Policy<span style={{ color: "#C4682A" }}>.</span>
        </h1>
        <div className="max-w-[720px] space-y-10 text-sm text-[#111111]/50 leading-relaxed">
          <p className="text-xs text-[#111111]/30">Last updated: January 2026</p>
          {[
            { title: "1. Who we are", body: "knowing more. (\"we\", \"us\", \"our\") operates the website knowingmore.life. We are committed to protecting your personal data and your right to privacy." },
            { title: "2. Current operating phase", body: "knowing more. is currently in pre-market validation. Email addresses collected through any \"Notify me\" or discount-reservation form are processed for the specific purpose of validating market interest before product launch and notifying registered users when products become available. No payment data is collected at this stage." },
            { title: "3. What data we collect", body: "We collect data you provide directly (email address, name where given) and data collected automatically (IP address, browser type, pages visited, time on site) via cookies and analytics tools. In the future, when products become available, we will also collect order-related information (shipping address, order details)." },
            { title: "4. How we use your data", body: "We currently use your data to register your interest in upcoming products, notify you when products become available, send marketing communications where you have explicitly opted in, improve our website, and comply with legal obligations." },
            { title: "5. Legal basis for processing", body: "We process your data on the basis of consent (Art. 6(1)(a) GDPR) for marketing communications and pre-launch interest registration, and on the basis of legitimate interests (Art. 6(1)(f) GDPR) for website analytics and security. You may withdraw consent at any time." },
            { title: "6. Data sharing", body: "We do not sell your personal data. We share data only with service providers necessary to operate our business (email platforms, hosting providers, analytics tools, and in the future payment processors and shipping carriers), all under data processing agreements." },
            { title: "7. Your rights", body: "Under GDPR you have the right to access, correct, delete, and export your personal data, and to object to or restrict processing. You may also withdraw your consent at any time and lodge a complaint with the President of the Personal Data Protection Office (UODO). To exercise any of these rights, contact us at privacy@knowingmore.life." },
            { title: "8. Data retention", body: "Pre-launch interest registrations are retained until product launch and for up to 24 months thereafter, or until you unsubscribe — whichever comes first. Once orders begin, order data will be retained for 7 years to comply with Polish accounting law. Analytics data is retained for 26 months." },
            { title: "9. Data Controller and contact", body: "Data Controller (during pre-market validation phase): knowing more. — operating knowingmore.life. Contact for all privacy-related queries: privacy@knowingmore.life. A legal entity will be registered before sales begin; registered users will be informed of the change." },
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

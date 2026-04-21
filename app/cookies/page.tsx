import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#1B2A4A] mb-6">Legal</p>
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Cookie Policy<span style={{ color: "#1B2A4A" }}>.</span>
        </h1>
        <div className="max-w-[720px] space-y-10 text-sm text-[#111111]/50 leading-relaxed">
          <p className="text-xs text-[#111111]/30">Last updated: January 2026</p>
          <div className="border border-[#111111]/[0.07] rounded-2xl overflow-hidden">
            {[
              { type: "Strictly necessary", purpose: "Session management, security, shopping cart functionality.", duration: "Session", canOptOut: "No" },
              { type: "Analytics", purpose: "Understanding how visitors use the website (Google Analytics, anonymised).", duration: "26 months", canOptOut: "Yes" },
              { type: "Marketing", purpose: "Retargeting and personalised advertising via Meta and Google.", duration: "90 days", canOptOut: "Yes" },
              { type: "Preferences", purpose: "Remembering your cookie consent choice and display preferences.", duration: "12 months", canOptOut: "No" },
            ].map((row, i) => (
              <div key={i} className="p-6 border-b border-[#111111]/[0.07] last:border-b-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-sm font-bold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>{row.type}</h3>
                  <span className={`text-[8px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-full flex-shrink-0 ${row.canOptOut === "Yes" ? "bg-[#1B2A4A]/10 text-[#1B2A4A]" : "bg-[#111111]/06 text-[#111111]/40"}`}>
                    {row.canOptOut === "Yes" ? "Optional" : "Required"}
                  </span>
                </div>
                <p className="text-xs text-[#111111]/40 mb-1">{row.purpose}</p>
                <p className="text-[10px] text-[#111111]/28 font-mono">Duration: {row.duration}</p>
              </div>
            ))}
          </div>
          <p>To manage your cookie preferences, you can update your browser settings or use the cookie consent banner that appears on your first visit to the site. For questions, contact us at privacy@knowingmore.com.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#E8920A] mb-6">About Us</p>
        <h1 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)" }}>
          We believe longevity<br />
          <span className="text-[#111111]/25 italic">is a practice.</span>
        </h1>

        {/* Photo + text row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-20">
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/images/website/session-two-women-products.jpeg"
              alt="knowing more. team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Subtle bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(255,255,255,0.15), transparent)" }} />
          </div>

          <div className="grid grid-cols-1 gap-6 text-sm text-[#111111]/55 leading-[1.85]">
            <p>Knowing more. was founded on a single conviction: that the gap between what science knows about human longevity and what people actually do about it is far too wide.</p>
            <p>We are not a wellness brand. We are a precision nutrition company. Every formula we release is built on peer-reviewed research, manufactured in GMP-certified facilities, and tested by independent labs - before it ever reaches you.</p>
            <p>No proprietary blends. No hiding behind vague dosages. Every ingredient, every dose, every benefit - disclosed in full.</p>
            <p>Our team includes researchers, clinicians, and athletes who refused to accept cognitive fog, prolonged recovery, or hormonal disruption as the inevitable cost of modern life.</p>
            <p>Knowing more. is the system we built for ourselves - and made available to those who demand the same standard.</p>
            <p className="font-medium text-[#111111]/70">The long game starts here.</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="border-t border-[#111111]/[0.07] mt-20 pt-16 grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { value: "100%", label: "Label transparency" },
            { value: "3rd party", label: "Independent testing" },
            { value: "GMP", label: "Certified manufacturing" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-[#111111] tracking-[-0.02em] mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}>{stat.value}</p>
              <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-[#111111]/30">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

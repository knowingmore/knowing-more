"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Play, Link2 } from "lucide-react";

const footerData = {
  en: {
    tagline: "Science-backed longevity supplements for those who demand more.",
    categories: {
      Products: [
        { label: "Performance.", href: "/store/performance" },
        { label: "Balance.", href: "/store/balance" },
        { label: "Gut Health.", href: "/store/gut-health" },
        { label: "All Products", href: "/store" },
      ],
      Company: [
        { label: "About Us", href: "/about" },
        { label: "Our Science", href: "/science" },
        { label: "Lab Testing", href: "/lab-testing" },
        { label: "Sustainability", href: "/sustainability" },
      ],
      Support: [
        { label: "FAQ", href: "/faq" },
        { label: "Shipping & Returns", href: "/shipping" },
        { label: "Contact", href: "/contact" },
      ],
      Legal: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
    copyright: "© 2026 knowing more. All rights reserved.",
    made: "Made with precision. Backed by science.",
  },
  pl: {
    tagline: "Suplementy longevity oparte na nauce — dla tych, którzy wymagają więcej.",
    categories: {
      Produkty: [
        { label: "Performance.", href: "/pl/store/performance" },
        { label: "Balance.", href: "/pl/store/balance" },
        { label: "Gut Health.", href: "/pl/store/gut-health" },
        { label: "Wszystkie produkty", href: "/pl/store" },
      ],
      "O marce": [
        { label: "O nas", href: "/pl/about" },
        { label: "Nasza nauka", href: "/pl/science" },
        { label: "Badania laboratoryjne", href: "/pl/lab-testing" },
        { label: "Zrównoważony rozwój", href: "/pl/sustainability" },
      ],
      Pomoc: [
        { label: "FAQ", href: "/pl/support" },
        { label: "Dostawa i zwroty", href: "/pl/shipping" },
        { label: "Kontakt", href: "/pl/contact" },
      ],
      Prawo: [
        { label: "Polityka prywatności", href: "/pl/privacy-policy" },
        { label: "Regulamin", href: "/pl/terms" },
        { label: "Polityka cookies", href: "/pl/cookies" },
      ],
    },
    copyright: "© 2026 knowing more. Wszelkie prawa zastrzeżone.",
    made: "Stworzone z precyzją. Poparte nauką.",
  },
};

export default function Footer({ locale = "en" }: { locale?: "en" | "pl" }) {
  const d = footerData[locale];

  return (
    <footer className="bg-[#111111] pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16 border-b border-white/[0.07]">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <Image
              src="/images/logo/logo.png"
              alt="knowing more."
              width={130}
              height={42}
              className="object-contain brightness-0 invert"
            />
            <p className="text-sm text-white/30 leading-relaxed max-w-[220px]">
              {d.tagline}
            </p>
            <div className="flex gap-3">
              {[Link2, Globe, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-colors duration-200"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(d.categories).map(([category, links]) => (
            <div key={category}>
              <p className="text-[9px] font-mono font-semibold tracking-[0.28em] uppercase text-white/25 mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] font-mono text-white/20 tracking-[0.25em] uppercase">
            {d.copyright}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-white/20 tracking-[0.22em] uppercase">
              {d.made}
            </span>
            <span className="text-[#C4682A] text-[9px] font-mono tracking-[0.22em] uppercase ml-1">
              knowing more.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

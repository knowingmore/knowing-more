"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher({ locale }: { locale: "en" | "pl" }) {
  const pathname = usePathname();

  const enPath = pathname.startsWith("/pl")
    ? pathname.replace(/^\/pl/, "") || "/"
    : pathname;

  const plPath = pathname.startsWith("/pl")
    ? pathname
    : "/pl" + (pathname === "/" ? "" : pathname);

  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={enPath}
        className={`text-[10px] font-mono tracking-[0.18em] uppercase transition-colors duration-200 ${
          locale === "en"
            ? "text-[#111111]"
            : "text-[#111111]/30 hover:text-[#111111]/60"
        }`}
      >
        EN
      </Link>
      <span className="text-[#111111]/15 text-[10px] font-mono">|</span>
      <Link
        href={plPath}
        className={`text-[10px] font-mono tracking-[0.18em] uppercase transition-colors duration-200 ${
          locale === "pl"
            ? "text-[#111111]"
            : "text-[#111111]/30 hover:text-[#111111]/60"
        }`}
      >
        PL
      </Link>
    </div>
  );
}

"use client";

const items = [
  "Performance",
  "·",
  "Balance",
  "·",
  "Gut Health",
  "·",
  "Longevity",
  "·",
  "Science-Backed",
  "·",
  "No Fillers",
  "·",
  "3rd Party Tested",
  "·",
  "Precision Formulas",
  "·",
];

export default function Marquee() {
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-[#0A0A0A] py-3.5 border-y border-white/[0.05]">
      <div className="animate-marquee flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center mx-5 text-[9px] font-semibold tracking-[0.28em] uppercase ${
              item === "·" ? "text-[#1B2A4A]" : "text-white/30"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
/* ─── Types ──────────────────────────────────────────────────────── */
type Tier = 0 | 1 | 2 | 3;

interface Node {
  x: number; y: number;
  homeX: number; homeY: number;
  vx: number; vy: number;
  r: number; tier: Tier;
  pulse: number; pulseSpeed: number;
}

interface Wave { r: number; alpha: number; }

/* ─── Neural Canvas ──────────────────────────────────────────────── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes = useRef<Node[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf   = useRef<number>(0);

  const init = useCallback((w: number, h: number) => {
    const cx = w / 2, cy = h / 2;
    const built: Node[] = [];

    // Tier 0 - core amber cluster
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5;
      const dist  = 50 + Math.random() * 45;
      const hx = cx + Math.cos(angle) * dist;
      const hy = cy + Math.sin(angle) * dist;
      built.push({ x: hx, y: hy, homeX: hx, homeY: hy, vx: 0, vy: 0,
        r: 2.2 + Math.random() * 1.8, tier: 0,
        pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.018 + Math.random() * 0.012 });
    }
    // Tier 1 - inner orbital ring
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.28;
      const dist  = 155 + Math.random() * 90;
      const hx = cx + Math.cos(angle) * dist;
      const hy = cy + Math.sin(angle) * dist;
      built.push({ x: hx + (Math.random() - 0.5) * 18, y: hy + (Math.random() - 0.5) * 18,
        homeX: hx, homeY: hy, vx: 0, vy: 0,
        r: 1.4 + Math.random() * 1.4, tier: 1,
        pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.011 + Math.random() * 0.009 });
    }
    // Tier 2 - scattered mid-field
    for (let i = 0; i < 22; i++) {
      const hx = Math.random() * w, hy = Math.random() * h;
      built.push({ x: hx, y: hy, homeX: hx, homeY: hy,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: 0.6 + Math.random() * 1.0, tier: 2,
        pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.007 + Math.random() * 0.007 });
    }
    // Tier 3 - outer ring, slow rotation
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const dist  = Math.min(w, h) * 0.38 + Math.random() * 40;
      const hx = cx + Math.cos(angle) * dist;
      const hy = cy + Math.sin(angle) * dist;
      built.push({ x: hx, y: hy, homeX: hx, homeY: hy, vx: 0, vy: 0,
        r: 0.8 + Math.random() * 1.0, tier: 3,
        pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.005 + Math.random() * 0.005 });
    }
    nodes.current = built;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove  = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);

    const waves: Wave[] = [];
    let t = 0, nextWave = 140, ringAngle = 0;

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;

      // ── Pulse wave emitter ──────────────────────────────────────
      if (t >= nextWave) { waves.push({ r: 55, alpha: 0.20 }); nextWave = t + 190; }
      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].r    += 2.6;
        waves[i].alpha *= 0.962;
        if (waves[i].alpha < 0.003) { waves.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(cx, cy, waves[i].r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232,146,10,${waves[i].alpha})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // ── Central orb ─────────────────────────────────────────────
      const orbScale = 0.88 + 0.12 * Math.sin(t * 0.012);
      [
        { r: 500, a: 0.018 }, { r: 320, a: 0.04 },
        { r: 170, a: 0.075 }, { r: 75,  a: 0.13 },
      ].forEach(({ r, a }) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * orbScale);
        g.addColorStop(0, `rgba(232,146,10,${a * orbScale})`);
        g.addColorStop(1, "rgba(232,146,10,0)");
        ctx.beginPath(); ctx.arc(cx, cy, r * orbScale, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });

      // ── Rotating outer dashed ring ──────────────────────────────
      ringAngle += 0.002;
      const ringR = Math.min(canvas.width, canvas.height) * 0.4;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ringAngle);
      ctx.setLineDash([6, 18]);
      ctx.beginPath();
      ctx.arc(0, 0, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(232,146,10,${0.06 + 0.03 * Math.sin(t * 0.01)})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Second counter-rotating ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-ringAngle * 0.7);
      ctx.setLineDash([3, 28]);
      ctx.beginPath();
      ctx.arc(0, 0, ringR * 0.72, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(232,146,10,${0.04 + 0.02 * Math.sin(t * 0.008 + 1)})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // ── Nodes ───────────────────────────────────────────────────
      const mx = mouse.current.x, my = mouse.current.y;

      nodes.current.forEach((n) => {
        n.pulse += n.pulseSpeed;
        const dMx = mx - n.x, dMy = my - n.y;
        const mDist = Math.hypot(dMx, dMy);
        const mInf  = Math.max(0, 1 - mDist / 260);

        if (n.tier === 2) {
          n.x += n.vx + dMx * mInf * 0.004;
          n.y += n.vy + dMy * mInf * 0.004;
          if (n.x < 0) n.x = canvas.width;
          if (n.x > canvas.width) n.x = 0;
          if (n.y < 0) n.y = canvas.height;
          if (n.y > canvas.height) n.y = 0;
        } else if (n.tier === 3) {
          // Tier 3 slowly orbits - rotate homeX/homeY
          const hAngle = Math.atan2(n.homeY - cy, n.homeX - cx) + 0.0008;
          const hDist  = Math.hypot(n.homeX - cx, n.homeY - cy);
          n.homeX = cx + Math.cos(hAngle) * hDist;
          n.homeY = cy + Math.sin(hAngle) * hDist;
          n.x += (n.homeX - n.x) * 0.018 + dMx * mInf * 0.003;
          n.y += (n.homeY - n.y) * 0.018 + dMy * mInf * 0.003;
        } else {
          n.x += (n.homeX - n.x) * 0.022 + dMx * mInf * 0.006;
          n.y += (n.homeY - n.y) * 0.022 + dMy * mInf * 0.006;
        }

        const b      = Math.max(0.06, 0.44 + 0.56 * Math.sin(n.pulse));
        const mBoost = 1 + mInf * 1.9;
        const color  =
          n.tier === 0 ? "232,146,10"
          : n.tier === 1 ? (Math.sin(n.pulse * 0.5) > 0 ? "232,146,10" : "197,164,126")
          : n.tier === 2 ? "196,104,42"
          : "232,146,10";
        const aBase  = n.tier === 0 ? 0.78 : n.tier === 1 ? 0.52 : n.tier === 2 ? 0.24 : 0.18;
        const gBase  = n.tier === 0 ? 0.36 : n.tier === 1 ? 0.22 : n.tier === 2 ? 0.12 : 0.09;
        const glowR  = n.r * (n.tier === 0 ? 7 : 6);
        const g2     = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        g2.addColorStop(0, `rgba(${color},${gBase * b * mBoost})`);
        g2.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath(); ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = g2; ctx.fill();
        const coreR = Math.max(0.3, n.r * b);
        ctx.beginPath(); ctx.arc(n.x, n.y, coreR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${aBase * b * mBoost})`; ctx.fill();
      });

      // ── Connections ─────────────────────────────────────────────
      for (let i = 0; i < nodes.current.length; i++) {
        for (let j = i + 1; j < nodes.current.length; j++) {
          const ni = nodes.current[i], nj = nodes.current[j];
          const d  = Math.hypot(ni.x - nj.x, ni.y - nj.y);
          const maxD =
            ni.tier === 0 && nj.tier === 0 ? 195
            : ni.tier <= 1 && nj.tier <= 1 ? 160
            : ni.tier <= 2 && nj.tier <= 2 ? 98 : 70;
          if (d < maxD) {
            const s = 1 - d / maxD;
            const aBase =
              ni.tier === 0 && nj.tier === 0 ? 0.34
              : ni.tier === 0 || nj.tier === 0 ? 0.22
              : ni.tier === 1 && nj.tier === 1 ? 0.14
              : 0.07;
            ctx.beginPath(); ctx.moveTo(ni.x, ni.y); ctx.lineTo(nj.x, nj.y);
            ctx.strokeStyle = `rgba(232,146,10,${aBase * s})`;
            ctx.lineWidth   = ni.tier === 0 && nj.tier === 0 ? 1.0 : ni.tier === 1 || nj.tier === 1 ? 0.65 : 0.38;
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [init]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
}

/* ─── Letter animation ───────────────────────────────────────────── */
interface LetterProps { char: string; delay: number; amber?: boolean; inView: boolean; }
function Letter({ char, delay, amber = false, inView }: LetterProps) {
  return (
    <span className="inline-block overflow-hidden pb-[0.22em] -mb-[0.22em] pr-[0.06em] -mr-[0.06em]" aria-hidden>
      <motion.span
        className="inline-block"
        initial={{ y: "110%", opacity: 0, filter: "blur(18px)" }}
        animate={inView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
        style={amber ? { color: "#1B2A4A" } : undefined}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}

/* ─── Floating metric card ───────────────────────────────────────── */
interface MetricProps { value: string; label: string; delay: number; inView: boolean; className?: string; }
function MetricCard({ value, label, delay, inView, className = "" }: MetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay }}
      className={`inline-flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border border-[#111111]/[0.07] bg-white/60 backdrop-blur-sm ${className}`}
    >
      <span className="text-lg font-bold text-[#111111]"
        style={{ fontFamily: "var(--font-playfair)" }}>{value}</span>
      <span className="text-[8px] font-mono tracking-[0.22em] uppercase text-[#111111]/35">{label}</span>
    </motion.div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */
const word1 = [
  { ch: "k", amber: false }, { ch: "n", amber: false }, { ch: "o", amber: false },
  { ch: "w", amber: true  }, { ch: "i", amber: true  }, { ch: "n", amber: true  },
  { ch: "g", amber: false },
];
const word2 = [
  { ch: "m", amber: false }, { ch: "o", amber: false },
  { ch: "r", amber: false }, { ch: "e", amber: false },
  { ch: ".", amber: true  },
];

const TR = {
  en: {
    sectionLabel: "06 \u2014 The Signature",
    metrics: [
      { value: "47+",   label: "Active Compounds"      },
      { value: "12",    label: "Peer-Reviewed Studies"  },
      { value: "100%",  label: "Third-Party Tested"     },
      { value: "0",     label: "Unnecessary Fillers"    },
    ],
    tagline: "Good things come to those who are knowing more.",
    cta1: { label: "Shop the Collection", href: "/store" },
    cta2: { label: "Read the Science",    href: "/methods" },
    verticalLabel: "Biotech \u00B7 Longevity \u00B7 Precision",
  },
  pl: {
    sectionLabel: "06 \u2014 Znak",
    metrics: [
      { value: "47+",   label: "Aktywne związki"         },
      { value: "12",    label: "Badania naukowe"          },
      { value: "100%",  label: "Testowane niezależnie"    },
      { value: "0",     label: "Zbędnych wypełniaczy"     },
    ],
    tagline: "Bo warto wiedzieć więcej.",
    cta1: { label: "Odkryj kolekcję", href: "/pl/store"   },
    cta2: { label: "Poznaj nasze badania", href: "/pl/methods" },
    verticalLabel: "Biotechnologia \u00B7 Longevity \u00B7 Precyzja",
  },
};

/* ─── Signature ──────────────────────────────────────────────────── */
export default function Signature({ locale = "en" }: { locale?: "en" | "pl" }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const tr = TR[locale];

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ minHeight: "80vh" }}
    >
      {/* Background layer - overflow-hidden here only, so text is never clipped */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {/* Subtle dot grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(232,146,10,0.06) 1px, transparent 1px)",
            backgroundSize: "42px 42px" }} />

        {/* Neural canvas - parallax */}
        <motion.div style={{ y: bgY }} className="absolute inset-[-6%]">
          <NeuralCanvas />
        </motion.div>

        {/* Radial edge vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(255,255,255,0.88) 100%)" }} />

        {/* Top / bottom fades */}
        <div className="absolute top-0 inset-x-0 h-44"
          style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
        <div className="absolute bottom-0 inset-x-0 h-44"
          style={{ background: "linear-gradient(to top, white, transparent)" }} />
      </div>

      {/* Vertical labels */}
      <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute left-6 md:left-10 top-1/2 text-[9px] font-mono text-[#111111]/15 tracking-[0.32em] uppercase pointer-events-none select-none"
        style={{ writingMode: "vertical-lr", transform: "translateY(-50%) rotate(180deg)" }} aria-hidden>
        {tr.verticalLabel}
      </motion.p>
      <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute right-6 md:right-10 top-1/2 text-[9px] font-mono text-[#111111]/15 tracking-[0.32em] uppercase pointer-events-none select-none"
        style={{ writingMode: "vertical-lr", transform: "translateY(-50%)" }} aria-hidden>
        Est. 2024
      </motion.p>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 md:py-36">

        {/* Section marker */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-[9px] font-mono text-[#1B2A4A]/65 tracking-[0.5em] uppercase mb-10">
          {tr.sectionLabel}
        </motion.p>

        {/* Expanding rule - top */}
        <div className="relative w-full max-w-[600px] mb-12 flex items-center gap-3">
          <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-px bg-[#1B2A4A]/22 origin-right" />
          <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2.6, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A] flex-shrink-0" />
          <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-px bg-[#1B2A4A]/22 origin-left" />
        </div>

        {/* ── Brand name - cinematic per-letter ── */}
        <h2
          className="leading-[0.88] tracking-[-0.04em] text-[#111111]/85"
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(4rem, 13vw, 15rem)" }}
          aria-label="knowing more."
        >
          <span className="block">
            {word1.map((l, i) => <Letter key={i} char={l.ch} amber={l.amber} delay={0.18 + i * 0.06} inView={inView} />)}
          </span>
          <span className="block">
            {word2.map((l, i) => <Letter key={i} char={l.ch} amber={l.amber} delay={0.6 + i * 0.06} inView={inView} />)}
          </span>
        </h2>

        {/* ── Floating metric cards ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {tr.metrics.map((m, i) => (
            <MetricCard key={m.label} value={m.value} label={m.label} delay={1.1 + i * 0.1} inView={inView} />
          ))}
        </motion.div>

        {/* ── Tagline ── */}
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 1.5 }}
          className="mt-12 text-[10px] font-mono text-[#111111]/18 tracking-[0.4em] uppercase"
        >
          {tr.tagline}
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary */}
          <a
            href={tr.cta1.href}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#111111] text-white text-sm font-medium tracking-wide hover:bg-[#1B2A4A] transition-colors duration-300"
          >
            {tr.cta1.label}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
              className="text-base leading-none"
            >→</motion.span>
          </a>

          {/* Secondary */}
          <a
            href={tr.cta2.href}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#111111]/15 text-[#111111]/55 text-sm font-medium tracking-wide hover:border-[#1B2A4A]/40 hover:text-[#1B2A4A] transition-colors duration-300"
          >
            {tr.cta2.label}
            <span className="group-hover:translate-x-1 transition-transform duration-200 text-base leading-none">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

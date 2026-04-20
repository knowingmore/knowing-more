"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Neural-Current Heartbeat Canvas ───────────────────────────── */
function MolecularCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const DPR      = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const PATHS    = isMobile ? 14 : 22;
    const SEG_DEPTH = 4;                          // midpoint displacement iterations
    const HEART_PERIOD = 62;                      // frames per beat (~60 bpm @ 60fps)

    let W = 0, H = 0, CX = 0, CY = 0;

    type Pt = { x: number; y: number };
    type Path = { pts: Pt[]; cum: number[]; total: number; w: number };
    type Pulse = {
      pathIdx: number;
      prog: number;         // 0..1 progress along path
      speed: number;        // per-frame progress delta
      intensity: number;    // 0..1
      reverse: boolean;
    };

    const paths: Path[] = [];
    const pulses: Pulse[] = [];
    let t = 0;

    // Seeded random for path consistency across frames
    const rand = (seed: number) => {
      const s = Math.sin(seed) * 43758.5453;
      return s - Math.floor(s);
    };

    // Midpoint displacement between two points
    const displace = (a: Pt, b: Pt, depth: number, amp: number, seed: number): Pt[] => {
      if (depth <= 0) return [a, b];
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      // Perpendicular direction
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const r = (rand(seed) - 0.5) * 2 * amp;
      const mid = { x: mx + nx * r, y: my + ny * r };
      const left  = displace(a, mid, depth - 1, amp * 0.52, seed * 1.7 + 1);
      const right = displace(mid, b, depth - 1, amp * 0.52, seed * 2.3 + 2);
      return [...left.slice(0, -1), ...right];
    };

    const buildPath = (seed: number, startAngle: number, reach: number): Path => {
      // Path radiates outward from slightly off-center, with irregular endpoint
      const innerR = reach * 0.08;
      const outerR = reach * (0.55 + rand(seed * 3.1) * 0.45);
      const wobble = (rand(seed * 5.7) - 0.5) * 0.6;
      const endAngle = startAngle + wobble;

      const a: Pt = {
        x: CX + Math.cos(startAngle) * innerR,
        y: CY + Math.sin(startAngle) * innerR,
      };
      const b: Pt = {
        x: CX + Math.cos(endAngle) * outerR,
        y: CY + Math.sin(endAngle) * outerR,
      };

      const amp = reach * (0.12 + rand(seed * 7.3) * 0.14);
      const pts = displace(a, b, SEG_DEPTH, amp, seed);

      // Cumulative arc length
      const cum: number[] = [0];
      for (let i = 1; i < pts.length; i++) {
        cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
      }
      return { pts, cum, total: cum[cum.length - 1], w: 0.8 + rand(seed * 11.1) * 0.6 };
    };

    const build = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      CX = W / 2;
      CY = H / 2;
      canvas.width  = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const reach = Math.min(W, H) * 0.62;
      paths.length = 0;
      for (let i = 0; i < PATHS; i++) {
        // Distribute angles with jitter
        const base = (i / PATHS) * Math.PI * 2;
        const jitter = (rand(i * 13.37) - 0.5) * 0.35;
        paths.push(buildPath(i + 1, base + jitter, reach));
      }
    };

    build();
    window.addEventListener("resize", build, { passive: true });

    // Sample point at progress p (0..1) along a path, with tangent
    const sampleAt = (path: Path, p: number) => {
      const target = p * path.total;
      // Binary search
      let lo = 0, hi = path.cum.length - 1;
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1;
        if (path.cum[mid] <= target) lo = mid; else hi = mid;
      }
      const segLen = path.cum[hi] - path.cum[lo] || 1;
      const f = (target - path.cum[lo]) / segLen;
      const a = path.pts[lo], b = path.pts[hi];
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
    };

    // Emit a pulse on a given path
    const emitPulse = (pathIdx: number, intensity: number) => {
      const reverse = Math.random() < 0.25;
      pulses.push({
        pathIdx,
        prog: reverse ? 1 : 0,
        speed: (isMobile ? 0.016 : 0.014) + Math.random() * 0.008,
        intensity,
        reverse,
      });
    };

    // ECG P-QRS-T beat pattern — offsets within the beat period, pulse counts, intensities
    // P wave: small, 1 path.  QRS: big spike, many paths.  T: medium, few paths.
    const triggerBeat = (phase: number) => {
      // phase 0..HEART_PERIOD
      if (phase === 0) {
        // P wave
        emitPulse(Math.floor(Math.random() * PATHS), 0.35);
      } else if (phase === 10) {
        // QRS spike
        const count = isMobile ? 4 : 6;
        for (let i = 0; i < count; i++) {
          emitPulse(Math.floor(Math.random() * PATHS), 0.9 + Math.random() * 0.1);
        }
      } else if (phase === 13) {
        // Q-S tail extra
        const count = isMobile ? 2 : 3;
        for (let i = 0; i < count; i++) {
          emitPulse(Math.floor(Math.random() * PATHS), 0.75);
        }
      } else if (phase === 30) {
        // T wave
        const count = isMobile ? 2 : 3;
        for (let i = 0; i < count; i++) {
          emitPulse(Math.floor(Math.random() * PATHS), 0.5);
        }
      }
    };

    const draw = () => {
      t++;
      const phase = t % HEART_PERIOD;
      triggerBeat(phase);

      // Background wash (charcoal) — slight trail by using semi-transparent overlay
      ctx.fillStyle = "#0F0F0F";
      ctx.fillRect(0, 0, W, H);

      // Heartbeat glow at center — strongest right at QRS
      const beatT = phase / HEART_PERIOD;
      // Amplitude envelope mimicking ECG
      const ecg =
        Math.exp(-Math.pow((phase - 0)  / 3, 2)) * 0.25 +  // P
        Math.exp(-Math.pow((phase - 11) / 2, 2)) * 1.0  +  // QRS
        Math.exp(-Math.pow((phase - 31) / 4, 2)) * 0.45;   // T

      // ── Idle paths (subtle grey trace) ──────────────────────
      paths.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.pts[0].x, p.pts[0].y);
        for (let i = 1; i < p.pts.length; i++) ctx.lineTo(p.pts[i].x, p.pts[i].y);
        ctx.strokeStyle = "rgba(170,170,170,0.09)";
        ctx.lineWidth = p.w * 0.6;
        ctx.stroke();
      });

      // ── Central heart glow ──────────────────────────────────
      const glowR = Math.min(W, H) * (0.08 + ecg * 0.18);
      const gg = ctx.createRadialGradient(CX, CY, 0, CX, CY, glowR * 2);
      gg.addColorStop(0, `rgba(232,146,10,${0.14 + ecg * 0.32})`);
      gg.addColorStop(0.5, `rgba(232,146,10,${0.04 + ecg * 0.1})`);
      gg.addColorStop(1, "rgba(232,146,10,0)");
      ctx.fillStyle = gg;
      ctx.beginPath();
      ctx.arc(CX, CY, glowR * 2, 0, Math.PI * 2);
      ctx.fill();

      // Central core dot
      ctx.beginPath();
      ctx.arc(CX, CY, 2.5 + ecg * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,210,140,${0.6 + ecg * 0.4})`;
      ctx.fill();

      // ── Pulses travelling along paths ──────────────────────
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pu = pulses[i];
        pu.prog += pu.reverse ? -pu.speed : pu.speed;
        if (pu.prog < 0 || pu.prog > 1) { pulses.splice(i, 1); continue; }

        const path = paths[pu.pathIdx];
        const head = sampleAt(path, pu.prog);

        // Trail: draw gradient along path from (prog - trailLen) to prog
        const trailLen = 0.18;
        const tail = Math.max(0, Math.min(1, pu.prog - (pu.reverse ? -trailLen : trailLen)));
        const from = pu.reverse ? pu.prog : tail;
        const to   = pu.reverse ? tail    : pu.prog;

        // Walk path segments within [from, to] — cheap: sample N points
        const STEPS = 14;
        ctx.lineCap = "round";
        for (let s = 0; s < STEPS; s++) {
          const f1 = from + ((to - from) * s) / STEPS;
          const f2 = from + ((to - from) * (s + 1)) / STEPS;
          const p1 = sampleAt(path, f1);
          const p2 = sampleAt(path, f2);
          const alongHead = pu.reverse ? (1 - (f2 - tail) / trailLen) : ((f2 - tail) / trailLen);
          const a = Math.max(0, Math.min(1, alongHead));
          const alpha = Math.pow(a, 2.2) * pu.intensity;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(232,146,10,${alpha * 0.85})`;
          ctx.lineWidth = path.w * (0.9 + a * 1.6);
          ctx.stroke();
        }

        // Head glow
        const hr = 14 + pu.intensity * 10;
        const hg = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, hr);
        hg.addColorStop(0, `rgba(255,210,140,${0.85 * pu.intensity})`);
        hg.addColorStop(0.4, `rgba(232,146,10,${0.4 * pu.intensity})`);
        hg.addColorStop(1, "rgba(232,146,10,0)");
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(head.x, head.y, hr, 0, Math.PI * 2);
        ctx.fill();

        // Head core
        ctx.beginPath();
        ctx.arc(head.x, head.y, 1.8 + pu.intensity * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,230,180,${0.95 * pu.intensity})`;
        ctx.fill();
      }

      // Suppress unused warning for beatT
      void beatT;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}


const HERO_TR = {
  en: {
    eyebrow: "Longevity Supplements",
    subtitle: <>Good things come to those who are knowing more.<br />Three formulas built for healthspan, not just lifespan.</>,
    cta1: "Explore the system",
    cta2: "Our science",
    meta: "Healthspan, not just lifespan",
  },
  pl: {
    eyebrow: "Suplementy Longevity",
    subtitle: <>Trzy formuły dla tych, którzy traktują zdrowie poważnie.<br />Nie tylko dziś — na całe życie.</>,
    cta1: "Odkryj formuły",
    cta2: "Sprawdź badania",
    meta: "Zdrowe lata, nie tylko długie",
  },
};

/* ─── Hero ───────────────────────────────────────────────────────── */
export default function Hero({ locale = "en" }: { locale?: "en" | "pl" }) {
  const tr = HERO_TR[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const fadeOut   = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const scaleDown = useTransform(scrollYProgress, [0, 0.5],  [1, 0.93]);
  const blurOut   = useTransform(scrollYProgress, [0.12, 0.48], [0, 20]);

  return (
    <div ref={containerRef}>

      {/* ═══════════════════════════════════════════
          MOBILE LAYOUT
          - Full-screen animation with headline centered
          - White section below with subtitle + CTAs
      ════════════════════════════════════════════ */}
      <div className="md:hidden min-h-screen flex flex-col bg-white overflow-hidden">

        {/* Animation + headline — top portion */}
        <div className="relative h-[54vh] flex items-center justify-center flex-shrink-0">
          <MolecularCanvas />

          {/* Bottom fade into white */}
          <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, transparent, white 95%)" }}
            aria-hidden />

          {/* Centered headline */}
          <motion.div
            style={{ opacity: fadeOut }}
            className="relative z-10 text-center px-6"
          >
            {/* Top rule */}
            <div className="flex items-center gap-3 mb-4 max-w-[280px] mx-auto">
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 h-px bg-[#E8920A]/22 origin-right" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1.8 }}
                className="w-1.5 h-1.5 rounded-full bg-[#E8920A] flex-shrink-0" />
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 h-px bg-[#E8920A]/22 origin-left" />
            </div>

            <motion.h1
              initial={{ opacity: 0, filter: "blur(36px)", scale: 1.04 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 2.2, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              className="leading-[0.88] tracking-[-0.03em] text-[#111111]"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3.8rem, 20vw, 6rem)" }}
            >
              <span className="block">kno<span style={{ color: "#E8920A" }}>win</span>g</span>
              <span className="block">more<span style={{ color: "#E8920A" }}>.</span></span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Text content — visible on same screen */}
        <div className="flex-1 bg-white px-6 pt-2 pb-10 flex flex-col items-center text-center justify-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={{ opacity: 1, letterSpacing: "0.42em" }}
            transition={{ duration: 1.6, delay: 0.5, ease: "easeOut" }}
            className="text-[10px] font-mono uppercase text-[#E8920A] mb-4"
          >
            {tr.eyebrow}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 2.7 }}
            className="text-sm text-[#111111]/38 leading-[1.85] tracking-wide max-w-[300px] mb-6"
          >
            {tr.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 2.9 }}
            className="flex items-center gap-8 mb-6"
          >
            <a href="#products"
              className="group flex items-center gap-2 text-[#111111] text-sm font-medium tracking-wide border-b border-[#111111]/20 pb-0.5 hover:border-[#E8920A] hover:text-[#E8920A] transition-colors duration-300">
              {tr.cta1}
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
            <a href="#science"
              className="text-[#111111]/28 text-sm tracking-wide hover:text-[#111111]/55 transition-colors duration-200">
              {tr.cta2}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 3.1, duration: 0.9 }}
            className="w-full max-w-[340px] pt-4 flex items-center justify-between border-t border-[#111111]/[0.07]"
          >
            <div className="flex items-center gap-2">
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-[#E8920A]" />
              <span className="text-[9px] font-mono text-[#111111]/35 tracking-[0.2em] uppercase">{tr.meta}</span>
            </div>
            <span className="text-[9px] font-mono text-[#111111]/35 tracking-[0.25em] uppercase">Est. 2024</span>
          </motion.div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════
          DESKTOP LAYOUT — unchanged
      ════════════════════════════════════════════ */}
      <section className="hidden md:flex relative min-h-screen flex-col items-center justify-center bg-white overflow-hidden">
        <MolecularCanvas />

        <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, transparent, white 85%)" }} aria-hidden />

        <motion.div
          style={{ opacity: fadeOut, scale: scaleDown, filter: `blur(${blurOut}px)` as unknown as string }}
          className="relative z-10 w-full flex flex-col items-center text-center px-6 pt-28 pb-20"
        >
          <motion.p initial={{ opacity: 0, letterSpacing: "0.7em" }} animate={{ opacity: 1, letterSpacing: "0.42em" }}
            transition={{ duration: 1.6, delay: 0.5, ease: "easeOut" }}
            className="text-[10px] font-mono uppercase text-[#E8920A] mb-10">
            {tr.eyebrow}
          </motion.p>

          <div className="w-full max-w-[560px] flex items-center gap-3 mb-10">
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-px bg-[#E8920A]/22 origin-right" />
            <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 1.8 }}
              className="w-1.5 h-1.5 rounded-full bg-[#E8920A] flex-shrink-0" />
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-px bg-[#E8920A]/22 origin-left" />
          </div>

          <motion.h1
            initial={{ opacity: 0, filter: "blur(36px)", scale: 1.04 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 2.2, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="leading-[0.88] tracking-[-0.03em] text-[#111111]"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(4.2rem, 12vw, 14rem)" }}
          >
            <span className="block">kno<span style={{ color: "#E8920A" }}>win</span>g</span>
            <span className="block">more<span style={{ color: "#E8920A" }}>.</span></span>
          </motion.h1>

          <div className="w-full max-w-[480px] mt-10 mb-8 flex items-center gap-3">
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-px bg-[#111111]/10 origin-right" />
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-px bg-[#111111]/10 origin-left" />
          </div>

          <motion.p initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 2.7 }}
            className="text-sm text-[#111111]/32 leading-[1.8] tracking-wide max-w-[340px]">
            {tr.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.0, delay: 2.9 }}
            className="mt-10 flex items-center gap-8">
            <a href="#products"
              className="group flex items-center gap-2.5 text-[#111111] text-sm font-medium tracking-wide border-b border-[#111111]/20 pb-0.5 hover:border-[#E8920A] hover:text-[#E8920A] transition-colors duration-300">
              {tr.cta1}
              <span className="group-hover:translate-x-1.5 transition-transform duration-200 text-base leading-none">→</span>
            </a>
            <a href="#science"
              className="text-[#111111]/28 text-sm tracking-wide hover:text-[#111111]/55 transition-colors duration-200">
              {tr.cta2}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 3.1, duration: 0.9 }}
            className="mt-16 w-full max-w-[700px] pt-6 flex items-center justify-between border-t border-[#111111]/[0.07]">
            <div className="flex items-center gap-3">
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-[#E8920A]" />
              <span className="text-[9px] font-mono text-[#111111]/45 tracking-[0.22em] uppercase hidden sm:inline">{tr.meta}</span>
            </div>
            <span className="text-[9px] font-mono text-[#111111]/45 tracking-[0.25em] uppercase">Est.&nbsp;2024</span>
          </motion.div>

        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 3.4 }} style={{ opacity: fadeOut }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20" aria-hidden>
          <motion.div animate={{ y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-[#111111]/20 to-transparent" />
        </motion.div>
      </section>
    </div>
  );
}

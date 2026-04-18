"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── 3D Molecular Network ───────────────────────────────────────── */
function MolecularCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const mouse     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Node definition ──────────────────────────────────────────
    type Node3D = {
      ox: number; oy: number; oz: number;   // original position on unit sphere
      x:  number; y:  number; z:  number;   // current (after rotation)
      sx: number; sy: number;               // screen projection
      vx: number; vy: number; vz: number;   // velocity (for mouse repulsion)
      r:  number;                           // base radius
      pulse: number; pulseSpeed: number;
      tier: 0 | 1 | 2;
    };

    const NODES   = 72;
    const FOV     = 560;
    const CONNECT = 165;  // max screen-distance for connection lines
    const dROT_Y  = 0.0018;
    const dROT_X  = 0.0006;
    let W = 0, H = 0, CX = 0, CY = 0;
    const nodes: Node3D[] = [];

    // ── Pulse waves ──────────────────────────────────────────────
    const waves: { r: number; alpha: number }[] = [];
    let t = 0, nextWave = 120;

    // ── Build nodes on sphere ────────────────────────────────────
    const build = () => {
      W  = canvas.offsetWidth;
      H  = canvas.offsetHeight;
      CX = W / 2;
      CY = H / 2;
      canvas.width  = W;
      canvas.height = H;

      nodes.length = 0;

      // Fibonacci sphere distribution
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < NODES; i++) {
        const y  = 1 - (i / (NODES - 1)) * 2;
        const r  = Math.sqrt(1 - y * y);
        const th = golden * i;
        const x  = Math.cos(th) * r;
        const z  = Math.sin(th) * r;

        const scale = Math.min(W, H) * 0.36;
        const tier: 0 | 1 | 2 =
          i < 6  ? 0 :
          i < 24 ? 1 : 2;

        nodes.push({
          ox: x * scale, oy: y * scale, oz: z * scale,
          x:  x * scale, y:  y * scale, z:  z * scale,
          sx: 0, sy: 0,
          vx: 0, vy: 0, vz: 0,
          r:  tier === 0 ? 2.8 + Math.random() * 1.6
            : tier === 1 ? 1.6 + Math.random() * 1.2
            :              0.7 + Math.random() * 1.0,
          pulse:      Math.random() * Math.PI * 2,
          pulseSpeed: 0.006 + Math.random() * 0.010,
          tier,
        });
      }
    };

    build();
    window.addEventListener("resize", build, { passive: true });

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseleave", onLeave);

    // ── 3-D rotation helpers ─────────────────────────────────────
    const rotateY = (x: number, z: number, a: number) => ({
      x: x * Math.cos(a) + z * Math.sin(a),
      z: -x * Math.sin(a) + z * Math.cos(a),
    });
    const rotateX = (y: number, z: number, a: number) => ({
      y: y * Math.cos(a) - z * Math.sin(a),
      z: y * Math.sin(a) + z * Math.cos(a),
    });

    // ── Draw ─────────────────────────────────────────────────────
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // ── Update + project nodes ───────────────────────────────
      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;

        // Rotate home position by delta each frame (slow sphere rotation)
        const rY = rotateY(n.ox, n.oz, dROT_Y);
        const rX = rotateX(n.oy, rY.z, dROT_X);
        n.ox = rY.x;
        n.oy = rX.y;
        n.oz = rX.z;

        // Spring back to rotating home
        n.vx += (n.ox - n.x) * 0.012;
        n.vy += (n.oy - n.y) * 0.012;
        n.vz += (n.oz - n.z) * 0.012;

        // Velocity damping
        n.vx *= 0.82;
        n.vy *= 0.82;
        n.vz *= 0.82;
        n.x = n.ox + n.vx;
        n.y = n.oy + n.vy;
        n.z = n.oz + n.vz;

        // Perspective projection
        const scale = FOV / (FOV + n.z);
        n.sx = CX + n.x * scale;
        n.sy = CY + n.y * scale;

        // Mouse repulsion (screen space)
        const dx = n.sx - mx;
        const dy = n.sy - my;
        const d  = Math.hypot(dx, dy);
        const rr = n.tier === 0 ? 310 : 260;
        if (d < rr && d > 1) {
          const strength = n.tier === 0 ? 20 : n.tier === 1 ? 13 : 8;
          const f = Math.pow(1 - d / rr, 1.5) * strength;
          n.vx += (dx / d) * f * scale;
          n.vy += (dy / d) * f * scale;
        }
      });

      // ── Sort by z (painters algorithm) ──────────────────────
      const sorted = [...nodes].sort((a, b) => a.z - b.z);

      // ── Connection lines ──────────────────────────────────────
      for (let i = 0; i < sorted.length; i++) {
        for (let j = i + 1; j < sorted.length; j++) {
          const ni = sorted[i], nj = sorted[j];
          const d = Math.hypot(ni.sx - nj.sx, ni.sy - nj.sy);
          if (d > CONNECT) continue;

          const depthFade = Math.min(
            (FOV / (FOV + ni.z)) * 0.5 + 0.5,
            (FOV / (FOV + nj.z)) * 0.5 + 0.5
          );
          const alpha = (1 - d / CONNECT) * 0.22 * depthFade;
          const tierAlpha =
            ni.tier === 0 && nj.tier === 0 ? alpha * 2.2 :
            ni.tier <= 1 && nj.tier <= 1   ? alpha * 1.5 : alpha;

          ctx.beginPath();
          ctx.moveTo(ni.sx, ni.sy);
          ctx.lineTo(nj.sx, nj.sy);
          ctx.strokeStyle = `rgba(232,146,10,${Math.min(tierAlpha, 0.38)})`;
          ctx.lineWidth = ni.tier === 0 && nj.tier === 0 ? 0.9 : 0.5;
          ctx.stroke();
        }
      }

      // ── Pulse waves from centre ───────────────────────────────
      if (t >= nextWave) { waves.push({ r: 40, alpha: 0.18 }); nextWave = t + 160; }
      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].r     += 2.8;
        waves[i].alpha *= 0.960;
        if (waves[i].alpha < 0.003) { waves.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(CX, CY, waves[i].r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232,146,10,${waves[i].alpha})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // ── Central orb glow ─────────────────────────────────────
      const pulse = 0.82 + 0.18 * Math.sin(t * 0.014);
      [
        { r: 380, a: 0.018 }, { r: 220, a: 0.038 },
        { r: 110, a: 0.07  }, { r: 55,  a: 0.12  },
      ].forEach(({ r, a }) => {
        const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, r * pulse);
        g.addColorStop(0, `rgba(232,146,10,${a * pulse})`);
        g.addColorStop(1, "rgba(232,146,10,0)");
        ctx.beginPath();
        ctx.arc(CX, CY, r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // ── Draw nodes ────────────────────────────────────────────
      sorted.forEach((n) => {
        const depthScale = FOV / (FOV + n.z);
        const b = Math.max(0.08, 0.45 + 0.55 * Math.sin(n.pulse));
        const r = Math.max(0.3, n.r * depthScale * b);

        const color =
          n.tier === 0 ? "232,146,10"  :
          n.tier === 1 ? (Math.sin(n.pulse * 0.5) > 0 ? "232,146,10" : "210,125,8") :
                         "196,104,42";

        const baseAlpha = n.tier === 0 ? 0.85 : n.tier === 1 ? 0.60 : 0.35;
        const glowAlpha = n.tier === 0 ? 0.28 : n.tier === 1 ? 0.16 : 0.08;
        const glowR     = r * (n.tier === 0 ? 8 : 6);

        // Glow halo
        const g = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, glowR);
        g.addColorStop(0, `rgba(${color},${glowAlpha * b * depthScale})`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${baseAlpha * b * depthScale})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",    build);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
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
      <div className="md:hidden">

        {/* Animation + headline */}
        <section className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
          <MolecularCanvas />

          {/* Bottom fade into white */}
          <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, transparent, white 90%)" }}
            aria-hidden />

          {/* Centered headline only */}
          <motion.div
            style={{ opacity: fadeOut }}
            className="relative z-10 text-center px-6"
          >
            {/* Top rule */}
            <div className="flex items-center gap-3 mb-6 max-w-[280px] mx-auto">
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
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(4.4rem, 22vw, 7rem)" }}
            >
              <span className="block">kno<span style={{ color: "#E8920A" }}>win</span>g</span>
              <span className="block">more<span style={{ color: "#E8920A" }}>.</span></span>
            </motion.h1>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 3.4 }} style={{ opacity: fadeOut }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20" aria-hidden>
            <motion.div animate={{ y: [0, 9, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-[#111111]/20 to-transparent" />
          </motion.div>
        </section>

        {/* Below fold — white background */}
        <div className="bg-white px-6 pt-10 pb-14 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={{ opacity: 1, letterSpacing: "0.42em" }}
            transition={{ duration: 1.6, delay: 0.5, ease: "easeOut" }}
            className="text-[10px] font-mono uppercase text-[#E8920A] mb-5"
          >
            {tr.eyebrow}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 2.7 }}
            className="text-sm text-[#111111]/38 leading-[1.85] tracking-wide max-w-[300px] mb-8"
          >
            {tr.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 2.9 }}
            className="flex items-center gap-8 mb-10"
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
            className="w-full max-w-[340px] pt-5 flex items-center justify-between border-t border-[#111111]/[0.07]"
          >
            <span className="text-[9px] font-mono text-[#111111]/35 tracking-[0.25em] uppercase">KM — 001</span>
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
            <span className="text-[9px] font-mono text-[#111111]/45 tracking-[0.25em] uppercase">KM &mdash; 001</span>
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

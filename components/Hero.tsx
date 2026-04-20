"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Neural-Current Heartbeat Canvas ───────────────────────────── */
/* ─── Neural Network Canvas — synapses with electrical current ──── */
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

    // Network size
    const NODES        = isMobile ? 38 : 72;
    const NEIGHBOURS   = isMobile ? 3  : 4;   // edges per node (approx)
    // Heartbeat: 48 bpm → 1 beat / 1.25s → 75 frames @ 60fps
    const BEAT_PERIOD  = 75;
    // Pulses per beat
    const PULSES_MIN   = 2;
    const PULSES_MAX   = 4;

    let W = 0, H = 0;

    type Node = { x: number; y: number; z: number; r: number; edges: number[] };
    type Edge = { a: number; b: number; len: number };
    type Pulse = {
      edgeIdx: number;
      from: number;       // node index we started from (a or b)
      prog: number;       // 0..1 along edge from "from"
      speed: number;
      intensity: number;
      hops: number;       // remaining node-to-node hops
    };

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const pulses: Pulse[] = [];
    let t = 0;

    // Electric current colors (cool-white with slight blueshift)
    const PULSE_CORE = "230,240,255";
    const PULSE_GLOW = "160,200,255";

    const seedRand = (s: number) => {
      const v = Math.sin(s) * 43758.5453;
      return v - Math.floor(v);
    };

    const build = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      nodes.length = 0;
      edges.length = 0;
      pulses.length = 0;

      // Poisson-ish distribution via blue-noise rejection
      const margin = Math.min(W, H) * 0.06;
      const minDist = Math.min(W, H) / (isMobile ? 7.5 : 10);
      let attempts = 0;
      while (nodes.length < NODES && attempts < NODES * 40) {
        attempts++;
        const x = margin + seedRand(attempts * 2.17 + nodes.length * 3.3) * (W - margin * 2);
        const y = margin + seedRand(attempts * 5.91 + nodes.length * 7.7) * (H - margin * 2);
        let ok = true;
        for (const n of nodes) {
          if (Math.hypot(n.x - x, n.y - y) < minDist) { ok = false; break; }
        }
        if (!ok) continue;
        const z = seedRand(attempts * 11.3 + nodes.length) ; // 0..1 depth
        nodes.push({ x, y, z, r: 0.9 + seedRand(attempts) * 1.1, edges: [] });
      }

      // Connect each node to its K nearest neighbours (undirected, dedup)
      const key = (a: number, b: number) => a < b ? `${a}-${b}` : `${b}-${a}`;
      const seen = new Set<string>();
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        const dists: { j: number; d: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          dists.push({ j, d: Math.hypot(nodes[j].x - ni.x, nodes[j].y - ni.y) });
        }
        dists.sort((a, b) => a.d - b.d);
        const k = NEIGHBOURS + (seedRand(i * 19.4) > 0.7 ? 1 : 0);
        for (let m = 0; m < k && m < dists.length; m++) {
          const j = dists[m].j;
          const k2 = key(i, j);
          if (seen.has(k2)) continue;
          seen.add(k2);
          const idx = edges.length;
          edges.push({ a: i, b: j, len: dists[m].d });
          ni.edges.push(idx);
          nodes[j].edges.push(idx);
        }
      }
    };

    build();
    window.addEventListener("resize", build, { passive: true });

    // Spawn pulse travelling from node "from" along edge
    const spawnPulse = (edgeIdx: number, from: number, intensity: number, hops: number) => {
      pulses.push({
        edgeIdx,
        from,
        prog: 0,
        speed: 0.010 + Math.random() * 0.006,
        intensity,
        hops,
      });
    };

    // Emit beat: pick N random edges, launch pulses
    const emitBeat = () => {
      const n = PULSES_MIN + Math.floor(Math.random() * (PULSES_MAX - PULSES_MIN + 1));
      const usedEdges = new Set<number>();
      for (let i = 0; i < n; i++) {
        let tries = 0;
        while (tries < 10) {
          const eIdx = Math.floor(Math.random() * edges.length);
          if (!usedEdges.has(eIdx)) {
            usedEdges.add(eIdx);
            const e = edges[eIdx];
            const from = Math.random() < 0.5 ? e.a : e.b;
            spawnPulse(eIdx, from, 0.85 + Math.random() * 0.15, 2 + Math.floor(Math.random() * 2));
            break;
          }
          tries++;
        }
      }
    };

    // Continuous faint ambient pulses — emit occasionally between beats
    let nextAmbient = 25;

    const draw = () => {
      t++;

      // Trigger heartbeat: QRS spike at phase 0 of each period
      const phase = t % BEAT_PERIOD;
      if (phase === 0) emitBeat();
      // Ambient drift: very subtle single pulses between beats
      if (t >= nextAmbient) {
        const eIdx = Math.floor(Math.random() * edges.length);
        const e = edges[eIdx];
        spawnPulse(eIdx, Math.random() < 0.5 ? e.a : e.b, 0.28 + Math.random() * 0.15, 1);
        nextAmbient = t + 40 + Math.floor(Math.random() * 50);
      }

      // Background — cream matches rest of site
      ctx.fillStyle = "#FAFAF7";
      ctx.fillRect(0, 0, W, H);

      // Heart envelope for subtle overall brighten — very gentle
      const ecg =
        Math.exp(-Math.pow((phase - 0)  / 3, 2)) * 0.35 +
        Math.exp(-Math.pow((phase - 14) / 5, 2)) * 0.20;

      // ── Edges (synapse traces) ──────────────────────────
      for (const e of edges) {
        const na = nodes[e.a], nb = nodes[e.b];
        // Depth mix — farther (higher z) = lighter/thinner
        const zAvg = (na.z + nb.z) / 2;
        const depthAlpha = 0.08 + (1 - zAvg) * 0.14;   // 0.08..0.22
        const depthWidth = 0.35 + (1 - zAvg) * 0.5;    // 0.35..0.85
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(90,95,105,${depthAlpha + ecg * 0.03})`;
        ctx.lineWidth = depthWidth;
        ctx.stroke();
      }

      // ── Nodes (synapse cell bodies) ─────────────────────
      for (const n of nodes) {
        const depthAlpha = 0.18 + (1 - n.z) * 0.28;
        const r = n.r * (0.7 + (1 - n.z) * 0.6);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(90,95,105,${depthAlpha})`;
        ctx.fill();
      }

      // ── Pulses travelling ───────────────────────────────
      ctx.lineCap = "round";
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pu = pulses[i];
        pu.prog += pu.speed;

        const edge = edges[pu.edgeIdx];
        const startIdx = pu.from;
        const endIdx   = startIdx === edge.a ? edge.b : edge.a;
        const s = nodes[startIdx];
        const e = nodes[endIdx];

        const p = Math.min(1, pu.prog);
        const hx = s.x + (e.x - s.x) * p;
        const hy = s.y + (e.y - s.y) * p;

        // Trail
        const trailLen = 0.35;
        const tailP = Math.max(0, p - trailLen);
        const STEPS = 8;
        for (let st = 0; st < STEPS; st++) {
          const f1 = tailP + ((p - tailP) * st) / STEPS;
          const f2 = tailP + ((p - tailP) * (st + 1)) / STEPS;
          const x1 = s.x + (e.x - s.x) * f1;
          const y1 = s.y + (e.y - s.y) * f1;
          const x2 = s.x + (e.x - s.x) * f2;
          const y2 = s.y + (e.y - s.y) * f2;
          const alongHead = (f2 - tailP) / trailLen;
          const a = Math.pow(Math.max(0, Math.min(1, alongHead)), 2.5);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(${PULSE_GLOW},${a * pu.intensity * 0.55})`;
          ctx.lineWidth = 1.2 + a * 1.2;
          ctx.stroke();
        }

        // Head glow
        const hr = 7 + pu.intensity * 6;
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr);
        hg.addColorStop(0, `rgba(${PULSE_CORE},${0.75 * pu.intensity})`);
        hg.addColorStop(0.4, `rgba(${PULSE_GLOW},${0.4 * pu.intensity})`);
        hg.addColorStop(1, `rgba(${PULSE_GLOW},0)`);
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(hx, hy, hr, 0, Math.PI * 2);
        ctx.fill();

        // Head core
        ctx.beginPath();
        ctx.arc(hx, hy, 1.3 + pu.intensity * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PULSE_CORE},${0.95 * pu.intensity})`;
        ctx.fill();

        // Finished this edge → hop to a connected edge or die
        if (pu.prog >= 1) {
          pu.hops -= 1;
          if (pu.hops <= 0) { pulses.splice(i, 1); continue; }
          const endNode = nodes[endIdx];
          const nextEdges = endNode.edges.filter((x) => x !== pu.edgeIdx);
          if (!nextEdges.length) { pulses.splice(i, 1); continue; }
          const nextEdgeIdx = nextEdges[Math.floor(Math.random() * nextEdges.length)];
          pu.edgeIdx = nextEdgeIdx;
          pu.from = endIdx;
          pu.prog = 0;
          pu.intensity *= 0.75; // fade as it travels deeper
          if (pu.intensity < 0.12) { pulses.splice(i, 1); continue; }
        }
      }

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
      <div className="md:hidden min-h-screen flex flex-col bg-[#FAFAF7] overflow-hidden">

        {/* Animation + headline — top portion */}
        <div className="relative h-[54vh] flex items-center justify-center flex-shrink-0">
          <MolecularCanvas />

          {/* Bottom fade into white */}
          <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, transparent, #FAFAF7 95%)" }}
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
        <div className="flex-1 bg-[#FAFAF7] px-6 pt-2 pb-10 flex flex-col items-center text-center justify-center">
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
      <section className="hidden md:flex relative min-h-screen flex-col items-center justify-center bg-[#FAFAF7] overflow-hidden">
        <MolecularCanvas />

        <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, transparent, #FAFAF7 85%)" }} aria-hidden />

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

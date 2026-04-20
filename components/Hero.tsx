"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

/* ─── Neural Connectome — WebGL 3D network with scroll dolly + heartbeat ─ */
function MolecularCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const DPR      = Math.min(window.devicePixelRatio || 1, 2);

    // ── Scene / camera / renderer ──────────────────────────────────
    const scene = new THREE.Scene();
    // Fog matches charcoal bg so distant geometry fades into the dark
    scene.fog = new THREE.Fog(0x12141a, 90, 260);

    let W = container.clientWidth;
    let H = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 1000);
    camera.position.set(0, 0, 180);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(DPR);
    renderer.setSize(W, H, false);
    // Transparent canvas — container CSS bg controls color (and can lerp via scroll)
    renderer.setClearColor(0x000000, 0);

    // ── Build connectome (clustered nodes) ─────────────────────────
    const NODES           = isMobile ? 110 : 200;
    const K               = isMobile ? 3   : 4;
    const CLUSTER_COUNT   = isMobile ? 5   : 8;
    const BOUNDS          = 70;

    const clusterCenters: THREE.Vector3[] = [];
    for (let i = 0; i < CLUSTER_COUNT; i++) {
      clusterCenters.push(new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS * 1.4,
        (Math.random() - 0.5) * BOUNDS * 1.4,
        (Math.random() - 0.5) * BOUNDS * 1.4,
      ));
    }

    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < NODES; i++) {
      if (Math.random() < 0.8) {
        const c  = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
        const u  = Math.random(), v = Math.random();
        const th = u * 2 * Math.PI;
        const ph = Math.acos(2 * v - 1);
        const r  = (12 + Math.random() * 16) * Math.cbrt(Math.random());
        positions.push(new THREE.Vector3(
          c.x + r * Math.sin(ph) * Math.cos(th),
          c.y + r * Math.sin(ph) * Math.sin(th),
          c.z + r * Math.cos(ph),
        ));
      } else {
        positions.push(new THREE.Vector3(
          (Math.random() - 0.5) * BOUNDS * 1.8,
          (Math.random() - 0.5) * BOUNDS * 1.8,
          (Math.random() - 0.5) * BOUNDS * 1.8,
        ));
      }
    }

    // k-NN edges
    type Edge = { a: number; b: number };
    const edges: Edge[] = [];
    const nodeEdges: number[][] = positions.map(() => []);
    const seen = new Set<string>();
    for (let i = 0; i < positions.length; i++) {
      const dists: { j: number; d: number }[] = [];
      for (let j = 0; j < positions.length; j++) {
        if (i !== j) dists.push({ j, d: positions[i].distanceTo(positions[j]) });
      }
      dists.sort((a, b) => a.d - b.d);
      const kk = K + (Math.random() > 0.75 ? 1 : 0);
      for (let k = 0; k < kk && k < dists.length; k++) {
        const j = dists[k].j;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const idx = edges.length;
        edges.push({ a: i, b: j });
        nodeEdges[i].push(idx);
        nodeEdges[j].push(idx);
      }
    }

    // ── Group so auto-rotation lifts everything ───────────────────
    const network = new THREE.Group();
    scene.add(network);

    // ── Organic axon paths (CatmullRom spline with 3-4 waypoints) ─
    // Each edge wiggles like a real axon: origin → several drift points → terminal.
    const SAMPLES = isMobile ? 20 : 28;
    const edgeCurves: THREE.Vector3[][] = [];
    const edgeStrength: number[] = [];           // 0..1, for per-edge opacity / width feel

    for (let i = 0; i < edges.length; i++) {
      const a = positions[edges[i].a];
      const b = positions[edges[i].b];
      const dist = a.distanceTo(b);

      const waypoints = 3 + Math.floor(Math.random() * 2); // 3 or 4
      const cps: THREE.Vector3[] = [a.clone()];
      for (let w = 1; w <= waypoints; w++) {
        const tp = w / (waypoints + 1);
        const base = new THREE.Vector3().lerpVectors(a, b, tp);
        // Multi-axis organic drift (not pure perpendicular — feels less geometric)
        const drift = new THREE.Vector3(
          (Math.random() - 0.5),
          (Math.random() - 0.5),
          (Math.random() - 0.5),
        ).normalize().multiplyScalar(dist * (0.08 + Math.random() * 0.16));
        base.add(drift);
        cps.push(base);
      }
      cps.push(b.clone());

      const curve = new THREE.CatmullRomCurve3(cps, false, "catmullrom", 0.6);
      const pts = curve.getPoints(SAMPLES - 1);
      edgeCurves.push(pts);
      edgeStrength.push(0.35 + Math.random() * 0.65);  // varied prominence
    }

    // Build LineSegments with per-vertex color encoding edge strength
    const totalSegs = edges.length * (SAMPLES - 1);
    const epos = new Float32Array(totalSegs * 6);
    const ecol = new Float32Array(totalSegs * 6);
    let cursor = 0, ccursor = 0;
    for (let ei = 0; ei < edgeCurves.length; ei++) {
      const pts = edgeCurves[ei];
      const s = edgeStrength[ei];
      // Light cool grey on charcoal bg — visible but not blown out
      const base = 0.42 + s * 0.35;      // 0.42..0.77 (light cool grey)
      const r = base * 0.88, g = base * 0.92, bb = base * 1.0;
      for (let si = 0; si < pts.length - 1; si++) {
        const p1 = pts[si], p2 = pts[si + 1];
        epos[cursor++] = p1.x; epos[cursor++] = p1.y; epos[cursor++] = p1.z;
        epos[cursor++] = p2.x; epos[cursor++] = p2.y; epos[cursor++] = p2.z;
        // Slight taper: dimmer near synapse ends (first & last 20% of curve)
        const t1 = si / (pts.length - 1);
        const t2 = (si + 1) / (pts.length - 1);
        const taper = (tt: number) => {
          const edge = Math.min(tt, 1 - tt);
          return edge < 0.18 ? 0.55 + (edge / 0.18) * 0.45 : 1.0;
        };
        const m1 = taper(t1), m2 = taper(t2);
        ecol[ccursor++] = r * m1; ecol[ccursor++] = g * m1; ecol[ccursor++] = bb * m1;
        ecol[ccursor++] = r * m2; ecol[ccursor++] = g * m2; ecol[ccursor++] = bb * m2;
      }
    }
    const edgeGeom = new THREE.BufferGeometry();
    edgeGeom.setAttribute("position", new THREE.BufferAttribute(epos, 3));
    edgeGeom.setAttribute("color",    new THREE.BufferAttribute(ecol, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      fog: true,
    });
    const edgeLines = new THREE.LineSegments(edgeGeom, edgeMat);
    network.add(edgeLines);

    // ── Synapse bulbs (small glow spheres at each edge endpoint) ──
    const bulbGeom = new THREE.SphereGeometry(1, 8, 8);
    const bulbMat = new THREE.MeshBasicMaterial({
      color: 0xb8bec8,
      transparent: true,
      opacity: 0.7,
      fog: true,
    });
    const bulbMesh = new THREE.InstancedMesh(bulbGeom, bulbMat, edges.length * 2);
    const bulbDummy = new THREE.Object3D();
    for (let i = 0; i < edges.length; i++) {
      // Bulb at endpoint 'a' (offset slightly along curve toward a-side)
      const pts = edgeCurves[i];
      const near_a = pts[1] || pts[0];
      const near_b = pts[pts.length - 2] || pts[pts.length - 1];
      bulbDummy.position.copy(near_a);
      bulbDummy.scale.setScalar(0.35 + Math.random() * 0.25);
      bulbDummy.updateMatrix();
      bulbMesh.setMatrixAt(i * 2, bulbDummy.matrix);
      bulbDummy.position.copy(near_b);
      bulbDummy.scale.setScalar(0.35 + Math.random() * 0.25);
      bulbDummy.updateMatrix();
      bulbMesh.setMatrixAt(i * 2 + 1, bulbDummy.matrix);
    }
    bulbMesh.instanceMatrix.needsUpdate = true;
    network.add(bulbMesh);

    // ── Neuron cell bodies: InstancedMesh of small spheres ────────
    // Size scaled by degree (number of connected edges) → hubs look like bigger neurons
    const degrees = nodeEdges.map((e) => e.length);
    const maxDeg = Math.max(...degrees);

    const neuronGeom = new THREE.IcosahedronGeometry(1, isMobile ? 0 : 1);
    const neuronMat = new THREE.MeshBasicMaterial({
      color: 0xd8dde5,
      transparent: true,
      opacity: 0.92,
      fog: true,
    });
    const neuronMesh = new THREE.InstancedMesh(neuronGeom, neuronMat, positions.length);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < positions.length; i++) {
      const deg = degrees[i] / maxDeg;       // 0..1
      const r = 0.6 + deg * 1.4 + Math.random() * 0.25;
      dummy.position.copy(positions[i]);
      dummy.scale.setScalar(r);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.updateMatrix();
      neuronMesh.setMatrixAt(i, dummy.matrix);
    }
    neuronMesh.instanceMatrix.needsUpdate = true;
    network.add(neuronMesh);

    // ── Dendrite stubs (short free-floating hairs for organic feel) ─
    const HAIRS_PER_NODE = isMobile ? 2 : 3;
    const hairSegs = positions.length * HAIRS_PER_NODE * (SAMPLES - 1);
    const hpos = new Float32Array(hairSegs * 6);
    let hc = 0;
    for (let i = 0; i < positions.length; i++) {
      const origin = positions[i];
      const hairCount = HAIRS_PER_NODE + (Math.random() > 0.7 ? 1 : 0);
      for (let h = 0; h < hairCount && h < HAIRS_PER_NODE + 1; h++) {
        const dir = new THREE.Vector3(
          Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5,
        ).normalize();
        const length = 3 + Math.random() * 5;
        const end = new THREE.Vector3().addVectors(origin, dir.clone().multiplyScalar(length));
        // Midpoint with slight curve
        const mid = new THREE.Vector3().addVectors(origin, end).multiplyScalar(0.5);
        const perp = new THREE.Vector3(
          Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5,
        ).normalize();
        mid.addScaledVector(perp, length * (Math.random() - 0.5) * 0.35);
        const curve = new THREE.QuadraticBezierCurve3(origin.clone(), mid, end);
        const pts = curve.getPoints(SAMPLES - 1);
        for (let s = 0; s < pts.length - 1; s++) {
          const p1 = pts[s], p2 = pts[s + 1];
          if (hc + 6 > hpos.length) break;
          hpos[hc++] = p1.x; hpos[hc++] = p1.y; hpos[hc++] = p1.z;
          hpos[hc++] = p2.x; hpos[hc++] = p2.y; hpos[hc++] = p2.z;
        }
      }
    }
    const hairGeom = new THREE.BufferGeometry();
    hairGeom.setAttribute("position", new THREE.BufferAttribute(hpos.slice(0, hc), 3));
    const hairMat = new THREE.LineBasicMaterial({
      color: 0x8a92a0,
      transparent: true,
      opacity: 0.22,
      fog: true,
    });
    const hairs = new THREE.LineSegments(hairGeom, hairMat);
    network.add(hairs);

    // ── Pulse sprites (pool) ───────────────────────────────────────
    const MAX_PULSES = isMobile ? 28 : 50;
    type Pulse = {
      edgeIdx: number; from: number; prog: number;
      speed: number; intensity: number; hops: number;
      mesh: THREE.Sprite; active: boolean;
    };

    // Electric pulse sprite texture
    const sc = document.createElement("canvas");
    sc.width = 128; sc.height = 128;
    const sctx = sc.getContext("2d")!;
    const sg = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sg.addColorStop(0,   "rgba(240,248,255,1)");
    sg.addColorStop(0.25,"rgba(180,215,255,0.8)");
    sg.addColorStop(0.6, "rgba(130,180,255,0.25)");
    sg.addColorStop(1,   "rgba(130,180,255,0)");
    sctx.fillStyle = sg;
    sctx.fillRect(0, 0, 128, 128);
    const pulseTex = new THREE.CanvasTexture(sc);

    const pulses: Pulse[] = [];
    for (let i = 0; i < MAX_PULSES; i++) {
      const mat = new THREE.SpriteMaterial({
        map: pulseTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
        opacity: 0,
      });
      const s = new THREE.Sprite(mat);
      s.scale.set(4, 4, 4);
      s.visible = false;
      network.add(s);
      pulses.push({
        edgeIdx: 0, from: 0, prog: 0, speed: 0, intensity: 0, hops: 0,
        mesh: s, active: false,
      });
    }

    const spawnPulse = (edgeIdx: number, from: number, intensity: number, hops: number) => {
      const p = pulses.find((x) => !x.active);
      if (!p) return;
      p.edgeIdx = edgeIdx; p.from = from; p.prog = 0;
      p.speed = 0.012 + Math.random() * 0.008;
      p.intensity = intensity; p.hops = hops;
      p.active = true; p.mesh.visible = true;
    };

    // ── Bloom (desktop) ────────────────────────────────────────────
    let composer: EffectComposer | null = null;
    if (!isMobile) {
      composer = new EffectComposer(renderer);
      composer.setSize(W, H);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(W, H),
        0.95,  // strength
        0.55,  // radius
        0.18,  // threshold
      );
      composer.addPass(bloom);
    }

    // ── Scroll state ───────────────────────────────────────────────
    let scrollProg = 0;
    let scrollVel  = 0;
    let lastScroll = typeof window !== "undefined" ? window.scrollY : 0;
    const onScroll = () => {
      const cur = window.scrollY;
      const delta = Math.abs(cur - lastScroll);
      scrollVel = scrollVel * 0.7 + delta * 0.3;
      lastScroll = cur;
      const heroH = window.innerHeight;
      scrollProg = Math.min(1, Math.max(0, cur / heroH));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Resize ─────────────────────────────────────────────────────
    const onResize = () => {
      W = container.clientWidth;
      H = container.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H, false);
      composer?.setSize(W, H);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Heartbeat state ────────────────────────────────────────────
    let t = 0;
    const BASE_BEAT = 75;           // 48 bpm @ 60fps
    let nextBeat    = BASE_BEAT;
    let nextAmbient = 30;

    const emitBeat = () => {
      const n = 2 + Math.floor(Math.random() * 3);   // 2..4
      for (let i = 0; i < n; i++) {
        const eIdx = Math.floor(Math.random() * edges.length);
        const e = edges[eIdx];
        const from = Math.random() < 0.5 ? e.a : e.b;
        spawnPulse(eIdx, from, 0.85 + Math.random() * 0.15, 2 + Math.floor(Math.random() * 2));
      }
    };

    // ── Loop ───────────────────────────────────────────────────────
    const tick = () => {
      t++;

      // Scroll-driven camera dolly-in
      const zFar = 180, zNear = 28;
      const camZTarget = zFar - (zFar - zNear) * scrollProg;
      camera.position.z += (camZTarget - camera.position.z) * 0.08;

      // Slow auto-rotation of whole group + subtle wobble
      network.rotation.y += 0.00085;
      network.rotation.x = Math.sin(t * 0.0006) * 0.12;

      // Heartbeat — scroll velocity bumps tempo
      const velFactor = Math.min(2.2, 1 + scrollVel * 0.04);
      const period = BASE_BEAT / velFactor;
      if (t >= nextBeat) {
        emitBeat();
        nextBeat = t + period;
      }
      scrollVel *= 0.9;

      // Ambient micro-pulses
      if (t >= nextAmbient) {
        const eIdx = Math.floor(Math.random() * edges.length);
        const e = edges[eIdx];
        spawnPulse(eIdx, Math.random() < 0.5 ? e.a : e.b, 0.28 + Math.random() * 0.15, 1);
        nextAmbient = t + 36 + Math.floor(Math.random() * 50);
      }

      // Update pulses — traverse stored curve samples (smooth along bezier)
      for (const p of pulses) {
        if (!p.active) continue;
        p.prog += p.speed;
        const e = edges[p.edgeIdx];
        const startIdx = p.from;
        const endIdx   = startIdx === e.a ? e.b : e.a;
        const curve = edgeCurves[p.edgeIdx];
        // If traversing a->b we walk curve forward; if b->a, backward
        const forward = startIdx === e.a;
        const f = Math.min(1, p.prog);
        const tf = forward ? f : 1 - f;
        const fi = tf * (curve.length - 1);
        const i0 = Math.floor(fi);
        const i1 = Math.min(curve.length - 1, i0 + 1);
        const ft = fi - i0;
        const pa = curve[i0], pb = curve[i1];
        p.mesh.position.set(
          pa.x + (pb.x - pa.x) * ft,
          pa.y + (pb.y - pa.y) * ft,
          pa.z + (pb.z - pa.z) * ft,
        );
        const scale = 2.4 + p.intensity * 2.4;
        p.mesh.scale.set(scale, scale, scale);
        (p.mesh.material as THREE.SpriteMaterial).opacity = Math.min(1, p.intensity);

        if (p.prog >= 1) {
          p.hops -= 1;
          if (p.hops <= 0) { p.active = false; p.mesh.visible = false; continue; }
          const opts = nodeEdges[endIdx].filter((x) => x !== p.edgeIdx);
          if (!opts.length) { p.active = false; p.mesh.visible = false; continue; }
          p.edgeIdx = opts[Math.floor(Math.random() * opts.length)];
          p.from = endIdx;
          p.prog = 0;
          p.intensity *= 0.75;
          if (p.intensity < 0.12) { p.active = false; p.mesh.visible = false; }
        }
      }

      if (composer) composer.render();
      else renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      edgeGeom.dispose(); edgeMat.dispose();
      hairGeom.dispose(); hairMat.dispose();
      neuronGeom.dispose(); neuronMat.dispose();
      bulbGeom.dispose(); bulbMat.dispose();
      pulseTex.dispose();
      pulses.forEach((p) => (p.mesh.material as THREE.Material).dispose());
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" aria-hidden />
    </div>
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

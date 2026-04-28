"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
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
      opacity: 0.28,     // background texture only
      fog: true,
    });
    const edgeLines = new THREE.LineSegments(edgeGeom, edgeMat);
    network.add(edgeLines);

    // ── Synapse bulbs (small glow spheres at each edge endpoint) ──
    const bulbGeom = new THREE.SphereGeometry(1, 8, 8);
    const bulbMat = new THREE.MeshBasicMaterial({
      color: 0xb8bec8,
      transparent: true,
      opacity: 0.18,     // tiny, calm synapse dots
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
      bulbDummy.scale.setScalar((0.35 + Math.random() * 0.25) * 0.58);
      bulbDummy.updateMatrix();
      bulbMesh.setMatrixAt(i * 2, bulbDummy.matrix);
      bulbDummy.position.copy(near_b);
      bulbDummy.scale.setScalar((0.35 + Math.random() * 0.25) * 0.58);
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
      opacity: 0.28,     // barely there — text is the subject
      fog: true,
    });
    const neuronMesh = new THREE.InstancedMesh(neuronGeom, neuronMat, positions.length);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < positions.length; i++) {
      const deg = degrees[i] / maxDeg;       // 0..1
      const r = (0.6 + deg * 1.4 + Math.random() * 0.25) * 0.58;  // small, texture-scale
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
      opacity: 0.14,
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

    const spawnPulse = (edgeIdx: number, from: number, intensity: number, hops: number, amber = false) => {
      const p = pulses.find((x) => !x.active);
      if (!p) return;
      p.edgeIdx = edgeIdx; p.from = from; p.prog = 0;
      p.speed = 0.012 + Math.random() * 0.008;
      p.intensity = intensity; p.hops = hops;
      const mat = p.mesh.material as THREE.SpriteMaterial;
      mat.map = amber ? amberTex : pulseTex;
      mat.needsUpdate = true;
      p.active = true; p.mesh.visible = true;
    };

    // ── Ambient dust particles (depth cue) ─────────────────────────
    const DUST_COUNT = isMobile ? 180 : 420;
    const dustPos = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPos[i * 3]     = (Math.random() - 0.5) * 260;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 260;
    }
    const dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x8894a8,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.22,
      fog: true,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeom, dustMat);
    scene.add(dust);

    // ── Bloom (desktop) ────────────────────────────────────────────
    let composer: EffectComposer | null = null;
    if (!isMobile) {
      composer = new EffectComposer(renderer);
      composer.setSize(W, H);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(W, H),
        0.32,  // very subtle — only pulses glow visibly
        0.50,
        0.35,  // high threshold — only brightest pixels bloom
      );
      composer.addPass(bloom);
    }

    // ── Brand super-pulse texture (vivid blue burst) ───────────────
    const asc = document.createElement("canvas");
    asc.width = 128; asc.height = 128;
    const asctx = asc.getContext("2d")!;
    const asg = asctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    asg.addColorStop(0,    "rgba(220,230,255,1)");
    asg.addColorStop(0.25, "rgba(130,160,240,0.9)");
    asg.addColorStop(0.6,  "rgba(52,81,200,0.32)");
    asg.addColorStop(1,    "rgba(52,81,200,0)");
    asctx.fillStyle = asg;
    asctx.fillRect(0, 0, 128, 128);
    const amberTex = new THREE.CanvasTexture(asc);

    // ── Mouse parallax (subtle head-tracking) ──────────────────────
    let mouseX = 0, mouseY = 0;     // target, -1..1
    let mxSmooth = 0, mySmooth = 0; // eased
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouseY = ((e.clientY - rect.top)  / rect.height) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Scroll state ───────────────────────────────────────────────
    let scrollProg = 0;
    let scrollVel  = 0;
    let lastScroll = typeof window !== "undefined" ? window.scrollY : 0;
    const onScroll = () => {
      const cur = window.scrollY;
      const delta = Math.abs(cur - lastScroll);
      scrollVel = scrollVel * 0.7 + delta * 0.3;
      lastScroll = cur;
      // Hero is 2.2× viewport; dolly should complete around canvas fade-out start
      const heroH = window.innerHeight * 1.55;
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
    const BASE_BEAT = 65;           // ~55 bpm — slightly more alive
    let nextBeat    = BASE_BEAT;
    let nextAmbient = 30;
    let beatCount   = 0;

    // hubs = top-degree nodes (super-pulse origins)
    const hubIndices = degrees
      .map((d, i) => ({ d, i }))
      .sort((a, b) => b.d - a.d)
      .slice(0, isMobile ? 6 : 12)
      .map((x) => x.i);

    const emitBeat = () => {
      beatCount++;
      const n = 3 + Math.floor(Math.random() * 3);   // 3..5 pulses per beat
      for (let i = 0; i < n; i++) {
        const eIdx = Math.floor(Math.random() * edges.length);
        const e = edges[eIdx];
        const from = Math.random() < 0.5 ? e.a : e.b;
        spawnPulse(eIdx, from, 0.85 + Math.random() * 0.15, 2 + Math.floor(Math.random() * 3));
      }
      // Every 4th beat: amber super-burst from a hub
      if (beatCount % 4 === 0) {
        const hub = hubIndices[Math.floor(Math.random() * hubIndices.length)];
        const outs = nodeEdges[hub];
        const burst = Math.min(outs.length, 4);
        for (let i = 0; i < burst; i++) {
          const eIdx = outs[i];
          spawnPulse(eIdx, hub, 1.1, 3, true);
        }
      }
    };

    // ── Loop ───────────────────────────────────────────────────────
    const tick = () => {
      t++;

      // Scroll-driven camera dolly-in + breathing wobble
      const zFar = 180, zNear = 28;
      const breathing = Math.sin(t * 0.012) * 1.4;           // gentle in/out
      const camZTarget = zFar - (zFar - zNear) * scrollProg + breathing;
      camera.position.z += (camZTarget - camera.position.z) * 0.08;

      // Mouse parallax — eased
      mxSmooth += (mouseX - mxSmooth) * 0.05;
      mySmooth += (mouseY - mySmooth) * 0.05;
      camera.position.x += ((mxSmooth * 12) - camera.position.x) * 0.06;
      camera.position.y += ((-mySmooth * 8) - camera.position.y) * 0.06;
      camera.lookAt(0, 0, 0);

      // Slow auto-rotation of whole group + subtle wobble + parallax tilt
      network.rotation.y += 0.00085;
      network.rotation.x = Math.sin(t * 0.0006) * 0.12 + mySmooth * 0.08;
      network.rotation.z = mxSmooth * 0.04;

      // Dust counter-drift for extra depth
      dust.rotation.y -= 0.0004;

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
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      edgeGeom.dispose(); edgeMat.dispose();
      hairGeom.dispose(); hairMat.dispose();
      neuronGeom.dispose(); neuronMat.dispose();
      bulbGeom.dispose(); bulbMat.dispose();
      dustGeom.dispose(); dustMat.dispose();
      pulseTex.dispose();
      amberTex.dispose();
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
    lead: "Good things come to those who are",
    tagline: "Longevity and performance supplements, built for healthspan, not just lifespan.",
    subtitle: null,
    cta1: "Explore the system",
    cta2: "Our science",
    meta: "Healthspan, not just lifespan",
  },
  pl: {
    eyebrow: "Suplementy Longevity",
    lead: "Dla tych, którzy traktują zdrowie poważnie",
    tagline: "Suplementy longevity i performance — zbudowane na healthspan, nie tylko lifespan.",
    subtitle: null,
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

  // Smoother progress: spring lag absorbs jumpy wheel/trackpad deltas
  const smoothProg = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.6,
    restDelta: 0.0005,
  });

  // Secondary UI (eyebrow, subtitle, CTAs, metadata) — fade out first
  // Ranges widened because outer is now 220vh (user scrolls longer)
  const fadeOut   = useTransform(smoothProg, [0, 0.22], [1, 0]);
  const scaleDown = useTransform(smoothProg, [0, 0.6],  [1, 0.93]);
  const blurOut   = useTransform(smoothProg, [0.05, 0.30], [0, 18]);

  // Canvas fades before bg transition starts — quicker now
  const canvasOpacity = useTransform(smoothProg, [0.10, 0.38], [1, 0]);

  // Background: charcoal → pure white — accelerated so white arrives at ~50% scroll
  const bgColor = useTransform(
    smoothProg,
    [0, 0.18, 0.50, 1],
    ["#12141A", "#12141A", "#FFFFFF", "#FFFFFF"],
  );
  // Headline colour inverts white → black as bg flips
  const headlineColor = useTransform(
    smoothProg,
    [0, 0.16, 0.46, 1],
    ["#FAFAF7", "#FAFAF7", "#111111", "#111111"],
  );
  // Border/rule colour
  const ruleColor = useTransform(
    smoothProg,
    [0, 0.16, 0.46, 1],
    ["rgba(250,250,247,0.14)", "rgba(250,250,247,0.14)", "rgba(17,17,17,0.08)", "rgba(17,17,17,0.08)"],
  );

  // Scroll-linked text parallax + tilt — text lifts & rotates slightly as hero scrolls
  const textY       = useTransform(smoothProg, [0, 0.6], [0, -70]);
  const textRotateX = useTransform(smoothProg, [0, 0.6], [0, 6]);
  const textOpacity = useTransform(smoothProg, [0, 0.35], [1, 0.82]);

  /* ── Variants (advanced Framer Motion) ──────────────────────── */
  const column: Variants = {
    hidden: {},
    shown: {
      transition: {
        delayChildren: 0.35,
        staggerChildren: 0.14,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(14px)" },
    shown:  {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const rule: Variants = {
    hidden: { scaleX: 0 },
    shown:  { scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  const headlineLine: Variants = {
    hidden: {},
    shown:  { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: "75%", rotateX: -38, filter: "blur(22px)" },
    shown:  {
      opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
      transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <div ref={containerRef} className="relative" style={{ height: "220vh" }}>
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >

      {/* ═══════════════════════════════════════════
          MOBILE LAYOUT
      ════════════════════════════════════════════ */}
      <div className="md:hidden h-full flex flex-col overflow-hidden">

        {/* Animation + headline — top portion */}
        <div className="relative h-[54%] flex items-center justify-center flex-shrink-0">
          <motion.div style={{ opacity: canvasOpacity }} className="absolute inset-0">
            <MolecularCanvas />
          </motion.div>
          <motion.div
            style={{ opacity: canvasOpacity }}
            className="absolute inset-0 pointer-events-none"
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 62% at 50% 50%, rgba(18,20,26,0.96) 0%, rgba(18,20,26,0.88) 35%, rgba(18,20,26,0.55) 60%, rgba(18,20,26,0) 100%)",
              }}
            />
          </motion.div>

          {/* Centered headline (colour inverts with scroll) */}
          <div className="relative z-10 text-center px-6">
            {/* Top rule */}
            <motion.div style={{ opacity: fadeOut }}
              className="flex items-center gap-3 mb-4 max-w-[280px] mx-auto">
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 h-px bg-[#C4682A]/22 origin-right" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1.8 }}
                className="w-1.5 h-1.5 rounded-full bg-[#C4682A] flex-shrink-0" />
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 h-px bg-[#C4682A]/22 origin-left" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, filter: "blur(36px)", scale: 1.04 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 2.2, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              className="leading-[0.88] tracking-[-0.03em]"
              style={{
                color: headlineColor as unknown as string,
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(3.8rem, 20vw, 6rem)",
              }}
            >
              <span className="block">kno<span style={{ color: "#C4682A" }}>win</span>g</span>
              <span className="block">more<span style={{ color: "#C4682A" }}>.</span></span>
            </motion.h1>
          </div>
        </div>

        {/* Text content — fades out before bg transition */}
        <motion.div style={{ opacity: fadeOut }}
          className="flex-1 px-6 pt-2 pb-10 flex flex-col items-center text-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#C4682A",
              boxShadow: "0 8px 28px rgba(52,81,200,0.35), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono uppercase font-bold tracking-[0.28em] text-white"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1.25, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-white"
              style={{ boxShadow: "0 0 8px rgba(255,255,255,0.9)" }}
            />
            <span style={{ fontSize: "clamp(0.78rem, 3.2vw, 1rem)" }}>
              {tr.eyebrow}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 2.7 }}
            className="text-sm text-[#FAFAF7]/70 leading-[1.85] tracking-wide max-w-[320px] mb-6"
          >
            <span className="block italic mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              {tr.lead}
            </span>
            <span className="block opacity-75">{tr.tagline}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 2.9 }}
            className="flex items-center gap-8 mb-6"
          >
            <a href="#products"
              className="group flex items-center gap-2 text-[#FAFAF7] text-sm font-medium tracking-wide border-b border-[#FAFAF7]/25 pb-0.5 hover:border-[#C4682A] hover:text-[#C4682A] transition-colors duration-300">
              {tr.cta1}
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
            <a href="#science"
              className="text-[#FAFAF7]/40 text-sm tracking-wide hover:text-[#FAFAF7]/70 transition-colors duration-200">
              {tr.cta2}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 3.1, duration: 0.9 }}
            className="w-full max-w-[340px] pt-4 flex items-center justify-between border-t border-[#FAFAF7]/10"
          >
            <div className="flex items-center gap-2">
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-[#C4682A]" />
              <span className="text-[9px] font-mono text-[#FAFAF7]/45 tracking-[0.2em] uppercase">{tr.meta}</span>
            </div>
            <span className="text-[9px] font-mono text-[#FAFAF7]/45 tracking-[0.25em] uppercase">Est. 2025</span>
          </motion.div>

        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════
          DESKTOP LAYOUT
      ════════════════════════════════════════════ */}
      <section className="hidden md:flex relative h-full flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: canvasOpacity }} className="absolute inset-0">
          <MolecularCanvas />
        </motion.div>
        {/* Radial vignette — near-opaque center, animation lives only at the edges */}
        <motion.div
          style={{ opacity: canvasOpacity }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 62% 58% at 50% 50%, rgba(18,20,26,0.97) 0%, rgba(18,20,26,0.92) 30%, rgba(18,20,26,0.72) 55%, rgba(18,20,26,0.30) 78%, rgba(18,20,26,0) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          variants={column}
          initial="hidden"
          animate="shown"
          style={{
            scale: scaleDown,
            filter: `blur(${blurOut}px)` as unknown as string,
            y: textY,
            rotateX: textRotateX,
            opacity: textOpacity,
            transformPerspective: 1200,
          }}
          className="relative z-10 w-full flex flex-col items-center text-center px-6 pt-28 pb-20"
        >
          {/* Eyebrow — big category chip (white text on brand pill, high visibility) */}
          <motion.div
            variants={item}
            style={{
              opacity: fadeOut,
              background: "#C4682A",
              boxShadow: "0 10px 40px rgba(52,81,200,0.40), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
            className="mb-12 inline-flex items-center gap-3 rounded-full px-6 py-2.5 font-mono uppercase font-bold tracking-[0.32em] text-white"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1.25, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white"
              style={{ boxShadow: "0 0 10px rgba(255,255,255,0.9)" }}
            />
            <span style={{ fontSize: "clamp(1rem, 1.95vw, 1.65rem)" }}>
              {tr.eyebrow}
            </span>
          </motion.div>

          {/* Lead — between chip and headline */}
          <motion.p variants={item} style={{ opacity: fadeOut }}
            className="max-w-[720px] mb-8 text-[#FAFAF7]/80 leading-[1.45] tracking-wide text-center italic"
          >
            <span
              className="block"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
              }}
            >
              {tr.lead}
            </span>
          </motion.p>

          {/* Top rule with staggered pieces */}
          <motion.div variants={item} style={{ opacity: fadeOut }}
            className="w-full max-w-[560px] flex items-center gap-3 mb-10">
            <motion.div variants={rule} className="flex-1 h-px bg-[#C4682A]/22 origin-right" />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.35, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#C4682A] flex-shrink-0"
              style={{ boxShadow: "0 0 12px rgba(52,81,200,0.8)" }}
            />
            <motion.div variants={rule} className="flex-1 h-px bg-[#C4682A]/22 origin-left" />
          </motion.div>

          {/* Headline — word-by-word variants reveal (with room for descenders) */}
          <motion.h1
            variants={headlineLine}
            className="leading-[0.92] tracking-[-0.03em]"
            style={{
              color: headlineColor as unknown as string,
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(4.2rem, 12vw, 14rem)",
              transformPerspective: 1200,
            }}
          >
            <span className="block overflow-hidden" style={{ paddingBottom: "0.18em" }}>
              <motion.span variants={word} className="inline-block">
                kno<span style={{ color: "#C4682A" }}>win</span>g
              </motion.span>
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: "0.18em" }}>
              <motion.span variants={word} className="inline-block">
                more<span style={{ color: "#C4682A" }}>.</span>
              </motion.span>
            </span>
          </motion.h1>

          {/* Tagline — below headline, explains what the brand is */}
          <motion.p variants={item} style={{ opacity: fadeOut }}
            className="mt-8 max-w-[620px] text-[#FAFAF7]/70 leading-[1.65] tracking-wide text-center"
          >
            <span style={{ fontSize: "clamp(0.92rem, 1.1vw, 1.05rem)" }}>
              {tr.tagline}
            </span>
          </motion.p>

          {/* Bottom rule — rules scale-in */}
          <motion.div variants={item} style={{ opacity: fadeOut }}
            className="w-full max-w-[480px] mt-8 mb-8 flex items-center gap-3">
            <motion.div variants={rule}
              style={{ backgroundColor: ruleColor as unknown as string }}
              className="flex-1 h-px origin-right" />
            <motion.div variants={rule}
              style={{ backgroundColor: ruleColor as unknown as string }}
              className="flex-1 h-px origin-left" />
          </motion.div>

          <motion.div variants={item} style={{ opacity: fadeOut }}
            className="mt-10 flex items-center gap-8">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="group flex items-center gap-2.5 text-[#FAFAF7] text-sm font-medium tracking-wide border-b border-[#FAFAF7]/25 pb-0.5 hover:border-[#C4682A] hover:text-[#C4682A] transition-colors duration-300">
              {tr.cta1}
              <span className="group-hover:translate-x-1.5 transition-transform duration-200 text-base leading-none">→</span>
            </motion.a>
            <motion.a
              href="#science"
              whileHover={{ y: -2, color: "#FAFAF7" }}
              className="text-[#FAFAF7]/40 text-sm tracking-wide hover:text-[#FAFAF7]/70 transition-colors duration-200">
              {tr.cta2}
            </motion.a>
          </motion.div>

          <motion.div variants={item} style={{ opacity: fadeOut }}
            className="mt-16 w-full max-w-[700px] pt-6 flex items-center justify-between border-t border-[#FAFAF7]/10">
            <div className="flex items-center gap-3">
              <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 rounded-full bg-[#C4682A]"
                style={{ boxShadow: "0 0 8px rgba(52,81,200,0.6)" }} />
              <span className="text-[9px] font-mono text-[#FAFAF7]/55 tracking-[0.22em] uppercase hidden sm:inline">{tr.meta}</span>
            </div>
            <span className="text-[9px] font-mono text-[#FAFAF7]/55 tracking-[0.25em] uppercase">Est.&nbsp;2024</span>
          </motion.div>

        </motion.div>

        <motion.div style={{ opacity: fadeOut }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20" aria-hidden>
          <motion.div animate={{ y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-[#FAFAF7]/25 to-transparent" />
        </motion.div>
      </section>

      </motion.div>
    </div>
  );
}

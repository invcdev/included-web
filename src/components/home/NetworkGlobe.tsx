"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { GLOBE_DOTS, GLOBE_LOGOS, type GlobeLogo, type PartnerGroup } from "./globeData";
import styles from "./NetworkGlobe.module.css";

/*
 * Partner globe -> partner grid.
 *
 * 1. A see-through globe spins west to east. Logos float inside it: the ones at
 *    the back are smaller and fainter, and they come forward as it turns. Dots
 *    sit on the front surface, growing towards the viewer, coloured by height
 *    along the spectrum. At rotation 0 it reproduces the design exactly.
 * 2. The scene then pins under the header. Scrolling on fades the dots and
 *    rings and flies every logo into its cell in the partner grid (real HTML,
 *    laid out by CSS, so it adapts to any width). Scrolling back reverses it.
 */

// Globe canvas (design px at 2x) and geometry measured from it.
const W = 3600;
const CX = 1799.5;
const CY = 665.5;
const RX = 1702;
const RY = 414.5;
const RINGS = [
  { scale: 1.2135, stroke: "#F0FFD6" },
  { scale: 1.1074, stroke: "#E2FCEF" },
  { scale: 1, stroke: "#D5EAFD" },
];

const K = 100 / W; // design px -> cqw of the stage
const PERIOD_S = 35; // one full revolution
const DOT_MAX = 15; // dot diameter (design px) when facing the viewer
// In the design, a logo 10% larger is about 12% stronger; both track depth.
const DEPTH_SCALE = 0.3;
const DEPTH_ALPHA = 0.36;

const SPECTRUM: [number, [number, number, number]][] = [
  [0, [0x50, 0x35, 0xe2]],
  [1 / 6, [0x47, 0x6f, 0xea]],
  [2 / 6, [0x53, 0xab, 0xf2]],
  [3 / 6, [0x6c, 0xe7, 0xfb]],
  [4 / 6, [0x7a, 0xf3, 0xb8]],
  [5 / 6, [0x98, 0xf8, 0x72]],
  [1, [0xc2, 0xfd, 0x51]],
];

function spectrumAt(t: number) {
  for (let i = 1; i < SPECTRUM.length; i++) {
    const [t1, c1] = SPECTRUM[i];
    if (t <= t1) {
      const [t0, c0] = SPECTRUM[i - 1];
      const f = (t - t0) / (t1 - t0);
      const c = c0.map((v, j) => Math.round(v + (c1[j] - v) * f));
      return `rgb(${c[0]} ${c[1]} ${c[2]})`;
    }
  }
  return "rgb(194 253 81)";
}

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (e0: number, e1: number, v: number) => {
  const t = clamp((v - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---------- Dots: on the front surface, repeated round the back ---------- */

type Dot = { y: number; ring: number; lon: number; color: string };

function toSurface(x: number, y: number) {
  const ny = (y - CY) / RY;
  const ring = Math.sqrt(Math.max(0, 1 - ny * ny));
  const s = ring > 0 ? clamp((x - CX) / RX / ring, -1, 1) : 0;
  return { y, ring, lon: Math.asin(s) };
}

/*
 * The design only fills the front (longitudes within about ±62°), so the dot
 * pattern is repeated in two more copies sharing the rest of the circle, joined
 * edge to edge. Dots fade out at the rim between SPAN and SPAN + GAP, where the
 * copies start, so rotation 0 shows exactly the design.
 */
const DOT_BASE = GLOBE_DOTS.map(([x, y]) => toSurface(x, y));
const SPAN = Math.max(...DOT_BASE.map((b) => Math.abs(b.lon)));
const GAP = (10 * Math.PI) / 180;
const REST = (2 * Math.PI - 2 * SPAN - 3 * GAP) / 2;
const SQUEEZE = REST / (2 * SPAN);

const DOTS: Dot[] = DOT_BASE.flatMap((b) => {
  const color = spectrumAt(0.5 - (b.y - CY) / RY / 2);
  return [
    b.lon,
    SPAN + GAP + REST / 2 + b.lon * SQUEEZE,
    SPAN + 2 * GAP + REST * 1.5 + b.lon * SQUEEZE,
  ].map((lon) => ({ ...b, lon, color }));
});

function dotPose(d: Dot, theta: number) {
  const lon = d.lon + theta;
  const z = Math.max(0, d.ring * Math.cos(lon));
  const rim = smooth(Math.cos(SPAN + GAP), Math.cos(SPAN), Math.cos(lon));
  return {
    x: CX + RX * d.ring * Math.sin(lon),
    y: d.y,
    scale: (1.5 + 13.5 * z) / DOT_MAX,
    opacity: z ** 1.25 * rim,
  };
}

/* ---------- Logos: inside the globe, one each ---------- */

type Logo = GlobeLogo & { rho: number; lon: number; z0: number; delay: number };

const LOGOS: Logo[] = GLOBE_LOGOS.map((l, i) => {
  const nx = (l.globeX - CX) / RX;
  const ny = (l.globeY - CY) / RY;
  const ring = Math.sqrt(Math.max(0, 1 - ny * ny)) * 0.98;
  // Depth from how large the logo is drawn, kept inside the globe.
  const zMax = Math.sqrt(Math.max(0, ring * ring - nx * nx));
  const z0 = clamp((l.globeScale - 1) / DEPTH_SCALE, -zMax, zMax);
  // Deterministic stagger so logos don't all arrive at once.
  const r = Math.sin((i + 1) * 12.9898) * 43758.5453;
  return { ...l, rho: Math.hypot(nx, z0), lon: Math.atan2(nx, z0), z0, delay: r - Math.floor(r) };
});

function logoPose(l: Logo, theta: number) {
  const lon = l.lon + theta;
  const z = l.rho * Math.cos(lon);
  return {
    x: CX + RX * l.rho * Math.sin(lon),
    y: l.globeY,
    scale: l.globeScale + DEPTH_SCALE * (z - l.z0),
    opacity: clamp(l.globeAlpha + DEPTH_ALPHA * (z - l.z0), 0.12, 1),
    z: 2 + Math.round((z + 1) * 50),
  };
}

/* ---------- First frame (server-rendered) ---------- */

const fmt = (n: number) => String(Math.round(n * 1000) / 1000);

// Custom properties are left untouched by the browser, so hydration matches.
// The CSS turns them into a cqw transform; the animation then writes pixels.
function firstFrame(p: { x: number; y: number; scale: number; opacity: number; z?: number }) {
  return {
    "--x": fmt(p.x * K),
    "--y": fmt(p.y * K),
    "--s": fmt(p.scale),
    "--o": fmt(p.opacity),
    "--z": String(p.z ?? 0),
  } as React.CSSProperties;
}

const GROUPS: { id: PartnerGroup; eyebrow: string; heading: string }[] = [
  { id: "global", eyebrow: "Global partners", heading: "The funds changing who gets to invest." },
  { id: "africa", eyebrow: "Africa partners", heading: "Building the continent’s investment industry." },
];

export function NetworkGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const scene = sceneRef.current;
    const stage = stageRef.current;
    const rings = ringsRef.current;
    if (!wrap || !scene || !stage || !rings) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dotEls = Array.from(stage.querySelectorAll<HTMLElement>("[data-dot]"));
    const logoEls = Array.from(stage.querySelectorAll<HTMLElement>("[data-logo]"));
    const textEls = Array.from(scene.querySelectorAll<HTMLElement>("[data-reveal]"));
    const slotBySlug = new Map(
      Array.from(scene.querySelectorAll<HTMLElement>("[data-slot]")).map((el) => [el.dataset.slot, el]),
    );

    // Layout measurements, refreshed on resize.
    let px = 1; // CSS px per design px on the globe
    let targets: { x: number; y: number; scale: number }[] = [];
    const measure = () => {
      const sr = stage.getBoundingClientRect();
      if (!sr.width) return;
      px = sr.width / W;
      targets = LOGOS.map((l) => {
        const r = slotBySlug.get(l.slug)!.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - sr.left,
          y: r.top + r.height / 2 - sr.top,
          scale: r.width / (l.w * px),
        };
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(scene);
    document.fonts?.ready.then(measure);

    // 0 = globe, 1 = grid: how far the pinned scene has been scrolled through.
    const progress = () => {
      const travel = wrap.offsetHeight - scene.offsetHeight; // = the spacer
      if (travel <= 0) return 0;
      const pinTop = parseFloat(getComputedStyle(scene).top) || 0;
      const p = clamp((pinTop - wrap.getBoundingClientRect().top) / travel);
      return reduce ? (p < 0.5 ? 0 : 1) : p;
    };

    let theta = 0;
    let last = 0;
    let frame = 0;
    let running = false;
    let drawn = "";

    const tick = (now: number) => {
      const p = progress();
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      // The spin slows to a stop as the grid forms.
      if (!reduce) theta += dt * ((2 * Math.PI) / PERIOD_S) * (1 - smooth(0, 0.3, p));

      const key = `${p.toFixed(4)}|${theta.toFixed(4)}|${px}`;
      if (key !== drawn && targets.length) {
        drawn = key;
        const fade = smooth(0.05, 0.45, p); // dots and rings out
        rings.style.opacity = fmt(1 - fade);

        for (let i = 0; i < dotEls.length; i++) {
          const d = dotPose(DOTS[i], theta);
          const el = dotEls[i];
          el.style.transform = `translate3d(${(d.x * px).toFixed(2)}px, ${(d.y * px).toFixed(2)}px, 0) translate(-50%, -50%) scale(${(d.scale * (1 - 0.5 * fade)).toFixed(3)})`;
          el.style.opacity = fmt(d.opacity * (1 - fade));
        }

        for (let i = 0; i < logoEls.length; i++) {
          const l = LOGOS[i];
          const g = logoPose(l, theta);
          const t = targets[i];
          const e = smooth(0, 1, (p - 0.08 - 0.3 * l.delay) / 0.5);
          const x = lerp(g.x * px, t.x, e);
          const y = lerp(g.y * px, t.y, e);
          const s = lerp(g.scale, t.scale, e);
          const el = logoEls[i];
          el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${s.toFixed(3)})`;
          el.style.opacity = fmt(lerp(g.opacity, 1, e));
          el.style.zIndex = String(e > 0 ? 200 : g.z);
        }

        const reveal = smooth(0.55, 0.9, p);
        for (const el of textEls) {
          el.style.opacity = fmt(reveal);
          el.style.transform = `translateY(${((1 - reveal) * 12).toFixed(2)}px)`;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    // Only run while the section is on screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = 0;
        measure();
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    io.observe(wrap);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.morph}>
      <div ref={sceneRef} className={styles.scene}>
        {/* Grid state: real layout. The logos fly to these empty slots. */}
        <div className={styles.grid}>
          {GROUPS.map((g) => (
            <section key={g.id} className={styles.group} aria-labelledby={`partners-${g.id}`}>
              <p className={styles.eyebrow} data-reveal>
                {g.eyebrow}
              </p>
              <h3 id={`partners-${g.id}`} className={styles.groupHeading} data-reveal>
                {g.heading}
              </h3>
              <ul className={styles.slots}>
                {LOGOS.filter((l) => l.group === g.id).map((l) => (
                  <li
                    key={l.slug}
                    data-slot={l.slug}
                    className={styles.slot}
                    style={{ "--w": l.w, "--h": l.h } as React.CSSProperties}
                  >
                    <span className="sr-only">{l.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Globe state, plus the logos that travel between the two. */}
        <div className={styles.globe} aria-hidden="true">
          <div ref={stageRef} className={styles.stage}>
            <svg ref={ringsRef} className={styles.rings} viewBox="0 0 3600 1390">
              {RINGS.map((r) => (
                <ellipse
                  key={r.scale}
                  cx={CX}
                  cy={CY}
                  rx={RX * r.scale}
                  ry={RY * r.scale}
                  fill="none"
                  stroke={r.stroke}
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {DOTS.map((d, i) => (
              <span
                key={`d${i}`}
                data-dot
                className={styles.dot}
                style={{ ...firstFrame(dotPose(d, 0)), "--c": d.color } as React.CSSProperties}
              />
            ))}

            {LOGOS.map((l) => (
              <span key={l.slug} data-logo className={styles.logo} style={firstFrame(logoPose(l, 0))}>
                <Image
                  src={`/partners/${l.slug}-placeholder.png`}
                  alt=""
                  width={l.w}
                  height={l.h}
                  style={{ "--w": String(l.w) } as React.CSSProperties}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.travel} aria-hidden="true" />
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { WIDE_GLOBE, type PlacedLogo } from "./globeLayout";
import styles from "./LogoGlobe.module.css";

/*
 * Logo globe -> logo grid (used for partners and for alumni firms).
 *
 * 1. A see-through globe spins west to east. Logos float inside it: the ones at
 *    the back are smaller and fainter, and they come forward as it turns. Dots
 *    sit on the front surface, growing towards the viewer, coloured by height
 *    along the spectrum. At rotation 0 it reproduces the design exactly.
 * 2. The scene then pins under the header. Scrolling on fades the dots and
 *    rings and flies every logo into its cell in the grid (real HTML passed in
 *    as children, laid out by CSS, so it adapts to any width). Each grid cell
 *    marks itself with data-slot="<slug>"; anything with data-reveal fades in
 *    as the grid forms. Scrolling back reverses it.
 */

/** A logo: image size (design px, 2x its CSS size in the grid) and where it sits on the globe. */
export type GlobeLogo = {
  slug: string;
  name: string;
  w: number;
  h: number;
  globeX: number;
  globeY: number;
  globeScale: number;
  globeAlpha: number;
};

// Globe canvas (design px at 2x) and geometry measured from it.
const W = 3600;
/** Globe shape on a 3600-wide design canvas (screenshot px at 2x). */
export type GlobeShape = {
  /** Canvas height. */
  h: number;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rings: { scale: number; stroke: string }[];
  /** Smallest width (CSS px) the stage shrinks to before cropping at the sides. */
  minWidth?: number;
};


const K = 100 / W; // design px -> cqw of the stage
const PERIOD_S = 35; // one full revolution
const DOT_MAX = 15; // dot diameter (design px) when facing the viewer
// In the design, a logo 10% larger is about 12% stronger; both track depth.
const DEPTH_SCALE = 0.3;
const DEPTH_ALPHA = 0.36;

/** Positions of the seven spectrum colours (--sp1 … --sp7 in globals.css, green on Ascend Africa). */
const STOPS = [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1];

/** A point on the brand spectrum, as CSS so it follows the page's theme. */
function spectrumAt(t: number) {
  for (let i = 1; i < STOPS.length; i++) {
    if (t <= STOPS[i]) {
      const f = (t - STOPS[i - 1]) / (STOPS[i] - STOPS[i - 1]);
      return `color-mix(in srgb, var(--sp${i + 1}) ${(f * 100).toFixed(1)}%, var(--sp${i}))`;
    }
  }
  return "var(--sp7)";
}

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (e0: number, e1: number, v: number) => {
  const t = clamp((v - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---------- Dots: on the front surface, repeated round the back ---------- */

/**
 * A dot is [x, y] (spectrum-coloured, grows towards the viewer) or
 * [x, y, size, brightness] (a white speck of that size and brightness 0-255).
 */
export type GlobeDot = [number, number] | [number, number, number, number];

type Dot = { y: number; ring: number; lon: number; color: string; size?: number; alpha?: number };

function toSurface(g: GlobeShape, x: number, y: number) {
  const ny = (y - g.cy) / g.ry;
  const ring = Math.sqrt(Math.max(0, 1 - ny * ny));
  const s = ring > 0 ? clamp((x - g.cx) / g.rx / ring, -1, 1) : 0;
  return { y, ring, lon: Math.asin(s) };
}

/*
 * The design only fills the front (longitudes within about ±62°), so the dot
 * pattern is repeated in two more copies sharing the rest of the circle, joined
 * edge to edge. Dots fade out at the rim between span and span + GAP, where the
 * copies start, so rotation 0 shows exactly the design.
 */
const GAP = (10 * Math.PI) / 180;

function prepareDots(g: GlobeShape, points: GlobeDot[]) {
  const base = points.map((pt) => ({
    ...toSurface(g, pt[0], pt[1]),
    size: pt.length === 4 ? pt[2] : undefined,
    alpha: pt.length === 4 ? clamp((pt[3] - 18) / 200, 0.12, 1) : undefined,
  }));
  const span = Math.max(...base.map((b) => Math.abs(b.lon)));
  const rest = (2 * Math.PI - 2 * span - 3 * GAP) / 2;
  const squeeze = rest / (2 * span);
  const dots: Dot[] = base.flatMap((b) => {
    const color = b.size ? "#fff" : spectrumAt(0.5 - (b.y - g.cy) / g.ry / 2);
    return [b.lon, span + GAP + rest / 2 + b.lon * squeeze, span + 2 * GAP + rest * 1.5 + b.lon * squeeze].map(
      (lon) => ({ ...b, lon, color }),
    );
  });
  return { dots, span };
}

function dotPose(g: GlobeShape, d: Dot, theta: number, span: number) {
  const lon = d.lon + theta;
  const z = Math.max(0, d.ring * Math.cos(lon));
  const rim = smooth(Math.cos(span + GAP), Math.cos(span), Math.cos(lon));
  const x = g.cx + g.rx * d.ring * Math.sin(lon);
  if (d.size) {
    return { x, y: d.y, scale: 0.55 + 0.45 * z, opacity: (d.alpha ?? 1) * (0.25 + 0.75 * z) * rim };
  }
  return { x, y: d.y, scale: (1.5 + 13.5 * z) / DOT_MAX, opacity: z ** 1.25 * rim };
}

/* ---------- Logos: inside the globe, one each ---------- */

type Logo = PlacedLogo & { rho: number; lon: number; z0: number; delay: number };

function prepareLogos(g: GlobeShape, logos: PlacedLogo[]): Logo[] {
  return logos.map((l, i) => {
  const nx = (l.globeX - g.cx) / g.rx;
  const ny = (l.globeY - g.cy) / g.ry;
  const ring = Math.sqrt(Math.max(0, 1 - ny * ny)) * 0.98;
  // Depth from how large the logo is drawn, kept inside the globe.
  const zMax = Math.sqrt(Math.max(0, ring * ring - nx * nx));
  const z0 = clamp((l.globeScale - 1) / DEPTH_SCALE, -zMax, zMax);
  // Deterministic stagger so logos don't all arrive at once.
  const r = Math.sin((i + 1) * 12.9898) * 43758.5453;
  return { ...l, rho: Math.hypot(nx, z0), lon: Math.atan2(nx, z0), z0, delay: r - Math.floor(r) };
  });
}

function logoPose(g: GlobeShape, l: Logo, theta: number) {
  const lon = l.lon + theta;
  const z = l.rho * Math.cos(lon);
  return {
    x: g.cx + g.rx * l.rho * Math.sin(lon),
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

type Props = {
  /** Logos with their image and globe spot (see placeLogos in ./globeLayout). */
  logos: PlacedLogo[];
  dots: GlobeDot[];
  /** Globe shape; defaults to the wide ringed globe. */
  shape?: GlobeShape;
  /** Grid state: markup with a data-slot="<slug>" element per logo. */
  children: React.ReactNode;
  /** Pinned with the globe, above it (e.g. the section heading). */
  before?: React.ReactNode;
  /** Pinned with the globe, below it (e.g. a caption). */
  after?: React.ReactNode;
  /**
   * Pin under the site header, but if the whole scene is taller than the space
   * below the header, pin it so its bottom sits on the bottom of the screen.
   */
  fitViewport?: boolean;
  className?: string;
};

export function LogoGlobe({
  logos,
  dots,
  shape = WIDE_GLOBE,
  children,
  before,
  after,
  fitViewport,
  className,
}: Props) {
  const G = shape;
  const LOGOS = React.useMemo(() => prepareLogos(G, logos), [G, logos]);
  const { dots: DOTS, span: SPAN } = React.useMemo(() => prepareDots(G, dots), [G, dots]);
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
      if (fitViewport) {
        const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;
        scene.style.top = `${Math.min(headerH, window.innerHeight - scene.offsetHeight)}px`;
      }
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
    // The window height decides where a viewport-fitted scene pins.
    if (fitViewport) window.addEventListener("resize", measure);
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
          const d = dotPose(G, DOTS[i], theta, SPAN);
          const el = dotEls[i];
          el.style.transform = `translate3d(${(d.x * px).toFixed(2)}px, ${(d.y * px).toFixed(2)}px, 0) translate(-50%, -50%) scale(${(d.scale * (1 - 0.5 * fade)).toFixed(3)})`;
          el.style.opacity = fmt(d.opacity * (1 - fade));
        }

        for (let i = 0; i < logoEls.length; i++) {
          const l = LOGOS[i];
          const g = logoPose(G, l, theta);
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
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, [G, LOGOS, DOTS, SPAN, fitViewport]);

  return (
    <div ref={wrapRef} className={className ? `${styles.morph} ${className}` : styles.morph}>
      <div ref={sceneRef} className={styles.scene}>
        {/* Grid state: real layout. The logos fly to its data-slot cells. */}
        {before && <div className={styles.before}>{before}</div>}
        <div className={styles.layer}>{children}</div>
        {after && <div className={styles.after}>{after}</div>}

        {/* Globe state, plus the logos that travel between the two. */}
        <div className={styles.globe} aria-hidden="true">
          <div
            ref={stageRef}
            className={styles.stage}
            style={{ aspectRatio: `${W} / ${G.h}`, "--min-w": `${G.minWidth ?? 1000}px` } as React.CSSProperties}
          >
            <svg ref={ringsRef} className={styles.rings} viewBox={`0 0 ${W} ${G.h}`}>
              {G.rings.map((r, k) => (
                <ellipse
                  key={r.scale}
                  cx={G.cx}
                  cy={G.cy}
                  rx={G.rx * r.scale}
                  ry={G.ry * r.scale}
                  fill="none"
                  style={{ stroke: `var(--globe-ring-${k + 1}, ${r.stroke})` }}
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
                style={
                  {
                    ...firstFrame(dotPose(G, d, 0, SPAN)),
                    "--c": d.color,
                    ...(d.size ? { "--d": d.size } : {}),
                  } as React.CSSProperties
                }
              />
            ))}

            {LOGOS.map((l) => (
              <span key={l.slug} data-logo className={styles.logo} style={firstFrame(logoPose(G, l, 0))}>
                <Image
                  src={l.src}
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

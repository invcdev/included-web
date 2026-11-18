import React from "react";
import type { SiteContent } from "@/content/schema";
import styles from "./WhoItsFor.module.css";

type Content = SiteContent["everyoneIncluded"];


/*
 * Jigsaw layout. Each inside edge has one tab at its midpoint.
 * V[r][c]: edge to the right of column c in row r; +1 tab points right, -1 left.
 * H[r][c]: edge below row r in column c; +1 tab points down, -1 up.
 * Desktop directions are taken from the design; "You" has tabs going out top
 * and bottom and sockets on both sides.
 */
type Layout = {
  cols: number;
  rows: number;
  w: number; // piece size in px at full size
  h: number;
  you: [number, number];
  V: number[][];
  H: number[][];
};

const DESKTOP: Layout = {
  cols: 5,
  rows: 3,
  w: 214.5,
  h: 133.25,
  you: [1, 2],
  V: [
    [-1, 1, -1, -1],
    [-1, 1, -1, 1],
    [-1, -1, -1, -1],
  ],
  H: [
    [1, 1, -1, 1, -1],
    [-1, -1, 1, -1, -1],
  ],
};

const PHONE: Layout = {
  cols: 3,
  rows: 5,
  w: 214.5,
  h: 170,
  you: [2, 1],
  V: [
    [-1, 1],
    [1, -1],
    [1, -1],
    [-1, 1],
    [1, -1],
  ],
  H: [
    [1, -1, 1],
    [-1, -1, 1],
    [1, 1, -1],
    [-1, 1, 1],
  ],
};

// One tab, as cubic segments along the edge (u, from its middle) and outwards (v).
const TAB: [number, number][][] = [
  [[-26.5, 0], [-26, 1.5], [-26, 4]],
  [[-27, 13]],
  [[-27, 22], [-21, 27], [-13, 27]],
  [[13, 27]],
  [[21, 27], [27, 22], [27, 13]],
  [[26, 4]],
  [[26, 1.5], [26.5, 0], [29, 0]],
];

const f = (n: number) => +n.toFixed(2);

/** Path along an edge from A to B with a tab bulging towards `out` (unit vector). */
function edge(a: [number, number], b: [number, number], out: [number, number], move: boolean) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const e: [number, number] = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  const m: [number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const pt = ([u, v]: [number, number]) => `${f(m[0] + u * e[0] + v * out[0])} ${f(m[1] + u * e[1] + v * out[1])}`;
  let d = move ? `M${f(a[0])} ${f(a[1])}` : "";
  d += ` L${pt([-29, 0])}`;
  for (const seg of TAB) d += seg.length === 3 ? ` C${seg.map(pt).join(" ")}` : ` L${pt(seg[0])}`;
  d += ` L${f(b[0])} ${f(b[1])}`;
  return d;
}

function lines(l: Layout) {
  let d = "";
  for (let r = 0; r < l.rows; r++)
    for (let c = 0; c < l.cols - 1; c++) {
      const x = (c + 1) * l.w;
      d += edge([x, r * l.h], [x, (r + 1) * l.h], [l.V[r][c], 0], true);
    }
  for (let r = 0; r < l.rows - 1; r++)
    for (let c = 0; c < l.cols; c++) {
      const y = (r + 1) * l.h;
      d += edge([c * l.w, y], [(c + 1) * l.w, y], [0, l.H[r][c]], true);
    }
  return d;
}

function youPiece(l: Layout) {
  const [r, c] = l.you;
  const x0 = c * l.w, x1 = x0 + l.w, y0 = r * l.h, y1 = y0 + l.h;
  return (
    edge([x0, y0], [x1, y0], [0, l.H[r - 1][c]], true) +
    edge([x1, y0], [x1, y1], [l.V[r][c], 0], false) +
    edge([x1, y1], [x0, y1], [0, l.H[r][c]], false) +
    edge([x0, y1], [x0, y0], [l.V[r][c - 1], 0], false) +
    " Z"
  );
}

function Puzzle({
  layout,
  people,
  you,
  className,
}: {
  layout: Layout;
  /** Filled into the pieces left to right, top to bottom, skipping "You". */
  people: Content["people"];
  you: Content["you"];
  className: string;
}) {
  const W = layout.cols * layout.w;
  const H = layout.rows * layout.h;
  const [yr, yc] = layout.you;
  const youPath = youPiece(layout);
  let i = 0;
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < layout.rows; r++)
    for (let c = 0; c < layout.cols; c++) {
      const pos = { left: `${((c + 0.5) / layout.cols) * 100}%`, top: `${((r + 0.5) / layout.rows) * 100}%` };
      if (r === yr && c === yc) {
        cells.push(
          <li key="you" className={styles.you} style={pos}>
            <strong className={styles.youTitle}>{you.title}</strong>
            <span className={styles.youText}>{you.text}</span>
          </li>,
        );
      } else {
        const label = people[i++];
        cells.push(
          <li key={`${r}-${c}`} className={styles.piece} style={pos}>
            {label}
          </li>,
        );
      }
    }
  const gid = `you-fill-${layout.cols}`;
  return (
    <div
      className={`${styles.puzzle} ${className}`}
      style={{ aspectRatio: `${W} / ${H}`, "--cols": layout.cols } as React.CSSProperties}
    >
      <svg className={styles.puzzleArt} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#5035E2" />
            <stop offset="0.2" stopColor="#476FEA" />
            <stop offset="0.38" stopColor="#53ABF2" />
            <stop offset="0.55" stopColor="#6CE7FB" />
            <stop offset="0.72" stopColor="#7AF3B8" />
            <stop offset="0.88" stopColor="#98F872" />
            <stop offset="1" stopColor="#C2FD51" />
          </linearGradient>
          <filter id={`${gid}-glow`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>
        <rect width={W} height={H} className={styles.puzzleFill} />
        <path d={lines(layout)} className={styles.puzzleLines} />
        <rect width={W} height={H} className={styles.puzzleLines} />
        <path d={youPath} fill="#6CE7FB" opacity="0.45" filter={`url(#${gid}-glow)`} />
        <path d={youPath} fill={`url(#${gid})`} />
      </svg>
      <ul className={styles.labels}>{cells}</ul>
    </div>
  );
}

// A sprinkle of stars, fixed so server and client render the same.
const STARS = Array.from({ length: 46 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin((i + 1) * n) * 43758.5453;
    return x - Math.floor(x);
  };
  return { x: r(12.9898) * 100, y: r(78.233) * 100, s: 1 + r(37.719) * 1.6, o: 0.18 + r(91.17) * 0.45 };
});

export function WhoItsFor({ content: c }: { content: Content }) {
  return (
    <section id="everyone-included" className={styles.section} aria-labelledby="who-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="who-heading" className={styles.heading}>
              {c.heading}
            </h2>
          </div>
          <p className={styles.body}>{c.body}</p>
        </div>

        <div className={styles.panel}>
          <div className={styles.sky} aria-hidden="true">
            {STARS.map((s, i) => (
              <span
                key={i}
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: s.o }}
              />
            ))}
          </div>

          <Puzzle layout={DESKTOP} people={c.people} you={c.you} className={styles.puzzleWide} />
          <Puzzle layout={PHONE} people={c.people} you={c.you} className={styles.puzzleNarrow} />

          <p className={styles.note}>
            <span className={styles.noteDot} aria-hidden="true" />
            {c.note}{" "}
            <a href={c.noteLink.href} className={styles.noteLink}>
              {c.noteLink.label}
            </a>
          </p>

          <blockquote className={styles.quote}>
            <p>{c.quote}</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

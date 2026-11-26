"use client";

import React, { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content/schema";
import { RichText } from "../RichText";
import styles from "./OpenDoor.module.css";

/**
 * The opening of the landing page. A door of light opens once and keeps
 * widening until it is the whole section; the world inside gathers into a
 * unicorn. The copy is editable ("Opening" in the admin) and its headline
 * and intro rotate through a list of messages; the drawing is the design's own
 * canvas animation, ported as it was.
 */
export function OpenDoor({ content: c }: { content: SiteContent["openDoor"] }) {
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const count = c.messages.length;

  // The messages take turns. They hold still while the visitor's pointer or
  // keyboard focus is on the text, and for people who prefer reduced motion.
  useEffect(() => {
    const copy = copyRef.current;
    if (!copy || count < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let held = false;
    const hold = () => (held = true);
    const release = () => (held = false);
    copy.addEventListener("pointerenter", hold);
    copy.addEventListener("pointerleave", release);
    copy.addEventListener("focusin", hold);
    copy.addEventListener("focusout", release);
    const timer = setInterval(() => {
      if (!held && !document.hidden) setShown((i) => (i + 1) % count);
    }, Math.max(5, c.rotateSeconds) * 1000);
    return () => {
      clearInterval(timer);
      copy.removeEventListener("pointerenter", hold);
      copy.removeEventListener("pointerleave", release);
      copy.removeEventListener("focusin", hold);
      copy.removeEventListener("focusout", release);
    };
  }, [count, c.rotateSeconds]);

  useEffect(() => {
    const stage = stageRef.current;
    const cv = canvasRef.current;
    const replay = replayRef.current;
    const copy = copyRef.current;
    const ctx = cv?.getContext("2d");
    if (!stage || !cv || !replay || !copy || !ctx) return;
    return runDoor(stage, cv, ctx, replay, copy);
  }, []);

  return (
    <section ref={stageRef} id="open" className={styles.stage} aria-labelledby="open-heading">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.wrap}>
        <div className={styles.top}>
          <div className={styles.brand}>
            {c.brand} <span>{c.brandSub}</span>
          </div>
          <button ref={replayRef} className={styles.replay} type="button">
            {c.replayLabel}
          </button>
        </div>
        <div ref={copyRef} className={styles.copy}>
          <p className={styles.eb}>{c.eyebrow}</p>
          {/* Every message sits in the same spot, so the buttons never move as they change. */}
          <div className={styles.messages}>
            {c.messages.map((msg, i) => {
              const Heading = i === 0 ? "h1" : "p";
              return (
                <div key={i} className={`${styles.message} ${i === shown ? styles.on : ""}`} aria-hidden={i !== shown}>
                  <Heading id={i === 0 ? "open-heading" : undefined} className={styles.heading}>
                    <RichText text={msg.heading} classNames={{ strong: styles.grad }} />
                  </Heading>
                  <p className={styles.sub}>{msg.lede}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.cta}>
            <a className={styles.btn} href={c.primaryCta.href}>
              {c.primaryCta.label}
            </a>
            <a className={styles.link} href={c.secondaryCta.href}>
              {c.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- The animation (from the design, unchanged in behaviour) ---------- */

type Pt = { sx: number; sy: number; sz: number; u: U; d: number; x: number; y: number; vx: number; vy: number; fresh: boolean };
type U = { x: number; y: number; k: number };

const S3 = [
  [85, 51, 235],
  [0, 242, 255],
  [176, 255, 5],
];
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const ease = (t: number) => {
  t = clamp(t, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
function rgb(t: number) {
  t = clamp(t, 0, 1);
  const k = t < 0.52 ? 0 : 1;
  const u = t < 0.52 ? t / 0.52 : (t - 0.52) / 0.48;
  const a = S3[k];
  const b = S3[k + 1];
  return [Math.round(mix(a[0], b[0], u)), Math.round(mix(a[1], b[1], u)), Math.round(mix(a[2], b[2], u))];
}
function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** The unicorn, drawn once off-screen and sampled into points. */
function shape(): U[] {
  const c = document.createElement("canvas");
  c.width = 400;
  c.height = 440;
  const g = c.getContext("2d")!;
  g.lineCap = "round";
  g.strokeStyle = "#00f";
  g.lineWidth = 17;
  [
    [168, 132, 96, 150, 52, 214, 34, 292],
    [150, 170, 92, 214, 62, 280, 56, 356],
    [128, 236, 90, 290, 84, 350, 92, 420],
    [196, 104, 150, 84, 120, 96, 96, 132],
  ].forEach((q) => {
    g.beginPath();
    g.moveTo(q[0], q[1]);
    g.bezierCurveTo(q[2], q[3], q[4], q[5], q[6], q[7]);
    g.stroke();
  });
  g.fillStyle = "#fff";
  g.beginPath();
  g.moveTo(70, 440);
  g.bezierCurveTo(60, 330, 90, 210, 170, 130);
  g.lineTo(184, 66);
  g.lineTo(216, 118);
  g.bezierCurveTo(252, 122, 282, 152, 300, 192);
  g.bezierCurveTo(324, 242, 350, 286, 362, 318);
  g.bezierCurveTo(372, 346, 350, 372, 322, 366);
  g.bezierCurveTo(298, 362, 284, 346, 262, 332);
  g.bezierCurveTo(238, 318, 224, 302, 216, 290);
  g.bezierCurveTo(216, 350, 236, 400, 252, 440);
  g.closePath();
  g.fill();
  g.fillStyle = "#0f0";
  g.beginPath();
  g.moveTo(224, 112);
  g.lineTo(326, 6);
  g.lineTo(256, 130);
  g.closePath();
  g.fill();
  g.globalCompositeOperation = "destination-out";
  g.beginPath();
  g.arc(266, 206, 9, 0, 6.3);
  g.fill();
  g.beginPath();
  g.ellipse(346, 338, 5, 3, 0.5, 0, 6.3);
  g.fill();
  const d = g.getImageData(0, 0, 400, 440).data;
  const out: U[] = [];
  const st = 5;
  for (let y = 2; y < 440; y += st)
    for (let x = 2; x < 400; x += st) {
      const i = (y * 400 + x) * 4;
      if (d[i + 3] > 120)
        out.push({
          x: (x + hash(i) * st - 200) / 220,
          y: (y + hash(i + 7) * st - 222) / 220,
          k: d[i + 1] > 200 && d[i] < 80 ? 2 : d[i + 2] > 200 && d[i] < 80 ? 1 : 0,
        });
    }
  return out;
}

/** Starts the animation; returns a function that stops it and removes every listener. */
function runDoor(stage: HTMLElement, cv: HTMLCanvasElement, ctx: CanvasRenderingContext2D, replay: HTMLButtonElement, copy: HTMLElement) {
  let W = 0;
  let copyBottom = 0; // where the text ends, from the top of the section
  let H = 0;
  let DPR = 1;
  const STILL = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const P = { x: -999, y: -999, on: false, last: -99 };
  let now = 0;
  let prev = 0;
  let o = 0;
  let t0 = 0;
  let m = 0;
  let mT = 0;
  let flipAt = 1e9;
  let opened = false;
  let pts: Pt[] = [];
  let uni: U[] = [];
  let N = 0;
  let dust: { a: number; d: number; s: number; ph: number }[] = [];
  let raf = 0;
  let visible = true;

  const mob = () => W < 760;
  /*
   * Where the door stands and how big it is. On phones the design puts it under
   * the text; the site header takes some of the screen, so when the text would
   * overlap the unicorn, the door shrinks to fit the space below the text
   * (its floor line stays where the design has it).
   */
  const focus = () => {
    if (!mob()) return { x: W * 0.655, y: H * 0.47, s: Math.min(W * 0.3, H * 0.42) };
    const floor = H * 0.913;
    const s = Math.max(H * 0.12, Math.min(W * 0.5, H * 0.235, (floor - copyBottom - 8) / 2.04));
    return { x: W * 0.5, y: floor - 0.95 * s, s };
  };
  const measureCopy = () => {
    copyBottom = copy.getBoundingClientRect().bottom - stage.getBoundingClientRect().top;
  };

  function init() {
    if (!uni.length) uni = shape();
    N = Math.min(uni.length, mob() ? 1500 : 3200);
    const u = uni
      .slice()
      .sort((a, b) => hash(a.x * 91 + a.y * 13) - hash(b.x * 91 + b.y * 13))
      .slice(0, N);
    const f = focus();
    pts = [];
    for (let i = 0; i < N; i++) {
      const yy = 1 - (2 * (i + 0.5)) / N;
      const r = Math.sqrt(1 - yy * yy);
      const th = i * 2.399963;
      pts.push({ sx: Math.cos(th) * r, sy: yy, sz: Math.sin(th) * r, u: u[i], d: hash(i * 3.1), x: f.x, y: f.y, vx: 0, vy: 0, fresh: true });
    }
    dust = [];
    for (let j = 0; j < (mob() ? 60 : 130); j++) dust.push({ a: hash(j) * 2 - 1, d: hash(j + 0.3), s: 0.2 + hash(j + 0.6) * 0.8, ph: hash(j + 0.9) * 6.28 });
  }
  function restart() {
    o = 0;
    t0 = now;
    m = 0;
    mT = 0;
    opened = false;
    flipAt = 1e9;
    pts.forEach((p) => (p.fresh = true));
  }

  function frame(ms: number) {
    raf = 0;
    now = ms / 1000;
    const dt = Math.min(0.05, now - prev || 0.016);
    prev = now;
    const t = now;
    const f = focus();
    const cx = f.x;
    const dh = f.s * 1.9;
    const dw = f.s * 0.82;
    const yb = f.y + dh * 0.5;
    const ey = yb - dh * 0.52;
    /* the door only ever opens: progress never goes down */
    if (STILL) {
      o = 1;
      m = 1;
    } else {
      if (now - t0 > 0.5) o = Math.min(1, o + dt / (P.on && now - P.last < 0.6 ? 3.2 : 6));
      if (!opened && o > 0.8) {
        opened = true;
        flipAt = now + 0.9;
      }
      if (now > flipAt) {
        mT = mT ? 0 : 1;
        flipAt = now + (mT ? 11 : 5);
      }
      m += clamp(mT - m, -dt / 2.4, dt / 2.4);
    }
    const eo = ease(o);
    const far = Math.max(cx, W - cx) + 40;
    let hw = mix(dw * 0.05, far, Math.pow(o, 2.2));
    const yt = mix(yb - dh, -30, ease((o - 0.3) / 0.7));
    if (o < 0.3) hw = mix(dw * 0.05, dw * 0.5, ease(o / 0.3) * 0.55);
    hw = Math.max(hw, mix(dw * 0.05, dw * 0.275, ease(o / 0.3)));
    ctx.clearRect(0, 0, W, H);

    /* inside the door */
    ctx.save();
    ctx.beginPath();
    ctx.rect(cx - hw, yt, hw * 2, yb - yt);
    ctx.clip();
    const bg = ctx.createRadialGradient(cx, ey, 0, cx, ey, Math.max(W, H) * 0.8);
    bg.addColorStop(0, "#1b2046");
    bg.addColorStop(0.45, "#111530");
    bg.addColorStop(1, "#0b0e1a");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    const sc = mix(0.62, 1, eo);
    const R = f.s * 0.9 * sc;
    const S = f.s * 1.04 * sc;
    const rot = t * 0.28;
    const cr = Math.cos(rot);
    const sr = Math.sin(rot);
    const em = ease(m);
    for (let k = 1; k <= 3; k++) {
      const c0 = rgb(k / 3);
      ctx.strokeStyle = "rgba(" + c0 + "," + 0.2 * (1 - em) + ")";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, ey, R * (1.18 + k * 0.16), R * (0.34 + k * 0.07), -0.25, 0, 6.283);
      ctx.stroke();
    }
    for (let i = 0; i < N; i++) {
      const p = pts[i];
      const mi = ease(clamp(m * 1.5 - p.d * 0.5, 0, 1));
      const x3 = p.sx * cr - p.sz * sr;
      const z3 = p.sx * sr + p.sz * cr;
      const ax = cx + x3 * R;
      const ay = ey + p.sy * R * 0.96;
      const bx = cx + p.u.x * S;
      const by = ey + p.u.y * S + S * 0.06;
      const sw = Math.sin(mi * Math.PI) * (p.d - 0.5) * f.s * 0.9;
      const tx = mix(ax, bx, mi) + sw;
      const ty = mix(ay, by, mi) - Math.abs(sw) * 0.4;
      if (STILL || p.fresh) {
        p.x = tx;
        p.y = ty;
        p.vx = p.vy = 0;
        p.fresh = false;
      } else {
        p.vx = (p.vx + (tx - p.x) * 0.05) * 0.8;
        p.vy = (p.vy + (ty - p.y) * 0.05) * 0.8;
        if (P.on) {
          const dx = p.x - P.x;
          const dy = p.y - P.y;
          const dd = dx * dx + dy * dy;
          if (dd < 12000) {
            const fo = (1 - dd / 12000) * 2.6;
            const d = Math.sqrt(dd) + 0.01;
            p.vx += (dx / d) * fo;
            p.vy += (dy / d) * fo;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
      }
      const dep = (z3 + 1) / 2;
      const al = mix(0.2 + 0.75 * dep, 0.92, mi);
      const sz = mix(0.7 + dep * 1.2, p.u.k === 2 ? 1.9 : 1.45, mi) * Math.max(0.8, sc);
      const cs = rgb((1 - p.sy) / 2);
      const cu = p.u.k === 2 ? [176, 255, 5] : p.u.k === 1 ? rgb(0.12 + (p.u.y + 1) * 0.22) : [232, 238, 255];
      ctx.fillStyle =
        "rgba(" + Math.round(mix(cs[0], cu[0], mi)) + "," + Math.round(mix(cs[1], cu[1], mi)) + "," + Math.round(mix(cs[2], cu[2], mi)) + "," + al.toFixed(2) + ")";
      ctx.beginPath();
      ctx.arc(p.x, p.y, sz, 0, 6.283);
      ctx.fill();
    }
    if (m > 0.9) {
      const hx = cx + ((326 - 200) / 220) * S;
      const hy = ey + ((6 - 222) / 220) * S + S * 0.06;
      const tw = 0.6 + 0.4 * Math.sin(t * 5);
      const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 50);
      hg.addColorStop(0, "rgba(176,255,5," + (0.55 * tw * (m - 0.9) * 10).toFixed(2) + ")");
      hg.addColorStop(1, "rgba(176,255,5,0)");
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(hx, hy, 50, 0, 6.283);
      ctx.fill();
    }
    /* the blinding light fades as your eyes adjust */
    const veil = 1 - ease(o / 0.62);
    if (veil > 0.01) {
      const dg = ctx.createLinearGradient(0, yt, 0, yb);
      dg.addColorStop(0, "rgba(176,255,5," + veil + ")");
      dg.addColorStop(0.48, "rgba(0,242,255," + veil + ")");
      dg.addColorStop(1, "rgba(106,77,255," + veil + ")");
      ctx.fillStyle = dg;
      ctx.fillRect(cx - hw, yt, hw * 2, yb - yt);
      const core = ctx.createLinearGradient(cx - hw, 0, cx + hw, 0);
      core.addColorStop(0, "rgba(255,255,255,0)");
      core.addColorStop(0.5, "rgba(255,255,255," + 0.8 * veil + ")");
      core.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = core;
      ctx.fillRect(cx - hw, yt, hw * 2, yb - yt);
    }
    ctx.restore();

    /* the wall, sliding away */
    ctx.fillStyle = "#0b0e1a";
    ctx.fillRect(0, 0, Math.max(0, cx - hw), yb);
    ctx.fillRect(cx + hw, 0, Math.max(0, W - cx - hw), yb);
    if (yt > 0) ctx.fillRect(cx - hw, 0, hw * 2, yt);
    const wl = 1 - ease((o - 0.5) / 0.5);
    if (wl > 0.01) {
      const gl = ctx.createRadialGradient(cx, yb - dh * 0.5, hw * 0.6, cx, yb - dh * 0.5, hw + dh * 1.1);
      gl.addColorStop(0, "rgba(0,242,255," + 0.22 * wl + ")");
      gl.addColorStop(0.5, "rgba(85,51,235," + 0.14 * wl + ")");
      gl.addColorStop(1, "rgba(85,51,235,0)");
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, yb);
      ctx.rect(cx - hw, yt, hw * 2, yb - yt);
      ctx.clip("evenodd");
      ctx.fillStyle = gl;
      ctx.fillRect(0, 0, W, yb);
      ctx.restore();
    }
    const eg = ctx.createLinearGradient(0, Math.max(0, yt), 0, yb);
    eg.addColorStop(0, "#b0ff05");
    eg.addColorStop(0.5, "#00f2ff");
    eg.addColorStop(1, "#6a4dff");
    ctx.strokeStyle = eg;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(cx - hw, yb);
    ctx.lineTo(cx - hw, yt);
    ctx.lineTo(cx + hw, yt);
    ctx.lineTo(cx + hw, yb);
    ctx.stroke();
    ctx.globalAlpha = 1;

    /* floor: the light spills towards you */
    ctx.fillStyle = "#090c17";
    ctx.fillRect(0, yb, W, H - yb);
    const spread = (H - yb) * 1.5 + hw * 0.5;
    const fl = ctx.createLinearGradient(0, yb, 0, H);
    fl.addColorStop(0, "rgba(120,255,220," + mix(0.6, 0.3, eo) + ")");
    fl.addColorStop(0.4, "rgba(0,242,255," + mix(0.24, 0.12, eo) + ")");
    fl.addColorStop(1, "rgba(85,51,235,0)");
    ctx.fillStyle = fl;
    ctx.beginPath();
    ctx.moveTo(cx - hw, yb);
    ctx.lineTo(cx + hw, yb);
    ctx.lineTo(cx + hw + spread, H);
    ctx.lineTo(cx - hw - spread, H);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, yb);
    ctx.lineTo(W, yb);
    ctx.stroke();
    for (let j = 0; j < dust.length; j++) {
      const q = dust[j];
      const dd2 = (q.d + t * 0.02 * q.s) % 1;
      const y = yb + (H - yb) * dd2 * 0.9 - (STILL ? 0 : Math.sin(t * q.s + q.ph) * 6);
      const half = hw + spread * ((y - yb) / (H - yb));
      const x = cx + q.a * Math.min(half, W) * 0.92;
      if (y < yb || x < 0 || x > W) continue;
      ctx.fillStyle = "rgba(255,255,255," + (0.2 + 0.4 * Math.abs(Math.sin(t * 1.3 * q.s + q.ph))).toFixed(2) + ")";
      ctx.beginPath();
      ctx.arc(x, y, 0.8 + dd2 * 1.8, 0, 6.283);
      ctx.fill();
    }
    /* the person on the threshold */
    const ph = dh * 0.2;
    const fx = cx - f.s * 0.02;
    const shd = ctx.createLinearGradient(0, yb, 0, yb + ph * 2.4);
    shd.addColorStop(0, "rgba(4,6,12,.85)");
    shd.addColorStop(1, "rgba(4,6,12,0)");
    ctx.fillStyle = shd;
    ctx.beginPath();
    ctx.moveTo(fx - ph * 0.13, yb);
    ctx.lineTo(fx + ph * 0.13, yb);
    ctx.lineTo(fx + ph * 0.5, yb + ph * 2.4);
    ctx.lineTo(fx - ph * 0.5, yb + ph * 2.4);
    ctx.fill();
    ctx.fillStyle = "#04060c";
    ctx.beginPath();
    ctx.arc(fx, yb - ph * 0.88, ph * 0.11, 0, 6.283);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(fx - ph * 0.16, yb - ph * 0.72);
    ctx.quadraticCurveTo(fx, yb - ph * 0.8, fx + ph * 0.16, yb - ph * 0.72);
    ctx.lineTo(fx + ph * 0.11, yb);
    ctx.lineTo(fx - ph * 0.11, yb);
    ctx.closePath();
    ctx.fill();
    /* keep the copy readable once the wall has gone */
    if (!mob()) {
      const sh = ctx.createLinearGradient(0, 0, W * 0.5, 0);
      sh.addColorStop(0, "rgba(11,14,26," + 0.75 * eo + ")");
      sh.addColorStop(1, "rgba(11,14,26,0)");
      ctx.fillStyle = sh;
      ctx.fillRect(0, 0, W * 0.5, H);
    }
    if (!STILL && visible) raf = requestAnimationFrame(frame);
  }

  function size() {
    const r = stage.getBoundingClientRect();
    W = r.width;
    H = r.height;
    DPR = Math.min(W < 760 ? 1.5 : 2, devicePixelRatio || 1);
    cv.width = W * DPR;
    cv.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    measureCopy();
  }
  const drawOnce = () => frame(performance.now());
  function pt(e: PointerEvent) {
    const r = cv.getBoundingClientRect();
    P.x = e.clientX - r.left;
    P.y = e.clientY - r.top;
    P.on = true;
    P.last = now;
  }
  const leave = () => (P.on = false);
  const gather = () => {
    if (o > 0.8) {
      mT = mT ? 0 : 1;
      flipAt = now + (mT ? 11 : 5);
    }
  };
  const onReplay = () => {
    restart();
    if (STILL) drawOnce();
  };
  let rt: ReturnType<typeof setTimeout> | undefined;
  const onResize = () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      size();
      init();
      if (STILL) drawOnce();
    }, 120);
  };

  stage.addEventListener("pointermove", pt);
  stage.addEventListener("pointerdown", pt);
  stage.addEventListener("pointerleave", leave);
  cv.addEventListener("click", gather);
  replay.addEventListener("click", onReplay);
  addEventListener("resize", onResize);

  // Only animate while the section is on screen.
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !STILL && !raf) raf = requestAnimationFrame(frame);
  });
  io.observe(stage);
  // The text can change height as fonts load or the content is edited.
  const ro = new ResizeObserver(measureCopy);
  ro.observe(copy);

  size();
  init();
  now = prev = performance.now() / 1000;
  t0 = now;
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(rt);
    io.disconnect();
    ro.disconnect();
    stage.removeEventListener("pointermove", pt);
    stage.removeEventListener("pointerdown", pt);
    stage.removeEventListener("pointerleave", leave);
    cv.removeEventListener("click", gather);
    replay.removeEventListener("click", onReplay);
    removeEventListener("resize", onResize);
  };
}

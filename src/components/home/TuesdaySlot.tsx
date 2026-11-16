"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./TuesdaySlot.module.css";

/*
 * "Your Tuesdays" panel.
 *
 * Times are worked out from the first session (Tuesday 5 January 2027,
 * 16:00-18:30 UK time) for each city and for the visitor's own time zone,
 * which also decides which city is highlighted.
 *
 * When the panel comes into view the city cards tumble into an orbit around
 * the UK time. Scrolling back up (the panel heading down out of view) plays it
 * in reverse. One progress value drives everything, so it can turn round
 * mid-flight.
 */

const START = Date.UTC(2027, 0, 5, 16, 0); // 16:00 UK (GMT in January)
const END = START + 150 * 60 * 1000; // 18:30

type City = {
  name: string;
  tz: string;
  aliases?: string[];
  /** Sky gradient, top -> bottom, sampled from the design. */
  sky: [string, string, string];
  body: "sun" | "moon";
  /** Centre of the sun/moon from the card top (px at full size). */
  bodyY: number;
};

// Order = grid order (left to right, top to bottom) = clockwise round the orbit from the top.
const CITIES: City[] = [
  { name: "Los Angeles", tz: "America/Los_Angeles", sky: ["#3C58B2", "#5F7DC9", "#81A5DF"], body: "sun", bodyY: 58 },
  { name: "New York", tz: "America/New_York", sky: ["#64A1E2", "#8ABDE9", "#B2D9F1"], body: "sun", bodyY: 53 },
  { name: "São Paulo", tz: "America/Sao_Paulo", sky: ["#65A2E3", "#89BCE8", "#B2DAF2"], body: "sun", bodyY: 50 },
  { name: "London", tz: "Europe/London", sky: ["#74B4E2", "#A1CCDD", "#D1E5DA"], body: "sun", bodyY: 44 },
  { name: "Lagos", tz: "Africa/Lagos", sky: ["#73B3DF", "#A1CCDD", "#D1E5DA"], body: "sun", bodyY: 42 },
  { name: "Nairobi", tz: "Africa/Nairobi", sky: ["#727FAA", "#859088", "#9AA468"], body: "sun", bodyY: 38 },
  { name: "Dubai", tz: "Asia/Dubai", sky: ["#3D4471", "#535763", "#6A6953"], body: "moon", bodyY: 38 },
  { name: "Mumbai", tz: "Asia/Kolkata", aliases: ["Asia/Calcutta"], sky: ["#3D446F", "#545661", "#6A6955"], body: "moon", bodyY: 38 },
  { name: "Singapore", tz: "Asia/Singapore", sky: ["#121B32", "#19233F", "#3C425B"], body: "moon", bodyY: 63 },
  { name: "Sydney", tz: "Australia/Sydney", sky: ["#121B32", "#19233F", "#3A425F"], body: "moon", bodyY: 63 },
];

function formatTime(ms: number, timeZone: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    })
      .format(ms)
      .replace(":00", "");
  } catch {
    return "";
  }
}

const DEFAULT_TZ = "Europe/London";

// Stage geometry at full size (the visual scales down with its width on small screens).
const STAGE_W = 545;
const CARD_W = 98.5;
const CARD_H = 136;
const GRID_X = [0, 111.5, 223, 335, 445.5];
const GRID_Y = [77.5, 227];
const ORBIT = { x: 271, y: 219, r: 180 };

// Timeline (seconds). Cards leave one after another, then the orbit forms.
const STAGGER = 0.055;
const CARD_DUR = 1.15;
const TOTAL = 1.75;

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const smooth = (t: number) => t * t * (3 - 2 * t);

function orbitPoint(i: number) {
  const a = (i * 36 * Math.PI) / 180;
  return { x: ORBIT.x + ORBIT.r * Math.sin(a), y: ORBIT.y - ORBIT.r * Math.cos(a) };
}

export function TuesdaySlot() {
  const [tz, setTz] = useState(DEFAULT_TZ);
  // The animation loop reads the time zone without re-subscribing.
  const tzRef = useRef(tz);
  useEffect(() => {
    tzRef.current = tz;
  }, [tz]);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the visitor's time zone is only known in the browser
      if (local) setTz(local);
    } catch {
      /* keep UK time */
    }
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    const stage = stageRef.current;
    if (!panel || !stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(stage.querySelectorAll<HTMLElement>("[data-card]"));
    const places = Array.from(stage.querySelectorAll<HTMLElement>("[data-place]"));
    const fades = Array.from(stage.querySelectorAll<HTMLElement | SVGElement>("[data-fade]"));
    const sphere = stage.querySelector<HTMLElement>("[data-sphere]");

    let u = stage.clientWidth / STAGE_W; // CSS px per design px
    const ro = new ResizeObserver(() => {
      u = stage.clientWidth / STAGE_W;
      draw();
    });
    ro.observe(stage);

    let p = 0; // 0 = cards, 1 = orbit
    let target = 0;
    let frame = 0;
    let last = 0;

    const draw = () => {
      const e = p * TOTAL; // seconds into the timeline
      cards.forEach((el, i) => {
        const c = CITIES[i];
        const t = clamp((e - i * STAGGER) / CARD_DUR);
        const k = easeInOut(t);
        const bump = Math.sin(Math.PI * t);
        const o = orbitPoint(i);
        const gx = GRID_X[i % 5];
        const gy = GRID_Y[Math.floor(i / 5)];
        const ox = o.x - CARD_W / 2;
        const oy = o.y - CARD_H / 2;
        const s0 = c.tz === tzRef.current || (c.aliases ?? []).includes(tzRef.current) ? 1.03 : 1;
        const x = gx + (ox - gx) * k + 24 * bump;
        const y = gy + (oy - gy) * k - 14 * bump;
        const scale = s0 - (s0 - 0.08) * Math.pow(k, 2.2);
        el.style.transform =
          `translate(${(x * u).toFixed(2)}px, ${(y * u).toFixed(2)}px) ` +
          `rotateY(${(-26 * bump).toFixed(2)}deg) rotateX(${(12 * bump).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = (t < 0.55 ? 1 : 1 - smooth((t - 0.55) / 0.45)).toFixed(3);
      });
      const f = smooth(clamp((e - 0.55) / 0.7));
      fades.forEach((el) => (el.style.opacity = f.toFixed(3)));
      if (sphere) {
        const s = easeOut(clamp((e - 0.5) / 0.85));
        sphere.style.opacity = s.toFixed(3);
        sphere.style.transform = `scale(${(0.6 + 0.4 * s).toFixed(3)})`;
      }
      places.forEach((el, i) => {
        const t = easeOut(clamp((e - 0.75 - i * STAGGER) / 0.5));
        el.style.opacity = t.toFixed(3);
        el.style.scale = (0.6 + 0.4 * t).toFixed(3);
      });
    };

    const tick = (now: number) => {
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      const step = dt / TOTAL;
      p = target > p ? Math.min(target, p + step) : Math.max(target, p - step);
      draw();
      frame = p === target ? 0 : requestAnimationFrame(tick);
      if (!frame) last = 0;
    };

    const go = (to: number) => {
      if (to === target) return;
      target = to;
      if (reduce) {
        p = to;
        draw();
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.55) go(1);
        // Panel slipping back down the screen = scrolling up: reverse.
        else if (entry.boundingClientRect.top > 0) go(0);
      },
      { threshold: [0, 0.2, 0.4, 0.55, 0.7, 0.85, 1] },
    );
    io.observe(panel);
    draw();

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const mine = (c: City) => c.tz === tz || (c.aliases ?? []).includes(tz);
  const yourStart = formatTime(START, tz) || formatTime(START, DEFAULT_TZ);
  const yourEnd = formatTime(END, tz) || formatTime(END, DEFAULT_TZ);

  return (
    <section id="your-tuesdays" className={styles.section} aria-labelledby="tuesdays-heading">
      <div className="container">
        <div ref={panelRef} className={styles.panel}>
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.copy}>
            <p className={styles.eyebrow}>Live every Tuesday &middot; 16:00&ndash;18:30 UK time</p>
            <h2 id="tuesdays-heading" className={styles.heading}>
              Your Tuesdays: {yourStart} to {yourEnd}.
            </h2>
            <p className={styles.lede}>
              This is your slot for fourteen Tuesdays. Put it in your calendar now. If it fits, so do
              you.
            </p>
            <p className={styles.pill}>
              <span className={styles.pillDot} aria-hidden="true" />
              <span>Your Tuesday:</span>
              <strong className={styles.pillTime}>
                {yourStart} to {yourEnd}
              </strong>
              <span className={styles.pillZone}>{tz}</span>
            </p>
            <p className={styles.note}>
              Sessions are always at 16:00 UK time. The times here are for the first session, Tuesday
              5 January. Outside the UK and Europe, your local time moves by an hour for a few
              sessions in March and April, when clocks change.
            </p>
          </div>

          <div ref={stageRef} className={styles.stage}>
            {/* Orbit state */}
            <div className={styles.orbit} aria-hidden="true">
              <svg className={styles.orbitPath} viewBox={`0 0 ${STAGE_W} 440`} data-fade>
                <circle cx={ORBIT.x} cy={ORBIT.y} r={ORBIT.r} />
              </svg>
              <span className={styles.ring} data-fade />
              <span className={styles.sphere} data-sphere>
                <span className={styles.sphereLabel}>UK time</span>
                <span className={styles.sphereTime}>16:00&ndash;18:30</span>
                <span className={styles.sphereNote}>every Tuesday</span>
              </span>
              {CITIES.map((c, i) => {
                const { x, y } = orbitPoint(i);
                return (
                  <span
                    key={c.name}
                    className={styles.place}
                    data-place
                    data-mine={mine(c) || undefined}
                    style={{ "--x": x.toFixed(2), "--y": y.toFixed(2) } as React.CSSProperties}
                  >
                    <span className={styles.placeDot} />
                    <span className={styles.placeName}>{c.name}</span>
                    <span className={styles.placeTime}>{formatTime(START, c.tz)}</span>
                  </span>
                );
              })}
            </div>

            {/* Grid state: the cards fly to their orbit positions */}
            <ul className={styles.cards} aria-label="The first session in other cities">
              {CITIES.map((c, i) => {
                return (
                  <li
                    key={c.name}
                    className={styles.card}
                    data-card
                    data-mine={mine(c) || undefined}
                    style={
                      {
                        "--gx": GRID_X[i % 5],
                        "--gy": GRID_Y[Math.floor(i / 5)],
                        "--sky1": c.sky[0],
                        "--sky2": c.sky[1],
                        "--sky3": c.sky[2],
                        "--body-y": c.bodyY,
                      } as React.CSSProperties
                    }
                  >
                    <span className={styles.cardCity}>{c.name}</span>
                    <span className={c.body === "sun" ? styles.sun : styles.moon} aria-hidden="true" />
                    <span className={styles.cardTime}>{formatTime(START, c.tz)}</span>
                    <span className={styles.cardTo}>to {formatTime(END, c.tz)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

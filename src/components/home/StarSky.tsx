"use client";

import React, { useEffect, useRef } from "react";

/** Twinkling stars behind a navy section. Fills its positioned parent. */
export function StarSky({
  density = 1,
  className,
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    if (!cv || !host) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let stars: {
      x: number;
      y: number;
      r: number;
      a: number;
      ph: number;
      sp: number;
    }[] = [];
    let frame = 0;
    let seen = false;

    // Deterministic scatter, so the sky looks the same on every visit.
    const rand = (() => {
      let s = 12345;
      return () => (s = (s * 16807) % 2147483647) / 2147483647;
    })();

    const build = () => {
      const r = host.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(
        Math.min(170, Math.max(30, (w * h) / 11000)) * density,
      );
      stars = Array.from({ length: n }, () => ({
        x: rand() * w,
        y: rand() * h,
        r: 0.4 + rand() * 1.1,
        a: 0.18 + rand() * 0.45,
        ph: rand() * 6.283,
        sp: 0.004 + rand() * 0.008,
      }));
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = still ? s.a : s.a * (0.6 + 0.4 * Math.sin(s.ph));
        ctx.fillStyle = `rgba(234,240,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.283);
        ctx.fill();
      }
    };

    const tick = () => {
      for (const s of stars) s.ph += s.sp;
      draw();
      frame = seen ? requestAnimationFrame(tick) : 0;
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      if (seen && !still && !frame) frame = requestAnimationFrame(tick);
    });
    io.observe(host);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

"use client";

import React, { useEffect, useRef } from "react";

interface UnicornCanvasProps {
  dotScale?: number;
}

export function UnicornCanvas({ dotScale = 1 }: UnicornCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    if (!wrap || !cv) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let isDestroyed = false;
    let animId: number;

    const stops = [
      "#5533EB",
      "#2062FF",
      "#00C2E8",
      "#1FBF4C",
      "#9CCB16",
      "#F0B90B",
    ];

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    // Silhouette drawn on offscreen canvas (unit space 100 x 92, scaled x3)
    const off = document.createElement("canvas");
    off.width = 300;
    off.height = 276;
    const o = off.getContext("2d");
    if (!o) return;

    o.scale(3, 3);
    o.fillStyle = "#000";

    const ell = (
      x: number,
      y: number,
      rx: number,
      ry: number,
      rot: number = 0
    ) => {
      o.save();
      o.translate(x, y);
      o.rotate(rot);
      o.beginPath();
      o.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      o.fill();
      o.restore();
    };

    const poly = (pts: [number, number][]) => {
      o.beginPath();
      o.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        o.lineTo(pts[i][0], pts[i][1]);
      }
      o.closePath();
      o.fill();
    };

    // Horn
    poly([
      [71.5, 14.5],
      [74.5, 15.5],
      [84, 1.5],
    ]);
    // Ears
    poly([
      [66.5, 15],
      [68.5, 8.5],
      [70.5, 14],
    ]);
    poly([
      [70.5, 14],
      [73, 7.5],
      [75.5, 14.5],
    ]);
    // Head
    ell(74.5, 20, 9.5, 6, 0.35);
    ell(84, 25, 5, 3.6, 0.3);
    ell(88, 27, 2.6, 2.4, 0);
    ell(70.5, 23.5, 5.5, 4.5, 0.2);
    // Neck
    poly([
      [58, 46],
      [67, 23],
      [78, 27],
      [66, 50],
    ]);
    // Chest
    ell(61, 47, 8.5, 7.5, 0);
    // Mane
    ell(64, 17, 4.5, 4, 0);
    ell(59, 23, 5, 4.5, 0);
    ell(55, 30, 5.5, 4.8, 0);
    ell(51.5, 37, 5.5, 5, 0);
    ell(49, 44, 5, 4.6, 0);
    ell(68.5, 12.5, 3.6, 3, 0);
    // Body + Rump
    ell(47, 53, 19, 12, -0.12);
    ell(33, 53, 10.5, 9.5, 0);
    // Front leg A
    poly([
      [63, 56],
      [67.5, 57],
      [65.5, 68],
      [61.5, 67],
    ]);
    poly([
      [61.5, 67],
      [65.5, 68],
      [63.5, 80],
      [60, 79.5],
    ]);
    poly([
      [60, 79.5],
      [63.5, 80],
      [63, 84.5],
      [59.5, 84],
    ]);
    // Front leg B
    poly([
      [55, 58],
      [59, 58.5],
      [56.5, 79],
      [53, 78.5],
    ]);
    poly([
      [53, 78.5],
      [56.5, 79],
      [56, 83.5],
      [52.5, 83],
    ]);
    // Back leg A
    poly([
      [28, 59],
      [32, 60],
      [28.5, 81],
      [25, 80.5],
    ]);
    poly([
      [25, 80.5],
      [28.5, 81],
      [28, 85.5],
      [24.5, 85],
    ]);
    // Back leg B
    poly([
      [37, 60],
      [41, 61],
      [38.5, 80],
      [35, 79.5],
    ]);
    poly([
      [35, 79.5],
      [38.5, 80],
      [38, 84.5],
      [34.5, 84],
    ]);
    // Tail root & wisps
    ell(29, 55, 5, 4, 0);
    ell(25, 58, 5.5, 5, 0);
    ell(20.5, 64, 5, 4.6, 0);
    ell(17, 71, 4.5, 4.2, 0);
    ell(14.5, 78, 4, 3.8, 0);
    ell(13, 85, 3.2, 3, 0);
    ell(22, 68, 3, 2.8, 0);
    ell(19.5, 76, 2.8, 2.6, 0);
    ell(17.5, 84, 2.4, 2.2, 0);
    ell(16.5, 90, 1.8, 1.7, 0);
    ell(27, 64, 3, 2.8, 0);
    ell(25, 72, 2.6, 2.4, 0);
    ell(23.5, 79, 2.2, 2, 0);

    o.globalCompositeOperation = "destination-out";
    poly([
      [63.5, 22],
      [66, 23.2],
      [56.5, 46.5],
      [54, 45],
    ]);
    o.globalCompositeOperation = "source-over";

    const data = o.getImageData(0, 0, 300, 276).data;

    interface Dot {
      u: number;
      v: number;
      ph: number;
      ox: number;
      oy: number;
      n: number;
      amb: boolean;
      col?: string;
      bx?: number;
      by?: number;
    }

    const dots: Dot[] = [];
    for (let sy = 2; sy < 276; sy += 4) {
      for (let sx = 2; sx < 300; sx += 4) {
        if (data[(sy * 300 + sx) * 4 + 3] > 120) {
          dots.push({
            u: sx / 300,
            v: sy / 276,
            ph: rnd(0, Math.PI * 2),
            ox: 0,
            oy: 0,
            n: rnd(-0.02, 0.02),
            amb: false,
          });
        }
      }
    }

    for (let i = 0; i < 42; i++) {
      dots.push({
        u: rnd(0.02, 0.98),
        v: rnd(0.02, 0.98),
        ph: rnd(0, Math.PI * 2),
        ox: 0,
        oy: 0,
        n: rnd(-0.02, 0.02),
        amb: true,
      });
    }

    const hex2 = (h: string) => [
      parseInt(h.slice(1, 3), 16),
      parseInt(h.slice(3, 5), 16),
      parseInt(h.slice(5, 7), 16),
    ];
    const ST = stops.map(hex2);

    const samp = (t: number) => {
      t = Math.max(0, Math.min(0.999, t));
      const f = t * (ST.length - 1);
      const i = Math.floor(f);
      const k = f - i;
      const a = ST[i];
      const b = ST[i + 1];
      return `rgb(${Math.round(a[0] + (b[0] - a[0]) * k)},${Math.round(
        a[1] + (b[1] - a[1]) * k
      )},${Math.round(a[2] + (b[2] - a[2]) * k)})`;
    };

    dots.forEach((d) => {
      d.col = samp(d.v + d.n);
    });

    let W = 0;
    let H = 0;
    let cx0 = 0;
    let cy0 = 0;
    let cw = 0;
    let chh = 0;
    let ds = 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const size = () => {
      W = wrap.clientWidth;
      H = Math.round(W * 0.95);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const asp = 100 / 92;
      cw = Math.min(W * 0.94, H * 0.94 * asp);
      chh = cw / asp;
      cx0 = (W - cw) / 2;
      cy0 = (H - chh) / 2 - H * 0.02;
      ds = (cw / 75) * 0.55;

      dots.forEach((d) => {
        d.bx = cx0 + d.u * cw;
        d.by = cy0 + d.v * chh;
        if (d.amb) {
          d.bx = d.u * W;
          d.by = d.v * H;
        }
      });
    };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(wrap);

    let mx = -9999;
    let my = -9999;

    const handlePointerMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };

    const handlePointerLeave = () => {
      mx = -9999;
      my = -9999;
    };

    wrap.addEventListener("pointermove", handlePointerMove);
    wrap.addEventListener("pointerleave", handlePointerLeave);

    let t = 0;
    let last = performance.now();

    const draw = (now: number) => {
      if (isDestroyed) return;
      animId = requestAnimationFrame(draw);

      const dt = Math.min((now - last) / 1000, 0.06);
      last = now;
      t += dt;

      ctx.clearRect(0, 0, W, H);
      const R = Math.max(56, W * 0.14);
      const push = R * 0.34;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let tx = 0;
        let ty = 0;

        if (mx > -999 && d.bx !== undefined && d.by !== undefined) {
          const ddx = d.bx - mx;
          const ddy = d.by - my;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < R && dist > 0.001) {
            const f = 1 - dist / R;
            tx = (ddx / dist) * f * f * push;
            ty = (ddy / dist) * f * f * push;
          }
        }

        d.ox += (tx - d.ox) * 0.12;
        d.oy += (ty - d.oy) * 0.12;

        const idle = Math.sin(t * 1.4 + d.ph) * 0.6;
        const s = d.amb ? ds * 0.6 : ds * dotScale;

        ctx.globalAlpha = d.amb ? 0.3 : 0.86 + 0.14 * Math.sin(t * 2 + d.ph);
        ctx.fillStyle = d.col || "#5533EB";
        if (d.bx !== undefined && d.by !== undefined) {
          ctx.fillRect(
            d.bx + d.ox - s / 2,
            d.by + d.oy + idle - s / 2,
            s,
            s
          );
        }
      }
      ctx.globalAlpha = 1;
    };

    animId = requestAnimationFrame(draw);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      ro.disconnect();
      wrap.removeEventListener("pointermove", handlePointerMove);
      wrap.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [dotScale]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Spectrum dot-matrix unicorn illustration"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          touchAction: "pan-y",
        }}
      />
    </div>
  );
}

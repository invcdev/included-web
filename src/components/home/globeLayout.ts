/*
 * Joins editable logo content (name + image, from the CMS) with the globe
 * layout measured from the design (position, depth and box size, keyed by slug).
 *
 * - Grid order follows the content, so the admin can reorder logos.
 * - A slug that is in the layout keeps its designed spot. If its image has a
 *   different shape from the design's, it gets a box of the same area with the
 *   new image's aspect ratio, so a replaced logo keeps the same visual weight.
 * - A new slug (a logo added in the admin) gets an automatic spot inside the
 *   globe, chosen from its slug so it never moves between renders.
 *
 * Plain module (no "use client") so server components can call it.
 */
import type { GlobeLogoContent } from "@/content/schema";
import type { GlobeLogo, GlobeShape } from "./LogoGlobe";

export type PlacedLogo = GlobeLogo & { src: string };

/** The wide, ringed globe used by the partner and alumni sections. */
export const WIDE_GLOBE: GlobeShape = {
  h: 1390,
  cx: 1799.5,
  cy: 665.5,
  rx: 1702,
  ry: 414.5,
  rings: [
    { scale: 1.2135, stroke: "#F0FFD6" },
    { scale: 1.1074, stroke: "#E2FCEF" },
    { scale: 1, stroke: "#D5EAFD" },
  ],
};

/** Stable 0..1 values from a string. */
function hash01(s: string, salt: number) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

function median(values: number[]) {
  const v = [...values].sort((a, b) => a - b);
  return v.length ? v[Math.floor(v.length / 2)] : 0;
}

export function placeLogos(shape: GlobeShape, layout: GlobeLogo[], items: GlobeLogoContent[]): PlacedLogo[] {
  const bySlug = new Map(layout.map((l) => [l.slug, l]));
  const maxW = Math.max(...layout.map((l) => l.w));
  const maxH = Math.max(...layout.map((l) => l.h));
  const typicalArea = median(layout.map((l) => l.w * l.h));
  const typicalScale = median(layout.map((l) => l.globeScale));
  const typicalAlpha = median(layout.map((l) => l.globeAlpha));

  return items.map((item) => {
    const spot = bySlug.get(item.slug);
    const aspect = item.logo.width / item.logo.height;

    // Box size (design px, 2x the CSS size in the grid).
    let w = spot?.w ?? 0;
    let h = spot?.h ?? 0;
    if (!spot || Math.abs(aspect / (w / h) - 1) > 0.03) {
      const area = spot ? spot.w * spot.h : typicalArea;
      w = Math.sqrt(area * aspect);
      h = w / aspect;
      const fit = Math.min(1, maxW / w, maxH / h);
      w = Math.round(w * fit);
      h = Math.round(h * fit);
    }

    if (spot) return { ...spot, name: item.name, w, h, src: item.logo.url };

    // New logo: a point inside the globe, away from the rim.
    const ny = (hash01(item.slug, 1) * 2 - 1) * 0.6;
    const ring = Math.sqrt(1 - ny * ny);
    const nx = (hash01(item.slug, 2) * 2 - 1) * 0.75 * ring;
    return {
      slug: item.slug,
      name: item.name,
      w,
      h,
      globeX: shape.cx + nx * shape.rx,
      globeY: shape.cy + ny * shape.ry,
      globeScale: typicalScale,
      globeAlpha: typicalAlpha,
      src: item.logo.url,
    };
  });
}

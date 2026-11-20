/** Content shapes used by more than one site page. */
import { z } from "zod";
import { imageSchema } from "../blocks";
import { img } from "./img";

/** A logo sphere that sorts itself into groups as you scroll. */
export const orbSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  lede: z.string().optional(),
  globalLabel: z.object({ title: z.string(), heading: z.string() }).describe("Shown over the global group once the sphere has sorted."),
  africaLabel: z.object({ title: z.string(), heading: z.string() }).describe("Shown over the Africa group once the sphere has sorted."),
  hint: z.string().optional(),
  logos: z
    .array(
      z.object({
        name: z.string(),
        logo: imageSchema,
        group: z.enum(["global", "africa"]),
        scale: z.number().positive().optional().describe("Visual size, where 1 is normal. For logos that look too small."),
      }),
    )
    .describe("Each logo sits on the sphere, then moves to its group as the visitor scrolls."),
});
export type OrbContent = z.infer<typeof orbSchema>;

/** The scrolling "As featured in" strip. */
export const pressStripSchema = z.object({
  heading: z.string(),
  logos: z.array(z.object({ name: z.string(), logo: imageSchema })),
});
export type PressStripContent = z.infer<typeof pressStripSchema>;

/* ---------- defaults ---------- */

export const PARTNER_LOGOS: [string, string, "global" | "africa"][] = [
  ["g_bitkraft", "BITKRAFT", "global"],
  ["g_creandum", "Creandum", "global"],
  ["g_daphni", "daphni", "global"],
  ["g_eif", "European Investment Fund", "global"],
  ["g_hsbc", "HSBC", "global"],
  ["g_hv", "HV Capital", "global"],
  ["g_mangrove", "Mangrove Capital Partners", "global"],
  ["g_mouro", "Mouro Capital", "global"],
  ["g_notion", "Notion Capital", "global"],
  ["g_esprit", "Esprit Foundation", "global"],
  ["g_seedcamp", "Seedcamp", "global"],
  ["g_wilson", "Wilson Sonsini", "global"],
  ["a_undp", "UNDP", "africa"],
  ["a_timbuktoo", "timbuktoo", "africa"],
  ["a_german", "German Cooperation", "africa"],
  ["a_giz", "GIZ", "africa"],
  ["a_sais", "SAIS", "africa"],
  ["a_fsd", "FSD Africa", "africa"],
  ["a_aban", "ABAN", "africa"],
  ["a_ahl", "AHL Venture Partners", "africa"],
  ["a_aruwa", "Aruwa Capital Management", "africa"],
  ["a_atg", "ATG Samata", "africa"],
  ["a_enza", "Enza Capital", "africa"],
  ["a_launch", "Launch Africa", "africa"],
  ["a_jedar", "Jedar Capital", "africa"],
  ["a_madica", "Madica", "africa"],
  ["a_next176", "Next176", "africa"],
  ["a_persistent", "Persistent", "africa"],
  ["a_sabou", "Sabou Capital", "africa"],
];

export const partnerLogos = (only?: string[]) =>
  PARTNER_LOGOS.filter(([f]) => !only || only.includes(f)).map(([f, name, group]) => ({
    name,
    logo: img(`/site/logos/${f}.png`, name),
    group,
  }));

export const CLASSIC_LABELS = {
  globalLabel: { title: "Global partners", heading: "Fully funded by *the funds changing who gets to invest.*" },
  africaLabel: { title: "Africa partners", heading: "Building the continent's *investment industry.*" },
  hint: "Scroll to sort the network",
};

export const pressStripDefault: PressStripContent = {
  heading: "📰 As featured in",
  logos: [
    ["p00", "Silicon Canals"],
    ["p01", "Forbes"],
    ["p02", "Startups Magazine"],
    ["p03", "Sky News"],
    ["p04", "Business Insider"],
  ].map(([f, name]) => ({ name, logo: img(`/site/press/${f}.webp`, name) })),
};

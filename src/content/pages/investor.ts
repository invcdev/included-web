/** Investor Fellowship page (/investor). */
import { z } from "zod";
import { imageSchema, linkSchema } from "../blocks";
import { img } from "./img";
import { pageMetaSchema } from "./shared";

export const investorSchemas = {
  investorMeta: pageMetaSchema,
  investorHead: z.object({
    crumbs: z.string(),
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
  }),
  investorWho: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    paragraphs: z.array(z.string()),
    cta: linkSchema,
    image: imageSchema,
  }),
  investorNetwork: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    logos: z
      .array(
        z.object({
          name: z.string(),
          logo: imageSchema,
          x: z.number().min(0).max(100),
          y: z.number().min(0).max(100),
        }),
      )
      .describe("Logos float around the globe. Position is across and down the stage, in %."),
    caption: z.string(),
  }),
  investorEcosystem: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    cards: z.array(z.object({ title: z.string(), image: imageSchema, link: linkSchema })),
  }),
};

type Content = { [K in keyof typeof investorSchemas]: z.infer<(typeof investorSchemas)[K]> };

const logo = (file: string, name: string, x: number, y: number) => ({ name, logo: img(`/site/logos/${file}.png`, name), x, y });

export const investorDefaults: Content = {
  investorMeta: {
    title: "Investor Fellowship",
    description:
      "A private, partner-nominated Fellowship for experienced professionals investing across Africa, built with the funds shaping the continent's capital.",
  },
  investorHead: {
    crumbs: "[Universe](/) / Programmes / Investor Fellowship",
    eyebrow: "Included VC Investor Fellowship",
    heading: "For the people *already writing cheques.*",
    lede: "The family's deeper tier. A private, partner-nominated Fellowship for experienced professionals investing across Africa, built with the funds shaping the continent's capital.",
  },
  investorWho: {
    eyebrow: "Who it is for",
    heading: "Experienced investors, *nominated by a partner.*",
    paragraphs: [
      "Fund managers, principals and senior associates already deploying capital on the continent. Nomination comes through an Included VC partner fund, so there is no open application.",
      "What you get: a seat at the table where African venture gets decided, closed-door sessions with the funds shaping the market and a lifelong peer group doing the same work.",
    ],
    cta: { label: "Talk to us about a nomination", href: "mailto:nikita@included.vc" },
    image: img("/site/tile-investor.jpg", ""),
  },
  investorNetwork: {
    eyebrow: "The network",
    heading: "Fully funded by the funds *changing who gets to invest.*",
    logos: [
      logo("g_creandum", "Creandum", 18, 22),
      logo("g_daphni", "Daphni", 72, 16),
      logo("g_eif", "European Investment Fund", 86, 46),
      logo("g_hsbc", "HSBC", 14, 56),
      logo("g_mangrove", "Mangrove Capital Partners", 28, 84),
      logo("g_mouro", "Mouro Capital", 74, 80),
      logo("g_notion", "Notion Capital", 50, 8),
      logo("g_seedcamp", "Seedcamp", 60, 92),
      logo("g_wilson", "Wilson Sonsini", 8, 40),
    ],
    caption: "Meet the nine [and the 55,000 people they opened the door for](/alumni)",
  },
  investorEcosystem: {
    eyebrow: "The ecosystem",
    heading: "Three Fellowships, *one family.*",
    lede: "Each programme is a region of the same sky. Same values, different light.",
    cards: [
      { title: "Included VC Ascend Global", image: img("/site/tile-global.jpg"), link: { label: "Learn more", href: "/programme" } },
      { title: "Included VC Ascend Africa", image: img("/site/tile-africa.jpg"), link: { label: "Learn more", href: "/ascend-africa" } },
      { title: "Included VC Investor Fellowship", image: img("/site/tile-investor.jpg"), link: { label: "Learn more", href: "/investor" } },
    ],
  },
};

export const investorSections = [
  { key: "investorMeta", label: "Search & sharing", description: "Page title and description." },
  { key: "investorHead", label: "Page header", description: "Breadcrumb, heading and intro." },
  { key: "investorWho", label: "Who it is for", description: "Text, button and image." },
  { key: "investorNetwork", label: "The network", description: "Partner logos floating around the globe." },
  { key: "investorEcosystem", label: "The ecosystem", description: "The three Fellowship cards." },
] as const;

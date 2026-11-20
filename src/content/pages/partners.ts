/** Partners page (/partners). The original export notes nothing links here any more (About has #partners). */
import { z } from "zod";
import { linkSchema } from "../blocks";
import { img } from "./img";
import { CLASSIC_LABELS, orbSchema, partnerLogos, pressStripDefault, pressStripSchema } from "./parts";
import { pageMetaSchema } from "./shared";

export const partnersSchemas = {
  partnersMeta: pageMetaSchema,
  partnersHead: z.object({ crumbs: z.string(), eyebrow: z.string(), heading: z.string(), lede: z.string() }),
  partnersOrb: orbSchema,
  partnersCommunity: orbSchema,
  partnersPress: pressStripSchema,
  partnersSponsor: z.object({ eyebrow: z.string(), heading: z.string(), lede: z.string(), cta: linkSchema }),
};

type Content = { [K in keyof typeof partnersSchemas]: z.infer<(typeof partnersSchemas)[K]> };

const COMMUNITY: [string, string][] = [
  ["afrobytes", "Afrobytes"],
  ["lmf", "Lmf"],
  ["unrest", "Unrest"],
  ["ink", "Ink"],
  ["54ventures", "54 Ventures"],
  ["londonafrica", "London Africa"],
  ["overseasvietnamese", "Overseas Vietnamese"],
  ["50intech", "50Intech"],
  ["thebaobabnetwork", "The Baobab Network"],
  ["bv", "Bv"],
];

export const partnersDefaults: Content = {
  partnersMeta: {
    title: "Partners",
    description: "Venture Partners, Community Partners, instructors and mentors: the funds and communities behind Included VC.",
  },
  partnersHead: {
    crumbs: "[Universe](/) / Partners",
    eyebrow: "The network",
    heading: "Fully funded by the funds *changing who gets to invest.*",
    lede: "Venture Partners, Community Partners, instructors and mentors. The people who make the universe turn.",
  },
  partnersOrb: {
    eyebrow: "The network",
    heading: "Funded by *our partners.*",
    ...CLASSIC_LABELS,
    logos: partnerLogos(),
  },
  partnersCommunity: {
    eyebrow: "Grassroots communities",
    heading: "Included VC *Community Partners.*",
    ...CLASSIC_LABELS,
    logos: COMMUNITY.map(([f, name]) => ({ name, logo: img(`/site/clogos/${f}.png`, name), group: "global" as const })),
  },
  partnersPress: pressStripDefault,
  partnersSponsor: {
    eyebrow: "Sponsor the universe",
    heading: "We are a fund that wants to *change the face of VC.*",
    lede: "Wonderful. Partner Funds get exclusive access to Included VC reading material and events for their teams.",
    cta: { label: "Talk to Nikita", href: "mailto:nikita@included.vc" },
  },
};

export const partnersSections = [
  { key: "partnersMeta", label: "Search & sharing", description: "Page title and description." },
  { key: "partnersHead", label: "Page header", description: "Breadcrumb, heading and intro." },
  { key: "partnersOrb", label: "Partners sphere", description: "Global and Africa partner logos." },
  { key: "partnersCommunity", label: "Community Partners", description: "Community partner logos." },
  { key: "partnersPress", label: "As featured in", description: "Press logos." },
  { key: "partnersSponsor", label: "Sponsor", description: "The closing message for funds." },
] as const;

/** Instructors & Mentors page (/instructors). */
import { z } from "zod";
import { imageSchema, linkSchema } from "../blocks";
import { img } from "./img";
import { pageMetaSchema } from "./shared";

export const instructorsSchemas = {
  instructorsMeta: pageMetaSchema,
  instructorsHero: z.object({
    crumbs: z.string(),
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    image: imageSchema,
  }),
  instructorsIntro: z.object({ eyebrow: z.string(), heading: z.string(), lede: z.string() }),
  /** The table lists the landing page's Faculty (names, roles, photos and fields are edited there). */
  instructorsNetwork: z.object({
    tabLabel: z.string(),
    teachCta: linkSchema,
    searchPlaceholder: z.string(),
    emptyText: z.string(),
  }),
};

type Content = { [K in keyof typeof instructorsSchemas]: z.infer<(typeof instructorsSchemas)[K]> };

export const instructorsDefaults: Content = {
  instructorsMeta: {
    title: "Instructors & Mentors",
    description: "Every masterclass, deep dive and office hour is run by a working investor. Meet the faculty, instructors and mentors of Included VC.",
  },
  instructorsHero: {
    crumbs: "[Universe](/) / Instructors & Mentors",
    eyebrow: "The Included VC network",
    heading: "Learn from the people *who do the job.*",
    lede: "Every masterclass, deep dive and office hour is run by a working investor. Mentors are matched to you for the full fourteen weeks.",
    image: img("/site/instructors-hero.jpg", ""),
  },
  instructorsIntro: {
    eyebrow: "Faculty",
    heading: "Meet your faculty, *instructors and mentors.*",
    lede: "Partners, principals and operators from the funds behind the Fellowship. Search the network, filter by relationship or field, and tap a name to see who they are.",
  },
  instructorsNetwork: {
    tabLabel: "Instructors & mentors",
    teachCta: { label: "Teach with us", href: "mailto:nikita@included.vc" },
    searchPlaceholder: "Find an instructor, fund or field",
    emptyText: "No one matches that yet.",
  },
};

export const instructorsSections = [
  { key: "instructorsMeta", label: "Search & sharing", description: "Page title and description." },
  { key: "instructorsHero", label: "Page header", description: "Photo, heading and intro." },
  { key: "instructorsIntro", label: "Faculty intro", description: "Heading and intro above the table." },
  { key: "instructorsNetwork", label: "The network", description: "Labels of the searchable table. The people in it are the Faculty on the Ascend page." },
] as const;

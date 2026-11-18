/**
 * Content schema for the Ascend landing page.
 *
 * Every piece of text, every link and every image on the page is described
 * here. The same schema is used to:
 *   - type the default content (src/content/defaults.ts),
 *   - validate whatever comes back from the database before the page uses it,
 *   - drive the forms of the admin portal (one form per section).
 *
 * Text fields support a small inline format (see src/components/RichText.tsx):
 *   **bold**   *italic*   [link text](https://example.com)
 *
 * Fields marked "fixed length" back a design that only works with that many
 * items (for example the 5 x 3 jigsaw); the admin should edit, not add/remove.
 */
import { z } from "zod";

/* ---------- Building blocks ---------- */

/**
 * An image. `url` is either a path under /public (defaults) or a Cloudinary
 * delivery URL (https://res.cloudinary.com/...). `width`/`height` are the
 * intrinsic pixel size, used for aspect ratio and responsive sizes.
 * `publicId` is kept when the image lives in Cloudinary, so the admin can
 * replace or transform it later.
 */
/** Where images may come from. next/image only serves these (see next.config.ts). */
export const IMAGE_URL_PREFIXES = ["/", "https://res.cloudinary.com/"] as const;

export const imageSchema = z.object({
  url: z
    .string()
    .min(1, "Add an image")
    .refine((u) => IMAGE_URL_PREFIXES.some((p) => u.startsWith(p)) && !u.startsWith("//"), {
      message: "Upload the image, or use a /public path or a res.cloudinary.com URL",
    }),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  publicId: z.string().optional(),
});

export const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const kickerSchema = z.object({
  step: z.string(),
  label: z.string(),
});

export const statSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const testimonialSchema = z.object({
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  /** Optional photo; the gradient circle is shown when empty. */
  avatar: imageSchema.optional(),
});

/** A heading/eyebrow/body trio used by most sections. */
const intro = {
  eyebrow: z.string(),
  heading: z.string(),
  body: z.string(),
};

/** A logo shown in a globe and its grid. `slug` keys it to its globe position. */
export const globeLogoSchema = z.object({
  slug: z.string(),
  name: z.string(),
  logo: imageSchema,
});

/** A list of globe logos. Slugs must be unique: each one is a cell in the grid. */
function logoList<T extends z.ZodType<{ slug: string }>>(item: T) {
  return z.array(item).refine((list) => new Set(list.map((l) => l.slug)).size === list.length, {
    message: "Each logo needs its own slug",
  });
}

/* ---------- Sections ---------- */

export const metaSchema = z.object({
  title: z.string(),
  description: z.string(),
  ogImage: imageSchema.optional(),
});

export const headerSchema = z.object({
  logo: imageSchema,
  nav: z.array(linkSchema),
  cta: linkSchema,
});

export const heroSchema = z.object({
  kicker: kickerSchema,
  eyebrow: z.string(),
  heading: z.string(),
  lede: z.string(),
  callout: z.string(),
  primaryCta: linkSchema,
  secondaryCta: linkSchema,
  glanceTitle: z.string(),
  glance: z.array(z.object({ label: z.string(), value: z.string() })),
  fee: z.object({ label: z.string(), value: z.string() }),
  stats: z.array(statSchema),
  note: z.object({ text: z.string(), link: linkSchema }),
});

export const pressSchema = z.object({
  label: z.string(),
  outlets: z.array(
    z.object({
      name: z.string(),
      /** Grey version shown at rest. */
      logo: imageSchema,
      /** Full-colour version that fades in on hover. */
      colorLogo: imageSchema.optional(),
    }),
  ),
});

export const networkSchema = z.object({
  ...intro,
  groups: z.array(z.object({ id: z.enum(["global", "africa"]), eyebrow: z.string(), heading: z.string() })),
  partners: logoList(globeLogoSchema.extend({ group: z.enum(["global", "africa"]) })).describe(
    "Each slug must be unique. Known slugs keep their place on the globe; new ones get a spot automatically.",
  ),
});

export const founderLetterSchema = z.object({
  photo: imageSchema,
  name: z.string(),
  role: z.string(),
  eyebrow: z.string(),
  quote: z.string(),
  body: z.string(),
  kicker: z.string(),
  primaryCta: linkSchema,
  secondaryCta: linkSchema,
});

export const introducingSchema = z.object({
  eyebrow: z.string(),
  logo: imageSchema,
  byline: imageSchema,
  stats: z.array(z.object({ value: z.string(), title: z.string(), text: z.string() })),
  illustration: imageSchema,
  tracksLabel: z.string(),
  /** Fixed length (2): purple dot, then lime dot. */
  tracks: z.array(z.string()).describe("Two tracks: the first gets the purple dot, the second the lime dot."),
});

export const seatCtaSchema = z.object({
  testimonial: testimonialSchema.optional(),
  /** Each entry is one line on desktop. */
  heading: z.array(z.string()).describe("Each line is its own line on desktop; they run together on phones."),
  note: z.string(),
  button: linkSchema,
});

export const climbSchema = z.object({
  kicker: kickerSchema,
  ...intro,
  stages: z.array(
    z.object({
      n: z.string(),
      title: z.string(),
      text: z.string(),
      note: z.string().optional(),
      highlight: z.boolean().optional(),
    }),
  ),
});

export const curriculumSchema = z.object({
  ...intro,
  hint: z.string(),
  blocks: z.array(
    z.object({
      label: z.string(),
      title: z.string(),
      weeks: z.array(z.object({ n: z.number().int(), title: z.string(), details: z.string() })),
    }),
  ),
  africa: z.object({ title: z.string(), text: z.string(), cta: linkSchema }),
});

export const outcomesSchema = z.object({
  heading: z.string(),
  /** Top-edge colours follow the order: purple, sky, mint, lime. */
  cards: z
    .array(z.object({ title: z.string(), text: z.string() }))
    .describe("Top-edge colours go purple, sky, mint, lime, in order."),
  testimonial: testimonialSchema,
});

export const monthSchema = z.object({
  ...intro,
  weeks: z.array(
    z.object({
      label: z.string(),
      events: z.array(
        z.object({
          day: z.string(),
          kind: z.enum(["masterclass", "task", "africa", "office"]),
          title: z.string(),
          meta: z.string().optional(),
        }),
      ),
    }),
  ),
  stats: z.array(statSchema),
  footnote: z.string(),
});

export const tuesdaysSchema = z.object({
  eyebrow: z.string(),
  /** Followed by the visitor's local time, e.g. "Your Tuesdays: 5 PM to 7:30 PM." */
  headingPrefix: z.string().describe('Shown before the visitor\'s local time, e.g. "Your Tuesdays:" 5 PM to 7:30 PM.'),
  lede: z.string(),
  pillLabel: z.string(),
  note: z.string(),
  sphereLabel: z.string(),
  sphereTime: z.string(),
  sphereNote: z.string(),
});

export const facultySchema = z.object({
  kicker: kickerSchema,
  eyebrow: z.string(),
  heading: z.string(),
  button: linkSchema,
  people: z.array(z.object({ name: z.string(), role: z.string(), photo: imageSchema })),
});

export const everyoneIncludedSchema = z.object({
  ...intro,
  /** Fixed length (14): the jigsaw is 5 x 3 with "You" in the middle. */
  people: z
    .array(z.string())
    .length(14)
    .describe('The 14 jigsaw pieces, left to right, top to bottom. "You" sits in the middle.'),
  you: z.object({ title: z.string(), text: z.string() }),
  note: z.string(),
  noteLink: linkSchema,
  quote: z.string(),
});

export const audienceSchema = z.object({
  ...intro,
  groups: z.array(z.object({ title: z.string(), text: z.string(), tags: z.array(z.string()) })),
});

export const storiesSchema = z.object({
  ...intro,
  /** Fixed length (6): the grid layout places them feature, card, card, feature, wide, card. */
  stories: z
    .array(testimonialSchema)
    .length(6)
    .describe("Six stories. Their places: large, card, card, large, wide, card."),
  /** Values support *italic* for the slanted parts ("*7 years*", "500*+*"). */
  stats: z.array(statSchema).describe('Wrap the slanted part of a value in *stars*, e.g. "500*+*".'),
  note: z.string(),
  link: linkSchema,
});

export const alumniSchema = z.object({
  ...intro,
  firms: logoList(globeLogoSchema).describe(
    "Each slug must be unique. Known slugs keep their place on the globe; new ones get a spot automatically.",
  ),
});

export const countriesSchema = z.object({
  ...intro,
  caption: z.string(),
  flags: logoList(globeLogoSchema).describe(
    "Each slug must be unique. Known slugs keep their place on the sphere; new ones get a spot automatically.",
  ),
});

export const dealSchema = z.object({
  kicker: kickerSchema,
  heading: z.string(),
  body: z.string(),
  /** Bar colours follow the order: purple, cyan, lime. */
  terms: z
    .array(z.object({ title: z.string(), text: z.string() }))
    .describe("Bar colours go purple, cyan, lime, in order."),
});

export const ticketSchema = z.object({
  ...intro,
  admit: z.string(),
  price: z.string(),
  priceSuffix: z.string(),
  text: z.string(),
  details: z.array(z.object({ label: z.string(), value: z.string() })),
  cta: linkSchema,
  note: z.string(),
  tracksLabel: z.string(),
  /** Fixed length (2): Global then Africa. `ticketLabel` replaces the track on the ticket. */
  tracks: z
    .array(z.object({ name: z.string(), ticketLabel: z.string() }))
    .describe("Two tracks. The ticket label is what the ticket shows when that track is picked."),
  features: z.array(z.object({ title: z.string(), text: z.string() })),
});

export const promiseSchema = z.object({
  ...intro,
  promiseTitle: z.string(),
  /** Each item: "**Lead phrase** rest of the sentence". */
  promises: z.array(z.string()).describe("Bold the lead phrase with **stars**."),
  cannotTitle: z.string(),
  cannot: z.array(z.string()).describe("Bold the lead phrase with **stars**."),
  quote: z.string(),
  attribution: z.string(),
});

export const employersSchema = z.object({
  ...intro,
  cardTitle: z.string(),
  cardText: z.string(),
  button: linkSchema,
});

export const valuesSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  body: z.string(),
  /** Fixed length (4): one per point of the star. */
  values: z
    .array(z.object({ n: z.string(), title: z.string(), short: z.string(), text: z.string() }))
    .length(4)
    .describe("Four values, one per point of the star. The short name is the label on the star."),
  links: z.array(linkSchema),
});

export const joinSchema = z.object({
  kicker: kickerSchema,
  ...intro,
  /** Fixed length (3), followed by the final panel. */
  steps: z
    .array(z.object({ n: z.string(), title: z.string(), text: z.string() }))
    .length(3)
    .describe("Three steps, followed by the final panel."),
  final: z.object({ title: z.string(), text: z.string(), cta: linkSchema }),
  payments: z.array(z.string()),
  question: z.object({ title: z.string(), text: z.string(), cta: linkSchema }),
});

export const tldrSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  lede: z.string(),
  /** `at` is the star's position on the map, in % [x, y]. Stars are joined in list order. */
  facts: z.array(
    z.object({
      k: z.string(),
      v: z.string(),
      b: z.string(),
      at: z.tuple([z.number().min(0).max(100), z.number().min(0).max(100)]),
    }),
  ).describe("Stars are joined in list order. Position is across and down the map, in %."),
});

export const faqSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  groups: z.array(z.object({ title: z.string(), items: z.array(z.object({ q: z.string(), a: z.string() })) })),
});

export const finalCtaSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  body: z.string(),
  cta: linkSchema,
});

export const footerSchema = z.object({
  logo: imageSchema,
  byline: imageSchema,
  tagline: z.string(),
  columns: z.array(z.object({ title: z.string(), links: z.array(linkSchema) })),
  copyright: z.string(),
  legal: z.array(linkSchema),
});

/* ---------- The whole page ---------- */

export const siteContentSchema = z.object({
  meta: metaSchema,
  header: headerSchema,
  hero: heroSchema,
  press: pressSchema,
  network: networkSchema,
  founderLetter: founderLetterSchema,
  introducing: introducingSchema,
  seatCtas: z.object({
    afterIntroducing: seatCtaSchema,
    afterTuesdays: seatCtaSchema,
    afterCountries: seatCtaSchema,
    afterValues: seatCtaSchema,
  }),
  climb: climbSchema,
  curriculum: curriculumSchema,
  outcomes: outcomesSchema,
  month: monthSchema,
  tuesdays: tuesdaysSchema,
  faculty: facultySchema,
  everyoneIncluded: everyoneIncludedSchema,
  audience: audienceSchema,
  stories: storiesSchema,
  alumni: alumniSchema,
  countries: countriesSchema,
  deal: dealSchema,
  ticket: ticketSchema,
  promise: promiseSchema,
  employers: employersSchema,
  values: valuesSchema,
  join: joinSchema,
  tldr: tldrSchema,
  faq: faqSchema,
  finalCta: finalCtaSchema,
  footer: footerSchema,
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type SectionKey = keyof SiteContent;
export type ImageContent = z.infer<typeof imageSchema>;
export type LinkContent = z.infer<typeof linkSchema>;
export type TestimonialContent = z.infer<typeof testimonialSchema>;
export type GlobeLogoContent = z.infer<typeof globeLogoSchema>;

/** Per-section schemas, for validating one section at a time (admin saves, partial DB rows). */
export const sectionSchemas = siteContentSchema.shape;

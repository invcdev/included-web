/**
 * Building blocks shared by every page's content schema (images, links, ...).
 * See schema.ts for how content is described and edited.
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
export const intro = {
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
export function logoList<T extends z.ZodType<{ slug: string }>>(item: T) {
  return z.array(item).refine((list) => new Set(list.map((l) => l.slug)).size === list.length, {
    message: "Each logo needs its own slug",
  });
}


/**
 * Default images for the site pages. Files live in /public/site; their pixel
 * sizes are recorded in assetDims.json (regenerate it if files change).
 */
import dims from "./assetDims.json";
import type { z } from "zod";
import type { imageSchema } from "../blocks";

type ImageContent = z.infer<typeof imageSchema>;

const DIMS: Record<string, number[]> = dims;

export function img(url: string, alt = ""): ImageContent {
  const d = DIMS[url];
  if (!d) throw new Error(`No size recorded for ${url} (see src/content/pages/assetDims.json)`);
  return { url, alt, width: d[0], height: d[1] };
}

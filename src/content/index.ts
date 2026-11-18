import { cacheLife, cacheTag } from "next/cache";
import { defaultContent } from "./defaults";
import { sectionSchemas, type SectionKey, type SiteContent } from "./schema";
import { getContentStore, type StoredContent } from "./store";

export { defaultContent } from "./defaults";
export * from "./schema";

/** Cache tag for all page content. Revalidate it after every admin save. */
export const CONTENT_TAG = "site-content";

/**
 * The content for the whole page: saved sections from the store, each checked
 * against its schema, with the defaults filling anything missing or invalid.
 *
 * Cached until the CONTENT_TAG is revalidated, so visitors never wait on the
 * database and an edit appears as soon as the admin publishes it.
 */
export async function getSiteContent(): Promise<SiteContent> {
  "use cache";
  cacheTag(CONTENT_TAG);

  let stored: StoredContent | null = null;
  try {
    stored = await getContentStore().load();
    cacheLife("max");
  } catch (err) {
    // Database unreachable: serve the defaults, but only cache that briefly
    // so the saved content comes back on its own once the database does.
    console.error("[content] could not load saved content, using defaults", err);
    cacheLife("minutes");
  }
  return mergeContent(stored);
}

/** Saved sections over the defaults, each validated on its own. */
export function mergeContent(stored: StoredContent | null): SiteContent {
  if (!stored) return defaultContent;
  const merged = { ...defaultContent } as Record<SectionKey, unknown>;
  for (const key of Object.keys(sectionSchemas) as SectionKey[]) {
    const value = stored[key];
    if (value === undefined) continue;
    const parsed = sectionSchemas[key].safeParse(value);
    if (parsed.success) merged[key] = parsed.data;
    else console.error(`[content] section "${key}" is invalid, using its default`, parsed.error.issues);
  }
  return merged as SiteContent;
}

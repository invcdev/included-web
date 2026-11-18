/**
 * Saving edited content. For the admin portal's server code only
 * (src/app/admin/actions.ts uses it).
 *
 * This is deliberately NOT a Server Action ("use server" would make it a public
 * endpoint). The admin's own action checks the signed-in user first, then calls
 * it and refreshes the page:
 *
 *   "use server";
 *   import { updateTag } from "next/cache";
 *   import { CONTENT_TAG } from "@/content";
 *   import { saveSectionContent } from "@/content/save";
 *
 *   export async function saveHero(value: unknown) {
 *     const admin = await requireAdmin();    // auth check
 *     const result = await saveSectionContent("hero", value, admin.email);
 *     if (result.ok) updateTag(CONTENT_TAG); // the editor sees the change at once
 *     return result;
 *   }
 *
 * An admin that runs as a separate app should save through its own code and
 * then call POST /api/revalidate (see src/app/api/revalidate/route.ts).
 */
import { sectionSchemas, type SectionKey } from "./schema";
import { getContentStore } from "./store";

export type SaveResult = { ok: true } | { ok: false; issues: { path: string; message: string }[] };

/** Validate one section against its schema and save it. Nothing is saved if it is invalid. */
export async function saveSectionContent(key: SectionKey, value: unknown, by?: string): Promise<SaveResult> {
  const parsed = sectionSchemas[key].safeParse(value);
  if (!parsed.success) {
    return {
      ok: false,
      issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    };
  }
  // The schema for `key` produced this value, so it has that section's type.
  await getContentStore().saveSection(key, parsed.data as never, by);
  return { ok: true };
}

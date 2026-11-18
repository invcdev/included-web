/**
 * Where edited content is stored.
 *
 * The page only calls `getContentStore().load()`; the admin also saves and
 * resets sections. With MONGODB_URI set, content lives in MongoDB (see
 * mongoStore.ts): one document per section in `site_content`, plus every
 * saved version in `site_content_history`. Without it, the "defaults" store
 * returns nothing and the page renders src/content/defaults.ts.
 *
 * Partial or invalid data is safe: each section is validated on its own and
 * falls back to its default (see getSiteContent).
 */
import { isDatabaseConfigured } from "@/lib/mongodb";
import { mongoStore } from "./mongoStore";
import type { SectionKey, SiteContent } from "./schema";

export type StoredContent = Partial<Record<SectionKey, unknown>>;

/** When each saved section was last changed, and by whom (admin email). */
export type SectionInfo = Partial<Record<SectionKey, { updatedAt: Date; updatedBy?: string }>>;

export interface ContentStore {
  /** Every saved section, or null when nothing has been saved yet. */
  load(): Promise<StoredContent | null>;
  /** Save one section (called by the admin after validation). */
  saveSection<K extends SectionKey>(key: K, value: SiteContent[K], by?: string): Promise<void>;
  /** Remove a saved section so the page uses its default again. */
  resetSection(key: SectionKey, by?: string): Promise<void>;
  /** Last-change details per saved section, for the admin dashboard. */
  info(): Promise<SectionInfo>;
}

/** Used until a database is connected: reads nothing, refuses writes. */
const defaultsStore: ContentStore = {
  async load() {
    return null;
  },
  async saveSection() {
    throw new Error("No content database is configured. Set MONGODB_URI.");
  },
  async resetSection() {
    throw new Error("No content database is configured. Set MONGODB_URI.");
  },
  async info() {
    return {};
  },
};

export function getContentStore(): ContentStore {
  return isDatabaseConfigured() ? mongoStore : defaultsStore;
}

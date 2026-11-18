/**
 * MongoDB content store.
 *
 *   site_content          { _id: "<section>", value, updatedAt, updatedBy }
 *   site_content_history  { section, value, savedAt, savedBy, action }
 *
 * Each section is its own document, so saving one never touches another.
 * History keeps every saved version (and resets), for audit and rollback.
 */
import { COLLECTIONS, getDb } from "@/lib/mongodb";
import type { SectionKey } from "./schema";
import type { ContentStore, SectionInfo, StoredContent } from "./store";

type ContentDoc = { _id: SectionKey; value: unknown; updatedAt: Date; updatedBy?: string };
type HistoryDoc = {
  section: SectionKey;
  value: unknown;
  savedAt: Date;
  savedBy?: string;
  action: "save" | "reset";
};

async function collections() {
  const db = await getDb();
  return {
    content: db.collection<ContentDoc>(COLLECTIONS.content),
    history: db.collection<HistoryDoc>(COLLECTIONS.contentHistory),
  };
}

export const mongoStore: ContentStore = {
  async load() {
    const { content } = await collections();
    const docs = await content.find({}, { projection: { value: 1 } }).toArray();
    if (docs.length === 0) return null;
    const out: StoredContent = {};
    for (const d of docs) out[d._id] = d.value;
    return out;
  },

  async saveSection(key, value, by) {
    const { content, history } = await collections();
    const now = new Date();
    await content.updateOne(
      { _id: key },
      { $set: { value, updatedAt: now, updatedBy: by } },
      { upsert: true },
    );
    await history.insertOne({ section: key, value, savedAt: now, savedBy: by, action: "save" });
  },

  async resetSection(key, by) {
    const { content, history } = await collections();
    await content.deleteOne({ _id: key });
    await history.insertOne({ section: key, value: null, savedAt: new Date(), savedBy: by, action: "reset" });
  },

  async info() {
    const { content } = await collections();
    const docs = await content.find({}, { projection: { updatedAt: 1, updatedBy: 1 } }).toArray();
    const out: SectionInfo = {};
    for (const d of docs) out[d._id] = { updatedAt: d.updatedAt, updatedBy: d.updatedBy };
    return out;
  },
};

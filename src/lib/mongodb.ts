/**
 * Shared MongoDB connection (server only).
 *
 * One client per server process, reused across requests and dev hot reloads.
 * Environment (see .env.example):
 *   MONGODB_URI  connection string, e.g. mongodb+srv://user:pass@cluster.mongodb.net
 *   MONGODB_DB   database name (defaults to the one in the URI, else "ascend")
 */
import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: Promise<MongoClient>;
  _mongoIndexes?: Promise<void>;
};

export const isDatabaseConfigured = () => Boolean(process.env.MONGODB_URI);

function client(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri, { appName: "ascend-site", serverSelectionTimeoutMS: 5000 })
      .connect()
      .catch((err) => {
        // Let the next call try again instead of caching the failure.
        globalForMongo._mongoClient = undefined;
        throw err;
      });
  }
  return globalForMongo._mongoClient;
}

/** Collection names, in one place. */
export const COLLECTIONS = {
  content: "site_content",
  contentHistory: "site_content_history",
  users: "admin_users",
  sessions: "admin_sessions",
  loginAttempts: "admin_login_attempts",
} as const;

async function ensureIndexes(db: Db) {
  await Promise.all([
    db.collection(COLLECTIONS.users).createIndex({ email: 1 }, { unique: true }),
    // Expired sessions and old login attempts are removed by MongoDB itself.
    db.collection(COLLECTIONS.sessions).createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    db.collection(COLLECTIONS.sessions).createIndex({ userId: 1 }),
    db.collection(COLLECTIONS.loginAttempts).createIndex({ at: 1 }, { expireAfterSeconds: 15 * 60 }),
    db.collection(COLLECTIONS.loginAttempts).createIndex({ email: 1, at: -1 }),
    db.collection(COLLECTIONS.contentHistory).createIndex({ section: 1, savedAt: -1 }),
  ]);
}

export async function getDb(): Promise<Db> {
  const c = await client();
  const db = c.db(process.env.MONGODB_DB || undefined);
  if (db.databaseName === "test" && !process.env.MONGODB_DB) {
    // No database in the URI and none configured: use a clear default name.
    return withIndexes(c.db("ascend"));
  }
  return withIndexes(db);
}

async function withIndexes(db: Db) {
  globalForMongo._mongoIndexes ??= ensureIndexes(db).catch((err) => {
    globalForMongo._mongoIndexes = undefined;
    throw err;
  });
  await globalForMongo._mongoIndexes;
  return db;
}

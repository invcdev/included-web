#!/usr/bin/env node
/**
 * Create an admin (or reset one's password) for /admin.
 *
 *   npm run admin:create -- someone@example.com [--name "Their Name"] [--reset]
 *
 * Reads MONGODB_URI (and MONGODB_DB) from the environment or .env.local.
 * Prints a generated password once; only its hash is stored. The admin can
 * change it under "Your account".
 *
 * The hash format must match src/lib/auth/password.ts.
 */
import { randomBytes, scrypt as scryptCb } from "node:crypto";
import { promisify } from "node:util";
import { MongoClient } from "mongodb";

const scrypt = promisify(scryptCb);
const N = 32768, R = 8, P = 1, KEYLEN = 64;

async function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = await scrypt(password.normalize("NFKC"), salt, KEYLEN, { N, r: R, p: P, maxmem: 128 * N * R * 2 });
  return ["scrypt", N, R, P, salt.toString("base64"), hash.toString("base64")].join("$");
}

const args = process.argv.slice(2);
const email = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--name")?.trim().toLowerCase();
const nameAt = args.indexOf("--name");
const name = nameAt >= 0 ? args[nameAt + 1] : undefined;
const reset = args.includes("--reset");

if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
  console.error('Usage: npm run admin:create -- someone@example.com [--name "Their Name"] [--reset]');
  process.exit(1);
}
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set (add it to .env.local).");
  process.exit(1);
}

const client = new MongoClient(uri);
try {
  await client.connect();
  let db = client.db(process.env.MONGODB_DB || undefined);
  if (db.databaseName === "test" && !process.env.MONGODB_DB) db = client.db("ascend");
  const users = db.collection("admin_users");
  await users.createIndex({ email: 1 }, { unique: true });

  const password = randomBytes(12).toString("base64url");
  const passwordHash = await hashPassword(password);
  const existing = await users.findOne({ email });

  if (existing && !reset) {
    console.error(`${email} is already an admin. Add --reset to give them a new password.`);
    process.exit(1);
  }
  if (existing) {
    await users.updateOne({ _id: existing._id }, { $set: { passwordHash } });
    await db.collection("admin_sessions").deleteMany({ userId: existing._id });
    console.log(`New password for ${email}:`);
  } else {
    await users.insertOne({ email, name, passwordHash, createdAt: new Date() });
    console.log(`Admin created: ${email}`);
    console.log("Password:");
  }
  console.log(`\n  ${password}\n`);
  console.log("Sign in at /admin/login and change it under “Your account”.");
} finally {
  await client.close();
}

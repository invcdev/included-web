/**
 * Admin sign-in: users and sessions in MongoDB (server only).
 *
 * - The cookie holds a random token; MongoDB holds only its SHA-256, so a
 *   leaked database can't be used to sign in. Sessions expire after 7 days
 *   (MongoDB deletes them via a TTL index) and end on sign-out.
 * - After 5 failed attempts for an email, sign-in is refused for 15 minutes.
 * - There is no public sign-up: the first admin is created with
 *   `npm run admin:create`, and admins add others in /admin/users.
 *
 * Every admin page and every admin Server Action calls requireAdmin().
 */
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ObjectId } from "mongodb";
import { COLLECTIONS, getDb, isDatabaseConfigured } from "@/lib/mongodb";
import { getDummyHash, verifyPassword } from "./password";

export const SESSION_COOKIE = "ascend_admin";
const SESSION_DAYS = 7;
const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export type AdminUserDoc = {
  _id: ObjectId;
  email: string;
  name?: string;
  passwordHash: string;
  createdAt: Date;
  lastLoginAt?: Date;
};
type SessionDoc = { _id: string; userId: ObjectId; createdAt: Date; expiresAt: Date };
type AttemptDoc = { email: string; at: Date };

/** What the admin UI gets to know about the signed-in user. */
export type Admin = { id: string; email: string; name?: string };

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
export const normaliseEmail = (email: string) => email.trim().toLowerCase();

async function db() {
  const d = await getDb();
  return {
    users: d.collection<AdminUserDoc>(COLLECTIONS.users),
    sessions: d.collection<SessionDoc>(COLLECTIONS.sessions),
    attempts: d.collection<AttemptDoc>(COLLECTIONS.loginAttempts),
  };
}

export type SignInResult = { ok: true } | { ok: false; error: string };

export async function signIn(emailInput: string, password: string): Promise<SignInResult> {
  if (!isDatabaseConfigured()) return { ok: false, error: "The database is not configured yet (MONGODB_URI)." };
  const email = normaliseEmail(emailInput);
  const { users, sessions, attempts } = await db();

  const since = new Date(Date.now() - LOCK_MINUTES * 60 * 1000);
  if ((await attempts.countDocuments({ email, at: { $gte: since } })) >= MAX_ATTEMPTS) {
    return { ok: false, error: `Too many attempts. Try again in ${LOCK_MINUTES} minutes.` };
  }

  const user = await users.findOne({ email });
  // Always run a hash comparison so a missing account takes as long as a wrong password.
  const valid = await verifyPassword(password, user?.passwordHash ?? (await getDummyHash()));
  if (!user || !valid) {
    await attempts.insertOne({ email, at: new Date() });
    return { ok: false, error: "That email and password don't match." };
  }

  await attempts.deleteMany({ email });
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await sessions.insertOne({ _id: hashToken(token), userId: user._id, createdAt: new Date(), expiresAt });
  await users.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
  return { ok: true };
}

export async function signOut() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token && isDatabaseConfigured()) {
    const { sessions } = await db();
    await sessions.deleteOne({ _id: hashToken(token) });
  }
  jar.delete(SESSION_COOKIE);
}

/** The signed-in admin, or null. */
export async function getCurrentAdmin(): Promise<Admin | null> {
  // Session checks compare against the current time, so they only run per request.
  await connection();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !isDatabaseConfigured()) return null;
  const { users, sessions } = await db();
  const session = await sessions.findOne({ _id: hashToken(token), expiresAt: { $gt: new Date() } });
  if (!session) return null;
  const user = await users.findOne({ _id: session.userId }, { projection: { passwordHash: 0 } });
  if (!user) return null;
  return { id: user._id.toHexString(), email: user.email, name: user.name };
}

/** The signed-in admin; anyone else is sent to the sign-in page. */
export async function requireAdmin(): Promise<Admin> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

/** End every session of a user (after a password change or removal). */
export async function endSessionsFor(userId: string, exceptCurrent = false) {
  const { sessions } = await db();
  const filter: Record<string, unknown> = { userId: new ObjectId(userId) };
  if (exceptCurrent) {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (token) filter._id = { $ne: hashToken(token) };
  }
  await sessions.deleteMany(filter);
}

export async function usersCollection() {
  return (await db()).users;
}

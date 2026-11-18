"use server";

/*
 * Admin Server Actions. Every action is a public endpoint, so each one checks
 * the signed-in admin itself (requireAdmin) and validates its own input.
 */
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { CONTENT_TAG, defaultContent, sectionSchemas, type SectionKey } from "@/content";
import { saveSectionContent, type SaveResult } from "@/content/save";
import { getContentStore } from "@/content/store";
import { isCloudinaryConfigured, signUpload } from "@/lib/cloudinary";
import { hashPassword, PASSWORD_MIN_LENGTH, verifyPassword } from "@/lib/auth/password";
import {
  endSessionsFor,
  normaliseEmail,
  requireAdmin,
  signIn,
  signOut,
  usersCollection,
} from "@/lib/auth/session";

export type FormState = { error?: string; message?: string; email?: string; name?: string } | undefined;

const sectionKey = z.enum(Object.keys(sectionSchemas) as [SectionKey, ...SectionKey[]]);

/* ---------- Signing in and out ---------- */

export async function loginAction(_prev: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  // React resets the form after the action; the email is sent back to refill it.
  if (!email || !password) return { error: "Enter your email and password.", email };
  const result = await signIn(email, password);
  if (!result.ok) return { error: result.error, email };
  redirect("/admin");
}

export async function logoutAction() {
  await signOut();
  redirect("/admin/login");
}

/* ---------- Content ---------- */

export async function saveSectionAction(key: string, value: unknown): Promise<SaveResult | { ok: false; error: string }> {
  const admin = await requireAdmin();
  const k = sectionKey.safeParse(key);
  if (!k.success) return { ok: false, error: "Unknown section." };
  try {
    const result = await saveSectionContent(k.data, value, admin.email);
    if (result.ok) updateTag(CONTENT_TAG);
    return result;
  } catch (err) {
    console.error("[admin] save failed", err);
    return { ok: false, error: "Could not save. Check the database connection and try again." };
  }
}

/** Remove the saved version so the site goes back to the default. Returns the default. */
export async function resetSectionAction(key: string) {
  const admin = await requireAdmin();
  const k = sectionKey.parse(key);
  await getContentStore().resetSection(k, admin.email);
  updateTag(CONTENT_TAG);
  return defaultContent[k];
}

/** Signature for one direct upload from the browser to Cloudinary. */
export async function getUploadSignature() {
  await requireAdmin();
  if (!isCloudinaryConfigured()) throw new Error("Cloudinary is not configured");
  return signUpload();
}

/* ---------- Admin users ---------- */

const newAdminSchema = z.object({
  email: z.email("Enter a valid email address."),
  name: z.string().trim().max(80).optional(),
  password: z.string().min(PASSWORD_MIN_LENGTH, `Passwords need at least ${PASSWORD_MIN_LENGTH} characters.`),
});

export async function createAdminAction(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const typed = { email: String(form.get("email") ?? "").trim(), name: String(form.get("name") ?? "") };
  const parsed = newAdminSchema.safeParse({
    email: typed.email,
    name: typed.name || undefined,
    password: String(form.get("password") ?? ""),
  });
  // Errors send the typed values back so the form can refill after React resets it.
  if (!parsed.success) return { error: parsed.error.issues[0].message, ...typed };
  const users = await usersCollection();
  const email = normaliseEmail(parsed.data.email);
  if (await users.findOne({ email })) return { error: "There is already an admin with that email.", ...typed };
  await users.insertOne({
    _id: new ObjectId(),
    email,
    name: parsed.data.name,
    passwordHash: await hashPassword(parsed.data.password),
    createdAt: new Date(),
  });
  return { message: `${email} can now sign in. Share the password with them securely.` };
}

export async function deleteAdminAction(form: FormData) {
  const admin = await requireAdmin();
  const id = String(form.get("id") ?? "");
  if (!ObjectId.isValid(id) || id === admin.id) return;
  const users = await usersCollection();
  await users.deleteOne({ _id: new ObjectId(id) });
  await endSessionsFor(id);
}

const passwordChangeSchema = z
  .object({
    current: z.string().min(1, "Enter your current password."),
    next: z.string().min(PASSWORD_MIN_LENGTH, `Passwords need at least ${PASSWORD_MIN_LENGTH} characters.`),
    confirm: z.string(),
  })
  .refine((v) => v.next === v.confirm, { message: "The new passwords don't match." });

export async function changePasswordAction(_prev: FormState, form: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const parsed = passwordChangeSchema.safeParse({
    current: String(form.get("current") ?? ""),
    next: String(form.get("next") ?? ""),
    confirm: String(form.get("confirm") ?? ""),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const users = await usersCollection();
  const user = await users.findOne({ _id: new ObjectId(admin.id) });
  if (!user || !(await verifyPassword(parsed.data.current, user.passwordHash))) {
    return { error: "Your current password isn't right." };
  }
  await users.updateOne({ _id: user._id }, { $set: { passwordHash: await hashPassword(parsed.data.next) } });
  await endSessionsFor(admin.id, true);
  return { message: "Password changed. Other devices have been signed out." };
}

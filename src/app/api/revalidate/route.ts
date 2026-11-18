import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/content";

/**
 * POST /api/revalidate
 * Refreshes the page content after it changes outside the app (database
 * webhook, script). Requires `Authorization: Bearer <REVALIDATE_SECRET>`.
 *
 * The admin portal itself should call `updateTag(CONTENT_TAG)` from its save
 * Server Action instead, so the editor sees the change immediately.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return Response.json({ error: "REVALIDATE_SECRET is not set" }, { status: 501 });
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }
  revalidateTag(CONTENT_TAG, "max");
  return Response.json({ revalidated: true });
}

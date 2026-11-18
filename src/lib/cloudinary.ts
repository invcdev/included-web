/**
 * Cloudinary helpers for page images.
 *
 * Images in the content are stored as their Cloudinary delivery URL plus the
 * `publicId` (see imageSchema). next/image serves them through the allowed
 * remote pattern in next.config.ts, so no extra loader is needed on the page.
 *
 * Environment (see .env.example):
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME  public, used to build URLs
 *   CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET  server only, for uploads
 *   CLOUDINARY_UPLOAD_FOLDER  optional, defaults to "ascend"
 */
import { createHash } from "node:crypto";
import type { ImageContent } from "@/content/schema";

export const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
export const uploadFolder = process.env.CLOUDINARY_UPLOAD_FOLDER ?? "ascend";

export const isCloudinaryConfigured = () =>
  Boolean(cloudName && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

/** Delivery URL for an uploaded asset, with automatic format and quality. */
export function cloudinaryUrl(publicId: string, transform = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${publicId}`;
}

/** Turn a Cloudinary upload response into the image shape the content uses. */
export function imageFromUpload(
  upload: { public_id: string; width: number; height: number; secure_url: string },
  alt: string,
): ImageContent {
  return { url: upload.secure_url, publicId: upload.public_id, width: upload.width, height: upload.height, alt };
}

/**
 * Signature for a direct browser-to-Cloudinary upload from the admin.
 * Server only. Call it from an authenticated admin route or Server Action;
 * never expose it to anonymous visitors.
 */
export function signUpload(params: Record<string, string | number> = {}) {
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!secret || !process.env.CLOUDINARY_API_KEY) throw new Error("Cloudinary is not configured");
  const toSign = { folder: uploadFolder, timestamp: Math.round(Date.now() / 1000), ...params };
  const payload = Object.keys(toSign)
    .sort()
    .map((k) => `${k}=${toSign[k as keyof typeof toSign]}`)
    .join("&");
  const signature = createHash("sha1").update(payload + secret).digest("hex");
  return { ...toSign, signature, apiKey: process.env.CLOUDINARY_API_KEY, cloudName };
}

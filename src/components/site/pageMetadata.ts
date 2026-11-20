import type { Metadata } from "next";
import type { PageMeta } from "@/content/pages/shared";

/** Metadata for a site page from its editable "Search & sharing" section. */
export function pageMetadata(meta: PageMeta, path: string): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: { title: meta.title, description: meta.description, url: path },
    twitter: { title: meta.title, description: meta.description },
  };
}

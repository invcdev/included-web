import type { Metadata } from "next";
import type { PageMeta } from "@/content/pages/shared";
import { siteConfig } from "@/config/site";

/**
 * Metadata for a site page from its editable "Search & sharing" section.
 * Open Graph and Twitter settings are repeated in full because a page's
 * settings replace the site's rather than adding to them: without this,
 * shared links lose the image and the site name.
 */
export function pageMetadata(meta: PageMeta, path: string): Metadata {
  const title = `${meta.title} | ${siteConfig.name}`;
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: "Ascend by Included VC" };
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title,
      description: meta.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@included_vc",
      title,
      description: meta.description,
      images: [image],
    },
  };
}

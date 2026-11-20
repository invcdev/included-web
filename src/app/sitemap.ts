import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { PAGES } from "@/content/pages";

/** Every public page (the list the admin also uses). The landing page and the two Ascend tracks rank highest. */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  const top = new Set(["/", "/ascend-africa", "/programme"]);

  return PAGES.flatMap((p) => (p.path ? [p.path] : [])).map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: currentDate,
    changeFrequency: top.has(path) ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1.0 : top.has(path) ? 0.9 : 0.7,
  }));
}

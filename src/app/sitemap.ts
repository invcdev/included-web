import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/fellowship", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/partners", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/fellows", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/insights", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/apply", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const currentDate = new Date().toISOString();

  return staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

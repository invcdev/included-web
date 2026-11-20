/**
 * schema.org data for search engines, built from the editable content.
 * See https://developers.google.com/search/docs/appearance/structured-data
 */
import { siteConfig } from "@/config/site";

/** Editable text without its formatting: **bold**, *light*, [link](url). */
export function plainText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\s*\n\s*/g, " ")
    .trim();
}

const organization = { "@type": "Organization", name: siteConfig.name, url: siteConfig.url };

/** The FAQ page's questions, so they can show as rich results. */
export function faqPageData(groups: { items: { q: string; a: string }[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) =>
      g.items.map((it) => ({
        "@type": "Question",
        name: plainText(it.q),
        acceptedAnswer: { "@type": "Answer", text: plainText(it.a) },
      })),
    ),
  };
}

/** A programme (Ascend, Ascend Africa) as a course offered online by Included VC. */
export function courseData({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description: plainText(description),
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    provider: organization,
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      // Fourteen weekly live sessions of two and a half hours.
      courseSchedule: { "@type": "Schedule", repeatFrequency: "P1W", repeatCount: 14, duration: "PT2H30M" },
    },
  };
}

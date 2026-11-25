/**
 * The site's pages and the content sections that belong to each.
 *
 * The landing page's sections are described in ../schema.ts. Every other page
 * has a module here exporting its schemas (one per section), the default
 * content and the section list the admin shows. They are merged into the one
 * site content object, so saving, caching and the admin work the same for all.
 */
import { sharedDefaults, sharedSchemas, sharedSections } from "./shared";
import { investorDefaults, investorSchemas, investorSections } from "./investor";
import { faqPageDefaults, faqPageSchemas, faqPageSections } from "./faq";
import { instructorsDefaults, instructorsSchemas, instructorsSections } from "./instructors";
import { partnersDefaults, partnersSchemas, partnersSections } from "./partners";
import { programmeDefaults, programmeSchemas, programmeSections } from "./programme";
import { aboutDefaults, aboutSchemas, aboutSections } from "./about";
import { alumniDefaults, alumniSchemas, alumniSections } from "./alumni";
import { resourcesDefaults, resourcesSchemas, resourcesSections } from "./resources";
import { saveTheDateDefaults, saveTheDateSchemas, saveTheDateSections } from "./saveTheDate";

export const PAGES = [
  { slug: "home", label: "Ascend", path: "/" },
  { slug: "ascend-africa", label: "Ascend Africa", path: "/ascend-africa" },
  { slug: "programme", label: "The programme", path: "/programme" },
  { slug: "investor", label: "Investor Fellowship", path: "/investor" },
  { slug: "about", label: "About", path: "/about" },
  { slug: "alumni", label: "Alumni & Community", path: "/alumni" },
  { slug: "instructors", label: "Instructors & Mentors", path: "/instructors" },
  { slug: "resources", label: "Resources", path: "/resources" },
  { slug: "faq", label: "FAQs", path: "/faq" },
  { slug: "partners", label: "Partners", path: "/partners" },
  { slug: "save-the-date", label: "Save the date", path: "/save-the-date" },
  { slug: "shared", label: "On every page", path: null },
] as const;

export type PageSlug = (typeof PAGES)[number]["slug"];

export const pageSchemas = {
  ...sharedSchemas,
  ...investorSchemas,
  ...faqPageSchemas,
  ...instructorsSchemas,
  ...partnersSchemas,
  ...programmeSchemas,
  ...aboutSchemas,
  ...alumniSchemas,
  ...resourcesSchemas,
  ...saveTheDateSchemas,
};

export const pageDefaults = {
  ...sharedDefaults,
  ...investorDefaults,
  ...faqPageDefaults,
  ...instructorsDefaults,
  ...partnersDefaults,
  ...programmeDefaults,
  ...aboutDefaults,
  ...alumniDefaults,
  ...resourcesDefaults,
  ...saveTheDateDefaults,
};

type Entry = { key: keyof typeof pageSchemas; label: string; description: string };
const on = (page: PageSlug, list: readonly Entry[]) => list.map((s) => ({ ...s, page }));

export const pageSections = [
  ...on("programme", programmeSections),
  ...on("investor", investorSections), ...on("faq", faqPageSections), ...on("about", aboutSections),
  ...on("alumni", alumniSections),
  ...on("instructors", instructorsSections),
  ...on("resources", resourcesSections), ...on("partners", partnersSections),
  ...on("save-the-date", saveTheDateSections), ...on("shared", sharedSections)];

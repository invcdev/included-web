/**
 * Content shared by the site pages (everything except the landing page):
 * the closing "Ready to ascend?" band and the "Applications open" pop-up.
 */
import { z } from "zod";
import { linkSchema } from "../blocks";

export const APPLY_URL = "https://form.typeform.com/to/bALnGEQ7?typeform-source=included.vc";

/** Title and description for search results and link previews, per page. */
export const pageMetaSchema = z.object({
  title: z.string().describe("Shown in the browser tab and search results, followed by “| Included VC”."),
  description: z.string(),
});
export type PageMeta = z.infer<typeof pageMetaSchema>;

const popupVariant = z.object({
  tag: z.string(),
  title: z.string(),
  body: z.string(),
  cta: linkSchema,
  skip: z.string(),
  note: z.string(),
});

export const sharedSchemas = {
  siteClosing: z.object({
    small: z.string(),
    heading: z.string(),
    sub: z.string(),
    date: z.string(),
    cta: linkSchema,
  }),
  sitePopup: z.object({
    enabled: z.boolean(),
    delaySeconds: z.number().min(0).describe("Opens after this many seconds, or once the visitor has scrolled the share below, whichever comes first."),
    scrollPercent: z.number().min(0).max(100),
    hideForDays: z.number().min(0).describe("After it has been shown, it stays hidden for this many days."),
    variants: z
      .array(popupVariant)
      .min(1)
      .describe("Each visitor sees one of these at random."),
  }),
};

export const sharedDefaults: { [K in keyof typeof sharedSchemas]: z.infer<(typeof sharedSchemas)[K]> } = {
  siteClosing: {
    small: "Ascend by Included VC",
    heading: "Ready to ascend?",
    sub: "Join a fourteen-week programme taught by instructors with credible investing careers in venture capital.",
    date: "Programme starts 5 January 2027. Applications close 4 January 2027.",
    cta: { label: "Apply now", href: APPLY_URL },
  },
  sitePopup: {
    enabled: true,
    delaySeconds: 6,
    scrollPercent: 40,
    hideForDays: 7,
    variants: [
      {
        tag: "Applications open",
        title: "Ready to scale your career?",
        body: "Join Included VC Ascend: a fourteen-week live investment education for people building and leading Africa's investment industry. Applications are open and registering takes one minute.",
        cta: { label: "Register your interest", href: APPLY_URL },
        skip: "Maybe later",
        note: "Fourteen Tuesdays. Entirely online. No finance background needed.",
      },
      {
        tag: "Applications open",
        title: "Your seat at the table is waiting.",
        body: "Included VC Ascend applications are open. It takes only one minute.",
        cta: { label: "Register your interest", href: APPLY_URL },
        skip: "Maybe later",
        note: "Fourteen weeks of investment education for those who will build and lead Africa's investment industry.",
      },
    ],
  },
};

export const sharedSections = [
  { key: "siteClosing", page: "shared", label: "Closing band", description: "The “Ready to ascend?” band at the end of every page except the landing page." },
  { key: "sitePopup", page: "shared", label: "Applications pop-up", description: "The pop-up on the site pages: wording, timing, and whether it shows at all." },
] as const;

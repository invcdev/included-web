/** Save the date (/save-the-date): where every "Take your seat" button leads until enrolment opens. */
import { z } from "zod";
import { pageMetaSchema } from "./shared";

export const saveTheDateSchemas = {
  saveTheDateMeta: pageMetaSchema,
  saveTheDate: z.object({
    brand: z.string().describe("The small name above the card."),
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    whereLabel: z.string().describe("What the page shows under “Where”, e.g. Online."),
    ask: z.string().describe("The line above the calendar buttons."),
    note: z.string().describe("The small print under the buttons."),
    footer: z.string(),
    event: z
      .object({
        title: z.string().describe("The name of the event in people’s calendars."),
        date: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the form 2026-12-01")
          .describe("YYYY-MM-DD. The page shows the weekday and date from this."),
        time: z
          .string()
          .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use the 24-hour form 12:00")
          .describe("Start time in UK time (24-hour, e.g. 12:00). GMT or BST is worked out for you."),
        durationMinutes: z.number().int().min(5).max(24 * 60),
        location: z.string().describe("The location saved in the calendar event, usually a link."),
        details: z.string().describe("The description saved in the calendar event."),
        url: z.string(),
      })
      .describe("The calendar event the four buttons add."),
  }),
};

type Content = { [K in keyof typeof saveTheDateSchemas]: z.infer<(typeof saveTheDateSchemas)[K]> };

export const saveTheDateDefaults: Content = {
  saveTheDateMeta: {
    title: "Save the date",
    description: "Enrolment for Ascend by Included VC opens soon. Add the date to your calendar.",
  },
  saveTheDate: {
    brand: "Included VC",
    eyebrow: "Save the date",
    heading: "Ascend enrolment opens",
    lede: "Fourteen weeks of everything we have learned in seven years. Put the date in your calendar now and we will meet you there.",
    whereLabel: "Online",
    ask: "Add it to your calendar",
    note: "Apple and desktop Outlook download a small .ics file. Open it and your calendar does the rest.",
    footer: "Included VC · included.vc",
    event: {
      title: "Ascend by Included VC — enrolment opens",
      date: "2026-12-01",
      time: "12:00",
      durationMinutes: 30,
      location: "https://included.vc",
      details:
        "Enrolment opens for Ascend by Included VC. Fourteen weeks, live every Tuesday, January to April. Full details at https://included.vc",
      url: "https://included.vc",
    },
  },
};

export const saveTheDateSections = [
  { key: "saveTheDateMeta", label: "Search & sharing", description: "Page title and description." },
  { key: "saveTheDate", label: "Save the date", description: "The wording, and the date and time of the calendar event." },
] as const;

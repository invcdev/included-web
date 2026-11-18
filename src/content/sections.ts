/** The editable sections, in page order, with the names the admin shows. */
import type { SectionKey } from "./schema";

export const SECTIONS: { key: SectionKey; label: string; description: string }[] = [
  { key: "header", label: "Header", description: "Logo, menu links and the header button." },
  { key: "hero", label: "Hero", description: "Headline, intro, the programme at a glance and the stats." },
  { key: "press", label: "As featured in", description: "Press logos (grey, and colour on hover)." },
  { key: "network", label: "The network", description: "Partner globe: heading, groups and partner logos." },
  { key: "founderLetter", label: "Founder letter", description: "Photo, quote and buttons." },
  { key: "introducing", label: "Introducing Ascend", description: "Logo, stats, illustration and tracks." },
  { key: "seatCtas", label: "“Take your seat” bands", description: "The four testimonial + button bands down the page." },
  { key: "climb", label: "The climb", description: "The five stages." },
  { key: "curriculum", label: "Curriculum", description: "Blocks, the 14 weeks and what each covers, Ascend Africa." },
  { key: "outcomes", label: "What you leave with", description: "Four outcome cards and a testimonial." },
  { key: "month", label: "A month in Ascend", description: "The four example weeks and the time stats." },
  { key: "tuesdays", label: "Your Tuesdays", description: "Wording of the local-time panel." },
  { key: "faculty", label: "Faculty", description: "Faculty names, roles and photos." },
  { key: "everyoneIncluded", label: "Everyone is included", description: "The jigsaw pieces and quote." },
  { key: "audience", label: "Who it is for", description: "The four audience cards and their tags." },
  { key: "stories", label: "In their own words", description: "Six stories and the Fellowship stats." },
  { key: "alumni", label: "Where alumni work", description: "Alumni globe: firms and their logos." },
  { key: "countries", label: "Countries", description: "Flag sphere: heading, caption and flags." },
  { key: "deal", label: "The deal", description: "The three things we ask of you." },
  { key: "ticket", label: "What you get", description: "The ticket, price, tracks and features." },
  { key: "promise", label: "Our promise", description: "What we promise and what we can’t." },
  { key: "employers", label: "Employers", description: "Employer-pays card and button." },
  { key: "values", label: "Our values", description: "The four values and links." },
  { key: "join", label: "How to join", description: "Steps, payment methods and office hours." },
  { key: "tldr", label: "TLDR", description: "The constellation of key facts." },
  { key: "faq", label: "FAQs", description: "Question groups and answers." },
  { key: "finalCta", label: "Final call to action", description: "The closing band." },
  { key: "footer", label: "Footer", description: "Footer logo, link columns and legal links." },
  { key: "meta", label: "Search & sharing", description: "Page title, description and social share image." },
];

export const sectionLabel = (key: SectionKey) => SECTIONS.find((s) => s.key === key)?.label ?? key;

/** The editable sections, page by page in page order, with the names the admin shows. */
import type { SectionKey } from "./schema";
import { pageSections, type PageSlug } from "./pages";

const HOME: { key: SectionKey; label: string; description: string }[] = [
  { key: "header", label: "Header", description: "Logo, menu links and the header button." },
  { key: "openDoor", label: "Opening", description: "The full-screen door at the top of the page: the headlines it rotates through and the buttons." },
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
  { key: "faculty", label: "Faculty", description: "Names, roles, photos and fields. Also the people on the Instructors & Mentors page. The landing page lists the Ascend Africa faculty after these." },
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

/** Ascend Africa: only the sections whose wording differs; the rest are shared with the landing page. */
const AFRICA: { key: SectionKey; label: string; description: string }[] = [
  { key: "africaMeta", label: "Search & sharing", description: "Page title and description." },
  { key: "africaOpenDoor", label: "Opening", description: "The full-screen door at the top of the page, in green: the headlines it rotates through and the buttons." },
  { key: "africaHero", label: "Hero", description: "Headline, intro, the programme at a glance and the stats." },
  { key: "africaNetwork", label: "The network", description: "Heading and intro of the partner globe (the logos are shared with Ascend)." },
  { key: "africaIntroducing", label: "Introducing Ascend Africa", description: "Intro paragraph, stats and tracks." },
  { key: "africaClimb", label: "The climb", description: "The five stages." },
  { key: "africaCurriculum", label: "Curriculum", description: "The 14 weeks and the Africa sessions box." },
  { key: "africaMonth", label: "A month in Ascend", description: "The four example weeks (in GMT)." },
  { key: "africaTuesdays", label: "Your Tuesdays", description: "Wording of the local-time panel. The ten cities are African cities." },
  { key: "africaSessions", label: "Six Thursday sessions", description: "The Africa-only sessions." },
  { key: "africaFaculty", label: "Faculty", description: "The Africa faculty. They also appear on the Ascend landing page, after the global faculty." },
  { key: "africaBuilt", label: "Why this track exists", description: "The four reasons." },
  { key: "africaCountries", label: "Countries", description: "The 54 flags of the flag sphere." },
  { key: "africaTicket", label: "What you get", description: "The ticket, opened on the Africa track." },
  { key: "africaJoin", label: "How to join", description: "Steps and the final panel." },
  { key: "africaFinalCta", label: "Final call to action", description: "The closing band." },
];

export const SECTIONS: { key: SectionKey; label: string; description: string; page: PageSlug }[] = [
  // The header and footer appear on every page.
  ...HOME.map((s) => ({ ...s, page: s.key === "header" || s.key === "footer" ? ("shared" as const) : ("home" as const) })),
  ...AFRICA.map((s) => ({ ...s, page: "ascend-africa" as const })),
  ...pageSections,
];

export const sectionLabel = (key: SectionKey) => SECTIONS.find((s) => s.key === key)?.label ?? key;

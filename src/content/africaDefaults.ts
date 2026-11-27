/**
 * Default content of the Ascend Africa page (/ascend-africa), built from the
 * landing page's defaults: the same sections, with the Africa wording (from
 * the Ascend Africa design) where it differs.
 */
import type { SiteContent } from "./schema";
import { img } from "./pages/img";
import africaFlags from "./pages/africaFlags.json";

type Home = Omit<SiteContent, `africa${string}`>;
type Africa = Pick<SiteContent, Extract<keyof SiteContent, `africa${string}`>>;

/** Sessions are at 16:00 GMT on the Africa page ("UK time" on the landing page). */
function gmt<T>(v: T): T {
  return JSON.parse(JSON.stringify(v).replaceAll("UK time", "GMT"));
}

const AFRICA_FACULTY: [string, string][] = [
  ["Juliet Munro", "Director, Early-Stage Finance · FSD Africa"],
  ["Adesuwa Okunbo Rhodes", "Founder & Managing Partner · Aruwa"],
  ["Rosanne Whalley", "CEO · AHL Ventures"],
  ["Janade Plessis", "Managing Partner · Launch Africa Ventures"],
  ["Mike Mompi", "Managing Partner · Enza Capital"],
  ["Surayyah Ahmad", "Founding Partner · Sabou Capital"],
  ["Emmanuel Adegboye", "Head of Madica · Madica"],
  ["Zachariah George", "Managing Partner · Launch Africa Ventures"],
  ["Sherif Nessim", "Founder & Managing Director · Jedar Capital"],
  ["Tramayne Monaghan", "Chief Ventures Officer · NEXT176"],
  ["Nonnie Burbidge", "Principal · Enza Capital"],
  ["Kuria Wanjau", "Manager, Communities and States · FSD Africa"],
];

export function africaDefaults(home: Home): Africa {
  return {
    africaMeta: {
      title: "Ascend Africa",
      description:
        "Fourteen Tuesdays inside venture capital, built for Africa: live investment education with six extra Thursday sessions on African markets.",
    },
    africaOpenDoor: {
      ...home.openDoor,
      brand: "ASCEND AFRICA",
      eyebrow: "Ascend Africa: the Global Investment Academy by Included VC",
      messages: [
        {
          heading: "The door to venture capital in Africa is **open.**",
          lede: "Learn how deals get backed across the continent, in fourteen live weeks with the investors doing it. Join from anywhere.",
        },
        {
          heading: "Learn how venture capital **really works.**",
          lede: "Fourteen live Tuesdays with practising investors, plus six Thursday sessions on African investment markets.",
        },
        {
          heading: "One live room, joined from across **Africa.**",
          lede: "Taught by people who invest for a living across Africa, and funded by our partners.",
        },
        {
          heading: "Learn how African startups get **backed.**",
          lede: "How a fund works, how a deal gets done and how a committee decides, worked through on African deals.",
        },
      ],
    },
    africaHero: {
      ...home.hero,
      eyebrow: "Ascend Africa: the Global Investment Academy by Included VC",
      heading: "Fourteen Tuesdays inside venture capital, built for Africa.",
      lede: "Taught live by people who invest for a living across the continent, and funded by our partners. You learn how a deal gets done, then you do it yourself. The Africa track adds six Thursday sessions on African investment markets, with the funds shaping them.",
      glance: gmt(home.hero.glance).flatMap((g) =>
        g.label === "Live"
          ? [g, { label: "Plus", value: "6 Thursdays on African markets" }]
          : g.label === "Tracks"
            ? [{ label: "Track", value: "Africa" }]
            : [g],
      ),
      stats: home.hero.stats.map((s, i) => (i === 1 ? { value: "17", label: "African funds and institutions behind this track" } : s)),
    },
    africaNetwork: {
      ...home.network,
      heading: "The continent's investors are paying for you to learn how it works.",
      body: "Ascend Africa’s teaching, faculty and platform are funded by African funds, development partners and institutions, alongside the global funds behind Included VC. They have backed this work on the continent since the first African cohort.",
    },
    africaIntroducing: {
      ...home.introducing,
      // Green versions of the Ascend logo and illustration (the page is green, see the page's theme).
      logo: { ...home.introducing.logo, ...img("/site/africa/ascend-logo-green.png", home.introducing.logo.alt) },
      illustration: {
        ...home.introducing.illustration,
        ...img("/site/africa/ascend-illustration-green.jpg", home.introducing.illustration.alt),
      },
      body: "Ascend by Included VC is our live investment education programme and one of the ways into the Included VC universe. Included VC has launched on the continent, and Ascend Africa grows and scales the careers of people building and leading the investment industry in Africa, alongside the funds already shaping African capital. Our aim is career development for everyone who joins. Across fourteen weeks you learn how the investment industry in Africa works from investors doing the job now, and you leave able to read a deal, write a memo and hold your own in the rooms where capital gets allocated.",
      stats: gmt(home.introducing.stats).map((s) =>
        s.title === "tracks"
          ? { value: "6", title: "Africa sessions", text: "Thursdays, on African investment markets" }
          : s.title === "cohort"
            ? { ...s, text: "The whole programme in the room on Tuesdays, the continent on Thursdays" }
            : s,
      ),
    },
    africaClimb: {
      ...home.climb,
      body: "Five stages of investment judgement, taught against African deals and African markets. Many people start at the second. Ascend is built to get you to the fourth. The fifth takes a career.",
    },
    africaCurriculum: {
      ...home.curriculum,
      africa: {
        title: "Six Thursday sessions, on top of the fourteen",
        text: "African fund structures and who funds them, sourcing on the continent, diligence where data is thin, valuation and deal terms in African rounds, exits and secondaries, and building an investing career across African markets. Taught by fund managers, angels, DFIs and operators working on the continent.",
        cta: { label: "See the fourteen weeks", href: "#curriculum" },
      },
    },
    africaMonth: gmt(home.month),
    africaTuesdays: {
      ...gmt(home.tuesdays),
      lede: "Sessions run at 16:00 GMT, which lands inside the working evening almost everywhere on the continent. This is your slot for fourteen Tuesdays.",
      note: "Sessions are always at 16:00 GMT. The times here are for the first session, Tuesday 5 January. The clock the sessions are set by moves to summer time in late March, so your local time shifts by an hour for the last few Tuesdays.",
    },
    africaSessions: {
      kicker: { step: "Africa track", label: "Six more Thursdays" },
      eyebrow: "On top of the fourteen",
      heading: "Six Thursday sessions, on African markets.",
      body: "Taught by fund managers, angels, development finance institutions and operators working across the continent. Ninety minutes each, live, on six of the fourteen weeks.",
      sessions: [
        {
          title: "African fund structures",
          details: "Who funds venture on the continent, how DFIs and family offices behave, and what that means for the terms you will see.",
        },
        {
          title: "Sourcing on the continent",
          details: "Where deal flow actually comes from across African markets, and how to build a pipeline from where you sit.",
        },
        { title: "Diligence where data is thin", details: "Reference calls, market sizing and judgement when the public numbers do not exist." },
        { title: "Valuation and African deal terms", details: "How rounds get priced here, what is standard, what is not, and what to push back on." },
        { title: "Exits and secondaries in Africa", details: "What realistic returns look like on the continent, and the routes that are opening." },
        { title: "Building an investing career in Africa", details: "The funds hiring, what they look for, and how the people in this room moved." },
      ],
    },
    africaFaculty: {
      ...home.faculty,
      kicker: { step: "", label: "" },
      heading: "Taught by the people investing across Africa.",
      people: AFRICA_FACULTY.map(([name, role], i) => ({ name, role, photo: img(`/site/p${i % 8}.jpg`) })),
    },
    africaBuilt: {
      eyebrow: "Why this track exists",
      heading: "Built for the market you are investing in.",
      body: "Ascend teaches how venture works anywhere. The Africa track teaches how it works here.",
      cards: [
        {
          title: "Taught against African deals",
          text: "The worked examples are companies on this continent, priced in these markets, with the cap tables and terms that actually appear in African rounds.",
        },
        {
          title: "The funds doing the hiring",
          text: "Your instructors run the funds investing across Africa. The people teaching you are the people whose teams you want to join.",
        },
        {
          title: "A cohort that stays in touch",
          text: "Fellows from earlier cohorts co-invest together and pass deals to each other. You finish with peers on your side of the map.",
        },
        {
          title: "Founders the industry misses",
          text: "Included VC exists to change who gets to invest. On this continent that also changes which founders get seen, and who writes them a cheque.",
        },
      ],
    },
    africaCountries: {
      ...home.countries,
      eyebrow: "Applications from across the continent",
      body: "Fifty-four countries, and the diaspora. Wherever on the continent you are working from, you belong in this room.",
      caption: "54 countries, and the diaspora",
      flags: africaFlags.map((f) => ({ slug: f.slug, name: f.name, logo: img(`/site/flags/${f.slug}.png`, f.name) })),
    },
    africaTicket: {
      ...gmt(home.ticket),
      details: gmt(home.ticket.details).map((d) => (d.label === "Sessions" ? { ...d, value: "14 live, plus 6" } : d)),
      tracks: [
        { name: "Ascend", ticketLabel: "Global track" },
        { name: "Ascend Africa", ticketLabel: "Africa track" },
      ],
    },
    africaJoin: {
      ...gmt(home.join),
      steps: home.join.steps.map((s, i) =>
        i === 0
          ? {
              ...s,
              text: "Why you want to join, what you want to be able to do by week fourteen, and where on the continent you are working from. It isn’t a test, and nobody is screened out.",
            }
          : s,
      ) as Home["join"]["steps"],
    },
    africaFinalCta: gmt(home.finalCta),
  };
}

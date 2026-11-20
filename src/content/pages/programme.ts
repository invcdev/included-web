/** Programme page (/programme): Ascend Global, the curriculum and the wider family of programmes. */
import { z } from "zod";
import { imageSchema, linkSchema } from "../blocks";
import { img } from "./img";
import { CLASSIC_LABELS, orbSchema, partnerLogos } from "./parts";
import { pageMetaSchema } from "./shared";

const fixed = <T extends z.ZodType>(item: T, n: number) => z.array(item).length(n);

const stepsSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  lede: z.string(),
  barTitle: z.string(),
  steps: z
    .array(
      z.object({
        name: z.string(),
        role: z.string().optional(),
        lead: z.string(),
        sub: z.string(),
        items: z.array(z.string()),
        image: imageSchema,
      }),
    )
    .min(1)
    .describe("Each step is one card; the card changes as the visitor scrolls or uses the arrows."),
});

/** The four kinds of session in "A month", which set their colour. */
const pillKind = z.enum(["m", "t", "a", "o"]).describe("m = Tuesday masterclass, a = Africa masterclass, t = task, o = optional");

export const programmeSchemas = {
  programmeMeta: pageMetaSchema,
  programmeHead: z.object({ crumbs: z.string(), eyebrow: z.string(), heading: z.string(), lede: z.string() }),
  programmeWhat: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    paragraphs: z.array(z.string()),
    image: imageSchema,
  }),
  programmeCards: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    programmes: z
      .array(
        z.object({
          name: z.string(),
          status: z.string().describe("“Open” shows a green badge; “Concluded” greys the card out."),
          tracks: z
            .array(
              z.object({
                label: z.string().describe("Tab name when there is more than one track."),
                description: z.string(),
                rows: z.array(z.object({ label: z.string(), value: z.string() })),
                image: imageSchema,
                link: linkSchema,
              }),
            )
            .min(1),
        }),
      )
      .min(1),
  }),
  programmeOrb: orbSchema,
  programmeStructure: stepsSchema,
  programmeGain: stepsSchema,
  programmeWho: stepsSchema,
  programmeTldr: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    stars: fixed(z.object({ label: z.string(), title: z.string(), body: z.string() }), 8).describe(
      "The eight stars of the unicorn, in order. The label is the word next to the star.",
    ),
  }),
  programmeRoadmap: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    modules: fixed(z.object({ title: z.string(), text: z.string() }), 12).describe("Twelve stops along the road, with fixed icons."),
    finish: z.string(),
  }),
  programmeCurriculum: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    hint: z.string(),
    weeks: fixed(z.object({ title: z.string(), text: z.string() }), 14),
    africa: z.object({ title: z.string(), text: z.string(), cta: linkSchema }),
    leaveTitle: z.string(),
    leave: fixed(z.object({ title: z.string(), text: z.string() }), 4),
  }),
  programmeMonth: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    weeks: z.array(
      z.object({
        number: z.string(),
        label: z.string(),
        pills: z.array(z.object({ kind: pillKind, day: z.string(), title: z.string(), note: z.string() })),
      }),
    ),
    key: z.array(z.object({ kind: pillKind, label: z.string() })),
    hours: z.array(z.object({ value: z.string(), label: z.string() })),
    note: z.string(),
  }),
  programmeLaws: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    laws: z.array(z.object({ title: z.string(), text: z.string() })),
  }),
  programmeFaq: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    items: z.array(z.object({ q: z.string(), a: z.string().describe("Separate paragraphs with a blank line. Lines starting with “- ” become a list.") })),
    cta: linkSchema,
  }),
};

type Content = { [K in keyof typeof programmeSchemas]: z.infer<(typeof programmeSchemas)[K]> };

export const programmeDefaults: Content = {
  programmeMeta: {
    title: "The programme",
    description: "Ascend Global: fourteen live weeks of investment education, taught by working investors. The structure, the curriculum and what you leave with.",
  },
  programmeHead: {
    crumbs: "[Universe](/) / Programme",
    eyebrow: "Included VC Ascend Global",
    heading: "Fourteen live weeks. *A launchpad into VC.*",
    lede: "The original Included VC Fellowship. Real training, real dealflow, and mentorship from the best investors in the world. Open to exceptional applicants everywhere.",
  },
  programmeWhat: {
    eyebrow: "The Fellowship",
    heading: "What is the Included VC *Fellowship?*",
    paragraphs: [
      "A **fourteen-week** live investment education programme, taught by working investors.",
      "We find **the best talent** across the globe and help them break into venture capital.",
      "Aspiring venture capitalists from diverse, overlooked communities gain exclusive access, education and mentorship from the **best VCs across the globe.** Trust us, you can't find these learnings anywhere else.",
      "We're on a mission to radically diversify the venture capital ecosystem and make sure VC is **representative of society** in all its forms.",
      "We believe **varying thought, opinion and background is the foundation of a strong society.** Through the Fellowship, our goal is to grow the number of under-represented communities in VC and create effective **multi-generational change.**"
    ],
    image: img("/site/p3.jpg"),
  },
  programmeCards: {
    eyebrow: "Our programmes",
    heading: "Every Fellowship, *one family.*",
    lede: "Ascend runs on two tracks, Global and Africa. The Investor Fellowship sits above both. Earlier initiatives are kept here for the record and marked as concluded.",
    programmes: [
      {
        name: "Included VC Ascend",
        status: "Open",
        tracks: [
          {
            label: "Track: Global",
            description: "The original Fellowship, now in its seventh year. Fourteen weeks, partner funded, forty-plus nationalities in every cohort.",
            rows: [{"label": "Format", "value": "Part-time, virtual, with optional Summits"}, {"label": "Who", "value": "Aspiring investors from overlooked backgrounds, anywhere"}, {"label": "After", "value": "Almost 85% of alumni now in the investment industry"}],
            image: img("/site/tile-global.jpg"),
            link: { label: "Explore Ascend Global", href: "/programme" },
          }, {
            label: "Track: Africa",
            description: "Fourteen weeks of investment education built for Africans, with the funds already shaping African capital. Included VC has launched on the continent.",
            rows: [{"label": "Format", "value": "Fourteen weeks, live and online"}, {"label": "Who", "value": "Ambitious Africans on the continent or in the diaspora"}, {"label": "After", "value": "A pan-African cohort and continental network"}],
            image: img("/site/tile-africa.jpg"),
            link: { label: "Explore Ascend Africa", href: "/ascend-africa" },
          }
        ],
      },
      {
        name: "Included VC Investor Fellowship",
        status: "Partner nominated",
        tracks: [
          {
            label: "",
            description: "The family's deeper tier. A private, partner-nominated Fellowship for experienced professionals already investing across Africa.",
            rows: [{"label": "Format", "value": "Closed-door sessions with the funds shaping the market"}, {"label": "Who", "value": "Experienced investment professionals, nominated by a partner"}, {"label": "After", "value": "A seat where African venture gets decided"}],
            image: img("/site/tile-investor.jpg"),
            link: { label: "Explore the Investor Fellowship", href: "/investor" },
          }
        ],
      },
      {
        name: "RISE InVC",
        status: "Concluded",
        tracks: [
          {
            label: "",
            description: "The first-ever global gathering to celebrate Black venture capitalists. Three days of talks and panels on careers in VC, emerging managers and venture from the founder's side, with attendees from South Africa to Singapore.",
            rows: [{"label": "Format", "value": "Three-day global summit, January 2023"}, {"label": "Who", "value": "Black VCs, emerging managers and allies"}, {"label": "Status", "value": "Concluded"}],
            image: img("/site/city-london.jpg"),
            link: { label: "Read the recap", href: "#" },
          }
        ],
      },
      {
        name: "Past programme (placeholder)",
        status: "Concluded",
        tracks: [
          {
            label: "",
            description: "Placeholder for an earlier Included VC initiative. Send me the name, year and a line on who it served and I will replace this card.",
            rows: [{"label": "Format", "value": "To be confirmed"}, {"label": "Who", "value": "To be confirmed"}, {"label": "Status", "value": "Concluded"}],
            image: img("/site/city-doha.jpg"),
            link: { label: "Learn more", href: "#" },
          }
        ],
      },
    ],
  },
  programmeOrb: {
    eyebrow: "The network",
    heading: "Included VC Global *Venture Partners.*",
    ...CLASSIC_LABELS,
    logos: partnerLogos(),
  },
  programmeStructure: {
    eyebrow: "How it works",
    heading: "The programme *structure.*",
    lede: "Masterclasses and workshops run one to two evenings a week, 17:00 to 20:00 UK time. The rest is applied work with your cohort and your mentor. Four parts, fourteen weeks.",
    barTitle: "Programme structure",
    steps: [
      { name: "Learning", lead: "Masterclasses with investors from some of the best funds globally, plus the foundations of how venture works.", sub: "Perfect if you need to", items: ["Understand sourcing, diligence, valuation and term sheets", "Build portfolio construction from first principles", "Learn working knowledge, not theory"], image: img("/site/p0.jpg") },
      { name: "Real world simulations", lead: "Investment committee simulations where you make real calls on real deals and defend them. You finish with work you made, not work you watched.", sub: "Perfect if you need to", items: ["Argue a deal in front of practising investors", "Take the vote and live with the call", "Leave with a defended track record"], image: img("/site/p4.jpg") },
      { name: "Guidance", lead: "A mentor working in the industry, office hours with practising investors and career coaching built around landing you a role.", sub: "Perfect if you need to", items: ["Get honest feedback on your applications", "Practise pitches before they count", "Understand how hiring in venture really works"], image: img("/site/p2.jpg") },
      { name: "Community", lead: "Peer learning across a cohort spanning 40+ countries, and a network that stays with you long after the fourteen weeks. The part Fellows say mattered most.", sub: "Perfect if you need to", items: ["A cohort that becomes your first network in venture", "Alumni who hear about roles before they are posted", "A family, not a course"], image: img("/site/p7.jpg") },
    ],
  },
  programmeGain: {
    eyebrow: "What you launch with",
    heading: "Working knowledge, *real relationships.*",
    lede: "You leave with a portfolio that speaks for you and a network that hears about roles before they are posted. Four things you take with you.",
    barTitle: "What's in it for you",
    steps: [
      { name: "Industry insights", lead: "How capital moves and who gets it. Sourcing, diligence, valuation, term sheets, portfolio construction. Working knowledge, not theory.", sub: "You walk away with", items: ["A grounded view of how a fund actually runs", "The vocabulary and the instincts of the job", "Models you built by hand until they made sense"], image: img("/site/p5.jpg") },
      { name: "Investors network", lead: "Direct access to the investors shaping the industry. Many will be your mentors and instructors. Not a cold email, a relationship.", sub: "You walk away with", items: ["Partners and principals who know your name", "Warm introductions, not applications into the void", "People who will take your call after the programme"], image: img("/site/p1.jpg") },
      { name: "Solid portfolio", lead: "Real deals, real calls, made and defended in investment committee simulations. You finish with work to show.", sub: "You walk away with", items: ["Investment memos you wrote and defended", "A thesis the industry can argue with", "Proof of judgement, not just interest"], image: img("/site/p6.jpg") },
      { name: "Peer network", lead: "Alumni across 40+ countries, over 85% now working in venture. You hear about roles before they are posted.", sub: "You walk away with", items: ["A cohort spread across every time zone", "An alumni network that pays it forward", "The Included VC mafia, for life"], image: img("/site/p3.jpg") },
    ],
  },
  programmeWho: {
    eyebrow: "Who this is for",
    heading: "The same people the Fellowship *has always been for.*",
    lede: "It is open to anyone, anywhere in the world, and you do not need a finance degree. You need curiosity, momentum and the zeal to scale your career. You could be an engineer, a content creator, a DJ or even a doctor.",
    barTitle: "Who this is for",
    steps: [
      { name: "The explorers", role: "Analysts and professionals", lead: "You work in tech, law, consulting, media or something else entirely, and you want to understand how capital moves and who decides where it orbits.", sub: "This is you if", items: ["You are curious about the mechanics of venture", "You want to know how a company goes from idea to funding", "You have tried to get in and want a real route"], image: img("/site/p6.jpg") },
      { name: "The rocket builders", role: "Founders and operators", lead: "You have raised, built or scaled something. Now you want to see the table from the other side.", sub: "This is you if", items: ["You have led, built or shipped something real", "You want to back builders, not just be one", "You have the operator instinct and want the investor toolkit"], image: img("/site/p4.jpg") },
      { name: "The pathfinders", role: "Emerging investors and angel investors", lead: "You are already writing cheques, sourcing deals or working in a fund, and you want the network and the training to go further, faster.", sub: "This is you if", items: ["You are an angel investor, scout or junior at a fund", "You want structure around what you already do", "You want the network that gets you the next seat"], image: img("/site/p3.jpg") },
    ],
  },
  programmeTldr: {
    eyebrow: "👇🏼 The TLDR",
    heading: "Eight stars. *One constellation.*",
    lede: "The main things you need to know, mapped onto the unicorn. Tap a star, or move through them in order.",
    stars: [
      {
        "label": "Funding",
        "title": "Fully funded",
        "body": "Made possible by our sponsors, who want to change the face of VC: Creandum, Daphni, European Investment Fund, HSBC Ventures, Mouro Capital, Mangrove Capital, Notion Capital, Seedcamp and Wilson Sonsini. Please note there is an application fee."
      },
      {
        "label": "Time",
        "title": "Part-time",
        "body": "You can work and be a Fellow. Expect to invest 15+ hours a week on applications, financial modelling courses, personal branding and more. Masterclasses and workshops usually run one to two evenings a week, 17:00 to 20:00 UK time."
      },
      {
        "label": "Who",
        "title": "Aspiring VC",
        "body": "You must be serious about breaking into Venture Capital. We want to hear about your experiences of trying to get in, what you tried, what happened and why you are still here."
      },
      {
        "label": "Format",
        "title": "What you'll do",
        "body": "Masterclasses, in-depth deep dives, foundational learning, investment committee simulations, mentoring with world-class investors, office hours, peer-to-peer learning, brand building, career coaching, AMAs and more."
      },
      {
        "label": "Where",
        "title": "Global and virtual",
        "body": "Join from anywhere. Every session runs online, with some optional in-person Summits along the way where the cohort, alumni and Venture Partners come together."
      },
      {
        "label": "Values",
        "title": "What we stand for",
        "body": "Kindness. Paying it forward. Don't compete. Sparkle (quite literally). These are the foundational pillars of Included VC and how we expect every Fellow to show up."
      },
      {
        "label": "Apply",
        "title": "Yes, you should",
        "body": "If any of these apply to you (\"I'm a mum\", \"I'm a student\", \"I'm not in tech\", \"I'm not in investment banking\"), we encourage you to apply. The Fellowship is built for people the industry overlooked."
      },
      {
        "label": "Dates",
        "title": "Application cycle",
        "body": "Applications for the founding cohort are open. Registering takes a minute. Once registered, you will receive the full application timeline and deadlines by email."
      }
    ],
  },
  programmeRoadmap: {
    eyebrow: "The curriculum",
    heading: "Twelve modules. *Zero filler.*",
    modules: [
      {
        "title": "Fund Structure & Mechanics",
        "text": "How a fund is built, who it answers to and how the money moves."
      },
      {
        "title": "Financial Modelling",
        "text": "The numbers behind a deal, built by hand until they make sense."
      },
      {
        "title": "Dealflow Sourcing",
        "text": "Where great companies come from and how to find them first."
      },
      {
        "title": "Legals & beyond",
        "text": "Term sheets, SHAs and the fine print that decides outcomes."
      },
      {
        "title": "Cap Tables & Term Sheets",
        "text": "Ownership, dilution and how a round actually gets done."
      },
      {
        "title": "History of VC",
        "text": "Where the industry came from and why it works the way it does."
      },
      {
        "title": "Unit Economics",
        "text": "Does the business make money per customer? Learn to tell fast."
      },
      {
        "title": "Exits & Acquisitions",
        "text": "How returns are realised, from IPO to acquisition."
      },
      {
        "title": "Investment Theses",
        "text": "Build a point of view the industry can argue with."
      },
      {
        "title": "Models & Trends",
        "text": "Business models, market shifts and what's next."
      },
      {
        "title": "Due Diligence",
        "text": "How to pressure-test a company before you back it."
      },
      {
        "title": "Careers in VC",
        "text": "Landing the role: applications, interviews, brand and network."
      }
    ],
    finish: "🎓 Your seat at the table",
  },
  programmeCurriculum: {
    eyebrow: "The curriculum",
    heading: "An overview of *your learnings.*",
    lede: "To understand how the VC machinery works, you have to engage with it, question it and bring your own experience. This structured learning programme does just that.",
    hint: "Open any week to see what it covers.",
    weeks: [
      {
        "title": "History & shape of VC",
        "text": "Where the industry came from, why it works the way it does, who allocates capital and who really decides."
      },
      {
        "title": "Fund structure & mechanics",
        "text": "How a fund is built, who it answers to and how the money moves. LPs, GPs, fund size and the 2 and 20."
      },
      {
        "title": "Fund economics",
        "text": "Portfolio construction, reserves, ownership targets and the maths of a power law."
      },
      {
        "title": "Dealflow sourcing",
        "text": "Where great companies come from, how investors build a pipeline, and how to get on one."
      },
      {
        "title": "First screen & market maps",
        "text": "Reading a deck and a data room quickly. Business models, market shifts and what comes next."
      },
      {
        "title": "Unit economics",
        "text": "Does the business make money per customer? Learn to tell, fast, and what to do when it does not."
      },
      {
        "title": "Financial modelling",
        "text": "The numbers behind a deal, built by hand until they make sense rather than copied from a template."
      },
      {
        "title": "Due diligence",
        "text": "Market, team, product, traction. Reference calls and the questions that get real answers."
      },
      {
        "title": "Investment theses & memos",
        "text": "Build a point of view the industry can argue with, then write the document that carries a deal."
      },
      {
        "title": "The investment committee",
        "text": "A live IC on a real deal. You present, you defend, you get challenged the way investors challenge each other."
      },
      {
        "title": "Cap tables & term sheets",
        "text": "Pre and post money, ownership, dilution, option pools and how a round actually gets done."
      },
      {
        "title": "Legals & beyond",
        "text": "Term sheets, SHAs and the fine print that quietly decides outcomes years later."
      },
      {
        "title": "Exits & acquisitions",
        "text": "How returns are realised, from IPO to acquisition, and what happens when things go wrong instead."
      },
      {
        "title": "Careers in VC & your Deep Dive",
        "text": "Landing the role: applications, interviews, brand and network. Plus your Deep Dive presentation."
      }
    ],
    africa: {
      title: "Ascend Africa · six more sessions",
      text: "Everything above, plus six Thursday sessions on African investment markets with the funds shaping them.",
      cta: { label: "About Ascend Africa", href: "/ascend-africa" },
    },
    leaveTitle: "What you leave with",
    leave: [
      {
        "title": "Industry insight",
        "text": "How capital moves and who gets it. Working knowledge, not theory."
      },
      {
        "title": "Time with investors",
        "text": "Hours in the room with the people who teach you. A relationship, not a cold email."
      },
      {
        "title": "Work to show for it",
        "text": "An investment memo, a live investment committee under your belt, and a published Deep Dive with your name on it."
      },
      {
        "title": "A global network",
        "text": "A cohort from all over the world, and the wider Included VC community."
      }
    ],
  },
  programmeMonth: {
    eyebrow: "The Included VC experience",
    heading: "A month with *Included VC.*",
    lede: "We start every week with the live session. Everything else takes shape as the week progresses.",
    weeks: [
      {
        number: "1",
        label: "WEEK ONE",
        pills: [
          { kind: "m", day: "TUE", title: "Masterclass", note: "16:00\u201318:00 GMT, everyone" },
          { kind: "t", day: "WED", title: "Task set", note: "Due in two weeks" },
          { kind: "a", day: "THU", title: "Africa masterclass", note: "90 min, Africa track" },
          { kind: "o", day: "THU", title: "Office hours", note: "Optional" },
        ],
      },
      {
        number: "2",
        label: "WEEK TWO",
        pills: [
          { kind: "m", day: "TUE", title: "Masterclass", note: "16:00\u201318:00 GMT, everyone" },
          { kind: "o", day: "THU", title: "Office hours", note: "Optional" },
        ],
      },
      {
        number: "3",
        label: "WEEK THREE",
        pills: [
          { kind: "m", day: "TUE", title: "Masterclass", note: "16:00\u201318:00 GMT, everyone" },
          { kind: "t", day: "WED", title: "Task due", note: "Submit your work" },
          { kind: "a", day: "THU", title: "Africa masterclass", note: "90 min, Africa track" },
        ],
      },
      {
        number: "4",
        label: "WEEK FOUR",
        pills: [
          { kind: "m", day: "TUE", title: "Masterclass", note: "16:00\u201318:00 GMT, everyone" },
          { kind: "t", day: "WED", title: "Feedback", note: "On your task" },
          { kind: "t", day: "WED", title: "Next task set", note: "" },
          { kind: "a", day: "THU", title: "Africa masterclass", note: "90 min, Africa track" },
          { kind: "o", day: "THU", title: "Office hours", note: "Optional" },
        ],
      },
    ],
    key: [
      {
        "kind": "m",
        "label": "Tuesday masterclass, whole cohort"
      },
      {
        "kind": "a",
        "label": "Thursday masterclass, Ascend Africa"
      },
      {
        "kind": "t",
        "label": "Tasks and feedback"
      },
      {
        "kind": "o",
        "label": "Optional sessions"
      }
    ],
    hours: [
      {
        "value": "2 hrs",
        "label": "live, every Tuesday"
      },
      {
        "value": "3–5 hrs",
        "label": "a week in total, including the live session"
      },
      {
        "value": "+90 min",
        "label": "on six Thursdays for the Africa track"
      }
    ],
    note: "Illustrative month. The live timetable is shared in week one.",
  },
  programmeLaws: {
    eyebrow: "The code",
    heading: "Four laws of this universe.",
    laws: [
      {
        "title": "Kindness",
        "text": "The baseline, not a bonus. How you speak, respond and show up, every room, every time."
      },
      {
        "title": "Pay it forward",
        "text": "Everything here was given freely. The assumption is that you'll pass it on, forwards and backwards."
      },
      {
        "title": "Don't compete",
        "text": "Fifty ambitions, one direction. Nobody here wins alone."
      },
      {
        "title": "Sparkle **✦**",
        "text": "The extra ten percent nobody asked for. Quite literally the house style."
      }
    ],
  },
  programmeFaq: {
    eyebrow: "FAQs",
    heading: "The questions *everyone asks.*",
    lede: "The short version. Six answers here, the full list of 18 on the FAQ page.",
    items: [
      {
        "q": "What is the Included VC Global Fellowship?",
        "a": "Think of it as a fast-track MBA for venture capital, built for extraordinary people from overlooked and diverse communities. Included VC is the first global, fully funded Fellowship of its kind, and it exists because the industry should look like the society it invests in.\n\nOur mission is to change the face of VC: dramatically increasing representation and maximising fund success by transforming networks, teams, deal flow and investments, creating multi-generational change.\n\nOver 85% of Fellows who were actively looking for a role have broken into venture, from Asia to Europe to North America."
      },
      {
        "q": "Who should apply?",
        "a": "You should apply if you want a career in VC in the near future, have tried to break in and not yet managed it, come from a non-traditional background, and identify with our definition of representation. Having tried matters to us; it shows this is something you want.\n\nPlease note you will need to commit 15 to 20 hours a week, including writing long-form Deep Dives."
      },
      {
        "q": "Can I do it alongside a job?",
        "a": "Yes. The Fellowship is part-time. Masterclasses and workshops usually run one to two evenings a week, 17:00 to 20:00 UK time, and you should plan for 15+ hours a week in total."
      },
      {
        "q": "Is there an application fee?",
        "a": "Yes, a small fee applies when you apply. The Fellowship itself is fully funded. If the fee is a barrier, a waiver is available through a short application."
      },
      {
        "q": "What is the geographic focus?",
        "a": "Global. You can apply from anywhere in the world.\n\nIf you are based in Africa, we now run a dedicated [Included VC Africa Fellowship](/ascend-africa), tailored to your region, community and ecosystem."
      },
      {
        "q": "How many Fellows actually break into VC?",
        "a": "The numbers speak for themselves. Of Fellows actively applying to break into VC:\n\n- **2020:** 83% did so. One Fellow went on to raise $10m+, two became co-founders and raised $750K, another raised $50m, and many became angel investors.\n- **2021:** 85%\n- **2022:** 83%"
      }
    ],
    cta: { label: "Read all FAQs", href: "/faq" },
  },
};

export const programmeSections = [
  { key: "programmeMeta", label: "Search & sharing", description: "Page title and description." },
  { key: "programmeHead", label: "Page header", description: "Breadcrumb, heading and intro." },
  { key: "programmeWhat", label: "What is the Fellowship", description: "Intro text and photo." },
  { key: "programmeCards", label: "Our programmes", description: "The programme cards and their tracks." },
  { key: "programmeOrb", label: "Venture Partners", description: "Partner logo sphere." },
  { key: "programmeStructure", label: "Programme structure", description: "The four parts of the programme." },
  { key: "programmeGain", label: "What you launch with", description: "The four things you take with you." },
  { key: "programmeWho", label: "Who this is for", description: "The three kinds of people it is for." },
  { key: "programmeTldr", label: "TLDR", description: "The eight stars of the constellation." },
  { key: "programmeRoadmap", label: "Twelve modules", description: "The road of twelve modules." },
  { key: "programmeCurriculum", label: "Curriculum", description: "The fourteen weeks, Ascend Africa and what you leave with." },
  { key: "programmeMonth", label: "A month with Included VC", description: "Example weeks, the colour key and the hours." },
  { key: "programmeLaws", label: "Four laws", description: "The code." },
  { key: "programmeFaq", label: "FAQs", description: "The short list of questions." },
] as const;

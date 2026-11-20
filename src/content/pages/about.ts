/** About page (/about). */
import { z } from "zod";
import { imageSchema, linkSchema } from "../blocks";
import { img } from "./img";
import { orbSchema, partnerLogos } from "./parts";
import { pageMetaSchema } from "./shared";

export const aboutSchemas = {
  aboutMeta: pageMetaSchema,
  aboutHero: z.object({ crumbs: z.string(), eyebrow: z.string(), heading: z.string(), lede: z.string(), image: imageSchema }),
  aboutBand: z.object({
    columns: z.array(z.object({ eyebrow: z.string(), text: z.string() })).length(2),
    network: z.object({ eyebrow: z.string(), text: z.string() }),
    metricsLede: z.string(),
    metrics: z
      .array(
        z.object({
          value: z.string(),
          suffix: z.string(),
          label: z.string(),
          lit: z.number().int().min(0).max(40).describe("How many of the 40 bars are lit."),
          half: z.number().int().min(0).max(40).describe("How many half-lit bars follow them."),
        }),
      )
      .length(4),
    foot: z.string(),
    cta: linkSchema,
  }),
  aboutValues: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    values: z
      .array(z.object({ name: z.string(), tip: z.string().describe("The short name on the star."), text: z.string() }))
      .length(4)
      .describe("The four points of the star."),
    link: linkSchema,
    button: linkSchema,
  }),
  aboutStory: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    eras: z
      .array(
        z.object({
          year: z.string(),
          stat: z.string(),
          statLabel: z.string(),
          label: z.string(),
          title: z.string(),
          text: z.string(),
        }),
      )
      .min(1)
      .describe("One card per era, in order. The artwork cycles through eight designs."),
  }),
  aboutOrb: orbSchema,
  aboutPress: z.object({ eyebrow: z.string(), logos: z.array(z.object({ name: z.string(), logo: imageSchema })) }),
  aboutSponsor: z.object({ title: z.string(), text: z.string(), cta: linkSchema }),
  aboutVoices: z.object({
    heading: z.string(),
    paragraphs: z.array(z.string()),
    cta: linkSchema,
    quotes: z.array(z.object({ quote: z.string(), name: z.string(), role: z.string() })).min(1),
  }),
  aboutProgrammes: z.object({
    heading: z.string(),
    lede: z.string(),
    cta: linkSchema,
    cards: z
      .array(
        z.object({
          title: z.string(),
          text: z.string(),
          rows: z.array(z.object({ label: z.string(), value: z.string() })),
          image: imageSchema,
          link: linkSchema,
        }),
      )
      .min(1),
  }),
  aboutMilestones: z.object({ label: z.string(), items: z.array(z.object({ title: z.string(), text: z.string() })) }),
  aboutTeam: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    people: z.array(z.object({ name: z.string(), role: z.string(), photo: imageSchema })),
  }),
  aboutContact: z.object({
    heading: z.string(),
    lede: z.string(),
    emails: z.array(z.string()),
    to: z.string().describe("Where the form's message goes (it opens the visitor's email app, addressed here)."),
    whoLabel: z.string(),
    options: z.array(z.string()),
    send: z.string(),
    sent: z.string().describe("The button text after sending."),
  }),
};

type Content = { [K in keyof typeof aboutSchemas]: z.infer<(typeof aboutSchemas)[K]> };

export const aboutDefaults: Content = {
  aboutMeta: {
    title: "About",
    description: "Since 2019, Included VC has run a fully funded Fellowship for people with no obvious path into venture capital. Our story, values, partners and team.",
  },
  aboutHero: {
    crumbs: "[Universe](/) / About",
    eyebrow: "Who we are",
    heading: "Changing the face of *venture capital.*",
    lede: "Since 2019, Included VC has run a fully funded Fellowship for people with no obvious path into the industry. Over 55,000 of you have been part of that.",
    image: img("/site/about-hero.jpg"),
  },
  aboutBand: {
    columns: [
      {
        "eyebrow": "Who we are",
        "text": "Included VC exists to change who gets to invest. We find brilliant people the industry overlooked, give them the training, the network and the credibility to break in, and back them for life. Our Fellows come from engineering, healthcare, law, research, operations and academia."
      },
      {
        "eyebrow": "How we work",
        "text": "Everything is taught by working investors, not career educators. Masterclasses, investment committee simulations, deal deep dives and mentoring from the partners and principals of the funds behind the Fellowship. Fully funded, so talent is the only filter."
      }
    ],
    network: { eyebrow: "A global network", text: "With a global family and a local footprint on every continent, we help overlooked talent gain **a route into venture** that did not exist before." },
    metricsLede: "We value representation and understand its impact on the industry. While helping funds find talent they would never otherwise meet, we like to lead by example.",
    metrics: [
      {
        "value": "85",
        "suffix": "%",
        "label": "of alumni are now working in the investment industry",
        "lit": 34,
        "half": 2
      },
      {
        "value": "40",
        "suffix": "+",
        "label": "countries represented in every cohort",
        "lit": 28,
        "half": 1
      },
      {
        "value": "55",
        "suffix": "k+",
        "label": "people in the Included VC community and growing",
        "lit": 37,
        "half": 1
      },
      {
        "value": "7",
        "suffix": "",
        "label": "years running the first fully funded VC Fellowship",
        "lit": 19,
        "half": 1
      }
    ],
    foot: "Between us, our Fellows speak over 40 languages, and we believe varying thought, opinion and background is the foundation of a strong industry.",
    cta: { label: "Learn more", href: "/programme" },
  },
  aboutValues: {
    eyebrow: "Our values",
    heading: "How we treat *each other.*",
    lede: "Four values every Included VC cohort is held to.",
    values: [
      {
        "name": "Kindness",
        "tip": "Kindness",
        "text": "Kindness is the baseline. It means being respectful, responsive and decent in how you speak, show up, give feedback and treat your cohort."
      },
      {
        "name": "Pay it forward (and backward)",
        "tip": "Pay it forward",
        "text": "Our fellowships are made possible by people who gave without asking for anything in return: funders, venture partners, alumni and faculty. We assume you will pay it forward, and backward too."
      },
      {
        "name": "Don’t compete",
        "tip": "Don’t compete",
        "text": "Everyone here is ambitious, but this isn’t a zero-sum game. You’re not here to outshine others; you’re here to light them up. We lift as we climb."
      },
      {
        "name": "Sparkle",
        "tip": "Sparkle",
        "text": "Sparkle is how you show up: the clarity in your thinking, the way you follow through, and the standard you set in every room."
      }
    ],
    link: { label: "About Included VC", href: "/about" },
    button: { label: "View resources", href: "/resources" },
  },
  aboutStory: {
    eyebrow: "The story so far",
    heading: "Our universe, *era by era.*",
    lede: "Everything you need to know about Included VC since its inception. Pick a planet to learn more.",
    eras: [
      {
        "year": "2019",
        "stat": "1,400",
        "statLabel": "applications for 30 places [confirm]",
        "label": "Origins",
        "title": "One room in London",
        "text": "Nikita Thakrar starts Included VC with a simple, slightly stubborn idea: talent is everywhere, opportunity is not. The first Fellowship opens to people from every background, whoever they know."
      },
      {
        "year": "2020",
        "stat": "30",
        "statLabel": "Fellows across 14 cities",
        "label": "Cohort One",
        "title": "Thirty Fellows, fourteen cities",
        "text": "The first, Europe-focused cohort finishes in December 2020. Within weeks, a third of them have moved into venture, founded companies or joined startups."
      },
      {
        "year": "2021",
        "stat": "21",
        "statLabel": "countries in one cohort",
        "label": "Going global",
        "title": "Forty-eight Fellows, twenty-one countries",
        "text": "Fellowship II goes worldwide and fully funded by ten funds including M12, Mouro Capital, Seedcamp and HSBC. Nine months, online, open to anyone wherever they live."
      },
      {
        "year": "2022",
        "stat": "85%",
        "statLabel": "of job-seeking Fellows into venture",
        "label": "The mafia forms",
        "title": "Alumni start hiring alumni",
        "text": "Fellows from the first cohorts become Associates, Principals and founders, and begin opening doors for the ones behind them. The Included VC name starts to carry weight in interviews."
      },
      {
        "year": "2023",
        "stat": "500+",
        "statLabel": "Deep Dives published",
        "label": "Included VC LIVE",
        "title": "Summits in India and Spain",
        "text": "The community meets in person. Forty alumni in India, more than a hundred of us in Spain, and the Deep Dives, the long-form research Fellows are known for, pass 500 published pieces."
      },
      {
        "year": "2024",
        "stat": "40+",
        "statLabel": "countries in the family",
        "label": "Africa",
        "title": "A continent-first Fellowship",
        "text": "Included VC Africa launches with the funds shaping African capital: Ascend Africa, RISE InVC and a pan-African cohort on the continent and in the diaspora."
      },
      {
        "year": "2025",
        "stat": "5",
        "statLabel": "Fellows now Partners",
        "label": "Investor Fellowship",
        "title": "The deeper tier",
        "text": "A private, partner-nominated Fellowship for professionals already investing across Africa. Five Fellows from earlier cohorts are now Partners. All five are women."
      },
      {
        "year": "2026",
        "stat": "55k+",
        "statLabel": "people in the Included VC community",
        "label": "Ascend",
        "title": "Everything we learned, opened up",
        "text": "Seven years in, Included VC stops being just a Fellowship. Ascend takes what seven years taught us and opens it to many more people, fourteen Tuesdays at a time. The founding cohort starts here."
      }
    ],
  },
  aboutOrb: {
    eyebrow: "The network",
    heading: "The industry is paying for you *to learn how it works.*",
    lede: "Ascend’s teaching, faculty and platform are funded by partners of Included VC. Why would they? Because Included VC exists to change who gets to invest, and they have backed that since 2019.",
    globalLabel: { title: "Global partners", heading: "The funds changing *who gets to invest.*" },
    africaLabel: { title: "Africa partners", heading: "Building the continent’s *investment industry.*" },
    logos: partnerLogos([
      "g_creandum", "g_daphni", "g_eif", "g_hsbc", "g_mangrove", "g_mouro", "g_notion", "g_seedcamp", "g_wilson",
      "a_undp", "a_timbuktoo", "a_german", "a_giz", "a_sais", "a_fsd", "a_aban", "a_ahl", "a_aruwa", "a_atg",
      "a_enza", "a_launch", "a_jedar", "a_madica", "a_next176", "a_persistent", "a_sabou",
    ]).map((l) => (l.name === "Mangrove Capital Partners" ? { ...l, scale: 1.8 } : l)),
  },
  aboutPress: {
    eyebrow: "As featured in",
    logos: [
      ["p01", "Forbes"],
      ["p03", "Sky News"],
      ["p04", "Business Insider"],
      ["p02", "Startups Magazine"],
      ["p00", "Silicon Canals"],
    ].map(([f, name]) => ({ name, logo: img(`/site/press/${f}.webp`, name) })),
  },
  aboutSponsor: {
    title: "Sponsor the universe",
    text: "We are a fund that wants to change the face of venture capital. Partner funds get access to Included VC reading material and events for their teams.",
    cta: { label: "Talk to Nikita", href: "mailto:nikita@included.vc" },
  },
  aboutVoices: {
    heading: "Testimonials",
    paragraphs: [
      "In an industry that rewards pattern matching, we are proudly different, and so are the people who come through the programme.",
      "Funds choose Included VC Fellows because they are trained by practitioners and vetted before they are ever hired. But do not take our word for it."
    ],
    cta: { label: "Hear from our community", href: "/alumni" },
    quotes: [
      {
        "quote": "Included VC goes beyond classic diversity initiatives. There is the practical component, but also so much heart and community, which is what is mainly behind its insane success.",
        "name": "Soo Min Hong",
        "role": "Analyst, Pale Blue Dot"
      },
      {
        "quote": "There is a reason why Included VC is one of the most competitive programmes in venture. It is by far the best thing I have ever been a part of.",
        "name": "Sofia Haq",
        "role": "Investment Associate, VamosVentures"
      },
      {
        "quote": "I would recommend Included VC to any aspiring VC over a masters degree from the fanciest business school.",
        "name": "Ashna Oukabay",
        "role": "Included VC alumni"
      },
      {
        "quote": "Included VC was a life-changing experience. The depth shared by practitioners from top-performing funds took it to the next level.",
        "name": "Lucas Kuziv",
        "role": "Investor, Beacon Capital"
      }
    ],
  },
  aboutProgrammes: {
    heading: "Our programmes",
    lede: "Each Fellowship is a region of the same sky. Same values, different light. Move through them, or go straight to the one that is yours.",
    cta: { label: "View all programmes", href: "/programme" },
    cards: [
      {
        title: "Included VC Ascend Global",
        text: "Fourteen weeks, partner funded, forty-plus nationalities. The original Fellowship, now in its seventh year.",
        rows: [{"label": "Format", "value": "Part-time, virtual, with optional summits"}, {"label": "Who", "value": "Aspiring investors from overlooked backgrounds"}, {"label": "After", "value": "Almost 85% now in the investment industry"}],
        image: img("/site/city-ny.jpg"),
        link: { label: "Explore", href: "/programme" },
      },
      {
        title: "Included VC Ascend Africa",
        text: "Fourteen weeks of investment education built for Africans, with the funds already shaping African capital.",
        rows: [{"label": "Format", "value": "Fourteen weeks, live and online"}, {"label": "Who", "value": "Ambitious Africans on the continent or in the diaspora"}, {"label": "After", "value": "A pan-African cohort and network"}],
        image: img("/site/city-dubai.jpg"),
        link: { label: "Explore", href: "/ascend-africa" },
      },
      {
        title: "Included VC Investor Fellowship",
        text: "The family's deeper tier, partner nominated, for people already writing cheques across Africa.",
        rows: [{"label": "Format", "value": "Private, closed-door sessions"}, {"label": "Who", "value": "Experienced investment professionals"}, {"label": "After", "value": "A seat where African venture gets decided"}],
        image: img("/site/city-london.jpg"),
        link: { label: "Explore", href: "/investor" },
      },
    ],
  },
  aboutMilestones: {
    label: "Milestones",
    items: [
      {
        "title": "Fully funded since 2019",
        "text": "The world's first fully funded VC Fellowship"
      },
      {
        "title": "55,000+ community",
        "text": "Applicants, Fellows, alumni and partners"
      },
      {
        "title": "40+ countries",
        "text": "In every cohort"
      },
      {
        "title": "85% in investment",
        "text": "Alumni now working in the industry"
      },
      {
        "title": "Backed by 30+ funds",
        "text": "Venture Partners across the globe"
      },
      {
        "title": "Launched in Africa",
        "text": "Included VC Ascend Africa, 2026"
      }
    ],
  },
  aboutTeam: {
    eyebrow: "The team",
    heading: "The people *behind the universe.*",
    people: ["p0", "p1", "p2", "p3"].map((p) => ({ name: "Name placeholder", role: "Role placeholder", photo: img(`/site/${p}.jpg`) })),
  },
  aboutContact: {
    heading: "Let's talk",
    lede: "Applying, sponsoring, teaching or just curious. Fill in the form or write to us directly.",
    emails: ["hello@included.vc", "nikita@included.vc"],
    to: "hello@included.vc",
    whoLabel: "I am",
    options: ["Aspiring Fellow", "Fund", "Other"],
    send: "Send message",
    sent: "Sent ✦",
  },
};

export const aboutSections = [
  { key: "aboutMeta", label: "Search & sharing", description: "Page title and description." },
  { key: "aboutHero", label: "Page header", description: "Photo, heading and intro." },
  { key: "aboutBand", label: "Who we are", description: "Who we are, how we work, and the four metrics." },
  { key: "aboutValues", label: "Our values", description: "The four values on the star." },
  { key: "aboutStory", label: "The story so far", description: "The eras, year by year." },
  { key: "aboutOrb", label: "The network", description: "Partner logo sphere." },
  { key: "aboutPress", label: "As featured in", description: "Press logos." },
  { key: "aboutSponsor", label: "Sponsor", description: "The note for funds." },
  { key: "aboutVoices", label: "Testimonials", description: "Intro and the rotating quotes." },
  { key: "aboutProgrammes", label: "Our programmes", description: "The programme cards." },
  { key: "aboutMilestones", label: "Milestones", description: "The scrolling milestones strip." },
  { key: "aboutTeam", label: "The team", description: "Names, roles and photos." },
  { key: "aboutContact", label: "Let's talk", description: "Contact text and the form." },
] as const;

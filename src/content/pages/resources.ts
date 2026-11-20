/** Resources page (/resources): the reading shelf, field notes, the Journal and the newsletter. */
import { z } from "zod";
import { imageSchema, linkSchema } from "../blocks";
import { pageMetaSchema } from "./shared";

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a colour like #5533eb");

export const resourcesSchemas = {
  resourcesMeta: pageMetaSchema,
  resourcesShelf: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    shelves: z.array(z.string()).describe("Filter buttons above the shelf. “All” shows every book; the others match a book's shelf."),
    pageEyebrow: z.string().describe("Small label at the top of each book page."),
    extraTags: z.array(z.string()).describe("Tags shown on every book page after the shelf name."),
    books: z
      .array(
        z.object({
          title: z.string(),
          author: z.string(),
          shelf: z.string().describe("Must match one of the filter buttons."),
          cover1: hex.describe("Spine and cover colour."),
          cover2: hex.describe("Second cover colour (gradient)."),
          lightText: z.boolean().describe("Dark text, for light cover colours."),
          isbn: z.string().describe("The cover photo is fetched from Open Library by ISBN. Leave empty to show the coloured cover only."),
          cover: imageSchema.optional().describe("Upload a cover to use instead of the Open Library one."),
          rating: z.number().min(0).max(5),
          why: z.string().describe("Why it is here: shown on the shelf and the book page."),
          published: z.string(),
          publisher: z.string(),
          pages: z.string(),
          format: z.string(),
          readWhen: z.string(),
          timeToRead: z.string(),
          ideas: z.array(z.string()).describe("Key ideas"),
          summary: z.string(),
          notes: z.string(),
          applications: z.string(),
          critique: z.string(),
          connections: z.array(z.string()),
        }),
      )
      .min(1)
      .describe("In shelf order; the books split over two shelves."),
  }),
  resourcesZines: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    label: z.string(),
    zines: z
      .array(
        z.object({
          title: z.string(),
          short: z.string(),
          long: z.string(),
          format: z.string(),
          writtenBy: z.string(),
          handedOut: z.string(),
          link: linkSchema,
        }),
      )
      .min(1)
      .describe("The covers' artwork cycles through four designs."),
  }),
  resourcesJournal: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    featured: z.object({ kicker: z.string(), title: z.string(), text: z.string(), meta: z.string(), link: linkSchema }),
    posts: z.array(z.object({ category: z.string(), title: z.string(), meta: z.string(), href: z.string() })),
    cta: linkSchema,
  }),
  resourcesVideos: z.object({
    heading: z.string(),
    videos: z.array(z.object({ title: z.string(), vimeoId: z.string().describe("The number at the end of the Vimeo link.") })),
  }),
  resourcesNewsletter: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    to: z.string().describe("Sign-ups open the visitor's email app, addressed here."),
    selectLabel: z.string(),
    options: z.array(z.string()),
    button: z.string(),
    done: z.string().describe("The button text after signing up."),
  }),
};

type Content = { [K in keyof typeof resourcesSchemas]: z.infer<(typeof resourcesSchemas)[K]> };

export const resourcesDefaults: Content = {
  resourcesMeta: {
    title: "Resources",
    description: "The books we hand every Fellow, our illustrated field notes, and the Included VC Journal.",
  },
  resourcesShelf: {
    eyebrow: "The reading shelf",
    heading: "Books we hand *every Fellow.*",
    lede: "What we send Fellows before week one and what instructors keep quoting. Venture, startups, Africa and a few on how to think. Tap a spine to pull it off the shelf, then open its page for our notes.",
    shelves: [
      "All",
      "Venture capital",
      "Startups",
      "Africa",
      "Founders",
      "Angel investing",
      "Mindset"
    ],
    pageEyebrow: "Included VC reading shelf",
    extraTags: ["Non-fiction", "Recommended for Class 26"],
    books: [
      {
        "title": "Venture Deals",
        "author": "Brad Feld & Jason Mendelson",
        "shelf": "Venture capital",
        "cover1": "#5533eb",
        "cover2": "#0033ff",
        "lightText": false,
        "isbn": "9781119594826",
        "rating": 4.5,
        "why": "The first book we send. Read the term sheet chapters twice, skip the lawyer letters until you need them.",
        "published": "2019",
        "publisher": "Wiley",
        "pages": "368",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Cap tables & term sheets sessions",
        "timeToRead": "About 5 hours",
        "ideas": [
          "The term sheet has two things that matter: economics and control",
          "Everything else is negotiable noise",
          "Know who sits across the table and what they optimise for"
        ],
        "summary": "The first book we send. Read the term sheet chapters twice, skip the lawyer letters until you need them. The term sheet has two things that matter: economics and control Everything else is negotiable noise.",
        "notes": "The first book we send. Read the term sheet chapters twice, skip the lawyer letters until you need them.",
        "applications": "Module 05 (Cap tables and term sheets) is built around it. Bring your questions to the clinic.",
        "critique": "US-centric. African and European structures differ, so we pair it with partner fund templates.",
        "connections": [
          "Cap tables & term sheets",
          "Secrets of Sand Hill Road"
        ]
      },
      {
        "title": "Secrets of Sand Hill Road",
        "author": "Scott Kupor",
        "shelf": "Venture capital",
        "cover1": "#0033ff",
        "cover2": "#00f2ff",
        "lightText": false,
        "isbn": "9780593083581",
        "rating": 4.3,
        "why": "Best single explanation of why a fund says no to a good company.",
        "published": "2019",
        "publisher": "Portfolio",
        "pages": "320",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Fund structure & mechanics sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "VCs answer to LPs, which explains most of their behaviour",
          "Fund maths decides which deals a fund can even consider",
          "Boards are where the relationship is actually tested"
        ],
        "summary": "Best single explanation of why a fund says no to a good company. VCs answer to LPs, which explains most of their behaviour Fund maths decides which deals a fund can even consider.",
        "notes": "Best single explanation of why a fund says no to a good company.",
        "applications": "Use it to understand your own future employer before interviews.",
        "critique": "Light on emerging markets and on operating as a junior.",
        "connections": [
          "Fund structure & mechanics",
          "The Power Law"
        ]
      },
      {
        "title": "The Power Law",
        "author": "Sebastian Mallaby",
        "shelf": "Venture capital",
        "cover1": "#0a0f24",
        "cover2": "#5533eb",
        "lightText": false,
        "isbn": "9780525559993",
        "rating": 4.6,
        "why": "Our favourite history of the industry. Nikita quotes the Sequoia chapters a lot.",
        "published": "2022",
        "publisher": "Penguin Press",
        "pages": "496",
        "format": "Paperback, audiobook",
        "readWhen": "Before the History of VC sessions",
        "timeToRead": "About 7 hours",
        "ideas": [
          "Returns follow a power law: one outlier pays for the fund",
          "Venture is a craft learned through networks and apprenticeship",
          "Every era has a new fund model, from Arthur Rock to Tiger"
        ],
        "summary": "Our favourite history of the industry. Nikita quotes the Sequoia chapters a lot. Returns follow a power law: one outlier pays for the fund Venture is a craft learned through networks and apprenticeship.",
        "notes": "Our favourite history of the industry. Nikita quotes the Sequoia chapters a lot.",
        "applications": "Read before the History of VC module. Pick one firm and trace its model.",
        "critique": "Long. Read the chapters on the firms you care about first.",
        "connections": [
          "History of VC",
          "Mastering the VC Game"
        ]
      },
      {
        "title": "Zero to One",
        "author": "Peter Thiel",
        "shelf": "Startups",
        "cover1": "#ffff00",
        "cover2": "#b0ff05",
        "lightText": true,
        "isbn": "9780804139298",
        "rating": 4.1,
        "why": "Short and sharp. Disagree with half of it and you will still learn.",
        "published": "2014",
        "publisher": "Crown",
        "pages": "224",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Dealflow sourcing sessions",
        "timeToRead": "About 3 hours",
        "ideas": [
          "Competition is for losers, monopolies build the future",
          "Secrets exist, and good founders are looking for them",
          "Distribution is as important as the product"
        ],
        "summary": "Short and sharp. Disagree with half of it and you will still learn. Competition is for losers, monopolies build the future Secrets exist, and good founders are looking for them.",
        "notes": "Short and sharp. Disagree with half of it and you will still learn.",
        "applications": "A good lens for your first investment memo: what is the secret here?",
        "critique": "Contrarian for the sake of it in places.",
        "connections": [
          "Dealflow sourcing",
          "The Lean Startup"
        ]
      },
      {
        "title": "The Lean Startup",
        "author": "Eric Ries",
        "shelf": "Startups",
        "cover1": "#00f2ff",
        "cover2": "#0033ff",
        "lightText": true,
        "isbn": "9780307887894",
        "rating": 3.9,
        "why": "Explains the vocabulary founders will use in every pitch you hear.",
        "published": "2011",
        "publisher": "Crown Business",
        "pages": "336",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Founders & pitches sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "Build, measure, learn",
          "Validated learning beats a perfect plan",
          "Pivot or persevere is the only real decision"
        ],
        "summary": "Explains the vocabulary founders will use in every pitch you hear. Build, measure, learn Validated learning beats a perfect plan.",
        "notes": "Explains the vocabulary founders will use in every pitch you hear.",
        "applications": "Ask founders what they learned last month, not what they built.",
        "critique": "Dated examples, and lean is not the only way to build.",
        "connections": [
          "Founders & pitches",
          "The Mom Test"
        ]
      },
      {
        "title": "Angel",
        "author": "Jason Calacanis",
        "shelf": "Angel investing",
        "cover1": "#00ff04",
        "cover2": "#00f2ff",
        "lightText": true,
        "isbn": "9780062560704",
        "rating": 3.8,
        "why": "Brash, but useful for anyone who wants to write cheques before joining a fund.",
        "published": "2017",
        "publisher": "Harper Business",
        "pages": "304",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Angel investor track sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "Small cheques, big volume, say no fast",
          "Your network is the asset you are building",
          "Founders remember who helped before the round"
        ],
        "summary": "Brash, but useful for anyone who wants to write cheques before joining a fund. Small cheques, big volume, say no fast Your network is the asset you are building.",
        "notes": "Brash, but useful for anyone who wants to write cheques before joining a fund.",
        "applications": "Pair with our angel investor track sessions.",
        "critique": "Silicon Valley lens, assumes capital is easy to find.",
        "connections": [
          "Angel investor track",
          "Super Founders"
        ]
      },
      {
        "title": "Africa’s Business Revolution",
        "author": "Acha Leke, Mutsa Chironga & Georges Desvaux",
        "shelf": "Africa",
        "cover1": "#b0ff05",
        "cover2": "#00ff04",
        "lightText": true,
        "isbn": "9781633694408",
        "rating": 4.2,
        "why": "Core reading for the Africa track. Full of numbers you can use in memos.",
        "published": "2018",
        "publisher": "Harvard Business Review Press",
        "pages": "256",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Ascend Africa sessions",
        "timeToRead": "About 3 hours",
        "ideas": [
          "Four hundred African companies already earn over a billion dollars",
          "Winning firms build for infrastructure gaps, not around them",
          "Talent and local knowledge beat imported playbooks"
        ],
        "summary": "Core reading for the Africa track. Full of numbers you can use in memos. Four hundred African companies already earn over a billion dollars Winning firms build for infrastructure gaps, not around them.",
        "notes": "Core reading for the Africa track. Full of numbers you can use in memos.",
        "applications": "Use the sector chapters when sourcing in a new market.",
        "critique": "Pre-pandemic data, so update the figures before quoting.",
        "connections": [
          "Ascend Africa",
          "The Prosperity Paradox"
        ]
      },
      {
        "title": "The Prosperity Paradox",
        "author": "Clayton Christensen, Efosa Ojomo & Karen Dillon",
        "shelf": "Africa",
        "cover1": "#0033ff",
        "cover2": "#5533eb",
        "lightText": false,
        "isbn": "9780062851826",
        "rating": 4.3,
        "why": "Efosa Ojomo’s African cases make this the book we argue about most in cohort.",
        "published": "2019",
        "publisher": "Harper Business",
        "pages": "368",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Ascend Africa sessions",
        "timeToRead": "About 5 hours",
        "ideas": [
          "Market-creating innovation builds prosperity, aid rarely does",
          "Non-consumption is the biggest market",
          "Pull, not push, creates lasting institutions"
        ],
        "summary": "Efosa Ojomo’s African cases make this the book we argue about most in cohort. Market-creating innovation builds prosperity, aid rarely does Non-consumption is the biggest market.",
        "notes": "Efosa Ojomo’s African cases make this the book we argue about most in cohort.",
        "applications": "Read before the Africa deep dives. Bring one non-consumption example.",
        "critique": "Repetitive, and light on how investors should act.",
        "connections": [
          "Ascend Africa",
          "Africa’s Business Revolution"
        ]
      },
      {
        "title": "The Hard Thing About Hard Things",
        "author": "Ben Horowitz",
        "shelf": "Founders",
        "cover1": "#0a0f24",
        "cover2": "#00f2ff",
        "lightText": false,
        "isbn": "9780062273208",
        "rating": 4.4,
        "why": "Read it to understand founders. You will sit across from people living these chapters.",
        "published": "2014",
        "publisher": "Harper Business",
        "pages": "304",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Founders & pitches sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "There is no recipe for the hard decisions",
          "Peacetime and wartime leaders are different animals",
          "Take care of the people, the product and the profits, in that order"
        ],
        "summary": "Read it to understand founders. You will sit across from people living these chapters. There is no recipe for the hard decisions Peacetime and wartime leaders are different animals.",
        "notes": "Read it to understand founders. You will sit across from people living these chapters.",
        "applications": "Use the chapters on layoffs and hiring when you reference-check founders.",
        "critique": "Self-mythologising in parts.",
        "connections": [
          "Founders & pitches",
          "Shoe Dog"
        ]
      },
      {
        "title": "Mastering the VC Game",
        "author": "Jeffrey Bussgang",
        "shelf": "Venture capital",
        "cover1": "#5533eb",
        "cover2": "#00ff04",
        "lightText": false,
        "isbn": "9781591844440",
        "rating": 3.9,
        "why": "An older book that still explains how partners think.",
        "published": "2010",
        "publisher": "Portfolio",
        "pages": "256",
        "format": "Paperback, audiobook",
        "readWhen": "Before the IC simulations sessions",
        "timeToRead": "About 3 hours",
        "ideas": [
          "Investors and founders are playing a repeated game",
          "Choose a VC like a cofounder",
          "The partnership dynamic decides the deal"
        ],
        "summary": "An older book that still explains how partners think. Investors and founders are playing a repeated game Choose a VC like a cofounder.",
        "notes": "An older book that still explains how partners think.",
        "applications": "Use the chapters on pitching to prepare for your IC simulations.",
        "critique": "Dated examples, some advice no longer applies.",
        "connections": [
          "IC simulations",
          "Secrets of Sand Hill Road"
        ]
      },
      {
        "title": "Atomic Habits",
        "author": "James Clear",
        "shelf": "Mindset",
        "cover1": "#ffff00",
        "cover2": "#00f2ff",
        "lightText": true,
        "isbn": "9780735211292",
        "rating": 4.3,
        "why": "The Fellowship asks a lot of your evenings. This helps.",
        "published": "2018",
        "publisher": "Avery",
        "pages": "320",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Your fourteen weeks sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "One percent better compounds",
          "Design the environment, not the willpower",
          "Identity first, outcomes later"
        ],
        "summary": "The Fellowship asks a lot of your evenings. This helps. One percent better compounds Design the environment, not the willpower.",
        "notes": "The Fellowship asks a lot of your evenings. This helps.",
        "applications": "Build a sourcing habit: ten founders a week, logged.",
        "critique": "Not everything in life is a habit.",
        "connections": [
          "Your fourteen weeks",
          "Deep Work"
        ]
      },
      {
        "title": "Deep Work",
        "author": "Cal Newport",
        "shelf": "Mindset",
        "cover1": "#00f2ff",
        "cover2": "#b0ff05",
        "lightText": true,
        "isbn": "9781455586691",
        "rating": 4.1,
        "why": "How most Fellows get through the memo weeks alongside a day job.",
        "published": "2016",
        "publisher": "Grand Central",
        "pages": "304",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Your fourteen weeks sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "Focus is a skill, and a scarce one",
          "Shallow work expands to fill the day",
          "Protect blocks of time like meetings"
        ],
        "summary": "How most Fellows get through the memo weeks alongside a day job. Focus is a skill, and a scarce one Shallow work expands to fill the day.",
        "notes": "How most Fellows get through the memo weeks alongside a day job.",
        "applications": "Block two deep sessions a week for the Fellowship.",
        "critique": "Preachy, and assumes a lot of control over your calendar.",
        "connections": [
          "Your fourteen weeks",
          "Atomic Habits"
        ]
      },
      {
        "title": "The Business of Venture Capital",
        "author": "Mahendra Ramsinghani",
        "shelf": "Venture capital",
        "cover1": "#0033ff",
        "cover2": "#00ff04",
        "lightText": false,
        "isbn": "9781119639688",
        "rating": 4.0,
        "why": "For the Fellows who want to run a fund one day. Reference, not a read-through.",
        "published": "2020",
        "publisher": "Wiley",
        "pages": "544",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Fund structure & mechanics sessions",
        "timeToRead": "About 7 hours",
        "ideas": [
          "Raising a fund is a sales process to LPs",
          "Portfolio construction is maths, not vibes",
          "Exits are planned from the first cheque"
        ],
        "summary": "For the Fellows who want to run a fund one day. Reference, not a read-through. Raising a fund is a sales process to LPs Portfolio construction is maths, not vibes.",
        "notes": "For the Fellows who want to run a fund one day. Reference, not a read-through.",
        "applications": "Use for the Fund structure module and any LP conversation.",
        "critique": "Dense and expensive.",
        "connections": [
          "Fund structure & mechanics",
          "The Power Law"
        ]
      },
      {
        "title": "Mindset",
        "author": "Carol Dweck",
        "shelf": "Mindset",
        "cover1": "#b0ff05",
        "cover2": "#ffff00",
        "lightText": true,
        "isbn": "9780345472328",
        "rating": 3.9,
        "why": "The Fellowship was built on this belief. Talent is the only entry requirement.",
        "published": "2006",
        "publisher": "Random House",
        "pages": "320",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Who it is for sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "Growth beats fixed",
          "Praise effort and process, not talent",
          "Failure is information"
        ],
        "summary": "The Fellowship was built on this belief. Talent is the only entry requirement. Growth beats fixed Praise effort and process, not talent.",
        "notes": "The Fellowship was built on this belief. Talent is the only entry requirement.",
        "applications": "Notice your own fixed-mindset moments in IC feedback.",
        "critique": "One idea stretched across a whole book.",
        "connections": [
          "Who it is for",
          "Atomic Habits"
        ]
      },
      {
        "title": "The Innovator’s Dilemma",
        "author": "Clayton Christensen",
        "shelf": "Startups",
        "cover1": "#5533eb",
        "cover2": "#00f2ff",
        "lightText": false,
        "isbn": "9780062060242",
        "rating": 4.1,
        "why": "The original. Read it before people misuse the word disruption around you.",
        "published": "1997",
        "publisher": "Harvard Business Review Press",
        "pages": "288",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Market mapping sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "Good companies fail by listening to their best customers",
          "Disruption starts at the low end",
          "New markets need new metrics"
        ],
        "summary": "The original. Read it before people misuse the word disruption around you. Good companies fail by listening to their best customers Disruption starts at the low end.",
        "notes": "The original. Read it before people misuse the word disruption around you.",
        "applications": "Use the low-end lens when assessing incumbents in a market map.",
        "critique": "Case studies are from the disk drive industry.",
        "connections": [
          "Market mapping",
          "The Prosperity Paradox"
        ]
      },
      {
        "title": "Crossing the Chasm",
        "author": "Geoffrey Moore",
        "shelf": "Startups",
        "cover1": "#0033ff",
        "cover2": "#b0ff05",
        "lightText": false,
        "isbn": "9780062292988",
        "rating": 4.0,
        "why": "Still the clearest model for go-to-market.",
        "published": "1991",
        "publisher": "Harper Business",
        "pages": "288",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Founders & pitches sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "Early adopters and the mainstream want different things",
          "Pick a beachhead and own it",
          "Whole product, not features"
        ],
        "summary": "Still the clearest model for go-to-market. Early adopters and the mainstream want different things Pick a beachhead and own it.",
        "notes": "Still the clearest model for go-to-market.",
        "applications": "Ask founders which beachhead they are crossing with.",
        "critique": "Enterprise tech lens, dated examples.",
        "connections": [
          "Founders & pitches",
          "Zero to One"
        ]
      },
      {
        "title": "High Growth Handbook",
        "author": "Elad Gil",
        "shelf": "Startups",
        "cover1": "#0a0f24",
        "cover2": "#b0ff05",
        "lightText": false,
        "isbn": "9781732265103",
        "rating": 4.2,
        "why": "Interviews with operators. Use it as a reference.",
        "published": "2018",
        "publisher": "Stripe Press",
        "pages": "368",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Growth & later stage sessions",
        "timeToRead": "About 5 hours",
        "ideas": [
          "Scaling breaks everything that worked at ten people",
          "Hire for the next stage, not this one",
          "Boards, secondaries and late rounds are their own craft"
        ],
        "summary": "Interviews with operators. Use it as a reference. Scaling breaks everything that worked at ten people Hire for the next stage, not this one.",
        "notes": "Interviews with operators. Use it as a reference.",
        "applications": "Useful when you cover Series B and beyond in dealflow.",
        "critique": "Silicon Valley specific.",
        "connections": [
          "Growth & later stage",
          "Blitzscaling"
        ]
      },
      {
        "title": "The Mom Test",
        "author": "Rob Fitzpatrick",
        "shelf": "Founders",
        "cover1": "#00ff04",
        "cover2": "#ffff00",
        "lightText": true,
        "isbn": "9781492180746",
        "rating": 4.4,
        "why": "Short and brilliant. Changes how you talk to founders and customers.",
        "published": "2013",
        "publisher": "CreateSpace",
        "pages": "136",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Diligence & references sessions",
        "timeToRead": "About 3 hours",
        "ideas": [
          "People lie to be nice, so ask about the past, not the future",
          "Commitment and advancement are the only real signals",
          "Bad conversations feel good"
        ],
        "summary": "Short and brilliant. Changes how you talk to founders and customers. People lie to be nice, so ask about the past, not the future Commitment and advancement are the only real signals.",
        "notes": "Short and brilliant. Changes how you talk to founders and customers.",
        "applications": "Use it in reference calls and customer calls for every memo.",
        "critique": "Thin, by design.",
        "connections": [
          "Diligence & references",
          "The Lean Startup"
        ]
      },
      {
        "title": "Blitzscaling",
        "author": "Reid Hoffman & Chris Yeh",
        "shelf": "Startups",
        "cover1": "#5533eb",
        "cover2": "#ffff00",
        "lightText": false,
        "isbn": "9781984822390",
        "rating": 3.7,
        "why": "Read it critically. Useful for understanding how some funds think.",
        "published": "2018",
        "publisher": "Crown Currency",
        "pages": "336",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Growth & later stage sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "Speed over efficiency when the market is winner-take-most",
          "Let fires burn",
          "Blitzscaling is a tool, not a religion"
        ],
        "summary": "Read it critically. Useful for understanding how some funds think. Speed over efficiency when the market is winner-take-most Let fires burn.",
        "notes": "Read it critically. Useful for understanding how some funds think.",
        "applications": "Debate it in cohort: when is blitzscaling wrong for an African market?",
        "critique": "Survivorship bias throughout.",
        "connections": [
          "Growth & later stage",
          "High Growth Handbook"
        ]
      },
      {
        "title": "The Cold Start Problem",
        "author": "Andrew Chen",
        "shelf": "Startups",
        "cover1": "#00f2ff",
        "cover2": "#5533eb",
        "lightText": true,
        "isbn": "9780062969743",
        "rating": 4.1,
        "why": "The best modern book on network effects.",
        "published": "2021",
        "publisher": "Harper Business",
        "pages": "400",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Market mapping sessions",
        "timeToRead": "About 5 hours",
        "ideas": [
          "Network effects start with an atomic network",
          "The hard side of the network matters most",
          "Escape velocity, then ceilings"
        ],
        "summary": "The best modern book on network effects. Network effects start with an atomic network The hard side of the network matters most.",
        "notes": "The best modern book on network effects.",
        "applications": "Use the atomic-network test on any marketplace deal.",
        "critique": "Repetitive after the first third.",
        "connections": [
          "Market mapping",
          "Crossing the Chasm"
        ]
      },
      {
        "title": "Super Founders",
        "author": "Ali Tamaseb",
        "shelf": "Founders",
        "cover1": "#b0ff05",
        "cover2": "#0033ff",
        "lightText": true,
        "isbn": "9781541768420",
        "rating": 4.0,
        "why": "Data on 200 unicorn founders. Useful for killing your own biases.",
        "published": "2021",
        "publisher": "PublicAffairs",
        "pages": "304",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Diligence & references sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "Most founder myths are wrong on the data",
          "Prior founding experience matters, age does not",
          "Markets and timing beat pedigree"
        ],
        "summary": "Data on 200 unicorn founders. Useful for killing your own biases. Most founder myths are wrong on the data Prior founding experience matters, age does not.",
        "notes": "Data on 200 unicorn founders. Useful for killing your own biases.",
        "applications": "Reread before you write founder assessments.",
        "critique": "Unicorn-centric, and correlation is not causation.",
        "connections": [
          "Diligence & references",
          "Angel"
        ]
      },
      {
        "title": "Range",
        "author": "David Epstein",
        "shelf": "Mindset",
        "cover1": "#ffff00",
        "cover2": "#00ff04",
        "lightText": true,
        "isbn": "9780735214484",
        "rating": 4.2,
        "why": "For every Fellow who thinks their background is the wrong one. It is not.",
        "published": "2019",
        "publisher": "Riverhead",
        "pages": "352",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Who it is for sessions",
        "timeToRead": "About 5 hours",
        "ideas": [
          "Generalists win in wicked learning environments",
          "Sampling periods are not wasted time",
          "Match quality matters more than head start"
        ],
        "summary": "For every Fellow who thinks their background is the wrong one. It is not. Generalists win in wicked learning environments Sampling periods are not wasted time.",
        "notes": "For every Fellow who thinks their background is the wrong one. It is not.",
        "applications": "Write down what your previous career taught you about a sector.",
        "critique": "Anecdote heavy.",
        "connections": [
          "Who it is for",
          "Mindset"
        ]
      },
      {
        "title": "Shoe Dog",
        "author": "Phil Knight",
        "shelf": "Founders",
        "cover1": "#0033ff",
        "cover2": "#ffff00",
        "lightText": false,
        "isbn": "9781501135910",
        "rating": 4.5,
        "why": "The best founder memoir we know. Read it for empathy.",
        "published": "2016",
        "publisher": "Scribner",
        "pages": "400",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Founders & pitches sessions",
        "timeToRead": "About 5 hours",
        "ideas": [
          "Cash flow nearly killed Nike every year",
          "Belief carries you further than a plan",
          "Great companies look chaotic from inside"
        ],
        "summary": "The best founder memoir we know. Read it for empathy. Cash flow nearly killed Nike every year Belief carries you further than a plan.",
        "notes": "The best founder memoir we know. Read it for empathy.",
        "applications": "Ask founders about cash, not just growth.",
        "critique": "Hindsight tidies the story.",
        "connections": [
          "Founders & pitches",
          "The Hard Thing About Hard Things"
        ]
      },
      {
        "title": "Principles",
        "author": "Ray Dalio",
        "shelf": "Mindset",
        "cover1": "#0a0f24",
        "cover2": "#00ff04",
        "lightText": false,
        "isbn": "9781501124020",
        "rating": 3.9,
        "why": "Skip the memoir half, read the work principles.",
        "published": "2017",
        "publisher": "Simon & Schuster",
        "pages": "592",
        "format": "Paperback, audiobook",
        "readWhen": "Before the IC simulations sessions",
        "timeToRead": "About 8 hours",
        "ideas": [
          "Radical transparency and believability-weighted decisions",
          "Pain plus reflection equals progress",
          "Write your principles down"
        ],
        "summary": "Skip the memoir half, read the work principles. Radical transparency and believability-weighted decisions Pain plus reflection equals progress.",
        "notes": "Skip the memoir half, read the work principles.",
        "applications": "Steal the idea of an issues log for your cohort team.",
        "critique": "Very long, very Bridgewater.",
        "connections": [
          "IC simulations",
          "Thinking, Fast and Slow"
        ]
      },
      {
        "title": "Thinking, Fast and Slow",
        "author": "Daniel Kahneman",
        "shelf": "Mindset",
        "cover1": "#5533eb",
        "cover2": "#b0ff05",
        "lightText": false,
        "isbn": "9780374533557",
        "rating": 4.2,
        "why": "The book behind most of what we teach about investment committee bias.",
        "published": "2011",
        "publisher": "Farrar, Straus and Giroux",
        "pages": "512",
        "format": "Paperback, audiobook",
        "readWhen": "Before the IC simulations sessions",
        "timeToRead": "About 7 hours",
        "ideas": [
          "Two systems, and system one runs the show",
          "Anchoring, availability and loss aversion are everywhere",
          "Noise is as dangerous as bias"
        ],
        "summary": "The book behind most of what we teach about investment committee bias. Two systems, and system one runs the show Anchoring, availability and loss aversion are everywhere.",
        "notes": "The book behind most of what we teach about investment committee bias.",
        "applications": "Name one bias in every IC debrief.",
        "critique": "Some studies have not replicated.",
        "connections": [
          "IC simulations",
          "Principles"
        ]
      },
      {
        "title": "The Next Africa",
        "author": "Jake Bright & Aubrey Hruby",
        "shelf": "Africa",
        "cover1": "#00ff04",
        "cover2": "#0033ff",
        "lightText": true,
        "isbn": "9781137279415",
        "rating": 3.9,
        "why": "A good first map of the continent for Fellows outside it.",
        "published": "2015",
        "publisher": "Thomas Dunne",
        "pages": "288",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Ascend Africa sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "Africa’s growth is driven by its private sector and its diaspora",
          "Tech leapfrogging is real but uneven",
          "Regional differences matter more than the continent average"
        ],
        "summary": "A good first map of the continent for Fellows outside it. Africa’s growth is driven by its private sector and its diaspora Tech leapfrogging is real but uneven.",
        "notes": "A good first map of the continent for Fellows outside it.",
        "applications": "Pair with the partner fund sessions on their home markets.",
        "critique": "Nearly a decade old.",
        "connections": [
          "Ascend Africa",
          "Africa’s Business Revolution"
        ]
      },
      {
        "title": "Pitch Anything",
        "author": "Oren Klaff",
        "shelf": "Founders",
        "cover1": "#00f2ff",
        "cover2": "#ffff00",
        "lightText": true,
        "isbn": "9780071752855",
        "rating": 3.7,
        "why": "Controversial in cohort. Useful for spotting technique, not for copying it.",
        "published": "2011",
        "publisher": "McGraw Hill",
        "pages": "240",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Founders & pitches sessions",
        "timeToRead": "About 3 hours",
        "ideas": [
          "Frames decide who controls a meeting",
          "Attention lasts twenty minutes",
          "Status is set before the pitch begins"
        ],
        "summary": "Controversial in cohort. Useful for spotting technique, not for copying it. Frames decide who controls a meeting Attention lasts twenty minutes.",
        "notes": "Controversial in cohort. Useful for spotting technique, not for copying it.",
        "applications": "Watch a pitch and name the frames.",
        "critique": "Manipulative in places.",
        "connections": [
          "Founders & pitches",
          "The Mom Test"
        ]
      },
      {
        "title": "Good to Great",
        "author": "Jim Collins",
        "shelf": "Mindset",
        "cover1": "#b0ff05",
        "cover2": "#5533eb",
        "lightText": true,
        "isbn": "9780066620992",
        "rating": 3.8,
        "why": "A classic, with caveats. Several of the great companies later failed.",
        "published": "2001",
        "publisher": "HarperBusiness",
        "pages": "320",
        "format": "Paperback, audiobook",
        "readWhen": "Before the Founders & pitches sessions",
        "timeToRead": "About 4 hours",
        "ideas": [
          "First who, then what",
          "The hedgehog concept",
          "Flywheels, not doom loops"
        ],
        "summary": "A classic, with caveats. Several of the great companies later failed. First who, then what The hedgehog concept.",
        "notes": "A classic, with caveats. Several of the great companies later failed.",
        "applications": "Use the hedgehog concept as a question for founders.",
        "critique": "Survivorship bias, famously.",
        "connections": [
          "Founders & pitches",
          "Range"
        ]
      }
    ],
  },
  resourcesZines: {
    eyebrow: "Field notes",
    heading: "Get a glimpse into *our comic universe.*",
    lede: "An illustrative series to simplify the world of investing and venture capital.",
    label: "Included VC field notes",
    zines: [
      {
        "title": "Sourcing",
        "short": "How Fellows find the founders nobody else has met yet",
        "long": "How Fellows find the founders nobody else has met yet. A short, illustrated guide written with alumni who have done it, with the mistakes we see most and the questions worth asking first.",
        "format": "Illustrated guide, 24 pages",
        "writtenBy": "Included VC team and alumni",
        "handedOut": "Month 1 of the Fellowship",
        "link": {
          "label": "Read it",
          "href": "#"
        }
      },
      {
        "title": "The memo",
        "short": "Writing an investment memo a partner will actually read",
        "long": "Writing an investment memo a partner will actually read. A short, illustrated guide written with alumni who have done it, with the mistakes we see most and the questions worth asking first.",
        "format": "Illustrated guide, 24 pages",
        "writtenBy": "Included VC team and alumni",
        "handedOut": "Month 2 of the Fellowship",
        "link": {
          "label": "Read it",
          "href": "#"
        }
      },
      {
        "title": "The IC",
        "short": "What happens in the room and how to hold your ground",
        "long": "What happens in the room and how to hold your ground. A short, illustrated guide written with alumni who have done it, with the mistakes we see most and the questions worth asking first.",
        "format": "Illustrated guide, 24 pages",
        "writtenBy": "Included VC team and alumni",
        "handedOut": "Month 3 of the Fellowship",
        "link": {
          "label": "Read it",
          "href": "#"
        }
      },
      {
        "title": "The first job",
        "short": "From Fellowship to fund: how alumni got hired",
        "long": "From Fellowship to fund: how alumni got hired. A short, illustrated guide written with alumni who have done it, with the mistakes we see most and the questions worth asking first.",
        "format": "Illustrated guide, 24 pages",
        "writtenBy": "Included VC team and alumni",
        "handedOut": "Month 4 of the Fellowship",
        "link": {
          "label": "Read it",
          "href": "#"
        }
      }
    ],
  },
  resourcesJournal: {
    eyebrow: "The Included VC Journal",
    heading: "Immerse yourself *in the world of venture.*",
    lede: "Essays, explainers and field notes from the team, instructors and partner funds. Placeholder posts for now, real ones as they are published.",
    featured: {
      "kicker": "Featured · Venture capital",
      "title": "What an IC actually argues about",
      "text": "A walk through a real investment committee, anonymised. What gets debated, what gets skipped, and the three questions that decide most votes.",
      "meta": "9 min read · 5 September 2026 · Included VC team",
      "link": {
        "label": "Read the article",
        "href": "#"
      }
    },
    posts: [
      {
        "category": "Africa",
        "title": "Four funds explain how they source in Lagos",
        "meta": "7 min read · 22 August 2026",
        "href": "#"
      },
      {
        "category": "Careers",
        "title": "From Fellow to Associate in nine months",
        "meta": "6 min read · 8 August 2026",
        "href": "#"
      },
      {
        "category": "Fund operations",
        "title": "The quiet work: portfolio reporting that LPs read",
        "meta": "8 min read · 25 July 2026",
        "href": "#"
      },
      {
        "category": "Founders",
        "title": "How to read a founder in 30 minutes",
        "meta": "5 min read · 11 July 2026",
        "href": "#"
      },
      {
        "category": "Deal flow",
        "title": "Why the best deals rarely arrive by email",
        "meta": "6 min read · 27 June 2026",
        "href": "#"
      },
      {
        "category": "Mindset",
        "title": "Learning in public, in a cohort of strangers",
        "meta": "4 min read · 13 June 2026",
        "href": "#"
      },
      {
        "category": "Venture capital",
        "title": "Term sheets: the five clauses that matter",
        "meta": "10 min read · 30 May 2026",
        "href": "#"
      },
      {
        "category": "Africa",
        "title": "Why pan-African cohorts change how you invest",
        "meta": "7 min read · 16 May 2026",
        "href": "#"
      },
      {
        "category": "Programme",
        "title": "Inside a masterclass with the funds behind Ascend",
        "meta": "6 min read · 2 May 2026",
        "href": "#"
      },
      {
        "category": "Careers",
        "title": "What hiring partners told us they look for",
        "meta": "5 min read · 18 April 2026",
        "href": "#"
      }
    ],
    cta: { label: "All articles", href: "#" },
  },
  resourcesVideos: {
    heading: "Impact stories",
    videos: [
      {
        "title": "#BeIncluded",
        "vimeoId": "641942833"
      },
      {
        "title": "Join Included",
        "vimeoId": "443372334"
      }
    ],
  },
  resourcesNewsletter: {
    eyebrow: "Join the family",
    heading: "Join *55,000+* people changing the face of venture.",
    lede: "One email a month. Application windows, events, Fellow stories.",
    to: "hello@included.vc",
    selectLabel: "Which best describes you",
    options: ["Aspiring Fellow", "Ascend applicant", "Investor", "Entrepreneur", "Other"],
    button: "Subscribe",
    done: "Subscribed ✦",
  },
};

export const resourcesSections = [
  { key: "resourcesMeta", label: "Search & sharing", description: "Page title and description." },
  { key: "resourcesShelf", label: "The reading shelf", description: "The books and their pages." },
  { key: "resourcesZines", label: "Field notes", description: "The illustrated guides." },
  { key: "resourcesJournal", label: "The Journal", description: "Featured article and posts." },
  { key: "resourcesVideos", label: "Impact stories", description: "The videos." },
  { key: "resourcesNewsletter", label: "Newsletter", description: "The sign-up block." },
] as const;

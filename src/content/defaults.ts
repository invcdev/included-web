/**
 * Default content: what the page shows when no database is connected, and
 * the seed for the database when it is. Edit the live site through the admin
 * portal; edit this file only to change the fallback.
 *
 * TODO: placeholder images (cropped from the designs) live under /public and
 * should be replaced in Cloudinary through the admin.
 */
import { ALUMNI_LOGOS } from "@/components/home/alumniData";
import { FLAGS } from "@/components/home/flagData";
import { GLOBE_LOGOS } from "@/components/home/globeData";
import type { ImageContent, SiteContent } from "./schema";
import { pageDefaults } from "./pages";
import { africaDefaults } from "./africaDefaults";

type MonthEvent = SiteContent["month"]["weeks"][number]["events"][number];

/** A local placeholder image. */
const img = (url: string, width: number, height: number, alt = ""): ImageContent => ({ url, alt, width, height });

const ENROL = { label: "Take your seat", href: "/save-the-date" };
const SEAT_NOTE = "About ten minutes, start to finish.";
const FOURTEEN = ["Fourteen Tuesdays. Starts 5 January 2027."];

/* Week descriptions, from the supplied HTML. */
const WEEK_DETAILS: Record<number, string> = {
  1: "Where the industry came from, why it works the way it does, who allocates capital and who really decides.",
  2: "How a fund is built, who it answers to and how the money moves. LPs, GPs, fund size and the 2 and 20 fee model.",
  3: "Portfolio construction, reserves, ownership targets and the maths of a power law.",
  4: "Where great companies come from, how investors build a pipeline, and how to get on one.",
  5: "Reading a deck and a data room quickly. Business models, market shifts and what comes next.",
  6: "Does the business make money per customer? Learn to tell, fast, and what to do when it does not.",
  7: "The numbers behind a deal, built by hand until they make sense rather than copied from a template.",
  8: "Market, team, product, traction. Reference calls and the questions that get real answers.",
  9: "Build a point of view the industry can argue with, then write the document that carries a deal.",
  10: "A live investment committee exercise. You present a deal, you defend it, and you get challenged the way investors challenge each other.",
  11: "Pre and post money, ownership, dilution, option pools and how a round actually gets done.",
  12: "Term sheets, shareholder agreements and the fine print that quietly decides outcomes years later.",
  13: "How returns are realised, from IPO to acquisition, and what happens when things go wrong instead.",
  14: "Landing the role: applications, interviews, brand and network. Plus your Deep Dive presentation.",
};

/* ---- Lists moved verbatim from the components ---- */

const heroGlance = [
  { label: "Starts", value: "Tuesday 5 January 2027, the first Tuesday of the year" },
  { label: "Live", value: "14 Tuesdays, 16:00–18:30 UK time" },
  { label: "Format", value: "Online and live, no recordings sent out" },
  { label: "Tracks", value: "Global or Africa" },
  { label: "Enrolment closes", value: "Monday 4 January 2027" },
];

const heroStats = [
  { value: "55,000+", label: "people follow Included VC" },
  { value: "7 years", label: "of partner-funded investment education" },
  { value: "100+", label: "countries have applied to Included VC programmes" },
];

const introStats = [
  { value: "14", title: "live sessions", text: "Tuesdays, 16:00 to 18:30 UK time" },
  {
    value: "3",
    title: "pieces of real work",
    text: "An investment memo, an investment committee and a Deep Dive",
  },
  { value: "2", title: "tracks", text: "Global, or Africa with six extra sessions" },
  { value: "1", title: "cohort", text: "Everyone in the same room on Tuesdays" },
];

const climbStages = [
  {
    n: "01",
    title: "Informed",
    text: "You know what an investor does and how a round comes together.",
  },
  {
    n: "02",
    title: "Fluent",
    text: "You can read a deck and say what is missing from it.",
    note: "Where many people start",
  },
  {
    n: "03",
    title: "Analytical",
    text: "You can build the model and defend the assumption underneath it.",
  },
  {
    n: "04",
    title: "Decisive",
    text: "You can write the memo, take it into the room and hold your position.",
    note: "What fourteen weeks is built to reach",
    highlight: true,
  },
  {
    n: "05",
    title: "Trusted",
    text: "Founders call you before the round is priced. This one takes years, not weeks. Ascend is where it starts.",
  },
];

const outcomeCards = [
  {
    title: "Industry insight",
    text: "How capital moves and who gets it. Working knowledge, not theory.",
    colour: "#5035E2",
  },
  {
    title: "Time with investors",
    text: "Hours in the room with the people who teach you. A first conversation, not a cold email.",
    colour: "#53ABF2",
  },
  {
    title: "Work to show for it",
    text: "An investment memo, a live investment committee under your belt, and a published Deep Dive with your name on it.",
    colour: "#7AF3B8",
  },
  {
    title: "A global network",
    text: "A cohort from all over the world, and the wider Included VC community.",
    colour: "#C2FD51",
  },
];

const monthMasterclass: MonthEvent = {
  day: "Tue",
  kind: "masterclass",
  title: "Masterclass",
  meta: "16:00–18:30 UK time, everyone",
};

const monthAfrica: MonthEvent = { day: "Thu", kind: "africa", title: "Africa masterclass", meta: "90 min, Africa track" };

const monthOffice: MonthEvent = { day: "Thu", kind: "office", title: "Office hours", meta: "Optional" };

const monthWeeks: { n: number; label: string; events: MonthEvent[] }[] = [
  {
    n: 1,
    label: "Week one",
    events: [monthMasterclass, { day: "Wed", kind: "task", title: "Task set", meta: "Due in two weeks" }, monthAfrica, monthOffice],
  },
  { n: 2, label: "Week two", events: [monthMasterclass, monthOffice] },
  {
    n: 3,
    label: "Week three",
    events: [monthMasterclass, { day: "Wed", kind: "task", title: "Task due", meta: "Submit your work" }, monthAfrica],
  },
  {
    n: 4,
    label: "Week four",
    events: [
      monthMasterclass,
      { day: "Wed", kind: "task", title: "Feedback", meta: "On your task" },
      { day: "Wed", kind: "task", title: "Next task set" },
      monthAfrica,
      monthOffice,
    ],
  },
];

const monthStats = [
  { value: "2.5 hrs", label: "live, every Tuesday" },
  { value: "5–10 hrs", label: "a week in total, including the live session" },
  { value: "+90 min", label: "on six Thursdays for the Africa track" },
];

const facultyPeople = [
  { name: "Reshma Sohoni", photo: "reshma-sohoni" },
  { name: "Simon Schmincke", photo: "simon-schmincke" },
  { name: "Oscar Farres", photo: "oscar-farres" },
  { name: "Itxaso del Palacio", photo: "itxaso-del-palacio" },
  { name: "Andy Leaver", photo: "andy-leaver" },
  { name: "Brad Doline", photo: "brad-doline" },
  { name: "Carlos Eduardo Espinal", photo: "carlos-eduardo-espinal" },
  { name: "Maria Dramalioti-Taylor", photo: "maria-dramalioti-taylor" },
  { name: "Chris Tottman", photo: "reshma-sohoni" },
  { name: "Daniel Blomquist", photo: "simon-schmincke" },
  { name: "Daniel Glazer", photo: "oscar-farres" },
  { name: "Felix Martinez", photo: "itxaso-del-palacio" },
].map((f) => ({ ...f, role: "[Title \u00b7 Fund]" }));

const jigsawPeople = [
  "People with disabilities",
  "Athletes and ex-professional sport",
  "A DJ",
  "Armed forces veterans",
  "Doctors and dentists",
  "PhD researchers",
  "Lawyers",
  // "You" sits here (centre)
  "Engineers",
  "Teachers",
  "New parents",
  "Career changers in their 40s and 50s",
  "A surgeon",
  "First-generation graduates",
  "An opera singer",
];

const audienceGroups = [
  {
    title: "Getting in",
    text: "The grounding to talk about funds, deals and decisions with real understanding, and the network to make a start.",
    tags: ["Aspiring investors", "Graduates", "Career changers"],
  },
  {
    title: "Getting better",
    text: "The structure many people in and around investment were never formally taught, and a cohort outside your usual circle.",
    tags: ["Emerging investors", "Existing investors", "Angel investors"],
  },
  {
    title: "Building companies",
    text: "Learn how the people across the table think, before you raise. Read a term sheet the way an investor reads it.",
    tags: ["Founders", "Operators"],
  },
  {
    title: "Curious about capital",
    text: "Tech, law, consulting, media. You want to understand how capital moves and who decides where it goes.",
    tags: ["Analysts and professionals"],
  },
];

const storyItems = [
  {
    kind: "feature",
    area: "a",
    quote: "\u201cIncluded VC gave me all the benefits of being a \u2018nepo baby\u2019 without having been born into privilege.\u201d",
    name: "Amisha Kalra",
    role: "Advent International, Fellow 2024",
  },
  {
    kind: "card",
    area: "b",
    quote: "\u201cI got my first job in VC thanks to Included VC. The moment the team heard I\u2019d gotten into Included VC, something shifted.\u201d",
    name: "Soo Min Hong",
    role: "Analyst, Pale Blue Dot, Fellow 2020",
  },
  {
    kind: "card",
    area: "c",
    quote: "\u201cIncluded VC was a life-changing experience. The depth shared by practitioners from top-performing funds took it to the next level.\u201d",
    name: "Lucas Kuziv",
    role: "Investor, Beacon Capital, Fellow 2022",
  },
  {
    kind: "feature",
    area: "d",
    quote: "\u201cIncluded VC is the warp-speed ticket into the world of VC.\u201d",
    name: "Leen Segers",
    role: "Managing Director, ForsVC, Fellow 2023",
  },
  {
    kind: "wide",
    area: "e",
    quote: "\u201cI graduated with a wealth of unspoken insights that can be found nowhere outside of this Fellowship.\u201d",
    name: "Sijue Zhao",
    role: "Included VC Fellow 2022",
  },
  {
    kind: "card",
    area: "f",
    quote: "\u201cWhat truly resonates with me is the newfound confidence and the invaluable, diverse network that has become a lifelong asset.\u201d",
    name: "Sudarshan GC",
    role: "Included VC Fellow 2025",
  },
];

const storyStats = [
  { value: [{ t: "7 years", i: true }], label: "of investment education, funded by partners", colour: "var(--brand)" },
  { value: [{ t: "5" }], label: "Fellows now Partners. All five are women.", colour: "#4194A0" },
  { value: [{ t: "500" }, { t: "+", i: true }], label: "pieces of research published by Fellows", colour: "#678826" },
  { value: [{ t: "40" }, { t: "+", i: true }], label: "countries represented in a single cohort", colour: "var(--ink)" },
];

const dealTerms = [
  {
    title: "Show up live",
    text: "Sessions are live, and recordings are not sent out. Miss one and you can join the watch party two weeks later. Tuesdays are the one thing we ask you to protect.",
    colour: "var(--brand)",
  },
  {
    title: "Do the work between sessions",
    text: "You will write an investment memo, take it to a live investment committee and publish a Deep Dive. Five to ten hours a week, including the live time.",
    colour: "#6BE7FB",
  },
  {
    title: "Bring something to the cohort",
    text: "Participation is expected. You will be asked for your view, and the people next to you will be better for hearing it.",
    colour: "var(--lime)",
  },
];

const ticketDetails = [
  { label: "Starts", value: "Tue 5 Jan 2027" },
  { label: "Doors", value: "16:00\u201318:30 UK time" },
  { label: "Sessions", value: "14, live" },
  { label: "Venue", value: "Online" },
];

const ticketFeatures = [
  {
    title: "14 live sessions",
    text: "Taught live by practising investors, with you in the room.",
  },
  {
    title: "Office hours",
    text: "Open Zoom sessions between classes. Bring half-formed questions.",
  },
  {
    title: "A live investment committee",
    text: "Present a deal to a live investment committee and defend it under questioning.",
  },
  {
    title: "Your Deep Dive",
    text: "The long-form research Included VC is known for, published with your name on it.",
  },
  {
    title: "Slack community",
    text: "Your cohort in one dedicated Slack, between sessions and after them.",
  },
  {
    title: "Certificate",
    text: "Complete the programme and you are an Included VC Ascender, Class of 2027.",
  },
];

const promiseItems: [string, string][] = [
  ["Live teaching", " from people who invest for a living"],
  [
    "A curriculum that follows a deal",
    " in the order it happens, from first meeting to exit",
  ],
  ["Real tasks with real feedback", " on your work"],
  ["A room where every question is welcome", ""],
  ["A certificate", " when you complete the programme"],
];

const cannotItems: [string, string][] = [
  [
    "A job, a promotion or an investment return.",
    " No programme can honestly promise those",
  ],
  [
    "Who you will meet.",
    " Fourteen weeks in one room builds a network, and it belongs to the people who build it",
  ],
  [
    "What follows.",
    " Introductions and roles do happen. They are not ours to guarantee",
  ],
];

const valueItems = [
  {
    n: "01",
    title: "Kindness",
    short: "Kindness",
    text: "Kindness is the baseline. It means being respectful, responsive and decent in how you speak, show up, give feedback and treat your cohort.",
  },
  {
    n: "02",
    title: "Pay it forward (and backward)",
    short: "Pay it forward",
    text: "Our fellowships are made possible by people who gave without asking for anything in return. We assume you will pay it forward, and backward too.",
  },
  {
    n: "03",
    title: "Don\u2019t compete",
    short: "Don\u2019t compete",
    text: "Everyone here is ambitious, but this isn\u2019t a zero-sum game. You\u2019re not here to outshine others; you\u2019re here to light them up. We lift as we climb.",
  },
  {
    n: "04",
    title: "Sparkle",
    short: "Sparkle",
    text: "Sparkle is how you show up: the clarity in your thinking, the way you follow through, and the standard you set in every room.",
  },
];

const joinSteps = [
  {
    n: "01",
    title: "Answer a few questions",
    text: "Why you want to join, what you want to be able to do by week fourteen, and which track fits. It isn\u2019t a test, and nobody is screened out.",
  },
  {
    n: "02",
    title: "Confirm your place",
    text: "Pay the commitment fee in your own currency. You see the full amount before you confirm, and the seat is yours the moment it goes through.",
  },
  {
    n: "03",
    title: "Get your confirmation",
    text: "The dates for your calendar and everything you need to join the first session.",
  },
];

const tldrFacts = [
  {
    k: "Programme",
    v: "Ascend by Included VC",
    b: "The Global Investment Academy: fourteen live weeks on how investment really works, taught by investors from the funds behind Included VC.",
    at: [50, 46],
  },
  {
    k: "Format",
    v: "Fourteen live sessions",
    b: "Two and a half hours every Tuesday with working investors, plus open office hours between sessions and work you do on your own. Sessions are live and recordings are not sent out, because the room is the point. If you miss one, there is a watch party two weeks later.",
    at: [22, 20],
  },
  {
    k: "Schedule",
    v: "Every Tuesday, 16:00 to 18:30 UK time",
    b: "One session a week, same slot, for fourteen consecutive Tuesdays. Times on this page convert to your own timezone automatically. The slot never moves, wherever you are.",
    at: [78, 18],
  },
  {
    k: "Starts",
    v: "Tuesday 5 January 2027",
    b: "Week one is also your onboarding: the dates for your calendar, how the fourteen weeks run, and your invitation to the Slack community, all in the first session.",
    at: [12, 56],
  },
  {
    k: "Ends",
    v: "Tuesday 6 April 2027",
    b: "The final session is Deep Dive presentations, where you show the research you have spent the programme building. Your certificate follows completion, and you stay in the community afterwards.",
    at: [88, 52],
  },
  {
    k: "Time",
    v: "About 5 to 10 hours a week",
    b: "The live session plus reading, a memo, diligence work and your Deep Dive. Many people will do this alongside work.",
    at: [33, 78],
  },
  {
    k: "Tracks",
    v: "Global, or Africa with six extra sessions",
    b: "One cohort, one programme, one room on Tuesdays. Choose Ascend Africa and you add six Thursday sessions on African investment markets with the funds shaping them.",
    at: [68, 80],
  },
  {
    k: "Fee",
    v: "\u00a3197 + VAT",
    b: "A one-off commitment fee, not tuition. Shown in your own currency before you pay. No tiers and no upsells: everyone has the same seat, on either track.",
    at: [50, 10],
  },
  {
    k: "Funded by",
    v: "Our partners",
    b: "The teaching, faculty, platform and community are paid for by the funds and institutions that have backed Included VC since 2019.",
    at: [8, 36],
  },
  {
    k: "Language",
    v: "All sessions taught in English",
    b: "Live sessions, office hours and written work are in English, with live captions. The cohort spans more than forty countries, so plain language is the house style.",
    at: [92, 34],
  },
  {
    k: "Certificate",
    v: "Included VC Ascender",
    b: "Complete the programme and your certificate names you an Included VC Ascender, Class of 2027.",
    at: [24, 94],
  },
  {
    k: "Enrolling",
    v: "A short form, then your seat",
    b: "The form helps you make a considered decision and tells us who is in the room. Nobody is screened out. Your place is confirmed the moment you pay. Enrolment closes Monday 4 January 2027.",
    at: [76, 95],
  },
  {
    k: "Community",
    v: "Slack, plus live office hours",
    b: "Your cohort gets a dedicated Slack, and you join the wider Included VC community, which stays with you after week fourteen.",
    at: [40, 30],
  },
  {
    k: "Payment",
    v: "Card, Apple Pay, Google Pay, bank transfer",
    b: "Pay in your own currency. Mobile money and local cards are available for Africa. The full amount is shown before you confirm, and an invoice is available for your employer.",
    at: [62, 62],
  },
  {
    k: "After you join",
    v: "Confirmation, then week one",
    b: "You get a confirmation email with the dates for your calendar and everything you need to join the first session on Tuesday 5 January. Nothing else is required of you before then.",
    at: [50, 80],
  },
];

const faqGroups: { title: string; items: [string, string][] }[] = [
  {
    title: "Fee and payment",
    items: [
      [
        "Why is there a fee?",
        "The learning is partner-funded. The commitment is yours. Our partners have covered the teaching, the faculty and the platform. What they can\u2019t fund is you turning up. So there is a one-off commitment fee. It isn\u2019t tuition. It is your side of the arrangement: a signal to yourself, and to everyone learning beside you, that your seat will be used. It also helps keep Included VC running for the people who come after you.",
      ],
      [
        "How much is it?",
        "\u00a3197 + VAT, as one payment. You see the full amount in your own currency before you pay. It is the same for both tracks.",
      ],
      [
        "How do I pay?",
        "By card, Apple Pay, Google Pay or bank transfer, in your own currency. Mobile money and local cards are available across Africa. You get a receipt, and a VAT invoice where required.",
      ],
      [
        "Can my employer pay?",
        "Often, yes. We can send an invoice in your name, plus a one-page summary of the programme for whoever signs it off. Ask us before you check out.",
      ],
      [
        "Is the fee refundable?",
        "No. A commitment you can undo isn\u2019t one. Please check you can make the fourteen Tuesdays before you take your seat.",
      ],
    ],
  },
  {
    title: "Enrolling and dates",
    items: [
      [
        "What exactly is Ascend?",
        "Ascend is Included VC\u2019s Global Investment Academy: fourteen live weeks on how investment really works, taught by investors from the funds that back Included VC. Between sessions you do the work: memos, diligence and your own Deep Dive.",
      ],
      [
        "How do I enrol?",
        "A short form asks why you want to join, what you want to be able to do by week fourteen, and which track fits. It isn\u2019t a test. Your place is confirmed when you pay.",
      ],
      [
        "Is there a selection process?",
        "No. There is no panel and no interview. Ascend is open to anyone aged 18 or over who can commit to the fourteen Tuesdays and the work between them.",
      ],
      [
        "When does it start and end?",
        "The first session is Tuesday 5 January 2027, and onboarding happens in that session. It runs for fourteen consecutive Tuesdays, finishing on Tuesday 6 April 2027. Sessions run 16:00 to 18:30 UK time, shown in your own timezone further up this page.",
      ],
      [
        "When does enrolment close?",
        "Monday 4 January 2027. The first session is the next day.",
      ],
      [
        "Which track should I choose?",
        "If you live in Africa, invest in Africa, or want to, choose Ascend Africa. It is the same fourteen Tuesdays as Ascend Global, plus six Thursday sessions on African investment markets. Otherwise choose Ascend Global. Everyone is in the same room on Tuesdays.",
      ],
      [
        "I registered my interest earlier. What now?",
        "This page is where you confirm your place. Use the same email you registered with and your details will already be there.",
      ],
      [
        "What happens after I join?",
        "You get a confirmation email with the dates for your calendar and everything you need to join the first session. Your Slack invitation comes in week one.",
      ],
    ],
  },
  {
    title: "Time and participation",
    items: [
      [
        "How much time does it take?",
        "About 5 to 10 hours a week: the live session, plus reading and the work between sessions. Many people will do this alongside work.",
      ],
      [
        "The sessions are in my working day. What do I do?",
        "Block Tuesdays now. If you need your employer\u2019s agreement, we can send a one-page summary that covers the time as well as the fee.",
      ],
      [
        "Do you send out recordings?",
        "No, and that is deliberate. A recording is a promise to watch later, and later rarely comes. Ascend works because everyone is in the room at the same time, asking questions while the speaker is still there to answer them. If you miss a Tuesday, you get the session notes. Two weeks later there is a watch party, where the session is shown again at a set time with others from your cohort.",
      ],
      [
        "What if I miss a session?",
        "You get the session notes, and two weeks later there is a watch party, where the session is shown again at a set time with others from your cohort. Office hours help you catch up too. Recordings are not sent out. Each week builds on the last, so the more Tuesdays you keep, the more you get out of it.",
      ],
      ["What language are the sessions in?", "English, with live captions."],
      [
        "How is this different from watching talks online?",
        "Talks give you the vocabulary. Ascend gives you a real deal to assess, a committee to defend it in front of, and a memo with your name on it.",
      ],
    ],
  },
  {
    title: "Is it for me?",
    items: [
      [
        "Do I need a finance background?",
        "No. Included VC has taught doctors, lawyers, teachers, engineers, researchers, musicians, athletes, founders and new parents. What you need is the willingness to do the reading and argue a position.",
      ],
      [
        "I already work in investment. Is this for me?",
        "Yes. Plenty of people in and around investment were never taught the mechanics properly: fund structure, the 2 and 20, cap tables, term sheets and how a committee actually decides.",
      ],
      [
        "Is there an age or location limit?",
        "You need to be 18 or over. Beyond that, no. If you can make Tuesdays, you can join from anywhere.",
      ],
      [
        "What if I\u2019m out of my depth?",
        "You won\u2019t be the only one. Every question is welcome, and the person next to you is probably wondering the same thing. Kindness is the first of our four values for a reason.",
      ],
      [
        "What will I get out of it?",
        "You\u2019ll understand how capital is allocated, from sourcing to exits, and you\u2019ll have done the work to show for it: a memo, an investment committee and a published Deep Dive. What you do with that is up to you.",
      ],
      [
        "Will Ascend get me a job in venture capital?",
        "We can\u2019t promise that, and nobody honestly can. You leave with the knowledge, an investment memo, an investment committee exercise and published research. What you do with them is up to you.",
      ],
    ],
  },
  {
    title: "Partners and community",
    items: [
      [
        "Who are the partners?",
        "The funds and institutions that have backed Included VC since 2019, from Seedcamp and Creandum to HSBC, the European Investment Fund and a growing group of African funds and development partners.",
      ],
      [
        "Do I get a certificate?",
        "Yes. Complete Ascend and your certificate names you an Included VC Ascender, Class of 2027.",
      ],
      [
        "Is there a community?",
        "Yes. Everyone on Ascend joins a dedicated Slack to connect, ask questions and share ideas between sessions, and there are live office hours on Zoom. Alumni call themselves the #INVCMafia. Their name, not ours.",
      ],
      [
        "What happens after week fourteen?",
        "You stay part of the Included VC community.",
      ],
    ],
  },
  {
    title: "Included VC",
    items: [
      [
        "Is the Included VC Fellowship running this year?",
        "This year, Ascend is our programme. The Investor Fellowship continues by partner nomination, for professionals already investing across Africa.",
      ],
      [
        "I\u2019m an Included VC alum. What does this mean for me?",
        "You\u2019re already part of the community Ascend joins. If you\u2019d like to teach, mentor or help, email us.",
      ],
    ],
  },
];

const footerColumns = [
  {
    title: "Programme",
    links: [
      { label: "Ascend", href: "/" },
      { label: "Ascend Africa", href: "/ascend-africa" },
      { label: "The curriculum", href: "/programme#curriculum" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Included VC",
    links: [
      { label: "About", href: "/about" },
      { label: "Instructors & Mentors", href: "/instructors" },
    ],
  },
  {
    title: "Follow",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/includedvc",
      },
      { label: "Twitter", href: "https://twitter.com/INCLUDED_VC" },
      { label: "Medium", href: "https://medium.com/included-vc" },
      { label: "Instagram", href: "https://www.instagram.com/included.vc/" },
      { label: "hello@included.vc", href: "mailto:hello@included.vc" },
    ],
  },
];

const curriculumBlocks: { label: string; title: string; weeks: { n: number; title: string }[] }[] = [
  {
    label: "Weeks 1 to 3",
    title: "How funds work",
    weeks: [
      { n: 1, title: "History & shape of VC" },
      { n: 2, title: "Fund structure & mechanics" },
      { n: 3, title: "Fund economics" },
    ],
  },
  {
    label: "Weeks 4 to 6",
    title: "Finding deals",
    weeks: [
      { n: 4, title: "Dealflow sourcing" },
      { n: 5, title: "First screen & market maps" },
      { n: 6, title: "Unit economics" },
    ],
  },
  {
    label: "Weeks 7 to 10",
    title: "Judging deals",
    weeks: [
      { n: 7, title: "Financial modelling" },
      { n: 8, title: "Due diligence" },
      { n: 9, title: "Investment theses & memos" },
      { n: 10, title: "The investment committee" },
    ],
  },
  {
    label: "Weeks 11 to 14",
    title: "Doing deals",
    weeks: [
      { n: 11, title: "Cap tables & term sheets" },
      { n: 12, title: "Legals & beyond" },
      { n: 13, title: "Exits & acquisitions" },
      { n: 14, title: "Careers in VC & your Deep Dive" },
    ],
  },
];

/* ---- The page ---- */

const homeDefaults: Omit<SiteContent, `africa${string}`> = {
  meta: {
    title: "Ascend by Included VC",
    description:
      "Ascend by Included VC: a 14-week live investment academy taught by practising investors. Partner-funded. Starts Tuesday 5 January 2027.",
  },

  header: {
    logo: img("/brand/logo-placeholder.png", 257, 71, "Included VC"),
    nav: [
      { label: "Who it's for", href: "#who-its-for" },
      { label: "Curriculum", href: "#curriculum" },
      { label: "Faculty", href: "#faculty" },
      { label: "What you get", href: "#what-you-get" },
      { label: "How to join", href: "#how-to-join" },
      { label: "FAQs", href: "#faqs" },
    ],
    cta: ENROL,
  },

  openDoor: {
    brand: "ASCEND",
    brandSub: "by Included VC",
    replayLabel: "Replay the opening",
    eyebrow: "The Global Investment Academy by Included VC",
    messages: [
      {
        heading: "The door to venture capital is **open.**",
        lede: "Learn how unicorns get backed, in fourteen live weeks with practising investors. Join from anywhere in the world.",
      },
      {
        heading: "Learn how venture capital **really works.**",
        lede: "Fourteen live weeks with practising investors. Global and Africa tracks, joined from anywhere.",
      },
      {
        heading: "One live room, joined from **anywhere.**",
        lede: "Fourteen Tuesdays with practising investors. Global and Africa tracks.",
      },
      {
        heading: "Learn how unicorns get **backed.**",
        lede: "How a fund works, how a deal gets done and how a committee decides.",
      },
    ],
    rotateSeconds: 60,
    primaryCta: { label: "Apply now", href: "/save-the-date" },
    secondaryCta: { label: "View curriculum", href: "#curriculum" },
  },

  hero: {
    kicker: { step: "01 / 05", label: "What it is" },
    eyebrow: "Ascend: the Global Investment Academy by Included VC",
    heading: "Fourteen Tuesdays inside venture capital.",
    lede: "Taught live by people who invest for a living, and funded by our partners. You learn how a deal gets done, then you do it yourself.",
    callout: "**The learning is partner-funded.** The commitment is yours.",
    primaryCta: ENROL,
    secondaryCta: { label: "View curriculum", href: "#curriculum" },
    glanceTitle: "The programme at a glance",
    glance: heroGlance,
    fee: { label: "Commitment fee", value: "\u00a3197 + VAT" },
    stats: heroStats,
    note: {
      text: "Registered your interest earlier?",
      link: { label: "This is where you confirm your place.", href: "#how-to-join" },
    },
  },

  press: {
    label: "As featured in",
    outlets: [
      ["Forbes", "forbes", 216, 56],
      ["Sky News", "sky-news", 220, 57],
      ["Business Insider", "business-insider", 185, 58],
      ["Startups Magazine", "startups", 186, 59],
      ["Silicon Canals", "silicon-canals", 173, 57],
    ].map(([name, slug, w, h]) => ({
      name: name as string,
      logo: img(`/press/${slug}-placeholder.png`, w as number, h as number, name as string),
      colorLogo: img(`/press/${slug}-color.png`, w as number, h as number),
    })),
  },

  network: {
    eyebrow: "The network",
    heading: "The industry is paying for you to learn how it works.",
    body: "Ascend\u2019s teaching, faculty and platform are funded by partners of Included VC. Why would they? Because Included VC exists to change who gets to invest, and they have backed that since 2019.",
    groups: [
      { id: "global", eyebrow: "Global partners", heading: "The funds changing who gets to invest." },
      { id: "africa", eyebrow: "Africa partners", heading: "Building the continent\u2019s investment industry." },
    ],
    partners: GLOBE_LOGOS.map((l) => ({
      slug: l.slug,
      name: l.name,
      group: l.group,
      logo: img(`/partners/${l.slug}-placeholder.png`, l.w, l.h, l.name),
    })),
  },

  founderLetter: {
    photo: img("/team/nikita-thakrar-placeholder.jpg", 528, 660, "Nikita Thakrar"),
    name: "Nikita Thakrar",
    role: "Founder and CEO, Included VC",
    eyebrow: "A letter from the founder",
    quote:
      "\u201cOne of the hardest things about building an organisation around representation is knowing there are always more brilliant people outside the room than you can fit inside it.\u201d",
    body: "For seven years, we could only say yes to a few.",
    kicker: "So this year, we\u2019re opening the doors.",
    primaryCta: ENROL,
    secondaryCta: { label: "Read the full letter", href: "#founder-letter" },
  },

  introducing: {
    eyebrow: "Introducing",
    logo: img("/ascend/ascend-logo-placeholder.png", 1037, 226, "Ascend"),
    byline: img("/ascend/by-included-placeholder.png", 277, 65, "by Included VC"),
    stats: introStats,
    illustration: img(
      "/ascend/ascend-illustration-placeholder.jpg",
      932,
      931,
      "Collage of people climbing rising bar charts in the Ascend colours, helping each other up",
    ),
    tracksLabel: "Two tracks",
    tracks: ["Global", "Africa"],
  },

  seatCtas: {
    afterIntroducing: {
      testimonial: {
        quote: "\u201cIncluded VC is by far the best thing I\u2019ve ever been a part of.\u201d",
        name: "Sofia Haq",
        role: "Investment Associate, VamosVentures, Fellow 2021",
      },
      heading: ["Most resolutions have no start time.", "This one does: Tuesday 5 January, 16:00."],
      note: SEAT_NOTE,
      button: ENROL,
    },
    afterTuesdays: {
      testimonial: {
        quote: "\u201cCan I redo the Fellowship? That was my first question after the summit.\u201d",
        name: "Margarita de la Pe\u00f1a Virg\u00f3s",
        role: "Investment Lead LatAm, Zacua Ventures, Fellow 2023",
      },
      heading: FOURTEEN,
      note: SEAT_NOTE,
      button: ENROL,
    },
    afterCountries: { heading: FOURTEEN, note: SEAT_NOTE, button: ENROL },
    afterValues: {
      testimonial: {
        quote: "\u201cIncluded VC didn\u2019t just open doors; it unveiled entire galaxies.\u201d",
        name: "Aditi Mishra",
        role: "Included VC Fellow 2025",
      },
      heading: FOURTEEN,
      note: SEAT_NOTE,
      button: ENROL,
    },
  },

  climb: {
    kicker: { step: "02 / 05", label: "What you will do" },
    eyebrow: "The climb",
    heading: "Where fourteen weeks can take you.",
    body: "Five stages of investment judgement. Many people start at the second. Ascend is built to get you to the fourth. The fifth takes a career.",
    stages: climbStages,
  },

  curriculum: {
    eyebrow: "The curriculum",
    heading: "Fourteen weeks, in the order a deal happens.",
    body: "You start with how a fund is built and finish with how returns are made. Every week is live, taught by practising investors.",
    hint: "Open any week to see what it covers.",
    blocks: curriculumBlocks.map((b) => ({
      ...b,
      weeks: b.weeks.map((w) => ({ ...w, details: WEEK_DETAILS[w.n] ?? "" })),
    })),
    africa: {
      title: "Ascend Africa \u00b7 six more sessions",
      text: "Everything above, plus six Thursday sessions on African investment markets with the funds shaping them.",
      cta: { label: "About Ascend Africa", href: "/ascend-africa" },
    },
  },

  outcomes: {
    heading: "What you leave with",
    cards: outcomeCards.map(({ title, text }) => ({ title, text })),
    testimonial: {
      quote: "\u201cI\u2019d recommend INVC to any aspiring VC over a masters degree from the fanciest biz school.\u201d",
      name: "Ashna Oukabay",
      role: "Included VC Fellow 2021",
    },
  },

  month: {
    eyebrow: "The Included VC experience",
    heading: "A month in Ascend.",
    body: "We start every week with the live session. Everything else takes shape as the week progresses.",
    weeks: monthWeeks.map(({ label, events }) => ({ label, events })),
    stats: monthStats,
    footnote: "Illustrative month. The live timetable is shared in week one.",
  },

  tuesdays: {
    eyebrow: "Live every Tuesday \u00b7 16:00\u201318:30 UK time",
    headingPrefix: "Your Tuesdays:",
    lede: "This is your slot for fourteen Tuesdays. Put it in your calendar now. If it fits, so do you.",
    pillLabel: "Your Tuesday:",
    note: "Sessions are always at 16:00 UK time. The times here are for the first session, Tuesday 5 January. Outside the UK and Europe, your local time moves by an hour for a few sessions in March and April, when clocks change.",
    sphereLabel: "UK time",
    sphereTime: "16:00\u201318:30",
    sphereNote: "every Tuesday",
  },

  faculty: {
    kicker: { step: "03 / 05", label: "Who is in the room" },
    eyebrow: "Faculty",
    heading: "Taught by people who invest for a living.",
    button: { label: "Explore the network", href: "/instructors" },
    people: facultyPeople.map((f) => ({
      name: f.name,
      role: f.role,
      photo: img(`/faculty/${f.photo}-photo-placeholder.jpg`, 357, 476),
    })),
  },

  everyoneIncluded: {
    eyebrow: "Is this you?",
    heading: "Everyone is included.",
    body: "Included VC programmes have been home to people from every background and stage of life. One piece is missing.",
    people: jigsawPeople,
    you: { title: "You", text: "The missing piece. Ready to Ascend" },
    note: "That is the room complete.",
    noteLink: { label: "Take your place", href: "#how-to-join" },
    quote: "And one person who sat under a tree, just to get enough signal to join the sessions.",
  },

  audience: {
    eyebrow: "Who it is for",
    heading: "Nine kinds of people. One thing in common.",
    body: "They want to understand how investment decisions get made, and to do something with that knowledge. A finance background is welcome and never required.",
    groups: audienceGroups,
  },

  stories: {
    eyebrow: "Hear from our community",
    heading: "In their own words.",
    body: "These are Included VC Fellows, on what it is like to learn with this network. Ascend\u2019s first cohort starts in January, so its stories are still to be written.",
    stories: storyItems.map(({ quote, name, role }) => ({ quote, name, role })),
    stats: storyStats.map((s) => ({
      value: s.value.map((v) => ("i" in v && v.i ? `*${v.t}*` : v.t)).join(""),
      label: s.label,
    })),
    note: "Fellowship results. 85% of Fellowship alumni now work in investment. Ascend does not guarantee a job.",
    link: { label: "Explore our alumni community", href: "#stories" },
  },

  alumni: {
    eyebrow: "Where our alumni work",
    heading: "Where Included VC Fellows work now.",
    body: "Firms that alumni of our Fellowship have joined. Ascend is new and does not guarantee a job.",
    firms: ALUMNI_LOGOS.map((l) => ({
      slug: l.slug,
      name: l.name,
      logo: img(`/alumni/${l.slug}-placeholder.png`, l.w, l.h, l.name),
    })),
  },

  countries: {
    eyebrow: "Applications from across the world",
    heading: "Ambition knows no borders.",
    body: "People from more than 100 countries have applied to Included VC. Wherever you are, you belong in this room.",
    caption: "100+ countries, and counting",
    flags: FLAGS.map((f) => ({
      slug: f.slug,
      name: f.name,
      logo: img(`/flags/${f.slug}-placeholder.png`, f.w, f.h, f.name),
    })),
  },

  deal: {
    kicker: { step: "04 / 05", label: "The deal" },
    heading: "No panel decides whether you get in.",
    body: "Three things decide whether you should.",
    terms: dealTerms.map(({ title, text }) => ({ title, text })),
  },

  ticket: {
    eyebrow: "What you get",
    heading: "One seat. Fourteen live weeks.",
    body: "Everyone has the same seat. Here is what comes with it.",
    admit: "Admit one \u00b7 Founding cohort",
    price: "\u00a3197",
    priceSuffix: "+ VAT",
    text: "**The learning is partner-funded. The commitment is yours.** Our partners have covered the teaching, the faculty and the platform. What they can\u2019t fund is you turning up. So there is a one-off commitment fee. It isn\u2019t tuition. It is your side of the arrangement: a signal to yourself, and to everyone learning beside you, that your seat will be used. It also helps keep Included VC running for the people who come after you.",
    details: ticketDetails,
    cta: ENROL,
    note: "Non-refundable, because a commitment you can undo isn\u2019t one. Check your Tuesdays first.",
    tracksLabel: "Two tracks",
    tracks: [
      { name: "Global", ticketLabel: "Global track" },
      { name: "Africa", ticketLabel: "Africa track" },
    ],
    features: ticketFeatures,
  },

  promise: {
    eyebrow: "Our promise",
    heading: "What we promise, and what we can\u2019t.",
    body: "We choose the curriculum and the people who teach it. The rest is in your hands.",
    promiseTitle: "What we promise",
    promises: promiseItems.map(([b, rest]) => `**${b}**${rest}`),
    cannotTitle: "What we cannot promise",
    cannot: cannotItems.map(([b, rest]) => `**${b}**${rest}`),
    quote: "\u201cWe know what we\u2019re putting into it. What people do with that is up to them.\u201d",
    attribution: "Nikita Thakrar, Founder",
  },

  employers: {
    eyebrow: "Teams and employers",
    heading: "Your organisation can cover the fee.",
    body: "Many employers have a learning budget for exactly this. We give you what you need to ask for it.",
    cardTitle: "Your employer can pay",
    cardText:
      "We invoice your organisation directly and send a one-page summary that covers the fee and the Tuesday time. Bringing three or more people, or want Ascend run inside your institution? Email [hello@included.vc](mailto:hello@included.vc).",
    button: {
      label: "Ask for the invoice template",
      href: "mailto:hello@included.vc?subject=Ascend%20invoice%20template",
    },
  },

  values: {
    eyebrow: "Our values",
    heading: "How we treat each other.",
    body: "Four values every Included VC cohort is held to.",
    values: valueItems,
    links: [
      { label: "About Included VC", href: "https://included.vc/about" },
      { label: "View resources", href: "https://included.vc/resources" },
    ],
  },

  join: {
    kicker: { step: "05 / 05", label: "Join" },
    eyebrow: "How to join",
    heading: "Three steps, about ten minutes.",
    body: "No interview and no waiting for a decision. A short form, your commitment fee, and your seat is confirmed. Enrolment closes Monday 4 January 2027.",
    steps: joinSteps,
    final: {
      title: "Tuesday 5 January 2027",
      text: "First session, 16:00 UK time. Onboarding happens in the room, then fourteen weeks, live.",
      cta: ENROL,
    },
    payments: ["Card", "Apple Pay", "Google Pay", "Bank transfer", "Mobile money and local cards for Africa"],
    question: {
      title: "Still have a question for us?",
      text: "Come to office hours and ask a person from the team: which track fits, whether this is your year, or how to ask your employer to pay.",
      cta: { label: "Join office hours", href: "#how-to-join" },
    },
  },

  tldr: {
    eyebrow: "Everything at a glance",
    heading: "TLDR.",
    lede: "Everything you need to know about Ascend in one place. Tap a star for the detail.",
    facts: tldrFacts.map((f) => ({ k: f.k, v: f.v, b: f.b, at: [f.at[0], f.at[1]] as [number, number] })),
  },

  faq: {
    eyebrow: "Questions",
    heading: "Everything people ask before they join.",
    groups: faqGroups.map((g) => ({ title: g.title, items: g.items.map(([q, a]) => ({ q, a })) })),
  },

  finalCta: {
    eyebrow: "Ascend by Included VC",
    heading: "Start the year in the room.",
    body: "The first Tuesday of 2027, 16:00 UK time. Fourteen live weeks follow. About ten minutes to enrol. Enrolment closes Monday 4 January.",
    cta: ENROL,
  },

  footer: {
    logo: img("/ascend/ascend-logo-placeholder.png", 1037, 226, "Ascend"),
    byline: img("/ascend/by-included-placeholder.png", 277, 65, "by Included VC"),
    tagline: "Included VC exists to change who gets to invest.",
    columns: footerColumns,
    copyright: "\u00a9 Included VC 2026. All rights reserved.",
    legal: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
  // The other pages (src/content/pages)
  ...pageDefaults,
};

export const defaultContent: SiteContent = { ...homeDefaults, ...africaDefaults(homeDefaults) };

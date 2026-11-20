/** FAQs page (/faq). */
import { z } from "zod";
import { linkSchema } from "../blocks";
import { APPLY_URL, pageMetaSchema } from "./shared";

export const faqPageSchemas = {
  faqPageMeta: pageMetaSchema,
  faqPageHero: z.object({ crumbs: z.string(), heading: z.string(), lede: z.string() }),
  faqPageList: z.object({
    groups: z
      .array(z.object({ title: z.string(), items: z.array(z.object({ q: z.string(), a: z.string() })) }))
      .describe("Each group is a tab down the side."),
    footnote: z.string(),
  }),
  faqPageOfficeHours: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    body: z.string(),
    tags: z.array(z.string()),
    cta: linkSchema,
    note: z.string(),
  }),
  faqPageEnd: z.object({
    heading: z.string(),
    body: z.string(),
    cta: linkSchema,
    small: z.string(),
    strip: z.string().describe("The line in the thin bar at the very end of the page."),
    stripCta: linkSchema,
  }),
};

type Content = { [K in keyof typeof faqPageSchemas]: z.infer<(typeof faqPageSchemas)[K]> };

export const faqPageDefaults: Content = {
  faqPageMeta: {
    title: "FAQs",
    description: "Everything people ask before they join Ascend by Included VC, grouped by topic.",
  },
  faqPageHero: {
    crumbs: "[Ascend](/) · Support",
    heading: "Top questions *about Included VC.*",
    lede: "Everything people ask before they join, grouped by topic. If what you need is not here, come to office hours or email us and a person replies.",
  },
  faqPageList: {
    groups: [
      {
        "title": "The Fellowship question",
        "items": [
          {
            "q": "Is the Included VC Fellowship running this year?",
            "a": "Not as a separate nine month Fellowship. Ascend by Included VC is the next chapter of the same work: the same organisation, the same partner network, the same faculty and the same standards, in a format that reaches many more people. The Investor Fellowship continues by partner nomination for professionals already investing across Africa."
          },
          {
            "q": "Has anything about Included VC changed?",
            "a": "The people, the partners, the values and the expectations stay exactly as they were. What has changed is the format, how many people can join and the way you join. We would rather say that plainly than leave you to piece it together."
          },
          {
            "q": "I am an Included VC alumnus. What does this mean for me?",
            "a": "You are already in the community that Ascend joins. Alumni teach on it, mentor on it and open doors on it, and the Included VC mafia is exactly what new Fellows are joining. If you want to be involved, email us."
          }
        ]
      },
      {
        "title": "The commitment fee",
        "items": [
          {
            "q": "Why is there a fee?",
            "a": "The commitment fee asks for a considered decision to join, and it helps us build these programmes for years to come. Our partners fund the majority of the costs, as they have for seven years."
          },
          {
            "q": "What does the fee cover?",
            "a": "It contributes towards the platform, the operations and the community work that holds fourteen live weeks together. The teaching and the faculty are funded by our partners."
          },
          {
            "q": "Is the fee refundable?",
            "a": "The fee is non-refundable. It marks the moment you take your seat, and the seat is yours from then on. If the amount is genuinely the thing standing between you and the programme, write to us first and we will talk it through."
          },
          {
            "q": "Can I pay in instalments?",
            "a": "It is one payment, made once when you confirm your place."
          },
          {
            "q": "Will my employer cover it?",
            "a": "Often, yes. We will send an invoice with your name and the programme on it, plus a one-page summary of the fourteen weeks for whoever signs it off."
          }
        ]
      },
      {
        "title": "Time and participation",
        "items": [
          {
            "q": "How many hours a week does this take?",
            "a": "Two hours live, plus three to five hours of reading, memo work and your Deep Dive. Most people do it alongside a full-time job, and the live time is the part worth protecting in your calendar."
          },
          {
            "q": "What happens if I miss a session?",
            "a": "You get the materials, and the cohort will catch you up. The investment committee builds on what came before, so the more of the live time you keep, the more you get out of it."
          },
          {
            "q": "Why are the sessions not recorded?",
            "a": "Because investors speak differently when nothing is being filmed. Keeping the room private is what makes the room worth being in."
          },
          {
            "q": "How is this different from watching talks online?",
            "a": "Talks give you the vocabulary. Ascend gives you a real deal to assess, a live committee to defend it in front of, a memo with your name on it and forty countries of people doing it alongside you."
          }
        ]
      },
      {
        "title": "Fit and background",
        "items": [
          {
            "q": "I already work in the industry. Is this pitched at me?",
            "a": "Around a third of each cohort already works in or around investment. They come for the mechanics nobody sat them down and taught: fund structure, the two and twenty, cap tables, term sheets and how a committee actually decides."
          },
          {
            "q": "Do I need a finance background?",
            "a": "No. We have taught doctors, lawyers, teachers, engineers, researchers, musicians, athletes, founders and new parents. What you need is the willingness to do the reading and to argue a position."
          },
          {
            "q": "What does Ascend do for my career?",
            "a": "It teaches the craft and opens the doors that come with the Included VC network. Across seven years of Fellowships, almost 85% of Fellows looking for a role moved into the investment industry. Ascend is built on the same teaching, and we will publish its own results as the first cohorts finish."
          }
        ]
      },
      {
        "title": "About Ascend",
        "items": [
          {
            "q": "What exactly is Ascend?",
            "a": "Ascend by Included VC is a fourteen-week live investment education programme, and the next chapter of the work Included VC has done since 2019. Every Tuesday for two hours you learn from partners and investors at the funds that have backed us for seven years. Across the fourteen weeks you get masterclasses with leading investors, dealflow practicals and investment memo writing, investment committee simulations, mentorship from investors and from alumni now working in venture, career clinics on breaking into the industry, brand building workshops, and office hours with the Included VC team. Between sessions you do the work: memos, diligence and your own Deep Dive."
          },
          {
            "q": "When does it start and end?",
            "a": "It starts on 4 January 2027 and runs for fourteen consecutive weeks, finishing in early April 2027. Sessions run 16:00 to 18:00 London time, which is shown in your own timezone further up this page."
          },
          {
            "q": "Is there a Fellowship intake this year?",
            "a": "Not in its previous form. This year everything we have goes into Ascend. The Fellowship is where we learned how to do this. Ascend is where that learning goes next."
          },
          {
            "q": "Will the Fellowship come back?",
            "a": "Right now Ascend by Included VC is where our teaching, our partners and our community are, and it is where we would love you to be."
          },
          {
            "q": "Which track should I choose?",
            "a": "If you work in, or want to invest in, African markets, choose Ascend Africa. It includes everything in Ascend Global plus six extra sessions on African markets. Otherwise choose Ascend Global. You can attend sessions across both tracks either way."
          },
          {
            "q": "What language are the sessions in?",
            "a": "All live sessions are taught in English."
          },
          {
            "q": "Are sessions recorded?",
            "a": "No. Sessions are live and are not recorded, because Ascend is built around being in the room together. Office hours and the Slack community are there between sessions."
          }
        ]
      },
      {
        "title": "Who it is for",
        "items": [
          {
            "q": "Do I need a finance background?",
            "a": "No. Fellows have come from engineering, healthcare, law, research, operations, academia, music and the armed forces. Curiosity and the willingness to do the work matter more than your CV."
          },
          {
            "q": "Is there an age limit or a location limit?",
            "a": "No, beyond being 18 or over. The focus is global and you can join from anywhere in the world. Cohorts have included career changers in their forties and fifties, and people from more than forty countries. If you are based in Africa, or investing there, Ascend Africa is tailored to your region, community and ecosystem. Wherever you are, if you can make Tuesdays, you can join."
          },
          {
            "q": "Do I need to be selected?",
            "a": "No. Ascend is not selective at the door. It is demanding once you are in. Everyone who joins gets the same programme, and the certificate goes to those who complete it."
          },
          {
            "q": "How much time will it take?",
            "a": "About 3 to 5 hours a week. That is the two-hour live session plus reading and the work between sessions."
          },
          {
            "q": "Can I do this alongside a full-time job?",
            "a": "Yes, and most people do. Sessions are in the evening for Europe and Africa. The work between sessions is yours to schedule."
          },
          {
            "q": "What does Ascend expect of me?",
            "a": "That you show up live, do the work between sessions and bring something to the cohort. You will write a memo, present it to an investment committee and publish a Deep Dive with your name on it."
          }
        ]
      },
      {
        "title": "Applying",
        "items": [
          {
            "q": "Is there an application?",
            "a": "There is a short form with a few questions about why you want to join and what you want to be able to do by week fourteen. It is not a test. It is there so you make a considered decision and so we know who is in the room."
          },
          {
            "q": "What happens after I join?",
            "a": "You get a confirmation email, then an onboarding pack: a few things to do before we begin, the dates for your calendar, and everything you need to join the sessions and the Slack community."
          },
          {
            "q": "When does joining close?",
            "a": "[date]. This is the only intake planned for the year ahead."
          },
          {
            "q": "What if I miss a session?",
            "a": "Sessions are live and are not recorded. Office hours and the Slack community are there between sessions, so plan to be with us on Tuesdays."
          },
          {
            "q": "I registered my interest earlier. What now?",
            "a": "This page is where you confirm your place. Use the same email you registered with and your details will already be there."
          }
        ]
      },
      {
        "title": "Funding and partners",
        "items": [
          {
            "q": "What does it cost?",
            "a": "The full amount is shown in your own currency before you confirm, and it is set out in the maths further up this page."
          },
          {
            "q": "Why is there a fee at all?",
            "a": "Our partners fund Ascend, as they have funded everything we have done for seven years. What the fee asks for is your decision to join. It means everyone in the room has chosen to be there, and a room full of people who chose to be there is a very different room. It also keeps Included VC here for the long run, because seven years have taught us that good things last longer when everyone has a stake in them. The fee is non-refundable, because that is what a commitment is, so before you join make sure Tuesdays are yours for fourteen weeks. We would love you there for every one."
          },
          {
            "q": "Programmes like this cost thousands. Why is this different?",
            "a": "Because our partners pay for most of it. Ascend exists to widen access to investment education, not to turn a profit on it."
          },
          {
            "q": "What do the partners pay for, and what do I pay for?",
            "a": "Teaching, faculty and programme delivery are funded by our partners, and they fund the platform, the operations and the community work alongside it. Your part is the commitment fee, once, and everyone in the room has the same seat."
          },
          {
            "q": "Can I get a refund?",
            "a": "No. The fee is non-refundable, because that is what a commitment is. Please check you can make Tuesdays before you join."
          },
          {
            "q": "How do I pay?",
            "a": "Securely by card through Stripe. You receive a receipt, and a VAT invoice where required."
          },
          {
            "q": "Can my employer pay?",
            "a": "Yes. We can issue an invoice to your company. Ask us before you check out."
          },
          {
            "q": "How is this different from other investment programmes?",
            "a": "Two things. The people teaching are partners and principals who are allocating capital right now, not career educators working from case studies. And the network behind it is global: investors from more than forty nationalities, with alumni who go on to co-invest with each other once they join funds. The long game is changing the demographics of investment teams so that capital reaches more founders, and the near-term job is helping you land the role."
          },
          {
            "q": "What is Included VC’s definition of representation?",
            "a": "People come from anywhere: any gender, ethnicity, geography, upbringing, age, neurodiversity, disability or belief system. What they share is a passion for entrepreneurship, technology and creating significant impact through venture investing."
          },
          {
            "q": "Is there an in-person gathering?",
            "a": "Included VC LIVE is our largest in-person gathering, bringing together alumni, cohort members and venture partners. People on Ascend may be invited. Travel and accommodation for LIVE are at your own cost."
          },
          {
            "q": "We are a fund that would like to partner with Included VC.",
            "a": "Wonderful. Write to Nikita Thakrar at nikita@included.vc. Partner funds also get access to Included VC reading material and events for their teams."
          },
          {
            "q": "Who are the partners?",
            "a": "The funds and institutions that have backed Included VC since 2019, from Seedcamp and Creandum to HSBC, the European Investment Fund and a growing group of African funds and development partners."
          }
        ]
      },
      {
        "title": "Outcomes and community",
        "items": [
          {
            "q": "Do I get a certificate?",
            "a": "Yes. You start as a cohort member and you graduate as an Included VC Ascender once you have met the criteria set out at the beginning of the programme. Your certificate names you an Ascender, Class of 2027, with 2026 as the founding year. It is issued on completion rather than on joining, so it means something."
          },
          {
            "q": "Is there a community?",
            "a": "Yes. Everyone on Ascend joins a dedicated Slack community to connect, ask questions and share ideas between sessions, and there are live office hours on Zoom."
          },
          {
            "q": "What do people leave with?",
            "a": "Something you built rather than notes. An investment memo you wrote and defended. A live investment committee under your belt. A published Deep Dive with your name on it. Working knowledge of how capital moves and who decides where it goes. A global dealflow network reaching every continent except Antarctica. Relationships with investors from analyst to Partner. And a cohort across more than forty countries that tends to turn into lifetime bonds."
          },
          {
            "q": "How many Fellows actually break into investment?",
            "a": "The numbers from the Fellowship years speak for themselves. Of Fellows actively applying to break into venture: 83% did so in 2020, 85% in 2021 and 83% in 2022. One Fellow went on to raise more than $10m, two became co-founders and raised $750K, another raised $50m, and many became angel investors. Five alumni are now Partners, and all five are women. Those are Fellowship outcomes rather than Ascend outcomes, and we will publish Ascend’s own results as the first cohorts finish."
          },
          {
            "q": "What happens after week fourteen?",
            "a": "You stay. Alumni from seven years of Fellowships are in the same community, and that is where roles, deals and introductions tend to come from."
          }
        ]
      }
    ],
    footnote: "Still something unanswered? Email [hello@included.vc](mailto:hello@included.vc) and a person replies.",
  },
  faqPageOfficeHours: {
    eyebrow: "Office hours",
    heading: "Still have a question *for us?*",
    body: "Join our office hours. Bring your questions and your half-formed ideas: whether Ascend is the right year for you, which track fits, how to talk to your employer about the fee, or the thing you have not worked out how to ask yet. A person from the team is on the call, not a form.",
    tags: ["Open to everyone", "No application needed", "Before you commit"],
    cta: { label: "Join office hours", href: "#join" },
    note: "Or email [hello@included.vc](mailto:hello@included.vc) and a person replies.",
  },
  faqPageEnd: {
    heading: "We cannot wait to see *you ascend.*",
    body: "Fourteen live weeks. One intake, starting 4 January 2027.",
    cta: { label: "Ready to ascend", href: APPLY_URL },
    small: "Shown in your local time · Partners fund the majority of the cost · Ascend by Included VC",
    strip: "Included VC Limited · Be kind · Don’t compete · Pay it forward · Sparkle",
    stripCta: { label: "Ready to ascend", href: "#join" },
  },
};

export const faqPageSections = [
  { key: "faqPageMeta", label: "Search & sharing", description: "Page title and description." },
  { key: "faqPageHero", label: "Page header", description: "Breadcrumb, heading and intro." },
  { key: "faqPageList", label: "Questions", description: "The question groups (tabs) and answers." },
  { key: "faqPageOfficeHours", label: "Office hours", description: "The office hours card." },
  { key: "faqPageEnd", label: "Closing", description: "The closing heading, button and the thin bar under it." },
] as const;

"use client";

import React, { useId, useState } from "react";
import styles from "./Faq.module.css";

type QA = [string, string];

// Questions and answers as in the supplied HTML.
const GROUPS: { title: string; items: QA[] }[] = [
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

function Question({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className={styles.item} data-open={open || undefined}>
      <h3>
        <button
          type="button"
          className={styles.question}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={() => setOpen((v) => !v)}
        >
          {q}
          <span className={styles.icon} aria-hidden="true" />
        </button>
      </h3>
      {/* Grid-rows trick animates the height without measuring it. */}
      <div
        id={`${id}-a`}
        className={styles.answer}
        role="region"
        aria-hidden={!open}
      >
        <div>
          <p>{a}</p>
        </div>
      </div>
    </li>
  );
}

export function Faq() {
  const [tab, setTab] = useState(0);
  const base = useId();
  return (
    <section id="faqs" className={styles.faq} aria-labelledby="faq-heading">
      <div className="container">
        <p className={styles.eyebrow}>Questions</p>
        <h2 id="faq-heading" className={styles.heading}>
          Everything people ask before they join.
        </h2>

        <div className={styles.layout}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Question topics"
            aria-orientation="vertical"
          >
            {GROUPS.map((g, i) => (
              <button
                key={g.title}
                type="button"
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={tab === i}
                aria-controls={`${base}-panel`}
                className={styles.tab}
                onClick={() => setTab(i)}
              >
                {g.title}
              </button>
            ))}
          </div>

          <ul
            key={tab}
            id={`${base}-panel`}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${tab}`}
            className={styles.list}
          >
            {GROUPS[tab].items.map(([q, a]) => (
              <Question key={q} q={q} a={a} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

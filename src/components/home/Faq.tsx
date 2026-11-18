"use client";

import React, { useId, useState } from "react";
import type { SiteContent } from "@/content/schema";
import { RichText } from "../RichText";
import styles from "./Faq.module.css";

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
          <p>
            <RichText text={a} />
          </p>
        </div>
      </div>
    </li>
  );
}

export function Faq({ content: c }: { content: SiteContent["faq"] }) {
  const [tab, setTab] = useState(0);
  const current = c.groups[tab] ?? c.groups[0];
  const base = useId();
  return (
    <section id="faqs" className={styles.faq} aria-labelledby="faq-heading">
      <div className="container">
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h2 id="faq-heading" className={styles.heading}>
          {c.heading}
        </h2>

        <div className={styles.layout}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Question topics"
            aria-orientation="vertical"
          >
            {c.groups.map((g, i) => (
              <button
                key={i}
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
            {current?.items.map((item, i) => (
              <Question key={i} q={item.q} a={item.a} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

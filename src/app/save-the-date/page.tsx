import type { Viewport } from "next";
import Link from "next/link";
import { Poppins, Inter } from "next/font/google";
import { getSiteContent } from "@/content";
import { Txt } from "@/components/site/Txt";
import { pageMetadata } from "@/components/site/pageMetadata";
import { eventDetails } from "./event";
import { CalendarButtons, Stars } from "./Interactive";
import styles from "./page.module.css";

/*
 * Save the date: where every "Take your seat" button leads until enrolment
 * opens. A page of its own (no site header or footer), as designed. The
 * wording and the event are edited in the admin under "Save the date".
 */

const display = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--std-display", display: "swap" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--std-body", display: "swap" });

export const viewport: Viewport = { themeColor: "#07080d" };

export async function generateMetadata() {
  return pageMetadata((await getSiteContent()).saveTheDateMeta, "/save-the-date");
}

export default async function SaveTheDatePage() {
  const { saveTheDate: c } = await getSiteContent();
  const ev = eventDetails(c.event);
  return (
    <div className={`${styles.page} ${display.variable} ${body.variable}`}>
      <Stars />
      <main className={styles.wrap} id="main-content">
        <Link href="/" className={styles.mark}>
          <span className={styles.dot} aria-hidden="true" />
          <span>{c.brand}</span>
        </Link>

        <div className={styles.card}>
          <div className={styles.rule} aria-hidden="true" />
          <div className={styles.pad}>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h1 className={styles.title}>{c.heading}</h1>
            <p className={styles.lede}>
              <Txt text={c.lede} />
            </p>

            <dl className={styles.when}>
              <div>
                <dt>Date</dt>
                <dd>
                  <time dateTime={ev.start.toISOString()}>{ev.dateText}</time>
                </dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{ev.timeText}</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>{c.whereLabel}</dd>
              </div>
            </dl>

            <p className={styles.ask}>{c.ask}</p>
            <CalendarButtons
              links={{ google: ev.google, apple: "/save-the-date/ascend-launch.ics", outlook: ev.outlook, yahoo: ev.yahoo }}
            />

            <p className={styles.note}>
              <Txt text={c.note} />
            </p>
          </div>
        </div>

        <footer className={styles.footer}>{c.footer}</footer>
      </main>
    </div>
  );
}

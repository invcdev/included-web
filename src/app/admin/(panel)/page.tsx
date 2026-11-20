import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { getContentStore, type SectionInfo } from "@/content/store";
import { SECTIONS } from "@/content/sections";
import { PAGES } from "@/content/pages";
import { ChevronRight } from "@/components/admin/icons";
import styles from "../admin.module.css";

export const instant = false;

// The site's spectrum, top of the page (purple) to the bottom (lime).
const STOPS: [number, number, number][] = [
  [0x50, 0x35, 0xe2], [0x47, 0x6f, 0xea], [0x53, 0xab, 0xf2], [0x6c, 0xe7, 0xfb],
  [0x7a, 0xf3, 0xb8], [0x98, 0xf8, 0x72], [0xc2, 0xfd, 0x51],
];
function spectrum(t: number) {
  const x = Math.min(0.9999, Math.max(0, t)) * (STOPS.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const c = STOPS[i].map((v, j) => Math.round(v + (STOPS[i + 1][j] - v) * f));
  return `rgb(${c.join(" ")})`;
}

const date = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const time = (d: Date) => d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireAdmin();
  const { page: slug } = await searchParams;
  const page = PAGES.find((p) => p.slug === slug) ?? PAGES[0];
  const sections = SECTIONS.filter((s) => s.page === page.slug);
  let info: SectionInfo = {};
  let dbError = false;
  try {
    info = await getContentStore().info();
  } catch (err) {
    console.error("[admin] could not read content info", err);
    dbError = true;
  }
  const edited = sections.filter((s) => info[s.key]).length;

  return (
    <>
      <header className={styles.pageHead}>
        <h1 className={styles.title}>Page content</h1>
        <p className={styles.lead}>
          Pick a page, then open a section to edit it. Sections are listed top to bottom, and saving publishes straight away.
        </p>
      </header>

      <nav className={styles.pageTabs} aria-label="Pages">
        {PAGES.map((p) => {
          const n = SECTIONS.filter((s) => s.page === p.slug && info[s.key]).length;
          return (
            <Link
              key={p.slug}
              href={`/admin?page=${p.slug}`}
              className={styles.pageTab}
              aria-current={p.slug === page.slug ? "page" : undefined}
            >
              {p.label}
              {n > 0 && <span className={styles.pageTabCount}>{n} edited</span>}
            </Link>
          );
        })}
      </nav>

      {dbError && <p className={styles.notice}>The database didn&rsquo;t respond, so edit dates aren&rsquo;t shown.</p>}

      <div className={styles.mapHead}>
        <span>
          {edited === 0 ? "All sections show their original content" : `${edited} of ${sections.length} sections edited`}
          {page.path && (
            <>
              {" · "}
              <a href={page.path} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
                View page
              </a>
            </>
          )}
        </span>
        <span className={styles.legend2} aria-hidden="true">
          <span className={styles.keyFilled} /> Edited
          <span className={styles.keyHollow} /> Original
        </span>
      </div>

      <ol className={styles.pageMap}>
        {sections.map((s, i) => {
          const e = info[s.key];
          return (
            <li key={s.key} style={{ "--dot": spectrum(i / Math.max(1, sections.length - 1)) } as React.CSSProperties}>
              <Link href={`/admin/content/${s.key}`} className={styles.mapRow} data-edited={e ? "" : undefined}>
                <span className={styles.mapDot} aria-hidden="true" />
                <span className={styles.mapText}>
                  <span className={styles.mapName}>{s.label}</span>
                  <span className={styles.mapDesc}>{s.description}</span>
                </span>
                <span className={styles.mapStatus}>
                  {e ? (
                    <>
                      <span>
                        Edited {date(e.updatedAt)}, {time(e.updatedAt)}
                      </span>
                      {e.updatedBy && <span className={styles.mapBy}>by {e.updatedBy}</span>}
                    </>
                  ) : (
                    <span className={styles.mapOriginal}>Original</span>
                  )}
                </span>
                <ChevronRight className={styles.mapChevron} />
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}

/* eslint-disable @next/next/no-img-element -- images may be Cloudinary or /public; sizes come from the content */
import { getSiteContent } from "@/content";
import { PageRoot } from "@/components/site/PageRoot";
import { SiteClosing } from "@/components/site/SiteClosing";
import { SitePopup } from "@/components/site/SitePopup";
import { Txt, safeHref } from "@/components/site/Txt";
import { pageMetadata } from "@/components/site/pageMetadata";
import "./page.css";
import "./extra.css";

export async function generateMetadata() {
  return pageMetadata((await getSiteContent()).instructorsMeta, "/instructors");
}

type Faculty = Awaited<ReturnType<typeof getSiteContent>>["faculty"];
type Person = { name: string; title: string; organisation: string; fields: string[]; photo: string };

/**
 * Everyone on the faculty, as table rows: the landing page's Faculty, then the
 * Ascend Africa faculty (skipping anyone already listed, with names in capitals
 * to match). A role "Title · Organisation" is split at the last ·.
 */
function peopleFrom(faculty: Faculty, africa: Faculty): Person[] {
  const key = (n: string) => n.trim().toLowerCase().replace(/\s+/g, " ");
  const seen = new Set(faculty.people.map((p) => key(p.name)));
  const all = [
    ...faculty.people,
    ...africa.people.filter((p) => !seen.has(key(p.name))).map((p) => ({ ...p, name: p.name.toUpperCase() })),
  ];
  return all.map((p) => {
    const at = p.role.lastIndexOf("·");
    return {
      name: p.name.trim(),
      title: (at >= 0 ? p.role.slice(0, at) : p.role).trim(),
      organisation: at >= 0 ? p.role.slice(at + 1).trim() : "",
      fields: (p.fields ?? []).map((f) => f.trim()).filter(Boolean),
      photo: p.photo.url,
    };
  });
}

/* The table's first state, rendered on the server so search engines see everyone.
   Same markup as src/components/site/scripts/instructors.ts, which takes over in the browser. */
const esc = (v: string) => v.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
const initials = (n: string) => esc(n.split(" ").slice(0, 2).map((w) => w[0] ?? "").join("").toUpperCase());
const avatar = (p: Person) => (p.photo ? `<img src="${esc(p.photo)}" alt="">` : initials(p.name));
function rowsHtml(people: Person[]) {
  return people
    .map(
      (p, i) =>
        `<div class="row${i === 0 ? " on" : ""}" data-i="${i}" tabindex="0" role="button"><div class="nm"><span class="av">${avatar(p)}</span>` +
        `<span class="nmx">${esc(p.name)}<i class="dash"></i></span></div><div class="t">${esc(p.organisation)}</div>` +
        `<div class="r">${esc(p.title)}</div><div class="fl">${esc(p.fields.join(", "))}</div></div>`,
    )
    .join("");
}
function cardHtml(p: Person) {
  return (
    `<div class="pic">${avatar(p)}</div><h3>${esc(p.name)}<i class="dash"></i></h3><dl>` +
    (p.organisation ? `<dt>Organisation</dt><dd>${esc(p.organisation)}</dd>` : "") +
    `<dt>Title</dt><dd>${esc(p.title)}</dd>` +
    (p.fields.length ? `<dt>Field</dt><dd class="tags">${p.fields.map((f) => `<span class="tag">${esc(f)}</span>`).join("")}</dd>` : "") +
    `</dl>`
  );
}

export default async function InstructorsPage() {
  const c = await getSiteContent();
  const { instructorsHero: h, instructorsIntro: intro, instructorsNetwork: net } = c;
  const people = peopleFrom(c.faculty, c.africaFaculty);
  // The Field filter offers every field given to someone, in the order they first appear.
  const fields = [...new Set(people.flatMap((p) => p.fields))];
  return (
    <PageRoot page="instructors" data={{ people, fields, emptyText: net.emptyText }}>
      <section className="al-hero ihero" id="top">
        <img className="bg" src={h.image.url} alt={h.image.alt} />
        <div className="wrap">
          <div className="crumbs in-crumbs">
            <Txt text={h.crumbs} />
          </div>
          <div className="eyebrow in-light">{h.eyebrow}</div>
          <h1>
            <Txt text={h.heading} emClass="serif gt" />
          </h1>
          <p>
            <Txt text={h.lede} />
          </p>
        </div>
      </section>

      <section className="sec cream in-intro">
        <div className="wrap">
          <div className="eyebrow">{intro.eyebrow}</div>
          <h2>
            <Txt text={intro.heading} />
          </h2>
          <p className="lede">
            <Txt text={intro.lede} />
          </p>
        </div>
      </section>

      <section className="nw" id="network">
        <div className="wrap">
          <div className="top">
            <div className="tabs">
              <span>{net.tabLabel}</span>
              <a href={safeHref(net.teachCta.href)}>{net.teachCta.label}</a>
            </div>
            <div className="search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input id="nwq" type="search" placeholder={net.searchPlaceholder} aria-label={net.searchPlaceholder} />
            </div>
          </div>
          <div className="layout">
            <div>
              <div className="table">
                <div className="thead">
                  <div>Name</div>
                  <div>Organisation</div>
                  <div>Title</div>
                  <div className="f" id="ff">
                    <b>Field</b> ▾<div className="menu" />
                  </div>
                </div>
                <div id="nwrows" dangerouslySetInnerHTML={{ __html: rowsHtml(people) }} />
              </div>
              <div className="count" id="nwcount">
                {people.length} of {people.length} people
              </div>
            </div>
            <div className="card" id="nwcard" dangerouslySetInnerHTML={{ __html: people[0] ? cardHtml(people[0]) : "" }} />
          </div>
        </div>
      </section>

      <SiteClosing content={c.siteClosing} />
      <SitePopup content={c.sitePopup} />
    </PageRoot>
  );
}

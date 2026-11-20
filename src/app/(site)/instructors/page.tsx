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

type Person = Awaited<ReturnType<typeof getSiteContent>>["instructorsNetwork"]["people"][number];

/* The table's first state, rendered on the server so search engines see everyone.
   Same markup as src/components/site/scripts/instructors.ts, which takes over in the browser. */
const esc = (v: string) => v.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
const link = (u: string) => esc(safeHref(u));
const initials = (n: string) => esc(n.split(" ").slice(0, 2).map((w) => w[0] ?? "").join("").toUpperCase());
const avatar = (p: Person) => (p.photo ? `<img src="${esc(p.photo.url)}" alt="">` : initials(p.name));
function rowsHtml(people: Person[]) {
  return people
    .map(
      (p, i) =>
        `<div class="row${i === 0 ? " on" : ""}" data-i="${i}" tabindex="0" role="button"><div class="nm"><span class="av">${avatar(p)}</span>` +
        `<span class="nmx">${esc(p.name)}<i class="dash"></i></span></div><div class="t">${esc(p.organisation || p.title)}</div>` +
        `<div class="r">${esc(p.organisation ? p.title : "")}</div><div class="fl">${esc(p.fields.join(", "))}</div></div>`,
    )
    .join("");
}
function cardHtml(p: Person) {
  return (
    `<div class="pic">${avatar(p)}</div><h3><a href="${link(p.link)}">${esc(p.name)}</a><i class="dash"></i></h3><dl>` +
    `<dt>Organisation</dt><dd>${esc(p.organisation || p.title)}</dd><dt>Title</dt><dd>${esc(p.organisation ? p.title : "Partner organisation")}</dd>` +
    `<dt>Field</dt><dd class="tags">${p.fields.map((f) => `<span class="tag">${esc(f)}</span>`).join("")}</dd>` +
    `<dt>About</dt><dd>${esc(p.bio)}</dd></dl><a class="cta" href="${link(p.link)}">Profile</a>`
  );
}

export default async function InstructorsPage() {
  const c = await getSiteContent();
  const { instructorsHero: h, instructorsIntro: intro, instructorsNetwork: net } = c;
  return (
    <PageRoot page="instructors" data={{ network: net }}>
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
                <div id="nwrows" dangerouslySetInnerHTML={{ __html: rowsHtml(net.people) }} />
              </div>
              <div className="count" id="nwcount">
                {net.people.length} of {net.people.length} people
              </div>
            </div>
            <div className="card" id="nwcard" dangerouslySetInnerHTML={{ __html: net.people[0] ? cardHtml(net.people[0]) : "" }} />
          </div>
        </div>
      </section>

      <SiteClosing content={c.siteClosing} />
      <SitePopup content={c.sitePopup} />
    </PageRoot>
  );
}

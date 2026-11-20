import { getSiteContent } from "@/content";
import { PageRoot } from "@/components/site/PageRoot";
import { SiteClosing } from "@/components/site/SiteClosing";
import { SitePopup } from "@/components/site/SitePopup";
import { Txt, safeHref } from "@/components/site/Txt";
import { pageMetadata } from "@/components/site/pageMetadata";
import "./page.css";
import "./extra.css";

export async function generateMetadata() {
  return pageMetadata((await getSiteContent()).faqPageMeta, "/faq");
}

export default async function FaqPage() {
  const c = await getSiteContent();
  const { faqPageHero: h, faqPageList: list, faqPageOfficeHours: oh, faqPageEnd: end } = c;
  return (
    <PageRoot page="faq">
      <div className="av2 av3 av4">
        <section className="av4fh" id="support">
          <canvas className="space" id="faqspace" aria-hidden="true" />
          <div className="w">
            <div className="crumbs">
              <Txt text={h.crumbs} />
            </div>
            <h1>
              <Txt text={h.heading} emTag="em" emClass="" />
            </h1>
            <p>
              <Txt text={h.lede} />
            </p>
          </div>
        </section>

        <section className="sec av2faq" id="faq">
          <div className="w">
            <div className="cols">
              <div className="side">
                {list.groups.map((g, i) => (
                  <button type="button" className={i === 0 ? "on" : ""} data-g={i} key={i}>
                    {g.title}
                  </button>
                ))}
              </div>
              <div>
                {list.groups.map((g, i) => (
                  <div className={`grp ${i === 0 ? "on" : ""}`} data-g={i} key={i}>
                    {g.items.map((it, j) => (
                      <details key={j}>
                        <summary>{it.q}</summary>
                        <p>
                          <Txt text={it.a} />
                        </p>
                      </details>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="faq-foot">
              <Txt text={list.footnote} />
            </p>
          </div>
        </section>

        <section className="av2oh" id="officehours">
          <div className="w">
            <div className="card">
              <div>
                <div className="eb">{oh.eyebrow}</div>
                <h3>
                  <Txt text={oh.heading} />
                </h3>
                <p>
                  <Txt text={oh.body} />
                </p>
                <div className="when">
                  {oh.tags.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="act">
                <a className="btn" href={safeHref(oh.cta.href)}>
                  {oh.cta.label}
                </a>
                <small>
                  <Txt text={oh.note} />
                </small>
              </div>
            </div>
          </div>
        </section>

        <section className="av2end" id="join">
          <div className="w">
            <h2>
              <Txt text={end.heading} />
            </h2>
            <p>
              <Txt text={end.body} />
            </p>
            <a className="btn lt" href={safeHref(end.cta.href)}>
              {end.cta.label}
            </a>
            <small>{end.small}</small>
          </div>
        </section>

        <div className="av2tag">
          <div className="w faq-strip">
            <span>{end.strip}</span>
            <a className="btn lt" href={safeHref(end.stripCta.href)}>
              {end.stripCta.label}
            </a>
          </div>
        </div>
      </div>

      <SiteClosing content={c.siteClosing} />
      <SitePopup content={c.sitePopup} />
    </PageRoot>
  );
}

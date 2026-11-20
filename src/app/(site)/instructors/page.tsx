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
                <div id="nwrows" />
              </div>
              <div className="count" id="nwcount" />
            </div>
            <div className="card" id="nwcard" />
          </div>
        </div>
      </section>

      <SiteClosing content={c.siteClosing} />
      <SitePopup content={c.sitePopup} />
    </PageRoot>
  );
}

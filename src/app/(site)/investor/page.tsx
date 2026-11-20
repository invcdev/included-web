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
  return pageMetadata((await getSiteContent()).investorMeta, "/investor");
}

export default async function InvestorPage() {
  const c = await getSiteContent();
  const { investorHead: h, investorWho: who, investorNetwork: net, investorEcosystem: eco } = c;
  return (
    <PageRoot page="investor">
      <section className="pagehead space-bg">
        <div className="neb" style={{ width: 560, height: 560, right: -160, top: -160, background: "#ffff00", opacity: 0.3 }} />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="crumbs">
            <Txt text={h.crumbs} />
          </div>
          <div className="eyebrow">{h.eyebrow}</div>
          <h1>
            <Txt text={h.heading} emClass="serif gt" />
          </h1>
          <p>
            <Txt text={h.lede} />
          </p>
        </div>
      </section>

      <section className="sec cream">
        <div className="wrap inv-who">
          <div>
            <div className="eyebrow">{who.eyebrow}</div>
            <h2>
              <Txt text={who.heading} />
            </h2>
            {who.paragraphs.map((p, i) => (
              <p className="lede" key={i}>
                <Txt text={p} />
              </p>
            ))}
            <a className="btn" href={safeHref(who.cta.href)}>
              {who.cta.label}
            </a>
          </div>
          <img src={who.image.url} alt={who.image.alt} width={who.image.width} height={who.image.height} style={{ width: "100%", height: "auto", borderRadius: 22 }} />
        </div>
      </section>

      <section className="net cream2" id="network" style={{ background: "var(--cream2)" }}>
        <div className="wrap">
          <div className="eyebrow">{net.eyebrow}</div>
          <h2>
            <Txt text={net.heading} emClass="serif gt" />
          </h2>
          <div className="stage">
            <canvas id="globe" />
            {net.logos.map((l, i) => (
              <div className="lg" key={i} style={{ left: `${l.x}%`, top: `${l.y}%`, animationDelay: `${(i * 0.7).toFixed(1)}s` }}>
                <img src={l.logo.url} alt={l.logo.alt || l.name} />
              </div>
            ))}
          </div>
          <div className="caption">
            <Txt text={net.caption} />
          </div>
        </div>
      </section>

      <section className="sec space eco" id="ecosystem">
        <div className="wrap">
          <div className="eyebrow">{eco.eyebrow}</div>
          <h2>
            <Txt text={eco.heading} />
          </h2>
          <p className="lede">
            <Txt text={eco.lede} />
          </p>
          <div className="fcards">
            {eco.cards.map((card, i) => (
              <a className="fcard" href={safeHref(card.link.href)} key={i}>
                <img src={card.image.url} alt={card.image.alt} />
                <div>
                  <h3>{card.title}</h3>
                  <span className="lm">
                    {card.link.label} <i>→</i>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteClosing content={c.siteClosing} />
      <SitePopup content={c.sitePopup} />
    </PageRoot>
  );
}

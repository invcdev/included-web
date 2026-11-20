import { getSiteContent } from "@/content";
import { PageRoot } from "@/components/site/PageRoot";
import { SiteClosing } from "@/components/site/SiteClosing";
import { SitePopup } from "@/components/site/SitePopup";
import { Orb } from "@/components/site/Orb";
import { PressStrip } from "@/components/site/PressStrip";
import { Txt, safeHref } from "@/components/site/Txt";
import { pageMetadata } from "@/components/site/pageMetadata";
import "./page.css";
import "./extra.css";

export async function generateMetadata() {
  return pageMetadata((await getSiteContent()).partnersMeta, "/partners");
}

export default async function PartnersPage() {
  const c = await getSiteContent();
  const { partnersHead: h, partnersSponsor: sp } = c;
  return (
    <PageRoot page="partners">
      <section className="pagehead space-bg">
        <div className="neb" style={{ width: 560, height: 560, right: -120, top: -120, background: "#ffff00", opacity: 0.22 }} />
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

      <Orb id="partners" content={c.partnersOrb} />
      <Orb id="community" small content={c.partnersCommunity} />

      <section className="sec cream pt-press">
        <PressStrip content={c.partnersPress} />
      </section>

      <section className="sec space">
        <div className="wrap pt-sponsor">
          <div className="eyebrow">{sp.eyebrow}</div>
          <h2>
            <Txt text={sp.heading} emClass="serif gt" />
          </h2>
          <p className="lede">
            <Txt text={sp.lede} />
          </p>
          <a className="btn white" href={safeHref(sp.cta.href)}>
            {sp.cta.label}
          </a>
        </div>
      </section>

      <SiteClosing content={c.siteClosing} />
      <SitePopup content={c.sitePopup} />
    </PageRoot>
  );
}

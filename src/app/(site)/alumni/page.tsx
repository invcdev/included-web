/* eslint-disable @next/next/no-img-element -- images may be Cloudinary or /public; sizes come from the content */
import { getSiteContent } from "@/content";
import { PageRoot } from "@/components/site/PageRoot";
import { SiteClosing } from "@/components/site/SiteClosing";
import { SitePopup } from "@/components/site/SitePopup";
import { Orb } from "@/components/site/Orb";
import { Blocks } from "@/components/site/Blocks";
import { Txt, safeHref } from "@/components/site/Txt";
import { pageMetadata } from "@/components/site/pageMetadata";
import "./page.css";
import "./extra.css";

export async function generateMetadata() {
  return pageMetadata((await getSiteContent()).alumniMeta, "/alumni");
}

/* Design: the wall's card colours, and the placeholder video gradients. */
const FEAT_GRADS = [
  "linear-gradient(135deg,#5533eb,#0033ff)",
  "linear-gradient(135deg,#0033ff,#00f2ff)",
  "linear-gradient(135deg,#00ff04,#0033ff)",
  "linear-gradient(135deg,#5533eb,#00f2ff)",
];
const COL_COLORS = ["#00f2ff", "#ffff00", "#b0ff05", "#00ff04"];
const VIDEO_GRADS = [
  ["#5533eb", "#0033ff"],
  ["#0033ff", "#00f2ff"],
  ["#00ff04", "#b0ff05"],
  ["#b0ff05", "#ffff00"],
];

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();

export default async function AlumniPage() {
  const c = await getSiteContent();
  const { alumniHero: h, alumniMap: map, alumniSpotlight: spot, alumniFellows: f, alumniStories: st, alumniBlog: blog, alumniLive: live } = c;
  const id = (i: number) => `q${i + 1}`;
  const data = {
    hubs: map.hubs.map((x) => [x.city, x.lat, x.lng, x.country]),
    spotlight: f.fellows.map((x) => ({ q: x.spotlight, n: x.name, r: x.role, y: x.year, img: x.photo.url })),
    wall: [
      ...f.fellows.flatMap((x, i) => [
        { t: "feat", g: FEAT_GRADS[i % FEAT_GRADS.length], q: x.quote, n: x.name, r: x.role, y: x.year, i: initials(x.name), id: id(i), img: x.photo.url },
        { t: "q", q: x.quote, n: x.name, r: x.role, id: id(i) },
      ]),
      ...f.photos.map((p) => ({ t: "photo", src: p.photo.url, n: p.name })),
      ...f.logos.map((l) => ({ t: "logo", src: l.logo.url, n: l.name })),
      ...f.fellows.slice(0, 6).map((x, i) => ({ t: "col", c: COL_COLORS[i % COL_COLORS.length], q: x.quote, n: x.name, r: x.role, id: id(i) })),
    ],
  };

  return (
    <PageRoot page="alumni" data={data}>
      <section className="al-hero" id="top">
        <img className="bg" src={h.image.url} alt={h.image.alt} />
        <div className="wrap">
          <div className="crumbs al-crumbs">
            <Txt text={h.crumbs} />
          </div>
          <div className="eyebrow al-light">{h.eyebrow}</div>
          <h1>
            <Txt text={h.heading} emClass="serif gt" />
          </h1>
          <p>
            <Txt text={h.lede} />
          </p>
        </div>
      </section>

      <section className="al-map" id="map">
        <div className="wrap">
          <div className="grid">
            <div>
              <div className="eyebrow al-dim">{map.eyebrow}</div>
              <h2>
                <Txt text={map.heading} />
              </h2>
              <p className="lede al-dim-lede">
                <Txt text={map.lede} />
              </p>
              <div className="stat">
                {map.stats.map((s, i) => (
                  <div key={i}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="hubs">
                {map.hubs.map((x, i) => (
                  <button type="button" data-h={i} key={i}>
                    {x.city}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="stage">
                <canvas id="globe2" />
                <div className="tip" id="gtip" />
              </div>
              <div className="hint">{map.hint}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="al-spot sec cream" id="spotlight">
        <div className="wrap">
          <div className="eyebrow">{spot.eyebrow}</div>
          <div className="card" id="spotcard">
            <img className="photo" id="sph" src={f.fellows[0].photo.url} alt="" />
            <div className="tint" />
            <span className="pill">{spot.pill}</span>
            <span className="pill2">{spot.pill2}</span>
            <div className="qbox">
              <blockquote id="sq" />
            </div>
            <div className="nbox">
              <div className="name" id="sn" />
              <div className="role" id="sr" />
              <span className="yr" id="sy" />
            </div>
          </div>
        </div>
      </section>

      <Orb id="destinations" small content={c.alumniOrb} />

      <section className="al-bento sec cream" id="fellows">
        <div className="wrap">
          <div className="eyebrow">{f.eyebrow}</div>
          <h2>
            <Txt text={f.heading} />
          </h2>
          <p className="lede">
            <Txt text={f.lede} />
          </p>
          <div className="grid" id="bgrid" />
          <div className="more">
            <button className="btn" id="bmore">
              {f.more}
            </button>
          </div>
        </div>
        {f.fellows.map((x, i) => (
          <div className="modal qm" id={id(i)} key={i}>
            <div className="box">
              <button className="x qx" type="button" aria-label="Close">
                &times;
              </button>
              <div className="eyebrow">
                {x.name} · {x.role} · Included VC {x.year}
              </div>
              <Blocks text={x.story} />
            </div>
          </div>
        ))}
        <div className="modal" id="allwall">
          <div className="box wallbox">
            <button className="x" data-x="" aria-label="Close">
              &times;
            </button>
            <div className="eyebrow">{f.wallEyebrow}</div>
            <h2 className="al-wall-h">
              <Txt text={f.wallHeading} />
            </h2>
            <div className="grid" id="wall" />
          </div>
        </div>
      </section>

      <section className="al-stories" id="stories">
        <div className="wrap">
          <div className="top">
            <h2>
              <Txt text={st.heading} />
            </h2>
            <div className="side">
              <b>{st.sideTitle}</b>
              <p>
                <Txt text={st.sideText} />
              </p>
            </div>
          </div>
          <div className="row" id="srow">
            {st.videos.map((v, i) => {
              const g = VIDEO_GRADS[(i - st.videos.findIndex((x) => !x.vimeoId) + VIDEO_GRADS.length * 4) % VIDEO_GRADS.length];
              const vid = /^\d+$/.test(v.vimeoId) ? v.vimeoId : "";
              return (
                <div className="v" key={i}>
                  <div className="frame">
                    {vid ? (
                      <iframe
                        src={`https://player.vimeo.com/video/${vid}?title=0&byline=0&portrait=0`}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={v.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="ph" style={{ "--c1": g[0], "--c2": g[1] } as React.CSSProperties}>
                        <i>▶</i>
                        <small>Video coming soon</small>
                      </div>
                    )}
                  </div>
                  <b>{v.title}</b>
                  <span>{v.subtitle}</span>
                </div>
              );
            })}
          </div>
          <div className="arrows">
            <button type="button" data-scroll="-1" aria-label="Scroll videos left">
              ←
            </button>
            <button type="button" data-scroll="1" aria-label="Scroll videos right">
              →
            </button>
          </div>
        </div>
      </section>

      <section className="al-blog" id="blog">
        <div className="wrap">
          <div className="eyebrow al-dim">{blog.eyebrow}</div>
          <h2>
            <Txt text={blog.heading} />
          </h2>
          <p className="lede al-dim-lede">
            <Txt text={blog.lede} />
          </p>
          <div className="feat">
            <div className="t">
              <div>
                <small>{blog.featured.kicker}</small>
                <h3>{blog.featured.title}</h3>
                <p>
                  <Txt text={blog.featured.text} />
                </p>
              </div>
              <div className="meta">{blog.featured.meta}</div>
            </div>
            <div className="art a1" />
          </div>
          <div className="posts">
            {blog.posts.map((p, i) => (
              <a className="post" href={safeHref(p.href)} key={i}>
                <div className={`art a${(i % 6) + 2}`} />
                <div className="t">
                  <small>{p.kicker}</small>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="meta">{p.meta}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="more">
            <a className="btn white" href={safeHref(blog.cta.href)}>
              {blog.cta.label}
            </a>
          </div>
        </div>
      </section>

      <section className="sec space">
        <div className="wrap al-live">
          <div>
            <div className="eyebrow">{live.eyebrow}</div>
            <h2>
              <Txt text={live.heading} emClass="serif gt" />
            </h2>
            <p className="lede">
              <Txt text={live.lede} />
            </p>
          </div>
          <div className="al-live-art" />
        </div>
      </section>

      <SiteClosing content={c.siteClosing} />
      <SitePopup content={c.sitePopup} />
    </PageRoot>
  );
}

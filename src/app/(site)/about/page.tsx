/* eslint-disable @next/next/no-img-element -- images may be Cloudinary or /public; sizes come from the content */
import { getSiteContent } from "@/content";
import { PageRoot } from "@/components/site/PageRoot";
import { SiteClosing } from "@/components/site/SiteClosing";
import { SitePopup } from "@/components/site/SitePopup";
import { Orb } from "@/components/site/Orb";
import { Txt, safeHref } from "@/components/site/Txt";
import { pageMetadata } from "@/components/site/pageMetadata";
import { ERA_ART, METRIC_COLORS } from "./fixed";
import "./page.css";
import "./extra.css";

export async function generateMetadata() {
  return pageMetadata((await getSiteContent()).aboutMeta, "/about");
}

const TIP_POS = ["n", "e", "s", "w"];

export default async function AboutPage() {
  const c = await getSiteContent();
  const {
    aboutHero: h,
    aboutBand: band,
    aboutValues: vals,
    aboutStory: story,
    aboutPress: press,
    aboutSponsor: sponsor,
    aboutVoices: voices,
    aboutProgrammes: progs,
    aboutMilestones: miles,
    aboutTeam: team,
    aboutContact: contact,
  } = c;
  const data = {
    values: vals.values.map((v) => [v.name, v.text]),
    quotes: voices.quotes.map((q) => [q.quote, q.name, q.role]),
    contact: { to: contact.to, sent: contact.sent },
  };
  const v0 = vals.values[0];
  return (
    <PageRoot page="about" data={data}>
      <section className="ab-hero" id="top">
        <img className="bg" src={h.image.url} alt={h.image.alt} />
        <div className="wrap">
          <div className="crumbs ab-crumbs">
            <Txt text={h.crumbs} />
          </div>
          <div className="eyebrow ab-light">{h.eyebrow}</div>
          <h1>
            <Txt text={h.heading} emClass="serif gt" />
          </h1>
          <p>
            <Txt text={h.lede} />
          </p>
        </div>
      </section>

      <div className="ab-flow">
        <section className="ab-band">
          <div className="wrap">
            <div className="abtop">
              <div className="abcols">
                {band.columns.map((col, i) => (
                  <div key={i}>
                    <div className="eyebrow">{col.eyebrow}</div>
                    <p>
                      <Txt text={col.text} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="g">
              <div>
                <div className="eyebrow ab-lilac">{band.network.eyebrow}</div>
                <p>
                  <Txt text={band.network.text} />
                </p>
                <div className="abmetin" id="metrics">
                  <p className="lede2">
                    <Txt text={band.metricsLede} />
                  </p>
                  <div className="grid">
                    {band.metrics.map((m, i) => (
                      <div className="m" key={i}>
                        <div className="top">
                          <b>
                            {m.value}
                            <sup>{m.suffix}</sup>
                          </b>
                          <span>{m.label}</span>
                        </div>
                        <div className="vol">
                          {Array.from({ length: 40 }, (_, k) => (
                            <i
                              key={k}
                              className={k < m.lit ? "lit" : k < m.lit + m.half ? "half" : ""}
                              style={{ "--c": METRIC_COLORS[i % METRIC_COLORS.length] } as React.CSSProperties}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="foot">
                    <p>
                      <Txt text={band.foot} />
                    </p>
                    <a className="btn" href={safeHref(band.cta.href)}>
                      {band.cta.label}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="sec night spark" id="about" data-stars="1">
        <div className="w">
          <div className="sg">
            <div className="stext">
              <div className="eb">{vals.eyebrow}</div>
              <h2>
                <Txt text={vals.heading} emTag="em" emClass="" />
              </h2>
              <p className="lede">
                <Txt text={vals.lede} />
              </p>
              <div className="vcard" id="vcard" aria-live="polite">
                <small>01 / 04</small>
                <h3>{v0.name}</h3>
                <p>{v0.text}</p>
              </div>
              <div className="vlinks">
                <a className="link lt" href={safeHref(vals.link.href)}>
                  {vals.link.label}
                </a>
                <a className="btn lineb" href={safeHref(vals.button.href)}>
                  {vals.button.label}
                </a>
              </div>
            </div>
            <div className="star" id="star">
              <svg viewBox="-40 -40 480 480" aria-hidden="true">
                <defs>
                  <linearGradient id="sparkg" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stopColor="#5533eb" />
                    <stop offset=".52" stopColor="#00f2ff" />
                    <stop offset="1" stopColor="#b0ff05" />
                  </linearGradient>
                  <radialGradient id="sparkglow">
                    <stop offset="0" stopColor="#00f2ff" stopOpacity=".55" />
                    <stop offset=".5" stopColor="#5533eb" stopOpacity=".18" />
                    <stop offset="1" stopColor="#5533eb" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="200" cy="200" r="230" fill="url(#sparkglow)" />
                <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,.1)" />
                <circle cx="200" cy="200" r="205" fill="none" stroke="rgba(255,255,255,.06)" strokeDasharray="3 7" />
                <g className="rot">
                  <path
                    className="body"
                    d="M200 0 C214 150 250 186 400 200 C250 214 214 250 200 400 C186 250 150 214 0 200 C150 186 186 150 200 0 Z"
                    fill="url(#sparkg)"
                  />
                  <path
                    d="M200 70 C206 160 240 194 330 200 C240 206 206 240 200 330 C194 240 160 206 70 200 C160 194 194 160 200 70 Z"
                    fill="rgba(255,255,255,.22)"
                  />
                </g>
                <circle cx="200" cy="200" r="9" fill="#fff" />
              </svg>
              {vals.values.map((v, i) => (
                <button type="button" className={`tip ${TIP_POS[i]}${i === 0 ? " on" : ""}`} data-i={i} key={i}>
                  <i>{String(i + 1).padStart(2, "0")}</i>
                  {v.tip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rm" id="story">
        <div className="wrap">
          <div className="eyebrow">{story.eyebrow}</div>
          <h2>
            <Txt text={story.heading} />
          </h2>
          <p className="lede">
            <Txt text={story.lede} />
          </p>
          <div className="pin" id="rmpin">
            <div className="stick">
              <div className="line">
                <i id="rmline" />
              </div>
              <div className="track" id="rmtrack">
                {story.eras.map((e, i) => {
                  const art = ERA_ART[i % ERA_ART.length];
                  return (
                    <div className="ch" data-i={i} key={i}>
                      <div className={`art${art.light ? " lt" : ""}`}>
                        <svg
                          viewBox="0 0 320 240"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid slice"
                          dangerouslySetInnerHTML={{ __html: art.svg }}
                        />
                        <div className="yr">{e.year}</div>
                        <div className="st">
                          <b>{e.stat}</b>
                          <span>{e.statLabel}</span>
                        </div>
                      </div>
                      <div className="t">
                        <small>{e.label}</small>
                        <h3>{e.title}</h3>
                        <p>{e.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="ctl">
                <button type="button" id="rmprev" aria-label="Previous era">
                  ←
                </button>
                <span className="n" id="rmn">
                  01 / {String(story.eras.length).padStart(2, "0")}
                </span>
                <button type="button" id="rmnext" aria-label="Next era">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Orb id="partners" pin="p" variant="ascend" content={c.aboutOrb}>
        <span id="abpartners" />
      </Orb>

      <section className="sec feat" id="featured">
        <div className="w">
          <span className="eb">{press.eyebrow}</span>
          <div className="featrow">
            {press.logos.map((l, i) => (
              <img src={l.logo.url} alt={l.logo.alt || l.name} loading="lazy" decoding="async" key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec sponsor">
        <div className="w">
          <div className="spbox">
            <div>
              <b>{sponsor.title}</b>
              <p>
                <Txt text={sponsor.text} />
              </p>
            </div>
            <a className="btn" href={safeHref(sponsor.cta.href)}>
              {sponsor.cta.label}
            </a>
          </div>
        </div>
      </section>

      <section className="ab-test" id="voices">
        <div className="wrap">
          <div className="g">
            <div className="left">
              <h2>
                <Txt text={voices.heading} />
              </h2>
              {voices.paragraphs.map((p, i) => (
                <p key={i}>
                  <Txt text={p} />
                </p>
              ))}
              <a className="btn ab-voices-btn" href={safeHref(voices.cta.href)}>
                {voices.cta.label}
              </a>
              <div className="dots" id="tdots">
                {voices.quotes.map((_, i) => (
                  <i className={i === 0 ? "on" : ""} key={i} />
                ))}
              </div>
            </div>
            <div>
              <div className="q">
                <blockquote id="tq">{voices.quotes[0].quote}</blockquote>
              </div>
              <div className="who">
                <div>
                  <b id="tn">{voices.quotes[0].name}</b>
                  <span id="tr">{voices.quotes[0].role}</span>
                </div>
                <div className="arr">
                  <button type="button" id="tp" aria-label="Previous testimonial">
                    ←
                  </button>
                  <button type="button" id="tnx" aria-label="Next testimonial">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-story" id="programmes">
        <div className="wrap">
          <div className="g">
            <div className="left">
              <h2>
                <Txt text={progs.heading} />
              </h2>
              <p>
                <Txt text={progs.lede} />
              </p>
              <a className="btn white" href={safeHref(progs.cta.href)}>
                {progs.cta.label}
              </a>
              <div className="nav">
                <button type="button" id="sp" aria-label="Previous programme">
                  ←
                </button>
                <button type="button" id="sn" aria-label="Next programme">
                  →
                </button>
              </div>
            </div>
            <div id="scards">
              {progs.cards.map((card, i) => (
                <div className="card" style={{ "--pic": `url(${JSON.stringify(card.image.url)})` } as React.CSSProperties} key={i}>
                  <div className="pic" />
                  <div className="t">
                    <h3>{card.title}</h3>
                    <p>
                      <Txt text={card.text} />
                    </p>
                    {card.rows.map((r, j) => (
                      <div className="row" key={j}>
                        <span>{r.label}</span>
                        <span>{r.value}</span>
                      </div>
                    ))}
                    <a className="cta" href={safeHref(card.link.href)}>
                      {card.link.label}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ab-aw">
        <div className="wrap">
          <div className="k">{miles.label}</div>
          <div className="row">
            <div className="track">
              {[0, 1].map((rep) =>
                miles.items.map((m, i) => (
                  <div className="it" key={`${rep}-${i}`} aria-hidden={rep === 1 || undefined}>
                    <b>{m.title}</b>
                    <span>{m.text}</span>
                  </div>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="ab-team" id="team">
        <div className="wrap">
          <div className="eyebrow">{team.eyebrow}</div>
          <h2>
            <Txt text={team.heading} />
          </h2>
          <div className="g">
            {team.people.map((p, i) => (
              <div className="p" key={i}>
                <img src={p.photo.url} alt={p.photo.alt} />
                <b>{p.name}</b>
                <span>{p.role}</span>
                <i />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ab-talk" id="contact">
        <div className="wrap">
          <div className="g">
            <div className="left">
              <h2>
                <Txt text={contact.heading} />
              </h2>
              <p>
                <Txt text={contact.lede} />
              </p>
              {contact.emails.map((e) => (
                <a href={`mailto:${e}`} key={e}>
                  {e}
                </a>
              ))}
            </div>
            <form id="abform">
              <div className="who">
                {contact.whoLabel}{" "}
                {contact.options.map((o, i) => (
                  <label key={i}>
                    <input type="radio" name="w" value={o} defaultChecked={i === 0} /> {o}
                  </label>
                ))}
              </div>
              <input name="name" placeholder="Name" aria-label="Name" required />
              <input name="email" type="email" placeholder="Email" aria-label="Email" required />
              <input name="location" placeholder="Location" aria-label="Location" />
              <textarea name="message" placeholder="Message" aria-label="Message" />
              <button className="send" type="submit">
                {contact.send}
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteClosing content={c.siteClosing} />

      <div id="eradeep" hidden role="dialog" aria-modal="true" aria-label="Era in detail">
        <div className="ed-sky" aria-hidden="true" />
        <button className="ed-close" type="button" aria-label="Close">
          &#215;
        </button>
        <div className="ed-inner">
          <div className="ed-art" id="edArt" />
          <div className="ed-copy">
            <div className="ed-eb" id="edEb" />
            <h3 id="edTitle" />
            <p className="ed-text" id="edText" />
          </div>
        </div>
        <div className="ed-nav">
          <button className="ed-prev" type="button" aria-label="Previous era">
            &#8592;
          </button>
          <span className="ed-count" id="edCount" />
          <button className="ed-next" type="button" aria-label="Next era">
            &#8594;
          </button>
        </div>
      </div>

      <SitePopup content={c.sitePopup} />
    </PageRoot>
  );
}

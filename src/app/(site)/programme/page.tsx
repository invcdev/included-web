/* eslint-disable @next/next/no-img-element -- images may be Cloudinary or /public; sizes come from the content */
import { getSiteContent } from "@/content";
import { PageRoot } from "@/components/site/PageRoot";
import { SiteClosing } from "@/components/site/SiteClosing";
import { SitePopup } from "@/components/site/SitePopup";
import { Orb } from "@/components/site/Orb";
import { Blocks } from "@/components/site/Blocks";
import { Txt, safeHref } from "@/components/site/Txt";
import { pageMetadata } from "@/components/site/pageMetadata";
import { LEAVE_COLORS, ROAD_ICONS, ROAD_ROWS, STARS, WEEK_COLORS } from "./fixed";
import "./page.css";
import "./extra.css";

export async function generateMetadata() {
  return pageMetadata((await getSiteContent()).programmeMeta, "/programme");
}

type Steps = Awaited<ReturnType<typeof getSiteContent>>["programmeStructure"];

/** Programme cards in the shape the original script reads. */
function cardsData(list: Awaited<ReturnType<typeof getSiteContent>>["programmeCards"]["programmes"]) {
  return list.map((p) => ({
    name: p.name,
    status: p.status,
    tracks: p.tracks.map((t) => ({
      t: t.label,
      d: t.description,
      rows: t.rows.map((r) => [r.label, r.value]),
      pic: t.image.url,
      link: safeHref(t.link.href),
      cta: t.link.label,
    })),
  }));
}
const stepsData = (s: Steps) =>
  s.steps.map((d) => ({ n: d.name, role: d.role, lead: d.lead, sub: d.sub, items: d.items, pic: d.image.url }));

function StepSection({ id, theme, content: s }: { id: string; theme: string; content: Steps }) {
  const n = s.steps.length;
  return (
    <section className={`stp ${theme}`} id={id}>
      <div className="wrap">
        <div className="head">
          <div>
            <div className="eyebrow">{s.eyebrow}</div>
            <h2>
              <Txt text={s.heading} />
            </h2>
          </div>
          <p>
            <Txt text={s.lede} />
          </p>
        </div>
        <div className="stage" style={{ "--n": n } as React.CSSProperties}>
          <div className="pin">
            <div className="bar">
              <h3>{s.barTitle}</h3>
              <div>
                <div className="track">
                  <i />
                </div>
                <div className="meta">
                  <span className="steps">
                    Step
                    {s.steps.map((_, i) => (
                      <span key={i}>
                        {" "}
                        <b data-i={i} className={i === 0 ? "on" : undefined}>
                          /{String(i + 1).padStart(2, "0")}/
                        </b>
                      </span>
                    ))}
                  </span>
                  <span className="ctl">
                    <button type="button" className="pv" aria-label="Previous">
                      ←
                    </button>
                    <button type="button" className="nx" aria-label="Next">
                      →
                    </button>
                    <span>
                      Progress <b className="pct">{Math.round(100 / n)}%</b>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="t" />
              <div className="pic" data-k="01">
                <img src={s.steps[0].image.url} alt={s.steps[0].image.alt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ProgrammePage() {
  const c = await getSiteContent();
  const {
    programmeHead: h,
    programmeWhat: what,
    programmeCards: cards,
    programmeTldr: tldr,
    programmeRoadmap: road,
    programmeCurriculum: cur,
    programmeMonth: month,
    programmeLaws: laws,
    programmeFaq: fq,
  } = c;
  const data = {
    programmes: cardsData(cards.programmes),
    structure: stepsData(c.programmeStructure),
    gain: stepsData(c.programmeGain),
    who: stepsData(c.programmeWho),
    tldr: tldr.stars.map((s) => ({ k: s.label, t: s.title, b: s.body })),
  };
  const rows = [0, 1, 2, 3].map((r) => road.modules.slice(r * 3, r * 3 + 3));

  return (
    <PageRoot page="programme" data={data}>
      <section className="pagehead space-bg">
        <div className="neb" style={{ width: 560, height: 560, right: -160, top: -160, background: "#00ff04", opacity: 0.3 }} />
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

      <section className="what2" id="what">
        <div className="wrap">
          <div className="g">
            <div>
              <div className="eyebrow">{what.eyebrow}</div>
              <h2>
                <Txt text={what.heading} />
              </h2>
              {what.paragraphs.map((p, i) => (
                <p key={i}>
                  <Txt text={p} />
                </p>
              ))}
            </div>
            <div className="img">
              <img src={what.image.url} alt={what.image.alt} />
            </div>
          </div>
        </div>
      </section>

      <section className="pc" id="programmes">
        <div className="wrap">
          <div className="g">
            <div className="left">
              <div className="eyebrow pg-light">{cards.eyebrow}</div>
              <h2>
                <Txt text={cards.heading} emClass="pg-plain" />
              </h2>
              <p>
                <Txt text={cards.lede} />
              </p>
              <div className="nav">
                <button type="button" id="pcp" aria-label="Previous programme">
                  ←
                </button>
                <button type="button" id="pcn" aria-label="Next programme">
                  →
                </button>
              </div>
              <div className="dots" id="pcd" />
            </div>
            <div id="pccard" aria-live="polite" />
          </div>
        </div>
      </section>

      <Orb id="partners" content={c.programmeOrb} />

      <StepSection id="structure" theme="th-light" content={c.programmeStructure} />
      <StepSection id="gain" theme="th-blue" content={c.programmeGain} />
      <StepSection id="who" theme="th-lime" content={c.programmeWho} />

      <section className="sky" id="tldr">
        <div className="wrap">
          <div className="head">
            <div>
              <div className="eyebrow">{tldr.eyebrow}</div>
              <h2>
                <Txt text={tldr.heading} emClass="serif gt" />
              </h2>
            </div>
            <p>
              <Txt text={tldr.lede} />
            </p>
          </div>
          <div className="stage">
            <div className="board">
              <canvas id="skyc" />
              <svg viewBox="0 0 400 400" id="skysvg">
                {STARS.map(([x, y], i) => {
                  const [x2, y2] = STARS[(i + 1) % STARS.length];
                  return <line className="l" x1={x} y1={y} x2={x2} y2={y2} key={`l${i}`} />;
                })}
                {STARS.map(([x, y, fill, ty], i) => (
                  <g className={`node${i === 0 ? " on" : ""}`} data-i={i} key={i}>
                    <circle className="ring" cx={x} cy={y} r={16} />
                    <circle className="core" cx={x} cy={y} r={6} fill={fill} />
                    <text x={x} y={ty} textAnchor="middle">
                      {tldr.stars[i]?.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="panel">
              <span className="idx" id="tp-i">
                01
              </span>
              <small id="tp-k">{tldr.stars[0].label}</small>
              <h3 id="tp-t">{tldr.stars[0].title}</h3>
              <div className="b" id="tp-b">
                {tldr.stars[0].body}
              </div>
              <div className="nv">
                <button data-d="-1">← Prev</button>
                <button data-d="1">Next →</button>
              </div>
              <div className="chips">
                {tldr.stars.map((s, i) => (
                  <button data-i={i} className={i === 0 ? "on" : undefined} key={i}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec cream pg-road">
        <div className="wrap">
          <div className="eyebrow">{road.eyebrow}</div>
          <h2>
            <Txt text={road.heading} emClass="serif gt" />
          </h2>
        </div>

        <section className="ivc-road">
          <div className="ivc-wrap">
            <p className="ivc-sub" />
            <div className="ivc-map">
              <svg className="ivc-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="ivcg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1000">
                    <stop offset="0" stopColor="#7B3FE4" />
                    <stop offset=".35" stopColor="#5A6FEA" />
                    <stop offset=".7" stopColor="#2FBFC0" />
                    <stop offset="1" stopColor="#3DE0A0" />
                  </linearGradient>
                </defs>
                <path className="ivc-glow" d="" />
                <path className="ivc-line" stroke="url(#ivcg)" d="" />
              </svg>
              {rows.map((mods, r) => (
                <div className={`ivc-row${r % 2 ? " ivc-rev" : ""}`} style={ROAD_ROWS[r] as React.CSSProperties} key={r}>
                  {mods.map((m, j) => {
                    const n = r * 3 + j;
                    return (
                      <div className="ivc-stop" key={n}>
                        <div className="ivc-icon">
                          <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ROAD_ICONS[n] }} />
                          <span className="ivc-n">{n + 1}</span>
                        </div>
                        <h3>{m.title}</h3>
                        <p>
                          <Txt text={m.text} />
                        </p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="ivc-finish">{road.finish}</div>
          </div>
        </section>
      </section>

      <div className="ascx">
        <section className="sec cur" id="curriculum">
          <div className="w">
            <div className="head">
              <div>
                <div className="eb">{cur.eyebrow}</div>
                <h2>
                  <Txt text={cur.heading} emTag="em" emClass="" />
                </h2>
              </div>
              <p className="lede pg-side-lede">
                <Txt text={cur.lede} />
              </p>
            </div>
            <p className="curhint">{cur.hint}</p>
            <div className="list">
              {cur.weeks.map((w, i) => (
                <div className="it" style={{ "--c": WEEK_COLORS[i] } as React.CSSProperties} key={i}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{w.title}</h4>
                    <p>
                      <Txt text={w.text} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="africa">
              <div>
                <b>{cur.africa.title}</b>
                <br />
                <span>
                  <Txt text={cur.africa.text} />
                </span>
              </div>
              <a className="btn lt" href={safeHref(cur.africa.cta.href)}>
                {cur.africa.cta.label}
              </a>
            </div>
            <div className="leave">
              <h3>{cur.leaveTitle}</h3>
              <div className="g4" data-collapse="">
                {cur.leave.map((l, i) => (
                  <details className="cdet" style={{ "--c": LEAVE_COLORS[i] } as React.CSSProperties} open key={i}>
                    <summary>
                      <span>{l.title}</span>
                      <i className="cchev" />
                    </summary>
                    <div className="cbody">
                      <p>
                        <Txt text={l.text} />
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sec cream month" id="month">
          <div className="w">
            <div className="head">
              <div>
                <div className="eb">{month.eyebrow}</div>
                <h2>
                  <Txt text={month.heading} emTag="em" emClass="" />
                </h2>
              </div>
              <p className="lede pg-side-lede">
                <Txt text={month.lede} />
              </p>
            </div>
            <div className="weeks">
              {month.weeks.map((w, i) => (
                <div className="wcard" key={i}>
                  <div className="wtop">
                    <b>{w.number}</b>
                    <span>{w.label}</span>
                  </div>
                  <div className="wlist">
                    {w.pills.map((p, j) => (
                      <span className={`wpill ${p.kind}`} key={j}>
                        <em>{p.day}</em>
                        <b>{p.title}</b>
                        {p.note && <small>{p.note}</small>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="key">
              {month.key.map((k, i) => (
                <span key={i}>
                  <i className={`pg-key-${k.kind}`} />
                  {k.label}
                </span>
              ))}
            </div>
            <div className="hours">
              {month.hours.map((x, i) => (
                <div key={i}>
                  <b>{x.value}</b>
                  <span>{x.label}</span>
                </div>
              ))}
            </div>
            <p className="pg-month-note">{month.note}</p>
          </div>
        </section>
      </div>

      <section className="laws cream2" style={{ background: "var(--cream2)" }}>
        <div className="wrap">
          <div className="eyebrow">{laws.eyebrow}</div>
          <h2>
            <Txt text={laws.heading} />
          </h2>
          <div style={{ marginTop: 50 }}>
            {laws.laws.map((l, i) => (
              <div className="law io" key={i}>
                <i>{String(i + 1).padStart(2, "0")}</i>
                <h3>
                  <Txt text={l.title} />
                </h3>
                <p>
                  <Txt text={l.text} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fq" id="faq-short">
        <div className="wrap">
          <div className="head">
            <div>
              <div className="eyebrow">{fq.eyebrow}</div>
              <h2>
                <Txt text={fq.heading} />
              </h2>
            </div>
            <p>
              <Txt text={fq.lede} />
            </p>
          </div>
          {fq.items.map((it, i) => (
            <details key={i}>
              <summary>
                {it.q}
                <i />
              </summary>
              <div className="a">
                <div>
                  <Blocks text={it.a} />
                </div>
              </div>
            </details>
          ))}
          <div className="more">
            <a className="btn" href={safeHref(fq.cta.href)}>
              {fq.cta.label}
            </a>
          </div>
        </div>
      </section>

      <SiteClosing content={c.siteClosing} />
      <SitePopup content={c.sitePopup} />
    </PageRoot>
  );
}

/* eslint-disable @next/next/no-img-element -- covers may come from Open Library, Cloudinary or /public */
import { Fragment } from "react";
import { getSiteContent } from "@/content";
import { PageRoot } from "@/components/site/PageRoot";
import { SiteClosing } from "@/components/site/SiteClosing";
import { SitePopup } from "@/components/site/SitePopup";
import { Txt, safeHref } from "@/components/site/Txt";
import { pageMetadata } from "@/components/site/pageMetadata";
import { BOOK_SIZES, JOURNAL_ART, ZINE_ART } from "./fixed";
import "./page.css";
import "./extra.css";

export async function generateMetadata() {
  return pageMetadata((await getSiteContent()).resourcesMeta, "/resources");
}

type Book = Awaited<ReturnType<typeof getSiteContent>>["resourcesShelf"]["books"][number];

const TABS = ["Overview", "Key ideas", "Summary", "Our notes", "Applications", "Critique", "Connections"];

/** ★★★★½ for 4.5: whole stars, a half from .5, then empty stars to five. */
function stars(r: number) {
  const full = Math.floor(r);
  const half = r - full >= 0.5 ? 1 : 0;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(Math.max(0, 5 - full - half));
}

const coverUrl = (b: Book) => b.cover?.url ?? (/^\d{10,13}$/.test(b.isbn) ? `https://covers.openlibrary.org/b/isbn/${b.isbn}-L.jpg?default=false` : "");

function Cover({ b, className }: { b: Book; className: string }) {
  const src = coverUrl(b);
  return (
    <div
      className={`${className}${b.lightText ? " light" : ""}`}
      style={{ "--c1": b.cover1, "--c2": b.cover2, background: `linear-gradient(160deg,${b.cover1},${b.cover2})` } as React.CSSProperties}
    >
      <div>
        <small>{b.shelf}</small>
        <h4>{b.title}</h4>
        <em>{b.author}</em>
      </div>
      <div className="mark" />
      {src && <img src={src} alt="" loading="lazy" data-cover="" />}
    </div>
  );
}

function BookOnShelf({ b, i }: { b: Book; i: number }) {
  const [h, d] = BOOK_SIZES[i % BOOK_SIZES.length];
  return (
    <div className="book" style={{ "--h": h, "--d": d } as React.CSSProperties} data-i={i} data-g={b.shelf}>
      <div className={`spine${b.lightText ? " light" : ""}`} style={{ background: b.cover1 }}>
        <span>{b.title}</span>
      </div>
      <div className="open">
        <Cover b={b} className="cover" />
        <div className="info">
          <h5>{b.title}</h5>
          <div className="stars">
            {stars(b.rating)} <span className="rs-rating">{b.rating.toFixed(1)} / 5 Included VC rating</span>
          </div>
          <p className="rs-why">
            <Txt text={b.why} />
          </p>
          <dl>
            <dt>Published</dt>
            <dd>{b.published}</dd>
            <dt>Publisher</dt>
            <dd>{b.publisher}</dd>
            <dt>Pages</dt>
            <dd>{b.pages}</dd>
            <dt>Shelf</dt>
            <dd>{b.shelf}</dd>
          </dl>
          <button type="button" className="lnk" data-bk={i}>
            Open the book page
          </button>
        </div>
      </div>
    </div>
  );
}

function BookPage({ b, i, eyebrow, extraTags }: { b: Book; i: number; eyebrow: string; extraTags: string[] }) {
  return (
    <div className="modal bk" id={`bk${i}`} role="dialog" aria-label={b.title}>
      <div className="box">
        <button className="x" data-x="" aria-label="Close">
          &times;
        </button>
        <div className="hd">
          <Cover b={b} className="cv" />
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h3>{b.title}</h3>
            <div className="by">by {b.author}</div>
            <div className="rt">
              <b>{b.rating.toFixed(1)}</b>
              <span className="stars">{stars(b.rating)}</span>
              <span>Included VC rating, out of 5</span>
            </div>
            <div className="gen">
              {[b.shelf, ...extraTags].map((t, k) => (
                <i key={k}>{t}</i>
              ))}
            </div>
            <div className="meta">
              <span>
                Published <b>{b.published}</b>
              </span>
              <span>
                Publisher <b>{b.publisher}</b>
              </span>
              <span>
                Pages <b>{b.pages}</b>
              </span>
              <span>
                Format <b>{b.format}</b>
              </span>
            </div>
          </div>
        </div>
        <div className="tabs">
          {TABS.map((t, k) => (
            <button className={k === 0 ? "on" : undefined} data-p={k} key={k}>
              {t}
            </button>
          ))}
        </div>
        <div className="pn on">
          <dl>
            <dt>Why it is here</dt>
            <dd>
              <Txt text={b.why} />
            </dd>
            <dt>Shelf</dt>
            <dd>{b.shelf}</dd>
            <dt>Read it when</dt>
            <dd>{b.readWhen}</dd>
            <dt>Time to read</dt>
            <dd>{b.timeToRead}</dd>
          </dl>
        </div>
        <div className="pn">
          <div className="who">Three ideas to take with you</div>
          <ul>
            {b.ideas.map((x, k) => (
              <li key={k}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="pn">
          <div className="who">In a paragraph</div>
          <p>
            <Txt text={b.summary} />
          </p>
        </div>
        <div className="pn">
          <div className="who">Notes from the Included VC team</div>
          <p>
            <Txt text={b.notes} />
          </p>
        </div>
        <div className="pn">
          <div className="who">How Fellows use it</div>
          <p>
            <Txt text={b.applications} />
          </p>
        </div>
        <div className="pn">
          <div className="who">Where we disagree</div>
          <p>
            <Txt text={b.critique} />
          </p>
        </div>
        <div className="pn">
          <div className="who">Connected to</div>
          <div className="conn">
            {b.connections.map((x, k) => (
              <span key={k}>{x}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ResourcesPage() {
  const c = await getSiteContent();
  const { resourcesShelf: shelf, resourcesZines: zines, resourcesJournal: jrn, resourcesVideos: vids, resourcesNewsletter: nl } = c;
  const half = Math.ceil(shelf.books.length / 2);
  const rows = [shelf.books.slice(0, half), shelf.books.slice(half)];

  return (
    <PageRoot page="resources" data={{ newsletter: { to: nl.to, done: nl.done } }}>
      <section className="lib" id="shelf">
        <div className="wrap">
          <div className="top">
            <div>
              <div className="eyebrow">{shelf.eyebrow}</div>
              <h2>
                <Txt text={shelf.heading} />
              </h2>
              <p className="lede">
                <Txt text={shelf.lede} />
              </p>
            </div>
            <div className="tags" id="libtags">
              {shelf.shelves.map((t, i) => (
                <button type="button" className={i === 0 ? "on" : ""} key={i}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="shelf" id="shelf0">
            {rows.map((row, r) => (
              <Fragment key={r}>
                <div className="row" id={`shelfrow${r}`}>
                  {row.map((b, k) => (
                    <BookOnShelf b={b} i={r * half + k} key={k} />
                  ))}
                </div>
                <div className="plank" />
              </Fragment>
            ))}
          </div>
          <div className="count" id="libn" />
        </div>
        {shelf.books.map((b, i) => (
          <BookPage b={b} i={i} eyebrow={shelf.pageEyebrow} extraTags={shelf.extraTags} key={i} />
        ))}
      </section>

      <section className="zines">
        <div className="wrap">
          <div className="hd">
            <div>
              <div className="eyebrow">{zines.eyebrow}</div>
              <h2>
                <Txt text={zines.heading} />
              </h2>
            </div>
            <p className="lede rs-zine-lede">
              <Txt text={zines.lede} />
            </p>
          </div>
          <div className="fan" id="zfan">
            {zines.zines.map((z, i) => {
              const n = String(i + 1).padStart(2, "0");
              return (
                <div className="z" data-z={i} key={i}>
                  <div className="cv">
                    <svg
                      viewBox="0 0 200 330"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid slice"
                      dangerouslySetInnerHTML={{ __html: ZINE_ART[i % ZINE_ART.length] }}
                    />
                    <div className="n">{n}</div>
                  </div>
                  <div className="b">
                    <small>{zines.label}</small>
                    <h4>{z.title}</h4>
                    <p>{z.short}</p>
                  </div>
                  <div className="dt">
                    <small>Field notes &middot; Issue {n}</small>
                    <h4>{z.title}</h4>
                    <p>
                      <Txt text={z.long} />
                    </p>
                    <dl>
                      <dt>Format</dt>
                      <dd>{z.format}</dd>
                      <dt>Written by</dt>
                      <dd>{z.writtenBy}</dd>
                      <dt>Handed out</dt>
                      <dd>{z.handedOut}</dd>
                    </dl>
                    <a className="btn" href={safeHref(z.link.href)}>
                      {z.link.label}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="jrn" id="journal">
        <div className="wrap">
          <div className="eyebrow">{jrn.eyebrow}</div>
          <h2>
            <Txt text={jrn.heading} emClass="gt rs-plain" />
          </h2>
          <p className="lede">
            <Txt text={jrn.lede} />
          </p>
          <div className="feat">
            <div className="t">
              <div>
                <small>{jrn.featured.kicker}</small>
                <h3>{jrn.featured.title}</h3>
                <p>
                  <Txt text={jrn.featured.text} />
                </p>
              </div>
              <div className="meta">{jrn.featured.meta}</div>
              <a className="btn" href={safeHref(jrn.featured.link.href)}>
                {jrn.featured.link.label}
              </a>
            </div>
            <div className="art">
              <svg
                viewBox="0 0 200 330"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                dangerouslySetInnerHTML={{ __html: JOURNAL_ART[0] }}
              />
            </div>
          </div>
          <div className="grid">
            {jrn.posts.map((p, i) => (
              <a className="pst" href={safeHref(p.href)} key={i}>
                <div className="art">
                  <svg
                    viewBox="0 0 200 330"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    dangerouslySetInnerHTML={{ __html: JOURNAL_ART[1 + (i % (JOURNAL_ART.length - 1))] }}
                  />
                  <div className="side">
                    <span>Included VC &middot; {p.category}</span>
                  </div>
                </div>
                <div className="cap">
                  <small>{p.category}</small>
                  <h4>{p.title}</h4>
                  <div>{p.meta}</div>
                  <div className="brand">
                    Included<sup className="rs-sup">VC</sup> Journal
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="more">
            <a className="btn rs-white" href={safeHref(jrn.cta.href)}>
              {jrn.cta.label}
            </a>
          </div>
        </div>
      </section>

      <section className="sec cream">
        <section className="ivc-stories">
          <div className="ivc-wrap">
            <h2>{vids.heading}</h2>
            <div className="ivc-grid">
              {vids.videos
                .filter((v) => /^\d+$/.test(v.vimeoId))
                .map((v, i) => (
                  <figure key={i}>
                    <div className="ivc-video">
                      <iframe
                        src={`https://player.vimeo.com/video/${v.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
                        title={v.title}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <b>{v.title}</b>
                    </figcaption>
                  </figure>
                ))}
            </div>
          </div>
        </section>
      </section>

      <section className="sec cream" id="newsletter">
        <div className="wrap rs-nl">
          <div>
            <div className="eyebrow">{nl.eyebrow}</div>
            <h2>
              <Txt text={nl.heading} emClass="serif gt" />
            </h2>
            <p className="lede">
              <Txt text={nl.lede} />
            </p>
            <form className="rs-form" id="nlform">
              <input type="text" name="name" placeholder="Name" aria-label="Name" required />
              <input type="email" name="email" placeholder="Email" aria-label="Email" required />
              <select name="who" aria-label={nl.selectLabel} defaultValue="">
                <option value="">{nl.selectLabel}</option>
                {nl.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <button className="btn" type="submit">
                {nl.button}
              </button>
            </form>
          </div>
          <div className="constel">
            <canvas id="constel" />
          </div>
        </div>
      </section>

      <SiteClosing content={c.siteClosing} />
      <SitePopup content={c.sitePopup} />
    </PageRoot>
  );
}

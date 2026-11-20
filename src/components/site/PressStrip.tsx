/* eslint-disable @next/next/no-img-element -- logos may be Cloudinary or /public */
import type { PressStripContent } from "@/content/pages/parts";

/** "As featured in": a looping strip of press logos (the list is shown twice for the loop). */
export function PressStrip({ content: c }: { content: PressStripContent }) {
  return (
    <section className="ivc-press ivc-marq">
      <div className="ivc-head">
        <h2>{c.heading}</h2>
      </div>
      <div className="ivc-track-wrap">
        <div className="ivc-track" style={{ "--h": "52px", "--w": "170px" } as React.CSSProperties}>
          {c.logos.map((l, i) => (
            <div className="ivc-logo" key={i}>
              <img src={l.logo.url} alt={l.logo.alt || l.name} />
            </div>
          ))}
          {c.logos.map((l, i) => (
            <div className="ivc-logo ivc-dup" key={`d${i}`} aria-hidden="true">
              <img src={l.logo.url} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

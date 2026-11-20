/* eslint-disable @next/next/no-img-element -- logos may be Cloudinary or /public */
import type { OrbContent } from "@/content/pages/parts";
import { Txt } from "./Txt";

/**
 * The logo sphere. The page script animates it (ids: orbpin-<pin>, orbcv-<pin>,
 * lblG-<pin>, lblA-<pin>). "classic" is the original site's markup; "ascend"
 * is the landing-page style used on About and Ascend Africa.
 */
export function Orb({
  id,
  pin = id,
  small,
  variant = "classic",
  content: c,
  children,
}: {
  id: string;
  pin?: string;
  small?: boolean;
  variant?: "classic" | "ascend";
  content: OrbContent;
  /** Extra markup at the start of the section (e.g. an anchor). */
  children?: React.ReactNode;
}) {
  const ascend = variant === "ascend";
  const em = ascend ? ({ emTag: "em", emClass: "" } as const) : ({} as const);
  const lblEm = { emTag: ascend ? ("em" as const) : ("span" as const), emClass: "" };
  const head = (
    <div className="head">
      <div>
        <div className={ascend ? "eb" : "eyebrow"}>{c.eyebrow}</div>
        <h2>
          <Txt text={c.heading} {...em} />
        </h2>
      </div>
      {c.lede && (
        <p className="lede orb-lede">
          <Txt text={c.lede} />
        </p>
      )}
    </div>
  );
  return (
    <section className={`orb${small ? " small" : ""}`} id={id}>
      {children}
      <div className={ascend ? "w" : "wrap"}>{head}</div>
      <div className="stage">
        <div className="pin" id={`orbpin-${pin}`}>
          <canvas id={`orbcv-${pin}`} />
          {c.logos.map((l, i) => (
            <div className={`chip ${l.group === "global" ? "gl" : "af"}`} data-i={i} title={l.name} key={i}>
              <img src={l.logo.url} alt={l.logo.alt || l.name} data-k={l.scale} />
            </div>
          ))}
          <div className="lbl" id={`lblG-${pin}`}>
            <b>{c.globalLabel.title}</b>
            <h3>
              <Txt text={c.globalLabel.heading} {...lblEm} />
            </h3>
          </div>
          <div className="lbl" id={`lblA-${pin}`}>
            <b>{c.africaLabel.title}</b>
            <h3>
              <Txt text={c.africaLabel.heading} {...lblEm} />
            </h3>
          </div>
          {c.hint && <div className="hint">{c.hint}</div>}
        </div>
      </div>
    </section>
  );
}

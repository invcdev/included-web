import type { z } from "zod";
import type { sharedSchemas } from "@/content/pages/shared";
import { Txt, safeHref } from "./Txt";

type Content = z.infer<typeof sharedSchemas.siteClosing>;

/** The "Ready to ascend?" band that closes every site page. */
export function SiteClosing({ content: c }: { content: Content }) {
  return (
    <section className="door cta2">
      <div className="wrap">
        <small>{c.small}</small>
        <h2>
          <Txt text={c.heading} />
        </h2>
        <p className="csub">
          <Txt text={c.sub} />
        </p>
        <p className="cdate">
          <Txt text={c.date} />
        </p>
        <a className="btn" href={safeHref(c.cta.href)}>
          {c.cta.label}
        </a>
      </div>
    </section>
  );
}

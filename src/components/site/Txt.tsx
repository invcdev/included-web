import React from "react";

/**
 * Editable text on the site pages. The same small format as the landing page:
 *   **bold**   *light part of a heading*   [link text](https://example.com)
 * plus a line break for each new line. `*…*` becomes the lighter half of a
 * two-tone heading (a `<span>` with `emClass`, "gt" by default), which is how
 * the original pages style it. Anything else is plain text, so admin input can
 * never inject HTML.
 */
const TOKEN = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)|\n/g;

export function Txt({
  text,
  emClass = "gt",
  emTag = "span",
  linkClass,
}: {
  text: string;
  emClass?: string;
  /** Some designs style the light part as an `<em>` instead of a `<span>`. */
  emTag?: "span" | "em";
  linkClass?: string;
}) {
  const Em = emTag;
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[0] === "\n") out.push(<br key={i++} />);
    else if (m[1] !== undefined) out.push(<b key={i++}>{m[1]}</b>);
    else if (m[2] !== undefined)
      out.push(
        <Em key={i++} className={emClass || undefined}>
          {m[2]}
        </Em>,
      );
    else
      out.push(
        <A key={i++} href={m[4]} className={linkClass} newTab>
          {m[3]}
        </A>,
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Only safe link targets. Inline text links to other sites open in a new tab, like the landing page's. */
export function safeHref(href: string) {
  return /^(https?:|mailto:|tel:|#|\/)/.test(href) ? href : "#";
}

export function A({
  href,
  newTab,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; newTab?: boolean }) {
  const safe = safeHref(href);
  const ext = newTab && /^https?:/.test(safe);
  return (
    <a href={safe} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}

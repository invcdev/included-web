import React from "react";

/**
 * Renders the small inline format used in editable text:
 *   **bold**   *italic*   [link text](https://example.com)
 * Anything else is plain text, so admin input can never inject HTML.
 */
const TOKEN = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

type Props = {
  text: string;
  /** Optional classes for the formatted parts. */
  classNames?: { strong?: string; em?: string; a?: string };
};

export function RichText({ text, classNames: cn = {} }: Props) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={i++} className={cn.strong}>{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<em key={i++} className={cn.em}>{m[2]}</em>);
    else {
      const href = m[4];
      const safe = /^(https?:|mailto:|tel:|#|\/)/.test(href) ? href : "#";
      out.push(
        <a key={i++} href={safe} className={cn.a} {...(safe.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {m[3]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

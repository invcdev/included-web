import { Txt } from "./Txt";

/**
 * Longer editable text: paragraphs separated by a blank line, and a block
 * whose lines all start with "- " becomes a bulleted list.
 */
export function Blocks({ text, emClass }: { text: string; emClass?: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .map((b) => b.trim())
        .filter(Boolean)
        .map((b, i) => {
          const lines = b.split("\n");
          if (lines.every((l) => l.startsWith("- ")))
            return (
              <ul key={i}>
                {lines.map((l, j) => (
                  <li key={j}>
                    <Txt text={l.slice(2)} emClass={emClass} />
                  </li>
                ))}
              </ul>
            );
          return (
            <p key={i}>
              <Txt text={b} emClass={emClass} />
            </p>
          );
        })}
    </>
  );
}

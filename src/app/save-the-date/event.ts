import type { SiteContent } from "@/content";

type EventContent = SiteContent["saveTheDate"]["event"];

const UK = "Europe/London";

/** The UTC instant of a UK wall-clock date and time (GMT in winter, BST in summer). */
function ukToUtc(date: string, time: string): Date {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const offset = new Intl.DateTimeFormat("en-GB", { timeZone: UK, timeZoneName: "shortOffset" })
    .formatToParts(new Date(guess))
    .find((p) => p.type === "timeZoneName")!.value; // "GMT" or "GMT+1"
  const hours = Number(offset.replace("GMT", "") || 0);
  return new Date(guess - hours * 3_600_000);
}

/** 20261201T120000Z */
const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Everything the page and the calendar file need, worked out from the editable event. */
export function eventDetails(e: EventContent) {
  const start = ukToUtc(e.date, e.time);
  const end = new Date(start.getTime() + e.durationMinutes * 60_000);
  const S = stamp(start);
  const E = stamp(end);
  const enc = encodeURIComponent;
  return {
    start,
    end,
    dateText: new Intl.DateTimeFormat("en-GB", { timeZone: UK, weekday: "long", day: "numeric", month: "long" }).format(start),
    timeText: new Intl.DateTimeFormat("en-GB", { timeZone: UK, hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(start),
    google:
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${enc(e.title)}&dates=${S}/${E}&details=${enc(e.details)}&location=${enc(e.location)}`,
    outlook:
      "https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent" +
      `&subject=${enc(e.title)}&startdt=${start.toISOString()}&enddt=${end.toISOString()}` +
      `&body=${enc(e.details)}&location=${enc(e.location)}`,
    yahoo:
      "https://calendar.yahoo.com/?v=60" +
      `&title=${enc(e.title)}&st=${S}&et=${E}&desc=${enc(e.details)}&in_loc=${enc(e.location)}`,
    ics: icsFile(e, S, E),
  };
}

/** Text for an iCalendar property: backslash, semicolon, comma and line breaks escaped. */
const icsText = (v: string) => v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** iCalendar lines may be at most 75 bytes; longer ones continue on lines starting with a space. */
function fold(line: string) {
  const bytes = new TextEncoder();
  const out: string[] = [];
  let cur = "";
  for (const ch of line) {
    const limit = out.length ? 74 : 75; // continuation lines lose a byte to the leading space
    if (bytes.encode(cur + ch).length > limit) {
      out.push(cur);
      cur = ch;
    } else cur += ch;
  }
  out.push(cur);
  return out.join("\r\n ");
}

function icsFile(e: EventContent, S: string, E: string) {
  return (
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Included VC//Ascend//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:ascend-launch-${S}@included.vc`,
      `DTSTAMP:${S}`,
      `DTSTART:${S}`,
      `DTEND:${E}`,
      `SUMMARY:${icsText(e.title)}`,
      `DESCRIPTION:${icsText(e.details)}`,
      `LOCATION:${icsText(e.location)}`,
      `URL:${e.url}`,
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${icsText(e.title)}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .map(fold)
      .join("\r\n") + "\r\n"
  );
}

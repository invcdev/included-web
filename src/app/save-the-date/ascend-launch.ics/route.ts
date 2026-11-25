import { getSiteContent } from "@/content";
import { eventDetails } from "../event";

/** The calendar file behind the Apple button (and desktop Outlook): built from the editable event. */
export async function GET() {
  const { saveTheDate } = await getSiteContent();
  return new Response(eventDetails(saveTheDate.event).ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ascend-launch.ics"',
    },
  });
}

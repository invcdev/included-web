import { getSiteContent } from "@/content";
import { Hero } from "@/components/home/Hero";
import { Press } from "@/components/home/Press";
import { Network } from "@/components/home/Network";
import { FounderLetter } from "@/components/home/FounderLetter";
import { Introducing } from "@/components/home/Introducing";
import { SeatCta } from "@/components/home/SeatCta";
import { Climb } from "@/components/home/Climb";
import { Curriculum } from "@/components/home/Curriculum";
import { Outcomes } from "@/components/home/Outcomes";
import { Month } from "@/components/home/Month";
import { TuesdaySlot, AFRICA_CITIES } from "@/components/home/TuesdaySlot";
import { AfricaSessions } from "@/components/home/AfricaSessions";
import { Faculty } from "@/components/home/Faculty";
import { BuiltForAfrica } from "@/components/home/BuiltForAfrica";
import { WhoItsFor } from "@/components/home/WhoItsFor";
import { Audience } from "@/components/home/Audience";
import { Stories } from "@/components/home/Stories";
import { Alumni } from "@/components/home/Alumni";
import { Countries } from "@/components/home/Countries";
import { Deal } from "@/components/home/Deal";
import { Ticket } from "@/components/home/Ticket";
import { OurPromise } from "@/components/home/OurPromise";
import { Employers } from "@/components/home/Employers";
import { Values } from "@/components/home/Values";
import { Join } from "@/components/home/Join";
import { Tldr } from "@/components/home/Tldr";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { pageMetadata } from "@/components/site/pageMetadata";

/* Green replaces the purple on this page: the .theme-africa wrapper switches the colour variables
   (src/app/globals.css); these are the colours set in code. */
const GREEN_BAND = "linear-gradient(90deg, #2F8F43, #9ED23A, #C9CD35, #9ED23A, #2F8F43)";
const WEEK_GREENS = [
  "#2F8F43", "#37994a", "#49a74f", "#5bb44f", "#6DC24B", "#7fc244", "#8fc93f",
  "#9ED23A", "#a8d138", "#b4d037", "#bfcf36", "#C9CD35", "#dcc63f", "#C9CD35",
];

export async function generateMetadata() {
  return pageMetadata((await getSiteContent()).africaMeta, "/ascend-africa");
}

/*
 * Ascend Africa: the landing page's sections in the Africa design's order
 * (TLDR early, two Africa-only sections), in the Africa design's greens.
 * Sections that read the same on both pages use the landing page's content
 * (edited once, under "Ascend"); the rest have Africa versions ("Ascend Africa"
 * in the admin). The "Take your seat" bands match the landing page.
 */
export default async function AscendAfricaPage() {
  const c = await getSiteContent();
  return (
    <div className="theme-africa">
      <Hero content={c.africaHero} />
      <Press content={c.press} />
      <Network content={c.africaNetwork} />
      <FounderLetter content={c.founderLetter} />
      <Introducing content={c.africaIntroducing} />
      <Tldr content={c.tldr} />
      <SeatCta
        id="take-your-seat"
        content={c.seatCtas.afterIntroducing}
        quoteWidth={460}
        border={GREEN_BAND}
      />
      <Climb content={c.africaClimb} />
      <Curriculum content={c.africaCurriculum} weekColors={WEEK_GREENS} />
      <Outcomes content={c.outcomes} />
      <Month content={c.africaMonth} />
      <TuesdaySlot content={c.africaTuesdays} cities={AFRICA_CITIES} />
      <SeatCta
        id="start-in-january"
        content={c.seatCtas.afterTuesdays}
        quoteWidth={520}
        border={GREEN_BAND}
        ring
      />
      <AfricaSessions content={c.africaSessions} />
      <Faculty content={c.africaFaculty} />
      <BuiltForAfrica content={c.africaBuilt} />
      <WhoItsFor content={c.everyoneIncluded} />
      <Audience content={c.audience} />
      <Stories content={c.stories} />
      <Alumni content={c.alumni} />
      <Countries content={c.africaCountries} />
      <SeatCta
        id="join-in-january"
        content={c.seatCtas.afterCountries}
        border={GREEN_BAND}
        ring
      />
      <Deal content={c.deal} />
      <Ticket content={c.africaTicket} defaultTrack={1} />
      <OurPromise content={c.promise} />
      <Employers content={c.employers} />
      <Values content={c.values} />
      <SeatCta
        id="seat-after-values"
        content={c.seatCtas.afterValues}
        topSpace={29}
        quoteWidth={460}
        border={GREEN_BAND}
        ring
      />
      <Join content={c.africaJoin} />
      <Faq content={c.faq} />
      <FinalCta content={c.africaFinalCta} />
    </div>
  );
}

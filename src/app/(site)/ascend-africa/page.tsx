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

export async function generateMetadata() {
  return pageMetadata((await getSiteContent()).africaMeta, "/ascend-africa");
}

/*
 * Ascend Africa: the landing page's sections in the Africa design's order.
 * Sections that read the same on both pages use the landing page's content
 * (edited once, under "Ascend"); the rest have Africa versions ("Ascend Africa"
 * in the admin). The "Take your seat" bands match the landing page.
 */
export default async function AscendAfricaPage() {
  const c = await getSiteContent();
  return (
    <>
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
        border="linear-gradient(90deg, #67defa 0%, #6feff7 5%, #7af3b4 20%, #94f777 35%, #b8fc53 50%, #c1fd51 55%, #a6fb60 65%, #87f594 80%, #74f1d3 95%, #71f0e8 100%)"
      />
      <Climb content={c.africaClimb} />
      <Curriculum content={c.africaCurriculum} />
      <Outcomes content={c.outcomes} />
      <Month content={c.africaMonth} />
      <TuesdaySlot content={c.africaTuesdays} cities={AFRICA_CITIES} />
      <SeatCta
        id="start-in-january"
        content={c.seatCtas.afterTuesdays}
        quoteWidth={520}
        border="linear-gradient(90deg, #7cf3af 0%, #76f0c7 5%, #70eff4 15%, #6ae2fb 20%, #59bcf4 30%, #4d97ef 40%, #4872e9 50%, #494de5 60%, #4e3be3 65%, #4c40e3 70%, #4866e9 80%, #4a8aed 90%, #53adf2 100%)"
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
        border="linear-gradient(90deg, #72f1e6 0%, #6ae7fb 7%, #5ac1f5 17%, #4d9bef 27%, #4776eb 37%, #4951e5 47%, #4e3ce3 55%, #4a4ee5 62%, #4773ea 72%, #4d98ef 82%, #59bdf4 92%, #66dcf9 100%)"
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
        border="linear-gradient(90deg, #a9f75a 0%, #86f59a 12%, #74f1d0 28%, #6ce7fb 42%, #59bdf4 56%, #4b8eee 70%, #4866e9 84%, #5035e2 100%)"
        ring
      />
      <Join content={c.africaJoin} />
      <Faq content={c.faq} />
      <FinalCta content={c.africaFinalCta} />
    </>
  );
}

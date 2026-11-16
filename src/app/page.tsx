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
import { TuesdaySlot } from "@/components/home/TuesdaySlot";
import { Faculty } from "@/components/home/Faculty";

export default function Home() {
  return (
    <>
      <Hero />
      <Press />
      <Network />
      <FounderLetter />
      <Introducing />
      <SeatCta
        id="take-your-seat"
        testimonial={{
          quote: "\u201cIncluded VC is by far the best thing I\u2019ve ever been a part of.\u201d",
          name: "Sofia Haq",
          role: "Investment Associate, VamosVentures, Fellow 2021",
          quoteWidth: 460,
        }}
        heading={["Most resolutions have no start time.", "This one does: Tuesday 5 January, 16:00."]}
        note="About ten minutes, start to finish."
        border="linear-gradient(90deg, #67defa 0%, #6feff7 5%, #7af3b4 20%, #94f777 35%, #b8fc53 50%, #c1fd51 55%, #a6fb60 65%, #87f594 80%, #74f1d3 95%, #71f0e8 100%)"
      />
      <Climb />
      <Curriculum />
      <Outcomes />
      <Month />
      <TuesdaySlot />
      <SeatCta
        id="start-in-january"
        testimonial={{
          quote: "\u201cCan I redo the Fellowship? That was my first question after the summit.\u201d",
          name: "Margarita de la Pe\u00f1a Virg\u00f3s",
          role: "Investment Lead LatAm, Zacua Ventures, Fellow 2023",
          quoteWidth: 520,
        }}
        heading={["Fourteen Tuesdays. Starts 5 January 2027."]}
        note="About ten minutes, start to finish."
        border="linear-gradient(90deg, #7cf3af 0%, #76f0c7 5%, #70eff4 15%, #6ae2fb 20%, #59bcf4 30%, #4d97ef 40%, #4872e9 50%, #494de5 60%, #4e3be3 65%, #4c40e3 70%, #4866e9 80%, #4a8aed 90%, #53adf2 100%)"
        ring
      />
      <Faculty />
    </>
  );
}

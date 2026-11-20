/** Alumni & Community page (/alumni). */
import { z } from "zod";
import { imageSchema, linkSchema } from "../blocks";
import { img } from "./img";
import { CLASSIC_LABELS, orbSchema } from "./parts";
import { pageMetaSchema } from "./shared";

export const alumniSchemas = {
  alumniMeta: pageMetaSchema,
  alumniHero: z.object({ crumbs: z.string(), eyebrow: z.string(), heading: z.string(), lede: z.string(), image: imageSchema }),
  alumniMap: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
    hubs: z
      .array(
        z.object({
          city: z.string(),
          country: z.string(),
          lat: z.number().min(-90).max(90),
          lng: z.number().min(-180).max(180),
        }),
      )
      .describe("Cities lit on the globe, with a button each. Latitude and longitude in degrees."),
    hint: z.string(),
  }),
  alumniSpotlight: z.object({ eyebrow: z.string(), pill: z.string(), pill2: z.string() }),
  alumniOrb: orbSchema,
  alumniFellows: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    more: z.string(),
    wallEyebrow: z.string(),
    wallHeading: z.string(),
    fellows: z
      .array(
        z.object({
          name: z.string(),
          role: z.string(),
          year: z.string(),
          photo: imageSchema,
          quote: z.string().describe("Shown on the wall."),
          spotlight: z.string().describe("Shown in the Alumni spotlight."),
          story: z.string().describe("The full story, opened from the wall. Separate paragraphs with a blank line."),
        }),
      )
      .min(2)
      .describe("Every fellow appears in the spotlight, on the wall and with their full story."),
    photos: z.array(z.object({ name: z.string(), photo: imageSchema })).min(1).describe("Portrait tiles on the wall."),
    logos: z.array(z.object({ name: z.string(), logo: imageSchema })).min(1).describe("Logo tiles on the wall."),
  }),
  alumniStories: z.object({
    heading: z.string(),
    sideTitle: z.string(),
    sideText: z.string(),
    videos: z.array(
      z.object({
        title: z.string(),
        subtitle: z.string(),
        vimeoId: z.string().describe("The number at the end of the Vimeo link. Empty shows “Video coming soon”."),
      }),
    ),
  }),
  alumniBlog: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lede: z.string(),
    featured: z.object({ kicker: z.string(), title: z.string(), text: z.string(), meta: z.string() }),
    posts: z.array(z.object({ kicker: z.string(), title: z.string(), text: z.string(), meta: z.string(), href: z.string() })),
    cta: linkSchema,
  }),
  alumniLive: z.object({ eyebrow: z.string(), heading: z.string(), lede: z.string() }),
};

type Content = { [K in keyof typeof alumniSchemas]: z.infer<(typeof alumniSchemas)[K]> };

export const alumniDefaults: Content = {
  alumniMeta: {
    title: "Alumni & Community",
    description: "Hear from the Included VC community: alumni in more than forty countries, in their own words.",
  },
  alumniHero: {
    crumbs: "[Universe](/) / Alumni",
    eyebrow: "Signals from the family",
    heading: "Hear from *our community.*",
    lede: "With almost 85% of our alumni building and scaling major global projects, their insights are yours to learn from.",
    image: img("/site/alumni-hero.jpg"),
  },
  alumniMap: {
    eyebrow: "Where our alumni are",
    heading: "There's an Included VC mafia *in almost every corner of the world.*",
    lede: "That's what the alumni call themselves. Fellows and alumni are building from more than forty countries. Spin the globe, or pick a city.",
    stats: [
      {
        "value": "40+",
        "label": "Countries"
      },
      {
        "value": "6",
        "label": "Continents"
      },
      {
        "value": "55k+",
        "label": "Community"
      },
      {
        "value": "85%",
        "label": "Now in investment"
      }
    ],
    hubs: [
      {
        "city": "London",
        "country": "United Kingdom",
        "lat": 51.5,
        "lng": -0.12
      },
      {
        "city": "Lagos",
        "country": "Nigeria",
        "lat": 6.45,
        "lng": 3.4
      },
      {
        "city": "Nairobi",
        "country": "Kenya",
        "lat": -1.29,
        "lng": 36.8
      },
      {
        "city": "New York",
        "country": "United States",
        "lat": 40.7,
        "lng": -74
      },
      {
        "city": "Berlin",
        "country": "Germany",
        "lat": 52.5,
        "lng": 13.4
      },
      {
        "city": "São Paulo",
        "country": "Brazil",
        "lat": -23.5,
        "lng": -46.6
      },
      {
        "city": "Mumbai",
        "country": "India",
        "lat": 19.1,
        "lng": 72.9
      },
      {
        "city": "Singapore",
        "country": "Singapore",
        "lat": 1.35,
        "lng": 103.8
      },
      {
        "city": "Cape Town",
        "country": "South Africa",
        "lat": -33.9,
        "lng": 18.4
      },
      {
        "city": "Paris",
        "country": "France",
        "lat": 48.9,
        "lng": 2.35
      },
      {
        "city": "Toronto",
        "country": "Canada",
        "lat": 43.7,
        "lng": -79.4
      },
      {
        "city": "Dubai",
        "country": "UAE",
        "lat": 25.2,
        "lng": 55.3
      },
      {
        "city": "Mexico City",
        "country": "Mexico",
        "lat": 19.4,
        "lng": -99.1
      },
      {
        "city": "Sydney",
        "country": "Australia",
        "lat": -33.9,
        "lng": 151.2
      },
      {
        "city": "Accra",
        "country": "Ghana",
        "lat": 5.6,
        "lng": -0.19
      },
      {
        "city": "Madrid",
        "country": "Spain",
        "lat": 40.4,
        "lng": -3.7
      }
    ],
    hint: "Drag to spin · hover a city",
  },
  alumniSpotlight: { eyebrow: "Alumni spotlight", pill: "Words of wisdom", pill2: "Included VC alumni" },
  alumniOrb: {
    eyebrow: "Destinations",
    heading: "Where our alumni *have gone.*",
    ...CLASSIC_LABELS,
    logos: [
      {
        "name": "27V",
        "file": "27v"
      },
      {
        "name": "4P Capital",
        "file": "4pcapital"
      },
      {
        "name": "Ananda Impact Ventures",
        "file": "anandaimpactventures"
      },
      {
        "name": "Apx",
        "file": "apx"
      },
      {
        "name": "Atomico",
        "file": "atomico"
      },
      {
        "name": "Balderton",
        "file": "balderton"
      },
      {
        "name": "Blume",
        "file": "blume"
      },
      {
        "name": "Btov",
        "file": "btov"
      },
      {
        "name": "Capital Mills",
        "file": "capitalmills"
      },
      {
        "name": "Carbon13",
        "file": "carbon13"
      },
      {
        "name": "Columbia Lake Partners",
        "file": "columbialakepartners"
      },
      {
        "name": "Distill Ventures",
        "file": "distillventures"
      },
      {
        "name": "Dtcp",
        "file": "dtcp"
      },
      {
        "name": "Founders Factory Africa",
        "file": "foundersfactoryafrica"
      },
      {
        "name": "Frontline",
        "file": "frontline"
      },
      {
        "name": "Golden Ventures",
        "file": "goldenventures"
      },
      {
        "name": "Hummingbird",
        "file": "hummingbird"
      },
      {
        "name": "Hv Capital",
        "file": "hvcapital"
      },
      {
        "name": "Iccp Sbi",
        "file": "iccpsbi"
      },
      {
        "name": "Inmotion",
        "file": "inmotion"
      },
      {
        "name": "Invisto",
        "file": "invisto"
      },
      {
        "name": "Jme Ventures",
        "file": "jmeventures"
      },
      {
        "name": "Joyance Partners",
        "file": "joyancepartners"
      },
      {
        "name": "Jua Fund",
        "file": "juafund"
      },
      {
        "name": "Kavedon Kapital",
        "file": "kavedonkapital"
      },
      {
        "name": "Kaya",
        "file": "kaya"
      },
      {
        "name": "Kibo Ventures",
        "file": "kiboventures"
      },
      {
        "name": "Lantis",
        "file": "lantis"
      },
      {
        "name": "Launch Africa",
        "file": "launchafrica"
      },
      {
        "name": "M12",
        "file": "m12"
      },
      {
        "name": "Matrix Partners",
        "file": "matrixpartners"
      },
      {
        "name": "Mdr Lab",
        "file": "mdrlab"
      },
      {
        "name": "Nextech",
        "file": "nextech"
      },
      {
        "name": "Octopus Ventures",
        "file": "octopusventures"
      },
      {
        "name": "Pi Labs",
        "file": "pilabs"
      },
      {
        "name": "Playfair Capital",
        "file": "playfaircapital"
      },
      {
        "name": "Rally Cap Ventures",
        "file": "rallycapventures"
      },
      {
        "name": "Redstone",
        "file": "redstone"
      },
      {
        "name": "Samos Investments",
        "file": "samosinvestments"
      },
      {
        "name": "Sequoia",
        "file": "sequoia"
      },
      {
        "name": "Seraphim Capital",
        "file": "seraphimcapital"
      },
      {
        "name": "Silicon Allee",
        "file": "siliconallee"
      },
      {
        "name": "Tc",
        "file": "tc"
      },
      {
        "name": "T Capital",
        "file": "tcapital"
      },
      {
        "name": "Tenzing",
        "file": "tenzing"
      },
      {
        "name": "Tupper Lake Partners",
        "file": "tupperlakepartners"
      },
      {
        "name": "Unshackled Ventures",
        "file": "unshackledventures"
      },
      {
        "name": "Upload",
        "file": "upload"
      },
      {
        "name": "Village Global",
        "file": "villageglobal"
      },
      {
        "name": "Warner Music Group",
        "file": "warnermusicgroup"
      },
      {
        "name": "Wave Ventures",
        "file": "waveventures"
      },
      {
        "name": "Zacua Ventures",
        "file": "zacuaventures"
      },
      {
        "name": "Zubi Capital",
        "file": "zubicapital"
      }
    ].map(({ name, file }) => ({ name, logo: img(`/site/alogos/${file}.png`, name), group: "global" as const })),
  },
  alumniFellows: {
    eyebrow: "Included VC Fellows",
    heading: "In their *own words.*",
    lede: "Fellows and alumni on what the programme did for them. The wall refreshes itself every few seconds.",
    more: "Read more",
    wallEyebrow: "Included VC Fellows and alumni",
    wallHeading: "Everyone, *in their own words.*",
    fellows: [
      {
        name: "Soo Min Hong",
        role: "Analyst @ Pale Blue Dot",
        year: "2020",
        photo: img("/site/p0.jpg"),
        quote: "I got my first job in VC thanks to Included VC. The moment the team heard I'd gotten into Included VC, something shifted.",
        spotlight: "I got my first job in VC thanks to Included VC. The moment the team heard I'd gotten into Included VC, something shifted.",
        story: "Included VC goes beyond classic diversity initiatives. There's the practical component, but also so much heart and community, which is what's mainly behind its insane success.\n\nI got my first job in VC thanks to Included VC, quite honestly simply because of its brand name. The moment the team heard I'd gotten into Included VC, something shifted. And here I am now 6+ months in a VC role. It's crazy!\n\nAt first I did wonder if it was just the brand name, but attending the Fellowship, meeting other Fellows I realise it's because the quality of people involved is unbeaten. Folks are being vetted before they get recruited into VC, which makes so much sense.\n\nIt changed my life!",
      },
      {
        name: "Sofia Haq",
        role: "Investment Associate @ VamosVentures",
        year: "2021",
        photo: img("/site/p1.jpg"),
        quote: "Included VC is by far the best thing I've ever been a part of.",
        spotlight: "Included VC is by far the best thing I've ever been a part of.",
        story: "There is a reason why Included VC is one of the most competitive Fellowships out there. There is a reason why alumni can't stop raving about it. There is a reason why so many, despite not being accepted, continue to apply over and over again. There is a reason why once you're \"in\" you're a part of a community that is so valuable.\n\nIncluded VC is by far the best thing I've ever been a part of. This Fellowship gave me so much professionally: the hands-on knowledge from Partners all around the world, the network, and the ability to do things I never thought I could do. It also gave me so much personally: a diverse and supportive community, and friendships with people all over the world.\n\nIncluded VC exceeded my expectations. It challenged me in more ways than I could have imagined. A huge thank you to Niki, the Partners, speakers, and alumni for their dedication, kindness, support, and encouragement.",
      },
      {
        name: "Ashna Oukabay",
        role: "Included VC Alumni",
        year: "2021",
        photo: img("/site/p2.jpg"),
        quote: "I'd recommend INVC to any aspiring VC over a masters degree from the fanciest biz school.",
        spotlight: "I'd recommend INVC to any aspiring VC over a masters degree from the fanciest biz school.",
        story: "I'd recommend INVC to any aspiring VC (brace yourself for a controversial opinion) over a masters degree from the fanciest biz school.\n\nYou're gaining unparalleled, no frills, insider knowledge and skills straight from the source.\n\nYou're gaining mentors that take a passionate and personal interest in your success.\n\nYou're gaining a global family who will back you for LIFE.",
      },
      {
        name: "Lucas Kuziv",
        role: "Investor, Beacon Capital",
        year: "2022",
        photo: img("/site/p3.jpg"),
        quote: "Included VC was a life-changing experience. The depth shared by practitioners from top-performing funds took it to the next level.",
        spotlight: "Included VC was a life-changing experience. The depth shared by practitioners from top-performing funds took it to the next level.",
        story: "Included VC was a life-changing experience: although I had some knowledge of the VC industry, the depth and details shared by practitioners from the top-performing VC funds took it to the next level!\n\nAnother unique aspect of INVC is the community and sense of belonging. I was challenged, I had to get out of my comfort zone, get disciplined and explore topics unknown to me previously.\n\nNiki has been a great mentor and fostered the INVC community and made the fellows feel welcomed and appreciated. They have created something magical indeed!\n\nFinally, the lifelong friendships I've made are very rare and I know that I have a trusted circle of like-minded friends that are always there to help and support me!",
      },
      {
        name: "Sijue Zhao",
        role: "Included VC Alumni",
        year: "2022",
        photo: img("/site/p4.jpg"),
        quote: "I graduated with a wealth of unspoken insights that can be found nowhere outside of this Fellowship.",
        spotlight: "I graduated with a wealth of unspoken insights that can be found nowhere outside of this Fellowship.",
        story: "In the beginning, I thought I got into a Fellowship that could teach me more about venture investing. And indeed, I graduated with a wealth of unspoken insights that can be found nowhere outside of this Fellowship.\n\nBut more importantly and unexpectedly, Included VC taught me a few life lessons that will undoubtedly positively impact my life, namely, showing genuine gratitude, always being kind, and going above and beyond.\n\nAt the same time, the Included VC magic brought together 50+ unbelievably bright, warm, and kind individuals who will continue to bring light and smiles to people around them.\n\nI feel proud to call them my friends. These people, including myself, may not have had the chance to amplify our positive influence, but Included VC gave us the stage in VC and magnified the possibility. And I firmly believe that countless other lives will also indirectly improve because of this.",
      },
      {
        name: "Margarita de la Peña Virgós",
        role: "Investment Lead, LatAm @ Zacua Ventures",
        year: "2023",
        photo: img("/site/p5.jpg"),
        quote: "Can I redo the Fellowship? That was my first question after the summit.",
        spotlight: "Can I redo the Fellowship? That was my first question after the summit.",
        story: "Can I redo the Fellowship?\n\nThat was my first question after the summit ;)\n\nIt has been such a positive and extraordinary experience that I would start over again. From law to VC was not easy, but I made it! Included VC gave me the tools to believe I could and will always be grateful.",
      },
      {
        name: "Leen Segers",
        role: "Managing Director, ForsVC",
        year: "2023",
        photo: img("/site/p6.jpg"),
        quote: "Included VC is the warp-speed ticket into the world of VC.",
        spotlight: "Included VC is the warp-speed ticket into the world of VC.",
        story: "Included VC is the warp-speed ticket into the world of VC, delivering an unparalleled blend of theory and hands-on experience. The Fellowship's focal point is a rapid acceleration of practical knowledge, featuring masterclasses led by some of the most respected venture capitalists.\n\nEach session is a sheer delight, and the collective enthusiasm within the group adds an extra layer of energy to the learning experience.\n\nIt's a transformative journey, akin to a once-in-a-lifetime return to the school benches, propelling growth and insight at an astonishing pace.",
      },
      {
        name: "Jelisaveta Ilić",
        role: "Included VC Alumni",
        year: "2024",
        photo: img("/site/p7.jpg"),
        quote: "The Included VC community is one-of-a-kind, irreplaceable and unique. I would like to repeat it all over again.",
        spotlight: "The Included VC community is one-of-a-kind, irreplaceable and unique. I would like to repeat it all over again.",
        story: "The Included VC community is one-of-a-kind, irreplaceable and unique. Where else could you discuss the startup ecosystem in Tanzania, discover novel biotech companies in Italy or read about investable beauty brands, all in one week?\n\nThese past 7 months of masterclasses, workshops, many 1-1s, discussions with Partners and simulations of Investment Committees were so precious.\n\nI would like to repeat it all over again.\n\nIncluded VC gives you tools, knowledge, advice, network and most of all the push and motivation for success. It is a privilege being part of it.",
      },
      {
        name: "Amisha Kalra",
        role: "Advent International",
        year: "2024",
        photo: img("/site/p0.jpg"),
        quote: "Included VC gave me all the benefits of being a 'nepo baby' without having been born into privilege.",
        spotlight: "Included VC gave me all the benefits of being a 'nepo baby' without having been born into privilege.",
        story: "Included VC gave me all the benefits of being a 'nepo baby' without having been born into privilege.\n\nIt's so so much more than a network and learning. Anyone can put you in touch with anyone if you try but Included VC gives you a cult of people dedicated to your personal development and professional achievement.\n\nPeople at every stage of their career, all completely dedicated to the cause. It is the definition of serendipity and the most incredible journey I have ever been on.",
      },
      {
        name: "Sudarshan GC",
        role: "Included VC Alumni",
        year: "2025",
        photo: img("/site/p1.jpg"),
        quote: "What truly resonates with me is the newfound confidence and the invaluable, diverse network that has become a lifelong asset.",
        spotlight: "What truly resonates with me is the newfound confidence and the invaluable, diverse network that has become a lifelong asset.",
        story: "As a Nepalese and also a person with only a science background and academic experience, I initially believed breaking into VC was a formidable challenge.\n\nHowever, my perspective underwent a complete transformation through my involvement in Included VC. More than the knowledge and practical experience I acquired, what truly resonates with me is the newfound confidence and the invaluable, diverse network that has become a lifelong asset.\n\nI take pride in having been a Fellow and having the opportunity to connect with exceptional leaders and mentors such as Nikita and the Venture Partners. This Fellowship has not only broadened my horizons but has also become a source of pride and accomplishment in my professional journey.",
      },
      {
        name: "Letícia Aburad",
        role: "Included VC Alumni",
        year: "2025",
        photo: img("/site/p2.jpg"),
        quote: "What I found exceeded my wildest expectations. It's been a life-changing opportunity.",
        spotlight: "What I found exceeded my wildest expectations. It's been a life-changing opportunity.",
        story: "When I first joined, I wasn't entirely sure what to expect, but what I found exceeded my wildest expectations. Included VC has introduced me to a world of incredible VC professionals who have been not only supportive but also instrumental in providing invaluable insights.\n\nWhat truly sets Included VC apart is the motivation it instills. It's not just about becoming a master in VC. It's about creating a vibrant and inclusive community where our unique backgrounds and cultures are celebrated. It's about becoming adept at navigating a complex industry and feeling proud of our differences.\n\nThe educational aspect of the Fellowship is top-notch. The knowledge shared by exceptional individuals has been enlightening, and the network I've cultivated is indispensable in an industry where connections are paramount. The team at Included VC goes above and beyond to ensure our success, not just during the Fellowship but also in our future endeavours.\n\nI am immensely grateful to the incredible team at Included VC, especially Niki and our Partner Funds for making all of this possible. The lasting friendships I've formed with fellow participants will undoubtedly form the core of my VC network for years to come.\n\nIt's been a life-changing opportunity to be a part of this dynamic community and for championing the mission to make the venture world more equitable.\n\nTogether, let's continue to change the face of VC!",
      },
      {
        name: "Aditi Mishra",
        role: "Included VC Alumni",
        year: "2025",
        photo: img("/site/p3.jpg"),
        quote: "Included VC didn't just open doors; it unveiled entire galaxies.",
        spotlight: "Included VC didn't just open doors; it unveiled entire galaxies.",
        story: "It's with a heart brimming with gratitude and eyes gleaming with memories that I attempt to encapsulate the profound impact Included VC has had on both my professional path and personal growth.\n\nThe warmth and sincerity emanating from the Included VC community (Alumni as well as my cohort) created an environment where I felt not just accepted, but truly understood. It's this intangible sense of camaraderie that transformed the fellowship into a sanctuary where dreams were nurtured and vulnerabilities embraced.\n\nIt wasn't just about absorbing knowledge; it was about immersing oneself in the ebb and flow of the venture capital world. The real-world ICs pushed me to step beyond the academic world and helped me understand how investment decisions are actually made. Learning from such accomplished investors not only elevated my understanding but also provided a nuanced perspective that textbooks could never capture.\n\nAnd oh, the network! Included VC didn't just open doors; it unveiled entire galaxies. The connections I forged, be it with industry titans, visionary entrepreneurs, or fellow fellows, were more than mere LinkedIn additions. They were bonds forged in the crucible of shared dreams and aspirations, creating a tapestry of relationships that feels as enduring as it is enriching.\n\nThank you, Included VC, for not just investing in my professional journey but for touching the very core of my being. It's more than a Fellowship; it's been a symphony of growth, friendship, and self-discovery that will resonate within me for a lifetime.",
      },
    ],
    photos: [
      {
        "name": "Florence Bavanandan",
        "file": "fellow_0_florencebavanandan"
      },
      {
        "name": "Alina Bassi",
        "file": "fellow_1_alinabassi"
      },
      {
        "name": "Audrey Adeline",
        "file": "fellow_2_audreyadeline"
      },
      {
        "name": "João Nunes",
        "file": "fellow_3_joonunes"
      },
      {
        "name": "Carmen Pumariño",
        "file": "fellow_4_carmenpumario"
      },
      {
        "name": "Laurent-Frederic Lohmann",
        "file": "fellow_5_laurentfredericlohma"
      }
    ].map(({ name, file }) => ({ name, photo: img(`/site/${file}.webp`, name) })),
    logos: [
      "Sequoia",
      "Atomico",
      "Balderton",
      "Frontline",
      "Founders Factory Africa",
      "Octopus Ventures",
      "Hummingbird",
      "Matrix Partners",
      "Seraphim Capital",
      "Btov",
      "Kaya",
      "Iccp Sbi"
    ].map((name) => ({
      name,
      logo: img(`/site/alogos/${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`, name),
    })),
  },
  alumniStories: {
    heading: "Impact\nstories",
    sideTitle: "Alumni testimonials around the world 🌍",
    sideText: "Hear from investors, founders, operators and researchers on the way Included VC has shaped their careers, and beyond.",
    videos: [
      {
        "title": "#BeIncluded",
        "subtitle": "Included VC",
        "vimeoId": "641942833"
      },
      {
        "title": "Join Included",
        "subtitle": "Included VC",
        "vimeoId": "443372334"
      },
      {
        "title": "Fellow story 01",
        "subtitle": "Name · Role · Organisation",
        "vimeoId": ""
      },
      {
        "title": "Fellow story 02",
        "subtitle": "Name · Role · Organisation",
        "vimeoId": ""
      },
      {
        "title": "Fellow story 03",
        "subtitle": "Name · Role · Organisation",
        "vimeoId": ""
      },
      {
        "title": "Fellow story 04",
        "subtitle": "Name · Role · Organisation",
        "vimeoId": ""
      }
    ],
  },
  alumniBlog: {
    eyebrow: "From the alumni",
    heading: "Immerse yourself into the world *of our alumni.*",
    lede: "Their contributions to their respective industries and organisations, in their own words. New pieces land month on month.",
    featured: { kicker: "Featured · Venture Capital", title: "Seven years of Fellows: what the first cohort would tell the next one", text: "Placeholder article. A long-form piece gathering alumni from 2019 to today on the decisions that mattered most after the programme ended.", meta: "Included VC alumni · 1 October 2026 · 8 min read" },
    posts: [
      {
        "kicker": "Venture Capital · 12 September 2026",
        "title": "From brand name to first job: what actually changed when I got in",
        "text": "Why the Included VC name opened doors before the Fellowship had even finished, and what happened once it did.",
        "meta": "Soo Min Hong · 5 min read",
        "href": "#"
      },
      {
        "kicker": "Africa · 28 August 2026",
        "title": "Investing in LatAm from inside a global cohort",
        "text": "The surprising overlap between emerging-market dealflow in Latin America and the continent-first thinking of Ascend Africa.",
        "meta": "Margarita de la Peña Virgós · 5 min read",
        "href": "#"
      },
      {
        "kicker": "Careers · 14 August 2026",
        "title": "Running a fund after the Fellowship",
        "text": "Notes from a Managing Director on what the IC simulations did and did not prepare her for.",
        "meta": "Leen Segers · 5 min read",
        "href": "#"
      },
      {
        "kicker": "Operator to investor · 30 July 2026",
        "title": "The investor you become is the operator you were",
        "text": "How an engineering background turned into an edge at Beacon Capital.",
        "meta": "Lucas Kuziv · 5 min read",
        "href": "#"
      },
      {
        "kicker": "Community · 16 July 2026",
        "title": "Paying it forward, one office hour at a time",
        "text": "What it means to go from Fellow to mentor inside the same family.",
        "meta": "Amisha Kalra · 5 min read",
        "href": "#"
      },
      {
        "kicker": "Fundraising · 2 July 2026",
        "title": "What a fourteen-week cohort teaches you about sourcing",
        "text": "Field notes from VamosVentures on building dealflow that lasts beyond the programme.",
        "meta": "Sofia Haq · 5 min read",
        "href": "#"
      }
    ],
    cta: { label: "Read more", href: "#" },
  },
  alumniLive: {
    eyebrow: "In person",
    heading: "Included VC: *LIVE*",
    lede: "When the Fellows, Alumni and Venture Partners come together in person for learning, deal-making, life-long bonds and memories.",
  },
};

export const alumniSections = [
  { key: "alumniMeta", label: "Search & sharing", description: "Page title and description." },
  { key: "alumniHero", label: "Page header", description: "Photo, heading and intro." },
  { key: "alumniMap", label: "Where our alumni are", description: "Stats and the cities on the globe." },
  { key: "alumniSpotlight", label: "Alumni spotlight", description: "Labels of the spotlight card (quotes come from the fellows)." },
  { key: "alumniOrb", label: "Destinations", description: "Firms where alumni have gone." },
  { key: "alumniFellows", label: "In their own words", description: "Fellows, their quotes and stories, and the wall's photos and logos." },
  { key: "alumniStories", label: "Impact stories", description: "The videos." },
  { key: "alumniBlog", label: "From the alumni", description: "Featured article and posts." },
  { key: "alumniLive", label: "Included VC: LIVE", description: "The in-person section." },
] as const;

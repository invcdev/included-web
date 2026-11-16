export const siteConfig = {
  name: "Included VC",
  shortName: "Included VC",
  description:
    "A global venture capital fellowship empowering diverse candidates with high-impact training, mentorship, and access to leading VC funds.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://included.vc",
  ogImage: "https://included.vc/opengraph-image",
  locale: "en_US",
  author: {
    name: "Included VC",
    url: "https://included.vc",
  },
  creator: "Included VC",
  publisher: "Included VC",
  keywords: [
    "Venture Capital",
    "Fellowship",
    "VC Diversity",
    "Angel Investing",
    "Startups",
    "Tech Careers",
    "VC Education",
    "Global Fellowship",
  ],
  links: {
    twitter: "https://twitter.com/included_vc",
    linkedin: "https://www.linkedin.com/company/includedvc",
    github: "https://github.com/includedvc",
  },
  // Programme landing page (Ascend) — section anchors on the home page.
  programmeNav: [
    { title: "Who it's for", href: "#who-its-for" },
    { title: "Curriculum", href: "#curriculum" },
    { title: "Faculty", href: "#faculty" },
    { title: "What you get", href: "#what-you-get" },
    { title: "How to join", href: "#how-to-join" },
    { title: "FAQs", href: "#faqs" },
  ],
  // TODO: confirm final destinations for these CTAs.
  cta: {
    enrol: "#how-to-join",
    confirmPlace: "#how-to-join",
    // TODO: link to the founder's full letter once it exists.
    founderLetter: "#founder-letter",
    // TODO: link to the Ascend Africa page/section once it exists.
    ascendAfrica: "#ascend-africa",
    // TODO: confirm where "Explore the network" should go (currently the network section).
    network: "#network",
  },
  mainNav: [
    { title: "Fellowship", href: "/fellowship" },
    { title: "Partners", href: "/partners" },
    { title: "Fellows", href: "/fellows" },
    { title: "About", href: "/about" },
    { title: "Insights", href: "/insights" },
  ],
  footerNav: {
    program: [
      { title: "Overview", href: "/fellowship" },
      { title: "Curriculum", href: "/curriculum" },
      { title: "Mentorship", href: "/mentorship" },
      { title: "Alumni Network", href: "/fellows" },
    ],
    organization: [
      { title: "About Us", href: "/about" },
      { title: "Our Mission", href: "/mission" },
      { title: "Partner Funds", href: "/partners" },
      { title: "Careers", href: "/careers" },
    ],
    resources: [
      { title: "Insights & Blog", href: "/insights" },
      { title: "FAQ", href: "/faq" },
      { title: "Press & Media", href: "/press" },
      { title: "Contact", href: "/contact" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Cookie Policy", href: "/cookies" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Included VC",
  shortName: "Included VC",
  description:
    "Included VC changes who gets to invest. Ascend by Included VC is a fourteen-week live investment academy taught by practising investors and funded by our partners.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://included.vc",
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
    instagram: "https://www.instagram.com/included.vc/",
    medium: "https://medium.com/included-vc",
  },
  // The landing page's nav, buttons and links are editable content now:
  // see src/content/defaults.ts (and the admin, once it exists).
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

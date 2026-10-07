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

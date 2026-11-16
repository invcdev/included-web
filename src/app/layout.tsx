import type { Metadata, Viewport } from "next";
import { Manrope, Hanken_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Included VC — Changing the face of venture capital",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "A fully funded fellowship, launchpad and lifelong community for exceptional people from overlooked backgrounds — breaking into VC and deciding what gets built next.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  keywords: siteConfig.keywords,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: "Included VC — Changing the face of venture capital",
    description:
      "A fully funded fellowship, launchpad and lifelong community for exceptional people from overlooked backgrounds — breaking into VC and deciding what gets built next.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Included VC — Changing the face of venture capital",
    description:
      "A fully funded fellowship, launchpad and lifelong community for exceptional people from overlooked backgrounds — breaking into VC and deciding what gets built next.",
    creator: "@included_vc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/opengraph-image`,
      description: siteConfig.description,
      sameAs: [
        siteConfig.links.twitter,
        siteConfig.links.linkedin,
        siteConfig.links.github,
      ],
    },
  ];

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${hankenGrotesk.variable}`}
    >
      <head>
        <JsonLd data={jsonLdData} />
      </head>
      <body>
        <SkipLink targetId="main-content" />
        <Header />
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

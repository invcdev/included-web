import type { Metadata, Viewport } from "next";
import { Manrope, Hanken_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import { getSiteContent } from "@/content";
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

/** Static site-wide metadata. The title and description come from the editable content. */
const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
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
  // Icons come from the files in src/app: favicon.ico, icon.svg and apple-icon.png.
  manifest: "/manifest.webmanifest",
};

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSiteContent();
  const images = meta.ogImage
    ? [{ url: meta.ogImage.url, width: meta.ogImage.width, height: meta.ogImage.height, alt: meta.ogImage.alt }]
    : undefined;
  return {
    ...baseMetadata,
    title: {
      default: meta.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: meta.description,
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: meta.title,
      description: meta.description,
      siteName: siteConfig.name,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: "@included_vc",
      ...(images ? { images } : {}),
    },
  };
}

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
        siteConfig.links.instagram,
        siteConfig.links.medium,
      ],
    },
  ];

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${hankenGrotesk.variable}`}
    >
      <head>
        <JsonLd data={jsonLdData} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

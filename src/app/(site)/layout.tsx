import { getSiteContent } from "@/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

/** The public site: header and footer around the page, all from editable content. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return (
    <>
      <SkipLink targetId="main-content" />
      <Header content={content.header} />
      <main id="main-content" role="main" tabIndex={-1}>
        {children}
      </main>
      <Footer content={content.footer} />
    </>
  );
}

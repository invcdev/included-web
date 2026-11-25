/** Pages built from the landing page's sections, so "#faqs" etc. exist on them too. */
const SECTION_PAGES = ["/", "/ascend-africa"];

/**
 * Header and footer links like "#faqs" point at sections of the landing page.
 * They appear on every page, so they are sent to the landing page ("/#faqs"),
 * except on a page that has those sections itself: on Ascend Africa they stay
 * on Ascend Africa ("/ascend-africa#faqs").
 */
export function siteHref(href: string, pathname?: string | null) {
  if (!href.startsWith("#") || href.length === 1) return href;
  const base = pathname && SECTION_PAGES.includes(pathname) ? pathname : "/";
  return base === "/" ? `/${href}` : `${base}${href}`;
}

/**
 * Header and footer links like "#faqs" point at sections of the landing page.
 * They appear on every page, so they are sent to the landing page ("/#faqs").
 */
export function siteHref(href: string) {
  return href.startsWith("#") && href.length > 1 ? `/${href}` : href;
}

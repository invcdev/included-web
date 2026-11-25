"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteContent } from "@/content/schema";
import styles from "./Header.module.css";
import { siteHref } from "./siteHref";

export function Header({ content: c }: { content: SiteContent["header"] }) {
  const [open, setOpen] = useState(false);
  // Section links stay on Ascend Africa when used there (see siteHref).
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll progress bar: reveal the spectrum from left to right as the page scrolls.
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Page height changes as images and fonts load.
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, []);

  // Close the mobile menu on Escape and when resizing up to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 961px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.header} data-open={open || undefined}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label={`${c.logo.alt || "Included VC"} home`}>
          <Image
            src={c.logo.url}
            alt=""
            width={c.logo.width}
            height={c.logo.height}
            priority
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.navList}>
            {c.nav.map((item, i) => (
              <li key={i}>
                <a href={siteHref(item.href, pathname)} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={siteHref(c.cta.href, pathname)} className={styles.cta}>
            {c.cta.label}
          </a>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.menuIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={progressRef} className={styles.progress} aria-hidden="true" />

      <div id="mobile-menu" className={styles.mobileMenu} hidden={!open}>
        <nav aria-label="Mobile">
          <ul className={styles.mobileList}>
            {c.nav.map((item, i) => (
              <li key={i}>
                <a href={siteHref(item.href, pathname)} className={styles.mobileLink} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={siteHref(c.cta.href, pathname)} className={styles.mobileCta} onClick={close}>
            {c.cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}

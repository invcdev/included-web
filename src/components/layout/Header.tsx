"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
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
        <Link href="/" className={styles.brand} aria-label={`${siteConfig.name} home`}>
          {/* TODO: replace placeholder with the final logo asset (SVG). */}
          <Image
            src="/brand/logo-placeholder.png"
            alt=""
            width={257}
            height={71}
            priority
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.navList}>
            {siteConfig.programmeNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={siteConfig.cta.enrol} className={styles.cta}>
            Take your seat
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
            {siteConfig.programmeNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.mobileLink} onClick={close}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
          <a href={siteConfig.cta.enrol} className={styles.mobileCta} onClick={close}>
            Take your seat
          </a>
        </nav>
      </div>
    </header>
  );
}

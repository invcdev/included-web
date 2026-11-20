"use client";

import { useEffect, useRef, useState } from "react";
import type { z } from "zod";
import type { sharedSchemas } from "@/content/pages/shared";
import { safeHref } from "./Txt";

type Content = z.infer<typeof sharedSchemas.sitePopup>;
const KEY = "ivc-ascend-pop";

/**
 * "Applications open" pop-up. Opens after a delay or a share of the page
 * scrolled, then stays away for a number of days (remembered in this browser).
 * Must render inside a page wrapper: its styles come with the page's stylesheet.
 */
export function SitePopup({ content: c }: { content: Content }) {
  const [variant, setVariant] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!c.enabled || c.variants.length === 0) return;
    try {
      const t = localStorage.getItem(KEY);
      if (t && Date.now() - parseInt(t, 10) < c.hideForDays * 864e5) return;
    } catch {
      /* storage blocked: show it anyway */
    }
    // Picked after hydration, so the server and browser render the same thing.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVariant(Math.floor(Math.random() * c.variants.length));
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      try {
        localStorage.setItem(KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
      cleanup();
    };
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100;
      if (pct > c.scrollPercent) show();
    };
    const timer = window.setTimeout(show, c.delaySeconds * 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, [c]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    box.current?.querySelector<HTMLElement>(".ivc-btn")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.();
    };
  }, [open]);

  if (variant === null) return null;
  const v = c.variants[variant];
  return (
    <div
      className={`ivc-pop${open ? " ivc-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ivc-pop-title"
      aria-hidden={!open}
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div className="ivc-box" ref={box}>
        <button className="ivc-close" type="button" aria-label="Close" onClick={() => setOpen(false)}>
          &times;
        </button>
        <span className="ivc-tag">{v.tag}</span>
        <h3 id="ivc-pop-title">{v.title}</h3>
        <p>{v.body}</p>
        <a className="ivc-btn" href={safeHref(v.cta.href)}>
          {v.cta.label}
        </a>
        <button className="ivc-skip" type="button" onClick={() => setOpen(false)}>
          {v.skip}
        </button>
        <p className="ivc-note">{v.note}</p>
      </div>
    </div>
  );
}

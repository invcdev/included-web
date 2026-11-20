"use client";

import { useEffect, useRef } from "react";
import { createEnv, type PageScript } from "./runtime";

/**
 * The wrapper of a ported page: the element its scoped stylesheet hangs off
 * (`.pg-<slug>`), and the place its scripts run once the page has hydrated.
 *
 * Scripts are loaded per page, so a visitor only downloads the ones the page uses.
 */
const SCRIPTS: Record<string, () => Promise<{ default: PageScript<never>[] }>> = {
  about: () => import("./scripts/about"),
  alumni: () => import("./scripts/alumni"),
  faq: () => import("./scripts/faq"),
  instructors: () => import("./scripts/instructors"),
  investor: () => import("./scripts/investor"),
  partners: () => import("./scripts/partners"),
  programme: () => import("./scripts/programme"),
  resources: () => import("./scripts/resources"),
};

type Instance = { dispose: () => void; pending?: ReturnType<typeof setTimeout> };
const running = new WeakMap<HTMLElement, Instance>();

export function PageRoot({
  page,
  data,
  className,
  children,
}: {
  page: keyof typeof SCRIPTS;
  /** Editable content the scripts render from (lists that the original built in the browser). */
  data?: unknown;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // React runs effects twice in development; keep the first run instead of starting the scripts again.
    let inst = running.get(el);
    if (inst?.pending) {
      clearTimeout(inst.pending);
      inst.pending = undefined;
    } else if (!inst) {
      const { env, dispose } = createEnv(el);
      let cancelled = false;
      inst = {
        dispose: () => {
          cancelled = true;
          dispose();
        },
      };
      running.set(el, inst);
      SCRIPTS[page]().then(({ default: scripts }) => {
        if (cancelled) return;
        for (const run of scripts) {
          try {
            run(env, data as never);
          } catch (err) {
            console.error(`[${page}] page script failed`, err);
          }
        }
      });
    }
    const current = inst;
    return () => {
      current.pending = setTimeout(() => {
        current.dispose();
        running.delete(el);
      }, 0);
    };
  }, [page, data]);

  return (
    <div ref={ref} className={`pg-${page}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}

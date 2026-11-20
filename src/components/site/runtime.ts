/**
 * A small sandbox for the original pages' scripts.
 *
 * The pages were designed as static HTML with plain browser scripts. Rather
 * than rewrite every canvas, slider and modal, each script runs as written
 * against an "env" whose globals are scoped to the page:
 *
 *   - `document` finds elements inside the page wrapper only (so the site header
 *     and footer are never touched), and `document.body.appendChild` appends to
 *     the wrapper so React keeps ownership of everything it removes.
 *   - `document.body.classList` is the wrapper's class list (the CSS was scoped the same way);
 *     `document.body.style` is the real body (for scroll locking).
 *   - listeners, timers, animation frames and observers are tracked, so
 *     everything stops when the visitor navigates away.
 *
 * A script module looks like:
 *
 *   export function run(env: Env, data: Data) {
 *     const { document, window, addEventListener, requestAnimationFrame, ... } = env;
 *     ...original code...
 *   }
 */

export type Env = ReturnType<typeof createEnv>["env"];
export type PageScript<D = unknown> = (env: Env, data: D) => void;

export function createEnv(root: HTMLElement) {
  let alive = true;
  const disposers: (() => void)[] = [];
  const appended: Node[] = [];

  const track = (d: () => void) => disposers.push(d);

  // ---- events --------------------------------------------------------------
  function listen(target: EventTarget) {
    return (type: string, fn: EventListenerOrEventListenerObject, opts?: boolean | AddEventListenerOptions) => {
      target.addEventListener(type, fn, opts);
      track(() => target.removeEventListener(type, fn, opts));
    };
  }
  function unlisten(target: EventTarget) {
    return (type: string, fn: EventListenerOrEventListenerObject, opts?: boolean | EventListenerOptions) =>
      target.removeEventListener(type, fn, opts);
  }

  // ---- timers --------------------------------------------------------------
  const frames = new Set<number>();
  const requestAnimationFrame = (cb: FrameRequestCallback) => {
    if (!alive) return 0;
    const id = window.requestAnimationFrame((t) => {
      frames.delete(id);
      if (alive) cb(t);
    });
    frames.add(id);
    return id;
  };
  const cancelAnimationFrame = (id: number) => {
    frames.delete(id);
    window.cancelAnimationFrame(id);
  };
  const timeouts = new Set<number>();
  const setTimeoutT = (cb: (...a: unknown[]) => void, ms?: number, ...args: unknown[]) => {
    if (!alive) return 0;
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      if (alive) cb(...args);
    }, ms);
    timeouts.add(id);
    return id;
  };
  const intervals = new Set<number>();
  const setIntervalT = (cb: (...a: unknown[]) => void, ms?: number, ...args: unknown[]) => {
    if (!alive) return 0;
    const id = window.setInterval(() => alive && cb(...args), ms);
    intervals.add(id);
    return id;
  };
  track(() => {
    frames.forEach((id) => window.cancelAnimationFrame(id));
    timeouts.forEach((id) => window.clearTimeout(id));
    intervals.forEach((id) => window.clearInterval(id));
  });

  // ---- observers -----------------------------------------------------------
  function trackedObserver<T extends { disconnect(): void }, A extends unknown[]>(Base: new (...a: A) => T) {
    return class extends (Base as unknown as new (...a: A) => object) {
      constructor(...args: A) {
        super(...args);
        track(() => (this as unknown as T).disconnect());
      }
    } as unknown as new (...a: A) => T;
  }

  // ---- document / window ---------------------------------------------------
  const byId = (id: string) => root.querySelector<HTMLElement>(`#${CSS.escape(id)}`);

  const body = new Proxy(document.body, {
    get(target, prop) {
      if (prop === "appendChild")
        return (n: Node) => {
          // A node from the page (e.g. a modal moved to the end) stays React's; only created nodes are ours to remove.
          if (!root.contains(n)) appended.push(n);
          root.appendChild(n);
          return n;
        };
      if (prop === "classList") return root.classList;
      if (prop === "addEventListener") return listen(target);
      const v = Reflect.get(target, prop, target);
      return typeof v === "function" ? v.bind(target) : v;
    },
  });

  const scopedDocument = new Proxy(document, {
    get(target, prop) {
      switch (prop) {
        case "getElementById":
          return byId;
        case "querySelector":
          return (s: string) => root.querySelector(s);
        case "querySelectorAll":
          return (s: string) => root.querySelectorAll(s);
        case "getElementsByClassName":
          return (s: string) => root.getElementsByClassName(s);
        case "body":
          return body;
        case "addEventListener":
          return listen(target);
        case "removeEventListener":
          return unlisten(target);
      }
      const v = Reflect.get(target, prop, target);
      return typeof v === "function" ? v.bind(target) : v;
    },
  });

  const scopedWindow = new Proxy(window, {
    get(target, prop) {
      switch (prop) {
        case "addEventListener":
          return listen(target);
        case "removeEventListener":
          return unlisten(target);
        case "requestAnimationFrame":
          return requestAnimationFrame;
        case "setTimeout":
          return setTimeoutT;
        case "setInterval":
          return setIntervalT;
        case "document":
          return scopedDocument;
      }
      const v = Reflect.get(target, prop, target);
      return typeof v === "function" && !/^[A-Z]/.test(String(prop)) ? v.bind(target) : v;
    },
  });

  const env = {
    root,
    document: scopedDocument as Document,
    window: scopedWindow as Window & typeof globalThis,
    addEventListener: listen(window) as typeof window.addEventListener,
    removeEventListener: unlisten(window) as typeof window.removeEventListener,
    requestAnimationFrame,
    cancelAnimationFrame,
    setTimeout: setTimeoutT as unknown as typeof window.setTimeout,
    setInterval: setIntervalT as unknown as typeof window.setInterval,
    clearTimeout: (id?: number) => {
      if (id !== undefined) timeouts.delete(id);
      window.clearTimeout(id);
    },
    clearInterval: (id?: number) => {
      if (id !== undefined) intervals.delete(id);
      window.clearInterval(id);
    },
    IntersectionObserver: trackedObserver(IntersectionObserver),
    ResizeObserver: trackedObserver(ResizeObserver),
    MutationObserver: trackedObserver(MutationObserver),
    /** Escape text for the scripts that build markup from editable content. */
    esc: (s: unknown) =>
      String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!),
    /** Keep a cleanup for when the page goes away. */
    onDispose: track,
  };

  function dispose() {
    alive = false;
    for (const d of disposers.splice(0).reverse()) {
      try {
        d();
      } catch {
        /* keep disposing */
      }
    }
    for (const n of appended.splice(0)) n.parentNode?.removeChild(n);
    document.body.style.overflow = "";
  }

  return { env, dispose };
}

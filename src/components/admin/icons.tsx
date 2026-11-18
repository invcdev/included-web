/** Small line icons for the admin (16px grid, inherit colour). */
import React from "react";

type P = React.SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const ChevronRight = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 3.5 4.5 4.5L6 12.5" />
  </svg>
);
export const ChevronDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 6 8 10.5 12.5 6" />
  </svg>
);
export const ArrowUp = (p: P) => (
  <svg {...base(p)}>
    <path d="M8 13V3M4 7l4-4 4 4" />
  </svg>
);
export const ArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M8 3v10M4 9l4 4 4-4" />
  </svg>
);
export const Close = (p: P) => (
  <svg {...base(p)}>
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
);
export const Plus = (p: P) => (
  <svg {...base(p)}>
    <path d="M8 3v10M3 8h10" />
  </svg>
);
export const External = (p: P) => (
  <svg {...base(p)}>
    <path d="M9.5 3H13v3.5M13 3 7.5 8.5M11 9.5V13H3V5h3.5" />
  </svg>
);
export const Upload = (p: P) => (
  <svg {...base(p)}>
    <path d="M8 10.5V2.5M5 5.5l3-3 3 3M2.5 10v3h11v-3" />
  </svg>
);
export const Back = (p: P) => (
  <svg {...base(p)}>
    <path d="M13 8H3M7 4 3 8l4 4" />
  </svg>
);

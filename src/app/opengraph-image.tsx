import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} - Global Venture Capital Fellowship`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#090d16",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.25) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 800,
              color: "#ffffff",
              boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
            }}
          >
            IV
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            {siteConfig.name}
          </span>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Empowering the Next Generation of Venture Capital Leaders
          </h1>
          <p
            style={{
              fontSize: "26px",
              lineHeight: 1.4,
              color: "#94a3b8",
              margin: 0,
              maxWidth: "960px",
            }}
          >
            {siteConfig.description}
          </p>
        </div>

        {/* Bottom meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#6366f1",
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                padding: "8px 18px",
                borderRadius: "9999px",
                border: "1px solid rgba(99, 102, 241, 0.3)",
              }}
            >
              SEO Optimized Template
            </span>
            <span style={{ fontSize: "18px", color: "#94a3b8" }}>
              Global Fellowship & Mentorship
            </span>
          </div>
          <span style={{ fontSize: "20px", color: "#64748b", fontWeight: 500 }}>
            included.vc
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

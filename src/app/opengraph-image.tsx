import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

/**
 * The preview image for shared links (Open Graph and Twitter), used by every
 * page: the Ascend logo and the programme's headline on the site's white,
 * with the brand spectrum along the top.
 */
export const alt = "Ascend by Included VC: fourteen Tuesdays inside venture capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "public/ascend/ascend-logo-placeholder.png"), "base64");
const logoSrc = `data:image/png;base64,${logo}`;
// The site's display font (Manrope, OFL), static weights for the image renderer.
const manrope800 = await readFile(join(process.cwd(), "src/app/_fonts/manrope-800.woff"));
const manrope500 = await readFile(join(process.cwd(), "src/app/_fonts/manrope-500.woff"));

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          color: "#131412",
          fontFamily: "Manrope",
        }}
      >
        <div
          style={{
            height: 14,
            width: "100%",
            background: "linear-gradient(90deg, #5035E2 0%, #476FEA 17%, #53ABF2 33%, #6CE7FB 50%, #7AF3B8 67%, #98F872 83%, #C2FD51 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "64px 80px 60px" }}>
          <img src={logoSrc} width={415} height={90} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.02, maxWidth: 900 }}>
              Fourteen Tuesdays inside venture capital.
            </div>
            <div style={{ fontSize: 30, fontWeight: 500, color: "#686A72", lineHeight: 1.35, maxWidth: 940 }}>
              A live investment academy taught by practising investors and funded by our partners.
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 800 }}>
            <span style={{ color: "#5035E2" }}>Ascend by Included VC</span>
            <span style={{ color: "#686A72" }}>included.vc</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manrope800, weight: 800, style: "normal" },
        { name: "Manrope", data: manrope500, weight: 500, style: "normal" },
      ],
    },
  );
}

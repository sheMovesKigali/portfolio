import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const publicDir = join(process.cwd(), "public");
  const logoPath = join(publicDir, "images", "logo_white.jpeg");
  let logoSrc: string;
  try {
    const buffer = readFileSync(logoPath);
    const base64 = buffer.toString("base64");
    logoSrc = `data:image/jpeg;base64,${base64}`;
  } catch {
    logoSrc = "";
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            width={180}
            height={180}
            alt=""
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <span style={{ color: "#fff", fontSize: 72 }}>S</span>
        )}
      </div>
    ),
    { ...size }
  );
}

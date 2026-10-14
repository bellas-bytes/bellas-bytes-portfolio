import { ImgHTMLAttributes } from "react";

/**
 * Shows the pre-rendered "thermal print" version of a photo.
 *
 * The dithered PNGs are generated ahead of time by scripts/thermalize.mjs
 * (<name>.png -> <name>.thermal.png). This used to happen in the browser with a
 * canvas, which failed in some in-app browsers (e.g. LinkedIn's), so the photo
 * never appeared there. A plain static image works everywhere and is ~100x smaller.
 */
export default function ThermalImage({
  src,
  alt,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const thermalSrc = src?.replace(/\.(png|jpe?g|webp)$/i, ".thermal.png");
  return <img {...props} alt={alt} src={thermalSrc} decoding="async" />;
}

import { ImgHTMLAttributes, useEffect, useState } from "react";

const thresholds = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/** Render ordinary image pixels instead of relying on cross-browser SVG filters. */
export default function ThermalImage({
  src,
  alt,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [processed, setProcessed] = useState<{ source: string; url: string }>();
  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    const source = new Image();
    source.onload = () => {
      if (cancelled) return;
      try {
        const scale = Math.min(1, 960 / source.naturalWidth);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(source.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(source.naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) return;
        context.drawImage(source, 0, 0, canvas.width, canvas.height);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            const data = pixels.data;
            const alpha = data[i + 3] / 255;
            const gray =
              (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) /
              255;
            const brightness = Math.pow(gray * alpha + 1 - alpha, 1.25);
            const threshold = (thresholds[(y % 4) * 4 + (x % 4)] + 0.5) / 16;
            data[i] = 36;
            data[i + 1] = 39;
            data[i + 2] = 32;
            data[i + 3] = brightness < threshold ? 255 : 0;
          }
        }
        context.putImageData(pixels, 0, 0);
        const url = canvas.toDataURL("image/png");
        if (!cancelled) setProcessed({ source: src, url });
      } catch {
        // Keep the original, grayscale image visible if pixel access is unavailable.
      }
    };
    source.src = src;
    return () => {
      cancelled = true;
      source.onload = null;
    };
  }, [src]);
  const ready = processed?.source === src;
  return (
    <img
      {...props}
      alt={alt}
      src={ready ? processed?.url : src}
      data-thermal={ready ? "ready" : "fallback"}
    />
  );
}

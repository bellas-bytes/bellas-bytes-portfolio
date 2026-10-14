// Pre-renders the "thermal print" look for the portfolio's photos.
//
// The site used to dither these images in the visitor's browser with a canvas
// and swap the <img> src to a data: URL. Some in-app browsers (LinkedIn,
// Instagram, etc.) don't handle that reliably, so the photo never showed up.
// Running it once here produces a small static PNG that every browser can show.
//
// Usage (sharp is only needed for this script, so it isn't a project dependency):
//   npm i --no-save sharp
//   node scripts/thermalize.mjs public/images/portraits/isabella.png
//
// Writes <name>.thermal.png next to each input. Re-run it whenever you swap a photo.

import sharp from "sharp";
import path from "node:path";

// 4x4 Bayer matrix, same ordering the old in-browser version used.
const thresholds = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const INK = [36, 39, 32];
const MAX_WIDTH = 960;

async function thermalize(input) {
  const meta = await sharp(input).metadata();
  const width = Math.min(meta.width, MAX_WIDTH);
  const { data, info } = await sharp(input)
    .resize({ width })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(info.width * info.height * 4);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const alpha = data[i + 3] / 255;
      const gray =
        (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      const brightness = Math.pow(gray * alpha + 1 - alpha, 1.25);
      const threshold = (thresholds[(y % 4) * 4 + (x % 4)] + 0.5) / 16;
      out[i] = INK[0];
      out[i + 1] = INK[1];
      out[i + 2] = INK[2];
      out[i + 3] = brightness < threshold ? 255 : 0;
    }
  }

  const { dir, name } = path.parse(input);
  const output = path.join(dir, `${name}.thermal.png`);
  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, palette: true, colors: 2 })
    .toFile(output);
  console.log(`${input} -> ${output} (${info.width}x${info.height})`);
}

const inputs = process.argv.slice(2);
if (!inputs.length) {
  console.error("Usage: node scripts/thermalize.mjs <image> [...images]");
  process.exit(1);
}
for (const input of inputs) await thermalize(input);

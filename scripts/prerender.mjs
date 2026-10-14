// Prerenders the portfolio to static HTML after `react-scripts build`.
//
// Without this, build/index.html ships an empty <div id="root"> and anything
// that doesn't run JavaScript (LinkedIn/Slack link previews, some crawlers and
// recruiting tools) only sees "Please enable JavaScript". This renders <App />
// to HTML once at build time and puts it in that div; src/index.tsx then
// hydrates it in the browser.

import { build } from "esbuild";
import { readFile, writeFile, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "build", "index.html");
const bundlePath = path.join(root, "build", ".prerender.cjs");

await build({
  entryPoints: [path.join(root, "src", "App.tsx")],
  outfile: bundlePath,
  bundle: true,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  loader: { ".css": "empty", ".png": "empty", ".svg": "empty" },
  define: {
    "process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL || ""),
    "process.env.NODE_ENV": '"production"',
  },
  external: ["react", "react-dom"],
  logLevel: "warning",
});

const require = createRequire(pathToFileURL(bundlePath));
const { renderToString } = require("react-dom/server");
const React = require("react");
const App = require(bundlePath).default;

const markup = renderToString(React.createElement(App));
await rm(bundlePath);

const html = await readFile(htmlPath, "utf8");
const placeholder = '<div id="root"></div>';
if (!html.includes(placeholder)) {
  throw new Error(`Couldn't find ${placeholder} in build/index.html`);
}
await writeFile(
  htmlPath,
  html.replace(placeholder, `<div id="root">${markup}</div>`),
);
console.log(`Prerendered ${Math.round(markup.length / 1024)} KB of HTML into build/index.html`);

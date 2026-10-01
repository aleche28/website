// Performance budget: fails if any page in the build ships more than
// BUDGET_KB of CSS + JS (linked files and inline <style>/<script>), measured
// uncompressed. Fonts and images are not counted. Run with `mise run budget`.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "public";
const BUDGET_KB = 30;

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

// Minified HTML may leave attribute values unquoted.
const attr = (tag, name) =>
  tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"))?.slice(1).find((v) => v !== undefined);

const localSize = (url) => {
  if (!url || /^(https?:)?\/\//.test(url)) return 0; // external: not ours to count
  return statSync(join(ROOT, url.split(/[?#]/)[0])).size;
};

let failed = false;
const rows = [];
for (const file of htmlFiles(ROOT)) {
  const html = readFileSync(file, "utf8");
  let bytes = 0;
  for (const [tag] of html.matchAll(/<link\b[^>]*>/gi)) {
    if (/^stylesheet$/i.test(attr(tag, "rel") ?? "")) bytes += localSize(attr(tag, "href"));
  }
  for (const [, open, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const src = attr(open, "src");
    bytes += src ? localSize(src) : Buffer.byteLength(body);
  }
  for (const [, body] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    bytes += Buffer.byteLength(body);
  }
  const kb = bytes / 1024;
  if (kb > BUDGET_KB) failed = true;
  rows.push([file.slice(ROOT.length + 1), kb]);
}

rows.sort((a, b) => b[1] - a[1]);
for (const [page, kb] of rows) {
  console.log(`${kb > BUDGET_KB ? "OVER" : "ok  "}  ${kb.toFixed(1).padStart(5)} KB  ${page}`);
}
console.log(`\nBudget: ${BUDGET_KB} KB of CSS + JS per page (uncompressed, fonts excluded).`);
if (failed) {
  console.error("Some pages are over budget.");
  process.exit(1);
}

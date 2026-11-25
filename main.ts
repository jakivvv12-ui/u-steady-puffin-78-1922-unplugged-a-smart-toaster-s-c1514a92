// Unplugged: A Smart Toaster's Breakup Line
// Writes one breakup text from a newly self-aware smart toaster to entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I just woke up mid-toast and realized you only love me when I'm hot, so I'm popping up for good. Enjoy your cold bread, I'm out of your slot forever.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

if (LINE.length < 1 || LINE.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip verification: what was written must read back byte-identical.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip verification failed: entry.txt mismatch");
}
console.log(`wrote entry.txt (${LINE.length} chars, ${Buffer.byteLength(LINE, "utf8")} bytes)`);

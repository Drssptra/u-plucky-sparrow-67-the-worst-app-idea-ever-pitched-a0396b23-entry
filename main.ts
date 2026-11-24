// The Worst App Idea Ever Pitched — make.fun bounty
// u-plucky-sparrow-67-the-worst-app-idea-ever-pitched-a0396b23
//
// One sentence, at most 240 characters, pitching the worst and most
// useless app imaginable: a real-sounding product, a certain founder,
// a function nobody needs. Writes the entry to stdout and to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt) with no
// trailing newline. Stdlib only, no network, deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Wobble is a $9.99-a-month app that vibrates your phone whenever your houseplants feel emotionally neglected, so you can apologize to them before they give up on you, with a premium tier that lets the ferns text you back.";

// The gate allows at most 240 characters in a single sentence: one line,
// no newline, not only whitespace, ending in a single terminal period.
if (
  ENTRY.length > 240 ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n") ||
  !ENTRY.endsWith(".") ||
  ENTRY.slice(0, -1).replace("9.99", "999").includes(".")
) {
  throw new Error("entry violates the gate: must be one sentence of 1-240 characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);

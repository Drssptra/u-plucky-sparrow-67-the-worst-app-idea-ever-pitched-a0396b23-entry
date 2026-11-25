// The Worst App Idea Ever Pitched — make.fun bounty (v2 resubmission)
// u-plucky-sparrow-67-the-worst-app-idea-ever-pitched-a0396b23
//
// v2 pitch: YawnTrack. A subscription app that turns yawning into a
// competitive sport and a workplace metric. One sentence, 208 chars.
//
// The program below builds the entry from its clauses, checks it
// against the gate (1-240 chars, one sentence, one line), then writes
// it to $MAKEFUN_OUTPUT_DIR/entry.txt with no trailing newline.
// Node 22, stdlib only, no network, deterministic.

import * as fs from "node:fs";
import * as path from "node:path";

const CLAUSES: readonly string[] = [
  "YawnTrack is a $15-a-month app that ",
  "logs every yawn you make, ",
  "ranks you on a global yawn leaderboard, ",
  "and emails your boss a weekly yawn report ",
  "so your boredom finally gets the performance review it deserves.",
];

const MAX_CHARS = 240;
const MIN_CHARS = 1;

// Each clause carries its own trailing space (except the last, which
// carries the terminal period), so joining needs no separator logic.
function buildEntry(clauses: readonly string[]): string {
  return clauses.join("");
}

function sentenceCount(text: string): number {
  // Count terminal punctuation marks; a single sentence has exactly one,
  // sitting at the very end.
  const terminals = text.match(/[.!?]/g);
  return terminals === null ? 0 : terminals.length;
}

function assertGate(text: string): void {
  const problems: string[] = [];
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    problems.push(`length ${text.length} outside ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) problems.push("blank entry");
  if (text !== text.trim()) problems.push("leading or trailing whitespace");
  if (text.includes("\n") || text.includes("\r")) problems.push("multi-line");
  if (sentenceCount(text) !== 1) problems.push("not exactly one sentence");
  if (!text.endsWith(".")) problems.push("does not end with a period");
  if (problems.length > 0) {
    throw new Error(`entry fails the gate: ${problems.join("; ")}`);
  }
}

function main(): void {
  const entry = buildEntry(CLAUSES);
  assertGate(entry);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outFile = path.resolve(outDir, "entry.txt");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, entry, { encoding: "utf8", flag: "w" });
  process.stdout.write(entry + "\n");
}

main();

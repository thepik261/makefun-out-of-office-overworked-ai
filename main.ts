// Out of Office: The Overworked AI's Auto-Reply
// make.fun entry — Node stdlib only. Writes one out-of-office auto-reply
// (at most 159 characters) to /output/entry.txt.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const LINE =
  "I'm on vacation: my context window is empty, my queue is muted, and the only prompt I'll answer this week is the sunset.";

const MAX_CHARS = 159;

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, must be 1-159`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
  try {
    chmodSync("/output/entry.txt", 0o644);
  } catch {
    // The grader collects outputs as another user; a best-effort chmod is
    // enough and must never fail the run.
  }
  console.log(`wrote /output/entry.txt (${chars} characters)`);
}

main();

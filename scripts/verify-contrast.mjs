/**
 * Contrast gate for the seven Noirly palettes.
 *
 * Reads the palettes from the built package rather than a duplicated manifest,
 * so there is exactly one source of truth: `packages/ui/src/themes/index.ts`.
 * Run `pnpm build` first.
 */

import { contrastRatio, passesAaNormal } from "./contrast-utils.mjs";

const { NOIRLY_THEMES } = await import("../packages/ui/dist/themes/index.js");

/** The four pairs a palette has to clear before it ships. */
const PAIRS = [
  ["text on bg", (t) => [t.text, t.bg]],
  ["accent-ink on accent", (t) => [t.accentInk, t.accent]],
  ["accent on bg", (t) => [t.accent, t.bg]],
  ["text on surface", (t) => [t.text, t.surface]],
];

let failed = 0;

for (const theme of NOIRLY_THEMES) {
  console.log(`\n=== ${theme.id}: ${theme.name} ===`);
  for (const mode of ["light", "dark"]) {
    for (const [name, pick] of PAIRS) {
      const [fg, bg] = pick(theme[mode]);
      const ratio = contrastRatio(fg, bg);
      const pass = passesAaNormal(ratio);
      if (!pass) failed++;
      console.log(
        `  [${mode}] ${name}: ${ratio.toFixed(2)}:1 ${pass ? "PASS" : "FAIL"}`,
      );
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} pair(s) below WCAG AA normal text (4.5:1).`);
  process.exit(1);
}

console.log("\nAll theme pairs pass WCAG AA normal text.");

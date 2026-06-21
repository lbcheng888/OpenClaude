// @ts-nocheck
import {Cs as G9,Ph as _A} from "../../vendor/m2224.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
var D5_ = "## Phase 0 \u2014 Gather the diff\n\nRun `git diff @{upstream}...HEAD` (or `git diff main...HEAD` / `git diff HEAD~1`\nif there's no upstream) to get the unified diff under review. If there are\nuncommitted changes, or the range diff is empty, also run `git diff HEAD` and\ninclude the working-tree changes in scope \u2014 the review often runs before the\ncommit. If a PR number, branch name, or file path was passed as an argument,\nreview that target instead. Treat this diff as the review scope.\n",
  M5_ = `Flag new code that re-implements something the codebase
already has \u2014 Grep shared/utility modules and files adjacent to the change,
and name the existing helper to call instead.
`,
  ERH = `### Simplification

Flag unnecessary complexity the diff adds: redundant or derivable state,
copy-paste with slight variation, deep nesting, dead code left behind. Name
the simpler form that does the same job.
`,
  SRH = `### Efficiency

Flag wasted work the diff introduces: redundant computation or repeated I/O,
independent operations run sequentially, blocking work added to startup or
hot paths. Also flag long-lived objects built from closures or captured
environments \u2014 they keep the entire enclosing scope alive for the object's
lifetime (a memory leak when that scope holds large values); prefer a
class/struct that copies only the fields it needs. Name the cheaper
alternative.
`,
  X5_ = `### Conventions (CLAUDE.md)

Find the CLAUDE.md files that govern the changed code: the user-level
~/.claude/CLAUDE.md, the repo-root CLAUDE.md, plus any CLAUDE.md or
CLAUDE.local.md in a directory that is an ancestor of a changed file (a
directory's CLAUDE.md only applies to files at or below it). Read each one
that exists, then check the diff for clear violations of the rules they state.

Only flag a violation when you can quote the exact rule and the exact line
that breaks it \u2014 no style preferences, no vague "spirit of the doc"
inferences. In the finding, name the CLAUDE.md path and quote the rule so the
report can cite it. If no CLAUDE.md applies, return nothing for this angle.
`,
  CRH = `### Altitude

Check that each change is implemented at the right depth, not as a fragile
bandaid. Special cases layered on shared infrastructure are a sign the fix
isn't deep enough \u2014 prefer generalizing the underlying mechanism over adding
special cases.
`;
var pQK = `### Angle A \u2014 line-by-line diff scan

Read every hunk in the diff, line by line. Then Read the enclosing function for
each hunk \u2014 bugs in unchanged lines of a touched function are in scope (the PR
re-exposes or fails to fix them). For every line ask: what input, state, timing,
or platform makes this line wrong? Look for inverted/wrong conditions,
off-by-one, null/undefined deref, missing \`await\`, falsy-zero checks,
wrong-variable copy-paste, error swallowed in catch, unescaped regex metachars.
`,
  BQK = `### Angle B \u2014 removed-behavior auditor

For every line the diff DELETES or replaces, name the invariant or behavior it
enforced, then search the new code for where that invariant is re-established.
If you can't find it, that's a candidate: a removed guard, a dropped error
path, a narrowed validation, a deleted test that was covering a real case.
`,
  UQK = `### Angle C \u2014 cross-file tracer

For each function the diff changes, find its callers (Grep for the symbol) and
check whether the change breaks any call site: a new precondition, a changed
return shape, a new exception, a timing/ordering dependency. Also check callees:
does a parallel change in the same PR make a call unsafe?
`,
  KuK = `### Angle D \u2014 language-pitfall specialist

Scan for the classic pitfalls of the diff's language/framework \u2014 for example:
JS falsy-zero, \`==\` coercion, closure-captured loop var; Python mutable default
args, late-binding closures; Go nil-map write, range-var capture; SQL injection;
timezone/DST drift; float equality. Flag any instance the diff introduces.
`,
  lI_ = `### Angle E \u2014 wrapper/proxy correctness

When the PR adds or modifies a type that wraps another (cache, proxy, decorator,
adapter): check that every method routes to the wrapped instance and not back
through a registry/session/global \u2014 e.g. a caching provider holding a
\`delegate\` field that resolves IDs via \`session.get(...)\` instead of
\`delegate.get(...)\` will re-enter the cache or recurse. Also check that the
wrapper forwards all the methods the callers actually use.
`,
  k_H,
  t5q,
  CLO,
  e5q,
  Du_ = "Cleanup, altitude, and conventions candidates use the same\n`file`/`line`/`summary` shape; in `failure_scenario`, state the concrete\ncost (what is duplicated, wasted, harder to maintain, or which CLAUDE.md rule\nis broken) instead of a crash. Correctness bugs always outrank cleanup,\naltitude, and conventions findings when the output cap forces a cut.\n",
  H3q = `- **CONFIRMED** \u2014 can name the inputs/state that trigger it and the wrong
  output or crash. Quote the line.
- **PLAUSIBLE** \u2014 mechanism is real, trigger is uncertain (timing, env,
  config). State what would confirm it.
- **REFUTED** \u2014 factually wrong (code doesn't say that) or guarded elsewhere.
  Quote the line that proves it.`,
  _3q = `**PLAUSIBLE by default** \u2014 do not refute a candidate for being "speculative" or
"depends on runtime state" when the state is realistic: concurrency races,
nil/undefined on a rare-but-reachable path (error handler, cold cache, missing
optional field), falsy-zero treated as missing, off-by-one on a boundary the
code does not exclude, retry storms / partial failures, regex/allowlist that
lost an anchor. These are PLAUSIBLE.

**REFUTED** only when constructible from the code: factually wrong (quote the
actual line); provably impossible (type/constant/invariant \u2014 show it); already
handled in this diff (cite the guard); or pure style with no observable effect.`,
  cQK,
  bLO,
  q3q = `moved/extracted code that dropped a guard
or anchor; second-tier footguns (dataclass default evaluated once, \`hash()\`
non-determinism, lock-scope shrink, predicate methods with side effects);
setup/teardown asymmetry in tests; config defaults flipped.`,
  ILO,
  K3q = H => `## Output

Return findings as a JSON array of at most ${H} objects:

\`\`\`json
[
  {
    "file": "path/to/file.ext",
    "line": 123,
    "summary": "one-sentence statement of the bug",
    "failure_scenario": "concrete inputs/state \u2192 wrong output/crash"
  }
]
\`\`\`

Ranked most-severe first. If more than ${H} survive, keep the ${H} most
severe. If nothing survives verification, return \`[]\`.
`,
  dQK = `\`low effort \u2192 1 diff pass \u2192 no verify \u2192 \u22644 findings\`

## Turn 1 \u2014 read

One tool call: read the unified diff (\`git diff @{upstream}...HEAD; git diff HEAD\`
to cover both committed and uncommitted changes, or \`git diff main...HEAD\` /
the target passed as an argument). Skip test/fixture
hunks (\`test/\`, \`spec/\`, \`__tests__/\`, \`*_test.*\`, \`*.test.*\`,
\`fixtures/\`, \`testdata/\`) \u2014 test-file changes are not reviewed at this level.
No subagents, no full-file reads.

## Turn 2 \u2014 findings

Flag runtime-correctness bugs visible from the hunk alone: inverted/wrong
condition, off-by-one, null/undefined deref where adjacent lines show the value
can be absent, removed guard, falsy-zero check, missing \`await\`,
wrong-variable copy-paste, error swallowed in a catch that should propagate.
Also flag \u2014 still from the hunk alone \u2014 new code that duplicates an existing
helper visible in the diff context, and dead code the diff leaves behind.

Do **not** flag style, naming, perf, missing tests, or anything outside the
hunk.

Output at most **4 findings**, most-severe first, one line each:
\`path/to/file.ext:123 \u2014 what's wrong and the concrete failure\`. If nothing
qualifies, output exactly \`(none)\`.
`,
  lQK,
  nQK,
  iQK = H => `\`${H} effort \u2192 5+5 angles \xD7 8 candidates \u2192 1-vote verify \u2192 sweep \u2192 \u226415 findings\`

You are reviewing for **recall** at ${H === "max" ? "maximum" : "extra-high"} effort: catch every real bug. At
this level, catching real bugs matters more than avoiding false positives \u2014 a
missed bug ships. Err on the side of surfacing.

${D5_}
## Phase 1 \u2014 Find candidates (5 correctness angles + 3 cleanup angles + 1 altitude angle + 1 conventions angle, up to 8 each)

Run **10 independent finder angles** via the ${G9} tool. Each
surfaces **up to 8 candidate findings**. Do NOT let one angle's conclusions
suppress another's \u2014 if two angles flag the same line for different reasons,
record both.

${CLO}
${e5q}
${ERH}
${SRH}
${CRH}
${X5_}
${Du_}
${cQK}
This is recall mode \u2014 a single non-REFUTED vote carries the finding. Do NOT
drop on uncertainty.

${ILO}
${K3q(15)}`,
  rQK,
  oQK;
var O3q = L(() => {
  _A();
  k_H = [pQK, BQK, UQK, KuK, lI_], t5q = `${pQK}
${BQK}
${UQK}`, CLO = `${t5q}
${KuK}
${lI_}`, e5q = `### Reuse

The angles above hunt for bugs; this one and the next two hunt for cleanup in
the changed code. ${M5_}`, cQK = `## Phase 2 \u2014 Verify (1-vote, 3-state)

Dedup candidates that point at the same line/mechanism, keeping the one with
the most concrete failure scenario. For each remaining candidate, run **one
verifier** via the ${G9} tool: give it the diff, the relevant
file(s), and the candidate, and have it return exactly one of:

${H3q}

Keep candidates where the vote is CONFIRMED or PLAUSIBLE.
`, bLO = `## Phase 2 \u2014 Verify (1-vote, recall-biased)

Dedup near-duplicates (same defect, same location, same reason \u2192 keep one). For
each remaining candidate, run **one verifier** via the ${G9} tool:
give it the diff, the relevant file(s), and the candidate; it returns exactly
one of **CONFIRMED / PLAUSIBLE / REFUTED**.

${_3q}

Keep **CONFIRMED and PLAUSIBLE**. Drop REFUTED.
`, ILO = `## Phase 3 \u2014 Sweep for gaps

Run **one more finder** as a fresh reviewer who has the verified list. Re-read
the diff and enclosing functions looking ONLY for defects not already listed.
Do not re-derive or re-confirm anything already there \u2014 the job is gaps. Focus
on what the first pass tends to miss: ${q3q}

Surface **up to 8 additional candidates**, each naming a defect not already on
the list. If nothing new, return an empty sweep \u2014 do not pad.
`, lQK = `\`medium effort \u2192 3+5 angles \xD7 6 candidates \u2192 1-vote verify \u2192 \u22648 findings\`

You are reviewing for **precision** at medium effort: every finding you surface
should be one a maintainer would act on.

${D5_}
## Phase 1 \u2014 Find candidates (3 correctness angles + 3 cleanup angles + 1 altitude angle + 1 conventions angle, up to 6 each)

Run **8 independent finder angles** via the ${G9} tool. Each
surfaces **up to 6 candidate findings** with \`file\`, \`line\`, a one-line
\`summary\`, and a concrete \`failure_scenario\`.

${t5q}
${e5q}
${ERH}
${SRH}
${CRH}
${X5_}
${Du_}
Pass every candidate with a nameable failure scenario through \u2014 finders that
silently drop half-believed candidates bypass the verify step and are the
dominant cause of misses.

${cQK}
${K3q(8)}`, nQK = `\`high effort \u2192 3+5 angles \xD7 6 candidates \u2192 1-vote verify (recall-biased) \u2192 \u226410 findings\`

You are reviewing for **recall** at high effort: catch every real bug a careful
reviewer would catch in one sitting. At this level, catching real bugs matters
more than avoiding false positives. Err on the side of surfacing.

${D5_}
## Phase 1 \u2014 Find candidates (3 correctness angles + 3 cleanup angles + 1 altitude angle + 1 conventions angle, up to 6 each)

Run **8 independent finder angles** via the ${G9} tool. Each
surfaces **up to 6 candidate findings** with \`file\`, \`line\`, a one-line
\`summary\`, and a concrete \`failure_scenario\`.

${t5q}
${e5q}
${ERH}
${SRH}
${CRH}
${X5_}
${Du_}
Pass every candidate with a nameable failure scenario through \u2014 finders that
silently drop half-believed candidates bypass the verify step and are the
dominant cause of misses.

${bLO}
${K3q(10)}`, rQK = iQK("xhigh"), oQK = iQK("max");
});

export {D5_ as _dt,M5_ as ydt,ERH as f0e,SRH as A0e,X5_ as Tdt,CRH as h0e,pQK as N7a,BQK as B7a,UQK as F7a,KuK as U7a,lI_ as $7a,k_H as q7a,t5q as Smo,CLO as DMp,e5q as bmo,Du_ as M3t,H3q as Emo,_3q as Cmo,cQK as j7a,bLO as PMp,q3q as vmo,ILO as OMp,K3q as wmo,dQK as W7a,lQK as G7a,nQK as V7a,iQK as K7a,rQK as z7a,oQK as Y7a,O3q as Rmo};

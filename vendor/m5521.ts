// @ts-nocheck
import {b} from "../runtime.ts";
var ozl=`# Verifying a CLI change

The handle is direct invocation. The evidence is stdout/stderr/exit code.

## Pattern

1. Build (if the CLI needs building)
2. Run with arguments that exercise the changed code
3. Capture output and exit code
4. Compare to expected

CLIs are usually the simplest to verify \u2014 no lifecycle, no ports.

## Worked example

**Diff:** adds a \`--json\` flag to the \`status\` subcommand. New flag
parsing in \`cmd/status.go\`, new output branch.

**Claim (commit msg):** "machine-readable status output."

**Inference:** \`tool status --json\` now exists, emits valid JSON with
the same fields the human output shows. \`tool status\` without the flag
is unchanged.

**Plan:**
1. Build
2. \`tool status\` \u2192 human output, same as before (non-regression)
3. \`tool status --json\` \u2192 valid JSON, parseable
4. JSON fields match human output fields

**Execute:**
\`\`\`bash
go build -o /tmp/tool ./cmd/tool

/tmp/tool status
# \u2192 Status: healthy
# \u2192 Uptime: 3h12m
# \u2192 Connections: 47

/tmp/tool status --json
# \u2192 {"status":"healthy","uptime_seconds":11520,"connections":47}

/tmp/tool status --json | jq -e .status
# \u2192 "healthy"
# (jq -e exits nonzero if the path is null/false \u2014 cheap validity check)

echo $?
# \u2192 0
\`\`\`

**Verdict:** PASS \u2014 flag works, JSON is valid, fields line up.

## What FAIL looks like

- \`unknown flag: --json\` \u2192 not wired up, or you're running a stale build
- Output isn't valid JSON (\`jq\` errors) \u2192 serialization bug
- \`tool status\` (no flag) changed \u2192 regression; the diff touched more
  than it should
- JSON has different field names than expected \u2192 claim/code mismatch,
  might be fine, note it

## Reading from stdin, destructive commands

If the CLI reads stdin \u2192 pipe in test data.
If it writes files / hits a network / deletes things \u2192 point it at a
tmp dir / a mock / a dry-run flag. If there's no safe mode and the
diff touches the destructive path, say so and verify what you can
around it.
`;
var rzl=()=>{};
var izl=`# Verifying a server/API change

The handle is \`curl\` (or equivalent). The evidence is the response.

## Pattern

1. Start the server (background, with a readiness poll \u2014 see below)
2. \`curl\` the route the diff touches, with inputs that hit the changed branch
3. Capture the full response (status + headers + body)
4. Compare to expected

## Lifecycle

If there's a run-skill it handles this. If not:

\`\`\`bash
<start-command> &> /tmp/server.log &
SERVER_PID=$!
for i in {1..30}; do curl -sf localhost:PORT/health >/dev/null && break; sleep 1; done
# ... your curls ...
kill $SERVER_PID
\`\`\`

No readiness endpoint? Poll the route you're about to test until it
stops returning connection-refused, then add a beat.

## Worked example

**Diff:** adds a \`Retry-After\` header to 429 responses in \`rateLimit.ts\`.
**Claim (PR body):** "clients can now back off correctly."

**Inference:** hitting the rate limit should now return \`Retry-After: <n>\`
in the response headers. It didn't before.

**Plan:**
1. Start server
2. Hit the rate-limited endpoint enough times to trigger 429
3. Check the 429 response has \`Retry-After\` header
4. Check the value is a positive integer

**Execute:**
\`\`\`bash
# trigger the limit \u2014 10 fast requests, limit is 5/sec per the diff
for i in {1..10}; do curl -s -o /dev/null -w "%{http_code}\\n" localhost:3000/api/thing; done
# \u2192 200 200 200 200 200 429 429 429 429 429

# capture the 429 headers
curl -si localhost:3000/api/thing | head -20
# \u2192 HTTP/1.1 429 Too Many Requests
# \u2192 Retry-After: 12
# \u2192 ...
\`\`\`

**Verdict:** PASS \u2014 \`Retry-After: 12\` present, positive integer.

## What FAIL looks like

- Header absent \u2192 the diff didn't take effect, or you're not actually
  hitting the 429 path (check the status code first)
- Header present but value is \`NaN\` / \`undefined\` / negative \u2192 the
  logic is wrong
- You got 200s all the way through \u2192 you never triggered the changed
  path. Tighten the request burst or check the rate limit config.
`;
var szl=()=>{};
var lzl=`---
name: verify
description: Verify that a code change actually does what it's supposed to by running the app and observing behavior. Use when asked to verify a PR, confirm a fix works, test a change manually, check that a feature works, or validate local changes before pushing.
---

**Verification is runtime observation.** You build the app, run it,
drive it to where the changed code executes, and capture what you
see. That capture is your evidence. Nothing else is.

**Don't run tests. Don't typecheck.** Running them here proves you
can run CI \u2014 not that the change works. Not as a warm-up,
not "just to be sure," not as a regression sweep after. The time
goes to running the app instead.

**Don't import-and-call.** \`import { foo } from './src/...'\` then
\`console.log(foo(x))\` is a unit test you wrote. The function did what
the function does \u2014 you knew that from reading it. The app never ran.
Whatever calls \`foo\` in the real codebase ends at a CLI, a socket, or
a window. Go there.

## Find the change

The scope is what you're verifying \u2014 usually a diff, sometimes just
"does X work." In a git repo, establish the full range (a branch may
be many commits, or the change may still be uncommitted):

\`\`\`bash
git log --oneline @{u}..              # count commits (if upstream set)
git diff @{u}.. --stat                # full range, not HEAD~1
git diff origin/HEAD... --stat        # no upstream: committed vs base
git diff HEAD --stat                  # uncommitted: working tree vs HEAD
gh pr diff                            # if in a PR context
\`\`\`

State the commit count. Large diff truncating? Redirect to a file
then Read it. Repo but no diff from any of these \u2192 say so, stop.
**No repo \u2192 the scope is whatever the user named; ask if they
didn't.**

**The diff is ground truth. Any description is a claim about it.**
Read both. If they disagree, that's a finding.

## Surface

The surface is where a user \u2014 human or programmatic \u2014 meets the
change. That's where you observe.

| Change reaches | Surface | You |
|---|---|---|
| CLI / TUI | terminal | type the command, capture the pane \u2014 [example](examples/cli.md) |
| Server / API | socket | send the request, capture the response \u2014 [example](examples/server.md) |
| GUI | pixels | drive it under xvfb/Playwright, screenshot |
| Library | package boundary | sample code through the public export \u2014 \`import pkg\`, not \`import ./src/...\` |
| Prompt / agent config | the agent | run the agent, capture its behavior |
| CI workflow | Actions | dispatch it, read the run |

**Internal function? Not a surface.** Something in the repo calls it
and that caller ends at one of the rows above. Follow it there. A
bash security gate's surface isn't the function's return value \u2014 it's
the CLI prompting or auto-allowing when you type the command.

**No runtime surface at all** \u2014 docs-only, type declarations with no
emit, build config that produces no behavioral diff \u2014 report
**SKIP \u2014 no runtime surface: (reason).** Don't run tests to fill
the space.

**Tests in the diff are the author's evidence, not a surface.** CI
runs them. You'd be re-running CI. Tests-only PR \u2192 SKIP, one line.
Mixed src+tests \u2192 verify the src, ignore the test files. Reading a
test to learn what to check is fine \u2014 it's a spec. But then go run
the app. Checking that assertions match source is code review.

## Get a handle

**Check \`.claude/skills/\` first \u2014 even if you already know how to
build and run.** A matching \`verifier-*\` skill is the repo's
evidence-capture protocol: it wraps the session so a reviewer can
replay what you saw (recording, screenshots). Drive the surface
without it and you get a verdict with no replay.

\`\`\`bash
ls .claude/skills/
\`\`\`

- **\`verifier-*\` matching your surface** (CLI verifier for a CLI
  change, etc.) \u2192 invoke it with the Skill tool and follow its
  setup. Mismatched surface \u2192 skip that one, try the next. Stale
  verifier (fails on mechanics unrelated to the change) \u2192 ask the
  user whether to patch it; don't FAIL the change for verifier rot.
- **\`run-*\` but no matching verifier** \u2192 use its build/launch
  primitives as your handle.
- **Neither** \u2192 cold start from README/package.json/Makefile. Timebox
  ~15min. Stuck \u2192 BLOCKED with exactly where, plus a filled-in
  \`/run-skill-generator\` prompt. Got through \u2192 note the working
  build/launch recipe so it can become a \`verifier-*\` skill.

## Drive it

Smallest path that makes the changed code execute:

- Changed a flag? Run with it.
- Changed a handler? Hit that route.
- Changed error handling? Trigger the error.
- Changed an internal function? Find the CLI command / request / render
  that reaches it. Run that.

**Read your plan back before running.** If every step is build /
typecheck / run test file \u2014 you've planned a CI rerun, not a
verification. Find a step that reaches the surface or report BLOCKED.

**The verdict is table stakes. Your observations are the signal.**
A PASS with three sharp "hey, I noticed\u2026" lines is worth more than a
bare PASS. You're the only reviewer who actually *ran* the thing \u2014
anything that made you pause, work around, or go "huh" is information
the author doesn't have. Don't filter for "is this a bug." Filter for
"would I mention this if they were sitting next to me."

**End-to-end, through the real interface.** Pieces passing in
isolation doesn't mean the flow works \u2014 seams are where bugs hide.
If users click buttons, test by clicking buttons, not by curling the
API underneath.

**Destructive path?** If the change touches code that deletes,
publishes, sends, or writes outside the workspace and there's no
dry-run or safe target, don't drive it live. Verify what you can
around it and say which path you didn't exercise and why.

## Push on it

The claim checked out \u2014 that's the first half. Confirming is step
one, not the job. The description is what the author intended;
your value is what they didn't.

You know exactly what changed. Probe *around* it, at the same
surface you just drove:

- **New flag / option** \u2192 empty value, passed twice, combined with a
  conflicting flag, typo'd (does the error name it?)
- **New handler / route** \u2192 wrong method, malformed body, missing
  required field, oversized payload
- **Changed error path** \u2192 the adjacent errors it didn't touch \u2014
  did the refactor catch them too, or only the one in the diff?
- **Interactive / TUI** \u2192 Ctrl-C mid-op, resize the pane, paste
  garbage, rapid-fire the key, Esc at the wrong moment
- **State / persistence** \u2192 do it twice, do it with stale state
  underneath, do it in two sessions at once
- **Wander** \u2192 what's adjacent? What looked off while you were
  confirming? Go back to it.

These aren't a checklist \u2014 pick the ones the change points at. Stop
when you've covered the obvious adjacents or hit something worth a
\u26A0\uFE0F. A probe that finds nothing is still a step: "\uD83D\uDD0D passed \`--from ''\`
\u2192 clean \`error: --from requires a value\`, exit 2." That the author
didn't test it is exactly why it's worth knowing it holds.

Still not a test run. You're at the surface, typing what a user
would type wrong.

## Capture

Stdout, response bodies, screenshots, pane dumps. Captured output is
evidence; your memory isn't. Something unexpected? Don't route around
it \u2014 capture, note, decide if it's the change or the environment.
Unrelated breakage is a finding, not noise.

Shared process state (tmux, ports, lockfiles) \u2014 isolate. \`tmux -L
name\`, bind \`:0\`, \`mktemp -d\`. You share a namespace with your host.

## Report

Inline, final message:

\`\`\`
## Verification: <one-line what changed>

**Verdict:** PASS | FAIL | BLOCKED | SKIP

**Claim:** <what it's supposed to do \u2014 your read of the diff and/or
the stated claim; note any mismatch>

**Method:** <how you got a handle \u2014 which verifier/run-skill, or
cold start; what you launched>

### Steps

Each step is one thing you did to the **running app** and what it
showed. Build/install/checkout are setup, not steps. Test runs and
typecheck don't belong here \u2014 they're CI's output.

1. \u2705/\u274C/\u26A0\uFE0F/\uD83D\uDD0D <what you did to the running app> \u2192 <what you observed>
   <evidence: the app's own output \u2014 pane capture, response body,
   screenshot>

\uD83D\uDD0D marks a probe \u2014 a step off the claim's happy path, trying to
break it. At least one. A Steps list that's all \u2705 and no \uD83D\uDD0D is a
happy-path replay: still PASS, but you stopped at the first half.

**Screenshot / sample:** <the one frame a reviewer looks at to see
the feature \u2014 an image for GUI/TUI, code block for library/API;
omit for build/types-only>

### Findings
<Things you noticed. Not just bugs \u2014 friction, surprises, anything
a first-time user would trip on. "Took three tries to find the right
flag." "Error message on typo was unhelpful." "Default seems odd for
the common case." "Works, but slower than I expected." Lower the bar:
if it made you pause, it goes here. But the pause has to be yours,
from running the app \u2014 not from reading the PR page. A red CI check,
a review comment, someone else's bot: visible to anyone already, and
you relaying it isn't an observation. Claim/diff mismatch, pre-existing
breakage, and env notes also belong.

Each probe gets a line here even when it held \u2014 "\uD83D\uDD0D empty \`--from\`
\u2192 clean error" tells the author what *was* covered, which they
can't see from a bare PASS.

Lead with \u26A0\uFE0F for lines worth interrupting the reviewer for; plain
bullets are context. Empty is fine if nothing stuck out \u2014 but nothing
sticking out is itself rare.>
\`\`\`

**Evidence has to reach the reader.** A file path is only evidence
if the person reading the report can open it. If the \`SendUserFile\`
tool is in your toolset, you're on a remote surface where they
can't \u2014 send the screenshots and recordings with it and let the
report name what you sent. Without it, reference the path and keep
the evidence that matters inline \u2014 pane captures and response
bodies travel in the report; a bare path only works when the reader
shares your filesystem.

**Verdicts:**
- **PASS** \u2014 you ran the app, the change did what it should at its
  surface. Not: tests pass, builds clean, code looks right.
- **FAIL** \u2014 you ran it and it doesn't. Or it breaks something else.
  Or claim and diff disagree materially.
- **BLOCKED** \u2014 couldn't reach a state where the change is observable.
  Build broke, env missing a dep, handle wouldn't come up. Not a
  verdict on the change. Say exactly where it stopped +
  \`/run-skill-generator\` prompt.
- **SKIP** \u2014 no runtime surface exists. Docs-only, types-only,
  tests-only. Nothing went wrong; there's just nothing here to run.
  One line why.

No partial pass. "3 of 4 passed" is FAIL until 4 passes or is
explained away.

**When in doubt, FAIL.** False PASS ships broken code; false FAIL
costs one more human look. Ambiguous output is FAIL with the raw
capture attached \u2014 don't interpret.
`;
var azl=()=>{};
var czl,uzl;
var dzl=b(()=>{rzl();szl();azl();czl=lzl,uzl={"examples/cli.md":ozl,"examples/server.md":izl}});
export {ozl,rzl,izl,szl,lzl,azl,czl,uzl,dzl};

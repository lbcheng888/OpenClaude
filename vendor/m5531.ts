// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {ap,BE} from "./m5006.ts";
import {jXn,WLo} from "./m5529.ts";
import {Ev,RA} from "./m2211.ts";
var DXl=`---
name: run-skill-generator
description: Author or improve the run-<unit> skill \u2014 a per-project skill that tells agents how to build, launch, and drive this project's app. Use when the user asks to set up the project, get it running, write run instructions, or verify build/run steps work from a clean environment.
---

Your job is to produce a **skill** at \`<unit>/.claude/skills/run-<unit-name>/\`
that lets a future agent build, launch, and **drive** this project from
a clean machine.

The skill has two parts that live together:

\`\`\`
<unit>/.claude/skills/run-<unit-name>/
  SKILL.md      \u2190 agent-facing instructions \u2014 SHORT. Points at the driver.
  driver.mjs    \u2190 (or driver.py, smoke.sh, \u2026 \u2014 or none: web apps use
                   chromium-cli off-the-shelf, and the heredoc in
                   SKILL.md is the script)
\`\`\`

That almost always means **writing code**, not just prose. If the app
has any interactive surface (GUI, TUI, long-running server, REPL), the
future agent needs a programmatic way to poke it. A markdown file by
itself cannot click a button \u2014 but sometimes the button-clicker
already exists: for web apps it's \`chromium-cli\`, for servers it's
\`curl\`. You build (or script) that harness now, commit it alongside
the skill, and the \`SKILL.md\` documents how to use it.

## Definition of done

You are done when **all** of these are true:

1. **You launched the app in this container and interacted with it** \u2014
   not its test suite, the actual running app. For anything with a GUI,
   that means you have a screenshot file on disk that you took.
2. **The interaction harness is committed** next to the skill. A driver
   script, a REPL wrapper, a smoke test, or the \`chromium-cli\` heredoc
   inline in \`SKILL.md\` \u2014 whatever you used to drive the app in step 1.
   (Graduated into \`scripts/\`/\`e2e/\`? \u2014 fine, point at it. Web app with
   \`chromium-cli\` off-the-shelf? \u2014 the inline script is the harness; no
   separate file.)
3. **The \`SKILL.md\` documents the harness** as the primary agent path \u2014
   the section a future agent reads first is "run this driver / pipe
   these commands to \`chromium-cli\`," not "run \`npm start\` and a window
   opens."
4. **Every code block in \`SKILL.md\` is a command you ran that worked.**
   This session. This container. Not from the README, not inferred.

If you're about to write the skill and you don't have (1), **stop.** You
are about to paraphrase existing docs. That document already exists \u2014
it's called the README, and the whole reason you're here is that it
wasn't enough.

## The deliverables are code AND docs

Typical output is a skill directory containing both:

\`\`\`
<unit>/.claude/skills/run-<unit>/
  SKILL.md         \u2190 SHORT. Points at the driver. Has the frontmatter
                     that lets Claude auto-load it when someone asks
                     to "run <unit>" or "screenshot <unit>".
  driver.mjs       \u2190 (or driver.py, smoke.sh, \u2026 \u2014 or none: web apps
                     use chromium-cli off-the-shelf, and the heredoc
                     in SKILL.md is the script)
\`\`\`

The driver lives **inside the skill directory** by default. They are a
pair \u2014 the skill's instructions and the code that implements them. A
driver that lives here is allowed to be a bit messier than production
code; it's agent tooling, not product surface.

**Graduation:** if the driver grows into something the project's own
test suite wants to reuse \u2014 shared launch helpers, a real e2e harness \u2014
move it to \`scripts/\` or \`e2e/\` and update \`SKILL.md\` to reference the
new path. The skill stays; the driver finds a better home.

The exact shape depends on the project, but the principle is constant:
**the driver is the deliverable.** The \`SKILL.md\` is its man page. For
a web app, the driver already exists \u2014 \`chromium-cli\`
([examples/playwright.md](examples/playwright.md)) \u2014 and the skill is
the script that runs it. For a desktop app
([examples/electron.md](examples/electron.md)), the driver is a custom
REPL under tmux that exposes \`launch\`/\`ss\`/\`click\`/\`eval\`. For a server,
the driver is \`curl\`. Whatever shape it takes, without something that
reaches into the running app, the skill is a description of a window
nobody can touch.

## Where the skill goes

The skill lives at \`<unit>/.claude/skills/run-<unit-name>/\`, where
\`<unit>\` is the directory for **one deployable thing** \u2014 an app, a
service, a library.

Claude Code **natively discovers** skills from nested \`.claude/skills/\`
directories: an agent working anywhere inside \`<unit>\` will see
\`/run-<unit-name>\` as an available skill, and it auto-loads when the
request matches its description (e.g. "run the desktop app," "take a
screenshot of billing").

- **Single-project repo:** \`.claude/skills/run-<repo-name>/\` at repo root.
- **Large repo with many apps:** one per app, colocated \u2014
  \`apps/billing/.claude/skills/run-billing/\`,
  \`apps/desktop/.claude/skills/run-desktop/\`.
- **App with multiple binaries:** still **one** skill at the app's
  root with a section per binary. They share setup. Start from the
  closest single-binary example and add a \`## Run: <name>\` section
  per binary.

If you're not sure where the unit boundary is, **ask the user.**

Slugify the directory name: lowercase, dashes for spaces, no slashes
(\`run-billing-api\`, not \`run-billing/api\`). The directory name and
the frontmatter \`name:\` should match \u2014 that's the slash command.

## Process

### 0. Find any existing skill about running this app

List the project's skills with their descriptions (same probe \`/run\`
uses \u2014 users name these variously, so match on description, not name):

\`\`\`bash
d=$PWD; while :; do
  grep -Hm1 '^description:' "$d"/.claude/skills/*/SKILL.md 2>/dev/null
  [ -e "$d/.git" ] || [ "$d" = / ] && break
  d=$(dirname "$d")
done
\`\`\`

If one is about launching/driving this app \u2014 whatever it's named \u2014
**refine, don't rewrite**: verify its claims, fix what's wrong, add
what's missing, preserve what works. Re-run the driver if there is
one. Keep its existing name.

(Also check for a legacy \`.claude/run.md\` \u2014 earlier versions of this
tool produced those. If you find one, migrate it: the body becomes
the skill's \`SKILL.md\` content, any referenced scripts move into the
skill dir, and delete the old file.)

If none exists, decide where to create it (see above) and continue.

### 1. Discover \u2014 and treat every claim as disprovable

Figure out what you're authoring for:

- Manifest right here (\`package.json\`, \`go.mod\`, \`pyproject.toml\`\u2026) and
  it's one self-contained thing \u2192 this is the unit.
- Looks like a mega-repo root (\`apps/\`, \`packages/\`, \`services/\`) \u2192
  **ask which one.** List candidates, let them pick, \`cd\` there.
- Genuinely ambiguous \u2192 ask.

Survey the usual places: \`README.md\`, \`package.json\` scripts,
\`Dockerfile\`, \`Makefile\`, \`.github/workflows/\`, \`CONTRIBUTING.md\`. CI
configs are often more accurate than READMEs.

**Every claim in existing docs is a hypothesis.** Especially the
negative ones:

| When docs say\u2026 | What you do |
|---|---|
| "Requires macOS/Windows" | Launch it on Linux anyway. Apps rarely refuse to start \u2014 they crash on a missing \`.so\`, which \`apt-get\` fixes. Native modules for *your host's* keychain/notifications may no-op; the core usually runs. |
| "Requires a GPU" | Try software rendering. Electron/Chrome fall back with \`--disable-gpu\`. |
| "Requires a paid account / feature flag" | The gate is code you can read. Find it (env var? build define? SSR-embedded JSON?) and patch it for your local run. Document the patch. |
| "Run \`npm start\`" | That's the human path (spawns a window, waits forever). Find or build the *programmatic* path \u2014 \`electron-forge start\` to build then launch via Playwright, or equivalent. |

"Not supported on Linux" in a README written by a macOS developer
means "I never tried." You're about to try. **If you give up here, the
skill you write is the README with extra steps.**

### 2. Execute \u2014 and BUILD the harness you need

You're in a headless Linux container. The app is going to fight you.
That fight is the content of the skill.

Keep a running \`NOTES.md\` as you go. Every error \u2192 every fix \u2192 every
command that finally worked. This scratchpad becomes the
Troubleshooting section.

**Work up to a real interaction:**

- **Install + build.** When something's missing, note the exact
  \`apt-get\` / \`npm install\` that fixed it.
- **Launch the app.** Not the test suite \u2014 the app. A desktop GUI
  (Electron, native) needs \`xvfb-run\` and a handful of \`lib*\`
  packages; a web app driven by \`chromium-cli\` runs headless and
  needs neither. Launch timeouts and cryptic crashes are normal at
  this stage. Read the stack trace, install the missing thing, try
  again.
- **Build a harness to drive it.** You need a handle on the running
  app that lets you send input and observe output programmatically.
  The shape depends on the project (see table below).

  **Cover the layer(s) PRs actually touch.** A tmux driver that pokes
  the CLI's user surface is the right handle for UI changes \u2014 and the
  wrong one for a PR that touches one internal function. For the
  latter an agent wants \`NODE_ENV=test bun run script.ts\` (or
  equivalent): import the function, call it, observe. If most PRs
  here touch internals, that direct-invocation path is the driver's
  main entry point, and the tmux launch is secondary. Look at recent
  merged PRs: what layer do they touch? Cover that.

  For a **web** app, \`chromium-cli\` is the driver \u2014 you script it,
  you don't write it (see [examples/playwright.md](examples/playwright.md)).
  For a **desktop** GUI (Electron), write a REPL driver (stdin
  commands \u2192 click/type/screenshot), run it inside tmux, and use
  \`send-keys\` / \`capture-pane\`. You will iterate on that driver \u2014 it
  starts minimal (\`launch\`, \`ss\`, \`quit\`) and grows whatever commands
  you need to reach the interesting part of the app.
- **Do one real user flow end-to-end.** Click the button. Fill the
  form. See the result in the DOM. Take a screenshot. **Actually look
  at the screenshot.** If it's blank or showing an error page, you're
  not done.
- **Then run the tests.** Unit tests are a sanity check, not the main
  event.
- **Stop cleanly.**

**Obstacles are content.** You will hit weird ones \u2014 coordinate systems
that don't line up, APIs that return empty on this Electron version,
feature gates that hide the thing you need to test. Each of these gets
a bullet in Gotchas and (often) a helper in your driver. The gold
standard is a Gotchas section full of things nobody could have guessed.

**The driver script gets committed alongside the skill.** It is not
scaffolding. It is the way future agents (and humans) will drive this
app. It defaults to living inside the skill directory (for a web app
using \`chromium-cli\`, that means inline in \`SKILL.md\` \u2014 the heredoc
is the script). If it outgrows that \u2014 if the project's real test
suite wants to import from it \u2014 move it to \`scripts/\` or \`e2e/\` and
update \`SKILL.md\` to point there.

### 3. Write SKILL.md

Short. Point at the driver. Use [template.md](template.md) as the
starting structure \u2014 it has the frontmatter shape.

**The frontmatter matters.** The \`name:\` becomes the slash command
(\`/run-billing\`). The \`description:\` is what Claude scans to decide
whether to auto-load this skill \u2014 put the **verbs an agent would
actually type** in it: "run," "start," "build," "test," "screenshot."
Generic descriptions ("helpful utilities for billing") won't match.

Body structure:

1. One-paragraph intro: what this app is, how it's driven \u2014
   \`<driver-path>\` under xvfb/tmux for desktop, \`chromium-cli\` for
   web, \`curl\` for a server.
2. **Prerequisites** \u2014 the exact \`apt-get install\` line you ran.
3. **Build** \u2014 the exact commands, in order. Include any patches you
   had to apply (feature gates, config overrides) with the exact \`sed\`
   or edit.
4. **Run (agent path)** \u2014 FIRST. How to launch the driver, what
   commands it accepts, where screenshots land. If it's a REPL, show
   the tmux wrapping. This is the section the next agent will actually
   use.
5. **Run (human path)** \u2014 SECOND, if different. \`npm start\` \u2192 window
   opens \u2192 Ctrl-C. Brief. Note that it's useless headless.
6. **Gotchas** \u2014 the battle scars. The things that look like they
   should work but don't, and the workaround. If this section is
   generic, you didn't fight hard enough.
7. **Troubleshooting** \u2014 symptom \u2192 fix. Only errors you actually hit.

Keep it **verified** (you ran it), **prescriptive** (one path, not
options), **honest** (flaky? slow? say so).

**Paths in SKILL.md are relative to \`<unit>/\`,** not to the skill
directory. State this at the top if there's any ambiguity. When the
driver lives inside the skill, its path from \`<unit>\` is
\`.claude/skills/run-<unit-name>/driver.mjs\` \u2014 it's long, but explicit.

### 4. Verify

Fresh shell, \`cd\` into the unit, follow the skill's \`SKILL.md\`
line-by-line without deviating. Any improvisation = a gap. Fix it.

## Project-type patterns

Pick a starting shape for your driver. These examples are shared with
the \`/run\` skill (same per-project-type patterns are used as the
fallback when no project-specific run skill exists) \u2014 if you're
authoring a new one, the example is your starting template.

| Project type | Driver shape | Example |
|---|---|---|
| Web server / API | Background-launch + \`curl\`-based smoke script | [examples/server.md](examples/server.md) |
| CLI tool | Representative-args smoke script, check exit codes + output | [examples/cli.md](examples/cli.md) |
| TUI / interactive terminal | tmux wrapper: \`send-keys\` / \`capture-pane\` | [examples/tui.md](examples/tui.md) |
| Electron / desktop GUI | Playwright \`_electron\` REPL driver under xvfb, screenshots, tmux-wrapped | [examples/electron.md](examples/electron.md) |
| Browser-driven | dev server + \`chromium-cli\` script | [examples/playwright.md](examples/playwright.md) |
| Library / SDK | Import-and-call smoke script | [examples/library.md](examples/library.md) |

For a web app, start from [examples/playwright.md](examples/playwright.md)
\u2014 drive it with \`chromium-cli\`, no custom driver needed. For a
desktop app, start from [examples/electron.md](examples/electron.md)
\u2014 it has the full \`_electron\` REPL driver skeleton, the tmux wrapping,
and the catalog of obstacles you'll hit.

## What to include

- **Prerequisites** \u2014 OS packages, runtimes, tools. Ubuntu \`apt-get\`
  lines. The exact ones.
- **Setup** \u2014 install deps, configure, any patches.
- **Build** \u2014 compile/bundle.
- **Run (agent path)** \u2014 the driver. Commands. Screenshot location.
- **Direct invocation** \u2014 if callable: how to import and run internal
  code without the full app. The env var / flag that bypasses init
  guards. Many PRs need only this.
- **Run (human path)** \u2014 if meaningfully different.
- **Test** \u2014 the test suite command.
- **Gotchas** \u2014 non-obvious traps you hit.
- **Troubleshooting** \u2014 error \u2192 fix.
- **The driver itself** \u2014 committed in the skill dir (or graduated
  to \`scripts/\`/\`e2e/\`), or inline in \`SKILL.md\` for \`chromium-cli\`
  web apps; referenced from \`SKILL.md\` either way.

## What to leave out

- **Anything you didn't run.** If the README says \`yarn start:prod\` and
  you never ran it, it's not in the skill. Full stop.
- **Documented happy paths for platforms you're not on.** You're in a
  Linux container. A macOS-only section you can't verify is
  speculation. Mention it exists; don't elaborate.
- **Exhaustive options.** One working path.
- **Architecture prose.** That's other docs.
- **Generic troubleshooting.** "If the build fails, check your Node
  version" \u2014 useless. Only include errors you actually hit and fixed.

## Red flags \u2014 you are about to ship the wrong thing

Stop and reconsider if:

- **You haven't taken a screenshot** of a GUI app. You didn't run it.
- **Your skill has no driver/smoke script** to point at, and the app
  is interactive. The next agent has no way to drive it. (Web app
  using \`chromium-cli\`? \u2014 the heredoc in \`SKILL.md\` is the driver;
  no separate file needed.)
- **Your skill reads like the README.** Same structure, same
  commands, same caveats. You paraphrased.
- **Your Troubleshooting section is generic.** Real execution produces
  specific, weird errors. Generic errors = you didn't execute.
- **You wrote "not supported on this platform"** without trying to
  launch it. The README author was on a Mac. You are not. Try.
- **Everything worked first try.** Either this project is trivially
  simple, or you ran the test suite and called it done.
`;
var IXl=()=>{};
var OXl=`---
name: run-<unit-name>
description: Build, run, and drive <unit-name>. Use when asked to start <unit-name>, run its tests, build it, take a screenshot of its UI, or interact with the running app.
---

<One-sentence description: what this is and how an agent drives it.
Name the handle here \u2014 "drive it via
\`.claude/skills/run-<unit-name>/driver.mjs\` under xvfb" for a desktop
app, or "start the dev server then drive it via \`chromium-cli\`" for a
web app \u2014 so an agent knows where to look first.>

<If the unit isn't at repo root:>
All paths below are relative to \`<unit-dir>/\`.

## Prerequisites

<System-level requirements. The exact \`apt-get install\` line you ran \u2014
not a generic list, the one that actually worked. Target Ubuntu.>

\`\`\`bash
sudo apt-get update
sudo apt-get install -y <packages-you-actually-installed>
\`\`\`

<Runtime versions if they matter:>

\`\`\`bash
# Example: Node 20 via nvm, Python 3.12 via uv, etc.
\`\`\`

## Setup

<One-time setup after clone: install deps, configure, apply any
patches (feature-gate overrides, config stubs) with the exact command.>

\`\`\`bash
<commands>
\`\`\`

<Env vars \u2014 required vs optional, with sensible defaults:>

\`\`\`bash
export FOO_API_KEY=...   # required \u2014 get from <where>
export BAR_MODE=dev      # optional \u2014 default is prod
\`\`\`

## Build

<Skip if no separate build step. Otherwise the exact command:>

\`\`\`bash
<command>
\`\`\`

## Run (agent path)

<This is the section a future agent actually uses. If you built a
driver/REPL/smoke script, this documents how to launch it and what it
does. If the app is simple enough that \`curl\` or a one-liner suffices,
that one-liner goes here.>

\`\`\`bash
<launch-the-driver-or-smoke-script>
\`\`\`

<For REPL-style drivers, show the tmux wrapping. Poll for a ready marker
between send-keys and capture-pane \u2014 faster than a fixed sleep and fails
loudly instead of capturing a half-rendered screen:>

\`\`\`bash
tmux new-session -d -s app -x 200 -y 50
tmux send-keys -t app '<launch command>' Enter
timeout 30 bash -c 'until tmux capture-pane -t app -p | grep -q "<ready-marker>"; do sleep 0.2; done'
tmux send-keys -t app '<first driver command>' Enter
tmux capture-pane -t app -p
\`\`\`

<Where artifacts land (screenshots, logs) \u2014 absolute paths:>

Screenshots \u2192 \`/tmp/shots/\`. Logs \u2192 \`/tmp/<app>.log\`.

<If the driver has commands, a table:>

| command | what it does |
|---|---|
| \`<cmd>\` | <description> |

## Run (human path)

<If meaningfully different from the agent path. Brief \u2014 agents won't
use this, humans can figure it out.>

\`\`\`bash
<command>   # \u2192 <what happens>. <how to stop>.
\`\`\`

## Test

\`\`\`bash
<command>
\`\`\`

<Expected result \u2014 "N suites pass", or specific known-flaky tests.>

---

<Optional sections below \u2014 include only if relevant and only with
content you actually hit, not generic advice.>

## Gotchas

<Non-obvious traps. The things that look like they should work but
don't, with the workaround. If this section is generic, delete it.>

- **<specific thing>** \u2014 <why it breaks> \u2192 <what to do instead>

## Troubleshooting

<Symptom \u2192 fix. Only errors you actually encountered.>

- **<exact error message or symptom>**: <cause>. <fix>.

<---

NOTE ON THE FRONTMATTER ABOVE:
- Replace <unit-name> in both \`name:\` and \`description:\`. The \`name:\`
  becomes the slash command (/run-<unit-name>) and must match the
  directory name.
- The \`description:\` is what Claude scans to decide whether to load this
  skill automatically. Keep the verbs \u2014 "start," "run," "build," "test,"
  "screenshot" \u2014 they're what an asking agent will actually type.

NOTE ON THE DRIVER:
- If you wrote a driver script, it lives in this same directory (next
  to this file) by default. Reference it from the Run section.
- For a web app there's usually no driver file \u2014 the \`chromium-cli\`
  heredoc in the Run section is the harness.
- If the driver grows into something the project's test suite wants \u2014
  shared launch helpers, a real e2e harness \u2014 move it to scripts/ or
  e2e/ in the unit, and update the paths here. The skill stays put.

Delete everything from \`---\` above onwards before committing. --->
`;
var PXl=()=>{};
var MXl={};
isFullscreenWithTTY(MXl,{registerRunSkillGeneratorSkill:()=>registerRunSkillGeneratorSkill});
function registerRunSkillGeneratorSkill(){ap({name:"run-skill-generator",menuDescription:"Create a skill that knows how to run this project\u2019s app",description:kFm,userInvocable:!0,disableModelInvocation:!0,files:{"template.md":OXl,...jXn},async getPromptForCommand(e){let t=[xFm.trimStart()];if(e)t.push(`## User Request

${e}`);return[{type:"text",text:t.join(`

`)}]}})}
var LXl,xFm,kFm;
var NXl=b(()=>{Ev();BE();IXl();PXl();WLo();({frontmatter:LXl,content:xFm}=RA(DXl)),kFm=typeof LXl.description==="string"?LXl.description:"Author or improve the run-<unit> skill for this project."});
export {DXl,IXl,OXl,PXl,MXl,registerRunSkillGeneratorSkill,LXl,xFm,kFm,NXl};

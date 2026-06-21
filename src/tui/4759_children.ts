// @ts-nocheck
import {Text as w} from "../../vendor/m2423.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {AEo as ubo,Cue as due,ggl as YAl} from "../../vendor/m4757.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
import {Box as B} from "../../vendor/m2422.ts";
// @ts-nocheck
function pmt(e) {
  let t = ojt.c(2),
    {
      children: n
    } = e,
    r;
  if (t[0] !== n) r = dr.createElement(w, {
    bold: true,
    color: "claude"
  }, n), t[0] = n, t[1] = r;else r = t[1];
  return r;
}
function zv(e) {
  let t = ojt.c(2),
    {
      children: n
    } = e,
    r;
  if (t[0] !== n) r = dr.createElement(w, {
    color: "suggestion"
  }, n), t[0] = n, t[1] = r;else r = t[1];
  return r;
}
function I3_() {
  let e = ojt.c(1),
    t;
  if (e[0] === Symbol.for("react.memo_cache_sentinel")) t = dr.createElement(w, {
    dimColor: true,
    italic: true
  }, dr.createElement(hn, null, dr.createElement(lt, {
    chord: ["up", "down"],
    action: "select"
  }), dr.createElement(lt, {
    chord: "enter",
    action: "open"
  }), dr.createElement(lt, {
    chord: "escape",
    action: "close"
  }))), e[0] = t;else t = e[0];
  return t;
}
function N2() {
  let e = ojt.c(1),
    t;
  if (e[0] === Symbol.for("react.memo_cache_sentinel")) t = dr.createElement(w, {
    dimColor: true,
    italic: true
  }, dr.createElement(hn, null, dr.createElement(lt, {
    chord: "enter",
    action: "mark done"
  }), dr.createElement(lt, {
    chord: "escape",
    action: "back"
  }))), e[0] = t;else t = e[0];
  return t;
}
var ojt, dr, I_H;
var N34 = b(() => {
  Je();
  qs();
  ts();
  ubo();
  ojt = L(nt(), 1), dr = L(Te(), 1);
  I_H = [{
    id: "at-mentions",
    title: "Talk to your codebase",
    tagline: "@ files, line refs",
    body: dr.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, dr.createElement(w, null, "Type ", dr.createElement(pmt, null, "@"), " anywhere in your prompt to fuzzy-find and attach a file. Claude reads it before answering \u2014 no more pasting code."), dr.createElement(due, {
      frames: [`> what does [suggestion:@]
#type a file name\u2026`, `> what does [suggestion:@src/auth.ts]
  [suggestion:\u276F src/auth.ts]
#   src/auth.test.ts`, `> what does [suggestion:@src/auth.ts] do?
#\u25D0 Reading src/auth.ts\u2026`, `> what does [suggestion:@src/auth.ts] do?
Exports validateToken() which
checks JWT expiry and signature.`]
    }), dr.createElement(w, null, "Reference specific lines with ", dr.createElement(zv, null, "src/app.ts:42"), " and Claude jumps straight there. Works in both directions: Claude cites files the same way, so you can click to open them in your editor."), dr.createElement(w, {
      dimColor: true
    }, "Also try: ", dr.createElement(zv, null, "@folder/"), " to attach a whole directory tree."))
  }, {
    id: "modes",
    title: "Steer with modes",
    tagline: "shift+tab, plan, auto",
    body: dr.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, dr.createElement(w, null, "Press ", dr.createElement(pmt, null, "shift+tab"), " to cycle permission modes. Each mode changes how much Claude asks before acting:"), dr.createElement(YAl, null), dr.createElement(B, {
      flexDirection: "column",
      paddingLeft: 2
    }, dr.createElement(w, null, dr.createElement(w, {
      color: "success"
    }, "default"), " \u2014 ask before every edit"), dr.createElement(w, null, dr.createElement(w, {
      color: "autoAccept"
    }, "accept edits"), " \u2014 edit freely, ask for commands"), dr.createElement(w, null, dr.createElement(w, {
      color: "planMode"
    }, "plan"), " \u2014 research and propose, never touch files"), dr.createElement(w, null, dr.createElement(w, {
      color: "warning"
    }, "auto"), " \u2014 Claude decides what is safe")), dr.createElement(w, {
      dimColor: true
    }, "Use ", dr.createElement(w, {
      color: "planMode"
    }, "plan"), " for big refactors you want to review first. Use ", dr.createElement(w, {
      color: "warning"
    }, "auto"), " for long unattended tasks. Run ", dr.createElement(zv, null, "/permissions"), " to pre-allow specific commands so Claude stops asking about them."))
  }, {
    id: "undo",
    title: "Undo anything",
    tagline: "/rewind, Esc-Esc",
    body: dr.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, dr.createElement(w, null, "Claude checkpoints your files before every edit. Press", " ", dr.createElement(pmt, null, "Esc Esc"), " (double-tap) to open ", dr.createElement(zv, null, "/rewind"), " and roll back to any prior state \u2014 code, conversation, or both."), dr.createElement(due, {
      frames: [`[success:\u2713] Updated regex in parser.ts
#[error:8 tests failing]`, `#press Esc Esc
Rewind to:
  [suggestion:\u276F before parser.ts edit]`, `#[success:\u2713] parser.ts restored
> try a simpler approach
#\u25D0 thinking\u2026`]
    }), dr.createElement(w, null, "Went down the wrong path? Rewind to before the detour and try a different prompt. Your git history stays clean."), dr.createElement(w, {
      dimColor: true
    }, "Also: ", dr.createElement(zv, null, "/clear"), " wipes conversation but keeps files.", " ", dr.createElement(zv, null, "/branch"), " forks the conversation to try two approaches."))
  }, {
    id: "background",
    title: "Run in the background",
    tagline: "tasks, /tasks",
    body: dr.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, dr.createElement(w, null, "Long builds and test suites do not have to block you. Add", " ", dr.createElement(pmt, null, "&"), " to any bash command and it runs in the background \u2014 you keep chatting, Claude notifies you when it finishes."), dr.createElement(due, {
      frames: [`> run the test suite [claude:&]
#task started in background`, `> now fix the lint in app.ts
#\u25D0 Editing app.ts\u2026
#[warning:\u25D0] bun test \xB7 12s`, `> now fix the lint in app.ts
[success:\u2713] Removed unused import
#[warning:\u25D0] bun test \xB7 28s`, `> now fix the lint in app.ts
[success:\u2713] Removed unused import
#[success:\u2713] bun test \xB7 284 pass`]
    }), dr.createElement(w, null, "Run ", dr.createElement(zv, null, "/tasks"), " to see everything in flight. Claude can read task output mid-run and react to failures automatically."), dr.createElement(w, {
      dimColor: true
    }, "Subagents also run as tasks \u2014 it is all one queue."))
  }, {
    id: "memory",
    title: "Teach Claude your rules",
    tagline: "CLAUDE.md, /memory",
    body: dr.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, dr.createElement(w, null, "Drop a ", dr.createElement(zv, null, "CLAUDE.md"), " file in your repo and Claude reads it at the start of every session. Put your conventions there: test commands, style rules, do-not-touch directories."), dr.createElement(due, {
      frames: [`#\u2500 CLAUDE.md \u2500
#Run tests with: [suggestion:bun test]
#Never edit src/legacy/`, `> add tests for the cache
#\u25D0 reading CLAUDE.md\u2026`, `> add tests for the cache
Writing cache.test.ts,
running [suggestion:bun test] to verify.`]
    }), dr.createElement(w, null, "Run ", dr.createElement(zv, null, "/init"), " to generate a starter CLAUDE.md from your codebase. Run ", dr.createElement(zv, null, "/memory"), " to edit it inline."), dr.createElement(w, {
      dimColor: true
    }, "Works at three levels: repo, your home directory (all projects), and per-directory overrides."))
  }, {
    id: "mcp",
    title: "Extend with tools",
    tagline: "MCP, /mcp",
    body: dr.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, dr.createElement(w, null, "MCP servers give Claude new tools: read your Slack, query your database, control your browser. Run ", dr.createElement(zv, null, "/mcp"), " to browse and connect servers."), dr.createElement(due, {
      frames: [`> [suggestion:/mcp]
Connected servers:
  [success:\u2713] slack    [success:\u2713] github`, `> anything urgent in #eng?
#\u25D0 [suggestion:slack] \xB7 reading channel\u2026`, `Boris posted about the merge
freeze. Also 3 PRs await
your review on github.`]
    }), dr.createElement(w, null, 'Once connected, tools appear automatically \u2014 ask Claude to "check my calendar" or "search our Notion" and it just works.'), dr.createElement(w, {
      dimColor: true
    }, "From your shell:", " ", dr.createElement(zv, null, "claude mcp add my-server -- npx some-mcp-pkg"), " to wire one up without leaving the terminal."))
  }, {
    id: "automate",
    title: "Automate your workflow",
    tagline: "skills, hooks",
    body: dr.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, dr.createElement(w, null, "Save a prompt to ", dr.createElement(zv, null, ".claude/skills/deploy/SKILL.md"), " and it becomes ", dr.createElement(zv, null, "/deploy"), " \u2014 type it, Claude runs it. Run", " ", dr.createElement(zv, null, "/skills"), " to see what you have."), dr.createElement(due, {
      frames: [`> [suggestion:/deploy] staging
#\u25D0 skill: deploy`, `[success:\u2713] built
[success:\u2713] tests pass
#\u25D0 pushing to staging\u2026`, `[success:\u2713] deployed
#[suggestion:staging.app.com]
#PostToolUse hook ran prettier`]
    }), dr.createElement(w, null, "Hooks run your own scripts on events: before a tool call, after a response, on session start. Use them to enforce rules, log activity, or inject context. Run ", dr.createElement(zv, null, "/hooks"), " to see what fires when."), dr.createElement(w, {
      dimColor: true
    }, "Run ", dr.createElement(zv, null, "/install-github-app"), " to let Claude review PRs when tagged."))
  }, {
    id: "subagents",
    title: "Multiply yourself",
    tagline: "subagents, /agents",
    body: dr.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, dr.createElement(w, null, 'Claude can spawn copies of itself to work in parallel. Ask it to "use subagents to search these 5 directories" and watch the fan-out.'), dr.createElement(due, {
      frames: [`> find any error handling bugs
#\u25D0 Spawning 3 agents\u2026`, `#[warning:\u25D0] agent-1 \xB7 scanning api
#[warning:\u25D0] agent-2 \xB7 scanning utils
#[warning:\u25D0] agent-3 \xB7 scanning cli`, `#[success:\u2713] agent-1 \xB7 found reject
#[warning:\u25D0] agent-2 \xB7 scanning utils
#[success:\u2713] agent-3 \xB7 no issues`, `Found 2 issues:
  [suggestion:api/fetch.ts:42] unhandled
  [suggestion:utils/retry.ts:18] swallowed`]
    }), dr.createElement(w, null, "Define specialized agents in ", dr.createElement(zv, null, ".claude/agents/"), " \u2014 a test runner, a code reviewer, a docs writer \u2014 each with its own tools and instructions. Run ", dr.createElement(zv, null, "/agents"), " to manage them."), dr.createElement(w, {
      dimColor: true
    }, "Subagents run in isolated context. For true parallel sessions on separate branches, launch with ", dr.createElement(zv, null, "claude --worktree"), "."))
  }, {
    id: "cross-device",
    title: "Code from anywhere",
    tagline: "/remote-control, /teleport",
    body: dr.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, dr.createElement(w, null, "Run ", dr.createElement(zv, null, "/remote-control"), " to take this session with you and pick up right where you left off on any device. Open the Code tab in the Claude mobile app, or visit claude.ai/code in a browser. The session keeps running on this machine while your other devices act as a remote control."), dr.createElement(due, {
      frames: [`> [suggestion:/remote-control]
#\u25D0 connecting\u2026`, `[success:\u2713] connected
see this session at
[suggestion:claude.ai/code/abc123]`, `#\u2500 on your phone \u2500
#abc123 \xB7 running tests
[warning:\u25D0] 142 of 284`, `#\u2500 on your phone \u2500
#abc123 \xB7 [success:\u2713] all pass
> ship it`]
    }), dr.createElement(w, null, "Started a session on the web and want to move it here? Run", " ", dr.createElement(zv, null, "/teleport"), " to pull it into this terminal with full history."), dr.createElement(w, {
      dimColor: true
    }, "Kick off a long task, close your laptop, check progress from your phone."))
  }, {
    id: "model-dial",
    title: "Dial the model",
    tagline: "/model, /effort",
    body: dr.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, dr.createElement(w, null, "Run ", dr.createElement(zv, null, "/model"), " to switch models. Fable for the hardest problems, Opus for complex work, Sonnet for most tasks, Haiku for quick questions. Each trades speed for depth."), dr.createElement(due, {
      frames: [`> [suggestion:/effort] high
#effort set to [claude:high]`, `> why is the list page slow?
#[claude:\u25D0 thinking deeply\u2026]`, `Three hypotheses, ranked:
 1. N+1 query in loader
 2. missing index on users`]
    }), dr.createElement(w, null, dr.createElement(zv, null, "/effort"), " controls how long Claude thinks before answering.", " ", dr.createElement(pmt, null, "high"), " for tricky bugs, ", dr.createElement(pmt, null, "low"), " when you just need a quick edit."), dr.createElement(w, {
      dimColor: true
    }, "Also: ", dr.createElement(zv, null, "/fast"), " toggles fast mode \u2014 same model, faster output."))
  }];
});

export {pmt as Mmt,zv as Zv,I3_ as _gl,N2 as ygl,ojt as Djt,dr as ar,I_H as HG,N34 as hEo};

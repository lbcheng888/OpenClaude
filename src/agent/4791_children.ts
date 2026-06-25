// @ts-nocheck
import {Text as v} from "../../vendor/m2433.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Oko,Cue,mRl} from "../../vendor/m4789.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
import {Box as $} from "../../vendor/m2432.ts";
/**
 * Onboarding "feature tour" card content (Claude Code v2.1.190).
 *
 * Defines two tiny presentational React components (`jht` bold "claude"-colored span,
 * `sR` "suggestion"-colored span), two memoized keyboard-hint footers (`fRl`, `hRl`),
 * and `zG` — the ordered list of onboarding tip cards (id/title/tagline/body).
 *
 * Cross-module identifiers (Ns jsx runtime, JWt react-compiler memo cache, v/$/bn/at/Cue/mRl
 * components, b/x/tt/oe/je/Is/Wo/Oko loaders) are kept verbatim.
 */

/** Inline bold "claude"-colored text span. Props: `{ children }`. */
function jht(e: { children: unknown }) {
  let cache = JWt.c(2),
    {
      children: children
    } = e,
    element: unknown;
  if (cache[0] !== children) element = Ns.jsx(v, {
    bold: !0,
    color: "claude",
    children: children
  }), cache[0] = children, cache[1] = element;else element = cache[1];
  return element;
}
/** Inline "suggestion"-colored text span (slash-commands, paths). Props: `{ children }`. */
function sR(e: { children: unknown }) {
  let cache = JWt.c(2),
    {
      children: children
    } = e,
    element: unknown;
  if (cache[0] !== children) element = Ns.jsx(v, {
    color: "suggestion",
    children: children
  }), cache[0] = children, cache[1] = element;else element = cache[1];
  return element;
}
/** Memoized keyboard-hint footer: navigate / open / close chords. */
function fRl() {
  let cache = JWt.c(1),
    element: unknown;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) element = Ns.jsx(v, {
    dimColor: !0,
    italic: !0,
    children: Ns.jsxs(bn, {
      children: [Ns.jsx(at, {
        chord: ["up", "down"],
        action: "select"
      }), Ns.jsx(at, {
        chord: "enter",
        action: "open"
      }), Ns.jsx(at, {
        chord: "escape",
        action: "close"
      })]
    })
  }), cache[0] = element;else element = cache[0];
  return element;
}
/** Memoized keyboard-hint footer: mark done / back chords. */
function hRl() {
  let cache = JWt.c(1),
    element: unknown;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) element = Ns.jsx(v, {
    dimColor: !0,
    italic: !0,
    children: Ns.jsxs(bn, {
      children: [Ns.jsx(at, {
        chord: "enter",
        action: "mark done"
      }), Ns.jsx(at, {
        chord: "escape",
        action: "back"
      })]
    })
  }), cache[0] = element;else element = cache[0];
  return element;
}
var JWt, Ns, zG;
var Lko = b(() => {
  je();
  Is();
  Wo();
  Oko();
  JWt = x(tt(), 1), Ns = x(oe(), 1);
  zG = [{
    id: "at-mentions",
    title: "Talk to your codebase",
    tagline: "@ files, line refs",
    body: Ns.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [Ns.jsxs(v, {
        children: ["Type ", Ns.jsx(jht, {
          children: "@"
        }), " anywhere in your prompt to fuzzy-find and attach a file. Claude reads it before answering \u2014 no more pasting code."]
      }), Ns.jsx(Cue, {
        frames: [`> what does [suggestion:@]
#type a file name\u2026`, `> what does [suggestion:@src/auth.ts]
  [suggestion:\u276F src/auth.ts]
#   src/auth.test.ts`, `> what does [suggestion:@src/auth.ts] do?
#\u25D0 Reading src/auth.ts\u2026`, `> what does [suggestion:@src/auth.ts] do?
Exports validateToken() which
checks JWT expiry and signature.`]
      }), Ns.jsxs(v, {
        children: ["Reference specific lines with ", Ns.jsx(sR, {
          children: "src/app.ts:42"
        }), " and Claude jumps straight there. Works in both directions: Claude cites files the same way, so you can click to open them in your editor."]
      }), Ns.jsxs(v, {
        dimColor: !0,
        children: ["Also try: ", Ns.jsx(sR, {
          children: "@folder/"
        }), " to attach a whole directory tree."]
      })]
    })
  }, {
    id: "modes",
    title: "Steer with modes",
    tagline: "shift+tab, plan, auto",
    body: Ns.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [Ns.jsxs(v, {
        children: ["Press ", Ns.jsx(jht, {
          children: "shift+tab"
        }), " to cycle permission modes. Each mode changes how much Claude asks before acting:"]
      }), Ns.jsx(mRl, {}), Ns.jsxs($, {
        flexDirection: "column",
        paddingLeft: 2,
        children: [Ns.jsxs(v, {
          children: [Ns.jsx(v, {
            color: "success",
            children: "default"
          }), " \u2014 ask before every edit"]
        }), Ns.jsxs(v, {
          children: [Ns.jsx(v, {
            color: "autoAccept",
            children: "accept edits"
          }), " \u2014 edit freely, ask for commands"]
        }), Ns.jsxs(v, {
          children: [Ns.jsx(v, {
            color: "planMode",
            children: "plan"
          }), " \u2014 research and propose, never touch files"]
        }), Ns.jsxs(v, {
          children: [Ns.jsx(v, {
            color: "warning",
            children: "auto"
          }), " \u2014 Claude decides what is safe"]
        })]
      }), Ns.jsxs(v, {
        dimColor: !0,
        children: ["Use ", Ns.jsx(v, {
          color: "planMode",
          children: "plan"
        }), " for big refactors you want to review first. Use ", Ns.jsx(v, {
          color: "warning",
          children: "auto"
        }), " for long unattended tasks. Run ", Ns.jsx(sR, {
          children: "/permissions"
        }), " to pre-allow specific commands so Claude stops asking about them."]
      })]
    })
  }, {
    id: "undo",
    title: "Undo anything",
    tagline: "/rewind, Esc-Esc",
    body: Ns.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [Ns.jsxs(v, {
        children: ["Claude checkpoints your files before every edit. Press", " ", Ns.jsx(jht, {
          children: "Esc Esc"
        }), " (double-tap) to open ", Ns.jsx(sR, {
          children: "/rewind"
        }), " and roll back to any prior state \u2014 code, conversation, or both."]
      }), Ns.jsx(Cue, {
        frames: [`[success:\u2713] Updated regex in parser.ts
#[error:8 tests failing]`, `#press Esc Esc
Rewind to:
  [suggestion:\u276F before parser.ts edit]`, `#[success:\u2713] parser.ts restored
> try a simpler approach
#\u25D0 thinking\u2026`]
      }), Ns.jsx(v, {
        children: "Went down the wrong path? Rewind to before the detour and try a different prompt. Your git history stays clean."
      }), Ns.jsxs(v, {
        dimColor: !0,
        children: ["Also: ", Ns.jsx(sR, {
          children: "/clear"
        }), " wipes conversation but keeps files.", " ", Ns.jsx(sR, {
          children: "/branch"
        }), " forks the conversation to try two approaches."]
      })]
    })
  }, {
    id: "background",
    title: "Run in the background",
    tagline: "tasks, /tasks",
    body: Ns.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [Ns.jsxs(v, {
        children: ["Long builds and test suites do not have to block you. Add", " ", Ns.jsx(jht, {
          children: "&"
        }), " to any bash command and it runs in the background \u2014 you keep chatting, Claude notifies you when it finishes."]
      }), Ns.jsx(Cue, {
        frames: [`> run the test suite [claude:&]
#task started in background`, `> now fix the lint in app.ts
#\u25D0 Editing app.ts\u2026
#[warning:\u25D0] bun test \xB7 12s`, `> now fix the lint in app.ts
[success:\u2713] Removed unused import
#[warning:\u25D0] bun test \xB7 28s`, `> now fix the lint in app.ts
[success:\u2713] Removed unused import
#[success:\u2713] bun test \xB7 284 pass`]
      }), Ns.jsxs(v, {
        children: ["Run ", Ns.jsx(sR, {
          children: "/tasks"
        }), " to see everything in flight. Claude can read task output mid-run and react to failures automatically."]
      }), Ns.jsx(v, {
        dimColor: !0,
        children: "Subagents also run as tasks \u2014 it is all one queue."
      })]
    })
  }, {
    id: "memory",
    title: "Teach Claude your rules",
    tagline: "CLAUDE.md, /memory",
    body: Ns.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [Ns.jsxs(v, {
        children: ["Drop a ", Ns.jsx(sR, {
          children: "CLAUDE.md"
        }), " file in your repo and Claude reads it at the start of every session. Put your conventions there: test commands, style rules, do-not-touch directories."]
      }), Ns.jsx(Cue, {
        frames: [`#\u2500 CLAUDE.md \u2500
#Run tests with: [suggestion:bun test]
#Never edit src/legacy/`, `> add tests for the cache
#\u25D0 reading CLAUDE.md\u2026`, `> add tests for the cache
Writing cache.test.ts,
running [suggestion:bun test] to verify.`]
      }), Ns.jsxs(v, {
        children: ["Run ", Ns.jsx(sR, {
          children: "/init"
        }), " to generate a starter CLAUDE.md from your codebase. Run ", Ns.jsx(sR, {
          children: "/memory"
        }), " to edit it inline."]
      }), Ns.jsx(v, {
        dimColor: !0,
        children: "Works at three levels: repo, your home directory (all projects), and per-directory overrides."
      })]
    })
  }, {
    id: "mcp",
    title: "Extend with tools",
    tagline: "MCP, /mcp",
    body: Ns.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [Ns.jsxs(v, {
        children: ["MCP servers give Claude new tools: read your Slack, query your database, control your browser. Run ", Ns.jsx(sR, {
          children: "/mcp"
        }), " to browse and connect servers."]
      }), Ns.jsx(Cue, {
        frames: [`> [suggestion:/mcp]
Connected servers:
  [success:\u2713] slack    [success:\u2713] github`, `> anything urgent in #eng?
#\u25D0 [suggestion:slack] \xB7 reading channel\u2026`, `Boris posted about the merge
freeze. Also 3 PRs await
your review on github.`]
      }), Ns.jsx(v, {
        children: 'Once connected, tools appear automatically \u2014 ask Claude to "check my calendar" or "search our Notion" and it just works.'
      }), Ns.jsxs(v, {
        dimColor: !0,
        children: ["From your shell:", " ", Ns.jsx(sR, {
          children: "claude mcp add my-server -- npx some-mcp-pkg"
        }), " to wire one up without leaving the terminal."]
      })]
    })
  }, {
    id: "automate",
    title: "Automate your workflow",
    tagline: "skills, hooks",
    body: Ns.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [Ns.jsxs(v, {
        children: ["Save a prompt to ", Ns.jsx(sR, {
          children: ".claude/skills/deploy/SKILL.md"
        }), " and it becomes ", Ns.jsx(sR, {
          children: "/deploy"
        }), " \u2014 type it, Claude runs it. Run", " ", Ns.jsx(sR, {
          children: "/skills"
        }), " to see what you have."]
      }), Ns.jsx(Cue, {
        frames: [`> [suggestion:/deploy] staging
#\u25D0 skill: deploy`, `[success:\u2713] built
[success:\u2713] tests pass
#\u25D0 pushing to staging\u2026`, `[success:\u2713] deployed
#[suggestion:staging.app.com]
#PostToolUse hook ran prettier`]
      }), Ns.jsxs(v, {
        children: ["Hooks run your own scripts on events: before a tool call, after a response, on session start. Use them to enforce rules, log activity, or inject context. Run ", Ns.jsx(sR, {
          children: "/hooks"
        }), " to see what fires when."]
      }), Ns.jsxs(v, {
        dimColor: !0,
        children: ["Run ", Ns.jsx(sR, {
          children: "/install-github-app"
        }), " to let Claude review PRs when tagged."]
      })]
    })
  }, {
    id: "subagents",
    title: "Multiply yourself",
    tagline: "subagents, /agents",
    body: Ns.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [Ns.jsx(v, {
        children: 'Claude can spawn copies of itself to work in parallel. Ask it to "use subagents to search these 5 directories" and watch the fan-out.'
      }), Ns.jsx(Cue, {
        frames: [`> find any error handling bugs
#\u25D0 Spawning 3 agents\u2026`, `#[warning:\u25D0] agent-1 \xB7 scanning api
#[warning:\u25D0] agent-2 \xB7 scanning utils
#[warning:\u25D0] agent-3 \xB7 scanning cli`, `#[success:\u2713] agent-1 \xB7 found reject
#[warning:\u25D0] agent-2 \xB7 scanning utils
#[success:\u2713] agent-3 \xB7 no issues`, `Found 2 issues:
  [suggestion:api/fetch.ts:42] unhandled
  [suggestion:utils/retry.ts:18] swallowed`]
      }), Ns.jsxs(v, {
        children: ["Define specialized agents in ", Ns.jsx(sR, {
          children: ".claude/agents/"
        }), " \u2014 a test runner, a code reviewer, a docs writer \u2014 each with its own tools and instructions. Run ", Ns.jsx(sR, {
          children: "/agents"
        }), " to manage them."]
      }), Ns.jsxs(v, {
        dimColor: !0,
        children: ["Subagents run in isolated context. For true parallel sessions on separate branches, launch with ", Ns.jsx(sR, {
          children: "claude --worktree"
        }), "."]
      })]
    })
  }, {
    id: "cross-device",
    title: "Code from anywhere",
    tagline: "/remote-control, /teleport",
    body: Ns.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [Ns.jsxs(v, {
        children: ["Run ", Ns.jsx(sR, {
          children: "/remote-control"
        }), " to take this session with you and pick up right where you left off on any device. Open the Code tab in the Claude mobile app, or visit claude.ai/code in a browser. The session keeps running on this machine while your other devices act as a remote control."]
      }), Ns.jsx(Cue, {
        frames: [`> [suggestion:/remote-control]
#\u25D0 connecting\u2026`, `[success:\u2713] connected
see this session at
[suggestion:claude.ai/code/abc123]`, `#\u2500 on your phone \u2500
#abc123 \xB7 running tests
[warning:\u25D0] 142 of 284`, `#\u2500 on your phone \u2500
#abc123 \xB7 [success:\u2713] all pass
> ship it`]
      }), Ns.jsxs(v, {
        children: ["Started a session on the web and want to move it here? Run", " ", Ns.jsx(sR, {
          children: "/teleport"
        }), " to pull it into this terminal with full history."]
      }), Ns.jsx(v, {
        dimColor: !0,
        children: "Kick off a long task, close your laptop, check progress from your phone."
      })]
    })
  }, {
    id: "model-dial",
    title: "Dial the model",
    tagline: "/model, /effort",
    body: Ns.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [Ns.jsxs(v, {
        children: ["Run ", Ns.jsx(sR, {
          children: "/model"
        }), " to switch models. Fable for the hardest problems, Opus for complex work, Sonnet for most tasks, Haiku for quick questions. Each trades speed for depth."]
      }), Ns.jsx(Cue, {
        frames: [`> [suggestion:/effort] high
#effort set to [claude:high]`, `> why is the list page slow?
#[claude:\u25D0 thinking deeply\u2026]`, `Three hypotheses, ranked:
 1. N+1 query in loader
 2. missing index on users`]
      }), Ns.jsxs(v, {
        children: [Ns.jsx(sR, {
          children: "/effort"
        }), " controls how long Claude thinks before answering.", " ", Ns.jsx(jht, {
          children: "high"
        }), " for tricky bugs, ", Ns.jsx(jht, {
          children: "low"
        }), " when you just need a quick edit."]
      }), Ns.jsxs(v, {
        dimColor: !0,
        children: ["Also: ", Ns.jsx(sR, {
          children: "/fast"
        }), " toggles fast mode \u2014 same model, faster output."]
      })]
    })
  }];
});
export {jht,sR,fRl,hRl,JWt,Ns,zG,Lko};

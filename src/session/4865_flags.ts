// @ts-nocheck
import {Cjn,tIo} from "../../vendor/m4863.ts";
import {fat,bIe} from "../telemetry/3337_ignoreUntracked.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {detectCurrentRepositoryWithHost as cM,_0} from "../../vendor/m697.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {qt,tn} from "../config/0230_encoding.ts";
import {Jdo,A6e,C6e,S9a,Rte,fG,uxe} from "../config/3990_maxFiles.ts";
import {LFa,Oco} from "../telemetry/3887_cwd.ts";
import {gitExe as go,getDefaultBranch as Zx,getBranch as Ry,ia} from "../../vendor/m698.ts";
import {z$n,t3t} from "../config/3927_hunks.ts";
import {BHl,UHl} from "../config/4863_action.ts";
import {Zle,dte,rye,ece,mY} from "../tools/3889_allowBundle.ts";
import {teleportToRemote as Lq,qD} from "../permissions/3888_validateSessionRepository.ts";
import {b} from "../../runtime.ts";
/**
 * Ultrareview (cloud /code-review ultra) launch pipeline.
 *
 * Validates the review scope (PR number or branch), checks billing/overage
 * preconditions, then teleports a bundle/PR into a cloud sandbox where the
 * bughunter fleet runs the review. Emits `tengu_review_*` telemetry along the way.
 */

/** Mark that the user has confirmed the usage-credit billing prompt. */
function nIo() {
  $Hl = !0;
}

/**
 * Parse the raw slash-command argument string into the review scope args plus
 * the recognized `--fix` / `--comment` flags.
 */
function qHl(e: string): { scopeArgs: string[]; applyFixes: boolean } {
  let {
    flags: t,
    rest: n
  } = Cjn(e, ["fix", "comment"]);
  return {
    scopeArgs: n,
    applyFixes: t.has("fix")
  };
}

/**
 * Resolve the review scope from a raw argument.
 *
 * Returns either a `pr` scope (numeric arg -> GitHub PR) or a `branch` scope
 * (branch name / empty -> current branch vs base), validating git repo state,
 * GitHub remote, merge-base existence and diff-size limits. On failure returns
 * `{ ok: false, error }` and records a precondition-failed telemetry reason.
 *
 * @param e raw scope argument (PR number, branch name, or empty)
 * @param t invocation label used in error messages
 */
async function rIo(
  e: string,
  t = "/code-review ultra"
): Promise<
  | { ok: false; error: string }
  | { ok: true; scope: { mode: "pr"; prNumber: string; repo: string } }
  | {
      ok: true;
      scope: {
        mode: "branch";
        headBranch: string;
        baseBranch: string;
        mergeBaseSha: string;
        diffStat: string;
      };
    }
> {
  if (!(await fat())) return W("tengu_review_remote_precondition_failed", {
    reason: Ve("not_git_repo")
  }), {
    ok: !1,
    error: `${t} needs a git repository so it can clone your code into a cloud sandbox, but ${Lt()} is not inside one. Run "git init" here to create a repository, or cd into an existing one.`
  };
  /** Trimmed scope argument. */
  let n = e.trim();
  if (/^\d+$/.test(n)) {
    /** Detected GitHub remote (host/owner/name) for the current repo. */
    let p = await cM();
    if (!p) return W("tengu_review_remote_precondition_failed", {
      reason: Ve("no_github_remote")
    }), {
      ok: !1,
      error: `${t} <PR#> needs a GitHub remote so it knows which repository the PR is in. If this project is not on GitHub yet, run "gh repo create --source=. --push" to create one; if a GitHub repo already exists, run "git remote add origin REPO_URL". Or run ${t} with no argument to review your current branch instead.`
    };
    if (p.host.toLowerCase() === "github.com" && p.owner.toLowerCase() === "anthropics" && p.name.toLowerCase() === "anthropic") return W("tengu_review_remote_precondition_failed", {
      reason: Ve("monorepo_blocked")
    }), {
      ok: !1,
      error: `${t} doesn't support the Anthropic monorepo — monorepo PRs are reviewed automatically by bughunter. Re-trigger it from the PR checks page, or run /bughunter here for a local hunt.`
    };
    let {
      stdout: m,
      code: f
    } = await Fn("gh", ["pr", "view", n, "--repo", `${p.host}/${p.owner}/${p.name}`, "--json", "additions,deletions,changedFiles"], {
      timeout: 5000,
      preserveOutputOnError: !1
    });
    if (f === 0 && m.trim()) try {
      /** Parsed `gh pr view` JSON: additions/deletions/changedFiles. */
      let h = qt(m),
        {
          maxFiles: g,
          maxLines: _
        } = Jdo(),
        /** Total lines changed (additions + deletions). */
        T = h.additions + h.deletions;
      if (h.changedFiles > g || T > _) return W("tengu_review_remote_precondition_failed", {
        reason: Ve("pr_diff_too_large"),
        files: h.changedFiles,
        lines: T,
        max_files: g,
        max_lines: _
      }), {
        ok: !1,
        error: `PR #${n} is too large for ultrareview (${h.changedFiles} files, ${T.toLocaleString()} lines). Split it into smaller PRs, or run \`${t}\` on a narrower local diff.`
      };
    } catch {}
    return {
      ok: !0,
      scope: {
        mode: "pr",
        prNumber: n,
        repo: `${p.owner}/${p.name}`
      }
    };
  }
  if (await LFa()) return W("tengu_review_remote_precondition_failed", {
    reason: Ve("repo_too_large_to_bundle")
  }), {
    ok: !1,
    error: `Repo is too large to bundle. Push a PR and use \`${t} <PR#>\` instead.`
  };
  if (n) {
    /** True if the given ref exists locally. */
    let p = async (m: string) => (await Fn(go(), ["rev-parse", "--verify", "--quiet", m], {
      preserveOutputOnError: !1
    })).code === 0;
    if (!(await p(`origin/${n}`)) && !(await p(n))) return W("tengu_review_remote_precondition_failed", {
      reason: Ve("base_ref_not_found")
    }), {
      ok: !1,
      error: `"${n}" is not a branch in this repo. ${t} takes a PR number, a branch name, or no argument (reviews your current branch). Try ${t} by itself.`
    };
  }
  /** Base branch to diff against. */
  let r = n || (await Zx()) || "main",
    /** Current head branch (or HEAD when detached). */
    o = (await Ry()) || "HEAD",
    /** Run `git merge-base <ref> HEAD`. */
    s = async (p: string) => Fn(go(), ["merge-base", p, "HEAD"], {
      preserveOutputOnError: !1
    }),
    {
      stdout: i,
      code: a
    } = await s(`origin/${r}`);
  if (a !== 0) ({
    stdout: i,
    code: a
  } = await s(r));
  /** Resolved merge-base SHA. */
  let l = i.trim();
  if (a !== 0 || !l) {
    W("tengu_review_remote_precondition_failed", {
      reason: Ve("no_merge_base")
    });
    /** User-facing hint for fixing the missing merge-base. */
    let p = n ? `Make sure ${r} exists locally or on origin (try \`git fetch origin ${r}\`).` : `Pass the base branch explicitly (e.g. \`${t} develop\`) or make sure you're in a git repo with a ${r} branch.`;
    return {
      ok: !1,
      error: `Could not find merge-base with ${r}. ${p}`
    };
  }
  let {
    stdout: c,
    code: u
  } = await Fn(go(), ["diff", "--shortstat", l], {
    preserveOutputOnError: !1,
    env: {
      ...process.env,
      LC_ALL: "C"
    }
  });
  if (u === 0 && !c.trim()) return W("tengu_review_remote_precondition_failed", {
    reason: Ve("empty_diff")
  }), {
    ok: !1,
    error: `It doesn't look like you have any new commits or changes to review against your ${r} branch. Stage or commit them first?`
  };
  /** Parsed `--shortstat` output: filesCount/linesAdded/linesRemoved. */
  let d = z$n(c);
  if (d) {
    let {
        maxFiles: p,
        maxLines: m
      } = Jdo(),
      /** Total lines changed in the local diff. */
      f = d.linesAdded + d.linesRemoved;
    if (d.filesCount > p || f > m) return W("tengu_review_remote_precondition_failed", {
      reason: Ve("local_diff_too_large"),
      files: d.filesCount,
      lines: f,
      max_files: p,
      max_lines: m
    }), {
      ok: !1,
      error: `Diff is too large for ultrareview: ${c.trim()}. Pass a closer base branch (\`${t} <branch>\`) to narrow the scope, or split the change.`
    };
  }
  return {
    ok: !0,
    scope: {
      mode: "branch",
      headBranch: o,
      baseBranch: r,
      mergeBaseSha: l,
      diffStat: c.trim()
    }
  };
}

/**
 * Query the server-side billing/overage preflight and translate it into a
 * local decision: `proceed`, `blocked`, or `needs-confirm` (skipped if the user
 * already confirmed usage-credit billing this session).
 */
async function oIo(): Promise<
  | { kind: "proceed"; billingNote: string }
  | { kind: "blocked"; reason: string; message: string; actionUrl: string | null }
  | { kind: "needs-confirm"; body: string; billingNote: string }
> {
  /** Server preflight response (null => no gating, proceed). */
  let e = await BHl();
  if (!e) return {
    kind: "proceed",
    billingNote: ""
  };
  /** Optional billing note text from the server. */
  let t = e.billing_note ?? "";
  switch (e.action) {
    case "proceed":
      return {
        kind: "proceed",
        billingNote: t
      };
    case "blocked":
      return {
        kind: "blocked",
        reason: e.blocked?.reason ?? "server",
        message: e.blocked?.message ?? "Ultrareview is unavailable for your organization.",
        actionUrl: e.blocked?.action_url ?? null
      };
    case "confirm":
      {
        if ($Hl) return {
          kind: "proceed",
          billingNote: t
        };
        return {
          kind: "needs-confirm",
          body: `This review bills as usage credits (${A6e()}).`,
          billingNote: t
        };
      }
  }
}

/**
 * Launch the cloud ultrareview session for a resolved scope: build the bughunter
 * environment variables, teleport the PR/bundle to a remote sandbox, register the
 * task, and return the launch result (or an error-block result on failure).
 *
 * @param e     resolved review scope (pr or branch)
 * @param t     agent context (provides abort signal)
 * @param n     billing note to prefix onto the launch message
 * @param r     options: invocation label, task-registration / apply-fixes flags
 */
async function sIo(
  e: { mode: "pr"; prNumber: string; repo: string } | {
    mode: "branch";
    headBranch: string;
    baseBranch: string;
    mergeBaseSha: string;
    diffStat: string;
  },
  t: { abortController: AbortController },
  n: string,
  r?: {
    invocation?: string;
    skipTaskRegistration?: boolean;
    applyFixesOnComplete?: boolean;
  }
) {
  /** Invocation label used in user-facing messages. */
  let o = r?.invocation ?? "/code-review ultra",
    /** Build a non-launched result carrying a single text block. */
    s = (R: string) => ({
      launched: !1,
      blocks: [{
        type: "text",
        text: R
      }]
    }),
    /** Remote-agent eligibility check (allowing bundle uploads). */
    i = await Zle({
      allowBundle: !0
    });
  if (!i.eligible) {
    /** Eligibility precondition errors. */
    let R = i.errors;
    if (R.length > 0) {
      W("tengu_review_remote_precondition_failed", {
        reason: Ve("remote_agent_ineligible"),
        precondition_errors: R.map(H => H.type).join(",")
      });
      /** Joined, human-readable eligibility error message. */
      let w = R.map(H => {
        if (H.type === "not_in_git_repo") return `${o} needs a git repository so it can clone your code into a cloud sandbox, but ${Lt()} is not inside one. Run "git init" here to create a repository, or cd into an existing one.`;
        if (H.type === "no_git_remote") return `${o} needs a GitHub remote so it can clone this repository into the cloud. If this project is not on GitHub yet, run "gh repo create --source=. --push" to create one; if a GitHub repo already exists, run "git remote add origin REPO_URL && git push -u origin HEAD".`;
        return dte(H);
      }).join(`
`);
      return s(`Ultrareview cannot launch:
${w}`);
    }
  }
  /** Fixed cloud environment id for ultrareview sandboxes. */
  let a = "env_011111111111111111111113",
    /** Server-provided review/bughunter config. */
    l = C6e(),
    /** Clamp a config value to a positive integer <= max, falling back to default. */
    c = (R: unknown, w: number, H: number) => {
      if (typeof R !== "number" || !Number.isFinite(R)) return w;
      /** Floored integer value. */
      let k = Math.floor(R);
      if (k <= 0) return w;
      return k > H ? w : k;
    },
    /** Optional bughunter model override. */
    u = S9a(),
    /** Base bughunter environment variables shared by both scope modes. */
    d = {
      BUGHUNTER_DRY_RUN: "1",
      BUGHUNTER_FLEET_SIZE: String(c(l?.fleet_size, 5, 20)),
      BUGHUNTER_MAX_DURATION: String(c(l?.max_duration_minutes, 10, 25)),
      BUGHUNTER_AGENT_TIMEOUT: String(c(l?.agent_timeout_seconds, 600, 1800)),
      BUGHUNTER_TOTAL_WALLCLOCK: String(c(l?.total_wallclock_minutes, 22, 27)),
      ...(u && {
        BUGHUNTER_MODEL: u
      }),
      ...(process.env.BUGHUNTER_DEV_BUNDLE_B64 && {
        BUGHUNTER_DEV_BUNDLE_B64: process.env.BUGHUNTER_DEV_BUNDLE_B64
      })
    },
    /** Created remote session. */
    p,
    /** Slash command echoed back for the launched task. */
    m,
    /** Human-readable launch target (repo#PR or head -> base). */
    f,
    /** Diff stat to surface in the launch message. */
    h = "",
    /** Session-create error message, if any. */
    g,
    /** Localized create-failure reason for telemetry. */
    _;
  if (e.mode === "pr") {
    /** Detected GitHub remote for the PR. */
    let R = await cM();
    if (!R) return W("tengu_review_remote_precondition_failed", {
      reason: Ve("no_github_remote_post_confirm")
    }), null;
    p = await Lq({
      initialMessage: null,
      source: "ultrareview",
      description: `ultrareview: ${R.owner}/${R.name}#${e.prNumber}`,
      signal: t.abortController.signal,
      branchName: `refs/pull/${e.prNumber}/head`,
      environmentId: a,
      tags: ["ultrareview"],
      environmentVariables: {
        BUGHUNTER_PR_NUMBER: e.prNumber,
        BUGHUNTER_REPOSITORY: `${R.owner}/${R.name}`,
        ...d
      },
      onCreateFail: (w, H) => {
        g = w, _ = Le(H);
      }
    }), m = `/ultrareview ${e.prNumber}`, f = `${R.owner}/${R.name}#${e.prNumber}`;
  } else {
    let {
      headBranch: R,
      baseBranch: w,
      mergeBaseSha: H,
      diffStat: k
    } = e;
    h = k;
    /** Bundle-upload error message and its localized reason. */
    let I, D;
    if (p = await Lq({
      initialMessage: null,
      source: "ultrareview",
      description: `ultrareview: ${R}`,
      signal: t.abortController.signal,
      useBundle: !0,
      bundleBaseRef: H,
      environmentId: a,
      tags: ["ultrareview"],
      environmentVariables: {
        BUGHUNTER_BASE_BRANCH: H,
        ...d
      },
      onBundleFail: (O, L) => {
        I = O, D = Le(L);
      },
      onCreateFail: (O, L) => {
        g = O, _ = Le(L);
      }
    }), !p) return W("tengu_review_remote_teleport_failed", {
      mode: Ve("branch"),
      reason: _,
      bundle_fail_kind: D
    }), s(I ?? (g ? `Ultrareview could not start the cloud session: ${g}` : `Repo is too large. Push a PR and use \`${o} <PR#>\` instead.`));
    m = "/ultrareview", f = R === w ? R : `${R} → ${w}`;
  }
  if (!p) {
    if (W("tengu_review_remote_teleport_failed", {
      mode: Ve("pr"),
      reason: _
    }), g) return s(`Ultrareview could not start the cloud session: ${g}`);
    return null;
  }
  /** Registered remote task id (when task registration isn't skipped). */
  let T;
  if (!r?.skipTaskRegistration) T = rye({
    remoteTaskType: "ultrareview",
    session: p,
    command: m,
    context: t,
    isRemoteReview: !0,
    applyFixesOnComplete: r?.applyFixesOnComplete
  }).taskId;
  W("tengu_review_remote_launched", {});
  /** URL where the cloud session can be tracked. */
  let y = ece(p.id),
    /** Billing-note prefix (trailing newline) prepended to the message. */
    S = n.trim() ? `${n.trim()}
` : "",
    /** Diff-stat scope suffix appended to the message. */
    E = h ? `
Scope: ${h}` : "";
  return {
    launched: !0,
    sessionId: p.id,
    sessionUrl: y,
    taskId: T,
    title: p.title,
    blocks: [{
      type: "text",
      text: `${S}Ultrareview launched for ${f} (${Rte()}, runs in the cloud). Track: ${y}${E}`
    }]
  };
}

/**
 * Top-level ultrareview entrypoint: gate on feature availability, resolve scope,
 * run the billing decision, surface confirm/blocked states, then launch the
 * cloud session. Returns a status discriminated union for the caller/UI.
 *
 * @param e raw scope argument
 * @param t options (context, invocation, confirm flag, task-registration flag)
 */
async function Ajn(
  e: string,
  t: {
    invocation?: string;
    confirm?: boolean;
    context: { abortController: AbortController };
    skipTaskRegistration?: boolean;
  }
) {
  if (!fG()) return {
    status: "error",
    message: "Ultrareview is currently unavailable."
  };
  /** Resolved review scope result. */
  let n = await rIo(e, t.invocation);
  if (!n.ok) return {
    status: "error",
    message: n.error
  };
  /** Billing/overage decision. */
  let r = await oIo();
  if (r.kind === "blocked") return W("tengu_review_overage_blocked", {
    reason: r.reason
  }), {
    status: "blocked",
    message: r.message,
    actionUrl: r.actionUrl
  };
  if (r.kind === "needs-confirm") {
    if (W("tengu_review_overage_dialog_shown", {}), !t.confirm) return {
      status: "needs-confirm",
      body: r.body,
      billingNote: r.billingNote
    };
    nIo();
  }
  if (!t.confirm) return {
    status: "needs-confirm",
    body: `${n.scope.mode === "pr" ? `Reviewing PR ${n.scope.repo}#${n.scope.prNumber}` : `Reviewing current branch against ${n.scope.baseBranch}
Scope: ${n.scope.diffStat}`}
${Rte()} \xB7 Est. cost ${A6e()} USD`,
    billingNote: r.billingNote
  };
  /** Cloud launch result. */
  let o = await sIo(n.scope, t.context, r.billingNote, {
    skipTaskRegistration: t.skipTaskRegistration,
    invocation: t.invocation
  });
  if (!o?.launched) return {
    status: "error",
    message: o?.blocks.map(s => s.type === "text" ? s.text : "").join("").trim() || "Failed to launch cloud review session."
  };
  return {
    status: "launched",
    sessionId: o.sessionId,
    sessionUrl: o.sessionUrl,
    taskId: o.taskId,
    title: o.title,
    message: o.blocks.map(s => s.type === "text" ? s.text : "").join("").trim(),
    billingNote: r.billingNote
  };
}

/** Session-scoped flag: user has confirmed usage-credit billing. */
var $Hl = !1;
var bGt = b(() => {
  kt();
  UHl();
  tIo();
  mY();
  bIe();
  Po();
  _0();
  Ii();
  ia();
  t3t();
  tn();
  Oco();
  qD();
  uxe();
});
export {nIo,qHl,rIo,oIo,sIo,Ajn,$Hl,bGt};

// @ts-nocheck
import {OGn as bc6,MCo as VMq} from "../../vendor/m4831.ts";
import {Ast as Wq_,Oke as qZH} from "../telemetry/3321_ignoreUntracked.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Pt as x_,Go as dq} from "../../vendor/m632.ts";
import {detectCurrentRepositoryWithHost as RI,ZI as Sh} from "../../vendor/m692.ts";
import {execFileNoThrow as g6,oa as t7} from "../../vendor/m684.ts";
import {qt as l_,Xt as a_} from "../config/0228_encoding.ts";
import {hio as bqq,G4e as smH,W4e as amH,kLa as phK,wte as eHH,jW as Ac,nIe as kGH} from "../config/3923_maxFiles.ts";
import {uDa as vGK,joo as z8q} from "../telemetry/3869_cwd.ts";
import {gitExe as yq,getDefaultBranch as pV,getBranch as Cj,Ba as uK} from "../../vendor/m693.ts";
import {n$n as Q7q,$$t as VI_} from "../config/4060_hunks.ts";
import {DSl as kj4,PSl as yj4} from "../config/4831_action.ts";
import {rce as E4H,hte as FHH,$ge as tYH,oce as S4H,OY as Jo} from "../tools/3871_allowBundle.ts";
import {teleportToRemote as gB,RP as Mk} from "../tui/3870_validateSessionRepository.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function _jq() {
  ultrareviewUserConfirmed = true;
}
function U$4(rawArgs) {
  let {
    flags: parsedFlags,
    rest: remainingArgs
  } = bc6(rawArgs, ["fix", "comment"]);
  return {
    scopeArgs: remainingArgs,
    applyFixes: parsedFlags.has("fix")
  };
}
async function qjq(scopeArg, invocation = "/code-review ultra") {
  if (!(await Wq_())) return c("tengu_review_remote_precondition_failed", {}), {
    ok: false,
    error: `${invocation} needs a git repository so it can clone your code into a cloud sandbox, but ${x_()} is not inside one. Run "git init" here to create a repository, or cd into an existing one.`
  };
  let trimmedArg = scopeArg.trim();
  if (/^\d+$/.test(trimmedArg)) {
    let remoteInfo = await RI();
    if (!remoteInfo) return c("tengu_review_remote_precondition_failed", {}), {
      ok: false,
      error: `${invocation} <PR#> needs a GitHub remote so it knows which repository the PR is in. If this project is not on GitHub yet, run "gh repo create --source=. --push" to create one; if a GitHub repo already exists, run "git remote add origin REPO_URL". Or run ${invocation} with no argument to review your current branch instead.`
    };
    if (remoteInfo.host.toLowerCase() === "github.com" && remoteInfo.owner.toLowerCase() === "anthropics" && remoteInfo.name.toLowerCase() === "anthropic") return c("tengu_review_remote_precondition_failed", {}), {
      ok: false,
      error: `${invocation} doesn't support the Anthropic monorepo \u2014 monorepo PRs are reviewed automatically by bughunter. Re-trigger it from the PR checks page, or run /bughunter here for a local hunt.`
    };
    let {
      stdout: J,
      code: D
    } = await g6("gh", ["pr", "view", trimmedArg, "--repo", `${remoteInfo.host}/${remoteInfo.owner}/${remoteInfo.name}`, "--json", "additions,deletions,changedFiles"], {
      timeout: 5000,
      preserveOutputOnError: false
    });
    if (D === 0 && J.trim()) try {
      let M = l_(J),
        {
          maxFiles: X,
          maxLines: P
        } = bqq(),
        Z = M.additions + M.deletions;
      if (M.changedFiles > X || Z > P) return c("tengu_review_remote_precondition_failed", {}), {
        ok: false,
        error: `PR #${trimmedArg} is too large for ultrareview (${M.changedFiles} files, ${Z.toLocaleString()} lines). Split it into smaller PRs, or run \`${invocation}\` on a narrower local diff.`
      };
    } catch {}
    return {
      ok: true,
      scope: {
        mode: "pr",
        prNumber: trimmedArg,
        repo: `${remoteInfo.owner}/${remoteInfo.name}`
      }
    };
  }
  if (await vGK()) return c("tengu_review_remote_precondition_failed", {}), {
    ok: false,
    error: `Repo is too large to bundle. Push a PR and use \`${invocation} <PR#>\` instead.`
  };
  if (trimmedArg) {
    let branchExists = async branchRef => (await g6(yq(), ["rev-parse", "--verify", "--quiet", branchRef], {
      preserveOutputOnError: false
    })).code === 0;
    if (!(await branchExists(`origin/${trimmedArg}`)) && !(await branchExists(trimmedArg))) return c("tengu_review_remote_precondition_failed", {}), {
      ok: false,
      error: `"${trimmedArg}" is not a branch in this repo. ${invocation} takes a PR number, a branch name, or no argument (reviews your current branch). Try ${invocation} by itself.`
    };
  }
  let baseBranch = trimmedArg || (await pV()) || "main",
    headBranch = (await Cj()) || "HEAD",
    getMergeBase = async ref => g6(yq(), ["merge-base", ref, "HEAD"], {
      preserveOutputOnError: false
    }),
    {
      stdout: mergeBaseStdout,
      code: mergeBaseCode
    } = await getMergeBase(`origin/${baseBranch}`);
  if (mergeBaseCode !== 0) ({
    stdout: mergeBaseStdout,
    code: mergeBaseCode
  } = await getMergeBase(baseBranch));
  let mergeBaseSha = mergeBaseStdout.trim();
  if (mergeBaseCode !== 0 || !mergeBaseSha) {
    c("tengu_review_remote_precondition_failed", {});
    let hint = trimmedArg ? `Make sure ${baseBranch} exists locally or on origin (try \`git fetch origin ${baseBranch}\`).` : `Pass the base branch explicitly (e.g. \`${invocation} develop\`) or make sure you're in a git repo with a ${baseBranch} branch.`;
    return {
      ok: false,
      error: `Could not find merge-base with ${baseBranch}. ${hint}`
    };
  }
  let {
    stdout: diffStatStdout,
    code: diffStatCode
  } = await g6(yq(), ["diff", "--shortstat", mergeBaseSha], {
    preserveOutputOnError: false,
    env: {
      ...process.env,
      LC_ALL: "C"
    }
  });
  if (diffStatCode === 0 && !diffStatStdout.trim()) return c("tengu_review_remote_precondition_failed", {}), {
    ok: false,
    error: `It doesn't look like you have any new commits or changes to review against your ${baseBranch} branch. Stage or commit them first?`
  };
  let parsedDiffStat = Q7q(diffStatStdout);
  if (parsedDiffStat) {
    let {
        maxFiles: maxFilesLimit,
        maxLines: maxLinesLimit
      } = bqq(),
      totalLinesChanged = parsedDiffStat.linesAdded + parsedDiffStat.linesRemoved;
    if (parsedDiffStat.filesCount > maxFilesLimit || totalLinesChanged > maxLinesLimit) return c("tengu_review_remote_precondition_failed", {}), {
      ok: false,
      error: `Diff is too large for ultrareview: ${diffStatStdout.trim()}. Pass a closer base branch (\`${invocation} <branch>\`) to narrow the scope, or split the change.`
    };
  }
  return {
    ok: true,
    scope: {
      mode: "branch",
      headBranch: headBranch,
      baseBranch: baseBranch,
      mergeBaseSha: mergeBaseSha,
      diffStat: diffStatStdout.trim()
    }
  };
}
async function Kjq() {
  let preflightResponse = await kj4();
  if (!preflightResponse) return {
    kind: "proceed",
    billingNote: ""
  };
  let billingNote = preflightResponse.billing_note ?? "";
  switch (preflightResponse.action) {
    case "proceed":
      return {
        kind: "proceed",
        billingNote: billingNote
      };
    case "blocked":
      return {
        kind: "blocked",
        reason: preflightResponse.blocked?.reason ?? "server",
        message: preflightResponse.blocked?.message ?? "Ultrareview is unavailable for your organization.",
        actionUrl: preflightResponse.blocked?.action_url ?? null
      };
    case "confirm":
      {
        if (ultrareviewUserConfirmed) return {
          kind: "proceed",
          billingNote: billingNote
        };
        return {
          kind: "needs-confirm",
          body: `This review bills as usage credits (${smH()}).`,
          billingNote: billingNote
        };
      }
  }
}
async function Ojq(scope, agentContext, billingNote, opts) {
  let invocationCommand = opts?.invocation ?? "/code-review ultra",
    makeErrorResult = msg => ({
      launched: false,
      blocks: [{
        type: "text",
        text: msg
      }]
    }),
    eligibility = await E4H({
      allowBundle: true
    });
  if (!eligibility.eligible) {
    let errors = eligibility.errors;
    if (errors.length > 0) {
      c("tengu_review_remote_precondition_failed", {
        precondition_errors: errors.map(e => e.type).join(",")
      });
      let errorMessage = errors.map(e => {
        if (e.type === "not_in_git_repo") return `${invocationCommand} needs a git repository so it can clone your code into a cloud sandbox, but ${x_()} is not inside one. Run "git init" here to create a repository, or cd into an existing one.`;
        if (e.type === "no_git_remote") return `${invocationCommand} needs a GitHub remote so it can clone this repository into the cloud. If this project is not on GitHub yet, run "gh repo create --source=. --push" to create one; if a GitHub repo already exists, run "git remote add origin REPO_URL && git push -u origin HEAD".`;
        return FHH(e);
      }).join(`
`);
      return makeErrorResult(`Ultrareview cannot launch:
${errorMessage}`);
    }
  }
  let environmentId = "env_011111111111111111111113",
    reviewConfig = amH(),
    clampInt = (value, defaultVal, max) => {
      if (typeof value !== "number" || !Number.isFinite(value)) return defaultVal;
      let floored = Math.floor(value);
      if (floored <= 0) return defaultVal;
      return floored > max ? defaultVal : floored;
    },
    bughunterModel = phK(),
    environmentVariablesBase = {
      BUGHUNTER_DRY_RUN: "1",
      BUGHUNTER_FLEET_SIZE: String(clampInt(reviewConfig?.fleet_size, 5, 20)),
      BUGHUNTER_MAX_DURATION: String(clampInt(reviewConfig?.max_duration_minutes, 10, 25)),
      BUGHUNTER_AGENT_TIMEOUT: String(clampInt(reviewConfig?.agent_timeout_seconds, 600, 1800)),
      BUGHUNTER_TOTAL_WALLCLOCK: String(clampInt(reviewConfig?.total_wallclock_minutes, 22, 27)),
      ...(bughunterModel && {
        BUGHUNTER_MODEL: bughunterModel
      }),
      ...(process.env.BUGHUNTER_DEV_BUNDLE_B64 && {
        BUGHUNTER_DEV_BUNDLE_B64: process.env.BUGHUNTER_DEV_BUNDLE_B64
      })
    },
    session,
    slashCommand,
    displayTarget,
    diffStatDisplay = "",
    createErrorMessage;
  if (scope.mode === "pr") {
    let remoteInfo = await RI();
    if (!remoteInfo) return c("tengu_review_remote_precondition_failed", {}), null;
    session = await gB({
      initialMessage: null,
      source: "ultrareview",
      description: `ultrareview: ${remoteInfo.owner}/${remoteInfo.name}#${scope.prNumber}`,
      signal: agentContext.abortController.signal,
      branchName: `refs/pull/${scope.prNumber}/head`,
      environmentId: environmentId,
      tags: ["ultrareview"],
      environmentVariables: {
        BUGHUNTER_PR_NUMBER: scope.prNumber,
        BUGHUNTER_REPOSITORY: `${remoteInfo.owner}/${remoteInfo.name}`,
        ...environmentVariablesBase
      },
      onCreateFail: err => {
        createErrorMessage = err;
      }
    }), slashCommand = `/ultrareview ${scope.prNumber}`, displayTarget = `${remoteInfo.owner}/${remoteInfo.name}#${scope.prNumber}`;
  } else {
    let {
      headBranch: headRef,
      baseBranch: baseRef,
      mergeBaseSha: mergeBase,
      diffStat: diffStat
    } = scope;
    diffStatDisplay = diffStat;
    let bundleError;
    if (session = await gB({
      initialMessage: null,
      source: "ultrareview",
      description: `ultrareview: ${headRef}`,
      signal: agentContext.abortController.signal,
      useBundle: true,
      bundleBaseRef: mergeBase,
      environmentId: environmentId,
      tags: ["ultrareview"],
      environmentVariables: {
        BUGHUNTER_BASE_BRANCH: mergeBase,
        ...environmentVariablesBase
      },
      onBundleFail: err => {
        bundleError = err;
      },
      onCreateFail: err => {
        createErrorMessage = err;
      }
    }), !session) return c("tengu_review_remote_teleport_failed", {}), makeErrorResult(bundleError ?? (createErrorMessage ? `Ultrareview could not start the cloud session: ${createErrorMessage}` : `Repo is too large. Push a PR and use \`${invocationCommand} <PR#>\` instead.`));
    slashCommand = "/ultrareview", displayTarget = headRef === baseRef ? headRef : `${headRef} \u2192 ${baseRef}`;
  }
  if (!session) {
    if (c("tengu_review_remote_teleport_failed", {}), createErrorMessage) return makeErrorResult(`Ultrareview could not start the cloud session: ${createErrorMessage}`);
    return null;
  }
  let taskId;
  if (!opts?.skipTaskRegistration) taskId = tYH({
    remoteTaskType: "ultrareview",
    session: session,
    command: slashCommand,
    context: agentContext,
    isRemoteReview: true,
    applyFixesOnComplete: opts?.applyFixesOnComplete
  }).taskId;
  c("tengu_review_remote_launched", {});
  let sessionUrl = S4H(session.id),
    billingNotePrefix = billingNote.trim() ? `${billingNote.trim()}
` : "",
    diffStatSuffix = diffStatDisplay ? `
Scope: ${diffStatDisplay}` : "";
  return {
    launched: true,
    sessionId: session.id,
    sessionUrl: sessionUrl,
    taskId: taskId,
    title: session.title,
    blocks: [{
      type: "text",
      text: `${billingNotePrefix}Ultrareview launched for ${displayTarget} (${eHH()}, runs in the cloud). Track: ${sessionUrl}${diffStatSuffix}`
    }]
  };
}
async function tF6(scopeArg, options) {
  if (!Ac()) return {
    status: "error",
    message: "Ultrareview is currently unavailable."
  };
  let scopeResult = await qjq(scopeArg, options.invocation);
  if (!scopeResult.ok) return {
    status: "error",
    message: scopeResult.error
  };
  let billingDecision = await Kjq();
  if (billingDecision.kind === "blocked") return c("tengu_review_overage_blocked", {
    reason: billingDecision.reason
  }), {
    status: "blocked",
    message: billingDecision.message,
    actionUrl: billingDecision.actionUrl
  };
  if (billingDecision.kind === "needs-confirm") {
    if (c("tengu_review_overage_dialog_shown", {}), !options.confirm) return {
      status: "needs-confirm",
      body: billingDecision.body,
      billingNote: billingDecision.billingNote
    };
    _jq();
  }
  if (!options.confirm) return {
    status: "needs-confirm",
    body: `${scopeResult.scope.mode === "pr" ? `Reviewing PR ${scopeResult.scope.repo}#${scopeResult.scope.prNumber}` : `Reviewing current branch against ${scopeResult.scope.baseBranch}
Scope: ${scopeResult.scope.diffStat}`}
${eHH()} \xB7 Est. cost ${smH()} USD`,
    billingNote: billingDecision.billingNote
  };
  let launchResult = await Ojq(scopeResult.scope, options.context, billingDecision.billingNote, {
    skipTaskRegistration: options.skipTaskRegistration,
    invocation: options.invocation
  });
  if (!launchResult?.launched) return {
    status: "error",
    message: launchResult?.blocks.map(block => block.type === "text" ? block.text : "").join("").trim() || "Failed to launch cloud review session."
  };
  return {
    status: "launched",
    sessionId: launchResult.sessionId,
    sessionUrl: launchResult.sessionUrl,
    taskId: launchResult.taskId,
    title: launchResult.title,
    message: launchResult.blocks.map(block => block.type === "text" ? block.text : "").join("").trim(),
    billingNote: billingDecision.billingNote
  };
}
var ultrareviewUserConfirmed = false;
var wB_ = L(() => {
  v_();
  yj4();
  VMq();
  Jo();
  qZH();
  dq();
  Sh();
  t7();
  uK();
  VI_();
  a_();
  z8q();
  Mk();
  kGH();
});

export {_jq as NCo,U$4 as LSl,qjq as BCo,Kjq as FCo,Ojq as UCo,tF6 as LGn,ultrareviewUserConfirmed as OSl,wB_ as Qjt};

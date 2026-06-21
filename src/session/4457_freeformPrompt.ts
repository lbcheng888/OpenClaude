// @ts-nocheck
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {rce as Vle,hte as ste,$ge as Cge,OY as TY} from "../tools/3871_allowBundle.ts";
import {getBranch as VT,getDefaultBranch as FM,hasUnpushedCommits as Yen,findGitRoot as Ou,Ba} from "../../vendor/m693.ts";
import {execFileNoThrowWithCwd as Vr,oa} from "../../vendor/m684.ts";
import {qt as Wt,Xt} from "../config/0228_encoding.ts";
import {getIsNonInteractiveSession as kr,yH as AH,setScheduledTasksEnabled as uX,lt as ct} from "./0131_sent.ts";
import {et as Ze,Ai as pi} from "../../vendor/m2208.ts";
import {bT as AT} from "../core/2797_toInfraSessionId.ts";
import {teleportToRemote as a6,S6 as l6,subscribeRemoteSessionToPR as zro,RP as wP} from "../tui/3870_validateSessionRepository.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {ES as AS,EU as mU} from "../../vendor/m4256.ts";
import {CRON_DELETE_TOOL_NAME as D$,z5 as I5} from "../config/2700_isKairosCronEnabled.ts";
import {fae as nae,Ptt as Att,G5 as R5} from "../../vendor/m2684.ts";
import {b} from "../../runtime.ts";
import {Qn as nr} from "./5194_shouldSkipPluginAutoupdate.ts";
// @ts-nocheck
async function snl(freeformPromptOrStop, sessionState, opts) {
  let stopFlag, params;
  return params = freeformPromptOrStop === "stop" || freeformPromptOrStop === "off", stopFlag = {
    freeformPrompt: freeformPromptOrStop
  }, N3p(stopFlag, sessionState, opts);
}
async function N3p(autofixParams, sessionState, {
  signal: abortSignal,
  onProgress: progressCallback
}) {
  j("tengu_autofix_pr_started", {
    action: "start",
    has_pr_number: String(autofixParams.prNumber !== undefined),
    has_repo_path: String(autofixParams.repoPath !== undefined),
    has_repo_ref: String(autofixParams.repoRef !== undefined)
  });
  let {
      prNumber: prNumber,
      target: target,
      freeformPrompt: freeformPrompt,
      repoPath: repoPath,
      repoRef: repoRef
    } = autofixParams,
    skillList = autofixParams.skills ?? [];
  try {
    let cwdPath = repoPath ?? Pt(),
      [currentBranch, defaultBranch, eligibility, hasUnpushed] = repoRef ? [undefined, undefined, await Vle({
        cwd: cwdPath
      }), false] : await Promise.all([VT(cwdPath), FM(cwdPath), Vle({
        cwd: cwdPath
      }), Yen(cwdPath)]);
    if (prNumber === undefined && !repoRef && currentBranch === defaultBranch) return qce(`cannot run on the default branch (${defaultBranch}). This checks the branch of ${cwdPath} \u2014 check out a feature branch there first (or run Claude Code from your worktree).`, "on_default_branch");
    if (!eligibility.eligible) {
      let errMsg = eligibility.errors.map(ste).join(`
`);
      return qce(`can't start autofix \u2014
${errMsg}`, "not_eligible");
    }
    let sessionMode;
    if (repoRef) sessionMode = "remote_session";else {
      let isSameRoot = !repoPath || Ou(repoPath) === Ou(Pt());
      sessionMode = "remote_session";
    }
    let ghArgs = ["pr", "view"];
    if (prNumber !== undefined) ghArgs.push(String(prNumber));
    if (repoRef) ghArgs.push("-R", rnl(repoRef));
    ghArgs.push("--json", "number,state,url,headRefName");
    let {
      stdout: ghStdout,
      code: exitCode,
      error: ghError
    } = await Vr("gh", ghArgs, {
      timeout: 1e4,
      preserveOutputOnError: true,
      abortSignal: abortSignal,
      cwd: cwdPath
    });
    if (abortSignal.aborted) return z6n();
    if (exitCode !== 0 || !ghStdout.trim()) {
      if (ghError?.includes("ENOENT")) return qce("gh CLI is required but not found.", "gh_not_found");
      if (ghError) return qce(`gh pr view failed: ${ghError}`, "gh_failed");
      return qce(prNumber !== undefined ? `couldn't find PR #${prNumber}${repoRef ? ` in ${rnl(repoRef)}` : " in this repo"}.` : `no open PR found for branch "${currentBranch}"${repoPath ? ` in ${repoPath}` : ""}. Create a PR first, then retry.`, "no_open_pr");
    }
    let prNumber2, ownerName, repoName, prUrl, headRef;
    try {
      let parsedPr = Wt(ghStdout);
      if (parsedPr.state === "MERGED" || parsedPr.state === "CLOSED") return qce(`PR #${parsedPr.number} is ${parsedPr.state.toLowerCase()}. Autofix requires an open PR.`, "pr_not_open");
      let urlMatch = parsedPr.url.match(/\/([^/]+)\/([^/]+)\/pull\//);
      if (!urlMatch || !urlMatch[1] || !urlMatch[2]) return qce(`unexpected PR URL format: ${parsedPr.url}`, "bad_pr_url");
      prNumber2 = parsedPr.number, ownerName = urlMatch[1], repoName = urlMatch[2], prUrl = parsedPr.url, headRef = prNumber === undefined && currentBranch ? currentBranch : parsedPr.headRefName;
    } catch {
      return qce(`no open PR found for branch "${currentBranch}"${repoPath ? ` in ${repoPath}` : ""}. Create a PR first, then retry.`, "no_open_pr");
    }
    let repoFullName = `${ownerName}/${repoName}`,
      prRef = `${repoFullName}#${prNumber2}`;
    progressCallback?.({
      step: "checking",
      prInfo: {
        ref: prRef,
        url: prUrl
      }
    });
    let skillsHint = skillList.length > 0 ? ` Run ${skillList.join(" and ")} for custom instructions on how to autofix.` : "";
    if (sessionMode === "current_session") {
      let currentSessionResult = await B3p(prRef, repoFullName, prNumber2, skillsHint),
        warnings = [];
      if (hasUnpushed) warnings.push("WARNING: You have unpushed local commits, run git push so the PR reflects them");
      if (kr()) warnings.push("Note: this is a non-interactive session \u2014 the poll cron only fires while this process stays alive. For one-shot `-p` runs, use `remote` instead.");
      return j("tengu_autofix_pr_result", {
        result: "success_current_session"
      }), warnings.length > 0 && currentSessionResult.kind === "ok" ? {
        ...currentSessionResult,
        message: `${currentSessionResult.message}

${warnings.join(`
`)}`
      } : currentSessionResult;
    }
    let initialMessage = freeformPrompt || `You're monitoring PR #${prNumber2} in ${repoFullName}. When CI failures or review comments arrive as notifications, investigate and push fixes directly to the PR branch.${skillsHint} Start by checking the current PR status.`,
      existingTask = Object.values(sessionState.taskRegistry.all()).find(task => task.type === "remote_agent" && task.remoteTaskType === "autofix-pr" && task.status === "running" && task.remoteTaskMetadata?.owner === ownerName && task.remoteTaskMetadata?.repo === repoName && task.remoteTaskMetadata?.prNumber === prNumber2);
    if (existingTask?.type === "remote_agent") return j("tengu_autofix_pr_result", {
      result: "success"
    }), {
      kind: "ok",
      message: `Already monitoring ${prRef} in a cloud session
  ${Ze.arrowRight} ${AT(existingTask.sessionId, undefined, {
        from: "cli"
      })}`
    };
    progressCallback?.({
      step: "spawning"
    });
    let bundleFailReason,
      remoteSession = await a6({
        initialMessage: initialMessage,
        source: "autofix_pr",
        branchName: headRef,
        reuseOutcomeBranch: headRef,
        title: `Autofix PR: ${ownerName}/${repoName}#${prNumber2} (${headRef})`,
        useDefaultEnvironment: true,
        signal: abortSignal,
        githubPr: {
          owner: ownerName,
          repo: repoName,
          number: prNumber2
        },
        cwd: cwdPath,
        sourceUrl: repoRef ? `https://${repoRef.host}/${repoRef.owner}/${repoRef.repo}` : undefined,
        onBundleFail: reason => {
          bundleFailReason = reason;
        }
      });
    if (abortSignal.aborted) {
      if (remoteSession) l6(remoteSession.id);
      return z6n();
    }
    if (!remoteSession) return qce(bundleFailReason ?? "cloud session creation failed.", "session_create_failed");
    progressCallback?.({
      step: "subscribing"
    });
    let subscribed = await zro(remoteSession.id, `${ownerName}/${repoName}`, prNumber2);
    if (abortSignal.aborted) return l6(remoteSession.id), z6n();
    Cge({
      remoteTaskType: "autofix-pr",
      session: {
        id: remoteSession.id,
        title: remoteSession.title
      },
      command: initialMessage,
      isLongRunning: true,
      remoteTaskMetadata: {
        owner: ownerName,
        repo: repoName,
        prNumber: prNumber2
      },
      context: {
        abortController: new AbortController(),
        taskRegistry: sessionState.taskRegistry
      }
    });
    let sessionUrl = AT(remoteSession.id, undefined, {
        from: "cli"
      }),
      extraWarnings = [];
    if (!subscribed) extraWarnings.push("WARNING: Failed to turn on autofix for this PR");
    if (!repoRef) {
      if (hasUnpushed) extraWarnings.push("WARNING: You have unpushed local commits, run git push so the cloud session sees them");
    }
    let warningSuffix = extraWarnings.length > 0 ? `

` + extraWarnings.join(`
`) : "";
    return j("tengu_autofix_pr_result", {
      result: "success"
    }), {
      kind: "ok",
      message: `Spawned cloud autofix PR session on ${headRef} (PR #${prNumber2})
  ${Ze.arrowRight} ${sessionUrl}${warningSuffix}`
    };
  } catch (err) {
    if (abortSignal.aborted) return z6n();
    return qce(Se(err), "exception");
  }
}
function qce(message, errorCode) {
  return j("tengu_autofix_pr_result", {
    result: "failed",
    error_code: errorCode
  }), {
    kind: "error",
    message: `Autofix PR failed: ${message}`,
    code: errorCode
  };
}
function z6n() {
  return j("tengu_autofix_pr_result", {
    result: "cancelled"
  }), {
    kind: "cancelled"
  };
}
async function B3p(prRef, repoFullName, prNum, skillsHint) {
  let bridgeClient = AS(),
    hasBridgeClient = AH() && !!bridgeClient,
    webhookSubscribed = hasBridgeClient && bridgeClient ? await bridgeClient.subscribePR(repoFullName, prNum) : false,
    cronPrompt = `${nnl}${prRef} (created in this session). Check state with \`gh pr view ${prNum} -R ${repoFullName} --json state,mergeable,mergeStateStatus,statusCheckRollup\` and new review comments with \`gh api --paginate repos/${repoFullName}/pulls/${prNum}/comments\`. If MERGED or CLOSED, delete this cron with ${D$} and report the outcome. If CI is failing, comments are unaddressed, or there are merge conflicts, fix and push.${skillsHint} Otherwise nothing to do \u2014 complete the turn without commentary.`,
    hasCronAlready = (await nae()).some(cronEntry => cronEntry.durable === false && cronEntry.prompt.startsWith(`${nnl}${prRef} `));
  if (!hasCronAlready) await Att("*/30 * * * *", cronPrompt, true, false), uX(true);
  let resultMessages = [`Monitoring ${prRef} in this session.`];
  if (webhookSubscribed) resultMessages.push("Webhook events (CI failures, reviews, close/reopen) will arrive as user messages.");else if (hasBridgeClient) resultMessages.push("Couldn't subscribe this session to PR webhooks \u2014 falling back to a 30-minute poll. Check the debug log for [bridge] subscribe-pr.");else resultMessages.push("Remote Control isn't connected, so webhooks can't be routed here \u2014 falling back to a 30-minute poll. Connect from the mobile or web app for real-time notifications.");
  return resultMessages.push(hasCronAlready ? "A poll cron for this PR is already registered." : "Registered a 30-minute poll cron as a backstop for merge conflicts (and CI/reviews when webhooks are unavailable)."), {
    kind: "ok",
    display: "system",
    message: resultMessages.join(" ")
  };
}
function rnl({
  owner: owner,
  repo: repo,
  host: host
}) {
  return host === "github.com" ? `${owner}/${repo}` : `${host}/${owner}/${repo}`;
}
var onl,
  nnl = "Babysit PR ";
var inl = b(() => {
  pi();
  ct();
  mU();
  Ct();
  TY();
  I5();
  nr();
  R5();
  Ko();
  St();
  oa();
  Ba();
  Xt();
  wP();
  onl = {
    checking: "Detecting open PR for current branch\u2026",
    spawning: "Spawning cloud autofix session\u2026",
    subscribing: "Turning on autofix\u2026"
  };
});

export {snl as Drl,N3p as h6p,qce as rue,z6n as Njn,B3p as g6p,rnl as Hrl,onl as Irl,nnl as krl,inl as Prl};

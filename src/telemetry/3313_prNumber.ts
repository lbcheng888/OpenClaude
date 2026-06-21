// @ts-nocheck
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Qe as O_} from "../../vendor/m5.ts";
import {getCommitCounter as Fs6,setSessionPrResolved as pt6,getPrCounter as XkH,lt as w_,jde as ifH} from "../session/0131_sent.ts";
import {S9e as vIH,ost as _8_} from "./3312_stdout.ts";
import {ja as iK,b9e as EIH} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {execFileNoThrow as B6,oa as l7} from "../../vendor/m684.ts";
import {qt as d_,Xt as H6} from "../config/0228_encoding.ts";
import {b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
// Telemetry module: Git operation tracking and PR number extraction.
// Monitors shell commands for git/gh operations (commit, push, merge, rebase, PR CRUD)
// and emits tengu_git_operation telemetry events; links sessions to PRs when detected.

/**
 * Build a regex that matches a `git <subcommand>` invocation, optionally with
 * inline `-c`/`-C`/`--foo=bar` git options before the subcommand.
 * @param subcommand - The git subcommand name (e.g. "commit", "push").
 * @param suffix     - Optional regex fragment appended after the word boundary.
 */
function buildGitCommandRegex(subcommand: string, suffix: string = ""): RegExp {
  return new RegExp(`\\bgit(?:\\s+-[cC]\\s+\\S+|\\s+--\\S+=\\S+)*\\s+${subcommand}\\b${suffix}`);
}

/**
 * Parse a single GitHub/GitLab PR URL from a string and return its metadata.
 * Returns null if no PR URL is found.
 */
function parsePrUrlInfo(text: string): { prNumber: number; prUrl: string; prRepository: string } | null {
  let match = text.match(prUrlRegex);
  if (match?.[1] && match?.[2]) return {
    prNumber: parseInt(match[2], 10),
    prUrl: match[0],
    prRepository: match[1]
  };
  return null;
}

/**
 * Find the *last* PR URL in `text` and return its parsed metadata.
 * Returns null if none found.
 */
function parseLastPrUrl(text: string): { prNumber: number; prUrl: string; prRepository: string } | null {
  let allMatches = text.match(new RegExp(prUrlRegex.source, "g"));
  return allMatches ? parsePrUrlInfo(allMatches.at(-1)!) : null;
}

/**
 * Extract the short commit SHA from a `git commit` output line such as
 * `[main (root-commit) abc1234] message`.
 */
function extractCommitSha(gitOutput: string): string | undefined {
  return gitOutput.match(/\[[\w./-]+(?: \(root-commit\))? ([0-9a-f]+)\]/)?.[1];
}

/**
 * Extract the remote tracking branch name from `git push` output.
 * Matches lines like `  * [new branch]   feature -> origin/feature`.
 */
function extractPushedBranch(gitOutput: string): string | undefined {
  return gitOutput.match(/^\s*[+\-*!= ]?\s*(?:\[new branch\]|\S+\.\.+\S+)\s+\S+\s*->\s*(\S+)/m)?.[1];
}

/**
 * Extract a PR number from a `gh pr create` / merge output line such as
 * "Pull request #42 created" or "Merged pull request #12".
 */
function extractPrNumberFromOutput(ghOutput: string): number | undefined {
  let match = ghOutput.match(/[Pp]ull request (?:\S+#)?#?(\d+)/);
  return match?.[1] ? parseInt(match[1], 10) : void 0;
}

/**
 * Extract the first non-flag, non-redirect token that follows a git subcommand.
 * Used to find branch/ref arguments to `git merge` or `git rebase`.
 */
function extractGitSubcommandArg(commandLine: string, subcommand: string): string | undefined {
  let afterSubcmd = commandLine.split(buildGitCommandRegex(subcommand))[1];
  if (!afterSubcmd) return;
  for (let token of afterSubcmd.trim().split(/\s+/)) {
    if (/^(?:[\d*]*[<>]|[&|;])/.test(token)) break;
    if (token.startsWith("-")) continue;
    return token;
  }
  return;
}

/**
 * Parse a shell command + its stdout into a structured git-operation event payload.
 * Returns an object with optional `commit`, `push`, `branch`, and `pr` fields.
 */
function parseGitOperationPayload(
  commandLine: string,
  stdoutOutput: string
): {
  commit?: { sha: string; kind: "committed" | "amended" | "cherry-picked" };
  push?: { branch: string };
  branch?: { ref: string; action: "merged" | "rebased" };
  pr?: { number: number; url?: string; action: string };
} {
  let result: {
    commit?: { sha: string; kind: "committed" | "amended" | "cherry-picked" };
    push?: { branch: string };
    branch?: { ref: string; action: "merged" | "rebased" };
    pr?: { number: number; url?: string; action: string };
  } = {};
  let isCherryPick = cherryPickRegex.test(commandLine);
  if (commitRegex.test(commandLine) || isCherryPick) {
    let sha = extractCommitSha(stdoutOutput);
    if (sha) result.commit = {
      sha,
      kind: isCherryPick ? "cherry-picked" : /--amend\b/.test(commandLine) ? "amended" : "committed"
    };
  }
  if (pushRegex.test(commandLine)) {
    let pushArgs = (commandLine.split(pushRegex)[1] ?? "").split(/[&|;\n]/)[0] ?? "";
    if (!/(?:^|\s)(?:-n|--dry-run)(?=\s|$)/.test(pushArgs)) {
      let pushedBranch = extractPushedBranch(stdoutOutput);
      if (pushedBranch) result.push = {
        branch: pushedBranch
      };
    }
  }
  if (mergeRegex.test(commandLine) && /(Fast-forward|Merge made by)/.test(stdoutOutput)) {
    let mergeRef = extractGitSubcommandArg(commandLine, "merge");
    if (mergeRef) result.branch = {
      ref: mergeRef,
      action: "merged"
    };
  }
  if (rebaseRegex.test(commandLine) && /Successfully rebased/.test(stdoutOutput)) {
    let rebaseRef = extractGitSubcommandArg(commandLine, "rebase");
    if (rebaseRef) result.branch = {
      ref: rebaseRef,
      action: "rebased"
    };
  }
  let prActionEntry = ghPrActionTable.find(entry => entry.re.test(commandLine))?.action;
  if (prActionEntry === "merged") {
    if (/--disable-auto\b/.test(commandLine)) prActionEntry = "auto-merge-disabled";
    else if (/--auto\b/.test(commandLine)) prActionEntry = "auto-merge-enabled";
  } else if (prActionEntry === "ready" && /--undo\b/.test(commandLine)) prActionEntry = "draft";
  if (prActionEntry) {
    let prInfo = parseLastPrUrl(stdoutOutput);
    if (prInfo) result.pr = {
      number: prInfo.prNumber,
      url: prInfo.prUrl,
      action: prActionEntry
    };
    else {
      let prNum = extractPrNumberFromOutput(stdoutOutput);
      if (prNum) result.pr = {
        number: prNum,
        action: prActionEntry
      };
    }
  }
  return result;
}

/**
 * Observe a completed shell command (exitCode === 0) and emit telemetry
 * events for git operations detected in the command line.
 * Also links sessions to PRs when a PR is created or detected.
 *
 * Cross-module references kept as-is to preserve linkage:
 *   c, O_, Fs6, vIH, XkH, pt6, B6, d_, iK, EIH, w_, ifH
 *
 * @param commandLine  - The shell command that was executed.
 * @param exitCode     - The process exit code; only processes when 0.
 * @param stdoutOutput - Captured stdout from the command (may be undefined).
 */
function observeCompletedCommand(
  commandLine: string,
  exitCode: number,
  stdoutOutput: string | undefined
): void {
  if (exitCode !== 0) return;
  if (commitRegex.test(commandLine)) {
    if (c("tengu_git_operation", {
      operation: O_("commit")
    }), commandLine.match(/--amend\b/)) c("tengu_git_operation", {
      operation: O_("commit_amend")
    });
    Fs6()?.add(1);
  }
  if (pushRegex.test(commandLine)) c("tengu_git_operation", {
    operation: O_("push")
  }), vIH.emit();
  let prActionEntry = ghPrActionTable.find(entry => entry.re.test(commandLine));
  if (prActionEntry) c("tengu_git_operation", {
    operation: prActionEntry.op
  }), vIH.emit();
  if (prActionEntry?.action === "merged" && !/(?:--auto|--disable-auto)\b/.test(commandLine) || prActionEntry?.action === "closed") pt6(!0);
  if (prActionEntry?.action === "created") {
    if (XkH()?.add(1), stdoutOutput) {
      let prInfo = parseLastPrUrl(stdoutOutput);
      if (prInfo) linkSessionToPrInfo(prInfo);
    }
  }
  let checkoutMatch = commandLine.match(prCheckoutRegex);
  if (checkoutMatch?.[1]) fetchAndLinkPr(checkoutMatch[1]).catch(() => {});
  else if (pushRegex.test(commandLine) && !prActionEntry) fetchAndLinkPr().catch(() => {});
  if (commandLine.match(/\bglab\s+mr\s+create\b/)) {
    if (c("tengu_git_operation", {
      operation: O_("pr_create")
    }), XkH()?.add(1), vIH.emit(), stdoutOutput) {
      let prInfo = parseLastPrUrl(stdoutOutput);
      if (prInfo) linkSessionToPrInfo(prInfo);
    }
  }
  let isCurlPost = commandLine.match(/\bcurl\b/) && (commandLine.match(/-X\s*POST\b/i) || commandLine.match(/--request\s*=?\s*POST\b/i) || commandLine.match(/\s-d\s/));
  let isPrApiUrl = commandLine.match(/https?:\/\/[^\s'"]*\/(pulls|pull-requests|merge[-_]requests)(?!\/\d)/i);
  if (isCurlPost && isPrApiUrl) {
    if (c("tengu_git_operation", {
      operation: O_("pr_create")
    }), XkH()?.add(1), vIH.emit(), stdoutOutput) {
      let prInfo = parseLastPrUrl(stdoutOutput);
      if (prInfo) linkSessionToPrInfo(prInfo);
    }
  }
}

/** Dynamically import session/PR linking modules and call linkSessionToPR. */
async function linkSessionToPrInfo(
  prInfo: { prNumber: number; prUrl: string; prRepository: string }
): Promise<void> {
  let [{
      linkSessionToPR: linkFn
    }, {
      getSessionId: getSessionIdFn
    }] = await Promise.all([Promise.resolve().then(() => (iK(), EIH)), Promise.resolve().then(() => (w_(), ifH))]),
    sessionId = getSessionIdFn();
  if (!sessionId) return;
  await linkFn(sessionId, prInfo.prNumber, prInfo.prUrl, prInfo.prRepository);
}

/**
 * Detect GitHub API rate-limit output and return a system-reminder string,
 * throttled to at most once every `rateLimitReminderCooldownMs` milliseconds.
 * Returns undefined if the command/output don't indicate a rate-limit.
 */
function maybeRateLimitReminder(commandLine: string, stdoutOutput: string): string | undefined {
  if (!ghCommandRegex.test(commandLine) || !rateLimitErrorRegex.test(stdoutOutput) || Date.now() < rateLimitReminderNextAt) return;
  return rateLimitReminderNextAt = Date.now() + rateLimitReminderCooldownMs, "<system-reminder>GitHub API rate limit exceeded (5,000/hr shared across all tools and agents). Run `gh api rate_limit --jq .resources` and sleep until reset before further gh calls. If polling in a loop, use ScheduleWakeup instead of retrying.</system-reminder>";
}

/**
 * Fetch the current PR associated with the working directory (optionally for a
 * specific PR number `prNumber`), then link the session to it if found.
 */
async function fetchAndLinkPr(prNumber?: string): Promise<void> {
  let args = ["pr", "view", ...(prNumber ? [prNumber] : []), "--json", "url"];
  let {
    code: exitCode,
    stdout: stdoutText
  } = await B6("gh", args, {
    timeout: 5000,
    preserveOutputOnError: !1,
    useCwd: !0
  });
  if (exitCode !== 0) return;
  let prUrl = d_(stdoutText)?.url;
  if (!prUrl) return;
  let prInfo = parsePrUrlInfo(prUrl);
  if (prInfo) await linkSessionToPrInfo(prInfo);
}

// --- Module-level variable declarations ---

var commitRegex: RegExp,
  pushRegex: RegExp,
  cherryPickRegex: RegExp,
  mergeRegex: RegExp,
  rebaseRegex: RegExp,
  /** Lazy-initialized Zod schema for git operation event payload. */
  gitOperationSchema: unknown,  // FIXME: unverified name — was t06
  prCheckoutRegex: RegExp,
  /** Table of gh pr subcommand patterns with their action/op strings. */
  ghPrActionTable: Array<{ re: RegExp; action: string; op: string }>,
  /** Regex matching a GitHub/GitLab PR URL, capturing repository path and PR number. */
  prUrlRegex: RegExp,
  /** Regex matching any non-trivial `gh` command invocation. */
  ghCommandRegex: RegExp,
  /** Regex matching GitHub API rate-limit error messages. */
  rateLimitErrorRegex: RegExp,
  rateLimitReminderCooldownMs: number = 60000,
  rateLimitReminderNextAt: number = 0;

/** Module initializer — sets up all regexes, schemas, and constants. */
var O8_ = L(() => {
  a8();
  w_();
  y_();
  l7();
  _8_();
  H6();
  commitRegex = buildGitCommandRegex("commit"),
  pushRegex = buildGitCommandRegex("push"),
  cherryPickRegex = buildGitCommandRegex("cherry-pick"),
  mergeRegex = buildGitCommandRegex("merge", "(?!-)"),
  rebaseRegex = buildGitCommandRegex("rebase"),
  gitOperationSchema = kH(() => k.object({
    commit: k.object({
      sha: k.string(),
      kind: k.enum(["committed", "amended", "cherry-picked"])
    }).optional(),
    push: k.object({
      branch: k.string()
    }).optional(),
    branch: k.object({
      ref: k.string(),
      action: k.enum(["merged", "rebased"])
    }).optional(),
    pr: k.object({
      number: k.number(),
      url: k.string().optional(),
      action: k.enum(["created", "edited", "merged", "commented", "closed", "ready", "draft", "auto-merge-enabled", "auto-merge-disabled"])
    }).optional()
  })),
  prCheckoutRegex = /\bgh\s+pr\s+checkout\b[^&|;]*\s(\d+)(?=\s|$|[&|;])/,
  ghPrActionTable = [{
    re: /\bgh\s+pr\s+create\b/,
    action: "created",
    op: "pr_create"
  }, {
    re: /\bgh\s+pr\s+edit\b/,
    action: "edited",
    op: "pr_edit"
  }, {
    re: /\bgh\s+pr\s+merge\b/,
    action: "merged",
    op: "pr_merge"
  }, {
    re: /\bgh\s+pr\s+comment\b/,
    action: "commented",
    op: "pr_comment"
  }, {
    re: /\bgh\s+pr\s+close\b/,
    action: "closed",
    op: "pr_close"
  }, {
    re: /\bgh\s+pr\s+ready\b/,
    action: "ready",
    op: "pr_ready"
  }],
  prUrlRegex = /https?:\/\/[^/\s"]+\/([^\s"]+?)\/(?:pull|pull-requests|-\/merge_requests)\/(\d+)/;
  ghCommandRegex = /(?:^|[;&|]|\b(?:then|do)\b)\s*gh\s+(?!auth\b|help\b|version\b|alias\b|completion\b|config\b)/,
  rateLimitErrorRegex = /API rate limit (?:already )?exceeded|exceeded a secondary rate limit|\bRATE_LIMITED\b/i;
});

export {buildGitCommandRegex as sst,parsePrUrlInfo as U0n,parseLastPrUrl as L0n,extractCommitSha as LJr,extractPushedBranch as EWd,extractPrNumberFromOutput as CWd,extractGitSubcommandArg as Ola,parseGitOperationPayload as ist,observeCompletedCommand as $0n,linkSessionToPrInfo as M0n,maybeRateLimitReminder as Fla,fetchAndLinkPr as Mla,commitRegex as Nla,pushRegex as N0n,cherryPickRegex as yWd,mergeRegex as TWd,rebaseRegex as SWd,gitOperationSchema as B0n,prCheckoutRegex as bWd,ghPrActionTable as Bla,prUrlRegex as F0n,ghCommandRegex as vWd,rateLimitErrorRegex as wWd,rateLimitReminderCooldownMs as RWd,rateLimitReminderNextAt as Lla,O8_ as ast};

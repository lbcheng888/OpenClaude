// @ts-nocheck
import {Qxe as V5_,X6n as hm6} from "../../vendor/m4256.ts";
import {Ne as dH} from "../../vendor/m583.ts";
import {m1 as lv,Zm as H$} from "./2709_Zm.ts";
import {UMt as Yk_,PKr as _F8} from "./2730_PKr.ts";
import {HE as aD,oH as hZ} from "../agent/3332_id.ts";
import {QR as EP} from "../tools/2710_allErrors.ts";
import {LO as qN,readRoster as u1,XR as vP} from "../../vendor/m2707.ts";
import {i8e as U5_,L6t as Hp6} from "./4379_commit.ts";
import {k6t as Um6,H6t as Fm6} from "../../vendor/m4364.ts";
import {Mo as _9} from "../mcp/2200_mcpServerName.ts";
import {ls as h9,fg as rY} from "../../vendor/m2232.ts";
import {os as $9} from "../api/0465_getOauthConfig.ts";
import {SandboxManager as nq,Uh as aY} from "../../vendor/m2682.ts";
import {getClaudeTempDir as GC,getChildProcessTmpDir as zh_,Xm as L$} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {TeamDeleteToolName as IH,tn as a_} from "./0230_encoding.ts";
import {DG as pc,CG as hc} from "../agent/5206_len.ts";
import {ov as xP,NW as QQ} from "./3289_NW.ts";
import {v4 as bp,qz as Hr} from "../telemetry/2700_qz.ts";
import {Mh as XY,mI as yG} from "./2029_mI.ts";
import {su as E5,ow as AZ} from "../../vendor/m2257.ts";
import {vs as I9,dm as oT} from "../../vendor/m2256.ts";
import {fa as mK,ry as cA} from "../../vendor/m2253.ts";
import {Ec as a1,dw as cW} from "../../vendor/m2593.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,jn as t6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
import {Ir as l8} from "../../vendor/m584.ts";
import {gDe as FBH} from "../../vendor/m4377.ts";
// @ts-nocheck
function cpH() {
  return V5_();
}
function GcK() {
  return hm6();
}
function WcK() {
  if (dH.platform !== "win32") return null;
  let H = "This tool runs Git Bash (POSIX sh), not cmd.exe or PowerShell. Use Unix shell syntax: `/dev/null` not `NUL`, forward slashes, `$VAR` not `%VAR%` or `$env:VAR`.";
  if (!lv()) return H;
  return `${H} Do not use PowerShell here-strings (\`@'\u2026'@\`) or backtick continuation here \u2014 for multi-line strings use a heredoc.`;
}
function lLO() {
  if (dH.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS) return null;
  return "You can use the `run_in_background` parameter to run the command in the background. Only use this if you don't need the result immediately and are OK being notified when the command completes later. You do not need to check the output right away - you'll be notified when it finishes. You do not need to use '&' at the end of the command when using this parameter.";
}
function nLO() {
  return "";
}
function iLO(appState) {
  if (!Yk_()) return "";
  let q = aD() ? EP : qN,
    {
      commit: K,
      pr: O
    } = U5_(),
    filePaths = Um6(appState),
    z = filePaths ? `${filePaths}

` : "",
    $ = nLO(),
    Y = null;
  return `${appState.commit ? `# Git
- Never use git commands with the -i flag (like git rebase -i or git add -i) since they require interactive input which is not supported.
- Only commit when the user explicitly asks. When staging, prefer naming specific files over "git add -A"/"git add ." \u2014 never commit files that likely contain secrets (.env, credentials).${K ? `
- End git commit messages with:
${K}` : ""}

` : `# Committing changes with git

Only create commits when requested by the user. If unclear, ask first. When the user asks you to create a new git commit, follow these steps carefully:

You can call multiple tools in a single response. When multiple independent pieces of information are requested and all commands are likely to succeed, run multiple tool calls in parallel for optimal performance. The numbered steps below indicate which commands should be batched in parallel.

Git Safety Protocol:
- NEVER update the git config
- NEVER run destructive git commands (push --force, reset --hard, checkout ., restore ., clean -f, branch -D) unless the user explicitly requests these actions. Taking unauthorized destructive actions is unhelpful and can result in lost work, so it's best to ONLY run these commands when given direct instructions 
- NEVER skip hooks (--no-verify, --no-gpg-sign, etc) unless the user explicitly requests it
- NEVER run force push to main/master, warn the user if they request it
- CRITICAL: Always create NEW commits rather than amending, unless the user explicitly requests a git amend. When a pre-commit hook fails, the commit did NOT happen \u2014 so --amend would modify the PREVIOUS commit, which may result in destroying work or losing previous changes. Instead, after hook failure, fix the issue, re-stage, and create a NEW commit
- When staging files, prefer adding specific files by name rather than using "git add -A" or "git add .", which can accidentally include sensitive files (.env, credentials) or large binaries
- NEVER commit changes unless the user explicitly asks you to. It is VERY IMPORTANT to only commit when explicitly asked, otherwise the user will feel that you are being too proactive

1. Run the following bash commands in parallel, each using the ${_9} tool:
  - Run a git status command to see all untracked files. IMPORTANT: Never use the -uall flag as it can cause memory issues on large repos.
  - Run a git diff command to see both staged and unstaged changes that will be committed.
  - Run a git log command to see recent commit messages, so that you can follow this repository's commit message style.
2. Analyze all staged changes (both previously staged and newly added) and draft a commit message:
  - Summarize the nature of the changes (eg. new feature, enhancement to an existing feature, bug fix, refactoring, test, docs, etc.). Ensure the message accurately reflects the changes and their purpose (i.e. "add" means a wholly new feature, "update" means an enhancement to an existing feature, "fix" means a bug fix, etc.).
  - Do not commit files that likely contain secrets (.env, credentials.json, etc). Warn the user if they specifically request to commit those files
  - Draft a concise (1-2 sentences) commit message that focuses on the "why" rather than the "what"
  - Ensure it accurately reflects the changes and their purpose
3. Run the following commands in parallel:
   - Add relevant untracked files to the staging area.
   - Create the commit with a message${K ? ` ending with:
   ${K}` : "."}
   - Run git status after the commit completes to verify success.
   Note: git status depends on the commit completing, so run it sequentially after the commit.
4. If the commit fails due to pre-commit hook: fix the issue and create a NEW commit

Important notes:
- NEVER run additional commands to read or explore code, besides git bash commands
- NEVER use the ${q} or ${h9} tools
- DO NOT push to the remote repository unless the user explicitly asks you to do so
- IMPORTANT: Never use git commands with the -i flag (like git rebase -i or git add -i) since they require interactive input which is not supported.
- IMPORTANT: Do not use --no-edit with git rebase commands, as the --no-edit flag is not a valid option for git rebase.
- If there are no changes to commit (i.e., no untracked files and no modifications), do not create an empty commit
- In order to ensure good formatting, ALWAYS pass the commit message via a HEREDOC, a la this example:
<example>
git commit -m "$(cat <<'EOF'
   Commit message here.${K ? `

   ${K}` : ""}
   EOF
   )"
</example>

`}${z}${$ ? `${$}

` : ""}# Creating pull requests
Use the gh command via the Bash tool for ALL GitHub-related tasks including working with issues, pull requests, checks, and releases. If given a Github URL use the gh command to get the information needed.

IMPORTANT: When the user asks you to create a pull request, follow these steps carefully:

1. Run the following bash commands in parallel using the ${_9} tool, in order to understand the current state of the branch since it diverged from the main branch:
   - Run a git status command to see all untracked files (never use -uall flag)
   - Run a git diff command to see both staged and unstaged changes that will be committed
   - Check if the current branch tracks a remote branch and is up to date with the remote, so you know if you need to push to the remote
   - Run a git log command and \`git diff [base-branch]...HEAD\` to understand the full commit history for the current branch (from the time it diverged from the base branch)
2. Analyze all changes that will be included in the pull request, making sure to look at all relevant commits (NOT just the latest commit, but ALL commits that will be included in the pull request!!!), and draft a pull request title and summary:
   - Keep the PR title short (under 70 characters)
   - Use the description/body for details, not the title
3. Run the following commands in parallel:
   - Create new branch if needed
   - Push to remote with -u flag if needed
   - Create PR using gh pr create with the format below. Use a HEREDOC to pass the body to ensure correct formatting.
<example>
gh pr create --title "the pr title" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points>

## Test plan
[Bulleted markdown checklist of TODOs for testing the pull request...]${O ? `

${O}` : ""}
EOF
)"
</example>

Important:
- DO NOT use the ${q} or ${h9} tools
- Return the PR URL when you're done, so the user can see it

# Other common operations
- View comments on a Github PR: gh api repos/foo/bar/pulls/123/comments${Y ? `

${Y}` : ""}`;
}
function oLO(messages) {
  if (!messages || messages.length === 0) return messages;
  return $9(messages);
}
function aLO(H) {
  if (!H || H.length <= XTq) return H;
  let _ = H.length - XTq;
  return [...H.slice(0, XTq), `... and ${_} more (truncated for prompt size)`];
}
function RcK() {
  if (!nq.isSandboxingEnabled()) return "";
  let H = nq.getFsReadConfig(),
    _ = nq.getFsWriteConfig(),
    q = nq.getNetworkRestrictionConfig(),
    K = nq.getAllowUnixSockets(),
    O = nq.getIgnoreViolations(),
    T = nq.areUnsandboxedCommandsAllowed(),
    z = new Set([GC(), zh_()]),
    $ = J => $9(J.map(D => z.has(D) ? "$TMPDIR" : D)),
    Y = {
      read: {
        denyOnly: aLO(oLO(H.denyOnly)),
        ...(H.allowWithinDeny && {
          allowWithinDeny: aLO(oLO(H.allowWithinDeny))
        })
      },
      write: {
        allowOnly: aLO($(_.allowOnly)),
        denyWithinAllow: aLO(oLO(_.denyWithinAllow))
      }
    },
    w = {
      ...(q?.allowedHosts && {
        allowedHosts: aLO(oLO(q.allowedHosts))
      }),
      ...(q?.deniedHosts && {
        deniedHosts: aLO(oLO(q.deniedHosts))
      }),
      ...(K && {
        allowUnixSockets: aLO(oLO(K))
      })
    },
    A = [];
  if (Object.keys(Y).length > 0) A.push(`Filesystem: ${IH(Y)}`);
  if (Object.keys(w).length > 0) A.push(`Network: ${IH(w)}`);
  if (O) A.push(`Ignored violations: ${IH(O)}`);
  let j = [...(T ? ["You should always default to running commands within the sandbox. Do NOT attempt to set `dangerouslyDisableSandbox: true` unless:", ["The user *explicitly* asks you to bypass sandbox", "A specific command just failed and you see evidence of sandbox restrictions causing the failure. Note that commands can fail for many reasons unrelated to the sandbox (missing files, wrong arguments, network issues, etc.)."], "Evidence of sandbox-caused failures includes:", ['"Operation not permitted" errors for file/network operations', "Access denied to specific paths outside allowed directories", "Network connection failures to non-whitelisted hosts", "Unix socket connection errors"], "When you see evidence of sandbox-caused failure:", ["Immediately retry with `dangerouslyDisableSandbox: true` (don't ask, just do it)", "Briefly explain what sandbox restriction likely caused the failure. Be sure to mention that the user can use the `/sandbox` command to manage restrictions.", "This will prompt the user for permission"], "Treat each command you execute with `dangerouslyDisableSandbox: true` individually. Even if you have recently run a command with this setting, you should default to running future commands within the sandbox.", "Do not suggest adding sensitive paths like ~/.bashrc, ~/.zshrc, ~/.ssh/*, or credential files to the sandbox allowlist."] : ["All commands MUST run in sandbox mode - the `dangerouslyDisableSandbox` parameter is disabled by policy.", "Commands cannot run outside the sandbox under any circumstances.", "If a command fails due to sandbox restrictions, work with the user to adjust sandbox settings instead."]), "For temporary files, always use the `$TMPDIR` environment variable. TMPDIR is automatically set to the correct sandbox-writable directory in sandbox mode. Do NOT use `/tmp` directly - use `$TMPDIR` instead."];
  return ["", "## Command sandbox", "By default, your command will be run in a sandbox. This sandbox controls which directories and network hosts commands may access or modify without an explicit override.", "", "The sandbox has the following restrictions:", A.join(`
`), "", ...pc(j)].join(`
`);
}
function gvO(H) {
  if (!Yk_()) return "";
  let q = "",
    {
      commit: K,
      pr: O
    } = U5_(),
    z = [K ? `- End git commit messages with:
${K}` : null, O ? `- End PR bodies with:
${O}` : null].filter(Boolean).join(`
`),
    $ = nLO(),
    Y = null,
    w = Um6(H);
  return `${q}# Git
- Interactive flags (\`-i\`, e.g. \`git rebase -i\`, \`git add -i\`) are not supported in this environment.
- Use the \`gh\` CLI for GitHub operations (PRs, issues, API).
- Commit or push only when the user asks${w ? " \u2014 and for a completed change heading to a PR, only after the pre-ship checks below" : ""}. If on the default branch, branch first.${z ? `
${z}` : ""}${w ? `
- ${w}` : ""}${$ ? `

${$}` : ""}${Y ? `

${Y}` : ""}`;
}
function QvO(H) {
  let _ = lLO() !== null,
    q = gvO(H),
    K = RcK(),
    O = xP() ? "`cat`, `head`, `tail`, `sed`, `awk`, or `echo`" : "`find`, `grep`, `cat`, `head`, `tail`, `sed`, `awk`, or `echo`",
    T = [];
  if (_) {
    let $ = "- `run_in_background` runs the command detached: it keeps running across turns and re-invokes you when it exits. No `&` needed.";
    if (bp()) $ += " Foreground `sleep` is blocked; use Monitor with an until-loop to wait on a condition.";
    T.push($);
  }
  let z = WcK();
  return ["Executes a bash command and returns its output.", ...(z ? ["", z] : []), "", "- Working directory persists between calls, but prefer absolute paths \u2014 `cd` in a compound command can trigger a permission prompt. Shell state (env vars, functions) does not persist; the shell is initialized from the user's profile.", `- IMPORTANT: Avoid using this tool to run ${O} commands, unless explicitly instructed or after you have verified that a dedicated tool cannot accomplish your task. Instead, use the appropriate dedicated tool as this will provide a much better experience for the user.`, `- \`timeout\` is in milliseconds: default ${cpH()}, max ${GcK()}.`, ...T, ...(K ? [K] : []), ...(q ? ["", q] : [])].join(`
`);
}
function KrK(H, _) {
  if (XY(H)) return QvO(_);
  let q = xP(),
    K = [...(q ? [] : [`File search: Use ${E5} (NOT find or ls)`, `Content search: Use ${u1} (NOT grep or rg)`]), `Read files: Use ${I9} (NOT cat/head/tail)`, `Edit files: Use ${mK} (NOT sed/awk)`, `Write files: Use ${a1} (NOT echo >/cat <<EOF)`, "Communication: Output text directly (NOT echo/printf)"],
    O = q ? "`cat`, `head`, `tail`, `sed`, `awk`, or `echo`" : "`find`, `grep`, `cat`, `head`, `tail`, `sed`, `awk`, or `echo`",
    T = j_("tengu_relay_chain_v1", false) ? [] : ["When issuing multiple commands:", [`If the commands are independent and can run in parallel, make multiple ${_9} tool calls in a single message. Example: if you need to run "git status" and "git diff", send a single message with two ${_9} tool calls in parallel.`, `If the commands depend on each other and must run sequentially, use a single ${_9} call with '&&' to chain them together.`, "Use ';' only when you need to run commands sequentially but don't care if earlier commands fail.", "DO NOT use newlines to separate commands (newlines are ok in quoted strings)."]],
    z = ["Prefer to create a new commit rather than amending an existing commit.", "Before running destructive operations (e.g., git reset --hard, git push --force, git checkout --), consider whether there is a safer alternative that achieves the same goal. Only use destructive operations when they are truly the best approach.", "Never skip hooks (--no-verify) or bypass signing (--no-gpg-sign, -c commit.gpgsign=false) unless the user has explicitly asked for it. If a hook fails, investigate and fix the underlying issue."],
    $ = ["Do not sleep between commands that can run immediately \u2014 just run them.", ...(bp() ? ['Use the Monitor tool to stream events from a background process (each stdout line is a notification). For one-shot "wait until done," use Bash with run_in_background instead.'] : []), "If your command is long running and you would like to be notified when it finishes \u2014 use `run_in_background`. No sleep needed.", "Do not retry failing commands in a sleep loop \u2014 diagnose the root cause.", "If waiting for a background task you started with `run_in_background`, you will be notified when it completes \u2014 do not poll.", ...(bp() ? ["Long leading `sleep` commands are blocked. To poll until a condition is met, use Monitor with an until-loop (e.g. `until <check>; do sleep 2; done`) \u2014 you get a notification when the loop exits. Do not chain shorter sleeps to work around the block."] : ["If you must poll an external process, use a check command (e.g. `gh run view`) rather than sleeping first.", "If you must sleep, keep the duration short to avoid blocking the user."])],
    Y = lLO(),
    w = iLO(_),
    A = ["If your command will create new directories or files, first use this tool to run `ls` to verify the parent directory exists and is the correct location.", 'Always quote file paths that contain spaces with double quotes in your command (e.g., cd "path with spaces/file.txt")', "Try to maintain your current working directory throughout the session by using absolute paths and avoiding usage of `cd`. You may use `cd` if the User explicitly requests it. In particular, never prepend `cd <current-directory>` to a `git` command \u2014 `git` already operates on the current working tree, and the compound triggers a permission prompt.", `You may specify an optional timeout in milliseconds (up to ${GcK()}ms / ${GcK() / 60000} minutes). By default, your command will timeout after ${cpH()}ms (${cpH() / 60000} minutes).`, ...(Y !== null ? [Y] : []), ...T, "For git commands:", z, "Avoid unnecessary `sleep` commands:", $, ...(q ? ["When running `find`, search from `.` (or a specific path), not `/` \u2014 scanning the full filesystem can exhaust system resources on large trees.", "When using `find -regex` with alternation, put the longest alternative first. Example: use `'.*\\.\\(tsx\\|ts\\)'` not `'.*\\.\\(ts\\|tsx\\)'` \u2014 the second form silently skips `.tsx` files."] : [])],
    f = WcK();
  return ["Executes a given bash command and returns its output.", ...(f ? ["", f] : []), "", "The working directory persists between commands, but shell state does not. The shell environment is initialized from the user's profile (bash or zsh).", "", `IMPORTANT: Avoid using this tool to run ${O} commands, unless explicitly instructed or after you have verified that a dedicated tool cannot accomplish your task. Instead, use the appropriate dedicated tool as this will provide a much better experience for the user:`, "", ...pc(K), `While the ${_9} tool can do similar things, it\u2019s better to use the built-in tools as they provide a better user experience and make it easier to review tool calls and give permission.`, "", "# Instructions", ...pc(A), RcK(), ...(w ? ["", w] : [])].join(`
`);
}
var XTq = 50;
var OrK = L(() => {
  hc();
  t6();
  Hp6();
  QQ();
  l8();
  _F8();
  yG();
  L$();
  Fm6();
  aY();
  H$();
  a_();
  hZ();
  FBH();
  rY();
  cA();
  oT();
  cW();
  AZ();
  vP();
  Hr();
});
export {cpH as M6t,GcK as Gmt,WcK as Xrl,lLO as Qrl,nLO as Zrl,iLO as E8p,oLO as Wmt,aLO as a8e,RcK as eol,gvO as C8p,QvO as A8p,KrK as tol,XTq as pSo,OrK as nol};

// @ts-nocheck
import {_a,P3e} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {oo,b,x} from "../../runtime.ts";
import {markTelemetryString as O_,KO} from "../agent/3295_code.ts";
import {bT,Dw} from "../core/5176_encoding.ts";
import {getCurrentWorktreeSession as _f,h_e} from "../config/3348_flushAnalyticsSinks.ts";
import {getSessionId as It,lt} from "../session/0132_sent.ts";
import {keepWorktree as O5e,persistWorktreeSession as Nue,cleanupWorktree as cmt,killTmuxSession as lmt,qI} from "../session/5205_worktreeBranchName.ts";
import {execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {gd,xw} from "./3853_mode.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Worktree exit dialog.
 *
 * NOTE: The v185 PORT-FROM module for this slot held GuestPassesDialog, an
 * unrelated component, so no local names/types could be carried over. Names
 * below are derived from the structure-exact READ file (v190).
 */

/** Resolve the active worktree manager singleton. */
function getWorktreeManager() {
  return _a(), oo(P3e);
}

/** Clear any persisted worktree state. */
function clearSavedWorktreeState(): void {
  getWorktreeManager().saveWorktreeState(null);
}

/**
 * Change the process working directory back to `dir`, re-init the cwd-derived
 * state, drop saved worktree state and invalidate the tool cache.
 */
function restoreCwd(dir: string): void {
  process.chdir(dir), O_(dir), clearSavedWorktreeState(), bT.cache.clear?.();
}

/**
 * Dialog shown when exiting a worktree session. Inspects git status / commit
 * count and offers keep/remove options (with optional tmux handling).
 */
function ExitWorktreeDialog(props: { onDone: (message: string, opts?: any) => void; onCancel?: () => void }) {
  let memoCache = NMl.c(29),
    {
      onDone: onDone,
      onCancel: onCancel
    } = props,
    [status, setStatus] = rOe.useState("loading"),
    initialChangedFiles;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) initialChangedFiles = [], memoCache[0] = initialChangedFiles;else initialChangedFiles = memoCache[0];
  let [changedFiles, setChangedFiles] = rOe.useState(initialChangedFiles),
    [commitCount, setCommitCount] = rOe.useState(0),
    [resultMessage, setResultMessage] = rOe.useState(),
    worktreeState;
  if (memoCache[1] === Symbol.for("react.memo_cache_sentinel")) worktreeState = _f(), memoCache[1] = worktreeState;else worktreeState = memoCache[1];
  let worktree = worktreeState,
    sessionTitleValue;
  if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) sessionTitleValue = getWorktreeManager().getCurrentSessionTitle(It()), memoCache[2] = sessionTitleValue;else sessionTitleValue = memoCache[2];
  let sessionTitle = sessionTitleValue,
    loadEffect,
    loadEffectDeps;
  if (memoCache[3] === Symbol.for("react.memo_cache_sentinel")) loadEffect = () => {
    (async function () {
      if (worktree?.enteredExisting) {
        await O5e(), restoreCwd(worktree.originalCwd), setResultMessage(`Returned to ${worktree.originalCwd} (worktree at ${worktree.worktreePath} left in place)`), setStatus("done");
        return;
      }
      let statusLines = [],
        statusResult = worktree ? await Wr("git", ["status", "--porcelain"], {
          cwd: worktree.worktreePath
        }) : {
          stdout: "",
          stderr: "",
          code: 1,
          error: void 0
        };
      if (worktree && !worktree.hookBased && statusResult.code !== 0) {
        Nue(null), h_e(), restoreCwd(worktree.originalCwd);
        let tmuxNote = worktree.tmuxSessionName ? `. Detached tmux session ${worktree.tmuxSessionName} may still be running — end it with: tmux kill-session -t ${worktree.tmuxSessionName}` : "";
        setResultMessage(`Worktree at ${worktree.worktreePath} is no longer accessible — exiting${tmuxNote}`), setStatus("done");
        return;
      }
      if (statusResult.stdout) statusLines = statusResult.stdout.split(`
`).filter(isNonEmptyLine), setChangedFiles(statusLines);
      if (worktree) {
        let {
            stdout: commitCountStdout
          } = await Wr("git", ["rev-list", "--count", `${worktree.originalHeadCommit}..HEAD`], {
            cwd: worktree.worktreePath
          }),
          parsedCommitCount = parseInt(commitCountStdout.trim()) || 0;
        if (setCommitCount(parsedCommitCount), statusLines.length === 0 && parsedCommitCount === 0 && !sessionTitle) {
          setStatus("removing-clean"), cmt().then(removed => {
            if (restoreCwd(worktree.originalCwd), removed) W("tengu_worktree_removed", {
              source: Ve("exit_dialog"),
              commits: 0,
              changed_files: 0
            }), setResultMessage("Worktree removed (no changes)");else setResultMessage(`Worktree could not be removed — kept at ${worktree.worktreePath}`);
            setStatus("done");
          });
          return;
        } else setStatus("asking");
      }
    })();
  }, loadEffectDeps = [worktree, sessionTitle], memoCache[3] = loadEffect, memoCache[4] = loadEffectDeps;else loadEffect = memoCache[3], loadEffectDeps = memoCache[4];
  rOe.useEffect(loadEffect, loadEffectDeps);
  let doneEffect, doneEffectDeps;
  if (memoCache[5] !== onDone || memoCache[6] !== resultMessage || memoCache[7] !== status) doneEffect = () => {
    if (status === "done") onDone(resultMessage);
  }, doneEffectDeps = [status, onDone, resultMessage], memoCache[5] = onDone, memoCache[6] = resultMessage, memoCache[7] = status, memoCache[8] = doneEffect, memoCache[9] = doneEffectDeps;else doneEffect = memoCache[8], doneEffectDeps = memoCache[9];
  if (rOe.useEffect(doneEffect, doneEffectDeps), !worktree) return onDone("No active worktree session found", {
    display: "system"
  }), null;
  if (status === "loading" || status === "done") return null;
  let handleSelect;
  if (memoCache[10] !== changedFiles || memoCache[11] !== commitCount) handleSelect = async function (choice) {
    if (!worktree) return;
    let hasTmux = Boolean(worktree.tmuxSessionName);
    if (choice === "keep" || choice === "keep-with-tmux") {
      if (setStatus("keeping"), W("tengu_worktree_kept", {
        commits: commitCount,
        changed_files: changedFiles.length
      }), await O5e(), restoreCwd(worktree.originalCwd), hasTmux) setResultMessage(`Worktree kept. Your work is saved at ${worktree.worktreePath} on branch ${worktree.worktreeBranch}. Reattach to tmux session with: tmux attach -t ${worktree.tmuxSessionName}`);else setResultMessage(`Worktree kept. Your work is saved at ${worktree.worktreePath} on branch ${worktree.worktreeBranch}`);
      setStatus("done");
    } else if (choice === "keep-kill-tmux") {
      if (setStatus("keeping"), W("tengu_worktree_kept", {
        commits: commitCount,
        changed_files: changedFiles.length
      }), worktree.tmuxSessionName) await lmt(worktree.tmuxSessionName);
      await O5e(), restoreCwd(worktree.originalCwd), setResultMessage(`Worktree kept at ${worktree.worktreePath} on branch ${worktree.worktreeBranch}. Tmux session terminated.`), setStatus("done");
    } else if (choice === "remove" || choice === "remove-with-tmux") {
      if (setStatus("removing"), worktree.tmuxSessionName) await lmt(worktree.tmuxSessionName);
      let removed = await cmt();
      if (restoreCwd(worktree.originalCwd), !removed) {
        setResultMessage(`Worktree could not be removed — kept at ${worktree.worktreePath}`), setStatus("done");
        return;
      }
      W("tengu_worktree_removed", {
        source: Ve("exit_dialog"),
        commits: commitCount,
        changed_files: changedFiles.length
      });
      let tmuxNote = hasTmux ? " Tmux session terminated." : "";
      if (commitCount > 0 && changedFiles.length > 0) setResultMessage(`Worktree removed. ${commitCount} ${commitCount === 1 ? "commit" : "commits"} and uncommitted changes were discarded.${tmuxNote}`);else if (commitCount > 0) setResultMessage(`Worktree removed. ${commitCount} ${commitCount === 1 ? "commit" : "commits"} on ${worktree.worktreeBranch} ${commitCount === 1 ? "was" : "were"} discarded.${tmuxNote}`);else if (changedFiles.length > 0) setResultMessage(`Worktree removed. Uncommitted changes were discarded.${tmuxNote}`);else setResultMessage(`Worktree removed.${tmuxNote}`);
      setStatus("done");
    }
  }, memoCache[10] = changedFiles, memoCache[11] = commitCount, memoCache[12] = handleSelect;else handleSelect = memoCache[12];
  let onChange = handleSelect;
  if (status === "keeping") {
    let keepingView;
    if (memoCache[13] === Symbol.for("react.memo_cache_sentinel")) keepingView = Mue.jsxs($, {
      flexDirection: "row",
      marginY: 1,
      children: [Mue.jsx(gd, {}), Mue.jsx(v, {
        children: "Keeping worktree…"
      })]
    }), memoCache[13] = keepingView;else keepingView = memoCache[13];
    return keepingView;
  }
  if (status === "removing-clean" || status === "removing") {
    let removingLabel = status === "removing-clean" ? "Cleaning up worktree (no pending changes)…" : "Removing worktree…",
      spinner;
    if (memoCache[14] === Symbol.for("react.memo_cache_sentinel")) spinner = Mue.jsx(gd, {}), memoCache[14] = spinner;else spinner = memoCache[14];
    let removingView;
    if (memoCache[15] !== removingLabel) removingView = Mue.jsxs($, {
      flexDirection: "row",
      marginY: 1,
      children: [spinner, Mue.jsx(v, {
        children: removingLabel
      })]
    }), memoCache[15] = removingLabel, memoCache[16] = removingView;else removingView = memoCache[16];
    return removingView;
  }
  let branchName = worktree.worktreeBranch,
    hasChangedFiles = changedFiles.length > 0,
    hasCommits = commitCount > 0,
    subtitle;
  if (hasChangedFiles && hasCommits) subtitle = `You have ${changedFiles.length} uncommitted ${changedFiles.length === 1 ? "file" : "files"} and ${commitCount} ${commitCount === 1 ? "commit" : "commits"} on ${branchName}. All will be lost if you remove.`;else if (hasChangedFiles) subtitle = `You have ${changedFiles.length} uncommitted ${changedFiles.length === 1 ? "file" : "files"}. These will be lost if you remove the worktree.`;else if (hasCommits) subtitle = `You have ${commitCount} ${commitCount === 1 ? "commit" : "commits"} on ${branchName}. The branch will be deleted if you remove the worktree.`;else if (sessionTitle) subtitle = `This session was named "${sessionTitle}". Keep the worktree to resume it later, or remove it to clean up.`;else subtitle = "You are working in a worktree. Keep it to continue working there, or remove it to clean up.";
  let cancelHandler;
  if (memoCache[17] !== onChange || memoCache[18] !== onCancel) cancelHandler = function () {
    if (onCancel) {
      onCancel();
      return;
    }
    onChange("keep");
  }, memoCache[17] = onChange, memoCache[18] = onCancel, memoCache[19] = cancelHandler;else cancelHandler = memoCache[19];
  let handleCancel = cancelHandler,
    removeDescription = hasChangedFiles || hasCommits ? "All changes and commits will be lost." : "Clean up the worktree directory.",
    hasTmuxSession = Boolean(worktree.tmuxSessionName),
    optionsValue;
  if (memoCache[20] !== removeDescription) optionsValue = hasTmuxSession ? [{
    label: "Keep worktree and tmux session",
    value: "keep-with-tmux",
    description: `Stays at ${worktree.worktreePath}. Reattach with: tmux attach -t ${worktree.tmuxSessionName}`
  }, {
    label: "Keep worktree, end tmux session",
    value: "keep-kill-tmux",
    description: `Keeps worktree at ${worktree.worktreePath}, terminates tmux session.`
  }, {
    label: "Remove worktree and tmux session",
    value: "remove-with-tmux",
    description: removeDescription
  }] : [{
    label: "Keep worktree",
    value: "keep",
    description: `Stays at ${worktree.worktreePath}`
  }, {
    label: "Remove worktree",
    value: "remove",
    description: removeDescription
  }], memoCache[20] = removeDescription, memoCache[21] = optionsValue;else optionsValue = memoCache[21];
  let options = optionsValue,
    defaultFocusValue = hasTmuxSession ? "keep-with-tmux" : "keep",
    selectView;
  if (memoCache[22] !== onChange || memoCache[23] !== options) selectView = Mue.jsx(hr, {
    defaultFocusValue: defaultFocusValue,
    options: options,
    onChange: onChange
  }), memoCache[22] = onChange, memoCache[23] = options, memoCache[24] = selectView;else selectView = memoCache[24];
  let dialogView;
  if (memoCache[25] !== handleCancel || memoCache[26] !== subtitle || memoCache[27] !== selectView) dialogView = Mue.jsx(Jn, {
    title: "Exiting worktree session",
    subtitle: subtitle,
    onCancel: handleCancel,
    children: selectView
  }), memoCache[25] = handleCancel, memoCache[26] = subtitle, memoCache[27] = selectView, memoCache[28] = dialogView;else dialogView = memoCache[28];
  return dialogView;
}

/** Keep only non-blank git status lines. */
function isNonEmptyLine(line: string): boolean {
  return line.trim() !== "";
}
var NMl, rOe, Mue;
var UMl = b(() => {
  kt();
  lt();
  je();
  Ii();
  Dw();
  KO();
  qI();
  Ol();
  di();
  xw();
  NMl = x(tt(), 1), rOe = x(et(), 1), Mue = x(oe(), 1);
});

export {getWorktreeManager as FMl,clearSavedWorktreeState as Nym,restoreCwd as Fgt,ExitWorktreeDialog as BMl,isNonEmptyLine as Fym,NMl,rOe,Mue,UMl};

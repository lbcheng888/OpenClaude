// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {useTimeout as md} from "../../vendor/m2460.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {Ne} from "../../vendor/m583.ts";
import {getMemoryFiles as qA,getMemoryFilesForNestedDirectory as FMt,getClaudeMds as NMt,ZR} from "../config/2729_stripHtmlComments.ts";
import {mA,Xl} from "../config/0651_maxBytes.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {getOriginalCwd as gr,setOriginalCwd as Gx,lt} from "./0132_sent.ts";
import {markTelemetryString as O_,KO} from "../agent/3295_code.ts";
import {relocateSessionTranscript as NCo,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {V1i,Pf} from "../agent/2591_level.ts";
import {reanchorGitFileWatcher as UK,VP} from "../../vendor/m696.ts";
import {getIsGit as Ay,ia} from "../../vendor/m698.ts";
import {yS,WB} from "../../vendor/m4274.ts";
import {SandboxManager as xo,Uh} from "../../vendor/m2682.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {fVn,$w,po} from "../tools/5224_userPromptCount.ts";
import {Gp,gA} from "../mcp/0733_serverName.ts";
import {permissionRuleSourceDisplayString as jDe,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {hs,Tu} from "../../vendor/m649.ts";
import {cn,Ct} from "../../vendor/m197.ts";
import {hdl,gdl} from "../../vendor/m4497.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {isPathTrusted as Dft,setPathTrusted as a8t,tr} from "./5228_shouldSkipPluginAutoupdate.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/** Module exports table for the `/cd` (change directory) slash command. */
var ydl = {};
ft(ydl, {
  call: () => call,
  CdTrustPrompt: () => CdTrustPrompt
});
/**
 * Simple feedback view for the `/cd` command: shows the `/cd <args>` line the
 * user typed plus a message, and fires `onDone` once on mount.
 */
function s8t(props) {
  let cache = MCo.c(7),
    {
      message: message,
      args: args,
      onDone: onDone
    } = props;
  md(onDone, 0);
  let argsLine;
  if (cache[0] !== args) argsLine = gv.jsxs(v, {
    dimColor: !0,
    children: [Xe.pointer, " /cd ", args]
  }), cache[0] = args, cache[1] = argsLine;else argsLine = cache[1];
  let messageNode;
  if (cache[2] !== message) messageNode = gv.jsx(Yn, {
    children: gv.jsx(v, {
      children: message
    })
  }), cache[2] = message, cache[3] = messageNode;else messageNode = cache[3];
  let view;
  if (cache[4] !== argsLine || cache[5] !== messageNode) view = gv.jsxs($, {
    flexDirection: "column",
    children: [argsLine, messageNode]
  }), cache[4] = argsLine, cache[5] = messageNode, cache[6] = view;else view = cache[6];
  return view;
}
/**
 * Trust prompt shown before moving into a directory the session hasn't worked
 * in before. Confirm relocates; cancel stays put.
 */
function CdTrustPrompt(props) {
  let cache = MCo.c(12),
    {
      directory: directory,
      onConfirm: onConfirm,
      onCancel: onCancel
    } = props,
    directoryNode;
  if (cache[0] !== directory) directoryNode = gv.jsx(v, {
    bold: !0,
    children: directory
  }), cache[0] = directory, cache[1] = directoryNode;else directoryNode = cache[1];
  let explainNode, capabilityNode;
  if (cache[2] === Symbol.for("react.memo_cache_sentinel")) explainNode = gv.jsxs(v, {
    children: ["This session hasn", "'", "t worked here before. Is this a directory you created or one you trust?"]
  }), capabilityNode = gv.jsxs(v, {
    children: ["Claude Code", "'", "ll be able to read, edit, and execute files here."]
  }), cache[2] = explainNode, cache[3] = capabilityNode;else explainNode = cache[2], capabilityNode = cache[3];
  let securityLinkNode;
  if (cache[4] === Symbol.for("react.memo_cache_sentinel")) securityLinkNode = gv.jsx(v, {
    dimColor: !0,
    children: gv.jsx(Ss, {
      url: "https://code.claude.com/docs/en/security",
      children: "Security guide"
    })
  }), cache[4] = securityLinkNode;else securityLinkNode = cache[4];
  let confirmButtons;
  if (cache[5] !== onCancel || cache[6] !== onConfirm) confirmButtons = gv.jsx(Bl, {
    confirmLabel: "Yes, move here",
    cancelLabel: "No, stay put",
    onConfirm: onConfirm,
    onCancel: onCancel
  }), cache[5] = onCancel, cache[6] = onConfirm, cache[7] = confirmButtons;else confirmButtons = cache[7];
  let hintsNode;
  if (cache[8] === Symbol.for("react.memo_cache_sentinel")) hintsNode = gv.jsx(v, {
    dimColor: !0,
    children: gv.jsxs(bn, {
      children: [gv.jsx(at, {
        chord: "enter",
        action: "confirm"
      }), gv.jsx(at, {
        chord: "escape",
        action: "cancel"
      })]
    })
  }), cache[8] = hintsNode;else hintsNode = cache[8];
  let promptView;
  if (cache[9] !== directoryNode || cache[10] !== confirmButtons) promptView = gv.jsx(hm, {
    color: "warning",
    titleColor: "warning",
    title: "Moving to a new directory:",
    children: gv.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingTop: 1,
      children: [directoryNode, explainNode, capabilityNode, securityLinkNode, confirmButtons, hintsNode]
    })
  }), cache[9] = directoryNode, cache[10] = confirmButtons, cache[11] = promptView;else promptView = cache[11];
  return promptView;
}
/**
 * Collect and render the CLAUDE.md memory files visible from `targetDir`,
 * walking from the filesystem root down to the target directory.
 */
async function jjp(targetDir) {
  if (Ne.CLAUDE_CODE_DISABLE_CLAUDE_MDS) return "";
  let seenPaths = new Set();
  for (let entry of await qA()) seenPaths.add(mA(entry.path));
  let ancestorChain = [],
    cursor = targetDir;
  while (cursor !== i8t.parse(cursor).root) ancestorChain.push(cursor), cursor = i8t.dirname(cursor);
  let memoryFiles = [];
  for (let dir of ancestorChain.reverse()) memoryFiles.push(...(await FMt(dir, targetDir, seenPaths)));
  return NMt(memoryFiles);
}
/**
 * Perform the actual relocation to `targetDir`: chdir, move the transcript,
 * refresh caches/git state, and return the stale-environment notice plus any
 * memory content. Rolls back the chdir if the transcript move fails.
 */
async function Yjp(targetDir) {
  let previousDir = Lt(),
    previousState = gr();
  process.chdir(targetDir), O_(targetDir), Gx(Lt());
  let moveSucceeded = !0;
  try {
    await NCo();
  } catch (err) {
    moveSucceeded = !1;
    let rolledBack = !1;
    try {
      process.chdir(previousDir), rolledBack = !0;
    } catch {
      A(`/cd transcript move failed and rollback chdir failed; completing the move with the transcript left in its previous home: ${err}`, {
        level: "error"
      });
    }
    if (rolledBack) throw O_(previousDir), Gx(previousState), err;
  }
  if (moveSucceeded) await V1i(Lt());
  UK(), Ay.cache.clear?.(), yS()?.refreshGitBranch?.(), xo.refreshConfig(), W("tengu_cd_command", {});
  let memoryContent = await jjp(targetDir),
    displayDir = fVn(targetDir),
    staleNotice = $w(`The session's working directory has changed to ${displayDir} (via /cd). The environment block at the start of this conversation still names the ` + "previous directory — that information is stale. All tool calls and " + `relative paths now resolve from ${displayDir}.`);
  return memoryContent ? `${staleNotice}

${memoryContent}` : staleNotice;
}
/** Build the user-facing message explaining why a `/cd` move was denied. */
function Jjp(targetDir, decision) {
  if (decision.result === "blockedByRule") {
    let ruleLabel = Gp(decision.rule.ruleValue),
      sourceLabel = jDe(decision.rule.source);
    if (decision.rule.ruleValue.ruleContent === void 0) return `Can't move to ${bt.bold(targetDir)} — /cd is turned off by the ${bt.bold(ruleLabel)} rule in ${sourceLabel}. Update the rule in /permissions to move between directories again.`;
    return `Can't move to ${bt.bold(targetDir)} — it's excluded by the ${bt.bold(ruleLabel)} rule in ${sourceLabel}. Pick a directory outside that rule, or update it in /permissions.`;
  }
  return `Can't move to ${bt.bold(targetDir)} — /cd is limited to directories matching ${decision.allowedPatterns.map(pattern => bt.bold(pattern)).join(", ")}. Pick a matching directory, or add a Cd rule in /permissions.`;
}
/**
 * `/cd <path>` entry point. Validates the requested path, checks permission
 * rules, and either relocates immediately (trusted) or shows the trust prompt.
 */
async function call(emit, toolUseContext, rawArgs) {
  let trimmedArgs = (rawArgs ?? "").trim();
  if (!trimmedArgs) return gv.jsx(s8t, {
    message: "Usage: /cd <path>",
    args: "",
    onDone: () => emit("Usage: /cd <path>")
  });
  let resolvedPath = hs(trimmedArgs);
  try {
    if (!(await mVn.stat(resolvedPath)).isDirectory()) {
      let notDirMsg = `${bt.bold(resolvedPath)} is not a directory. Did you mean ${bt.bold(i8t.dirname(resolvedPath))}?`;
      return gv.jsx(s8t, {
        message: notDirMsg,
        args: trimmedArgs,
        onDone: () => emit(notDirMsg)
      });
    }
  } catch (statErr) {
    let errCode = cn(statErr);
    if (errCode === "ENOENT" || errCode === "ENOTDIR" || errCode === "EACCES" || errCode === "EPERM") {
      let notFoundMsg = `Couldn't find a directory at ${bt.bold(resolvedPath)}.`;
      return gv.jsx(s8t, {
        message: notFoundMsg,
        args: trimmedArgs,
        onDone: () => emit(notFoundMsg)
      });
    }
    throw statErr;
  }
  let canonicalPath = resolvedPath;
  try {
    canonicalPath = await mVn.realpath(resolvedPath);
  } catch {
    canonicalPath = resolvedPath;
  }
  if (canonicalPath === Lt()) {
    let alreadyHereMsg = `Already in ${bt.bold(canonicalPath)}.`;
    return gv.jsx(s8t, {
      message: alreadyHereMsg,
      args: trimmedArgs,
      onDone: () => emit(alreadyHereMsg)
    });
  }
  let decision = hdl({
    requestedPath: resolvedPath,
    canonicalPath: canonicalPath
  }, Mr(toolUseContext));
  if (decision.result !== "allowed") {
    let deniedMsg = Jjp(canonicalPath, decision);
    return gv.jsx(s8t, {
      message: deniedMsg,
      args: trimmedArgs,
      onDone: () => emit(deniedMsg)
    });
  }
  let performMove = async () => {
    try {
      let metaMessage = await Yjp(canonicalPath);
      emit(`Moved to ${bt.bold(canonicalPath)}`, {
        display: "system",
        metaMessages: [metaMessage]
      });
    } catch (moveErr) {
      A(`/cd relocate failed: ${moveErr}`, {
        level: "error"
      }), emit(`Couldn't move to ${bt.bold(canonicalPath)} — the directory may no longer exist, or the session couldn't be moved. Staying in ${bt.bold(Lt())}.`);
    }
  };
  if (Dft(canonicalPath)) return await performMove(), null;
  return gv.jsx(CdTrustPrompt, {
    directory: canonicalPath,
    onConfirm: () => {
      a8t(canonicalPath), performMove();
    },
    onCancel: () => {
      emit(`Staying in ${bt.bold(Lt())}`);
    }
  });
}
var MCo, mVn, i8t, gv;
var Tdl = b(() => {
  Gc();
  Zs();
  lt();
  WB();
  Is();
  d_();
  Wo();
  Pl();
  DI();
  je();
  Pf();
  kt();
  ZR();
  tr();
  xl();
  Po();
  qe();
  Ir();
  Ct();
  Xl();
  VP();
  ia();
  po();
  Tu();
  gdl();
  gA();
  ly();
  KO();
  Uh();
  _a();
  MCo = x(tt(), 1), mVn = require("fs/promises"), i8t = require("path"), gv = x(oe(), 1);
});

export {ydl,s8t,CdTrustPrompt,jjp,Yjp,Jjp,call as Xjp,MCo,mVn,i8t,gv,Tdl};

// @ts-nocheck
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {P8e,c8t} from "../../vendor/m4501.ts";
import {Dyn,iE,GS} from "../api/2028_used.ts";
import {getMainThreadAgentType as JL,getSdkBetas as BT,getSessionId as It,getOriginalCwd as gr,getTotalCostUSD as nA,getTotalDuration as Rre,getTotalAPIDuration as kv,getTotalLinesAdded as $de,getTotalLinesRemoved as qde,lt} from "../session/0132_sent.ts";
import {getCurrentWorktreeSession as _f} from "../config/3348_flushAnalyticsSinks.ts";
import {getRuntimeMainLoopModel as w0,renderModelName as Tp,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {I1,lq} from "../../vendor/m5221.ts";
import {Zrt,mHn,g1} from "../core/2741_input_tokens.ts";
import {getCurrentSessionTitle as ph,getCurrentSessionAiTitle as FG,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {e1t,nB} from "../api/2752_status.ts";
import {createBaseHookInput as od,executeStatusLineCommand as XOo,Wd} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {BR,iO,Cp} from "../config/2223_level.ts";
import {h6,zft} from "../../vendor/m4552.ts";
import {Nu,pl,Wu} from "../../vendor/m438.ts";
import {xD,P_,po} from "../tools/5224_userPromptCount.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {ay,E$} from "../../vendor/m2821.ts";
import {FE,V1} from "../../vendor/m4006.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {getGitWorktreeName as qTr,getRemoteUrl as $K,ia} from "../../vendor/m698.ts";
import {parseGitRemote as hoe,_0} from "../../vendor/m697.ts";
import {useDebouncedCallback as u4} from "../../vendor/m2453.ts";
import {useInterval as zc} from "../../vendor/m2456.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {checkHasTrustDialogAccepted as kd,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {bx,lJ} from "../../vendor/m4620.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Cs,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Ansi as nd} from "../../vendor/m2441.ts";
import {b,x} from "../../runtime.ts";
import {V$} from "../telemetry/3911_contextWindow.ts";
import {je} from "../../vendor/m2462.ts";
import {qI} from "../session/5205_worktreeBranchName.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
class OVl {
  pending = null;
  cancelScheduledFlush = null;
  scheduleTimeout;
  onFlush;
  flushIntervalMs;
  boundFlush;
  constructor({
    scheduleTimeout: scheduleTimeoutFn,
    onFlush: onFlushFn,
    flushIntervalMs: intervalMs
  }) {
    this.scheduleTimeout = scheduleTimeoutFn, this.onFlush = onFlushFn, this.flushIntervalMs = intervalMs, this.boundFlush = this.flush.bind(this);
  }
  apply(reducer) {
    let next = reducer(this.pending);
    if (next === null) {
      this.clear();
      return;
    }
    if (this.pending = next, this.cancelScheduledFlush === null) this.cancelScheduledFlush = this.scheduleTimeout(this.boundFlush, this.flushIntervalMs);
  }
  clear() {
    this.pending = null, this.dispose(), this.onFlush(null);
  }
  peek() {
    return this.pending;
  }
  dispose() {
    if (this.cancelScheduledFlush !== null) this.cancelScheduledFlush(), this.cancelScheduledFlush = null;
  }
  flush() {
    this.cancelScheduledFlush = null, this.onFlush(this.pending);
  }
}
function LVl({
  scheduleTimeout: scheduleTimeoutFn,
  onFlush: onFlushFn,
  flushIntervalMs: intervalMs = 16
}) {
  return new OVl({
    scheduleTimeout: scheduleTimeoutFn,
    onFlush: onFlushFn,
    flushIntervalMs: intervalMs
  });
}
function NVl(onceRef, eventName, buildPayload, logFn = W) {
  if (!onceRef.current) return;
  onceRef.current = false, logFn(eventName, buildPayload());
}
async function xLm(args) {
  let {
      signal: signal,
      executeCommand: executeCommand,
      getCommandLength: getCommandLength,
      pendingResultLogRef: pendingResultLogRef,
      onResult: onResult,
      logFn = W
    } = args,
    commandLength = getCommandLength();
  try {
    let output = await executeCommand();
    if (signal.aborted) return;
    if (onResult(output), output) NVl(pendingResultLogRef, "tengu_status_line_result", () => {
      let lines = output.split(`
`),
        maxVisualWidth = 0;
      for (let line of lines) {
        let width = sn(line);
        if (width > maxVisualWidth) maxVisualWidth = width;
      }
      return {
        char_length: output.length,
        visual_width: maxVisualWidth,
        line_count: lines.length,
        command_length: commandLength
      };
    }, logFn);
  } catch {}
}
function FVl(settings) {
  return P8e(settings?.statusLine) !== undefined;
}
function DLm(usage, contextWindowSize) {
  let pct = Dyn(usage, contextWindowSize);
  return {
    total_input_tokens: usage ? usage.input_tokens + usage.cache_creation_input_tokens + usage.cache_read_input_tokens : 0,
    total_output_tokens: usage?.output_tokens ?? 0,
    context_window_size: contextWindowSize,
    current_usage: usage,
    used_percentage: pct.used,
    remaining_percentage: pct.remaining
  };
}
function PLm(permissionMode, exceeds200kTokens, fastMode, settings, messages, addedDirs, mainLoopModel, worktreeName, repo, prStatus, vimMode, sessionId, effortValue, thinkingEnabled) {
  let agentType = JL(),
    worktreeSession = _f(),
    modelId = w0({
      permissionMode: permissionMode,
      mainLoopModel: mainLoopModel,
      exceeds200kTokens: exceeds200kTokens
    }),
    outputStyle = settings?.outputStyle || I1,
    tokenUsage = Zrt(messages),
    contextWindowSize = iE(modelId, BT()),
    currentSessionId = It(),
    sessionName = ph(currentSessionId) ?? FG(currentSessionId),
    usageLimits = e1t(),
    rateLimits = {
      ...(usageLimits.five_hour && {
        five_hour: {
          used_percentage: usageLimits.five_hour.utilization * 100,
          resets_at: usageLimits.five_hour.resets_at
        }
      }),
      ...(usageLimits.seven_day && {
        seven_day: {
          used_percentage: usageLimits.seven_day.utilization * 100,
          resets_at: usageLimits.seven_day.resets_at
        }
      })
    };
  return {
    ...od(),
    cwd: sessionId,
    ...(sessionName && {
      session_name: sessionName
    }),
    model: {
      id: modelId,
      display_name: Tp(modelId)
    },
    workspace: {
      current_dir: sessionId,
      project_dir: gr(),
      added_dirs: addedDirs,
      ...(worktreeName && {
        git_worktree: worktreeName
      }),
      ...(repo && {
        repo: repo
      })
    },
    version: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION,
    output_style: {
      name: outputStyle
    },
    cost: {
      total_cost_usd: nA(),
      total_duration_ms: Rre(),
      total_api_duration_ms: kv(),
      total_lines_added: $de(),
      total_lines_removed: qde()
    },
    context_window: DLm(tokenUsage, contextWindowSize),
    exceeds_200k_tokens: exceeds200kTokens,
    fast_mode: fastMode,
    ...(BR(modelId) && {
      effort: {
        level: iO(modelId, effortValue)
      }
    }),
    thinking: {
      enabled: thinkingEnabled !== false
    },
    ...((rateLimits.five_hour || rateLimits.seven_day) && {
      rate_limits: rateLimits
    }),
    ...(h6() && {
      vim: {
        mode: vimMode ?? "INSERT"
      }
    }),
    ...(agentType && {
      agent: {
        name: agentType
      }
    }),
    ...(Nu() !== null && {
      remote: {
        session_id: It()
      }
    }),
    ...(prStatus && {
      pr: {
        number: prStatus.number,
        url: prStatus.url,
        ...(prStatus.reviewState && {
          review_state: prStatus.reviewState
        }),
        ...(prStatus.kind && {
          kind: prStatus.kind
        })
      }
    }),
    ...(worktreeSession && {
      worktree: {
        name: worktreeSession.worktreeName,
        path: worktreeSession.worktreePath,
        branch: worktreeSession.worktreeBranch,
        original_cwd: worktreeSession.originalCwd,
        original_branch: worktreeSession.originalBranch
      }
    })
  };
}
function gNo(messages) {
  return xD(messages)?.uuid ?? null;
}
function OLm({
  messagesRef: messagesRef,
  lastAssistantMessageId: lastAssistantMessageId,
  tokenUsage: tokenUsage,
  vimMode: vimMode
}) {
  let abortRef = kb.useRef(undefined),
    permissionMode = _t(state => state.toolPermissionContext.mode),
    additionalWorkingDirectories = _t(state => state.toolPermissionContext.additionalWorkingDirectories),
    statusLineText = _t(state => state.statusLineText),
    setState = bo(),
    settings = ay(),
    statusLineConfig = P8e(settings?.statusLine),
    mainLoopModel = FE(),
    fastMode = _t(state => state.fastMode ?? false),
    effortValue = _t(state => state.effortValue),
    thinkingEnabled = _t(state => state.thinkingEnabled),
    prStatus = _t(state => state.prStatus),
    settingsRef = kb.useRef(settings);
  settingsRef.current = settings;
  let statusLineConfigRef = kb.useRef(statusLineConfig);
  statusLineConfigRef.current = statusLineConfig;
  let vimModeRef = kb.useRef(vimMode);
  vimModeRef.current = vimMode;
  let permissionModeRef = kb.useRef(permissionMode);
  permissionModeRef.current = permissionMode;
  let additionalWorkingDirectoriesRef = kb.useRef(additionalWorkingDirectories);
  additionalWorkingDirectoriesRef.current = additionalWorkingDirectories;
  let mainLoopModelRef = kb.useRef(mainLoopModel);
  mainLoopModelRef.current = mainLoopModel;
  let fastModeRef = kb.useRef(fastMode);
  fastModeRef.current = fastMode;
  let effortValueRef = kb.useRef(effortValue);
  effortValueRef.current = effortValue;
  let thinkingEnabledRef = kb.useRef(thinkingEnabled);
  thinkingEnabledRef.current = thinkingEnabled;
  let prStatusRef = kb.useRef(prStatus);
  prStatusRef.current = prStatus;
  let lastInputsRef = kb.useRef({
      messageId: null,
      tokenUsage: tokenUsage,
      exceeds200kTokens: false,
      permissionMode: permissionMode,
      vimMode: vimMode,
      mainLoopModel: mainLoopModel,
      fastMode: fastMode,
      effortValue: effortValue,
      thinkingEnabled: thinkingEnabled,
      prStatus: prStatus
    }),
    forceFreshRef = kb.useRef(true),
    mountLogPendingRef = kb.useRef(true),
    resultLogPendingRef = kb.useRef(true),
    runStatusLine = kb.useCallback(async () => {
      abortRef.current?.abort();
      let abortController = new AbortController();
      abortRef.current = abortController;
      let messages = P_(messagesRef.current),
        forceFresh = forceFreshRef.current;
      forceFreshRef.current = false;
      let exceeds200kTokens = lastInputsRef.current.exceeds200kTokens,
        messageId = gNo(messages);
      if (messageId !== lastInputsRef.current.messageId) exceeds200kTokens = mHn(messages), lastInputsRef.current.messageId = messageId, lastInputsRef.current.exceeds200kTokens = exceeds200kTokens;
      let cwd = Lt(),
        [worktreeName, remoteUrl] = await Promise.all([qTr(cwd), pl() ? Promise.resolve(null) : $K()]),
        repo = remoteUrl ? hoe(remoteUrl) : null;
      await xLm({
        signal: abortController.signal,
        executeCommand: () => XOo(PLm(permissionModeRef.current, exceeds200kTokens, fastModeRef.current, settingsRef.current, messages, Array.from(additionalWorkingDirectoriesRef.current.keys()), mainLoopModelRef.current, worktreeName, repo, prStatusRef.current, vimModeRef.current, cwd, effortValueRef.current, thinkingEnabledRef.current), abortController.signal, undefined, forceFresh),
        getCommandLength: () => statusLineConfigRef.current?.command.length,
        pendingResultLogRef: resultLogPendingRef,
        onResult: output => {
          setState(prev => {
            if (prev.statusLineText === output) return prev;
            return {
              ...prev,
              statusLineText: output
            };
          });
        }
      });
    }, [messagesRef, setState]),
    debouncedRun = u4(() => {
      runStatusLine();
    }, 300);
  kb.useEffect(() => {
    if (lastAssistantMessageId !== lastInputsRef.current.messageId || tokenUsage !== lastInputsRef.current.tokenUsage || permissionMode !== lastInputsRef.current.permissionMode || vimMode !== lastInputsRef.current.vimMode || mainLoopModel !== lastInputsRef.current.mainLoopModel || fastMode !== lastInputsRef.current.fastMode || effortValue !== lastInputsRef.current.effortValue || thinkingEnabled !== lastInputsRef.current.thinkingEnabled || prStatus !== lastInputsRef.current.prStatus) lastInputsRef.current.tokenUsage = tokenUsage, lastInputsRef.current.permissionMode = permissionMode, lastInputsRef.current.vimMode = vimMode, lastInputsRef.current.mainLoopModel = mainLoopModel, lastInputsRef.current.fastMode = fastMode, lastInputsRef.current.effortValue = effortValue, lastInputsRef.current.thinkingEnabled = thinkingEnabled, lastInputsRef.current.prStatus = prStatus, debouncedRun();
  }, [lastAssistantMessageId, tokenUsage, permissionMode, vimMode, mainLoopModel, fastMode, effortValue, thinkingEnabled, prStatus, debouncedRun]);
  let refreshInterval = statusLineConfig?.refreshInterval;
  zc(debouncedRun, refreshInterval !== undefined ? Math.max(1, refreshInterval) * 1000 : null);
  let command = statusLineConfig?.command,
    isFirstCommandRun = kb.useRef(true);
  kb.useEffect(() => {
    if (isFirstCommandRun.current) {
      isFirstCommandRun.current = false;
      return;
    }
    forceFreshRef.current = true, mountLogPendingRef.current = true, resultLogPendingRef.current = true, runStatusLine();
  }, [command, runStatusLine]);
  let statusLineConfigForMount = statusLineConfig;
  kb.useEffect(() => {
    if (!statusLineConfigForMount) return;
    NVl(mountLogPendingRef, "tengu_status_line_mount", () => ({
      command_length: statusLineConfigForMount.command.length,
      padding: statusLineConfigForMount.padding
    }));
  }, [statusLineConfigForMount]);
  let trustCheckedRef = kb.useRef(false);
  kb.useEffect(() => {
    if (trustCheckedRef.current) return;
    if (!statusLineConfigForMount) return;
    if (trustCheckedRef.current = true, settings?.disableAllHooks === true) A("Status line is configured but disableAllHooks is true", {
      level: "warn"
    });
    if (!kd()) bx("statusline", 1), setState(prev => {
      if (prev.setupIssues.statuslineIssueCount === 1) return prev;
      return {
        ...prev,
        setupIssues: {
          ...prev.setupIssues,
          statuslineIssueCount: 1
        }
      };
    }), A("Status line command skipped: workspace trust not accepted", {
      level: "warn"
    });
  }, [statusLineConfigForMount, settings?.disableAllHooks, setState]), kb.useEffect(() => (runStatusLine(), () => {
    abortRef.current?.abort();
  }), []);
  let padding = statusLineConfig?.padding ?? 0;
  return ISe.jsx($, {
    paddingX: padding,
    gap: 2,
    children: statusLineText ? ISe.jsx(LLm, {
      text: statusLineText
    }) : Cs() ? ISe.jsx(v, {
      children: " "
    }) : null
  });
}
function LLm(props) {
  let memo = MVl.c(11),
    {
      text: text
    } = props,
    container,
    flexDirection,
    children,
    result;
  if (memo[0] !== text) {
    result = Symbol.for("react.early_return_sentinel");
    e: {
      let lines = FLm(text);
      if (lines.length === 1) {
        let ansiChild = ISe.jsx(nd, {
            children: text
          }),
          singleLine;
        if (memo[5] !== ansiChild) singleLine = ISe.jsx(v, {
          dimColor: true,
          wrap: "truncate",
          children: ansiChild
        }), memo[5] = ansiChild, memo[6] = singleLine;else singleLine = memo[6];
        result = singleLine;
        break e;
      }
      container = $, flexDirection = "column", children = lines.map(MLm);
    }
    memo[0] = text, memo[1] = container, memo[2] = flexDirection, memo[3] = children, memo[4] = result;
  } else container = memo[1], flexDirection = memo[2], children = memo[3], result = memo[4];
  if (result !== Symbol.for("react.early_return_sentinel")) return result;
  let element;
  if (memo[7] !== container || memo[8] !== flexDirection || memo[9] !== children) element = ISe.jsx(container, {
    flexDirection: flexDirection,
    children: children
  }), memo[7] = container, memo[8] = flexDirection, memo[9] = children, memo[10] = element;else element = memo[10];
  return element;
}
function MLm(line, index) {
  return ISe.jsx(v, {
    dimColor: true,
    wrap: "truncate",
    children: ISe.jsx(nd, {
      children: line
    })
  }, index);
}
function FLm(text) {
  let lines = text.split(`
`);
  if (lines.length === 1) return lines;
  let result = [lines[0]],
    ansiPrefix = "";
  for (let i = 1; i < lines.length; i++) ansiPrefix += (lines[i - 1].match(NLm) ?? []).join(""), result.push(ansiPrefix + lines[i]);
  return result;
}
var MVl, kb, ISe, NLm, BVl;
var _No = b(() => {
  kt();
  uo();
  lt();
  lq();
  V$();
  V1();
  E$();
  mc();
  je();
  Wu();
  nB();
  tr();
  GS();
  Po();
  qe();
  _0();
  Cp();
  tp();
  ia();
  c8t();
  Wd();
  po();
  Ro();
  _a();
  lJ();
  g1();
  qI();
  zft();
  MVl = x(tt(), 1), kb = x(et(), 1), ISe = x(oe(), 1);
  NLm = /\x1b\[[\d;]*m|\x1b\]8;[^\x07\x1b]*(?:\x07|\x1b\\)/g;
  BVl = kb.memo(OLm);
});

export {OVl,LVl,NVl,xLm,FVl,DLm,PLm,gNo,OLm,LLm,MLm,FLm,MVl,kb,ISe,NLm,BVl,_No};

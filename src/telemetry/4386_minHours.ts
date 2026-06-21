// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {dd,Dd} from "../../vendor/m687.ts";
import {xu,gf,lE,tA} from "../config/2201_tA.ts";
import {v4t,nho} from "./4377_nho.ts";
import {b3n,B8a,N8a,E3n,C3n} from "../../vendor/m4218.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Se,_o,ds,bt} from "../../vendor/m195.ts";
import {getSessionId,getOriginalCwd,lt} from "../session/0131_sent.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe,fromEnum} from "../../vendor/m5.ts";
import {_debugModuleInit,GO} from "./2241_GO.ts";
import {F8a,$8a,ipo,q8a,U8a,w3n} from "../../vendor/m4219.ts";
import {_g,ry} from "../agent/2772_withFileTypes.ts";
import {Ua,ty} from "../../vendor/m2245.ts";
import {zc,ex} from "../../vendor/m2582.ts";
import {Phi,Cyn} from "../../vendor/m2242.ts";
import {jQa,WQa} from "../../vendor/m4384.ts";
import {runForkedAgent,createCacheSafeParams,gP} from "../artifact/4405_withDisallowedCommandTools.ts";
import {Ln,e6n,lo} from "../tools/5190_userPromptCount.ts";
import {createAutoMemCanUseTool,isAllowedAutoMemWritePath,I4t} from "../tools/4382_isAllowedAutoMemWritePath.ts";
import {tpt,Xqn} from "./4380_Xqn.ts";
import {Cn,dr} from "../../vendor/m231.ts";
import {eN,oA} from "../config/2697_oA.ts";
import {Wn} from "../api/0459_getOauthConfig.ts";
import {b} from "../../runtime.ts";
/** Read auto-dream thresholds from feature flag, fallback to defaults. */
function B$p() {
  let featureValue = getFeatureValue_CACHED_MAY_BE_STALE("tengu_onyx_plover", null);
  return {
    minHours: typeof featureValue?.minHours === "number" && Number.isFinite(featureValue.minHours) && featureValue.minHours > 0 ? featureValue.minHours : VQa.minHours,
    minSessions: typeof featureValue?.minSessions === "number" && Number.isFinite(featureValue.minSessions) && featureValue.minSessions > 0 ? featureValue.minSessions : VQa.minSessions
  };
}
/** Returns true if auto-dream should run (not in API mode, pro user, v4t enabled). */
function F$p() {
  if (dd() !== null) return !1;
  if (!xu()) return !1;
  return v4t();
}
/** Always returns false \u2014 force-run override stub. */
function U$p() {
  return !1;
}
/** Initializes YQa: the async auto-dream trigger function. */
function JQa() {
  let lastScanTime = 0;
  YQa = async function (context, onFilesTouched) {
    let thresholds = B$p(),
      forceRun = U$p();
    if (!forceRun && !F$p()) return;
    let lastConsolidatedAt;
    try {
      lastConsolidatedAt = await b3n();
    } catch (err) {
      logForDebugging(`[autoDream] readLastConsolidatedAt failed: ${Se(err)}`);
      return;
    }
    let hoursSinceLast = (Date.now() - lastConsolidatedAt) / 3600000;
    if (!forceRun && hoursSinceLast < thresholds.minHours) return;
    let timeSinceLastScan = Date.now() - lastScanTime;
    if (!forceRun && timeSinceLastScan < N$p) {
      logForDebugging(`[autoDream] scan throttle \u2014 time-gate passed but last scan was ${Math.round(timeSinceLastScan / 1000)}s ago`);
      return;
    }
    lastScanTime = Date.now();
    let sessions;
    try {
      sessions = await B8a(lastConsolidatedAt);
    } catch (err) {
      logForDebugging(`[autoDream] listSessionsTouchedSince failed: ${Se(err)}`);
      return;
    }
    let currentSessionId = getSessionId();
    if (sessions = sessions.filter(sessionId => sessionId !== currentSessionId), !forceRun && sessions.length < thresholds.minSessions) {
      logForDebugging(`[autoDream] skip \u2014 ${sessions.length} sessions since last consolidation, need ${thresholds.minSessions}`), logEvent("tengu_auto_dream_skipped", {
        reason: Qe("sessions"),
        session_count: sessions.length,
        min_required: thresholds.minSessions
      });
      return;
    }
    let lockMtime;
    if (forceRun) lockMtime = lastConsolidatedAt;else {
      try {
        lockMtime = await N8a();
      } catch (err) {
        logForDebugging(`[autoDream] lock acquire failed: ${Se(err)}`);
        return;
      }
      if (lockMtime === null) {
        logEvent("tengu_auto_dream_skipped", {
          reason: Qe("lock")
        });
        return;
      }
    }
    let teamMemoryEnabled = _debugModuleInit();
    logForDebugging(`[autoDream] firing \u2014 ${hoursSinceLast.toFixed(1)}h since last, ${sessions.length} sessions to review`), logEvent("tengu_auto_dream_fired", {
      hours_since: Math.round(hoursSinceLast),
      sessions_since: sessions.length,
      team_memory_enabled: teamMemoryEnabled
    });
    let {
        taskRegistry: taskRegistry
      } = context.toolUseContext,
      abortCtrl = new AbortController(),
      taskId = F8a(taskRegistry, {
        sessionsReviewing: sessions.length,
        priorMtime: lockMtime,
        abortController: abortCtrl
      }),
      phase = "fork";
    try {
      let cwd = gf(),
        resolvedCwd = _g(getOriginalCwd()),
        dailyLogsCount = await q$p(cwd),
        hasFormattedOutput = lE(),
        toolConstraintsSuffix = hasFormattedOutput ? `

**Tool constraints for this run:** Shell access is restricted to read-only commands (\`ls\`, \`find\`, \`grep\`, \`cat\`, \`stat\`, \`wc\`, \`head\`, \`tail\`, and similar) plus deleting \`.md\` paths inside the memory directory. ${Ua} is not permitted \u2014 memories are immutable, so delete + ${zc} to replace, never edit in place. Plan your exploration with this in mind \u2014 no need to probe.` : `

**Tool constraints for this run:** Shell access is restricted to read-only commands (\`ls\`, \`find\`, \`grep\`, \`cat\`, \`stat\`, \`wc\`, \`head\`, \`tail\`, and similar) plus deleting \`.md\` paths inside the memory directory. Anything else that writes, redirects to a file, or modifies state will be denied. Plan your exploration with this in mind \u2014 no need to probe.

Sessions since last consolidation (${sessions.length}):
${sessions.map(sessionId => `- ${sessionId}`).join(`
`)}`,
        promptContent = hasFormattedOutput ? Phi(cwd, toolConstraintsSuffix, teamMemoryEnabled) : jQa(cwd, resolvedCwd, toolConstraintsSuffix, teamMemoryEnabled),
        R = !1,
        k = null,
        agentResult = await runForkedAgent({
          promptMessages: [Ln({
            content: promptContent
          })],
          cacheSafeParams: createCacheSafeParams(context),
          canUseTool: createAutoMemCanUseTool(cwd),
          querySource: "auto_dream",
          forkLabel: "auto_dream",
          skipTranscript: !0,
          overrides: {
            abortController: abortCtrl
          },
          onMessage: $$p(taskId, taskRegistry),
          skipCacheWrite: tpt()
        });
      phase = "completion", $8a(taskId, taskRegistry);
      let taskEntry = context.toolUseContext.taskRegistry.get(taskId),
        filesTouchedCount = ipo(taskEntry) ? taskEntry.filesTouched.length : 0;
      if (ipo(taskEntry) && taskEntry.filesTouched.length > 0) onFilesTouched?.({
        ...e6n(taskEntry.filesTouched),
        verb: "Improved"
      }), context.toolUseContext.setAppState(appState => ({
        ...appState,
        pendingMemoryUpdates: [...appState.pendingMemoryUpdates, {
          source: "dream",
          summary: `consolidated ${taskEntry.filesTouched.length} ${Cn(taskEntry.filesTouched.length, "memory file")}`,
          paths: taskEntry.filesTouched
        }]
      }));
      logForDebugging(`[autoDream] completed \u2014 cache: read=${agentResult.totalUsage.cache_read_input_tokens} created=${agentResult.totalUsage.cache_creation_input_tokens}`);
      let extraMetrics = null;
      logEvent("tengu_auto_dream_completed", {
        cache_read: agentResult.totalUsage.cache_read_input_tokens,
        cache_created: agentResult.totalUsage.cache_creation_input_tokens,
        output: agentResult.totalUsage.output_tokens,
        sessions_reviewed: sessions.length,
        daily_logs_found: dailyLogsCount,
        files_touched_count: filesTouchedCount,
        team_memory_enabled: teamMemoryEnabled,
        ...extraMetrics
      });
    } catch (err) {
      if (abortCtrl.signal.aborted) {
        logForDebugging("[autoDream] aborted by user");
        return;
      }
      if (logForDebugging(`[autoDream] ${phase} failed: ${Se(err)}`), logEvent("tengu_auto_dream_failed", {
        phase: fromEnum(phase),
        error_class: _o(err).name
      }), phase === "fork") q8a(taskId, taskRegistry), await E3n(lockMtime);
    }
  };
}
/** Returns an onMessage handler that tracks text output and file writes for the task. */
function $$p(taskId, taskRegistry) {
  return message => {
    if (message.type !== "assistant") return;
    let textAccum = "",
      toolUseCount = 0,
      writtenPaths = [];
    for (let contentBlock of message.message.content) if (contentBlock.type === "text") textAccum += contentBlock.text;else if (contentBlock.type === "tool_use") {
      if (toolUseCount++, contentBlock.name === Ua || contentBlock.name === zc) {
        let toolInput = contentBlock.input;
        if (typeof toolInput.file_path === "string") writtenPaths.push(toolInput.file_path);
      } else if (eN.includes(contentBlock.name)) {
        let toolInput = contentBlock.input;
        if (typeof toolInput.command === "string" && /^\s*(rm|remove-item|ri|del|erase)\b/i.test(toolInput.command)) for (let match of toolInput.command.matchAll(/"[^"]*\.md"|'[^']*\.md'|(?:\/|[A-Za-z]:[\\/])\S*\.md\b/g)) writtenPaths.push(match[0].replace(/^["']|["']$/g, ""));
      }
    }
    U8a(taskId, {
      text: textAccum.trim(),
      toolUseCount: toolUseCount
    }, writtenPaths.filter(isAllowedAutoMemWritePath), taskRegistry);
  };
}
/** Count .md files in the logs directory \u2014 used to report daily_logs_found. */
async function q$p(cwd) {
  try {
    let entries = await KQa.readdir(zQa.join(cwd, "logs"), {
      recursive: !0
    });
    return Wn(entries, entry => entry.endsWith(".md"));
  } catch (err) {
    if (!ds(err)) logForDebugging(`[autoDream] countDailyLogs: ${Se(err)}`);
    return 0;
  }
}
/** Public async entry point for auto-dream \u2014 delegates to the initialized YQa. */
async function XQa(context, onFilesTouched) {
  await YQa?.(context, onFilesTouched);
}
var KQa,
  zQa,
  N$p = 600000,
  VQa,
  YQa = null;
var iho = b(() => {
  gP();
  lo();
  oA();
  qe();
  bt();
  dr();
  Ct();
  zn();
  GO();
  tA();
  Cyn();
  nho();
  ry();
  lt();
  Dd();
  I4t();
  WQa();
  C3n();
  w3n();
  ty();
  ex();
  Xqn();
  KQa = require("fs/promises"), zQa = require("path"), VQa = {
    minHours: 24,
    minSessions: 5
  };
});
export {B$p,F$p,U$p,JQa,$$p,q$p,XQa,KQa,zQa,N$p,VQa,YQa,iho};

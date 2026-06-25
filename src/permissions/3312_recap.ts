// @ts-nocheck
import {Za as hl,nt as rt} from "../../vendor/m127.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getIsNonInteractiveSession as kr,lt as ct} from "../session/0132_sent.ts";
import {getInitialSettings as Kr,br as Er} from "../config/0745_updateSettingsForSource.ts";
import {Ne as Ge} from "../../vendor/m583.ts";
import {detectSurfaces as DIn,cOn as PIn} from "./3311_sinksFor.ts";
import {xe as Pe,He,mn as cn} from "../telemetry/0600_feature_name.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {getLastCacheSafeParams as Wae,runForkedAgent as VH,ID as hP} from "../artifact/4427_withDisallowedCommandTools.ts";
import {Mn as Ln,po as lo} from "../tools/5224_userPromptCount.ts";
import {b} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {dn as an} from "../config/0137_namespace.ts";
// @ts-nocheck
function xot() {
  let e = process.env.CLAUDE_CODE_ENABLE_AWAY_SUMMARY;
  if (hl(e)) return false;
  if (rt(e)) return true;
  if (!ut("tengu_sedge_lantern", true)) return false;
  if (kr()) return false;
  if (Kr()?.awaySummaryEnabled === false) return false;
  return true;
}
function r6d() {
  let e = Ge.CLAUDE_CODE_ENABLE_REMOTE_RECAP;
  if (e !== undefined) return e;
  return ut("tengu_harbor_moth", false);
}
function isAwaySummaryEnabled(e) {
  if (!e.onMetadataChanged) return;
  if (!DIn().has("ccr") || !r6d()) return;
  maybeGenerateCcrRecap(e);
}
function isRemoteRecapEnabled() {
  OIn?.abort(), OIn = null;
}
async function maybeGenerateCcrRecap(sessionState) {
  OIn?.abort();
  let t = new AbortController();
  OIn = t;
  let n = await cancelCcrRecap(t.signal);
  if (t.signal.aborted) return;
  if (n.kind !== "ok") {
    if (n.kind !== "no-turn") Pe("ccr_recap_generate", n.kind);
    return;
  }
  if (sessionState.getState() === "running") {
    v("[awaySummary] ccr recap dropped: new turn already running");
    return;
  }
  sessionState.notifyMetadataChanged({
    recap: n.text
  }), He("ccr_recap_generate");
}
async function cancelCcrRecap(e) {
  let t = Wae();
  if (!t) return v("[awaySummary] no CacheSafeParams saved, skipping"), {
    kind: "no-turn"
  };
  let n = new AbortController();
  e.addEventListener("abort", () => n.abort(), {
    once: true
  });
  try {
    let {
      messages: r
    } = await VH({
      promptMessages: [Ln({
        content: s6d
      })],
      cacheSafeParams: t,
      overrides: {
        abortController: n
      },
      canUseTool: async () => ({
        behavior: "deny",
        message: "Away summary cannot use tools",
        decisionReason: {
          type: "other",
          reason: "away_summary"
        }
      }),
      querySource: "away_summary",
      forkLabel: "away_summary",
      maxTurns: 1,
      skipCacheWrite: true,
      skipTranscript: true
    });
    if (e.aborted) return {
      kind: "aborted"
    };
    let o = r.find(i => i.type === "assistant" && i.isApiErrorMessage);
    if (o) return {
      kind: "api-error",
      text: generateCcrRecap([o], true)
    };
    let s = generateCcrRecap(r, false);
    return s ? {
      kind: "ok",
      text: s
    } : {
      kind: "failed"
    };
  } catch (r) {
    if (e.aborted) return {
      kind: "aborted"
    };
    return v(`[awaySummary] generation failed: ${r}`), {
      kind: "failed"
    };
  }
}
function generateCcrRecap(sessionState, t) {
  return sessionState.flatMap(n => n.type === "assistant" && (t || !n.isApiErrorMessage) ? n.message.content : []).filter(n => n.type === "text").map(n => "text" in n ? n.text : "").join("").trim();
}
var OIn = null,
  s6d = "The user stepped away and is coming back. Recap in under 40 words, 1-2 plain sentences, no markdown. Lead with the overall goal and current task, then the one next action. Skip root-cause narrative, fix internals, secondary to-dos, and em-dash tangents.";
var initRecapModule = b(() => {
  ct();
  PIn();
  je();
  Or();
  an();
  hP();
  lo();
  Er();
  cn();
  Yn();
});
export {xot as zit,r6d as mQd,isAwaySummaryEnabled as Cfa,isRemoteRecapEnabled as Afa,maybeGenerateCcrRecap as fQd,cancelCcrRecap as gBt,generateCcrRecap as Efa,OIn as uOn,s6d as hQd,initRecapModule as A3e};

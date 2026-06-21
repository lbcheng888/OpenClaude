// @ts-nocheck
import {_l as hl,st as rt} from "../../vendor/m5.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getIsNonInteractiveSession as kr,lt as ct} from "../session/0131_sent.ts";
import {getInitialSettings as Kr,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {detectSurfaces as DIn,_0n as PIn} from "./3295_sinksFor.ts";
import {Oe as Pe,Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {getLastCacheSafeParams as Wae,runForkedAgent as VH,gP as hP} from "../artifact/4405_withDisallowedCommandTools.ts";
import {Ln,lo} from "../tools/5190_userPromptCount.ts";
import {b} from "../../runtime.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {sn as an} from "../config/0047_namespace.ts";
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

export {xot as zot,r6d as w8d,isAwaySummaryEnabled as haa,isRemoteRecapEnabled as gaa,maybeGenerateCcrRecap as R8d,cancelCcrRecap as F1t,generateCcrRecap as Aaa,OIn as y0n,s6d as x8d,initRecapModule as m9e};

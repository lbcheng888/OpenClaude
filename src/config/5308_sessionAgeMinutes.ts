// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {oK,dn} from "./0137_namespace.ts";
import {formatTokens as el,Xo} from "../../vendor/m240.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {hr} from "../../vendor/m2573.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {TS} from "../../vendor/m4541.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/* Decides whether a long resumed session should prompt for summary resume. */
/* Restored Claude Code 2.1.190 module: Resume-age warning calculation and dialog.
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
function YVl(messages: any, estimateTokens: any): any {
  if (!it("tengu_gleaming_fair", !1)) return null;
  if (Ot().resumeReturnDismissed) return null;
  let thresholdMinutes = oK(process.env.CLAUDE_CODE_RESUME_THRESHOLD_MINUTES, 70),
    tokenThreshold = oK(process.env.CLAUDE_CODE_RESUME_TOKEN_THRESHOLD, 1e5),
    cutoff = Date.now() - 60000,
    lastTimestamp = messages.findLast((entry: any): any => (entry.type === "user" || entry.type === "assistant") && Date.parse(entry.timestamp) < cutoff)?.timestamp;
  if (!lastTimestamp) return null;
  let ageMinutes = (Date.now() - Date.parse(lastTimestamp)) / 60000;
  if (ageMinutes < thresholdMinutes) return null;
  let tokens = estimateTokens(messages);
  if (tokens < tokenThreshold) return null;
  return {
    sessionAgeMinutes: ageMinutes,
    estimatedTokens: tokens
  };
}
/* Dialog asking whether to resume a long session from summary or full history. */
function JVl(props: any): any {
  let cache = jVl.c(16),
    {
      sessionAgeMinutes: ageMinutes,
      estimatedTokens: tokens,
      onDone: onDone
    } = props,
    ageLabel: any;
  if (cache[0] !== ageMinutes) ageLabel = BLm(ageMinutes), cache[0] = ageMinutes, cache[1] = ageLabel;else ageLabel = cache[1];
  let ageText = ageLabel,
    tokenLabel: any;
  if (cache[2] !== tokens) tokenLabel = el(tokens), cache[2] = tokens, cache[3] = tokenLabel;else tokenLabel = cache[3];
  let summaryText = `This session is ${ageText} old and ${tokenLabel} tokens.`,
    handleCancel: any;
  if (cache[4] !== onDone) handleCancel = (): any => onDone("dismiss"), cache[4] = onDone, cache[5] = handleCancel;else handleCancel = cache[5];
  let warningNode: any;
  if (cache[6] === Symbol.for("react.memo_cache_sentinel")) warningNode = K_t.jsx($, {
    flexDirection: "column",
    children: K_t.jsx(v, {
      children: "Resuming the full session will consume a substantial portion of your usage limits. We recommend resuming from a summary."
    })
  }), cache[6] = warningNode;else warningNode = cache[6];
  let compactOption: any;
  if (cache[7] === Symbol.for("react.memo_cache_sentinel")) compactOption = {
    value: "compact",
    label: "Resume from summary (recommended)"
  }, cache[7] = compactOption;else compactOption = cache[7];
  let continueOption: any;
  if (cache[8] === Symbol.for("react.memo_cache_sentinel")) continueOption = {
    value: "continue",
    label: "Resume full session as-is"
  }, cache[8] = continueOption;else continueOption = cache[8];
  let options: any;
  if (cache[9] === Symbol.for("react.memo_cache_sentinel")) options = [compactOption, continueOption, {
    value: "never",
    label: "Don't ask me again"
  }], cache[9] = options;else options = cache[9];
  let selectNode: any;
  if (cache[10] !== onDone) selectNode = K_t.jsx(hr, {
    options: options,
    onChange: (choice: any): any => onDone(choice)
  }), cache[10] = onDone, cache[11] = selectNode;else selectNode = cache[11];
  let dialogNode: any;
  if (cache[12] !== summaryText || cache[13] !== handleCancel || cache[14] !== selectNode) dialogNode = K_t.jsxs(Jn, {
    title: summaryText,
    onCancel: handleCancel,
    children: [warningNode, selectNode]
  }), cache[12] = summaryText, cache[13] = handleCancel, cache[14] = selectNode, cache[15] = dialogNode;else dialogNode = cache[15];
  return dialogNode;
}
/** Formats a session age in minutes as a compact "Xm" / "Xh Ym" / "Xd Yh" label. */
function BLm(minutes: any): any {
  if (minutes < 60) return `${Math.floor(minutes)}m`;
  let hours = Math.floor(minutes / 60);
  if (hours < 24) {
    let remMinutes = Math.floor(minutes % 60);
    return remMinutes === 0 ? `${hours}h` : `${hours}h ${remMinutes}m`;
  }
  let days = Math.floor(hours / 24),
    remHours = hours % 24;
  return remHours === 0 ? `${days}d` : `${days}d ${remHours}h`;
}
var jVl: any, K_t: any;
var XVl = b((): any => {
  je();
  jn();
  tr();
  dn();
  Xo();
  TS();
  di();
  jVl = x(tt(), 1), K_t = x(oe(), 1);
});
export {YVl,JVl,BLm,jVl,K_t,XVl};

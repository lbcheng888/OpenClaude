// @ts-nocheck
import {b} from "../../runtime.ts";
import {Wi as na,Hn as bn} from "../../vendor/m100.ts";
import {jn as Yn,getFeatureValue_CACHED_MAY_BE_STALE as ut} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Xl as mc,Nyr as ymr} from "./0651_maxBytes.ts";
// @ts-nocheck
function getEnvMaxOutputTokens() {
  let rawEnv = process.env.CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS;
  if (rawEnv) {
    let parsed = parseInt(rawEnv, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return;
}
var DEFAULT_MAX_TOKENS = 25000,
  MaxFileReadTokenExceededError,
  getFileReadConfig,
  getTabReadSepFlag;
var CWH = b(() => {
  na();
  Yn();
  mc();
  MaxFileReadTokenExceededError = class MaxFileReadTokenExceededError extends Error {
    tokenCount;
    maxTokens;
    constructor(tokenCount, maxTokens) {
      super(`File content (${tokenCount} tokens) exceeds maximum allowed tokens (${maxTokens}). Use offset and limit parameters to read specific portions of the file, or search for specific content instead of reading the whole file.`);
      this.tokenCount = tokenCount;
      this.maxTokens = maxTokens;
      this.name = "MaxFileReadTokenExceededError";
    }
  };
  getFileReadConfig = bn(() => {
    let e = ut("tengu_amber_wren", {}),
      t = typeof e?.maxSizeBytes === "number" && Number.isFinite(e.maxSizeBytes) && e.maxSizeBytes > 0 ? e.maxSizeBytes : ymr,
      r = getEnvMaxOutputTokens() ?? (typeof e?.maxTokens === "number" && Number.isFinite(e.maxTokens) && e.maxTokens > 0 ? e.maxTokens : DEFAULT_MAX_TOKENS),
      o = typeof e?.includeMaxSizeInPrompt === "boolean" ? e.includeMaxSizeInPrompt : undefined,
      s = typeof e?.targetedRangeNudge === "boolean" ? e.targetedRangeNudge : undefined;
    return {
      maxSizeBytes: t,
      maxTokens: r,
      includeMaxSizeInPrompt: o,
      targetedRangeNudge: s
    };
  }), getTabReadSepFlag = bn(() => ut("tengu_tab_read_sep", false));
});
export {getEnvMaxOutputTokens as pKd,DEFAULT_MAX_TOKENS as dKd,MaxFileReadTokenExceededError as Fae,getFileReadConfig as $ge,getTabReadSepFlag as V9e,CWH as MHe};

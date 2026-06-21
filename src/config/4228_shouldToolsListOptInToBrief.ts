// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {je} from "../../vendor/m577.ts";
import {bK,getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {BRIEF_TOOL_NAME,LEGACY_BRIEF_TOOL_NAME,j$} from "../../vendor/m2692.ts";
import {isPewterOwlTool,isPewterOwlBrief,cXe} from "./2026_isPewterOwlTool.ts";
import {getUserMsgOptIn,lt} from "../session/0131_sent.ts";
import {Lr} from "../../vendor/m578.ts";
/** Namespace registration object for this module's exports. */
var nJ = {};

// Register all exports onto the module namespace
isFullscreenWithTTY(nJ, {
  shouldToolsListOptInToBrief: () => shouldToolsListOptInToBrief,
  isBriefEntitled: () => isBriefEntitled,
  isBriefEnabled: () => isBriefEnabled,
  getBriefEnforceText: () => getBriefEnforceText
});

/** Returns true if the current session is entitled to use Brief mode (env flag or GrowthBook feature). */
function isBriefEntitled() {
  return je.CLAUDE_CODE_BRIEF || bK("tengu_kairos_brief", !1, pPp);
}

/** Returns true if the tools list should opt into Brief mode - requires Brief tool present and entitled. */
function shouldToolsListOptInToBrief(toolNames: any) {
  if (!toolNames.includes(BRIEF_TOOL_NAME) && !toolNames.includes(LEGACY_BRIEF_TOOL_NAME)) return !1;
  if (isPewterOwlTool()) return !1;
  return isBriefEntitled();
}

/** Returns true if Brief mode is currently active (user opted in and entitled, or PewterOwl brief mode). */
function isBriefEnabled() {
  return getUserMsgOptIn() && isBriefEntitled() || isPewterOwlBrief();
}

/** Returns the enforce text for Brief mode stop hook, falling back to the default template if not configured. */
function getBriefEnforceText() {
  let featureText = getFeatureValue_CACHED_MAY_BE_STALE("tengu_kairos_brief_stop_hook_text", "");
  return typeof featureText === "string" && featureText.length > 0 ? featureText : fPp;
}

/** GrowthBook cache TTL for Brief entitlement check (5 minutes in ms). */
var pPp = 300000,
  fPp: any;

// Lazy initializer: builds the default Brief mode reminder text using the BRIEF_TOOL_NAME constant
var L9 = b(() => {
  lt();
  zn();
  Lr();
  cXe();
  j$();
  fPp = `In brief mode, plain assistant text is hidden from the user \u2014 only ${BRIEF_TOOL_NAME} reaches them. Call it now with your substantive reply for this turn. Do not mention this reminder; the message should read as if you wrote it unprompted, addressing only what the user actually asked. If you genuinely have nothing useful to tell the user, you may end the turn without calling it.`;
});
export {nJ,isBriefEntitled,shouldToolsListOptInToBrief,isBriefEnabled,getBriefEnforceText,pPp,fPp,L9};

// @ts-nocheck
import {isFullscreenWithTTY as J_,ro as g8,b as L} from "../../runtime.ts";
import {TOOL_SEARCH_TOOL_NAME as V$,zAe as w$H,j$ as yC,HRe as A$H} from "../../vendor/m2692.ts";
import {yNi as Tv7,_z as qr} from "../telemetry/2692__z.ts";
import {Cs as h9,Ph as rY} from "../../vendor/m2224.ts";
import {LRe as fWH,qNi as Nv7} from "../permissions/2706_isInForkChild.ts";
import {V5 as AQ} from "../session/2687_aee.ts";
import {Ren as st_,xH as dR} from "./0580_xH.ts";
import {Mh as kY,GAe as $$H} from "../core/2689_GAe.ts";
import {VAe as Y$H,KAe as mbH} from "./2691_reason.ts";
import {Zfi as _z7,SFe as VsH} from "../../vendor/m2201.ts";
import {rwn as J26} from "../../vendor/m2693.ts";
// @ts-nocheck
var CU8 = {};
J_(CU8, {
  isDeferredTool: () => isDeferredTool,
  getPrompt: () => getToolSearchPrompt,
  formatDeferredToolLine: () => formatDeferredToolLine,
  TOOL_SEARCH_TOOL_NAME: () => V$
});
function isDeferredTool(tool) {
  if (tool.alwaysLoad === true) return false;
  if (Tv7().includes(tool.name)) return false;
  if (tool.isMcp === true) return true;
  if (tool.name === V$) return false;
  if (tool.name === h9) {
    if ((fWH(), g8(Nv7)).isForkSubagentEnabled()) return false;
  }
  if (tool.name === briefToolName) return false;
  if (tool.name === sendUserFileToolName) return false;
  if (tool.name === AQ && st_()) return false;
  if (tool.name === kY && Y$H()) return false;
  if (tool.name === w$H && process.env.CLAUDE_CODE_SESSION_KIND === "bg") return false;
  return tool.shouldDefer === true;
}
function formatDeferredToolLine(tool) {
  return tool.name;
}
function getToolSearchPrompt() {
  return toolSearchPromptPrefix + (_z7() ? toolSearchSuffixInternal : toolSearchSuffixPublic) + toolSearchQueryForms;
}
var briefToolName,
  sendUserFileToolName,
  toolSearchPromptPrefix = `Fetches full schema definitions for deferred tools so they can be called.

Deferred tools appear by name in <system-reminder> messages.`,
  toolSearchSuffixPublic = " Until fetched, only the name is known \u2014 there is no parameter schema, so the tool cannot be invoked.",
  toolSearchSuffixInternal = ` Until fetched, only the name is known \u2014 there is no parameter schema, so calling the tool fails with InputValidationError. When any instruction, system reminder, or other tool's description names a deferred tool, fetch it with query "select:<name>" before calling it.`,
  toolSearchQueryForms = ` This tool takes a query, matches it against the deferred tool list, and returns the matched tools' complete JSONSchema definitions inside a <functions> block. Once a tool's schema appears in that result, it is callable exactly like any tool defined at the top of the prompt.

Result format: each matched tool appears as one <function>{"description": "...", "name": "...", "parameters": {...}}</function> line inside the <functions> block \u2014 the same encoding as the tool list at the top of this prompt.

Query forms:
- "select:Read,Edit,Grep" \u2014 fetch these exact tools by name
- "notebook jupyter" \u2014 keyword search, up to max_results best matches
- "+slack send" \u2014 require "slack" in the name, rank by remaining terms`;
var JQ = L(() => {
  mbH();
  dR();
  VsH();
  qr();
  rY();
  $$H();
  briefToolName = (yC(), g8(A$H)).BRIEF_TOOL_NAME, sendUserFileToolName = g8(J26).SEND_USER_FILE_TOOL_NAME;
});

export {CU8 as Djr,isDeferredTool,formatDeferredToolLine,getToolSearchPrompt as cwn,briefToolName as UCd,sendUserFileToolName as $Cd,toolSearchPromptPrefix as qCd,toolSearchSuffixPublic as jCd,toolSearchSuffixInternal as WCd,toolSearchQueryForms as GCd,JQ as Y5};

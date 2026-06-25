// @ts-nocheck
import {ft as J_,oo as g8,b as L} from "../../runtime.ts";
import {qh as V$,lge as w$H,parsePermissionRule as yC,fke as A$H} from "../../vendor/m2704.ts";
import {o3i as Tv7,Gz as qr} from "../telemetry/2704_Gz.ts";
import {ls as h9,fg as rY} from "../../vendor/m2232.ts";
import {Tke as fWH,w3i as Nv7} from "../permissions/2718_isInForkChild.ts";
import {aW as AQ} from "../session/2699_oee.ts";
import {lrn as st_,rI as dR} from "./0586_rI.ts";
import {react as kY,sge as $$H} from "../core/2701_sge.ts";
import {ige as Y$H,age as mbH} from "./2703_reason.ts";
import {ebi as _z7,yUe as VsH} from "../../vendor/m2208.ts";
import {Kkn as J26} from "../../vendor/m2705.ts";
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
export {CU8 as cKr,isDeferredTool,formatDeferredToolLine,getToolSearchPrompt as Qkn,briefToolName as _Od,sendUserFileToolName as yOd,toolSearchPromptPrefix as TOd,toolSearchSuffixPublic as SOd,toolSearchSuffixInternal as bOd,toolSearchQueryForms as EOd,JQ as zz};

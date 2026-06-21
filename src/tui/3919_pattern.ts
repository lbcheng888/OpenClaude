// @ts-nocheck
import {Id as Md,CB as AB,mc} from "../config/0645_maxBytes.ts";
import {Dl as Ol,lo} from "../tools/5190_userPromptCount.ts";
import {Gn as qn,sc as rc} from "../../vendor/m2455.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {wC as SC,jq as Hq} from "./3282_result.tsx";
import {truncate as Ga} from "../../vendor/m237.ts";
import {yP as _P} from "../telemetry/2780_eventName.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {ps as ds} from "../../vendor/m238.ts";
import {Jge as Pge,UL as IL} from "../tools/3918_items.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function nOa() {
  return "Search";
}
function rOa({
  pattern: e,
  path: t
}, {
  verbose: n
}) {
  if (!e) return null;
  if (!t) return `pattern: "${e}"`;
  return `pattern: "${e}", path: "${n ? t : Md(t)}"`;
}
function userFacingName(e, {
  verbose: t
}) {
  if (!t && typeof e === "string" && Ol(e, "tool_use_error")) {
    if (Ol(e, "tool_use_error")?.includes(AB)) return reactInterop.default.createElement(qn, null, reactInterop.default.createElement(w, {
      color: "error"
    }, "File not found"));
    return reactInterop.default.createElement(qn, null, reactInterop.default.createElement(w, {
      color: "error"
    }, "Error searching files"));
  }
  return reactInterop.default.createElement(SC, {
    result: e,
    verbose: t
  });
}
function renderToolUseMessage(e) {
  if (!e?.pattern) return null;
  return Ga(e.pattern, _P);
}
var reactInterop, renderToolResultMessage;
var initGlobToolRenderers = b(() => {
  rc();
  lo();
  Hq();
  Je();
  mc();
  ds();
  Pge();
  reactInterop = L(Te(), 1);
  renderToolResultMessage = IL.renderToolResultMessage;
});

export {nOa as ALa,rOa as hLa,userFacingName as gLa,renderToolUseMessage as lio,reactInterop as Xlt,renderToolResultMessage as _La,initGlobToolRenderers as yLa};

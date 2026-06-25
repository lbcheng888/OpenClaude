// @ts-nocheck
import {getAPIProvider as Hr,Ps as si} from "../api/1287_usesFirstPartyModelIds.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function v_n(e) {
  if (Hr() === "vertex") return w17;
  if (e?.isNonInteractive) {
    if (e.hasAppendSystemPrompt) return f17;
    return AQ5;
  }
  return w17;
}
var w17 = "You are Claude Code, Anthropic's official CLI for Claude.",
  f17 = "You are Claude Code, Anthropic's official CLI for Claude, running within the Claude Agent SDK.",
  AQ5 = "You are a Claude agent, built on Anthropic's Claude Agent SDK.",
  AQ5_2,
  Z$6;
var R$6 = b(() => {
  si();
  AQ5_2 = [w17, f17, AQ5], Z$6 = new Set(AQ5_2);
});
export {v_n as Kbn,w17 as J$r,f17 as zbi,AQ5 as jbi,AQ5_2 as Cld,Z$6 as Vbn,R$6 as zbn};

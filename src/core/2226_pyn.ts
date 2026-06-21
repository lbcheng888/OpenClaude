// @ts-nocheck
import {getAPIProvider as Hr,li as si} from "../api/1282_usesFirstPartyModelIds.ts";
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

export {v_n as dyn,w17 as yBr,f17 as KAi,AQ5 as zAi,AQ5_2 as ZXu,Z$6 as uyn,R$6 as pyn};

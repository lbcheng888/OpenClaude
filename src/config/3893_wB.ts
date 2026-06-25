// @ts-nocheck
import {b} from "../../runtime.ts";
/** Sanitize a model name: strip unsafe chars, cap at 128 chars. */
function hlt(modelName) {
  let sanitized = modelName.replace(/[^A-Za-z0-9._:/@[\]-]/g, "");
  if (sanitized.length === 0) return "(unrecognized model name)";
  return sanitized.length > 128 ? `${sanitized.slice(0, 128)}…` : sanitized;
}

/** Build a human-readable message when a restricted model is replaced by a fallback. */
function _te(requestedModel, fallbackModel) {
  return `Model "${hlt(requestedModel)}" is restricted by your organization's settings. Using ${hlt(fallbackModel)} instead.`;
}

/** Generate a unique swarm session name based on the current process PID. */
function VUt() {
  return `claude-swarm-${process.pid}`;
}
var np = "team-lead",
  bDa,
  $W = "claude-swarm",
  glt = "swarm-view",
  qW = "tmux",
  Zoo = "claude-hidden",
  WHe = "cat",
  _lt = "CLAUDE_CODE_TEAMMATE_COMMAND";

/** Lazy-init: compile the agent-name validation regex once on first access. */
var aU = b(() => {
  bDa = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;
});
export {hlt as hut,_te as mte,VUt as T9t,np as Dd,bDa as zFa,$W as lG,glt as gut,qW as cG,Zoo as Vco,WHe as O0e,_lt as _ut,aU as wB};

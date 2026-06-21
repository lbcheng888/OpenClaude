// @ts-nocheck
import {Ep as jO} from "../../vendor/m4028.ts";
import {getSessionId as v_,lt as w_} from "../session/0131_sent.ts";
import {hasHookForEvent as mV,createBaseHookInput as L3,executeHooks as uP,yp as YO} from "../tools/5171_shouldSkipHookDueToTrust.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
/**
 * Hook event generators for tool, batch, permission-denied, and permission-request phases.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Cross-module generator: emit PreToolUse hook events. */
async function* pI_(H: any, _: any, q: any, K: any, O: any, T: any, z: any = jO) : any {
  let $ = K.getAppState(),
    Y = K.agentId ?? v_();
  if (!mV("PreToolUse", $, Y)) return;
  N(`executePreToolHooks called for tool: ${H}`, {
    level: "verbose"
  });
  let A = {
    ...L3(O, void 0, K),
    hook_event_name: "PreToolUse",
    tool_name: H,
    tool_input: q,
    tool_use_id: _
  };
  yield* uP({
    hookInput: A,
    toolUseID: _,
    matchQuery: H,
    signal: T,
    timeoutMs: z,
    toolUseContext: K
  });
}
/** Cross-module generator: emit PostToolUse hook events. */
async function* BI_(H: any, _: any, q: any, K: any, O: any, T: any, z: any, $: any = jO, Y: any) : any {
  let A = {
    ...L3(T, void 0, O),
    hook_event_name: "PostToolUse",
    tool_name: H,
    tool_input: q,
    tool_response: K,
    tool_use_id: _,
    duration_ms: Y
  };
  yield* uP({
    hookInput: A,
    toolUseID: _,
    matchQuery: H,
    signal: z,
    timeoutMs: $,
    toolUseContext: O
  });
}
/** Cross-module generator: emit PostToolUseFailure hook events. */
async function* UI_(H: any, _: any, q: any, K: any, O: any, T: any, z: any, $: any, Y: any = jO, A: any) : any {
  let w = O.getAppState(),
    f = O.agentId ?? v_();
  if (!mV("PostToolUseFailure", w, f)) return;
  let j = {
    ...L3(z, void 0, O),
    hook_event_name: "PostToolUseFailure",
    tool_name: H,
    tool_input: q,
    tool_use_id: _,
    error: K,
    is_interrupt: T,
    duration_ms: A
  };
  yield* uP({
    hookInput: j,
    toolUseID: _,
    matchQuery: H,
    signal: $,
    timeoutMs: Y,
    toolUseContext: O
  });
}
/** Cross-module generator: emit PostToolBatch hook events. */
async function* $u_(H: any, _: any, q: any, K: any, O: any, T: any = jO) : any {
  let z = q.getAppState(),
    $ = q.agentId ?? v_();
  if (!mV("PostToolBatch", z, $)) return;
  let Y = {
    ...L3(K, void 0, q),
    hook_event_name: "PostToolBatch",
    tool_calls: H
  };
  yield* uP({
    hookInput: Y,
    toolUseID: _,
    signal: O,
    timeoutMs: T,
    toolUseContext: q
  });
}
/** Cross-module generator: emit PermissionDenied hook events. */
async function* wx_(H: any, _: any, q: any, K: any, O: any, T: any, z: any, $: any = jO) : any {
  let Y = O.getAppState(),
    A = O.agentId ?? v_();
  if (!mV("PermissionDenied", Y, A)) return;
  let w = {
    ...L3(T, void 0, O),
    hook_event_name: "PermissionDenied",
    tool_name: H,
    tool_input: q,
    tool_use_id: _,
    reason: K
  };
  yield* uP({
    hookInput: w,
    toolUseID: _,
    matchQuery: H,
    signal: z,
    timeoutMs: $,
    toolUseContext: O
  });
}
/** Cross-module generator: emit PermissionRequest hook events. */
async function* m$H(H: any, _: any, q: any, K: any, O: any, T: any, z: any, $: any = jO) : any {
  N(`executePermissionRequestHooks called for tool: ${H}`);
  let Y = {
    ...L3(O, void 0, K),
    hook_event_name: "PermissionRequest",
    tool_name: H,
    tool_input: q,
    permission_suggestions: T
  };
  yield* uP({
    hookInput: Y,
    toolUseID: _,
    matchQuery: H,
    signal: z,
    timeoutMs: $,
    toolUseContext: K
  });
}
var dL4 = L(() => {
  w_();
  FH();
  YO();
});
export {pI_ as executePreToolHooks,BI_ as executePostToolHooks,UI_ as executePostToolUseFailureHooks,$u_ as executePostToolBatchHooks,wx_ as executePermissionDeniedHooks,m$H as executePermissionRequestHooks,dL4 as x1l};

// @ts-nocheck
import {rmt as Hut,Vye as l_e,Hqt as j9t} from "../../vendor/m4253.ts";
import {J6n as r3n,omt as Iut} from "../mcp/4256_current.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Pi as Xi,Mo as Xo,vu as od} from "../mcp/2200_mcpServerName.ts";
import {Bo as us} from "../../vendor/m5.ts";
import {Y6n as n3n,j6n as t3n,K6n as Z9n,z6n as e3n,f_o as mdo} from "./4255_toolName.ts";
import {fS as mS,po as lo} from "./5224_userPromptCount.ts";
import {Jja as f8a,Xja as A8a} from "../../vendor/m4256.ts";
import {G6n as Q9n,d_o as ddo} from "../../vendor/m4252.ts";
import {qt as Wt,tn as Xt} from "../config/0230_encoding.ts";
import {allTools as A_,XL as wM,Ct as St} from "../../vendor/m197.ts";
import {SandboxManager as zo,Uh as dg} from "../../vendor/m2682.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function exK(toolName, errorMessage) {
  return {
    error: errorMessage
  };
}
function kKq(tools, queryContext, toolUseContext, assistantMessage, emitProgress) {
  let wrappers = {},
    callLog = [],
    allTools = [...queryContext.options.tools, ...tools];
  for (let tool of tools) wrappers[tool.name] = z2O(tool, queryContext, toolUseContext, assistantMessage, callLog, allTools, emitProgress);
  return wrappers;
}
function z2O(tool, queryContext, toolUseContext, assistantMessage, callLog, allTools, emitProgress) {
  let runToolCall = async (input, options) => {
    let toolUseId = options?.toolUseID ?? `repl_${HuK.randomUUID()}`,
      fail = errorMessage => (callLog.push({
        id: toolUseId,
        name: tool.name,
        input: input
      }), emitProgress?.({
        type: "progress",
        toolUseID: toolUseId,
        data: {
          type: "repl_tool_call",
          toolName: tool.name,
          toolInput: input,
          toolUseId: toolUseId,
          phase: "error",
          error: errorMessage
        }
      }), exK(tool.name, errorMessage)),
      p = (A, h) => emitProgress?.({
        type: "progress",
        toolUseID: toolUseId,
        data: {
          type: "repl_tool_call",
          toolName: tool.name,
          toolInput: A,
          toolUseId: toolUseId,
          phase: "executing",
          nativeTimeoutMs: h
        }
      });
    emitProgress?.({
      type: "progress",
      toolUseID: toolUseId,
      data: {
        type: "repl_tool_call",
        toolName: tool.name,
        toolInput: input,
        toolUseId: toolUseId,
        phase: "start"
      }
    });
    let callStartTime = input,
      f;
    try {
      let A = tool.inputSchema.safeParse(input);
      if (!A.success) return fail(Hut(tool.name, A.error));
      let h = A.data,
        g = r3n(tool, queryContext);
      if (g.denyMessage) return j("tengu_tool_use_isolation_latch_denied", {
        toolName: Xi(tool.name),
        toolUseID: toolUseId,
        isMcp: tool.isMcp ?? false,
        isolationLatch: us(g.activeLatch),
        isolationClassifiedAs: us(g.classifiedAs),
        replInnerCall: true
      }), fail(g.denyMessage);
      let _ = h,
        y,
        T;
      for await (let D of n3n(queryContext, tool, h, toolUseId, assistantMessage.message.id, assistantMessage.requestId, undefined, undefined)) {
        if (D.type === "hookPermissionResult") y = D.hookPermissionResult;
        if (D.type === "hookUpdatedInput") _ = D.updatedInput;
        if (D.type === "stopReason") T = D.stopReason;
        if (D.type === "stop") return fail(T ?? "Blocked by PreToolUse hook");
      }
      let S = {
          ...queryContext,
          options: {
            ...queryContext.options,
            tools: allTools
          },
          messages: [...queryContext.messages, ...callLog.map(D => mS({
            content: [{
              type: "tool_use",
              id: D.id,
              name: D.name,
              input: D.input
            }],
            isVirtual: true
          }))]
        },
        C = await t3n(y, tool, _, S, toolUseContext, assistantMessage, toolUseId),
        R = C.decision;
      if (_ = C.input, R.behavior !== "allow") {
        queryContext.onPermissionDenial?.(tool, toolUseId, _);
        let D = R.behavior === "deny" ? R.message ?? "Permission denied" : "Permission denied";
        return fail(`Permission denied for ${tool.name}: ${D}`);
      }
      if (callStartTime = R.updatedInput ?? _, tool.name === Xo && callStartTime && typeof callStartTime === "object" && "_simulatedSedEdit" in callStartTime) {
        let {
          _simulatedSedEdit: D,
          ...M
        } = callStartTime;
        callStartTime = M;
      }
      let k = f8a(tool, callStartTime);
      p(callStartTime, k), j("tengu_repl_inner_executing", {
        toolName: Xi(tool.name),
        nativeTimeoutMs: k,
        isMcp: tool.isMcp ?? false
      }), f = Date.now();
      let x = await tool.call(callStartTime, {
          ...queryContext,
          toolUseId: toolUseId,
          userModified: R.userModified ?? false,
          fileReadingLimits: {
            maxTokens: 1 / 0,
            maxSizeBytes: 268435456
          },
          globLimits: {
            maxResults: 25000
          }
        }, toolUseContext, assistantMessage),
        I = Date.now() - f;
      p(callStartTime, undefined);
      let H = false;
      for await (let D of Z9n(queryContext, tool, toolUseId, assistantMessage.message.id, callStartTime, x.data, assistantMessage.requestId, undefined, undefined, I)) if (H = true, "updatedToolOutput" in D && tool.outputSchema?.safeParse(D.updatedToolOutput)?.success !== false) x.data = D.updatedToolOutput;
      if (H) Q9n(tool.name, toolUseId, callStartTime, queryContext.readFileState);
      let P = x.data;
      if (tool.isMcp && Array.isArray(x.data)) {
        let D = x.data.filter(M => M != null && typeof M === "object" && "type" in M && M.type === "text" && "text" in M && typeof M.text === "string").map(M => M.text);
        if (D.length === x.data.length && D.length > 0) {
          let M = D.join(`
`);
          try {
            P = Wt(M);
          } catch {
            P = M;
          }
        }
      }
      callLog.push({
        id: toolUseId,
        name: tool.name,
        input: callStartTime
      }), emitProgress?.({
        type: "progress",
        toolUseID: toolUseId,
        data: {
          type: "repl_tool_call",
          toolName: tool.name,
          toolInput: callStartTime,
          toolUseId: toolUseId,
          phase: "complete",
          result: P
        }
      });
      let O = P;
      if (O != null && typeof O === "object" && O.file != null && typeof O.file === "object" && typeof O.file.base64 === "string" && O.file.base64.length > 0) {
        let D = O.file.base64.length;
        if (O.type === "image" && typeof O.file.type === "string") return {
          ...O,
          file: {
            ...O.file,
            base64: `[${D} base64 chars \u2014 rendered as image in REPL result]`
          }
        };
        if (O.type === "pdf") return {
          ...O,
          file: {
            ...O.file,
            base64: `[${D} base64 chars \u2014 rendered as document in REPL result]`
          }
        };
      }
      return P;
    } catch (A) {
      let h = l_e(A),
        g = A_(A);
      if (f !== undefined) p(callStartTime, undefined);
      for await (let _ of e3n(queryContext, tool, toolUseId, assistantMessage.message.id, callStartTime, h, g, assistantMessage.requestId, undefined, undefined, f !== undefined ? Date.now() - f : undefined));
      if (emitProgress?.({
        type: "progress",
        toolUseID: toolUseId,
        data: {
          type: "repl_tool_call",
          toolName: tool.name,
          toolInput: callStartTime,
          toolUseId: toolUseId,
          phase: "error",
          error: h
        }
      }), tool.name === Xo && A instanceof wM && A.hadSandboxViolation && input?.dangerouslyDisableSandbox !== true && zo.isSandboxingEnabled() && zo.areUnsandboxedCommandsAllowed()) return v("REPL Bash sandbox violation \u2014 auto-retrying unsandboxed"), runToolCall({
        ...input,
        dangerouslyDisableSandbox: true
      }, {
        toolUseID: toolUseId
      });
      return callLog.push({
        id: toolUseId,
        name: tool.name,
        input: callStartTime
      }), exK(tool.name, h);
    }
  };
  return runToolCall;
}
var HuK;
var _uK = b(() => {
  Ct();
  od();
  ddo();
  mdo();
  Iut();
  je();
  St();
  lo();
  dg();
  Xt();
  j9t();
  A8a();
  HuK = require("crypto");
});
export {exK as Qja,kKq as __o,z2O as QUp,HuK as Zja,_uK as eYa};

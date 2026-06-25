// @ts-nocheck
import {Xd,allTools as R_,XL,cn,Jo,Dre,Ta,uK,Ce,Ct} from "../../vendor/m197.ts";
import {rns,xe,Pt,He,mn} from "../telemetry/0600_feature_name.ts";
import {Pi,Mo,zRe,lbn,C8,If,Q2r,Z2r,jxt,mSi,net,hSi,Vse,fSi,e$r,vu} from "../mcp/2200_mcpServerName.ts";
import {isCancel as $P} from "../../vendor/m573.ts";
import {Bxe,Mn,W5n,h4n,po} from "./5224_userPromptCount.ts";
import {AY} from "../../vendor/m4308.ts";
import {Vye,rmt,Hqt} from "../../vendor/m4253.ts";
import {c3e,UFt,XDn,ReactRuntime as Ew} from "./3238_name.ts";
import {Fae,MHe} from "../config/3172_maxSizeBytes.ts";
import {cXr,z4,dXr,Zk,qO} from "../mcp/3159_scope.ts";
import {gw,Grt,Mf,$A} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {rl,ri} from "./2235_userFacingName.ts";
import {o9,cx} from "../artifact/4323_cx.ts";
import {gke,D$e} from "../../vendor/m2713.ts";
import {BRIEF_TOOL_NAME as u1,qh,parsePermissionRule as d$} from "../../vendor/m2704.ts";
import {Uit,NW} from "../config/3289_NW.ts";
import {su,ow} from "../../vendor/m2257.ts";
import {readRoster as Cc,XR} from "../../vendor/m2707.ts";
import {uto,vBt,dto} from "./3326_servers.ts";
import {ac,sI,ZRt,gA,T0} from "../mcp/0733_serverName.ts";
import {getMcpClientsFromAccessor as tMe,getStatsStore as Obe,getCodeEditToolDecisionCounter as fSt,addToToolDuration as tJt,lt} from "../session/0132_sent.ts";
import {hke} from "../artifact/2713_uuidSlugFromUrl.ts";
import {ZZe,eet} from "../../vendor/m2198.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Le,Bo} from "../../vendor/m5.ts";
import {bXe,Ph} from "../agent/1459_agentType.ts";
import {xr} from "../../vendor/m1461.ts";
import {VMt,Dke,lh} from "../../vendor/m2739.ts";
import {J6n,omt} from "../mcp/4256_current.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {x4,kke} from "../../vendor/m2734.ts";
import {OO,Gz} from "../telemetry/2704_Gz.ts";
import {isToolSearchToolAvailable as uDe,extractDiscoveredToolNames as qY,sj} from "./4436_summarizeByServerPrefix.ts";
import {isDeferredTool as f$,zz} from "../config/2719_isDeferredTool.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {C} from "../../vendor/m321.ts";
import {Y1e,Gje,pd} from "../../vendor/m706.ts";
import {Yx,lr} from "../../vendor/m233.ts";
import {ep} from "../../vendor/m2223.ts";
import {ZSi,tbi,nbi,yUe} from "../../vendor/m2208.ts";
import {os,zn} from "../api/0465_getOauthConfig.ts";
import {aO,IA} from "../telemetry/2225_names.ts";
import {sel,jO} from "./4385_stripAllEnvVars.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {Y6n,j6n,K6n,z6n,f_o} from "./4255_toolName.ts";
import {createAttachmentMessage as ti,GA} from "../agent/4451_tryGetPDFReference.ts";
import {vs,dm} from "../../vendor/m2256.ts";
import {fa,ry} from "../../vendor/m2253.ts";
import {Ec,dw} from "../../vendor/m2593.ts";
import {Gaa,$ae,Vaa,gDn,cFt,Kaa,zaa,jXr,Z4} from "../agent/3198_code.ts";
import {nv} from "../telemetry/3195_content.ts";
import {bha,ito,ato,lto} from "./3325_decision.ts";
import {bu,oS} from "../config/2605_event_name.ts";
import {hye,M$a,C9n} from "../../vendor/m3982.ts";
import {executePermissionDeniedHooks as a6t} from "../hooks/5200_level.ts";
import {B5n,U5n,W5e} from "../config/4324_activityCallback.ts";
import {Y0} from "./2710_allErrors.ts";
import {ws} from "../config/2709_Zm.ts";
import {_to,iat} from "../telemetry/3329_prNumber.ts";
import {eia,jst,HI} from "../telemetry/3173_error.ts";
import {Myo,Nyo} from "../../vendor/m4324.ts";
import {G6n,d_o} from "../../vendor/m4252.ts";
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {Wd} from "./5204_shouldSkipHookDueToTrust.ts";
import {_k} from "../core/0576_isCancel.ts";
// @ts-nocheck
/**
 * Tool-use execution pipeline (v2.1.190).
 *
 * This module drives a single tool invocation end to end:
 *   resolve tool -> validate JSON / schema input -> PreToolUse hooks ->
 *   permission decision -> call -> PostToolUse hooks -> emit result/error messages.
 *
 * Ported from v2.1.185 (4306_code.ts). Structure is authoritative from the
 * v190 READ file; names/types/comments are carried over where the code matches
 * and adapted where v190 diverges (notably: inline mcp metadata derivation,
 * per-tool reasonCode on expected errors, mcpNameLoggable threading, and
 * toolEndsTurn / preserveToolUseResultInSubagents support).
 */

/** Classify an unknown thrown value into a short, stable error-type string for telemetry. */
function q5n(err: any): string {
  if (err instanceof Error) {
    let mapped = Xd(err);
    if (mapped) return `Error:${mapped}`;
    if (typeof err.name === "string" && /^[A-Za-z]{4,60}$/.test(err.name)) return err.name;
    return "Error";
  }
  return "UnknownError";
}

/** Build a loggable (redacted) tool-name token from a raw tool name. */
function Byo(toolName: any): any {
  return rns(String(Pi(toolName)));
}

/** True when the error represents an abort/cancellation (vs a real failure). */
function Emt(err: any): boolean {
  return R_(err) || $P(err);
}

/** Pick the user-facing error content for a thrown value: background-abort tombstone vs formatted message. */
function b3p(err: any, signal: any): any {
  return Emt(err) && signal.aborted && signal.reason === "background" ? Bxe(AY) : Vye(err);
}

/**
 * Classify a tool-call exception into a telemetry code and whether it is an
 * expected ("sad" but known) failure. isSad=true means we down-level the log.
 */
function oel(err: any): { code: string; isSad: boolean } {
  if (err instanceof c3e) return {
    code: "tool_mcp_auth_error",
    isSad: !0
  };
  if (err instanceof Error && "errorCode" in err && typeof err.errorCode === "string" && /^HTTP 40[13]\b/.test(err.message)) return {
    code: "tool_mcp_oauth_error",
    isSad: !0
  };
  if (err instanceof XL) return {
    code: "tool_shell_error",
    isSad: !0
  };
  if (err instanceof UFt) return {
    code: "tool_mcp_call_error",
    isSad: !0
  };
  let errno = cn(err);
  if (Jo(err) || Dre(err) || errno === "ENOSPC" || errno === "EDQUOT" || errno === "ENFILE" || errno === "EIO") return {
    code: "tool_fs_error",
    isSad: !0
  };
  if (err instanceof Fae) return {
    code: "tool_read_budget_exceeded",
    isSad: !0
  };
  if (err instanceof Ta) return {
    code: "tool_telemetry_safe_error",
    isSad: !0
  };
  if (err instanceof uK) return {
    code: "tool_malformed_command",
    isSad: !0
  };
  if (err instanceof Error) {
    let ctorName = err.name !== "Error" ? err.name : err.constructor?.name ?? "";
    if (E3p.has(ctorName)) return {
      code: "reasonCode" in err && typeof err.reasonCode === "string" && /^[a-z][a-z0-9_]{2,39}$/.test(err.reasonCode) ? err.reasonCode : "tool_expected_error",
      isSad: !0
    };
  }
  if (err instanceof DOMException && err.name === "TimeoutError") return {
    code: "tool_mcp_transport_error",
    isSad: !0
  };
  let errno2 = cn(err);
  if (errno2 !== void 0 && cXr.has(errno2)) return {
    code: "tool_mcp_transport_error",
    isSad: !0
  };
  return {
    code: "tool_call_threw",
    isSad: !1
  };
}

/** Map a rule's settings source + allow/deny into a permission-decision classification. */
function C3p(source: any, behavior: any): string {
  switch (source) {
    case "session":
      return behavior === "allow" ? "user_temporary" : "user_reject";
    case "localSettings":
    case "userSettings":
      return behavior === "allow" ? "user_permanent" : "user_reject";
    default:
      return "config";
  }
}

/** Classify a permission decision reason into a coarse decision source for telemetry. */
function A3p(decisionReason: any, behavior: any): string {
  if (!decisionReason) return "config";
  switch (decisionReason.type) {
    case "permissionPromptTool":
      {
        let classification = decisionReason.toolResult?.decisionClassification;
        if (classification === "user_temporary" || classification === "user_permanent" || classification === "user_reject") return classification;
        return behavior === "allow" ? "user_temporary" : "user_reject";
      }
    case "rule":
      return C3p(decisionReason.rule.source, behavior);
    case "hook":
      return "hook";
    case "mode":
    case "classifier":
    case "subcommandResults":
    case "asyncAgent":
    case "sandboxOverride":
    case "workingDir":
    case "safetyCheck":
    case "other":
      return "config";
    default:
      return "config";
  }
}

/**
 * Produce a trailing hint explaining why a requested tool is unavailable in the
 * current context (workflow-only, subagent-restricted, brief mode, disabled,
 * shell-only Glob/Grep, or a still-connecting MCP server).
 */
function Uyo(toolName: any, tools: any, agentId: any, mainLoopModel: any): string {
  if (gw() && Grt.has(toolName) && rl(tools, Mf)) return `. ${toolName} is only available inside ${Mf}. Use ${Mf} with code: await ${toolName}({...}).`;
  let known = rl(o9(), toolName);
  if (agentId && known && gke.has(known.name)) return `. ${toolName} is not available inside subagents. Complete the task with the tools provided and return findings to the orchestrator.`;
  if (known?.name === u1) return `. ${toolName} is not enabled in this session \u2014 write your message as normal assistant text instead.`;
  if (known) return `. ${toolName} exists but is not enabled in this context. Use one of the available tools instead.`;
  if (Uit().has(toolName)) {
    let shellAlt = toolName === su ? su : Cc;
    if (!rl(tools, Mo)) return `. ${shellAlt} is not available in this context. Use one of the available tools instead.`;
    return shellAlt === su ? `. ${su} is not available in this session \u2014 find files with \`find\` via the ${Mo} tool instead.` : `. ${Cc} is not available in this session \u2014 search file contents with \`grep\` via the ${Mo} tool instead.`;
  }
  let mcpHint = agentId ? "" : R3p(toolName, mainLoopModel);
  if (mcpHint) return mcpHint;
  return "";
}

/** If an unknown mcp__ tool maps to a still-pending MCP server, suggest waiting for it. */
function R3p(toolName: any, mainLoopModel: any): string {
  let serverName = /^mcp__(.+?)__/.exec(toolName)?.[1];
  if (!serverName) return "";
  if (!uto(mainLoopModel)) return "";
  let normalized = ac(serverName),
    pending = (tMe() ?? []).find((client: any) => client.type === "pending" && (client.name === serverName || ac(client.name) === normalized));
  if (!pending) return "";
  return `. The MCP server '${pending.name}' is still connecting. Call ${hke} to wait for it, then try again.`;
}

/** Next free image-paste id = (max imagePasteId seen across user messages) + 1. */
function rel(messages: any): number {
  let maxId = 0;
  for (let message of messages) if (message.type === "user" && message.imagePasteIds) {
    for (let id of message.imagePasteIds) if (id > maxId) maxId = id;
  }
  return maxId + 1;
}

/** Narrow guard: value carries a discriminant "type" field. */
function kG(value: any): boolean {
  return "type" in value;
}

/** Find the MCP client whose server matches the given mcp__ tool name. */
function v3p(toolName: any, mcpClients: any): any {
  if (!toolName.startsWith("mcp__")) return;
  let parsed = sI(toolName);
  if (!parsed) return;
  return mcpClients.find((client: any) => ac(client.name) === parsed.serverName);
}

/**
 * Top-level tool dispatch generator: resolve the tool, handle unknown-tool and
 * aborted/isolation-denied short circuits, then stream results from runToolUse,
 * translating any thrown error into a tool_use_error message.
 */
async function* i6t(toolUse: any, assistantMessage: any, n: any, context: any, now: any): any {
  let toolName = toolUse.name,
    tool = rl(context.options.tools, toolName, context.options.toolAliases);
  if (!tool) {
    let builtin = rl(o9(), toolName);
    if (builtin && builtin.aliases?.includes(toolName)) tool = builtin;
  }
  let messageId = assistantMessage.message.id,
    requestId = assistantMessage.requestId,
    mcpClient = v3p(toolName, context.options.mcpClients),
    connectedClient = mcpClient?.type === "connected" ? mcpClient : void 0,
    mcpServerType = connectedClient ? connectedClient.config.type ?? "stdio" : void 0,
    mcpServerBaseUrl = connectedClient ? ZZe(connectedClient.config) : void 0,
    mcpNameLoggable = zRe(lbn(toolName)?.serverName ?? "", connectedClient?.config);
  if (!tool) {
    let rawName = Pi(toolName),
      unavailableHint = Uyo(toolName, context.options.tools, context.agentId, context.options.mainLoopModel);
    A(`Unknown tool ${toolName}: ${toolUse.id}`), xe(Byo(toolName), "tool_not_found"), W("tengu_tool_use_error", {
      error: `No such tool available: ${rawName}`,
      errorCode: Ve("NO_SUCH_TOOL"),
      toolName: rawName,
      toolUseID: toolUse.id,
      isMcp: toolName.startsWith("mcp__"),
      ...bXe(context.agentContext),
      queryChainId: xr(context.queryTracking?.chainId),
      queryDepth: context.queryTracking?.depth,
      ...(context.options.messageClientPlatform && {
        messageClientPlatform: context.options.messageClientPlatform
      }),
      ...(mcpServerType && {
        mcpServerType: Le(mcpServerType)
      }),
      ...(mcpServerBaseUrl && {
        mcpServerBaseUrl: z4(mcpServerBaseUrl)
      }),
      ...(requestId && {
        requestId: xr(requestId)
      }),
      ...C8(toolName, mcpNameLoggable)
    }), yield {
      message: Mn({
        content: [{
          type: "tool_result",
          content: `<tool_use_error>Error: No such tool available: ${toolName}${unavailableHint}</tool_use_error>`,
          is_error: !0,
          tool_use_id: toolUse.id
        }],
        toolUseResult: `Error: No such tool available: ${toolName}${unavailableHint}`,
        sourceToolAssistantUUID: assistantMessage.uuid,
        now: now
      })
    };
    return;
  }
  let toolNameLoggable = Byo(tool.name),
    input = toolUse.input;
  try {
    if (context.abortController.signal.aborted) {
      W("tengu_tool_use_cancelled", {
        toolName: Pi(tool.name),
        toolUseID: toolUse.id,
        isMcp: tool.isMcp ?? !1,
        phase: Ve("entry"),
        abortKind: Le(VMt(context.abortController.signal.reason)),
        queryChainId: xr(context.queryTracking?.chainId),
        queryDepth: context.queryTracking?.depth,
        ...(mcpServerType && {
          mcpServerType: Le(mcpServerType)
        }),
        ...(mcpServerBaseUrl && {
          mcpServerBaseUrl: z4(mcpServerBaseUrl)
        }),
        ...(requestId && {
          requestId: xr(requestId)
        }),
        ...C8(tool.name, mcpNameLoggable)
      });
      let cancelledResult = W5n(toolUse.id);
      cancelledResult.content = Bxe(AY), yield {
        message: Mn({
          content: [cancelledResult],
          toolUseResult: AY,
          sourceToolAssistantUUID: assistantMessage.uuid,
          now: now
        })
      };
      return;
    }
    let isolation = J6n(tool, context);
    if (isolation.denyMessage) {
      Pt(toolNameLoggable, "tool_isolation_denied"), W("tengu_tool_use_isolation_latch_denied", {
        toolName: Pi(tool.name),
        toolUseID: toolUse.id,
        isMcp: tool.isMcp ?? !1,
        isolationLatch: Bo(isolation.activeLatch),
        isolationClassifiedAs: Bo(isolation.classifiedAs),
        queryChainId: xr(context.queryTracking?.chainId),
        queryDepth: context.queryTracking?.depth,
        ...(mcpServerType && {
          mcpServerType: Le(mcpServerType)
        }),
        ...(mcpServerBaseUrl && {
          mcpServerBaseUrl: z4(mcpServerBaseUrl)
        }),
        ...(requestId && {
          requestId: xr(requestId)
        }),
        ...C8(tool.name, mcpNameLoggable)
      }), yield {
        message: Mn({
          content: [{
            type: "tool_result",
            content: `<tool_use_error>${isolation.denyMessage}</tool_use_error>`,
            is_error: !0,
            tool_use_id: toolUse.id
          }],
          toolUseResult: `Error: ${isolation.denyMessage}`,
          sourceToolAssistantUUID: assistantMessage.uuid,
          now: now
        })
      };
      return;
    }
    for await (let chunk of w3p(tool, toolUse.id, input, context, n, assistantMessage, messageId, requestId, mcpServerType, mcpServerBaseUrl, mcpNameLoggable, now)) yield chunk;
  } catch (err) {
    let message = err instanceof Error ? err.message : String(err),
      toolSuffix = tool ? ` (${tool.name})` : "";
    if (!Emt(err)) {
      A(`runToolUse error${toolSuffix}: ${message.slice(0, 200)}`);
      let {
        code: code,
        isSad: isSad
      } = oel(err);
      if (isSad) Pt(toolNameLoggable, code);else Ie(err), xe(toolNameLoggable, "tool_unexpected_error");
    }
    let errorText = `Error calling tool${toolSuffix}: ${message}`;
    yield {
      message: Mn({
        content: [{
          type: "tool_result",
          content: `<tool_use_error>${errorText}</tool_use_error>`,
          is_error: !0,
          tool_use_id: toolUse.id
        }],
        toolUseResult: errorText,
        sourceToolAssistantUUID: assistantMessage.uuid,
        now: now
      })
    };
  }
}

/**
 * Adapt the callback-based runToolUse (H3p) into a readable stream: progress
 * events are reported via telemetry and re-enqueued as progress messages;
 * everything else is enqueued directly. The returned stream completes when the
 * underlying promise settles.
 */
function w3p(tool: any, toolUseID: any, input: any, context: any, n: any, assistantMessage: any, messageId: any, requestId: any, mcpServerType: any, mcpServerBaseUrl: any, mcpNameLoggable: any, now: any): any {
  let stream = new x4();
  return H3p(tool, toolUseID, input, context, n, assistantMessage, messageId, requestId, mcpServerType, mcpServerBaseUrl, mcpNameLoggable, now, (event: any) => {
    if (event.type !== "progress") {
      stream.enqueue(event);
      return;
    }
    W("tengu_tool_use_progress", {
      messageID: xr(messageId),
      toolName: Pi(tool.name),
      isMcp: tool.isMcp ?? !1,
      queryChainId: xr(context.queryTracking?.chainId),
      queryDepth: context.queryTracking?.depth,
      ...(mcpServerType && {
        mcpServerType: Le(mcpServerType)
      }),
      ...(mcpServerBaseUrl && {
        mcpServerBaseUrl: z4(mcpServerBaseUrl)
      }),
      ...(requestId && {
        requestId: xr(requestId)
      }),
      ...C8(tool.name, mcpNameLoggable)
    }), stream.enqueue({
      message: h4n({
        toolUseID: event.toolUseID,
        parentToolUseID: toolUseID,
        data: event.data,
        now: now
      })
    });
  }).then((results: any) => {
    for (let result of results) stream.enqueue(result);
  }).catch((err: any) => {
    stream.error(err);
  }).finally(() => {
    stream.done();
  }), stream;
}

/**
 * When a deferred tool's schema was never sent to the API, build a hint telling
 * the model to load the tool first (so typed params aren't stringified). Returns
 * null when not applicable.
 */
function k3p(tool: any, messages: any, tools: any): string | null {
  if (!OO()) return null;
  if (!uDe(tools)) return null;
  if (!f$(tool)) return null;
  if (qY(messages).has(tool.name)) return null;
  let schemaHint = "";
  try {
    schemaHint = ` For reference, this tool's input schema is: ${Pe(C.toJSONSchema(tool.inputSchema))}`;
  } catch {}
  return `

This tool's schema was not sent to the API \u2014 it was not in the discovered-tool set derived from message history. ` + `Without the schema in your prompt, typed parameters (arrays, numbers, booleans) get emitted as strings and the client-side parser rejects them. Load the tool first: call ${qh} with query "select:${tool.name}", then retry this call.${schemaHint}`;
}

/** Emit a tengu_tool_use_cancelled event and return a cancellation tool_result message. */
function $5n(args: any): any {
  let {
    phase: phase,
    tool: tool,
    toolUseID: toolUseID,
    toolUseContext: context,
    assistantMessage: assistantMessage,
    mcpServerType: mcpServerType,
    mcpServerBaseUrl: mcpServerBaseUrl,
    mcpNameLoggable: mcpNameLoggable,
    requestId: requestId,
    now: now
  } = args;
  W("tengu_tool_use_cancelled", {
    toolName: Pi(tool.name),
    toolUseID: toolUseID,
    isMcp: tool.isMcp ?? !1,
    phase: Le(phase),
    abortKind: Le(VMt(context.abortController.signal.reason)),
    queryChainId: xr(context.queryTracking?.chainId),
    queryDepth: context.queryTracking?.depth,
    ...(mcpServerType && {
      mcpServerType: Le(mcpServerType)
    }),
    ...(mcpServerBaseUrl && {
      mcpServerBaseUrl: z4(mcpServerBaseUrl)
    }),
    ...(requestId && {
      requestId: xr(requestId)
    }),
    ...C8(tool.name, mcpNameLoggable)
  });
  let cancelledResult = W5n(toolUseID);
  return cancelledResult.content = Bxe(AY), [{
    message: Mn({
      content: [cancelledResult],
      toolUseResult: AY,
      sourceToolAssistantUUID: assistantMessage.uuid,
      now: now
    })
  }];
}

/**
 * Core tool execution: JSON-parse check, input coercion + zod validation,
 * validateInput, PreToolUse hooks, permission decision, the actual tool.call,
 * PostToolUse hooks, and result/error message assembly. Returns the list of
 * messages to append; reports progress via the `report` callback.
 */
async function H3p(tool: any, toolUseID: any, rawInput: any, context: any, n: any, assistantMessage: any, messageId: any, requestId: any, mcpServerType: any, mcpServerBaseUrl: any, mcpNameLoggable: any, now: any, report: any): Promise<any> {
  let toolNameLoggable = Byo(tool.name),
    inputSizeBytes = Pe(rawInput).length;
  if (Y1e(rawInput)) {
    let {
        raw: raw,
        len: len
      } = rawInput[Gje],
      truncated = Yx(raw, 200),
      parseErrorText = `${tool.name} was called with input that could not be parsed as JSON.
You sent (first ${truncated.length} of ${len} bytes): ${truncated}
Common causes: unescaped backslashes in file paths (use / or \\\\), unescaped control characters, or truncated output. Retry with valid JSON.`;
    return Pt(toolNameLoggable, "tool_input_validation_failed"), W("tengu_tool_use_error", {
      error: Ve("InputValidationError"),
      errorCode: Ve("JSON_PARSE"),
      errorDetailsHash: ep(`${tool.name}: unparsed tool input`),
      messageID: xr(messageId),
      toolName: Pi(tool.name),
      isMcp: tool.isMcp ?? !1,
      ...bXe(context.agentContext),
      toolInputSizeBytes: len,
      queryChainId: xr(context.queryTracking?.chainId),
      queryDepth: context.queryTracking?.depth,
      ...(mcpServerType && {
        mcpServerType: Le(mcpServerType)
      }),
      ...(mcpServerBaseUrl && {
        mcpServerBaseUrl: z4(mcpServerBaseUrl)
      }),
      ...(requestId && {
        requestId: xr(requestId)
      }),
      ...C8(tool.name, mcpNameLoggable)
    }), [{
      message: Mn({
        content: [{
          type: "tool_result",
          content: `<tool_use_error>InputValidationError: ${parseErrorText}</tool_use_error>`,
          is_error: !0,
          tool_use_id: toolUseID
        }],
        toolUseResult: `InputValidationError: JSON parse failed (${len} bytes)`,
        sourceToolAssistantUUID: assistantMessage.uuid,
        now: now
      })
    }];
  }
  let coercedInput = rawInput,
    coercion = null;
  if (tool.coerceInput) {
    if (coercion = tool.coerceInput(rawInput), coercion !== null) coercedInput = coercion.input;
  }
  let parsed = tool.inputSchema.safeParse(coercedInput);
  if (coercion !== null) W("tengu_tool_input_coerced", {
    toolName: Pi(tool.name),
    shapeClass: coercion.shapeClass,
    outcome: Ve(parsed.success ? "coerced_valid" : "coerced_still_invalid"),
    toolInputSizeBytes: inputSizeBytes
  });
  if (!parsed.success) {
    let errorMessage = rmt(tool.name, parsed.error),
      emptyInputRepaired = !1;
    if (ZSi() && tbi(rawInput)) {
      let repaired = nbi(tool.name, tool.inputSchema);
      if (repaired !== null) errorMessage = repaired, emptyInputRepaired = !0;
    }
    let steer = tool.validationErrorSteer?.(rawInput);
    if (steer) errorMessage += `

${steer}`;
    let schemaHint = k3p(tool, context.messages, context.options.tools);
    if (schemaHint) W("tengu_deferred_tool_schema_not_sent", {
      toolName: Pi(tool.name),
      isMcp: tool.isMcp ?? !1
    }), errorMessage += schemaHint;
    return A(`${tool.name} tool input error: ${errorMessage.slice(0, 200)}`), Pt(toolNameLoggable, "tool_input_validation_failed"), W("tengu_tool_use_error", {
      error: Ve("InputValidationError"),
      errorCode: Ve("ZOD_VALIDATION"),
      zodIssueCodes: os(parsed.error.issues.map((issue: any) => issue.code)).join(","),
      errorDetailsHash: ep(errorMessage),
      messageID: xr(messageId),
      toolName: Pi(tool.name),
      isMcp: tool.isMcp ?? !1,
      ...bXe(context.agentContext),
      toolInputSizeBytes: inputSizeBytes,
      ...(emptyInputRepaired && {
        emptyInputRepaired: !0
      }),
      queryChainId: xr(context.queryTracking?.chainId),
      queryDepth: context.queryTracking?.depth,
      ...(context.options.messageClientPlatform && {
        messageClientPlatform: context.options.messageClientPlatform
      }),
      ...(mcpServerType && {
        mcpServerType: Le(mcpServerType)
      }),
      ...(mcpServerBaseUrl && {
        mcpServerBaseUrl: z4(mcpServerBaseUrl)
      }),
      ...(requestId && {
        requestId: xr(requestId)
      }),
      ...C8(tool.name, mcpNameLoggable)
    }), [{
      message: Mn({
        content: [{
          type: "tool_result",
          content: `<tool_use_error>InputValidationError: ${errorMessage}</tool_use_error>`,
          is_error: !0,
          tool_use_id: toolUseID
        }],
        toolUseResult: `InputValidationError: ${parsed.error.message}`,
        sourceToolAssistantUUID: assistantMessage.uuid,
        now: now
      })
    }];
  }
  let validation = await tool.validateInput?.(parsed.data, context);
  if (Dke(context.abortController.signal)) return $5n({
    phase: "validate_input",
    tool: tool,
    toolUseID: toolUseID,
    toolUseContext: context,
    assistantMessage: assistantMessage,
    mcpServerType: mcpServerType,
    mcpServerBaseUrl: mcpServerBaseUrl,
    mcpNameLoggable: mcpNameLoggable,
    requestId: requestId,
    now: now
  });
  if (validation?.result === !1) return A(`${tool.name} tool validation error: ${validation.message?.slice(0, 200)}`), Pt(toolNameLoggable, "tool_validate_input_rejected"), W("tengu_tool_use_error", {
    messageID: xr(messageId),
    toolName: Pi(tool.name),
    error: Ve("ValidateInputError"),
    ...aO(validation.message),
    errorCode: validation.errorCode,
    isMcp: tool.isMcp ?? !1,
    ...bXe(context.agentContext),
    queryChainId: xr(context.queryTracking?.chainId),
    queryDepth: context.queryTracking?.depth,
    ...(context.options.messageClientPlatform && {
      messageClientPlatform: context.options.messageClientPlatform
    }),
    ...(mcpServerType && {
      mcpServerType: Le(mcpServerType)
    }),
    ...(mcpServerBaseUrl && {
      mcpServerBaseUrl: z4(mcpServerBaseUrl)
    }),
    ...(requestId && {
      requestId: xr(requestId)
    }),
    ...C8(tool.name, mcpNameLoggable)
  }), [{
    message: Mn({
      content: [{
        type: "tool_result",
        content: `<tool_use_error>${validation.message}</tool_use_error>`,
        is_error: !0,
        tool_use_id: toolUseID
      }],
      toolUseResult: `Error: ${validation.message}`,
      sourceToolAssistantUUID: assistantMessage.uuid,
      now: now
    })
  }];
  if (tool.name === Mo && parsed.data && "command" in parsed.data) sel(parsed.data.command, Mr(context), context.abortController.signal, context.options.isNonInteractiveSession);
  let outMessages = [],
    input = parsed.data;
  if (tool.name === Mo && input && typeof input === "object" && "_simulatedSedEdit" in input) {
    let {
      _simulatedSedEdit: _simulatedSedEdit,
      ...rest
    } = input;
    input = rest;
  }
  let observableInput = input,
    backfilled = tool.backfillObservableInput && typeof input === "object" && input !== null ? {
      ...input
    } : null;
  if (backfilled) tool.backfillObservableInput(backfilled), input = backfilled;
  let preventContinuation = !1,
    stopReason: any,
    hookPermissionResult: any,
    preHookAttachments = [],
    preHookStart = Date.now();
  for await (let event of Y6n(context, tool, input, toolUseID, assistantMessage.message.id, requestId, mcpServerType, mcpServerBaseUrl)) switch (event.type) {
    case "message":
      if (event.message.message.type === "progress") report(event.message.message);else {
        outMessages.push(event.message);
        let attachment = event.message.message.attachment;
        if (attachment && "command" in attachment && attachment.command !== void 0 && "durationMs" in attachment && attachment.durationMs !== void 0) preHookAttachments.push({
          command: attachment.command,
          durationMs: attachment.durationMs
        });
      }
      break;
    case "hookPermissionResult":
      hookPermissionResult = event.hookPermissionResult;
      break;
    case "hookUpdatedInput":
      input = event.updatedInput;
      break;
    case "preventContinuation":
      preventContinuation = event.shouldPreventContinuation;
      break;
    case "stopReason":
      stopReason = event.stopReason;
      break;
    case "additionalContext":
      outMessages.push(event.message);
      break;
    case "defer":
      {
        if (Obe()?.observe("pre_tool_hook_duration_ms", Date.now() - preHookStart), !context.options.isNonInteractiveSession) {
          A(`Hook ${event.hookName} returned permissionDecision=defer in interactive mode; ignoring (defer is print-mode only)`, {
            level: "warn"
          });
          break;
        }
        let toolUseCount = Array.isArray(assistantMessage.message.content) ? zn(assistantMessage.message.content, (block: any) => block.type === "tool_use") : 1;
        if (toolUseCount > 1) {
          A(`Hook ${event.hookName} returned permissionDecision=defer but ${toolUseCount} tool calls are in this batch; ignoring (defer is solo-only \u2014 siblings would be orphaned on resume)`, {
            level: "warn"
          });
          break;
        }
        return W("tengu_pre_tool_hook_deferred", {
          toolName: Pi(tool.name),
          queryChainId: xr(context.queryTracking?.chainId),
          queryDepth: context.queryTracking?.depth
        }), outMessages.push({
          message: ti({
            type: "hook_deferred_tool",
            toolUseID: toolUseID,
            toolName: tool.name,
            toolInput: input,
            hookName: event.hookName,
            hookEvent: "PreToolUse",
            permissionMode: Mr(context).mode
          })
        }), outMessages;
      }
    case "stop":
      return Obe()?.observe("pre_tool_hook_duration_ms", Date.now() - preHookStart), outMessages.push({
        message: Mn({
          content: [W5n(toolUseID)],
          toolUseResult: `Error: ${stopReason}`,
          sourceToolAssistantUUID: assistantMessage.uuid,
          now: now
        })
      }), outMessages;
  }
  let preHookDuration = Date.now() - preHookStart;
  if (Obe()?.observe("pre_tool_hook_duration_ms", preHookDuration), preHookDuration >= Fyo) A(`Slow PreToolUse hooks: ${preHookDuration}ms for ${tool.name} (${preHookAttachments.length} hooks)`, {
    level: "info"
  });
  let otelInput: any = {};
  if (input && typeof input === "object") {
    if (tool.name === vs && "file_path" in input && If()) otelInput.file_path = String(input.file_path);else if ((tool.name === fa || tool.name === Ec) && "file_path" in input && If()) otelInput.file_path = String(input.file_path);else if (tool.name === Mo && "command" in input && If()) {
      let bashInput = input;
      otelInput.full_command = bashInput.command;
    } else if (If()) {
      let skillName = Q2r(tool.name, input, tool.userFacingName?.(void 0));
      if (skillName) otelInput.skill_name = skillName;
      let subagentType = Z2r(tool.name, input);
      if (subagentType) otelInput.subagent_type = subagentType;
    }
  }
  let span = Gaa(tool.name, context.agentContext, otelInput, $ae() || nv() && If() ? Pe(input) : void 0, toolUseID);
  Vaa();
  let permissionMode = Mr(context).mode,
    permissionStart = Date.now(),
    permissionOutcome = await j6n(hookPermissionResult, tool, input, context, n, assistantMessage, toolUseID),
    decision = permissionOutcome.decision;
  if (input = permissionOutcome.input, decision.behavior !== "allow" && Dke(context.abortController.signal)) return gDn("cancelled", "server_fallback_tombstone"), cFt(span), $5n({
    phase: "permission",
    tool: tool,
    toolUseID: toolUseID,
    toolUseContext: context,
    assistantMessage: assistantMessage,
    mcpServerType: mcpServerType,
    mcpServerBaseUrl: mcpServerBaseUrl,
    mcpNameLoggable: mcpNameLoggable,
    requestId: requestId,
    now: now
  });
  if (decision.behavior !== "allow") context.onPermissionDenial?.(tool, toolUseID, input);
  let permissionDuration = Date.now() - permissionStart;
  if (permissionDuration >= Fyo && permissionMode === "auto") A(`Slow permission decision: ${permissionDuration}ms for ${tool.name} (mode=${permissionMode}, behavior=${decision.behavior})`, {
    level: "info"
  });
  if (bha({
    toolName: tool.name,
    isMcp: tool.isMcp ?? !1,
    messageId: messageId,
    toolUseID: toolUseID,
    permissionMode: Mr(context).mode,
    behavior: decision.behavior,
    decisionReason: decision.decisionReason,
    resolvedSource: context.toolDecisions?.[toolUseID]?.source
  }), decision.behavior !== "ask" && context.toolDecisions?.[toolUseID] === void 0) {
    let decisionVerb = decision.behavior === "allow" ? "accept" : "reject",
      decisionSource = A3p(decision.decisionReason, decision.behavior),
      toolParams = jxt(tool.name, input, tool.userFacingName?.(void 0));
    if (bu("tool_decision", {
      decision: decisionVerb,
      source: decisionSource,
      tool_name: Pi(tool.name),
      tool_use_id: toolUseID,
      ...(Object.keys(toolParams).length > 0 && {
        tool_parameters: Pe(toolParams)
      })
    }), ito(tool.name)) ato(tool, input, decisionVerb, decisionSource).then((metric: any) => fSt()?.add(1, metric));
  }
  if (decision.decisionReason?.type === "hook" && decision.decisionReason.hookName === "PermissionRequest" && decision.behavior !== "ask") outMessages.push({
    message: ti({
      type: "hook_permission_decision",
      decision: decision.behavior,
      toolUseID: toolUseID,
      hookEvent: "PermissionRequest"
    })
  });
  if (decision.behavior !== "allow") {
    A(`${tool.name} tool permission denied`);
    let priorDecision = context.toolDecisions?.[toolUseID];
    gDn("reject", priorDecision?.source || "unknown"), cFt(span), W("tengu_tool_use_can_use_tool_rejected", {
      messageID: xr(messageId),
      toolName: Pi(tool.name),
      queryChainId: xr(context.queryTracking?.chainId),
      queryDepth: context.queryTracking?.depth,
      ...(context.options.messageClientPlatform && {
        messageClientPlatform: context.options.messageClientPlatform
      }),
      ...(mcpServerType && {
        mcpServerType: Le(mcpServerType)
      }),
      ...(mcpServerBaseUrl && {
        mcpServerBaseUrl: z4(mcpServerBaseUrl)
      }),
      ...(requestId && {
        requestId: xr(requestId)
      }),
      ...C8(tool.name, mcpNameLoggable)
    });
    let denialMessage = decision.message;
    if (preventContinuation && !denialMessage) denialMessage = `Execution stopped by PreToolUse hook${stopReason ? `: ${stopReason}` : ""}`;
    let denialContent = [{
        type: "tool_result",
        content: denialMessage,
        is_error: !0,
        tool_use_id: toolUseID
      }],
      askBlocks = decision.behavior === "ask" ? decision.contentBlocks : void 0;
    if (askBlocks?.length) denialContent.push(...askBlocks);
    let imagePasteIds: any;
    if (askBlocks?.length) {
      let imageCount = zn(askBlocks, (block: any) => block.type === "image");
      if (imageCount > 0) {
        let base = rel(context.messages);
        imagePasteIds = Array.from({
          length: imageCount
        }, (_x, offset) => base + offset);
      }
    }
    if (outMessages.push({
      message: Mn({
        content: denialContent,
        imagePasteIds: imagePasteIds,
        toolUseResult: `Error: ${denialMessage}`,
        toolDenialKind: hye() ? M$a(decision) : void 0,
        sourceToolAssistantUUID: assistantMessage.uuid,
        now: now
      })
    }), decision.decisionReason?.type === "classifier" && decision.decisionReason.classifier === "auto-mode") {
      let mayRetry = !1;
      for await (let hookResult of a6t(tool.name, toolUseID, input, decision.decisionReason.reason ?? "Permission denied", context, permissionMode, context.abortController.signal)) if (hookResult.retry) mayRetry = !0;
      if (mayRetry) outMessages.push({
        message: Mn({
          content: "The PermissionDenied hook indicated you may retry this tool call.",
          isMeta: !0,
          now: now
        })
      });
    }
    return outMessages;
  }
  if (W("tengu_tool_use_can_use_tool_allowed", {
    messageID: xr(messageId),
    toolName: Pi(tool.name),
    queryChainId: xr(context.queryTracking?.chainId),
    queryDepth: context.queryTracking?.depth,
    ...(mcpServerType && {
      mcpServerType: Le(mcpServerType)
    }),
    ...(mcpServerBaseUrl && {
      mcpServerBaseUrl: z4(mcpServerBaseUrl)
    }),
    ...(requestId && {
      requestId: xr(requestId)
    }),
    ...C8(tool.name, mcpNameLoggable)
  }), decision.updatedInput !== void 0) input = decision.updatedInput;
  let truncatedInput = mSi(input),
    toolParams = jxt(tool.name, input, tool.userFacingName?.(void 0)),
    decisionRecord = context.toolDecisions?.[toolUseID];
  gDn(decisionRecord?.decision || "unknown", decisionRecord?.source || "unknown"), Kaa(toolUseID);
  let callStart = Date.now(),
    memoryBefore = process.memoryUsage();
  if (backfilled && input !== observableInput && typeof input === "object" && input !== null && "file_path" in input && "file_path" in observableInput && input.file_path === backfilled.file_path) observableInput = {
    ...input,
    file_path: observableInput.file_path
  };else if (input !== backfilled) observableInput = input;
  if (Dke(context.abortController.signal)) return $5n({
    phase: "pre_call",
    tool: tool,
    toolUseID: toolUseID,
    toolUseContext: context,
    assistantMessage: assistantMessage,
    mcpServerType: mcpServerType,
    mcpServerBaseUrl: mcpServerBaseUrl,
    mcpNameLoggable: mcpNameLoggable,
    requestId: requestId,
    now: now
  });
  report({
    type: "set_in_progress_tool_use_ids",
    op: {
      action: "add",
      ids: [toolUseID]
    }
  }), A(`[Stall] tool_dispatch_start tool=${tool.name} toolUseId=${toolUseID} permissionDecisionMs=${permissionDuration}`, {
    level: "info"
  });
  let dispatched = !1;
  try {
    B5n("tool_exec", context.agentId);
    let toolResult = await tool.call(observableInput, {
        ...context,
        toolUseId: toolUseID,
        userModified: decision.userModified ?? !1
      }, n, assistantMessage, report),
      callDuration = Date.now() - callStart,
      memoryAfter = process.memoryUsage();
    if (tJt(callDuration), A(`[Stall] tool_dispatch_end tool=${tool.name} toolUseId=${toolUseID} outcome=ok durationMs=${callDuration}`, {
      level: "info"
    }), dispatched = !0, toolResult.data && typeof toolResult.data === "object") {
      let otelOutput: any = {};
      if (tool.name === vs) {
        let readData = toolResult.data;
        if (readData.type === "text") {
          if (If() && "file_path" in input) otelOutput.file_path = String(input.file_path);
          otelOutput.content = readData.file.content;
        }
      }
      if ((tool.name === fa || tool.name === Ec) && "file_path" in input) {
        if (If()) otelOutput.file_path = String(input.file_path);
        if (If() && tool.name === fa && "structuredPatch" in toolResult.data) otelOutput.diff = Pe(toolResult.data.structuredPatch);
        if (If() && tool.name === Ec && "content" in input) otelOutput.content = String(input.content);
      }
      if (tool.name === Mo && "command" in input) {
        let bashInput = input;
        if (If()) otelOutput.bash_command = bashInput.command;
        if ("stdout" in toolResult.data) otelOutput.output = String(toolResult.data.stdout);
      }
      if (Object.keys(otelOutput).length > 0) zaa("tool.output", otelOutput);
    }
    if (typeof toolResult === "object" && "structured_output" in toolResult) outMessages.push({
      message: ti({
        type: "structured_output",
        data: toolResult.structured_output,
        toolUseID: toolUseID
      })
    });
    jXr({
      success: !0
    });
    let spanOutput = $ae() || nv() && net() ? toolResult.data && typeof toolResult.data === "object" ? Pe(toolResult.data) : String(toolResult.data ?? "") : void 0;
    cFt(span, spanOutput);
    let resultBlock = tool.mapToolResultToToolResultBlockParam(toolResult.data, toolUseID),
      resultContent = resultBlock.content,
      resultSizeBytes = !resultContent ? 0 : typeof resultContent === "string" ? resultContent.length : Pe(resultContent).length,
      attachmentBytes = hSi(toolResult.newMessages),
      fileExtension: any,
      bashCommandFileExtensions: any,
      filePathLen: any,
      bashCommandLen: any,
      dsFields: any;
    if (input && typeof input === "object") {
      if ((tool.name === vs || tool.name === fa || tool.name === Ec) && "file_path" in input) fileExtension = Vse(String(input.file_path)), filePathLen = String(observableInput.file_path).length;else if (tool.name === Y0 && "notebook_path" in input) {
        let notebookPath = String(input.notebook_path);
        fileExtension = Vse(notebookPath), filePathLen = notebookPath.length;
      } else if (tool.name === Mo && "command" in input) {
        let bashInput = input;
        fileExtension = fSi(bashInput.command, bashInput._simulatedSedEdit?.filePath), bashCommandFileExtensions = e$r(bashInput.command), bashCommandLen = bashInput.command.length;
      } else if ((tool.name === ZRt || tool.name === ws) && "command" in input && typeof input.command === "string") bashCommandFileExtensions = e$r(input.command);else if (tool.name === vBt) {
        let dsInput = input,
          countOf = (value: any) => Array.isArray(value) ? value.length : void 0,
          validateCounts = dsInput.method === "report_validate" ? dsInput.counts : void 0;
        dsFields = {
          dsMethod: String(dsInput.method),
          ...(typeof dsInput.projectId === "string" && {
            dsProjectIdHash: ep(dsInput.projectId)
          }),
          ...(countOf(dsInput.assets) !== void 0 && {
            dsAssetCount: countOf(dsInput.assets)
          }),
          ...(countOf(dsInput.files) !== void 0 && {
            dsFileCount: countOf(dsInput.files)
          }),
          ...(countOf(dsInput.paths) !== void 0 && {
            dsPathCount: countOf(dsInput.paths)
          }),
          ...(countOf(dsInput.writes) !== void 0 && {
            dsWriteCount: countOf(dsInput.writes)
          }),
          ...(countOf(dsInput.deletes) !== void 0 && {
            dsDeleteCount: countOf(dsInput.deletes)
          }),
          ...(validateCounts && {
            dsValidateTotal: validateCounts.total,
            dsValidateBad: validateCounts.bad,
            dsValidateThin: validateCounts.thin,
            dsValidateVi: validateCounts.variantsIdentical,
            dsValidateIterations: validateCounts.iterations
          })
        };
      }
    }
    if (He(toolNameLoggable), W("tengu_tool_use_success", {
      messageID: xr(messageId),
      toolName: Pi(tool.name),
      isMcp: tool.isMcp ?? !1,
      durationMs: callDuration,
      rssDeltaBytes: memoryAfter.rss - memoryBefore.rss,
      heapUsedDeltaBytes: memoryAfter.heapUsed - memoryBefore.heapUsed,
      externalDeltaBytes: memoryAfter.external - memoryBefore.external,
      preToolHookDurationMs: preHookDuration,
      permissionDurationMs: permissionDuration,
      toolResultSizeBytes: resultSizeBytes,
      ...(attachmentBytes > 0 && {
        toolResultAttachmentBytes: attachmentBytes
      }),
      toolInputSizeBytes: inputSizeBytes,
      ...(fileExtension !== void 0 && {
        fileExtension: fileExtension
      }),
      ...(bashCommandFileExtensions !== void 0 && {
        bashCommandFileExtensions: bashCommandFileExtensions
      }),
      ...(filePathLen !== void 0 && {
        filePathLen: filePathLen
      }),
      ...(bashCommandLen !== void 0 && {
        bashCommandLen: bashCommandLen
      }),
      ...dsFields,
      ...(tool.name === vs && input && typeof input === "object" && {
        readHasLimit: input.limit !== void 0,
        readHasOffset: input.offset !== void 0
      }),
      queryChainId: xr(context.queryTracking?.chainId),
      queryDepth: context.queryTracking?.depth,
      ...(context.options.messageClientPlatform && {
        messageClientPlatform: context.options.messageClientPlatform
      }),
      ...(mcpServerType && {
        mcpServerType: Le(mcpServerType)
      }),
      ...(mcpServerBaseUrl && {
        mcpServerBaseUrl: z4(mcpServerBaseUrl)
      }),
      ...(requestId && {
        requestId: xr(requestId)
      }),
      ...(tool.readOnlyHint !== void 0 && {
        readOnlyHint: tool.readOnlyHint
      }),
      ...C8(tool.name, mcpNameLoggable)
    }), If() && (tool.name === Mo || tool.name === ws) && "command" in input && typeof input.command === "string" && input.command.match(/\bgit\s+commit\b/) && toolResult.data && typeof toolResult.data === "object" && "stdout" in toolResult.data) {
      let commitId = _to(String(toolResult.data.stdout));
      if (commitId) toolParams.git_commit_id = commitId;
    }
    let mcpScope = dXr(tool);
    bu("tool_result", {
      tool_name: Pi(tool.name),
      tool_use_id: toolUseID,
      success: "true",
      duration_ms: String(callDuration),
      ...(Object.keys(toolParams).length > 0 && {
        tool_parameters: Pe(toolParams)
      }),
      ...(truncatedInput && {
        tool_input: truncatedInput
      }),
      tool_input_size_bytes: String(inputSizeBytes),
      tool_result_size_bytes: String(resultSizeBytes),
      ...(decisionRecord && {
        decision_source: decisionRecord.source,
        decision_type: decisionRecord.decision
      }),
      ...(mcpScope && {
        mcp_server_scope: mcpScope
      })
    });
    let toolData = toolResult.data,
      postHookMessages = [],
      contextLayers = toolResult.contextLayers,
      mcpMeta = toolResult.mcpMeta,
      endsTurn = toolResult.endsTurn;
    async function appendResult(data: any, overrideBlock?: any): Promise<any> {
      let content = [overrideBlock ? await eia(overrideBlock, tool.name, tool.maxResultSizeChars, tool.persistenceThresholdCeiling) : await jst(tool, data, toolUseID)];
      if ("acceptFeedback" in decision && decision.acceptFeedback) content.push({
        type: "text",
        text: decision.acceptFeedback
      });
      let extraBlocks = "contentBlocks" in decision ? decision.contentBlocks : void 0;
      if (extraBlocks?.length) content.push(...extraBlocks);
      let imagePasteIds: any;
      if (extraBlocks?.length) {
        let imageCount = zn(extraBlocks, (block: any) => block.type === "image");
        if (imageCount > 0) {
          let base = rel(context.messages);
          imagePasteIds = Array.from({
            length: imageCount
          }, (_x, offset) => base + offset);
        }
      }
      outMessages.push({
        message: Mn({
          content: content,
          imagePasteIds: imagePasteIds,
          toolUseResult: context.agentId && !context.preserveToolUseResults && !tool.preserveToolUseResultInSubagents ? void 0 : data,
          mcpMeta: Myo(context.agentId, mcpMeta),
          toolEndsTurn: endsTurn,
          sourceToolAssistantUUID: assistantMessage.uuid,
          now: now
        }),
        contextLayers: contextLayers && contextLayers.length > 0 ? {
          toolUseID: toolUseID,
          layers: contextLayers
        } : void 0
      });
    }
    let postHookAttachments = [],
      postHookStart = Date.now(),
      ranPostHook = !1,
      outputUpdated = !1;
    for await (let event of K6n(context, tool, toolUseID, assistantMessage.message.id, input, toolData, requestId, mcpServerType, mcpServerBaseUrl, callDuration)) if (ranPostHook = !0, "updatedToolOutput" in event) toolData = event.updatedToolOutput, outputUpdated = !0;else if (postHookMessages.push(event), event.message.type === "attachment") {
      let attachment = event.message.attachment;
      if ("command" in attachment && attachment.command !== void 0 && "durationMs" in attachment && attachment.durationMs !== void 0) postHookAttachments.push({
        command: attachment.command,
        durationMs: attachment.durationMs
      });
    }
    let postHookDuration = Date.now() - postHookStart;
    if (ranPostHook) {
      let stateMessage = G6n(tool.name, toolUseID, input, context.readFileState);
      if (stateMessage) postHookMessages.push({
        message: stateMessage
      });
    }
    if (postHookDuration >= Fyo) A(`Slow PostToolUse hooks: ${postHookDuration}ms for ${tool.name} (${postHookAttachments.length} hooks)`, {
      level: "info"
    });
    if (Zk(tool)) await appendResult(toolData);else {
      let resultBlockToUse = resultBlock;
      if (outputUpdated) {
        let validated = tool.outputSchema?.safeParse(toolData),
          rejectUpdate = (reason: any) => {
            A(`PostToolUse hook returned updatedToolOutput that does not match ${tool.name}'s output shape: ${reason}`, {
              level: "error"
            }), toolData = toolResult.data, postHookMessages.push({
              message: ti({
                type: "hook_error_during_execution",
                content: `PostToolUse hook returned updatedToolOutput that does not match ${tool.name}'s output shape; using original output. ${reason}`,
                hookName: `PostToolUse:${tool.name}`,
                toolUseID: toolUseID,
                hookEvent: "PostToolUse"
              })
            });
          };
        if (validated && !validated.success) rejectUpdate(validated.error.message);else try {
          let remapped = tool.mapToolResultToToolResultBlockParam(toolData, toolUseID);
          if (remapped === void 0) rejectUpdate("mapper returned undefined");else resultBlockToUse = remapped;
        } catch (err) {
          rejectUpdate(Vye(err));
        }
      }
      await appendResult(toolData, resultBlockToUse);
    }
    for (let message of postHookMessages) outMessages.push(message);
    if (toolResult.newMessages && toolResult.newMessages.length > 0) for (let message of toolResult.newMessages) outMessages.push({
      message: message
    });
    if (preventContinuation) outMessages.push({
      message: ti({
        type: "hook_stopped_continuation",
        message: stopReason || "Execution stopped by hook",
        hookName: `PreToolUse:${tool.name}`,
        toolUseID: toolUseID,
        hookEvent: "PreToolUse"
      })
    });
    return outMessages;
  } catch (err) {
    let callDuration = Date.now() - callStart,
      memoryAfter = process.memoryUsage();
    if (tJt(callDuration), !dispatched) A(`[Stall] tool_dispatch_end tool=${tool.name} toolUseId=${toolUseID} outcome=${Emt(err) ? "aborted" : "error"} durationMs=${callDuration}`, {
      level: Emt(err) ? "info" : "warn"
    });else A(`[Stall] tool_dispatch_post_error tool=${tool.name} toolUseId=${toolUseID} durationMs=${callDuration}`, {
      level: "warn"
    });
    let errorMessage = Ce(err),
      errorType = q5n(err);
    if (jXr({
      success: !1,
      error: If() ? errorMessage : errorType
    }), cFt(span), err instanceof c3e) XDn(err.serverName, context.setAppState);
    let aborted = Dke(context.abortController.signal);
    if (!aborted && !Emt(err)) {
      A(`${tool.name} tool error (${callDuration}ms): ${errorMessage.slice(0, 200)}`);
      let {
        code: code,
        isSad: isSad
      } = oel(err);
      if (isSad) Pt(toolNameLoggable, code);else Ie(err), xe(toolNameLoggable, code);
      W("tengu_tool_use_error", {
        messageID: xr(messageId),
        toolName: Pi(tool.name),
        error: errorType,
        ...aO(err),
        errorCode: errorType,
        isMcp: tool.isMcp ?? !1,
        ...bXe(context.agentContext),
        rssDeltaBytes: memoryAfter.rss - memoryBefore.rss,
        heapUsedDeltaBytes: memoryAfter.heapUsed - memoryBefore.heapUsed,
        externalDeltaBytes: memoryAfter.external - memoryBefore.external,
        ...(tool.name === vBt && {
          dsMethod: String(input.method)
        }),
        queryChainId: xr(context.queryTracking?.chainId),
        queryDepth: context.queryTracking?.depth,
        ...(context.options.messageClientPlatform && {
          messageClientPlatform: context.options.messageClientPlatform
        }),
        ...(mcpServerType && {
          mcpServerType: Le(mcpServerType)
        }),
        ...(mcpServerBaseUrl && {
          mcpServerBaseUrl: z4(mcpServerBaseUrl)
        }),
        ...(requestId && {
          requestId: xr(requestId)
        }),
        ...(tool.readOnlyHint !== void 0 && {
          readOnlyHint: tool.readOnlyHint
        }),
        ...C8(tool.name, mcpNameLoggable)
      });
      let mcpScope = dXr(tool);
      bu("tool_result", {
        tool_name: Pi(tool.name),
        tool_use_id: toolUseID,
        success: "false",
        duration_ms: String(callDuration),
        error_type: errorType,
        ...(If() && {
          error: errorMessage
        }),
        ...(Object.keys(toolParams).length > 0 && {
          tool_parameters: Pe(toolParams)
        }),
        ...(truncatedInput && {
          tool_input: truncatedInput
        }),
        tool_input_size_bytes: String(inputSizeBytes),
        ...(decisionRecord && {
          decision_source: decisionRecord.source,
          decision_type: decisionRecord.decision
        }),
        ...(mcpScope && {
          mcp_server_scope: mcpScope
        })
      });
    }
    let errorContent = b3p(err, context.abortController.signal),
      errorMcpMeta = err instanceof UFt ? err.mcpMeta : void 0,
      isAbort = Emt(err),
      postErrorMessages = [];
    for await (let message of z6n(context, tool, toolUseID, messageId, input, errorContent, isAbort || aborted, requestId, mcpServerType, mcpServerBaseUrl, callDuration)) postErrorMessages.push(message);
    if (aborted) return $5n({
      phase: "call",
      tool: tool,
      toolUseID: toolUseID,
      toolUseContext: context,
      assistantMessage: assistantMessage,
      mcpServerType: mcpServerType,
      mcpServerBaseUrl: mcpServerBaseUrl,
      mcpNameLoggable: mcpNameLoggable,
      requestId: requestId,
      now: now
    });
    return outMessages.push({
      message: Mn({
        content: [{
          type: "tool_result",
          content: errorContent,
          is_error: !0,
          tool_use_id: toolUseID
        }],
        toolUseResult: `Error: ${errorContent}`,
        mcpMeta: Myo(context.agentId, errorMcpMeta),
        sourceToolAssistantUUID: assistantMessage.uuid,
        now: now
      })
    }, ...postErrorMessages), outMessages;
  } finally {
    if (U5n("tool_exec", context.agentId), decisionRecord && context.toolDecisions) delete context.toolDecisions[toolUseID];
  }
}
var Fyo = 2000,
  E3p;
var Cmt = b(() => {
  kt();
  vu();
  Qr();
  lt();
  D$e();
  lto();
  ri();
  jO();
  d$();
  ry();
  MHe();
  dm();
  dw();
  ow();
  XR();
  dto();
  $A();
  iat();
  zz();
  cx();
  lh();
  Ph();
  GA();
  xl();
  qe();
  NW();
  Ct();
  IA();
  Wd();
  pd();
  vn();
  po();
  C9n();
  gA();
  W5e();
  tn();
  kke();
  lr();
  oS();
  Z4();
  Hqt();
  yUe();
  HI();
  sj();
  Gz();
  mn();
  _k();
  Ew();
  Nyo();
  T0();
  eet();
  qO();
  d_o();
  f_o();
  omt();
  E3p = new Set(["AgentPreconditionError", "AgentTypeError", "ArtifactInputError", "ConnectorRegistryUnavailableError", "PluginSkillSearchUnavailableError", "CtxAgentValidationError", "DesignSyncPreconditionError", "DomainBlockedError", "DomainCheckFailedError", "EgressBlockedError", "RipgrepTimeoutError", "FileStateError", "FileTooLargeError", "ImageResizeError", "McpError", "McpResponseSchemaError", "MonitorMcpPreconditionError", "NotebookReadError", "PlanPreconditionError", "ProjectsPreconditionError", "RemoteAgentPreconditionError", "SandboxBridgeUnavailableError", "SandboxInitFailedError", "SelfHostedRunnerApiError", "StreamableHTTPError", "StopTaskError", "SwarmPaneError", "SymlinkWriteRefusedError", "TooManyRedirectsError", "WebFetchTransportError", "WorkflowInputError", "WorkflowRemotePreconditionError", "WorktreeGitTransientError", "WorktreeIsolationError"]);
});

export {q5n,Byo,Emt,b3p,oel,C3p,A3p,Uyo,R3p,rel,kG,v3p,i6t,w3p,k3p,$5n,H3p,Fyo,E3p,Cmt};

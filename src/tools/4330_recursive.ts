// @ts-nocheck
import {getClaudeTempDir as XF,checkReadNetworkPathSafety as wmt,Xm} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Ve} from "../../vendor/m5.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {Lw,J$} from "../../vendor/m4308.ts";
import {IDLE_SPECULATION_STATE as hIe,gIe} from "../../vendor/m3317.ts";
import {$eo,zO,pOn,Weo,Geo,v3e} from "../permissions/3315_enabled.ts";
import {Mn,po} from "./5224_userPromptCount.ts";
import {h1,lh} from "../../vendor/m2739.ts";
import {createCacheSafeParams as BW,runForkedAgent as vI,ID} from "../artifact/4427_withDisallowedCommandTools.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {getCwdState as XV,lt} from "../session/0132_sent.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {p1,Zm} from "../config/2709_Zm.ts";
import {Mo} from "../mcp/2200_mcpServerName.ts";
import {EOn,CBt} from "../../vendor/m3320.ts";
import {d6t,jO} from "./4385_stripAllEnvVars.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {isTranscriptPersistenceDisabled as s9,trackSessionWrite as jyo,fireSessionMirror as zyo,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {Nm,D_} from "../agent/2784_withFileTypes.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {Rmt,Z6e} from "../permissions/4329_type.ts";
import {eB,jrt,Gk} from "../../vendor/m2727.ts";
import {b} from "../../runtime.ts";
import {tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Xo} from "../../vendor/m240.ts";
// @ts-nocheck
/**
 * Speculation engine: while the user is mid-prompt, fork an agent that
 * speculatively executes a suggested next prompt against an overlay copy of
 * the working tree. If the user accepts the suggestion, the already-computed
 * messages are spliced in (saving time); otherwise the overlay is discarded.
 */

/** Recursively remove the overlay directory (fire-and-forget, retries). */
function u6t(overlayDir: string): void {
  del.rm(overlayDir, {
    recursive: !0,
    force: !0,
    maxRetries: 3,
    retryDelay: 100
  }, () => {});
}

/** Build the on-disk overlay path for a given speculation id. */
function V5n(speculationId: string): string {
  return JD.join(XF(), "speculation", String(process.pid), speculationId);
}

/** Construct a "deny" permission decision with a structured reason. */
function vmt(message: string, reason: string) {
  return {
    behavior: "deny",
    message,
    decisionReason: {
      type: "other",
      reason
    }
  };
}

/**
 * Copy speculation-written files from the overlay back into the real cwd.
 * Skips symlinks and any path whose parent escapes cwd via a symlink.
 * Returns whether every write succeeded.
 */
async function $3p(overlayDir: string, writtenPaths: Iterable<string>, cwd: string): Promise<boolean> {
  let allCopied = !0,
    realCwd: string;
  try {
    realCwd = await eN.realpath(cwd);
  } catch {
    return !1;
  }
  for (let rel of writtenPaths) {
    let src = JD.join(overlayDir, rel),
      dest = JD.join(cwd, rel);
    try {
      try {
        if ((await eN.lstat(src)).isSymbolicLink()) {
          allCopied = !1, A(`[Speculation] Skipping symlink source ${rel} in overlay`);
          continue;
        }
      } catch {
        allCopied = !1, A(`[Speculation] Failed to copy ${rel} to main`);
        continue;
      }
      let parentDir = JD.dirname(dest),
        realParent = null;
      for (;;) try {
        realParent = await eN.realpath(parentDir);
        break;
      } catch {
        let grandparent = JD.dirname(parentDir);
        if (grandparent === parentDir) break;
        parentDir = grandparent;
      }
      if (realParent === null || realParent !== realCwd && !realParent.startsWith(realCwd + JD.sep)) {
        allCopied = !1, A(`[Speculation] Skipping ${rel}: parent dir escapes cwd via symlink`);
        continue;
      }
      await eN.mkdir(JD.dirname(dest), {
        recursive: !0
      });
      let destStat;
      try {
        destStat = await eN.lstat(dest);
      } catch {}
      if (destStat?.isSymbolicLink()) try {
        await eN.unlink(dest);
      } catch {
        allCopied = !1, A(`[Speculation] Failed to unlink symlink at ${rel}`);
        continue;
      }
      await eN.copyFile(src, dest);
    } catch {
      allCopied = !1, A(`[Speculation] Failed to copy ${rel} to main`);
    }
  }
  return allCopied;
}

/** Emit the tengu_speculation telemetry event summarizing an outcome. */
function K5n(speculationId, outcome, startTime, suggestionLength, messages, boundary, extra) {
  W("tengu_speculation", {
    speculation_id: speculationId,
    outcome: Le(outcome),
    duration_ms: Date.now() - startTime,
    suggestion_length: suggestionLength,
    tools_executed: Vyo(messages),
    completed: boundary !== null,
    boundary_type: boundary?.type,
    boundary_tool: q3p(boundary),
    boundary_detail: W3p(boundary),
    ...extra
  });
}

/** Count successful (non-error) tool_result blocks across user messages. */
function Vyo(messages) {
  let resultBlocks = messages.filter(Kyo).flatMap(msg => msg.message.content).filter(block => typeof block === "object" && block !== null && "type" in block);
  return zn(resultBlocks, block => block.type === "tool_result" && !block.is_error);
}

/** Tool name associated with a speculation boundary, if any. */
function q3p(boundary) {
  if (!boundary) return;
  switch (boundary.type) {
    case "bash":
    case "edit":
    case "denied_tool":
      return boundary.toolName;
    case "complete":
      return;
  }
}

/** Human-readable detail string for a speculation boundary, if any. */
function W3p(boundary) {
  if (!boundary) return;
  switch (boundary.type) {
    case "bash":
      return boundary.command.slice(0, 200);
    case "edit":
      return boundary.filePath;
    case "denied_tool":
      return boundary.detail;
    case "complete":
      return;
  }
}

/** Type guard: a user message whose content is an array of blocks. */
function Kyo(entry) {
  return entry.type === "user" && "message" in entry && Array.isArray(entry.message.content);
}

/**
 * Strip speculation-internal blocks (orphaned tool_use/tool_result, thinking,
 * and the speculation sentinel texts) from the message list before injecting
 * the accepted speculation into the real transcript.
 */
function G3p(messages) {
  let isToolResult = block => typeof block === "object" && block !== null && block.type === "tool_result" && typeof block.tool_use_id === "string",
    isKeepableResult = block => !block.is_error && !(typeof block.content === "string" && block.content.includes(Lw)),
    keptResultIds = new Set(messages.filter(Kyo).flatMap(msg => msg.message.content).filter(isToolResult).filter(isKeepableResult).map(block => block.tool_use_id)),
    keepBlock = block => block.type !== "thinking" && block.type !== "redacted_thinking" && !(block.type === "tool_use" && !keptResultIds.has(block.id)) && !(block.type === "tool_result" && !keptResultIds.has(block.tool_use_id)) && !(block.type === "text" && (block.text === J$ || block.text === Lw));
  return messages.map(entry => {
    if (!("message" in entry) || !Array.isArray(entry.message.content)) return entry;
    let kept = entry.message.content.filter(keepBlock);
    if (kept.length === entry.message.content.length) return entry;
    if (kept.length === 0) return null;
    if (!kept.some(block => block.type !== "text" || block.text !== void 0 && block.text.trim() !== "")) return null;
    return {
      ...entry,
      message: {
        ...entry.message,
        content: kept
      }
    };
  }).filter(entry => entry !== null);
}

/** Placeholder hook for an injected boundary message (currently unused). */
function V3p(messages, boundary, timeSavedMs, totalTimeSavedMs) {
  return null;
}

/** Apply a partial update to the active speculation state, no-op if inactive. */
function G5e(setState, computePatch) {
  setState(state => {
    if (state.speculation.status !== "active") return state;
    let spec = state.speculation,
      patch = computePatch(spec);
    if (!Object.entries(patch).some(([key, value]) => spec[key] !== value)) return state;
    return {
      ...state,
      speculation: {
        ...spec,
        ...patch
      }
    };
  });
}

/** Reset speculation to the idle state. */
function Gyo(setState) {
  setState(state => {
    if (state.speculation.status === "idle") return state;
    return {
      ...state,
      speculation: hIe
    };
  });
}

/** Speculation is disabled; log and return false. */
function Veo(): boolean {
  return A("[Speculation] enabled=false"), !1;
}

/**
 * After a speculation completes, generate and stash the next pipelined prompt
 * suggestion so it can be promoted immediately if the current one is accepted.
 */
async function K3p(context, acceptedPrompt, completedMessages, setState, parentAbort) {
  try {
    let appState = context.toolUseContext.getAppState(),
      pipelineKey = $eo(appState);
    if (pipelineKey) {
      zO(`pipeline_${pipelineKey}`);
      return;
    }
    let pipelinedContext = {
        ...context,
        messages: [...context.messages, Mn({
          content: acceptedPrompt
        }), ...completedMessages]
      },
      abort = h1(parentAbort);
    if (abort.signal.aborted) return;
    let promptId = pOn(),
      {
        suggestion,
        generationRequestId
      } = await Weo(abort, promptId, BW(pipelinedContext));
    if (abort.signal.aborted) return;
    if (Geo(suggestion, promptId)) return;
    A(`[Speculation] Pipelined suggestion: "${suggestion.slice(0, 50)}..."`), G5e(setState, () => ({
      pipelinedSuggestion: {
        text: suggestion,
        promptId,
        generationRequestId
      }
    }));
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") return;
    A(`[Speculation] Pipelined suggestion failed: ${Ce(err)}`);
  }
}

/**
 * Start speculatively executing `suggestion` in a forked agent against an
 * overlay copy of the working tree, gating tool use to read-only / overlay-safe
 * operations and recording the first disallowed action as a boundary.
 */
async function Keo(suggestion, context, setState, isPipelined = !1, cacheSafeParams) {
  if (!Veo()) return;
  Bce(setState);
  let speculationId = uel.randomUUID().slice(0, 8),
    abort = h1(context.toolUseContext.abortController);
  if (abort.signal.aborted) return;
  let startTime = Date.now(),
    messagesRef = {
      current: []
    },
    writtenPathsRef = {
      current: new Set()
    },
    overlayDir = V5n(speculationId),
    cwd = XV();
  try {
    await eN.mkdir(overlayDir, {
      recursive: !0
    });
  } catch {
    A("[Speculation] Failed to create overlay directory");
    return;
  }
  let contextRef = {
    current: context
  };
  setState(state => ({
    ...state,
    speculation: {
      status: "active",
      id: speculationId,
      abort: () => abort.abort(),
      startTime,
      messagesRef,
      writtenPathsRef,
      boundary: null,
      suggestionLength: suggestion.length,
      toolUseCount: 0,
      isPipelined,
      contextRef
    }
  })), A(`[Speculation] Starting speculation ${speculationId}`);
  try {
    let result = await vI({
      promptMessages: [Mn({
        content: suggestion
      })],
      cacheSafeParams: cacheSafeParams ?? BW(context),
      skipTranscript: !0,
      canUseTool: async (tool, input) => {
        let isWriteTool = B3p.has(tool.name),
          isReadTool = U3p.has(tool.name);
        if (isWriteTool || isReadTool) {
          let networkDenial = wmt(tool, input, Mr(context.toolUseContext));
          if (networkDenial) return vmt(networkDenial.message, "speculation_network_path");
        }
        if (isWriteTool) {
          let {
            mode,
            isBypassPermissionsModeAvailable
          } = Mr(context.toolUseContext);
          if (!(mode === "acceptEdits" || mode === "bypassPermissions" || mode === "plan" && isBypassPermissionsModeAvailable)) {
            A(`[Speculation] Stopping at file edit: ${tool.name}`);
            let filePath = "file_path" in input ? input.file_path : void 0;
            return G5e(setState, () => ({
              boundary: {
                type: "edit",
                toolName: tool.name,
                filePath: filePath ?? "",
                completedAt: Date.now()
              }
            })), abort.abort(), vmt("Speculation paused: file edit requires permission", "speculation_edit_boundary");
          }
        }
        if (isWriteTool || isReadTool) {
          let pathKey = "notebook_path" in input ? "notebook_path" : "path" in input ? "path" : "file_path",
            pathValue = input[pathKey];
          if (pathValue) {
            let relPath = JD.relative(cwd, pathValue);
            if (JD.isAbsolute(relPath) || relPath.startsWith("..")) {
              if (isWriteTool) return A(`[Speculation] Denied ${tool.name}: path outside cwd: ${pathValue}`), vmt("Write outside cwd not allowed during speculation", "speculation_write_outside_root");
              return {
                behavior: "allow",
                updatedInput: input,
                decisionReason: {
                  type: "other",
                  reason: "speculation_read_outside_root"
                }
              };
            }
            if (isWriteTool) {
              if (!writtenPathsRef.current.has(relPath)) {
                let overlayPath = JD.join(overlayDir, relPath);
                await eN.mkdir(JD.dirname(overlayPath), {
                  recursive: !0
                });
                try {
                  await eN.copyFile(JD.join(cwd, relPath), overlayPath);
                } catch {}
                writtenPathsRef.current.add(relPath);
              }
              input = {
                ...input,
                [pathKey]: JD.join(overlayDir, relPath)
              };
            } else if (writtenPathsRef.current.has(relPath)) input = {
              ...input,
              [pathKey]: JD.join(overlayDir, relPath)
            };
            return A(`[Speculation] ${isWriteTool ? "Write" : "Read"} ${pathValue} -> ${input[pathKey]}`), {
              behavior: "allow",
              updatedInput: input,
              decisionReason: {
                type: "other",
                reason: "speculation_file_access"
              }
            };
          }
          if (isReadTool) return {
            behavior: "allow",
            updatedInput: input,
            decisionReason: {
              type: "other",
              reason: "speculation_read_default_cwd"
            }
          };
        }
        if (p1.includes(tool.name)) {
          let command = "command" in input && typeof input.command === "string" ? input.command : "";
          if ("run_in_background" in input && input.run_in_background === !0) return A(`[Speculation] Stopping at backgrounded ${tool.name}: ${command.slice(0, 50)}`), G5e(setState, () => ({
            boundary: {
              type: "bash",
              toolName: tool.name,
              command: `[backgrounded] ${command}`,
              completedAt: Date.now()
            }
          })), abort.abort(), vmt("Speculation paused: backgrounded shell", "speculation_bash_background");
          let parsed = tool.inputSchema.safeParse({
              command
            }),
            isReadOnly = tool.name === Mo ? EOn({
              command
            }, d6t(command)).behavior === "allow" : parsed.success && tool.isReadOnly(parsed.data);
          if (!command || !isReadOnly) return A(`[Speculation] Stopping at ${tool.name}: ${command.slice(0, 50) || "missing command"}`), G5e(setState, () => ({
            boundary: {
              type: "bash",
              toolName: tool.name,
              command,
              completedAt: Date.now()
            }
          })), abort.abort(), vmt("Speculation paused: shell boundary", "speculation_bash_boundary");
          return {
            behavior: "allow",
            updatedInput: input,
            decisionReason: {
              type: "other",
              reason: "speculation_readonly_bash"
            }
          };
        }
        A(`[Speculation] Stopping at denied tool: ${tool.name}`);
        let detail = String("url" in input && input.url || "file_path" in input && input.file_path || "path" in input && input.path || "command" in input && input.command || "").slice(0, 200);
        return G5e(setState, () => ({
          boundary: {
            type: "denied_tool",
            toolName: tool.name,
            detail,
            completedAt: Date.now()
          }
        })), abort.abort(), vmt(`Tool ${tool.name} not allowed during speculation`, "speculation_unknown_tool");
      },
      querySource: "speculation",
      forkLabel: "speculation",
      maxTurns: N3p,
      overrides: {
        abortController: abort,
        requireCanUseTool: !0
      },
      onMessage: msg => {
        if (msg.type === "assistant" || msg.type === "user") {
          if (messagesRef.current.push(msg), messagesRef.current.length >= F3p) abort.abort();
          if (Kyo(msg)) {
            let successCount = zn(msg.message.content, block => block.type === "tool_result" && !block.is_error);
            if (successCount > 0) G5e(setState, spec => ({
              toolUseCount: spec.toolUseCount + successCount
            }));
          }
        }
      }
    });
    if (abort.signal.aborted) return;
    G5e(setState, () => ({
      boundary: {
        type: "complete",
        completedAt: Date.now(),
        outputTokens: result.totalUsage.output_tokens
      }
    })), A(`[Speculation] Complete: ${Vyo(messagesRef.current)} tools`), K3p(contextRef.current, suggestion, messagesRef.current, setState, abort);
  } catch (err) {
    if (abort.abort(), err instanceof Error && err.name === "AbortError") {
      u6t(overlayDir), Gyo(setState);
      return;
    }
    u6t(overlayDir), Ie(err instanceof Error ? err : Error("Speculation failed")), K5n(speculationId, "error", startTime, suggestion.length, messagesRef.current, null, {
      error_type: err instanceof Error ? err.name : "Unknown",
      error_message: Ce(err).slice(0, 200),
      error_phase: Ve("start"),
      is_pipelined: isPipelined
    }), xe("prompt_suggestion_speculate", "start_failed"), Gyo(setState);
  }
}

/**
 * Accept the active speculation: abort the fork, flush overlay writes back to
 * cwd (if any), clean up, record time saved, and return the speculated
 * messages plus the boundary.
 */
async function z3p(speculation, setState, copyCount) {
  if (speculation.status !== "active") return null;
  let {
      id: speculationId,
      messagesRef,
      writtenPathsRef,
      abort,
      startTime,
      suggestionLength,
      isPipelined
    } = speculation,
    messages = messagesRef.current,
    overlayDir = V5n(speculationId),
    now = Date.now();
  if (abort(), copyCount > 0) await $3p(overlayDir, writtenPathsRef.current, XV());
  u6t(overlayDir);
  let boundary = speculation.boundary,
    timeSavedMs = Math.min(now, boundary?.completedAt ?? 1 / 0) - startTime;
  if (setState(state => {
    if (state.speculation.status === "active" && state.speculation.boundary) boundary = state.speculation.boundary, timeSavedMs = Math.min(now, boundary.completedAt ?? 1 / 0) - startTime;
    return {
      ...state,
      speculation: hIe,
      speculationSessionTimeSavedMs: state.speculationSessionTimeSavedMs + timeSavedMs
    };
  }), A(boundary === null ? `[Speculation] Accept ${speculationId}: still running, using ${messages.length} messages` : `[Speculation] Accept ${speculationId}: already complete`), K5n(speculationId, "accepted", startTime, suggestionLength, messages, boundary, {
    message_count: messages.length,
    time_saved_ms: timeSavedMs,
    is_pipelined: isPipelined
  }), timeSavedMs > 0 && !s9()) {
    let acceptEntry = {
      type: "speculation-accept",
      timestamp: new Date().toISOString(),
      timeSavedMs
    };
    jyo(() => eN.appendFile(Nm(), Pe(acceptEntry) + `
`, {
      mode: 384
    }).then(() => {
      zyo(Nm(), [acceptEntry]);
    })).catch(() => {
      A("[Speculation] Failed to write speculation-accept to transcript");
    });
  }
  return He("prompt_suggestion_speculate"), {
    messages,
    boundary,
    timeSavedMs
  };
}

/** Abort the active speculation, recording the reason and cleaning up. */
function Bce(setState, reason = "user_typed") {
  setState(state => {
    if (state.speculation.status !== "active") return state;
    let {
      id: speculationId,
      abort,
      startTime,
      boundary,
      suggestionLength,
      messagesRef,
      isPipelined
    } = state.speculation;
    return A(`[Speculation] Aborting ${speculationId} (${reason})`), K5n(speculationId, "aborted", startTime, suggestionLength, messagesRef.current, boundary, {
      abort_reason: reason,
      is_pipelined: isPipelined
    }), abort(), u6t(V5n(speculationId)), {
      ...state,
      speculation: hIe
    };
  });
}

/**
 * User accepted the suggestion: splice the speculated messages into the real
 * transcript, sync read-file state, and (if speculation completed) promote any
 * pipelined next suggestion. Returns whether a fresh query is still required.
 */
async function mel(speculation, sessionTimeSavedMs, setState, acceptedPrompt, options) {
  try {
    let {
      setMessages,
      readFileState,
      cwd
    } = options;
    setState(state => {
      if (state.promptSuggestion.text === null && state.promptSuggestion.promptId === null) return state;
      return {
        ...state,
        promptSuggestion: {
          text: null,
          promptId: null,
          shownAt: 0,
          acceptedAt: 0,
          generationRequestId: null
        }
      };
    });
    let rawMessages = speculation.messagesRef.current,
      cleanedMessages = G3p(rawMessages),
      acceptedUserMessage = Mn({
        content: acceptedPrompt,
        promptSource: "suggestion_accepted"
      });
    setMessages(prev => [...prev, acceptedUserMessage]);
    let acceptResult = await z3p(speculation, setState, cleanedMessages.length),
      completed = acceptResult?.boundary?.type === "complete";
    if (!completed) {
      let lastNonAssistant = cleanedMessages.findLastIndex(entry => entry.type !== "assistant");
      cleanedMessages = cleanedMessages.slice(0, lastNonAssistant + 1);
    }
    let timeSavedMs = acceptResult?.timeSavedMs ?? 0,
      totalTimeSavedMs = sessionTimeSavedMs + timeSavedMs,
      boundaryMessage = V3p(cleanedMessages, acceptResult?.boundary ?? null, timeSavedMs, totalTimeSavedMs);
    setMessages(prev => [...prev, ...cleanedMessages]);
    let fileStateUpdates = Rmt(cleanedMessages, cwd, eB);
    if (readFileState.current = jrt(readFileState.current, fileStateUpdates), boundaryMessage) setMessages(prev => [...prev, boundaryMessage]);
    if (A(`[Speculation] ${acceptResult?.boundary?.type ?? "incomplete"}, injected ${cleanedMessages.length} messages`), completed && speculation.pipelinedSuggestion) {
      let {
        text,
        promptId,
        generationRequestId
      } = speculation.pipelinedSuggestion;
      A(`[Speculation] Promoting pipelined suggestion: "${text.slice(0, 50)}..."`), setState(state => ({
        ...state,
        promptSuggestion: {
          text,
          promptId,
          shownAt: Date.now(),
          acceptedAt: 0,
          generationRequestId
        }
      }));
      let nextContext = {
        ...speculation.contextRef.current,
        messages: [...speculation.contextRef.current.messages, Mn({
          content: acceptedPrompt
        }), ...cleanedMessages]
      };
      Keo(text, nextContext, setState, !0);
    }
    return {
      queryRequired: !completed
    };
  } catch (err) {
    return Ie(err instanceof Error ? err : Error("handleSpeculationAccept failed")), K5n(speculation.id, "error", speculation.startTime, speculation.suggestionLength, speculation.messagesRef.current, speculation.boundary, {
      error_type: err instanceof Error ? err.name : "Unknown",
      error_message: Ce(err).slice(0, 200),
      error_phase: Ve("accept"),
      is_pipelined: speculation.isPipelined
    }), xe("prompt_suggestion_speculate", "accept_failed"), u6t(V5n(speculation.id)), Gyo(setState), {
      queryRequired: !0
    };
  }
}
var uel,
  del,
  eN,
  JD,
  N3p = 20,
  F3p = 100,
  B3p,
  U3p,
  pel = 30000;
var jit = b(() => {
  lt();
  gIe();
  jO();
  CBt();
  lh();
  tr();
  xl();
  qe();
  Ct();
  Gk();
  ID();
  Xo();
  vn();
  po();
  Xm();
  Z6e();
  D_();
  _a();
  Zm();
  tn();
  mn();
  kt();
  v3e();
  uel = require("crypto"), del = require("fs"), eN = require("fs/promises"), JD = require("path"), B3p = new Set(["Edit", "Write", "NotebookEdit"]), U3p = new Set(["Read", "Glob", "Grep", "ToolSearch", "LSP", "TaskGet", "TaskList"]);
});
export {u6t,V5n,vmt,$3p,K5n,Vyo,q3p,W3p,Kyo,G3p,V3p,G5e,Gyo,Veo,K3p,Keo,z3p,Bce,mel,uel,del,eN,JD,N3p,F3p,B3p,U3p,pel,jit};

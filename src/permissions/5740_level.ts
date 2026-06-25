// @ts-nocheck
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Zp,d1} from "../../vendor/m2705.ts";
import {Lk} from "../config/2259_R9r.ts";
import {Fce,G5n} from "../core/4328_id.ts";
import {Urt} from "../../vendor/m2706.ts";
import {Mo} from "../mcp/2200_mcpServerName.ts";
import {ws} from "../config/2709_Zm.ts";
import {kc,aA} from "../../vendor/m234.ts";
import {truncate as Ha,XH} from "../../vendor/m239.ts";
import {DD} from "../telemetry/2792_eventName.ts";
import {x4,kke} from "../../vendor/m2734.ts";
import {Qzt,Err} from "../session/5723_pending_action.ts";
import {TeamDeleteToolName as Pe,qt,tn} from "../config/0230_encoding.ts";
import {wn,pf} from "../config/0693_timestamp.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {ep} from "../../vendor/m2223.ts";
import {IYn} from "../session/5045_request_id.ts";
import {clearOAuthTokenCache as bF,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {writeToStdout as Ei,LP} from "../../vendor/m232.ts";
import {F_c,G$o,N_c,B_c} from "../../vendor/m5734.ts";
import {L_c,E_c,A_c,w_c,H_c,M_c} from "../tui/5734_matcher.ts";
import {TVe,K$o} from "../../vendor/m5738.ts";
import {$c,allTools as R_,Ct} from "../../vendor/m197.ts";
import {hasPermissionsToUseTool as lx,o6,guardHookUpdatedInput as vpt,checkRuleBasedPermissions as Fxe,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {V6n} from "../../vendor/m4253.ts";
import {getSessionId as It,lt} from "../session/0132_sent.ts";
import {TDe,jO} from "../tools/4385_stripAllEnvVars.ts";
import {cjt,Qyt,V$o} from "../core/5736_type.ts";
import {w_t,BOo} from "../../vendor/m5180.ts";
import {$_c,q_c} from "../core/5737_tool_name.ts";
import {W_c,G_c} from "../config/5738_G_c.ts";
import {nb,eee} from "../config/2679_eee.ts";
import {y6e,gye} from "./3986_editRemovalVisibility.ts";
import {yW,S$,Sw} from "../../vendor/m2789.ts";
import {SandboxManager as xo,Uh} from "../../vendor/m2682.ts";
import {C} from "../../vendor/m321.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {executePermissionRequestHooks as Fye} from "../hooks/5200_level.ts";
import {HOOK_REWRITE_HEADLESS_DENY_REASON as $Rt,jN} from "../../vendor/m721.ts";
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {IA} from "../telemetry/2225_names.ts";
import {Wd} from "../tools/5204_shouldSkipHookDueToTrust.ts";
// @ts-nocheck

/**
 * Build a short human-readable description of a tool use for push notifications.
 * Falls back to the tool's activity description, then to an empty string.
 */
function V_c(tool: any, input: any): string {
  try {
    return tool.getToolUseSummary?.(input) ?? tool.getActivityDescription?.(input) ?? "";
  } catch (err) {
    return A(`describeToolUseForPush failed: ${err}`, {
      level: "error"
    }), "";
  }
}

/**
 * Produce a push-notification label/body for tools that require explicit user
 * interaction (question prompts, plan review, etc). Returns undefined for tools
 * that do not require interaction.
 */
function HYm(tool: any, input: any): { label: string; body: string } | undefined {
  if (!tool.requiresUserInteraction?.()) return;
  switch (tool.name) {
    case Zp:
      {
        let questions = Array.isArray(input?.questions) ? input.questions : [],
          firstQuestion = questions[0],
          questionText = firstQuestion?.header || firstQuestion?.question,
          moreSuffix = questions.length > 1 ? ` (+${questions.length - 1} more)` : "";
        return {
          label: "Question",
          body: questionText ? questionText + moreSuffix : "Tap to answer"
        };
      }
    case Lk:
      return {
        label: "Plan",
        body: "Plan ready for review"
      };
    case Urt:
      return {
        label: Fce(tool.name),
        body: ""
      };
    default:
      return {
        label: Fce(tool.name),
        body: ""
      };
  }
}

/**
 * Assemble the pending-action detail object surfaced to the SDK/UI for a tool
 * use awaiting permission. For interaction tools it uses the label/body from
 * HYm; otherwise it derives a command + action description.
 */
function IYm(tool: any, input: any, toolUseId: any, requestId: any): any {
  let interaction = HYm(tool, input);
  if (interaction) return {
    tool_name: tool.name,
    display_tool_name: interaction.label,
    action_description: interaction.body,
    raw_command: void 0,
    tool_use_id: toolUseId,
    request_id: "",
    input: input
  };
  let rawCommand = (tool.name === Mo || tool.name === ws) && typeof input.command === "string" ? kc(input.command) : void 0,
    actionDescription = rawCommand !== void 0 ? typeof input.description === "string" && input.description ? kc(input.description) : Ha(rawCommand, DD) : kc(V_c(tool, input));
  return {
    tool_name: tool.name,
    display_tool_name: Fce(tool.name),
    action_description: actionDescription,
    raw_command: rawCommand,
    tool_use_id: toolUseId,
    request_id: requestId,
    input: input
  };
}

/**
 * Structured stdin/stdout protocol driver for the SDK transport. Reads NDJSON
 * messages from the input stream, dispatches control requests/responses, tracks
 * pending permission and user-dialog requests, and writes control requests out.
 */
class ujt {
  input;
  replayUserMessages;
  structuredInput;
  pendingRequests = new Map();
  publishedPendingActionDetails = new Map();
  timedOutUserDialogs = new Map();
  restoredWorkerState = Promise.resolve(null);
  hydratePrefetch = Promise.resolve(null);
  inputClosed = !1;
  unexpectedResponseCallback;
  resolvedToolUseIds = new Set();
  prependedLines = [];
  stallTimer;
  stallFired = !1;
  createdAt = Date.now();
  onControlRequestSent;
  onControlRequestResolved;
  onUserDialogParked;
  onCommandLifecycle;
  sessionState;
  outbound = new x4();
  constructor(input: any, replayUserMessages: any, sessionState: any) {
    this.input = input;
    this.replayUserMessages = replayUserMessages;
    this.input = input, this.sessionState = sessionState ?? new Qzt(), this.structuredInput = this.read();
  }
  /** Record a resolved can_use_tool id, evicting the oldest once the cap is hit. */
  trackResolvedToolUseId(pending: any) {
    if (pending.request.subtype === "can_use_tool") {
      if (this.resolvedToolUseIds.add(pending.request.tool_use_id), this.resolvedToolUseIds.size > xYm) {
        let oldest = this.resolvedToolUseIds.values().next().value;
        if (oldest !== void 0) this.resolvedToolUseIds.delete(oldest);
      }
    }
  }
  flushInternalEvents() {
    return Promise.resolve();
  }
  flushDeliveryAcks() {
    return Promise.resolve();
  }
  flushClientEvents() {
    return Promise.resolve(!0);
  }
  flushSessionState() {
    return Promise.resolve();
  }
  get internalEventsPending() {
    return 0;
  }
  /** Queue a synthetic user message line to be prepended to the input stream. */
  prependUserMessage(content: any) {
    this.prependedLines.push(Pe({
      type: "user",
      session_id: "",
      message: {
        role: "user",
        content: content
      },
      parent_tool_use_id: null
    }) + `
`);
  }
  /** Async generator yielding parsed protocol messages from the input stream. */
  async *read() {
    let buffer = "",
      drainBuffer = async function* () {
        for (;;) {
          if (this.prependedLines.length > 0) buffer = this.prependedLines.join("") + buffer, this.prependedLines = [];
          let newlineIndex = buffer.indexOf(`
`);
          if (newlineIndex === -1) break;
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          let message = await this.processLine(line);
          if (message) wn("info", "cli_stdin_message_parsed", {
            type: message.type
          }), yield message;
        }
      }.bind(this);
    yield* drainBuffer();
    for await (let chunk of this.input) buffer += chunk, yield* drainBuffer();
    if (buffer) {
      let message = await this.processLine(buffer);
      if (message) yield message;
    }
    this.inputClosed = !0;
    for (let pending of this.pendingRequests.values()) pending.reject(Error("Tool permission stream closed before response received"));
  }
  getPendingPermissionRequests() {
    return Array.from(this.pendingRequests.values()).map(pending => pending.request).filter(req => req.request.subtype === "can_use_tool");
  }
  getPendingUserDialogRequests() {
    return Array.from(this.pendingRequests.values()).map(pending => pending.request).filter(req => req.request.subtype === "request_user_dialog");
  }
  /** Re-publish the last still-pending action so the UI keeps showing it. */
  republishSurvivingPendingAction() {
    let survivor;
    for (let [requestId, detail] of this.publishedPendingActionDetails) if (this.pendingRequests.has(requestId)) survivor = detail;
    if (!survivor) return;
    this.sessionState.republishPendingAction(survivor), W("tengu_pending_action_republished", {
      survivor_kind: Le(survivor.tool_name.startsWith("dialog:") ? "dialog" : "permission"),
      pending_permission_requests: this.getPendingPermissionRequests().length,
      pending_dialog_requests: this.getPendingUserDialogRequests().length
    });
  }
  /** Cancel all parked user dialogs of a given kind, replying with "cancelled". */
  cancelPendingUserDialogs(dialogKind: any, reason: any): number {
    let cancelledCount = 0;
    for (let {
      request: pending
    } of Array.from(this.pendingRequests.values())) {
      if (pending.request.subtype !== "request_user_dialog" || pending.request.dialog_kind !== dialogKind) continue;
      W("tengu_request_user_dialog_implicit_cancel", {
        dialog_kind: ep(dialogKind),
        reason: Le(reason)
      }), this.injectControlResponse({
        type: "control_response",
        response: {
          subtype: "success",
          request_id: pending.request_id,
          response: {
            behavior: "cancelled"
          }
        }
      }), cancelledCount += 1;
    }
    return cancelledCount;
  }
  setUnexpectedResponseCallback(callback: any) {
    this.unexpectedResponseCallback = callback;
  }
  /**
   * Returns true (and ignores) when an error-shaped control_response arrives for
   * a parked request_user_dialog — an error is not a human choice, so the dialog
   * must stay parked instead of being settled.
   */
  ignoresErrorShapedDialogResponse(pending: any, response: any): boolean {
    if (response.subtype !== "error" || pending.request.request.subtype !== "request_user_dialog") return !1;
    return W("tengu_request_user_dialog_response_ignored", {
      shape: Le("error"),
      dialog_kind: ep(pending.request.request.dialog_kind)
    }), A(`Ignoring error-shaped control_response for parked request_user_dialog request_id=${response.request_id} — not a human choice; dialog stays parked (error: ${response.error})`), !0;
  }
  /** Resolve/reject a pending request directly from an injected control response. */
  injectControlResponse(message: any) {
    let requestId = message.response?.request_id;
    if (!requestId) return;
    let pending = this.pendingRequests.get(requestId);
    if (!pending) {
      W("tengu_inject_control_response_unknown_id", {
        pending_control_requests: this.pendingRequests.size
      });
      return;
    }
    if (this.ignoresErrorShapedDialogResponse(pending, message.response)) return;
    if (this.trackResolvedToolUseId(pending.request), this.pendingRequests.delete(requestId), this.write({
      type: "control_cancel_request",
      request_id: requestId
    }), message.response.subtype === "error") pending.reject(Error(message.response.error));else {
      let payload = message.response.response;
      if (pending.schema) try {
        pending.resolve(pending.schema.parse(payload));
      } catch (err) {
        pending.reject(err);
      } else pending.resolve({});
    }
  }
  setOnControlRequestSent(callback: any) {
    this.onControlRequestSent = callback;
  }
  setOnControlRequestResolved(callback: any) {
    this.onControlRequestResolved = callback;
  }
  /** Parse a single NDJSON line and route it to the appropriate handler. */
  async processLine(line: any) {
    if (!line) return;
    try {
      let message = IYn(qt(line));
      if (message.type === "keep_alive") return;
      if (message.type === "update_environment_variables") {
        let appliedKeys = [],
          refusedKeys = [];
        for (let [key, value] of Object.entries(message.variables)) {
          if (!OYm.has(key)) {
            refusedKeys.push(key);
            continue;
          }
          process.env[key] = value, appliedKeys.push(key);
        }
        if (refusedKeys.length > 0) A(`[structuredIO] refused update_environment_variables for non-allowlisted keys: ${refusedKeys.join(", ")}`);
        if (appliedKeys.includes("CLAUDE_CODE_OAUTH_TOKEN")) bF();
        if (A(`[structuredIO] applied update_environment_variables: ${appliedKeys.join(", ")}`), typeof message.request_id === "string" && message.request_id) Ei(Pe({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: message.request_id
          }
        }) + `
`);
        return;
      }
      if (message.type === "control_response") {
        let uuid = "uuid" in message && typeof message.uuid === "string" ? message.uuid : void 0;
        if (uuid) this.onCommandLifecycle?.(uuid, "completed");
        let pending = this.pendingRequests.get(message.response.request_id);
        if (!pending) {
          let timedOut = this.timedOutUserDialogs.get(message.response.request_id);
          if (timedOut) {
            this.timedOutUserDialogs.delete(message.response.request_id);
            let lateBehavior = message.response.subtype === "success" ? message.response.response?.behavior : void 0,
              lateSubtype = message.response.subtype;
            W("tengu_request_user_dialog_late_answer", {
              dialog_kind: ep(timedOut.dialogKind),
              lateness_ms: Date.now() - timedOut.timedOutAt,
              response_subtype: Le(lateSubtype === "success" || lateSubtype === "error" ? lateSubtype : "other"),
              behavior: Le(lateBehavior === "completed" || lateBehavior === "cancelled" ? lateBehavior : lateBehavior === void 0 ? "absent" : "other")
            }), A(`Ignoring late request_user_dialog answer for request_id=${message.response.request_id}: the park deadline already settled this dialog as cancelled ${Date.now() - timedOut.timedOutAt}ms ago`);
            return;
          }
          let duplicateToolUseId = (message.response.subtype === "success" ? message.response.response : void 0)?.toolUseID;
          if (typeof duplicateToolUseId === "string" && this.resolvedToolUseIds.has(duplicateToolUseId)) {
            A(`Ignoring duplicate control_response for already-resolved toolUseID=${duplicateToolUseId} request_id=${message.response.request_id}`);
            return;
          }
          if (this.unexpectedResponseCallback) await this.unexpectedResponseCallback(message);
          return;
        }
        if (this.ignoresErrorShapedDialogResponse(pending, message.response)) return;
        if (this.trackResolvedToolUseId(pending.request), this.pendingRequests.delete(message.response.request_id), pending.request.request.subtype === "can_use_tool" && this.onControlRequestResolved) this.onControlRequestResolved(message.response.request_id);
        if (F_c(pending.request)) G$o();
        if (message.response.subtype === "error") {
          pending.reject(Error(message.response.error));
          return;
        }
        let payload = message.response.response;
        if (pending.schema) try {
          pending.resolve(pending.schema.parse(payload));
        } catch (err) {
          pending.reject(err);
        } else pending.resolve({});
        if (this.replayUserMessages) return message;
        return;
      }
      if (N_c(message)) G$o();
      if (message.type !== "user" && message.type !== "bash_command" && message.type !== "control_request" && message.type !== "assistant" && message.type !== "system") {
        A(`Ignoring unknown message type: ${message.type}`, {
          level: "warn"
        });
        return;
      }
      if (message.type === "control_request") {
        if (!message.request) z$o("Error: Missing request on control_request");
        return message;
      }
      if (message.type === "assistant" || message.type === "system") return message;
      if (message.type === "bash_command") return message;
      if (message.message.role !== "user") z$o(`Error: Expected message role 'user', got '${message.message.role}'`);
      return message;
    } catch (err) {
      z$o(`Error parsing streaming input line: ${line}: ${err}`);
    }
  }
  resetStallWatchdog() {
    this.stallFired = !1;
  }
  /** Arm the stall watchdog timer and sample SDK message schema for telemetry. */
  trackWrite(message: any) {
    if (this.stallTimer) clearTimeout(this.stallTimer);
    if (message.type !== "result" && !this.stallFired) this.stallTimer = setTimeout(lastMessageType => {
      if (this.sessionState.getState() !== "running") return;
      this.stallFired = !0, W("tengu_sdk_stall", {
        session_age_ms: Date.now() - this.createdAt,
        session_state: Le(this.sessionState.getState()),
        last_message_type: lastMessageType,
        pending_control_requests: this.pendingRequests.size
      });
    }, LYm, message.type), this.stallTimer.unref();
    if (message.type !== "system" && Math.random() < MYm) {
      let parsed = L_c().safeParse(message);
      if (!parsed.success) W("tengu_sdk_schema_violation", {
        message_type: Le(message.type),
        error_path: parsed.error.issues[0]?.path.join(".") ?? ""
      });
    }
  }
  async write(message: any) {
    this.trackWrite(message), Ei(TVe(message) + `
`);
  }
  /** Send a control request and await its response under the given schema/signal. */
  async sendRequest(request: any, schema: any, signal: any, requestId = Zyt.randomUUID()) {
    let controlRequest = {
      type: "control_request",
      request_id: requestId,
      request: request
    };
    if (this.inputClosed) throw Error("Stream closed");
    if (signal?.aborted) throw Error("Request aborted");
    if (this.outbound.enqueue(controlRequest), request.subtype === "can_use_tool" && this.onControlRequestSent) this.onControlRequestSent(controlRequest);
    let onAbort = () => {
      this.outbound.enqueue({
        type: "control_cancel_request",
        request_id: requestId
      });
      let pending = this.pendingRequests.get(requestId);
      if (pending) this.trackResolvedToolUseId(pending.request), pending.reject(new $c());
    };
    if (signal) signal.addEventListener("abort", onAbort, {
      once: !0
    });
    let startedAt = Date.now();
    try {
      return await new Promise((resolve, reject) => {
        this.pendingRequests.set(requestId, {
          request: {
            type: "control_request",
            request_id: requestId,
            request: request
          },
          resolve: value => {
            resolve(value);
          },
          reject: reject,
          schema: schema
        });
      });
    } finally {
      if (W("tengu_sdk_control_roundtrip", {
        subtype: Le(request.subtype),
        duration_ms: Date.now() - startedAt,
        aborted: signal?.aborted ?? !1
      }), signal) signal.removeEventListener("abort", onAbort);
      this.pendingRequests.delete(requestId);
    }
  }
  /**
   * Build the canUseTool callback: resolves a permission decision locally, then
   * races the PermissionRequest hook against the SDK round-trip, publishing the
   * pending action and reconciling session state in the finally block.
   */
  createCanUseTool(publishPendingAction: any) {
    return async (tool: any, input: any, context: any, permissionContext: any, toolUseId: any, precomputed: any) => {
      let decision = precomputed ?? (await lx(tool, input, context, permissionContext, toolUseId));
      if (decision.behavior === "allow") return decision;
      if (decision.behavior === "deny") {
        let decisionReason = decision.decisionReason;
        return this.outbound.enqueue({
          type: "system",
          subtype: "permission_denied",
          tool_name: tool.name,
          tool_use_id: toolUseId,
          agent_id: context.agentId,
          decision_reason_type: decisionReason?.type,
          decision_reason: V6n(decisionReason),
          message: decision.message,
          uuid: Zyt.randomUUID(),
          session_id: It()
        }), decision;
      }
      let updatedInput = decision.updatedInput ?? input,
        suggestions = decision.suggestions;
      if (tool.name === Mo && typeof updatedInput.command === "string" && suggestions?.length && !suggestions.some(suggestion => suggestion.destination !== "session")) suggestions = [...TDe(updatedInput.command), ...suggestions];
      let hookAbortController = new AbortController(),
        contextSignal = context.abortController.signal,
        abortHook = () => hookAbortController.abort();
      contextSignal.addEventListener("abort", abortHook, {
        once: !0
      });
      let publishId = Zyt.randomUUID();
      try {
        let hookRace = NYm(tool, toolUseId, updatedInput, context, suggestions).then(hookDecision => ({
          source: "hook",
          decision: hookDecision
        }));
        if (publishPendingAction) {
          let detail = IYm(tool, updatedInput, toolUseId, publishId);
          this.publishedPendingActionDetails.set(publishId, detail), publishPendingAction(detail);
        }
        let decisionReason = decision.decisionReason,
          classifierApprovable = o6(decisionReason),
          isCommandTool = tool.name === Mo || tool.name === ws,
          description = (decision.metadata && "command" in decision.metadata ? decision.metadata.command.description : void 0) || (isCommandTool && typeof updatedInput.command === "string" ? typeof updatedInput.description === "string" && updatedInput.description ? kc(updatedInput.description) : Ha(kc(updatedInput.command), DD) : V_c(tool, updatedInput)) || void 0,
          sdkRace = this.sendRequest({
            subtype: "can_use_tool",
            tool_name: tool.name,
            display_name: Fce(tool.name),
            input: updatedInput,
            ...(description && {
              description: description
            }),
            permission_suggestions: suggestions,
            blocked_path: decision.blockedPath,
            decision_reason: V6n(decisionReason),
            decision_reason_type: decisionReason?.type,
            classifier_approvable: classifierApprovable ? !o6(decisionReason, reason => !reason.classifierApprovable) : void 0,
            tool_use_id: toolUseId,
            agent_id: context.agentId
          }, cjt(), hookAbortController.signal, publishId).then(result => ({
            source: "sdk",
            result: result
          })),
          winner = await Promise.race([hookRace, sdkRace]);
        if (winner.source === "hook") {
          if (winner.decision) return sdkRace.catch(() => {}), hookAbortController.abort(), winner.decision;
          let sdkResult = await sdkRace;
          return Qyt(sdkResult.result, tool, updatedInput, context);
        }
        return Qyt(winner.result, tool, updatedInput, context);
      } catch (err) {
        return Qyt({
          behavior: "deny",
          message: `Tool permission request failed: ${err}`,
          toolUseID: toolUseId
        }, tool, updatedInput, context);
      } finally {
        if (this.publishedPendingActionDetails.delete(publishId), this.getPendingPermissionRequests().length === 0 && this.getPendingUserDialogRequests().length === 0) this.sessionState.notifyStateChanged("running");else this.sessionState.reteeWaitingOnUser(), this.republishSurvivingPendingAction();
        contextSignal.removeEventListener("abort", abortHook);
      }
    };
  }
  /** Build a hook callback descriptor that proxies the hook through the SDK. */
  createHookCallback(callbackId: any, timeout: any) {
    return {
      type: "callback",
      timeout: timeout,
      callback: async (input: any, toolUseId: any, signal: any) => {
        try {
          return await this.sendRequest({
            subtype: "hook_callback",
            callback_id: callbackId,
            input: input,
            tool_use_id: toolUseId || void 0
          }, w_t(), signal);
        } catch (err) {
          if (R_(err)) throw err;
          return console.error(`Error in hook callback ${callbackId}:`, err), {};
        }
      }
    };
  }
  /** Forward an MCP elicitation request to the SDK, defaulting to cancel on error. */
  async handleElicitation(serverName: any, message: any, requestedSchema: any, signal: any, mode: any, url: any, elicitationId: any, metadata: any) {
    try {
      return await this.sendRequest({
        subtype: "elicitation",
        mcp_server_name: serverName,
        message: message,
        mode: mode,
        url: url,
        elicitation_id: elicitationId,
        requested_schema: requestedSchema,
        title: metadata?.title,
        display_name: metadata?.displayName,
        description: metadata?.description
      }, E_c(), signal);
    } catch {
      return {
        action: "cancel"
      };
    }
  }
  /** Park a user dialog request, arm a timeout that auto-cancels it, and await the answer. */
  async requestUserDialog(dialogKind: any, payload: any, options: any) {
    let requestId = Zyt.randomUUID(),
      detail = $_c(dialogKind, payload, requestId, options?.toolUseId);
    this.publishedPendingActionDetails.set(requestId, detail), this.sessionState.notifyStateChanged("requires_action", detail), this.onUserDialogParked?.(detail), W("tengu_request_user_dialog_requires_action", {
      dialog_kind: ep(dialogKind)
    });
    let timeoutMs = W_c(),
      timeoutTimer;
    if (timeoutMs > 0) timeoutTimer = setTimeout((parkedRequestId, parkedDialogKind, parkedTimeoutMs) => {
      if (!this.pendingRequests.has(parkedRequestId)) return;
      this.timedOutUserDialogs.set(parkedRequestId, {
        dialogKind: parkedDialogKind,
        timedOutAt: Date.now()
      }), W("tengu_request_user_dialog_timeout", {
        dialog_kind: ep(parkedDialogKind),
        timeout_ms: parkedTimeoutMs
      }), this.injectControlResponse({
        type: "control_response",
        response: {
          subtype: "success",
          request_id: parkedRequestId,
          response: {
            behavior: "cancelled"
          }
        }
      });
    }, timeoutMs, requestId, dialogKind, timeoutMs), timeoutTimer.unref();
    try {
      return await this.sendRequest({
        subtype: "request_user_dialog",
        dialog_kind: dialogKind,
        payload: payload,
        tool_use_id: options?.toolUseId
      }, A_c(), options?.signal, requestId);
    } catch {
      return {
        behavior: "cancelled"
      };
    } finally {
      if (timeoutTimer !== void 0) clearTimeout(timeoutTimer);
      if (this.publishedPendingActionDetails.delete(requestId), this.getPendingUserDialogRequests().length === 0 && this.getPendingPermissionRequests().length === 0) this.sessionState.notifyStateChanged("running");else {
        if (!this.timedOutUserDialogs.has(requestId)) this.sessionState.reteeWaitingOnUser();
        this.republishSurvivingPendingAction();
      }
    }
  }
  /**
   * Build the sandbox "ask to allow host" callback. Deduplicates concurrent and
   * already-granted hosts, prompts via a can_use_tool request, and on allow
   * persists the new domain rule into local settings.
   */
  createSandboxAskCallback(onPermissionsUpdated: any) {
    let inflight = new Map(),
      grantedHosts = new Set(),
      askForHost = async host => {
        try {
          let suggestion = {
              type: "addRules",
              rules: [{
                toolName: nb,
                ruleContent: `domain:${host}`
              }],
              behavior: "allow",
              destination: "localSettings"
            },
            result = await this.sendRequest({
              subtype: "can_use_tool",
              tool_name: y6e,
              display_name: Fce(y6e),
              input: {
                host: host
              },
              permission_suggestions: [suggestion],
              tool_use_id: Zyt.randomUUID(),
              description: `Allow network connection to ${host}?`
            }, cjt());
          if (result.behavior !== "allow") return !1;
          let updatedPermissions = result.updatedPermissions;
          if (updatedPermissions && updatedPermissions.length > 0) yW(updatedPermissions), onPermissionsUpdated?.(permissionContext => S$(permissionContext, updatedPermissions)), xo.refreshConfig(), grantedHosts.add(host);
          return !0;
        } catch {
          return !1;
        }
      };
    return request => {
      let host = request.host;
      if (grantedHosts.has(host)) return Promise.resolve(!0);
      let pending = inflight.get(host);
      if (pending) return pending;
      let promise = askForHost(host).finally(() => {
        inflight.delete(host);
      });
      return inflight.set(host, promise), promise;
    };
  }
  /** Relay an MCP message through the SDK and return its mcp_response payload. */
  async sendMcpMessage(serverName: any, message: any) {
    return (await this.sendRequest({
      subtype: "mcp_message",
      server_name: serverName,
      message: message
    }, C.object({
      mcp_response: C.any()
    }))).mcp_response;
  }
  /** Ask the SDK host to refresh the OAuth token; returns the new access token. */
  async requestOAuthTokenRefresh() {
    return (await this.sendRequest({
      subtype: "oauth_token_refresh"
    }, w_c(), AbortSignal.timeout(DYm))).accessToken;
  }
  /** Ask the SDK host to refresh the host auth token; returns the new auth token. */
  async requestHostAuthTokenRefresh(timeoutMs = PYm) {
    return (await this.sendRequest({
      subtype: "host_auth_token_refresh"
    }, H_c(), AbortSignal.timeout(timeoutMs))).authToken;
  }
}

/** Log a fatal error and exit the process. */
function z$o(errorMessage: any): void {
  console.error(errorMessage), process.exit(1);
}

/**
 * Run the PermissionRequest hook chain for a tool use, translating an allow/deny
 * hook result into a permission decision. Re-evaluates ask-path rules when the
 * hook rewrites the tool input. Returns undefined when no hook decides.
 */
async function NYm(tool: any, toolUseId: any, input: any, context: any, suggestions: any): Promise<any> {
  let mode = Mr(context).mode,
    hookResults = Fye(tool.name, toolUseId, input, context, mode, suggestions, context.abortController.signal);
  for await (let hookResult of hookResults) if (hookResult.permissionRequestResult && (hookResult.permissionRequestResult.behavior === "allow" || hookResult.permissionRequestResult.behavior === "deny")) {
    let permissionResult = hookResult.permissionRequestResult;
    if (permissionResult.behavior === "allow") {
      let resolvedInput = permissionResult.updatedInput || input;
      if (permissionResult.updatedInput) {
        let reeval = vpt(await Fxe(tool, resolvedInput, context), tool.name);
        if (reeval) return reeval.behavior === "ask" ? {
          behavior: "deny",
          message: reeval.message,
          decisionReason: reeval.decisionReason ?? $Rt,
          decideLocation: "ask-path"
        } : {
          ...reeval,
          decideLocation: "ask-path"
        };
      }
      let updatedPermissions = permissionResult.updatedPermissions ?? [];
      if (updatedPermissions.length > 0) yW(updatedPermissions), context.setToolPermissionContext(permissionContext => S$(permissionContext, updatedPermissions));
      return {
        behavior: "allow",
        updatedInput: resolvedInput,
        userModified: !1,
        decisionReason: {
          type: "hook",
          hookName: "PermissionRequest"
        }
      };
    } else return {
      behavior: "deny",
      message: permissionResult.message || "Permission denied by PermissionRequest hook",
      decisionReason: {
        type: "hook",
        hookName: "PermissionRequest"
      },
      decideLocation: "ask-path"
    };
  }
  return;
}

var Zyt,
  xYm = 1000,
  DYm = 30000,
  PYm = 30000,
  OYm,
  LYm = 300000,
  MYm = 0.01;

// Module initializer — eagerly load all side-effectful dependency modules
var j$o = b(() => {
  lt();
  M_c();
  kt();
  B_c();
  d1();
  jO();
  eee();
  BOo();
  jN();
  lo();
  qe();
  pf();
  Ct();
  V$o();
  ly();
  LP();
  aA();
  Uh();
  tn();
  XH();
  Qr();
  G5n();
  xl();
  q_c();
  IA();
  Wd();
  Sw();
  gye();
  Err();
  tn();
  kke();
  G_c();
  K$o();
  Zyt = require("crypto");
  OYm = new Set(["CLAUDE_CODE_SESSION_ACCESS_TOKEN", "CLAUDE_CODE_OAUTH_TOKEN"]);
});

export {V_c,HYm,IYm,ujt,z$o,NYm,Zyt,xYm,DYm,PYm,OYm,LYm,MYm,j$o};

// @ts-nocheck
import {logForDebugging as y,qe as UH} from "../config/0234_setHasFormattedOutput.ts";
import {Fm as ET,Z1 as hv} from "../../vendor/m2693.ts";
import {Tk as HZ} from "../config/2251_zBr.ts";
import {dce as u4H,MFn as RS6,OFn as ZS6,nOa as WLK,LFn as GS6,rOa as ZLK} from "./3895_request_id.ts";
import {Ntt as rH_} from "../../vendor/m2694.ts";
import {ns as _9} from "../mcp/2194_mcpServerName.ts";
import {Js as i9} from "../config/2697_oA.ts";
import {Kc as g1,tv as xX} from "../../vendor/m232.ts";
import {truncate as dK,EH as _y} from "../../vendor/m237.ts";
import {yP as Yk} from "../telemetry/2780_eventName.ts";
import {pq as Bp,WRe as RWH} from "../../vendor/m2722.ts";
import {C2t as jb_,NFn as LS6} from "../session/3896_pending_action.ts";
import {Le as IH,qt as l_,Xt as a_} from "../config/0228_encoding.ts";
import {kn as b6,SA as W$} from "../config/0689_timestamp.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {fromEnum as QH} from "../../vendor/m5.ts";
import {Dp as fz} from "../../vendor/m2215.ts";
import {clearOAuthTokenCache as oS,Ao as Xq} from "../config/2031_withOAuthRefreshLock.ts";
import {writeToStdout as u7,fO as ek} from "../../vendor/m230.ts";
import {QPa as DLK,Pso as Hqq,XPa as JLK,ZPa as MLK} from "../../vendor/m3891.ts";
import {YPa as fLK,MPa as tRK,BPa as HLK,$Pa as KLK,jPa as TLK,JPa as jLK} from "../tui/3891_matcher.ts";
import {I4e as BmH,Nso as Oqq} from "../../vendor/m3897.ts";
import {vu as m5,h_ as YA,bt as R_} from "../../vendor/m195.ts";
import {hasPermissionsToUseTool as IZ,findSafetyCheckReason as iB,guardHookUpdatedInput as iK_,checkRuleBasedPermissions as ZGH,ay as oA} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {getSessionId as E_,lt as A_} from "../session/0131_sent.ts";
import {JHe as WGH,HL as XN} from "../tools/4363_stripAllEnvVars.ts";
import {E2t as fb_,Ult as lK_,Lso as qqq} from "../core/3894_type.ts";
import {Flt as dK_,Oso as _qq} from "../../vendor/m3892.ts";
import {sOa as RLK,iOa as LLK} from "../config/3897_iOa.ts";
import {nb as BJ,ree as Ie} from "../config/2668_ree.ts";
import {gq as Qp,iN as ov,lx as iW} from "../../vendor/m2777.ts";
import {SandboxManager as nq,Ag as aY} from "../../vendor/m2671.ts";
import {E as h} from "../../vendor/m319.ts";
import {Fr as U8,Ql as I4} from "../../vendor/m4405.ts";
import {executePermissionRequestHooks as TwH} from "../hooks/5167_level.ts";
import {HOOK_REWRITE_HEADLESS_DENY_REASON as qD_,U2 as km} from "../../vendor/m716.ts";
import {b as L} from "../../runtime.ts";
import {Xr as qq} from "../../vendor/m321.ts";
import {Cv as SW} from "../telemetry/2217_names.ts";
import {yp as jO} from "../tools/5171_shouldSkipHookDueToTrust.ts";
// @ts-nocheck
function countTokensWithFallback(messages, tools) {
  try {
    return messages.getToolUseSummary?.(tools) ?? messages.getActivityDescription?.(tools) ?? "";
  } catch (error) {
    return y(`describeToolUseForPush failed: ${error}`, {
      level: "error"
    }), "";
  }
}
function countToolDefinitionTokens(tools, getToolPermissionContext) {
  if (!tools.requiresUserInteraction?.()) return;
  switch (tools.name) {
    case ET:
      {
        let q = Array.isArray(getToolPermissionContext?.questions) ? getToolPermissionContext.questions : [],
          K = q[0],
          O = K?.header || K?.question,
          T = q.length > 1 ? ` (+${q.length - 1} more)` : "";
        return {
          label: "Question",
          body: O ? O + T : "Tap to answer"
        };
      }
    case HZ:
      return {
        label: "Plan",
        body: "Plan ready for review"
      };
    case rH_:
      return {
        label: u4H(tools.name),
        body: ""
      };
    default:
      return {
        label: u4H(tools.name),
        body: ""
      };
  }
}
function deriveSectionName(content, _, q, K) {
  let O = countToolDefinitionTokens(content, _);
  if (O) return {
    tool_name: content.name,
    display_tool_name: O.label,
    action_description: O.body,
    raw_command: undefined,
    tool_use_id: q,
    request_id: "",
    input: _
  };
  let T = (content.name === _9 || content.name === i9) && typeof _.command === "string" ? g1(_.command) : undefined,
    z = T !== undefined ? typeof _.description === "string" && _.description ? g1(_.description) : dK(T, Yk) : g1(countTokensWithFallback(content, _));
  return {
    tool_name: content.name,
    display_tool_name: u4H(content.name),
    action_description: z,
    raw_command: T,
    tool_use_id: q,
    request_id: K,
    input: _
  };
}
function computeSystemPromptTokens(systemPromptSections) {
  AUTOCOMPACT_BUFFER_LABEL = systemPromptSections;
}
function computeMemoryFileTokens() {
  return AUTOCOMPACT_BUFFER_LABEL;
}
class Jb_ {
  input;
  replayUserMessages;
  structuredInput;
  pendingRequests = new Map();
  publishedPendingActionDetails = new Map();
  timedOutUserDialogs = new Map();
  restoredWorkerState = Promise.resolve(null);
  hydratePrefetch = Promise.resolve(null);
  inputClosed = false;
  unexpectedResponseCallback;
  resolvedToolUseIds = new Set();
  prependedLines = [];
  stallTimer;
  stallFired = false;
  createdAt = Date.now();
  onControlRequestSent;
  onControlRequestResolved;
  onUserDialogParked;
  onCommandLifecycle;
  sessionState;
  outbound = new Bp();
  constructor(H, _, q) {
    this.input = H;
    this.replayUserMessages = _;
    this.input = H, this.sessionState = q ?? new jb_(), this.structuredInput = this.read();
  }
  trackResolvedToolUseId(H) {
    if (H.request.subtype === "can_use_tool") {
      if (this.resolvedToolUseIds.add(H.request.tool_use_id), this.resolvedToolUseIds.size > hYO) {
        let _ = this.resolvedToolUseIds.values().next().value;
        if (_ !== undefined) this.resolvedToolUseIds.delete(_);
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
    return Promise.resolve(true);
  }
  flushSessionState() {
    return Promise.resolve();
  }
  get internalEventsPending() {
    return 0;
  }
  prependUserMessage(H) {
    this.prependedLines.push(IH({
      type: "user",
      session_id: "",
      message: {
        role: "user",
        content: H
      },
      parent_tool_use_id: null
    }) + `
`);
  }
  async *read() {
    let H = "",
      _ = async function* () {
        for (;;) {
          if (this.prependedLines.length > 0) H = this.prependedLines.join("") + H, this.prependedLines = [];
          let q = H.indexOf(`
`);
          if (q === -1) break;
          let K = H.slice(0, q);
          H = H.slice(q + 1);
          let O = await this.processLine(K);
          if (O) b6("info", "cli_stdin_message_parsed", {
            type: O.type
          }), yield O;
        }
      }.bind(this);
    yield* _();
    for await (let q of this.input) H += q, yield* _();
    if (H) {
      let q = await this.processLine(H);
      if (q) yield q;
    }
    this.inputClosed = true;
    for (let q of this.pendingRequests.values()) q.reject(Error("Tool permission stream closed before response received"));
  }
  getPendingPermissionRequests() {
    return Array.from(this.pendingRequests.values()).map(H => H.request).filter(H => H.request.subtype === "can_use_tool");
  }
  getPendingUserDialogRequests() {
    return Array.from(this.pendingRequests.values()).map(H => H.request).filter(H => H.request.subtype === "request_user_dialog");
  }
  republishSurvivingPendingAction() {
    let H;
    for (let [_, q] of this.publishedPendingActionDetails) if (this.pendingRequests.has(_)) H = q;
    if (!H) return;
    this.sessionState.republishPendingAction(H), c("tengu_pending_action_republished", {
      survivor_kind: QH(H.tool_name.startsWith("dialog:") ? "dialog" : "permission"),
      pending_permission_requests: this.getPendingPermissionRequests().length,
      pending_dialog_requests: this.getPendingUserDialogRequests().length
    });
  }
  cancelPendingUserDialogs(H, _) {
    let q = 0;
    for (let {
      request: K
    } of Array.from(this.pendingRequests.values())) {
      if (K.request.subtype !== "request_user_dialog" || K.request.dialog_kind !== H) continue;
      c("tengu_request_user_dialog_implicit_cancel", {
        dialog_kind: fz(H),
        reason: QH(_)
      }), this.injectControlResponse({
        type: "control_response",
        response: {
          subtype: "success",
          request_id: K.request_id,
          response: {
            behavior: "cancelled"
          }
        }
      }), q += 1;
    }
    return q;
  }
  setUnexpectedResponseCallback(H) {
    this.unexpectedResponseCallback = H;
  }
  ignoresErrorShapedDialogResponse(H, _) {
    if (_.subtype !== "error" || H.request.request.subtype !== "request_user_dialog") return false;
    return c("tengu_request_user_dialog_response_ignored", {
      shape: QH("error"),
      dialog_kind: fz(H.request.request.dialog_kind)
    }), y(`Ignoring error-shaped control_response for parked request_user_dialog request_id=${_.request_id} \u2014 not a human choice; dialog stays parked (error: ${_.error})`), true;
  }
  injectControlResponse(H) {
    let _ = H.response?.request_id;
    if (!_) return;
    let q = this.pendingRequests.get(_);
    if (!q) {
      c("tengu_inject_control_response_unknown_id", {
        pending_control_requests: this.pendingRequests.size
      });
      return;
    }
    if (this.ignoresErrorShapedDialogResponse(q, H.response)) return;
    if (this.trackResolvedToolUseId(q.request), this.pendingRequests.delete(_), this.write({
      type: "control_cancel_request",
      request_id: _
    }), H.response.subtype === "error") q.reject(Error(H.response.error));else {
      let K = H.response.response;
      if (q.schema) try {
        q.resolve(q.schema.parse(K));
      } catch (O) {
        q.reject(O);
      } else q.resolve({});
    }
  }
  setOnControlRequestSent(H) {
    this.onControlRequestSent = H;
  }
  setOnControlRequestResolved(H) {
    this.onControlRequestResolved = H;
  }
  async processLine(H) {
    if (!H) return;
    try {
      let _ = RS6(l_(H));
      if (_.type === "keep_alive") return;
      if (_.type === "update_environment_variables") {
        let q = [],
          K = [];
        for (let [O, T] of Object.entries(_.variables)) {
          if (!NYO.has(O)) {
            K.push(O);
            continue;
          }
          process.env[O] = T, q.push(O);
        }
        if (K.length > 0) y(`[structuredIO] refused update_environment_variables for non-allowlisted keys: ${K.join(", ")}`);
        if (q.includes("CLAUDE_CODE_OAUTH_TOKEN")) oS();
        if (y(`[structuredIO] applied update_environment_variables: ${q.join(", ")}`), typeof _.request_id === "string" && _.request_id) u7(IH({
          type: "control_response",
          response: {
            subtype: "success",
            request_id: _.request_id
          }
        }) + `
`);
        return;
      }
      if (_.type === "control_response") {
        let q = "uuid" in _ && typeof _.uuid === "string" ? _.uuid : undefined;
        if (q) this.onCommandLifecycle?.(q, "completed");
        let K = this.pendingRequests.get(_.response.request_id);
        if (!K) {
          let T = this.timedOutUserDialogs.get(_.response.request_id);
          if (T) {
            this.timedOutUserDialogs.delete(_.response.request_id);
            let Y = _.response.subtype === "success" ? _.response.response?.behavior : undefined,
              w = _.response.subtype;
            c("tengu_request_user_dialog_late_answer", {
              dialog_kind: fz(T.dialogKind),
              lateness_ms: Date.now() - T.timedOutAt,
              response_subtype: QH(w === "success" || w === "error" ? w : "other"),
              behavior: QH(Y === "completed" || Y === "cancelled" ? Y : Y === undefined ? "absent" : "other")
            }), y(`Ignoring late request_user_dialog answer for request_id=${_.response.request_id}: the park deadline already settled this dialog as cancelled ${Date.now() - T.timedOutAt}ms ago`);
            return;
          }
          let $ = (_.response.subtype === "success" ? _.response.response : undefined)?.toolUseID;
          if (typeof $ === "string" && this.resolvedToolUseIds.has($)) {
            y(`Ignoring duplicate control_response for already-resolved toolUseID=${$} request_id=${_.response.request_id}`);
            return;
          }
          if (this.unexpectedResponseCallback) await this.unexpectedResponseCallback(_);
          return;
        }
        if (this.ignoresErrorShapedDialogResponse(K, _.response)) return;
        if (this.trackResolvedToolUseId(K.request), this.pendingRequests.delete(_.response.request_id), K.request.request.subtype === "can_use_tool" && this.onControlRequestResolved) this.onControlRequestResolved(_.response.request_id);
        if (DLK(K.request)) Hqq();
        if (_.response.subtype === "error") {
          K.reject(Error(_.response.error));
          return;
        }
        let O = _.response.response;
        if (K.schema) try {
          K.resolve(K.schema.parse(O));
        } catch (T) {
          K.reject(T);
        } else K.resolve({});
        if (this.replayUserMessages) return _;
        return;
      }
      if (JLK(_)) Hqq();
      if (_.type !== "user" && _.type !== "bash_command" && _.type !== "control_request" && _.type !== "assistant" && _.type !== "system") {
        y(`Ignoring unknown message type: ${_.type}`, {
          level: "warn"
        });
        return;
      }
      if (_.type === "control_request") {
        if (!_.request) resolveSlashCommandToolForTokens("Error: Missing request on control_request");
        return _;
      }
      if (_.type === "assistant" || _.type === "system") return _;
      if (_.type === "bash_command") return _;
      if (_.message.role !== "user") resolveSlashCommandToolForTokens(`Error: Expected message role 'user', got '${_.message.role}'`);
      return _;
    } catch (_) {
      resolveSlashCommandToolForTokens(`Error parsing streaming input line: ${H}: ${_}`);
    }
  }
  resetStallWatchdog() {
    this.stallFired = false;
  }
  trackWrite(H) {
    if (this.stallTimer) clearTimeout(this.stallTimer);
    if (H.type !== "result" && !this.stallFired) this.stallTimer = setTimeout(_ => {
      if (this.sessionState.getState() !== "running") return;
      this.stallFired = true, c("tengu_sdk_stall", {
        session_age_ms: Date.now() - this.createdAt,
        session_state: QH(this.sessionState.getState()),
        last_message_type: _,
        pending_control_requests: this.pendingRequests.size
      });
    }, VYO, H.type), this.stallTimer.unref();
    if (H.type !== "system" && Math.random() < vYO) {
      let _ = fLK().safeParse(H);
      if (!_.success) c("tengu_sdk_schema_violation", {
        message_type: QH(H.type),
        error_path: _.error.issues[0]?.path.join(".") ?? ""
      });
    }
  }
  async write(H) {
    this.trackWrite(H), u7(BmH(H) + `
`);
  }
  async sendRequest(H, _, q, K = nK_.randomUUID()) {
    let O = {
      type: "control_request",
      request_id: K,
      request: H
    };
    if (this.inputClosed) throw Error("Stream closed");
    if (q?.aborted) throw Error("Request aborted");
    if (this.outbound.enqueue(O), H.subtype === "can_use_tool" && this.onControlRequestSent) this.onControlRequestSent(O);
    let T = () => {
      this.outbound.enqueue({
        type: "control_cancel_request",
        request_id: K
      });
      let $ = this.pendingRequests.get(K);
      if ($) this.trackResolvedToolUseId($.request), $.reject(new m5());
    };
    if (q) q.addEventListener("abort", T, {
      once: true
    });
    let z = Date.now();
    try {
      return await new Promise(($, Y) => {
        this.pendingRequests.set(K, {
          request: {
            type: "control_request",
            request_id: K,
            request: H
          },
          resolve: w => {
            $(w);
          },
          reject: Y,
          schema: _
        });
      });
    } finally {
      if (c("tengu_sdk_control_roundtrip", {
        subtype: QH(H.subtype),
        duration_ms: Date.now() - z,
        aborted: q?.aborted ?? false
      }), q) q.removeEventListener("abort", T);
      this.pendingRequests.delete(K);
    }
  }
  createCanUseTool(H) {
    return async (_, q, K, O, T, z) => {
      let $ = z ?? (await IZ(_, q, K, O, T));
      if ($.behavior === "allow") return $;
      if ($.behavior === "deny") {
        let D = $.decisionReason;
        return this.outbound.enqueue({
          type: "system",
          subtype: "permission_denied",
          tool_name: _.name,
          tool_use_id: T,
          agent_id: K.agentId,
          decision_reason_type: D?.type,
          decision_reason: ZS6(D),
          message: $.message,
          uuid: nK_.randomUUID(),
          session_id: E_()
        }), $;
      }
      let Y = $.updatedInput ?? q,
        w = $.suggestions;
      if (_.name === _9 && typeof Y.command === "string" && w?.length && !w.some(D => D.destination !== "session")) w = [...WGH(Y.command), ...w];
      let A = new AbortController(),
        f = K.abortController.signal,
        j = () => A.abort();
      f.addEventListener("abort", j, {
        once: true
      });
      let J = nK_.randomUUID();
      try {
        let D = computeSlashCommandTokens(_, T, Y, K, w).then(R => ({
          source: "hook",
          decision: R
        }));
        if (H) {
          let R = deriveSectionName(_, Y, T, J);
          this.publishedPendingActionDetails.set(J, R), H(R);
        }
        let M = $.decisionReason,
          X = iB(M),
          P = _.name === _9 || _.name === i9,
          Z = ($.metadata && "command" in $.metadata ? $.metadata.command.description : undefined) || (P && typeof Y.command === "string" ? typeof Y.description === "string" && Y.description ? g1(Y.description) : dK(g1(Y.command), Yk) : countTokensWithFallback(_, Y)) || undefined,
          W = this.sendRequest({
            subtype: "can_use_tool",
            tool_name: _.name,
            display_name: u4H(_.name),
            input: Y,
            ...(Z && {
              description: Z
            }),
            permission_suggestions: w,
            blocked_path: $.blockedPath,
            decision_reason: ZS6(M),
            decision_reason_type: M?.type,
            classifier_approvable: X ? !iB(M, R => !R.classifierApprovable) : undefined,
            tool_use_id: T,
            agent_id: K.agentId
          }, fb_(), A.signal, J).then(R => ({
            source: "sdk",
            result: R
          })),
          G = await Promise.race([D, W]);
        if (G.source === "hook") {
          if (G.decision) return W.catch(() => {}), A.abort(), G.decision;
          let R = await W;
          return lK_(R.result, _, Y, K);
        }
        return lK_(G.result, _, Y, K);
      } catch (D) {
        return lK_({
          behavior: "deny",
          message: `Tool permission request failed: ${D}`,
          toolUseID: T
        }, _, Y, K);
      } finally {
        if (this.publishedPendingActionDetails.delete(J), this.getPendingPermissionRequests().length === 0 && this.getPendingUserDialogRequests().length === 0) this.sessionState.notifyStateChanged("running");else this.sessionState.reteeWaitingOnUser(), this.republishSurvivingPendingAction();
        f.removeEventListener("abort", j);
      }
    };
  }
  createHookCallback(H, _) {
    return {
      type: "callback",
      timeout: _,
      callback: async (q, K, O) => {
        try {
          return await this.sendRequest({
            subtype: "hook_callback",
            callback_id: H,
            input: q,
            tool_use_id: K || undefined
          }, dK_(), O);
        } catch (T) {
          if (YA(T)) throw T;
          return console.error(`Error in hook callback ${H}:`, T), {};
        }
      }
    };
  }
  async handleElicitation(H, _, q, K, O, T, z, $) {
    try {
      return await this.sendRequest({
        subtype: "elicitation",
        mcp_server_name: H,
        message: _,
        mode: O,
        url: T,
        elicitation_id: z,
        requested_schema: q,
        title: $?.title,
        display_name: $?.displayName,
        description: $?.description
      }, tRK(), K);
    } catch {
      return {
        action: "cancel"
      };
    }
  }
  async requestUserDialog(H, _, q) {
    let K = nK_.randomUUID(),
      O = WLK(H, _, K, q?.toolUseId);
    this.publishedPendingActionDetails.set(K, O), this.sessionState.notifyStateChanged("requires_action", O), this.onUserDialogParked?.(O), c("tengu_request_user_dialog_requires_action", {
      dialog_kind: fz(H)
    });
    let T = RLK(),
      z;
    if (T > 0) z = setTimeout(($, Y, w) => {
      if (!this.pendingRequests.has($)) return;
      this.timedOutUserDialogs.set($, {
        dialogKind: Y,
        timedOutAt: Date.now()
      }), c("tengu_request_user_dialog_timeout", {
        dialog_kind: fz(Y),
        timeout_ms: w
      }), this.injectControlResponse({
        type: "control_response",
        response: {
          subtype: "success",
          request_id: $,
          response: {
            behavior: "cancelled"
          }
        }
      });
    }, T, K, H, T), z.unref();
    try {
      return await this.sendRequest({
        subtype: "request_user_dialog",
        dialog_kind: H,
        payload: _,
        tool_use_id: q?.toolUseId
      }, HLK(), q?.signal, K);
    } catch {
      return {
        behavior: "cancelled"
      };
    } finally {
      if (z !== undefined) clearTimeout(z);
      if (this.publishedPendingActionDetails.delete(K), this.getPendingUserDialogRequests().length === 0 && this.getPendingPermissionRequests().length === 0) this.sessionState.notifyStateChanged("running");else {
        if (!this.timedOutUserDialogs.has(K)) this.sessionState.reteeWaitingOnUser();
        this.republishSurvivingPendingAction();
      }
    }
  }
  createSandboxAskCallback(H) {
    let _ = new Map(),
      q = new Set(),
      K = async O => {
        try {
          let T = {
              type: "addRules",
              rules: [{
                toolName: BJ,
                ruleContent: `domain:${O}`
              }],
              behavior: "allow",
              destination: "localSettings"
            },
            z = await this.sendRequest({
              subtype: "can_use_tool",
              tool_name: hS6,
              display_name: u4H(hS6),
              input: {
                host: O
              },
              permission_suggestions: [T],
              tool_use_id: nK_.randomUUID(),
              description: `Allow network connection to ${O}?`
            }, fb_());
          if (z.behavior !== "allow") return false;
          let $ = z.updatedPermissions;
          if ($ && $.length > 0) Qp($), H?.(Y => ov(Y, $)), nq.refreshConfig(), q.add(O);
          return true;
        } catch {
          return false;
        }
      };
    return O => {
      let T = O.host;
      if (q.has(T)) return Promise.resolve(true);
      let z = _.get(T);
      if (z) return z;
      let $ = K(T).finally(() => {
        _.delete(T);
      });
      return _.set(T, $), $;
    };
  }
  async sendMcpMessage(H, _) {
    return (await this.sendRequest({
      subtype: "mcp_message",
      server_name: H,
      message: _
    }, h.object({
      mcp_response: h.any()
    }))).mcp_response;
  }
  async requestOAuthTokenRefresh() {
    return (await this.sendRequest({
      subtype: "oauth_token_refresh"
    }, KLK(), AbortSignal.timeout(kYO))).accessToken;
  }
  async requestHostAuthTokenRefresh(H = yYO) {
    return (await this.sendRequest({
      subtype: "host_auth_token_refresh"
    }, TLK(), AbortSignal.timeout(H))).authToken;
  }
}
function resolveSlashCommandToolForTokens(messages) {
  console.error(messages), process.exit(1);
}
async function computeSlashCommandTokens(tools, getToolPermissionContext, context, K, O) {
  let T = U8(K).mode,
    z = TwH(tools.name, getToolPermissionContext, context, K, T, O, K.abortController.signal);
  for await (let $ of z) if ($.permissionRequestResult && ($.permissionRequestResult.behavior === "allow" || $.permissionRequestResult.behavior === "deny")) {
    let Y = $.permissionRequestResult;
    if (Y.behavior === "allow") {
      let w = Y.updatedInput || context;
      if (Y.updatedInput) {
        let f = iK_(await ZGH(tools, w, K), tools.name);
        if (f) return f.behavior === "ask" ? {
          behavior: "deny",
          message: f.message,
          decisionReason: f.decisionReason ?? qD_,
          decideLocation: "ask-path"
        } : {
          ...f,
          decideLocation: "ask-path"
        };
      }
      let A = Y.updatedPermissions ?? [];
      if (A.length > 0) Qp(A), K.setToolPermissionContext(f => ov(f, A));
      return {
        behavior: "allow",
        updatedInput: w,
        userModified: false,
        decisionReason: {
          type: "hook",
          hookName: "PermissionRequest"
        }
      };
    } else return {
      behavior: "deny",
      message: Y.message || "Permission denied by PermissionRequest hook",
      decisionReason: {
        type: "hook",
        hookName: "PermissionRequest"
      },
      decideLocation: "ask-path"
    };
  }
  return;
}
var nK_,
  hS6 = "SandboxNetworkAccess",
  hYO = 1000,
  kYO = 30000,
  yYO = 30000,
  NYO,
  VYO = 300000,
  vYO = 0.01,
  AUTOCOMPACT_BUFFER_LABEL;
var COMPACT_BUFFER_LABEL = L(() => {
  A_();
  jLK();
  v_();
  MLK();
  hv();
  XN();
  Ie();
  _qq();
  km();
  Xq();
  UH();
  W$();
  R_();
  qqq();
  oA();
  ek();
  xX();
  aY();
  a_();
  _y();
  qq();
  GS6();
  I4();
  ZLK();
  SW();
  jO();
  iW();
  LS6();
  a_();
  RWH();
  LLK();
  Oqq();
  nK_ = require("crypto");
  NYO = new Set(["CLAUDE_CODE_SESSION_ACCESS_TOKEN", "CLAUDE_CODE_OAUTH_TOKEN"]);
});

export {countTokensWithFallback as aOa,countToolDefinitionTokens as Dyp,deriveSectionName as Pyp,computeSystemPromptTokens as Fso,computeMemoryFileTokens as cOa,Jb_ as v2t,resolveSlashCommandToolForTokens as Bso,computeSlashCommandTokens as Uyp,nK_ as $lt,hS6 as BFn,hYO as Oyp,kYO as Lyp,yYO as Myp,NYO as Nyp,VYO as Byp,vYO as Fyp,AUTOCOMPACT_BUFFER_LABEL as lOa,COMPACT_BUFFER_LABEL as w2t};

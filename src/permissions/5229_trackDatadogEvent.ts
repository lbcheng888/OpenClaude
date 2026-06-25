// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {externalHttp as $b,_k} from "../core/0576_isCancel.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {cbn,vu} from "../mcp/2200_mcpServerName.ts";
import {getCanonicalName as So,Ro} from "./1458_swapShrinksContextWindow.ts";
import {nl,T2} from "../../vendor/m1455.ts";
import {Ikt,h7} from "../telemetry/1454_model.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {tr,getOrCreateUserID as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {S8,P2,DTi} from "../config/2187_S8.ts";
var KBt = {};
ft(KBt, {
  trackDatadogEvent: () => trackDatadogEvent,
  shutdownDatadog: () => shutdownDatadog,
  resetDatadogInit: () => resetDatadogInit,
  initializeDatadog: () => initializeDatadog,
  DATADOG_LOGS_ENDPOINT: () => DATADOG_LOGS_ENDPOINT,
  DATADOG_CLIENT_TOKEN: () => DATADOG_CLIENT_TOKEN
});
/** Convert a camelCase key to snake_case (e.g. toolName -> tool_name) for Datadog tags. */
function w5l(name: string): string {
  return name.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);
}
/** Flush the buffered log batch to the Datadog logs intake endpoint. */
async function VMo(): Promise<void> {
  if (NKt.length === 0) return;
  let batch = NKt;
  NKt = [];
  try {
    await $b.post(DATADOG_LOGS_ENDPOINT, batch, {
      headers: {
        "Content-Type": "application/json",
        "DD-API-KEY": DATADOG_CLIENT_TOKEN
      },
      timeout: Yxm
    });
  } catch (_) {
    A(`Failed to flush logs to Datadog: ${_}`, {
      level: "error"
    });
  }
}
/** Schedule a deferred flush via a single debounce timer (unref'd so it never keeps the process alive). */
function Qxm(): void {
  if (ESe) return;
  ESe = setTimeout(() => {
    ESe = null, VMo();
  }, tDm()).unref();
}
function resetDatadogInit() {
  initializeDatadog.cache?.clear?.(), FKt = null;
}
async function shutdownDatadog() {
  if (ESe) clearTimeout(ESe), ESe = null;
  await VMo();
}
async function trackDatadogEvent(eventName, props) {
  if (Rr() !== "firstParty") return;
  let initResult = FKt;
  if (initResult === null) initResult = await initializeDatadog();
  if (!initResult || !Jxm.has(eventName)) return;
  try {
    let context = await cbn({
        model: props.model,
        betas: props.betas
      }),
      {
        envContext: envContext,
        ...rest
      } = context,
      payload = {
        ...rest,
        ...envContext,
        ...props,
        userBucket: eDm()
      };
    if (typeof payload.toolName === "string" && payload.toolName.startsWith("mcp__")) payload.toolName = "mcp";
    if (typeof payload.model === "string") {
      if (!payload.model.toLowerCase().includes("claude")) return;
      let canonical = So(nl(payload.model));
      payload.model = canonical in Ikt ? canonical : "other";
    }
    if (typeof payload.version === "string") payload.version = payload.version.replace(/^(\d+\.\d+\.\d+-dev\.\d{8})\.t\d+\.sha[a-f0-9]+$/, "$1");
    if (payload.status !== void 0 && payload.status !== null) {
      let statusStr = String(payload.status);
      payload.http_status = statusStr;
      let firstChar = statusStr.charAt(0);
      if (firstChar >= "1" && firstChar <= "5") payload.http_status_range = `${firstChar}xx`;
      delete payload.status;
    }
    let logEntry = payload,
      entry = {
        ddsource: "nodejs",
        ddtags: [`event:${eventName}`, ...Xxm.filter(d => logEntry[d] !== void 0 && logEntry[d] !== null).map(d => `${w5l(d)}:${logEntry[d]}`)].join(","),
        message: eventName,
        service: "claude-code",
        hostname: "claude-code",
        env: "external"
      };
    for (let [d, p] of Object.entries(payload)) if (p !== void 0 && p !== null) entry[w5l(d)] = p;
    if (NKt.push(entry), NKt.length >= jxm) {
      if (ESe) clearTimeout(ESe), ESe = null;
      VMo();
    } else Qxm();
  } catch (err) {
    Ie(err);
  }
}
/** Resolve the flush interval (ms) from env override, falling back to the default. */
function tDm(): number {
  return parseInt(process.env.CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS || "", 10) || zxm;
}
var k5l,
  DATADOG_LOGS_ENDPOINT = "https://http-intake.logs.us5.datadoghq.com/api/v2/logs",
  DATADOG_CLIENT_TOKEN = "pubea5604404508cdd34afb69e6f42a05bc",
  zxm = 15000,
  jxm = 100,
  Yxm = 5000,
  Jxm,
  Xxm,
  NKt,
  ESe = null,
  FKt = null,
  initializeDatadog,
  Zxm = 30,
  eDm;
var Q7 = b(() => {
  Wi();
  tr();
  qe();
  vn();
  T2();
  Ro();
  Ps();
  h7();
  _k();
  S8();
  vu();
  k5l = require("crypto"), Jxm = new Set(["tengu_feature_ok", "tengu_feature_bad", "tengu_feature_sad", "chrome_bridge_connection_succeeded", "chrome_bridge_connection_failed", "chrome_bridge_disconnected", "chrome_bridge_tool_call_completed", "chrome_bridge_tool_call_error", "chrome_bridge_tool_call_started", "chrome_bridge_tool_call_timeout", "tengu_api_error", "tengu_api_fallback_last_resort", "tengu_api_success", "tengu_auto_mode_decision", "tengu_auto_mode_denial_limit_exceeded", "tengu_auto_mode_fallback_to_ask", "tengu_auto_mode_malformed_tool_input", "tengu_auto_mode_opt_in_dialog_accept", "tengu_auto_mode_opt_in_dialog_accept_default", "tengu_auto_mode_opt_in_dialog_decline", "tengu_auto_mode_opt_in_dialog_decline_dont_ask", "tengu_auto_mode_opt_in_dialog_shown", "tengu_auto_mode_outcome", "tengu_auto_mode_subsequent_approval", "tengu_brief_mode_enabled", "tengu_brief_mode_toggled", "tengu_brief_send", "tengu_cancel", "tengu_compact_failed", "tengu_copper_lantern", "tengu_exit", "tengu_flicker", "tengu_headless_mcp_prewait", "tengu_init", "tengu_mcp_tools_refreshed_mid_turn", "tengu_model_fallback_triggered", "tengu_refusal_fallback_triggered", "tengu_refusal_fallback_prompt_shown", "tengu_refusal_fallback_prompt_choice", "tengu_refusal_fallback_setting_changed", "tengu_refusal_fallback_suppressed", "tengu_refusal_fallback_dialog_suppressed", "tengu_refusal_fallback_supersedes", "tengu_rotunda_pennant_applied", "tengu_rotunda_pennant_malformed", "tengu_rotunda_pennant_strip", "tengu_rotunda_pennant_credit_echoed", "tengu_rotunda_pennant_tools", "tengu_rotunda_pennant_esc", "tengu_refusal_retraction_evicted", "tengu_refusal_retraction_late_drop", "tengu_refusal_retraction_history_dropped", "tengu_refusal_retraction_orphan_tool_result", "tengu_refusal_retraction_truncation_harvest", "tengu_refusal_retraction_unauthenticated_signal", "tengu_oauth_error", "tengu_oauth_success", "tengu_oauth_token_refresh_failure", "tengu_oauth_token_refresh_success", "tengu_oauth_token_refresh_lock_acquiring", "tengu_oauth_token_refresh_lock_acquired", "tengu_oauth_token_refresh_starting", "tengu_oauth_token_refresh_completed", "tengu_oauth_token_refresh_lock_releasing", "tengu_oauth_token_refresh_lock_released", "tengu_ptl_surfaced_to_user", "tengu_query_error", "tengu_request_user_dialog_implicit_cancel", "tengu_request_user_dialog_late_answer", "tengu_request_user_dialog_requires_action", "tengu_request_user_dialog_response_ignored", "tengu_request_user_dialog_timeout", "tengu_supported_dialog_kinds_restored", "tengu_schedule_offer_shown", "tengu_sdk_control_roundtrip", "tengu_sdk_init_handshake", "tengu_sdk_mcp_false_unavailable", "tengu_sdk_result", "tengu_sdk_schema_violation", "tengu_sdk_session_crash", "tengu_sdk_stall", "tengu_sdk_ttft", "tengu_session_file_read", "tengu_started", "tengu_tool_use_error", "tengu_tool_use_granted_in_prompt_permanent", "tengu_transcript_write_failed", "tengu_tool_use_granted_in_prompt_temporary", "tengu_tool_use_rejected_in_prompt", "tengu_tool_use_success", "tengu_bash_tool_command_executed", "tengu_bash_tool_command_failed", "tengu_uncaught_exception", "tengu_uncaught_exception_loop", "tengu_unhandled_rejection", "tengu_voice_recording_started", "tengu_voice_toggled", "tengu_vscode_sdk_stream_ended_no_result", "tengu_team_mem_sync_pull", "tengu_team_mem_sync_push", "tengu_team_mem_sync_started", "tengu_team_mem_entries_capped", "tengu_timer", "tengu_bg_adopt", "tengu_bg_agent_action", "tengu_bg_agent_dispatch", "tengu_bg_agent_terminal", "tengu_bg_attach", "tengu_bg_attach_first_frame", "tengu_bg_attach_legacy_autorespawn", "tengu_bg_attach_outcome", "tengu_bg_classify", "tengu_bg_daemon_cold_start_ask", "tengu_bg_daemon_cold_start_ask_answer", "tengu_bg_daemon_install", "tengu_bg_daemon_service_poll_fallthrough", "tengu_bg_daemon_service_stale_exec", "tengu_bg_daemon_spawn_failed", "tengu_bg_daemon_wmi_fallback", "tengu_bg_daemon_zombie_false_positive", "tengu_bg_daemon_zombie_restart", "tengu_bg_dispatch", "tengu_bg_dispatch_fallback", "tengu_bg_dispatch_low_mem", "tengu_bg_dispatch_rescued", "tengu_bg_dispatch_sigkill_escalate", "tengu_bg_dispatch_stale_drop", "tengu_bg_exec_no_lastline", "tengu_bg_killjob_ctrl_fallback", "tengu_bg_orphan_reap", "tengu_bg_proto_mismatch", "tengu_bg_pty_unavailable", "tengu_bg_respawn", "tengu_bg_respawn_exhausted", "tengu_bg_respawn_stale", "tengu_bg_respawn_unconfirmed_bail", "tengu_bg_retired", "tengu_bg_roster_parse_failed", "tengu_bg_skew_nudge", "tengu_bg_spare_claim", "tengu_bg_spare_claim_fail", "tengu_bg_spare_spawn", "tengu_bg_worker_exit", "tengu_bg_worker_spawn", "tengu_daemon_cold_start_prompt", "tengu_daemon_config_reload", "tengu_daemon_exit", "tengu_daemon_idle_exit", "tengu_daemon_install_prompt_answer", "tengu_daemon_lease", "tengu_daemon_peer_uid_reject", "tengu_daemon_self_restart_on_upgrade", "tengu_daemon_start", "tengu_daemon_startup_crash", "tengu_daemon_worker_crash", "tengu_daemon_worker_permanent_exit", "tengu_daemon_yield", "tengu_daemon_yield_takeover"]), Xxm = ["arch", "classifierModel", "classifierStage", "clientType", "decision", "entrypoint", "errorKind", "errorType", "failureKind", "fastPath", "sessionKind", "http_status_range", "http_status", "model", "op", "outcome", "platform", "provider", "reason", "coachMode", "source", "subscriptionType", "toolName", "userBucket", "userType", "version", "versionBase", ...[]];
  NKt = [];
  initializeDatadog = Hn(async () => {
    if (P2() || DTi()) return FKt = !1, !1;
    try {
      return FKt = !0, !0;
    } catch (e) {
      return Ie(e), FKt = !1, !1;
    }
  });
  eDm = Hn(() => {
    let seed = T8(),
      hash = k5l.createHash("sha256").update(seed).digest("hex");
    return parseInt(hash.slice(0, 8), 16) % Zxm;
  });
});
export {KBt,w5l,VMo,Qxm,resetDatadogInit,shutdownDatadog,trackDatadogEvent,tDm,k5l,DATADOG_LOGS_ENDPOINT,DATADOG_CLIENT_TOKEN,zxm,jxm,Yxm,Jxm,Xxm,NKt,ESe,FKt,initializeDatadog,Zxm,eDm,Q7};

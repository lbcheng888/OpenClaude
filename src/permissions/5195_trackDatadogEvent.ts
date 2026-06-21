// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {externalHttp as Ob,ek as Xx} from "../core/0570_isCancel.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {getAPIProvider as Hr,li as si} from "../api/1282_usesFirstPartyModelIds.ts";
import {k_n as qgn,$u as od} from "../mcp/2194_mcpServerName.ts";
import {getCanonicalName as qo,Mo as Fo} from "./1453_swapShrinksContextWindow.ts";
import {$l as nc,X2 as Y3} from "../../vendor/m1450.ts";
import {rwt as Ivt,P8 as A8} from "../telemetry/1449_model.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
import {Qn as nr,getOrCreateUserID as U8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {s5 as $8,u$ as Q2,Nmi as Rpi} from "../config/2182_s5.ts";
// @ts-nocheck
var cZ_ = {};
pt(cZ_, {
  trackDatadogEvent: () => trackDatadogEvent,
  shutdownDatadog: () => shutdownDatadog,
  resetDatadogInit: () => resetDatadogInit,
  initializeDatadog: () => initializeDatadog,
  DATADOG_LOGS_ENDPOINT: () => DATADOG_LOGS_ENDPOINT,
  DATADOG_CLIENT_TOKEN: () => DATADOG_CLIENT_TOKEN
});
function wz7(name) {
  return name.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);
}
async function HE8() {
  if (gZ_.length === 0) return;
  let batch = gZ_;
  gZ_ = [];
  try {
    await Ob.post(DATADOG_LOGS_ENDPOINT, batch, {
      headers: {
        "Content-Type": "application/json",
        "DD-API-KEY": DATADOG_CLIENT_TOKEN
      },
      timeout: Fr5
    });
  } catch (_) {
    v(`Failed to flush logs to Datadog: ${_}`, {
      level: "error"
    });
  }
}
function cr5() {
  if (aTH) return;
  aTH = setTimeout(() => {
    aTH = null, HE8();
  }, ir5()).unref();
}
function resetDatadogInit() {
  initializeDatadog.cache?.clear?.(), QZ_ = null;
}
async function shutdownDatadog() {
  if (aTH) clearTimeout(aTH), aTH = null;
  await HE8();
}
async function trackDatadogEvent(eventName, props) {
  if (Hr() !== "firstParty") return;
  let initResult = QZ_;
  if (initResult === null) initResult = await initializeDatadog();
  if (!initResult || !gr5.has(eventName)) return;
  try {
    let context = await qgn({
        model: props.model,
        betas: props.betas
      }),
      {
        envContext: O,
        ...T
      } = context,
      payload = {
        ...T,
        ...O,
        ...props,
        userBucket: nr5_2()
      };
    if (typeof payload.toolName === "string" && payload.toolName.startsWith("mcp__")) payload.toolName = "mcp";
    if (typeof payload.model === "string") {
      if (!payload.model.toLowerCase().includes("claude")) return;
      let canonical = qo(nc(payload.model));
      payload.model = canonical in Ivt ? canonical : "other";
    }
    if (typeof payload.version === "string") payload.version = payload.version.replace(/^(\d+\.\d+\.\d+-dev\.\d{8})\.t\d+\.sha[a-f0-9]+$/, "$1");
    if (payload.status !== undefined && payload.status !== null) {
      let statusStr = String(payload.status);
      payload.http_status = statusStr;
      let firstChar = statusStr.charAt(0);
      if (firstChar >= "1" && firstChar <= "5") payload.http_status_range = `${firstChar}xx`;
      delete payload.status;
    }
    let logEntry = payload,
      u = {
        ddsource: "nodejs",
        ddtags: [`event:${eventName}`, ...Qr5.filter(d => logEntry[d] !== undefined && logEntry[d] !== null).map(d => `${wz7(d)}:${logEntry[d]}`)].join(","),
        message: eventName,
        service: "claude-code",
        hostname: "claude-code",
        env: "external"
      };
    for (let [d, p] of Object.entries(payload)) if (p !== undefined && p !== null) u[wz7(d)] = p;
    if (gZ_.push(u), gZ_.length >= Ur5) {
      if (aTH) clearTimeout(aTH), aTH = null;
      HE8();
    } else cr5();
  } catch (err) {
    Ie(err);
  }
}
function ir5() {
  return parseInt(process.env.CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS || "", 10) || Br5;
}
var Az7,
  DATADOG_LOGS_ENDPOINT = "https://http-intake.logs.us5.datadoghq.com/api/v2/logs",
  DATADOG_CLIENT_TOKEN = "pubea5604404508cdd34afb69e6f42a05bc",
  Br5 = 15000,
  Ur5 = 100,
  Fr5 = 5000,
  gr5,
  Qr5,
  gZ_,
  aTH = null,
  QZ_ = null,
  initializeDatadog,
  nr5 = 30,
  nr5_2;
var JQ = b(() => {
  na();
  nr();
  je();
  wn();
  Y3();
  Fo();
  si();
  A8();
  Xx();
  $8();
  od();
  Az7 = require("crypto"), gr5 = new Set(["tengu_feature_ok", "tengu_feature_bad", "tengu_feature_sad", "chrome_bridge_connection_succeeded", "chrome_bridge_connection_failed", "chrome_bridge_disconnected", "chrome_bridge_tool_call_completed", "chrome_bridge_tool_call_error", "chrome_bridge_tool_call_started", "chrome_bridge_tool_call_timeout", "tengu_api_error", "tengu_api_fallback_last_resort", "tengu_api_success", "tengu_auto_mode_decision", "tengu_auto_mode_denial_limit_exceeded", "tengu_auto_mode_fallback_to_ask", "tengu_auto_mode_malformed_tool_input", "tengu_auto_mode_opt_in_dialog_accept", "tengu_auto_mode_opt_in_dialog_accept_default", "tengu_auto_mode_opt_in_dialog_decline", "tengu_auto_mode_opt_in_dialog_decline_dont_ask", "tengu_auto_mode_opt_in_dialog_shown", "tengu_auto_mode_outcome", "tengu_auto_mode_subsequent_approval", "tengu_brief_mode_enabled", "tengu_brief_mode_toggled", "tengu_brief_send", "tengu_cancel", "tengu_compact_failed", "tengu_copper_lantern", "tengu_exit", "tengu_flicker", "tengu_headless_mcp_prewait", "tengu_init", "tengu_mcp_tools_refreshed_mid_turn", "tengu_model_fallback_triggered", "tengu_refusal_fallback_triggered", "tengu_refusal_fallback_prompt_shown", "tengu_refusal_fallback_prompt_choice", "tengu_refusal_fallback_setting_changed", "tengu_refusal_fallback_suppressed", "tengu_refusal_fallback_dialog_suppressed", "tengu_refusal_fallback_supersedes", "tengu_rotunda_pennant_applied", "tengu_rotunda_pennant_malformed", "tengu_rotunda_pennant_strip", "tengu_rotunda_pennant_credit_echoed", "tengu_rotunda_pennant_tools", "tengu_rotunda_pennant_esc", "tengu_refusal_retraction_evicted", "tengu_refusal_retraction_late_drop", "tengu_refusal_retraction_history_dropped", "tengu_refusal_retraction_orphan_tool_result", "tengu_refusal_retraction_truncation_harvest", "tengu_refusal_retraction_unauthenticated_signal", "tengu_oauth_error", "tengu_oauth_success", "tengu_oauth_token_refresh_failure", "tengu_oauth_token_refresh_success", "tengu_oauth_token_refresh_lock_acquiring", "tengu_oauth_token_refresh_lock_acquired", "tengu_oauth_token_refresh_starting", "tengu_oauth_token_refresh_completed", "tengu_oauth_token_refresh_lock_releasing", "tengu_oauth_token_refresh_lock_released", "tengu_ptl_surfaced_to_user", "tengu_query_error", "tengu_request_user_dialog_implicit_cancel", "tengu_request_user_dialog_late_answer", "tengu_request_user_dialog_requires_action", "tengu_request_user_dialog_response_ignored", "tengu_request_user_dialog_timeout", "tengu_supported_dialog_kinds_restored", "tengu_schedule_offer_shown", "tengu_sdk_control_roundtrip", "tengu_sdk_init_handshake", "tengu_sdk_mcp_false_unavailable", "tengu_sdk_result", "tengu_sdk_schema_violation", "tengu_sdk_session_crash", "tengu_sdk_stall", "tengu_sdk_ttft", "tengu_session_file_read", "tengu_started", "tengu_tool_use_error", "tengu_tool_use_granted_in_prompt_permanent", "tengu_transcript_write_failed", "tengu_tool_use_granted_in_prompt_temporary", "tengu_tool_use_rejected_in_prompt", "tengu_tool_use_success", "tengu_uncaught_exception", "tengu_uncaught_exception_loop", "tengu_unhandled_rejection", "tengu_voice_recording_started", "tengu_voice_toggled", "tengu_vscode_sdk_stream_ended_no_result", "tengu_team_mem_sync_pull", "tengu_team_mem_sync_push", "tengu_team_mem_sync_started", "tengu_team_mem_entries_capped", "tengu_timer", "tengu_bg_adopt", "tengu_bg_agent_action", "tengu_bg_agent_dispatch", "tengu_bg_agent_terminal", "tengu_bg_attach", "tengu_bg_attach_first_frame", "tengu_bg_attach_legacy_autorespawn", "tengu_bg_attach_outcome", "tengu_bg_classify", "tengu_bg_daemon_cold_start_ask", "tengu_bg_daemon_cold_start_ask_answer", "tengu_bg_daemon_install", "tengu_bg_daemon_service_poll_fallthrough", "tengu_bg_daemon_service_stale_exec", "tengu_bg_daemon_spawn_failed", "tengu_bg_daemon_wmi_fallback", "tengu_bg_daemon_zombie_false_positive", "tengu_bg_daemon_zombie_restart", "tengu_bg_dispatch", "tengu_bg_dispatch_fallback", "tengu_bg_dispatch_low_mem", "tengu_bg_dispatch_rescued", "tengu_bg_dispatch_sigkill_escalate", "tengu_bg_dispatch_stale_drop", "tengu_bg_exec_no_lastline", "tengu_bg_killjob_ctrl_fallback", "tengu_bg_orphan_reap", "tengu_bg_proto_mismatch", "tengu_bg_pty_unavailable", "tengu_bg_respawn", "tengu_bg_respawn_exhausted", "tengu_bg_respawn_stale", "tengu_bg_respawn_unconfirmed_bail", "tengu_bg_retired", "tengu_bg_roster_parse_failed", "tengu_bg_skew_nudge", "tengu_bg_spare_claim", "tengu_bg_spare_claim_fail", "tengu_bg_spare_spawn", "tengu_bg_worker_exit", "tengu_bg_worker_spawn", "tengu_daemon_cold_start_prompt", "tengu_daemon_config_reload", "tengu_daemon_exit", "tengu_daemon_idle_exit", "tengu_daemon_install_prompt_answer", "tengu_daemon_lease", "tengu_daemon_peer_uid_reject", "tengu_daemon_self_restart_on_upgrade", "tengu_daemon_start", "tengu_daemon_startup_crash", "tengu_daemon_worker_crash", "tengu_daemon_worker_permanent_exit", "tengu_daemon_yield", "tengu_daemon_yield_takeover"]), Qr5 = ["arch", "classifierModel", "classifierStage", "clientType", "decision", "entrypoint", "errorKind", "errorType", "failureKind", "fastPath", "sessionKind", "http_status_range", "http_status", "model", "op", "outcome", "platform", "provider", "reason", "coachMode", "source", "subscriptionType", "toolName", "userBucket", "userType", "version", "versionBase", ...[]];
  gZ_ = [];
  initializeDatadog = bn(async () => {
    if (Q2() || Rpi()) return QZ_ = false, false;
    try {
      return QZ_ = true, true;
    } catch (e) {
      return Ie(e), QZ_ = false, false;
    }
  });
  nr5_2 = bn(() => {
    let e = U8(),
      t = Az7.createHash("sha256").update(e).digest("hex");
    return parseInt(t.slice(0, 8), 16) % nr5;
  });
});

export {cZ_ as hNt,wz7 as NFl,HE8 as w0o,cr5 as DEm,resetDatadogInit,shutdownDatadog,trackDatadogEvent,ir5 as MEm,Az7 as BFl,DATADOG_LOGS_ENDPOINT,DATADOG_CLIENT_TOKEN,Br5 as REm,Ur5 as xEm,Fr5 as kEm,gr5 as HEm,Qr5 as IEm,gZ_ as aWt,aTH as Vye,QZ_ as lWt,initializeDatadog,nr5 as OEm,nr5_2 as LEm,JQ as iZ};

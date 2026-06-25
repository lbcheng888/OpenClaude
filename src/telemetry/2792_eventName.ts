// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
/** Default debounce/threshold constants used elsewhere in the telemetry module. */
var DEFAULT_DEBOUNCE_MS = 50000,
  LARGE_THRESHOLD = 500000,
  SMALL_COUNT = 4,
  HIGH_WATERMARK = 400000,
  MID_WATERMARK = 200000,
  TINY_LIMIT = 50,
  TEN_THOUSAND = 1e4;

/**
 * Reads the persisted auto-mode configuration and normalises it to one of the
 * three recognised states, defaulting to "opt-in" for any unknown value.
 */
function getAutoModeState(): "enabled" | "disabled" | "opt-in" {
  let autoModeEnabled = it("tengu_auto_mode_config", {})?.enabled;
  return autoModeEnabled === "enabled" || autoModeEnabled === "disabled" || autoModeEnabled === "opt-in" ? autoModeEnabled : "opt-in";
}

/** No-op telemetry hook placeholder. */
function noopEventHook(eventName: unknown, eventData: unknown, extra: unknown): void {
  return;
}

/**
 * Locates the connected `claude-vscode` MCP client, registers a log_event
 * notification handler that forwards IDE events to telemetry, and pushes the
 * current experiment gate values to the IDE.
 */
function configureVscodeGates(
  mcpClients: Array<{ name: string; type: string; client: any }>,
  options: any
): void {
  let vscodeClient = mcpClients.find(client => client.name === "claude-vscode");
  if (vscodeClient && vscodeClient.type === "connected") {
    connectedVscodeClient = vscodeClient, vscodeClient.client.setNotificationHandler(logEventSchema(), async notification => {
      let {
        eventName: forwardedEventName,
        eventData: forwardedEventData
      } = notification.params;
      if (forwardedEventName === "tengu_feedback_survey_event") {
        options?.onFeedbackSurveyEvent?.(forwardedEventData);
        return;
      }
      W(`tengu_vscode_${forwardedEventName}`, forwardedEventData);
    });
    let experimentGates = {
        tengu_vscode_review_upsell: it("tengu_vscode_review_upsell", !1),
        tengu_vscode_onboarding: it("tengu_vscode_onboarding", !1),
        tengu_quiet_fern: !0,
        tengu_vscode_cc_auth: !0,
        tengu_slate_ribbon: !0,
        tengu_brick_follow: it("tengu_brick_follow", !1),
        tengu_vellum_siding: it("tengu_vellum_siding", !1),
        tengu_loggia_carousel: options?.refusalFallbackLaneEnabled ?? !1,
        tengu_loggia_carousel_config: options?.refusalFallbackSettingToggleVisible ?? !1,
        fable5_launch_show: options?.fable5LaunchShow ?? !1,
        startup_announcement: options?.startupAnnouncement ?? !1
      },
      autoModeState = getAutoModeState();
    experimentGates.tengu_auto_mode_state = autoModeState === "opt-in" ? "enabled" : autoModeState, vscodeClient.client.notification({
      method: "experiment_gates",
      params: {
        gates: experimentGates
      }
    }).catch(error => {
      A(`[VSCode] Failed to send experiment_gates notification: ${error.message}`);
    });
  }
}

/**
 * Lazily-initialised Zod schema factory for the MCP "log_event" notification.
 */
var logEventSchema: () => unknown,
  /** Reference to the currently connected `claude-vscode` MCP client, if any. */
  connectedVscodeClient = null;

/** Lazy module initialiser — wires up dependencies and builds the log_event schema. */
var initModule = b(() => {
  qe();
  Qr();
  jn();
  kt();
  logEventSchema = ve(() => C.object({
    method: C.literal("log_event"),
    params: C.object({
      eventName: C.string(),
      eventData: C.object({}).passthrough()
    })
  }));
});

export {DEFAULT_DEBOUNCE_MS as v1t,LARGE_THRESHOLD as kzr,SMALL_COUNT as w1t,HIGH_WATERMARK as w8i,MID_WATERMARK as k8i,TINY_LIMIT as DD,TEN_THOUSAND as H8i,getAutoModeState as gFd,noopEventHook as Xke,configureVscodeGates as x8i,logEventSchema as Hzr,connectedVscodeClient as I8i,initModule as s9e};

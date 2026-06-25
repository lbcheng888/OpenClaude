// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {lt as w_,NOTIF_ACTIVE_THRESHOLD_MS as jd_,getIsRemoteMode as VK,isReplBridgeActive as SR,isUserActiveForNotifications as ks6,getLastInteractionTime as yR,getTerminalFocus as fkH} from "../session/0132_sent.ts";
import {jn as o6,K7 as iS} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {kt as y_,logEvent as c} from "../../vendor/m132.ts";
import {ri as M7,Ks as c9} from "./2235_userFacingName.ts";
import {dn as A6} from "../config/0137_namespace.ts";
import {mg as jf,lc as O5} from "../../vendor/m2209.ts";
import {oee as xzH,aW as gg,q9i as cL7,W9i as dL7} from "../session/2699_oee.ts";
import {DXa as ypK,IXa as NpK,xXa as VpK} from "../../vendor/m4297.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {Bo as A9} from "../../vendor/m5.ts";
// ---------------------------------------------------------------------------
// PushNotificationTool
//
// Tool definition for the "PushNotification" tool. Sends a notification to the
// user via their terminal and, when Remote Control is connected, also pushes it
// to their mobile device. The tool is gated behind a feature flag, suppressed
// when the user is actively present (recent keystroke / focused terminal), and
// records telemetry for every send attempt.
//
// 1:1 restoration: only internal symbol names, TypeScript types, and comments
// were added. All control flow, operators, string literals, and cross-module /
// property references are preserved exactly.
// ---------------------------------------------------------------------------

// ----- Types inferred from usage --------------------------------------------

/** Reason a notification was not sent, surfaced to the model in the result. */
type PushDisabledReason = "config_off" | "user_present" | "no_transport";

/** Validated input accepted by the tool's `call`. */
interface PushNotificationInput {
  /** The notification body. */
  message: string;
  /** Always the literal "proactive" per the input schema. */
  status?: "proactive";
}

/** Structured output payload returned in the tool result `data`. */
interface PushNotificationOutput {
  message: string;
  pushSent?: boolean;
  localSent?: boolean;
  disabledReason?: PushDisabledReason;
  idleSec?: number;
  hasFocus?: boolean;
  /** ISO timestamp captured at tool execution on the emitting process. */
  sentAt?: string;
}

// `unknown` where the surrounding module's helpers / factory are genuinely
// opaque from this file alone; cross-module references are kept verbatim.
declare const k: any;
declare function kH<T>(factory: () => T): () => T;
declare function c9<T>(definition: T): T;
declare const gg: string;
declare function iS(flag: string, fallback: boolean, ttl: number): boolean;
declare function q_(value: string | undefined): boolean;
declare function VK(): boolean;
declare function SR(): boolean;
declare function c(event: string, payload: Record<string, unknown>): void;
declare function A9(value: PushDisabledReason | undefined): string | undefined;
declare function O5(key: string, fallback: boolean): {
  value: boolean;
};
declare function ks6(): boolean;
declare function yR(): number;
declare function fkH(): boolean | undefined;
declare const jd_: number;
declare const cL7: string;
declare function dL7(): string;
declare const NpK: unknown;
declare const VpK: unknown;
declare function j_(target: object, members: Record<string, () => unknown>): void;
declare function L(init: () => void): unknown;
declare function a8(): void;
declare function w_(): void;
declare function o6(): void;
declare function y_(): void;
declare function M7(): void;
declare function A6(): void;
declare function jf(): void;
declare function xzH(): void;
declare function ypK(): void;

// ----- Module export binding -------------------------------------------------

var vpK: Record<string, unknown> = {};
j_(vpK, {
  PushNotificationTool: () => PushNotificationTool
});

/** Lazily-built input schema (memoized via `kH`). */
var dPO: () => unknown,
  /** Lazily-built output schema (memoized via `kH`). */
  lPO: () => unknown,
  /** Feature-flag TTL in milliseconds (5 minutes). */
  nPO = 300000,
  /**
   * The PushNotification tool definition. Sends a desktop/terminal notification
   * and, when Remote Control is connected, a mobile push to the user.
   */
  PushNotificationTool: ReturnType<typeof c9>;
var EpK = L(() => {
  a8();
  w_();
  o6();
  y_();
  M7();
  A6();
  jf();
  xzH();
  ypK();
  dPO = kH(() => k.strictObject({
    message: k.string().min(1).describe("The notification body. Keep it under 200 characters; mobile OSes truncate."),
    status: k.literal("proactive")
  })), lPO = kH(() => k.object({
    message: k.string(),
    pushSent: k.boolean().optional(),
    localSent: k.boolean().optional(),
    disabledReason: k.enum(["config_off", "user_present", "no_transport"]).optional(),
    idleSec: k.number().optional(),
    hasFocus: k.boolean().optional(),
    sentAt: k.string().optional().describe("ISO timestamp captured at tool execution on the emitting process. Optional — resumed sessions replay pre-sentAt outputs verbatim.")
  })), PushNotificationTool = c9({
    name: gg,
    searchHint: "send a notification to the user via terminal and optionally mobile",
    maxResultSizeChars: 1000,
    userFacingName: () => "PushNotification",
    get inputSchema() {
      return dPO();
    },
    get outputSchema() {
      return lPO();
    },
    shouldDefer: !0,
    isEnabled() {
      return iS("tengu_kairos_push_notifications", !1, nPO);
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(input: PushNotificationOutput) {
      return input.message;
    },
    async description() {
      return cL7;
    },
    async prompt() {
      return dL7();
    },
    /**
     * Build a human-readable tool-result string explaining whether (and why)
     * the notification was sent or suppressed.
     */
    mapToolResultToToolResultBlockParam(output: PushNotificationOutput, toolUseId: string) {
      let resultText: string;
      if (output.disabledReason === "config_off") resultText = "Push not sent — mobile push is disabled in /config.";else if (output.disabledReason === "user_present") {
        if (output.hasFocus === !0) resultText = "Not sent — terminal has focus. Terminal + mobile suppressed.";else {
          let thresholdSec = jd_ / 1000;
          resultText = `Not sent — user active (last keystroke ${output.idleSec !== void 0 ? `${output.idleSec}s` : `<${thresholdSec}s`} ago, threshold ${thresholdSec}s). Terminal + mobile suppressed.`;
        }
      } else if (output.disabledReason === "no_transport") resultText = output.localSent ? "Terminal notification sent. Mobile push not sent (Remote Control inactive)." : "Mobile push not sent (Remote Control inactive).";else resultText = output.localSent ? "Terminal notification sent. Mobile push requested." : "Mobile push requested.";
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: resultText
      };
    },
    renderToolUseMessage: NpK,
    renderToolResultMessage: VpK,
    /**
     * Execute the tool: decide the available transport (mobile push vs. local
     * terminal), honor suppression rules, emit telemetry, and return a
     * structured result describing what happened.
     *
     * @param input        Validated tool input ({ message }).
     * @param context      Tool execution context (carries session options).
     * @param onProgress   Optional emitter for OS notification side-effects.
     */
    async call({
      message
    }: PushNotificationInput, context: {
      options: {
        isNonInteractiveSession: boolean;
      };
    }, _abortSignal: unknown, _extra: unknown, onProgress?: (event: {
      type: string;
      message: string;
      notificationType: string;
    }) => void): Promise<{
      data: PushNotificationOutput;
    }> {
      let sentAt = new Date().toISOString(),
        isRemote = q_(process.env.CLAUDE_CODE_REMOTE) || VK(),
        hasTransport = isRemote || SR(),
        recordSend = (pushSent: boolean, localSent: boolean, disabledReason?: PushDisabledReason) => {
          c("tengu_push_notification_send", {
            message_length: message.length,
            push_sent: pushSent,
            local_sent: localSent,
            is_remote: isRemote,
            disabled_reason: A9(disabledReason)
          });
        };
      if (hasTransport && !isRemote && !O5("agentPushNotifEnabled", !1).value) return recordSend(!1, !1, "config_off"), {
        data: {
          message,
          pushSent: !1,
          localSent: !1,
          disabledReason: "config_off",
          sentAt
        }
      };
      if (!isRemote && ks6()) {
        let idleSec = Math.round((Date.now() - yR()) / 1000),
          hasFocus = fkH();
        return recordSend(!1, !1, "user_present"), {
          data: {
            message,
            pushSent: !1,
            localSent: !1,
            disabledReason: "user_present",
            idleSec,
            ...(hasFocus !== void 0 && {
              hasFocus
            }),
            sentAt
          }
        };
      }
      onProgress?.({
        type: "os_notification",
        message,
        notificationType: "push_notification"
      });
      let localSent = !context.options.isNonInteractiveSession;
      if (!hasTransport) return recordSend(!1, localSent, "no_transport"), {
        data: {
          message,
          pushSent: !1,
          localSent,
          disabledReason: "no_transport",
          sentAt
        }
      };
      return recordSend(!0, localSent), {
        data: {
          message,
          pushSent: !0,
          localSent,
          sentAt
        }
      };
    }
  });
});
export {vpK as PXa,dPO as q$p,lPO as W$p,nPO as G$p,PushNotificationTool,EpK as OXa};

// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {Nft as pO_,e5t as wU_,t5t as fU_} from "../../vendor/m5100.ts";
import {isAnthropicAuthEnabled as sf,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {getInitialSettings as n8,updateSettingsForSource as Yq,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Dxo as aMq,uPl as p04} from "../voice/5102_sanitizeKeytermsForHeader.ts";
import {o5t as DU_,r5t as JU_} from "../voice/5103_writeNativePlaybackData.ts";
import {qw as XP,UZ as dt} from "./2468_action.ts";
import {pWe as ggH} from "../../vendor/m5.ts";
import {getGlobalConfig as C_,saveGlobalConfig as P6,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Rde as W5H} from "../../vendor/m6.ts";
/*
 * telemetry/5085_call.ts - Telemetry and event-state restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
var n04 = {};
j_(n04, {
  call: (): any => call
});
// FIXME: unverified name
function _KT(H: any): any {
  let _ = H.trim().toLowerCase();
  if (_ === "") return;
  if (_ === "hold" || _ === "tap" || _ === "off") return _;
  return "invalid";
}
var HKT = 2,
  call = async (H: any): Promise<any> => {
    if (!pO_()) {
      if (!sf()) return {
        type: "text",
        value: "Voice mode requires a Claude.ai account. Please run /login to sign in."
      };
      return {
        type: "text",
        value: "Voice mode is not available."
      };
    }
    let _ = n8(),
      q = wU_(_),
      K = _KT(H);
    if (K === "invalid") return {
      type: "text",
      value: `Unknown mode: "${H.trim()}". Use hold, tap, or off.`
    };
    if (K === "off" || K === void 0 && q) {
      if (Yq("userSettings", {
        voiceEnabled: !1,
        voice: {
          ..._.voice,
          enabled: !1
        }
      }).error) return {
        type: "text",
        value: "Failed to update settings. Check your settings file for syntax errors."
      };
      return c("tengu_voice_toggled", {
        enabled: !1
      }), {
        type: "text",
        value: "Voice mode disabled."
      };
    }
    let {
        isVoiceStreamAvailable: O
      } = await Promise.resolve().then((): any => (aMq(), p04)),
      {
        checkRecordingAvailability: T
      } = await Promise.resolve().then((): any => (DU_(), JU_)),
      z = await T();
    if (!z.available) return {
      type: "text",
      value: z.reason ?? "Voice mode is not available in this environment."
    };
    if (!O()) return {
      type: "text",
      value: "Voice mode requires a Claude.ai account. Please run /login to sign in."
    };
    let {
        checkVoiceDependencies: $,
        requestMicrophonePermission: Y
      } = await Promise.resolve().then((): any => (DU_(), JU_)),
      A = await $();
    if (!A.available) return {
      type: "text",
      value: `No audio recording tool found.${A.installCommand ? `
Install audio recording tools? Run: ${A.installCommand}` : `
Install SoX manually for audio recording.`}`
    };
    if (!(await Y())) {
      let G;
      return G = "System Settings \u2192 Privacy & Security \u2192 Microphone", {
        type: "text",
        value: `Microphone access is denied. To enable it, go to ${G}, then run /voice again.`
      };
    }
    let w = K === "hold" || K === "tap" ? K : _.voice?.mode ?? "hold";
    if (Yq("userSettings", {
      voiceEnabled: !0,
      voice: {
        ..._.voice,
        enabled: !0,
        mode: w
      }
    }).error) return {
      type: "text",
      value: "Failed to update settings. Check your settings file for syntax errors."
    };
    c("tengu_voice_toggled", {
      enabled: !0,
      tap_mode: w === "tap"
    });
    let j = XP("voice:pushToTalk", "Chat", "Space"),
      J = w === "tap" ? `Tap ${j} (with input empty) to start, tap again to send.` : `Hold ${j} to record.`,
      D = ggH(_.language),
      M = C_(),
      X = M.voiceLangHintLastLanguage !== D.code,
      P = X ? 0 : M.voiceLangHintShownCount ?? 0,
      Z = !D.fellBackFrom && P < HKT,
      W = "";
    if (D.fellBackFrom) W = ` Note: "${D.fellBackFrom}" is not a supported dictation language; using English. Change it via /config.`;else if (Z) W = ` Dictation language: ${D.code} (/config to change).`;
    if (X || Z) P6((G: any): any => ({
      ...G,
      voiceLangHintShownCount: P + (Z ? 1 : 0),
      voiceLangHintLastLanguage: D.code
    }));
    return {
      type: "text",
      value: `Voice mode enabled (${w}). ${J}${W}`
    };
  };
var i04 = L((): any => {
  W5H();
  dt();
  y_();
  Mq();
  T8();
  N8();
  fU_();
});
export {n04 as yPl,_KT as Ifm,HKT as Hfm,call as Dfm,i04 as TPl};

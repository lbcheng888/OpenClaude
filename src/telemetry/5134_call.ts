// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {t_t,CVt,AVt} from "../../vendor/m5130.ts";
import {isAnthropicAuthEnabled as aT,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {getInitialSettings as Fr,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {UDo,FUl} from "../voice/5132_sanitizeKeytermsForHeader.ts";
import {wVt,vVt} from "../voice/5133_writeNativePlaybackData.ts";
import {KR,NZ} from "./2478_action.ts";
import {HKe} from "../../vendor/m128.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {bre} from "../../vendor/m129.ts";
// @ts-nocheck
/** /voice inline command handler — toggles voice mode and configures push-to-talk behavior. */

/** Module exports namespace. */
var zUl = {};
ft(zUl, {
  call: () => call
});

/**
 * Normalizes a raw voice-mode argument string.
 *
 * @param rawArg user-supplied mode text (e.g. "Hold", " off ")
 * @returns the canonical mode ("hold" | "tap" | "off"), undefined for empty input,
 *          or "invalid" for an unrecognized value.
 */
function qCm(rawArg: string): "hold" | "tap" | "off" | "invalid" | undefined {
  let normalized = rawArg.trim().toLowerCase();
  if (normalized === "") return;
  if (normalized === "hold" || normalized === "tap" || normalized === "off") return normalized;
  return "invalid";
}

/** Maximum number of times the dictation-language hint is shown before being suppressed. */
var $Cm = 2,
  /**
   * Implements the `/voice` inline slash command.
   *
   * Validates environment and account access, then enables or disables voice
   * mode and persists the chosen push-to-talk mode ("hold" | "tap") to user
   * settings. Returns a text message describing the result.
   *
   * @param rawArg the raw command argument (mode keyword or empty).
   */
  call = async (rawArg: string): Promise<{ type: "text"; value: string }> => {
    if (!t_t()) {
      if (!aT()) return {
        type: "text",
        value: "Voice mode requires a Claude.ai account. Please run /login to sign in."
      };
      return {
        type: "text",
        value: "Voice mode is not available."
      };
    }
    let config = Fr(),
      voiceCurrentlyEnabled = CVt(config),
      requestedMode = qCm(rawArg);
    if (requestedMode === "invalid") return {
      type: "text",
      value: `Unknown mode: "${rawArg.trim()}". Use hold, tap, or off.`
    };
    if (requestedMode === "off" || requestedMode === void 0 && voiceCurrentlyEnabled) {
      if (ao("userSettings", {
        voiceEnabled: !1,
        voice: {
          ...config.voice,
          enabled: !1
        }
      }).error) return {
        type: "text",
        value: "Failed to update settings. Check your settings file for syntax errors."
      };
      return W("tengu_voice_toggled", {
        enabled: !1
      }), {
        type: "text",
        value: "Voice mode disabled."
      };
    }
    let {
        isVoiceStreamAvailable: isVoiceStreamAvailable
      } = await Promise.resolve().then(() => (UDo(), FUl)),
      {
        checkRecordingAvailability: checkRecordingAvailability
      } = await Promise.resolve().then(() => (wVt(), vVt)),
      recordingAvailability = await checkRecordingAvailability();
    if (!recordingAvailability.available) return {
      type: "text",
      value: recordingAvailability.reason ?? "Voice mode is not available in this environment."
    };
    if (!isVoiceStreamAvailable()) return {
      type: "text",
      value: "Voice mode requires a Claude.ai account. Please run /login to sign in."
    };
    let {
        checkVoiceDependencies: checkVoiceDependencies,
        requestMicrophonePermission: requestMicrophonePermission
      } = await Promise.resolve().then(() => (wVt(), vVt)),
      dependencyStatus = await checkVoiceDependencies();
    if (!dependencyStatus.available) return {
      type: "text",
      value: `No audio recording tool found.${dependencyStatus.installCommand ? `
Install audio recording tools? Run: ${dependencyStatus.installCommand}` : `
Install SoX manually for audio recording.`}`
    };
    if (!(await requestMicrophonePermission())) {
      let micSettingsPath: string;
      return micSettingsPath = "System Settings → Privacy & Security → Microphone", {
        type: "text",
        value: `Microphone access is denied. To enable it, go to ${micSettingsPath}, then run /voice again.`
      };
    }
    let resolvedMode = requestedMode === "hold" || requestedMode === "tap" ? requestedMode : config.voice?.mode ?? "hold";
    if (ao("userSettings", {
      voiceEnabled: !0,
      voice: {
        ...config.voice,
        enabled: !0,
        mode: resolvedMode
      }
    }).error) return {
      type: "text",
      value: "Failed to update settings. Check your settings file for syntax errors."
    };
    W("tengu_voice_toggled", {
      enabled: !0,
      tap_mode: resolvedMode === "tap"
    });
    let pushToTalkKey = KR("voice:pushToTalk", "Chat", "space"),
      modeHint = resolvedMode === "tap" ? `Tap ${pushToTalkKey} (with input empty) to start, tap again to send.` : `Hold ${pushToTalkKey} to record.`,
      dictationLanguage = HKe(config.language),
      appState = Ot(),
      languageChanged = appState.voiceLangHintLastLanguage !== dictationLanguage.code,
      langHintShownCount = languageChanged ? 0 : appState.voiceLangHintShownCount ?? 0,
      shouldShowLangHint = !dictationLanguage.fellBackFrom && langHintShownCount < $Cm,
      langHintText = "";
    if (dictationLanguage.fellBackFrom) langHintText = ` Note: "${dictationLanguage.fellBackFrom}" is not a supported dictation language; using English. Change it via /config.`;else if (shouldShowLangHint) langHintText = ` Dictation language: ${dictationLanguage.code} (/config to change).`;
    if (languageChanged || shouldShowLangHint) hn(prevState => ({
      ...prevState,
      voiceLangHintShownCount: langHintShownCount + (shouldShowLangHint ? 1 : 0),
      voiceLangHintLastLanguage: dictationLanguage.code
    }));
    return {
      type: "text",
      value: `Voice mode enabled (${resolvedMode}). ${modeHint}${langHintText}`
    };
  };

/** Lazy module initializer — ensures dependency modules are loaded. */
var jUl = b(() => {
  bre();
  NZ();
  kt();
  lo();
  tr();
  br();
  AVt();
});

export {zUl,qCm,$Cm,call as WCm,jUl};

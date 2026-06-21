// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L,M as u} from "../../runtime.ts";
import {useTerminalFocus as r$,twe as iXH} from "../../vendor/m2380.ts";
import {useSetVoiceState as nsH,iAe as iTH} from "../../vendor/m2457.ts";
import {useClock as u9} from "../../vendor/m2432.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {sleep as l6} from "../telemetry/1483_withTimeout.ts";
import {pWe as ggH} from "../../vendor/m5.ts";
import {getInitialSettings as n8,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {OLo as kGq,QVl as $B4} from "../agent/5474_QVl.ts";
import {connectVoiceStream as qc6,probeVoiceConnectivity as rMq,isVoiceStreamAvailable as oMq,Dxo as aMq} from "../voice/5102_sanitizeKeytermsForHeader.ts";
import {Ie as vH,Oe as IH,ln as M6} from "../telemetry/0594_feature_name.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {_o as Dq,bt as L_} from "../../vendor/m195.ts";
import {o5t as DU_,r5t as JU_} from "../voice/5103_writeNativePlaybackData.ts";
import {R3o as zSq,KI as Rh} from "../../vendor/m234.ts";
import {Rde as W5H} from "../../vendor/m6.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Voice dictation hook, microphone lifecycle, websocket transcription, and audio-level metering.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

var jB4 = {};
j_(jB4, {
  useVoice: () => useVoice,
  computeLevel: () => computeLevel,
  FIRST_PRESS_FALLBACK_MS: () => FIRST_PRESS_FALLBACK_MS
});
/** Record an early voice-start failure for circuit breaking. */
function recordVoiceEarlyFailure() : any {
  bhH.push(Date.now());
}
/** Reset voice circuit-breaker state after a successful session. */
function resetVoiceEarlyFailures() : any {
  bhH.length = 0, hi6 = !1;
}
/** Build the voice telemetry reason for a failed connection. */
function voiceConnectionFailureReason(H: any) : any {
  return `voice_transcription_connection_failed_${H ?? "no_response"}`;
}
/** Compute a normalized RMS audio level from 16-bit PCM data. */
function computeLevel(H: any) : any {
  let _ = H.length >> 1;
  if (_ === 0) return 0;
  let q = 0;
  for (let T = 0; T < H.length - 1; T += 2) {
    let z = (H[T] | H[T + 1] << 8) << 16 >> 16;
    q += z * z;
  }
  let K = Math.sqrt(q / _),
    O = Math.min(K / 2000, 1);
  return Math.sqrt(O);
}
/** Manage voice recording, transcription streaming, retries, and transcript insertion. */
function useVoice({
  onTranscript: H,
  onError: _,
  enabled: q,
  focusMode: K,
  mode: O = "hold"
}: any) : any {
  let [T, z] = JY.useState("idle"),
    $ = JY.useRef("idle"),
    Y = JY.useRef(null),
    A = JY.useRef(""),
    w = JY.useRef(H),
    f = JY.useRef(_),
    j = JY.useRef(null),
    J = JY.useRef(null),
    D = JY.useRef(!1),
    M = JY.useRef(null),
    X = JY.useRef(!1),
    P = JY.useRef(!1),
    Z = JY.useRef(null),
    W = JY.useRef(null),
    G = JY.useRef(null),
    R = JY.useRef(!1),
    h = JY.useRef(0),
    y = JY.useRef(0),
    E = JY.useRef(!1),
    v = JY.useRef([]),
    C = JY.useRef(!1),
    S = JY.useRef(0),
    I = JY.useRef(0),
    p = JY.useRef(!1),
    b = JY.useRef(!1),
    x = JY.useRef(null),
    U = JY.useRef([]),
    F = r$(),
    Q = nsH(),
    d = u9();
  w.current = H, f.current = _;
  function l(zH: any) : any {
    $.current = zH, z(zH), Q(_H => {
      if (_H.voiceState === zH) return _H;
      return {
        ..._H,
        voiceState: zH
      };
    });
  }
  let n = JY.useCallback(() => {
    if (y.current++, j.current) j.current(), j.current = null;
    if (J.current) J.current(), J.current = null;
    if (M.current) M.current(), M.current = null;
    if (Z.current) Z.current(), Z.current = null;
    if (W.current) W.current(), W.current = null;
    if (G.current) G.current(), G.current = null;
    if (R.current = !1, P.current = !1, dwH?.stopRecording(), Y.current) Y.current.close(), Y.current = null;
    A.current = "", U.current = [], v.current = [], Q(zH => {
      if (zH.voiceInterimTranscript === "" && !zH.voiceAudioLevels.length) return zH;
      return {
        ...zH,
        voiceInterimTranscript: "",
        voiceAudioLevels: []
      };
    });
  }, [Q]);
  function o() : any {
    N("[voice] finishRecording: stopping recording, transitioning to processing"), S.current++;
    let zH = X.current;
    if (X.current = !1, P.current = !1, W.current) W.current(), W.current = null;
    if (G.current) G.current(), G.current = null;
    l("processing"), dwH?.stopRecording();
    let _H = Date.now() - h.current,
      OH = p.current,
      AH = E.current,
      $H = I.current,
      wH = b.current,
      jH = x.current,
      MH = y.current,
      TH = () => y.current !== MH;
    N("[voice] Recording stopped"), (Y.current ? Y.current.finalize() : Promise.resolve(void 0)).then(async JH => {
      if (TH()) return;
      if (JH === "no_data_timeout" && OH && wH && !zH && $H === 0 && A.current.trim() === "" && !C.current && v.current.length > 0) {
        if (C.current = !0, N(`[voice] Silent-drop detected (no_data_timeout, ${String(v.current.length)} chunks); replaying on fresh connection`), c("tengu_voice_silent_drop_replay", {
          recordingDurationMs: _H,
          chunkCount: v.current.length
        }), Y.current) Y.current.close(), Y.current = null;
        let fH = v.current;
        if (await l6(250), TH()) return;
        let hH = ggH(n8().language),
          PH = await kGq();
        if (TH()) return;
        if (await new Promise(NH => {
          qc6({
            onTranscript: (xH, CH) => {
              if (TH()) return;
              if (CH && xH.trim()) {
                if (A.current) A.current += " ";
                A.current += xH.trim();
              }
            },
            onError: () => NH(),
            onClose: () => {},
            onReady: xH => {
              if (TH()) {
                xH.close(), NH();
                return;
              }
              Y.current = xH;
              let CH = 32000,
                uH = [],
                QH = 0;
              for (let mH of fH) {
                if (QH > 0 && QH + mH.length > CH) xH.send(Buffer.concat(uH)), uH = [], QH = 0;
                uH.push(mH), QH += mH.length;
              }
              if (uH.length) xH.send(Buffer.concat(uH));
              xH.finalize().then(() => {
                xH.close(), NH();
              });
            }
          }, {
            language: hH.code,
            keyterms: PH
          }).then(xH => {
            if (!xH) NH();
          }, () => NH());
        }), TH()) return;
      }
      v.current = [];
      let YH = A.current.trim();
      if (N(`[voice] Final transcript assembled (${String(YH.length)} chars)`), c("tengu_voice_recording_completed", {
        transcriptChars: YH.length + $H,
        recordingDurationMs: _H,
        hadAudioSignal: OH,
        retried: AH,
        silentDropRetried: C.current,
        wsConnected: wH,
        focusTriggered: zH
      }), Y.current) Y.current.close(), Y.current = null;
      if (YH) N(`[voice] Injecting transcript (${String(YH.length)} chars)`), vH("voice_transcription"), w.current(YH);else if ($H === 0 && _H > 2000) if (!wH) {
        if (f.current("Voice connection failed. Check your network and try again."), jH) IH("voice_transcription", voiceConnectionFailureReason(jH));else rMq().then(fH => {
          IH("voice_transcription", voiceConnectionFailureReason(`probe_${fH}`));
        });
      } else if (!OH) IH("voice_transcription", "voice_transcription_no_audio_signal"), f.current("No audio detected from microphone. Check that the correct input device is selected and that Claude Code has microphone access.");else IH("voice_transcription", "voice_transcription_no_speech"), f.current("No speech detected.");
      A.current = "", Q(fH => {
        if (fH.voiceInterimTranscript === "") return fH;
        return {
          ...fH,
          voiceInterimTranscript: ""
        };
      }), l("idle");
    }).catch(JH => {
      if (IH("voice_transcription", "voice_transcription_finalize_failed"), EH(Dq(JH)), !TH()) l("idle");
    });
  }
  JY.useEffect(() => {
    if (q && !dwH) Promise.resolve().then(() => (DU_(), JU_)).then(zH => {
      dwH = zH;
    });
  }, [q]);
  function i() : any {
    if (Z.current) Z.current();
    Z.current = d.setTimeout(() => {
      if (Z.current = null, $.current === "recording" && X.current) N("[voice] Focus silence timeout \u2014 tearing down session"), R.current = !0, o();
    }, vPT);
  }
  function t() : any {
    if (W.current) W.current();
    W.current = d.setTimeout(() => {
      if (W.current = null, $.current === "recording" && P.current) N("[voice] Toggle silence timeout \u2014 auto-finishing"), o();
    }, EPT);
  }
  function a() : any {
    if (G.current) G.current();
    G.current = d.setTimeout(() => {
      if (G.current = null, $.current === "recording" && P.current) N("[voice] Toggle max-duration cap \u2014 auto-finishing"), o();
    }, SPT);
  }
  JY.useEffect(() => {
    if (!q || !K) {
      if (X.current && $.current === "recording") N("[voice] Focus mode disabled during recording, finishing"), o();
      return;
    }
    let zH = !1;
    if (F && $.current === "idle" && !R.current) {
      let _H = () => {
        if (zH || $.current !== "idle" || R.current) return;
        N("[voice] Focus gained, starting recording session"), X.current = !0, e(), i();
      };
      if (dwH) _H();else Promise.resolve().then(() => (DU_(), JU_)).then(OH => {
        dwH = OH, _H();
      });
    } else if (!F) {
      if (R.current = !1, $.current === "recording") N("[voice] Focus lost, finishing recording"), o();
    }
    return () => {
      zH = !0;
    };
  }, [q, K, F]);
  async function e() : any {
    if (!dwH) {
      IH("voice_start", "voice_start_module_not_loaded"), f.current("Voice module not loaded yet. Try again in a moment.");
      return;
    }
    let zH = Date.now();
    while (bhH.length > 0 && zH - bhH[0] > YB4) bhH.shift();
    if (bhH.length < AB4) hi6 = !1;
    if (bhH.length >= AB4) {
      if (!hi6) hi6 = !0, N(`[voice] circuit breaker: ${String(bhH.length)} early failures in ${String(YB4)}ms \u2014 suppressing new sessions until one succeeds`, {
        level: "error"
      }), c("tengu_voice_circuit_breaker_tripped", {}), f.current("Voice input is failing repeatedly and has been paused. Check your microphone and try again in a moment.");
      return;
    }
    l("recording"), h.current = Date.now(), A.current = "", D.current = !1, p.current = !1, E.current = !1, C.current = !1, v.current = [], I.current = 0, b.current = !1, x.current = null;
    let _H = ++y.current,
      OH = await dwH.checkRecordingAvailability();
    if (!OH.available) {
      N(`[voice] Recording not available: ${OH.reason ?? "unknown"}`), IH("voice_start", "voice_start_recording_unavailable"), f.current(OH.reason ?? "Audio recording is not available."), recordVoiceEarlyFailure(), n(), l("idle");
      return;
    }
    N("[voice] Starting recording session, connecting voice stream"), Q(JH => {
      if (!JH.voiceError) return JH;
      return {
        ...JH,
        voiceError: null
      };
    });
    let AH = [];
    if (N("[voice] startRecording: buffering audio while WebSocket connects"), U.current = [], !(await dwH.startRecording(JH => {
      let YH = Buffer.from(JH);
      if (!X.current) v.current.push(YH);
      if (Y.current) Y.current.send(YH);else AH.push(YH);
      let fH = computeLevel(JH);
      if (!p.current && fH > 0.01) p.current = !0;
      let hH = U.current;
      if (hH.length >= CPT) hH.shift();
      hH.push(fH);
      let PH = [...hH];
      U.current = PH, Q(NH => ({
        ...NH,
        voiceAudioLevels: PH
      }));
    }, () => {
      if ($.current === "recording") o();
    }, {
      silenceDetection: !1
    }))) {
      IH("voice_start", "voice_start_capture_failed"), N("[voice] Recording failed \u2014 no audio tool found", {
        level: "error"
      }), f.current("Failed to start audio capture. Check that your microphone is accessible."), recordVoiceEarlyFailure(), n(), l("idle"), Q(JH => ({
        ...JH,
        voiceError: "Recording failed \u2014 no audio tool found"
      }));
      return;
    }
    let wH = n8().language,
      jH = ggH(wH);
    vH("voice_start"), c("tengu_voice_recording_started", {
      focusTriggered: X.current,
      sttLanguage: jH.code,
      sttLanguageIsDefault: !wH?.trim(),
      sttLanguageFellBack: jH.fellBackFrom !== void 0,
      systemLocaleLanguage: zSq()
    });
    let MH = !1,
      TH = () => y.current !== _H,
      XH = JH => {
        let YH = S.current;
        qc6({
          onTranscript: (fH, hH) => {
            if (TH()) return;
            if (MH = !0, resetVoiceEarlyFailures(), N(`[voice] onTranscript: isFinal=${String(hH)} (${String(fH.length)} chars)`), hH && fH.trim()) {
              if (X.current) N(`[voice] Focus mode: flushing final transcript immediately (${String(fH.trim().length)} chars)`), vH("voice_transcription"), w.current(fH.trim()), I.current += fH.trim().length, Q(PH => {
                if (PH.voiceInterimTranscript === "") return PH;
                return {
                  ...PH,
                  voiceInterimTranscript: ""
                };
              }), A.current = "", i();else {
                if (P.current) t();
                if (A.current) A.current += " ";
                A.current += fH.trim(), N(`[voice] Accumulated final transcript (${String(A.current.length)} chars)`), Q(PH => {
                  let NH = A.current;
                  if (PH.voiceInterimTranscript === NH) return PH;
                  return {
                    ...PH,
                    voiceInterimTranscript: NH
                  };
                });
              }
            } else if (!hH) {
              if (X.current) i();else if (P.current) t();
              let PH = fH.trim(),
                NH = A.current ? A.current + (PH ? " " + PH : "") : PH;
              Q(xH => {
                if (xH.voiceInterimTranscript === NH) return xH;
                return {
                  ...xH,
                  voiceInterimTranscript: NH
                };
              });
            }
          },
          onError: (fH, hH) => {
            if (TH()) {
              N(`[voice] ignoring onError from stale session: ${fH}`);
              return;
            }
            if (S.current !== YH) {
              N(`[voice] ignoring stale onError from superseded attempt: ${fH}`);
              return;
            }
            if (hH?.connectFailureCode) x.current = hH.connectFailureCode;
            if (!hH?.fatal && !MH && $.current === "recording") {
              if (!E.current) {
                E.current = !0, N(`[voice] early voice_stream error (pre-transcript), retrying once: ${fH}`), c("tengu_voice_stream_early_retry", {}), Y.current = null, S.current++, d.setTimeout(() => {
                  if ($.current === "recording") XH(JH);
                }, 250);
                return;
              }
            }
            if (S.current++, !MH) recordVoiceEarlyFailure();
            IH("voice_stream_connect", "voice_stream_connection_error"), N(`[voice] voice_stream error: ${fH}`, {
              level: "error"
            }), f.current(`Voice stream error: ${fH}`), AH.length = 0, X.current = !1, n(), l("idle");
          },
          onClose: () => {},
          onReady: fH => {
            if (TH() || $.current !== "recording") {
              fH.close();
              return;
            }
            Y.current = fH, b.current = !0, vH("voice_stream_connect");
            let hH = 32000;
            if (AH.length > 0) {
              let PH = 0;
              for (let CH of AH) PH += CH.length;
              let NH = [[]],
                xH = 0;
              for (let CH of AH) {
                if (xH > 0 && xH + CH.length > hH) NH.push([]), xH = 0;
                NH.at(-1).push(CH), xH += CH.length;
              }
              N(`[voice] onReady: flushing ${String(AH.length)} buffered chunks (${String(PH)} bytes) as ${String(NH.length)} coalesced frame(s)`);
              for (let CH of NH) fH.send(Buffer.concat(CH));
            }
            if (AH.length = 0, J.current) J.current();
            if (D.current) J.current = d.setTimeout(() => {
              if (J.current = null, $.current === "recording") o();
            }, NGq);
          }
        }, {
          language: jH.code,
          keyterms: JH
        }).then(fH => {
          if (TH()) {
            fH?.close();
            return;
          }
          if (!fH) {
            N("[voice] Failed to connect to voice_stream (no OAuth token?)"), IH("voice_stream_connect", "voice_stream_no_auth"), f.current("Voice mode requires a Claude.ai account. Please run /login to sign in."), AH.length = 0, n(), l("idle");
            return;
          }
          if ($.current !== "recording") {
            AH.length = 0, fH.close();
            return;
          }
        }, fH => {
          if (EH(Dq(fH)), IH("voice_stream_connect", "voice_stream_connect_exception"), TH()) return;
          if ($.current !== "recording") return;
          recordVoiceEarlyFailure(), f.current("Voice connection failed. Check your network and try again."), AH.length = 0, X.current = !1, n(), l("idle");
        });
      };
    kGq().then(XH);
  }
  let qH = JY.useCallback((zH = VPT) => {
    if (!q || !oMq()) return;
    if (X.current) return;
    if (K && R.current) {
      N("[voice] Re-arming focus recording after silence timeout"), R.current = !1, X.current = !0, e(), i();
      return;
    }
    let _H = $.current;
    if (_H === "processing") return;
    if (O === "tap") {
      if (_H === "idle") N("[voice] toggle: starting recording"), P.current = !0, e(), t(), a();else if (_H === "recording") N("[voice] toggle: finishing recording"), o();
      return;
    }
    if (_H === "idle") {
      if (N("[voice] handleKeyEvent: idle, starting recording session immediately"), e(), M.current) M.current();
      M.current = d.setTimeout(() => {
        if (M.current = null, $.current === "recording" && !D.current) N("[voice] No auto-repeat seen, arming release timer via fallback"), D.current = !0, J.current = d.setTimeout(() => {
          if (J.current = null, $.current === "recording") o();
        }, NGq);
      }, zH);
    } else if (_H === "recording") {
      if (D.current = !0, M.current) M.current(), M.current = null;
    }
    if (J.current) J.current();
    if ($.current === "recording" && D.current) J.current = d.setTimeout(() => {
      if (J.current = null, $.current === "recording") o();
    }, NGq);
  }, [q, K, O, n, d]);
  JY.useEffect(() => {
    if (!q && $.current !== "idle") n(), l("idle");
    return () => {
      if (n(), $.current !== "idle") l("idle");
    };
  }, [q, n]);
  let KH = JY.useCallback(() => {
    if ($.current === "idle") return;
    N("[voice] cancelRecording: discarding without submit"), vH("voice_cancel"), n(), l("idle");
  }, [n]);
  return {
    state: T,
    handleKeyEvent: qH,
    cancelRecording: KH
  };
}
var JY,
  dwH = null,
  YB4 = 1e4,
  AB4 = 3,
  bhH,
  hi6 = !1,
  NGq = 200,
  VPT = 600,
  FIRST_PRESS_FALLBACK_MS = 2000,
  vPT = 5000,
  EPT = 15000,
  SPT = 120000,
  CPT = 16;
var JB4 = L(() => {
  W5H();
  iTH();
  iXH();
  nH();
  M6();
  y_();
  $B4();
  aMq();
  FH();
  L_();
  Rh();
  S6();
  N8();
  JY = u(WH(), 1), bhH = [];
});
export {jB4 as r7l,recordVoiceEarlyFailure as LXn,resetVoiceEarlyFailures as uMm,voiceConnectionFailureReason as t7l,computeLevel,useVoice,JY as Sh,dwH as lTe,YB4 as ZVl,AB4 as e7l,bhH as tOe,hi6 as MXn,NGq as LLo,VPT as dMm,FIRST_PRESS_FALLBACK_MS,vPT as mMm,EPT as fMm,SPT as AMm,CPT as hMm,JB4 as o7l};

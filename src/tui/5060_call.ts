// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {_t,bo,gc,uo} from "../../vendor/m2468.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {oP,hAo,fAo,HVn,H8t,dAo,IVn,k8t,ZY,xVn,gTe} from "../../vendor/m4528.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {_Dt,yDt,Cp} from "../config/2223_level.ts";
import {clearRefusalFallbackModelLatch as vre,lt} from "../session/0132_sent.ts";
import {He,Pt,xe,mn} from "../telemetry/0600_feature_name.ts";
import {$l,xAe,Hf,vk,WS} from "../api/1453_month.ts";
import {JDe,w8t} from "../../vendor/m4527.ts";
import {isOpus1mMergeEnabled as cC,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {KGt,sxo} from "../core/5055_variant.ts";
import {$gt,oxo} from "../../vendor/m5053.ts";
import {V8e,UVn} from "./4546_initial.ts";
import {pl,Nu,Ub,Wu} from "../../vendor/m438.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {jGt,FYn} from "../api/5058_type.ts";
import {UYn,YGt} from "../config/5059_isDeprecated.ts";
import {loe,i3,Ud} from "../../vendor/m615.ts";
import {ep} from "../../vendor/m2223.ts";
import {je} from "../../vendor/m2462.ts";
import {IA} from "../telemetry/2225_names.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
// NOTE: The v185 port-from file (4932_call.ts) is a *different* module — it is the
// `/loops` command handler (crons + stop-hooks). This v190 module is the `/model`
// command handler. They share no structure, so nothing could be ported; the names
// and types below were derived directly from this module's own structure.

/** Module-export object (populated by `ft` below). */
var w1l = {};
ft(w1l, {
  call: () => call
});

/**
 * Interactive model-picker dialog for the `/model` command (no args path).
 *
 * Renders the model selection menu and handles confirmation dialogs for
 * effort changes, consent prompts, and model switches.
 *
 * @param hasConversationMessages - Whether the current conversation has messages.
 * @param onDone - Callback to emit a status/result message.
 */
function bTm({
  hasConversationMessages: hasConversationMessages,
  onDone: onDone
}) {
  let mainLoopModel = _t(state => state.mainLoopModel),
    sessionModel = _t(state => state.mainLoopModelForSession),
    fastMode = _t(state => state.fastMode),
    effortValue = _t(state => state.effortValue),
    cacheMissAckedTokens = _t(state => state.cacheMissAckedAtOutputTokens),
    setAppState = bo(),
    {
      addNotification: addNotification
    } = Ci(),
    [confirmState, setConfirmState] = rSe.useState(null),
    [consentState, setConsentState] = rSe.useState(null),
    saveAsDefaultRef = rSe.useRef(!1);

  /** Cancel handler — keeps the current model and emits a system message. */
  function handleCancel() {
    W("tengu_model_command_menu", {
      action: Ve("cancel")
    });
    let modelLabel = oP(mainLoopModel);
    onDone(`Kept model as ${bt.bold(modelLabel)}`, {
      display: "system"
    });
  }

  /**
   * Selection handler — runs consent/upgrade/effort gates, then applies the switch.
   *
   * @param model - The selected model.
   * @param effort - The selected effort value (or undefined).
   * @param consentGiven - Whether consent has already been granted (skips the consent gate).
   */
  function handleSelect(model, effort, consentGiven = !1) {
    if (!consentGiven && hAo(model)) {
      setConsentState({
        model: model,
        effort: effort
      });
      return;
    }
    if (fAo(model, mainLoopModel, sessionModel, cacheMissAckedTokens)) {
      setConfirmState({
        model: model,
        effort: effort,
        kind: "model"
      });
      return;
    }
    if (effort !== void 0 && _Dt(effort, effortValue, HVn(model), cacheMissAckedTokens, hasConversationMessages)) {
      setConfirmState({
        model: model,
        effort: effort,
        kind: "effort"
      });
      return;
    }
    applyModelSwitch(model, effort);
  }

  /**
   * Apply the model switch: update telemetry + app state, emit confirmation,
   * and append any fast-mode / usage-credit notices.
   *
   * @param model - The model to switch to.
   * @param effort - The effort value to set (or undefined to leave unchanged).
   */
  function applyModelSwitch(model, effort) {
    if (W("tengu_model_command_menu", {
      action: model,
      from_model: mainLoopModel,
      to_model: model
    }), effort !== void 0) yDt(effort);
    vre(), setAppState(prev => ({
      ...prev,
      mainLoopModel: model,
      mainLoopModelForSession: null,
      ...(effort !== void 0 && {
        effortValue: effort
      })
    }));
    let savedAsDefault = saveAsDefaultRef.current;
    if (saveAsDefaultRef.current = !1, savedAsDefault) H8t(model);
    He("model_switch"), v1l(model, addNotification);
    let message = `Set model to ${bt.bold(oP(model))}${savedAsDefault ? " and saved as your default for new sessions" : " for this session only"}`;
    if (effort !== void 0) message += ` with ${bt.bold(effort)} effort`;
    let fastModeState = void 0;
    if ($l()) {
      if (xAe(), !Hf(model) && fastMode) setAppState(prev => ({
        ...prev,
        fastMode: !1
      })), fastModeState = !1;else if (Hf(model) && vk() && fastMode) message += " \xB7 Fast mode ON", fastModeState = !0;
    }
    if (JDe(model, fastModeState === !0, cC())) message += " \xB7 Draws from usage credits";
    if (fastModeState === !1) message += " \xB7 Fast mode OFF";
    if (savedAsDefault) message += dAo(model);
    onDone(message);
  }
  if (consentState) {
    let {
      model: model,
      effort: effort
    } = consentState;
    return Bue.jsx(KGt, {
      variant: "picker",
      onDone: (outcome, keptMessage) => {
        if (setConsentState(null), outcome === "consent") {
          handleSelect(model, effort, !0);
          return;
        }
        saveAsDefaultRef.current = !1, onDone(keptMessage ?? `Kept model as ${bt.bold(oP(mainLoopModel))}`, {
          display: "system"
        });
      }
    });
  }
  if (confirmState) return Bue.jsx($gt, {
    kind: confirmState.kind,
    model: confirmState.model,
    effort: confirmState.effort,
    onConfirm: () => applyModelSwitch(confirmState.model, confirmState.effort),
    onCancel: () => {
      setConfirmState(null), saveAsDefaultRef.current = !1;
    }
  });
  return Bue.jsx(V8e, {
    initial: mainLoopModel,
    sessionModel: sessionModel,
    onSelect: handleSelect,
    onSetDefault: model => {
      saveAsDefaultRef.current = !0;
    },
    onCancel: handleCancel,
    isStandaloneCommand: !0,
    skipSettingsWrite: !0,
    showFastModeNotice: $l() && fastMode && Hf(mainLoopModel) && vk()
  });
}

/**
 * Inline `/model <name>` handler — sets the model from a CLI argument.
 *
 * Handles both cloud (remote thin client) sessions and local sessions, with
 * consent / confirmation dialogs as needed. Uses React Compiler memoization
 * cache (`R1l.c`) so the manual `t[...]` slots and their `else` branches are
 * preserved exactly.
 */
function ETm(props) {
  let cache = R1l.c(29),
    {
      args: args,
      onDone: onDone
    } = props,
    sessionStore = gc(),
    setAppState = bo(),
    {
      addNotification: addNotification
    } = Ci(),
    [confirmState, setConfirmState] = rSe.useState(null),
    [consentState, setConsentState] = rSe.useState(null),
    applyModel;
  if (cache[0] !== addNotification || cache[1] !== onDone || cache[2] !== setAppState || cache[3] !== sessionStore) applyModel = model => {
    let isInteractive = !pl(),
      resultMessage = IVn(model, () => sessionStore.getState(), setAppState, isInteractive);
    v1l(model, addNotification), onDone(resultMessage);
  }, cache[0] = addNotification, cache[1] = onDone, cache[2] = setAppState, cache[3] = sessionStore, cache[4] = applyModel;else applyModel = cache[4];
  let applyModelFn = applyModel,
    selectModel;
  if (cache[5] !== applyModelFn || cache[6] !== sessionStore) selectModel = model => {
    let state = sessionStore.getState();
    if (fAo(model, state.mainLoopModel, state.mainLoopModelForSession, state.cacheMissAckedAtOutputTokens)) {
      setConfirmState({
        model: model
      });
      return;
    }
    applyModelFn(model);
  }, cache[5] = applyModelFn, cache[6] = sessionStore, cache[7] = selectModel;else selectModel = cache[7];
  let selectModelFn = selectModel,
    runEffect,
    effectDeps;
  if (cache[8] !== args || cache[9] !== onDone || cache[10] !== selectModelFn || cache[11] !== setAppState) runEffect = () => {
    let remoteSession = Nu();
    if (remoteSession && Ub()) {
      k8t(args).then(resolved => {
        if (!resolved.ok) {
          onDone(resolved.message, {
            display: "system"
          });
          return;
        }
        if (ZY(resolved.model)) {
          Pt("model_fable_consent", "remote_thin_client_blocked"), onDone("Fable 5 uses usage credits, and this cloud session can’t show the consent prompt yet \xB7 switch models from the workspace, or consent once in a local session first", {
            display: "system"
          });
          return;
        }
        let targetModel = args === "default" ? null : args;
        return remoteSession.sendControlRequest({
          subtype: "set_model",
          model: targetModel ?? void 0
        }).then(() => {
          setAppState(prev => ({
            ...prev,
            mainLoopModel: targetModel,
            mainLoopModelForSession: null
          })), He("model_switch"), onDone(targetModel === null ? "Reset model to the workspace default" : `Set model to ${bt.bold(oP(targetModel))}`);
        }).catch(error => {
          A(`[remote] set_model rejected: ${Ce(error)}`);
          let isTimeout = error instanceof jGt;
          xe("model_switch", isTimeout ? "timeout" : "remote_rejected"), onDone(isTimeout ? `No response from the cloud session — the switch to ${args} may still have been applied` : `Cloud session couldn't switch to ${args}`, {
            display: "system"
          });
        });
      });
      return;
    }
    k8t(args).then(resolved => {
      if (!resolved.ok) {
        onDone(resolved.message, {
          display: "system"
        });
        return;
      }
      if (hAo(resolved.model)) {
        setConsentState({
          model: resolved.model
        });
        return;
      }
      selectModelFn(resolved.model);
    });
  }, effectDeps = [args, onDone, setAppState, selectModelFn], cache[8] = args, cache[9] = onDone, cache[10] = selectModelFn, cache[11] = setAppState, cache[12] = runEffect, cache[13] = effectDeps;else runEffect = cache[12], effectDeps = cache[13];
  if (rSe.useEffect(runEffect, effectDeps), consentState) {
    let {
        model: model
      } = consentState,
      consentElement;
    if (cache[14] !== model || cache[15] !== onDone || cache[16] !== selectModelFn || cache[17] !== sessionStore) consentElement = Bue.jsx(KGt, {
      variant: "picker",
      onDone: (outcome, keptMessage) => {
        if (setConsentState(null), outcome === "consent") {
          selectModelFn(model);
          return;
        }
        onDone(keptMessage ?? `Kept model as ${bt.bold(oP(sessionStore.getState().mainLoopModel))}`, {
          display: "system"
        });
      }
    }), cache[14] = model, cache[15] = onDone, cache[16] = selectModelFn, cache[17] = sessionStore, cache[18] = consentElement;else consentElement = cache[18];
    return consentElement;
  }
  if (confirmState) {
    let onConfirm;
    if (cache[19] !== applyModelFn || cache[20] !== confirmState.model) onConfirm = () => applyModelFn(confirmState.model), cache[19] = applyModelFn, cache[20] = confirmState.model, cache[21] = onConfirm;else onConfirm = cache[21];
    let onCancel;
    if (cache[22] !== onDone || cache[23] !== sessionStore) onCancel = () => onDone(`Kept model as ${bt.bold(oP(sessionStore.getState().mainLoopModel))}`, {
      display: "system"
    }), cache[22] = onDone, cache[23] = sessionStore, cache[24] = onCancel;else onCancel = cache[24];
    let confirmElement;
    if (cache[25] !== confirmState.model || cache[26] !== onConfirm || cache[27] !== onCancel) confirmElement = Bue.jsx($gt, {
      kind: "model",
      model: confirmState.model,
      effort: void 0,
      onConfirm: onConfirm,
      onCancel: onCancel
    }), cache[25] = confirmState.model, cache[26] = onConfirm, cache[27] = onCancel, cache[28] = confirmElement;else confirmElement = cache[28];
    return confirmElement;
  }
  return null;
}

/**
 * Emit a model-deprecation warning notification, if the model is deprecated.
 *
 * @param model - The model to check.
 * @param addNotification - Notification dispatcher.
 */
function v1l(model, addNotification) {
  let warningText = UYn(model);
  if (!warningText) return;
  addNotification({
    key: "model-deprecation-warning",
    kind: "warning",
    text: warningText,
    color: "warning",
    priority: "immediate",
    invalidates: ["model-deprecation-warning"]
  });
}

/**
 * Inline `/model` help/status handler — prints the current model summary.
 */
function CTm(props) {
  let {
      onDone: onDone
    } = props,
    mainLoopModel = _t(vTm),
    sessionModel = _t(RTm),
    effortValue = _t(ATm);
  return onDone(xVn({
    mainLoopModel: mainLoopModel,
    mainLoopModelForSession: sessionModel,
    effortValue: effortValue
  }, bt.bold)), null;
}

/** Selector: read the effort value from app state. */
function ATm(state) {
  return state.effortValue;
}

/** Selector: read the session-scoped model from app state. */
function RTm(state) {
  return state.mainLoopModelForSession;
}

/** Selector: read the main-loop model from app state. */
function vTm(state) {
  return state.mainLoopModel;
}

/** React Compiler runtime (`R1l`), React (`rSe`), and the JSX runtime (`Bue`) — assigned in the lazy initializer below. */
var R1l,
  rSe,
  Bue,
  /**
   * Exported `/model` command entry-point.
   *
   * Routes between inline help, the inline `<name>` setter, and the interactive
   * picker dialog based on the trimmed argument string.
   *
   * @param onDone - Status-message callback.
   * @param session - The active session (provides conversation messages).
   * @param args - Raw argument string for the command.
   */
  call = async (onDone, session, args) => {
    if (args = args?.trim() || "", loe.includes(args)) return W("tengu_model_command_inline_help", {
      args: args
    }), Bue.jsx(CTm, {
      onDone: onDone
    });
    if (i3.includes(args)) {
      onDone("Run /model to open the model selection menu, or /model [modelName] to set the model.", {
        display: "system"
      });
      return;
    }
    if (args) return W("tengu_model_command_inline", {
      args_hash: ep(args),
      args_length: args.length
    }), Bue.jsx(ETm, {
      args: args,
      onDone: onDone
    });
    if (Nu()) {
      onDone("Model picker shows local options in cloud sessions — pass a model name, e.g. /model sonnet", {
        display: "system"
      });
      return;
    }
    return Bue.jsx(bTm, {
      onDone: onDone,
      hasConversationMessages: session.messages.length > 0
    });
  };

/** Lazy initializer — mirrors the original `b(() => { ... })` structure exactly. */
var k1l = b(() => {
  Gc();
  lt();
  oxo();
  sxo();
  UVn();
  Ud();
  fd();
  je();
  Wu();
  FYn();
  mn();
  kt();
  uo();
  qe();
  Cp();
  Ct();
  IA();
  w8t();
  WS();
  YGt();
  Ro();
  gTe();
  R1l = x(tt(), 1), rSe = x(et(), 1), Bue = x(oe(), 1);
});

export {w1l,bTm,ETm,v1l,CTm,ATm,RTm,vTm,R1l,rSe,Bue,call as wTm,k1l};

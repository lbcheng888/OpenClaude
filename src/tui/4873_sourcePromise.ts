// @ts-nocheck
import {_g,zR} from "../../vendor/m2562.ts";
import {wjn,vjn,WPe,OWe} from "../permissions/4872_plan.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {pgt,Rjn} from "../telemetry/4866_cloneViable.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {saveGlobalConfig as hn,getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Ultraplan launch dialog (Claude Code on the web).
 *
 * Renders the "Run ultraplan in the cloud?" confirmation dialog, optionally
 * showing terms-of-use copy on first run, and emits telemetry on the user's
 * choice. When the user opts to run while the REPL bridge (Remote Control) is
 * connected, it disconnects the bridge for the session.
 *
 * The `t = cIo.c(N)` arrays are React compiler (forget) memoization caches.
 */

/** Picks the upload/clone notice line shown beneath the dialog body. */
function uIo(uploadPlan) {
  if (!uploadPlan.bundleSeedEnabled) return null;
  return uploadPlan.cloneViable ? "This will try to clone your git remote and fall back to uploading this repository." : "This will upload your repository to Claude Code on the web.";
}

/** Top-level ultraplan launch dialog component. */
function tIl(props) {
  let cache = cIo.c(24),
    {
      sourcePromise,
      onChoice
    } = props;
  _g("ultraplan-launch");
  let [showTerms] = GPe.useState(pmm),
    [promptIdentifier] = GPe.useState(dmm),
    copy;
  if (cache[0] !== promptIdentifier) copy = wjn(promptIdentifier), cache[0] = promptIdentifier, cache[1] = copy;else copy = cache[1];
  let resolvedCopy = copy,
    replBridgeEnabled = _t(umm),
    updateConfig = bo(),
    makeSourcePromise;
  if (cache[2] !== sourcePromise || cache[3] !== showTerms) makeSourcePromise = () => showTerms ? sourcePromise ?? pgt().catch(cmm) : null, cache[2] = sourcePromise, cache[3] = showTerms, cache[4] = makeSourcePromise;else makeSourcePromise = cache[4];
  let [lazySourcePromise] = GPe.useState(makeSourcePromise),
    handleChoice;
  if (cache[5] !== onChoice || cache[6] !== promptIdentifier || cache[7] !== replBridgeEnabled || cache[8] !== updateConfig || cache[9] !== showTerms) handleChoice = function (choice) {
    let disconnectedBridge = choice === "run" && replBridgeEnabled;
    if (W("tengu_ultraplan_dialog_choice", {
      choice: Le(choice),
      first_run: showTerms,
      bridge_disconnected: disconnectedBridge,
      prompt_identifier: Le(promptIdentifier)
    }), disconnectedBridge) updateConfig(lmm);
    if (choice !== "cancel" && showTerms) W("tengu_ultraplan_first_launch", {
      prompt_identifier: Le(promptIdentifier)
    }), hn(amm);
    onChoice(choice, {
      disconnectedBridge: disconnectedBridge,
      promptIdentifier: promptIdentifier
    });
  }, cache[5] = onChoice, cache[6] = promptIdentifier, cache[7] = replBridgeEnabled, cache[8] = updateConfig, cache[9] = showTerms, cache[10] = handleChoice;else handleChoice = cache[10];
  let onChoiceMemo = handleChoice,
    onCancel;
  if (cache[11] !== onChoiceMemo) onCancel = () => onChoiceMemo("cancel"), cache[11] = onChoiceMemo, cache[12] = onCancel;else onCancel = cache[12];
  let loadingNode;
  if (cache[13] === Symbol.for("react.memo_cache_sentinel")) loadingNode = Kw.jsx(v, {
    dimColor: !0,
    children: "Loading…"
  }), cache[13] = loadingNode;else loadingNode = cache[13];
  let suspenseNode;
  if (cache[14] !== resolvedCopy || cache[15] !== onChoiceMemo || cache[16] !== replBridgeEnabled || cache[17] !== showTerms || cache[18] !== lazySourcePromise) suspenseNode = Kw.jsx(GPe.Suspense, {
    fallback: loadingNode,
    children: Kw.jsx(mmm, {
      showTerms: showTerms,
      sourcePromise: lazySourcePromise,
      copy: resolvedCopy,
      replBridgeEnabled: replBridgeEnabled,
      onChoice: onChoiceMemo
    })
  }), cache[14] = resolvedCopy, cache[15] = onChoiceMemo, cache[16] = replBridgeEnabled, cache[17] = showTerms, cache[18] = lazySourcePromise, cache[19] = suspenseNode;else suspenseNode = cache[19];
  let dialogNode;
  if (cache[20] !== resolvedCopy.timeEstimate || cache[21] !== onCancel || cache[22] !== suspenseNode) dialogNode = Kw.jsx(Jn, {
    title: "Run ultraplan in the cloud?",
    subtitle: resolvedCopy.timeEstimate,
    onCancel: onCancel,
    children: suspenseNode
  }), cache[20] = resolvedCopy.timeEstimate, cache[21] = onCancel, cache[22] = suspenseNode, cache[23] = dialogNode;else dialogNode = cache[23];
  return dialogNode;
}

/** Marks the ultraplan terms as seen in global config. */
function amm(config) {
  return config.hasSeenUltraplanTerms ? config : {
    ...config,
    hasSeenUltraplanTerms: !0
  };
}

/** Disables the REPL bridge (Remote Control) for this session. */
function lmm(config) {
  if (!config.replBridgeEnabled) return config;
  return {
    ...config,
    replBridgeEnabled: !1,
    replBridgeExplicit: !1,
    replBridgeOutboundOnly: !1
  };
}

/** Fallback for a failed source promise. */
function cmm() {
  return null;
}

function umm(config) {
  return config.replBridgeEnabled;
}

function dmm() {
  return vjn();
}

function pmm() {
  return !Ot().hasSeenUltraplanTerms;
}

/** Inner dialog content: terms/launch copy plus the run/cancel selector. */
function mmm(props) {
  let cache = cIo.c(22),
    {
      showTerms,
      sourcePromise,
      copy,
      replBridgeEnabled,
      onChoice
    } = props,
    source = sourcePromise ? GPe.use(sourcePromise) : null,
    uploadNotice;
  if (cache[0] !== source) uploadNotice = source && uIo(source), cache[0] = source, cache[1] = uploadNotice;else uploadNotice = cache[1];
  let noticeLine = uploadNotice,
    bodyNode;
  if (cache[2] !== copy.dialogBody || cache[3] !== copy.dialogPipeline || cache[4] !== replBridgeEnabled || cache[5] !== showTerms || cache[6] !== noticeLine) bodyNode = showTerms ? Kw.jsxs(Kw.Fragment, {
    children: [Kw.jsx(v, {
      dimColor: !0,
      children: copy.dialogBody
    }), Kw.jsxs($, {
      flexDirection: "column",
      children: [noticeLine && Kw.jsx(v, {
        dimColor: !0,
        children: noticeLine
      }), Kw.jsxs(v, {
        dimColor: !0,
        children: ["More information: ", Kw.jsx(Ss, {
          url: WPe,
          children: WPe
        })]
      })]
    }), Kw.jsx(v, {
      children: "Proceed?"
    })]
  }) : Kw.jsxs(Kw.Fragment, {
    children: [Kw.jsxs($, {
      flexDirection: "column",
      children: [Kw.jsx(v, {
        dimColor: !0,
        children: copy.dialogBody
      }), replBridgeEnabled && Kw.jsx(v, {
        dimColor: !0,
        children: "This will disable Remote Control for this session."
      })]
    }), !replBridgeEnabled && Kw.jsx(v, {
      dimColor: !0,
      children: copy.dialogPipeline
    })]
  }), cache[2] = copy.dialogBody, cache[3] = copy.dialogPipeline, cache[4] = replBridgeEnabled, cache[5] = showTerms, cache[6] = noticeLine, cache[7] = bodyNode;else bodyNode = cache[7];
  let runLabel = showTerms ? "Yes" : "Run ultraplan",
    runDescription = replBridgeEnabled ? "Disable remote control and launch in Claude Code on the web" : "launch in Claude Code on the web",
    runOption;
  if (cache[8] !== runLabel || cache[9] !== runDescription) runOption = {
    label: runLabel,
    value: "run",
    description: runDescription
  }, cache[8] = runLabel, cache[9] = runDescription, cache[10] = runOption;else runOption = cache[10];
  let cancelLabel = showTerms ? "No" : "Not now",
    cancelOption;
  if (cache[11] !== cancelLabel) cancelOption = {
    label: cancelLabel,
    value: "cancel"
  }, cache[11] = cancelLabel, cache[12] = cancelOption;else cancelOption = cache[12];
  let options;
  if (cache[13] !== runOption || cache[14] !== cancelOption) options = [runOption, cancelOption], cache[13] = runOption, cache[14] = cancelOption, cache[15] = options;else options = cache[15];
  let selectNode;
  if (cache[16] !== onChoice || cache[17] !== options) selectNode = Kw.jsx(hr, {
    options: options,
    onChange: onChoice
  }), cache[16] = onChoice, cache[17] = options, cache[18] = selectNode;else selectNode = cache[18];
  let containerNode;
  if (cache[19] !== bodyNode || cache[20] !== selectNode) containerNode = Kw.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [bodyNode, selectNode]
  }), cache[19] = bodyNode, cache[20] = selectNode, cache[21] = containerNode;else containerNode = cache[21];
  return containerNode;
}
var cIo, GPe, Kw;
var dIo = b(() => {
  OWe();
  zR();
  je();
  kt();
  uo();
  Rjn();
  tr();
  Ol();
  di();
  cIo = x(tt(), 1), GPe = x(et(), 1), Kw = x(oe(), 1);
});

export {uIo,tIl,amm,lmm,cmm,umm,dmm,pmm,mmm,cIo,GPe,Kw,dIo};

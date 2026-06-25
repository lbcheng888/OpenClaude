// @ts-nocheck
import {x1l,D1l} from "../../vendor/m5061.ts";
import {mo,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {f_e,MOn} from "../core/3336_environment_id.ts";
import {ao,br} from "../config/0745_updateSettingsForSource.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {d3,wm} from "../../vendor/m707.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {lr} from "../../vendor/m233.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Remote environment selector TUI.
 *
 * Fetches the list of available remote environments, lets the user pick one,
 * persists the choice to local settings, and reports the result back via the
 * provided `onDone` callback.
 *
 * Note: the v2.1.185 readable port-from for this slot was an unrelated module
 * (the Claude Desktop launch flow), so local names below are derived directly
 * from the v190 structure rather than ported.
 */

/**
 * Top-level component: loads remote environments and renders the selector
 * (or loading / error / empty states).
 *
 * @param props.onDone - called with an optional status message once the user
 *   selects an environment, cancels, or an error occurs.
 */
function M1l(props) {
  let cache = fxo.c(28),
    {
      onDone
    } = props,
    [loadingState, setLoadingState] = oSe.useState("loading"),
    initialTargets;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) initialTargets = [], cache[0] = initialTargets;else initialTargets = cache[0];
  let [targets, setTargets] = oSe.useState(initialTargets),
    [selectedTarget, setSelectedTarget] = oSe.useState(null),
    [selectedTargetSource, setSelectedTargetSource] = oSe.useState(null),
    [environmentsError, setEnvironmentsError] = oSe.useState(null),
    [fetchError, setFetchError] = oSe.useState(null),
    runFetchEffect,
    fetchEffectDeps;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) runFetchEffect = () => {
    let cancelled = !1;
    return async function () {
      try {
        let result = await x1l();
        if (cancelled) return;
        setTargets(result.availableTargets), setSelectedTarget(result.selectedTarget), setSelectedTargetSource(result.selectedTargetSource), setEnvironmentsError(result.environmentsError), setLoadingState(null);
      } catch (caught) {
        let err = caught;
        if (cancelled) return;
        let normalized = mo(err);
        A(`Failed to fetch remote environments: ${normalized.message}`, {
          level: "error"
        }), setFetchError(normalized.message), setLoadingState(null);
      }
    }(), () => {
      cancelled = !0;
    };
  }, fetchEffectDeps = [], cache[1] = runFetchEffect, cache[2] = fetchEffectDeps;else runFetchEffect = cache[1], fetchEffectDeps = cache[2];
  oSe.useEffect(runFetchEffect, fetchEffectDeps);
  let handleSelect;
  if (cache[3] !== onDone || cache[4] !== targets) handleSelect = function (selectedId) {
    if (selectedId === "cancel") {
      onDone();
      return;
    }
    setLoadingState("updating");
    let target = targets.find(t => f_e(t) === selectedId);
    if (!target) {
      onDone("Error: Selected environment not found");
      return;
    }
    ao("localSettings", {
      remote: {
        defaultEnvironmentId: f_e(target)
      }
    }), onDone(`Set default ${"remote environment"} to ${bt.bold(target.name)} (${f_e(target)})`);
  }, cache[3] = onDone, cache[4] = targets, cache[5] = handleSelect;else handleSelect = cache[5];
  let onSelect = handleSelect;
  if (loadingState === "loading") {
    let spinner;
    if (cache[6] === Symbol.for("react.memo_cache_sentinel")) spinner = Yw.jsx(Hc, {
      message: "Loading environments…"
    }), cache[6] = spinner;else spinner = cache[6];
    let loadingView;
    if (cache[7] !== onDone) loadingView = Yw.jsx(Jn, {
      title: $Yn,
      onCancel: onDone,
      hideInputGuide: !0,
      children: spinner
    }), cache[7] = onDone, cache[8] = loadingView;else loadingView = cache[8];
    return loadingView;
  }
  if (fetchError) {
    let errorText;
    if (cache[9] !== fetchError) errorText = Yw.jsxs(v, {
      color: "error",
      children: ["Error: ", fetchError]
    }), cache[9] = fetchError, cache[10] = errorText;else errorText = cache[10];
    let errorView;
    if (cache[11] !== onDone || cache[12] !== errorText) errorView = Yw.jsx(Jn, {
      title: $Yn,
      onCancel: onDone,
      children: errorText
    }), cache[11] = onDone, cache[12] = errorText, cache[13] = errorView;else errorView = cache[13];
    return errorView;
  }
  if (!selectedTarget) {
    let emptyText;
    if (cache[14] === Symbol.for("react.memo_cache_sentinel")) emptyText = Yw.jsx(v, {
      children: "No remote environments available."
    }), cache[14] = emptyText;else emptyText = cache[14];
    let environmentsErrorNote;
    if (cache[15] !== environmentsError) environmentsErrorNote = environmentsError && Yw.jsxs(v, {
      dimColor: !0,
      children: ["(couldn't list environments: ", environmentsError, ")"]
    }), cache[15] = environmentsError, cache[16] = environmentsErrorNote;else environmentsErrorNote = cache[16];
    let emptyView;
    if (cache[17] !== onDone || cache[18] !== environmentsErrorNote) emptyView = Yw.jsxs(Jn, {
      title: $Yn,
      subtitle: L1l,
      onCancel: onDone,
      children: [emptyText, environmentsErrorNote]
    }), cache[17] = onDone, cache[18] = environmentsErrorNote, cache[19] = emptyView;else emptyView = cache[19];
    return emptyView;
  }
  let selectorView;
  if (cache[20] !== environmentsError || cache[21] !== onSelect || cache[22] !== loadingState || cache[23] !== onDone || cache[24] !== selectedTarget || cache[25] !== selectedTargetSource || cache[26] !== targets) selectorView = Yw.jsx(kTm, {
    targets: targets,
    selectedTarget: selectedTarget,
    selectedTargetSource: selectedTargetSource,
    environmentsError: environmentsError,
    loadingState: loadingState,
    onSelect: onSelect,
    onCancel: onDone
  }), cache[20] = environmentsError, cache[21] = onSelect, cache[22] = loadingState, cache[23] = onDone, cache[24] = selectedTarget, cache[25] = selectedTargetSource, cache[26] = targets, cache[27] = selectorView;else selectorView = cache[27];
  return selectorView;
}

/**
 * Maps a remote environment target into a select-list option:
 * `{ label, value }` where the label shows the name plus a dimmed id.
 */
function P1l(target) {
  let id = f_e(target),
    suffix = "";
  return {
    label: Yw.jsxs(v, {
      children: [target.name, " ", Yw.jsxs(v, {
        dimColor: !0,
        children: ["(", id, "", ")"]
      })]
    }),
    value: id
  };
}

/**
 * Inner selector component: renders the "currently using" header, the list of
 * selectable environments, and the key-hint footer.
 */
function kTm(props) {
  let cache = fxo.c(24),
    {
      targets,
      selectedTarget,
      selectedTargetSource,
      environmentsError,
      loadingState,
      onSelect,
      onCancel
    } = props,
    sourceSuffix;
  if (cache[0] !== selectedTargetSource) sourceSuffix = selectedTargetSource && selectedTargetSource !== "localSettings" ? ` (from ${d3(selectedTargetSource)} settings)` : "", cache[0] = selectedTargetSource, cache[1] = sourceSuffix;else sourceSuffix = cache[1];
  let sourceLabel = sourceSuffix,
    currentUsingHeader;
  if (cache[2] !== selectedTarget || cache[3] !== selectedTargetSource || cache[4] !== sourceLabel) currentUsingHeader = selectedTargetSource ? Yw.jsxs(v, {
    children: ["Currently using: ", Yw.jsx(v, {
      bold: !0,
      children: selectedTarget.name
    }), sourceLabel]
  }) : void 0, cache[2] = selectedTarget, cache[3] = selectedTargetSource, cache[4] = sourceLabel, cache[5] = currentUsingHeader;else currentUsingHeader = cache[5];
  let header = currentUsingHeader,
    primaryTargets,
    options;
  if (cache[6] !== targets) {
    primaryTargets = targets.filter(HTm);
    let otherTargets = targets.filter(MOn);
    options = [...primaryTargets.map(P1l), ...[], ...otherTargets.map(P1l)], cache[6] = targets, cache[7] = primaryTargets, cache[8] = options;
  } else primaryTargets = cache[7], options = cache[8];
  let selectOptions = options,
    docsHint;
  if (cache[9] === Symbol.for("react.memo_cache_sentinel")) docsHint = Yw.jsx(v, {
    dimColor: !0,
    children: L1l
  }), cache[9] = docsHint;else docsHint = cache[9];
  let environmentsErrorNote;
  if (cache[10] !== environmentsError || cache[11] !== primaryTargets) environmentsErrorNote = environmentsError && primaryTargets.length === 0 && Yw.jsxs(v, {
    dimColor: !0,
    children: ["(couldn't list environments: ", environmentsError, ")"]
  }), cache[10] = environmentsError, cache[11] = primaryTargets, cache[12] = environmentsErrorNote;else environmentsErrorNote = cache[12];
  let selectControl;
  if (cache[13] !== loadingState || cache[14] !== onSelect || cache[15] !== selectOptions || cache[16] !== selectedTarget) selectControl = loadingState === "updating" ? Yw.jsx(Hc, {
    message: "Updating…"
  }) : Yw.jsx(hr, {
    options: selectOptions,
    defaultValue: f_e(selectedTarget),
    onChange: onSelect,
    onCancel: () => onSelect("cancel"),
    layout: "compact-vertical"
  }), cache[13] = loadingState, cache[14] = onSelect, cache[15] = selectOptions, cache[16] = selectedTarget, cache[17] = selectControl;else selectControl = cache[17];
  let keyHintFooter;
  if (cache[18] === Symbol.for("react.memo_cache_sentinel")) keyHintFooter = Yw.jsx(v, {
    dimColor: !0,
    children: Yw.jsxs(bn, {
      children: [Yw.jsx(at, {
        chord: "enter",
        action: "select"
      }), Yw.jsx(dr, {
        action: "confirm:no",
        context: "Confirmation",
        fallback: "Esc",
        description: "cancel"
      })]
    })
  }), cache[18] = keyHintFooter;else keyHintFooter = cache[18];
  let selectorView;
  if (cache[19] !== onCancel || cache[20] !== header || cache[21] !== environmentsErrorNote || cache[22] !== selectControl) selectorView = Yw.jsxs(Jn, {
    title: $Yn,
    subtitle: header,
    onCancel: onCancel,
    hideInputGuide: !0,
    children: [docsHint, environmentsErrorNote, selectControl, keyHintFooter]
  }), cache[19] = onCancel, cache[20] = header, cache[21] = environmentsErrorNote, cache[22] = selectControl, cache[23] = selectorView;else selectorView = cache[23];
  return selectorView;
}

/** Predicate: a target is "primary" when it is not an `MOn` (other) target. */
function HTm(target) {
  return !MOn(target);
}
var fxo,
  oSe,
  Yw,
  $Yn = "Select remote environment",
  L1l = "Configure environments at: https://claude.ai/code";
var N1l = b(() => {
  Gc();
  je();
  qe();
  Ct();
  wm();
  br();
  lr();
  D1l();
  uc();
  Ol();
  Is();
  di();
  Wo();
  OE();
  fxo = x(tt(), 1), oSe = x(et(), 1), Yw = x(oe(), 1);
});
export {M1l,P1l,kTm,HTm,fxo,oSe,Yw,$Yn,L1l,N1l};

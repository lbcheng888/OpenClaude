// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {ao,br} from "../config/0745_updateSettingsForSource.ts";
import {normalizeModelStringForAPI as Pp,parseUserSpecifiedModel as Qo,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {v$n,Mut,U0e,Yqe,$0e,yte} from "../config/3910_claude_haiku_4_5.ts";
import {oP,gTe} from "../../vendor/m4528.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {FE,V1} from "../../vendor/m4006.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {Sx,fne} from "../../vendor/m4618.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {L3t,t3n} from "../../vendor/m4009.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var RMl = {};
ft(RMl, {
  call: () => call
});

/**
 * Apply an advisor command.
 * @param advisorArg the raw advisor model argument ("off" disables, otherwise a model id/alias)
 * @param mainModel the current main loop model id
 * @param setAppState state setter used to persist the advisor model selection
 * @returns a human-readable status message
 */
function AMl(advisorArg: string, mainModel: string, setAppState: (updater: (state: any) => any) => void): string {
  if (W("tengu_advisor_command", {
    advisor: advisorArg
  }), advisorArg === "off") return setAppState(state => state.advisorModel === void 0 ? state : {
    ...state,
    advisorModel: void 0
  }), ao("userSettings", {
    advisorModel: void 0
  }), "Advisor disabled";
  let resolvedModel = Pp(advisorArg);
  if (!v$n(resolvedModel)) {
    let validOptions = [...Mut(), "off"].join(", ");
    return `${oP(resolvedModel)} cannot be used as an advisor. Valid options: ${validOptions}`;
  }
  setAppState(state => state.advisorModel === resolvedModel ? state : {
    ...state,
    advisorModel: resolvedModel
  }), ao("userSettings", {
    advisorModel: resolvedModel
  });
  let advisorLabel = oP(resolvedModel),
    mainModelLabel = oP(mainModel),
    message = `Advisor set to ${advisorLabel}`;
  if (!U0e(mainModel)) message += `
Note: the current main model (${mainModelLabel}) does not support the advisor. It will activate when you switch to a supported main model.`;else if (!Yqe(mainModel, resolvedModel)) message += `
Note: ${advisorLabel} is less capable than the current main model (${mainModelLabel}), so the advisor will not activate. Choose a more capable advisor, or switch to a smaller main model.`;
  return message;
}

/**
 * Interactive Advisor picker dialog (React component, compiled with React Forget memo cache).
 */
function Sym(props: { onDone: (message: string | undefined, opts?: { display: string }) => void }) {
  let cache = CMl.c(32),
    {
      onDone
    } = props,
    currentAdvisorModel = _t(Cym),
    mainModel = FE(),
    setAppState = bo(),
    currentOption: { label: string; value: string } | undefined,
    matchedAlias: string | undefined,
    options: Array<{ label: string; value: string }>;
  if (cache[0] !== currentAdvisorModel) {
    let advisorModels = Mut();
    matchedAlias = currentAdvisorModel ? Aym(currentAdvisorModel, advisorModels) : void 0, currentOption = currentAdvisorModel && !matchedAlias && v$n(currentAdvisorModel) ? {
      label: oP(currentAdvisorModel),
      value: currentAdvisorModel
    } : void 0;
    let extraOptions;
    if (cache[4] !== currentOption) extraOptions = currentOption ? [currentOption] : [], cache[4] = currentOption, cache[5] = extraOptions;else extraOptions = cache[5];
    let offOption;
    if (cache[6] === Symbol.for("react.memo_cache_sentinel")) offOption = {
      label: "No advisor",
      value: "off"
    }, cache[6] = offOption;else offOption = cache[6];
    options = [...advisorModels.map(Eym), ...extraOptions, offOption], cache[0] = currentAdvisorModel, cache[1] = currentOption, cache[2] = matchedAlias, cache[3] = options;
  } else currentOption = cache[1], matchedAlias = cache[2], options = cache[3];
  let pickerOptions = options,
    defaultValue = currentOption ? currentOption.value : matchedAlias ?? "off",
    mountEffectDeps;
  if (cache[7] === Symbol.for("react.memo_cache_sentinel")) mountEffectDeps = [], cache[7] = mountEffectDeps;else mountEffectDeps = cache[7];
  Mgt.useEffect(bym, mountEffectDeps);
  let handleCancel;
  if (cache[8] !== onDone) handleCancel = () => onDone(void 0, {
    display: "skip"
  }), cache[8] = onDone, cache[9] = handleCancel;else handleCancel = cache[9];
  let descriptionText;
  if (cache[10] === Symbol.for("react.memo_cache_sentinel")) descriptionText = D6.jsx(v, {
    children: "When Claude needs stronger judgment — a complex decision, an ambiguous failure, a problem it's circling without progress — it escalates to the advisor model for guidance, then resumes. The advisor runs server-side and uses additional tokens."
  }), cache[10] = descriptionText;else descriptionText = cache[10];
  let unsupportedWarning;
  if (cache[11] !== mainModel) unsupportedWarning = !U0e(mainModel) && D6.jsxs(v, {
    color: "warning",
    children: ["The current main model (", oP(mainModel), ") does not support the advisor."]
  }), cache[11] = mainModel, cache[12] = unsupportedWarning;else unsupportedWarning = cache[12];
  let handleChange;
  if (cache[13] !== mainModel || cache[14] !== onDone || cache[15] !== setAppState) handleChange = (selectedValue: string) => onDone(AMl(selectedValue, mainModel, setAppState)), cache[13] = mainModel, cache[14] = onDone, cache[15] = setAppState, cache[16] = handleChange;else handleChange = cache[16];
  let handlePickerCancel;
  if (cache[17] !== onDone) handlePickerCancel = () => onDone(void 0, {
    display: "skip"
  }), cache[17] = onDone, cache[18] = handlePickerCancel;else handlePickerCancel = cache[18];
  let picker;
  if (cache[19] !== defaultValue || cache[20] !== pickerOptions || cache[21] !== handleChange || cache[22] !== handlePickerCancel) picker = D6.jsx(hr, {
    options: pickerOptions,
    defaultValue: defaultValue,
    defaultFocusValue: defaultValue,
    onChange: handleChange,
    onCancel: handlePickerCancel
  }), cache[19] = defaultValue, cache[20] = pickerOptions, cache[21] = handleChange, cache[22] = handlePickerCancel, cache[23] = picker;else picker = cache[23];
  let docsLink, recommendedSetup;
  if (cache[24] === Symbol.for("react.memo_cache_sentinel")) recommendedSetup = D6.jsxs(v, {
    children: [D6.jsx(v, {
      color: "suggestion",
      children: "Recommended setup: "
    }), D6.jsx(v, {
      children: "Sonnet as the main model with Opus as the advisor. For certain workloads this gives near-Opus performance with reduced token usage."
    })]
  }), docsLink = D6.jsx(Sx, {
    url: Tym
  }), cache[24] = docsLink, cache[25] = recommendedSetup;else docsLink = cache[24], recommendedSetup = cache[25];
  let body;
  if (cache[26] !== unsupportedWarning || cache[27] !== picker) body = D6.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [descriptionText, unsupportedWarning, picker, recommendedSetup, docsLink]
  }), cache[26] = unsupportedWarning, cache[27] = picker, cache[28] = body;else body = cache[28];
  let dialog;
  if (cache[29] !== body || cache[30] !== handleCancel) dialog = D6.jsx(Jn, {
    title: "Advisor (experimental)",
    onCancel: handleCancel,
    children: body
  }), cache[29] = body, cache[30] = handleCancel, cache[31] = dialog;else dialog = cache[31];
  return dialog;
}

/** Telemetry: advisor dialog shown. */
function bym(): void {
  W("tengu_advisor_dialog_shown", {});
}

/** Map an advisor model id to a picker option. */
function Eym(modelId: string): { label: string; value: string } {
  return {
    label: oP(modelId),
    value: modelId
  };
}

/** Selector: read the configured advisor model from app state. */
function Cym(state: any) {
  return state.advisorModel;
}

/** Find a known advisor alias contained in the given model id (case-insensitive). */
function Aym(modelId: string, aliases: string[]): string | undefined {
  let lowerModelId = modelId.toLowerCase();
  return aliases.find(alias => lowerModelId.includes(alias));
}

/**
 * Headless applier: runs AMl once on mount (deferred via setTimeout) for a pre-chosen value,
 * then renders nothing.
 */
function EMl({
  choice,
  onDone
}: {
  choice: string;
  onDone: (message: string) => void;
}) {
  let setAppState = bo(),
    mainModel = FE(),
    mainModelRef = Mgt.useRef(mainModel);
  mainModelRef.current = mainModel;
  let hasRun = Mgt.useRef(!1);
  return Mgt.useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = !0;
    let timer = setTimeout((done, value, modelRef, setState) => {
      done(AMl(value, modelRef.current, setState));
    }, 0, onDone, choice, mainModelRef, setAppState);
    return () => clearTimeout(timer);
  }, [choice, setAppState, onDone]), null;
}

var CMl,
  Mgt,
  D6,
  Tym = "https://claude.com/blog/the-advisor-strategy",
  call = async (onDone: (message: string | undefined, opts?: { display: string }) => void, ctx: unknown, rawArg: string) => {
    let normalizedArg = rawArg.trim().toLowerCase();
    if (!normalizedArg) return D6.jsx(Sym, {
      onDone: onDone
    });
    if (normalizedArg === "off" || normalizedArg === "unset") return D6.jsx(EMl, {
      choice: "off",
      onDone: onDone
    });
    let canonicalModel = Qo(normalizedArg),
      validation = await L3t(canonicalModel);
    if (!validation.valid) return onDone(`Invalid advisor model: ${validation.error}`), null;
    if (!$0e(canonicalModel)) return onDone(`${normalizedArg} cannot be used as an advisor. Valid options: ${[...Mut(), "off"].join(", ")}`), null;
    return D6.jsx(EMl, {
      choice: normalizedArg,
      onDone: onDone
    });
  };

var vMl = b(() => {
  Ol();
  di();
  fne();
  V1();
  je();
  kt();
  uo();
  yte();
  Ro();
  t3n();
  br();
  gTe();
  CMl = x(tt(), 1), Mgt = x(et(), 1), D6 = x(oe(), 1);
});

export {RMl,AMl,Sym,bym,Eym,Cym,Aym,EMl,CMl,Mgt,D6,Tym,call as Rym,vMl};

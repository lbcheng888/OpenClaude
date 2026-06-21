// @ts-nocheck
import {bo as vo,mt as ft,configProtoStore as fo} from "../../vendor/m2458.ts";
import {useTheme as ga} from "../../vendor/m2274.ts";
import {Mfe as _fe,Lw as Dw,vFe as tFe,yve as rve,x4 as A4,xFe as oFe,m$ as n$,TAi as pfi,Tve as ove,qHt as AHt,oyn as __n,Om as Um} from "../config/2215_level.ts";
import {fOt as GPt,O2e as p2e} from "../config/2733_value.ts";
import {modelDisplayString as J3,getDefaultMainLoopModel as Bg,parseUserSpecifiedModel as gs,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {wil as Fol,Ril as Uol} from "../../vendor/m4523.ts";
import {No as Uo} from "../../vendor/m2421.ts";
import {Wze as vze,gme as Qpe} from "../config/1280_BedrockClient.ts";
import {Wo,Ts as _s} from "../../vendor/m2542.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnumOpt as us} from "../../vendor/m5.ts";
import {getSettingsForSource as Cn,updateSettingsForSource as ao,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {pr as Ar} from "../../vendor/m2562.ts";
import {initModule as cL,Oz as yz} from "../../vendor/m2799.ts";
import {U$e as g$e,pHn as xkn} from "../../vendor/m3172.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {uc as cc,l4 as z3,dk as ak,Goe as Ooe,tE as Qb} from "../api/1448_month.ts";
import {Uy as By,zq as Lq} from "../../vendor/m3339.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {lr as ur,readRoster as Ec} from "../../vendor/m2547.ts";
import {Wu as Ku,lS as tS} from "../../vendor/m2571.ts";
import {nnn as ftn,sl as rl} from "../../vendor/m715.ts";
import {Byo as S_o,Fyo as b_o} from "../../vendor/m4524.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {yb as hb} from "../../vendor/m4521.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function ModelPicker(props) {
  let $cache = A$q.c(101),
    {
      initial: initial,
      sessionModel: sessionModel,
      onSelect: onSelect,
      onSetDefault: onSetDefault,
      onCancel: onCancel,
      isStandaloneCommand: isStandaloneCommand,
      showFastModeNotice: showFastModeNotice,
      headerText: headerText,
      skipSettingsWrite: skipSettingsWrite
    } = props,
    updateModelState = vo(),
    resolvedInitial = initial === null ? Lm_ : initial,
    [selectedValue, setSelectedValue] = URH.useState(resolvedInitial),
    fastModeEnabled = ft(YxO),
    [themeName] = ga(),
    [effortAdjusted, setEffortAdjusted] = URH.useState(false),
    storedEffortValue = ft($xO),
    storedUltracode = ft(zxO),
    initialEffort;
  if ($cache[0] !== storedEffortValue || $cache[1] !== storedUltracode) initialEffort = storedUltracode ? "ultracode" : storedEffortValue !== undefined ? _fe(storedEffortValue) : undefined, $cache[0] = storedEffortValue, $cache[1] = storedUltracode, $cache[2] = initialEffort;else initialEffort = $cache[2];
  let [currentEffort, setCurrentEffort] = URH.useState(initialEffort),
    isFastMode = fastModeEnabled ?? false,
    baseOptionsForFastMode;
  if ($cache[3] !== isFastMode) baseOptionsForFastMode = GPt(isFastMode), $cache[3] = isFastMode, $cache[4] = baseOptionsForFastMode;else baseOptionsForFastMode = $cache[4];
  let baseOptions = baseOptionsForFastMode,
    optionsWithInitial;
  if ($cache[5] !== initial || $cache[6] !== baseOptions) {
    e: {
      if (initial !== null && !baseOptions.some(opt => opt.value === initial)) {
        let currentOption = {
            value: initial,
            label: J3(initial),
            description: "Current model"
          },
          firstDisabledIndex = baseOptions.findIndex(TxO);
        if (firstDisabledIndex === -1) {
          optionsWithInitial = [...baseOptions, currentOption];
          break e;
        }
        optionsWithInitial = [...baseOptions.slice(0, firstDisabledIndex), currentOption, ...baseOptions.slice(firstDisabledIndex)];
        break e;
      }
      optionsWithInitial = baseOptions;
    }
    $cache[5] = initial, $cache[6] = baseOptions, $cache[7] = optionsWithInitial;
  } else optionsWithInitial = $cache[7];
  let resolvedOptions = optionsWithInitial,
    localizedOptions;
  if ($cache[8] !== resolvedOptions || $cache[9] !== themeName) {
    let localizeOption;
    if ($cache[11] !== themeName) localizeOption = jn => {
      let Ur = jn.value === null ? Lm_ : jn.value,
        zr = cp6(Ur),
        ye = zr ? Fol(zr) : undefined,
        Me = ((ye ? jn.description ? `${jn.description} \xB7 ${ye}` : ye : jn.description) ?? "").replaceAll("Fable 5", Uo("claude", themeName)("Fable 5")).replaceAll("Mythos 5", Uo("claude", themeName)("Mythos 5"));
      return {
        ...jn,
        value: Ur,
        description: Me
      };
    }, $cache[11] = themeName, $cache[12] = localizeOption;else localizeOption = $cache[12];
    localizedOptions = resolvedOptions.map(localizeOption), $cache[8] = resolvedOptions, $cache[9] = themeName, $cache[10] = localizedOptions;
  } else localizedOptions = $cache[10];
  let options = localizedOptions,
    focusValue;
  if ($cache[13] !== resolvedInitial || $cache[14] !== options) focusValue = options.some(Qn => Qn.value === resolvedInitial) ? resolvedInitial : options[0]?.value ?? undefined, $cache[13] = resolvedInitial, $cache[14] = options, $cache[15] = focusValue;else focusValue = $cache[15];
  let defaultFocusValue = focusValue,
    visibleCount = Math.min(10, options.length),
    hiddenCount = Math.max(0, options.length - visibleCount),
    selectedOptionLookup;
  if ($cache[16] !== selectedValue || $cache[17] !== options) {
    let matchSelected;
    if ($cache[19] !== selectedValue) matchSelected = jn => jn.value === selectedValue, $cache[19] = selectedValue, $cache[20] = matchSelected;else matchSelected = $cache[20];
    selectedOptionLookup = options.find(matchSelected), $cache[16] = selectedValue, $cache[17] = options, $cache[18] = selectedOptionLookup;
  } else selectedOptionLookup = $cache[18];
  let selectedOption = selectedOptionLookup,
    selectedLabel = selectedOption?.label,
    selectedDisabled = selectedOption?.disabled === true,
    selectedModelLookup;
  if ($cache[21] !== selectedValue) selectedModelLookup = cp6(selectedValue), $cache[21] = selectedValue, $cache[22] = selectedModelLookup;else selectedModelLookup = $cache[22];
  let selectedModelId = selectedModelLookup,
    [, forceRerender] = URH.useReducer(OxO, 0),
    inferenceProfileEffect;
  if ($cache[23] !== forceRerender || $cache[24] !== selectedModelId) inferenceProfileEffect = () => {
    if (!selectedModelId?.includes("application-inference-profile")) return;
    let Qn = false;
    return vze(selectedModelId).then(() => {
      if (!Qn) forceRerender();
    }), () => {
      Qn = true;
    };
  }, $cache[23] = forceRerender, $cache[24] = selectedModelId, $cache[25] = inferenceProfileEffect;else inferenceProfileEffect = $cache[25];
  let inferenceProfileEffectDeps;
  if ($cache[26] !== selectedModelId) inferenceProfileEffectDeps = [selectedModelId], $cache[26] = selectedModelId, $cache[27] = inferenceProfileEffectDeps;else inferenceProfileEffectDeps = $cache[27];
  URH.useEffect(inferenceProfileEffect, inferenceProfileEffectDeps);
  let supportsEffortLookup;
  if ($cache[28] !== selectedModelId) supportsEffortLookup = selectedModelId ? Dw(selectedModelId) : false, $cache[28] = selectedModelId, $cache[29] = supportsEffortLookup;else supportsEffortLookup = $cache[29];
  let supportsEffort = supportsEffortLookup,
    supportsMaxEffortLookup;
  if ($cache[30] !== selectedModelId) supportsMaxEffortLookup = selectedModelId ? tFe(selectedModelId) : false, $cache[30] = selectedModelId, $cache[31] = supportsMaxEffortLookup;else supportsMaxEffortLookup = $cache[31];
  let supportsMaxEffort = supportsMaxEffortLookup,
    supportsXhighEffortLookup;
  if ($cache[32] !== selectedModelId) supportsXhighEffortLookup = selectedModelId ? rve(selectedModelId) : false, $cache[32] = selectedModelId, $cache[33] = supportsXhighEffortLookup;else supportsXhighEffortLookup = $cache[33];
  let supportsXhighEffort = supportsXhighEffortLookup,
    supportsUltracodeLookup;
  if ($cache[34] !== selectedModelId) supportsUltracodeLookup = selectedModelId ? A4(selectedModelId) : false, $cache[34] = selectedModelId, $cache[35] = supportsUltracodeLookup;else supportsUltracodeLookup = $cache[35];
  let supportsUltracode = supportsUltracodeLookup,
    launchEffortLookup;
  if ($cache[36] !== selectedValue) launchEffortLookup = Y$q(selectedValue), $cache[36] = selectedValue, $cache[37] = launchEffortLookup;else launchEffortLookup = $cache[37];
  let launchEffort = launchEffortLookup,
    pinLaunchEffortLookup;
  if ($cache[38] !== selectedModelId || $cache[39] !== effortAdjusted) pinLaunchEffortLookup = !effortAdjusted && !!selectedModelId && oFe(selectedModelId), $cache[38] = selectedModelId, $cache[39] = effortAdjusted, $cache[40] = pinLaunchEffortLookup;else pinLaunchEffortLookup = $cache[40];
  let pinLaunchEffort = pinLaunchEffortLookup,
    displayedEffort = pinLaunchEffort ? launchEffort : currentEffort === "ultracode" && !supportsUltracode ? supportsMaxEffort ? "max" : "high" : currentEffort === "max" && !supportsMaxEffort || currentEffort === "xhigh" && !supportsXhighEffort ? "high" : currentEffort,
    handleFocus;
  if ($cache[41] !== storedEffortValue || $cache[42] !== effortAdjusted) handleFocus = Qn => {
    if (setSelectedValue(Qn), !effortAdjusted && storedEffortValue === undefined) setCurrentEffort(Y$q(Qn));
  }, $cache[41] = storedEffortValue, $cache[42] = effortAdjusted, $cache[43] = handleFocus;else handleFocus = $cache[43];
  let onFocus = handleFocus,
    adjustEffortHandler;
  if ($cache[44] !== launchEffort || $cache[45] !== pinLaunchEffort || $cache[46] !== selectedDisabled || $cache[47] !== supportsEffort || $cache[48] !== supportsMaxEffort || $cache[49] !== supportsUltracode || $cache[50] !== supportsXhighEffort) adjustEffortHandler = Qn => {
    if (!supportsEffort || selectedDisabled) return;
    setCurrentEffort(jn => AxO(pinLaunchEffort ? launchEffort : jn ?? launchEffort, Qn, supportsMaxEffort, supportsXhighEffort, supportsUltracode)), setEffortAdjusted(true);
  }, $cache[44] = launchEffort, $cache[45] = pinLaunchEffort, $cache[46] = selectedDisabled, $cache[47] = supportsEffort, $cache[48] = supportsMaxEffort, $cache[49] = supportsUltracode, $cache[50] = supportsXhighEffort, $cache[51] = adjustEffortHandler;else adjustEffortHandler = $cache[51];
  let adjustEffort = adjustEffortHandler,
    decreaseEffort,
    increaseEffort;
  if ($cache[52] !== adjustEffort) decreaseEffort = () => adjustEffort("left"), increaseEffort = () => adjustEffort("right"), $cache[52] = adjustEffort, $cache[53] = decreaseEffort, $cache[54] = increaseEffort;else decreaseEffort = $cache[53], increaseEffort = $cache[54];
  let keyBindingOptions;
  if ($cache[55] === Symbol.for("react.memo_cache_sentinel")) keyBindingOptions = {
    context: "ModelPicker"
  }, $cache[55] = keyBindingOptions;else keyBindingOptions = $cache[55];
  Wo({
    "modelPicker:decreaseEffort": decreaseEffort,
    "modelPicker:increaseEffort": increaseEffort,
    "modelPicker:thisSessionOnly": () => {
      if (!onSetDefault || selectedValue === undefined) return;
      if (selectedDisabled) return;
      confirmSelection(selectedValue);
    }
  }, keyBindingOptions);
  function confirmSelection(value) {
    if (j("tengu_model_command_menu_effort", {
      effort: us(currentEffort)
    }), currentEffort === "ultracode" && effortAdjusted && !skipSettingsWrite) n$(), updateModelState(KxO);else if (!skipSettingsWrite && effortAdjusted) {
      let effortValue = pfi(currentEffort === "ultracode" ? "xhigh" : currentEffort, Y$q(value), Cn("userSettings")?.effortLevel, effortAdjusted),
        storableEffort = ove(effortValue);
      if (storableEffort !== undefined) ao("userSettings", {
        effortLevel: storableEffort
      });
      n$(), updateModelState(prev => ({
        ...prev,
        effortValue: effortValue,
        ultracode: false
      }));
    }
    let resolvedModel = cp6(value),
      effortForSelect = effortAdjusted && resolvedModel && Dw(resolvedModel) && currentEffort !== "ultracode" ? currentEffort : undefined;
    if (value === Lm_) {
      onSelect(null, effortForSelect);
      return;
    }
    onSelect(value, effortForSelect);
  }
  let titleElement;
  if ($cache[56] === Symbol.for("react.memo_cache_sentinel")) titleElement = L4.createElement(w, {
    color: "remember",
    bold: true
  }, "Select model"), $cache[56] = titleElement;else titleElement = $cache[56];
  let description = headerText ?? "Switch between Claude models. Your pick becomes the default for new sessions. For other/previous model names, specify with --model.",
    descriptionElement;
  if ($cache[57] !== description) descriptionElement = L4.createElement(w, {
    dimColor: true
  }, description), $cache[57] = description, $cache[58] = descriptionElement;else descriptionElement = $cache[58];
  let sessionNoticeElement;
  if ($cache[59] !== sessionModel) sessionNoticeElement = sessionModel && L4.createElement(w, {
    dimColor: true
  }, "Currently using ", J3(sessionModel), " for this session only. Selecting a model will undo this."), $cache[59] = sessionModel, $cache[60] = sessionNoticeElement;else sessionNoticeElement = $cache[60];
  let headerSection;
  if ($cache[61] !== descriptionElement || $cache[62] !== sessionNoticeElement) headerSection = L4.createElement(B, {
    marginBottom: 1,
    flexDirection: "column"
  }, titleElement, descriptionElement, sessionNoticeElement), $cache[61] = descriptionElement, $cache[62] = sessionNoticeElement, $cache[63] = headerSection;else headerSection = $cache[63];
  let handleChange;
  if ($cache[64] !== confirmSelection || $cache[65] !== onSetDefault) handleChange = Qn => {
    if (onSetDefault) onSetDefault(Qn === Lm_ ? null : Qn);
    confirmSelection(Qn);
  }, $cache[64] = confirmSelection, $cache[65] = onSetDefault, $cache[66] = handleChange;else handleChange = $cache[66];
  let handleCancel = onCancel ?? qxO,
    selectSection;
  if ($cache[67] !== onFocus || $cache[68] !== defaultFocusValue || $cache[69] !== resolvedInitial || $cache[70] !== options || $cache[71] !== handleChange || $cache[72] !== handleCancel || $cache[73] !== visibleCount) selectSection = L4.createElement(B, {
    flexDirection: "column"
  }, L4.createElement(Ar, {
    defaultValue: resolvedInitial,
    defaultFocusValue: defaultFocusValue,
    options: options,
    onChange: handleChange,
    onFocus: onFocus,
    onCancel: handleCancel,
    visibleOptionCount: visibleCount
  })), $cache[67] = onFocus, $cache[68] = defaultFocusValue, $cache[69] = resolvedInitial, $cache[70] = options, $cache[71] = handleChange, $cache[72] = handleCancel, $cache[73] = visibleCount, $cache[74] = selectSection;else selectSection = $cache[74];
  let moreItemsIndicator;
  if ($cache[75] !== hiddenCount) moreItemsIndicator = hiddenCount > 0 && L4.createElement(B, {
    paddingLeft: 3
  }, L4.createElement(cL, {
    count: hiddenCount,
    unit: "model"
  })), $cache[75] = hiddenCount, $cache[76] = moreItemsIndicator;else moreItemsIndicator = $cache[76];
  let listSection;
  if ($cache[77] !== selectSection || $cache[78] !== moreItemsIndicator) listSection = L4.createElement(B, {
    flexDirection: "column",
    marginBottom: 1
  }, selectSection, moreItemsIndicator), $cache[77] = selectSection, $cache[78] = moreItemsIndicator, $cache[79] = listSection;else listSection = $cache[79];
  let effortSection;
  if ($cache[80] !== displayedEffort || $cache[81] !== launchEffort || $cache[82] !== selectedLabel || $cache[83] !== selectedDisabled || $cache[84] !== supportsEffort) effortSection = !selectedDisabled && L4.createElement(B, {
    marginBottom: 1,
    flexDirection: "column"
  }, supportsEffort ? L4.createElement(L4.Fragment, null, L4.createElement(w, {
    dimColor: true
  }, L4.createElement(yH4, {
    effort: displayedEffort
  }), " ", displayedEffort === "xhigh" ? "xHigh" : displayedEffort ? g$e(displayedEffort) : "", " ", "effort", displayedEffort === launchEffort ? " (default)" : "", " ", L4.createElement(w, {
    color: "subtle"
  }, L4.createElement(lt, {
    chord: ["left", "right"],
    action: "adjust"
  }))), displayedEffort === "max" ? L4.createElement(w, {
    color: "subtle"
  }, AHt) : null) : L4.createElement(w, {
    color: "subtle"
  }, L4.createElement(yH4, {
    effort: undefined
  }), " Effort not supported", selectedLabel ? ` for ${selectedLabel}` : "")), $cache[80] = displayedEffort, $cache[81] = launchEffort, $cache[82] = selectedLabel, $cache[83] = selectedDisabled, $cache[84] = supportsEffort, $cache[85] = effortSection;else effortSection = $cache[85];
  let fastModeNotice;
  if ($cache[86] !== showFastModeNotice) fastModeNotice = cc() ? showFastModeNotice ? L4.createElement(B, {
    marginBottom: 1
  }, L4.createElement(w, {
    dimColor: true
  }, "Fast mode is ", L4.createElement(w, {
    bold: true
  }, "ON"), " and available with", " ", z3(), " (/fast). Switching to other models turns off fast mode.")) : ak() && !Ooe() ? L4.createElement(B, {
    marginBottom: 1
  }, L4.createElement(w, {
    dimColor: true
  }, "Use ", L4.createElement(w, {
    bold: true
  }, "/fast"), " to turn on Fast mode (", z3(), ").")) : null : null, $cache[86] = showFastModeNotice, $cache[87] = fastModeNotice;else fastModeNotice = $cache[87];
  let bodySection;
  if ($cache[88] !== headerSection || $cache[89] !== listSection || $cache[90] !== effortSection || $cache[91] !== fastModeNotice) bodySection = L4.createElement(B, {
    flexDirection: "column"
  }, headerSection, listSection, effortSection, fastModeNotice), $cache[88] = headerSection, $cache[89] = listSection, $cache[90] = effortSection, $cache[91] = fastModeNotice, $cache[92] = bodySection;else bodySection = $cache[92];
  let footerHints;
  if ($cache[93] !== isStandaloneCommand || $cache[94] !== onSetDefault) footerHints = isStandaloneCommand && L4.createElement(By, null, L4.createElement(hn, null, L4.createElement(lt, {
    chord: "enter",
    action: onSetDefault ? "set as default" : "confirm"
  }), onSetDefault && L4.createElement(lt, {
    chord: "s",
    action: "use this session only"
  }), L4.createElement(ur, {
    action: "select:cancel",
    context: "Select",
    fallback: "Esc",
    description: "cancel"
  }))), $cache[93] = isStandaloneCommand, $cache[94] = onSetDefault, $cache[95] = footerHints;else footerHints = $cache[95];
  let content;
  if ($cache[96] !== bodySection || $cache[97] !== footerHints) content = L4.createElement(B, {
    flexDirection: "column"
  }, bodySection, footerHints), $cache[96] = bodySection, $cache[97] = footerHints, $cache[98] = content;else content = $cache[98];
  let result = content;
  if (!isStandaloneCommand) return result;
  let borderedResult;
  if ($cache[99] !== result) borderedResult = L4.createElement(Ku, {
    color: "permission"
  }, result), $cache[99] = result, $cache[100] = borderedResult;else borderedResult = $cache[100];
  return borderedResult;
}
function qxO() {}
function KxO(state) {
  return {
    ...state,
    effortValue: "xhigh",
    ultracode: true
  };
}
function OxO(tick) {
  return tick + 1;
}
function TxO(option) {
  return option.disabled === true;
}
function zxO(state) {
  return state.ultracode;
}
function $xO(state) {
  return state.effortValue;
}
function YxO(state) {
  return cc() ? state.fastMode : false;
}
function cp6(value) {
  if (!value) return;
  return value === Lm_ ? Bg() : gs(value);
}
function yH4(props) {
  let $cache = A$q.c(5),
    {
      effort: effort
    } = props,
    color = effort ? "claude" : "subtle",
    glyph;
  if ($cache[0] !== effort) glyph = effort === "ultracode" ? ftn : S_o(effort ?? "low"), $cache[0] = effort, $cache[1] = glyph;else glyph = $cache[1];
  let element;
  if ($cache[2] !== color || $cache[3] !== glyph) element = L4.createElement(w, {
    color: color
  }, glyph), $cache[2] = color, $cache[3] = glyph, $cache[4] = element;else element = $cache[4];
  return element;
}
function AxO(current, direction, supportsMax, supportsXhigh, supportsUltracode) {
  let levels = ["low", "medium", "high"];
  if (supportsXhigh) levels.push("xhigh");
  if (supportsMax) levels.push("max");
  if (supportsUltracode) levels.push("ultracode");
  let currentIndex = levels.indexOf(current),
    index = currentIndex !== -1 ? currentIndex : levels.indexOf("high");
  if (direction === "right") return levels[(index + 1) % levels.length];else return levels[(index - 1 + levels.length) % levels.length];
}
function Y$q(value) {
  let modelId = cp6(value) ?? Bg();
  return _fe(__n(modelId));
}
var A$q,
  L4,
  URH,
  Lm_ = "__NO_PREFERENCE__";
var dp6 = b(() => {
  xkn();
  Lq();
  Ct();
  Qb();
  rl();
  Je();
  _s();
  fo();
  Um();
  Qpe();
  Fo();
  Uol();
  p2e();
  Er();
  Ec();
  hb();
  qs();
  ts();
  yz();
  tS();
  b_o();
  A$q = L(nt(), 1), L4 = L(Te(), 1), URH = L(Te(), 1);
});

export {ModelPicker as gje,qxO as u5p,KxO as d5p,OxO as p5p,TxO as m5p,zxO as f5p,$xO as A5p,YxO as h5p,cp6 as S8n,yH4 as Dil,AxO as g5p,Y$q as Uyo,A$q as $yo,L4 as xl,URH as iDe,Lm_ as p6t,dp6 as b8n};

// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {j3,Fbn,_bi,_et,rve,yDt,AUe,Jse,F$r,nZ,RUe,iO,M2,_Dt,gDt,Cp} from "../config/2223_level.ts";
import {getMainLoopModel as gs,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Nu,Ub,Wu} from "../../vendor/m438.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {FE,V1} from "../../vendor/m4006.ts";
import {$gt,oxo} from "../../vendor/m5053.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Die,svn,yOt} from "../../vendor/m2545.ts";
import {useAnimationFrame as Dm} from "../config/2452_isVisible.ts";
import {f8,$M} from "../telemetry/2032_word.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {getSettingsSchema as ZS,SE} from "../../vendor/m2559.ts";
import {_we,fvn} from "../../vendor/m2556.ts";
import {p4} from "../../vendor/m2471.ts";
import {getFastModeModelDisplayName as Cm,lr} from "../../vendor/m233.ts";
import {L2e,Ohe,Phe,ku,rS} from "../../vendor/m2582.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {qE,BG} from "../../vendor/m4563.ts";
import {Ny,uq} from "../../vendor/m3355.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {i3,Ud} from "../../vendor/m615.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// /effort slash command: read/set the model "effort level" (low..max, ultracode, auto),
// plus the interactive slider UI with an animated "ultra ripple" rainbow effect.
var TNl = {};
ft(TNl, {
  showCurrentEffort: () => showCurrentEffort,
  rippleLevel: () => rippleLevel,
  rippleDistance: () => rippleDistance,
  getSliderGeometry: () => getSliderGeometry,
  getEffortHelpText: () => getEffortHelpText,
  executeEffort: () => executeEffort,
  call: () => call,
  UltraRippleText: () => UltraRippleText,
  RIPPLE_RAMP: () => RIPPLE_RAMP
});

/** Build the `/effort` usage/help text, listing ultracode only when the current model supports it. */
function getEffortHelpText() {
  let ultracodeAvailable = j3(gs());
  return `Usage: /effort [low|medium|high|xhigh|max${ultracodeAvailable ? "|ultracode" : ""}|auto]

Effort levels:
- low: Quick, straightforward implementation
- medium: Balanced approach with standard testing
- high: Comprehensive implementation with extensive testing
- xhigh: Extended reasoning with thorough analysis (${Fbn})
- max: Maximum capability with deepest reasoning (${_bi})
` + (ultracodeAvailable ? `- ultracode: xhigh + dynamic workflow orchestration (this session only)
` : "") + "- auto: Use the default effort level for your model";
}

/** Parse a raw effort argument into a settable value (auto/unset -> undefined, ultracode -> xhigh when supported). */
function parseEffortArg(rawArg: string, model: unknown) {
  let normalized = rawArg.toLowerCase();
  if (normalized === "auto" || normalized === "unset") return {
    value: void 0
  };
  if (normalized === "ultracode" && j3(model)) return {
    value: "xhigh"
  };
  let parsed = _et(rawArg);
  return parsed ? {
    value: parsed
  } : null;
}

/** Push the chosen effort level to the remote transport (if any); returns a note string when applied locally only. */
function applyRemoteEffort(effortLevel: string | undefined, ultracode = !1) {
  if (!Nu()) return null;
  if (!Ub()) return " (applied locally — this remote transport can’t change server effort)";
  return Nu()?.sendControlRequest({
    subtype: "apply_flag_settings",
    settings: {
      effortLevel: effortLevel ?? null,
      ultracode: ultracode
    }
  }).catch(Ie), null;
}

/** Persist/announce a concrete effort level, honoring session-scope and CLAUDE_CODE_EFFORT_LEVEL overrides. */
function setEffortLevel(effortLevel: string) {
  let settableValue = rve(effortLevel);
  if (Ub() && settableValue === void 0) return {
    message: `${effortLevel} is session-scoped and won't reach the remote process. Use low, medium, high, or xhigh instead.`
  };
  let remoteNote = applyRemoteEffort(settableValue),
    saveError = yDt(effortLevel);
  if (saveError) return {
    message: `Failed to set effort level: ${saveError.message}`
  };
  W("tengu_effort_command", {
    effort: effortLevel
  });
  let envOverride = Nu() ? void 0 : AUe();
  if (envOverride !== void 0 && envOverride !== effortLevel) {
    let envValue = process.env.CLAUDE_CODE_EFFORT_LEVEL;
    if (settableValue === void 0) return {
      message: `Not applied: CLAUDE_CODE_EFFORT_LEVEL=${envValue} overrides effort this session, and ${Jse(effortLevel)} is session-only (nothing saved)`,
      effortUpdate: {
        value: effortLevel,
        ultracode: !1
      }
    };
    return {
      message: `CLAUDE_CODE_EFFORT_LEVEL=${envValue} overrides this session — clear it and ${Jse(effortLevel)} takes over`,
      effortUpdate: {
        value: effortLevel,
        ultracode: !1
      }
    };
  }
  let description = F$r(effortLevel),
    scopeNote = settableValue !== void 0 ? " (saved as your default for new sessions)" : " (this session only)";
  return {
    message: `Set effort level to ${Jse(effortLevel)}${scopeNote}: ${description}${remoteNote ?? ""}`,
    effortUpdate: {
      value: effortLevel,
      ultracode: !1
    }
  };
}

/** Produce the message describing the currently active effort level (ultracode/auto/concrete). */
function showCurrentEffort(effortValue: string | undefined, model: unknown, ultracode: boolean) {
  if (nZ(model, effortValue, ultracode)) return {
    message: "Current effort level: ultracode (xhigh + dynamic workflow orchestration; this session only)"
  };
  let envOverride = Nu() ? void 0 : AUe(),
    sessionValue = RUe(model) ? void 0 : effortValue,
    effective = envOverride === null ? void 0 : envOverride ?? sessionValue;
  if (effective === void 0) {
    let resolvedAuto = iO(model, effortValue);
    return {
      message: `Effort level: auto (currently ${Jse(resolvedAuto)})`
    };
  }
  let description = F$r(effective);
  return {
    message: `Current effort level: ${Jse(effective)} (${description})`
  };
}

/** Clear the effort setting (auto), accounting for an env override still in effect. */
function clearEffortLevel() {
  let remoteNote = applyRemoteEffort(void 0),
    saveError = yDt(void 0);
  if (saveError) return {
    message: `Failed to set effort level: ${saveError.message}`
  };
  W("tengu_effort_command", {
    effort: Ve("auto")
  });
  let envOverride = Nu() ? void 0 : AUe();
  if (envOverride !== void 0 && envOverride !== null) return {
    message: `Cleared effort from settings, but CLAUDE_CODE_EFFORT_LEVEL=${process.env.CLAUDE_CODE_EFFORT_LEVEL} still controls this session`,
    effortUpdate: {
      value: void 0,
      ultracode: !1
    }
  };
  return {
    message: `Effort level set to auto${remoteNote ?? ""}`,
    effortUpdate: {
      value: void 0,
      ultracode: !1
    }
  };
}

/** Enable ultracode (xhigh + dynamic workflows) for this session, validating model + feature support. */
function enableUltracode() {
  if (!j3()) return {
    message: "Ultracode needs dynamic workflows enabled (see /config). Valid options are: low, medium, high, xhigh, max, auto"
  };
  let model = gs();
  if (!j3(model)) return {
    message: `Ultracode runs at xhigh effort, which ${model} doesn't support — switch to an xhigh-capable model (${Fbn}). Valid options are: low, medium, high, xhigh, max, auto`
  };
  let remoteNote = applyRemoteEffort("xhigh", !0);
  M2(), W("tengu_effort_command", {
    effort: Ve("ultracode")
  });
  let envOverride = Nu() ? void 0 : AUe();
  if (envOverride !== void 0 && envOverride !== "xhigh") return {
    message: `CLAUDE_CODE_EFFORT_LEVEL=${process.env.CLAUDE_CODE_EFFORT_LEVEL} overrides effort this session — clear it and ultracode takes over`,
    effortUpdate: {
      value: "xhigh",
      ultracode: !0
    }
  };
  return {
    message: `Set effort level to ultracode (this session only): xhigh + dynamic workflow orchestration${remoteNote ?? ""}`,
    effortUpdate: {
      value: "xhigh",
      ultracode: !0
    }
  };
}

/** Dispatch a raw `/effort <arg>` argument to clear / ultracode / set, validating concrete levels. */
function executeEffort(rawArg: string) {
  let normalized = rawArg.toLowerCase();
  if (normalized === "auto" || normalized === "unset") return clearEffortLevel();
  if (normalized === "ultracode") return enableUltracode();
  let parsed = _et(rawArg);
  if (!parsed) return {
    message: `Invalid argument: ${rawArg}. Valid options are: low, medium, high, xhigh, max,${j3(gs()) ? " ultracode," : ""} auto`
  };
  return setEffortLevel(parsed);
}

/** `/effort current|status` view component: emits the current-effort message via onDone. */
function CurrentEffortView(props: { onDone: (message: string) => void }) {
  let {
      onDone
    } = props,
    effortValue = _t(selectEffortValue),
    ultracode = _t(selectUltracode),
    model = FE(),
    {
      message
    } = showCurrentEffort(effortValue, model, ultracode);
  return onDone(message), null;
}

function selectUltracode(state: any) {
  return state.ultracode;
}

function selectEffortValue(state: any) {
  return state.effortValue;
}

/** Run executeEffort for a raw arg, apply any effortUpdate to store state, then report the message. */
function applyEffortAndReport(rawArg: string, setState: (updater: (state: any) => any) => void, report: (message: string) => void) {
  let result = executeEffort(rawArg);
  if (result.effortUpdate) {
    let {
      value: newValue,
      ultracode: newUltracode = !1
    } = result.effortUpdate;
    setState(state => {
      if (state.effortValue === newValue && (state.ultracode ?? !1) === newUltracode) return state;
      return {
        ...state,
        effortValue: newValue,
        ultracode: newUltracode
      };
    });
  }
  report(result.message);
}

/** `/effort <arg>` component: applies the arg, optionally prompting for confirmation when required. */
function EffortArgPrompt(props: { args: string; hasConversationMessages: boolean; onDone: (message: string) => void }) {
  let cache = Wgt.c(23),
    {
      args,
      hasConversationMessages,
      onDone
    } = props,
    effortValue = _t(selectArgEffortValue),
    cacheMissAckedAtOutputTokens = _t(selectCacheMissAcked),
    model = FE(),
    setState = bo(),
    parsedArg;
  if (cache[0] !== args || cache[1] !== model) parsedArg = parseEffortArg(args, model), cache[0] = args, cache[1] = model, cache[2] = parsedArg;else parsedArg = cache[2];
  let parsed = parsedArg,
    needsConfirmInitial;
  if (cache[3] !== cacheMissAckedAtOutputTokens || cache[4] !== effortValue || cache[5] !== hasConversationMessages || cache[6] !== model || cache[7] !== parsed) needsConfirmInitial = () => parsed !== null && _Dt(parsed.value, effortValue, model, cacheMissAckedAtOutputTokens, hasConversationMessages), cache[3] = cacheMissAckedAtOutputTokens, cache[4] = effortValue, cache[5] = hasConversationMessages, cache[6] = model, cache[7] = parsed, cache[8] = needsConfirmInitial;else needsConfirmInitial = cache[8];
  let [needsConfirm, setNeedsConfirm] = EJ.useState(needsConfirmInitial),
    applyEffect,
    applyDeps;
  if (cache[9] !== args || cache[10] !== onDone || cache[11] !== needsConfirm || cache[12] !== setState || cache[13] !== parsed) applyEffect = () => {
    if (needsConfirm && parsed !== null) return;
    applyEffortAndReport(args, setState, onDone);
  }, applyDeps = [needsConfirm, parsed, args, setState, onDone], cache[9] = args, cache[10] = onDone, cache[11] = needsConfirm, cache[12] = setState, cache[13] = parsed, cache[14] = applyEffect, cache[15] = applyDeps;else applyEffect = cache[14], applyDeps = cache[15];
  if (EJ.useEffect(applyEffect, applyDeps), needsConfirm && parsed !== null) {
    let onConfirm;
    if (cache[16] === Symbol.for("react.memo_cache_sentinel")) onConfirm = () => setNeedsConfirm(!1), cache[16] = onConfirm;else onConfirm = cache[16];
    let onCancel;
    if (cache[17] !== effortValue || cache[18] !== onDone) onCancel = () => onDone(`Kept effort level as ${effortValue !== void 0 ? Jse(effortValue) : "auto"}`), cache[17] = effortValue, cache[18] = onDone, cache[19] = onCancel;else onCancel = cache[19];
    let element;
    if (cache[20] !== onCancel || cache[21] !== parsed.value) element = Ka.jsx($gt, {
      kind: "effort",
      model: null,
      effort: parsed.value,
      onConfirm: onConfirm,
      onCancel: onCancel
    }), cache[20] = onCancel, cache[21] = parsed.value, cache[22] = element;else element = cache[22];
    return element;
  }
  return null;
}

function selectCacheMissAcked(state: any) {
  return state.cacheMissAckedAtOutputTokens;
}

function selectArgEffortValue(state: any) {
  return state.effortValue;
}

/** For each level, compute the column where its label starts given label lengths + spacer widths. */
function computeLabelStarts(levels: Array<{ label: string }>, spacers: number[]) {
  return levels.map((_level, index) => levels.slice(0, index).reduce((acc, level, i) => acc + level.label.length + spacers[i], 0));
}

/** Build the slider geometry (levels, widths, triangle/label positions, track chars), expanding for ultracode. */
function getSliderGeometry(model: unknown) {
  if (j3(model)) {
    let ultracodeStart = qgt + 3,
      ultracodeLabelWidth = 17,
      levels = [...Txo, {
        value: "ultracode",
        label: "ultracode",
        color: "violet-ripple"
      }],
      ultracodeTrianglePos = ultracodeStart + Math.floor(4),
      spacers = [...yxo, ultracodeTrianglePos - qgt];
    return {
      levels: levels,
      width: ultracodeStart + 17,
      trianglePositions: [...cNl, ultracodeStart + Math.floor(8.5)],
      labelStarts: computeLabelStarts(levels, spacers),
      spacers: spacers,
      trackChars: "─".repeat(qgt + 1) + "┆" + "─".repeat(18),
      accentStart: qgt + 2,
      sublabel: {
        text: "xhigh + workflows",
        start: ultracodeStart
      }
    };
  }
  return {
    levels: Txo,
    width: qgt,
    trianglePositions: cNl,
    labelStarts: computeLabelStarts(Txo, yxo),
    spacers: yxo,
    trackChars: "─".repeat(qgt)
  };
}

/** Render a single slider level label, styled by its color and whether it is selected. */
function EffortLevelLabel(props: { level: { label: string; color: string }; selected: boolean }) {
  let cache = Wgt.c(13),
    {
      level,
      selected
    } = props,
    label = level.label;
  if (!selected) {
    if (level.color === "violet-ripple") {
      let el;
      if (cache[0] !== label) el = Ka.jsx(v, {
        color: WYn,
        children: label
      }), cache[0] = label, cache[1] = el;else el = cache[1];
      return el;
    }
    let el;
    if (cache[2] !== label) el = Ka.jsx(v, {
      dimColor: !0,
      children: label
    }), cache[2] = label, cache[3] = el;else el = cache[3];
    return el;
  }
  if (level.color === "violet-ripple") {
    let el;
    if (cache[4] !== label) el = Ka.jsx(v, {
      bold: !0,
      backgroundColor: Cxo,
      color: Exo,
      children: label
    }), cache[4] = label, cache[5] = el;else el = cache[5];
    return el;
  }
  if (level.color === "rainbow-animated") {
    let el;
    if (cache[6] !== label) el = Ka.jsx(eSm, {
      text: label
    }), cache[6] = label, cache[7] = el;else el = cache[7];
    return el;
  }
  if (level.color === "autoAccept-shimmer") {
    let el;
    if (cache[8] !== label) el = Ka.jsx(uSm, {
      text: label
    }), cache[8] = label, cache[9] = el;else el = cache[9];
    return el;
  }
  let el;
  if (cache[10] !== level.color || cache[11] !== label) el = Ka.jsx(v, {
    bold: !0,
    color: level.color,
    children: label
  }), cache[10] = level.color, cache[11] = label, cache[12] = el;else el = cache[12];
  return el;
}

/** Animated rainbow text: cycles per-character hues over time (for the "max" level label). */
function eSm(props: { text: string }) {
  let cache = Wgt.c(5),
    {
      text
    } = props,
    reducedMotion = Die(),
    [, tick] = Dm(reducedMotion ? null : 100),
    phase = Math.floor(tick / 100),
    chars;
  if (cache[0] !== text) chars = [...text], cache[0] = text, cache[1] = chars;else chars = cache[1];
  let el;
  if (cache[2] !== phase || cache[3] !== chars) el = Ka.jsx(v, {
    bold: !0,
    children: chars.map((ch, index) => Ka.jsx(v, {
      color: f8(index + phase),
      children: ch
    }, index))
  }), cache[2] = phase, cache[3] = chars, cache[4] = el;else el = cache[4];
  return el;
}

/** Euclidean distance from a cell (col,row) to a ripple origin, with row scaled 2x for aspect ratio. */
function rippleDistance(col: number, row: number, originCol: number) {
  let dx = col - originCol,
    dy = (row - ZGt) * 2;
  return Math.sqrt(dx * dx + dy * dy);
}

/** Map a distance to a ripple-ramp index (0..len-1), or null once past the wave's travel radius. */
function rippleLevel(distance: number, ripple: { travel: number }) {
  if (distance > ripple.travel) return null;
  let phase = ((distance - ripple.travel) % qYn + qYn) % qYn,
    intensity = (1 + Math.cos(2 * Math.PI * phase / qYn)) / 2;
  return Math.min(RIPPLE_RAMP.length - 1, Math.round(intensity * (RIPPLE_RAMP.length - 1)));
}

/** Render text with a moving ripple-colored background, coalescing adjacent same-level chars into runs. */
function UltraRippleText(props: { text: string; col: number; row: number; ripple: { originCol: number; travel: number }; dimColor?: boolean; bold?: boolean; coveredColor?: string }) {
  let cache = Wgt.c(10),
    {
      text,
      col,
      row,
      ripple,
      dimColor,
      bold,
      coveredColor
    } = props,
    runs;
  if (cache[0] !== col || cache[1] !== ripple || cache[2] !== row || cache[3] !== text) {
    runs = [];
    let offset = 0;
    for (let ch of text) {
      let level = rippleLevel(rippleDistance(col + offset, row, ripple.originCol), ripple),
        lastRun = runs.at(-1);
      if (lastRun && lastRun.level === level) lastRun.text = lastRun.text + ch;else runs.push({
        text: ch,
        level: level
      });
      offset++;
    }
    cache[0] = col, cache[1] = ripple, cache[2] = row, cache[3] = text, cache[4] = runs;
  } else runs = cache[4];
  let el;
  if (cache[5] !== bold || cache[6] !== coveredColor || cache[7] !== dimColor || cache[8] !== runs) el = Ka.jsx(v, {
    children: runs.map((run, index) => {
      if (run.level === null) return Ka.jsx(v, {
        dimColor: dimColor,
        bold: bold,
        children: run.text
      }, index);
      return Ka.jsx(v, {
        backgroundColor: RIPPLE_RAMP[run.level],
        color: coveredColor ?? Exo,
        bold: bold,
        children: run.text
      }, index);
    })
  }), cache[5] = bold, cache[6] = coveredColor, cache[7] = dimColor, cache[8] = runs, cache[9] = el;else el = cache[9];
  return el;
}

/** Shimmer text: a bright cursor sweeps along the characters over time (for the "xhigh" level label). */
function uSm(props: { text: string }) {
  let cache = Wgt.c(5),
    {
      text
    } = props,
    reducedMotion = Die(),
    [, tick] = Dm(reducedMotion ? null : 100),
    cycleLength = text.length + 4,
    cursor = reducedMotion ? svn : Math.floor(tick / 100) % cycleLength,
    chars;
  if (cache[0] !== text) chars = [...text], cache[0] = text, cache[1] = chars;else chars = cache[1];
  let el;
  if (cache[2] !== cursor || cache[3] !== chars) el = Ka.jsx(v, {
    bold: !0,
    children: chars.map((ch, index) => {
      let isCursor = index === cursor,
        isAdjacent = index === cursor - 1 || index === cursor + 1;
      return Ka.jsx(v, {
        color: isCursor ? gNl : "autoAccept",
        bold: isCursor || isAdjacent,
        children: ch
      }, index);
    })
  }), cache[2] = cursor, cache[3] = chars, cache[4] = el;else el = cache[4];
  return el;
}

/** Interactive `/effort` slider: arrow keys to adjust, enter to confirm, escape to cancel; ultracode adds the ripple FX. */
function EffortSlider({
  hasConversationMessages,
  onDone
}: { hasConversationMessages: boolean; onDone: (message: string) => void }) {
  let effortValue = _t(state => state.effortValue),
    cacheMissAckedAtOutputTokens = _t(state => state.cacheMissAckedAtOutputTokens),
    ultracode = _t(state => state.ultracode),
    model = FE(),
    setState = bo(),
    geometry = EJ.useMemo(() => getSliderGeometry(model), [model]),
    initialIndex = EJ.useMemo(() => {
      if (nZ(model, effortValue, ultracode)) {
        let ultracodeIndex = geometry.levels.findIndex(level => level.value === "ultracode");
        if (ultracodeIndex !== -1) return ultracodeIndex;
      }
      let envOverride = Nu() ? void 0 : AUe(),
        sessionValue = RUe(model) ? void 0 : effortValue,
        effective = envOverride === null ? void 0 : envOverride ?? sessionValue;
      if (effective !== void 0) {
        let effectiveIndex = geometry.levels.findIndex(level => level.value === effective);
        if (effectiveIndex !== -1) return effectiveIndex;
      }
      let resolvedAuto = iO(model, effective),
        autoIndex = geometry.levels.findIndex(level => level.value === resolvedAuto);
      return autoIndex === -1 ? QTm : autoIndex;
    }, [effortValue, model, geometry, ultracode]),
    [selectedRaw, setSelected] = EJ.useState(initialIndex),
    selected = Math.min(selectedRaw, geometry.levels.length - 1),
    [pendingConfirm, setPendingConfirm] = EJ.useState(null),
    {
      columns
    } = _r(),
    flexLayout = ZS(),
    isUltracodeSelected = geometry.levels[selected].value === "ultracode",
    reducedMotion = Die(),
    [, tick] = Dm(isUltracodeSelected && !reducedMotion && pendingConfirm === null ? tSm : null),
    rippleStartTick = EJ.useRef(null);
  if (!isUltracodeSelected || reducedMotion) rippleStartTick.current = null;else if (rippleStartTick.current === null) rippleStartTick.current = tick;
  let elapsedTicks = isUltracodeSelected ? tick - (rippleStartTick.current ?? tick) : 0,
    ripple = isUltracodeSelected && !reducedMotion ? {
      travel: elapsedTicks * nSm,
      originCol: geometry.trianglePositions[selected]
    } : null,
    hintText = EJ.useMemo(() => `${_we([p4("left"), p4("right")])} to adjust \xB7 ${_we([p4("enter")])} to confirm \xB7 ${_we([p4("escape")])} to cancel`, []);
  function onKeyDown(event: { key: string; preventDefault: () => void }) {
    if (event.key === "left") event.preventDefault(), setSelected(prev => Math.max(0, prev - 1));else if (event.key === "right") event.preventDefault(), setSelected(prev => Math.min(geometry.levels.length - 1, prev + 1));else if (event.key === "return") {
      event.preventDefault();
      let level = geometry.levels[selected],
        effortToSet = level.value === "ultracode" ? "xhigh" : level.value;
      if (_Dt(effortToSet, effortValue, model, cacheMissAckedAtOutputTokens, hasConversationMessages)) {
        setPendingConfirm(level.value);
        return;
      }
      applyEffortAndReport(level.value, setState, onDone);
    } else if (event.key === "escape") event.preventDefault(), onDone("Cancelled");
  }
  if (pendingConfirm !== null) return Ka.jsx($gt, {
    kind: "effort",
    model: null,
    effort: pendingConfirm === "ultracode" ? "xhigh" : pendingConfirm,
    onConfirm: () => applyEffortAndReport(pendingConfirm, setState, onDone),
    onCancel: () => setPendingConfirm(null)
  });
  let trianglePos = geometry.trianglePositions[selected],
    leftTrack = geometry.trackChars.slice(0, trianglePos),
    rightTrack = geometry.trackChars.slice(trianglePos + 1),
    accentStart = geometry.accentStart ?? geometry.trackChars.length,
    leftDim = leftTrack.slice(0, Math.min(leftTrack.length, accentStart)),
    leftAccent = leftTrack.slice(Math.min(leftTrack.length, accentStart)),
    triangleAccented = trianglePos >= accentStart,
    rightDimLen = Math.max(0, accentStart - trianglePos - 1),
    rightDim = rightTrack.slice(0, rightDimLen),
    rightAccent = rightTrack.slice(rightDimLen),
    centerSpacer = Cm(" ", geometry.width - 6 - 7),
    lastLabelEnd = geometry.labelStarts.at(-1) + geometry.levels.at(-1).label.length,
    trailingSpacer = Cm(" ", geometry.width - lastLabelEnd),
    spacerAt = (index: number) => " ".repeat(geometry.spacers[index]),
    leftMargin = flexLayout ? L2e + Ohe : Phe,
    fullWidth = Math.max(geometry.width, columns),
    marginPad = " ".repeat(leftMargin),
    centerOffset = Math.max(0, Math.floor((fullWidth - geometry.width) / 2)),
    centerPad = " ".repeat(centerOffset),
    rightPad = " ".repeat(Math.max(0, fullWidth - centerOffset - geometry.width));
  return Ka.jsx(ku, {
    children: Ka.jsxs($, {
      flexDirection: "column",
      tabIndex: 0,
      autoFocus: !0,
      onKeyDown: onKeyDown,
      marginX: ripple ? -leftMargin : void 0,
      width: ripple ? fullWidth : void 0,
      children: [Ka.jsx(qE, {
        children: ripple ? Ka.jsx(UltraRippleText, {
          text: `${marginPad}Effort${" ".repeat(Math.max(0, fullWidth - leftMargin - 6))}`,
          col: -centerOffset,
          row: rSm,
          ripple: ripple
        }) : "Effort"
      }), ripple ? Ka.jsx(UltraRippleText, {
        text: " ".repeat(fullWidth),
        col: -centerOffset,
        row: oSm,
        ripple: ripple
      }) : Ka.jsx($, {
        height: 1
      }), Ka.jsxs($, {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        children: [Ka.jsx($, {
          children: ripple ? Ka.jsx(UltraRippleText, {
            text: `${centerPad}Faster${centerSpacer}Smarter${rightPad}`,
            col: -centerOffset,
            row: sSm,
            ripple: ripple
          }) : Ka.jsxs(Ka.Fragment, {
            children: [Ka.jsx(v, {
              children: "Faster"
            }), Ka.jsx(v, {
              children: centerSpacer
            }), Ka.jsx(v, {
              children: "Smarter"
            })]
          })
        }), Ka.jsx($, {
          children: ripple ? Ka.jsxs(Ka.Fragment, {
            children: [Ka.jsx(UltraRippleText, {
              text: `${centerPad}${leftTrack}`,
              col: -centerOffset,
              row: dNl,
              ripple: ripple,
              dimColor: !0,
              coveredColor: pNl
            }), Ka.jsx(v, {
              bold: !0,
              backgroundColor: Cxo,
              color: Exo,
              children: "▲"
            }), Ka.jsx(UltraRippleText, {
              text: `${rightTrack}${rightPad}`,
              col: trianglePos + 1,
              row: dNl,
              ripple: ripple,
              dimColor: !0,
              coveredColor: pNl
            })]
          }) : Ka.jsxs(Ka.Fragment, {
            children: [Ka.jsx(v, {
              dimColor: !0,
              children: leftDim
            }), leftAccent ? Ka.jsx(v, {
              color: WYn,
              children: leftAccent
            }) : null, Ka.jsx(v, {
              bold: !0,
              color: triangleAccented ? WYn : void 0,
              children: "▲"
            }), Ka.jsx(v, {
              dimColor: !0,
              children: rightDim
            }), rightAccent ? Ka.jsx(v, {
              color: WYn,
              children: rightAccent
            }) : null]
          })
        }), Ka.jsxs($, {
          children: [ripple && Ka.jsx(UltraRippleText, {
            text: centerPad,
            col: -centerOffset,
            row: ZGt,
            ripple: ripple
          }), geometry.levels.map((level, index) => Ka.jsxs(fNl.Fragment, {
            children: [index > 0 && (ripple ? Ka.jsx(UltraRippleText, {
              text: spacerAt(index - 1),
              col: geometry.labelStarts[index] - geometry.spacers[index - 1],
              row: ZGt,
              ripple: ripple
            }) : Ka.jsx(v, {
              children: spacerAt(index - 1)
            })), ripple && selected !== index ? Ka.jsx(UltraRippleText, {
              text: level.label,
              col: geometry.labelStarts[index],
              row: ZGt,
              ripple: ripple,
              dimColor: !0
            }) : Ka.jsx(EffortLevelLabel, {
              level: level,
              selected: selected === index
            })]
          }, level.value)), ripple ? Ka.jsx(UltraRippleText, {
            text: `${trailingSpacer}${rightPad}`,
            col: lastLabelEnd,
            row: ZGt,
            ripple: ripple
          }) : trailingSpacer ? Ka.jsx(v, {
            children: trailingSpacer
          }) : null]
        }), geometry.sublabel ? Ka.jsx($, {
          children: ripple ? Ka.jsx(UltraRippleText, {
            text: `${centerPad}${" ".repeat(geometry.sublabel.start)}${geometry.sublabel.text}${rightPad}`,
            col: -centerOffset,
            row: iSm,
            ripple: ripple,
            dimColor: !0
          }) : Ka.jsxs(Ka.Fragment, {
            children: [Ka.jsx(v, {
              children: " ".repeat(geometry.sublabel.start)
            }), Ka.jsx(v, {
              dimColor: !0,
              children: geometry.sublabel.text
            })]
          })
        }) : null, geometry.levels[selected]?.value === "max" ? Ka.jsx($, {
          children: Ka.jsx(v, {
            dimColor: !0,
            children: gDt
          })
        }) : null]
      }), ripple ? Ka.jsx(UltraRippleText, {
        text: " ".repeat(fullWidth),
        col: -centerOffset,
        row: aSm,
        ripple: ripple
      }) : Ka.jsx($, {
        height: 1
      }), Ka.jsx(Ny, {
        children: ripple ? Ka.jsx(UltraRippleText, {
          text: `${marginPad}${hintText}${" ".repeat(Math.max(0, fullWidth - leftMargin - sn(hintText)))}`,
          col: -centerOffset,
          row: lSm,
          ripple: ripple,
          dimColor: !0
        }) : Ka.jsxs(bn, {
          children: [Ka.jsx(at, {
            chord: ["left", "right"],
            action: "adjust"
          }), Ka.jsx(at, {
            chord: "enter",
            action: "confirm"
          }), Ka.jsx(at, {
            chord: "escape",
            action: "cancel"
          })]
        })
      })]
    })
  });
}

/** `/effort` command entry: routes to help, current-status, the slider (no arg), or the arg prompt. */
async function call(onDone: (message: string) => void, context: { messages: unknown[] }, rawArg: string | undefined) {
  if (rawArg = rawArg?.trim() || "", i3.includes(rawArg)) {
    onDone(getEffortHelpText());
    return;
  }
  if (rawArg === "current" || rawArg === "status") return Ka.jsx(CurrentEffortView, {
    onDone: onDone
  });
  let hasConversationMessages = context.messages.length > 0;
  if (!rawArg) return Ka.jsx(EffortSlider, {
    onDone: onDone,
    hasConversationMessages: hasConversationMessages
  });
  return Ka.jsx(EffortArgPrompt, {
    args: rawArg,
    onDone: onDone,
    hasConversationMessages: hasConversationMessages
  });
}
var Wgt,
  fNl,
  EJ,
  Ka,
  qgt = 42,
  cNl,
  yxo,
  Txo,
  QTm = 3,
  gNl = "#d0b4ff",
  tSm = 80,
  nSm = 0.03,
  qYn = 20,
  rSm = -2,
  oSm = -1,
  sSm = 0,
  dNl = 1,
  ZGt = 2,
  iSm = 3,
  aSm = 4,
  lSm = 5,
  Exo = "rgb(255,255,255)",
  pNl,
  mNl,
  cSm,
  RIPPLE_RAMP,
  Cxo,
  WYn;
var Axo = b(() => {
  oxo();
  Is();
  BG();
  uq();
  Wo();
  rS();
  fvn();
  Ud();
  SE();
  V1();
  yOt();
  ui();
  mc();
  je();
  Wu();
  kt();
  uo();
  Cp();
  vn();
  Ro();
  lr();
  $M();
  Wgt = x(tt(), 1), fNl = x(et(), 1), EJ = x(et(), 1), Ka = x(oe(), 1);
  cNl = [1, 10, 20, 30, 40], yxo = [5, 5, 5, 6], Txo = [{
    value: "low",
    label: "low",
    color: "warning"
  }, {
    value: "medium",
    label: "medium",
    color: "success"
  }, {
    value: "high",
    label: "high",
    color: "permission"
  }, {
    value: "xhigh",
    label: "xhigh",
    color: "autoAccept-shimmer"
  }, {
    value: "max",
    label: "max",
    color: "rainbow-animated"
  }];
  pNl = gNl, mNl = [62, 22, 118], cSm = [140, 80, 240], RIPPLE_RAMP = Array.from({
    length: 8
  }, (_unused, index) => {
    let ratio = index / 7,
      lerp = channel => Math.round(mNl[channel] + (cSm[channel] - mNl[channel]) * ratio);
    return `rgb(${lerp(0)},${lerp(1)},${lerp(2)})`;
  }), Cxo = RIPPLE_RAMP.at(-1), WYn = Cxo;
});

export {TNl,getEffortHelpText,parseEffortArg as qTm,applyRemoteEffort as bxo,setEffortLevel as WTm,showCurrentEffort,clearEffortLevel as GTm,enableUltracode as VTm,executeEffort,CurrentEffortView as KTm,selectUltracode as zTm,selectEffortValue as jTm,applyEffortAndReport as Sxo,EffortArgPrompt as YTm,selectCacheMissAcked as JTm,selectArgEffortValue as XTm,computeLabelStarts as uNl,getSliderGeometry,EffortLevelLabel as ZTm,eSm,rippleDistance,rippleLevel,UltraRippleText,uSm,EffortSlider as dSm,call as pSm,Wgt,fNl,EJ,Ka as ReactHooks,qgt,cNl,yxo,Txo,QTm,gNl,tSm,nSm,qYn,rSm,oSm,sSm,dNl,ZGt,iSm,aSm,lSm,Exo,pNl,mNl,cSm,RIPPLE_RAMP,Cxo,WYn,Axo};

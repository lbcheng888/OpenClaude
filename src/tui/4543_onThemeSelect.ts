// @ts-nocheck
import {useTheme as ji,useThemeSetting as bve,usePreviewTheme as YEn,useCustomThemes as Eve} from "../../vendor/m2285.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {K1t,DXi,u0n} from "../config/3020_u0n.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {cvn,Q2} from "../../vendor/m2552.ts";
import {wu,$k} from "./2575_current.ts";
import {ao,br} from "../config/0745_updateSettingsForSource.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {J3,$Ue,she} from "../../vendor/m2272.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {gracefulShutdown as gi,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {hr} from "../../vendor/m2573.ts";
import {K$,Jqe} from "../../vendor/m3915.ts";
import {wae,Jot} from "../../vendor/m3021.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {TS} from "../../vendor/m4541.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * ThemePicker component (React-compiler-memoized).
 *
 * Renders the theme selection UI: intro/help text, a select list of built-in
 * and custom themes, a syntax-highlighting preview diff, and footer key hints.
 * Wires up live theme preview (set/save/cancel), the ctrl+t syntax-highlight
 * toggle and the ctrl+e "edit custom theme" shortcut.
 *
 * @param props - Theme picker props (onThemeSelect, showIntroText, helpText,
 *   showHelpTextBelow, hideEscToCancel, skipExitHandling, onCancel, onCustomTheme).
 */
function Gft(props) {
  let cache = mml.c(88),
    {
      onThemeSelect,
      showIntroText,
      helpText,
      showHelpTextBelow,
      hideEscToCancel,
      skipExitHandling,
      onCancel,
      onCustomTheme
    } = props,
    introTextOn = showIntroText === void 0 ? !1 : showIntroText,
    helpTextStr = helpText === void 0 ? "" : helpText,
    helpBelow = showHelpTextBelow === void 0 ? !1 : showHelpTextBelow,
    hideEsc = hideEscToCancel === void 0 ? !1 : hideEscToCancel,
    skipExit = skipExitHandling === void 0 ? !1 : skipExitHandling,
    [themeName] = ji(),
    defaultThemeValue = bve(),
    {
      columns: terminalColumns
    } = _r(),
    syntaxDisabledSource;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) syntaxDisabledSource = K1t(), cache[0] = syntaxDisabledSource;else syntaxDisabledSource = cache[0];
  let syntaxSource = syntaxDisabledSource,
    syntaxThemeInfoRaw;
  if (cache[1] !== themeName) syntaxThemeInfoRaw = syntaxSource === null ? DXi(themeName) : null, cache[1] = themeName, cache[2] = syntaxThemeInfoRaw;else syntaxThemeInfoRaw = cache[2];
  let syntaxThemeInfo = syntaxThemeInfoRaw,
    {
      setPreviewTheme,
      savePreview,
      cancelPreview
    } = YEn(),
    syntaxHighlightingDisabled = _t(WJp) ?? !1,
    updateConfigSnapshot = bo();
  cvn("ThemePicker");
  let toggleSyntaxKeyName = wu("theme:toggleSyntaxHighlighting", "ThemePicker", "ctrl+t"),
    onToggleSyntaxHighlighting;
  if (cache[3] !== updateConfigSnapshot || cache[4] !== syntaxHighlightingDisabled) onToggleSyntaxHighlighting = () => {
    if (syntaxSource === null) {
      let nextDisabled = !syntaxHighlightingDisabled;
      ao("userSettings", {
        syntaxHighlightingDisabled: nextDisabled
      }), updateConfigSnapshot(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          syntaxHighlightingDisabled: nextDisabled
        }
      }));
    }
  }, cache[3] = updateConfigSnapshot, cache[4] = syntaxHighlightingDisabled, cache[5] = onToggleSyntaxHighlighting;else onToggleSyntaxHighlighting = cache[5];
  let toggleSyntaxOptions;
  if (cache[6] === Symbol.for("react.memo_cache_sentinel")) toggleSyntaxOptions = {
    context: "ThemePicker"
  }, cache[6] = toggleSyntaxOptions;else toggleSyntaxOptions = cache[6];
  Or("theme:toggleSyntaxHighlighting", onToggleSyntaxHighlighting, toggleSyntaxOptions);
  let exitState = Df(skipExit ? qJp : void 0),
    {
      customThemes
    } = Eve(),
    [selectedThemeValue, setSelectedThemeValue] = fml.useState(defaultThemeValue),
    customThemeSlug;
  if (cache[7] !== selectedThemeValue) customThemeSlug = J3(selectedThemeValue), cache[7] = selectedThemeValue, cache[8] = customThemeSlug;else customThemeSlug = cache[8];
  let selectedCustomSlug = customThemeSlug,
    matchedCustomTheme;
  if (cache[9] !== customThemes || cache[10] !== selectedCustomSlug) matchedCustomTheme = selectedCustomSlug ? customThemes.find(theme => theme.slug === selectedCustomSlug) : void 0, cache[9] = customThemes, cache[10] = selectedCustomSlug, cache[11] = matchedCustomTheme;else matchedCustomTheme = cache[11];
  let selectedCustomTheme = matchedCustomTheme,
    editCustomKeyName = wu("theme:editCustom", "ThemePicker", "ctrl+e"),
    onEditCustomTheme;
  if (cache[12] !== selectedCustomTheme || cache[13] !== onCustomTheme || cache[14] !== savePreview) onEditCustomTheme = () => {
    if (selectedCustomTheme && onCustomTheme) savePreview(), onCustomTheme(selectedCustomTheme);
  }, cache[12] = selectedCustomTheme, cache[13] = onCustomTheme, cache[14] = savePreview, cache[15] = onEditCustomTheme;else onEditCustomTheme = cache[15];
  let editCustomOptions;
  if (cache[16] === Symbol.for("react.memo_cache_sentinel")) editCustomOptions = {
    context: "ThemePicker"
  }, cache[16] = editCustomOptions;else editCustomOptions = cache[16];
  Or("theme:editCustom", onEditCustomTheme, editCustomOptions);
  let optAuto, optDark, optLight, optDarkDaltonized, optLightDaltonized, optDarkAnsi, optLightAnsi;
  if (cache[17] === Symbol.for("react.memo_cache_sentinel")) optAuto = {
    label: "Auto (match terminal)",
    value: "auto"
  }, optDark = {
    label: "Dark mode",
    value: "dark"
  }, optLight = {
    label: "Light mode",
    value: "light"
  }, optDarkDaltonized = {
    label: "Dark mode (colorblind-friendly)",
    value: "dark-daltonized"
  }, optLightDaltonized = {
    label: "Light mode (colorblind-friendly)",
    value: "light-daltonized"
  }, optDarkAnsi = {
    label: "Dark mode (ANSI colors only)",
    value: "dark-ansi"
  }, optLightAnsi = {
    label: "Light mode (ANSI colors only)",
    value: "light-ansi"
  }, cache[17] = optAuto, cache[18] = optDark, cache[19] = optLight, cache[20] = optDarkDaltonized, cache[21] = optLightDaltonized, cache[22] = optDarkAnsi, cache[23] = optLightAnsi;else optAuto = cache[17], optDark = cache[18], optLight = cache[19], optDarkDaltonized = cache[20], optLightDaltonized = cache[21], optDarkAnsi = cache[22], optLightAnsi = cache[23];
  let themeOptions;
  if (cache[24] !== customThemes || cache[25] !== onCustomTheme) {
    let newCustomOption;
    if (cache[27] !== onCustomTheme) newCustomOption = onCustomTheme ? [{
      label: "New custom theme…",
      value: xAo
    }] : [], cache[27] = onCustomTheme, cache[28] = newCustomOption;else newCustomOption = cache[28];
    themeOptions = [optAuto, optDark, optLight, optDarkDaltonized, optLightDaltonized, optDarkAnsi, optLightAnsi, ...customThemes.map($Jp), ...newCustomOption], cache[24] = customThemes, cache[25] = onCustomTheme, cache[26] = themeOptions;
  } else themeOptions = cache[26];
  let options = themeOptions,
    headerEl;
  if (cache[29] !== introTextOn) headerEl = introTextOn ? SS.jsx(v, {
    children: "Let's get started."
  }) : SS.jsx(v, {
    bold: !0,
    color: "permission",
    children: "Theme"
  }), cache[29] = introTextOn, cache[30] = headerEl;else headerEl = cache[30];
  let promptEl;
  if (cache[31] === Symbol.for("react.memo_cache_sentinel")) promptEl = SS.jsx(v, {
    bold: !0,
    children: "Choose the text style that looks best with your terminal"
  }), cache[31] = promptEl;else promptEl = cache[31];
  let helpTextEl;
  if (cache[32] !== helpTextStr || cache[33] !== helpBelow) helpTextEl = helpTextStr && !helpBelow && SS.jsx(v, {
    dimColor: !0,
    children: helpTextStr
  }), cache[32] = helpTextStr, cache[33] = helpBelow, cache[34] = helpTextEl;else helpTextEl = cache[34];
  let promptBlockEl;
  if (cache[35] !== helpTextEl) promptBlockEl = SS.jsxs($, {
    flexDirection: "column",
    children: [promptEl, helpTextEl]
  }), cache[35] = helpTextEl, cache[36] = promptBlockEl;else promptBlockEl = cache[36];
  let onThemeFocus;
  if (cache[37] !== cancelPreview || cache[38] !== setPreviewTheme) onThemeFocus = value => {
    if (setSelectedThemeValue(value), value === xAo) cancelPreview();else setPreviewTheme(value);
  }, cache[37] = cancelPreview, cache[38] = setPreviewTheme, cache[39] = onThemeFocus;else onThemeFocus = cache[39];
  let onThemeChange;
  if (cache[40] !== cancelPreview || cache[41] !== onCustomTheme || cache[42] !== onThemeSelect || cache[43] !== savePreview) onThemeChange = value => {
    if (value === xAo) {
      cancelPreview(), onCustomTheme?.(void 0);
      return;
    }
    savePreview(), onThemeSelect(value);
  }, cache[40] = cancelPreview, cache[41] = onCustomTheme, cache[42] = onThemeSelect, cache[43] = savePreview, cache[44] = onThemeChange;else onThemeChange = cache[44];
  let onThemeCancel;
  if (cache[45] !== cancelPreview || cache[46] !== onCancel || cache[47] !== skipExit) onThemeCancel = skipExit ? () => {
    cancelPreview(), onCancel?.();
  } : async () => {
    cancelPreview(), await gi(0);
  }, cache[45] = cancelPreview, cache[46] = onCancel, cache[47] = skipExit, cache[48] = onThemeCancel;else onThemeCancel = cache[48];
  let visibleOptionCount = Math.min(options.length, 12),
    selectEl;
  if (cache[49] !== onThemeFocus || cache[50] !== onThemeChange || cache[51] !== onThemeCancel || cache[52] !== visibleOptionCount || cache[53] !== options || cache[54] !== defaultThemeValue) selectEl = SS.jsx(hr, {
    options: options,
    onFocus: onThemeFocus,
    onChange: onThemeChange,
    onCancel: onThemeCancel,
    visibleOptionCount: visibleOptionCount,
    defaultValue: defaultThemeValue,
    defaultFocusValue: defaultThemeValue
  }), cache[49] = onThemeFocus, cache[50] = onThemeChange, cache[51] = onThemeCancel, cache[52] = visibleOptionCount, cache[53] = options, cache[54] = defaultThemeValue, cache[55] = selectEl;else selectEl = cache[55];
  let selectorBlockEl;
  if (cache[56] !== headerEl || cache[57] !== promptBlockEl || cache[58] !== selectEl) selectorBlockEl = SS.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [headerEl, promptBlockEl, selectEl]
  }), cache[56] = headerEl, cache[57] = promptBlockEl, cache[58] = selectEl, cache[59] = selectorBlockEl;else selectorBlockEl = cache[59];
  let previewPatch;
  if (cache[60] === Symbol.for("react.memo_cache_sentinel")) previewPatch = {
    oldStart: 1,
    newStart: 1,
    oldLines: 3,
    newLines: 3,
    lines: [" function greet() {", '-  console.log("Hello, World!");', '+  console.log("Hello, Claude!");', " }"]
  }, cache[60] = previewPatch;else previewPatch = cache[60];
  let previewDiffEl;
  if (cache[61] !== terminalColumns) previewDiffEl = SS.jsx(K$, {
    paddingX: 0,
    children: SS.jsx(wae, {
      patch: previewPatch,
      dim: !1,
      filePath: "demo.js",
      firstLine: null,
      width: terminalColumns
    })
  }), cache[61] = terminalColumns, cache[62] = previewDiffEl;else previewDiffEl = cache[62];
  let syntaxStatusText = syntaxSource === "env" ? `Syntax highlighting disabled (via CLAUDE_CODE_SYNTAX_HIGHLIGHT=${process.env.CLAUDE_CODE_SYNTAX_HIGHLIGHT})` : syntaxHighlightingDisabled ? `Syntax highlighting disabled (${toggleSyntaxKeyName} to enable)` : syntaxThemeInfo ? `Syntax theme: ${syntaxThemeInfo.theme}${syntaxThemeInfo.source ? ` (from ${syntaxThemeInfo.source})` : ""} (${toggleSyntaxKeyName} to disable)` : `Syntax highlighting enabled (${toggleSyntaxKeyName} to disable)`,
    syntaxStatusEl;
  if (cache[63] !== syntaxStatusText) syntaxStatusEl = SS.jsxs(v, {
    dimColor: !0,
    children: [" ", syntaxStatusText]
  }), cache[63] = syntaxStatusText, cache[64] = syntaxStatusEl;else syntaxStatusEl = cache[64];
  let previewBlockEl;
  if (cache[65] !== previewDiffEl || cache[66] !== syntaxStatusEl) previewBlockEl = SS.jsxs($, {
    flexDirection: "column",
    width: "100%",
    children: [previewDiffEl, syntaxStatusEl]
  }), cache[65] = previewDiffEl, cache[66] = syntaxStatusEl, cache[67] = previewBlockEl;else previewBlockEl = cache[67];
  let bodyEl;
  if (cache[68] !== selectorBlockEl || cache[69] !== previewBlockEl) bodyEl = SS.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [selectorBlockEl, previewBlockEl]
  }), cache[68] = selectorBlockEl, cache[69] = previewBlockEl, cache[70] = bodyEl;else bodyEl = cache[70];
  let content = bodyEl;
  if (!introTextOn) {
    let bodyWrapperEl;
    if (cache[71] !== content) bodyWrapperEl = SS.jsx($, {
      flexDirection: "column",
      children: content
    }), cache[71] = content, cache[72] = bodyWrapperEl;else bodyWrapperEl = cache[72];
    let helpBelowEl;
    if (cache[73] !== helpTextStr || cache[74] !== helpBelow) helpBelowEl = helpBelow && helpTextStr && SS.jsx($, {
      marginLeft: 3,
      children: SS.jsx(v, {
        dimColor: !0,
        children: helpTextStr
      })
    }), cache[73] = helpTextStr, cache[74] = helpBelow, cache[75] = helpBelowEl;else helpBelowEl = cache[75];
    let keyHintsEl;
    if (cache[76] !== editCustomKeyName || cache[77] !== exitState || cache[78] !== selectedCustomTheme || cache[79] !== hideEsc || cache[80] !== onCustomTheme) keyHintsEl = !hideEsc && SS.jsx($, {
      children: SS.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: exitState.pending ? SS.jsxs(SS.Fragment, {
          children: ["Press ", exitState.keyName, " again to exit"]
        }) : SS.jsxs(bn, {
          children: [SS.jsx(at, {
            chord: "enter",
            action: "select"
          }), selectedCustomTheme && onCustomTheme && SS.jsx(at, {
            chord: editCustomKeyName,
            action: "edit"
          }), SS.jsx(at, {
            chord: "escape",
            action: "cancel"
          })]
        })
      })
    }), cache[76] = editCustomKeyName, cache[77] = exitState, cache[78] = selectedCustomTheme, cache[79] = hideEsc, cache[80] = onCustomTheme, cache[81] = keyHintsEl;else keyHintsEl = cache[81];
    let footerEl;
    if (cache[82] !== helpBelowEl || cache[83] !== keyHintsEl) footerEl = SS.jsxs($, {
      marginTop: 1,
      children: [helpBelowEl, keyHintsEl]
    }), cache[82] = helpBelowEl, cache[83] = keyHintsEl, cache[84] = footerEl;else footerEl = cache[84];
    let fragmentEl;
    if (cache[85] !== bodyWrapperEl || cache[86] !== footerEl) fragmentEl = SS.jsxs(SS.Fragment, {
      children: [bodyWrapperEl, footerEl]
    }), cache[85] = bodyWrapperEl, cache[86] = footerEl, cache[87] = fragmentEl;else fragmentEl = cache[87];
    return fragmentEl;
  }
  return content;
}
/** Maps a custom theme record to a select-list option (label + encoded value). */
function $Jp(theme) {
  return {
    label: theme.source === "user" ? `${theme.name} (custom)` : `${theme.name} (from ${theme.source.plugin})`,
    value: $Ue(theme.slug)
  };
}
/** No-op exit handler used when skipExitHandling is set. */
function qJp() {}
/** Config selector: reads whether syntax highlighting is disabled. */
function WJp(config) {
  return config.settings.syntaxHighlightingDisabled;
}
var mml,
  fml,
  SS,
  xAo = "__new_custom_theme__";
var FVn = b(() => {
  TI();
  ui();
  je();
  Q2();
  ss();
  $k();
  uo();
  she();
  Np();
  br();
  TS();
  Is();
  Jqe();
  Wo();
  u0n();
  Jot();
  mml = x(tt(), 1), fml = x(et(), 1), SS = x(oe(), 1);
});

export {Gft,$Jp,qJp,WJp,mml,fml,SS,xAo,FVn};

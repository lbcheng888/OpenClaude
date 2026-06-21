// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {saveCurrentProjectConfig as vv,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Link as Fs} from "../../vendor/m2427.ts";
import {ac as sc,e_ as n_} from "../../vendor/m3338.ts";
import {Kn as Vn,Li as Di} from "../../vendor/m2572.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var moduleExports = {};
pt(moduleExports, {
  recordExternalIncludesDecision: () => recordExternalIncludesDecision,
  ClaudeMdExternalIncludesDialog: () => ClaudeMdExternalIncludesDialog
});
function recordExternalIncludesDecision(approved, source) {
  vv(n => ({
    ...n,
    hasClaudeMdExternalIncludesApproved: approved,
    hasClaudeMdExternalIncludesWarningShown: true
  })), j(approved ? "tengu_claude_md_external_includes_dialog_accepted" : "tengu_claude_md_external_includes_dialog_declined", {
    source: Ue(source)
  });
}
function ClaudeMdExternalIncludesDialog(props) {
  let $mc = reactCompilerRuntime.c(17),
    {
      onDone: onDone,
      isStandaloneDialog: isStandaloneDialog,
      externalIncludes: externalIncludes
    } = props,
    mountEffectDeps;
  if ($mc[0] === Symbol.for("react.memo_cache_sentinel")) mountEffectDeps = [], $mc[0] = mountEffectDeps;else mountEffectDeps = $mc[0];
  React.useEffect(emitDialogShownTelemetry, mountEffectDeps);
  let recordChoice;
  if ($mc[1] !== onDone) recordChoice = g => {
    recordExternalIncludesDecision(g === "yes", "dialog"), onDone();
  }, $mc[1] = onDone, $mc[2] = recordChoice;else recordChoice = $mc[2];
  let onChoice = recordChoice,
    cancel;
  if ($mc[3] !== onChoice) cancel = () => {
    onChoice("no");
  }, $mc[3] = onChoice, $mc[4] = cancel;else cancel = $mc[4];
  let onCancel = cancel,
    hideBorder = !isStandaloneDialog,
    hideInputGuide = !isStandaloneDialog,
    introText;
  if ($mc[5] === Symbol.for("react.memo_cache_sentinel")) introText = React.default.createElement(w, null, "This project's CLAUDE.md imports files outside the current working directory. Never allow this for third-party repositories."), $mc[5] = introText;else introText = $mc[5];
  let includesList;
  if ($mc[6] !== externalIncludes) includesList = externalIncludes && externalIncludes.length > 0 && React.default.createElement(B, {
    flexDirection: "column"
  }, React.default.createElement(w, {
    dimColor: true
  }, "External imports:"), externalIncludes.map(renderExternalIncludeRow)), $mc[6] = externalIncludes, $mc[7] = includesList;else includesList = $mc[7];
  let securityWarning;
  if ($mc[8] === Symbol.for("react.memo_cache_sentinel")) securityWarning = React.default.createElement(w, {
    dimColor: true
  }, "Important: Only use Claude Code with files you trust. Accessing untrusted files may pose security risks", " ", React.default.createElement(Fs, {
    url: "https://code.claude.com/docs/en/security"
  }), " "), $mc[8] = securityWarning;else securityWarning = $mc[8];
  let buttons;
  if ($mc[9] !== onChoice) buttons = React.default.createElement(sc, {
    confirmLabel: "Yes, allow external imports",
    cancelLabel: "No, disable external imports",
    onConfirm: () => onChoice("yes"),
    onCancel: () => onChoice("no")
  }), $mc[9] = onChoice, $mc[10] = buttons;else buttons = $mc[10];
  let dialog;
  if ($mc[11] !== onCancel || $mc[12] !== hideBorder || $mc[13] !== hideInputGuide || $mc[14] !== includesList || $mc[15] !== buttons) dialog = React.default.createElement(Vn, {
    title: "Allow external CLAUDE.md file imports?",
    color: "warning",
    onCancel: onCancel,
    hideBorder: hideBorder,
    hideInputGuide: hideInputGuide
  }, introText, includesList, securityWarning, buttons), $mc[11] = onCancel, $mc[12] = hideBorder, $mc[13] = hideInputGuide, $mc[14] = includesList, $mc[15] = buttons, $mc[16] = dialog;else dialog = $mc[16];
  return dialog;
}
function renderExternalIncludeRow(include, index) {
  return React.default.createElement(w, {
    key: index,
    dimColor: true
  }, "  ", include.path);
}
function emitDialogShownTelemetry() {
  j("tengu_claude_md_includes_dialog_shown", {});
}
var reactCompilerRuntime, React;
var w_o = b(() => {
  Ct();
  Je();
  nr();
  n_();
  Di();
  reactCompilerRuntime = L(nt(), 1), React = L(Te(), 1);
});

export {moduleExports as Oil,recordExternalIncludesDecision,ClaudeMdExternalIncludesDialog,renderExternalIncludeRow as _5p,emitDialogShownTelemetry as y5p,reactCompilerRuntime as Pil,React as hne,w_o as jyo};

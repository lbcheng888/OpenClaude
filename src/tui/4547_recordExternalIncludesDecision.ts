// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {saveCurrentProjectConfig as TE,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var Aml = {};
ft(Aml, {
  recordExternalIncludesDecision: () => recordExternalIncludesDecision,
  ClaudeMdExternalIncludesDialog: () => ClaudeMdExternalIncludesDialog
});
/**
 * Persists the user's decision on whether external CLAUDE.md imports are allowed,
 * then emits the corresponding accepted/declined telemetry event.
 * @param approved whether external includes were approved
 * @param source where the decision originated (used for telemetry)
 */
function recordExternalIncludesDecision(approved: boolean, source: unknown) {
  TE(prev => ({
    ...prev,
    hasClaudeMdExternalIncludesApproved: approved,
    hasClaudeMdExternalIncludesWarningShown: !0
  })), W(approved ? "tengu_claude_md_external_includes_dialog_accepted" : "tengu_claude_md_external_includes_dialog_declined", {
    source: Le(source)
  });
}
/**
 * Dialog prompting the user to allow or disable external CLAUDE.md file imports.
 * Uses the React Compiler memo cache for stable callbacks/elements.
 */
function ClaudeMdExternalIncludesDialog(props: {
  onDone: () => void;
  isStandaloneDialog: boolean;
  externalIncludes?: { path: string }[];
}) {
  let $mc = Eml.c(17),
    {
      onDone: onDone,
      isStandaloneDialog: isStandaloneDialog,
      externalIncludes: externalIncludes
    } = props,
    mountEffectDeps;
  if ($mc[0] === Symbol.for("react.memo_cache_sentinel")) mountEffectDeps = [], $mc[0] = mountEffectDeps;else mountEffectDeps = $mc[0];
  Cml.useEffect(emitDialogShownTelemetry, mountEffectDeps);
  let recordChoice;
  if ($mc[1] !== onDone) recordChoice = choice => {
    recordExternalIncludesDecision(choice === "yes", "dialog"), onDone();
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
  if ($mc[5] === Symbol.for("react.memo_cache_sentinel")) introText = iue.jsx(v, {
    children: "This project's CLAUDE.md imports files outside the current working directory. Never allow this for third-party repositories."
  }), $mc[5] = introText;else introText = $mc[5];
  let includesList;
  if ($mc[6] !== externalIncludes) includesList = externalIncludes && externalIncludes.length > 0 && iue.jsxs($, {
    flexDirection: "column",
    children: [iue.jsx(v, {
      dimColor: !0,
      children: "External imports:"
    }), externalIncludes.map(renderExternalIncludeRow)]
  }), $mc[6] = externalIncludes, $mc[7] = includesList;else includesList = $mc[7];
  let securityWarning;
  if ($mc[8] === Symbol.for("react.memo_cache_sentinel")) securityWarning = iue.jsxs(v, {
    dimColor: !0,
    children: ["Important: Only use Claude Code with files you trust. Accessing untrusted files may pose security risks", " ", iue.jsx(Ss, {
      url: "https://code.claude.com/docs/en/security"
    }), " "]
  }), $mc[8] = securityWarning;else securityWarning = $mc[8];
  let buttons;
  if ($mc[9] !== onChoice) buttons = iue.jsx(Bl, {
    confirmLabel: "Yes, allow external imports",
    cancelLabel: "No, disable external imports",
    onConfirm: () => onChoice("yes"),
    onCancel: () => onChoice("no")
  }), $mc[9] = onChoice, $mc[10] = buttons;else buttons = $mc[10];
  let dialog;
  if ($mc[11] !== onCancel || $mc[12] !== hideBorder || $mc[13] !== hideInputGuide || $mc[14] !== includesList || $mc[15] !== buttons) dialog = iue.jsxs(Jn, {
    title: "Allow external CLAUDE.md file imports?",
    color: "warning",
    onCancel: onCancel,
    hideBorder: hideBorder,
    hideInputGuide: hideInputGuide,
    children: [introText, includesList, securityWarning, buttons]
  }), $mc[11] = onCancel, $mc[12] = hideBorder, $mc[13] = hideInputGuide, $mc[14] = includesList, $mc[15] = buttons, $mc[16] = dialog;else dialog = $mc[16];
  return dialog;
}
/** Renders a single external-include path row. */
function renderExternalIncludeRow(include: { path: string }, index: number) {
  return iue.jsxs(v, {
    dimColor: !0,
    children: ["  ", include.path]
  }, index);
}
/** Emits telemetry indicating the includes dialog was shown. */
function emitDialogShownTelemetry() {
  W("tengu_claude_md_includes_dialog_shown", {});
}
var Eml, Cml, iue;
var NAo = b(() => {
  kt();
  je();
  tr();
  d_();
  di();
  Eml = x(tt(), 1), Cml = x(et(), 1), iue = x(oe(), 1);
});

export {Aml,recordExternalIncludesDecision,ClaudeMdExternalIncludesDialog,renderExternalIncludeRow as ZJp,emitDialogShownTelemetry as eXp,Eml,Cml,iue,NAo};

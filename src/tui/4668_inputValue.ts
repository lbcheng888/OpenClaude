// @ts-nocheck
import {K5n as i5n,$So as MTo} from "../../vendor/m4666.ts";
import {q0e as C0e,hqt as K4t,hS as cS} from "../config/4438_source.ts";
import {react as Fh,W6 as D6} from "../../vendor/m4434.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {sye as $_e,CDe as iDe} from "../../vendor/m4665.ts";
import {loadAllPlugins as IC,gg as mg} from "../agent/4445_resolvePluginRoot.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {Se,_o,bt as St} from "../../vendor/m195.ts";
import {jie as Die,HAe as dAe} from "../../vendor/m2596.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Pa,rh} from "../../vendor/m2539.ts";
import {tp as op,_x as fx} from "./3835_mode.ts";
import {nl as Za,v_ as C_} from "../../vendor/m2573.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {lr as ur,readRoster as Ec} from "../../vendor/m2547.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function AddMarketplaceInput(props) {
  let $_2 = compilerRuntime.c(41),
    {
      inputValue: inputValue,
      setInputValue: setInputValue,
      cursorOffset: cursorOffset,
      setCursorOffset: setCursorOffset,
      error: error,
      setError: setError,
      result: result,
      setResult: setResult,
      setViewState: setViewState,
      onAddComplete: onAddComplete,
      cliMode: cliMode
    } = props,
    isCliMode = cliMode === undefined ? false : cliMode,
    hasAutoSubmitted = ReactHooks.useRef(false),
    [isSubmitting, setIsSubmitting] = ReactHooks.useState(false),
    [progressMessage, setProgressMessage] = ReactHooks.useState(""),
    handleSubmitMemo;
  if ($_2[0] !== isCliMode || $_2[1] !== inputValue || $_2[2] !== onAddComplete || $_2[3] !== setError || $_2[4] !== setResult || $_2[5] !== setViewState) handleSubmitMemo = async () => {
    let K = inputValue.trim();
    if (!K) {
      setError("Please enter a marketplace source");
      return;
    }
    let Q = await i5n(K);
    if (!Q) {
      setError("Invalid marketplace source format. Try: owner/repo, https://..., or ./path");
      return;
    }
    if ("error" in Q) {
      setError(Q.error);
      return;
    }
    setError(null);
    try {
      setIsSubmitting(true), setProgressMessage("");
      let {
        name: V,
        resolvedSource: Y
      } = await C0e(Q, te => {
        setProgressMessage(te);
      });
      K4t(V, {
        source: Y
      }), Fh();
      let J = Q.source;
      if (Q.source === "github") J = Q.repo;
      j("tengu_marketplace_added", {
        source_type: J
      });
      let ee = [];
      try {
        ee = (await $_e((await IC()).errors)).installed;
      } catch (te) {
        v(`marketplace add: dep auto-resolve skipped: ${Se(te)}`, {
          level: "warn"
        });
      }
      if (ee.length > 0) Fh();
      if (await onAddComplete(), setProgressMessage(""), setIsSubmitting(false), isCliMode) setResult(`Successfully added marketplace: ${V}${Die(ee)}`);else setViewState({
        type: "browse-marketplace",
        targetMarketplace: V
      });
    } catch (V) {
      let J = _o(V);
      if (v(`marketplace add failed: ${Se(J)}`, {
        level: "error"
      }), setError(J.message), setProgressMessage(""), setIsSubmitting(false), isCliMode) setResult(`Error: ${J.message}`);else setResult(null);
    }
  }, $_2[0] = isCliMode, $_2[1] = inputValue, $_2[2] = onAddComplete, $_2[3] = setError, $_2[4] = setResult, $_2[5] = setViewState, $_2[6] = handleSubmitMemo;else handleSubmitMemo = $_2[6];
  let handleSubmit = handleSubmitMemo,
    autoSubmitEffect;
  if ($_2[7] !== error || $_2[8] !== handleSubmit || $_2[9] !== inputValue || $_2[10] !== result) autoSubmitEffect = () => {
    if (inputValue && !hasAutoSubmitted.current && !error && !result) hasAutoSubmitted.current = true, handleSubmit();
  }, $_2[7] = error, $_2[8] = handleSubmit, $_2[9] = inputValue, $_2[10] = result, $_2[11] = autoSubmitEffect;else autoSubmitEffect = $_2[11];
  let emptyDeps;
  if ($_2[12] === Symbol.for("react.memo_cache_sentinel")) emptyDeps = [], $_2[12] = emptyDeps;else emptyDeps = $_2[12];
  ReactHooks.useEffect(autoSubmitEffect, emptyDeps);
  let header;
  if ($_2[13] === Symbol.for("react.memo_cache_sentinel")) header = kd.createElement(B, {
    marginBottom: 1
  }, kd.createElement(w, {
    bold: true
  }, "Add Marketplace")), $_2[13] = header;else header = $_2[13];
  let httpsExample, pathExample, promptLine, examplesLabel, repoExample, sshExample;
  if ($_2[14] === Symbol.for("react.memo_cache_sentinel")) promptLine = kd.createElement(w, null, "Enter marketplace source:"), examplesLabel = kd.createElement(w, {
    dimColor: true
  }, "Examples:"), repoExample = kd.createElement(w, {
    dimColor: true
  }, " \xB7 owner/repo (GitHub)"), sshExample = kd.createElement(w, {
    dimColor: true
  }, " \xB7 git@github.com:owner/repo.git (SSH)"), httpsExample = kd.createElement(w, {
    dimColor: true
  }, " \xB7 https://example.com/marketplace.json"), pathExample = kd.createElement(w, {
    dimColor: true
  }, " \xB7 ./path/to/marketplace"), $_2[14] = httpsExample, $_2[15] = pathExample, $_2[16] = promptLine, $_2[17] = examplesLabel, $_2[18] = repoExample, $_2[19] = sshExample;else httpsExample = $_2[14], pathExample = $_2[15], promptLine = $_2[16], examplesLabel = $_2[17], repoExample = $_2[18], sshExample = $_2[19];
  let inputSection;
  if ($_2[20] !== cursorOffset || $_2[21] !== handleSubmit || $_2[22] !== inputValue || $_2[23] !== setCursorOffset || $_2[24] !== setInputValue) inputSection = kd.createElement(B, {
    flexDirection: "column"
  }, promptLine, examplesLabel, repoExample, sshExample, httpsExample, pathExample, kd.createElement(B, {
    marginTop: 1
  }, kd.createElement(Pa, {
    value: inputValue,
    onChange: setInputValue,
    onSubmit: handleSubmit,
    columns: 80,
    cursorOffset: cursorOffset,
    onChangeCursorOffset: setCursorOffset,
    focus: true,
    showCursor: true
  }))), $_2[20] = cursorOffset, $_2[21] = handleSubmit, $_2[22] = inputValue, $_2[23] = setCursorOffset, $_2[24] = setInputValue, $_2[25] = inputSection;else inputSection = $_2[25];
  let submittingSection;
  if ($_2[26] !== isSubmitting || $_2[27] !== progressMessage) submittingSection = isSubmitting && kd.createElement(B, {
    marginTop: 1
  }, kd.createElement(op, null), kd.createElement(w, null, progressMessage || "Adding marketplace to configuration\u2026")), $_2[26] = isSubmitting, $_2[27] = progressMessage, $_2[28] = submittingSection;else submittingSection = $_2[28];
  let errorSection;
  if ($_2[29] !== error) errorSection = error && kd.createElement(B, {
    marginTop: 1
  }, kd.createElement(Za, {
    error: error
  })), $_2[29] = error, $_2[30] = errorSection;else errorSection = $_2[30];
  let resultSection;
  if ($_2[31] !== result) resultSection = result && kd.createElement(B, {
    marginTop: 1
  }, kd.createElement(w, null, result)), $_2[31] = result, $_2[32] = resultSection;else resultSection = $_2[32];
  let panel;
  if ($_2[33] !== inputSection || $_2[34] !== submittingSection || $_2[35] !== errorSection || $_2[36] !== resultSection) panel = kd.createElement(B, {
    flexDirection: "column",
    paddingX: 1,
    borderStyle: "round"
  }, header, inputSection, submittingSection, errorSection, resultSection), $_2[33] = inputSection, $_2[34] = submittingSection, $_2[35] = errorSection, $_2[36] = resultSection, $_2[37] = panel;else panel = $_2[37];
  let footerHints;
  if ($_2[38] === Symbol.for("react.memo_cache_sentinel")) footerHints = kd.createElement(B, {
    marginLeft: 3
  }, kd.createElement(w, {
    dimColor: true,
    italic: true
  }, kd.createElement(hn, null, kd.createElement(lt, {
    chord: "enter",
    action: "add"
  }), kd.createElement(ur, {
    action: "confirm:no",
    context: "Settings",
    fallback: "Esc",
    description: "cancel"
  })))), $_2[38] = footerHints;else footerHints = $_2[38];
  let root;
  if ($_2[39] !== panel) root = kd.createElement(B, {
    flexDirection: "column"
  }, panel, footerHints), $_2[39] = panel, $_2[40] = root;else root = $_2[40];
  return root;
}
var compilerRuntime, kd, ReactHooks;
var Kdl = b(() => {
  Ct();
  Ec();
  qs();
  C_();
  ts();
  fx();
  rh();
  Je();
  je();
  St();
  D6();
  dAe();
  cS();
  iDe();
  MTo();
  mg();
  compilerRuntime = L(nt(), 1), kd = L(Te(), 1), ReactHooks = L(Te(), 1);
});

export {AddMarketplaceInput as fml,compilerRuntime as mml,kd as wd,ReactHooks as Mje,Kdl as Aml};

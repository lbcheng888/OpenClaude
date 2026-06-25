// @ts-nocheck
import {I7n,two} from "../../vendor/m4695.ts";
import {FDe,q5t,dS} from "../config/4460_source.ts";
import {zh,c6} from "../../vendor/m4456.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {ITe,bPe} from "../../vendor/m4694.ts";
import {loadAllPlugins as BC,path as Eg} from "../agent/4467_resolvePluginRoot.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ce,mo,Ct} from "../../vendor/m197.ts";
import {Uie,Whe} from "../../vendor/m2607.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {gd,xw} from "./3853_mode.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * AddMarketplaceInput — TUI panel that prompts for a marketplace source,
 * validates/resolves it, installs it, auto-resolves dependencies, and reports
 * the outcome (either as a CLI result string or by switching the view state).
 *
 * React-compiler-output module: `compilerRuntime.c(41)` is the memo cache; the
 * `$_2[n]` slots are compiler-managed memoization, not hand-written logic.
 */
function AddMarketplaceInput(props) {
  let $_2 = rbl.c(41),
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
    isCliMode = cliMode === void 0 ? !1 : cliMode,
    hasAutoSubmitted = fWe.useRef(!1),
    [isSubmitting, setIsSubmitting] = fWe.useState(!1),
    [progressMessage, setProgressMessage] = fWe.useState(""),
    handleSubmitMemo;
  if ($_2[0] !== isCliMode || $_2[1] !== inputValue || $_2[2] !== onAddComplete || $_2[3] !== setError || $_2[4] !== setResult || $_2[5] !== setViewState) handleSubmitMemo = async () => {
    let trimmedInput = inputValue.trim();
    if (!trimmedInput) {
      setError("Please enter a marketplace source");
      return;
    }
    let parsedSource = await I7n(trimmedInput);
    if (!parsedSource) {
      setError("Invalid marketplace source format. Try: owner/repo, https://..., or ./path");
      return;
    }
    if ("error" in parsedSource) {
      setError(parsedSource.error);
      return;
    }
    setError(null);
    try {
      setIsSubmitting(!0), setProgressMessage("");
      let {
        name: marketplaceName,
        resolvedSource: resolvedSource
      } = await FDe(parsedSource, progress => {
        setProgressMessage(progress);
      });
      q5t(marketplaceName, {
        source: resolvedSource
      }), zh();
      let sourceType = parsedSource.source;
      if (parsedSource.source === "github") sourceType = parsedSource.repo;
      W("tengu_marketplace_added", {
        source_type: sourceType
      });
      let installedDeps = [];
      try {
        installedDeps = (await ITe((await BC()).errors)).installed;
      } catch (depError) {
        A(`marketplace add: dep auto-resolve skipped: ${Ce(depError)}`, {
          level: "warn"
        });
      }
      if (installedDeps.length > 0) zh();
      if (await onAddComplete(), setProgressMessage(""), setIsSubmitting(!1), isCliMode) setResult(`Successfully added marketplace: ${marketplaceName}${Uie(installedDeps)}`);else setViewState({
        type: "browse-marketplace",
        targetMarketplace: marketplaceName
      });
    } catch (caught) {
      let normalizedError = mo(caught);
      if (A(`marketplace add failed: ${Ce(normalizedError)}`, {
        level: "error"
      }), setError(normalizedError.message), setProgressMessage(""), setIsSubmitting(!1), isCliMode) setResult(`Error: ${normalizedError.message}`);else setResult(null);
    }
  }, $_2[0] = isCliMode, $_2[1] = inputValue, $_2[2] = onAddComplete, $_2[3] = setError, $_2[4] = setResult, $_2[5] = setViewState, $_2[6] = handleSubmitMemo;else handleSubmitMemo = $_2[6];
  let handleSubmit = handleSubmitMemo,
    autoSubmitEffect;
  if ($_2[7] !== error || $_2[8] !== handleSubmit || $_2[9] !== inputValue || $_2[10] !== result) autoSubmitEffect = () => {
    if (inputValue && !hasAutoSubmitted.current && !error && !result) hasAutoSubmitted.current = !0, handleSubmit();
  }, $_2[7] = error, $_2[8] = handleSubmit, $_2[9] = inputValue, $_2[10] = result, $_2[11] = autoSubmitEffect;else autoSubmitEffect = $_2[11];
  let emptyDeps;
  if ($_2[12] === Symbol.for("react.memo_cache_sentinel")) emptyDeps = [], $_2[12] = emptyDeps;else emptyDeps = $_2[12];
  fWe.useEffect(autoSubmitEffect, emptyDeps);
  let header;
  if ($_2[13] === Symbol.for("react.memo_cache_sentinel")) header = GE.jsx($, {
    marginBottom: 1,
    children: GE.jsx(v, {
      bold: !0,
      children: "Add Marketplace"
    })
  }), $_2[13] = header;else header = $_2[13];
  let httpsExample, pathExample, promptLine, examplesLabel, repoExample, sshExample;
  if ($_2[14] === Symbol.for("react.memo_cache_sentinel")) promptLine = GE.jsx(v, {
    children: "Enter marketplace source:"
  }), examplesLabel = GE.jsx(v, {
    dimColor: !0,
    children: "Examples:"
  }), repoExample = GE.jsx(v, {
    dimColor: !0,
    children: " \xB7 owner/repo (GitHub)"
  }), sshExample = GE.jsx(v, {
    dimColor: !0,
    children: " \xB7 git@github.com:owner/repo.git (SSH)"
  }), httpsExample = GE.jsx(v, {
    dimColor: !0,
    children: " \xB7 https://example.com/marketplace.json"
  }), pathExample = GE.jsx(v, {
    dimColor: !0,
    children: " \xB7 ./path/to/marketplace"
  }), $_2[14] = httpsExample, $_2[15] = pathExample, $_2[16] = promptLine, $_2[17] = examplesLabel, $_2[18] = repoExample, $_2[19] = sshExample;else httpsExample = $_2[14], pathExample = $_2[15], promptLine = $_2[16], examplesLabel = $_2[17], repoExample = $_2[18], sshExample = $_2[19];
  let inputSection;
  if ($_2[20] !== cursorOffset || $_2[21] !== handleSubmit || $_2[22] !== inputValue || $_2[23] !== setCursorOffset || $_2[24] !== setInputValue) inputSection = GE.jsxs($, {
    flexDirection: "column",
    children: [promptLine, examplesLabel, repoExample, sshExample, httpsExample, pathExample, GE.jsx($, {
      marginTop: 1,
      children: GE.jsx(ga, {
        value: inputValue,
        onChange: setInputValue,
        onSubmit: handleSubmit,
        columns: 80,
        cursorOffset: cursorOffset,
        onChangeCursorOffset: setCursorOffset,
        focus: !0,
        showCursor: !0
      })
    })]
  }), $_2[20] = cursorOffset, $_2[21] = handleSubmit, $_2[22] = inputValue, $_2[23] = setCursorOffset, $_2[24] = setInputValue, $_2[25] = inputSection;else inputSection = $_2[25];
  let submittingSection;
  if ($_2[26] !== isSubmitting || $_2[27] !== progressMessage) submittingSection = isSubmitting && GE.jsxs($, {
    marginTop: 1,
    children: [GE.jsx(gd, {}), GE.jsx(v, {
      children: progressMessage || "Adding marketplace to configuration…"
    })]
  }), $_2[26] = isSubmitting, $_2[27] = progressMessage, $_2[28] = submittingSection;else submittingSection = $_2[28];
  let errorSection;
  if ($_2[29] !== error) errorSection = error && GE.jsx($, {
    marginTop: 1,
    children: GE.jsx(Ba, {
      error: error
    })
  }), $_2[29] = error, $_2[30] = errorSection;else errorSection = $_2[30];
  let resultSection;
  if ($_2[31] !== result) resultSection = result && GE.jsx($, {
    marginTop: 1,
    children: GE.jsx(v, {
      children: result
    })
  }), $_2[31] = result, $_2[32] = resultSection;else resultSection = $_2[32];
  let panel;
  if ($_2[33] !== inputSection || $_2[34] !== submittingSection || $_2[35] !== errorSection || $_2[36] !== resultSection) panel = GE.jsxs($, {
    flexDirection: "column",
    paddingX: 1,
    borderStyle: "round",
    children: [header, inputSection, submittingSection, errorSection, resultSection]
  }), $_2[33] = inputSection, $_2[34] = submittingSection, $_2[35] = errorSection, $_2[36] = resultSection, $_2[37] = panel;else panel = $_2[37];
  let footerHints;
  if ($_2[38] === Symbol.for("react.memo_cache_sentinel")) footerHints = GE.jsx($, {
    marginLeft: 3,
    children: GE.jsx(v, {
      dimColor: !0,
      italic: !0,
      children: GE.jsxs(bn, {
        children: [GE.jsx(at, {
          chord: "enter",
          action: "add"
        }), GE.jsx(dr, {
          action: "confirm:no",
          context: "Settings",
          fallback: "Esc",
          description: "cancel"
        })]
      })
    })
  }), $_2[38] = footerHints;else footerHints = $_2[38];
  let root;
  if ($_2[39] !== panel) root = GE.jsxs($, {
    flexDirection: "column",
    children: [panel, footerHints]
  }), $_2[39] = panel, $_2[40] = root;else root = $_2[40];
  return root;
}
var rbl, fWe, GE;
var sbl = b(() => {
  kt();
  uc();
  Is();
  I_();
  Wo();
  xw();
  rh();
  je();
  qe();
  Ct();
  c6();
  Whe();
  dS();
  bPe();
  two();
  Eg();
  rbl = x(tt(), 1), fWe = x(et(), 1), GE = x(oe(), 1);
});
export {AddMarketplaceInput as obl,rbl,fWe,GE,sbl};

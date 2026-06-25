// @ts-nocheck
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {Dy,getSettingsSchema as ZS,SE} from "../../vendor/m2559.ts";
import {hZ,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {FO,uj} from "../../vendor/m2812.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Background-work exit prompt component.
 *
 * Renders the "Background work is running" confirmation dialog shown when the
 * user tries to leave while background tasks are still active. Offers "Exit
 * anyway" / "Stay" choices and reports the decision via telemetry.
 *
 * Compiled by the React Compiler: the leading `OMl.c(42)` call allocates a
 * 42-slot memoization cache (`cache`) and every `cache[i] !== x` guard is the
 * compiler's change-detection bookkeeping. Structure is preserved verbatim.
 */
interface BackgroundWorkItem {
  /** Display label for the running background task. */
  label: string;
  /** Optional secondary detail text shown dimmed after the label. */
  detail?: string;
}

interface BackgroundWorkExitPromptProps {
  /** The background work items currently running. */
  items: BackgroundWorkItem[];
  /** Invoked when the user confirms exiting. */
  onExit: () => void;
  /** Invoked when the user chooses to stay / cancels. */
  onCancel: () => void;
}

function LMl(props: BackgroundWorkExitPromptProps) {
  let cache = OMl.c(42),
    {
      items: items,
      onExit: onExit,
      onCancel: onCancel
    } = props,
    reportChoice;
  if (cache[0] !== items.length) reportChoice = function (choice) {
    W("tengu_exit_background_work_prompt", {
      item_count: items.length,
      chose_exit: choice === "exit"
    });
  }, cache[0] = items.length, cache[1] = reportChoice;else reportChoice = cache[1];
  let onReport = reportChoice,
    handleChange;
  if (cache[2] !== onReport || cache[3] !== onCancel || cache[4] !== onExit) handleChange = function (choice) {
    switch (onReport(choice), choice) {
      case "exit":
        return onExit();
      case "stay":
        return onCancel();
    }
  }, cache[2] = onReport, cache[3] = onCancel, cache[4] = onExit, cache[5] = handleChange;else handleChange = cache[5];
  let onChange = handleChange,
    handleEscape;
  if (cache[6] !== onReport || cache[7] !== onCancel) handleEscape = function () {
    onReport("stay"), onCancel();
  }, cache[6] = onReport, cache[7] = onCancel, cache[8] = handleEscape;else handleEscape = cache[8];
  let onEscape = handleEscape,
    terminalSize = _r(),
    {
      rows: rows
    } = Dy(terminalSize),
    isCompact = ZS(),
    availableRows;
  if (cache[9] !== isCompact || cache[10] !== rows) availableRows = !isCompact && hZ() ? Math.floor(rows / 2) : rows, cache[9] = isCompact, cache[10] = rows, cache[11] = availableRows;else availableRows = cache[11];
  let visibleCount = Math.max(1, availableRows - 12),
    BoxComp,
    DialogComp,
    onDialogCancel,
    flexDir,
    gapSize,
    renderedItems,
    titleText,
    subtitleText;
  if (cache[12] !== onEscape || cache[13] !== items || cache[14] !== visibleCount) {
    let visibleItems = items.slice(0, visibleCount);
    DialogComp = Jn, titleText = "Background work is running", subtitleText = "The following will stop when you exit:", onDialogCancel = onEscape, BoxComp = $, flexDir = "column", gapSize = 0, renderedItems = visibleItems.map(Mym), cache[12] = onEscape, cache[13] = items, cache[14] = visibleCount, cache[15] = BoxComp, cache[16] = DialogComp, cache[17] = onDialogCancel, cache[18] = flexDir, cache[19] = gapSize, cache[20] = renderedItems, cache[21] = titleText, cache[22] = subtitleText;
  } else BoxComp = cache[15], DialogComp = cache[16], onDialogCancel = cache[17], flexDir = cache[18], gapSize = cache[19], renderedItems = cache[20], titleText = cache[21], subtitleText = cache[22];
  let hiddenCount = items.length - visibleCount,
    moreIndicator;
  if (cache[23] !== hiddenCount) moreIndicator = tSe.jsx(FO, {
    count: hiddenCount,
    unit: "item"
  }), cache[23] = hiddenCount, cache[24] = moreIndicator;else moreIndicator = cache[24];
  let itemsList;
  if (cache[25] !== BoxComp || cache[26] !== moreIndicator || cache[27] !== flexDir || cache[28] !== gapSize || cache[29] !== renderedItems) itemsList = tSe.jsxs(BoxComp, {
    flexDirection: flexDir,
    gap: gapSize,
    children: [renderedItems, moreIndicator]
  }), cache[25] = BoxComp, cache[26] = moreIndicator, cache[27] = flexDir, cache[28] = gapSize, cache[29] = renderedItems, cache[30] = itemsList;else itemsList = cache[30];
  let exitOption;
  if (cache[31] === Symbol.for("react.memo_cache_sentinel")) exitOption = {
    label: "Exit anyway",
    value: "exit"
  }, cache[31] = exitOption;else exitOption = cache[31];
  let selectOptions;
  if (cache[32] === Symbol.for("react.memo_cache_sentinel")) selectOptions = [exitOption, {
    label: "Stay",
    value: "stay"
  }], cache[32] = selectOptions;else selectOptions = cache[32];
  let selectControl;
  if (cache[33] !== onChange) selectControl = tSe.jsx(hr, {
    options: selectOptions,
    onChange: onChange
  }), cache[33] = onChange, cache[34] = selectControl;else selectControl = cache[34];
  let dialog;
  if (cache[35] !== DialogComp || cache[36] !== onDialogCancel || cache[37] !== itemsList || cache[38] !== selectControl || cache[39] !== titleText || cache[40] !== subtitleText) dialog = tSe.jsxs(DialogComp, {
    title: titleText,
    subtitle: subtitleText,
    onCancel: onDialogCancel,
    children: [itemsList, selectControl]
  }), cache[35] = DialogComp, cache[36] = onDialogCancel, cache[37] = itemsList, cache[38] = selectControl, cache[39] = titleText, cache[40] = subtitleText, cache[41] = dialog;else dialog = cache[41];
  return dialog;
}

/**
 * Renders a single background-work item row: bold label optionally followed by
 * a dimmed " · detail" segment. `key` is the React list key.
 */
function Mym(item: BackgroundWorkItem, key: number) {
  return tSe.jsxs($, {
    flexDirection: "row",
    children: [tSe.jsx(v, {
      bold: !0,
      children: item.label
    }), item.detail ? tSe.jsxs(v, {
      dimColor: !0,
      children: [" \xB7 ", item.detail]
    }) : null]
  }, key);
}
var OMl, tSe;
var MMl = b(() => {
  SE();
  ui();
  je();
  kt();
  tp();
  Ol();
  di();
  uj();
  OMl = x(tt(), 1), tSe = x(oe(), 1);
});

export {LMl,Mym,OMl,tSe,MMl};

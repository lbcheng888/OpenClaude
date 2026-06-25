// @ts-nocheck
import {getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {mo,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {C} from "../../vendor/m321.ts";
import {qt,tn} from "../config/0230_encoding.ts";
import {b,x} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
import {ve} from "../../vendor/m461.ts";
// @ts-nocheck
/**
 * Chrome browser picker for the "claude-in-chrome" extension.
 * Lists connected browsers via the chrome client and lets the user select one.
 */

/** ChromeBrowserPicker — renders the connected-browser selection UI. */
function lMl(props: any): any {
  let cache = $0o.c(36),
    {
      chromeClient,
      onDone
    } = props,
    [browsers, setBrowsers] = tOe.useState(null),
    [listError, setListError] = tOe.useState(null),
    [selecting, setSelecting] = tOe.useState(!1),
    doneRef = tOe.useRef(!1),
    pairedDeviceId: any;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) pairedDeviceId = Ot().chromeExtension?.pairedDeviceId, cache[0] = pairedDeviceId;else pairedDeviceId = cache[0];
  let currentDeviceId = pairedDeviceId,
    runListEffect: any,
    listDeps: any;
  if (cache[1] !== chromeClient) runListEffect = () => (doneRef.current = !1, nym(chromeClient).then((list: any) => {
    if (!doneRef.current) setBrowsers(list);
  }).catch((err: any) => {
    if (xe("chrome_browser_picker", "list_failed"), !doneRef.current) setListError(mo(err).message);
  }), () => {
    doneRef.current = !0;
  }), listDeps = [chromeClient], cache[1] = chromeClient, cache[2] = runListEffect, cache[3] = listDeps;else runListEffect = cache[2], listDeps = cache[3];
  tOe.useEffect(runListEffect, listDeps);
  let onDoneOnce: any;
  if (cache[4] !== onDone) onDoneOnce = function (result: any) {
    if (doneRef.current) return;
    doneRef.current = !0, onDone(result);
  }, cache[4] = onDone, cache[5] = onDoneOnce;else onDoneOnce = cache[5];
  let finish = onDoneOnce,
    handleSelect: any;
  if (cache[6] !== browsers || cache[7] !== chromeClient || cache[8] !== finish || cache[9] !== selecting) handleSelect = function (deviceId: any) {
    if (selecting) return;
    setSelecting(!0);
    let selected = browsers?.find((browser: any) => browser.deviceId === deviceId);
    cMl(chromeClient, "select_browser", {
      deviceId
    }).then(() => {
      He("chrome_browser_picker"), finish(selected ? `Now using browser "${selected.name}" for Chrome actions.` : void 0);
    }).catch((err: any) => {
      xe("chrome_browser_picker", "select_failed"), A(`claude-in-chrome select_browser failed: ${mo(err).message}`, {
        level: "error"
      }), finish(`Couldn't switch browser: ${mo(err).message}`);
    });
  }, cache[6] = browsers, cache[7] = chromeClient, cache[8] = finish, cache[9] = selecting, cache[10] = handleSelect;else handleSelect = cache[10];
  let onChange = handleSelect;
  if (listError) {
    let message = `Couldn't list connected browsers: ${listError}`,
      errorText: any;
    if (cache[11] !== message) errorText = HL.jsx(v, {
      color: "error",
      children: message
    }), cache[11] = message, cache[12] = errorText;else errorText = cache[12];
    let errorView: any;
    if (cache[13] !== finish || cache[14] !== errorText) errorView = HL.jsx(U0o, {
      onDone: finish,
      children: errorText
    }), cache[13] = finish, cache[14] = errorText, cache[15] = errorView;else errorView = cache[15];
    return errorView;
  }
  if (browsers === null) {
    let loadingText: any;
    if (cache[16] === Symbol.for("react.memo_cache_sentinel")) loadingText = HL.jsx(v, {
      dimColor: !0,
      children: "Looking for connected browsers\u2026"
    }), cache[16] = loadingText;else loadingText = cache[16];
    let loadingView: any;
    if (cache[17] !== finish) loadingView = HL.jsx(U0o, {
      onDone: finish,
      children: loadingText
    }), cache[17] = finish, cache[18] = loadingView;else loadingView = cache[18];
    return loadingView;
  }
  if (browsers.length === 0) {
    let emptyText: any;
    if (cache[19] === Symbol.for("react.memo_cache_sentinel")) emptyText = HL.jsx(v, {
      children: "No browsers are connected. Open Chrome with the Claude extension and make sure you're signed in to the same claude.ai account."
    }), cache[19] = emptyText;else emptyText = cache[19];
    let emptyView: any;
    if (cache[20] !== finish) emptyView = HL.jsx(U0o, {
      onDone: finish,
      children: emptyText
    }), cache[20] = finish, cache[21] = emptyView;else emptyView = cache[21];
    return emptyView;
  }
  let options: any;
  if (cache[22] !== browsers) {
    let toOption: any;
    if (cache[24] === Symbol.for("react.memo_cache_sentinel")) toOption = (browser: any) => ({
      value: browser.deviceId,
      label: HL.jsxs(HL.Fragment, {
        children: [HL.jsx(v, {
          children: browser.name
        }), HL.jsxs(v, {
          dimColor: !0,
          children: [" ", "\xB7 ", browser.osPlatform ?? "unknown OS", browser.deviceId === currentDeviceId ? " \xB7 current" : ""]
        })]
      })
    }), cache[24] = toOption;else toOption = cache[24];
    options = browsers.map(toOption), cache[22] = browsers, cache[23] = options;
  } else options = cache[23];
  let selectOptions = options,
    promptText = browsers.length === 1 ? "One browser is connected:" : `Choose which browser to use (${browsers.length} connected):`,
    promptNode: any;
  if (cache[25] !== promptText) promptNode = HL.jsx(v, {
    children: promptText
  }), cache[25] = promptText, cache[26] = promptNode;else promptNode = cache[26];
  let onCancel: any;
  if (cache[27] !== finish) onCancel = () => finish(), cache[27] = finish, cache[28] = onCancel;else onCancel = cache[28];
  let select: any;
  if (cache[29] !== onChange || cache[30] !== selectOptions || cache[31] !== onCancel) select = HL.jsx(hr, {
    options: selectOptions,
    onChange,
    onCancel,
    defaultFocusValue: currentDeviceId,
    hideIndexes: !0
  }), cache[29] = onChange, cache[30] = selectOptions, cache[31] = onCancel, cache[32] = select;else select = cache[32];
  let view: any;
  if (cache[33] !== select || cache[34] !== promptNode) view = HL.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [promptNode, select]
  }), cache[33] = select, cache[34] = promptNode, cache[35] = view;else view = cache[35];
  return view;
}
/** BackWrapper — wraps children with a "‹ Back" select that triggers onDone. */
function U0o(props: any): any {
  let cache = $0o.c(6),
    {
      onDone,
      children
    } = props,
    backOptions: any;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) backOptions = [{
    value: "back",
    label: "\u2039 Back"
  }], cache[0] = backOptions;else backOptions = cache[0];
  let backSelect: any;
  if (cache[1] !== onDone) backSelect = HL.jsx(hr, {
    options: backOptions,
    onChange: () => onDone(),
    onCancel: () => onDone(),
    hideIndexes: !0
  }), cache[1] = onDone, cache[2] = backSelect;else backSelect = cache[2];
  let view: any;
  if (cache[3] !== children || cache[4] !== backSelect) view = HL.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [children, backSelect]
  }), cache[3] = children, cache[4] = backSelect, cache[5] = view;else view = cache[5];
  return view;
}
/** Lists connected browsers via the chrome client and parses the result. */
async function nym(chromeClient: any): Promise<any> {
  let raw = await cMl(chromeClient, "list_connected_browsers", {});
  if (!raw) return [];
  let parsed = C.array(tym()).safeParse(qt(raw));
  return parsed.success ? parsed.data : [];
}
/** Calls a chrome client tool and returns the first text content, if any. */
async function cMl(chromeClient: any, toolName: any, toolArgs: any): Promise<any> {
  let result = await chromeClient.client.callTool({
      name: toolName,
      arguments: toolArgs
    }),
    first = Array.isArray(result.content) ? result.content[0] : void 0;
  return first && typeof first === "object" && "text" in first && typeof first.text === "string" ? first.text : void 0;
}
var $0o, tOe, HL, tym;
var uMl = b(() => {
  Qr();
  Ol();
  je();
  mn();
  tr();
  qe();
  Ct();
  tn();
  $0o = x(tt(), 1), tOe = x(et(), 1), HL = x(oe(), 1), tym = ve(() => C.object({
    deviceId: C.string(),
    name: C.string().default("Browser"),
    osPlatform: C.string().optional()
  }));
});

export {lMl,U0o,nym,cMl,$0o,tOe,HL,tym,uMl};

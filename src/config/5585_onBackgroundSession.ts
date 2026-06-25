// @ts-nocheck
import {gc,_t,uo} from "../../vendor/m2468.ts";
import {shellToolNames as mv,isReplMode as IG} from "../../vendor/m4331.ts";
import {X2,Snt} from "../../vendor/m2534.ts";
import {Ne} from "../../vendor/m583.ts";
import {WTo,V5e,vG} from "../../vendor/m4362.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {nt} from "../../vendor/m127.ts";
import {Nu,Wu} from "../../vendor/m438.ts";
import {oOn,Ieo} from "../../vendor/m3301.ts";
import {wu,$k} from "../tui/2575_current.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "./0137_namespace.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/*
 * config/5585_onBackgroundSession.ts - configuration and daemon-control restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */

/** Renders the background-session keyboard hint and wires up the background-task handler. */
function Yac(props: any): any {
  let cache = zac.c(15),
    {
      onBackgroundSession: onBackgroundSession,
      isLoading: isLoading
    } = props,
    store = gc(),
    mcpTools = mv(),
    [hasShown, setHasShown] = jac.useState(!1),
    runSession = X2(setHasShown, onBackgroundSession, bWm),
    handlerMemo;
  if (cache[0] !== store || cache[1] !== runSession || cache[2] !== isLoading || cache[3] !== mcpTools) handlerMemo = () => {
    if (Ne.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS) return;
    let state = store.getState();
    if (WTo(state)) {
      if (V5e(mcpTools), !Ot().hasUsedBackgroundTask) hn(SWm);
    } else if (nt("false") && isLoading) runSession();
  }, cache[0] = store, cache[1] = runSession, cache[2] = isLoading, cache[3] = mcpTools, cache[4] = handlerMemo;else handlerMemo = cache[4];
  let handler = handlerMemo,
    hasActiveBackground = _t(WTo),
    flagMemo;
  if (cache[5] === Symbol.for("react.memo_cache_sentinel")) flagMemo = nt("false"), cache[5] = flagMemo;else flagMemo = cache[5];
  let backgroundEnabled = flagMemo,
    activeMemo;
  if (cache[6] !== hasActiveBackground || cache[7] !== isLoading) activeMemo = Nu() === null && (hasActiveBackground || backgroundEnabled && isLoading), cache[6] = hasActiveBackground, cache[7] = isLoading, cache[8] = activeMemo;else activeMemo = cache[8];
  let isActive = activeMemo,
    bindingMemo;
  if (cache[9] !== isActive || cache[10] !== handler) bindingMemo = {
    handler: handler,
    isActive: isActive
  }, cache[9] = isActive, cache[10] = handler, cache[11] = bindingMemo;else bindingMemo = cache[11];
  let {
      cohesionFixes: cohesionFixes,
      gateOnShortcut: gateOnShortcut
    } = oOn(bindingMemo),
    rawChord = wu("task:background", "Task", "ctrl+b"),
    chord = cohesionFixes ? gateOnShortcut : Ne.terminal === "tmux" && rawChord === "ctrl+b" ? "ctrl+b ctrl+b" : rawChord;
  if (!isLoading || !hasShown || cohesionFixes && chord === "") return null;
  let format;
  if (cache[12] === Symbol.for("react.memo_cache_sentinel")) format = {
    keyCase: "lower"
  }, cache[12] = format;else format = cache[12];
  let element;
  if (cache[13] !== chord) element = snr.jsx($, {
    paddingLeft: 2,
    children: snr.jsx(v, {
      dimColor: !0,
      children: snr.jsx(at, {
        chord: chord,
        action: "background",
        format: format
      })
    })
  }), cache[13] = chord, cache[14] = element;else element = cache[14];
  return element;
}

/** Marks the global config as having used a background task once. */
function SWm(config: any): any {
  return config.hasUsedBackgroundTask ? config : {
    ...config,
    hasUsedBackgroundTask: !0
  };
}

function bWm(): void {}

var zac, jac, snr;

var Jac = b((): void => {
  Snt();
  Ieo();
  je();
  $k();
  Wu();
  uo();
  IG();
  vG();
  tr();
  Ir();
  dn();
  Wo();
  zac = x(tt(), 1), jac = x(et(), 1), snr = x(oe(), 1);
});

export {Yac,SWm,bWm,zac,jac,snr,Jac};

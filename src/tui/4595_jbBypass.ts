// @ts-nocheck
import {pki,l4r,dki,PCn,OCn} from "../../vendor/m2352.ts";
import {XM,Ive} from "../config/2352_useDecayCurve.ts";
import {lc,mg} from "../../vendor/m2209.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {useSelection as ghe,$tt} from "../../vendor/m2457.ts";
import {xKn,DKn} from "../../vendor/m4593.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {yvn,zR} from "../../vendor/m2562.ts";
import {vKn,ugl,wKn,kKn,ORo} from "../../vendor/m4591.ts";
import {BDt,hg} from "../../vendor/m2280.ts";
import {getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {dPe,HKn,Q8t} from "../../vendor/m4592.ts";
import {Oo,Cnt,ss} from "../../vendor/m2553.ts";
import {XOn,JOn,WBt,GBt} from "../../vendor/m3346.ts";
import {Wqr,qqr,d2e} from "../../vendor/m2418.ts";
import {Bve,RPt} from "../../vendor/m2387.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {useStdin as I8} from "../../vendor/m2266.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
// @ts-nocheck
function isSelectionPassthroughKey(key, mods) {
  if (mods.upArrow || mods.downArrow || mods.home || mods.end) return true;
  if (key.length !== 1) return false;
  if (mods.ctrl) return "udbfnp".includes(key);
  return "jkgGb {}".includes(key);
}
function computeScrollStep(accel, dir, now) {
  if (pki()) {
    let dt = now - accel.time;
    if (!accel.jbBypass || dt > l4r) accel.jbBypass = true, accel.frac = 0, accel.mult = 1;else if (dir !== accel.dir) accel.frac = 0;
    accel.dir = dir, accel.time = now;
    let load = dki();
    if (accel.accelEnabled) accel.mult = Math.min(BYPASS_MULT_MAX, accel.mult + BYPASS_MULT_STEP + load * BYPASS_LOAD_GAIN);
    accel.frac += BYPASS_FRAC_STEP * accel.mult;
    let lines = Math.floor(accel.frac);
    return accel.frac -= lines, lines;
  }
  if (accel.jbBypass) accel.jbBypass = false, accel.pendingFlip = false, accel.wheelMode = false, accel.burstCount = 0, accel.frac = 0, accel.dir = 0;
  if (!accel.useDecayCurve) {
    if (accel.wheelFlood) {
      let dt = now - accel.time;
      return accel.time = now, accel.dir = dir, accel.mult = dt > WINDOW_GAP_MS ? accel.base * WHEEL_FLOOD_MULT : accel.base, Math.max(1, Math.floor(accel.mult));
    }
    if (accel.wheelMode && now - accel.time > WHEEL_MODE_TIMEOUT_MS) accel.wheelMode = false, accel.burstCount = 0, accel.mult = accel.base;
    if (accel.pendingFlip) {
      if (accel.pendingFlip = false, dir !== accel.dir || now - accel.time > FLIP_GRACE_MS) return accel.dir = dir, accel.time = now, accel.mult = accel.base, Math.max(1, Math.floor(accel.mult));
      accel.wheelMode = true;
    }
    let dt = now - accel.time;
    if (dir !== accel.dir && accel.dir !== 0) return accel.pendingFlip = true, accel.time = now, 0;
    if (accel.dir = dir, accel.time = now, accel.wheelMode) if (dt < BURST_GAP_MS) {
      if (++accel.burstCount >= 5) accel.wheelMode = false, accel.burstCount = 0, accel.mult = accel.base;else return 1;
    } else accel.burstCount = 0;
    if (accel.wheelMode && accel.accelEnabled) {
      let decay = Math.pow(0.5, dt / DECAY_HALF_LIFE_MS),
        cap = Math.max(WINDOW_MULT_CAP_A * Math.min(accel.base, 1), accel.base * 2),
        next = 1 + (accel.mult - 1) * decay + WINDOW_DECAY_BOOST * decay;
      return accel.mult = Math.min(cap, next, accel.mult + WINDOW_MULT_INCREMENT), Math.max(1, Math.floor(accel.mult));
    }
    if (dt > WINDOW_GAP_MS || !accel.accelEnabled) accel.mult = accel.base;else {
      let cap = Math.max(WINDOW_MULT_CAP_B * Math.min(accel.base, 1), accel.base * 2);
      accel.mult = Math.min(cap, accel.mult + WINDOW_MULT_STEP);
    }
    return Math.max(1, Math.floor(accel.mult));
  }
  let dt = now - accel.time,
    sameDir = dir === accel.dir;
  if (accel.time = now, accel.dir = dir, sameDir && dt < BURST_GAP_MS) return 1;
  if (!accel.accelEnabled) return Math.max(1, Math.floor(accel.base));
  if (!sameDir || dt > DECAY_RESET_MS) accel.mult = Math.max(2, accel.base), accel.frac = 0;else {
    let decay = Math.pow(0.5, dt / DECAY_HALF_LIFE_MS),
      cap = dt >= DECAY_SLOW_THRESHOLD_MS ? DECAY_SLOW_CAP : DECAY_FAST_CAP;
    accel.mult = Math.min(cap, 1 + (accel.mult - 1) * decay + DECAY_BOOST * decay);
  }
  let total = accel.mult + accel.frac,
    lines = Math.floor(total);
  return accel.frac = total - lines, lines;
}
function createScrollAccelState(useDecayCurve = false, base = 1, wheelFlood = false, accelEnabled = true) {
  return {
    time: 0,
    mult: base,
    dir: 0,
    useDecayCurve: useDecayCurve,
    frac: 0,
    base: base,
    pendingFlip: false,
    wheelMode: false,
    burstCount: 0,
    jbBypass: false,
    wheelFlood: wheelFlood,
    accelEnabled: accelEnabled
  };
}
function initScrollAccelState() {
  let profile = XM(),
    accelEnabled = lc("wheelScrollAccelerationEnabled", true).value;
  return A(`wheel accel: ${profile.useDecayCurve ? "decay" : "window (native)"} \xB7 base=${profile.base} \xB7 platform=${profile.platform} \xB7 TERM_PROGRAM=${profile.termProgram}${profile.wheelFlood ? " \xB7 wheelFlood" : ""}${profile.jediTerm ? " \xB7 jediTerm" : ""}${PCn() ? " \xB7 jbBugConfirmed" : ""}${accelEnabled ? "" : " \xB7 accelDisabled"}`), createScrollAccelState(profile.useDecayCurve, profile.base, profile.wheelFlood, accelEnabled);
}
function useScrollKeybindings({
  scrollRef: scrollRef,
  isActive: isActive,
  onScroll: onScroll,
  isModal = false
}) {
  let selection = ghe(),
    deleter = xKn(),
    {
      addNotification: addNotification
    } = Ci(),
    blocked = yvn(),
    active = isActive && !blocked,
    accelRef = React.useRef(null),
    profileRef = React.useRef(null),
    copyHintRef = React.useRef(-1),
    lastCopyRef = React.useRef(null);
  useScrollArrowWarnings(addNotification);
  function notifyCopy(payload, isAutoCopy = false) {
    let notification = vKn(payload);
    if (isAutoCopy && BDt() === "native" && Ot().copyOnSelect === undefined) {
      if (copyHintRef.current === -1) if (dPe(AUTO_COPY_HINT_KEY) >= AUTO_COPY_HINT_THRESHOLD) HKn(AUTO_COPY_HINT_KEY), copyHintRef.current = 0;else copyHintRef.current = AUTO_COPY_HINT_MAX_SHOWS;
      if (copyHintRef.current < AUTO_COPY_HINT_MAX_SHOWS) {
        copyHintRef.current++, addNotification({
          ...notification,
          text: `${notification.text} \xB7 disable auto-copy in /config`,
          timeoutMs: Math.max(notification.timeoutMs, 4000)
        });
        return;
      }
    }
    addNotification(notification);
  }
  function copyCurrentSelection() {
    let copied = selection.copySelection();
    if (copied) notifyCopy(copied);
  }
  let hasScrollHandler = onScroll != null;
  Oo({
    "scroll:pageUp": () => {
      let view = scrollRef.current;
      if (!view) return;
      if (hasScrollHandler) XOn();
      let delta = -Math.max(1, Math.floor(view.getViewportHeight() / 2)),
        hitTop = scrollByDelta(view, delta, hasScrollHandler);
      onScroll?.(hitTop, view);
    },
    "scroll:pageDown": () => {
      let view = scrollRef.current;
      if (!view) return;
      if (hasScrollHandler) XOn();
      let delta = Math.max(1, Math.floor(view.getViewportHeight() / 2)),
        hitBottom = scrollByDelta(view, delta, hasScrollHandler);
      onScroll?.(hitBottom, view);
    },
    "scroll:lineUp": () => {
      let view = scrollRef.current;
      if (!view || view.getScrollHeight() <= view.getViewportHeight()) return false;
      if (XM() !== profileRef.current) profileRef.current = XM(), accelRef.current = null;
      if (hasScrollHandler) JOn();
      accelRef.current ??= initScrollAccelState(), accelRef.current.base = XM().base;
      let now = performance.now(),
        step = computeScrollStep(accelRef.current, -1, now);
      Wqr(view), qqr(-1, step, accelRef.current, now), scrollLinesUp(view, step, hasScrollHandler), onScroll?.(false, view);
    },
    "scroll:lineDown": () => {
      let view = scrollRef.current;
      if (!view || view.getScrollHeight() <= view.getViewportHeight()) return false;
      if (XM() !== profileRef.current) profileRef.current = XM(), accelRef.current = null;
      if (hasScrollHandler) JOn();
      accelRef.current ??= initScrollAccelState(), accelRef.current.base = XM().base;
      let now = performance.now(),
        step = computeScrollStep(accelRef.current, 1, now);
      Wqr(view), qqr(1, step, accelRef.current, now);
      let hitBottom = scrollLinesDown(view, step);
      onScroll?.(hitBottom, view);
    },
    "scroll:top": () => {
      let view = scrollRef.current;
      if (!view) return;
      if (hasScrollHandler) WBt();
      view.scrollTo(0), onScroll?.(false, view);
    },
    "scroll:bottom": () => {
      let view = scrollRef.current;
      if (!view) return;
      view.scrollToBottom(), onScroll?.(true, view);
    },
    "selection:copy": copyCurrentSelection
  }, {
    context: "Scroll",
    isActive: active
  });
  function scrollByCommand(command) {
    let view = scrollRef.current;
    if (!view) return;
    if (hasScrollHandler) {
      if (command === "lineUp" || command === "lineDown") JOn();else if (command === "top") WBt();else if (command !== "bottom") XOn();
    }
    let result = scrollByCommandKind(view, command, hasScrollHandler);
    if (result === null) return;
    onScroll?.(result, view);
  }
  Oo({
    "scroll:halfPageUp": () => scrollByCommand("halfPageUp"),
    "scroll:halfPageDown": () => scrollByCommand("halfPageDown"),
    "scroll:fullPageUp": () => scrollByCommand("fullPageUp"),
    "scroll:fullPageDown": () => scrollByCommand("fullPageDown")
  }, {
    context: "Scroll",
    isActive: active
  }), Oo({
    "scroll:lineUp": () => scrollByCommand("lineUp"),
    "scroll:lineDown": () => scrollByCommand("lineDown"),
    "scroll:halfPageUp": () => scrollByCommand("halfPageUp"),
    "scroll:halfPageDown": () => scrollByCommand("halfPageDown"),
    "scroll:fullPageUp": () => scrollByCommand("fullPageUp"),
    "scroll:fullPageDown": () => scrollByCommand("fullPageDown"),
    "scroll:top": () => scrollByCommand("top"),
    "scroll:bottom": () => scrollByCommand("bottom")
  }, {
    context: "Transcript",
    isActive: active && isModal
  });
  function extendSelection(direction) {
    if (!selection.hasSelection()) return false;
    let state = selection.getState();
    if (state && Bve(state)) return;
    if (direction === "up" || direction === "down") {
      let view = scrollRef.current;
      if (view && state?.anchor && state.focus) {
        let viewportTop = view.getViewportTop(),
          viewportBottom = viewportTop + view.getViewportHeight() - 1,
          anchorVisible = state.anchor.row >= viewportTop && state.anchor.row <= viewportBottom,
          extendUp = anchorVisible && direction === "up" && state.focus.row <= viewportTop,
          extendDown = anchorVisible && direction === "down" && state.focus.row >= viewportBottom;
        if (extendUp || extendDown) {
          let maxScroll = Math.max(0, view.getScrollHeight() - view.getViewportHeight()),
            canScroll = extendUp ? view.getScrollTop() > 0 : view.getScrollTop() < maxScroll;
          if (view.getPendingDelta() === 0 && canScroll) lastCopyRef.current = null, state.focus = {
            col: state.focus.col,
            row: extendUp ? viewportTop : viewportBottom
          }, state.virtualFocusRow = extendUp ? viewportTop - 1 : viewportBottom + 1, state.virtualFocusCol = undefined, view.scrollBy(extendUp ? -1 : 1), onScroll?.(false, view);
          return;
        }
      }
    }
    selection.moveFocus(direction);
  }
  return Oo({
    "selection:extendLeft": () => extendSelection("left"),
    "selection:extendRight": () => extendSelection("right"),
    "selection:extendUp": () => extendSelection("up"),
    "selection:extendDown": () => extendSelection("down"),
    "selection:extendLineStart": () => extendSelection("lineStart"),
    "selection:extendLineEnd": () => extendSelection("lineEnd")
  }, {
    context: "Scroll",
    isActive: active
  }), Cnt((key, mods) => {
    if (!selection.hasSelection()) return;
    if (mods.escape) return selection.clearSelection(), true;
    if (mods.ctrl && !mods.shift && !mods.meta && key === "c") {
      let pending = lastCopyRef.current;
      if (pending !== null) selection.clearSelection(), notifyCopy(pending);else copyCurrentSelection();
      return true;
    }
    if (isModal && isSelectionPassthroughKey(key, mods)) return;
    if (!isModal && (mods.backspace || mods.delete) && !mods.ctrl && !mods.meta && !mods.shift && !mods.super) {
      let state = selection.getState();
      if (state && deleter.tryDelete(state)) return selection.clearSelection(), true;
    }
    if (ugl(mods)) selection.clearSelection();
  }, {
    isActive: active
  }), useSelectionAutoScroll(scrollRef, selection, active, onScroll), wKn(selection, active, payload => notifyCopy(payload, true), lastCopyRef), kKn(selection), null;
}
function useSelectionAutoScroll(scrollRef, selection, active, onScroll) {
  let clock = As(),
    timerRef = React.useRef(null),
    dirRef = React.useRef(0),
    lastDirRef = React.useRef(0),
    tickCountRef = React.useRef(0),
    onScrollRef = React.useRef(onScroll);
  onScrollRef.current = onScroll, React.useEffect(() => {
    if (!active) return;
    function stop() {
      dirRef.current = 0, timerRef.current?.(), timerRef.current = null;
    }
    function tick() {
      let state = selection.getState(),
        view = scrollRef.current,
        dir = dirRef.current;
      if (!state?.isDragging || !state.focus || !view || dir === 0 || ++tickCountRef.current > AUTOSCROLL_MAX_TICKS) {
        stop();
        return;
      }
      if (view.getPendingDelta() !== 0) return;
      if (dir < 0) {
        if (view.getScrollTop() <= 0) {
          stop();
          return;
        }
        view.scrollBy(-AUTOSCROLL_LINES);
      } else {
        let maxScroll = Math.max(0, view.getScrollHeight() - view.getViewportHeight());
        if (view.getScrollTop() >= maxScroll) {
          stop();
          return;
        }
        view.scrollBy(AUTOSCROLL_LINES);
      }
      onScrollRef.current?.(false, view);
    }
    function start(dir) {
      if (lastDirRef.current = dir, dirRef.current === dir) return;
      if (stop(), dirRef.current = dir, tickCountRef.current = 0, tick(), dirRef.current === dir) {
        let loop = () => {
          if (tick(), dirRef.current !== 0) timerRef.current = clock.setTimeout(loop, AUTOSCROLL_INTERVAL_MS);
        };
        timerRef.current = clock.setTimeout(loop, AUTOSCROLL_INTERVAL_MS);
      }
    }
    function onSelectionChange() {
      let view = scrollRef.current;
      if (!view) {
        stop();
        return;
      }
      let viewportTop = view.getViewportTop(),
        viewportBottom = viewportTop + view.getViewportHeight() - 1,
        state = selection.getState();
      if (!state?.isDragging || state.scrolledOffAbove.length === 0 && state.scrolledOffBelow.length === 0) lastDirRef.current = 0;
      let dir = computeAutoScrollDir(state, viewportTop, viewportBottom, lastDirRef.current);
      if (dir === 0) {
        if (lastDirRef.current !== 0 && state?.focus) {
          let focusDir = state.focus.row < viewportTop ? -1 : state.focus.row > viewportBottom ? 1 : 0;
          if (focusDir !== 0 && focusDir !== lastDirRef.current) state.scrolledOffAbove = [], state.scrolledOffBelow = [], state.scrolledOffAboveSW = [], state.scrolledOffBelowSW = [], lastDirRef.current = 0;
        }
        stop();
      } else start(dir);
    }
    let unsubscribe = selection.subscribe(onSelectionChange);
    return () => {
      unsubscribe(), stop(), lastDirRef.current = 0;
    };
  }, [clock, active, scrollRef, selection]);
}
function computeAutoScrollDir(state, viewportTop, viewportBottom, lastDir = 0) {
  if (!state?.isDragging || !state.anchor || !state.focus) return 0;
  let focusRow = state.focus.row,
    dir = focusRow < viewportTop ? -1 : focusRow > viewportBottom ? 1 : 0;
  if (lastDir !== 0) return dir === lastDir ? dir : 0;
  if (state.anchor.row < viewportTop || state.anchor.row > viewportBottom) return 0;
  return dir;
}
function scrollToEnd(view) {
  if (lc("autoScrollEnabled", true).value) view.scrollToBottom();else view.scrollTo(Math.max(0, view.getScrollHeight() - view.getViewportHeight()));
  return true;
}
function scrollByDelta(view, delta, notifyTop = true) {
  let maxScroll = Math.max(0, view.getScrollHeight() - view.getViewportHeight()),
    target = view.getScrollTop() + view.getPendingDelta() + delta;
  if (target >= maxScroll) return scrollToEnd(view);
  if (target <= 0 && notifyTop) WBt();
  return view.scrollTo(Math.max(0, target)), false;
}
function scrollLinesDown(view, delta) {
  let maxScroll = Math.max(0, view.getScrollHeight() - view.getViewportHeight());
  if (view.getScrollTop() + view.getPendingDelta() + delta >= maxScroll) return scrollToEnd(view);
  return view.scrollBy(delta), false;
}
function scrollLinesUp(view, delta, notifyTop = true) {
  if (view.getScrollTop() + view.getPendingDelta() - delta <= 0) {
    if (notifyTop) WBt();
    view.scrollTo(0);
    return;
  }
  view.scrollBy(-delta);
}
function scrollByCommandKind(view, command, notifyTop = true) {
  switch (command) {
    case null:
      return null;
    case "lineUp":
    case "lineDown":
      return scrollByDelta(view, command === "lineDown" ? 1 : -1, notifyTop);
    case "halfPageUp":
    case "halfPageDown":
      {
        let page = Math.max(1, Math.floor(view.getViewportHeight() / 2));
        return scrollByDelta(view, command === "halfPageDown" ? page : -page, notifyTop);
      }
    case "fullPageUp":
    case "fullPageDown":
      {
        let page = Math.max(1, view.getViewportHeight());
        return scrollByDelta(view, command === "fullPageDown" ? page : -page, notifyTop);
      }
    case "top":
      return view.scrollTo(0), false;
    case "bottom":
      return view.scrollToBottom(), true;
  }
}
function useScrollArrowWarnings(notify) {
  let memo = memoCache.c(5),
    {
      internal_eventEmitter: emitter
    } = I8(),
    clock = As(),
    firedRef = React.useRef(false),
    effect,
    deps;
  if (memo[0] !== notify || memo[1] !== clock || memo[2] !== emitter) effect = () => {
    let onArrowBurst = function (event) {
        if (!firedRef.current) firedRef.current = true, W("tengu_scroll_arrows_detected", {
          count: event.count,
          up: event.direction === "up"
        });
        clock.setTimeout(() => notify({
          key: "scroll-as-arrows",
          kind: "contextual",
          priority: "immediate",
          text: "Scroll wheel is sending arrow keys \xB7 use PgUp/PgDn to scroll",
          color: "warning",
          timeoutMs: 12000
        }), 200);
      },
      onJediTermBug = function () {
        W("tengu_jediterm_scroll_bug_detected", {}), notify({
          key: "jediterm-scroll-bug",
          kind: "contextual",
          priority: "immediate",
          text: "Scroll support in JetBrains IDE 2025.2 terminals is experimental \xB7 upgrade to 2025.3+ for the best experience",
          color: "suggestion",
          timeoutMs: 15000
        });
      };
    return emitter.on("arrow-burst", onArrowBurst), emitter.on("jediterm-scroll-bug", onJediTermBug), () => {
      emitter.off("arrow-burst", onArrowBurst), emitter.off("jediterm-scroll-bug", onJediTermBug);
    };
  }, deps = [emitter, notify, clock], memo[0] = notify, memo[1] = clock, memo[2] = emitter, memo[3] = effect, memo[4] = deps;else effect = memo[3], deps = memo[4];
  React.useEffect(effect, deps);
}
var memoCache,
  React,
  WINDOW_GAP_MS = 40,
  WINDOW_MULT_STEP = 0.3,
  WINDOW_MULT_CAP_B = 6,
  WHEEL_FLOOD_MULT = 3,
  FLIP_GRACE_MS = 200,
  WINDOW_DECAY_BOOST = 15,
  WINDOW_MULT_CAP_A = 15,
  WINDOW_MULT_INCREMENT = 3,
  WHEEL_MODE_TIMEOUT_MS = 1500,
  DECAY_HALF_LIFE_MS = 150,
  DECAY_BOOST = 7,
  BURST_GAP_MS = 5,
  DECAY_SLOW_THRESHOLD_MS = 80,
  DECAY_SLOW_CAP = 3,
  DECAY_FAST_CAP = 36,
  DECAY_RESET_MS = 500,
  BYPASS_FRAC_STEP = 0.35,
  BYPASS_MULT_STEP = 0.008,
  BYPASS_LOAD_GAIN = 0.4,
  BYPASS_MULT_MAX = 4,
  AUTOSCROLL_LINES = 2,
  AUTOSCROLL_INTERVAL_MS = 50,
  AUTOSCROLL_MAX_TICKS = 200,
  AUTO_COPY_HINT_KEY = "auto-copy-config-hint",
  AUTO_COPY_HINT_THRESHOLD = 10,
  AUTO_COPY_HINT_MAX_SHOWS = 5;
var initScrollKeybindingsModule = b(() => {
  fd();
  zR();
  ORo();
  $tt();
  OCn();
  d2e();
  Ive();
  RPt();
  hg();
  je();
  ss();
  kt();
  Q8t();
  tr();
  qe();
  GBt();
  mg();
  DKn();
  memoCache = x(tt(), 1), React = x(et(), 1);
});

export {isSelectionPassthroughKey as Bem,computeScrollStep as Egl,createScrollAccelState as Gem,initScrollAccelState as Cgl,useScrollKeybindings as LRo,useSelectionAutoScroll as zem,computeAutoScrollDir as jem,scrollToEnd as Hgl,scrollByDelta as uue,scrollLinesDown as Yem,scrollLinesUp as Jem,scrollByCommandKind as Xem,useScrollArrowWarnings as Qem,memoCache as kgl,React as g6,WINDOW_GAP_MS as Tgl,WINDOW_MULT_STEP as vem,WINDOW_MULT_CAP_B as wem,WHEEL_FLOOD_MULT as kem,FLIP_GRACE_MS as Hem,WINDOW_DECAY_BOOST as Iem,WINDOW_MULT_CAP_A as xem,WINDOW_MULT_INCREMENT as Dem,WHEEL_MODE_TIMEOUT_MS as Pem,DECAY_HALF_LIFE_MS as Sgl,DECAY_BOOST as Oem,BURST_GAP_MS as bgl,DECAY_SLOW_THRESHOLD_MS as Lem,DECAY_SLOW_CAP as Mem,DECAY_FAST_CAP as Nem,DECAY_RESET_MS as Fem,BYPASS_FRAC_STEP as Uem,BYPASS_MULT_STEP as $em,BYPASS_LOAD_GAIN as qem,BYPASS_MULT_MAX as Wem,AUTOSCROLL_LINES as Agl,AUTOSCROLL_INTERVAL_MS as Rgl,AUTOSCROLL_MAX_TICKS as Vem,AUTO_COPY_HINT_KEY as vgl,AUTO_COPY_HINT_THRESHOLD as Kem,AUTO_COPY_HINT_MAX_SHOWS as wgl,initScrollKeybindingsModule as MRo};

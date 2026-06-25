// @ts-nocheck
import {FAi,LAi,VEn,i3r} from "../../vendor/m2281.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {aki,ski,ICn,xy,nS,isNonMainSubagent as EZ} from "../config/2351_nS.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Iy,mz,JM,vCn,e4r,Zwi,oPt,kCn,wCn,mie,r4} from "../../vendor/m2349.ts";
import {VUe,yve,dO,ihe,aie} from "../../vendor/m2278.ts";
import {updateLastInteractionTime as Ude,lt} from "../session/0132_sent.ts";
import {fki,OCn,mki} from "../../vendor/m2352.ts";
import {UAi,l3r} from "../../vendor/m2282.ts";
import {TerminalFocusEvent as rtt,M3r} from "../../vendor/m2301.ts";
import {Ctt,IZ,CPt,iAn,RPt} from "../../vendor/m2387.ts";
import {Wet,X9r,GUe,iz} from "../../vendor/m2276.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {UDt,hg} from "../../vendor/m2280.ts";
import {YM,Tve} from "../../vendor/m2279.ts";
import {b,x} from "../../runtime.ts";
import {e2e,stopCapturingEarlyInput as die} from "../../vendor/m2300.ts";
import {Ir} from "../../vendor/m584.ts";
import {IA,Abi} from "../telemetry/2225_names.ts";
import {vn,Ie} from "../session/0621_length.ts";
import {vve,W0} from "../../vendor/m2296.ts";
import {EEn,EventEmitter as MUe} from "../../vendor/m2264.ts";
import {iw,du} from "../../vendor/m2302.ts";
import {m4r,kki,Hki} from "../config/2355_kind.ts";
import {_tt,kZ} from "../config/2385__eventHandlers.ts";
import {c2e,Tz} from "../../vendor/m2388.ts";
import {$ve,_Ii} from "../../vendor/m2391.ts";
import {Sqr,cAn} from "../../vendor/m2392.ts";
import {MIi,Cqr} from "../../vendor/m2399.ts";
import {PDt,nhe} from "../../vendor/m2265.ts";
import {yqr,fIi} from "../../vendor/m2389.ts";
import {wtt,gie} from "../../vendor/m2400.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
import {Ne} from "../../vendor/m583.ts";
// Returns false when running as a background session (suspend not supported)
function Aqr() {
  if (process.env.CLAUDE_CODE_SESSION_KIND === "bg") return !1;
  return !0;
}
// Query terminal capabilities: XTVERSION for name, DECRQM(2026) for sync-update support
async function FIi(querier: any) {
  let [xtversion] = await Promise.all([querier.send(FAi()), querier.flush()]);
  if (xtversion) {
    let termName = xtversion.name;
    if (process.env.TMUX && termName.startsWith("tmux ")) {
      let {
          stdout: tmuxOut
        } = await Fn("tmux", ["display-message", "-p", "#{client_termtype}"], {
          timeout: 1000,
          useCwd: !1
        }),
        tmuxTermType = tmuxOut.trim();
      if (tmuxTermType) termName = tmuxTermType;
    }
    aki(termName), A(`XTVERSION: terminal identified as "${termName}"`);
  } else A("XTVERSION: no reply (terminal ignored query)");
  let skipSyncQuery = !xtversion || process.env.TERM_PROGRAM === "Apple_Terminal",
    [syncReply] = await Promise.all([skipSyncQuery ? Promise.resolve(void 0) : querier.send(LAi(Iy.SYNCHRONIZED_UPDATE)), skipSyncQuery ? Promise.resolve() : querier.flush()]),
    syncSupported = syncReply?.status === 1 || syncReply?.status === 2;
  ski(syncSupported), A(`DECRQM(2026): ${skipSyncQuery ? `skipped (${xtversion ? "Apple_Terminal" : "no XTVERSION reply"})` : syncReply ? `status=${syncReply.status}` : "no reply"} \u2192 sync ${syncSupported ? "supported" : "unsupported"}`), A(`DECSTBM: ${ICn ? "enabled" : "gated"} (TMUX=${process.env.TMUX ? "set" : "unset"} ZELLIJ=${process.env.ZELLIJ != null ? "set" : "unset"} TERM_PROGRAM=${process.env.TERM_PROGRAM ?? "unset"} TERM=${process.env.TERM ?? "unset"})`);
}
// Dispatch parsed input events: focus/blur, mouse, response, suspend, keyboard/paste
function C_d(app: any, rawEvents: any, n: any, r: any) {
  if (rawEvents.some((ev: any) => ev.kind === "key" && ev.sequence !== VUe && ev.sequence !== yve || ev.kind === "mouse" && !((ev.button & 32) !== 0 && (ev.button & 3) === 3))) Ude();
  let parsedEvents = fki(app.jediTermInput, rawEvents, performance.now(), app.emitJediTermScrollBug);
  w_d(app, parsedEvents);
  for (let event of parsedEvents) {
    if (event.kind === "response") {
      if (event.response.type === "themeNotify") {
        UAi();
        continue;
      }
      app.querier?.onResponse(event.response);
      continue;
    }
    if (event.kind === "mouse") {
      A_d(app, event);
      continue;
    }
    let sequence = event.sequence;
    if (sequence === VUe) {
      app.handleTerminalFocus(!0);
      let focusEvent = new rtt("terminalfocus");
      app.internal_eventEmitter.emit("terminalfocus", focusEvent);
      continue;
    }
    if (sequence === yve) {
      if (app.handleTerminalFocus(!1), app.props.selection.isDragging) Ctt(app.props.selection), app.props.onSelectionChange();
      let blurEvent = new rtt("terminalblur");
      app.internal_eventEmitter.emit("terminalblur", blurEvent);
      continue;
    }
    if (!Wet()) X9r(!0);
    if (event.name === "z" && event.ctrl && Aqr()) {
      app.handleSuspend();
      continue;
    }
    if (!event.isPasted) app.handleInput(sequence);
    if (event.isPasted) app.props.dispatchPasteEvent(event.sequence ?? "");else if (event.name === "wheelup" || event.name === "wheeldown" || event.name === "mouse") {
      if (event.name !== "mouse") app.props.dispatchWheelEvent(event);
    } else app.props.dispatchKeyboardEvent(event);
  }
}
// Handle a single mouse event: hover, right/middle-click paste, drag, single/multi-click, hyperlink
function A_d(app: any, mouseEvent: any) {
  let selection = app.props.selection,
    col = mouseEvent.col - 1,
    row = mouseEvent.row - 1,
    button = mouseEvent.button & 3;
  if (mouseEvent.action === "press") {
    if ((mouseEvent.button & 32) !== 0 && button === 3) {
      if (selection.isDragging) Ctt(selection), app.props.onSelectionChange();
      if (col === app.lastHoverCol && row === app.lastHoverRow) return;
      app.lastHoverCol = col, app.lastHoverRow = row, app.props.onHoverAt(col, row);
      return;
    }
    if (button !== 0) {
      if (app.clickCount = 0, (mouseEvent.button & 32) === 0) {
        let platform = Yt();
        if (button === 2 && (platform === "windows" || platform === "wsl" || platform === "linux")) {
          if (IZ(selection)) CPt(selection), app.props.onSelectionChange();else if (!xy()) UDt("clipboard").then((text: any) => {
            if (text) app.props.dispatchPasteEvent(text);
          });
        } else if (button === 1 && platform === "linux") UDt("primary").then((text: any) => {
          if (text) app.props.dispatchPasteEvent(text);
        });
      }
      return;
    }
    if ((mouseEvent.button & 32) !== 0) {
      app.props.onSelectionDrag(col, row);
      return;
    }
    if (selection.isDragging) Ctt(selection), app.props.onSelectionChange();
    let now = Date.now(),
      isDoubleClick = now - app.lastClickTime < BIi && Math.abs(col - app.lastClickCol) <= UIi && Math.abs(row - app.lastClickRow) <= UIi;
    if (app.clickCount = isDoubleClick ? app.clickCount + 1 : 1, app.lastClickTime = now, app.lastClickCol = col, app.lastClickRow = row, app.clickCount >= 2) {
      if (app.pendingHyperlinkTimer) clearTimeout(app.pendingHyperlinkTimer), app.pendingHyperlinkTimer = null;
      let clickKind = app.clickCount === 2 ? 2 : 3;
      app.props.onMultiClick(col, row, clickKind);
      return;
    }
    iAn(selection, col, row), selection.lastPressHadAlt = (mouseEvent.button & 8) !== 0, app.props.onSelectionChange();
    return;
  }
  if (button !== 0) {
    if (!selection.isDragging) return;
    Ctt(selection), app.props.onSelectionChange();
    return;
  }
  if (Ctt(selection), !IZ(selection) && selection.anchor) {
    if (!app.props.onClickAt(col, row)) {
      let hyperlink = app.props.getHyperlinkAt(col, row);
      if (hyperlink && ((mouseEvent.button & 24) !== 0 || YM.macCmdClickArrivesWithoutSgrModifierBit()) && process.env.TERM_PROGRAM !== "vscode" && !xy()) {
        if (app.pendingHyperlinkTimer) clearTimeout(app.pendingHyperlinkTimer);
        app.pendingHyperlinkTimer = setTimeout((appRef: any, url: any) => {
          appRef.pendingHyperlinkTimer = null, appRef.props.onOpenHyperlink(url);
        }, BIi, app, hyperlink);
      }
    }
  }
  app.props.onSelectionChange();
}
// Detect rapid arrow-key burst in a sliding time window; emit "arrow-burst" event when threshold exceeded
function w_d(app: any, events: any) {
  let first = events[0];
  if (first?.kind !== "key" || first.name !== "up" && first.name !== "down" || first.ctrl || first.meta || first.shift || first.isPasted || !events.every((ev: any) => ev.kind === "key" && ev.name === first.name && !ev.ctrl && !ev.meta && !ev.shift)) {
    app.arrowWindow.length = 0;
    return;
  }
  if (app.arrowWindowDir !== first.name) app.arrowWindow.length = 0, app.arrowWindowDir = first.name;
  let now = performance.now(),
    window = app.arrowWindow;
  window.push({
    t: now,
    n: events.length
  });
  while (window.length > 0 && now - window[0].t > R_d) window.shift();
  let total = 0;
  for (let entry of window) total += entry.n;
  if (total >= v_d) app.internal_eventEmitter.emit("arrow-burst", {
    direction: first.name,
    count: total
  }), app.props.onStdinResume?.(), window.length = 0;
}
var $Ii: any,
  qve: any,
  b_d = () => {},
  E_d = 5000,
  BIi = 500,
  UIi = 1,
  dAn: any,
  R_d = 100,
  v_d = 8;
var Rqr = b(() => {
  lt();
  qe();
  e2e();
  Ir();
  IA();
  Ii();
  vn();
  Es();
  vve();
  EEn();
  M3r();
  iw();
  OCn();
  m4r();
  _tt();
  RPt();
  Tve();
  nS();
  GUe();
  VEn();
  l3r();
  dO();
  mz();
  hg();
  c2e();
  $ve();
  Sqr();
  MIi();
  PDt();
  yqr();
  wtt();
  $Ii = x(et(), 1), qve = x(oe(), 1);
  dAn = class dAn extends $Ii.PureComponent {
    static displayName = "InternalApp";
    static getDerivedStateFromError(error: any) {
      return {
        error: error
      };
    }
    state = {
      error: void 0
    };
    rawModeEnabledCount = 0;
    internal_eventEmitter = new MUe();
    keyParseState = kki;
    incompleteEscapeTimer = null;
    byteRunDeadlineAt = null;
    NORMAL_TIMEOUT = 50;
    PASTE_TIMEOUT = 2000;
    querier = this.props.stdout.isTTY && this.props.stdin.isTTY ? new i3r(this.props.stdout) : null;
    lastClickTime = 0;
    lastClickCol = -1;
    lastClickRow = -1;
    clickCount = 0;
    pendingHyperlinkTimer = null;
    lastHoverCol = -1;
    lastHoverRow = -1;
    lastStdinTime = performance.now();
    arrowWindow = [];
    arrowWindowDir = "";
    jediTermInput = mki();
    emitJediTermScrollBug = () => this.internal_eventEmitter.emit("jediterm-scroll-bug");
    isRawModeSupported() {
      return this.props.stdin.isTTY;
    }
    render() {
      return qve.jsx(gie.Provider, {
        value: {
          columns: this.props.terminalColumns,
          rows: this.props.terminalRows
        },
        children: qve.jsx(Tz.Provider, {
          value: {
            exit: this.handleExit,
            focusManager: this.props.focusManager,
            rootNode: this.props.rootNode,
            dispatchPasteEvent: this.props.dispatchPasteEvent
          },
          children: qve.jsx(nhe.Provider, {
            value: {
              stdin: this.props.stdin,
              setRawMode: this.handleSetRawMode,
              isRawModeSupported: this.isRawModeSupported(),
              internal_eventEmitter: this.internal_eventEmitter,
              internal_querier: this.querier
            },
            children: qve.jsx(fIi, {
              children: qve.jsx(_Ii, {
                children: qve.jsx(cAn.Provider, {
                  value: this.props.onCursorDeclaration ?? b_d,
                  children: this.state.error ? qve.jsx(Cqr, {
                    error: this.state.error
                  }) : this.props.children
                })
              })
            })
          })
        })
      });
    }
    componentDidMount() {
      let rootNode = this.props.rootNode,
        pendingDelta = rootNode._pendingRawModeDelta ?? 0;
      rootNode._pendingRawModeDelta = 0;
      for (let i = 0; i < pendingDelta; i++) this.handleSetRawMode(!0);
      for (let i = 0; i > pendingDelta; i--) this.handleSetRawMode(!1);
      rootNode.setRawMode = this.handleSetRawMode;
    }
    componentWillUnmount() {
      if (this.props.rootNode.setRawMode = void 0, this.props.stdout.isTTY) this.props.stdout.write(JM);
      if (this.incompleteEscapeTimer) clearTimeout(this.incompleteEscapeTimer), this.incompleteEscapeTimer = null;
      if (this.pendingHyperlinkTimer) clearTimeout(this.pendingHyperlinkTimer), this.pendingHyperlinkTimer = null;
      if (this.isRawModeSupported()) while (this.rawModeEnabledCount > 0) this.handleSetRawMode(!1);
    }
    componentDidCatch(error: any, errorInfo: any) {
      Abi(error, errorInfo), this.handleExit(error);
    }
    handleSetRawMode = (enable: any) => {
      let {
        stdin: stdin
      } = this.props;
      if (!this.isRawModeSupported()) if (stdin === process.stdin) throw Error(`Raw mode is not supported on the current process.stdin, which Ink uses as input stream by default.
Read about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported`);else throw Error(`Raw mode is not supported on the stdin provided to Ink.
Read about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported`);
      if (stdin.setEncoding("utf8"), enable) {
        if (this.rawModeEnabledCount === 0) {
          if (die(), this.props.onRawModeEnter?.(), stdin.ref(), W0(stdin, !0), stdin.addListener("readable", this.handleReadable), Yt() === "windows") stdin.resume(), stdin.pause();
          if (this.props.stdout.write(vCn), this.props.stdout.write(e4r), this.props.stdout.write(Zwi), this.props.stdout.write(EZ()), process.env.CLAUDE_BG_BACKEND !== "daemon") setImmediate(() => {
            if (this.querier) FIi(this.querier);
          });
        }
        this.rawModeEnabledCount++;
        return;
      }
      if (this.rawModeEnabledCount <= 0) return;
      if (--this.rawModeEnabledCount === 0) {
        if (this.props.stdout.write(ihe), this.props.stdout.write(aie), this.props.stdout.write(oPt), this.props.stdout.write(kCn), this.props.stdout.write(wCn), !du.get(this.props.stdout)?.isHandoffRawMode) W0(stdin, !1);
        stdin.removeListener("readable", this.handleReadable), stdin.unref();
      }
    };
    flushIncomplete = () => {
      if (this.incompleteEscapeTimer = null, !this.keyParseState.incomplete && this.keyParseState.mode !== "IN_PASTE" && this.keyParseState.pendingByteEvents.length === 0) return;
      if (this.props.stdin.readableLength > 0) {
        this.incompleteEscapeTimer = setTimeout(this.flushIncomplete, this.NORMAL_TIMEOUT);
        return;
      }
      if (this.keyParseState.incomplete) {
        let remaining = (this.keyParseState.mode === "IN_PASTE" ? this.PASTE_TIMEOUT : this.NORMAL_TIMEOUT) - (performance.now() - this.lastStdinTime);
        if (remaining > 0) {
          this.incompleteEscapeTimer = setTimeout(this.flushIncomplete, remaining);
          return;
        }
      }
      this.processInput(null);
    };
    processInput = (chunk: any) => {
      let prevState = this.keyParseState,
        [events, nextState] = Hki(this.keyParseState, chunk);
      if (this.keyParseState = nextState, events.length > 0) kZ.discreteUpdates(C_d, this, events, void 0, void 0);
      let now = performance.now(),
        pendingByteEvents = this.keyParseState.pendingByteEvents;
      if (pendingByteEvents.length === 0) this.byteRunDeadlineAt = null;else if (prevState.pendingByteEvents !== pendingByteEvents || this.byteRunDeadlineAt === null) this.byteRunDeadlineAt = now + this.NORMAL_TIMEOUT;
      if (this.incompleteEscapeTimer) clearTimeout(this.incompleteEscapeTimer), this.incompleteEscapeTimer = null;
      let incompleteTimeout = this.keyParseState.incomplete || this.keyParseState.mode === "IN_PASTE" ? this.keyParseState.mode === "IN_PASTE" ? this.PASTE_TIMEOUT : this.NORMAL_TIMEOUT : null,
        byteRunTimeout = this.byteRunDeadlineAt === null || this.keyParseState.mode === "IN_PASTE" ? null : Math.max(0, this.byteRunDeadlineAt - now),
        nextTimeout = incompleteTimeout === null ? byteRunTimeout : byteRunTimeout === null ? incompleteTimeout : Math.min(incompleteTimeout, byteRunTimeout);
      if (nextTimeout !== null) this.incompleteEscapeTimer = setTimeout(this.flushIncomplete, nextTimeout);
    };
    handleReadable = () => {
      let now = performance.now();
      if (now - this.lastStdinTime > E_d) this.props.onStdinResume?.();
      this.lastStdinTime = now;
      try {
        let chunk;
        while ((chunk = this.props.stdin.read()) !== null) this.processInput(chunk);
      } catch (err) {
        Ie(err);
        let {
          stdin: stdin
        } = this.props;
        if (this.rawModeEnabledCount > 0 && !stdin.listeners("readable").includes(this.handleReadable)) A("handleReadable: re-attaching stdin readable listener after error recovery", {
          level: "warn"
        }), stdin.addListener("readable", this.handleReadable);
      }
    };
    handleInput = (sequence: any) => {
      if (sequence === "\x03" && this.props.exitOnCtrlC) this.handleExit();
    };
    handleExit = (error: any) => {
      if (this.isRawModeSupported()) this.handleSetRawMode(!1);
      this.props.onExit(error);
    };
    handleTerminalFocus = (focused: any) => {
      let focusState = iz();
      if (X9r(focused), focused && focusState === "blurred") du.get(this.props.stdout)?.proactiveAtlasResetOnFocus();
      if (focused && focusState !== "focused" && process.env.CLAUDE_BG_BACKEND === "daemon" && this.querier) FIi(this.querier);
    };
    handleSuspend = () => {
      if (!this.isRawModeSupported()) return;
      let prevRawModeCount = this.rawModeEnabledCount;
      while (this.rawModeEnabledCount > 0) this.handleSetRawMode(!1);
      if (this.props.stdout.isTTY) this.props.stdout.write(JM + oPt + mie);
      this.internal_eventEmitter.emit("suspend");
      let onResume = () => {
        for (let i = 0; i < prevRawModeCount; i++) if (this.isRawModeSupported()) this.handleSetRawMode(!0);
        if (this.props.stdout.isTTY) {
          let screenReaderEnabled = this.props.isScreenReaderEnabled ?? !1;
          if (!Ne.CLAUDE_CODE_ACCESSIBILITY && !screenReaderEnabled) this.props.stdout.write(r4);
          this.props.stdout.write(e4r);
        }
        this.internal_eventEmitter.emit("resume"), process.removeListener("SIGCONT", onResume);
      };
      process.on("SIGCONT", onResume), process.kill(0, "SIGTSTP");
    };
  };
});

export {Aqr,FIi,C_d,A_d,w_d,$Ii,qve,b_d,E_d,BIi,UIi,dAn,R_d,v_d,Rqr};

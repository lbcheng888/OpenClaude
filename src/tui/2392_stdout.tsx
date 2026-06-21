// @ts-nocheck
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
import {H_i,R_i,sTn,kFr} from "../../vendor/m2270.ts";
import {execFileNoThrow,oa} from "../../vendor/m684.ts";
import {QSi,XSi,WTn,Oy,XS,RZ} from "../config/2341_XS.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Py,BK,N1,UTn,EUr,GSi,HIt,qTn,$Tn,mie,M4} from "../../vendor/m2339.ts";
import {VFe,KFe,zO,Jfe,lie} from "../../vendor/m2268.ts";
import {updateLastInteractionTime,lt} from "../session/0131_sent.ts";
import {sbi,zTn,obi} from "../../vendor/m2342.ts";
import {D_i,IFr} from "../../vendor/m2271.ts";
import {TerminalFocusEvent,sUr} from "../../vendor/m2290.ts";
import {EZe,OZ,KIt,TSn,YIt} from "../../vendor/m2377.ts";
import {jQe,TFr,GFe,IK} from "../../vendor/m2266.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {mIt,lg} from "../../vendor/m2269.ts";
import {b,M} from "../../runtime.ts";
import {tZe,stopCapturingEarlyInput} from "../../vendor/m2289.ts";
import {Lr} from "../../vendor/m578.ts";
import {Cv,CAi} from "../telemetry/2217_names.ts";
import {Rn,De} from "../session/0615_length.ts";
import {Uve,v0} from "../../vendor/m2285.ts";
import {Fyn,EventEmitter} from "../../vendor/m2256.ts";
import {bk,qu} from "../../vendor/m2291.ts";
import {LUr,_bi,ybi} from "../config/2345_kind.ts";
import {gZe,hie} from "../config/2375__eventHandlers.ts";
import {dUe,WK} from "../../vendor/m2378.ts";
import {rwe,iCi} from "../../vendor/m2381.ts";
import {q2r,ESn} from "../../vendor/m2382.ts";
import {CCi,G2r} from "../../vendor/m2389.ts";
import {sIt,Gfe} from "../../vendor/m2257.ts";
import {U2r,oCi} from "../../vendor/m2379.ts";
import {wZe,gie} from "../../vendor/m2390.ts";
import {Te} from "../../vendor/m2253.ts";
import {je} from "../../vendor/m577.ts";
// Returns false when running as a background session (suspend not supported)
function V2r() {
  if (process.env.CLAUDE_CODE_SESSION_KIND === "bg") return !1;
  return !0;
}
// Query terminal capabilities: XTVERSION for name, DECRQM(2026) for sync-update support
async function wCi(e: any) {
  let [t] = await Promise.all([e.send(H_i()), e.flush()]);
  if (t) {
    let s = t.name;
    if (process.env.TMUX && s.startsWith("tmux ")) {
      let {
          stdout: i
        } = await execFileNoThrow("tmux", ["display-message", "-p", "#{client_termtype}"], {
          timeout: 1000,
          useCwd: !1
        }),
        a = i.trim();
      if (a) s = a;
    }
    QSi(s), logForDebugging(`XTVERSION: terminal identified as "${s}"`);
  } else logForDebugging("XTVERSION: no reply (terminal ignored query)");
  let n = !t || process.env.TERM_PROGRAM === "Apple_Terminal",
    [r] = await Promise.all([n ? Promise.resolve(void 0) : e.send(R_i(Py.SYNCHRONIZED_UPDATE)), n ? Promise.resolve() : e.flush()]),
    o = r?.status === 1 || r?.status === 2;
  XSi(o), logForDebugging(`DECRQM(2026): ${n ? `skipped (${t ? "Apple_Terminal" : "no XTVERSION reply"})` : r ? `status=${r.status}` : "no reply"} \u2192 sync ${o ? "supported" : "unsupported"}`), logForDebugging(`DECSTBM: ${WTn ? "enabled" : "gated"} (TMUX=${process.env.TMUX ? "set" : "unset"} ZELLIJ=${process.env.ZELLIJ != null ? "set" : "unset"} TERM_PROGRAM=${process.env.TERM_PROGRAM ?? "unset"} TERM=${process.env.TERM ?? "unset"})`);
}
// Dispatch parsed input events: focus/blur, mouse, response, suspend, keyboard/paste
function Qid(e: any, t: any, n: any, r: any) {
  if (t.some((s: any) => s.kind === "key" && s.sequence !== VFe && s.sequence !== KFe || s.kind === "mouse" && !((s.button & 32) !== 0 && (s.button & 3) === 3))) updateLastInteractionTime();
  let o = sbi(e.jediTermInput, t, performance.now(), e.emitJediTermScrollBug);
  nad(e, o);
  for (let s of o) {
    if (s.kind === "response") {
      if (s.response.type === "themeNotify") {
        D_i();
        continue;
      }
      e.querier?.onResponse(s.response);
      continue;
    }
    if (s.kind === "mouse") {
      Zid(e, s);
      continue;
    }
    let i = s.sequence;
    if (i === VFe) {
      e.handleTerminalFocus(!0);
      let a = new TerminalFocusEvent("terminalfocus");
      e.internal_eventEmitter.emit("terminalfocus", a);
      continue;
    }
    if (i === KFe) {
      if (e.handleTerminalFocus(!1), e.props.selection.isDragging) EZe(e.props.selection), e.props.onSelectionChange();
      let a = new TerminalFocusEvent("terminalblur");
      e.internal_eventEmitter.emit("terminalblur", a);
      continue;
    }
    if (!jQe()) TFr(!0);
    if (s.name === "z" && s.ctrl && V2r()) {
      e.handleSuspend();
      continue;
    }
    if (!s.isPasted) e.handleInput(i);
    if (s.isPasted) e.props.dispatchPasteEvent(s.sequence ?? "");else if (s.name === "wheelup" || s.name === "wheeldown" || s.name === "mouse") {
      if (s.name !== "mouse") e.props.dispatchWheelEvent(s);
    } else e.props.dispatchKeyboardEvent(s);
  }
}
// Handle a single mouse event: hover, right/middle-click paste, drag, single/multi-click, hyperlink
function Zid(e: any, t: any) {
  let n = e.props.selection,
    r = t.col - 1,
    o = t.row - 1,
    s = t.button & 3;
  if (t.action === "press") {
    if ((t.button & 32) !== 0 && s === 3) {
      if (n.isDragging) EZe(n), e.props.onSelectionChange();
      if (r === e.lastHoverCol && o === e.lastHoverRow) return;
      e.lastHoverCol = r, e.lastHoverRow = o, e.props.onHoverAt(r, o);
      return;
    }
    if (s !== 0) {
      if (e.clickCount = 0, (t.button & 32) === 0) {
        let l = zt();
        if (s === 2 && (l === "windows" || l === "wsl" || l === "linux")) {
          if (OZ(n)) KIt(n), e.props.onSelectionChange();else if (!Oy()) mIt("clipboard").then((c: any) => {
            if (c) e.props.dispatchPasteEvent(c);
          });
        } else if (s === 1 && l === "linux") mIt("primary").then((c: any) => {
          if (c) e.props.dispatchPasteEvent(c);
        });
      }
      return;
    }
    if ((t.button & 32) !== 0) {
      e.props.onSelectionDrag(r, o);
      return;
    }
    if (n.isDragging) EZe(n), e.props.onSelectionChange();
    let i = Date.now(),
      a = i - e.lastClickTime < RCi && Math.abs(r - e.lastClickCol) <= xCi && Math.abs(o - e.lastClickRow) <= xCi;
    if (e.clickCount = a ? e.clickCount + 1 : 1, e.lastClickTime = i, e.lastClickCol = r, e.lastClickRow = o, e.clickCount >= 2) {
      if (e.pendingHyperlinkTimer) clearTimeout(e.pendingHyperlinkTimer), e.pendingHyperlinkTimer = null;
      let l = e.clickCount === 2 ? 2 : 3;
      e.props.onMultiClick(r, o, l);
      return;
    }
    TSn(n, r, o), n.lastPressHadAlt = (t.button & 8) !== 0, e.props.onSelectionChange();
    return;
  }
  if (s !== 0) {
    if (!n.isDragging) return;
    EZe(n), e.props.onSelectionChange();
    return;
  }
  if (EZe(n), !OZ(n) && n.anchor) {
    if (!e.props.onClickAt(r, o)) {
      let i = e.props.getHyperlinkAt(r, o);
      if (i && (t.button & 24) !== 0 && process.env.TERM_PROGRAM !== "vscode" && !Oy()) {
        if (e.pendingHyperlinkTimer) clearTimeout(e.pendingHyperlinkTimer);
        e.pendingHyperlinkTimer = setTimeout((a: any, l: any) => {
          a.pendingHyperlinkTimer = null, a.props.onOpenHyperlink(l);
        }, RCi, e, i);
      }
    }
  }
  e.props.onSelectionChange();
}
// Detect rapid arrow-key burst in a sliding time window; emit "arrow-burst" event when threshold exceeded
function nad(e: any, t: any) {
  let n = t[0];
  if (n?.kind !== "key" || n.name !== "up" && n.name !== "down" || n.ctrl || n.meta || n.shift || n.isPasted || !t.every((i: any) => i.kind === "key" && i.name === n.name && !i.ctrl && !i.meta && !i.shift)) {
    e.arrowWindow.length = 0;
    return;
  }
  if (e.arrowWindowDir !== n.name) e.arrowWindow.length = 0, e.arrowWindowDir = n.name;
  let r = performance.now(),
    o = e.arrowWindow;
  o.push({
    t: r,
    n: t.length
  });
  while (o.length > 0 && r - o[0].t > ead) o.shift();
  let s = 0;
  for (let i of o) s += i.n;
  if (s >= tad) e.internal_eventEmitter.emit("arrow-burst", {
    direction: n.name,
    count: s
  }), e.props.onStdinResume?.(), o.length = 0;
}
var _ie: any,
  Jid = () => {},
  Xid = 5000,
  RCi = 500,
  xCi = 1,
  vSn: any,
  ead = 100,
  tad = 8;
var K2r = b(() => {
  lt();
  qe();
  tZe();
  Lr();
  Cv();
  oa();
  Rn();
  qs();
  Uve();
  Fyn();
  sUr();
  bk();
  zTn();
  LUr();
  gZe();
  YIt();
  XS();
  GFe();
  sTn();
  IFr();
  zO();
  BK();
  lg();
  dUe();
  rwe();
  q2r();
  CCi();
  sIt();
  U2r();
  wZe();
  _ie = M(Te(), 1);
  vSn = class vSn extends _ie.PureComponent {
    static displayName = "InternalApp";
    static getDerivedStateFromError(e: any) {
      return {
        error: e
      };
    }
    state = {
      error: void 0
    };
    rawModeEnabledCount = 0;
    internal_eventEmitter = new EventEmitter();
    keyParseState = _bi;
    incompleteEscapeTimer = null;
    NORMAL_TIMEOUT = 50;
    PASTE_TIMEOUT = 2000;
    querier = this.props.stdout.isTTY && this.props.stdin.isTTY ? new kFr(this.props.stdout) : null;
    lastClickTime = 0;
    lastClickCol = -1;
    lastClickRow = -1;
    clickCount = 0;
    pendingHyperlinkTimer = null;
    lastHoverCol = -1;
    lastHoverRow = -1;
    lastStdinTime = Date.now();
    arrowWindow = [];
    arrowWindowDir = "";
    jediTermInput = obi();
    emitJediTermScrollBug = () => this.internal_eventEmitter.emit("jediterm-scroll-bug");
    isRawModeSupported() {
      return this.props.stdin.isTTY;
    }
    render() {
      return _ie.default.createElement(gie.Provider, {
        value: {
          columns: this.props.terminalColumns,
          rows: this.props.terminalRows
        }
      }, _ie.default.createElement(WK.Provider, {
        value: {
          exit: this.handleExit,
          focusManager: this.props.focusManager,
          rootNode: this.props.rootNode,
          dispatchPasteEvent: this.props.dispatchPasteEvent
        }
      }, _ie.default.createElement(Gfe.Provider, {
        value: {
          stdin: this.props.stdin,
          setRawMode: this.handleSetRawMode,
          isRawModeSupported: this.isRawModeSupported(),
          internal_eventEmitter: this.internal_eventEmitter,
          internal_querier: this.querier
        }
      }, _ie.default.createElement(oCi, null, _ie.default.createElement(iCi, null, _ie.default.createElement(ESn.Provider, {
        value: this.props.onCursorDeclaration ?? Jid
      }, this.state.error ? _ie.default.createElement(G2r, {
        error: this.state.error
      }) : this.props.children))))));
    }
    componentDidMount() {
      let e = this.props.rootNode,
        t = e._pendingRawModeDelta ?? 0;
      e._pendingRawModeDelta = 0;
      for (let n = 0; n < t; n++) this.handleSetRawMode(!0);
      for (let n = 0; n > t; n--) this.handleSetRawMode(!1);
      e.setRawMode = this.handleSetRawMode;
    }
    componentWillUnmount() {
      if (this.props.rootNode.setRawMode = void 0, this.props.stdout.isTTY) this.props.stdout.write(N1);
      if (this.incompleteEscapeTimer) clearTimeout(this.incompleteEscapeTimer), this.incompleteEscapeTimer = null;
      if (this.pendingHyperlinkTimer) clearTimeout(this.pendingHyperlinkTimer), this.pendingHyperlinkTimer = null;
      if (this.isRawModeSupported()) while (this.rawModeEnabledCount > 0) this.handleSetRawMode(!1);
    }
    componentDidCatch(e: any, t: any) {
      CAi(e, t), this.handleExit(e);
    }
    handleSetRawMode = (e: any) => {
      let {
        stdin: t
      } = this.props;
      if (!this.isRawModeSupported()) if (t === process.stdin) throw Error(`Raw mode is not supported on the current process.stdin, which Ink uses as input stream by default.
Read about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported`);else throw Error(`Raw mode is not supported on the stdin provided to Ink.
Read about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported`);
      if (t.setEncoding("utf8"), e) {
        if (this.rawModeEnabledCount === 0) {
          if (stopCapturingEarlyInput(), this.props.onRawModeEnter?.(), t.ref(), v0(t, !0), t.addListener("readable", this.handleReadable), zt() === "windows") t.resume(), t.pause();
          if (this.props.stdout.write(UTn), this.props.stdout.write(EUr), this.props.stdout.write(GSi), this.props.stdout.write(RZ()), process.env.CLAUDE_BG_BACKEND !== "daemon") setImmediate(() => {
            if (this.querier) wCi(this.querier);
          });
        }
        this.rawModeEnabledCount++;
        return;
      }
      if (this.rawModeEnabledCount <= 0) return;
      if (--this.rawModeEnabledCount === 0) {
        if (this.props.stdout.write(Jfe), this.props.stdout.write(lie), this.props.stdout.write(HIt), this.props.stdout.write(qTn), this.props.stdout.write($Tn), !qu.get(this.props.stdout)?.isHandoffRawMode) v0(t, !1);
        t.removeListener("readable", this.handleReadable), t.unref();
      }
    };
    flushIncomplete = () => {
      if (this.incompleteEscapeTimer = null, !this.keyParseState.incomplete && this.keyParseState.mode !== "IN_PASTE") return;
      if (this.props.stdin.readableLength > 0) {
        this.incompleteEscapeTimer = setTimeout(this.flushIncomplete, this.NORMAL_TIMEOUT);
        return;
      }
      this.processInput(null);
    };
    processInput = (e: any) => {
      let [t, n] = ybi(this.keyParseState, e);
      if (this.keyParseState = n, t.length > 0) hie.discreteUpdates(Qid, this, t, void 0, void 0);
      if (this.incompleteEscapeTimer) clearTimeout(this.incompleteEscapeTimer), this.incompleteEscapeTimer = null;
      if (this.keyParseState.incomplete || this.keyParseState.mode === "IN_PASTE") this.incompleteEscapeTimer = setTimeout(this.flushIncomplete, this.keyParseState.mode === "IN_PASTE" ? this.PASTE_TIMEOUT : this.NORMAL_TIMEOUT);
    };
    handleReadable = () => {
      let e = Date.now();
      if (e - this.lastStdinTime > Xid) this.props.onStdinResume?.();
      this.lastStdinTime = e;
      try {
        let t: any;
        while ((t = this.props.stdin.read()) !== null) this.processInput(t);
      } catch (t) {
        De(t);
        let {
          stdin: n
        } = this.props;
        if (this.rawModeEnabledCount > 0 && !n.listeners("readable").includes(this.handleReadable)) logForDebugging("handleReadable: re-attaching stdin readable listener after error recovery", {
          level: "warn"
        }), n.addListener("readable", this.handleReadable);
      }
    };
    handleInput = (e: any) => {
      if (e === "\x03" && this.props.exitOnCtrlC) this.handleExit();
    };
    handleExit = (e: any) => {
      if (this.isRawModeSupported()) this.handleSetRawMode(!1);
      this.props.onExit(e);
    };
    handleTerminalFocus = (e: any) => {
      let t = IK();
      if (TFr(e), e && t === "blurred") qu.get(this.props.stdout)?.proactiveAtlasResetOnFocus();
      if (e && t !== "focused" && process.env.CLAUDE_BG_BACKEND === "daemon" && this.querier) wCi(this.querier);
    };
    handleSuspend = () => {
      if (!this.isRawModeSupported()) return;
      let e = this.rawModeEnabledCount;
      while (this.rawModeEnabledCount > 0) this.handleSetRawMode(!1);
      if (this.props.stdout.isTTY) this.props.stdout.write(N1 + HIt + mie);
      this.internal_eventEmitter.emit("suspend");
      let t = () => {
        for (let n = 0; n < e; n++) if (this.isRawModeSupported()) this.handleSetRawMode(!0);
        if (this.props.stdout.isTTY) {
          let n = this.props.isScreenReaderEnabled ?? !1;
          if (!je.CLAUDE_CODE_ACCESSIBILITY && !n) this.props.stdout.write(M4);
          this.props.stdout.write(EUr);
        }
        this.internal_eventEmitter.emit("resume"), process.removeListener("SIGCONT", t);
      };
      process.on("SIGCONT", t), process.kill(0, "SIGTSTP");
    };
  };
});
export {V2r,wCi,Qid,Zid,nad,_ie,Jid,Xid,RCi,xCi,vSn,ead,tad,K2r};

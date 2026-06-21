// @ts-nocheck
import {D4 as y4,T5 as n5,lie as Xse,Jfe as Ife,aie as Jse,tTn as gyn,eTn as hyn,zO as NO,uC as iC,UH as LH} from "../../vendor/m2268.ts";
import {qEi as Nbi,ewe as Fve,OZ as vZ,N2r as WUr,XEi as Vbi,JEi as Gbi,eCi as Ybi,ZEi as zbi,KIt as wIt,YEi as Wbi,VEi as $bi,TSn as NTn,GEi as Ubi,KEi as qbi,zEi as jbi,jEi as Bbi,YIt as xIt} from "../../vendor/m2377.ts";
import {LFr as $Br,Xfe as Dfe,MFr as qBr} from "../../vendor/m2275.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {st as rt} from "../../vendor/m5.ts";
import {zt as Yt,qs as $s} from "../../vendor/m635.ts";
import {N1 as R1,jve as Rve,mie as nie,jTn as iTn,UTn as rTn,M4 as E4,BK as bK} from "../../vendor/m2339.ts";
import {ASn as DTn,fSn as ITn,GIt as CIt,qK as wK,DEi as Rbi,uUe as UFe,S$ as d$,IEi as wbi,OEi as kbi,N4 as C4} from "../../vendor/m2376.ts";
import {Uyi as O_i,ZFr as sFr,tUe as IFe,JFr as nFr,yIt as QHt,Lyi as k_i,XFr as rFr,QQe as OQe} from "../../vendor/m2286.ts";
import {swe as Wve,HCi as vEi} from "../../vendor/m2395.ts";
import {Q2r as s2r,UCi as LEi} from "../../vendor/m2399.ts";
import {J_i as Wgi,X_i as Ggi} from "../../vendor/m2281.ts";
import {gF as lF} from "../../vendor/m2379.ts";
import {isBundledSkillsDisabled as KX,M7e as _7e} from "../../vendor/m667.ts";
import {UIt as yIt,oEi as ZSi,YO as BO,mZe as YQe} from "../../vendor/m2367.ts";
import {FocusManager as XQe,rAe as Bfe} from "../../vendor/m2372.ts";
import {C5 as i5,CEi as ybi,hie as sie,b2r as kUr,vEi as Tbi,REi as bbi,xEi as Ebi,gZe as ZQe} from "../config/2375__eventHandlers.ts";
import {h$r as E2r,yvi as mCi} from "../../vendor/m2412.ts";
import {TTn as Nyn,STn as Byn} from "../../vendor/m2284.ts";
import {RZ as _Z,pF as rF,WTn as aTn,wUr as DFr,Oy as Dy,Wve as xve,mF as oF,XS as zS} from "../config/2341_XS.ts";
import {flushInteractionTime as Ner,lt as ct} from "../session/0131_sent.ts";
import {Tvi as fCi,Svi as ACi} from "../../vendor/m2414.ts";
import {gvi as dCi,hvi as uCi,_vi as pCi} from "../../vendor/m2411.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {e$r as a2r} from "../../vendor/m2400.ts";
import {apiKeyHelperCache as b_,tAe as Mfe} from "../../vendor/m2352.ts";
import {LCi as HEi,OCi as kEi,MCi as IEi} from "../../vendor/m2398.ts";
import {s0t as BIt,A$r as b2r,Avi as cCi} from "../../vendor/m2410.ts";
import {buildSystemPrompt as u$,ope as Ove} from "../../vendor/m236.ts";
import {tn as nn,Hc as xc} from "../../vendor/m235.ts";
import {Uu as Wu,dr as fr} from "../../vendor/m231.ts";
import {Zyn as Ayn,hZ as aZ} from "../../vendor/m2267.ts";
import {v0 as C0,Uve as Cve} from "../../vendor/m2285.ts";
import {zR as VR,lg as og} from "../../vendor/m2269.ts";
import {oAe as Ffe,t0t as OIt} from "../../vendor/m2403.ts";
import {hUe as VFe,AUe as GFe,o0t as NIt} from "../../vendor/m2409.ts";
import {$ve as vve,E5 as s5} from "../config/2288_level.ts";
import {ICi as wEi,DCi as REi,XIt as HIt,PCi as xEi} from "../../vendor/m2397.ts";
import {owe as jve,Y2r as n2r} from "../../vendor/m2393.ts";
import {J2r as r2r,kCi as CEi} from "../../vendor/m2394.ts";
import {RZe as cZe,z2r as t2r} from "../../vendor/m2392.ts";
import {vSn as qTn,K2r as e2r} from "./2392_stdout.tsx";
import {wTn as jyn,tUr as aFr} from "../../vendor/m2288.ts";
import {OSn as XTn,F4 as w4} from "../../vendor/m2416.ts";
import {PSn as JTn,g$r as C2r} from "../../vendor/m2413.ts";
import {qp as Jp,bt as St} from "../../vendor/m195.ts";
import {qu as Vu,bk as _k} from "../../vendor/m2291.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {b,M as L} from "../../runtime.ts";
import {Ct} from "../../vendor/m131.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {sn as an} from "../config/0047_namespace.ts";
import {_$r as v2r} from "../../vendor/m2415.ts";
import {sTn as Syn,x_i as bgi} from "../../vendor/m2270.ts";
import {Te} from "../../vendor/m2253.ts";
import {dTn as xyn} from "../../vendor/m2283.ts";
// @ts-nocheck
function iLq(permissionMode) {
  return Object.freeze({
    type: "stdout",
    content: y4(permissionMode, 1)
  });
}
class fZe {
  options;
  log;
  terminal;
  scheduleRender;
  isUnmounted = false;
  isPaused = false;
  container;
  rootNode;
  focusManager;
  renderer;
  stylePool;
  charPool;
  hyperlinkPool;
  exitPromise;
  restoreConsole;
  restoreStderr;
  unsubscribeTTYHandlers;
  terminalColumns;
  terminalRows;
  currentNode = null;
  frontFrame;
  backFrame;
  lastPoolResetTime = performance.now();
  lastAtlasResetAt = 0;
  lastStyleLiveSize = 0;
  drainTimer = null;
  lastYogaCounters = {
    ms: 0,
    visited: 0,
    measured: 0,
    cacheHits: 0,
    live: 0
  };
  altScreenParkPatch;
  selection = Nbi();
  searchHighlightQuery = "";
  searchPositions = null;
  selectionListeners = new Set();
  frameSink = null;
  hoveredNodes = new Set();
  hasRendered = false;
  renderCalled = false;
  isExiting = false;
  altScreenActive = false;
  _handoffRawMode = false;
  altScreenMouseTracking = false;
  prevFrameContaminated = false;
  prevOverlaySig = "";
  needsEraseBeforePaint = false;
  altScreenFullRepaint;
  bgWorkerForceShowCursor;
  fullRepaintSentinelScreen;
  cursorDeclaration = null;
  displayCursor = null;
  accessibilityMode;
  nativeCursorVisible;
  isScreenReaderEnabled;
  prevScreenReaderLines = [];
  prevScreenReaderPark = {
    row: 0,
    col: 0
  };
  resetScreenReaderDiffState() {
    this.prevScreenReaderLines = [], this.prevScreenReaderPark = {
      row: 0,
      col: 0
    };
  }
  constructor(e) {
    this.options = e;
    if ($Br(this), this.accessibilityMode = Ge.CLAUDE_CODE_ACCESSIBILITY, this.altScreenFullRepaint = rt(process.env.CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT), this.bgWorkerForceShowCursor = this.altScreenFullRepaint && !this.options.nativeCursor && process.env.CLAUDE_CODE_SESSION_KIND === "bg" && Yt() === "windows", this.nativeCursorVisible = this.accessibilityMode, this.liveCountsEnabled = rt(process.env.CLAUDE_CODE_BENCH_LIVE_COUNTS), this.isScreenReaderEnabled = e.isScreenReaderEnabled ?? (!!e.stdout.isTTY && rt(process.env.INK_SCREEN_READER)), this.options.patchConsole) this.restoreConsole = this.patchConsole(), this.restoreStderr = this.patchStderr();
    if (this.terminal = {
      stdout: e.stdout,
      stderr: e.stderr
    }, e.stdout === process.stdout) {
      if (e.stdout.isTTY) e.stdout.write("\x1B7" + n5 + "\x1B8" + R1);
    }
    this.terminalColumns = e.stdout.columns || 80, this.terminalRows = e.stdout.rows || 24, this.altScreenParkPatch = iLq(this.terminalRows), this.stylePool = new DTn(), O_i(this.stylePool), this.charPool = new ITn(), this.hyperlinkPool = new CIt(), this.frontFrame = Wve(this.terminalRows, this.terminalColumns, this.stylePool, this.charPool, this.hyperlinkPool), this.backFrame = Wve(this.terminalRows, this.terminalColumns, this.stylePool, this.charPool, this.hyperlinkPool), this.log = new s2r({
      isTTY: e.stdout.isTTY || false,
      stylePool: this.stylePool
    });
    let t = () => queueMicrotask(this.onRender);
    this.scheduleRender = Wgi(t, lF, {
      leading: true,
      trailing: true
    }), this.isUnmounted = false, this.unsubscribeExit = KX(this.unmount, {
      alwaysLast: false
    }), this.rootNode = yIt("ink-root"), this.focusManager = new XQe((n, r) => i5.dispatchDiscrete(n, r)), this.rootNode.focusManager = this.focusManager, this.renderer = E2r(this.rootNode, this.stylePool), this.rootNode.onRender = this.scheduleRender, this.rootNode.onImmediateRender = this.onRender, this.rootNode.onComputeLayout = () => {
      if (this.isUnmounted) return;
      if (this.options.stdout.isTTY && this.syncTerminalSize()) {
        let n = this.currentNode;
        if (n !== null) queueMicrotask(() => {
          if (!this.isUnmounted) this.render(n);
        });
      }
      if (this.rootNode.yogaNode) {
        let n = performance.now(),
          r = this.rootNode.yogaNode;
        if (this.options.stdout.isTTY || this.options.stdout.columns) r.setWidth(this.terminalColumns), r.calculateLayout(this.terminalColumns);else if (r.setWidthAuto(), r.calculateLayout(), r.getComputedWidth() > w2r) r.setWidth(w2r), r.calculateLayout(w2r);
        let o = performance.now() - n;
        ybi(o);
        let s = Nyn();
        this.lastYogaCounters = {
          ms: o,
          ...s
        };
      }
    }, this.container = sie.createContainer(this.rootNode, _Ci.ConcurrentRoot, null, false, null, "id", Dfe, Dfe, Dfe, Dfe);
  }
  handleResume = () => {
    if (!this.options.stdout.isTTY) return;
    if (this.altScreenActive) {
      this.reenterAltScreen();
      return;
    }
    this.frontFrame = Wve(this.frontFrame.viewport.height, this.frontFrame.viewport.width, this.stylePool, this.charPool, this.hyperlinkPool), this.backFrame = Wve(this.backFrame.viewport.height, this.backFrame.viewport.width, this.stylePool, this.charPool, this.hyperlinkPool), this.log.reset(), this.prevFrameContaminated = true, this.displayCursor = null, this.nativeCursorVisible = this.accessibilityMode, this.resetScreenReaderDiffState();
  };
  hasStaleTerminalSize() {
    return (this.options.stdout.columns || 80) !== this.terminalColumns || (this.options.stdout.rows || 24) !== this.terminalRows;
  }
  syncTerminalSize() {
    let e = this.options.stdout.columns || 80,
      t = this.options.stdout.rows || 24;
    if (e === this.terminalColumns && t === this.terminalRows) return false;
    if (this.terminalColumns = e, this.terminalRows = t, this.altScreenParkPatch = iLq(this.terminalRows), this.resetScreenReaderDiffState(), this.altScreenActive && !this.isPaused && this.options.stdout.isTTY) {
      if (this.altScreenMouseTracking) this.options.stdout.write(Rve);
      this.resetFramesForAltScreen(), this.needsEraseBeforePaint = true;
    }
    return true;
  }
  handleResize = () => {
    if (!this.syncTerminalSize()) return;
    if (this.currentNode !== null) this.render(this.currentNode);
  };
  resolveExitPromise = () => {};
  rejectExitPromise = () => {};
  unsubscribeExit = () => {};
  enterAlternateScreen() {
    this.pause(), this.options.stdout.write(Xse + Ife + (this.altScreenMouseTracking ? nie : "") + (this.altScreenActive ? "" : "\x1B[?1049h") + "\x1B[?1004l\x1B[0m\x1B[?25h\x1B[2J\x1B[H"), this.suspendStdin();
  }
  exitAlternateScreen() {
    if (this.resumeStdin(), this.altScreenActive) this.options.stdout.write(iTn + "\x1B[2J\x1B[H" + (this.altScreenMouseTracking ? Rve : "") + "\x1B[?25l"), this.resetFramesForAltScreen();else this.options.stdout.write("\x1B[?1049l" + (this.altScreenMouseTracking ? Rve : "") + "\x1B[?25l"), this.repaint();
    this.resume(), this.options.stdout.write(Xse + Ife + "\x1B[?1004h" + rTn + _Z());
  }
  ensureInteractive = () => {
    if (this.unsubscribeTTYHandlers || !this.options.stdout.isTTY) return;
    if (!this.accessibilityMode && !this.isScreenReaderEnabled) this.options.stdout.write(E4);
    this.options.stdout.on("resize", this.handleResize), process.on("SIGCONT", this.handleResume), this.unsubscribeTTYHandlers = () => {
      this.options.stdout.off("resize", this.handleResize), process.off("SIGCONT", this.handleResume);
    };
  };
  skipSyncMarkers() {
    if (!this.options.stdout.isTTY) return true;
    if (!rF()) return true;
    if (!this.unsubscribeTTYHandlers) return true;
    return false;
  }
  onRender() {
    if (this.isUnmounted || this.isPaused) return;
    if (this.hasRendered && !this.isExiting) this.ensureInteractive();
    if (this.hasRendered = true, this.drainTimer !== null) clearTimeout(this.drainTimer), this.drainTimer = null;
    if (Ner(), this.isScreenReaderEnabled) {
      this.onRenderScreenReader();
      return;
    }
    let e = performance.now(),
      t = this.options.stdout.columns || 80,
      n = this.options.stdout.rows || 24,
      {
        anchor: r,
        focus: o
      } = this.selection,
      s = this.searchPositions,
      i = `${r?.row},${r?.col},${o?.row},${o?.col}|${this.searchHighlightQuery}|${s?.currentIdx},${s?.rowOffset},${s?.positions.length}`,
      a = this.prevFrameContaminated || i !== this.prevOverlaySig;
    this.prevOverlaySig = i;
    let l = r !== null && o !== null && !Fve(this.selection) || !!this.searchHighlightQuery || !!s,
      c = this.renderer({
        frontFrame: this.frontFrame,
        backFrame: this.backFrame,
        isTTY: this.options.stdout.isTTY,
        terminalWidth: t,
        terminalRows: n,
        altScreen: this.altScreenActive,
        prevFrameContaminated: a,
        overlayActive: l
      }),
      u = performance.now() - e;
    if (this.frameSink) {
      let F = this.frameSink(c, this.stylePool);
      if (F) {
        if (this.backFrame = this.frontFrame, this.frontFrame = c, this.prevFrameContaminated = false, this.maybeResetPools(e), F === "tick") this.drainTimer = setTimeout(() => this.onRender(), lF >> 2);
        this.options.onFrame?.({
          durationMs: performance.now() - e,
          flickers: []
        });
        return;
      }
    }
    let d = c.followScroll ?? null;
    if (d && this.selection.anchor && this.selection.anchor.row >= d.viewportTop && this.selection.anchor.row <= d.viewportBottom) {
      let {
          delta: F,
          viewportTop: W,
          viewportBottom: G
        } = d,
        K = F > 0 ? W : G + F + 1,
        Q = F > 0 ? W + F - 1 : G,
        V = F > 0 ? "above" : "below";
      if (this.selection.isDragging) {
        if (vZ(this.selection)) WUr(this.selection, this.frontFrame.screen, K, Q, V);
        Vbi(this.selection, -F, W, G);
      } else if (!this.selection.focus || this.selection.focus.row >= W && this.selection.focus.row <= G) {
        if (vZ(this.selection)) WUr(this.selection, this.frontFrame.screen, K, Q, V);
        Gbi(this.selection, -F, W, G, this.frontFrame.screen.width);
      }
    }
    let p = false,
      m = false;
    if (this.altScreenActive) {
      if (p = vZ(this.selection) && !Fve(this.selection), p) Ybi(c.screen, this.selection, this.stylePool);
      if (m = fCi(c.screen, this.searchHighlightQuery, this.stylePool), this.searchPositions) {
        let F = this.searchPositions,
          W = dCi(c.screen, this.stylePool, F.positions, F.rowOffset, F.currentIdx);
        m = m || W;
      }
    }
    if (c.layoutShifted || p || m || a || this.altScreenFullRepaint && this.altScreenActive) c.screen.damage = {
      x: 0,
      y: 0,
      width: c.screen.width,
      height: c.screen.height
    };
    let f = this.frontFrame;
    if (this.altScreenActive) {
      if (f = {
        ...this.frontFrame,
        cursor: Tsd
      }, this.altScreenFullRepaint) {
        let {
          width: F,
          height: W
        } = this.frontFrame.screen;
        if (this.fullRepaintSentinelScreen?.width !== F || this.fullRepaintSentinelScreen.height !== W) this.fullRepaintSentinelScreen = wK(F, W, this.stylePool, this.charPool, this.hyperlinkPool), Rbi(this.fullRepaintSentinelScreen);
        f = {
          ...f,
          screen: this.fullRepaintSentinelScreen
        };
      }
    }
    let A = performance.now(),
      h = this.log.render(f, c, this.altScreenActive, aTn && !this.altScreenFullRepaint),
      g = performance.now() - A;
    this.backFrame = this.frontFrame, this.frontFrame = c;
    let _ = [];
    for (let F of h) if (F.type === "clearTerminal") {
      if (_.push({
        desiredHeight: c.screen.height,
        availableHeight: c.viewport.height,
        reason: F.reason
      }), kUr() && F.debug) {
        let W = ZSi(this.rootNode, F.debug.triggerY);
        v(`[REPAINT] full reset \xB7 ${F.reason} \xB7 row ${F.debug.triggerY}
  prev: "${F.debug.prevLine}"
  next: "${F.debug.nextLine}"
  culprit: ${W.length ? W.join(" < ") : "(no owner chain captured)"}`, {
          level: "warn"
        });
      }
    }
    let y = performance.now(),
      T = a2r(h),
      S = performance.now() - y,
      C = T.length > 0;
    if (this.altScreenActive && C) {
      if (this.needsEraseBeforePaint) this.needsEraseBeforePaint = false, T.unshift(bsd);else T.unshift(Ssd);
      T.push(this.altScreenParkPatch);
    }
    let R = this.cursorDeclaration,
      k = R !== null ? b_.get(R.node) : undefined,
      x = R !== null && k !== undefined ? {
        x: k.x + R.relativeX,
        y: k.y + R.relativeY
      } : null,
      I = this.displayCursor,
      H = x !== null && (I === null || I.x !== x.x || I.y !== x.y),
      P = this.options.nativeCursor && x !== null && R !== null && (R.visible || this.accessibilityMode) !== this.nativeCursorVisible;
    if (C || H || P || x === null && I !== null) {
      let F = n - 1,
        W = G => Math.max(-F, Math.min(F, G));
      if (I !== null && !this.altScreenActive && C) {
        let G = f.cursor.x - I.x,
          K = W(f.cursor.y - I.y);
        if (G !== 0 || K !== 0) T.unshift({
          type: "stdout",
          content: Jse(G, K)
        });
      }
      if (x !== null) {
        if (this.altScreenActive) {
          let G = Math.min(Math.max(x.y + 1, 1), n),
            K = Math.min(Math.max(x.x + 1, 1), t);
          T.push({
            type: "stdout",
            content: y4(G, K)
          });
        } else {
          let G = !C && I !== null ? I : {
              x: c.cursor.x,
              y: c.cursor.y
            },
            K = x.x - G.x,
            Q = W(x.y - G.y);
          if (K !== 0 || Q !== 0) T.push({
            type: "stdout",
            content: Jse(K, Q)
          });
        }
        if (this.displayCursor = x, this.options.nativeCursor || this.bgWorkerForceShowCursor) {
          let G = this.bgWorkerForceShowCursor || R !== null && R.visible || this.accessibilityMode;
          if (this.nativeCursorVisible) T.unshift({
            type: "cursorHide"
          });
          if (G) T.push({
            type: "cursorShow"
          });
          this.nativeCursorVisible = G;
        }
      } else {
        if (I !== null && !this.altScreenActive && !C) {
          let G = c.cursor.x - I.x,
            K = W(c.cursor.y - I.y);
          if (G !== 0 || K !== 0) T.push({
            type: "stdout",
            content: Jse(G, K)
          });
        }
        if (this.displayCursor = null, (this.options.nativeCursor || this.bgWorkerForceShowCursor) && this.nativeCursorVisible && !this.accessibilityMode) T.unshift({
          type: "cursorHide"
        }), this.nativeCursorVisible = false;
      }
    }
    if (C) this.maybeProactiveAtlasReset(T);
    let O = performance.now();
    DFr(this.terminal, T, this.skipSyncMarkers(), n);
    let D = performance.now() - O;
    if (this.maybeResetPools(e), this.prevFrameContaminated = false, c.scrollDrainPending) this.drainTimer = setTimeout(() => this.onRender(), lF >> 2);
    let M = Tbi(),
      U = bbi(),
      $ = this.lastYogaCounters;
    Ebi(), this.lastYogaCounters = {
      ms: 0,
      visited: 0,
      measured: 0,
      cacheHits: 0,
      live: 0
    }, this.options.onFrame?.({
      durationMs: performance.now() - e,
      phases: {
        renderer: u,
        diff: g,
        optimize: S,
        write: D,
        patches: h.length,
        yoga: M,
        commit: U,
        yogaVisited: $.visited,
        yogaMeasured: $.measured,
        yogaCacheHits: $.cacheHits,
        yogaLive: $.live,
        ...(this.liveCountsEnabled && this.shouldSampleLiveCounts() && {
          domLive: HEi(this.rootNode),
          fiberLive: kEi(this.container.current)
        })
      },
      flickers: _
    });
  }
  static LIVE_COUNTS_INTERVAL_MS = 100;
  liveCountsEnabled;
  lastLiveCountSampleAt = 0;
  shouldSampleLiveCounts() {
    let e = performance.now();
    if (e - this.lastLiveCountSampleAt < fZe.LIVE_COUNTS_INTERVAL_MS) return false;
    return this.lastLiveCountSampleAt = e, true;
  }
  onRenderScreenReader() {
    let e = BIt(this.rootNode),
      t = this.options.stdout.columns || 80,
      n = e === "" ? [] : e.split(`
`),
      r = [],
      o = [];
    for (let y of n) if (o.push(r.length), y === "") r.push("");else {
      let T = u$(y, t, {
        trim: false,
        hard: true
      });
      for (let S of T.split(`
`)) r.push(S.trimEnd());
    }
    let s = this.prevScreenReaderLines,
      i = Math.max(0, r.length - 1),
      a = this.computeScreenReaderPark(e, o, r, t) ?? {
        row: i,
        col: nn(r[i] ?? "")
      },
      l = 0,
      c = Math.min(s.length, r.length);
    while (l < c && s[l] === r[l]) l++;
    let u = l === s.length && l === r.length,
      d = this.prevScreenReaderPark,
      p = a.row === d.row && a.col === d.col;
    if (u && p) return;
    let m = Math.max(0, s.length - 1),
      f = d.row !== m ? Jse(0, m - d.row) : "",
      A = gyn(s.length - l),
      h = r.slice(l).join(`
`),
      g;
    if (u) g = "";else if (l === s.length) g = l > 0 ? `
${h}` : h;else if (h === "") g = l > 0 ? A + Jse(0, -1) : A;else g = A + h;
    let _ = hyn(a.col + 1) + (a.row !== i ? Jse(0, a.row - i) : "");
    this.options.stdout.write(f + g + _), this.prevScreenReaderLines = r, this.prevScreenReaderPark = a;
  }
  computeScreenReaderPark(e, t, n, r) {
    let o = this.cursorDeclaration;
    if (o === null) return null;
    let s = b2r(this.rootNode, o.node);
    if (s === null) return null;
    let i = e.slice(0, s),
      l = Wu(i, `
`) + o.relativeY;
    if (l < 0 || l >= t.length) return null;
    let c = i.lastIndexOf(`
`) + 1,
      d = (o.relativeY === 0 ? nn(e.slice(c, s)) : 0) + o.relativeX,
      p = r > 0 ? Math.floor(d / r) : 0,
      m = Math.min(t[l] + p, n.length - 1),
      f = r > 0 ? d % r : d;
    return {
      row: Math.max(0, m),
      col: Math.max(0, f)
    };
  }
  pause() {
    sie.flushSyncFromReconciler(), this.onRender(), this.isPaused = true;
  }
  resume() {
    this.isPaused = false, this.onRender();
  }
  repaint() {
    this.frontFrame = Wve(this.frontFrame.viewport.height, this.frontFrame.viewport.width, this.stylePool, this.charPool, this.hyperlinkPool), this.backFrame = Wve(this.backFrame.viewport.height, this.backFrame.viewport.width, this.stylePool, this.charPool, this.hyperlinkPool), this.log.reset(), this.displayCursor = null, this.prevFrameContaminated = true, this.resetScreenReaderDiffState();
  }
  emitAtlasReset(e) {
    if (e) e.unshift({
      type: "stdout",
      content: hCi
    });else this.options.stdout.write(hCi);
    sFr(), this.lastAtlasResetAt = performance.now();
  }
  maybeProactiveAtlasReset(e) {
    if (!IFe) return;
    if (nFr) return;
    if (QHt().atlasKeys < Esd) return;
    if (!k_i && performance.now() - this.lastAtlasResetAt < Csd) return;
    if (!Dy()) return;
    this.emitAtlasReset(e), rFr("delta");
  }
  proactiveAtlasResetOnFocus() {
    if (IFe && !nFr && this.options.stdout.isTTY && !this.isUnmounted && !this.isPaused && Dy()) this.emitAtlasReset(), rFr("focus");
  }
  forceRedraw() {
    if (!this.options.stdout.isTTY || this.isUnmounted || this.isPaused) return false;
    if (Dy()) this.emitAtlasReset();
    if (this.hasStaleTerminalSize()) return this.handleResize(), true;
    if (this.altScreenActive) this.needsEraseBeforePaint = true, this.displayCursor = null, this.resetFramesForAltScreen();else this.log.forceFullReset(), this.prevFrameContaminated = true;
    return this.resetScreenReaderDiffState(), this.onRender(), true;
  }
  async probeExternalClear(e) {
    if (!this.altScreenActive || this.isPaused || this.isUnmounted) return false;
    let t = this.displayCursor;
    if (!t || t.y < 1) return false;
    let n = await e.send(ysd);
    if (n?.row !== 1) return false;
    return v(`probeExternalClear: detected wipe (parked at y=${t.y}, terminal reports row=1 col=${n.col})`), this.forceRedraw(), true;
  }
  invalidatePrevFrame() {
    this.prevFrameContaminated = true;
  }
  setAltScreenActive(e, t = false) {
    if (this.altScreenActive === e) return;
    if (this.altScreenActive = e, this.altScreenMouseTracking = e && t, e) this.ensureInteractive(), this.resetFramesForAltScreen();else this.repaint();
  }
  get isAltScreenActive() {
    return this.altScreenActive;
  }
  handoffAltScreen() {
    this.isPaused = true, this.altScreenActive = false;
  }
  handoffRawMode() {
    this._handoffRawMode = true;
  }
  get isHandoffRawMode() {
    return this._handoffRawMode;
  }
  get hasUnmounted() {
    return this.isUnmounted;
  }
  getStylePool() {
    return this.stylePool;
  }
  getCharPool() {
    return this.charPool;
  }
  getHyperlinkPool() {
    return this.hyperlinkPool;
  }
  reassertTerminalModes = (e = false) => {
    if (!this.options.stdout.isTTY) return;
    if (this.isPaused) return;
    if (this.options.stdout.write(Ayn), this.options.stdout.write(_Z()), !this.altScreenActive) return;
    if (this.altScreenMouseTracking) this.options.stdout.write(Rve);
    if (e) this.reenterAltScreen();
  };
  detachForShutdown() {
    if (!this.isUnmounted && !this.altScreenActive && this.displayCursor !== null && this.options.stdout.isTTY) {
      let t = this.frontFrame.cursor.x - this.displayCursor.x,
        n = this.frontFrame.cursor.y - this.displayCursor.y;
      if (t !== 0 || n !== 0) c5.writeSync(1, Jse(t, n));
      this.displayCursor = null;
    }
    this.isUnmounted = true, this.scheduleRender.cancel?.();
    let e = this.options.stdin;
    if (this.drainStdin(), e.isTTY && e.isRaw) C0(e, false);
    for (let t of new Set([e, process.stdin])) t.removeAllListeners("readable"), t.removeAllListeners("data"), t.removeAllListeners("keypress"), t.pause(), t.unref?.();
  }
  drainStdin() {
    E0T(this.options.stdin);
  }
  reenterAltScreen() {
    this.options.stdout.write(xve() + (this.altScreenMouseTracking ? Rve : "")), this.resetFramesForAltScreen(), this.onRender();
  }
  resetFramesForAltScreen() {
    let e = this.terminalRows,
      t = this.terminalColumns,
      n = () => ({
        screen: wK(t, e, this.stylePool, this.charPool, this.hyperlinkPool),
        viewport: {
          width: t,
          height: e + 1
        },
        cursor: {
          x: 0,
          y: 0,
          visible: true
        }
      });
    this.frontFrame = n(), this.backFrame = n(), this.log.reset(), this.displayCursor = null, this.prevFrameContaminated = true;
  }
  copySelectionNoClear() {
    if (!vZ(this.selection)) return "";
    let e = zbi(this.selection, this.frontFrame.screen);
    if (e) VR(e).then(t => {
      if (t) this.options.stdout.write(t);
    });
    return e;
  }
  copySelection() {
    if (!vZ(this.selection)) return "";
    let e = this.copySelectionNoClear();
    return wIt(this.selection), this.notifySelectionChange(), e;
  }
  clearTextSelection() {
    if (!vZ(this.selection)) return;
    wIt(this.selection), this.notifySelectionChange();
  }
  setSearchHighlight(e) {
    if (this.searchHighlightQuery === e) return;
    this.searchHighlightQuery = e, this.scheduleRender();
  }
  scanElementSubtree(e) {
    if (!this.searchHighlightQuery || !e.yogaNode) return [];
    let t = Math.ceil(e.yogaNode.getComputedWidth()),
      n = Math.ceil(e.yogaNode.getComputedHeight());
    if (t <= 0 || n <= 0) return [];
    let r = e.yogaNode.getComputedLeft(),
      o = e.yogaNode.getComputedTop(),
      s = wK(t, n, this.stylePool, this.charPool, this.hyperlinkPool),
      i = new Ffe({
        width: t,
        height: n,
        stylePool: this.stylePool,
        screen: s
      });
    VFe(e, i, GFe(), {
      offsetX: -r,
      offsetY: -o,
      prevScreen: undefined
    });
    let a = i.get();
    BO(e);
    let l = uCi(a, this.searchHighlightQuery);
    return v(`scanElementSubtree: q='${this.searchHighlightQuery}' el=${t}x${n}@(${r},${o}) n=${l.length} [${l.slice(0, 10).map(c => `${c.row}:${c.col}`).join(",")}${l.length > 10 ? ",\u2026" : ""}]`), l;
  }
  setSearchPositions(e) {
    this.searchPositions = e, this.scheduleRender();
  }
  setSelectionBgColor(e) {
    let t = vve("\x00", e, "background"),
      n = t.indexOf("\x00");
    if (n <= 0 || n === t.length - 1) {
      this.stylePool.setSelectionBg(null);
      return;
    }
    this.stylePool.setSelectionBg({
      type: "ansi",
      code: t.slice(0, n),
      endCode: t.slice(n + 1)
    });
  }
  moveSelectionFocus(e) {
    if (!this.altScreenActive) return;
    let {
      focus: t
    } = this.selection;
    if (!t) return;
    let {
        width: n,
        height: r
      } = this.frontFrame.screen,
      o = n - 1,
      s = r - 1,
      {
        col: i,
        row: a
      } = t;
    switch (e) {
      case "left":
        if (i > 0) i--;else if (a > 0) i = o, a--;
        break;
      case "right":
        if (i < o) i++;else if (a < s) i = 0, a++;
        break;
      case "up":
        if (a > 0) a--;
        break;
      case "down":
        if (a < s) a++;
        break;
      case "lineStart":
        i = 0;
        break;
      case "lineEnd":
        i = o;
        break;
    }
    if (i === t.col && a === t.row) return;
    Wbi(this.selection, i, a), this.notifySelectionChange();
  }
  hasTextSelection() {
    return vZ(this.selection);
  }
  subscribeToSelectionChange(e) {
    return this.selectionListeners.add(e), () => this.selectionListeners.delete(e);
  }
  notifySelectionChange() {
    this.scheduleRender();
    for (let e of this.selectionListeners) e();
  }
  dispatchClick(e, t) {
    if (!this.altScreenActive) return false;
    let n = UFe(this.frontFrame.screen, e, t),
      r = this.getHyperlinkAt(e, t);
    return wEi(this.rootNode, e, t, n, r);
  }
  dispatchHover(e, t) {
    if (!this.altScreenActive) return;
    let n = UFe(this.frontFrame.screen, e, t);
    REi(this.rootNode, e, t, this.hoveredNodes, n);
  }
  dispatchPasteEvent(e) {
    let t = this.focusManager.activeElement ?? this.rootNode;
    i5.dispatchDiscrete(t, new jve(e));
  }
  dispatchWheelEvent = e => {
    let t = e.col != null && e.row != null ? HIt(this.rootNode, e.col - 1, e.row - 1) : null,
      r = (t && S0T(t) ? t : null) ?? this.focusManager.activeElement ?? this.rootNode,
      o = e.name === "wheeldown" ? 1 : -1;
    i5.dispatchContinuous(r, new r2r(o, {
      ctrl: e.ctrl,
      shift: e.shift,
      meta: e.meta || e.option
    }));
  };
  dispatchKeyboardEvent(e) {
    let n = this.focusManager.activeElement ?? this.rootNode,
      r = new cZe(e);
    if (i5.dispatchDiscrete(n, r), !r.defaultPrevented && e.name === "tab" && !e.ctrl && !e.meta) if (e.shift) this.focusManager.focusPrevious(this.rootNode);else this.focusManager.focusNext(this.rootNode);
  }
  getHyperlinkAt(e, t) {
    if (!this.altScreenActive) return;
    let n = this.frontFrame.screen,
      r = d$(n, e, t),
      o = r?.hyperlink;
    if (!o && r?.width === 2 && e > 0) o = d$(n, e - 1, t)?.hyperlink;
    return o ?? $bi(n, e, t);
  }
  onHyperlinkClick;
  openHyperlink(e) {
    this.onHyperlinkClick?.(e);
  }
  handleMultiClick(e, t, n) {
    if (!this.altScreenActive) return;
    let r = this.frontFrame.screen;
    if (NTn(this.selection, e, t), n === 2) Ubi(this.selection, r, e, t);else qbi(this.selection, r, t);
    if (!this.selection.focus) this.selection.focus = this.selection.anchor;
    this.notifySelectionChange();
  }
  handleSelectionDrag(e, t) {
    if (!this.altScreenActive) return;
    let n = this.selection;
    if (n.anchorSpan) jbi(n, this.frontFrame.screen, e, t);else Bbi(n, e, t);
    this.notifySelectionChange();
  }
  stdinListeners = [];
  wasRawMode = false;
  suspendStdin() {
    let e = this.options.stdin;
    if (!e.isTTY) return;
    let t = e.listeners("readable");
    v(`[stdin] suspendStdin: removing ${t.length} readable listener(s), wasRawMode=${e.isRaw ?? false}`), t.forEach(r => {
      this.stdinListeners.push({
        event: "readable",
        listener: r
      }), e.removeListener("readable", r);
    });
    let n = e;
    if (n.isRaw) C0(n, false), this.wasRawMode = true;
  }
  resumeStdin() {
    let e = this.options.stdin;
    if (!e.isTTY) return;
    if (this.stdinListeners.length === 0 && !this.wasRawMode) v("[stdin] resumeStdin: called with no stored listeners and wasRawMode=false (possible desync)", {
      level: "warn"
    });
    if (v(`[stdin] resumeStdin: re-attaching ${this.stdinListeners.length} listener(s), wasRawMode=${this.wasRawMode}`), this.stdinListeners.forEach(({
      event: t,
      listener: n
    }) => {
      e.addListener(t, n);
    }), this.stdinListeners = [], this.wasRawMode) C0(e, true), this.wasRawMode = false;
  }
  writeRaw(e) {
    this.options.stdout.write(e);
  }
  setCursorDeclaration = (e, t) => {
    if (e === null && t !== undefined && this.cursorDeclaration?.node !== t) return;
    this.cursorDeclaration = e;
  };
  render(e) {
    this.renderCalled = true, this.currentNode = e;
    let t = ZTn.default.createElement(qTn, {
      stdin: this.options.stdin,
      stdout: this.options.stdout,
      stderr: this.options.stderr,
      exitOnCtrlC: this.options.exitOnCtrlC,
      onExit: this.unmount,
      terminalColumns: this.terminalColumns,
      terminalRows: this.terminalRows,
      selection: this.selection,
      onSelectionChange: this.notifySelectionChange,
      onClickAt: this.dispatchClick,
      onHoverAt: this.dispatchHover,
      getHyperlinkAt: this.getHyperlinkAt,
      onOpenHyperlink: this.openHyperlink,
      onMultiClick: this.handleMultiClick,
      onSelectionDrag: this.handleSelectionDrag,
      onStdinResume: this.reassertTerminalModes,
      onRawModeEnter: this.ensureInteractive,
      onCursorDeclaration: this.setCursorDeclaration,
      dispatchKeyboardEvent: this.dispatchKeyboardEvent,
      dispatchPasteEvent: this.dispatchPasteEvent,
      dispatchWheelEvent: this.dispatchWheelEvent,
      focusManager: this.focusManager,
      rootNode: this.rootNode,
      isScreenReaderEnabled: this.isScreenReaderEnabled
    }, ZTn.default.createElement(jyn.Provider, {
      value: this.isScreenReaderEnabled
    }, ZTn.default.createElement(XTn, {
      value: this.writeRaw
    }, e)));
    sie.updateContainerSync(t, this.container, null, Dfe), sie.flushSyncWork();
  }
  unmount(e) {
    if (this.isUnmounted) return;
    if (this.isExiting = true, this.onRender(), this.unsubscribeExit(), typeof this.restoreConsole === "function") this.restoreConsole();
    if (this.restoreStderr?.(), this.unsubscribeTTYHandlers?.(), this.renderCalled && !this.isPaused) {
      let t = this.log.renderPreviousOutput_DEPRECATED(this.frontFrame);
      DFr(this.terminal, a2r(t), this.skipSyncMarkers(), this.options.stdout.rows || 24);
    }
    if (this.options.stdout.isTTY) try {
      if (this.altScreenActive) c5.writeSync(1, oF()), this.altScreenActive = false;
      c5.writeSync(1, nie), this.drainStdin(), JTn();
    } catch (t) {
      if (Jp(t)) v(`unmount terminal cleanup writeSync failed: ${t}`, {
        level: "error"
      });else throw t;
    }
    if (this.isUnmounted = true, this.scheduleRender.cancel?.(), this.drainTimer !== null) clearTimeout(this.drainTimer), this.drainTimer = null;
    if (sie.updateContainerSync(null, this.container, null, Dfe), sie.flushSyncWork(), Vu.delete(this.options.stdout), this.rootNode.yogaNode?.free(), this.rootNode.yogaNode = undefined, e instanceof Error) this.rejectExitPromise(e);else this.resolveExitPromise();
  }
  async waitUntilExit() {
    return this.exitPromise ||= new Promise((e, t) => {
      this.resolveExitPromise = e, this.rejectExitPromise = t;
    }), this.exitPromise;
  }
  resetLineCount() {
    if (this.options.stdout.isTTY) this.backFrame = this.frontFrame, this.frontFrame = Wve(this.frontFrame.viewport.height, this.frontFrame.viewport.width, this.stylePool, this.charPool, this.hyperlinkPool), this.log.reset(), this.displayCursor = null;
  }
  maybeResetPools(e) {
    let t = e - this.lastPoolResetTime;
    if (t <= 30000) return;
    if (t <= 300000 && !this.stylePool.needsCompaction(this.lastStyleLiveSize)) return;
    this.lastPoolResetTime = e, this.resetPools();
  }
  resetPools() {
    let e = this.hyperlinkPool.size > wbi,
      t = this.stylePool.needsCompaction(this.lastStyleLiveSize);
    if (!e && !t) return;
    if (e) this.hyperlinkPool = new CIt();
    if (kbi(this.frontFrame.screen, this.charPool, this.hyperlinkPool, t ? this.stylePool.compact() : undefined), t) this.lastStyleLiveSize = this.stylePool.size;
    this.backFrame.screen.hyperlinkPool = this.hyperlinkPool, this.fullRepaintSentinelScreen = undefined;
  }
  patchConsole() {
    let e = console,
      t = {},
      n = (...s) => v(`console.log: ${UIt.format(...s)}`),
      r = s => (...i) => Ie(Error(`console.${s}: ${UIt.format(...i)}`)),
      o = s => (...i) => v(`console.${s}: ${UIt.format(...i)}`, {
        level: "warn"
      });
    for (let s of JU4) t[s] = e[s], e[s] = n;
    for (let s of s4) t[s] = e[s], e[s] = s === "error" ? (...i) => v(`console.error: ${UIt.format(...i)}`, {
      level: "error"
    }) : o(s);
    return t.assert = e.assert, e.assert = (s, ...i) => {
      if (!s) r("assert")(...i);
    }, () => Object.assign(e, t);
  }
  patchStderr() {
    let e = process.stderr,
      t = e.write,
      n = false,
      r = (o, s, i) => {
        let a = typeof s === "function" ? s : i;
        if (n) {
          let l = typeof s === "string" ? s : undefined;
          return t.call(e, o, l, a);
        }
        n = true;
        try {
          let l = typeof o === "string" ? o : Buffer.from(o).toString("utf8");
          if (v(`[stderr] ${l}`, {
            level: "warn"
          }), this.altScreenActive && !this.isUnmounted && !this.isPaused) this.prevFrameContaminated = true, this.scheduleRender();
        } finally {
          n = false, a?.();
        }
        return true;
      };
    return e.write = r, () => {
      if (e.write === r) e.write = t;
    };
  }
}
function E0T(e = process.stdin) {
  if (!e.isTTY) return;
  try {
    while (e.read() !== null);
  } catch {}
  let t = e,
    n = t.isRaw === true,
    r = -1;
  try {
    if (!n) t.setRawMode?.(true);
    r = c5.openSync("/dev/tty", c5.constants.O_RDONLY | c5.constants.O_NONBLOCK);
    let o = Buffer.alloc(1024);
    for (let s = 0; s < 64; s++) if (c5.readSync(r, o, 0, o.length, null) <= 0) break;
  } catch {} finally {
    if (r >= 0) try {
      c5.closeSync(r);
    } catch {}
    if (!n) try {
      t.setRawMode?.(false);
    } catch {}
  }
}
function S0T(usage) {
  let t = usage;
  while (t) {
    if (t._eventHandlers?.onWheel) return true;
    t = t.parentNode;
  }
  return false;
}
var c5,
  ZTn,
  _Ci,
  UIt,
  w2r = 8192,
  ysd,
  Tsd,
  Ssd,
  bsd,
  hCi = "\x1B]104;255\x07",
  Esd = 2000,
  Csd = 2000,
  JU4,
  s4;
var pd = b(() => {
  qBr();
  Ggi();
  _7e();
  ct();
  Byn();
  Ct();
  je();
  Or();
  an();
  St();
  wn();
  $s();
  Cve();
  fr();
  OQe();
  s5();
  aFr();
  e2r();
  YQe();
  t2r();
  n2r();
  CEi();
  Bfe();
  vEi();
  xEi();
  _k();
  IEi();
  LEi();
  Mfe();
  OIt();
  ZQe();
  NIt();
  cCi();
  pCi();
  mCi();
  C2r();
  C4();
  ACi();
  xIt();
  xc();
  v2r();
  zS();
  Syn();
  aZ();
  NO();
  bK();
  og();
  w4();
  Ove();
  c5 = require("fs"), ZTn = L(Te(), 1), _Ci = L(xyn(), 1), UIt = require("util"), ysd = bgi(), Tsd = Object.freeze({
    x: 0,
    y: 0,
    visible: false
  }), Ssd = Object.freeze({
    type: "stdout",
    content: iC
  }), bsd = Object.freeze({
    type: "stdout",
    content: LH + iC
  });
  JU4 = ["log", "info", "debug", "dir", "dirxml", "count", "countReset", "group", "groupCollapsed", "groupEnd", "table", "time", "timeEnd", "timeLog"], s4 = ["warn", "error", "trace"];
});

export {iLq as Evi,fZe as DZe,E0T as PZe,S0T as Jad,c5 as R5,ZTn as MSn,_Ci as Cvi,UIt as a0t,w2r as y$r,ysd as qad,Tsd as jad,Ssd as Wad,bsd as Gad,hCi as bvi,Esd as Vad,Csd as Kad,JU4 as zad,s4 as Yad,pd as NSn};

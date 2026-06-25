// @ts-nocheck
import {Z3,O8,aie,ihe,iie,UEn,BEn,dO,yE,Mk} from "../../vendor/m2278.ts";
import {QHi,Bve,IZ,hqr,aIi,iIi,uIi,cIi,CPt,sIi,nIi,iAn,tIi,rIi,oIi,ZHi,RPt} from "../../vendor/m2387.ts";
import {p3r,ahe,m3r} from "../../vendor/m2286.ts";
import {Ne} from "../../vendor/m583.ts";
import {nt} from "../../vendor/m127.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {JM,kve,mie,HCn,vCn,r4,mz} from "../../vendor/m2349.ts";
import {tAn,eAn,bPt,_z,qHi,l2e,G2,$Hi,GHi,o4} from "../../vendor/m2386.ts";
import {YRi,I3r,QUe,w3r,zDt,GRi,k3r,ett} from "../../vendor/m2297.ts";
import {Wve,WIi} from "../../vendor/m2405.ts";
import {Hqr,ZIi} from "../../vendor/m2409.ts";
import {sRi,iRi} from "../../vendor/m2292.ts";
import {UF} from "../../vendor/m2389.ts";
import {ZX,Pje} from "../../vendor/m673.ts";
import {gPt,fHi,pO,mtt} from "../../vendor/m2377.ts";
import {FocusManager as htt,mhe} from "../../vendor/m2382.ts";
import {F8,OHi,kZ,eqr,LHi,NHi,FHi,_tt} from "./2385__eventHandlers.ts";
import {zqr,D0i} from "../../vendor/m2422.ts";
import {iCn,aCn} from "../../vendor/m2295.ts";
import {isNonMainSubagent as EZ,LF,ICn,r4r,xy,Hve,MF,nS} from "./2351_nS.ts";
import {flushInteractionTime as jsr,lt} from "../session/0132_sent.ts";
import {P0i,O0i} from "../../vendor/m2424.ts";
import {I0i,H0i,x0i} from "../../vendor/m2421.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {xqr} from "../../vendor/m2410.ts";
import {Zg,dhe} from "../../vendor/m2362.ts";
import {jIi,zIi,YIi} from "../../vendor/m2408.ts";
import {MPt,Kqr,k0i} from "../../vendor/m2420.ts";
import {DN,ppe} from "../../vendor/m238.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {nu,lr} from "../../vendor/m233.ts";
import {FEn,fsModule as dZ} from "../../vendor/m2277.ts";
import {W0,vve} from "../../vendor/m2296.ts";
import {sw,hg} from "../../vendor/m2280.ts";
import {hhe,DPt} from "../../vendor/m2413.ts";
import {m2e,p2e,LPt} from "../../vendor/m2419.ts";
import {wve,N8} from "./2299_level.ts";
import {GIi,VIi,kPt,KIi} from "../../vendor/m2407.ts";
import {fhe,pAn} from "../../vendor/m2403.ts";
import {wqr,qIi} from "../../vendor/m2404.ts";
import {ktt,vqr} from "../../vendor/m2402.ts";
import {dAn,Rqr} from "../tui/2402_stdout.ts";
import {pCn,D3r} from "../../vendor/m2299.ts";
import {bAn,i4} from "../../vendor/m2426.ts";
import {SAn,jqr} from "../../vendor/m2423.ts";
import {sp,Ct} from "../../vendor/m197.ts";
import {du,iw} from "../../vendor/m2302.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {b,x} from "../../runtime.ts";
import {kt} from "../../vendor/m132.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "./0137_namespace.ts";
import {Yqr} from "../../vendor/m2425.ts";
import {VEn,MAi} from "../../vendor/m2281.ts";
import {XEn} from "../../vendor/m2294.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Terminal renderer core (Ink-like).
 *
 * `Ptt` is the renderer/lifecycle controller that owns the front/back frame
 * buffers, the style/char/hyperlink pools, the focus manager, the text
 * selection state and the screen-reader output path. It drives the React
 * reconciler (`kZ`), diffs frames into ANSI patch streams and writes them to
 * the terminal, handling the alternate-screen buffer, cursor placement,
 * resize/resume signals, console patching and clean unmount.
 */

/**
 * Build the "park cursor on the last alt-screen row" patch for a given row
 * count (freezes a single stdout op that moves the cursor home-ish so the
 * alt-screen frame ends in a stable position).
 */
function M0i(rows: number) {
  return Object.freeze({
    type: "stdout",
    content: Z3(rows, 1)
  });
}

class Ptt {
  /** Renderer options (stdin/stdout/stderr streams, flags, callbacks). */
  options;
  /** Scrollback log model that renders persistent (non-alt-screen) output. */
  log;
  /** { stdout, stderr } streams written to during rendering. */
  terminal;
  /** Debounced trigger that schedules an `onRender` on the microtask queue. */
  scheduleRender;
  /** True once `unmount` has fully torn the renderer down. */
  isUnmounted = !1;
  /** True while rendering is paused (e.g. during alt-screen handoff). */
  isPaused = !1;
  /** React reconciler container handle. */
  container;
  /** Root DOM-like node of the render tree. */
  rootNode;
  /** Focus manager that routes keyboard focus between focusable elements. */
  focusManager;
  /** Frame renderer function produced by `zqr` for this root + style pool. */
  renderer;
  /** Interned style pool (deduplicates cell styles across frames). */
  stylePool;
  /** Interned character pool. */
  charPool;
  /** Interned hyperlink pool (OSC 8 targets). */
  hyperlinkPool;
  /** Promise resolved/rejected when the renderer exits (lazy). */
  exitPromise;
  /** Restores the patched `console.*` methods. */
  restoreConsole;
  /** Restores the patched `process.stderr.write`. */
  restoreStderr;
  /** Detaches the resize / SIGCONT TTY handlers. */
  unsubscribeTTYHandlers;
  /** Current terminal width in columns. */
  terminalColumns;
  /** Current terminal height in rows. */
  terminalRows;
  /** The React node currently being rendered (null before first render). */
  currentNode = null;
  /** Frame buffer reflecting what is currently shown on screen. */
  frontFrame;
  /** Previous frame buffer, reused for the next render. */
  backFrame;
  /** Timestamp of the last pool reset, for time-based compaction. */
  lastPoolResetTime = performance.now();
  /** Timestamp of the last sixel/atlas reset. */
  lastAtlasResetAt = 0;
  /** Live style-pool size sampled at the last compaction. */
  lastStyleLiveSize = 0;
  /** Pending timer that re-renders to drain scroll/animation state. */
  drainTimer = null;
  /** Yoga layout perf counters captured during the last layout pass. */
  lastYogaCounters = {
    ms: 0,
    visited: 0,
    measured: 0,
    cacheHits: 0,
    live: 0
  };
  /** Frozen patch that parks the cursor at the bottom of the alt screen. */
  altScreenParkPatch;
  /** Current text-selection model. */
  selection = QHi();
  /** Active search-highlight query string. */
  searchHighlightQuery = "";
  /** Active search match positions, or null. */
  searchPositions = null;
  /** Subscribers notified when the selection changes. */
  selectionListeners = new Set();
  /** Optional sink that intercepts rendered frames (test/recording hook). */
  frameSink = null;
  /** Set of nodes currently under the mouse (for hover dispatch). */
  hoveredNodes = new Set();
  /** True after the first frame has been rendered. */
  hasRendered = !1;
  /** True once `render` has been called at least once. */
  renderCalled = !1;
  /** True while exiting (suppresses re-arming interactive handlers). */
  isExiting = !1;
  /** True while the alternate screen buffer is active. */
  altScreenActive = !1;
  /** True if raw mode ownership was handed off to another consumer. */
  _handoffRawMode = !1;
  /** True while mouse tracking is enabled in the alt screen. */
  altScreenMouseTracking = !1;
  /** True when the previous frame is suspect and must be fully repainted. */
  prevFrameContaminated = !1;
  /** Signature of the previous overlay state (selection/search) for diffing. */
  prevOverlaySig = "";
  /** True when the screen must be erased before the next alt-screen paint. */
  needsEraseBeforePaint = !1;
  /** True when every alt-screen frame is fully repainted (no diffing). */
  altScreenFullRepaint;
  /** Windows bg-session workaround that force-shows the cursor. */
  bgWorkerForceShowCursor;
  /** Sentinel screen used to force full alt-screen repaints. */
  fullRepaintSentinelScreen;
  /** Declared cursor position from the component tree, or null. */
  cursorDeclaration = null;
  /** Cursor position currently shown on screen, or null. */
  displayCursor = null;
  /** Accessibility (high-contrast / native cursor) mode flag. */
  accessibilityMode;
  /** Whether the native terminal cursor is currently visible. */
  nativeCursorVisible;
  /** Whether screen-reader output mode is enabled. */
  isScreenReaderEnabled;
  /** Lines emitted on the previous screen-reader render, for diffing. */
  prevScreenReaderLines = [];
  /** Cursor "park" position from the previous screen-reader render. */
  prevScreenReaderPark = {
    row: 0,
    col: 0
  };

  /** Reset the screen-reader diff state so the next render emits in full. */
  resetScreenReaderDiffState() {
    this.prevScreenReaderLines = [], this.prevScreenReaderPark = {
      row: 0,
      col: 0
    };
  }

  constructor(options) {
    this.options = options;
    if (p3r(this), this.accessibilityMode = Ne.CLAUDE_CODE_ACCESSIBILITY, this.altScreenFullRepaint = nt(process.env.CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT), this.bgWorkerForceShowCursor = this.altScreenFullRepaint && !this.options.nativeCursor && process.env.CLAUDE_CODE_SESSION_KIND === "bg" && Yt() === "windows", this.nativeCursorVisible = this.accessibilityMode, this.liveCountsEnabled = nt(process.env.CLAUDE_CODE_BENCH_LIVE_COUNTS), this.isScreenReaderEnabled = options.isScreenReaderEnabled ?? (!!options.stdout.isTTY && nt(process.env.INK_SCREEN_READER)), this.options.patchConsole) this.restoreConsole = this.patchConsole(), this.restoreStderr = this.patchStderr();
    if (this.terminal = {
      stdout: options.stdout,
      stderr: options.stderr
    }, options.stdout === process.stdout) {
      if (options.stdout.isTTY) options.stdout.write("\x1B7" + O8 + "\x1B8" + JM);
    }
    this.terminalColumns = options.stdout.columns || 80, this.terminalRows = options.stdout.rows || 24, this.altScreenParkPatch = M0i(this.terminalRows), this.stylePool = new tAn(), YRi(this.stylePool), this.charPool = new eAn(), this.hyperlinkPool = new bPt(), this.frontFrame = Wve(this.terminalRows, this.terminalColumns, this.stylePool, this.charPool, this.hyperlinkPool), this.backFrame = Wve(this.terminalRows, this.terminalColumns, this.stylePool, this.charPool, this.hyperlinkPool), this.log = new Hqr({
      isTTY: options.stdout.isTTY || !1,
      stylePool: this.stylePool
    });
    let scheduleRenderTask = () => queueMicrotask(this.onRender);
    this.scheduleRender = sRi(scheduleRenderTask, UF, {
      leading: !0,
      trailing: !0
    }), this.isUnmounted = !1, this.unsubscribeExit = ZX(this.unmount, {
      alwaysLast: !1
    }), this.rootNode = gPt("ink-root"), this.focusManager = new htt((focusTarget, focusEvent) => F8.dispatchDiscrete(focusTarget, focusEvent)), this.rootNode.focusManager = this.focusManager, this.renderer = zqr(this.rootNode, this.stylePool), this.rootNode.onRender = this.scheduleRender, this.rootNode.onImmediateRender = this.onRender, this.rootNode.onComputeLayout = () => {
      if (this.isUnmounted) return;
      if (this.options.stdout.isTTY && this.syncTerminalSize()) {
        let nodeToReRender = this.currentNode;
        if (nodeToReRender !== null) queueMicrotask(() => {
          if (!this.isUnmounted) this.render(nodeToReRender);
        });
      }
      if (this.rootNode.yogaNode) {
        let layoutStart = performance.now(),
          yogaRoot = this.rootNode.yogaNode;
        if (this.options.stdout.isTTY || this.options.stdout.columns) yogaRoot.setWidth(this.terminalColumns), yogaRoot.calculateLayout(this.terminalColumns);else if (yogaRoot.setWidthAuto(), yogaRoot.calculateLayout(), yogaRoot.getComputedWidth() > Jqr) yogaRoot.setWidth(Jqr), yogaRoot.calculateLayout(Jqr);
        let layoutMs = performance.now() - layoutStart;
        OHi(layoutMs);
        let yogaStats = iCn();
        this.lastYogaCounters = {
          ms: layoutMs,
          ...yogaStats
        };
      }
    }, this.container = kZ.createContainer(this.rootNode, N0i.ConcurrentRoot, null, !1, null, "id", ahe, ahe, ahe, ahe);
  }

  /** SIGCONT handler: re-enter the alt screen or rebuild frame buffers. */
  handleResume = () => {
    if (!this.options.stdout.isTTY) return;
    if (this.altScreenActive) {
      this.reenterAltScreen();
      return;
    }
    this.frontFrame = Wve(this.frontFrame.viewport.height, this.frontFrame.viewport.width, this.stylePool, this.charPool, this.hyperlinkPool), this.backFrame = Wve(this.backFrame.viewport.height, this.backFrame.viewport.width, this.stylePool, this.charPool, this.hyperlinkPool), this.log.reset(), this.prevFrameContaminated = !0, this.displayCursor = null, this.nativeCursorVisible = this.accessibilityMode, this.resetScreenReaderDiffState();
  };

  /** True if the tracked terminal size no longer matches stdout's size. */
  hasStaleTerminalSize() {
    return (this.options.stdout.columns || 80) !== this.terminalColumns || (this.options.stdout.rows || 24) !== this.terminalRows;
  }

  /** Sync the cached terminal size with stdout; returns true if it changed. */
  syncTerminalSize() {
    let columns = this.options.stdout.columns || 80,
      rows = this.options.stdout.rows || 24;
    if (columns === this.terminalColumns && rows === this.terminalRows) return !1;
    if (this.terminalColumns = columns, this.terminalRows = rows, this.altScreenParkPatch = M0i(this.terminalRows), this.resetScreenReaderDiffState(), this.altScreenActive && !this.isPaused && this.options.stdout.isTTY) {
      if (this.altScreenMouseTracking) this.options.stdout.write(kve);
      this.resetFramesForAltScreen(), this.needsEraseBeforePaint = !0;
    }
    return !0;
  }

  /** Resize handler: sync size and re-render the current node if it changed. */
  handleResize = () => {
    if (!this.syncTerminalSize()) return;
    if (this.currentNode !== null) this.render(this.currentNode);
  };

  /** Resolves the exit promise (replaced lazily in `waitUntilExit`). */
  resolveExitPromise = () => {};
  /** Rejects the exit promise (replaced lazily in `waitUntilExit`). */
  rejectExitPromise = () => {};
  /** Detaches the process-exit handler (replaced in the constructor). */
  unsubscribeExit = () => {};

  /** Switch into the alternate screen buffer. */
  enterAlternateScreen() {
    this.pause(), this.options.stdout.write(aie + ihe + (this.altScreenMouseTracking ? mie : "") + (this.altScreenActive ? "" : "\x1B[?1049h") + "\x1B[?1004l\x1B[0m\x1B[?25h\x1B[2J\x1B[H"), this.suspendStdin();
  }

  /** Leave the alternate screen buffer and restore the main screen. */
  exitAlternateScreen() {
    if (this.resumeStdin(), this.altScreenActive) this.options.stdout.write(HCn + "\x1B[2J\x1B[H" + (this.altScreenMouseTracking ? kve : "") + "\x1B[?25l"), this.resetFramesForAltScreen();else this.options.stdout.write("\x1B[?1049l" + (this.altScreenMouseTracking ? kve : "") + "\x1B[?25l"), this.repaint();
    this.resume(), this.options.stdout.write(aie + ihe + "\x1B[?1004h" + vCn + EZ());
  }

  /** Arm resize/SIGCONT handlers and enable focus reporting (TTY only). */
  ensureInteractive = () => {
    if (this.unsubscribeTTYHandlers || !this.options.stdout.isTTY) return;
    if (!this.accessibilityMode && !this.isScreenReaderEnabled) this.options.stdout.write(r4);
    this.options.stdout.on("resize", this.handleResize), process.on("SIGCONT", this.handleResume), this.unsubscribeTTYHandlers = () => {
      this.options.stdout.off("resize", this.handleResize), process.off("SIGCONT", this.handleResume);
    };
  };

  /** True if synchronized-output markers should be skipped this frame. */
  skipSyncMarkers() {
    if (!this.options.stdout.isTTY) return !0;
    if (!LF()) return !0;
    if (!this.unsubscribeTTYHandlers) return !0;
    return !1;
  }

  /** Core render pass: diff the tree into ANSI patches and write them out. */
  onRender() {
    if (this.isUnmounted || this.isPaused) return;
    if (this.hasRendered && !this.isExiting) this.ensureInteractive();
    if (this.hasRendered = !0, this.drainTimer !== null) clearTimeout(this.drainTimer), this.drainTimer = null;
    if (jsr(), this.isScreenReaderEnabled) {
      this.onRenderScreenReader();
      return;
    }
    let frameStart = performance.now(),
      terminalWidth = this.options.stdout.columns || 80,
      terminalRows = this.options.stdout.rows || 24,
      {
        anchor: selectionAnchor,
        focus: selectionFocus
      } = this.selection,
      searchPositions = this.searchPositions,
      overlaySig = `${selectionAnchor?.row},${selectionAnchor?.col},${selectionFocus?.row},${selectionFocus?.col}|${this.searchHighlightQuery}|${searchPositions?.currentIdx},${searchPositions?.rowOffset},${searchPositions?.positions.length}`,
      overlayChanged = this.prevFrameContaminated || overlaySig !== this.prevOverlaySig;
    this.prevOverlaySig = overlaySig;
    let overlayActive = selectionAnchor !== null && selectionFocus !== null && !Bve(this.selection) || !!this.searchHighlightQuery || !!searchPositions,
      rendered = this.renderer({
        frontFrame: this.frontFrame,
        backFrame: this.backFrame,
        isTTY: this.options.stdout.isTTY,
        terminalWidth: terminalWidth,
        terminalRows: terminalRows,
        altScreen: this.altScreenActive,
        prevFrameContaminated: overlayChanged,
        overlayActive: overlayActive
      }),
      rendererMs = performance.now() - frameStart;
    if (this.frameSink) {
      let sinkResult = this.frameSink(rendered, this.stylePool);
      if (sinkResult) {
        if (this.backFrame = this.frontFrame, this.frontFrame = rendered, this.prevFrameContaminated = !1, this.maybeResetPools(frameStart), sinkResult === "tick") this.drainTimer = setTimeout(() => this.onRender(), UF >> 2);
        this.options.onFrame?.({
          durationMs: performance.now() - frameStart,
          flickers: []
        });
        return;
      }
    }
    let followScroll = rendered.followScroll ?? null;
    if (followScroll && this.selection.anchor && this.selection.anchor.row >= followScroll.viewportTop && this.selection.anchor.row <= followScroll.viewportBottom && (this.selection.virtualAnchorCol ?? this.selection.anchor.col) >= followScroll.viewportLeft && (this.selection.virtualAnchorCol ?? this.selection.anchor.col) <= followScroll.viewportRight) {
      let {
          delta: scrollDelta,
          viewportTop: viewportTop,
          viewportBottom: viewportBottom
        } = followScroll,
        revealTop = scrollDelta > 0 ? viewportTop : viewportBottom + scrollDelta + 1,
        revealBottom = scrollDelta > 0 ? viewportTop + scrollDelta - 1 : viewportBottom,
        revealSide = scrollDelta > 0 ? "above" : "below";
      if (this.selection.isDragging) {
        if (IZ(this.selection)) hqr(this.selection, this.frontFrame.screen, revealTop, revealBottom, revealSide);
        aIi(this.selection, -scrollDelta, viewportTop, viewportBottom);
      } else if (!this.selection.focus || this.selection.focus.row >= viewportTop && this.selection.focus.row <= viewportBottom && (this.selection.virtualFocusCol ?? this.selection.focus.col) >= followScroll.viewportLeft && (this.selection.virtualFocusCol ?? this.selection.focus.col) <= followScroll.viewportRight) {
        if (IZ(this.selection)) hqr(this.selection, this.frontFrame.screen, revealTop, revealBottom, revealSide);
        iIi(this.selection, -scrollDelta, viewportTop, viewportBottom, this.frontFrame.screen.width);
      }
    }
    let selectionHighlighted = !1,
      searchHighlighted = !1;
    if (this.altScreenActive) {
      if (selectionHighlighted = IZ(this.selection) && !Bve(this.selection), selectionHighlighted) uIi(rendered.screen, this.selection, this.stylePool);
      if (searchHighlighted = P0i(rendered.screen, this.searchHighlightQuery, this.stylePool), this.searchPositions) {
        let positions = this.searchPositions,
          posHighlighted = I0i(rendered.screen, this.stylePool, positions.positions, positions.rowOffset, positions.currentIdx);
        searchHighlighted = searchHighlighted || posHighlighted;
      }
    }
    if (rendered.layoutShifted || selectionHighlighted || searchHighlighted || overlayChanged || this.altScreenFullRepaint && this.altScreenActive) rendered.screen.damage = {
      x: 0,
      y: 0,
      width: rendered.screen.width,
      height: rendered.screen.height
    };
    let prevFrame = this.frontFrame;
    if (this.altScreenActive) {
      if (prevFrame = {
        ...this.frontFrame,
        cursor: fyd
      }, this.altScreenFullRepaint) {
        let {
          width: sentinelWidth,
          height: sentinelHeight
        } = this.frontFrame.screen;
        if (this.fullRepaintSentinelScreen?.width !== sentinelWidth || this.fullRepaintSentinelScreen.height !== sentinelHeight) this.fullRepaintSentinelScreen = _z(sentinelWidth, sentinelHeight, this.stylePool, this.charPool, this.hyperlinkPool), qHi(this.fullRepaintSentinelScreen);
        prevFrame = {
          ...prevFrame,
          screen: this.fullRepaintSentinelScreen
        };
      }
    }
    let diffStart = performance.now(),
      patches = this.log.render(prevFrame, rendered, this.altScreenActive, ICn && !this.altScreenFullRepaint),
      diffMs = performance.now() - diffStart;
    this.backFrame = this.frontFrame, this.frontFrame = rendered;
    let flickers = [];
    for (let patch of patches) if (patch.type === "clearTerminal") {
      if (flickers.push({
        desiredHeight: rendered.screen.height,
        availableHeight: rendered.viewport.height,
        reason: patch.reason
      }), eqr() && patch.debug) {
        let ownerChain = fHi(this.rootNode, patch.debug.triggerY);
        A(`[REPAINT] full reset \xB7 ${patch.reason} \xB7 row ${patch.debug.triggerY}
  prev: "${patch.debug.prevLine}"
  next: "${patch.debug.nextLine}"
  culprit: ${ownerChain.length ? ownerChain.join(" < ") : "(no owner chain captured)"}`, {
          level: "warn"
        });
      }
    }
    let optimizeStart = performance.now(),
      ops = xqr(patches),
      optimizeMs = performance.now() - optimizeStart,
      hasOps = ops.length > 0;
    if (this.altScreenActive && hasOps) {
      if (this.needsEraseBeforePaint) this.needsEraseBeforePaint = !1, ops.unshift(gyd);else ops.unshift(hyd);
      ops.push(this.altScreenParkPatch);
    }
    let cursorDecl = this.cursorDeclaration,
      cursorNodeRect = cursorDecl !== null ? Zg.get(cursorDecl.node) : void 0,
      desiredCursor = cursorDecl !== null && cursorNodeRect !== void 0 ? {
        x: cursorNodeRect.x + cursorDecl.relativeX,
        y: cursorNodeRect.y + cursorDecl.relativeY
      } : null,
      shownCursor = this.displayCursor,
      cursorMoved = desiredCursor !== null && (shownCursor === null || shownCursor.x !== desiredCursor.x || shownCursor.y !== desiredCursor.y),
      nativeCursorVisibilityChanged = this.options.nativeCursor && desiredCursor !== null && cursorDecl !== null && (cursorDecl.visible || this.accessibilityMode) !== this.nativeCursorVisible;
    if (hasOps || cursorMoved || nativeCursorVisibilityChanged || desiredCursor === null && shownCursor !== null) {
      let maxClamp = terminalRows - 1,
        clampDy = dy => Math.max(-maxClamp, Math.min(maxClamp, dy));
      if (shownCursor !== null && !this.altScreenActive && hasOps) {
        let dx = prevFrame.cursor.x - shownCursor.x,
          dy = clampDy(prevFrame.cursor.y - shownCursor.y);
        if (dx !== 0 || dy !== 0) ops.unshift({
          type: "stdout",
          content: iie(dx, dy)
        });
      }
      if (desiredCursor !== null) {
        if (this.altScreenActive) {
          let row = Math.min(Math.max(desiredCursor.y + 1, 1), terminalRows),
            col = Math.min(Math.max(desiredCursor.x + 1, 1), terminalWidth);
          ops.push({
            type: "stdout",
            content: Z3(row, col)
          });
        } else {
          let cursorOrigin = !hasOps && shownCursor !== null ? shownCursor : {
              x: rendered.cursor.x,
              y: rendered.cursor.y
            },
            dx = desiredCursor.x - cursorOrigin.x,
            dy = clampDy(desiredCursor.y - cursorOrigin.y);
          if (dx !== 0 || dy !== 0) ops.push({
            type: "stdout",
            content: iie(dx, dy)
          });
        }
        if (this.displayCursor = desiredCursor, this.options.nativeCursor || this.bgWorkerForceShowCursor) {
          let shouldShowCursor = this.bgWorkerForceShowCursor || cursorDecl !== null && cursorDecl.visible || this.accessibilityMode;
          if (this.nativeCursorVisible) ops.unshift({
            type: "cursorHide"
          });
          if (shouldShowCursor) ops.push({
            type: "cursorShow"
          });
          this.nativeCursorVisible = shouldShowCursor;
        }
      } else {
        if (shownCursor !== null && !this.altScreenActive && !hasOps) {
          let dx = rendered.cursor.x - shownCursor.x,
            dy = clampDy(rendered.cursor.y - shownCursor.y);
          if (dx !== 0 || dy !== 0) ops.push({
            type: "stdout",
            content: iie(dx, dy)
          });
        }
        if (this.displayCursor = null, (this.options.nativeCursor || this.bgWorkerForceShowCursor) && this.nativeCursorVisible && !this.accessibilityMode) ops.unshift({
          type: "cursorHide"
        }), this.nativeCursorVisible = !1;
      }
    }
    if (hasOps) this.maybeProactiveAtlasReset(ops);
    let writeStart = performance.now();
    r4r(this.terminal, ops, this.skipSyncMarkers(), terminalRows);
    let writeMs = performance.now() - writeStart;
    if (this.maybeResetPools(frameStart), this.prevFrameContaminated = !1, rendered.scrollDrainPending) this.drainTimer = setTimeout(() => this.onRender(), UF >> 2);
    let yogaMs = LHi(),
      commitMs = NHi(),
      yogaCounters = this.lastYogaCounters;
    FHi(), this.lastYogaCounters = {
      ms: 0,
      visited: 0,
      measured: 0,
      cacheHits: 0,
      live: 0
    }, this.options.onFrame?.({
      durationMs: performance.now() - frameStart,
      phases: {
        renderer: rendererMs,
        diff: diffMs,
        optimize: optimizeMs,
        write: writeMs,
        patches: patches.length,
        yoga: yogaMs,
        commit: commitMs,
        yogaVisited: yogaCounters.visited,
        yogaMeasured: yogaCounters.measured,
        yogaCacheHits: yogaCounters.cacheHits,
        yogaLive: yogaCounters.live,
        ...(this.liveCountsEnabled && this.shouldSampleLiveCounts() && {
          domLive: jIi(this.rootNode),
          fiberLive: zIi(this.container.current)
        })
      },
      flickers: flickers
    });
  }

  /** Minimum interval between live-count perf samples, in milliseconds. */
  static LIVE_COUNTS_INTERVAL_MS = 100;
  /** Whether live DOM/fiber count sampling is enabled (benchmark flag). */
  liveCountsEnabled;
  /** Timestamp of the last live-count sample. */
  lastLiveCountSampleAt = 0;

  /** True if enough time has elapsed to take another live-count sample. */
  shouldSampleLiveCounts() {
    let now = performance.now();
    if (now - this.lastLiveCountSampleAt < Ptt.LIVE_COUNTS_INTERVAL_MS) return !1;
    return this.lastLiveCountSampleAt = now, !0;
  }

  /** Screen-reader render path: emit plain wrapped text + cursor park. */
  onRenderScreenReader() {
    let plainText = MPt(this.rootNode),
      terminalWidth = this.options.stdout.columns || 80,
      rawLines = plainText === "" ? [] : plainText.split(`
`),
      lines = [],
      lineStartOffsets = [];
    for (let rawLine of rawLines) if (lineStartOffsets.push(lines.length), rawLine === "") lines.push("");else {
      let wrapped = DN(rawLine, terminalWidth, {
        trim: !1,
        hard: !0
      });
      for (let wrappedLine of wrapped.split(`
`)) lines.push(wrappedLine.trimEnd());
    }
    let prevLines = this.prevScreenReaderLines,
      lastLineIdx = Math.max(0, lines.length - 1),
      park = this.computeScreenReaderPark(plainText, lineStartOffsets, lines, terminalWidth) ?? {
        row: lastLineIdx,
        col: sn(lines[lastLineIdx] ?? "")
      },
      commonPrefix = 0,
      maxCommon = Math.min(prevLines.length, lines.length);
    while (commonPrefix < maxCommon && prevLines[commonPrefix] === lines[commonPrefix]) commonPrefix++;
    let linesUnchanged = commonPrefix === prevLines.length && commonPrefix === lines.length,
      prevPark = this.prevScreenReaderPark,
      parkUnchanged = park.row === prevPark.row && park.col === prevPark.col;
    if (linesUnchanged && parkUnchanged) return;
    let prevLastLineIdx = Math.max(0, prevLines.length - 1),
      moveToPrefix = prevPark.row !== prevLastLineIdx ? iie(0, prevLastLineIdx - prevPark.row) : "",
      clearTail = UEn(prevLines.length - commonPrefix),
      appendText = lines.slice(commonPrefix).join(`
`),
      body;
    if (linesUnchanged) body = "";else if (commonPrefix === prevLines.length) body = commonPrefix > 0 ? `
${appendText}` : appendText;else if (appendText === "") body = commonPrefix > 0 ? clearTail + iie(0, -1) : clearTail;else body = clearTail + appendText;
    let parkMove = BEn(park.col + 1) + (park.row !== lastLineIdx ? iie(0, park.row - lastLineIdx) : "");
    this.options.stdout.write(moveToPrefix + body + parkMove), this.prevScreenReaderLines = lines, this.prevScreenReaderPark = park;
  }

  /** Map the declared cursor into a (row, col) on the screen-reader text. */
  computeScreenReaderPark(plainText, lineStartOffsets, lines, terminalWidth) {
    let cursorDecl = this.cursorDeclaration;
    if (cursorDecl === null) return null;
    let cursorOffset = Kqr(this.rootNode, cursorDecl.node);
    if (cursorOffset === null) return null;
    let textBeforeCursor = plainText.slice(0, cursorOffset),
      logicalRow = nu(textBeforeCursor, `
`) + cursorDecl.relativeY;
    if (logicalRow < 0 || logicalRow >= lineStartOffsets.length) return null;
    let lineStart = textBeforeCursor.lastIndexOf(`
`) + 1,
      logicalCol = (cursorDecl.relativeY === 0 ? sn(plainText.slice(lineStart, cursorOffset)) : 0) + cursorDecl.relativeX,
      wrapRows = terminalWidth > 0 ? Math.floor(logicalCol / terminalWidth) : 0,
      row = Math.min(lineStartOffsets[logicalRow] + wrapRows, lines.length - 1),
      col = terminalWidth > 0 ? logicalCol % terminalWidth : logicalCol;
    return {
      row: Math.max(0, row),
      col: Math.max(0, col)
    };
  }

  /** Flush a final synchronous render and mark the renderer paused. */
  pause() {
    kZ.flushSyncFromReconciler(), this.onRender(), this.isPaused = !0;
  }

  /** Resume rendering and render the current frame. */
  resume() {
    this.isPaused = !1, this.onRender();
  }

  /** Rebuild frame buffers and force a full repaint of persistent output. */
  repaint() {
    this.frontFrame = Wve(this.frontFrame.viewport.height, this.frontFrame.viewport.width, this.stylePool, this.charPool, this.hyperlinkPool), this.backFrame = Wve(this.backFrame.viewport.height, this.backFrame.viewport.width, this.stylePool, this.charPool, this.hyperlinkPool), this.log.reset(), this.displayCursor = null, this.prevFrameContaminated = !0, this.resetScreenReaderDiffState();
  }

  /** Emit a sixel/atlas reset, either queued into `ops` or written directly. */
  emitAtlasReset(ops) {
    if (ops) ops.unshift({
      type: "stdout",
      content: L0i
    });else this.options.stdout.write(L0i);
    I3r(), this.lastAtlasResetAt = performance.now();
  }

  /** Reset the image atlas if it has grown past thresholds (rate-limited). */
  maybeProactiveAtlasReset(ops) {
    if (!QUe) return;
    if (w3r) return;
    if (zDt().atlasKeys < _yd) return;
    if (!GRi && performance.now() - this.lastAtlasResetAt < yyd) return;
    if (!xy()) return;
    this.emitAtlasReset(ops), k3r("delta");
  }

  /** Reset the image atlas when focus is regained, if conditions allow. */
  proactiveAtlasResetOnFocus() {
    if (QUe && !w3r && this.options.stdout.isTTY && !this.isUnmounted && !this.isPaused && xy()) this.emitAtlasReset(), k3r("focus");
  }

  /** Force a full redraw; returns false if not applicable. */
  forceRedraw(opts) {
    if (!this.options.stdout.isTTY || this.isUnmounted || this.isPaused) return !1;
    if (opts?.flushReact) kZ.flushSyncFromReconciler();
    if (xy()) this.emitAtlasReset();
    if (this.hasStaleTerminalSize()) return this.handleResize(), !0;
    if (this.altScreenActive) this.needsEraseBeforePaint = !0, this.displayCursor = null, this.resetFramesForAltScreen();else this.log.forceFullReset(), this.prevFrameContaminated = !0;
    return this.resetScreenReaderDiffState(), this.onRender(), !0;
  }

  /** Probe whether an external process wiped the screen; redraw if so. */
  async probeExternalClear(probe) {
    if (!this.altScreenActive || this.isPaused || this.isUnmounted) return !1;
    let shownCursor = this.displayCursor;
    if (!shownCursor || shownCursor.y < 1) return !1;
    let report = await probe.send(myd);
    if (report?.row !== 1) return !1;
    return A(`probeExternalClear: detected wipe (parked at y=${shownCursor.y}, terminal reports row=1 col=${report.col})`), this.forceRedraw(), !0;
  }

  /** Mark the previous frame as contaminated (force next full repaint). */
  invalidatePrevFrame() {
    this.prevFrameContaminated = !0;
  }

  /** Toggle alt-screen state (and optionally mouse tracking). */
  setAltScreenActive(active, mouseTracking = !1) {
    if (this.altScreenActive === active) return;
    if (this.altScreenActive = active, this.altScreenMouseTracking = active && mouseTracking, active) this.ensureInteractive(), this.resetFramesForAltScreen();else this.repaint();
  }

  get isAltScreenActive() {
    return this.altScreenActive;
  }

  /** Hand off the alt screen to another owner: pause and clear the flag. */
  handoffAltScreen() {
    this.isPaused = !0, this.altScreenActive = !1;
  }

  /** Mark raw-mode ownership as handed off. */
  handoffRawMode() {
    this._handoffRawMode = !0;
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

  /** Re-assert terminal modes (focus reporting, mouse, optional alt screen). */
  reassertTerminalModes = (reenterAlt = !1) => {
    if (!this.options.stdout.isTTY) return;
    if (this.isPaused) return;
    if (this.options.stdout.write(FEn), this.options.stdout.write(EZ()), !this.altScreenActive) return;
    if (this.altScreenMouseTracking) this.options.stdout.write(kve);
    if (reenterAlt) this.reenterAltScreen();
  };

  /** Restore the cursor to the last frame position before shutdown. */
  detachForShutdown() {
    if (!this.isUnmounted && !this.altScreenActive && this.displayCursor !== null && this.options.stdout.isTTY) {
      let dx = this.frontFrame.cursor.x - this.displayCursor.x,
        dy = this.frontFrame.cursor.y - this.displayCursor.y;
      if (dx !== 0 || dy !== 0) $8.writeSync(1, iie(dx, dy));
      this.displayCursor = null;
    }
    this.isUnmounted = !0, this.scheduleRender.cancel?.();
    let stdin = this.options.stdin;
    if (this.drainStdin(), stdin.isTTY && stdin.isRaw) W0(stdin, !1);
    for (let stream of new Set([stdin, process.stdin])) stream.removeAllListeners("readable"), stream.removeAllListeners("data"), stream.removeAllListeners("keypress"), stream.pause(), stream.unref?.();
  }

  /** Drain any pending input from stdin. */
  drainStdin() {
    Ott(this.options.stdin);
  }

  /** Re-enter the alt screen after a resume/handoff. */
  reenterAltScreen() {
    this.options.stdout.write(Hve() + (this.altScreenMouseTracking ? kve : "")), this.resetFramesForAltScreen(), this.onRender();
  }

  /** Rebuild front/back frame buffers sized for the alt screen. */
  resetFramesForAltScreen() {
    let rows = this.terminalRows,
      cols = this.terminalColumns,
      makeFrame = () => ({
        screen: _z(cols, rows, this.stylePool, this.charPool, this.hyperlinkPool),
        viewport: {
          width: cols,
          height: rows + 1
        },
        cursor: {
          x: 0,
          y: 0,
          visible: !0
        }
      });
    this.frontFrame = makeFrame(), this.backFrame = makeFrame(), this.log.reset(), this.displayCursor = null, this.prevFrameContaminated = !0;
  }

  /** Return the currently selected text, or "" if there is no selection. */
  getSelectedText() {
    if (!IZ(this.selection)) return "";
    return cIi(this.selection, this.frontFrame.screen);
  }

  /** Copy the current selection to the clipboard without clearing it. */
  copySelectionNoClear() {
    let selectedText = this.getSelectedText();
    if (selectedText) sw(selectedText).then(osc52 => {
      if (osc52) this.options.stdout.write(osc52);
    });
    return selectedText;
  }

  /** Copy the selection and then clear it, notifying listeners. */
  copySelection() {
    if (!IZ(this.selection)) return "";
    let selectedText = this.copySelectionNoClear();
    return CPt(this.selection), this.notifySelectionChange(), selectedText;
  }

  /** Clear the current text selection and notify listeners. */
  clearTextSelection() {
    if (!IZ(this.selection)) return;
    CPt(this.selection), this.notifySelectionChange();
  }

  /** Set the active search-highlight query and schedule a render. */
  setSearchHighlight(query) {
    if (this.searchHighlightQuery === query) return;
    this.searchHighlightQuery = query, this.scheduleRender();
  }

  /** Scan a subtree's rendered screen for search matches. */
  scanElementSubtree(element) {
    if (!this.searchHighlightQuery || !element.yogaNode) return [];
    let width = Math.ceil(element.yogaNode.getComputedWidth()),
      height = Math.ceil(element.yogaNode.getComputedHeight());
    if (width <= 0 || height <= 0) return [];
    let left = element.yogaNode.getComputedLeft(),
      top = element.yogaNode.getComputedTop(),
      screen = _z(width, height, this.stylePool, this.charPool, this.hyperlinkPool),
      painter = new hhe({
        width: width,
        height: height,
        stylePool: this.stylePool,
        screen: screen
      });
    m2e(element, painter, p2e(), {
      offsetX: -left,
      offsetY: -top,
      prevScreen: void 0
    });
    let paintedScreen = painter.get();
    pO(element);
    let matches = H0i(paintedScreen, this.searchHighlightQuery);
    return A(`scanElementSubtree: q='${this.searchHighlightQuery}' el=${width}x${height}@(${left},${top}) n=${matches.length} [${matches.slice(0, 10).map(match => `${match.row}:${match.col}`).join(",")}${matches.length > 10 ? ",…" : ""}]`), matches;
  }

  /** Set the active search match positions and schedule a render. */
  setSearchPositions(positions) {
    this.searchPositions = positions, this.scheduleRender();
  }

  /** Configure the selection background color from a style spec. */
  setSelectionBgColor(color) {
    let wrapped = wve("\x00", color, "background"),
      nullIdx = wrapped.indexOf("\x00");
    if (nullIdx <= 0 || nullIdx === wrapped.length - 1) {
      this.stylePool.setSelectionBg(null);
      return;
    }
    this.stylePool.setSelectionBg({
      type: "ansi",
      code: wrapped.slice(0, nullIdx),
      endCode: wrapped.slice(nullIdx + 1)
    });
  }

  /** Move the selection focus point in a given direction (alt screen only). */
  moveSelectionFocus(direction) {
    if (!this.altScreenActive) return;
    let {
      focus: focus
    } = this.selection;
    if (!focus) return;
    let {
        width: width,
        height: height
      } = this.frontFrame.screen,
      maxCol = width - 1,
      maxRow = height - 1,
      {
        col: col,
        row: row
      } = focus;
    switch (direction) {
      case "left":
        if (col > 0) col--;else if (row > 0) col = maxCol, row--;
        break;
      case "right":
        if (col < maxCol) col++;else if (row < maxRow) col = 0, row++;
        break;
      case "up":
        if (row > 0) row--;
        break;
      case "down":
        if (row < maxRow) row++;
        break;
      case "lineStart":
        col = 0;
        break;
      case "lineEnd":
        col = maxCol;
        break;
    }
    if (col === focus.col && row === focus.row) return;
    sIi(this.selection, col, row), this.notifySelectionChange();
  }

  /** True if there is a non-empty text selection. */
  hasTextSelection() {
    return IZ(this.selection);
  }

  /** Subscribe to selection changes; returns an unsubscribe function. */
  subscribeToSelectionChange(listener) {
    return this.selectionListeners.add(listener), () => this.selectionListeners.delete(listener);
  }

  /** Schedule a render and invoke all selection-change listeners. */
  notifySelectionChange() {
    this.scheduleRender();
    for (let listener of this.selectionListeners) listener();
  }

  /** Dispatch a click at (col, row); returns whether it was handled. */
  dispatchClick(col, row) {
    if (!this.altScreenActive) return !1;
    let target = l2e(this.frontFrame.screen, col, row),
      hyperlink = this.getHyperlinkAt(col, row);
    return GIi(this.rootNode, col, row, target, hyperlink);
  }

  /** Dispatch a hover event at (col, row). */
  dispatchHover(col, row) {
    if (!this.altScreenActive) return;
    let target = l2e(this.frontFrame.screen, col, row);
    VIi(this.rootNode, col, row, this.hoveredNodes, target);
  }

  /** Dispatch a paste event to the focused element. */
  dispatchPasteEvent(text) {
    let target = this.focusManager.activeElement ?? this.rootNode;
    F8.dispatchDiscrete(target, new fhe(text));
  }

  /** Dispatch a mouse-wheel event to the scrollable element under the cursor. */
  dispatchWheelEvent = event => {
    let hit = event.col != null && event.row != null ? kPt(this.rootNode, event.col - 1, event.row - 1) : null,
      target = (hit && byd(hit) ? hit : null) ?? this.focusManager.activeElement ?? this.rootNode,
      delta = event.name === "wheeldown" ? 1 : -1;
    F8.dispatchContinuous(target, new wqr(delta, {
      ctrl: event.ctrl,
      shift: event.shift,
      meta: event.meta || event.option
    }));
  };

  /** Dispatch a keyboard event, handling Tab focus navigation. */
  dispatchKeyboardEvent(key) {
    let target = this.focusManager.activeElement ?? this.rootNode,
      keyEvent = new ktt(key);
    if (F8.dispatchDiscrete(target, keyEvent), !keyEvent.defaultPrevented && key.name === "tab" && !key.ctrl && !key.meta) if (key.shift) this.focusManager.focusPrevious(this.rootNode);else this.focusManager.focusNext(this.rootNode);
  }

  /** Resolve the hyperlink at (col, row), accounting for wide characters. */
  getHyperlinkAt(col, row) {
    if (!this.altScreenActive) return;
    let screen = this.frontFrame.screen,
      cell = G2(screen, col, row),
      hyperlink = cell?.hyperlink;
    if (!hyperlink && cell?.width === 2 && col > 0) hyperlink = G2(screen, col - 1, row)?.hyperlink;
    return hyperlink ?? nIi(screen, col, row);
  }

  /** Optional handler invoked when a hyperlink is clicked. */
  onHyperlinkClick;

  /** Open the given hyperlink via the registered handler. */
  openHyperlink(url) {
    this.onHyperlinkClick?.(url);
  }

  /** Handle a double/triple click selecting a word or line. */
  handleMultiClick(col, row, clickCount) {
    if (!this.altScreenActive) return;
    let screen = this.frontFrame.screen;
    if (iAn(this.selection, col, row), clickCount === 2) tIi(this.selection, screen, col, row);else rIi(this.selection, screen, row);
    if (!this.selection.focus) this.selection.focus = this.selection.anchor;
    this.notifySelectionChange();
  }

  /** Extend the selection to (col, row) during a drag. */
  handleSelectionDrag(col, row) {
    if (!this.altScreenActive) return;
    let selection = this.selection;
    if (selection.anchorSpan) oIi(selection, this.frontFrame.screen, col, row);else ZHi(selection, col, row);
    this.notifySelectionChange();
  }

  /** Stored stdin "readable" listeners removed while stdin is suspended. */
  stdinListeners = [];
  /** Whether stdin was in raw mode before being suspended. */
  wasRawMode = !1;

  /** Suspend stdin: detach readable listeners and leave raw mode. */
  suspendStdin() {
    let stdin = this.options.stdin;
    if (!stdin.isTTY) return;
    let readableListeners = stdin.listeners("readable");
    A(`[stdin] suspendStdin: removing ${readableListeners.length} readable listener(s), wasRawMode=${stdin.isRaw ?? !1}`), readableListeners.forEach(listener => {
      this.stdinListeners.push({
        event: "readable",
        listener: listener
      }), stdin.removeListener("readable", listener);
    });
    let rawStdin = stdin;
    if (rawStdin.isRaw) W0(rawStdin, !1), this.wasRawMode = !0;
  }

  /** Resume stdin: re-attach stored listeners and restore raw mode. */
  resumeStdin() {
    let stdin = this.options.stdin;
    if (!stdin.isTTY) return;
    if (this.stdinListeners.length === 0 && !this.wasRawMode) A("[stdin] resumeStdin: called with no stored listeners and wasRawMode=false (possible desync)", {
      level: "warn"
    });
    if (A(`[stdin] resumeStdin: re-attaching ${this.stdinListeners.length} listener(s), wasRawMode=${this.wasRawMode}`), this.stdinListeners.forEach(({
      event: event,
      listener: listener
    }) => {
      stdin.addListener(event, listener);
    }), this.stdinListeners = [], this.wasRawMode) W0(stdin, !0), this.wasRawMode = !1;
  }

  /** Write a raw string straight to stdout (used by the WriteRaw context). */
  writeRaw(data) {
    this.options.stdout.write(data);
  }

  /** Set or clear the declared cursor position from the component tree. */
  setCursorDeclaration = (declaration, expectedNode) => {
    if (declaration === null && expectedNode !== void 0 && this.cursorDeclaration?.node !== expectedNode) return;
    this.cursorDeclaration = declaration;
  };

  /** Render the given React node through the reconciler container. */
  render(node) {
    this.renderCalled = !0, this.currentNode = node;
    let tree = CAn.jsx(dAn, {
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
      isScreenReaderEnabled: this.isScreenReaderEnabled,
      children: CAn.jsx(pCn.Provider, {
        value: this.isScreenReaderEnabled,
        children: CAn.jsx(bAn, {
          value: this.writeRaw,
          children: node
        })
      })
    });
    kZ.updateContainerSync(tree, this.container, null, ahe), kZ.flushSyncWork();
  }

  /** Tear down the renderer, flush final output and clean up the terminal. */
  unmount(error) {
    if (this.isUnmounted) return;
    if (this.isExiting = !0, this.onRender(), this.unsubscribeExit(), typeof this.restoreConsole === "function") this.restoreConsole();
    if (this.restoreStderr?.(), this.unsubscribeTTYHandlers?.(), this.renderCalled && !this.isPaused) {
      let finalOps = this.log.renderPreviousOutput_DEPRECATED(this.frontFrame);
      r4r(this.terminal, xqr(finalOps), this.skipSyncMarkers(), this.options.stdout.rows || 24);
    }
    if (this.options.stdout.isTTY) try {
      if (this.altScreenActive) $8.writeSync(1, MF()), this.altScreenActive = !1;
      $8.writeSync(1, mie), this.drainStdin(), SAn();
    } catch (cleanupError) {
      if (sp(cleanupError)) A(`unmount terminal cleanup writeSync failed: ${cleanupError}`, {
        level: "error"
      });else throw cleanupError;
    }
    if (this.isUnmounted = !0, this.scheduleRender.cancel?.(), this.drainTimer !== null) clearTimeout(this.drainTimer), this.drainTimer = null;
    if (kZ.updateContainerSync(null, this.container, null, ahe), kZ.flushSyncWork(), du.delete(this.options.stdout), this.rootNode.yogaNode?.free(), this.rootNode.yogaNode = void 0, error instanceof Error) this.rejectExitPromise(error);else this.resolveExitPromise();
  }

  /** Return a promise that resolves/rejects when the renderer exits. */
  async waitUntilExit() {
    return this.exitPromise ||= new Promise((resolve, reject) => {
      this.resolveExitPromise = resolve, this.rejectExitPromise = reject;
    }), this.exitPromise;
  }

  /** Reset the scrollback line count by swapping in a fresh front frame. */
  resetLineCount() {
    if (this.options.stdout.isTTY) this.backFrame = this.frontFrame, this.frontFrame = Wve(this.frontFrame.viewport.height, this.frontFrame.viewport.width, this.stylePool, this.charPool, this.hyperlinkPool), this.log.reset(), this.displayCursor = null;
  }

  /** Reset the interning pools if enough time has passed / compaction needed. */
  maybeResetPools(now) {
    let elapsed = now - this.lastPoolResetTime;
    if (elapsed <= 30000) return;
    if (elapsed <= 300000 && !this.stylePool.needsCompaction(this.lastStyleLiveSize)) return;
    this.lastPoolResetTime = now, this.resetPools();
  }

  /** Compact/rebuild the hyperlink and style pools when they grow too large. */
  resetPools() {
    let hyperlinkPoolTooBig = this.hyperlinkPool.size > $Hi,
      styleNeedsCompaction = this.stylePool.needsCompaction(this.lastStyleLiveSize);
    if (!hyperlinkPoolTooBig && !styleNeedsCompaction) return;
    if (hyperlinkPoolTooBig) this.hyperlinkPool = new bPt();
    if (GHi(this.frontFrame.screen, this.charPool, this.hyperlinkPool, styleNeedsCompaction ? this.stylePool.compact() : void 0), styleNeedsCompaction) this.lastStyleLiveSize = this.stylePool.size;
    this.backFrame.screen.hyperlinkPool = this.hyperlinkPool, this.fullRepaintSentinelScreen = void 0;
  }

  /** Patch the console methods to route output to the debug log. */
  patchConsole() {
    let console_ = console,
      original = {},
      logToDebug = (...args) => A(`console.log: ${FPt.format(...args)}`),
      makeErrorReporter = method => (...args) => Ie(Error(`console.${method}: ${FPt.format(...args)}`)),
      makeWarnReporter = method => (...args) => A(`console.${method}: ${FPt.format(...args)}`, {
        level: "warn"
      });
    for (let method of Tyd) original[method] = console_[method], console_[method] = logToDebug;
    for (let method of Syd) original[method] = console_[method], console_[method] = method === "error" ? (...args) => A(`console.error: ${FPt.format(...args)}`, {
      level: "error"
    }) : makeWarnReporter(method);
    return original.assert = console_.assert, console_.assert = (condition, ...args) => {
      if (!condition) makeErrorReporter("assert")(...args);
    }, () => Object.assign(console_, original);
  }

  /** Patch process.stderr.write to route stray writes to the debug log. */
  patchStderr() {
    let stderr = process.stderr,
      originalWrite = stderr.write,
      reentrant = !1,
      patchedWrite = (chunk, encodingOrCallback, callback) => {
        let cb = typeof encodingOrCallback === "function" ? encodingOrCallback : callback;
        if (reentrant) {
          let encoding = typeof encodingOrCallback === "string" ? encodingOrCallback : void 0;
          return originalWrite.call(stderr, chunk, encoding, cb);
        }
        reentrant = !0;
        try {
          let text = typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8");
          if (A(`[stderr] ${text}`, {
            level: "warn"
          }), this.altScreenActive && !this.isUnmounted && !this.isPaused) this.prevFrameContaminated = !0, this.scheduleRender();
        } finally {
          reentrant = !1, cb?.();
        }
        return !0;
      };
    return stderr.write = patchedWrite, () => {
      if (stderr.write === patchedWrite) stderr.write = originalWrite;
    };
  }
}

/** Drain pending input from a TTY stdin stream (best-effort, raw mode). */
function Ott(stdin = process.stdin) {
  if (!stdin.isTTY) return;
  try {
    while (stdin.read() !== null);
  } catch {}
  let rawStdin = stdin,
    alreadyRaw = rawStdin.isRaw === !0,
    ttyFd = -1;
  try {
    if (!alreadyRaw) rawStdin.setRawMode?.(!0);
    ttyFd = $8.openSync("/dev/tty", $8.constants.O_RDONLY | $8.constants.O_NONBLOCK);
    let buffer = Buffer.alloc(1024);
    for (let i = 0; i < 64; i++) if ($8.readSync(ttyFd, buffer, 0, buffer.length, null) <= 0) break;
  } catch {} finally {
    if (ttyFd >= 0) try {
      $8.closeSync(ttyFd);
    } catch {}
    if (!alreadyRaw) try {
      rawStdin.setRawMode?.(!1);
    } catch {}
  }
}

/** True if `node` or any ancestor declares an onWheel handler. */
function byd(node) {
  let current = node;
  while (current) {
    if (current._eventHandlers?.onWheel) return !0;
    current = current.parentNode;
  }
  return !1;
}

var $8,
  N0i,
  FPt,
  CAn,
  Jqr = 8192,
  myd,
  fyd,
  hyd,
  gyd,
  L0i = "\x1B]104;255\x07",
  _yd = 2000,
  yyd = 2000,
  Tyd,
  Syd;

var AAn = b(() => {
  m3r();
  iRi();
  Pje();
  lt();
  aCn();
  kt();
  qe();
  Ir();
  dn();
  Ct();
  vn();
  Es();
  vve();
  lr();
  ett();
  N8();
  D3r();
  Rqr();
  mtt();
  vqr();
  pAn();
  qIi();
  mhe();
  WIi();
  KIi();
  iw();
  YIi();
  ZIi();
  dhe();
  DPt();
  _tt();
  LPt();
  k0i();
  x0i();
  D0i();
  jqr();
  o4();
  O0i();
  RPt();
  mc();
  Yqr();
  nS();
  VEn();
  dZ();
  dO();
  mz();
  hg();
  i4();
  ppe();
  $8 = require("fs"), N0i = x(XEn(), 1), FPt = require("util"), CAn = x(oe(), 1), myd = MAi(), fyd = Object.freeze({
    x: 0,
    y: 0,
    visible: !1
  }), hyd = Object.freeze({
    type: "stdout",
    content: yE
  }), gyd = Object.freeze({
    type: "stdout",
    content: Mk + yE
  });
  Tyd = ["log", "info", "debug", "dir", "dirxml", "count", "countReset", "group", "groupCollapsed", "groupEnd", "table", "time", "timeEnd", "timeLog"], Syd = ["warn", "error", "trace"];
});

export {M0i,Ptt,Ott,byd,$8,N0i,FPt,CAn,Jqr,myd,fyd,hyd,gyd,L0i,_yd,yyd,Tyd,Syd,AAn};

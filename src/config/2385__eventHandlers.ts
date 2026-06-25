// @ts-nocheck
import {q4r as Sv8,W4r as Cv8,G4r as bv8} from "../../vendor/m2378.ts";
import {U4r as vv8,B4r as yv8,F4r as Vv8,$4r as Ev8,mtt as MsH,gPt as CZ_,pHi as xY7,yPt as IZ_,pO as SN,YCn as VA6,N4r as Nv8,_Pt as bZ_,uHi as bY7} from "../../vendor/m2377.ts";
import {z4r as uv8,vHi as rY7} from "../../vendor/m2383.ts";
import {Ne as oH} from "../../vendor/m583.ts";
import {b as L,x as u} from "../../runtime.ts";
import {aCn as BY6,iCn as pY6} from "../../vendor/m2295.ts";
import {Ir as _q} from "../../vendor/m584.ts";
import {_Hi as UY7,V4r as Iv8} from "../../vendor/m2379.ts";
import {mhe as gTH,vZ as ut,gtt as WsH} from "../../vendor/m2382.ts";
import {r2e as wSH} from "../../vendor/m2359.ts";
import {$ki as YY7} from "../../vendor/m2358.ts";
/**
 * React/Ink fiber reconciler host config and renderer initializer.
 *
 * This module creates the custom React reconciler (via react-reconciler) that
 * drives the Ink terminal UI. It implements all host-config lifecycle methods
 * that bridge React's reconciler to the Ink virtual-DOM (yoga-node-backed).
 *
 * Exports (module-level, referenced by cross-module minified names):
 *   ZsH — lazy-init thunk that creates the reconciler instance
 *   J9H — the created reconciler (react-reconciler instance)
 *   Wg  — InkEventDispatcher instance shared by the whole renderer
 *   qA7 — setYogaElapsedMs(ms): records the last yoga layout duration
 *   KA7 — getYogaElapsedMs(): returns the last yoga layout duration
 *   OA7 — markLayoutStart(): records performance.now() before layout
 *   TA7 — getCommitElapsedMs(): returns the last commit→render elapsed ms
 *   zA7 — resetPerfCounters(): zeroes all perf tracking state
 *   Qv8 — isDebugRepaints(): checks CLAUDE_CODE_DEBUG_REPAINTS env var (cached)
 *
 * Cross-module minified names kept as-is (linkage):
 *   Sv8  — Set of event-handler prop names that require raw-mode (onKeyDown, etc.)
 *   Cv8  — Set of all known event-handler prop names
 *   Iv8  — InkEventDispatcher class
 *   YY7  — react-reconciler package (CJS module)
 *   CZ_  — createInkNode(tagName): allocates a new Ink virtual-DOM node
 *   xY7  — createTextNode(text): allocates a text virtual-DOM node
 *   IZ_  — setNodeValue(node, value): updates a text node's value
 *   VA6  — appendChild(parent, child): appends a child to a parent node
 *   Nv8  — insertBefore(parent, child, before): inserts a child before a sibling
 *   bZ_  — removeChild(parent, child): detaches a child from its parent
 *   SN   — markNodeDirty(node): marks the yoga subtree dirty for re-layout
 *   vv8  — applyNodeStyle(node, style): applies a style object to a node
 *   uv8  — applyYogaStyle(yogaNode, styleDiff, fullStyle?): applies yoga layout props
 *   yv8  — applyAccessibility(node, a11y): sets the accessibility descriptor
 *   Vv8  — setNodeAttribute(node, key, value): sets an arbitrary attribute
 *   bY7  — setTextStyles(node, styles): applies text-style object with dirty check
 *   Ev8  — freeYogaNodes(node): recursively nulls yogaNode references
 *   pY6  — getYogaCacheCounters(): returns { visited, measured, cacheHits, live }
 *   WsH  — findRootWithFocusManager(node): walks up to find the container node
 *   ut   — getFocusManager(node): returns node.focusManager via WsH
 *   oH   — process.env proxy object (typed env vars)
 *   BY6  — init thunk: yoga layout engine
 *   _q   — init thunk: process.env proxy
 *   MsH  — init thunk: Ink virtual-DOM primitives
 *   UY7  — init thunk: InkEventDispatcher
 *   bv8  — init thunk: event-prop name sets (Sv8, Cv8)
 *   gTH  — init thunk: focus manager
 *   wSH  — init thunk: yoga polyfill
 *   rY7  — init thunk: yoga style applicator (uv8)
 *   L    — lazy init helper
 *   u    — interop-require-default helper
 */

// ---------------------------------------------------------------------------
// Local helper functions
// ---------------------------------------------------------------------------

/**
 * Registers an event handler on an Ink DOM node.
 * Creates the _eventHandlers map on first use.
 */
function setEventHandler(node: {
  _eventHandlers?: Record<string, unknown>;
}, eventName: string, handler: unknown): void {
  if (!node._eventHandlers) node._eventHandlers = {};
  node._eventHandlers[eventName] = handler;
}

/**
 * Returns true if the node has at least one raw-mode event handler.
 * Checks against the Sv8 set of raw-mode handler prop names.
 */
function nodeHasRawModeHandlers(node: {
  _eventHandlers?: Record<string, unknown>;
}): boolean {
  let handlers = node._eventHandlers;
  if (!handlers) return !1;
  for (let propName of Sv8) if (handlers[propName] != null) return !0;
  return !1;
}

/**
 * Applies a raw-mode delta (+1 / -1) to the stdin stream.
 * If the stream already supports setRawMode, calls it immediately;
 * otherwise accumulates the delta for deferred application.
 */
function applyRawModeDelta(stdin: {
  setRawMode?: (enabled: boolean) => void;
  _pendingRawModeDelta?: number;
}, delta: number): void {
  if (stdin.setRawMode) stdin.setRawMode(delta > 0);else stdin._pendingRawModeDelta = (stdin._pendingRawModeDelta ?? 0) + delta;
}

/**
 * Synchronises the raw-mode ref-count for a node.
 * If the node's raw-mode need changed, updates _holdsRawModeRef and adjusts
 * the stdin raw-mode delta accordingly.
 */
function syncRawModeRef(node: {
  _holdsRawModeRef?: boolean;
  _eventHandlers?: Record<string, unknown>;
}, stdin: {
  setRawMode?: (enabled: boolean) => void;
  _pendingRawModeDelta?: number;
}): void {
  let needsRawMode = nodeHasRawModeHandlers(node);
  if (needsRawMode === !!node._holdsRawModeRef) return;
  node._holdsRawModeRef = needsRawMode, applyRawModeDelta(stdin, needsRawMode ? 1 : -1);
}

/**
 * Recursively releases raw-mode refs from a subtree being unmounted.
 * Skips text nodes (they never hold raw-mode refs).
 */
function releaseRawModeRefsRecursive(node: {
  _holdsRawModeRef?: boolean;
  childNodes: unknown[];
  nodeName: string;
}, stdin: {
  setRawMode?: (enabled: boolean) => void;
  _pendingRawModeDelta?: number;
}): void {
  if (node._holdsRawModeRef) node._holdsRawModeRef = !1, applyRawModeDelta(stdin, -1);
  for (let child of node.childNodes) if ((child as {
    nodeName: string;
  }).nodeName !== "#text") releaseRawModeRefsRecursive(child as {
    _holdsRawModeRef?: boolean;
    childNodes: unknown[];
    nodeName: string;
  }, stdin);
}

/**
 * Applies a single prop update to an Ink DOM node, dispatching to the
 * appropriate sub-handler (style, textStyles, accessibility, event, attribute).
 */
function applyNodeProp(node: unknown, propKey: string, propValue: unknown): void {
  if (propKey === "children") return;
  if (propKey === "style") {
    if (vv8(node, propValue), (node as {
      yogaNode?: unknown;
    }).yogaNode) uv8((node as {
      yogaNode: unknown;
    }).yogaNode, propValue);
    return;
  }
  if (propKey === "textStyles") {
    (node as {
      textStyles: unknown;
    }).textStyles = propValue;
    return;
  }
  if (propKey === "accessibility") {
    yv8(node, propValue);
    return;
  }
  if (Cv8.has(propKey)) {
    setEventHandler(node as {
      _eventHandlers?: Record<string, unknown>;
    }, propKey, propValue);
    return;
  }
  Vv8(node, propKey, propValue);
}

/**
 * Walks the React fiber owner chain (up to 50 hops) and collects component
 * display names for debugging repaint attribution.
 */
function collectDebugOwnerChain(fiber: unknown): string[] {
  let names: string[] = [],
    visited = new Set<unknown>(),
    current: unknown = fiber;
  for (let i = 0; current && i < 50; i++) {
    if (visited.has(current)) break;
    visited.add(current);
    let elementType = (current as {
        elementType?: unknown;
      }).elementType,
      name = typeof elementType === "function" ? (elementType as {
        displayName?: string;
        name?: string;
      }).displayName || (elementType as {
        name?: string;
      }).name : typeof elementType === "string" ? void 0 : (elementType as {
        displayName?: string;
      } | undefined)?.displayName || (elementType as {
        name?: string;
      } | undefined)?.name;
    if (name && name !== names.at(-1)) names.push(name);
    current = (current as {
      _debugOwner?: unknown;
      return?: unknown;
    })._debugOwner ?? (current as {
      return?: unknown;
    }).return;
  }
  return names;
}

/**
 * Returns whether the CLAUDE_CODE_DEBUG_REPAINTS env var is set.
 * Caches the result after first read. Exported as Qv8 for cross-module use.
 */
function Qv8(): boolean | undefined {
  if (debugRepaintsCache === void 0) debugRepaintsCache = oH.CLAUDE_CODE_DEBUG_REPAINTS;
  return debugRepaintsCache;
}

/** Sets the last yoga-layout elapsed milliseconds (exported as qA7). */
function qA7(ms: number): void {
  yogaElapsedMs = ms;
}

/** Returns the last yoga-layout elapsed milliseconds (exported as KA7). */
function KA7(): number {
  return yogaElapsedMs;
}

/** Records performance.now() as the start timestamp for the upcoming layout (exported as OA7). */
function OA7(): void {
  layoutStartTimestamp = performance.now();
}

/** Returns the last commit→render elapsed milliseconds (exported as TA7). */
function TA7(): number {
  return commitElapsedMs;
}

/** Resets all perf-tracking counters to zero (exported as zA7). */
function zA7(): void {
  yogaElapsedMs = 0, commitElapsedMs = 0, layoutStartTimestamp = 0;
}

// ---------------------------------------------------------------------------
// Module-level state
// ---------------------------------------------------------------------------

var fsModule: typeof import("fs"), reconcilerModule: {
    default: (config: unknown) => unknown;
  };

/** Arrow-function that computes a shallow diff between two props objects. */
var diffProps = (oldProps: Record<string, unknown> | null | undefined, newProps: Record<string, unknown> | null | undefined): Record<string, unknown> | undefined => {
  if (oldProps === newProps) return;
  if (!oldProps) return newProps as Record<string, unknown>;
  let diff: Record<string, unknown> = {},
    changed = !1;
  for (let key of Object.keys(oldProps)) if (newProps ? !Object.hasOwn(newProps, key) : !0) diff[key] = void 0, changed = !0;
  if (newProps) {
    for (let key of Object.keys(newProps)) if (newProps[key] !== oldProps[key]) diff[key] = newProps[key], changed = !0;
  }
  return changed ? diff : void 0;
};

/** Frees a yoga node tree attached to an Ink DOM node. */
var freeYogaNodeTree = (node: {
  yogaNode?: {
    unsetMeasureFunc(): void;
    freeRecursive(): void;
  };
}): void => {
  let yogaNode = node.yogaNode;
  if (yogaNode) yogaNode.unsetMeasureFunc(), Ev8(node), yogaNode.freeRecursive();
};

/** Cached value of CLAUDE_CODE_DEBUG_REPAINTS env var. */
var debugRepaintsCache: boolean | undefined,
  /** The InkEventDispatcher singleton used by the renderer. */
  Wg: InstanceType<typeof Iv8>,
  /** Commit-log file path from CLAUDE_CODE_COMMIT_LOG env var. */
  mt: string | undefined,
  /** Rolling commit count within the current 1 s window. */
  commitCount = 0,
  /** Timestamp of the last 1 s stats flush. */
  lastStatFlushTimestamp = 0,
  /** Timestamp of the previous commit end for gap tracking. */
  prevCommitEndTimestamp = 0,
  /** Maximum observed inter-commit gap (ms) within the stats window. */
  maxCommitGapMs = 0,
  /** Count of createInstance calls since last reset (for log). */
  createInstanceCount = 0,
  /** Timestamp when prepareForCommit was called. */
  prepareForCommitTimestamp = 0,
  /** Last yoga layout elapsed ms (written by setYogaElapsedMs). */
  yogaElapsedMs = 0,
  /** Last commit→onRender elapsed ms. */
  commitElapsedMs = 0,
  /** Timestamp recorded by markLayoutStart. */
  layoutStartTimestamp = 0,
  /** The react-reconciler instance (created inside ZsH). */
  gv8: unknown,
  /** Exported reconciler instance. */
  J9H: unknown;

// ---------------------------------------------------------------------------
// Lazy-init block — creates the reconciler
// ---------------------------------------------------------------------------

/** Lazy-init thunk: initialises all dependencies and creates the Ink reconciler. */
var ZsH = L(() => {
  BY6();
  _q();
  MsH();
  UY7();
  bv8();
  gTH();
  wSH();
  rY7();
  fsModule = require("fs"), reconcilerModule = u(YY7(), 1);
  Wg = new Iv8(), mt = process.env.CLAUDE_CODE_COMMIT_LOG;
  gv8 = reconcilerModule.default({
    getRootHostContext: () => ({
      isInsideText: !1
    }),
    prepareForCommit: () => {
      if (mt) prepareForCommitTimestamp = performance.now();
      return null;
    },
    preparePortalMount: () => null,
    clearContainer: () => !1,
    resetAfterCommit(container: {
      onComputeLayout?: () => void;
      onRender?: () => void;
    }) {
      if (commitElapsedMs = layoutStartTimestamp > 0 ? performance.now() - layoutStartTimestamp : 0, layoutStartTimestamp = 0, mt) {
        let now = performance.now();
        commitCount++;
        let gap = prevCommitEndTimestamp > 0 ? now - prevCommitEndTimestamp : 0;
        if (gap > maxCommitGapMs) maxCommitGapMs = gap;
        prevCommitEndTimestamp = now;
        let reconcileMs = prepareForCommitTimestamp > 0 ? now - prepareForCommitTimestamp : 0;
        if (gap > 30 || reconcileMs > 20 || createInstanceCount > 50) fsModule.appendFileSync(mt, `${now.toFixed(1)} gap=${gap.toFixed(1)}ms reconcile=${reconcileMs.toFixed(1)}ms creates=${createInstanceCount}\n`);
        if (createInstanceCount = 0, now - lastStatFlushTimestamp > 1000) fsModule.appendFileSync(mt, `${now.toFixed(1)} commits=${commitCount}/s maxGap=${maxCommitGapMs.toFixed(1)}ms\n`), commitCount = 0, maxCommitGapMs = 0, lastStatFlushTimestamp = now;
      }
      let yogaStart = mt ? performance.now() : 0;
      if (typeof container.onComputeLayout === "function") container.onComputeLayout();
      if (mt) {
        let yogaMs = performance.now() - yogaStart;
        if (yogaMs > 20) {
          let counters = pY6();
          fsModule.appendFileSync(mt, `${yogaStart.toFixed(1)} SLOW_YOGA ${yogaMs.toFixed(1)}ms visited=${counters.visited} measured=${counters.measured} hits=${counters.cacheHits} live=${counters.live}\n`);
        }
      }
      let renderStart = mt ? performance.now() : 0;
      if (container.onRender?.(), mt) {
        let paintMs = performance.now() - renderStart;
        if (paintMs > 10) fsModule.appendFileSync(mt, `${renderStart.toFixed(1)} SLOW_PAINT ${paintMs.toFixed(1)}ms\n`);
      }
    },
    getChildHostContext(parentContext: {
      isInsideText: boolean;
    }, type: string): {
      isInsideText: boolean;
    } {
      let parentIsInsideText = parentContext.isInsideText,
        childIsInsideText = type === "ink-text" || type === "ink-virtual-text" || type === "ink-link";
      if (parentIsInsideText === childIsInsideText) return parentContext;
      return {
        isInsideText: childIsInsideText
      };
    },
    shouldSetTextContent: () => !1,
    createInstance(type: string, props: Record<string, unknown>, rootContainer: unknown, hostContext: {
      isInsideText: boolean;
      autoFocus?: boolean;
    }, internalFiber: unknown): unknown {
      if (hostContext.isInsideText && type === "ink-box") throw Error("<Box> can't be nested inside <Text> component");
      let resolvedType = type === "ink-text" && hostContext.isInsideText ? "ink-virtual-text" : type,
        node = CZ_(resolvedType);
      if (mt) createInstanceCount++;
      for (let [propKey, propValue] of Object.entries(props)) applyNodeProp(node, propKey, propValue);
      if (syncRawModeRef(node as {
        _holdsRawModeRef?: boolean;
        _eventHandlers?: Record<string, unknown>;
      }, rootContainer as {
        setRawMode?: (enabled: boolean) => void;
        _pendingRawModeDelta?: number;
      }), Qv8()) (node as {
        debugOwnerChain?: string[];
      }).debugOwnerChain = collectDebugOwnerChain(internalFiber);
      return node;
    },
    createTextInstance(text: string, _rootContainer: unknown, hostContext: {
      isInsideText: boolean;
    }): unknown {
      if (!hostContext.isInsideText) throw Error(`Text string "${text}" must be rendered inside <Text> component`);
      return xY7(text);
    },
    resetTextContent() {},
    hideTextInstance(node: unknown) {
      IZ_(node, "");
    },
    unhideTextInstance(node: unknown, text: string) {
      IZ_(node, text);
    },
    getPublicInstance: (node: unknown) => node,
    hideInstance(node: {
      isHidden?: boolean;
      yogaNode?: {
        setDisplay(v: number): void;
      };
    }) {
      node.isHidden = !0, node.yogaNode?.setDisplay(1), SN(node);
    },
    unhideInstance(node: {
      isHidden?: boolean;
      yogaNode?: {
        setDisplay(v: number): void;
      };
    }) {
      node.isHidden = !1, node.yogaNode?.setDisplay(0), SN(node);
    },
    appendInitialChild: VA6,
    appendChild: VA6,
    insertBefore: Nv8,
    finalizeInitialChildren(_node: unknown, _type: string, props: {
      autoFocus?: boolean;
    }): boolean {
      return props.autoFocus === !0;
    },
    commitMount(node: unknown) {
      ut(node).handleAutoFocus(node);
    },
    isPrimaryRenderer: !0,
    supportsMutation: !0,
    supportsPersistence: !1,
    supportsHydration: !1,
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,
    getCurrentUpdatePriority: () => Wg.currentUpdatePriority,
    beforeActiveInstanceBlur() {},
    afterActiveInstanceBlur() {},
    detachDeletedInstance() {},
    getInstanceFromNode: () => null,
    prepareScopeUpdate() {},
    getInstanceFromScope: () => null,
    appendChildToContainer: VA6,
    insertInContainerBefore: Nv8,
    removeChildFromContainer(container: unknown, child: unknown) {
      bZ_(container, child), freeYogaNodeTree(child as {
        yogaNode?: {
          unsetMeasureFunc(): void;
          freeRecursive(): void;
        };
      }), ut(container).handleNodeRemoved(child, container), releaseRawModeRefsRecursive(child as {
        _holdsRawModeRef?: boolean;
        childNodes: unknown[];
        nodeName: string;
      }, container as {
        setRawMode?: (enabled: boolean) => void;
        _pendingRawModeDelta?: number;
      });
    },
    commitUpdate(node: unknown, _preparedUpdate: unknown, oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
      let propsDiff = diffProps(oldProps, newProps),
        styleDiff = diffProps(oldProps.style as Record<string, unknown>, newProps.style as Record<string, unknown>),
        rawModeChanged = !1;
      if (propsDiff) for (let [propKey, propValue] of Object.entries(propsDiff)) {
        if (propKey === "style") {
          vv8(node, propValue);
          continue;
        }
        if (propKey === "textStyles") {
          bY7(node, propValue);
          continue;
        }
        if (propKey === "accessibility") {
          yv8(node, propValue);
          continue;
        }
        if (Cv8.has(propKey)) {
          if (setEventHandler(node as {
            _eventHandlers?: Record<string, unknown>;
          }, propKey, propValue), Sv8.has(propKey)) rawModeChanged = !0;
          continue;
        }
        Vv8(node, propKey, propValue);
      }
      if (rawModeChanged) syncRawModeRef(node as {
        _holdsRawModeRef?: boolean;
        _eventHandlers?: Record<string, unknown>;
      }, WsH(node) as {
        setRawMode?: (enabled: boolean) => void;
        _pendingRawModeDelta?: number;
      });
      if (propsDiff?.autoFocus === !0) ut(node).handleAutoFocus(node);
      if (styleDiff && (node as {
        yogaNode?: unknown;
      }).yogaNode) uv8((node as {
        yogaNode: unknown;
      }).yogaNode, styleDiff, newProps.style);
    },
    commitTextUpdate(node: unknown, _oldText: string, newText: string) {
      IZ_(node, newText);
    },
    removeChild(parent: unknown, child: unknown) {
      if (bZ_(parent, child), freeYogaNodeTree(child as {
        yogaNode?: {
          unsetMeasureFunc(): void;
          freeRecursive(): void;
        };
      }), (child as {
        nodeName: string;
      }).nodeName !== "#text") {
        let container = WsH(parent);
        (container as {
          focusManager: {
            handleNodeRemoved(child: unknown, container: unknown): void;
          };
        }).focusManager.handleNodeRemoved(child, container), releaseRawModeRefsRecursive(child as {
          _holdsRawModeRef?: boolean;
          childNodes: unknown[];
          nodeName: string;
        }, container as {
          setRawMode?: (enabled: boolean) => void;
          _pendingRawModeDelta?: number;
        });
      }
    },
    maySuspendCommit() {
      return !1;
    },
    preloadInstance() {
      return !0;
    },
    startSuspendingCommit() {},
    suspendInstance() {},
    waitForCommitToBeReady() {
      return null;
    },
    NotPendingTransition: null,
    HostTransitionContext: {
      $$typeof: Symbol.for("react.context"),
      _currentValue: null
    },
    setCurrentUpdatePriority(priority: number) {
      Wg.currentUpdatePriority = priority;
    },
    resolveUpdatePriority() {
      return Wg.resolveEventPriority();
    },
    resetFormInstance() {},
    requestPostPaintCallback() {},
    shouldAttemptEagerTransition() {
      return !1;
    },
    trackSchedulerEvent() {},
    resolveEventType() {
      return Wg.currentEvent?.type ?? null;
    },
    resolveEventTimeStamp() {
      return Wg.currentEvent?.timeStamp ?? -1.1;
    }
  });
  Wg.discreteUpdates = (gv8 as {
    discreteUpdates: unknown;
  }).discreteUpdates.bind(gv8);
  J9H = gv8;
});
export {setEventHandler as DHi,nodeHasRawModeHandlers as Igd,applyRawModeDelta as PHi,syncRawModeRef as HHi,releaseRawModeRefsRecursive as Q4r,applyNodeProp as xgd,collectDebugOwnerChain as Dgd,Qv8 as eqr,qA7 as OHi,KA7 as LHi,OA7 as MHi,TA7 as NHi,zA7 as FHi,fsModule as TPt,reconcilerModule as xHi,diffProps as wHi,freeYogaNodeTree as kHi,debugRepaintsCache as j4r,Wg as F8,mt as wZ,commitCount as Y4r,lastStatFlushTimestamp as IHi,prevCommitEndTimestamp as J4r,maxCommitGapMs as XCn,createInstanceCount as QCn,prepareForCommitTimestamp as X4r,yogaElapsedMs as tqr,commitElapsedMs as nqr,layoutStartTimestamp as SPt,gv8 as Z4r,J9H as kZ,ZsH as _tt};

// @ts-nocheck
import {Uca as Lo7} from "../../vendor/m3225.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {T7 as KqH} from "../session/1465_promise.ts";
import {b as L} from "../../runtime.ts";
/** Returns the cached native computer-use bindings, initializing on first call. */
function fQ(): ReturnType<typeof Lo7> {
  return bv3 ??= Lo7();
}

/** Cached singleton for the native computer-use bindings object. */
var bv3: ReturnType<typeof Lo7>;

/** Calls `_drainMainRunLoop` on the native bindings once — used as the setInterval callback. */
function drainRunLoopOnce(nativeBindings: ReturnType<typeof Lo7>): void {
  nativeBindings._drainMainRunLoop();
}

/** Increments the pump reference count and starts the run-loop drain interval if not already running. */
function startDrainPump(): void {
  if (XW6++, drainIntervalId === void 0) drainIntervalId = setInterval(drainRunLoopOnce, 1, fQ()), N("[drainRunLoop] pump started", {
    level: "verbose"
  });
}

/** Decrements the pump reference count and stops the drain interval when the count reaches zero. */
function stopDrainPump(): void {
  if (XW6--, XW6 <= 0 && drainIntervalId !== void 0) clearInterval(drainIntervalId), drainIntervalId = void 0, N("[drainRunLoop] pump stopped", {
    level: "verbose"
  }), XW6 = 0;
}

/** Rejects the given deferred promise with a NativeCallTimeoutError. */
function rejectWithTimeout(reject: (err: Error) => void, timeoutMs: number): void {
  reject(new NativeCallTimeoutError(timeoutMs));
}

/**
 * Runs a native computer-use async factory with the macOS run-loop drain pump active
 * and a configurable timeout (default 30 s). Races the factory promise against a
 * timeout that rejects with {@link NativeCallTimeoutError}.
 */
async function k$H<T>(factory: () => Promise<T>, timeoutMs: number = DEFAULT_NATIVE_CALL_TIMEOUT_MS): Promise<T> {
  startDrainPump();
  let timeoutHandle: ReturnType<typeof setTimeout>;
  try {
    let promise = factory();
    promise.catch(() => {});
    let deferred = KqH<T>();
    return timeoutHandle = setTimeout(rejectWithTimeout, timeoutMs, deferred.reject, timeoutMs), await Promise.race([promise, deferred.promise]);
  } finally {
    clearTimeout(timeoutHandle!), stopDrainPump();
  }
}

/** Active `setInterval` handle for the run-loop pump, or `undefined` when the pump is stopped. */
var drainIntervalId: ReturnType<typeof setInterval> | undefined,
  /** Reference count tracking how many concurrent callers are holding the drain pump active. */
  XW6: number = 0,
  /** Default timeout in milliseconds for native computer-use calls (30 s). */
  DEFAULT_NATIVE_CALL_TIMEOUT_MS: number = 30000,
  /** Error thrown when a native computer-use call exceeds the allowed timeout. */
  NativeCallTimeoutError: {
    new (timeoutMs: number): Error;
  },
  /** Re-exported alias for {@link startDrainPump}. */
  Vo7: typeof startDrainPump,
  /** Re-exported alias for {@link stopDrainPump}. */
  yo7: typeof stopDrainPump;

/** Lazy-initialisation block: declares {@link NativeCallTimeoutError} and wires up the exported pump aliases. */
var Mc8 = L(() => {
  FH();
  NativeCallTimeoutError = class NativeCallTimeoutError extends Error {
    constructor(timeoutMs: number) {
      super(`computer-use native call exceeded ${timeoutMs}ms`);
    }
  };
  Vo7 = startDrainPump, yo7 = stopDrainPump;
});
export {fQ as L$,bv3 as Ljd,drainRunLoopOnce as Mjd,startDrainPump as $ca,stopDrainPump as qca,rejectWithTimeout as Fjd,k$H as Pee,drainIntervalId as PFt,XW6 as $Dn,DEFAULT_NATIVE_CALL_TIMEOUT_MS as Njd,NativeCallTimeoutError as Wca,Vo7 as Gca,yo7 as Vca,Mc8 as qDn};

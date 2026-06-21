// @ts-nocheck
import {onSessionSwitch as Z5H,setMainLoopModelOverride as DJ,lt as w_} from "../session/0131_sent.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {ohe as COH,xz as cF} from "../agent/2734_partialTextChars.ts";
import {uc as R1,vA as q$,tE as qP} from "../api/1448_month.ts";
import {b as L} from "../../runtime.ts";
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Shape of the restored refusal-fallback model latch returned by Oyq(). */
interface RestoredLatchState {
  appStateModel: string | null;
  forSessionValue: string | undefined;
  overrideValue: string | undefined;
  restoredToExplicitOverride: boolean;
  fallbackModel: string;
}

/** Updater function accepted by the app-store setState (zustand-style). */
type AppStateUpdater<S> = (updater: (prev: S) => S) => void;

/** Minimal slice of app state that hU3 reads and mutates. */
interface ModelAppState {
  mainLoopModel: string | null;
  mainLoopModelForSession: string | null | undefined;
  fastMode: boolean;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

/**
 * Subscribes to the session-change signal (Z5H) and, whenever a refusal-
 * fallback model latch is reset (K is truthy), syncs the restored latch state
 * into the React/Zustand app store and emits a `tengu_refusal_fallback_latch_reset`
 * telemetry event.
 *
 * @param setState - The app-store setState dispatcher (from $.setState).
 * @returns Unsubscribe function returned by Z5H.
 */
function subscribeRefusalFallbackLatchReset(
  setState: AppStateUpdater<ModelAppState>
): () => void {
  return Z5H((_sessionId: string, event: string, restoredLatchState?: RestoredLatchState) => {
    if (!restoredLatchState) return;
    applyRestoredLatchStateToAppStore(restoredLatchState, setState),
      c("tengu_refusal_fallback_latch_reset", {
        source: tH(event),
        restored_to_explicit_override: restoredLatchState.restoredToExplicitOverride,
        model_scope: tH(COH(restoredLatchState.fallbackModel))
      });
  });
}

/**
 * Subscribes to the session-change signal (Z5H) and calls `callback` whenever
 * a refusal-fallback model latch was reset as part of the session change.
 *
 * @param callback - Invoked (with no arguments) when the latch was reset.
 * @returns Unsubscribe function returned by Z5H.
 */
function subscribeRefusalFallbackLatchCallback(
  callback: () => void
): () => void {
  return Z5H((_sessionId: string, _event: string, restoredLatchState?: RestoredLatchState) => {
    if (restoredLatchState) callback();
  });
}

/**
 * Syncs the restored latch state back into the app store and persists the
 * override value to the global B_ state via DJ.
 *
 * Computes the effective model from the latch's overrideValue → forSessionValue →
 * appStateModel fallback chain.  If fast-mode is on but the effective model does
 * not support it (q$ check), fast-mode is disabled.  No-ops if the store is already
 * in the target state.
 *
 * @param restoredLatchState - The latch state returned by Oyq() on session clear.
 * @param setState - The app-store setState dispatcher.
 */
function applyRestoredLatchStateToAppStore(
  restoredLatchState: RestoredLatchState,
  setState: AppStateUpdater<ModelAppState>
): void {
  setState((currentState: ModelAppState) => {
    let effectiveModel =
        restoredLatchState.overrideValue ??
        restoredLatchState.forSessionValue ??
        restoredLatchState.appStateModel,
      shouldDisableFastMode = R1() && currentState.fastMode && !q$(effectiveModel);
    return currentState.mainLoopModel === restoredLatchState.appStateModel &&
      currentState.mainLoopModelForSession === restoredLatchState.forSessionValue &&
      !shouldDisableFastMode
      ? currentState
      : {
          ...currentState,
          mainLoopModel: restoredLatchState.appStateModel,
          mainLoopModelForSession: restoredLatchState.forSessionValue,
          ...(shouldDisableFastMode && {
            fastMode: !1
          })
        };
  }),
    DJ(restoredLatchState.overrideValue);
}

// ---------------------------------------------------------------------------
// Lazy initialisation (module init block — keep cross-module calls AS-IS)
// ---------------------------------------------------------------------------
var EG6 = L(() => {
  w_();
  y_();
  qP();
  cF();
});

export {subscribeRefusalFallbackLatchReset as yDn,subscribeRefusalFallbackLatchCallback as fua,applyRestoredLatchStateToAppStore as yGd,EG6 as TDn};

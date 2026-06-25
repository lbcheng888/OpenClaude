// @ts-nocheck
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {gracefulShutdownSync as C1,isAmberSentinelEnabled as CT} from "./3348_flushAnalyticsSinks.ts";
import {b as L} from "../../runtime.ts";
/** Idle-exit timer: exits the process after CLAUDE_CODE_EXIT_AFTER_STOP_DELAY ms of idle time. */
function createIdleExitTimer(isIdleChecker: () => boolean): {
  start(): void;
  stop(): void;
} {
  let envVarValue = process.env.CLAUDE_CODE_EXIT_AFTER_STOP_DELAY,
    delayMs = envVarValue ? parseInt(envVarValue, 10) : null,
    isDelayEnabled = delayMs && !isNaN(delayMs) && delayMs > 0,
    timeoutHandle: ReturnType<typeof setTimeout> | null = null,
    timerStartTimestamp = 0;
  return {
    start() {
      if (timeoutHandle) clearTimeout(timeoutHandle), timeoutHandle = null;
      if (isDelayEnabled) timerStartTimestamp = Date.now(), timeoutHandle = setTimeout(() => {
        let elapsed = Date.now() - timerStartTimestamp;
        if (isIdleChecker() && elapsed >= delayMs) N(`Exiting after ${delayMs}ms of idle time`), C1();
      }, delayMs);
    },
    stop() {
      if (timeoutHandle) clearTimeout(timeoutHandle), timeoutHandle = null;
    }
  };
}

/** Lazy initializer for the idle-exit timer module's dependencies. */
var initIdleExitModule = L(() => {
  FH();
  CT();
});
export {createIdleExitTimer as fyc,initIdleExitModule as hyc};

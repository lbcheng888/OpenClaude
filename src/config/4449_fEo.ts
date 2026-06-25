// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Wi as c7,Hn as V6} from "../../vendor/m100.ts";
import {jn as o6,getFeatureValue_CACHED_MAY_BE_STALE as Y_} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Ir as _q} from "../../vendor/m584.ts";
import {br as N8,getInitialSettings as n8} from "./0745_updateSettingsForSource.ts";
import {Ne as oH} from "../../vendor/m583.ts";
/** Valid modes for the total-tokens reminder injected into the system prompt. */
type TotalTokensReminderMode = "off" | "infinite" | "fixed" | "countdown";

/**
 * Returns true when `value` is a recognised TotalTokensReminderMode string
 * (i.e. not undefined and present in the valid-modes list).
 */
function isValidTotalTokensReminderMode(value: string | undefined): value is TotalTokensReminderMode {
  return value !== void 0 && TOTAL_TOKENS_REMINDER_MODES.includes(value);
}

/**
 * Formats the `<total_tokens>` XML block that is injected into the system
 * prompt / tool results.
 *
 * @param mode - The active reminder mode.
 * @param remainingTokens - Live remaining tokens (used only in "countdown" mode).
 */
function formatTotalTokensReminderBlock(mode: TotalTokensReminderMode, remainingTokens: number): string {
  return `<total_tokens>${mode === "infinite" ? "Infinite" : mode === "fixed" ? FIXED_TOKEN_COUNT : Math.max(0, remainingTokens)} tokens left</total_tokens>`;
}
var TOTAL_TOKENS_REMINDER_MODES: string[],
  /** Fixed token count emitted when mode is "fixed". */
  FIXED_TOKEN_COUNT = 5000000,
  /** Memoised getter that resolves the current TotalTokensReminderMode. */
  getTotalTokensReminderMode: () => TotalTokensReminderMode;

/** Module initialiser — populates the module-level vars. */
var wOq = L(() => {
  c7();
  o6();
  _q();
  N8();
  TOTAL_TOKENS_REMINDER_MODES = ["off", "infinite", "fixed", "countdown"];
  getTotalTokensReminderMode = V6((): TotalTokensReminderMode => {
    // 1. Env var overrides everything.
    let envValue = oH.CLAUDE_CODE_TOTAL_TOKENS_REMINDER;
    if (isValidTotalTokensReminderMode(envValue)) return envValue;
    // 2. User settings come next.
    let settingsValue = n8().totalTokensReminder;
    if (isValidTotalTokensReminderMode(settingsValue)) return settingsValue;
    // 3. GrowthBook feature flag with default "off".
    let flagValue = Y_("tengu_lapis_anchor", "off");
    return isValidTotalTokensReminderMode(flagValue) ? flagValue : "off";
  });
});
export {isValidTotalTokensReminderMode as mEo,formatTotalTokensReminderBlock as SGn,TOTAL_TOKENS_REMINDER_MODES as MKp,FIXED_TOKEN_COUNT as NKp,getTotalTokensReminderMode as TGn,wOq as fEo};

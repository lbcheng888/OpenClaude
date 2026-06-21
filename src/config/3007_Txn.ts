// @ts-nocheck
import {_l as P4} from "../../vendor/m5.ts";
import {dGr as hU8,pGr as kU8,OGi as im7,LGi as rm7} from "./3006_r.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "./0047_namespace.ts";
/**
 * Syntax-highlighting guard helpers.
 *
 * These three factory functions return the corresponding syntax-highlighting
 * class / theme-info object only when the feature has NOT been disabled via
 * the CLAUDE_CODE_SYNTAX_HIGHLIGHT environment variable.  When the env var is
 * present (and evaluates to a "falsy" sentinel via P4), they return null so
 * that callers can skip rendering.
 *
 * P4  – cross-module: isEnvVarDisabled(value) — returns true when the value
 *        represents a "disabled" flag (e.g. "0", "false", empty string).
 * hU8 – cross-module: DiffHunkHighlighter class (from 2987_r.ts).
 * kU8 – cross-module: CodeBlockHighlighter class (from 2987_r.ts).
 * im7 – cross-module: buildSyntaxThemeInfo(themeName) (from 2987_r.ts).
 * rm7 – cross-module: lazy-init for the syntax-highlighting subsystem (2987_r.ts).
 * A6  – cross-module: lazy-init for the config/env subsystem.
 * L   – cross-module: lazy-init wrapper.
 */

/**
 * Returns `"env"` when the CLAUDE_CODE_SYNTAX_HIGHLIGHT environment variable
 * is set to a disabled value (checked via P4), otherwise returns `null`.
 *
 * Used by callers to distinguish between "disabled by env" and "not disabled".
 */
function getSyntaxHighlightEnvOverride(): "env" | null {
  if (P4(process.env.CLAUDE_CODE_SYNTAX_HIGHLIGHT)) return "env";
  return null;
}

/**
 * Returns the DiffHunkHighlighter class when syntax highlighting is not
 * overridden by the environment, or `null` when it is disabled via env.
 */
function getDiffHighlighterClass(): typeof hU8 | null {
  return getSyntaxHighlightEnvOverride() === null ? hU8 : null;
}

/**
 * Returns the CodeBlockHighlighter class when syntax highlighting is not
 * overridden by the environment, or `null` when it is disabled via env.
 */
function getCodeHighlighterClass(): typeof kU8 | null {
  return getSyntaxHighlightEnvOverride() === null ? kU8 : null;
}

/**
 * Returns the syntax theme info object for the given theme name when syntax
 * highlighting is not overridden by the environment, or `null` otherwise.
 *
 * @param themeName - The name of the syntax theme to resolve.
 */
function getSyntaxThemeInfo(themeName: string): { theme: string; source: null } | null {
  return getSyntaxHighlightEnvOverride() === null ? im7(themeName) : null;
}

/** Lazy-init: loads the syntax-highlighting subsystem and config dependencies. */
var yX6 = L(() => {
  rm7();
  A6();
});

export {getSyntaxHighlightEnvOverride as yLt,getDiffHighlighterClass as MGi,getCodeHighlighterClass as NGi,getSyntaxThemeInfo as BGi,yX6 as Txn};

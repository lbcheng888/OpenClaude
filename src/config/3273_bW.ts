// @ts-nocheck
import {st as q_} from "../../vendor/m5.ts";
import {getSearchToolsOptIn as Tt6,lt as w_} from "../session/0131_sent.ts";
import {Su as $5,oA as O$} from "./2697_oA.ts";
import {b as L} from "../../runtime.ts";
import {VR as qZ,yu as B5} from "../../vendor/m2249.ts";
import {Vw as RP,$c as g1} from "../../vendor/m2695.ts";
import {sn as A6} from "./0047_namespace.ts";
/**
 * Shell-quoting helpers and bash-mode tool-availability detection.
 *
 * When bash execution is available, the built-in GlobTool / GrepTool are
 * superseded by native `find` / `grep` run through the Bash tool, so the
 * two built-in tools are returned as "disabled" by `getDisabledBuiltinSearchTools`.
 *
 * Exported lazy-init bundle: ZQ
 */

/**
 * Shell-quote `str` and append `< /dev/null` so the command never reads
 * from stdin when passed to a shell via `-c`.
 */
function shellQuoteWithNullStdin(str: string): string {
  return shellQuote(str) + " < /dev/null";
}

/**
 * Single-quote `str` for safe embedding in POSIX shell commands.
 * Embedded single-quotes are replaced with the `'"'"'` escape sequence.
 */
function shellQuote(str: string): string {
  return "'" + str.replaceAll("'", `'"'"'`) + "'";
}

/**
 * Returns `true` when bash-mode execution is available for this session:
 * - The feature flag is enabled (currently always true via `q_("true")`).
 * - `Tt6()` does not indicate a mode that disables bash.  // FIXME: Tt6 unverified name
 * - The session is not running as a `local-agent` entrypoint.
 */
function isBashAvailable(): boolean {
  if (!q_("true")) return !1;
  if (Tt6()) return !1;
  return process.env.CLAUDE_CODE_ENTRYPOINT !== "local-agent";
}

/**
 * Returns the set of built-in search tool names that are disabled for this
 * session.  When bash is available and the platform supports it, the native
 * Glob / Grep tools are replaced by `find` / `grep` via the Bash tool.
 *
 * @returns An empty `Set` when neither condition holds, or a `Set` containing
 *          `B5` ("Glob") and `g1` ("Grep") when bash is available.
 */
function getDisabledBuiltinSearchTools(): Set<string> {
  if (!isBashAvailable() || !$5()) return emptyToolSet;
  return globGrepToolSet;
}

var emptyToolSet: Set<string>, globGrepToolSet: Set<string>;

/** Lazy-init bundle for this module's exports. */
var ZQ = L(() => {
  w_();
  qZ();
  RP();
  A6();
  O$();
  emptyToolSet = new Set(), globGrepToolSet = new Set([B5, g1]);
});

export {shellQuoteWithNullStdin as gia,shellQuote as Ujd,isBashAvailable as Zw,getDisabledBuiltinSearchTools as $ot,emptyToolSet as $jd,globGrepToolSet as qjd,ZQ as bW};

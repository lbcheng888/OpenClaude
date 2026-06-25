// @ts-nocheck
import {dd,KN,Xl} from "../config/0651_maxBytes.ts";
import {fl,po} from "../tools/5224_userPromptCount.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {wC,initModelResolutionModule as iq} from "./3298_result.ts";
import {truncate as Ha} from "../../vendor/m239.ts";
import {DD} from "../telemetry/2792_eventName.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Xo} from "../../vendor/m240.ts";
import {dye,iL} from "../tools/3938_items.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Search tool — UI/result rendering helpers.
 *
 * Provides the display name, the in-progress prompt label, and the
 * result-message renderer for the file-search (glob/pattern) tool.
 * Structure preserved 1:1 from the reverse-engineered bundle; only local
 * bindings renamed and types/comments added.
 */

/** Tool display name shown in the UI. */
function NUa(): string {
  return "Search";
}

/**
 * Build the human-readable prompt label for an in-progress search.
 * @param input - the tool input ({ pattern, path }).
 * @param options - rendering options ({ verbose }).
 */
function FUa(
  {
    pattern: pattern,
    path: searchPath
  }: { pattern?: string; path?: string },
  {
    verbose: verbose
  }: { verbose?: boolean }
): string | null {
  if (!pattern) return null;
  if (!searchPath) return `pattern: "${pattern}"`;
  return `pattern: "${pattern}", path: "${verbose ? searchPath : dd(searchPath)}"`;
}

/**
 * Render the result message for a completed search.
 * On a (non-verbose) tool_use_error string, shows a "File not found" or
 * generic search-error notice; otherwise delegates to the normal renderer.
 * @param result - the tool result payload (may be an error string).
 * @param options - rendering options ({ verbose }).
 */
function BUa(
  result: unknown,
  {
    verbose: verbose
  }: { verbose?: boolean }
): unknown {
  if (!verbose && typeof result === "string" && fl(result, "tool_use_error")) {
    if (fl(result, "tool_use_error")?.includes(KN)) return Zut.jsx(Yn, {
      children: Zut.jsx(v, {
        color: "error",
        children: "File not found"
      })
    });
    return Zut.jsx(Yn, {
      children: Zut.jsx(v, {
        color: "error",
        children: "Error searching files"
      })
    });
  }
  return Zut.jsx(wC, {
    result: result,
    verbose: verbose
  });
}

/**
 * Derive a matcher (or null) from the tool input's pattern.
 * @param input - the tool input ({ pattern }).
 */
function ndo(input: { pattern?: string } | null | undefined): unknown {
  if (!input?.pattern) return null;
  return Ha(input.pattern, DD);
}

var Zut: any, UUa: any;

var $Ua = b(() => {
  Pl();
  po();
  iq();
  je();
  Xl();
  Xo();
  dye();
  Zut = x(oe(), 1);
  UUa = iL.renderToolResultMessage;
});

export {NUa,FUa,BUa,ndo,Zut,UUa,$Ua};

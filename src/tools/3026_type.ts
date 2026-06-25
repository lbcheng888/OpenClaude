// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {ri as M7,Ks as c9} from "./2235_userFacingName.ts";
import {$1t as Qh_,qot as SH_} from "../telemetry/2820__meta.ts";
import {rHe as jbH,T1 as pp} from "../../vendor/m2813.ts";
import {Jjr as VU8,qXi as zp7,WXi as $p7,d0n as vX6} from "../../vendor/m3024.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
import {ZWi as Wv7,QWi as Pv7} from "../../vendor/m2820.ts";
// Restored from obfuscated Claude Code 2.1.177 — module: tools/2994_type.ts
//
// Subsystem: tools (tool definition / registry).
//
// This module declares the base "mcp" tool template (`yU8`) — the canonical
// definition object that every concrete MCP server tool is derived from
// (see tools/3211_name.ts, where it is spread `{ ...yU8, name, ... }` per tool).
// It supplies the default schemas, permission behavior, result-truncation
// detection, and tool-result mapping shared by all MCP tools.
//
// 1:1 reverse-engineering: only names, TypeScript types, and doc comments were
// added. Control flow, operators (including `!0`/`!1`), string literals, and all
// cross-module / property references are preserved EXACTLY.
//
// Cross-module symbols kept verbatim (defined in other bundle chunks; renaming
// here would break references): `c9` (tool-definition wrapper applying defaults
// + a `userFacingName` accessor), `kH` (lazy/memoized factory wrapper), `k`
// (zod schema library), `pp` (string-truncation predicate at a given column
// width), `SH_` (strips `_meta` from text content blocks), `Wv7`/`Pv7`
// (description/prompt strings), `zp7`/`$p7`/`vX6` (tool-use / progress / result
// renderers). Module-init loaders `L`, `a8`, `M7`, `Qh_`, `jbH`, `VU8` are
// preserved as-is. The exported identities `yU8` (the tool definition) and
// `Yp7` (this module's lazy initializer) are referenced by those exact names
// from tools/3211_name.ts and so are kept unchanged.

declare const L: (init: () => void) => () => void;
declare const a8: () => void;
declare const M7: () => void;
declare const Qh_: () => void;
declare const jbH: () => void;
declare const VU8: () => void;

/** Lazy/memoized factory wrapper: returns a function that builds its value once. */
declare const kH: <T>(factory: () => T) => () => T;

/** zod-like schema builder library. */
declare const k: any;

/**
 * Wraps a raw tool definition, applying shared tool defaults and a
 * `userFacingName` accessor derived from the definition's `name`.
 */
declare const c9: <T extends {
  name: string;
}>(def: T) => T & {
  userFacingName: () => string;
};

/** Description string for the MCP tool (resolved from another bundle chunk). */
declare const Wv7: string;
/** Prompt string for the MCP tool (resolved from another bundle chunk). */
declare const Pv7: string;
/** Renders the tool-use message for an MCP tool invocation. */
declare const zp7: (...args: unknown[]) => unknown;
/** Renders the in-progress tool-use message for an MCP tool invocation. */
declare const $p7: (...args: unknown[]) => unknown;
/** Renders an MCP tool result message; signature `(content, [], { verbose })`. */
declare const vX6: (...args: unknown[]) => unknown;

/** Returns true if `text` would be truncated at the given column width. */
declare const pp: (text: string, columns: number | undefined) => boolean;

/** Strips `_meta` fields from text content blocks before returning result content. */
declare const SH_: <T>(content: T) => T;

/** A text content block as produced/consumed by MCP tool results. */
interface TextContentBlock {
  type: "text";
  text: string;
}

/** MCP tool result content: a string or an array of content blocks. */
type McpToolResultContent = string | Array<{
  type: string;
  text?: string;
}>;

/** Options passed to result-rendering / truncation logic. */
interface ToolResultRenderOptions {
  columns?: number;
}

/** Anthropic Messages API `tool_result` block parameter. */
interface ToolResultBlockParam {
  tool_use_id: string;
  type: "tool_result";
  content: unknown;
}

/** Lazy zod schema: passthrough object schema for MCP tool input. */
var BW3: () => any;
/** Lazy zod schema: union describing MCP tool execution result. */
var UW3: () => any;
/** Base "mcp" tool definition; spread and overridden to derive each concrete MCP tool. */
var yU8: ReturnType<typeof c9>;

/**
 * Lazy module initializer for the base MCP tool definition. Invoked by the
 * tools registry (tools/3211_name.ts) before deriving per-server MCP tools.
 */
var Yp7 = L(() => {
  a8();
  M7();
  Qh_();
  jbH();
  VU8();
  BW3 = kH(() => k.object({}).passthrough()), UW3 = kH(() => k.union([k.string(), k.array(k.object({
    type: k.string()
  }).passthrough()), k.undefined()]).describe("MCP tool execution result")), yU8 = c9({
    isMcp: !0,
    isOpenWorld() {
      return !1;
    },
    name: "mcp",
    maxResultSizeChars: 1e5,
    async description() {
      return Wv7;
    },
    async prompt() {
      return Pv7;
    },
    get inputSchema() {
      return BW3();
    },
    get outputSchema() {
      return UW3();
    },
    async call() {
      return {
        data: ""
      };
    },
    async checkPermissions() {
      return {
        behavior: "passthrough",
        message: "MCPTool requires permission."
      };
    },
    renderToolUseMessage: zp7,
    userFacingName: () => "mcp",
    renderToolUseProgressMessage: $p7,
    renderToolResultMessage: vX6,
    /**
     * Returns true when the rendered result would be truncated at the current
     * terminal width: for a string result, when it exceeds the column width;
     * for content blocks, when any text block would be truncated.
     */
    isResultTruncated(content: McpToolResultContent, options?: ToolResultRenderOptions) {
      let columns = options?.columns;
      if (typeof content === "string") return pp(content, columns);
      if (Array.isArray(content)) return content.some(block => block.type === "text" && pp(block.text!, columns));
      return !1;
    },
    /**
     * Maps an MCP tool result to an Anthropic Messages API `tool_result` block,
     * stripping internal `_meta` from text content blocks first.
     */
    mapToolResultToToolResultBlockParam(content: McpToolResultContent, toolUseId: string): ToolResultBlockParam {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: SH_(content)
      };
    }
  });
});
export {BW3 as Sqd,UW3 as bqd,yU8 as Xjr,Yp7 as GXi};

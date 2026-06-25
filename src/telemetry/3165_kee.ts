// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
/**
 * MCP (Model Context Protocol) skills capability detection.
 *
 * Helpers for the `tengu_mcp_skills` feature gate and for detecting whether an
 * MCP server advertises the experimental "skills" extension in its
 * capabilities/extensions block.
 */

/**
 * Read the `tengu_mcp_skills` feature flag (defaulting to disabled).
 * @returns whether the MCP skills capability is enabled.
 */
function eH(): boolean {
  return it("tengu_mcp_skills", !1);
}

/**
 * Detect whether the given MCP server capabilities object declares the
 * skills extension.
 * @param serverCapabilities - MCP server capabilities, with an optional
 *   `extensions` map keyed by extension URI.
 * @returns true if the skills extension URI is present.
 */
function Usa(serverCapabilities?: {
  extensions?: Record<string, unknown>;
}): boolean {
  return serverCapabilities?.extensions?.[_Xr] !== void 0;
}

/** Extension URI identifying the MCP skills extension. */
var _Xr = "io.modelcontextprotocol/skills";

/** Lazy module-initialization thunk; ensures dependencies are loaded once. */
var kee = b(() => {
  jn();
});

export {eH as mcpTools,Usa,_Xr,kee};

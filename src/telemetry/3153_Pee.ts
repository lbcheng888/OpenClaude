// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
/** Returns whether the "tengu_mcp_skills" feature flag is enabled (cached, may be stale). */
function B0() {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_mcp_skills", !1);
}
/** Returns true if the given MCP resource/tool has the skills extension defined. */
function WQi(resource: any) {
  return resource?.extensions?.[jQi] !== void 0;
}
/** Returns true if the skills extension on the resource has directoryRead set to true. */
function Wrt(resource: any) {
  let ext = resource?.extensions?.[jQi];
  return ext != null && typeof ext === "object" && "directoryRead" in ext && ext.directoryRead === !0;
}
/** The MCP skills extension namespace key. */
var jQi = "io.modelcontextprotocol/skills";
/** Module initializer - triggers periodic GrowthBook refresh teardown. */
var Pee = b(() => {
  zn();
});
export {B0,WQi,Wrt,jQi,Pee};

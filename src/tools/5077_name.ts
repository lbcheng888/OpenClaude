// @ts-nocheck
import {zRo as DMq,R0l as mP4} from "./5076_taskSupport.ts";
import {globalRegistry as Km} from "../../vendor/m301.ts";
import {b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
/**
 * SDK MCP tool factory and SDK server wrapper.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

function pP4(H: RestoredUnknown, _: RestoredUnknown, q: RestoredUnknown, K: RestoredUnknown, O: RestoredUnknown): RestoredUnknown {
  let T = {};
  if (O?.searchHint) T["anthropic/searchHint"] = O.searchHint;
  if (O?.alwaysLoad) T["anthropic/alwaysLoad"] = !0;
  return {
    name: H,
    description: _,
    inputSchema: q,
    handler: K,
    annotations: O?.annotations,
    _meta: Object.keys(T).length > 0 ? T : void 0
  };
}
function BP4(H: RestoredUnknown): RestoredUnknown {
  let _ = new DMq({
    name: H.name,
    version: H.version ?? "1.0.0"
  }, {
    capabilities: {
      tools: H.tools ? {} : void 0
    },
    instructions: H.instructions
  });
  if (H.tools) H.tools.forEach(q => {
    for (let K of Object.values(q.inputSchema)) {
      if (!VqT(K)) continue;
      let O = K.description;
      if (O && !Km.has(K)) Km.add(K, {
        description: O
      });
    }
    _.registerTool(q.name, {
      description: q.description,
      inputSchema: q.inputSchema,
      annotations: q.annotations,
      _meta: H.alwaysLoad ? {
        "anthropic/alwaysLoad": !0,
        ...q._meta
      } : q._meta
    }, q.handler);
  });
  return {
    type: "sdk",
    name: H.name,
    instance: _
  };
}
function VqT(H: RestoredUnknown): RestoredUnknown {
  return typeof H === "object" && H !== null && "_zod" in H;
}
var UP4 = L(() => {
  mP4();
  a8();
});
export {pP4 as tool,BP4 as createSdkMcpServer,VqT as _pm,UP4 as H0l};

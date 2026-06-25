// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {gBt as JV_,A3e as XIH} from "../permissions/3312_recap.ts";
import {jn as o6,getFeatureValue_CACHED_MAY_BE_STALE as Y_} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
/**
 * Recap local command definition.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

var a04 = {};
j_(a04, {
  default: () => defaultCommand
});
var TKT = async (H, _) => {
    let q = await JV_(_.abortController.signal);
    switch (q.kind) {
      case "ok":
      case "api-error":
        return {
          type: "text",
          value: q.text
        };
      case "no-turn":
        return {
          type: "text",
          value: "Nothing to recap yet \u2014 send a message first."
        };
      case "aborted":
        return {
          type: "text",
          value: "Recap cancelled."
        };
      case "failed":
        return {
          type: "text",
          value: "Couldn't generate a recap. Run with --debug for details."
        };
    }
  },
  zKT,
  defaultCommand;
var s04 = L(() => {
  o6();
  XIH();
  zKT = {
    type: "local",
    name: "recap",
    description: "Generate a one-line session recap now",
    isEnabled: () => Y_("tengu_sedge_lantern", !0),
    supportsNonInteractive: !1,
    thinClientDispatch: "post-text",
    load: () => Promise.resolve({
      call: TKT
    })
  }, defaultCommand = zKT;
});
export {a04 as XUl,TKT as KCm,zKT as zCm,defaultCommand as jCm,s04 as QUl};

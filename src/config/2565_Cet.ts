// @ts-nocheck
import {je as oH,tk as Sy} from "../../vendor/m577.ts";
import {b as L} from "../../runtime.ts";
import {zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
/** Returns true if the CLAUDE_CODE_KB_COHESION_FIXES feature flag is enabled. */
function MC(): boolean {
  if (oH.CLAUDE_CODE_KB_COHESION_FIXES) return !0;
  return !1;
}

/** Lazy-initialized module for KB cohesion fixes config; depends on env flags (o6) and Sy. */
var cSH = L(() => {
  o6();
  Sy();
});

export {MC as Y4,cSH as Cet};

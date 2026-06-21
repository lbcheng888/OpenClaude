// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {zn as o6,getFeatureValue_CACHED_MAY_BE_STALE as Y_} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {ekl as TM4,Zxl as OM4} from "../../vendor/m5000.ts";
/** Local slash-command definition for the "radio" tool (Claude FM lo-fi radio). */
var radioToolDefinition: {
  type: string;
  name: string;
  description: string;
  isEnabled: () => boolean;
  supportsNonInteractive: boolean;
  requires: Record<string, never>;
  load: () => Promise<typeof OM4>;
}, oJq: typeof radioToolDefinition;

/** Lazy initializer for the radio tool definition module. */
var zM4 = L(() => {
  o6();
  radioToolDefinition = {
    type: "local",
    name: "radio",
    description: "Listen to Claude FM lo-fi radio",
    isEnabled: () => Y_("tengu_velvet_static", !1),
    supportsNonInteractive: !1,
    requires: {},
    load: () => Promise.resolve().then(() => (TM4(), OM4))
  }, oJq = radioToolDefinition;
});

export {radioToolDefinition as icm,oJq as Hwo,zM4 as tkl};

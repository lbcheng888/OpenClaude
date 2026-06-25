// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {jn as o6,getFeatureValue_CACHED_MAY_BE_STALE as Y_} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {SMl as TM4,TMl as OM4} from "../../vendor/m5030.ts";
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
export {radioToolDefinition as yym,oJq as W0o,zM4 as bMl};

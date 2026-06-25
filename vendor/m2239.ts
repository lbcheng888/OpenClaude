// @ts-nocheck
import {getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
function JS(e){let t=getSettingsForSource("policySettings")?.strictPluginOnlyCustomization;if(t===!0)return!0;if(Array.isArray(t))return t.includes(e);return!1}
function Jfe(e){return e!==void 0&&Jld.has(e)}
var Jld;
var ez=b(()=>{br();Jld=new Set(["plugin","policySettings","built-in","builtin","bundled"])});
export {JS,Jfe,Jld,ez};

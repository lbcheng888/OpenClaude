// @ts-nocheck
import {getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
function iS(e){let t=getSettingsForSource("policySettings")?.strictPluginOnlyCustomization;if(t===!0)return!0;if(Array.isArray(t))return t.includes(e);return!1}
function Ufe(e){return e!==void 0&&wQu.has(e)}
var wQu;
var RK=b(()=>{yr();wQu=new Set(["plugin","policySettings","built-in","builtin","bundled"])});
export {iS,Ufe,wQu,RK};

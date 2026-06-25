// @ts-nocheck
import {getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {mi,lr} from "./m233.ts";
import {b} from "../runtime.ts";
function fI(){let e=getSettingsForSource("policySettings")?.enabledPlugins;if(!e)return null;let t=new Set;for(let[n,r]of Object.entries(e)){if(typeof r!=="boolean"||!n.includes("@"))continue;let o=mi(n,"@");if(o)t.add(o)}return t.size>0?t:null}
function Z7(){let e=getSettingsForSource("policySettings")?.enabledPlugins;if(!e)return null;let t=new Set;for(let[n,r]of Object.entries(e))if(r===!0&&n.includes("@"))t.add(n);return t.size>0?t:null}
var k8=b(()=>{br();lr()});
export {fI,Z7,k8};

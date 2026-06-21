// @ts-nocheck
import {getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {Di,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function BH(){let e=getSettingsForSource("policySettings")?.enabledPlugins;if(!e)return null;let t=new Set;for(let[n,r]of Object.entries(e)){if(typeof r!=="boolean"||!n.includes("@"))continue;let o=Di(n,"@");if(o)t.add(o)}return t.size>0?t:null}
function aZ(){let e=getSettingsForSource("policySettings")?.enabledPlugins;if(!e)return null;let t=new Set;for(let[n,r]of Object.entries(e))if(r===!0&&n.includes("@"))t.add(n);return t.size>0?t:null}
var m5=b(()=>{yr();dr()});
export {BH,aZ,m5};

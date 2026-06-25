// @ts-nocheck
import {Q} from "../runtime.ts";
import {ZU} from "./m606.ts";
var yys=Q((uan)=>{Object.defineProperty(uan,"__esModule",{value:!0});uan.getEndpointUrlConfig=void 0;var hys=ZU(),gys="AWS_ENDPOINT_URL",_ys="endpoint_url",J_u=(e)=>({environmentVariableSelector:(t)=>{let n=e.split(" ").map((s)=>s.toUpperCase()),r=t[[gys,...n].join("_")];if(r)return r;let o=t[gys];if(o)return o;return},configFileSelector:(t,n)=>{if(n&&t.services){let o=n[["services",t.services].join(hys.CONFIG_PREFIX_SEPARATOR)];if(o){let s=e.split(" ").map((a)=>a.toLowerCase()),i=o[[s.join("_"),_ys].join(hys.CONFIG_PREFIX_SEPARATOR)];if(i)return i}}let r=t[_ys];if(r)return r;return},default:void 0});uan.getEndpointUrlConfig=J_u});
export {yys};

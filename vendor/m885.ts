// @ts-nocheck
import {X} from "../runtime.ts";
import {I2} from "./m600.ts";
var Cps=X((Ron)=>{Object.defineProperty(Ron,"__esModule",{value:!0});Ron.getEndpointUrlConfig=void 0;var Sps=I2(),bps="AWS_ENDPOINT_URL",Eps="endpoint_url",Oau=(e)=>({environmentVariableSelector:(t)=>{let n=e.split(" ").map((s)=>s.toUpperCase()),r=t[[bps,...n].join("_")];if(r)return r;let o=t[bps];if(o)return o;return},configFileSelector:(t,n)=>{if(n&&t.services){let o=n[["services",t.services].join(Sps.CONFIG_PREFIX_SEPARATOR)];if(o){let s=e.split(" ").map((a)=>a.toLowerCase()),i=o[[s.join("_"),Eps].join(Sps.CONFIG_PREFIX_SEPARATOR)];if(i)return i}}let r=t[Eps];if(r)return r;return},default:void 0});Ron.getEndpointUrlConfig=Oau});
export {Cps};

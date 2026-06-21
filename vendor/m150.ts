// @ts-nocheck
import {serializeToolResult,Kde,v_t} from "./m141.ts";
import {g2,Brr} from "../src/core/0150_event.ts";
import {b} from "../runtime.ts";
async function wzt(e,t){let{response:n,requestLogID:r,retryOfRequestLogID:o,startTime:s}=t,i=await(async()=>{if(t.options.stream){if(serializeToolResult(e).debug("response",n.status,n.url,n.headers,n.body),t.options.__streamClass)return t.options.__streamClass.fromSSEResponse(n,t.controller);return g2.fromSSEResponse(n,t.controller)}if(n.status===204)return null;if(t.options.__binaryResponse)return n;let l=n.headers.get("content-type")?.split(";")[0]?.trim();if(l?.includes("application/json")||l?.endsWith("+json")){if(n.headers.get("content-length")==="0")return;let p=await n.json();return Frr(p,n)}return await n.text()})();return serializeToolResult(e).debug(`[${r}] response parsed`,Kde({retryOfRequestLogID:o,url:n.url,status:n.status,body:i,durationMs:Date.now()-s})),i}
function Frr(e,t){if(!e||typeof e!=="object"||Array.isArray(e))return e;return Object.defineProperty(e,"_request_id",{value:t.headers.get("request-id"),enumerable:!1})}
var Urr=b(()=>{Brr();v_t()});
export {wzt,Frr,Urr};

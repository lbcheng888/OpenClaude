// @ts-nocheck
import {JH,tpe,ZSt} from "./m143.ts";
import {FU,mlr} from "../src/core/0152_event.ts";
import {b} from "../runtime.ts";
async function sXt(e,t){let{response:n,requestLogID:r,retryOfRequestLogID:o,startTime:s}=t,i=await(async()=>{if(t.options.stream){if(JH(e).debug("response",n.status,n.url,n.headers,n.body),t.options.__streamClass)return t.options.__streamClass.fromSSEResponse(n,t.controller);return FU.fromSSEResponse(n,t.controller)}if(n.status===204)return null;if(t.options.__binaryResponse)return n;let l=n.headers.get("content-type")?.split(";")[0]?.trim();if(l?.includes("application/json")||l?.endsWith("+json")){if(n.headers.get("content-length")==="0")return;let p=await n.json();return flr(p,n)}return await n.text()})();return JH(e).debug(`[${r}] response parsed`,tpe({retryOfRequestLogID:o,url:n.url,status:n.status,body:i,durationMs:Date.now()-s})),i}
function flr(e,t){if(!e||typeof e!=="object"||Array.isArray(e))return e;return Object.defineProperty(e,"_request_id",{value:t.headers.get("request-id"),enumerable:!1})}
var hlr=b(()=>{mlr();ZSt()});
export {sXt,flr,hlr};

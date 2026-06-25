// @ts-nocheck
import {THt} from "./m1652.ts";
import {kHt} from "./m1702.ts";
import {t8} from "./m1699.ts";
import {b} from "../runtime.ts";
import {cse} from "./m1703.ts";
function getBearerTokenProvider(e,t,n){let{abortSignal:r,tracingOptions:o}=n||{},s=THt();s.addPolicy(kHt({credential:e,scopes:t}));async function i(){var a;let c=(a=(await s.sendRequest({sendRequest:(u)=>Promise.resolve({request:u,status:200,headers:u.headers})},t8({url:"https://example.com",abortSignal:r,tracingOptions:o}))).headers.get("authorization"))===null||a===void 0?void 0:a.split(" ")[1];if(!c)throw Error("Failed to get access token");return c}return i}
var hoi=b(()=>{cse()});
export {getBearerTokenProvider,hoi};

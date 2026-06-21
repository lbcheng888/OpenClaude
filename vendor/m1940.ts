// @ts-nocheck
import {Vwt} from "./m1647.ts";
import {tRt} from "./m1697.ts";
import {$8} from "./m1694.ts";
import {b} from "../runtime.ts";
import {use} from "./m1698.ts";
function getBearerTokenProvider(e,t,n){let{abortSignal:r,tracingOptions:o}=n||{},s=Vwt();s.addPolicy(tRt({credential:e,scopes:t}));async function i(){var a;let c=(a=(await s.sendRequest({sendRequest:(u)=>Promise.resolve({request:u,status:200,headers:u.headers})},$8({url:"https://example.com",abortSignal:r,tracingOptions:o}))).headers.get("authorization"))===null||a===void 0?void 0:a.split(" ")[1];if(!c)throw Error("Failed to get access token");return c}return i}
var TQs=b(()=>{use()});
export {getBearerTokenProvider,TQs};

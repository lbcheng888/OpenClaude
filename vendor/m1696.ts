// @ts-nocheck
import {THt,KPr} from "./m1652.ts";
import {CHt,XAe} from "./m1679.ts";
import {eJs,ZYs,tJs} from "./m1686.ts";
import {nJs,rJs} from "./m1687.ts";
import {XYs,QYs} from "./m1685.ts";
import {VYs,KYs} from "./m1682.ts";
import {YYs,JYs} from "./m1684.ts";
import {EOr,WYs,GYs} from "./m1681.ts";
import {DYs,PYs} from "./m1672.ts";
import {zYs,jYs} from "./m1683.ts";
import {uJs,dJs} from "./m1695.ts";
import {AYs,RYs} from "./m1669.ts";
import {EYs,CYs} from "./m1668.ts";
import {b} from "../runtime.ts";
function Ahn(e){if(e instanceof AbortSignal)return{abortSignal:e};if(e.aborted)return{abortSignal:AbortSignal.abort(e.reason)};let t=new AbortController,n=!0;function r(){if(n)e.removeEventListener("abort",o),n=!1}function o(){t.abort(e.reason),r()}return e.addEventListener("abort",o),{abortSignal:t.signal,cleanup:r}}
function pJs(){return{name:Y6u,sendRequest:async(e,t)=>{if(!e.abortSignal)return t(e);let{abortSignal:n,cleanup:r}=Ahn(e.abortSignal);e.abortSignal=n;try{return await t(e)}finally{r===null||r===void 0||r()}}}}
var Y6u="wrapAbortSignalLikePolicy";
var mJs=()=>{};
function ROr(e){var t;let n=THt();if(CHt){if(e.agent)n.addPolicy(eJs(e.agent));if(e.tlsOptions)n.addPolicy(nJs(e.tlsOptions));n.addPolicy(XYs(e.proxyOptions)),n.addPolicy(VYs())}if(n.addPolicy(pJs()),n.addPolicy(YYs(),{beforePolicies:[EOr]}),n.addPolicy(DYs(e.userAgentOptions)),n.addPolicy(ZYs((t=e.telemetryOptions)===null||t===void 0?void 0:t.clientRequestIdHeaderName)),n.addPolicy(WYs(),{afterPhase:"Deserialize"}),n.addPolicy(zYs(e.retryOptions),{phase:"Retry"}),n.addPolicy(uJs(Object.assign(Object.assign({},e.userAgentOptions),e.loggingOptions)),{afterPhase:"Retry"}),CHt)n.addPolicy(AYs(e.redirectOptions),{afterPhase:"Retry"});return n.addPolicy(EYs(e.loggingOptions),{afterPhase:"Sign"}),n}
var fJs=b(()=>{CYs();KPr();RYs();PYs();GYs();KYs();jYs();JYs();XAe();QYs();tJs();rJs();dJs();mJs()});
export {Ahn,pJs,Y6u,mJs,ROr,fJs};

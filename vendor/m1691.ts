// @ts-nocheck
import {Vwt,hHr} from "./m1647.ts";
import {Jwt,fCe} from "./m1674.ts";
import {sGs,oGs,iGs} from "./m1681.ts";
import {aGs,lGs} from "./m1682.ts";
import {nGs,rGs} from "./m1680.ts";
import {JWs,XWs} from "./m1677.ts";
import {eGs,tGs} from "./m1679.ts";
import {VHr,zWs,YWs} from "./m1676.ts";
import {NWs,BWs} from "./m1667.ts";
import {QWs,ZWs} from "./m1678.ts";
import {AGs,hGs} from "./m1690.ts";
import {kWs,HWs} from "./m1664.ts";
import {RWs,xWs} from "./m1663.ts";
import {b} from "../runtime.ts";
function qpn(e){if(e instanceof AbortSignal)return{abortSignal:e};if(e.aborted)return{abortSignal:AbortSignal.abort(e.reason)};let t=new AbortController,n=!0;function r(){if(n)e.removeEventListener("abort",o),n=!1}function o(){t.abort(e.reason),r()}return e.addEventListener("abort",o),{abortSignal:t.signal,cleanup:r}}
function gGs(){return{name:HNu,sendRequest:async(e,t)=>{if(!e.abortSignal)return t(e);let{abortSignal:n,cleanup:r}=qpn(e.abortSignal);e.abortSignal=n;try{return await t(e)}finally{r===null||r===void 0||r()}}}}
var HNu="wrapAbortSignalLikePolicy";
var _Gs=()=>{};
function YHr(e){var t;let n=Vwt();if(Jwt){if(e.agent)n.addPolicy(sGs(e.agent));if(e.tlsOptions)n.addPolicy(aGs(e.tlsOptions));n.addPolicy(nGs(e.proxyOptions)),n.addPolicy(JWs())}if(n.addPolicy(gGs()),n.addPolicy(eGs(),{beforePolicies:[VHr]}),n.addPolicy(NWs(e.userAgentOptions)),n.addPolicy(oGs((t=e.telemetryOptions)===null||t===void 0?void 0:t.clientRequestIdHeaderName)),n.addPolicy(zWs(),{afterPhase:"Deserialize"}),n.addPolicy(QWs(e.retryOptions),{phase:"Retry"}),n.addPolicy(AGs(Object.assign(Object.assign({},e.userAgentOptions),e.loggingOptions)),{afterPhase:"Retry"}),Jwt)n.addPolicy(kWs(e.redirectOptions),{afterPhase:"Retry"});return n.addPolicy(RWs(e.loggingOptions),{afterPhase:"Sign"}),n}
var yGs=b(()=>{xWs();hHr();HWs();BWs();YWs();XWs();ZWs();tGs();fCe();rGs();iGs();lGs();hGs();_Gs()});
export {qpn,gGs,HNu,_Gs,YHr,yGs};

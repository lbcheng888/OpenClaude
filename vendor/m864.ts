// @ts-nocheck
import {X} from "../runtime.ts";
import {Pus} from "./m861.ts";
import {Bus} from "./m863.ts";
var Fus=X((lon)=>{Object.defineProperty(lon,"__esModule",{value:!0});lon.recursionDetectionMiddleware=void 0;var msu=Pus(),fsu=Bus(),B_r="X-Amzn-Trace-Id",Asu="AWS_LAMBDA_FUNCTION_NAME",hsu="_X_AMZN_TRACE_ID",gsu=()=>(e)=>async(t)=>{let{request:n}=t;if(!fsu.HttpRequest.isInstance(n))return e(t);let r=Object.keys(n.headers??{}).find((u)=>u.toLowerCase()===B_r.toLowerCase())??B_r;if(n.headers.hasOwnProperty(r))return e(t);let o=process.env[Asu],s=process.env[hsu],l=(await msu.InvokeStore.getInstanceAsync())?.getXRayTraceId()??s,c=(u)=>typeof u==="string"&&u.length>0;if(c(o)&&c(l))n.headers[B_r]=l;return e({...t,request:n})};lon.recursionDetectionMiddleware=gsu});
export {Fus};

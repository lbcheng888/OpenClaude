// @ts-nocheck
import {Q} from "../runtime.ts";
import {wgs} from "./m866.ts";
import {Dgs} from "./m868.ts";
var Pgs=Q((Vin)=>{Object.defineProperty(Vin,"__esModule",{value:!0});Vin.recursionDetectionMiddleware=void 0;var Hhu=wgs(),Ihu=Dgs(),mCr="X-Amzn-Trace-Id",xhu="AWS_LAMBDA_FUNCTION_NAME",Dhu="_X_AMZN_TRACE_ID",Phu=()=>(e)=>async(t)=>{let{request:n}=t;if(!Ihu.HttpRequest.isInstance(n))return e(t);let r=Object.keys(n.headers??{}).find((u)=>u.toLowerCase()===mCr.toLowerCase())??mCr;if(n.headers.hasOwnProperty(r))return e(t);let o=process.env[xhu],s=process.env[Dhu],l=(await Hhu.InvokeStore.getInstanceAsync())?.getXRayTraceId()??s,c=(u)=>typeof u==="string"&&u.length>0;if(c(o)&&c(l))n.headers[mCr]=l;return e({...t,request:n})};Vin.recursionDetectionMiddleware=Phu});
export {Pgs};

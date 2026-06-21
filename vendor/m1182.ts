// @ts-nocheck
import {O1e,WEr} from "./m1180.ts";
import {b} from "../runtime.ts";
var pHs=(e)=>async(t)=>{let{request:n}=t;if(!O1e.isInstance(n))return e(t);return n.headers={...n.headers,"content-type":"application/vnd.amazon.eventstream","x-amz-content-sha256":"STREAMING-AWS4-HMAC-SHA256-EVENTS"},e({...t,request:n})},mHs;
var VEr=b(()=>{WEr();mHs={step:"build",tags:["EVENT_STREAM","HEADER","CONTENT_TYPE","CONTENT_SHA256"],name:"eventStreamHeaderMiddleware",override:!0}});
export {pHs,mHs,VEr};

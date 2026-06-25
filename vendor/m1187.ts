// @ts-nocheck
import {wNe,Tkr} from "./m1185.ts";
import {b} from "../runtime.ts";
var iLs=(e)=>async(t)=>{let{request:n}=t;if(!wNe.isInstance(n))return e(t);return n.headers={...n.headers,"content-type":"application/vnd.amazon.eventstream","x-amz-content-sha256":"STREAMING-AWS4-HMAC-SHA256-EVENTS"},e({...t,request:n})},aLs;
var bkr=b(()=>{Tkr();aLs={step:"build",tags:["EVENT_STREAM","HEADER","CONTENT_TYPE","CONTENT_SHA256"],name:"eventStreamHeaderMiddleware",override:!0}});
export {iLs,aLs,bkr};

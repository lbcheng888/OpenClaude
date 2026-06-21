// @ts-nocheck
import {O1e,WEr} from "./m1180.ts";
import {b} from "../runtime.ts";
var uHs=(e)=>(t,n)=>async(r)=>{let{request:o}=r;if(!O1e.isInstance(o))return t(r);return e.eventStreamPayloadHandler.handle(t,r,n)},dHs;
var GEr=b(()=>{WEr();dHs={tags:["EVENT_STREAM","SIGNATURE","HANDLE"],name:"eventStreamHandlingMiddleware",relation:"after",toMiddleware:"awsAuthMiddleware",override:!0}});
export {uHs,dHs,GEr};

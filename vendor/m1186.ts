// @ts-nocheck
import {wNe,Tkr} from "./m1185.ts";
import {b} from "../runtime.ts";
var oLs=(e)=>(t,n)=>async(r)=>{let{request:o}=r;if(!wNe.isInstance(o))return t(r);return e.eventStreamPayloadHandler.handle(t,r,n)},sLs;
var Skr=b(()=>{Tkr();sLs={tags:["EVENT_STREAM","SIGNATURE","HANDLE"],name:"eventStreamHandlingMiddleware",relation:"after",toMiddleware:"awsAuthMiddleware",override:!0}});
export {oLs,sLs,Skr};

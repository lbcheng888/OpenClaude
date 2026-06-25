// @ts-nocheck
import {b} from "../runtime.ts";
var LLs=()=>{};
var MLs=()=>(e)=>async(t)=>{let n={...t.input},r=await e(t),o=r.output;if(n.SessionId&&o.SessionId==null)o.SessionId=n.SessionId;return r},NLs;
var FLs=b(()=>{NLs={step:"initialize",name:"injectSessionIdMiddleware",tags:["WEBSOCKET","EVENT_STREAM"],override:!0}});
export {LLs,MLs,NLs,FLs};

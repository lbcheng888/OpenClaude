// @ts-nocheck
import {b} from "../runtime.ts";
var $Hs=()=>{};
var qHs=()=>(e)=>async(t)=>{let n={...t.input},r=await e(t),o=r.output;if(n.SessionId&&o.SessionId==null)o.SessionId=n.SessionId;return r},jHs;
var WHs=b(()=>{jHs={step:"initialize",name:"injectSessionIdMiddleware",tags:["WEBSOCKET","EVENT_STREAM"],override:!0}});
export {$Hs,qHs,jHs,WHs};

// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
var f_t={};
isFullscreenWithTTY(f_t,{stripProtoFields:()=>stripProtoFields,logEventAsync:()=>logEventAsync,logEvent:()=>logEvent,createAnalyticsState:()=>createAnalyticsState,attachAnalyticsSink:()=>attachAnalyticsSink,_setGlobalAnalyticsStateForTesting:()=>_setGlobalAnalyticsStateForTesting});
function stripProtoFields(e){let t;for(let n in e)if(n.startsWith("_PROTO_")){if(t===void 0)t={...e};delete t[n]}return t??e}
function createAnalyticsState(){return{eventQueue:[],sink:null}}
function _setGlobalAnalyticsStateForTesting(e){lzt=e}
function attachAnalyticsSink(e){let t=lzt;if(t.sink!==null)return;if(t.sink=e,t.eventQueue.length>0){let n=t.eventQueue;t.eventQueue=[],queueMicrotask(()=>{for(let r of n)if(r.async)e.logEventAsync(r.eventName,r.metadata);else e.logEvent(r.eventName,r.metadata)})}}
function logEvent(e,t){let n=lzt;if(n.sink===null){n.eventQueue.push({eventName:e,metadata:t,async:!1});return}n.sink.logEvent(e,t)}
async function logEventAsync(e,t){let n=lzt;if(n.sink===null){n.eventQueue.push({eventName:e,metadata:t,async:!0});return}await n.sink.logEventAsync(e,t)}
var lzt;
var Ct=b(()=>{lzt=createAnalyticsState()});
export {f_t,stripProtoFields,createAnalyticsState,_setGlobalAnalyticsStateForTesting,attachAnalyticsSink,logEvent,logEventAsync,lzt,Ct};

// @ts-nocheck
import {NXs,IQ} from "./m1748.ts";
import {b} from "../runtime.ts";
class eLr{startMeasurement(){return}endMeasurement(){return}flushMeasurement(){return null}}
class yQe{generateId(){return"callback-id"}startMeasurement(e,t){return{end:()=>null,discard:()=>{},add:()=>{},increment:()=>{},event:{eventId:this.generateId(),status:NXs.InProgress,authority:"",libraryName:"",libraryVersion:"",clientId:"",name:e,startTimeMs:Date.now(),correlationId:t||""},measurement:new eLr}}startPerformanceMeasurement(){return new eLr}calculateQueuedTime(){return 0}addQueueMeasurement(){return}setPreQueueTime(){return}endMeasurement(){return null}discardMeasurements(){return}removePerformanceCallback(){return!0}addPerformanceCallback(){return""}emitEvents(){return}addFields(){return}incrementFields(){return}cacheEventByCorrelationId(){return}}
var tLr=b(()=>{IQ();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {eLr,yQe,tLr};

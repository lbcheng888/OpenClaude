// @ts-nocheck
import {qVs,OQ} from "./m1743.ts";
import {b} from "../runtime.ts";
class CIr{startMeasurement(){return}endMeasurement(){return}flushMeasurement(){return null}}
class TJe{generateId(){return"callback-id"}startMeasurement(e,t){return{end:()=>null,discard:()=>{},add:()=>{},increment:()=>{},event:{eventId:this.generateId(),status:qVs.InProgress,authority:"",libraryName:"",libraryVersion:"",clientId:"",name:e,startTimeMs:Date.now(),correlationId:t||""},measurement:new CIr}}startPerformanceMeasurement(){return new CIr}calculateQueuedTime(){return 0}addQueueMeasurement(){return}setPreQueueTime(){return}endMeasurement(){return null}discardMeasurements(){return}removePerformanceCallback(){return!0}addPerformanceCallback(){return""}emitEvents(){return}addFields(){return}incrementFields(){return}cacheEventByCorrelationId(){return}}
var vIr=b(()=>{OQ();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {CIr,TJe,vIr};

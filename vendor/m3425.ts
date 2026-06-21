// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ag} from "./m2133.ts";
class EPn{export(e,t){return this._sendSpans(e,t)}shutdown(){return this._sendSpans([]),this.forceFlush()}forceFlush(){return Promise.resolve()}_exportInfo(e){return{resource:{attributes:e.resource.attributes},instrumentationScope:e.instrumentationScope,traceId:e.spanContext().traceId,parentSpanContext:e.parentSpanContext,traceState:e.spanContext().traceState?.serialize(),name:e.name,id:e.spanContext().spanId,kind:e.kind,timestamp:VNt.hrTimeToMicroseconds(e.startTime),duration:VNt.hrTimeToMicroseconds(e.duration),attributes:e.attributes,status:e.status,events:e.events,links:e.links}}_sendSpans(e,t){for(let n of e)console.dir(this._exportInfo(n),{depth:3});if(t)return t({code:VNt.ExportResultCode.SUCCESS})}}
var VNt;
var Jpa=b(()=>{VNt=M(ag(),1)});
export {EPn,VNt,Jpa};

// @ts-nocheck
import {b,x} from "../runtime.ts";
import {pg} from "./m2138.ts";
class gMn{export(e,t){return this._sendSpans(e,t)}shutdown(){return this._sendSpans([]),this.forceFlush()}forceFlush(){return Promise.resolve()}_exportInfo(e){return{resource:{attributes:e.resource.attributes},instrumentationScope:e.instrumentationScope,traceId:e.spanContext().traceId,parentSpanContext:e.parentSpanContext,traceState:e.spanContext().traceState?.serialize(),name:e.name,id:e.spanContext().spanId,kind:e.kind,timestamp:EUt.hrTimeToMicroseconds(e.startTime),duration:EUt.hrTimeToMicroseconds(e.duration),attributes:e.attributes,status:e.status,events:e.events,links:e.links}}_sendSpans(e,t){for(let n of e)console.dir(this._exportInfo(n),{depth:3});if(t)return t({code:EUt.ExportResultCode.SUCCESS})}}
var EUt;
var dSa=b(()=>{EUt=x(pg(),1)});
export {gMn,EUt,dSa};

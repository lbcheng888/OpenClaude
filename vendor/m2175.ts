// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ag} from "./m2133.ts";
class g_n{export(e,t){this._sendLogRecords(e,t)}shutdown(){return Promise.resolve()}_exportInfo(e){return{resource:{attributes:e.resource.attributes},instrumentationScope:e.instrumentationScope,timestamp:h_n.hrTimeToMicroseconds(e.hrTime),traceId:e.spanContext?.traceId,spanId:e.spanContext?.spanId,traceFlags:e.spanContext?.traceFlags,severityText:e.severityText,severityNumber:e.severityNumber,body:e.body,attributes:e.attributes}}_sendLogRecords(e,t){for(let n of e)console.dir(this._exportInfo(n),{depth:3});t?.({code:h_n.ExportResultCode.SUCCESS})}}
var h_n;
var Imi=b(()=>{h_n=M(ag(),1)});
export {g_n,h_n,Imi};

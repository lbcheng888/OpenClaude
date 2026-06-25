// @ts-nocheck
import {b,x} from "../runtime.ts";
import {pg} from "./m2138.ts";
class JSn{export(e,t){this._sendLogRecords(e,t)}shutdown(){return Promise.resolve()}_exportInfo(e){return{resource:{attributes:e.resource.attributes},instrumentationScope:e.instrumentationScope,timestamp:YSn.hrTimeToMicroseconds(e.hrTime),traceId:e.spanContext?.traceId,spanId:e.spanContext?.spanId,traceFlags:e.spanContext?.traceFlags,severityText:e.severityText,severityNumber:e.severityNumber,body:e.body,attributes:e.attributes}}_sendLogRecords(e,t){for(let n of e)console.dir(this._exportInfo(n),{depth:3});t?.({code:YSn.ExportResultCode.SUCCESS})}}
var YSn;
var vTi=b(()=>{YSn=x(pg(),1)});
export {JSn,YSn,vTi};

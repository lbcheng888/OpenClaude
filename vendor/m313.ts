// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {_isoDateTime,_isoDate,_isoTime,_isoDuration} from "./m302.ts";
import {isLocalAgentTask} from "./m305.ts";
import {OXt,ZodStringFormat} from "./m316.ts";
import {$constructor} from "./m253.ts";
import {$ZodISODateTime,$ZodISODate,$ZodISOTime,$ZodISODuration} from "./m260.ts";
var lVe={};
isFullscreenWithTTY(lVe,{time:()=>Qar,duration:()=>Zar,datetime:()=>Jar,date:()=>Xar,ZodISOTime:()=>ZodISOTime,ZodISODuration:()=>ZodISODuration,ZodISODateTime:()=>ZodISODateTime,ZodISODate:()=>ZodISODate});
function Jar(e){return _isoDateTime(ZodISODateTime,e)}
function Xar(e){return _isoDate(ZodISODate,e)}
function Qar(e){return _isoTime(ZodISOTime,e)}
function Zar(e){return _isoDuration(ZodISODuration,e)}
var ZodISODateTime,ZodISODate,ZodISOTime,ZodISODuration;
var PXt=b(()=>{isLocalAgentTask();OXt();ZodISODateTime=$constructor("ZodISODateTime",(e,t)=>{$ZodISODateTime.init(e,t),ZodStringFormat.init(e,t)});ZodISODate=$constructor("ZodISODate",(e,t)=>{$ZodISODate.init(e,t),ZodStringFormat.init(e,t)});ZodISOTime=$constructor("ZodISOTime",(e,t)=>{$ZodISOTime.init(e,t),ZodStringFormat.init(e,t)});ZodISODuration=$constructor("ZodISODuration",(e,t)=>{$ZodISODuration.init(e,t),ZodStringFormat.init(e,t)})});
export {lVe,Jar,Xar,Qar,Zar,ZodISODateTime,ZodISODate,ZodISOTime,ZodISODuration,PXt};

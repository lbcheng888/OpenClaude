// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {_isoDateTime,_isoDate,_isoTime,_isoDuration} from "./m304.ts";
import {NP} from "./m307.ts";
import {men,ZodStringFormat} from "./m318.ts";
import {$constructor} from "./m255.ts";
import {$ZodISODateTime,$ZodISODate,$ZodISOTime,$ZodISODuration} from "./m262.ts";
var sze={};
ft(sze,{time:()=>Rpr,duration:()=>vpr,datetime:()=>Cpr,date:()=>Apr,ZodISOTime:()=>ZodISOTime,ZodISODuration:()=>ZodISODuration,ZodISODateTime:()=>ZodISODateTime,ZodISODate:()=>ZodISODate});
function Cpr(e){return _isoDateTime(ZodISODateTime,e)}
function Apr(e){return _isoDate(ZodISODate,e)}
function Rpr(e){return _isoTime(ZodISOTime,e)}
function vpr(e){return _isoDuration(ZodISODuration,e)}
var ZodISODateTime,ZodISODate,ZodISOTime,ZodISODuration;
var pen=b(()=>{NP();men();ZodISODateTime=$constructor("ZodISODateTime",(e,t)=>{$ZodISODateTime.init(e,t),ZodStringFormat.init(e,t)});ZodISODate=$constructor("ZodISODate",(e,t)=>{$ZodISODate.init(e,t),ZodStringFormat.init(e,t)});ZodISOTime=$constructor("ZodISOTime",(e,t)=>{$ZodISOTime.init(e,t),ZodStringFormat.init(e,t)});ZodISODuration=$constructor("ZodISODuration",(e,t)=>{$ZodISODuration.init(e,t),ZodStringFormat.init(e,t)})});
export {sze,Cpr,Apr,Rpr,vpr,ZodISODateTime,ZodISODate,ZodISOTime,ZodISODuration,pen};

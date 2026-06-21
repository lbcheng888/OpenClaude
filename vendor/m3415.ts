// @ts-nocheck
import {sge,fQr} from "./m3412.ts";
import {K9e,mQr} from "./m3411.ts";
import {Kst,Ppa} from "./m3413.ts";
import {_Pn,Lpa} from "./m3414.ts";
import {b,M} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {ag} from "./m2133.ts";
function SPn(){return{sampler:AQr(),forceFlushTimeoutMillis:30000,generalLimits:{attributeValueLengthLimit:pY.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT")??1/0,attributeCountLimit:pY.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT")??128},spanLimits:{attributeValueLengthLimit:pY.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT")??1/0,attributeCountLimit:pY.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT")??128,linkCountLimit:pY.getNumberFromEnv("OTEL_SPAN_LINK_COUNT_LIMIT")??128,eventCountLimit:pY.getNumberFromEnv("OTEL_SPAN_EVENT_COUNT_LIMIT")??128,attributePerEventCountLimit:pY.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT")??128,attributePerLinkCountLimit:pY.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT")??128}}}
function AQr(){let e=pY.getStringFromEnv("OTEL_TRACES_SAMPLER")??ule.ParentBasedAlwaysOn;switch(e){case ule.AlwaysOn:return new sge;case ule.AlwaysOff:return new K9e;case ule.ParentBasedAlwaysOn:return new Kst({root:new sge});case ule.ParentBasedAlwaysOff:return new Kst({root:new K9e});case ule.TraceIdRatio:return new _Pn(Mpa());case ule.ParentBasedTraceIdRatio:return new Kst({root:new _Pn(Mpa())});default:return TPn.diag.error(`OTEL_TRACES_SAMPLER value "${e}" invalid, defaulting to "${ule.ParentBasedAlwaysOn}".`),new Kst({root:new sge})}}
function Mpa(){let e=pY.getNumberFromEnv("OTEL_TRACES_SAMPLER_ARG");if(e==null)return TPn.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${yPn}.`),yPn;if(e<0||e>1)return TPn.diag.error(`OTEL_TRACES_SAMPLER_ARG=${e} was given, but it is out of range ([0..1]), defaulting to ${yPn}.`),yPn;return e}
var TPn,pY,ule,yPn=1;
var hQr=b(()=>{mQr();fQr();Ppa();Lpa();TPn=M(Xi(),1),pY=M(ag(),1);(function(e){e.AlwaysOff="always_off",e.AlwaysOn="always_on",e.ParentBasedAlwaysOff="parentbased_always_off",e.ParentBasedAlwaysOn="parentbased_always_on",e.ParentBasedTraceIdRatio="parentbased_traceidratio",e.TraceIdRatio="traceidratio"})(ule||(ule={}))});
export {SPn,AQr,Mpa,TPn,pY,ule,yPn,hQr};

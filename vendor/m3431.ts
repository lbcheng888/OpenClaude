// @ts-nocheck
import {T_e,Jno} from "./m3428.ts";
import {a4e,Yno} from "./m3427.ts";
import {Gat,jTa} from "./m3429.ts";
import {dMn,JTa} from "./m3430.ts";
import {b,x} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {pg} from "./m2138.ts";
function fMn(){return{sampler:Xno(),forceFlushTimeoutMillis:30000,generalLimits:{attributeValueLengthLimit:Wj.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT")??1/0,attributeCountLimit:Wj.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT")??128},spanLimits:{attributeValueLengthLimit:Wj.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT")??1/0,attributeCountLimit:Wj.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT")??128,linkCountLimit:Wj.getNumberFromEnv("OTEL_SPAN_LINK_COUNT_LIMIT")??128,eventCountLimit:Wj.getNumberFromEnv("OTEL_SPAN_EVENT_COUNT_LIMIT")??128,attributePerEventCountLimit:Wj.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT")??128,attributePerLinkCountLimit:Wj.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT")??128}}}
function Xno(){let e=Wj.getStringFromEnv("OTEL_TRACES_SAMPLER")??cle.ParentBasedAlwaysOn;switch(e){case cle.AlwaysOn:return new T_e;case cle.AlwaysOff:return new a4e;case cle.ParentBasedAlwaysOn:return new Gat({root:new T_e});case cle.ParentBasedAlwaysOff:return new Gat({root:new a4e});case cle.TraceIdRatio:return new dMn(XTa());case cle.ParentBasedTraceIdRatio:return new Gat({root:new dMn(XTa())});default:return mMn.diag.error(`OTEL_TRACES_SAMPLER value "${e}" invalid, defaulting to "${cle.ParentBasedAlwaysOn}".`),new Gat({root:new T_e})}}
function XTa(){let e=Wj.getNumberFromEnv("OTEL_TRACES_SAMPLER_ARG");if(e==null)return mMn.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${pMn}.`),pMn;if(e<0||e>1)return mMn.diag.error(`OTEL_TRACES_SAMPLER_ARG=${e} was given, but it is out of range ([0..1]), defaulting to ${pMn}.`),pMn;return e}
var mMn,Wj,cle,pMn=1;
var Qno=b(()=>{Yno();Jno();jTa();JTa();mMn=x(xi(),1),Wj=x(pg(),1);(function(e){e.AlwaysOff="always_off",e.AlwaysOn="always_on",e.ParentBasedAlwaysOff="parentbased_always_off",e.ParentBasedAlwaysOn="parentbased_always_on",e.ParentBasedTraceIdRatio="parentbased_traceidratio",e.TraceIdRatio="traceidratio"})(cle||(cle={}))});
export {fMn,Xno,XTa,mMn,Wj,cle,pMn,Qno};

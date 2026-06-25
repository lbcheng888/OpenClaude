// @ts-nocheck
import {Xno,fMn,Qno} from "./m3431.ts";
import {b,x} from "../runtime.ts";
import {pg} from "./m2138.ts";
function QTa(e){let t={sampler:Xno()},n=fMn(),r=Object.assign({},n,t,e);return r.generalLimits=Object.assign({},n.generalLimits,e.generalLimits||{}),r.spanLimits=Object.assign({},n.spanLimits,e.spanLimits||{}),r}
function ZTa(e){let t=Object.assign({},e.spanLimits);return t.attributeCountLimit=e.spanLimits?.attributeCountLimit??e.generalLimits?.attributeCountLimit??SUt.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT")??SUt.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT")??Rrp,t.attributeValueLengthLimit=e.spanLimits?.attributeValueLengthLimit??e.generalLimits?.attributeValueLengthLimit??SUt.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT")??SUt.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT")??vrp,Object.assign({},e,{spanLimits:t})}
var SUt,Rrp=128,vrp=1/0;
var Zno=b(()=>{Qno();SUt=x(pg(),1)});
export {QTa,ZTa,SUt,Rrp,vrp,Zno};

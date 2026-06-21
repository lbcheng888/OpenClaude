// @ts-nocheck
import {AQr,SPn,hQr} from "./m3415.ts";
import {b,M} from "../runtime.ts";
import {ag} from "./m2133.ts";
function Npa(e){let t={sampler:AQr()},n=SPn(),r=Object.assign({},n,t,e);return r.generalLimits=Object.assign({},n.generalLimits,e.generalLimits||{}),r.spanLimits=Object.assign({},n.spanLimits,e.spanLimits||{}),r}
function Bpa(e){let t=Object.assign({},e.spanLimits);return t.attributeCountLimit=e.spanLimits?.attributeCountLimit??e.generalLimits?.attributeCountLimit??WNt.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT")??WNt.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT")??B7d,t.attributeValueLengthLimit=e.spanLimits?.attributeValueLengthLimit??e.generalLimits?.attributeValueLengthLimit??WNt.getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT")??WNt.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT")??F7d,Object.assign({},e,{spanLimits:t})}
var WNt,B7d=128,F7d=1/0;
var gQr=b(()=>{hQr();WNt=M(ag(),1)});
export {Npa,Bpa,WNt,B7d,F7d,gQr};

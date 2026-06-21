// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ag} from "./m2133.ts";
function Emi(){return{forceFlushTimeoutMillis:30000,logRecordLimits:{attributeValueLengthLimit:dFe.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT")??1/0,attributeCountLimit:dFe.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT")??128},includeTraceContext:!0}}
function Cmi(e){return{attributeCountLimit:e.attributeCountLimit??dFe.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT")??dFe.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT")??128,attributeValueLengthLimit:e.attributeValueLengthLimit??dFe.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT")??dFe.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT")??1/0}}
var dFe;
var vmi=b(()=>{dFe=M(ag(),1)});
export {Emi,Cmi,dFe,vmi};

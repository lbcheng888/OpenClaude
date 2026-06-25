// @ts-nocheck
import {b,x} from "../runtime.ts";
import {pg} from "./m2138.ts";
function yTi(){return{forceFlushTimeoutMillis:30000,logRecordLimits:{attributeValueLengthLimit:lUe.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT")??1/0,attributeCountLimit:lUe.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT")??128},includeTraceContext:!0}}
function TTi(e){return{attributeCountLimit:e.attributeCountLimit??lUe.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT")??lUe.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT")??128,attributeValueLengthLimit:e.attributeValueLengthLimit??lUe.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT")??lUe.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT")??1/0}}
var lUe;
var STi=b(()=>{lUe=x(pg(),1)});
export {yTi,TTi,lUe,STi};

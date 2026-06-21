// @ts-nocheck
import {X} from "../runtime.ts";
import {ag} from "./m2133.ts";
import {Xi} from "./m2091.ts";
var nZr=X((iOn)=>{Object.defineProperty(iOn,"__esModule",{value:!0});iOn.getSharedConfigurationFromEnvironment=void 0;var hAa=ag(),gAa=Xi();function fAa(e){let t=(0,hAa.getNumberFromEnv)(e);if(t!=null){if(Number.isFinite(t)&&t>0)return t;gAa.diag.warn(`Configuration: ${e} is invalid, expected number greater than 0 (actual: ${t})`)}return}function Zzd(e){let t=fAa(`OTEL_EXPORTER_OTLP_${e}_TIMEOUT`),n=fAa("OTEL_EXPORTER_OTLP_TIMEOUT");return t??n}function AAa(e){let t=(0,hAa.getStringFromEnv)(e)?.trim();if(t==null||t==="none"||t==="gzip")return t;gAa.diag.warn(`Configuration: ${e} is invalid, expected 'none' or 'gzip' (actual: '${t}')`);return}function eYd(e){let t=AAa(`OTEL_EXPORTER_OTLP_${e}_COMPRESSION`),n=AAa("OTEL_EXPORTER_OTLP_COMPRESSION");return t??n}function tYd(e){return{timeoutMillis:Zzd(e),compression:eYd(e)}}iOn.getSharedConfigurationFromEnvironment=tYd});
export {nZr};

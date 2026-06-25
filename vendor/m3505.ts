// @ts-nocheck
import {Q} from "../runtime.ts";
import {pg} from "./m2138.ts";
import {xi} from "./m2096.ts";
var Fro=Q((ZMn)=>{Object.defineProperty(ZMn,"__esModule",{value:!0});ZMn.getSharedConfigurationFromEnvironment=void 0;var xEa=pg(),DEa=xi();function HEa(e){let t=(0,xEa.getNumberFromEnv)(e);if(t!=null){if(Number.isFinite(t)&&t>0)return t;DEa.diag.warn(`Configuration: ${e} is invalid, expected number greater than 0 (actual: ${t})`)}return}function Usp(e){let t=HEa(`OTEL_EXPORTER_OTLP_${e}_TIMEOUT`),n=HEa("OTEL_EXPORTER_OTLP_TIMEOUT");return t??n}function IEa(e){let t=(0,xEa.getStringFromEnv)(e)?.trim();if(t==null||t==="none"||t==="gzip")return t;DEa.diag.warn(`Configuration: ${e} is invalid, expected 'none' or 'gzip' (actual: '${t}')`);return}function $sp(e){let t=IEa(`OTEL_EXPORTER_OTLP_${e}_COMPRESSION`),n=IEa("OTEL_EXPORTER_OTLP_COMPRESSION");return t??n}function qsp(e){return{timeoutMillis:Usp(e),compression:$sp(e)}}ZMn.getSharedConfigurationFromEnvironment=qsp});
export {Fro};

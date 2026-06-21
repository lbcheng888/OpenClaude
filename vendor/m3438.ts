// @ts-nocheck
import {X} from "../runtime.ts";
import {xQr} from "./m3435.ts";
import {kQr} from "./m3437.ts";
var yma=X((HPn)=>{Object.defineProperty(HPn,"__esModule",{value:!0});HPn.createOtlpNetworkExportDelegate=void 0;var cKd=xQr(),uKd=kQr();function dKd(e,t,n){return(0,uKd.createOtlpExportDelegate)({transport:n,serializer:t,promiseHandler:(0,cKd.createBoundedQueueExportPromiseHandler)(e)},{timeout:e.timeoutMillis})}HPn.createOtlpNetworkExportDelegate=dKd});
export {yma};

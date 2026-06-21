// @ts-nocheck
import {X} from "../runtime.ts";
import {ple} from "./m3439.ts";
import {rFt} from "./m3614.ts";
var DSa=X((gMn)=>{Object.defineProperty(gMn,"__esModule",{value:!0});gMn.createOtlpGrpcExportDelegate=void 0;var Nsp=ple(),Bsp=rFt();function Fsp(e,t,n,r){return(0,Nsp.createOtlpNetworkExportDelegate)(e,t,(0,Bsp.createOtlpGrpcExporterTransport)({address:e.url,compression:e.compression,credentials:e.credentials,metadata:e.metadata,userAgent:e.userAgent,grpcName:n,grpcPath:r}))}gMn.createOtlpGrpcExportDelegate=Fsp});
export {DSa};

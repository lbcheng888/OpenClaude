// @ts-nocheck
import {Q} from "../runtime.ts";
import {dle} from "./m3455.ts";
import {P2t} from "./m3630.ts";
var zka=Q((uFn)=>{Object.defineProperty(uFn,"__esModule",{value:!0});uFn.createOtlpGrpcExportDelegate=void 0;var Rgp=dle(),vgp=P2t();function wgp(e,t,n,r){return(0,Rgp.createOtlpNetworkExportDelegate)(e,t,(0,vgp.createOtlpGrpcExporterTransport)({address:e.url,compression:e.compression,credentials:e.credentials,metadata:e.metadata,userAgent:e.userAgent,grpcName:n,grpcPath:r}))}uFn.createOtlpGrpcExportDelegate=wgp});
export {zka};

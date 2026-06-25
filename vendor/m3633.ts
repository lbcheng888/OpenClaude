// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {Bka} from "./m3631.ts";
import {P2t} from "./m3630.ts";
import {Gka} from "./m3632.ts";
var Kka=Q((cFn)=>{Object.defineProperty(cFn,"__esModule",{value:!0});cFn.convertLegacyOtlpGrpcOptions=void 0;var bgp=xi(),Vka=Bka(),Egp=P2t(),Cgp=Gka();function Agp(e,t){if(e.headers)bgp.diag.warn("Headers cannot be set when using grpc");let n=e.credentials;return(0,Vka.mergeOtlpGrpcConfigurationWithDefaults)({url:e.url,metadata:()=>e.metadata??(0,Egp.createEmptyMetadata)(),compression:e.compression,timeoutMillis:e.timeoutMillis,concurrencyLimit:e.concurrencyLimit,credentials:n!=null?()=>n:void 0,userAgent:e.userAgent},(0,Cgp.getOtlpGrpcConfigurationFromEnv)(t),(0,Vka.getOtlpGrpcDefaultConfiguration)())}cFn.convertLegacyOtlpGrpcOptions=Agp});
export {Kka};

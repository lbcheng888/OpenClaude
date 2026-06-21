// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {CSa} from "./m3615.ts";
import {rFt} from "./m3614.ts";
import {kSa} from "./m3616.ts";
var ISa=X((hMn)=>{Object.defineProperty(hMn,"__esModule",{value:!0});hMn.convertLegacyOtlpGrpcOptions=void 0;var Psp=Xi(),HSa=CSa(),Osp=rFt(),Lsp=kSa();function Msp(e,t){if(e.headers)Psp.diag.warn("Headers cannot be set when using grpc");let n=e.credentials;return(0,HSa.mergeOtlpGrpcConfigurationWithDefaults)({url:e.url,metadata:()=>e.metadata??(0,Osp.createEmptyMetadata)(),compression:e.compression,timeoutMillis:e.timeoutMillis,concurrencyLimit:e.concurrencyLimit,credentials:n!=null?()=>n:void 0,userAgent:e.userAgent},(0,Lsp.getOtlpGrpcConfigurationFromEnv)(t),(0,HSa.getOtlpGrpcDefaultConfiguration)())}hMn.convertLegacyOtlpGrpcOptions=Msp});
export {ISa};

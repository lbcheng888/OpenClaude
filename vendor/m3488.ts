// @ts-nocheck
import {X} from "../runtime.ts";
import {kQr} from "./m3437.ts";
import {cAa} from "./m3486.ts";
import {xQr} from "./m3435.ts";
import {pAa} from "./m3487.ts";
var mAa=X((sOn)=>{Object.defineProperty(sOn,"__esModule",{value:!0});sOn.createOtlpHttpExportDelegate=void 0;var zzd=kQr(),Yzd=cAa(),Jzd=xQr(),Xzd=pAa();function Qzd(e,t){return(0,zzd.createOtlpExportDelegate)({transport:(0,Xzd.createRetryingTransport)({transport:(0,Yzd.createHttpExporterTransport)(e)}),serializer:t,promiseHandler:(0,Jzd.createBoundedQueueExportPromiseHandler)(e)},{timeout:e.timeoutMillis})}sOn.createOtlpHttpExportDelegate=Qzd});
export {mAa};

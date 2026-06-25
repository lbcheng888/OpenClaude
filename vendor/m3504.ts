// @ts-nocheck
import {Q} from "../runtime.ts";
import {dro} from "./m3453.ts";
import {AEa} from "./m3502.ts";
import {uro} from "./m3451.ts";
import {wEa} from "./m3503.ts";
var kEa=Q((QMn)=>{Object.defineProperty(QMn,"__esModule",{value:!0});QMn.createOtlpHttpExportDelegate=void 0;var Lsp=dro(),Msp=AEa(),Nsp=uro(),Fsp=wEa();function Bsp(e,t){return(0,Lsp.createOtlpExportDelegate)({transport:(0,Fsp.createRetryingTransport)({transport:(0,Msp.createHttpExporterTransport)(e)}),serializer:t,promiseHandler:(0,Nsp.createBoundedQueueExportPromiseHandler)(e)},{timeout:e.timeoutMillis})}QMn.createOtlpHttpExportDelegate=Bsp});
export {kEa};

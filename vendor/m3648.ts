// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
var Rba=X((cte)=>{Object.defineProperty(cte,"__esModule",{value:!0});cte.getRPCMetadata=cte.deleteRPCMetadata=cte.setRPCMetadata=cte.RPCType=void 0;var Wip=Xi(),sno=(0,Wip.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA"),Gip;(function(e){e.HTTP="http"})(Gip=cte.RPCType||(cte.RPCType={}));function Vip(e,t){return e.setValue(sno,t)}cte.setRPCMetadata=Vip;function Kip(e){return e.deleteValue(sno)}cte.deleteRPCMetadata=Kip;function zip(e){return e.getValue(sno)}cte.getRPCMetadata=zip});
export {Rba};

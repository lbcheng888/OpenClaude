// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
var api=X((ZQ)=>{Object.defineProperty(ZQ,"__esModule",{value:!0});ZQ.getRPCMetadata=ZQ.deleteRPCMetadata=ZQ.setRPCMetadata=ZQ.RPCType=void 0;var Azu=Xi(),H1r=(0,Azu.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA"),hzu;(function(e){e.HTTP="http"})(hzu=ZQ.RPCType||(ZQ.RPCType={}));function gzu(e,t){return e.setValue(H1r,t)}ZQ.setRPCMetadata=gzu;function _zu(e){return e.deleteValue(H1r)}ZQ.deleteRPCMetadata=_zu;function yzu(e){return e.getValue(H1r)}ZQ.getRPCMetadata=yzu});
export {api};

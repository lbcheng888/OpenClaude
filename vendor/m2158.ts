// @ts-nocheck
import {Q} from "../runtime.ts";
import {Nxt} from "./m2146.ts";
var tTi=Q((USn)=>{Object.defineProperty(USn,"__esModule",{value:!0});USn.serviceInstanceIdDetector=void 0;var rid=Nxt(),oid=require("crypto");class eTi{detect(e){return{attributes:{[rid.ATTR_SERVICE_INSTANCE_ID]:(0,oid.randomUUID)()}}}}USn.serviceInstanceIdDetector=new eTi});
export {tTi};

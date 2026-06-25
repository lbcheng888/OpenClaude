// @ts-nocheck
import {Q} from "../runtime.ts";
import {sNn} from "./m3580.ts";
import {URa} from "./m3583.ts";
import {nso} from "./m3581.ts";
import {$Ra} from "./m3584.ts";
import {qRa} from "./m3585.ts";
var KRa=Q((VIe)=>{Object.defineProperty(VIe,"__esModule",{value:!0});VIe.addCommonProtos=VIe.loadProtosWithOptionsSync=VIe.loadProtosWithOptions=void 0;var WRa=require("fs"),GRa=require("path"),ylt=sNn();function VRa(e,t){let n=e.resolvePath;e.resolvePath=(r,o)=>{if(GRa.isAbsolute(o))return o;for(let s of t){let i=GRa.join(s,o);try{return WRa.accessSync(i,WRa.constants.R_OK),i}catch(a){continue}}return process.emitWarning(`${o} not found in any of the include paths ${t}`),n(r,o)}}async function Zup(e,t){let n=new ylt.Root;if(t=t||{},t.includeDirs){if(!Array.isArray(t.includeDirs))return Promise.reject(Error("The includeDirs option must be an array"));VRa(n,t.includeDirs)}let r=await n.load(e,t);return r.resolveAll(),r}VIe.loadProtosWithOptions=Zup;function edp(e,t){let n=new ylt.Root;if(t=t||{},t.includeDirs){if(!Array.isArray(t.includeDirs))throw Error("The includeDirs option must be an array");VRa(n,t.includeDirs)}let r=n.loadSync(e,t);return r.resolveAll(),r}VIe.loadProtosWithOptionsSync=edp;function tdp(){let e=URa(),t=nso(),n=$Ra(),r=qRa();ylt.common("api",e.nested.google.nested.protobuf.nested),ylt.common("descriptor",t.nested.google.nested.protobuf.nested),ylt.common("source_context",n.nested.google.nested.protobuf.nested),ylt.common("type",r.nested.google.nested.protobuf.nested)}VIe.addCommonProtos=tdp});
export {KRa};

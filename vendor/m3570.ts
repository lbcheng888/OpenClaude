// @ts-nocheck
import {X} from "../runtime.ts";
import {pLn} from "./m3564.ts";
import {v_a} from "./m3567.ts";
import {Teo} from "./m3565.ts";
import {w_a} from "./m3568.ts";
import {R_a} from "./m3569.ts";
var I_a=X((oHe)=>{Object.defineProperty(oHe,"__esModule",{value:!0});oHe.addCommonProtos=oHe.loadProtosWithOptionsSync=oHe.loadProtosWithOptions=void 0;var x_a=require("fs"),k_a=require("path"),Sit=pLn();function H_a(e,t){let n=e.resolvePath;e.resolvePath=(r,o)=>{if(k_a.isAbsolute(o))return o;for(let s of t){let i=k_a.join(s,o);try{return x_a.accessSync(i,x_a.constants.R_OK),i}catch(a){continue}}return process.emitWarning(`${o} not found in any of the include paths ${t}`),n(r,o)}}async function dep(e,t){let n=new Sit.Root;if(t=t||{},t.includeDirs){if(!Array.isArray(t.includeDirs))return Promise.reject(Error("The includeDirs option must be an array"));H_a(n,t.includeDirs)}let r=await n.load(e,t);return r.resolveAll(),r}oHe.loadProtosWithOptions=dep;function pep(e,t){let n=new Sit.Root;if(t=t||{},t.includeDirs){if(!Array.isArray(t.includeDirs))throw Error("The includeDirs option must be an array");H_a(n,t.includeDirs)}let r=n.loadSync(e,t);return r.resolveAll(),r}oHe.loadProtosWithOptionsSync=pep;function mep(){let e=v_a(),t=Teo(),n=w_a(),r=R_a();Sit.common("api",e.nested.google.nested.protobuf.nested),Sit.common("descriptor",t.nested.google.nested.protobuf.nested),Sit.common("source_context",n.nested.google.nested.protobuf.nested),Sit.common("type",r.nested.google.nested.protobuf.nested)}oHe.addCommonProtos=mep});
export {I_a};

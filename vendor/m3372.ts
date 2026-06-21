// @ts-nocheck
import {X} from "../runtime.ts";
import {Wua} from "./m3370.ts";
import {zua} from "./m3371.ts";
import {LDn} from "./m3369.ts";
var Xua=X((BDn)=>{Object.defineProperty(BDn,"__esModule",{value:!0});BDn.getMapping=void 0;var aVd=Wua(),lVd=zua(),cVd=LDn(),Yua=-10,Jua=20,uVd=Array.from({length:31},(e,t)=>{if(t>10)return new lVd.LogarithmMapping(t-10);return new aVd.ExponentMapping(t-10)});function dVd(e){if(e>Jua||e<Yua)throw new cVd.MappingError(`expected scale >= ${Yua} && <= ${Jua}, got: ${e}`);return uVd[e+10]}BDn.getMapping=dVd});
export {Xua};

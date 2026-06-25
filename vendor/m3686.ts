// @ts-nocheck
import {Q} from "../runtime.ts";
import {EIa} from "./m3684.ts";
import {vIa} from "./m3685.ts";
import {jFn} from "./m3683.ts";
var HIa=Q((XFn)=>{Object.defineProperty(XFn,"__esModule",{value:!0});XFn.getMapping=void 0;var Myp=EIa(),Nyp=vIa(),Fyp=jFn(),wIa=-10,kIa=20,Byp=Array.from({length:31},(e,t)=>{if(t>10)return new Nyp.LogarithmMapping(t-10);return new Myp.ExponentMapping(t-10)});function Uyp(e){if(e>kIa||e<wIa)throw new Fyp.MappingError(`expected scale >= ${wIa} && <= ${kIa}, got: ${e}`);return Byp[e+10]}XFn.getMapping=Uyp});
export {HIa};

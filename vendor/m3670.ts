// @ts-nocheck
import {X} from "../runtime.ts";
import {aEa} from "./m3668.ts";
import {dEa} from "./m3669.ts";
import {t1n} from "./m3667.ts";
var fEa=X((o1n)=>{Object.defineProperty(o1n,"__esModule",{value:!0});o1n.getMapping=void 0;var Yap=aEa(),Jap=dEa(),Xap=t1n(),pEa=-10,mEa=20,Qap=Array.from({length:31},(e,t)=>{if(t>10)return new Jap.LogarithmMapping(t-10);return new Yap.ExponentMapping(t-10)});function Zap(e){if(e>mEa||e<pEa)throw new Xap.MappingError(`expected scale >= ${pEa} && <= ${mEa}, got: ${e}`);return Qap[e+10]}o1n.getMapping=Zap});
export {fEa};

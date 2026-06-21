// @ts-nocheck
import {nT,d2} from "./m64.ts";
import {YTe,Tgt} from "./m106.ts";
import {zTe,ygt} from "./m102.ts";
import {b} from "../runtime.ts";
import {NOe,dO} from "./m9.ts";
function LUo(e){if(typeof e=="string")return e;if(nT(e))return YTe(e,LUo)+"";if(zTe(e))return OUo?OUo.call(e):"";var t=e+"";return t=="0"&&1/e==-dAc?"-0":t}
var dAc=1/0,PUo,OUo,MUo;
var NUo=b(()=>{NOe();Tgt();d2();ygt();PUo=dO?dO.prototype:void 0,OUo=PUo?PUo.toString:void 0;MUo=LUo});
export {LUo,dAc,PUo,OUo,MUo,NUo};

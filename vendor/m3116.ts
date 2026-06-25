// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
import {AC} from "./m3074.ts";
import {nra} from "./m3115.ts";
var vNt=Q((wZg,ora)=>{var rxn=oT(),DWd=AC().fromCallback,rra=nra();function PWd(e,t){if(rxn.rm)return rxn.rm(e,{recursive:!0,force:!0},t);rra(e,t)}function OWd(e){if(rxn.rmSync)return rxn.rmSync(e,{recursive:!0,force:!0});rra.sync(e)}ora.exports={remove:DWd(PWd),removeSync:OWd}});
export {vNt};

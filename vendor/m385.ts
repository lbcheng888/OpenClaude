// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
var rjo=Q((Qfr)=>{Object.defineProperty(Qfr,"__esModule",{value:!0});var jCt=Km(),g1c={message:({schemaCode:e})=>jCt.str`must be multiple of ${e}`,params:({schemaCode:e})=>jCt._`{multipleOf: ${e}}`},_1c={keyword:"multipleOf",type:"number",schemaType:"number",$data:!0,error:g1c,code(e){let{gen:t,data:n,schemaCode:r,it:o}=e,s=o.opts.multipleOfPrecision,i=t.let("res"),a=s?jCt._`Math.abs(Math.round(${i}) - ${i}) > 1e-${s}`:jCt._`${i} !== parseInt(${i})`;e.fail$data(jCt._`(${r} === 0 || (${i} = ${n}/${r}, ${a}))`)}};Qfr.default=_1c});
export {rjo};

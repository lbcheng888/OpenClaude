// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
var l5o=X((vur)=>{Object.defineProperty(vur,"__esModule",{value:!0});var bSt=initLf(),pxc={message:({schemaCode:e})=>bSt.str`must be multiple of ${e}`,params:({schemaCode:e})=>bSt._`{multipleOf: ${e}}`},mxc={keyword:"multipleOf",type:"number",schemaType:"number",$data:!0,error:pxc,code(e){let{gen:t,data:n,schemaCode:r,it:o}=e,s=o.opts.multipleOfPrecision,i=t.let("res"),a=s?bSt._`Math.abs(Math.round(${i}) - ${i}) > 1e-${s}`:bSt._`${i} !== parseInt(${i})`;e.fail$data(bSt._`(${r} === 0 || (${i} = ${n}/${r}, ${a}))`)}};vur.default=mxc});
export {l5o};

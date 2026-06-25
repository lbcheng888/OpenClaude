// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
import {apiKeyHelperCache} from "./m357.ts";
import {vtn} from "./m392.ts";
var mjo=Q((chr)=>{Object.defineProperty(chr,"__esModule",{value:!0});var lhr=Km(),N1c=apiKeyHelperCache(),F1c=vtn(),B1c={message:"must be equal to constant",params:({schemaCode:e})=>lhr._`{allowedValue: ${e}}`},U1c={keyword:"const",$data:!0,error:B1c,code(e){let{gen:t,data:n,$data:r,schemaCode:o,schema:s}=e;if(r||s&&typeof s=="object")e.fail$data(lhr._`!${(0,N1c.useFunc)(t,F1c.default)}(${n}, ${o})`);else e.fail(lhr._`${s} !== ${n}`)}};chr.default=U1c});
export {mjo};

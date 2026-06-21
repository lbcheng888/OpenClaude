// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
var A5o=X((Iur)=>{Object.defineProperty(Iur,"__esModule",{value:!0});var wSt=initLf(),Rxc={message({keyword:e,schemaCode:t}){let n=e==="maxItems"?"more":"fewer";return wSt.str`must NOT have ${n} than ${t} items`},params:({schemaCode:e})=>wSt._`{limit: ${e}}`},xxc={keyword:["maxItems","minItems"],type:"array",schemaType:"number",$data:!0,error:Rxc,code(e){let{keyword:t,data:n,schemaCode:r}=e,o=t==="maxItems"?wSt.operators.GT:wSt.operators.LT;e.fail$data(wSt._`${n}.length ${o} ${r}`)}};Iur.default=xxc});
export {A5o};

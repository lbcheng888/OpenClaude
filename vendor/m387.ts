// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
var m5o=X((kur)=>{Object.defineProperty(kur,"__esModule",{value:!0});var ESt=initLf(),bxc={message({keyword:e,schemaCode:t}){let n=e==="maxProperties"?"more":"fewer";return ESt.str`must NOT have ${n} than ${t} properties`},params:({schemaCode:e})=>ESt._`{limit: ${e}}`},Exc={keyword:["maxProperties","minProperties"],type:"object",schemaType:"number",$data:!0,error:bxc,code(e){let{keyword:t,data:n,schemaCode:r}=e,o=t==="maxProperties"?ESt.operators.GT:ESt.operators.LT;e.fail$data(ESt._`Object.keys(${n}).length ${o} ${r}`)}};kur.default=Exc});
export {m5o};

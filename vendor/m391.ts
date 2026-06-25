// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
var ujo=Q((ohr)=>{Object.defineProperty(ohr,"__esModule",{value:!0});var QCt=Km(),x1c={message({keyword:e,schemaCode:t}){let n=e==="maxItems"?"more":"fewer";return QCt.str`must NOT have ${n} than ${t} items`},params:({schemaCode:e})=>QCt._`{limit: ${e}}`},D1c={keyword:["maxItems","minItems"],type:"array",schemaType:"number",$data:!0,error:x1c,code(e){let{keyword:t,data:n,schemaCode:r}=e,o=t==="maxItems"?QCt.operators.GT:QCt.operators.LT;e.fail$data(QCt._`${n}.length ${o} ${r}`)}};ohr.default=D1c});
export {ujo};

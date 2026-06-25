// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
var ljo=Q((nhr)=>{Object.defineProperty(nhr,"__esModule",{value:!0});var YCt=Km(),v1c={message({keyword:e,schemaCode:t}){let n=e==="maxProperties"?"more":"fewer";return YCt.str`must NOT have ${n} than ${t} properties`},params:({schemaCode:e})=>YCt._`{limit: ${e}}`},w1c={keyword:["maxProperties","minProperties"],type:"object",schemaType:"number",$data:!0,error:v1c,code(e){let{keyword:t,data:n,schemaCode:r}=e,o=t==="maxProperties"?YCt.operators.GT:YCt.operators.LT;e.fail$data(YCt._`Object.keys(${n}).length ${o} ${r}`)}};nhr.default=w1c});
export {ljo};

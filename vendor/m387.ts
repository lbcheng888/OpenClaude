// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
import {apiKeyHelperCache} from "./m357.ts";
import {sjo} from "./m386.ts";
var ijo=Q((ehr)=>{Object.defineProperty(ehr,"__esModule",{value:!0});var ZMe=Km(),y1c=apiKeyHelperCache(),T1c=sjo(),S1c={message({keyword:e,schemaCode:t}){let n=e==="maxLength"?"more":"fewer";return ZMe.str`must NOT have ${n} than ${t} characters`},params:({schemaCode:e})=>ZMe._`{limit: ${e}}`},b1c={keyword:["maxLength","minLength"],type:"string",schemaType:"number",$data:!0,error:S1c,code(e){let{keyword:t,data:n,schemaCode:r,it:o}=e,s=t==="maxLength"?ZMe.operators.GT:ZMe.operators.LT,i=o.opts.unicode===!1?ZMe._`${n}.length`:ZMe._`${(0,y1c.useFunc)(e.gen,T1c.default)}(${n})`;e.fail$data(ZMe._`${i} ${s} ${r}`)}};ehr.default=b1c});
export {ijo};

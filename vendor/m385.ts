// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
import {Ig} from "./m355.ts";
import {u5o} from "./m384.ts";
var d5o=X((Rur)=>{Object.defineProperty(Rur,"__esModule",{value:!0});var iMe=initLf(),fxc=Ig(),Axc=u5o(),hxc={message({keyword:e,schemaCode:t}){let n=e==="maxLength"?"more":"fewer";return iMe.str`must NOT have ${n} than ${t} characters`},params:({schemaCode:e})=>iMe._`{limit: ${e}}`},gxc={keyword:["maxLength","minLength"],type:"string",schemaType:"number",$data:!0,error:hxc,code(e){let{keyword:t,data:n,schemaCode:r,it:o}=e,s=t==="maxLength"?iMe.operators.GT:iMe.operators.LT,i=o.opts.unicode===!1?iMe._`${n}.length`:iMe._`${(0,fxc.useFunc)(e.gen,Axc.default)}(${n})`;e.fail$data(iMe._`${i} ${s} ${r}`)}};Rur.default=gxc});
export {d5o};

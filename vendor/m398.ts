// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
import {Ig} from "./m355.ts";
import {initZV} from "./m363.ts";
import {Uur} from "./m395.ts";
var w5o=X((jur)=>{Object.defineProperty(jur,"__esModule",{value:!0});var v5o=initLf(),okc=Ig(),skc=initZV(),ikc=Uur(),akc={message:({params:{len:e}})=>v5o.str`must NOT have more than ${e} items`,params:({params:{len:e}})=>v5o._`{limit: ${e}}`},lkc={keyword:"items",type:"array",schemaType:["object","boolean"],before:"uniqueItems",error:akc,code(e){let{schema:t,parentSchema:n,it:r}=e,{prefixItems:o}=n;if(r.items=!0,(0,okc.alwaysValidSchema)(r,t))return;if(o)(0,ikc.validateAdditionalItems)(e,o);else e.ok((0,skc.validateArray)(e))}};jur.default=lkc});
export {w5o};

// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
import {apiKeyHelperCache} from "./m357.ts";
import {AK} from "./m365.ts";
import {mhr} from "./m397.ts";
var bjo=Q((ghr)=>{Object.defineProperty(ghr,"__esModule",{value:!0});var Sjo=Km(),lNc=apiKeyHelperCache(),cNc=AK(),uNc=mhr(),dNc={message:({params:{len:e}})=>Sjo.str`must NOT have more than ${e} items`,params:({params:{len:e}})=>Sjo._`{limit: ${e}}`},pNc={keyword:"items",type:"array",schemaType:["object","boolean"],before:"uniqueItems",error:dNc,code(e){let{schema:t,parentSchema:n,it:r}=e,{prefixItems:o}=n;if(r.items=!0,(0,lNc.alwaysValidSchema)(r,t))return;if(o)(0,uNc.validateAdditionalItems)(e,o);else e.ok((0,cNc.validateArray)(e))}};ghr.default=pNc});
export {bjo};

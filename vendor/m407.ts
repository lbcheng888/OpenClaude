// @ts-nocheck
import {Q} from "../runtime.ts";
import {apiKeyHelperCache} from "./m357.ts";
var Ljo=Q((Rhr)=>{Object.defineProperty(Rhr,"__esModule",{value:!0});var wNc=apiKeyHelperCache(),kNc={keyword:"not",schemaType:["object","boolean"],trackErrors:!0,code(e){let{gen:t,schema:n,it:r}=e;if((0,wNc.alwaysValidSchema)(r,n)){e.fail();return}let o=t.name("valid");e.subschema({keyword:"not",compositeRule:!0,createErrors:!1,allErrors:!1},o),e.failResult(o,()=>e.reset(),()=>e.error())},error:{message:"must NOT be valid"}};Rhr.default=kNc});
export {Ljo};

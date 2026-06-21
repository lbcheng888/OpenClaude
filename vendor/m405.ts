// @ts-nocheck
import {X} from "../runtime.ts";
import {Ig} from "./m355.ts";
var U5o=X((Qur)=>{Object.defineProperty(Qur,"__esModule",{value:!0});var Ekc=Ig(),Ckc={keyword:"not",schemaType:["object","boolean"],trackErrors:!0,code(e){let{gen:t,schema:n,it:r}=e;if((0,Ekc.alwaysValidSchema)(r,n)){e.fail();return}let o=t.name("valid");e.subschema({keyword:"not",compositeRule:!0,createErrors:!1,allErrors:!1},o),e.failResult(o,()=>e.reset(),()=>e.error())},error:{message:"must NOT be valid"}};Qur.default=Ckc});
export {U5o};

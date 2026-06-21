// @ts-nocheck
import {X} from "../runtime.ts";
import {Ig} from "./m355.ts";
var j5o=X((tdr)=>{Object.defineProperty(tdr,"__esModule",{value:!0});var Hkc=Ig(),Ikc={keyword:"allOf",schemaType:"array",code(e){let{gen:t,schema:n,it:r}=e;if(!Array.isArray(n))throw Error("ajv implementation error");let o=t.name("valid");n.forEach((s,i)=>{if((0,Hkc.alwaysValidSchema)(r,s))return;let a=e.subschema({keyword:"allOf",schemaProp:i},o);e.ok(o),e.mergeEvaluated(a)})}};tdr.default=Ikc});
export {j5o};

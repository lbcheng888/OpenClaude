// @ts-nocheck
import {Q} from "../runtime.ts";
import {apiKeyHelperCache} from "./m357.ts";
var Fjo=Q((khr)=>{Object.defineProperty(khr,"__esModule",{value:!0});var ONc=apiKeyHelperCache(),LNc={keyword:"allOf",schemaType:"array",code(e){let{gen:t,schema:n,it:r}=e;if(!Array.isArray(n))throw Error("ajv implementation error");let o=t.name("valid");n.forEach((s,i)=>{if((0,ONc.alwaysValidSchema)(r,s))return;let a=e.subschema({keyword:"allOf",schemaProp:i},o);e.ok(o),e.mergeEvaluated(a)})}};khr.default=LNc});
export {Fjo};

// @ts-nocheck
import {DCt,Zen} from "./m337.ts";
import {Ad,h0} from "./m349.ts";
import {b} from "../runtime.ts";
function jKo(e,t){if(["ZodString","ZodNumber","ZodBigInt","ZodBoolean","ZodNull"].includes(e.innerType._def.typeName)&&(!e.innerType._def.checks||!e.innerType._def.checks.length)){if(t.target==="openApi3")return{type:DCt[e.innerType._def.typeName],nullable:!0};return{type:[DCt[e.innerType._def.typeName],"null"]}}if(t.target==="openApi3"){let r=Ad(e.innerType._def,{...t,currentPath:[...t.currentPath]});if(r&&"$ref"in r)return{allOf:[r],nullable:!0};return r&&{...r,nullable:!0}}let n=Ad(e.innerType._def,{...t,currentPath:[...t.currentPath,"anyOf","0"]});return n&&{anyOf:[n,{type:"null"}]}}
var Gmr=b(()=>{h0();Zen()});
export {jKo,Gmr};

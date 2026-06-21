// @ts-nocheck
import {iSt,TQt} from "./m335.ts";
import {Yd,JI} from "./m347.ts";
import {b} from "../runtime.ts";
function Z6o(e,t){if(["ZodString","ZodNumber","ZodBigInt","ZodBoolean","ZodNull"].includes(e.innerType._def.typeName)&&(!e.innerType._def.checks||!e.innerType._def.checks.length)){if(t.target==="openApi3")return{type:iSt[e.innerType._def.typeName],nullable:!0};return{type:[iSt[e.innerType._def.typeName],"null"]}}if(t.target==="openApi3"){let r=Yd(e.innerType._def,{...t,currentPath:[...t.currentPath]});if(r&&"$ref"in r)return{allOf:[r],nullable:!0};return r&&{...r,nullable:!0}}let n=Yd(e.innerType._def,{...t,currentPath:[...t.currentPath,"anyOf","0"]});return n&&{anyOf:[n,{type:"null"}]}}
var gcr=b(()=>{JI();TQt()});
export {Z6o,gcr};

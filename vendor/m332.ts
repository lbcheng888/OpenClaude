// @ts-nocheck
import {ZodFirstPartyTypeKind} from "./m250.ts";
import {Yd,JI} from "./m347.ts";
import {fw,QV} from "./m325.ts";
import {hQt,gQt} from "./m331.ts";
import {fQt,AQt} from "./m326.ts";
import {b} from "../runtime.ts";
import {Uyt} from "./m252.ts";
function _Qt(e,t){if(t.target==="openAi")console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");if(t.target==="openApi3"&&e.keyType?._def.typeName===ZodFirstPartyTypeKind.ZodEnum)return{type:"object",required:e.keyType._def.values,properties:e.keyType._def.values.reduce((r,o)=>({...r,[o]:Yd(e.valueType._def,{...t,currentPath:[...t.currentPath,"properties",o]})??fw(t)}),{}),additionalProperties:t.rejectedAdditionalProperties};let n={type:"object",additionalProperties:Yd(e.valueType._def,{...t,currentPath:[...t.currentPath,"additionalProperties"]})??t.allowedAdditionalProperties};if(t.target==="openApi3")return n;if(e.keyType?._def.typeName===ZodFirstPartyTypeKind.ZodString&&e.keyType._def.checks?.length){let{type:r,...o}=hQt(e.keyType._def,t);return{...n,propertyNames:o}}else if(e.keyType?._def.typeName===ZodFirstPartyTypeKind.ZodEnum)return{...n,propertyNames:{enum:e.keyType._def.values}};else if(e.keyType?._def.typeName===ZodFirstPartyTypeKind.ZodBranded&&e.keyType._def.type._def.typeName===ZodFirstPartyTypeKind.ZodString&&e.keyType._def.type._def.checks?.length){let{type:r,...o}=fQt(e.keyType._def,t);return{...n,propertyNames:o}}return n}
var yQt=b(()=>{Uyt();JI();gQt();AQt();QV()});
export {_Qt,yQt};

// @ts-nocheck
import {ZodFirstPartyTypeKind} from "./m252.ts";
import {Ad,h0} from "./m349.ts";
import {bR,CK} from "./m327.ts";
import {Yen,Jen} from "./m333.ts";
import {zen,jen} from "./m328.ts";
import {b} from "../runtime.ts";
import {mEt} from "./m254.ts";
function Xen(e,t){if(t.target==="openAi")console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");if(t.target==="openApi3"&&e.keyType?._def.typeName===ZodFirstPartyTypeKind.ZodEnum)return{type:"object",required:e.keyType._def.values,properties:e.keyType._def.values.reduce((r,o)=>({...r,[o]:Ad(e.valueType._def,{...t,currentPath:[...t.currentPath,"properties",o]})??bR(t)}),{}),additionalProperties:t.rejectedAdditionalProperties};let n={type:"object",additionalProperties:Ad(e.valueType._def,{...t,currentPath:[...t.currentPath,"additionalProperties"]})??t.allowedAdditionalProperties};if(t.target==="openApi3")return n;if(e.keyType?._def.typeName===ZodFirstPartyTypeKind.ZodString&&e.keyType._def.checks?.length){let{type:r,...o}=Yen(e.keyType._def,t);return{...n,propertyNames:o}}else if(e.keyType?._def.typeName===ZodFirstPartyTypeKind.ZodEnum)return{...n,propertyNames:{enum:e.keyType._def.values}};else if(e.keyType?._def.typeName===ZodFirstPartyTypeKind.ZodBranded&&e.keyType._def.type._def.typeName===ZodFirstPartyTypeKind.ZodString&&e.keyType._def.type._def.checks?.length){let{type:r,...o}=zen(e.keyType._def,t);return{...n,propertyNames:o}}return n}
var Qen=b(()=>{mEt();h0();Jen();jen();CK()});
export {Xen,Qen};

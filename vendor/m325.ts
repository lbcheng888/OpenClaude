// @ts-nocheck
import {ZodFirstPartyTypeKind} from "./m250.ts";
import {Yd,JI} from "./m347.ts";
import {b} from "../runtime.ts";
import {Uyt} from "./m252.ts";
function ocr(e,t,n,r){if(!r?.errorMessages)return;if(n)e.errorMessage={...e.errorMessage,[t]:n}}
function og(e,t,n,r,o){e[t]=n,ocr(e,t,r,o)}
var mQt=(e,t)=>{let n=0;for(;n<e.length&&n<t.length;n++)if(e[n]!==t[n])break;return[(e.length-n).toString(),...t.slice(n)].join("/")};
function fw(e){if(e.target!=="openAi")return{};let t=[...e.basePath,e.definitionPath,e.openAiAnyTypeName];return e.flags.hasReferencedOpenAiAnyType=!0,{$ref:e.$refStrategy==="relative"?mQt(t,e.currentPath):t.join("/")}}
var QV=()=>{};
function N6o(e,t){let n={type:"array"};if(e.type?._def&&e.type?._def?.typeName!==ZodFirstPartyTypeKind.ZodAny)n.items=Yd(e.type._def,{...t,currentPath:[...t.currentPath,"items"]});if(e.minLength)og(n,"minItems",e.minLength.value,e.minLength.message,t);if(e.maxLength)og(n,"maxItems",e.maxLength.value,e.maxLength.message,t);if(e.exactLength)og(n,"minItems",e.exactLength.value,e.exactLength.message,t),og(n,"maxItems",e.exactLength.value,e.exactLength.message,t);return n}
var scr=b(()=>{Uyt();JI()});
export {ocr,og,mQt,fw,QV,N6o,scr};

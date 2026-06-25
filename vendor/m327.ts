// @ts-nocheck
import {ZodFirstPartyTypeKind} from "./m252.ts";
import {Ad,h0} from "./m349.ts";
import {b} from "../runtime.ts";
import {mEt} from "./m254.ts";
function xmr(e,t,n,r){if(!r?.errorMessages)return;if(n)e.errorMessage={...e.errorMessage,[t]:n}}
function lg(e,t,n,r,o){e[t]=n,xmr(e,t,r,o)}
var Ken=(e,t)=>{let n=0;for(;n<e.length&&n<t.length;n++)if(e[n]!==t[n])break;return[(e.length-n).toString(),...t.slice(n)].join("/")};
function bR(e){if(e.target!=="openAi")return{};let t=[...e.basePath,e.definitionPath,e.openAiAnyTypeName];return e.flags.hasReferencedOpenAiAnyType=!0,{$ref:e.$refStrategy==="relative"?Ken(t,e.currentPath):t.join("/")}}
var CK=()=>{};
function DKo(e,t){let n={type:"array"};if(e.type?._def&&e.type?._def?.typeName!==ZodFirstPartyTypeKind.ZodAny)n.items=Ad(e.type._def,{...t,currentPath:[...t.currentPath,"items"]});if(e.minLength)lg(n,"minItems",e.minLength.value,e.minLength.message,t);if(e.maxLength)lg(n,"maxItems",e.maxLength.value,e.maxLength.message,t);if(e.exactLength)lg(n,"minItems",e.exactLength.value,e.exactLength.message,t),lg(n,"maxItems",e.exactLength.value,e.exactLength.message,t);return n}
var Dmr=b(()=>{mEt();h0()});
export {xmr,lg,Ken,bR,CK,DKo,Dmr};

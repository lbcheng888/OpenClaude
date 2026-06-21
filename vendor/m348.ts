// @ts-nocheck
import {M6o,rcr} from "./m324.ts";
import {Yd,JI} from "./m347.ts";
import {fw,QV} from "./m325.ts";
import {b} from "../runtime.ts";
var djo=()=>{};
var kcr=(e,t)=>{let n=M6o(t),r=typeof t==="object"&&t.definitions?Object.entries(t.definitions).reduce((l,[c,u])=>({...l,[c]:Yd(u._def,{...n,currentPath:[...n.basePath,n.definitionPath,c]},!0)??fw(n)}),{}):void 0,o=typeof t==="string"?t:t?.nameStrategy==="title"?void 0:t?.name,s=Yd(e._def,o===void 0?n:{...n,currentPath:[...n.basePath,n.definitionPath,o]},!1)??fw(n),i=typeof t==="object"&&t.name!==void 0&&t.nameStrategy==="title"?t.name:void 0;if(i!==void 0)s.title=i;if(n.flags.hasReferencedOpenAiAnyType){if(!r)r={};if(!r[n.openAiAnyTypeName])r[n.openAiAnyTypeName]={type:["string","number","integer","boolean","array","null"],items:{$ref:n.$refStrategy==="relative"?"1":[...n.basePath,n.definitionPath,n.openAiAnyTypeName].join("/")}}}let a=o===void 0?r?{...s,[n.definitionPath]:r}:s:{$ref:[...n.$refStrategy==="relative"?[]:n.basePath,n.definitionPath,o].join("/"),[n.definitionPath]:{...r,[o]:s}};if(n.target==="jsonSchema7")a.$schema="http://json-schema.org/draft-07/schema#";else if(n.target==="jsonSchema2019-09"||n.target==="openAi")a.$schema="https://json-schema.org/draft/2019-09/schema#";if(n.target==="openAi"&&(("anyOf"in a)||("oneOf"in a)||("allOf"in a)||("type"in a)&&Array.isArray(a.type)))console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");return a};
var Hcr=b(()=>{JI();rcr();QV()});
export {djo,kcr,Hcr};

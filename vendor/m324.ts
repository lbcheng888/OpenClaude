// @ts-nocheck
import {L6o,pQt} from "./m323.ts";
import {b} from "../runtime.ts";
var M6o=(e)=>{let t=L6o(e),n=t.name!==void 0?[...t.basePath,t.definitionPath,t.name]:t.basePath;return{...t,flags:{hasReferencedOpenAiAnyType:!1},currentPath:n,propertyPath:void 0,seen:new Map(Object.entries(t.definitions).map(([r,o])=>[o._def,{def:o._def,path:[...t.basePath,t.definitionPath,r],jsonSchema:void 0}]))}};
var rcr=b(()=>{pQt()});
export {M6o,rcr};

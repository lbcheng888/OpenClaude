// @ts-nocheck
import {IKo,Ven} from "./m325.ts";
import {b} from "../runtime.ts";
var xKo=(e)=>{let t=IKo(e),n=t.name!==void 0?[...t.basePath,t.definitionPath,t.name]:t.basePath;return{...t,flags:{hasReferencedOpenAiAnyType:!1},currentPath:n,propertyPath:void 0,seen:new Map(Object.entries(t.definitions).map(([r,o])=>[o._def,{def:o._def,path:[...t.basePath,t.definitionPath,r],jsonSchema:void 0}]))}};
var Imr=b(()=>{Ven()});
export {xKo,Imr};

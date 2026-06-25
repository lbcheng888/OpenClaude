// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
import {apiKeyHelperCache} from "./m357.ts";
import {AK} from "./m365.ts";
var Rjo=Q((Xre)=>{Object.defineProperty(Xre,"__esModule",{value:!0});Xre.validateSchemaDeps=Xre.validatePropertyDeps=Xre.error=void 0;var yhr=Km(),hNc=apiKeyHelperCache(),nAt=AK();Xre.error={message:({params:{property:e,depsCount:t,deps:n}})=>{let r=t===1?"property":"properties";return yhr.str`must have ${r} ${n} when property ${e} is present`},params:({params:{property:e,depsCount:t,deps:n,missingProperty:r}})=>yhr._`{property: ${e},
    missingProperty: ${r},
    depsCount: ${t},
    deps: ${n}}`};var gNc={keyword:"dependencies",type:"object",schemaType:"object",error:Xre.error,code(e){let[t,n]=_Nc(e);Cjo(e,t),Ajo(e,n)}};function _Nc({schema:e}){let t={},n={};for(let r in e){if(r==="__proto__")continue;let o=Array.isArray(e[r])?t:n;o[r]=e[r]}return[t,n]}function Cjo(e,t=e.schema){let{gen:n,data:r,it:o}=e;if(Object.keys(t).length===0)return;let s=n.let("missing");for(let i in t){let a=t[i];if(a.length===0)continue;let l=(0,nAt.propertyInData)(n,r,i,o.opts.ownProperties);if(e.setParams({property:i,depsCount:a.length,deps:a.join(", ")}),o.allErrors)n.if(l,()=>{for(let c of a)(0,nAt.checkReportMissingProp)(e,c)});else n.if(yhr._`${l} && (${(0,nAt.checkMissingProp)(e,a,s)})`),(0,nAt.reportMissingProp)(e,s),n.else()}}Xre.validatePropertyDeps=Cjo;function Ajo(e,t=e.schema){let{gen:n,data:r,keyword:o,it:s}=e,i=n.name("valid");for(let a in t){if((0,hNc.alwaysValidSchema)(s,t[a]))continue;n.if((0,nAt.propertyInData)(n,r,a,s.opts.ownProperties),()=>{let l=e.subschema({keyword:o,schemaProp:a},i);e.mergeValidEvaluated(l,i)},()=>n.var(i,!0)),e.ok(i)}}Xre.validateSchemaDeps=Ajo;Xre.default=gNc});
export {Rjo};

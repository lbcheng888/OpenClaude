// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
import {Ig} from "./m355.ts";
import {initZV} from "./m363.ts";
var H5o=X((Zre)=>{Object.defineProperty(Zre,"__esModule",{value:!0});Zre.validateSchemaDeps=Zre.validatePropertyDeps=Zre.error=void 0;var Gur=initLf(),dkc=Ig(),HSt=initZV();Zre.error={message:({params:{property:e,depsCount:t,deps:n}})=>{let r=t===1?"property":"properties";return Gur.str`must have ${r} ${n} when property ${e} is present`},params:({params:{property:e,depsCount:t,deps:n,missingProperty:r}})=>Gur._`{property: ${e},
    missingProperty: ${r},
    depsCount: ${t},
    deps: ${n}}`};var pkc={keyword:"dependencies",type:"object",schemaType:"object",error:Zre.error,code(e){let[t,n]=mkc(e);x5o(e,t),k5o(e,n)}};function mkc({schema:e}){let t={},n={};for(let r in e){if(r==="__proto__")continue;let o=Array.isArray(e[r])?t:n;o[r]=e[r]}return[t,n]}function x5o(e,t=e.schema){let{gen:n,data:r,it:o}=e;if(Object.keys(t).length===0)return;let s=n.let("missing");for(let i in t){let a=t[i];if(a.length===0)continue;let l=(0,HSt.propertyInData)(n,r,i,o.opts.ownProperties);if(e.setParams({property:i,depsCount:a.length,deps:a.join(", ")}),o.allErrors)n.if(l,()=>{for(let c of a)(0,HSt.checkReportMissingProp)(e,c)});else n.if(Gur._`${l} && (${(0,HSt.checkMissingProp)(e,a,s)})`),(0,HSt.reportMissingProp)(e,s),n.else()}}Zre.validatePropertyDeps=x5o;function k5o(e,t=e.schema){let{gen:n,data:r,keyword:o,it:s}=e,i=n.name("valid");for(let a in t){if((0,dkc.alwaysValidSchema)(s,t[a]))continue;n.if((0,HSt.propertyInData)(n,r,a,s.opts.ownProperties),()=>{let l=e.subschema({keyword:o,schemaProp:a},i);e.mergeValidEvaluated(l,i)},()=>n.var(i,!0)),e.ok(i)}}Zre.validateSchemaDeps=k5o;Zre.default=pkc});
export {H5o};

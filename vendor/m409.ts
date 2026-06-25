// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
import {apiKeyHelperCache} from "./m357.ts";
var Njo=Q((whr)=>{Object.defineProperty(whr,"__esModule",{value:!0});var Dtn=Km(),xNc=apiKeyHelperCache(),DNc={message:"must match exactly one schema in oneOf",params:({params:e})=>Dtn._`{passingSchemas: ${e.passing}}`},PNc={keyword:"oneOf",schemaType:"array",trackErrors:!0,error:DNc,code(e){let{gen:t,schema:n,parentSchema:r,it:o}=e;if(!Array.isArray(n))throw Error("ajv implementation error");if(o.opts.discriminator&&r.discriminator)return;let s=n,i=t.let("valid",!1),a=t.let("passing",null),l=t.name("_valid");e.setParams({passing:a}),t.block(c),e.result(i,()=>e.reset(),()=>e.error(!0));function c(){s.forEach((u,d)=>{let p;if((0,xNc.alwaysValidSchema)(o,u))t.var(l,!0);else p=e.subschema({keyword:"oneOf",schemaProp:d,compositeRule:!0},l);if(d>0)t.if(Dtn._`${l} && ${i}`).assign(i,!1).assign(a,Dtn._`[${a}, ${d}]`).else();t.if(l,()=>{if(t.assign(i,!0),t.assign(a,d),p)e.mergeEvaluated(p,Dtn.Name)})})}}};whr.default=PNc});
export {Njo};

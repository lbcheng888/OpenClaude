// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
import {Ig} from "./m355.ts";
var q5o=X((edr)=>{Object.defineProperty(edr,"__esModule",{value:!0});var ZQt=initLf(),Rkc=Ig(),xkc={message:"must match exactly one schema in oneOf",params:({params:e})=>ZQt._`{passingSchemas: ${e.passing}}`},kkc={keyword:"oneOf",schemaType:"array",trackErrors:!0,error:xkc,code(e){let{gen:t,schema:n,parentSchema:r,it:o}=e;if(!Array.isArray(n))throw Error("ajv implementation error");if(o.opts.discriminator&&r.discriminator)return;let s=n,i=t.let("valid",!1),a=t.let("passing",null),l=t.name("_valid");e.setParams({passing:a}),t.block(c),e.result(i,()=>e.reset(),()=>e.error(!0));function c(){s.forEach((u,d)=>{let p;if((0,Rkc.alwaysValidSchema)(o,u))t.var(l,!0);else p=e.subschema({keyword:"oneOf",schemaProp:d,compositeRule:!0},l);if(d>0)t.if(ZQt._`${l} && ${i}`).assign(i,!1).assign(a,ZQt._`[${a}, ${d}]`).else();t.if(l,()=>{if(t.assign(i,!0),t.assign(a,d),p)e.mergeEvaluated(p,ZQt.Name)})})}}};edr.default=kkc});
export {q5o};

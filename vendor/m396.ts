// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
import {Ig} from "./m355.ts";
import {initZV} from "./m363.ts";
var $ur=X((kSt)=>{Object.defineProperty(kSt,"__esModule",{value:!0});kSt.validateTuple=void 0;var b5o=initLf(),zQt=Ig(),ekc=initZV(),tkc={keyword:"items",type:"array",schemaType:["object","array","boolean"],before:"uniqueItems",code(e){let{schema:t,it:n}=e;if(Array.isArray(t))return E5o(e,"additionalItems",t);if(n.items=!0,(0,zQt.alwaysValidSchema)(n,t))return;e.ok((0,ekc.validateArray)(e))}};function E5o(e,t,n=e.schema){let{gen:r,parentSchema:o,data:s,keyword:i,it:a}=e;if(u(o),a.opts.unevaluated&&n.length&&a.items!==!0)a.items=zQt.mergeEvaluated.items(r,n.length,a.items);let l=r.name("valid"),c=r.const("len",b5o._`${s}.length`);n.forEach((d,p)=>{if((0,zQt.alwaysValidSchema)(a,d))return;r.if(b5o._`${c} > ${p}`,()=>e.subschema({keyword:i,schemaProp:p,dataProp:p},l)),e.ok(l)});function u(d){let{opts:p,errSchemaPath:m}=a,f=n.length,A=f===d.minItems&&(f===d.maxItems||d[t]===!1);if(p.strictTuples&&!A){let h=`"${i}" is ${f}-tuple, but minItems or maxItems/${t} are not specified or different at path "${m}"`;(0,zQt.checkStrictMode)(a,h,p.strictTuples)}}}kSt.validateTuple=E5o;kSt.default=tkc});
export {$ur};

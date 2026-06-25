// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
import {apiKeyHelperCache} from "./m357.ts";
import {AK} from "./m365.ts";
var fhr=Q((tAt)=>{Object.defineProperty(tAt,"__esModule",{value:!0});tAt.validateTuple=void 0;var _jo=Km(),wtn=apiKeyHelperCache(),oNc=AK(),sNc={keyword:"items",type:"array",schemaType:["object","array","boolean"],before:"uniqueItems",code(e){let{schema:t,it:n}=e;if(Array.isArray(t))return yjo(e,"additionalItems",t);if(n.items=!0,(0,wtn.alwaysValidSchema)(n,t))return;e.ok((0,oNc.validateArray)(e))}};function yjo(e,t,n=e.schema){let{gen:r,parentSchema:o,data:s,keyword:i,it:a}=e;if(u(o),a.opts.unevaluated&&n.length&&a.items!==!0)a.items=wtn.mergeEvaluated.items(r,n.length,a.items);let l=r.name("valid"),c=r.const("len",_jo._`${s}.length`);n.forEach((d,p)=>{if((0,wtn.alwaysValidSchema)(a,d))return;r.if(_jo._`${c} > ${p}`,()=>e.subschema({keyword:i,schemaProp:p,dataProp:p},l)),e.ok(l)});function u(d){let{opts:p,errSchemaPath:m}=a,f=n.length,h=f===d.minItems&&(f===d.maxItems||d[t]===!1);if(p.strictTuples&&!h){let g=`"${i}" is ${f}-tuple, but minItems or maxItems/${t} are not specified or different at path "${m}"`;(0,wtn.checkStrictMode)(a,g,p.strictTuples)}}}tAt.validateTuple=yjo;tAt.default=sNc});
export {fhr};

// @ts-nocheck
import {Q} from "../runtime.ts";
import {AK} from "./m365.ts";
import {Km} from "./m356.ts";
import {apiKeyHelperCache} from "./m357.ts";
var Ojo=Q((Ahr)=>{Object.defineProperty(Ahr,"__esModule",{value:!0});var xjo=AK(),xtn=Km(),Djo=apiKeyHelperCache(),Pjo=apiKeyHelperCache(),vNc={keyword:"patternProperties",type:"object",schemaType:"object",code(e){let{gen:t,schema:n,data:r,parentSchema:o,it:s}=e,{opts:i}=s,a=(0,xjo.allSchemaProperties)(n),l=a.filter((h)=>(0,Djo.alwaysValidSchema)(s,n[h]));if(a.length===0||l.length===a.length&&(!s.opts.unevaluated||s.props===!0))return;let c=i.strictSchema&&!i.allowMatchingProperties&&o.properties,u=t.name("valid");if(s.props!==!0&&!(s.props instanceof xtn.Name))s.props=(0,Pjo.evaluatedPropsToName)(t,s.props);let{props:d}=s;p();function p(){for(let h of a){if(c)m(h);if(s.allErrors)f(h);else t.var(u,!0),f(h),t.if(u)}}function m(h){for(let g in c)if(new RegExp(h).test(g))(0,Djo.checkStrictMode)(s,`property ${g} matches pattern ${h} (use allowMatchingProperties)`)}function f(h){t.forIn("key",r,(g)=>{t.if(xtn._`${(0,xjo.usePattern)(e,h)}.test(${g})`,()=>{let _=l.includes(h);if(!_)e.subschema({keyword:"patternProperties",schemaProp:h,dataProp:g,dataPropType:Pjo.Type.Str},u);if(s.opts.unevaluated&&d!==!0)t.assign(xtn._`${d}[${g}]`,!0);else if(!_&&!s.allErrors)t.if((0,xtn.not)(u),()=>t.break())})})}}};Ahr.default=vNc});
export {Ojo};

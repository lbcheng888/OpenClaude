// @ts-nocheck
import {X} from "../runtime.ts";
import {initZV} from "./m363.ts";
import {initLf} from "./m354.ts";
import {Ig} from "./m355.ts";
var F5o=X((Xur)=>{Object.defineProperty(Xur,"__esModule",{value:!0});var M5o=initZV(),QQt=initLf(),N5o=Ig(),B5o=Ig(),bkc={keyword:"patternProperties",type:"object",schemaType:"object",code(e){let{gen:t,schema:n,data:r,parentSchema:o,it:s}=e,{opts:i}=s,a=(0,M5o.allSchemaProperties)(n),l=a.filter((A)=>(0,N5o.alwaysValidSchema)(s,n[A]));if(a.length===0||l.length===a.length&&(!s.opts.unevaluated||s.props===!0))return;let c=i.strictSchema&&!i.allowMatchingProperties&&o.properties,u=t.name("valid");if(s.props!==!0&&!(s.props instanceof QQt.Name))s.props=(0,B5o.evaluatedPropsToName)(t,s.props);let{props:d}=s;p();function p(){for(let A of a){if(c)m(A);if(s.allErrors)f(A);else t.var(u,!0),f(A),t.if(u)}}function m(A){for(let h in c)if(new RegExp(A).test(h))(0,N5o.checkStrictMode)(s,`property ${h} matches pattern ${A} (use allowMatchingProperties)`)}function f(A){t.forIn("key",r,(h)=>{t.if(QQt._`${(0,M5o.usePattern)(e,A)}.test(${h})`,()=>{let g=l.includes(A);if(!g)e.subschema({keyword:"patternProperties",schemaProp:A,dataProp:h,dataPropType:B5o.Type.Str},u);if(s.opts.unevaluated&&d!==!0)t.assign(QQt._`${d}[${h}]`,!0);else if(!g&&!s.allErrors)t.if((0,QQt.not)(u),()=>t.break())})})}}};Xur.default=bkc});
export {F5o};

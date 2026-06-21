// @ts-nocheck
import {X} from "../runtime.ts";
import {hSt} from "./m369.ts";
import {initZV} from "./m363.ts";
import {Ig} from "./m355.ts";
import {zur} from "./m402.ts";
var L5o=X((Jur)=>{Object.defineProperty(Jur,"__esModule",{value:!0});var Tkc=hSt(),P5o=initZV(),Yur=Ig(),O5o=zur(),Skc={keyword:"properties",type:"object",schemaType:"object",code(e){let{gen:t,schema:n,parentSchema:r,data:o,it:s}=e;if(s.opts.removeAdditional==="all"&&r.additionalProperties===void 0)O5o.default.code(new Tkc.KeywordCxt(s,O5o.default,"additionalProperties"));let i=(0,P5o.allSchemaProperties)(n);for(let d of i)s.definedProperties.add(d);if(s.opts.unevaluated&&i.length&&s.props!==!0)s.props=Yur.mergeEvaluated.props(t,(0,Yur.toHash)(i),s.props);let a=i.filter((d)=>!(0,Yur.alwaysValidSchema)(s,n[d]));if(a.length===0)return;let l=t.name("valid");for(let d of a){if(c(d))u(d);else{if(t.if((0,P5o.propertyInData)(t,o,d,s.opts.ownProperties)),u(d),!s.allErrors)t.else().var(l,!0);t.endIf()}e.it.definedProperties.add(d),e.ok(l)}function c(d){return s.opts.useDefaults&&!s.compositeRule&&n[d].default!==void 0}function u(d){e.subschema({keyword:"properties",schemaProp:d,dataProp:d},l)}}};Jur.default=Skc});
export {L5o};

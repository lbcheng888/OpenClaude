// @ts-nocheck
import {Q} from "../runtime.ts";
import {qCt} from "./m371.ts";
import {AK} from "./m365.ts";
import {apiKeyHelperCache} from "./m357.ts";
import {bhr} from "./m404.ts";
var Ijo=Q((Chr)=>{Object.defineProperty(Chr,"__esModule",{value:!0});var ANc=qCt(),kjo=AK(),Ehr=apiKeyHelperCache(),Hjo=bhr(),RNc={keyword:"properties",type:"object",schemaType:"object",code(e){let{gen:t,schema:n,parentSchema:r,data:o,it:s}=e;if(s.opts.removeAdditional==="all"&&r.additionalProperties===void 0)Hjo.default.code(new ANc.KeywordCxt(s,Hjo.default,"additionalProperties"));let i=(0,kjo.allSchemaProperties)(n);for(let d of i)s.definedProperties.add(d);if(s.opts.unevaluated&&i.length&&s.props!==!0)s.props=Ehr.mergeEvaluated.props(t,(0,Ehr.toHash)(i),s.props);let a=i.filter((d)=>!(0,Ehr.alwaysValidSchema)(s,n[d]));if(a.length===0)return;let l=t.name("valid");for(let d of a){if(c(d))u(d);else{if(t.if((0,kjo.propertyInData)(t,o,d,s.opts.ownProperties)),u(d),!s.allErrors)t.else().var(l,!0);t.endIf()}e.it.definedProperties.add(d),e.ok(l)}function c(d){return s.opts.useDefaults&&!s.compositeRule&&n[d].default!==void 0}function u(d){e.subschema({keyword:"properties",schemaProp:d,dataProp:d},l)}}};Chr.default=RNc});
export {Ijo};

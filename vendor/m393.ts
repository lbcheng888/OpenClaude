// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
import {Ig} from "./m355.ts";
import {KQt} from "./m390.ts";
var y5o=X((Nur)=>{Object.defineProperty(Nur,"__esModule",{value:!0});var RSt=initLf(),Nxc=Ig(),Bxc=KQt(),Fxc={message:"must be equal to one of the allowed values",params:({schemaCode:e})=>RSt._`{allowedValues: ${e}}`},Uxc={keyword:"enum",schemaType:"array",$data:!0,error:Fxc,code(e){let{gen:t,data:n,$data:r,schema:o,schemaCode:s,it:i}=e;if(!r&&o.length===0)throw Error("enum must have non-empty array");let a=o.length>=i.opts.loopEnum,l,c=()=>l!==null&&l!==void 0?l:l=(0,Nxc.useFunc)(t,Bxc.default),u;if(a||r)u=t.let("valid"),e.block$data(u,d);else{if(!Array.isArray(o))throw Error("ajv implementation error");let m=t.const("vSchema",s);u=(0,RSt.or)(...o.map((f,A)=>p(m,A)))}e.pass(u);function d(){t.assign(u,!1),t.forOf("v",s,(m)=>t.if(RSt._`${c()}(${n}, ${m})`,()=>t.assign(u,!0).break()))}function p(m,f){let A=o[f];return typeof A==="object"&&A!==null?RSt._`${c()}(${n}, ${m}[${f}])`:RSt._`${n} === ${A}`}}};Nur.default=Uxc});
export {y5o};

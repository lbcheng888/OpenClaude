// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
import {apiKeyHelperCache} from "./m357.ts";
import {vtn} from "./m392.ts";
var fjo=Q((uhr)=>{Object.defineProperty(uhr,"__esModule",{value:!0});var ZCt=Km(),$1c=apiKeyHelperCache(),q1c=vtn(),W1c={message:"must be equal to one of the allowed values",params:({schemaCode:e})=>ZCt._`{allowedValues: ${e}}`},G1c={keyword:"enum",schemaType:"array",$data:!0,error:W1c,code(e){let{gen:t,data:n,$data:r,schema:o,schemaCode:s,it:i}=e;if(!r&&o.length===0)throw Error("enum must have non-empty array");let a=o.length>=i.opts.loopEnum,l,c=()=>l!==null&&l!==void 0?l:l=(0,$1c.useFunc)(t,q1c.default),u;if(a||r)u=t.let("valid"),e.block$data(u,d);else{if(!Array.isArray(o))throw Error("ajv implementation error");let m=t.const("vSchema",s);u=(0,ZCt.or)(...o.map((f,h)=>p(m,h)))}e.pass(u);function d(){t.assign(u,!1),t.forOf("v",s,(m)=>t.if(ZCt._`${c()}(${n}, ${m})`,()=>t.assign(u,!0).break()))}function p(m,f){let h=o[f];return typeof h==="object"&&h!==null?ZCt._`${c()}(${n}, ${m}[${f}])`:ZCt._`${n} === ${h}`}}};uhr.default=G1c});
export {fjo};

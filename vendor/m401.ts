// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
import {Ig} from "./m355.ts";
var D5o=X((Vur)=>{Object.defineProperty(Vur,"__esModule",{value:!0});var I5o=initLf(),fkc=Ig(),Akc={message:"property name must be valid",params:({params:e})=>I5o._`{propertyName: ${e.propertyName}}`},hkc={keyword:"propertyNames",type:"object",schemaType:["object","boolean"],error:Akc,code(e){let{gen:t,schema:n,data:r,it:o}=e;if((0,fkc.alwaysValidSchema)(o,n))return;let s=t.name("valid");t.forIn("key",r,(i)=>{e.setParams({propertyName:i}),e.subschema({keyword:"propertyNames",data:i,dataTypes:["string"],propertyName:i,compositeRule:!0},s),t.if((0,I5o.not)(s),()=>{if(e.error(!0),!o.allErrors)t.break()})}),e.ok(s)}};Vur.default=hkc});
export {D5o};

// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
import {apiKeyHelperCache} from "./m357.ts";
var wjo=Q((Thr)=>{Object.defineProperty(Thr,"__esModule",{value:!0});var vjo=Km(),yNc=apiKeyHelperCache(),TNc={message:"property name must be valid",params:({params:e})=>vjo._`{propertyName: ${e.propertyName}}`},SNc={keyword:"propertyNames",type:"object",schemaType:["object","boolean"],error:TNc,code(e){let{gen:t,schema:n,data:r,it:o}=e;if((0,yNc.alwaysValidSchema)(o,n))return;let s=t.name("valid");t.forIn("key",r,(i)=>{e.setParams({propertyName:i}),e.subschema({keyword:"propertyNames",data:i,dataTypes:["string"],propertyName:i,compositeRule:!0},s),t.if((0,vjo.not)(s),()=>{if(e.error(!0),!o.allErrors)t.break()})}),e.ok(s)}};Thr.default=SNc});
export {wjo};

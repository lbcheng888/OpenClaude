// @ts-nocheck
import {RHt,lJs} from "./m1691.ts";
import {sQe,COr} from "./m1688.ts";
import {b} from "../runtime.ts";
function vHt(e){let{namespace:t,packageName:n,packageVersion:r}=e;function o(c,u,d){var p;let m=RHt().startSpan(c,Object.assign(Object.assign({},d),{packageName:n,packageVersion:r,tracingContext:(p=u===null||u===void 0?void 0:u.tracingOptions)===null||p===void 0?void 0:p.tracingContext})),f=m.tracingContext,h=m.span;if(!f.getValue(sQe.namespace))f=f.setValue(sQe.namespace,t);h.setAttribute("az.namespace",f.getValue(sQe.namespace));let g=Object.assign({},u,{tracingOptions:Object.assign(Object.assign({},u===null||u===void 0?void 0:u.tracingOptions),{tracingContext:f})});return{span:h,updatedOptions:g}}async function s(c,u,d,p){let{span:m,updatedOptions:f}=o(c,u,p);try{let h=await i(f.tracingOptions.tracingContext,()=>Promise.resolve(d(f,m)));return m.setStatus({status:"success"}),h}catch(h){throw m.setStatus({status:"error",error:h}),h}finally{m.end()}}function i(c,u,...d){return RHt().withContext(c,u,...d)}function a(c){return RHt().parseTraceparentHeader(c)}function l(c){return RHt().createRequestHeaders(c)}return{startSpan:o,withSpan:s,withContext:i,parseTraceparentHeader:a,createRequestHeaders:l}}
var cJs=b(()=>{lJs();COr()});
export {vHt,cJs};

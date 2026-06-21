// @ts-nocheck
import {Qwt,mGs} from "./m1686.ts";
import {aJe,KHr} from "./m1683.ts";
import {b} from "../runtime.ts";
function Zwt(e){let{namespace:t,packageName:n,packageVersion:r}=e;function o(c,u,d){var p;let m=Qwt().startSpan(c,Object.assign(Object.assign({},d),{packageName:n,packageVersion:r,tracingContext:(p=u===null||u===void 0?void 0:u.tracingOptions)===null||p===void 0?void 0:p.tracingContext})),f=m.tracingContext,A=m.span;if(!f.getValue(aJe.namespace))f=f.setValue(aJe.namespace,t);A.setAttribute("az.namespace",f.getValue(aJe.namespace));let h=Object.assign({},u,{tracingOptions:Object.assign(Object.assign({},u===null||u===void 0?void 0:u.tracingOptions),{tracingContext:f})});return{span:A,updatedOptions:h}}async function s(c,u,d,p){let{span:m,updatedOptions:f}=o(c,u,p);try{let A=await i(f.tracingOptions.tracingContext,()=>Promise.resolve(d(f,m)));return m.setStatus({status:"success"}),A}catch(A){throw m.setStatus({status:"error",error:A}),A}finally{m.end()}}function i(c,u,...d){return Qwt().withContext(c,u,...d)}function a(c){return Qwt().parseTraceparentHeader(c)}function l(c){return Qwt().createRequestHeaders(c)}return{startSpan:o,withSpan:s,withContext:i,parseTraceparentHeader:a,createRequestHeaders:l}}
var fGs=b(()=>{mGs();KHr()});
export {Zwt,fGs};

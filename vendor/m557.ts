// @ts-nocheck
import {Ji,o8} from "./m461.ts";
import {s8,hMe} from "./m529.ts";
import {er,ZE} from "./m460.ts";
import {b} from "../runtime.ts";
var i$c=(e,t)=>{let{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,o,s=function(c){if(!o){o=!0,a();let u=c instanceof Error?c:this.reason;r.abort(u instanceof Ji?u:new s8(u instanceof Error?u.message:u))}},i=t&&setTimeout(()=>{i=null,s(new Ji(`timeout of ${t}ms exceeded`,Ji.ETIMEDOUT))},t),a=()=>{if(e)i&&clearTimeout(i),i=null,e.forEach((c)=>{c.unsubscribe?c.unsubscribe(s):c.removeEventListener("abort",s)}),e=null};e.forEach((c)=>c.addEventListener("abort",s));let{signal:l}=r;return l.unsubscribe=()=>er.asap(a),l}},Rzo;
var xzo=b(()=>{hMe();o8();ZE();Rzo=i$c});
export {i$c,Rzo,xzo};

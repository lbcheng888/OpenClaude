// @ts-nocheck
import {Hi,S5} from "./m467.ts";
import {b5,c1e} from "./m535.ts";
import {rr,oC} from "./m466.ts";
import {b} from "../runtime.ts";
var mVc=(e,t)=>{let{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,o,s=function(c){if(!o){o=!0,a();let u=c instanceof Error?c:this.reason;r.abort(u instanceof Hi?u:new b5(u instanceof Error?u.message:u))}},i=t&&setTimeout(()=>{i=null,s(new Hi(`timeout of ${t}ms exceeded`,Hi.ETIMEDOUT))},t),a=()=>{if(e)i&&clearTimeout(i),i=null,e.forEach((c)=>{c.unsubscribe?c.unsubscribe(s):c.removeEventListener("abort",s)}),e=null};e.forEach((c)=>c.addEventListener("abort",s));let{signal:l}=r;return l.unsubscribe=()=>rr.asap(a),l}},Aes;
var Res=b(()=>{c1e();S5();oC();Aes=mVc});
export {mVc,Aes,Res};

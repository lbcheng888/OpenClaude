// @ts-nocheck
import {Bxn,a7i} from "./m3050.ts";
import {MGr,l7i} from "./m3051.ts";
import {yGr,_Gr,TGr,wxn} from "./m3019.ts";
import {isBundledSkillsDisabled,M7e} from "./m667.ts";
import {nVi,f$e,A$e} from "./m3020.ts";
import {b,M} from "../runtime.ts";
import {t7i} from "./m3048.ts";
function y$e(e){return(n,r={})=>{let{input:o=process.stdin,signal:s}=r,i=new Set,a=new d7i.default;a.pipe(r.output??process.stdout);let l=c7i.createInterface({terminal:!0,input:o,output:a}),c=new Bxn(l),{promise:u,resolve:d,reject:p}=MGr.withResolver(),m=()=>p(new yGr);if(s){let A=()=>p(new _Gr({cause:s.reason}));if(s.aborted)return A(),Object.assign(u,{cancel:m});s.addEventListener("abort",A),i.add(()=>s.removeEventListener("abort",A))}i.add(isBundledSkillsDisabled((A,h)=>{p(new TGr(`User force closed the prompt with ${A} ${h}`))}));let f=()=>c.checkCursorPos();return l.input.on("keypress",f),i.add(()=>l.input.removeListener("keypress",f)),nVi(l,(A)=>{let h=u7i.AsyncResource.bind(()=>f$e.clearAll());return l.on("close",h),i.add(()=>l.removeListener("close",h)),A(()=>{try{let g=e(n,(T)=>{setImmediate(()=>d(T))}),[_,y]=typeof g==="string"?[g]:g;c.render(_,y),f$e.run()}catch(g){p(g)}}),Object.assign(u.then((g)=>(f$e.clearAll(),g),(g)=>{throw f$e.clearAll(),g}).finally(()=>{i.forEach((g)=>g()),c.done({clearContent:Boolean(r?.clearPromptOnDone)}),a.end()}).then(()=>u),{cancel:m})})}}
var c7i,u7i,d7i;
var p7i=b(()=>{M7e();a7i();l7i();A$e();wxn();c7i=M(require("readline")),u7i=require("async_hooks"),d7i=M(t7i(),1)});
export {y$e,c7i,u7i,d7i,p7i};

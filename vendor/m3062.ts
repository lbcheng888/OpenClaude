// @ts-nocheck
import {w0n,eZi} from "./m3060.ts";
import {_Yr,tZi} from "./m3061.ts";
import {eYr,Zjr,tYr,h0n} from "./m3029.ts";
import {ZX,Pje} from "./m673.ts";
import {YXi,_9e,y9e} from "./m3030.ts";
import {b,x} from "../runtime.ts";
import {jQi} from "./m3058.ts";
function E9e(e){return(n,r={})=>{let{input:o=process.stdin,signal:s}=r,i=new Set,a=new oZi.default;a.pipe(r.output??process.stdout);let l=nZi.createInterface({terminal:!0,input:o,output:a}),c=new w0n(l),{promise:u,resolve:d,reject:p}=_Yr.withResolver(),m=()=>p(new eYr);if(s){let h=()=>p(new Zjr({cause:s.reason}));if(s.aborted)return h(),Object.assign(u,{cancel:m});s.addEventListener("abort",h),i.add(()=>s.removeEventListener("abort",h))}i.add(ZX((h,g)=>{p(new tYr(`User force closed the prompt with ${h} ${g}`))}));let f=()=>c.checkCursorPos();return l.input.on("keypress",f),i.add(()=>l.input.removeListener("keypress",f)),YXi(l,(h)=>{let g=rZi.AsyncResource.bind(()=>_9e.clearAll());return l.on("close",g),i.add(()=>l.removeListener("close",g)),h(()=>{try{let _=e(n,(S)=>{setImmediate(()=>d(S))}),[T,y]=typeof _==="string"?[_]:_;c.render(T,y),_9e.run()}catch(_){p(_)}}),Object.assign(u.then((_)=>(_9e.clearAll(),_),(_)=>{throw _9e.clearAll(),_}).finally(()=>{i.forEach((_)=>_()),c.done({clearContent:Boolean(r?.clearPromptOnDone)}),a.end()}).then(()=>u),{cancel:m})})}}
var nZi,rZi,oZi;
var sZi=b(()=>{Pje();eZi();tZi();y9e();h0n();nZi=x(require("readline")),rZi=require("async_hooks"),oZi=x(jQi(),1)});
export {E9e,nZi,rZi,oZi,sZi};

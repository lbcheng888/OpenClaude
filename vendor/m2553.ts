// @ts-nocheck
import {QS,Q2} from "./m2552.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Or(e,t,n={}){let{context:r="Global",isActive:o=!0}=n,s=QS(),i=hwe.useRef(t);i.current=t,hwe.useEffect(()=>{if(!s||!o)return;return s.registerHandler({action:e,context:r,handler:()=>i.current(),singleKey:!0})},[e,r,s,o])}
function Oo(e,t={}){let{context:n="Global",isActive:r=!0}=t,o=QS(),s=hwe.useRef(e);s.current=e;let i=Object.keys(e).sort().join("|");hwe.useEffect(()=>{if(!o||!r)return;let a=[];for(let l of Object.keys(s.current))a.push(o.registerHandler({action:l,context:n,handler:()=>s.current[l]?.(),singleKey:!0}));return()=>{for(let l of a)l()}},[n,i,o,r])}
function Cnt(e,{isActive:t=!0}={}){let n=QS(),r=hwe.useRef(e);r.current=e,hwe.useEffect(()=>{if(!t||!n)return;return n.registerPreDispatch((o,s,i)=>r.current(o,s,i))},[t,n])}
var hwe;
var ss=b(()=>{Q2();hwe=x(et(),1)});
export {Or,Oo,Cnt,hwe,ss};

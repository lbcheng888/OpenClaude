// @ts-nocheck
import {getSettingsSchema,k$} from "./m2541.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function Or(e,t,n={}){let{context:r="Global",isActive:o=!0}=n,s=getSettingsSchema(),i=Hwe.useRef(t);i.current=t,Hwe.useEffect(()=>{if(!s||!o)return;return s.registerHandler({action:e,context:r,handler:()=>i.current(),singleKey:!0})},[e,r,s,o])}
function Wo(e,t={}){let{context:n="Global",isActive:r=!0}=t,o=getSettingsSchema(),s=Hwe.useRef(e);s.current=e;let i=Object.keys(e).sort().join("|");Hwe.useEffect(()=>{if(!o||!r)return;let a=[];for(let l of Object.keys(s.current))a.push(o.registerHandler({action:l,context:n,handler:()=>s.current[l]?.(),singleKey:!0}));return()=>{for(let l of a)l()}},[n,i,o,r])}
function yet(e,{isActive:t=!0}={}){let n=getSettingsSchema(),r=Hwe.useRef(e);r.current=e,Hwe.useEffect(()=>{if(!t||!n)return;return n.registerPreDispatch((o,s,i)=>r.current(o,s,i))},[t,n])}
var Hwe;
var Ts=b(()=>{k$();Hwe=M(Te(),1)});
export {Or,Wo,yet,Hwe,Ts};

// @ts-nocheck
import {B4,CZe,vZe,rwe} from "./m2381.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function useTimeout(e,t,n){let r=sAe.useContext(B4),o=typeof e==="function",s=o?e:null,i=o?t:e,a=o?void 0:t,l=sAe.useRef(s);l.current=s;let c=sAe.useRef(null),u=r?.setTimeout??CZe,d=sAe.useMemo(()=>{if(i===null)return vZe;let m=(f)=>(c.current=null,f(),u(()=>{if(c.current=m,o)l.current?.();else f()},i));return m},[u,i,o,a,...n??[]]),p=sAe.useSyncExternalStore(d,o?vld:()=>c.current===d);if(!o)return p}
var sAe,vld=()=>!1;
var f0t=b(()=>{rwe();sAe=M(Te(),1)});
export {useTimeout,sAe,vld,f0t};

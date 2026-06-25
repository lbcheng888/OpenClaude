// @ts-nocheck
import {s4,Rtt,vtt,$ve} from "./m2391.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function useTimeout(e,t,n){let r=_he.useContext(s4),o=typeof e==="function",s=o?e:null,i=o?t:e,a=o?void 0:t,l=_he.useRef(s);l.current=s;let c=_he.useRef(null),u=r?.setTimeout??Rtt,d=_he.useMemo(()=>{if(i===null)return vtt;let m=(f)=>(c.current=null,f(),u(()=>{if(c.current=m,o)l.current?.();else f()},i));return m},[u,i,o,a,...n??[]]),p=_he.useSyncExternalStore(d,o?Jyd:()=>c.current===d);if(!o)return p}
var _he,Jyd=()=>!1;
var WPt=b(()=>{$ve();_he=x(et(),1)});
export {useTimeout,_he,Jyd,WPt};

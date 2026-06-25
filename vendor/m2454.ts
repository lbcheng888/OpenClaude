// @ts-nocheck
import {Tz,c2e} from "./m2388.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function useFocus(){let{focusManager:e,rootNode:t}=Btt.useContext(Tz),n=Btt.useSyncExternalStore(e?.subscribe??Lxi,()=>e?.activeElement??null);return Btt.useMemo(()=>({activeElement:n,focusNext:()=>{if(e&&t)e.focusNext(t)},focusPrevious:()=>{if(e&&t)e.focusPrevious(t)},focusDirection:(r)=>{if(e&&t)return e.focusDirection(r,t);return!1},focus:(r)=>e?.focus(r),blur:()=>e?.blur(),subscribe:e?.subscribe??Lxi}),[n,e,t])}
var Btt,Lxi=()=>()=>{};
var IAn=b(()=>{c2e();Btt=x(et(),1)});
export {useFocus,Btt,Lxi,IAn};

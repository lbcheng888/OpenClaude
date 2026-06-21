// @ts-nocheck
import {WK,dUe} from "./m2378.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function useFocus(){let{focusManager:e,rootNode:t}=BZe.useContext(WK),n=BZe.useSyncExternalStore(e?.subscribe??gwi,()=>e?.activeElement??null);return BZe.useMemo(()=>({activeElement:n,focusNext:()=>{if(e&&t)e.focusNext(t)},focusPrevious:()=>{if(e&&t)e.focusPrevious(t)},focusDirection:(r)=>{if(e&&t)return e.focusDirection(r,t);return!1},focus:(r)=>e?.focus(r),blur:()=>e?.blur(),subscribe:e?.subscribe??gwi}),[n,e,t])}
var BZe,gwi=()=>()=>{};
var jSn=b(()=>{dUe();BZe=M(Te(),1)});
export {useFocus,BZe,gwi,jSn};

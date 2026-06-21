// @ts-nocheck
import {WK,dUe} from "./m2378.ts";
import {HZ,rAe} from "./m2372.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function useHasFocus(e){let{focusManager:t}=WSn.useContext(WK);return WSn.useSyncExternalStore(t?.subscribe??Sld,()=>{let n=e.current,r=t?.activeElement;if(!n||!r)return!1;return HZ(r,n)},()=>!1)}
var WSn,Sld=()=>()=>{};
var I$r=b(()=>{dUe();rAe();WSn=M(Te(),1)});
export {useHasFocus,WSn,Sld,I$r};

// @ts-nocheck
import {Tz,c2e} from "./m2388.ts";
import {RZ,mhe} from "./m2382.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function useHasFocus(e){let{focusManager:t}=xAn.useContext(Tz);return xAn.useSyncExternalStore(t?.subscribe??Kyd,()=>{let n=e.current,r=t?.activeElement;if(!n||!r)return!1;return RZ(r,n)},()=>!1)}
var xAn,Kyd=()=>()=>{};
var l6r=b(()=>{c2e();mhe();xAn=x(et(),1)});
export {useHasFocus,xAn,Kyd,l6r};

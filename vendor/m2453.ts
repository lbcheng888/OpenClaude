// @ts-nocheck
import {s4,lAn,Rtt,$ve} from "./m2391.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function useDebouncedCallback(e,t){let n=LZ.useContext(s4),r=LZ.useRef(e);r.current=e;let o=LZ.useRef(null),s=LZ.useCallback((a)=>()=>o.current?.(),[]);LZ.useSyncExternalStore(s,lAn);let i=n?.setTimeout??Rtt;return LZ.useMemo(()=>{let a=(...l)=>{o.current?.(),o.current=i(()=>{o.current=null,r.current(...l)},t)};return a.cancel=()=>{o.current?.(),o.current=null},a},[i,t])}
var LZ;
var Oxi=b(()=>{$ve();LZ=x(et(),1)});
export {useDebouncedCallback,LZ,Oxi};

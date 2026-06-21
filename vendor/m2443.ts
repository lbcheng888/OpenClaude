// @ts-nocheck
import {B4,bSn,CZe,rwe} from "./m2381.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function j4(e,t){let n=BZ.useContext(B4),r=BZ.useRef(e);r.current=e;let o=BZ.useRef(null),s=BZ.useCallback((a)=>()=>o.current?.(),[]);BZ.useSyncExternalStore(s,bSn);let i=n?.setTimeout??CZe;return BZ.useMemo(()=>{let a=(...l)=>{o.current?.(),o.current=i(()=>{o.current=null,r.current(...l)},t)};return a.cancel=()=>{o.current?.(),o.current=null},a},[i,t])}
var BZ;
var hwi=b(()=>{rwe();BZ=M(Te(),1)});
export {j4,BZ,hwi};

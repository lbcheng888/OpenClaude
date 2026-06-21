// @ts-nocheck
import {useClock} from "./m2432.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function XNa(e,t){let n=useClock(),[r,o]=Cct.useState(e),s=Cct.useRef(e!==void 0?Date.now():0);return Cct.useEffect(()=>{if(e!==void 0){s.current=Date.now(),o(e);return}let i=t-(Date.now()-s.current);if(i<=0){o(void 0);return}return n.setTimeout(()=>o(void 0),i)},[e,t,n]),r}
var Cct;
var QNa=b(()=>{ze();Cct=M(Te(),1)});
export {XNa,Cct,QNa};

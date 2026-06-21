// @ts-nocheck
import {useClock} from "./m2432.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function ZNa(e,t){let n=useClock(),[r,o]=vct.useState(e),s=vct.useRef(0);return vct.useEffect(()=>{let i=Date.now()-s.current;if(i>=t){s.current=Date.now(),o(e);return}return n.setTimeout(()=>{s.current=Date.now(),o(e)},t-i)},[e,t,n]),r}
var vct;
var eBa=b(()=>{ze();vct=M(Te(),1)});
export {ZNa,vct,eBa};

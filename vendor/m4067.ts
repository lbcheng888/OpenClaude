// @ts-nocheck
import {useClock} from "./m2442.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function Cqa(e,t){let n=useClock(),[r,o]=$dt.useState(e),s=$dt.useRef(e!==void 0?Date.now():0);return $dt.useEffect(()=>{if(e!==void 0){s.current=Date.now(),o(e);return}let i=t-(Date.now()-s.current);if(i<=0){o(void 0);return}return n.setTimeout(()=>o(void 0),i)},[e,t,n]),r}
var $dt;
var Aqa=b(()=>{je();$dt=x(et(),1)});
export {Cqa,$dt,Aqa};

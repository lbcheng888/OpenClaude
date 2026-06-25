// @ts-nocheck
import {useClock} from "./m2442.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function Rqa(e,t){let n=useClock(),[r,o]=qdt.useState(e),s=qdt.useRef(0);return qdt.useEffect(()=>{let i=Date.now()-s.current;if(i>=t){s.current=Date.now(),o(e);return}return n.setTimeout(()=>{s.current=Date.now(),o(e)},t-i)},[e,t,n]),r}
var qdt;
var vqa=b(()=>{je();qdt=x(et(),1)});
export {Rqa,qdt,vqa};

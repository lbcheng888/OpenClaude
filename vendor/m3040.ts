// @ts-nocheck
import {lHe,b0n} from "./m3039.ts";
import {T9e,y0n} from "./m3032.ts";
import {oYr,y9e} from "./m3030.ts";
import {b} from "../runtime.ts";
function b9e(e){let t=lHe(e);t.current=e,T9e((n)=>{let r=!1,o=oYr((s,i)=>{if(r)return;t.current(i,n)});return n.input.on("keypress",o),()=>{r=!0,n.input.removeListener("keypress",o)}},[])}
var iQi=b(()=>{b0n();y0n();y9e()});
export {b9e,iQi};
